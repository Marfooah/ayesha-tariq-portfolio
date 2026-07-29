import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

declare global {
  interface Window {
    Tally?: { loadEmbeds: () => void };
  }
}

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: "Get Your Free Business Efficiency Assessment — Ummah Growth Guide" },
      {
        name: "description",
        content:
          "Apply for a free Business Efficiency Assessment. 30 minutes to map where your business is losing time and money to manual work.",
      },
    ],
  }),
  component: Apply,
});

function Apply() {
  useEffect(() => {
    // Official Tally React loading pattern from developers.tally.so/widgets/examples/react
    const widgetScriptSrc = "https://tally.so/widgets/embed.js";

    const load = () => {
      if (typeof window.Tally !== "undefined") {
        window.Tally.loadEmbeds();
        return;
      }
      // Fallback: set src directly if Tally object not yet available
      document
        .querySelectorAll<HTMLIFrameElement>("iframe[data-tally-src]:not([src])")
        .forEach((el) => {
          el.src = el.dataset.tallySrc ?? "";
        });
    };

    if (typeof window.Tally !== "undefined") {
      load();
      return;
    }

    if (!document.querySelector(`script[src="${widgetScriptSrc}"]`)) {
      const script = document.createElement("script");
      script.src = widgetScriptSrc;
      script.onload = load;
      script.onerror = load;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <iframe
        data-tally-src="https://tally.so/embed/44q5AO"
        loading="lazy"
        width="100%"
        height="100%"
        frameBorder={0}
        marginHeight={0}
        marginWidth={0}
        title="Apply for a Free Business Efficiency Assessment"
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </div>
  );
}
