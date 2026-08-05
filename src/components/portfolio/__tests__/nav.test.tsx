import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Nav } from "../nav";

vi.mock("@/lib/site", () => ({
  SITE: {
    auditUrl: "/business-efficiency-assessment",
    name: "Ummah Growth Guide",
    tagline: "Customer support operations for ecommerce brands.",
    email: "salam@ummahgrowthguide.com",
    linkedin: "",
    github: "https://github.com/Marfooah",
    githubUser: "Marfooah",
    socialProof: "",
  },
  META: {
    title: "Ummah Growth Guide — Customer Support Operations",
    description: "desc",
  },
}));

describe("Nav", () => {
  it("renders the UGG logo text", () => {
    render(<Nav />);
    expect(screen.getByText("UGG")).toBeInTheDocument();
  });

  it("renders all 5 nav links", () => {
    render(<Nav />);
    const expected = [
      { label: "How It Works", href: "#operations" },
      { label: "What We Improve", href: "#systems" },
      { label: "Work",    href: "#work" },
      { label: "Philosophy", href: "#why-ugg" },
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

  it("renders the Get Assessment CTA button", () => {
    render(<Nav />);
    expect(screen.getByText("Get Assessment")).toBeInTheDocument();
  });

  it("does not render any element with href=/auth or text Admin", () => {
    render(<Nav />);
    expect(document.querySelector('[href="/auth"]')).toBeNull();
    expect(screen.queryByText(/admin/i)).toBeNull();
  });
});
