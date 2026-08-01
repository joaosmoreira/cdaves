import { ArrowLeft, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type InlineField = {
  key: string;
  label: string;
  type?: "text" | "number" | "textarea" | "select" | "image";
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
  function handleFile(key: string, file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      setDraft((p) => ({ ...p, [key]: String(reader.result) }));
    };
    reader.readAsDataURL(file);
  }

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
            ) : f.type === "image" ? (
              <div className="flex items-center gap-4 bg-secondary/40 border border-border rounded-lg p-3">
                {draft[f.key] ? (
                  <div className="relative group">
                    <img src={draft[f.key]} alt="" className="h-16 w-16 border border-border object-contain rounded bg-card p-1" />
                    <button
                      type="button"
                      onClick={() => setDraft((p) => ({ ...p, [f.key]: "" }))}
                      className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-0.5 text-[10px]"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ) : (
                  <div className="h-16 w-16 border border-dashed border-border rounded bg-card flex flex-col items-center justify-center text-[10px] uppercase text-muted-foreground">
                    Sem Imagem
                  </div>
                )}
                <div className="flex-1 space-y-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFile(f.key, file);
                    }}
                    className="bg-background border-border text-foreground text-xs"
                  />
                  <p className="text-[10px] text-muted-foreground">Selecione ou carregue o ficheiro de imagem da marca/logótipo.</p>
                </div>
              </div>
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
