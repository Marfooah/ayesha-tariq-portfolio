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
import { Testimonials } from "@/components/portfolio/testimonials";
import { Contact } from "@/components/portfolio/contact";
import { Footer } from "@/components/portfolio/footer";
import type { Project } from "@/lib/projects-data";
import heroImg from "@/assets/hero-portrait.jpg";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${SITE.name} — AI Engineer · ML · Generative AI` },
      {
        name: "description",
        content:
          "Ayesha Tariq — AI Engineer building production-ready machine learning, generative AI and RAG systems. Selected work, experience and contact.",
      },
      { property: "og:title", content: `${SITE.name} — AI Engineer` },
      {
        property: "og:description",
        content: "Building AI systems that solve real problems — selected work and experience.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroImg },
    ],
    links: [
      {
        rel: "preload",
        as: "image",
        href: heroImg,
        fetchpriority: "high",
      } as any,
    ],
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
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
