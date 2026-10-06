import type { NextConfig } from "next";

const repositoryName = process.env.GITHUB_PAGES_REPO ?? "";
const isGithubPages = process.env.GITHUB_PAGES === "true" && repositoryName.length > 0;

const nextConfig: NextConfig = {
  devIndicators: false,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: isGithubPages ? `/${repositoryName}` : undefined,
  assetPrefix: isGithubPages ? `/${repositoryName}/` : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? `/${repositoryName}` : ""
  }
};

export default nextConfig;
