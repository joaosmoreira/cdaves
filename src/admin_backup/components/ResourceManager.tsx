import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { addRow, removeRow, updateRow, useAdmin, type Row, type SliceKey } from "@/admin/store";
import { ResourceFormDialog } from "./ResourceFormDialog";

export type Field = {
  key: string;
  label: string;
  type?: "text" | "number" | "textarea" | "select" | "image";
  options?: string[];
  hideInTable?: boolean;
};

type Props = {
  slice: SliceKey;
  title: string;
  description?: string;
  fields: Field[];
  singular: string;
};

function emptyDraft(fields: Field[]): Record<string, string> {
  return Object.fromEntries(fields.map((f) => [f.key, ""]));
}

export function ResourceManager({ slice, title, description, fields, singular }: Props) {
  const rows = useAdmin((s) => s[slice]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Row | null>(null);
  const [draft, setDraft] = useState<Record<string, string>>(emptyDraft(fields));

  const tableFields = fields.filter((f) => !f.hideInTable);

  function openNew() {
    setEditing(null);
    setDraft(emptyDraft(fields));
    setOpen(true);
  }

  function openEdit(row: Row) {
    setEditing(row);
    setDraft(Object.fromEntries(fields.map((f) => [f.key, String(row[f.key] ?? "")])));
    setOpen(true);
  }

  function save() {
    const required = fields[0];
    if (!draft[required.key]?.trim()) {
      toast.error(`Preenche o campo "${required.label}".`);
      return;
    }
    if (editing) {
      updateRow(slice, editing.id, draft);
      toast.success(`${singular} atualizado.`);
    } else {
      addRow(slice, draft);
      toast.success(`${singular} criado.`);
    }
    setOpen(false);
  }

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl uppercase leading-none">{title}</h1>
          {description && <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p>}
        </div>
        <Button onClick={openNew}>
          <Plus className="mr-2 h-4 w-4" /> Adicionar
        </Button>

        <ResourceFormDialog
          open={open}
          onOpenChange={setOpen}
          editing={!!editing}
          singular={singular}
          slice={slice}
          fields={fields}
          draft={draft}
          setDraft={setDraft}
          onSave={save}
        />
      </div>

      <div className="mt-8 overflow-x-auto border border-border">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-secondary">
            <tr>
              {tableFields.map((f) => (
                <th key={f.key} className="px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  {f.label}
                </th>
              ))}
              <th className="w-28 px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={tableFields.length + 1} className="px-4 py-10 text-center text-muted-foreground">
                  Ainda não existem registos.
                </td>
              </tr>
            )}
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-border align-middle">
                {tableFields.map((f) => (
                  <td key={f.key} className="px-4 py-3">
                    {f.type === "image" ? (
                      row[f.key] ? (
                        <img src={String(row[f.key])} alt="" className="h-9 w-9 object-contain" />
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )
                    ) : (
                      <span className="line-clamp-2">{String(row[f.key] ?? "—")}</span>
                    )}
                  </td>
                ))}
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" aria-label="Editar" onClick={() => openEdit(row)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Eliminar"
                      onClick={() => {
                        removeRow(slice, row.id);
                        toast.success(`${singular} eliminado.`);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-primary" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
