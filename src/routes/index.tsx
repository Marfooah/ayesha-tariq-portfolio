import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Nav } from "@/components/portfolio/nav";
import { Hero } from "@/components/portfolio/hero";
import { About } from "@/components/portfolio/about";
import { Skills } from "@/components/portfolio/skills";
import { Projects } from "@/components/portfolio/projects";
import { Experience } from "@/components/portfolio/experience";
import { GithubStats } from "@/components/portfolio/github-stats";
import { Process } from "@/components/portfolio/process";
import { Contact } from "@/components/portfolio/contact";
import { Footer } from "@/components/portfolio/footer";
import type { Project } from "@/lib/projects-data";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${SITE.name} — AI Engineer · ML · Generative AI` },
      {
        name: "description",
        content:
          "Ayesha Tariq — Aspiring AI Engineer building real machine learning, deep learning and computer vision projects. Selected work and learning journey.",
      },
      { property: "og:title", content: `${SITE.name} — AI Engineer` },
      {
        property: "og:description",
        content: "Aspiring AI Engineer — selected ML, deep learning and computer vision projects.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [],
  }),
  component: Index,
});

function Index() {
  const { data: projects = [] } = useQuery({
    queryKey: ["projects-public"],
    queryFn: async (): Promise<Project[]> => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []).map((d: any) => ({
        ...d,
        metrics: Array.isArray(d.metrics) ? d.metrics : [],
        technologies: d.technologies ?? [],
      }));
    },
    staleTime: 60_000,
  });

  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects projects={projects} />
        <Experience />
        <GithubStats />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
