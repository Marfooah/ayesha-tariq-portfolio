/**
 * POST /api/subscribe
 *
 * Server-side handler — calls Hostinger Reach API with the Bearer token.
 * The token NEVER reaches the client bundle.
 *
 * Expected request body: { email: string }
 * Hostinger Reach API: POST https://developers.hostinger.com/api/reach/v1/contacts
 * Auth: Authorization: Bearer <HOSTINGER_REACH_TOKEN>
 */
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/subscribe")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        // 1. Parse and validate body
        let email: string;
        try {
          const body = await request.json();
          email = typeof body?.email === "string" ? body.email.trim() : "";
        } catch {
          return new Response(
            JSON.stringify({ error: "Invalid request body." }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
          return new Response(
            JSON.stringify({ error: "Please enter a valid email address." }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }

        // 2. Get the Reach API token from server-side env
        const token = process.env.HOSTINGER_REACH_TOKEN;
        if (!token) {
          console.error("[subscribe] HOSTINGER_REACH_TOKEN is not set.");
          return new Response(
            JSON.stringify({ error: "Newsletter service is not configured." }),
            { status: 503, headers: { "Content-Type": "application/json" } }
          );
        }

        // 3. Call Hostinger Reach API
        try {
          const reach = await fetch(
            "https://developers.hostinger.com/api/reach/v1/contacts",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
              },
              body: JSON.stringify({ email }),
            }
          );

          // 409 = contact already exists — treat as success
          if (reach.status === 409) {
            return new Response(
              JSON.stringify({ success: true }),
              { status: 200, headers: { "Content-Type": "application/json" } }
            );
          }

          if (!reach.ok) {
            const detail = await reach.text().catch(() => "");
            console.error(`[subscribe] Reach API error ${reach.status}: ${detail}`);
            return new Response(
              JSON.stringify({ error: "Subscription failed. Please try again." }),
              { status: 502, headers: { "Content-Type": "application/json" } }
            );
          }

          return new Response(
            JSON.stringify({ success: true }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        } catch (err) {
          console.error("[subscribe] Network error calling Reach:", err);
          return new Response(
            JSON.stringify({ error: "Network error. Please try again." }),
            { status: 502, headers: { "Content-Type": "application/json" } }
          );
        }
      },
    },
  },
});
