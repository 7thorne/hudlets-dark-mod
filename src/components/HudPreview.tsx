import { useRef, useState, type PointerEvent as RPointerEvent } from "react";

type Widget = {
  id: string;
  x: number; // percent
  y: number; // percent
  text: string;
  mono?: boolean;
  accent?: boolean;
};

const INITIAL: Widget[] = [
  { id: "coords", x: 3, y: 6, text: "XYZ: 128  64  -302", mono: true },
  { id: "fps", x: 3, y: 16, text: "FPS 240", mono: true, accent: true },
  { id: "ping", x: 3, y: 26, text: "PING 12ms", mono: true },
  { id: "player", x: 60, y: 6, text: "Steve_", mono: true },
  { id: "biome", x: 60, y: 16, text: "Plains · Day 42", mono: true },
  { id: "note", x: 38, y: 78, text: "double-click me to edit", mono: false },
];

export function HudPreview() {
  const [widgets, setWidgets] = useState<Widget[]>(INITIAL);
  const [editingId, setEditingId] = useState<string | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ id: string; offX: number; offY: number } | null>(null);

  function onPointerDown(e: RPointerEvent<HTMLDivElement>, w: Widget) {
    if (editingId === w.id) return;
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const wx = (w.x / 100) * rect.width;
    const wy = (w.y / 100) * rect.height;
    dragRef.current = {
      id: w.id,
      offX: e.clientX - rect.left - wx,
      offY: e.clientY - rect.top - wy,
    };
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: RPointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    const stage = stageRef.current;
    if (!drag || !stage) return;
    const rect = stage.getBoundingClientRect();
    const nx = ((e.clientX - rect.left - drag.offX) / rect.width) * 100;
    const ny = ((e.clientY - rect.top - drag.offY) / rect.height) * 100;
    setWidgets((prev) =>
      prev.map((w) =>
        w.id === drag.id
          ? { ...w, x: Math.max(0, Math.min(92, nx)), y: Math.max(0, Math.min(94, ny)) }
          : w,
      ),
    );
  }

  function onPointerUp(e: RPointerEvent<HTMLDivElement>) {
    dragRef.current = null;
    try {
      (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  }

  function updateText(id: string, text: string) {
    setWidgets((prev) => prev.map((w) => (w.id === id ? { ...w, text } : w)));
  }

  function reset() {
    setWidgets(INITIAL);
    setEditingId(null);
  }

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Live preview
        </div>
        <button
          onClick={reset}
          className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          reset
        </button>
      </div>

      <div
        ref={stageRef}
        className="hud-stage relative aspect-[16/9] w-full select-none overflow-hidden rounded-lg border border-border"
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* crosshair */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative h-4 w-4">
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/80" />
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/80" />
          </div>
        </div>

        {/* hotbar */}
        <div className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-0.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className={`h-7 w-7 border ${
                i === 0 ? "border-white/90" : "border-white/30"
              } bg-black/40`}
            />
          ))}
        </div>

        {/* widgets */}
        {widgets.map((w) => (
          <div
            key={w.id}
            onPointerDown={(e) => onPointerDown(e, w)}
            onDoubleClick={() => setEditingId(w.id)}
            style={{ left: `${w.x}%`, top: `${w.y}%` }}
            className={`group absolute cursor-grab touch-none rounded-sm px-2 py-1 text-xs leading-tight active:cursor-grabbing ${
              w.mono ? "font-mono" : ""
            } ${
              w.accent ? "text-accent" : "text-white"
            } bg-black/50 backdrop-blur-[2px] ring-1 ring-white/0 transition-shadow hover:ring-white/30`}
            style-text-shadow="0 1px 0 #000"
          >
            {editingId === w.id ? (
              <input
                autoFocus
                value={w.text}
                onChange={(e) => updateText(w.id, e.target.value)}
                onBlur={() => setEditingId(null)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === "Escape") setEditingId(null);
                }}
                className="w-40 bg-transparent text-xs outline-none"
              />
            ) : (
              <span style={{ textShadow: "1px 1px 0 #000" }}>{w.text}</span>
            )}
          </div>
        ))}
      </div>

      <p className="mt-3 text-center font-mono text-[11px] text-muted-foreground">
        drag to move · double-click to edit
      </p>
    </div>
  );
}
