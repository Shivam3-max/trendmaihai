"use client";
import { useState } from "react";
import { Reorder, useDragControls } from "framer-motion";
import { GripVertical, Eye, EyeOff, Check, RotateCcw, Save } from "lucide-react";
import { getHomeSections, type HomeSection } from "@/lib/data/repository";
import { PageHeader, Card } from "@/components/admin/ui";
import { cn } from "@/lib/utils/cn";

const GROUP_COLOR: Record<string, string> = {
  "Above the fold": "text-accent bg-accent-soft",
  Discovery: "text-accent-secondary bg-accent-secondary/10",
  Editorial: "text-text-secondary bg-bg-secondary",
  Community: "text-success bg-success/10",
  Merchandising: "text-warning bg-warning/10",
  Trust: "text-text-secondary bg-bg-secondary",
  Conversion: "text-error bg-error/10",
};

export default function HomepageBuilderPage() {
  const initial = getHomeSections();
  const [sections, setSections] = useState(initial);
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const [saved, setSaved] = useState(false);
  const [dirty, setDirty] = useState(false);

  const toggle = (id: string) => {
    setHidden((h) => {
      const next = new Set(h);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    setDirty(true);
  };

  const reset = () => {
    setSections(initial);
    setHidden(new Set());
    setDirty(false);
  };

  return (
    <div>
      <PageHeader
        title="Homepage Builder"
        subtitle="Drag to reorder · toggle to show/hide · changes preview live on the storefront"
        action={
          <div className="flex gap-2">
            <button onClick={reset} className="inline-flex items-center gap-1.5 rounded-DEFAULT border border-border bg-surface px-4 py-2 text-sm font-semibold text-text-secondary">
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
            <button
              onClick={() => { setSaved(true); setDirty(false); setTimeout(() => setSaved(false), 1600); }}
              className="inline-flex items-center gap-1.5 rounded-DEFAULT bg-accent px-4 py-2 text-sm font-semibold text-white shadow-accent"
            >
              {saved ? <><Check className="h-4 w-4" /> Published</> : <><Save className="h-4 w-4" /> Publish</>}
            </button>
          </div>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
        <Card className="!p-3">
          <Reorder.Group axis="y" values={sections} onReorder={(v) => { setSections(v); setDirty(true); }} className="space-y-2">
            {sections.map((s, i) => (
              <SectionRow key={s.id} section={s} index={i} hidden={hidden.has(s.id)} onToggle={() => toggle(s.id)} />
            ))}
          </Reorder.Group>
        </Card>

        <aside className="space-y-4">
          <Card>
            <p className="font-sub font-semibold">Layout summary</p>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-text-secondary">Total sections</dt><dd className="font-mono">{sections.length}</dd></div>
              <div className="flex justify-between"><dt className="text-text-secondary">Visible</dt><dd className="font-mono">{sections.length - hidden.size}</dd></div>
              <div className="flex justify-between"><dt className="text-text-secondary">Hidden</dt><dd className="font-mono">{hidden.size}</dd></div>
              <div className="flex justify-between"><dt className="text-text-secondary">Unsaved changes</dt><dd className={cn("font-mono", dirty ? "text-warning" : "text-success")}>{dirty ? "Yes" : "No"}</dd></div>
            </dl>
          </Card>
          <Card className="bg-bg-secondary">
            <p className="text-sm leading-relaxed text-text-secondary">
              This mirrors the live home feed. In production, reordering here republishes the homepage section order via the CMS — no code changes needed.
            </p>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function SectionRow({ section, index, hidden, onToggle }: { section: HomeSection; index: number; hidden: boolean; onToggle: () => void }) {
  const controls = useDragControls();
  return (
    <Reorder.Item
      value={section}
      dragListener={false}
      dragControls={controls}
      className={cn(
        "flex items-center gap-3 rounded-DEFAULT border border-border bg-surface px-3 py-2.5 shadow-xs",
        hidden && "opacity-55"
      )}
    >
      <button
        onPointerDown={(e) => controls.start(e)}
        className="cursor-grab touch-none text-text-muted active:cursor-grabbing"
        aria-label="Drag to reorder"
      >
        <GripVertical className="h-5 w-5" />
      </button>
      <span className="w-6 font-mono text-xs text-text-muted">{String(index + 1).padStart(2, "0")}</span>
      <span className="flex-1 text-sm font-medium">{section.label}</span>
      <span className={cn("rounded-full px-2 py-0.5 font-mono text-[0.65rem] font-semibold", GROUP_COLOR[section.group] ?? "bg-bg-secondary text-text-secondary")}>
        {section.group}
      </span>
      <button onClick={onToggle} className="text-text-muted hover:text-text" aria-label={hidden ? "Show section" : "Hide section"}>
        {hidden ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
      </button>
    </Reorder.Item>
  );
}
