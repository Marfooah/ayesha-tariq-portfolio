import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Nav } from "../nav";

// Mock @/lib/site so the CTA href is stable
vi.mock("@/lib/site", () => ({
  SITE: {
    auditUrl: "https://example.com/audit",
    name: "Ummah Growth Guide",
    tagline: "We don't sell AI. We redesign how your business operates.",
    email: "hello@example.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    githubUser: "ugg",
    socialProof: "",
  },
  META: {
    title: "Ummah Growth Guide — Business Systems Studio",
    description: "desc",
  },
}));

describe("Nav", () => {
  it("renders the UGG logo text", () => {
    render(<Nav />);
    expect(screen.getByText("UGG")).toBeInTheDocument();
  });

  it("renders all 5 nav links in order with correct hrefs", () => {
    render(<Nav />);
    const expected = [
      { label: "Systems", href: "#systems" },
      { label: "Process", href: "#process" },
      { label: "Work",    href: "#work" },
      { label: "Why UGG", href: "#why-ugg" },
      { label: "FAQ",     href: "#faq" },
    ];
    const links = screen.getAllByRole("link");
    for (const { label, href } of expected) {
      const link = links.find(
        (l) => l.textContent?.trim() === label && l.getAttribute("href") === href
      );
      expect(link, `Expected nav link "${label}" → ${href}`).toBeTruthy();
    }
  });

  it("renders the Free Audit CTA button", () => {
    render(<Nav />);
    expect(screen.getByText("Free Assessment")).toBeInTheDocument();
  });

  it("does not render any element with href=/auth or text Admin", () => {
    render(<Nav />);
    const authLink = document.querySelector('[href="/auth"]');
    expect(authLink).toBeNull();
    expect(screen.queryByText(/admin/i)).toBeNull();
  });
});
