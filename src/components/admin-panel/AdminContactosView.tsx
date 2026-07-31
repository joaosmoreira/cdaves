import { Phone, Mail, Clock, Save, Plus } from "lucide-react";
import { toast } from "sonner";
import { updateSettings, useAdmin } from "@/admin/store";

export function AdminContactosView() {
  const settings = useAdmin((s) => s.settings);
  const emails = useAdmin((s) => s.emails ?? []);
  const horarios = useAdmin((s) => s.horarios ?? []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-foreground font-display text-2xl uppercase tracking-tight">DADOS DE CONTACTO</h1>
        <p className="text-muted-foreground text-xs font-mono">Informação institucional, emails por departamento e horários do clube</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
        <h3 className="font-display text-lg uppercase text-foreground">Contactos Gerais</h3>
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Contactos guardados."); }} className="space-y-4 text-xs font-mono">
          <div>
            <label className="block text-slate-500 font-bold mb-1 uppercase">Morada do Estádio</label>
            <textarea rows={2} value={settings.morada} onChange={(e) => updateSettings({ morada: e.target.value })} className="w-full bg-secondary border border-border rounded-md p-2 text-foreground font-mono" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-500 font-bold mb-1 uppercase">Telefone</label>
              <input value={settings.telefone} onChange={(e) => updateSettings({ telefone: e.target.value })} className="w-full bg-secondary border border-border rounded-md p-2 text-foreground font-mono" />
            </div>
            <div>
              <label className="block text-slate-500 font-bold mb-1 uppercase">Email Geral</label>
              <input value={settings.emailGeral} onChange={(e) => updateSettings({ emailGeral: e.target.value })} className="w-full bg-secondary border border-border rounded-md p-2 text-foreground font-mono" />
            </div>
          </div>
          <button type="submit" className="flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-md hover:bg-primary/90">
            <Save size={13} /> Guardar Contactos
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg uppercase text-foreground">Emails por Departamento</h3>
            <button className="text-primary font-bold hover:underline">+ Adicionar</button>
          </div>
          <div className="space-y-2">
            {emails.map((em) => (
              <div key={String(em.id)} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <span className="font-bold text-foreground">{String(em.departamento)}</span>
                <span className="text-primary">{String(em.email)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg uppercase text-foreground">Horários de Funcionamento</h3>
            <button className="text-primary font-bold hover:underline">+ Adicionar</button>
          </div>
          <div className="space-y-2">
            {horarios.map((hr) => (
              <div key={String(hr.id)} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <div>
                  <p className="font-bold text-foreground">{String(hr.servico)}</p>
                  <p className="text-muted-foreground">{String(hr.dias)}</p>
                </div>
                <span className="text-foreground font-bold">{String(hr.horario)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
