import { CreditCard, Plus, Edit2, Save } from "lucide-react";
import { toast } from "sonner";
import { updateSettings, useAdmin } from "@/admin/store";

export function AdminSociosView() {
  const settings = useAdmin((s) => s.settings);
  const planos = useAdmin((s) => s.planos ?? []);
  const lugares = useAdmin((s) => s.lugares ?? []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-foreground font-display text-2xl uppercase tracking-tight">SÓCIOS E QUOTAS</h1>
        <p className="text-muted-foreground text-xs font-mono">Gestão de quotas mensais, modalidades de pagamento e lugares anuais</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
        <h3 className="font-display text-lg uppercase text-foreground">Definições da Quota Mensal</h3>
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Quota guardada com sucesso."); }} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div>
            <label className="block text-slate-500 font-bold mb-1 uppercase">Quota Mensal (€)</label>
            <input type="number" step="0.01" value={settings.quota} onChange={(e) => updateSettings({ quota: e.target.value })} className="w-full bg-secondary border border-border rounded-md p-2 text-foreground font-mono" />
          </div>
          <div>
            <label className="block text-slate-500 font-bold mb-1 uppercase">Moeda</label>
            <input value={settings.moeda} onChange={(e) => updateSettings({ moeda: e.target.value })} className="w-full bg-secondary border border-border rounded-md p-2 text-foreground font-mono" />
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className="flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-md hover:bg-primary/90">
              <Save size={13} /> Guardar Alterações
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg uppercase text-foreground">Modalidades de Pagamento</h3>
            <button className="text-primary text-xs font-mono font-bold hover:underline">+ Adicionar</button>
          </div>
          <div className="space-y-3">
            {planos.map((pl) => (
              <div key={String(pl.id)} className="flex items-center justify-between p-3 bg-secondary rounded-lg text-xs font-mono">
                <div>
                  <p className="font-bold text-foreground">{String(pl.nome)}</p>
                  <p className="text-muted-foreground">{String(pl.meses)} meses · Desconto: {String(pl.desconto)}</p>
                </div>
                <button className="text-muted-foreground hover:text-foreground"><Edit2 size={14} /></button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg uppercase text-foreground">Lugares Anuais</h3>
            <button className="text-primary text-xs font-mono font-bold hover:underline">+ Adicionar</button>
          </div>
          <div className="space-y-3">
            {lugares.map((lg) => (
              <div key={String(lg.id)} className="flex items-center justify-between p-3 bg-secondary rounded-lg text-xs font-mono">
                <div>
                  <p className="font-bold text-foreground">{String(lg.nome)}</p>
                  <p className="text-muted-foreground">{String(lg.bancada)} · {String(lg.preco)}€</p>
                </div>
                <button className="text-muted-foreground hover:text-foreground"><Edit2 size={14} /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
