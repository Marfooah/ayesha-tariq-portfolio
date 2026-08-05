/**
 * Property 4: ProcessGrid renders exactly 4 steps (the fixed process).
 * Property 6: shadow-glow applied exclusively to the step at index 0.
 */
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ProcessGrid } from "../process";

const FOUR_STEPS = [
  { title: "Understand", desc: "We map your current support operation." },
  { title: "Design",     desc: "We design the operating system." },
  { title: "Build",      desc: "We build and integrate the system." },
  { title: "Refine",     desc: "We monitor, measure, and improve." },
];

describe("Property 4 — ProcessGrid renders exactly 4 steps", () => {
  it("renders exactly 4 step cards", () => {
    render(<ProcessGrid steps={FOUR_STEPS} />);
    const cards = screen.getAllByTestId("process-step-card");
    expect(cards).toHaveLength(4);
  });
});

describe("Property 6 — shadow-glow applied exclusively to step at index 0", () => {
  it("exactly one card has shadow-glow and it is the first card", () => {
    render(<ProcessGrid steps={FOUR_STEPS} />);
    const cards = screen.getAllByTestId("process-step-card");
    const glowCards = cards.filter((c) => c.className.includes("shadow-glow"));
    expect(glowCards).toHaveLength(1);
    expect(cards[0].className).toContain("shadow-glow");
    for (let i = 1; i < 4; i++) {
      expect(cards[i].className).not.toContain("shadow-glow");
    }
  });
});
