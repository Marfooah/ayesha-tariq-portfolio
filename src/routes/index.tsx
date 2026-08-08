import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Nav } from "@/components/portfolio/nav";
import { Hero } from "@/components/portfolio/hero";
import { Cost } from "@/components/portfolio/cost";
import { Skills } from "@/components/portfolio/skills";
import { Process } from "@/components/portfolio/process";
import { Projects } from "@/components/portfolio/projects";
import { About } from "@/components/portfolio/about";
import { FAQ } from "@/components/portfolio/faq";
import { Contact } from "@/components/portfolio/contact";
import { Footer } from "@/components/portfolio/footer";
import { WhatsAppFloat } from "@/components/portfolio/whatsapp-float";
import { Newsletter } from "@/components/portfolio/newsletter";
import type { Project } from "@/lib/projects-data";
import { SITE, META } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: META.title },
      {
        name: "description",
        content: META.description,
      },
      { property: "og:title", content: META.title },
      {
        property: "og:description",
        content: META.description,
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [],
  }),
  component: Index,
});

function Index() {
  const { data: projects = [], isLoading, isError } = useQuery({
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
        <Cost />
        <Skills />
        <Process />
        <Projects projects={projects} isLoading={isLoading} isError={isError} />
        <About />
        <FAQ />
        <Newsletter />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
