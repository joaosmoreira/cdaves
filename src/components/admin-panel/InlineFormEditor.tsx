import { ArrowLeft, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type InlineField = {
  key: string;
  label: string;
  type?: "text" | "number" | "textarea" | "select";
  options?: string[];
};

type FormProps = {
  title: string;
  subtitle: string;
  fields: InlineField[];
  draft: Record<string, string>;
  setDraft: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onSave: () => void;
  onCancel: () => void;
};

export function InlineFormEditor({
  title,
  subtitle,
  fields,
  draft,
  setDraft,
  onSave,
  onCancel,
}: FormProps) {
  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center justify-between">
        <button
          onClick={onCancel}
          className="flex items-center gap-2 text-xs font-mono font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} /> Voltar à lista
        </button>
      </div>

      <div>
        <h1 className="font-display text-2xl uppercase tracking-tight text-foreground">{title}</h1>
        <p className="text-xs font-mono text-muted-foreground mt-1">{subtitle}</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-5">
        {fields.map((f) => (
          <div key={f.key} className="space-y-1.5 font-mono text-xs">
            <Label className="uppercase text-slate-500 font-bold">{f.label}</Label>
            {f.type === "textarea" ? (
              <Textarea
                rows={4}
                value={draft[f.key] ?? ""}
                onChange={(e) => setDraft((p) => ({ ...p, [f.key]: e.target.value }))}
                className="bg-secondary border-border text-foreground font-mono"
              />
            ) : f.type === "select" ? (
              <select
                value={draft[f.key] ?? f.options?.[0] ?? ""}
                onChange={(e) => setDraft((p) => ({ ...p, [f.key]: e.target.value }))}
                className="w-full bg-secondary border border-border rounded-md p-2 text-foreground font-mono"
              >
                {f.options?.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <Input
                type={f.type === "number" ? "number" : "text"}
                value={draft[f.key] ?? ""}
                onChange={(e) => setDraft((p) => ({ ...p, [f.key]: e.target.value }))}
                className="bg-secondary border-border text-foreground font-mono"
              />
            )}
          </div>
        ))}

        <div className="flex items-center gap-3 pt-4 border-t border-border">
          <Button onClick={onSave} className="text-xs font-semibold flex items-center gap-2">
            <Save size={14} /> Guardar
          </Button>
          <Button variant="outline" onClick={onCancel} className="text-xs font-semibold">
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}
