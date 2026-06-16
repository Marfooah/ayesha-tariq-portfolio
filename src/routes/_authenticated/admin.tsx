import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Plus, Save, Trash2, X, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Project, ProjectMetric } from "@/lib/projects-data";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin · Projects" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

type Draft = Partial<Project> & { metricsRaw?: string; technologiesRaw?: string };

const emptyDraft = (): Draft => ({
  title: "",
  slug: "",
  short_description: "",
  long_description: "",
  thumbnail_url: "",
  github_url: "",
  demo_url: "",
  technologies: [],
  metrics: [],
  featured: false,
  published: true,
  sort_order: 99,
  technologiesRaw: "",
  metricsRaw: "",
});

function Admin() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Draft | null>(null);
  const [roleChecked, setRoleChecked] = useState<{ admin: boolean } | null>(null);

  // Role check (display-only; RLS still enforces server-side)
  useQuery({
    queryKey: ["my-role"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return { admin: false };
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", u.user.id);
      const admin = (data || []).some((r: any) => r.role === "admin");
      setRoleChecked({ admin });
      return { admin };
    },
  });

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects-admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as unknown as Project[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (d: Draft) => {
      const techs = (d.technologiesRaw ?? (d.technologies || []).join(", "))
        .split(",").map((s) => s.trim()).filter(Boolean);
      const metrics = parseMetrics(d.metricsRaw ?? JSON.stringify(d.metrics ?? []));
      const payload = {
        title: d.title!,
        slug: d.slug!,
        short_description: d.short_description!,
        long_description: d.long_description ?? null,
        thumbnail_url: d.thumbnail_url || null,
        github_url: d.github_url || null,
        demo_url: d.demo_url || null,
        technologies: techs,
        metrics,
        featured: !!d.featured,
        published: d.published !== false,
        sort_order: d.sort_order ?? 99,
      };
      if (d.id) {
        const { error } = await supabase.from("projects").update(payload).eq("id", d.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("projects").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Saved");
      setEditing(null);
      qc.invalidateQueries({ queryKey: ["projects-admin"] });
      qc.invalidateQueries({ queryKey: ["projects-public"] });
    },
    onError: (e: any) => toast.error(e.message || "Save failed"),
  });

  const delMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["projects-admin"] });
      qc.invalidateQueries({ queryKey: ["projects-public"] });
    },
    onError: (e: any) => toast.error(e.message || "Delete failed"),
  });

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <Link to="/" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-3" /> Back to portfolio
            </Link>
            <h1 className="mt-2 font-display text-3xl font-bold">Project CMS</h1>
            <p className="text-sm text-muted-foreground">
              Add, edit and remove portfolio projects. Changes appear instantly on the live site.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setEditing(emptyDraft())}
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background"
            >
              <Plus className="size-3.5" /> New project
            </button>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.href = "/";
              }}
              className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs text-muted-foreground hover:text-foreground"
            >
              <LogOut className="size-3.5" /> Sign out
            </button>
          </div>
        </div>

        {roleChecked && !roleChecked.admin && (
          <div className="mb-6 rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-4 text-sm">
            <strong>You're signed in but not an admin yet.</strong>
            <p className="mt-1 text-muted-foreground">
              The first user needs the <code className="rounded bg-white/10 px-1">admin</code> role
              granted in Lovable Cloud → Database → <code className="rounded bg-white/10 px-1">user_roles</code> table
              before they can save changes. Insert a row with your user_id and role = 'admin'.
            </p>
          </div>
        )}

        {isLoading ? (
          <div className="grid gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="glass h-24 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <ul className="grid gap-3">
            {projects.map((p) => (
              <li
                key={p.id}
                className="glass flex items-center gap-4 rounded-2xl p-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-semibold">{p.title}</span>
                    {p.featured && (
                      <span className="rounded-full bg-emerald/10 px-2 py-0.5 text-[10px] text-emerald">
                        Featured
                      </span>
                    )}
                    {!p.published && (
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                        Draft
                      </span>
                    )}
                  </div>
                  <div className="truncate text-xs text-muted-foreground">
                    {p.short_description}
                  </div>
                </div>
                <button
                  onClick={() =>
                    setEditing({
                      ...p,
                      technologiesRaw: (p.technologies || []).join(", "),
                      metricsRaw: JSON.stringify(p.metrics || [], null, 2),
                    })
                  }
                  className="rounded-full border border-white/10 px-3 py-1.5 text-xs hover:bg-white/5"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete "${p.title}"?`)) delMutation.mutate(p.id);
                  }}
                  className="rounded-full border border-destructive/40 p-2 text-destructive hover:bg-destructive/10"
                  aria-label="Delete"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-4 backdrop-blur">
          <div className="glass-strong w-full max-w-2xl overflow-hidden rounded-3xl">
            <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
              <h2 className="font-display text-lg font-semibold">
                {editing.id ? "Edit project" : "New project"}
              </h2>
              <button
                onClick={() => setEditing(null)}
                className="rounded-full p-2 hover:bg-white/5"
              >
                <X className="size-4" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveMutation.mutate(editing);
              }}
              className="max-h-[70vh] space-y-3 overflow-y-auto p-6"
            >
              <Row>
                <In label="Title" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} required />
                <In label="Slug" value={editing.slug} onChange={(v) => setEditing({ ...editing, slug: v })} required />
              </Row>
              <In label="Short description" value={editing.short_description} onChange={(v) => setEditing({ ...editing, short_description: v })} required />
              <Area label="Long description" value={editing.long_description || ""} onChange={(v) => setEditing({ ...editing, long_description: v })} />
              <In label="Thumbnail URL" value={editing.thumbnail_url || ""} onChange={(v) => setEditing({ ...editing, thumbnail_url: v })} />
              <Row>
                <In label="GitHub URL" value={editing.github_url || ""} onChange={(v) => setEditing({ ...editing, github_url: v })} />
                <In label="Live demo URL" value={editing.demo_url || ""} onChange={(v) => setEditing({ ...editing, demo_url: v })} />
              </Row>
              <In
                label="Technologies (comma separated)"
                value={editing.technologiesRaw ?? ""}
                onChange={(v) => setEditing({ ...editing, technologiesRaw: v })}
              />
              <Area
                label='Metrics (JSON array, e.g. [{"label":"Accuracy","value":"94%"}])'
                value={editing.metricsRaw ?? ""}
                onChange={(v) => setEditing({ ...editing, metricsRaw: v })}
              />
              <Row>
                <In
                  label="Sort order"
                  type="number"
                  value={String(editing.sort_order ?? 99)}
                  onChange={(v) => setEditing({ ...editing, sort_order: Number(v) })}
                />
                <div className="flex items-end gap-4">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={!!editing.featured}
                      onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                    />
                    Featured
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={editing.published !== false}
                      onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
                    />
                    Published
                  </label>
                </div>
              </Row>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveMutation.isPending}
                  className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background"
                >
                  <Save className="size-3.5" />
                  {saveMutation.isPending ? "Saving…" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function parseMetrics(raw: string): ProjectMetric[] {
  if (!raw.trim()) return [];
  try {
    const v = JSON.parse(raw);
    if (Array.isArray(v)) return v.filter((x) => x && x.label && x.value);
    return [];
  } catch {
    return [];
  }
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2">{children}</div>;
}
function In({
  label, value, onChange, required, type = "text",
}: { label: string; value: string | undefined; onChange: (v: string) => void; required?: boolean; type?: string }) {
  return (
    <label className="block text-sm">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      <input
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        type={type}
        className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/30"
      />
    </label>
  );
}
function Area({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block text-sm">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/30"
      />
    </label>
  );
}