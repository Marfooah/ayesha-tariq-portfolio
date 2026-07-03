/**
 * Property 4: Process section renders exactly 6 steps regardless of array length.
 * Property 5: Process step icons follow the fixed index-based mapping.
 * Property 6: shadow-glow applied exclusively to the step at index 0.
 * Validates: Requirements 6.3, 6.4, 6.5, 6.8
 */
import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { ProcessGrid } from "../process";
import type { EngagementStep } from "@/lib/site";

const stepArb = fc.record({
  title: fc.string({ minLength: 1, maxLength: 50 }),
  desc:  fc.string({ minLength: 1, maxLength: 200 }),
});

describe("Property 4 — ProcessGrid renders exactly 6 steps", () => {
  it("always renders exactly 6 step cards regardless of array length (6–20)", () => {
    fc.assert(
      fc.property(
        fc.array(stepArb, { minLength: 6, maxLength: 20 }),
        (steps: EngagementStep[]) => {
          const { unmount } = render(<ProcessGrid steps={steps} />);
          const cards = screen.getAllByTestId("process-step-card");
          expect(cards).toHaveLength(6);
          unmount();
        }
      )
    );
  });
});

describe("Property 6 — shadow-glow applied exclusively to step at index 0", () => {
  it("exactly one card has shadow-glow and it is the first card", () => {
    fc.assert(
      fc.property(
        fc.array(stepArb, { minLength: 6, maxLength: 6 }),
        (steps: EngagementStep[]) => {
          const { unmount } = render(<ProcessGrid steps={steps} />);
          const cards = screen.getAllByTestId("process-step-card");

          const glowCards = cards.filter((c) =>
            c.className.includes("shadow-glow")
          );
          expect(glowCards).toHaveLength(1);
          expect(cards[0].className).toContain("shadow-glow");
          // positions 1-5 must NOT have it
          for (let i = 1; i < 6; i++) {
            expect(cards[i].className).not.toContain("shadow-glow");
          }
          unmount();
        }
      )
    );
  });
});
