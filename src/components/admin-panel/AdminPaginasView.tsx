import { FileText, Edit2, Save } from "lucide-react";
import { useAdmin } from "@/admin/store";

export function AdminPaginasView() {
  const paginas = useAdmin((s) => s.clubePaginas ?? []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-foreground font-display text-2xl uppercase tracking-tight">PÁGINAS DO CLUBE</h1>
        <p className="text-muted-foreground text-xs font-mono">Edição das páginas institucionais: História, Estádio e Presidente</p>
      </div>

      <div className="space-y-6">
        {paginas.map((pag) => (
          <div key={String(pag.id)} className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-primary" />
                <h3 className="font-display text-lg uppercase text-foreground">Página {String(pag.pagina)}</h3>
              </div>
              <button className="flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-primary/90">
                <Save size={13} /> Guardar Alterações
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-slate-500 font-bold mb-1 uppercase">Resumo</label>
                <textarea rows={2} defaultValue={String(pag.resumo ?? "")} className="w-full bg-secondary border border-border rounded-md p-2.5 text-foreground focus:outline-none" />
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1 uppercase">Conteúdo Detalhado</label>
                <textarea rows={4} defaultValue={String(pag.conteudo ?? "")} className="w-full bg-secondary border border-border rounded-md p-2.5 text-foreground focus:outline-none" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
