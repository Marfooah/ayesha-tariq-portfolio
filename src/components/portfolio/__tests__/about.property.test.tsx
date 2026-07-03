/**
 * Property 8: Every PRINCIPLES entry renders its icon, title, and description.
 * Validates: Requirement 8.4
 *
 * Strategy: Test the exported pure `PrincipleCard` sub-component directly
 * with injected data — no module mutation or mocking needed.
 */
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { PrincipleCard } from "../about";

// Known icon names in the ICON_MAP
const KNOWN_ICONS = [
  "Target", "GitBranch", "Code2", "TrendingUp",
  "LayoutDashboard", "Rocket", "Brain", "Sparkles",
];

describe("Property 8 — PrincipleCard renders icon, title, and description", () => {
  it("renders title and desc for every generated principle", () => {
    fc.assert(
      fc.property(
        fc.record({
          title: fc.string({ minLength: 1, maxLength: 60 }),
          desc:  fc.string({ minLength: 1, maxLength: 300 }),
          icon:  fc.constantFrom(...KNOWN_ICONS),
        }),
        (principle) => {
          const { container, unmount } = render(<PrincipleCard principle={principle} />);

          const allText = container.textContent ?? "";
          expect(allText).toContain(principle.title);
          expect(allText).toContain(principle.desc);

          // An SVG icon element should be present (Lucide renders <svg>)
          const svg = container.querySelector("svg");
          expect(svg).not.toBeNull();

          unmount();
        }
      )
    );
  });
});
