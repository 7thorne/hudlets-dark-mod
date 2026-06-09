import { createFileRoute } from "@tanstack/react-router";
import { HudletsLogo } from "@/components/HudletsLogo";
import { HudPreview } from "@/components/HudPreview";
import { DownloadMenu } from "@/components/DownloadMenu";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hudlets — Custom HUD mod for Minecraft" },
      {
        name: "description",
        content:
          "Hudlets is a minimal Minecraft mod for crafting your own custom in-game HUD. Lightweight, configurable, and out of the way.",
      },
      { property: "og:title", content: "Hudlets — Custom HUD mod for Minecraft" },
      {
        property: "og:description",
        content: "Build your own Minecraft HUD. Minimal, modular, yours.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />

      {/* Nav */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12">
        <a href="/" className="flex items-center gap-2.5 text-foreground">
          <HudletsLogo size={24} />
          <span className="font-mono text-sm tracking-tight">hudlets</span>
        </a>
        <nav className="flex items-center gap-6 font-mono text-xs text-muted-foreground">
          <a href="#preview" className="transition-colors hover:text-foreground">preview</a>
          <a href="#features" className="transition-colors hover:text-foreground">features</a>
          <a href="#install" className="transition-colors hover:text-foreground">install</a>
        </nav>
      </header>

      {/* Hero */}
      <main className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 pt-20 pb-24 text-center md:pt-32">
        <div className="mb-10 flex h-20 w-20 items-center justify-center rounded-lg border border-border bg-card text-foreground">
          <HudletsLogo size={48} />
        </div>

        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-[11px] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          v0.1.0 — pre-release
        </div>

        <h1 className="text-balance text-5xl font-semibold tracking-tight md:text-7xl">
          Your HUD,<br />
          <span className="text-muted-foreground">your way.</span>
        </h1>

        <p className="mt-6 max-w-md text-balance text-base text-muted-foreground md:text-lg">
          Hudlets is a minimal Minecraft mod for building a custom heads-up display.
          Drag, drop, done.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <DownloadMenu />
          <a
            href="#preview"
            className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-transparent px-6 font-mono text-sm text-foreground transition-colors hover:bg-card"
          >
            Try the preview
          </a>
        </div>

        <p className="mt-6 font-mono text-xs text-muted-foreground">
          Fabric · 1.21 – 1.21.11 · Java 21
        </p>
      </main>

      {/* Interactive HUD preview */}
      <section
        id="preview"
        className="relative z-10 mx-auto max-w-4xl px-6 pb-24"
      >
        <HudPreview />
      </section>

      {/* Features */}
      <section
        id="features"
        className="relative z-10 mx-auto grid max-w-4xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3"
      >
        {[
          { k: "01", t: "Modular widgets", d: "Compose your HUD from clean, self-contained widgets." },
          { k: "02", t: "Drag to place", d: "Position anything anywhere with a snapping grid." },
          { k: "03", t: "Featherweight", d: "Zero impact on FPS. Renders only what you need." },
        ].map((f) => (
          <div key={f.k} className="bg-card p-6">
            <div className="mb-6 font-mono text-xs text-muted-foreground">{f.k}</div>
            <h3 className="mb-2 text-base font-medium">{f.t}</h3>
            <p className="text-sm text-muted-foreground">{f.d}</p>
          </div>
        ))}
      </section>

      {/* Install */}
      <section
        id="install"
        className="relative z-10 mx-auto mt-16 max-w-2xl px-6 pb-24"
      >
        <div className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Install
        </div>
        <div className="rounded-lg border border-border bg-card p-5 font-mono text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-accent">$</span>
            <span className="text-foreground">drop hudlets.jar → /mods</span>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Requires Fabric Loader. Configuration opens with{" "}
          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs">H</kbd>
          {" "}in-game.
        </p>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6 font-mono text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <HudletsLogo size={14} />
            <span>hudlets</span>
          </div>
          <span>© {new Date().getFullYear()} · MIT</span>
        </div>
      </footer>
    </div>
  );
}
