import { useQuery } from "@tanstack/react-query";
import { Github, Star, GitFork, Code2 } from "lucide-react";
import { SITE } from "@/lib/site";
import { SectionLabel } from "./about";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
};

export function GithubStats() {
  const { data, isLoading } = useQuery({
    queryKey: ["gh", SITE.githubUser],
    queryFn: async (): Promise<Repo[]> => {
      const res = await fetch(
        `https://api.github.com/users/${SITE.githubUser}/repos?sort=updated&per_page=6`,
      );
      if (!res.ok) throw new Error("GitHub fetch failed");
      return res.json();
    },
    staleTime: 1000 * 60 * 30,
    retry: 1,
  });

  return (
    <section className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel>GitHub</SectionLabel>
            <h2 className="mt-6 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
              Live from the <span className="text-gradient">terminal</span>.
            </h2>
          </div>
          <a
            href={SITE.github}
            target="_blank"
            rel="noreferrer"
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm hover:bg-white/[0.05]"
          >
            <Github className="size-4" /> @{SITE.githubUser}
          </a>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isLoading &&
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass h-44 animate-pulse rounded-2xl" />
            ))}
          {data?.map((r) => (
            <a
              key={r.id}
              href={r.html_url}
              target="_blank"
              rel="noreferrer"
              className="glass hover-lift group flex flex-col rounded-2xl p-5"
            >
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Code2 className="size-4 text-primary" /> {r.name}
              </div>
              <p className="mt-2 line-clamp-3 flex-1 text-xs text-muted-foreground">
                {r.description || "No description"}
              </p>
              <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                {r.language && <span className="text-emerald">● {r.language}</span>}
                <span className="inline-flex items-center gap-1">
                  <Star className="size-3" /> {r.stargazers_count}
                </span>
                <span className="inline-flex items-center gap-1">
                  <GitFork className="size-3" /> {r.forks_count}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}