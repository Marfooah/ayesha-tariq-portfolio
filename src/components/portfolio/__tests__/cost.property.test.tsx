/**
 * Property 2: Every COST_ITEMS entry renders all required card elements.
 * Validates: Requirement 4.3
 */
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { CostGrid } from "../cost";
import type { CostItem } from "@/lib/site";

describe("Property 2 — CostGrid renders all required card elements", () => {
  it("renders every title and desc, with ≥ items.length .text-gradient elements", () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            title: fc.string({ minLength: 1, maxLength: 40 }),
            desc:  fc.string({ minLength: 1, maxLength: 200 }),
          }),
          { minLength: 1, maxLength: 8 }
        ),
        (items: CostItem[]) => {
          const { container, unmount } = render(<CostGrid items={items} />);

          const allText = container.textContent ?? "";
          for (const item of items) {
            expect(allText).toContain(item.title);
            expect(allText).toContain(item.desc);
          }

          const gradients = container.querySelectorAll(".text-gradient");
          expect(gradients.length).toBeGreaterThanOrEqual(items.length);

          unmount();
        }
      )
    );
  });
});
