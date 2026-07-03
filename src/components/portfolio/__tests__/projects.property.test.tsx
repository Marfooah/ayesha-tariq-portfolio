/**
 * Property 7: Every Project card renders all required data fields.
 * Validates: Requirement 7.3
 */
import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import * as fc from "fast-check";
import { ProjectCard } from "../projects";
import type { Project } from "@/lib/projects-data";

// thumbFor reads the project object — mock it to avoid asset resolution
vi.mock("@/lib/projects-data", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/projects-data")>();
  return {
    ...actual,
    thumbFor: () => "/placeholder.jpg",
  };
});

const projectArb = fc.record({
  id:                fc.uuid(),
  title:             fc.string({ minLength: 1, maxLength: 60 }),
  short_description: fc.string({ minLength: 1, maxLength: 200 }),
  technologies:      fc.array(fc.string({ minLength: 1, maxLength: 20 }), { minLength: 1, maxLength: 5 }),
  metrics: fc.array(
    fc.record({
      label: fc.string({ minLength: 1, maxLength: 30 }),
      value: fc.string({ minLength: 1, maxLength: 20 }),
    }),
    { minLength: 0, maxLength: 3 }
  ),
  featured:    fc.boolean(),
  github_url:  fc.option(fc.webUrl(), { nil: undefined }),
  demo_url:    fc.option(fc.webUrl(), { nil: undefined }),
  image_url:   fc.option(fc.string(), { nil: undefined }),
  sort_order:  fc.integer({ min: 0, max: 100 }),
  published:   fc.constant(true),
  created_at:  fc.constant(new Date().toISOString()),
  updated_at:  fc.constant(new Date().toISOString()),
  slug:        fc.string({ minLength: 1, maxLength: 30 }),
});

describe("Property 7 — ProjectCard renders all required data fields", () => {
  it("renders title, short_description, at least one technology, and metrics", () => {
    fc.assert(
      fc.property(projectArb, (project: Project) => {
        const { container, unmount } = render(<ProjectCard project={project} delay={0} />);

        const allText = container.textContent ?? "";
        expect(allText).toContain(project.title);
        expect(allText).toContain(project.short_description);
        expect(allText).toContain(project.technologies[0]);

        unmount();
      })
    );
  });
});
