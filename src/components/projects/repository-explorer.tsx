"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, File, Folder, Github, LoaderCircle, RefreshCw, Search, Star, X } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";

type Repository = {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  default_branch: string;
  fork: boolean;
  archived: boolean;
  topics: string[];
};

type RepositoryFile = {
  name: string;
  path: string;
  type: "file" | "dir" | "symlink" | "submodule";
  size: number;
};

type ApiContent = RepositoryFile & { content?: string; encoding?: string };

const api = "https://api.github.com";
const owner = "davgei";

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
  if (!response.ok) {
    if (response.status === 403) throw new Error("GitHub API rate limit reached. Try again later.");
    if (response.status === 404) throw new Error("This repository item is unavailable.");
    throw new Error(`GitHub returned ${response.status}.`);
  }
  return response.json() as Promise<T>;
}

function decodeBase64(value: string) {
  const bytes = Uint8Array.from(atob(value.replace(/\s/g, "")), (character) => character.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function InlineMarkdown({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return <>{parts.map((part, index) => {
    if (part.startsWith("`")) return <code key={index}>{part.slice(1, -1)}</code>;
    if (part.startsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    return part.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  })}</>;
}

function Readme({ source }: { source: string }) {
  const blocks: Array<{ type: "code" | "paragraph" | "list" | "quote"; text: string; ordered?: boolean }> = [];
  let paragraph: string[] = [];
  let list: string[] = [];
  let listOrdered = false;
  let code: string[] = [];
  let inCode = false;
  const flushParagraph = () => {
    if (paragraph.length) blocks.push({ type: "paragraph", text: paragraph.join(" ") });
    paragraph = [];
  };
  const flushList = () => {
    if (list.length) blocks.push({ type: "list", text: list.join("\n"), ordered: listOrdered });
    list = [];
  };

  for (const line of source.replace(/\r/g, "").split("\n")) {
    if (line.trim().startsWith("```")) {
      flushParagraph();
      flushList();
      if (inCode) blocks.push({ type: "code", text: code.join("\n") });
      code = [];
      inCode = !inCode;
      continue;
    }
    if (inCode) { code.push(line); continue; }
    const trimmed = line.trim();
    if (!trimmed) { flushParagraph(); flushList(); continue; }
    const heading = trimmed.match(/^#{1,3}\s+(.+)$/);
    if (heading) { flushParagraph(); flushList(); blocks.push({ type: "paragraph", text: `## ${heading[1]}` }); continue; }
    const bullet = trimmed.match(/^(?:[-*+]\s+|\d+[.)]\s+)(.+)$/);
    if (bullet) {
      flushParagraph();
      const ordered = /^\d/.test(trimmed);
      if (list.length && ordered !== listOrdered) flushList();
      listOrdered = ordered;
      list.push(bullet[1]);
      continue;
    }
    if (trimmed.startsWith(">")) { flushParagraph(); flushList(); blocks.push({ type: "quote", text: trimmed.replace(/^>\s?/, "") }); continue; }
    if (/^([-*_]\s*){3,}$/.test(trimmed)) { flushParagraph(); flushList(); continue; }
    flushList();
    paragraph.push(trimmed);
  }
  flushParagraph();
  flushList();
  if (inCode && code.length) blocks.push({ type: "code", text: code.join("\n") });

  return <div className="repo-markdown">{blocks.map((block, index) => {
    if (block.type === "code") return <pre key={index}><code>{block.text}</code></pre>;
    if (block.type === "quote") return <blockquote key={index}><InlineMarkdown text={block.text} /></blockquote>;
    if (block.type === "list") {
      const List = block.ordered ? "ol" : "ul";
      return <List key={index}>{block.text.split("\n").map((item, itemIndex) => <li key={itemIndex}><InlineMarkdown text={item} /></li>)}</List>;
    }
    const heading = block.text.startsWith("## ");
    return heading
      ? <h3 key={index}><InlineMarkdown text={block.text.slice(3)} /></h3>
      : <p key={index}><InlineMarkdown text={block.text} /></p>;
  })}</div>;
}

function formatDate(value: string, language: string) {
  return new Intl.DateTimeFormat(language === "no" ? "nb-NO" : "en-GB", { year: "numeric", month: "short" }).format(new Date(value));
}

export function RepositoryExplorer() {
  const { language } = useLanguage();
  const no = language === "no";
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRequestRef = useRef(0);
  const [open, setOpen] = useState(false);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [selected, setSelected] = useState<Repository | null>(null);
  const [query, setQuery] = useState("");
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [reposError, setReposError] = useState("");
  const [files, setFiles] = useState<RepositoryFile[]>([]);
  const [path, setPath] = useState("");
  const [activeFile, setActiveFile] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [readme, setReadme] = useState("");
  const [loadingContent, setLoadingContent] = useState(false);
  const [contentError, setContentError] = useState("");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const loadRepositories = useCallback(async () => {
    setLoadingRepos(true);
    setReposError("");
    try {
      const result = await getJson<Repository[]>(`${api}/users/${owner}/repos?type=owner&sort=updated&per_page=100`);
      setRepositories(result.filter((repo) => !repo.archived));
    } catch (error) {
      setReposError(error instanceof Error ? error.message : "Could not load repositories.");
    } finally {
      setLoadingRepos(false);
    }
  }, []);

  useEffect(() => {
    if (open && repositories.length === 0 && !reposError) void loadRepositories();
  }, [open, repositories.length, reposError, loadRepositories]);

  const loadRepository = async (repository: Repository) => {
    const requestId = ++contentRequestRef.current;
    setSelected(repository);
    setPath("");
    setFiles([]);
    setActiveFile("");
    setFileContent("");
    setReadme("");
    setContentError("");
    setLoadingContent(true);
    const base = `${api}/repos/${owner}/${encodeURIComponent(repository.name)}`;
    try {
      const [root, readmeResult] = await Promise.allSettled([
        getJson<RepositoryFile[]>(`${base}/contents?ref=${encodeURIComponent(repository.default_branch)}`),
        getJson<ApiContent>(`${base}/readme?ref=${encodeURIComponent(repository.default_branch)}`)
      ]);
      if (requestId !== contentRequestRef.current) return;
      if (root.status === "fulfilled") setFiles(root.value);
      else throw root.reason;
      if (readmeResult.status === "fulfilled" && readmeResult.value.content) {
        const text = decodeBase64(readmeResult.value.content);
        setReadme(text);
        setFileContent(text);
        setActiveFile(readmeResult.value.name);
      }
    } catch (error) {
      if (requestId !== contentRequestRef.current) return;
      setContentError(error instanceof Error ? error.message : "Could not load repository contents.");
    } finally {
      if (requestId === contentRequestRef.current) setLoadingContent(false);
    }
  };

  const loadPath = async (nextPath: string) => {
    if (!selected) return;
    const requestId = ++contentRequestRef.current;
    setLoadingContent(true);
    setContentError("");
    try {
      const endpoint = `${api}/repos/${owner}/${encodeURIComponent(selected.name)}/contents${nextPath ? `/${nextPath.split("/").map(encodeURIComponent).join("/")}` : ""}?ref=${encodeURIComponent(selected.default_branch)}`;
      const result = await getJson<RepositoryFile[]>(endpoint);
      if (requestId !== contentRequestRef.current) return;
      setFiles(result);
      setPath(nextPath);
    } catch (error) {
      if (requestId !== contentRequestRef.current) return;
      setContentError(error instanceof Error ? error.message : "Could not load this folder.");
    } finally {
      if (requestId === contentRequestRef.current) setLoadingContent(false);
    }
  };

  const openFile = async (file: RepositoryFile) => {
    if (!selected) return;
    if (file.size > 300_000) {
      setContentError(no ? "Filen er for stor til å vises her." : "This file is too large to preview here.");
      return;
    }
    const requestId = ++contentRequestRef.current;
    setLoadingContent(true);
    setContentError("");
    try {
      const endpoint = `${api}/repos/${owner}/${encodeURIComponent(selected.name)}/contents/${file.path.split("/").map(encodeURIComponent).join("/")}?ref=${encodeURIComponent(selected.default_branch)}`;
      const result = await getJson<ApiContent>(endpoint);
      if (requestId !== contentRequestRef.current) return;
      if (!result.content || result.encoding !== "base64") throw new Error("This file cannot be previewed.");
      setFileContent(decodeBase64(result.content));
      setActiveFile(file.name);
    } catch (error) {
      if (requestId !== contentRequestRef.current) return;
      setContentError(error instanceof Error ? error.message : "Could not open this file.");
    } finally {
      if (requestId === contentRequestRef.current) setLoadingContent(false);
    }
  };

  const filteredRepositories = useMemo(() => repositories.filter((repo) => {
    const term = query.trim().toLowerCase();
    return !term || `${repo.name} ${repo.description ?? ""} ${repo.language ?? ""}`.toLowerCase().includes(term);
  }), [query, repositories]);
  const pathParts = path ? path.split("/") : [];
  const canRenderMarkdown = activeFile.toLowerCase().endsWith(".md") || activeFile.toLowerCase() === "readme";

  return (
    <>
      <button type="button" className="repo-explorer-trigger" onClick={() => setOpen(true)}>
        <Github size={17} aria-hidden="true" />
        {no ? "Utforsk GitHub-repoene mine" : "Explore my GitHub repositories"}
        <ArrowDown size={16} aria-hidden="true" />
      </button>
      <dialog ref={dialogRef} className="repo-dialog" aria-labelledby="repo-dialog-title" onClose={() => setOpen(false)} onClick={(event) => { if (event.target === dialogRef.current) setOpen(false); }}>
        <div className="repo-dialog__header">
          <div><p className="section-index">/ DAVID BENEDICT GEIER · GITHUB</p><h2 id="repo-dialog-title">{no ? "Repo-utforsker" : "Repository explorer"}</h2></div>
          <button type="button" className="repo-icon-button" aria-label={no ? "Lukk" : "Close"} onClick={() => setOpen(false)}><X size={19} /></button>
        </div>
        <div className="repo-dialog__layout">
          <aside className="repo-sidebar">
            <label className="repo-search"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={no ? "Søk i repoene" : "Search repositories"} /></label>
            <div className="repo-sidebar__heading"><span>{no ? "OFFENTLIGE REPOER" : "PUBLIC REPOSITORIES"}</span><span>{repositories.length}</span></div>
            {loadingRepos && <div className="repo-status"><LoaderCircle className="repo-spinner" size={19} />{no ? "Henter fra GitHub ..." : "Fetching from GitHub ..."}</div>}
            {reposError && <div className="repo-error"><p>{no ? "GitHub-repoene kunne ikke lastes." : "Could not load GitHub repositories."}</p><button type="button" onClick={() => void loadRepositories()}><RefreshCw size={14} />{no ? "Prøv igjen" : "Try again"}</button></div>}
            <div className="repo-list">
              {filteredRepositories.map((repo) => <button type="button" key={repo.id} className={`repo-list__item${selected?.id === repo.id ? " is-active" : ""}`} onClick={() => void loadRepository(repo)}>
                <span className="repo-list__name"><Github size={15} />{repo.name}</span>
                <span className="repo-list__description">{repo.description || (no ? "Ingen beskrivelse" : "No description")}</span>
                <span className="repo-list__meta">{repo.language && <span><i className={`repo-language repo-language--${repo.language.toLowerCase().replace(/[^a-z0-9]/g, "")}`} />{repo.language}</span>}<span><Star size={12} />{repo.stargazers_count}</span></span>
              </button>)}
            </div>
            {!loadingRepos && !reposError && filteredRepositories.length === 0 && <p className="repo-empty">{no ? "Ingen repo matcher søket." : "No repositories match your search."}</p>}
          </aside>
          <section className="repo-workspace" aria-live="polite">
            {!selected && <div className="repo-welcome"><Github size={40} strokeWidth={1.3} /><p className="section-index">@DAVGEI</p><h3>{no ? "Prosjektene mine, direkte fra GitHub." : "My projects, straight from GitHub."}</h3><p>{no ? "Velg et repo for å lese dokumentasjon og bla i filene her." : "Choose a repository to read its documentation and browse files here."}</p></div>}
            {selected && <>
              <header className="repo-summary">
                <div><p className="section-index">{selected.fork ? (no ? "FORKET REPOSITORY" : "FORKED REPOSITORY") : (no ? "REPOSITORY" : "REPOSITORY")}</p><h3>{selected.name}</h3><p>{selected.description || (no ? "Ingen beskrivelse lagt til." : "No description provided.")}</p></div>
                <div className="repo-summary__stats"><span><Star size={14} />{selected.stargazers_count}</span><span>{no ? "Oppdatert" : "Updated"} {formatDate(selected.updated_at, language)}</span></div>
              </header>
              <div className="repo-browser">
                <div className="repo-files">
                  <div className="repo-files__toolbar">
                    <button type="button" disabled={!path || loadingContent} onClick={() => void loadPath(pathParts.slice(0, -1).join("/"))}><ArrowLeft size={15} />{no ? "Opp" : "Up"}</button>
                    <span title={path || selected.default_branch}>{selected.default_branch}{path && ` / ${path}`}</span>
                  </div>
                  {loadingContent && <div className="repo-status"><LoaderCircle className="repo-spinner" size={18} />{no ? "Laster innhold ..." : "Loading contents ..."}</div>}
                  {contentError && <p className="repo-error__message">{contentError}</p>}
                  {!loadingContent && files.map((file) => <button type="button" className={`repo-file${activeFile === file.name ? " is-active" : ""}`} key={file.path} onClick={() => file.type === "dir" ? void loadPath(file.path) : void openFile(file)}>
                    {file.type === "dir" ? <Folder size={15} /> : <File size={15} />}<span>{file.name}</span>
                  </button>)}
                </div>
                <article className="repo-reader">
                  <div className="repo-reader__toolbar">
                    <div><File size={15} /><span>{activeFile || (no ? "Forhåndsvisning" : "Preview")}</span></div>
                    {readme && <button type="button" onClick={() => { setActiveFile("README.md"); setFileContent(readme); }}>{no ? "README" : "README"}</button>}
                  </div>
                  {loadingContent && !fileContent && <div className="repo-status"><LoaderCircle className="repo-spinner" size={18} />{no ? "Laster ..." : "Loading ..."}</div>}
                  {!loadingContent && !activeFile && <div className="repo-reader__empty">{no ? "Velg en fil for å lese innholdet." : "Choose a file to read its contents."}</div>}
                  {!!fileContent && (canRenderMarkdown ? <Readme source={fileContent} /> : <pre className="repo-source"><code>{fileContent}</code></pre>)}
                </article>
              </div>
            </>}
          </section>
        </div>
        <p className="repo-dialog__foot"><span>{no ? "Live data fra" : "Live data from"} api.github.com · davgei</span><span>{no ? "Innholdet vises på denne siden." : "Repository contents stay on this page."}</span></p>
      </dialog>
    </>
  );
}
