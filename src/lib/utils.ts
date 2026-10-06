export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function getBasePath() {
  return process.env.NEXT_PUBLIC_BASE_PATH ?? "";
}
