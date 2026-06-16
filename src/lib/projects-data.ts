import histoai from "@/assets/project-histoai.jpg";
import documentiq from "@/assets/project-documentiq.jpg";
import diaguard from "@/assets/project-diaguard.jpg";
import machineguard from "@/assets/project-machineguard.jpg";
import sportify from "@/assets/project-sportify.jpg";
import homevalue from "@/assets/project-homevalue.jpg";

export const THUMBNAILS: Record<string, string> = {
  histoai,
  documentiq,
  "diaguard-ai": diaguard,
  "machineguard-ai": machineguard,
  sportify,
  "homevalue-ai": homevalue,
};

export type ProjectMetric = { label: string; value: string };

export type Project = {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  long_description: string | null;
  thumbnail_url: string | null;
  github_url: string | null;
  demo_url: string | null;
  technologies: string[];
  metrics: ProjectMetric[];
  featured: boolean;
  published: boolean;
  sort_order: number;
};

export function thumbFor(p: Pick<Project, "slug" | "thumbnail_url">) {
  return p.thumbnail_url || THUMBNAILS[p.slug] || THUMBNAILS.histoai;
}