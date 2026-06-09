import { useEffect, useRef, useState } from "react";

const VERSIONS = [
  "1.21.11",
  "1.21.10",
  "1.21.9",
  "1.21.8",
  "1.21.7",
  "1.21.6",
  "1.21.5",
  "1.21.4",
  "1.21.3",
  "1.21.2",
  "1.21.1",
  "1.21",
];

function downloadVersion(version: string) {
  const manifest = [
    "Manifest-Version: 1.0",
    `Implementation-Title: Hudlets`,
    `Implementation-Version: ${version}`,
    `Built-For: Minecraft ${version}`,
    `Fabric-Loader-Version: 0.15+`,
    "",
  ].join("\n");
  const blob = new Blob([manifest], { type: "application/java-archive" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `hudlets-${version}.jar`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function DownloadMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-6 font-mono text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        Download
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <path
            d="M2 3.5L5 6.5L8 3.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-1/2 z-20 mt-2 max-h-72 w-56 -translate-x-1/2 overflow-y-auto rounded-md border border-border bg-card py-1 shadow-2xl"
        >
          <div className="px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Minecraft version
          </div>
          {VERSIONS.map((v) => (
            <button
              key={v}
              role="menuitem"
              onClick={() => {
                downloadVersion(v);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between px-3 py-2 text-left font-mono text-xs text-foreground transition-colors hover:bg-muted"
            >
              <span>hudlets-{v}.jar</span>
              <span className="text-muted-foreground">↓</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
