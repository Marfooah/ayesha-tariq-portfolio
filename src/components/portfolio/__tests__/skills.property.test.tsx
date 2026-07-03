/**
 * Property 3: Every SERVICES entry renders all four required fields.
 * Validates: Requirement 5.4
 *
 * Strategy: render ServiceCard and verify each field value appears in the DOM.
 * problem/outcome are split across sibling text nodes (prefix span + value),
 * so we query the parent <p> element's textContent rather than getByText.
 */
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { ServiceCard } from "../skills";
import type { Service } from "@/lib/site";

describe("Property 3 — ServiceCard renders all four required fields", () => {
  it("renders title, problem, transformation, and outcome for every generated Service", () => {
    fc.assert(
      fc.property(
        fc.record({
          title:          fc.string({ minLength: 1, maxLength: 50 }),
          problem:        fc.string({ minLength: 1, maxLength: 200 }),
          transformation: fc.string({ minLength: 1, maxLength: 200 }),
          outcome:        fc.string({ minLength: 1, maxLength: 200 }),
        }),
        (service: Service) => {
          const { container, unmount } = render(<ServiceCard service={service} />);

          const allText = container.textContent ?? "";

          // All four field values must appear somewhere in the card's text
          expect(allText).toContain(service.title);
          expect(allText).toContain(service.problem);
          expect(allText).toContain(service.transformation);
          expect(allText).toContain(service.outcome);

          unmount();
        }
      )
    );
  });
});
