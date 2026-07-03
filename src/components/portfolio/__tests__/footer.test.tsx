/**
 * Property 11: Footer never contains an Admin link element.
 * Validates: Requirement 11.3
 */
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Footer } from "../footer";

vi.mock("@/lib/site", () => ({
  SITE: {
    name: "Ummah Growth Guide",
    tagline: "We don't sell AI. We redesign how your business operates.",
    auditUrl: "/apply",
    email: "salam@ummahgrowthguide.com",
    linkedin: "",
    github: "https://github.com/Marfooah",
    githubUser: "Marfooah",
    socialProof: "",
  },
  META: {
    title: "Ummah Growth Guide — Business Systems Studio",
    description: "desc",
  },
}));

describe("Property 11 — Footer Admin link absence", () => {
  it("does not render any element with href=/auth", () => {
    render(<Footer />);
    expect(document.querySelector('[href="/auth"]')).toBeNull();
  });

  it("does not render any element with text 'Admin'", () => {
    render(<Footer />);
    expect(screen.queryByText(/^admin$/i)).toBeNull();
  });

  it("renders the brand name and tagline", () => {
    render(<Footer />);
    expect(screen.getByText("Ummah Growth Guide")).toBeInTheDocument();
    expect(screen.getByText("We don't sell AI. We redesign how your business operates.")).toBeInTheDocument();
  });

  it("renders the Get Your Free Audit link", () => {
    render(<Footer />);
    expect(screen.getByText("Get Your Free Assessment")).toBeInTheDocument();
  });
});
