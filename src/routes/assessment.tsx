import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/nav";
import { Footer } from "@/components/portfolio/footer";

export const Route = createFileRoute("/assessment")({
  head: () => ({
    meta: [
      { title: "Apply for a Free Business Efficiency Assessment — Ummah Growth Guide" },
      {
        name: "description",
        content: "Apply for a free business efficiency assessment to discover automation opportunities in your operations.",
      },
    ],
    scripts: [
      {
        src: "https://tally.so/widgets/embed.js",
        async: true,
      },
    ],
  }),
  component: Assessment,
});

function Assessment() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 relative">
        {/* Full-page Tally embed */}
        <iframe
          data-tally-src="https://tally.so/r/44q5AO?transparentBackground=1"
          width="100%"
          height="100%"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          title="Apply for a Free Business Efficiency Assessment"
          className="absolute inset-0 border-0"
          style={{ minHeight: "calc(100vh - 80px)" }}
        />
      </main>
      <Footer />
    </div>
  );
}
