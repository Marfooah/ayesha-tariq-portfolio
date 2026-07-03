/**
 * Property 9:  Final CTA button href equals the configured auditUrl.
 * Property 10: Social proof pill renders if and only if socialProof is a non-empty string.
 * Validates: Requirements 10.6, 10.8
 */
import { render, screen } from "@testing-library/react";import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { FinalCTAContent } from "../contact";

describe("Property 9 — Final CTA button href equals auditUrl", () => {
  it("the <a> element href matches the passed auditUrl exactly", () => {
    fc.assert(
      fc.property(
        fc.webUrl(),
        (url: string) => {
          const { unmount } = render(<FinalCTAContent auditUrl={url} />);
          const link = screen.getByRole("link", { name: /get your free business efficiency assessment/i });
          expect(link).toHaveAttribute("href", url);
          unmount();
        }
      )
    );
  });

  it("renders a disabled button (not a link) when auditUrl is undefined", () => {
    render(<FinalCTAContent auditUrl={undefined} />);
    const button = screen.getByRole("button", { name: /get your free business efficiency assessment/i });
    expect(button).toBeDisabled();
  });
});

describe("Property 10 — Social proof pill conditional render", () => {
  it("renders pill iff socialProof is a non-empty string", () => {
    // Non-empty string → pill present and its text is in the DOM
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 100 }),
        (proof: string) => {
          const { container, unmount } = render(<FinalCTAContent socialProof={proof} />);
          // The pill span has class "glass rounded-full" and contains the proof text
          const pill = container.querySelector("span.glass.rounded-full");
          expect(pill).not.toBeNull();
          expect(container.textContent).toContain(proof);
          unmount();
        }
      )
    );

    // undefined → no pill
    const { unmount: u1, container: c1 } = render(<FinalCTAContent socialProof={undefined} />);
    expect(c1.querySelector("span.glass.rounded-full")).toBeNull();
    u1();

    // Empty string → no pill
    const { unmount: u2, container: c2 } = render(<FinalCTAContent socialProof="" />);
    expect(c2.querySelector("span.glass.rounded-full")).toBeNull();
    u2();
  });
});
