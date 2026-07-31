import { type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Field } from "./ResourceManager";

type ResourceFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editing: boolean;
  singular: string;
  slice: string;
  fields: Field[];
  draft: Record<string, string>;
  setDraft: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onSave: () => void;
};

export function ResourceFormDialog({
  open,
  onOpenChange,
  editing,
  singular,
  slice,
  fields,
  draft,
  setDraft,
  onSave,
}: ResourceFormDialogProps) {
  function onFile(key: string, e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setDraft((d) => ({ ...d, [key]: String(reader.result) }));
    reader.readAsDataURL(file);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl uppercase">
            {editing ? `Editar ${singular.toLowerCase()}` : `Novo ${singular.toLowerCase()}`}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {fields.map((f) => (
            <div key={f.key} className="space-y-2">
              <Label htmlFor={`${slice}-${f.key}`}>{f.label}</Label>
              {f.type === "textarea" ? (
                <Textarea
                  id={`${slice}-${f.key}`}
                  value={draft[f.key] ?? ""}
                  onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
                  rows={4}
                />
              ) : f.type === "select" ? (
                <Select
                  value={draft[f.key] || undefined}
                  onValueChange={(v) => setDraft({ ...draft, [f.key]: v })}
                >
                  <SelectTrigger id={`${slice}-${f.key}`}>
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent>
                    {(f.options ?? []).map((o) => (
                      <SelectItem key={o} value={o}>
                        {o}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : f.type === "image" ? (
                <div className="flex items-center gap-4">
                  {draft[f.key] ? (
                    <img src={draft[f.key]} alt="" className="h-14 w-14 border border-border object-contain" />
                  ) : (
                    <div className="grid h-14 w-14 place-items-center border border-dashed border-border text-[10px] uppercase text-muted-foreground">
                      Logo
                    </div>
                  )}
                  <Input id={`${slice}-${f.key}`} type="file" accept="image/*" onChange={(e) => onFile(f.key, e)} />
                </div>
              ) : (
                <Input
                  id={`${slice}-${f.key}`}
                  type={f.type === "number" ? "number" : "text"}
                  value={draft[f.key] ?? ""}
                  onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
                />
              )}
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onSave}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
