import { useState } from "react";
import { UserCheck, Plus, Edit2, Trash2, Shield, Lock, KeyRound, CheckCircle2, XCircle, Power, Eye } from "lucide-react";
import { toast } from "sonner";
import { addRow, removeRow, updateRow, useAdmin, Row } from "@/admin/store";
import { InlineFormEditor, InlineField } from "./InlineFormEditor";

const PERFIS_CONFIG = [
  {
    key: "super_admin",
    nome: "Super Admin (Acesso Total)",
    cor: "bg-red-500/10 text-red-700 border-red-500/30",
    desc: "Acesso ilimitado a todas as bases de dados, definições visuais, cores e gestão de utilizadores.",
  },
  {
    key: "gestor_imprensa",
    nome: "Gestor de Comunicação & Imprensa",
    cor: "bg-blue-500/10 text-blue-700 border-blue-500/30",
    desc: "Gestão de Notícias, Artigos, Galerias Multimédia, Comunicados Oficiais e Banners de Conteúdo.",
  },
  {
    key: "gestor_desportivo",
    nome: "Gestor Desportivo / Modalidades",
    cor: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30",
    desc: "Gestão de Jogos, Marcadores de Resultados, Modalidades, Plantéis de Atletas e Equipa Técnica.",
  },
  {
    key: "gestor_socios",
    nome: "Gestor de Secretaria & Sócios",
    cor: "bg-amber-500/10 text-amber-700 border-amber-500/30",
    desc: "Acesso protegido a Fichas de Sócios, Tabela de Quotas, Lugar Anual e Contactos Oficiais (RGPD).",
  },
  {
    key: "gestor_corporate",
    nome: "Gestor Comercial & Corporate",
    cor: "bg-purple-500/10 text-purple-700 border-purple-500/30",
    desc: "Gestão de Marcas Patrocinadoras, Parceiros Comerciais e Informações de Hospitalidade VIP.",
  },
];

const fields: InlineField[] = [
  { key: "nome", label: "Nome do Utilizador / Departamento" },
  { key: "email", label: "Endereço de E-mail de Acesso" },
  { key: "cargo", label: "Cargo / Função Oficial" },
  {
    key: "perfil",
    label: "Perfil de Acesso & Permissões",
    type: "select",
    options: [
      "super_admin — Super Admin (Acesso Total)",
      "gestor_imprensa — Gestor de Comunicação & Imprensa",
      "gestor_desportivo — Gestor Desportivo / Modalidades",
      "gestor_socios — Gestor de Secretaria & Sócios",
      "gestor_corporate — Gestor Comercial & Corporate",
    ],
  },
];

export function AdminUtilizadoresView() {
  const adminUsers = useAdmin((s) => s.adminUsers ?? []);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRow, setEditingRow] = useState<Row | null>(null);
  const [draft, setDraft] = useState<Record<string, string>>({
    nome: "",
    email: "",
    cargo: "",
    perfil: "gestor_imprensa",
    activo: "sim",
  });

  function openNew() {
    setEditingRow(null);
    setDraft({
      nome: "",
      email: "",
      cargo: "",
      perfil: "gestor_imprensa",
      activo: "sim",
    });
    setIsEditing(true);
  }

  function openEdit(row: Row) {
    setEditingRow(row);
    setDraft({
      nome: String(row.nome ?? ""),
      email: String(row.email ?? ""),
      cargo: String(row.cargo ?? ""),
      perfil: String(row.perfil ?? "gestor_imprensa"),
      activo: String(row.activo ?? "sim"),
    });
    setIsEditing(true);
  }

  function handleDelete(id: string) {
    removeRow("adminUsers", id);
    toast.success("Utilizador de administração eliminado.");
  }

  function toggleUserActive(row: Row) {
    const isCurrentlyActive = String(row.activo) === "sim" || String(row.activo) === "true";
    const nextState = isCurrentlyActive ? "nao" : "sim";

    updateRow("adminUsers", row.id, { activo: nextState });

    if (isCurrentlyActive) {
      toast.warning(`Conta de "${row.nome}" foi suspensa.`);
    } else {
      toast.success(`Conta de "${row.nome}" foi ativada!`);
    }
  }

  function handleSave() {
    if (!draft.nome?.trim() || !draft.email?.trim()) {
      toast.error("O nome e o e-mail do utilizador são obrigatórios.");
      return;
    }

    const cleanPerfil = draft.perfil.split(" — ")[0].trim();
    const perfilObj = PERFIS_CONFIG.find((p) => p.key === cleanPerfil) || PERFIS_CONFIG[0];

    const payload = {
      ...draft,
      perfil: cleanPerfil,
      perfilNome: perfilObj.nome,
      permissoes: perfilObj.desc,
      ultimoLogin: draft.ultimoLogin || new Date().toISOString().replace("T", " ").slice(0, 16),
    };

    if (editingRow) {
      updateRow("adminUsers", editingRow.id, payload);
      toast.success("Utilizador atualizado.");
    } else {
      addRow("adminUsers", payload);
      toast.success("Novo utilizador de administração criado!");
    }
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <InlineFormEditor
        title={editingRow ? "Editar Utilizador de Administração" : "Novo Utilizador de Administração"}
        subtitle="Defina o nome, e-mail e perfil de acesso atribuído a esta conta."
        fields={fields}
        draft={draft}
        setDraft={setDraft}
        onSave={handleSave}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-foreground font-display text-2xl uppercase tracking-tight">GESTÃO DE UTILIZADORES & PERFIS (RBAC)</h1>
          <p className="text-muted-foreground text-xs font-mono">
            Controlo de acessos, permissões por departamento e segurança do painel de administração
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center justify-center gap-2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          <Plus size={14} /> Novo Utilizador Admin
        </button>
      </div>

      {/* Guia de Perfis */}
      <div className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-3">
        <h3 className="font-display text-base uppercase text-foreground flex items-center gap-2">
          <Shield size={16} className="text-primary" /> Perfis de Acesso Configurados no Sistema
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {PERFIS_CONFIG.map((p) => (
            <div key={p.key} className="bg-secondary/50 border border-border rounded-lg p-3 space-y-1">
              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${p.cor}`}>
                {p.nome}
              </span>
              <p className="text-[11px] text-muted-foreground font-mono leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Lista de Utilizadores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {adminUsers.map((u) => {
          const isActive = String(u.activo) === "sim" || String(u.activo) === "true";
          const perfilObj = PERFIS_CONFIG.find((p) => p.key === String(u.perfil)) || PERFIS_CONFIG[0];

          return (
            <div
              key={String(u.id)}
              className={`bg-card border rounded-xl p-5 shadow-sm space-y-4 transition-all ${
                isActive ? "border-border" : "border-slate-300 opacity-75 bg-slate-50/50"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary shrink-0">
                    <UserCheck size={18} />
                  </div>
                  <div>
                    <h3 className="font-display text-base uppercase text-foreground leading-tight">{String(u.nome)}</h3>
                    <span className="text-[11px] font-mono text-muted-foreground block">{String(u.email)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button onClick={() => openEdit(u)} className="text-muted-foreground hover:text-foreground p-1 rounded hover:bg-secondary">
                    <Edit2 size={14} />
                  </button>
                  <button onClick={() => handleDelete(u.id)} className="text-muted-foreground hover:text-destructive p-1 rounded hover:bg-secondary">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${perfilObj.cor}`}>
                  {perfilObj.nome}
                </span>
                <p className="text-xs text-muted-foreground font-mono leading-relaxed line-clamp-2">
                  {String(u.permissoes || perfilObj.desc)}
                </p>
              </div>

              <div className="text-[11px] font-mono text-muted-foreground border-t border-border pt-3 flex items-center justify-between">
                <span>Último login: <strong className="text-foreground">{String(u.ultimoLogin || "Recente")}</strong></span>
              </div>

              {/* Botão de Toggle Conta Ativa / Suspensa */}
              <div className="pt-2 flex items-center justify-between border-t border-border">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase ${
                    isActive ? "bg-emerald-500/10 text-emerald-700 border border-emerald-500/30" : "bg-slate-200 text-slate-600 border border-slate-300"
                  }`}
                >
                  {isActive ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                  {isActive ? "Conta Ativa" : "Conta Suspensa"}
                </span>

                <button
                  type="button"
                  onClick={() => toggleUserActive(u)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs font-mono font-bold transition-all ${
                    isActive
                      ? "bg-secondary text-foreground hover:bg-slate-200 border border-border"
                      : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                  }`}
                >
                  <Power size={12} />
                  {isActive ? "Suspender" : "Ativar"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
