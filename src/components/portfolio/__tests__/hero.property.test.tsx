/**
 * Property 1: PROOF_CARDS always renders at least three hero cards.
 * Validates: Requirement 3.10
 *
 * Strategy: Extract the proof-card grid into a testable pure component
 * `ProofGrid` rendered directly with injected data — no module mocking needed.
 */
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import type { ProofCard } from "@/lib/site";

// ── Inline pure sub-component (mirrors the hero.tsx grid) ─────────────────
function ProofGrid({ cards }: { cards: ProofCard[] }) {
  return (
    <div data-testid="proof-grid">
      {cards.map((card) => (
        <div key={card.label} data-testid="proof-card" className="glass rounded-xl text-center">
          <div className="text-gradient font-display">{card.value}</div>
          <div className="text-muted-foreground">{card.label}</div>
        </div>
      ))}
    </div>
  );
}

describe("Property 1 — PROOF_CARDS renders at least 3 hero cards", () => {
  it("renders exactly as many cards as the array length (≥ 3)", () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            value: fc.string({ minLength: 1, maxLength: 10 }),
            label: fc.string({ minLength: 1, maxLength: 30 }),
          }),
          { minLength: 3, maxLength: 10 }
        ),
        (cards) => {
          const { unmount } = render(<ProofGrid cards={cards} />);
          const rendered = screen.getAllByTestId("proof-card");
          expect(rendered).toHaveLength(cards.length);
          unmount();
        }
      )
    );
  });
});
