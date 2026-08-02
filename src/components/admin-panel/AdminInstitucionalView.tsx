import { useState } from "react";
import { Building2, Trophy, History, Award, Ticket, Plus, Edit2, Trash2, ShieldCheck, PhoneCall } from "lucide-react";
import { toast } from "sonner";
import { addRow, removeRow, updateRow, useAdmin, Row } from "@/admin/store";
import { InlineFormEditor, InlineField } from "./InlineFormEditor";

type SubSection = "historia" | "palmares" | "instalacoes" | "hospitalidade" | "precosSocios" | "precosLugarAnual" | "contactos";

export function AdminInstitucionalView() {
  const [subSection, setSubSection] = useState<SubSection>("historia");
  const [isEditing, setIsEditing] = useState(false);
  const [editingRow, setEditingRow] = useState<Row | null>(null);

  const historia = useAdmin((s) => s.historia ?? []);
  const palmares = useAdmin((s) => s.palmares ?? []);
  const instalacoes = useAdmin((s) => s.instalacoes ?? []);
  const hospitalidade = useAdmin((s) => s.hospitalidade ?? []);
  const precosSocios = useAdmin((s) => s.precosSocios ?? []);
  const precosLugarAnual = useAdmin((s) => s.precosLugarAnual ?? []);
  const contactos = useAdmin((s) => s.contactos ?? []);

  const [draft, setDraft] = useState<Record<string, string>>({});

  function getSliceKey(): SubSection {
    return subSection;
  }

  function getFields(): InlineField[] {
    switch (subSection) {
      case "historia":
        return [
          { key: "ano", label: "Ano / Época" },
          { key: "titulo", label: "Título do Marco Histórico" },
          { key: "descricao", label: "Descrição Detalhada", type: "textarea" },
        ];
      case "palmares":
        return [
          { key: "titulo", label: "Troféu / Título Conquistado" },
          { key: "epoca", label: "Época Desportiva (ex: 2017/2018)" },
          { key: "categoria", label: "Escalão / Categoria" },
          { key: "descricao", label: "Detalhes da Conquista", type: "textarea" },
        ];
      case "instalacoes":
        return [
          { key: "nome", label: "Nome do Recinto / Instalação" },
          { key: "capacidade", label: "Capacidade de Lotamento" },
          { key: "recinto", label: "Tipo de Piso / Recinto" },
          { key: "localizacao", label: "Localização / Morada" },
        ];
      case "hospitalidade":
        return [
          { key: "titulo", label: "Tipo de Experiência VIP / Camarote" },
          { key: "capacidade", label: "Capacidade / Lotação" },
          { key: "servicos", label: "Serviços Incluídos (Catering, Bar, etc.)", type: "textarea" },
        ];
      case "precosSocios":
        return [
          { key: "categoria", label: "Categoria de Sócio" },
          { key: "preco", label: "Preço de Quota" },
          { key: "frequencia", label: "Periodicidade (ex: Mensal, Anual)" },
          { key: "descricao", label: "Benefícios Incluídos" },
        ];
      case "precosLugarAnual":
        return [
          { key: "sector", label: "Sector / Bancada do Estádio" },
          { key: "preco", label: "Preço por Época" },
          { key: "inclui", label: "Jogos / Recintos Incluídos" },
        ];
      case "contactos":
        return [
          { key: "departamento", label: "Departamento / Serviço" },
          { key: "email", label: "Endereço de E-mail" },
          { key: "telefone", label: "Contacto Telefónico" },
          { key: "morada", label: "Localização / Balcão" },
        ];
      default:
        return [];
    }
  }

  function openNew() {
    setEditingRow(null);
    setDraft({});
    setIsEditing(true);
  }

  function openEdit(row: Row) {
    setEditingRow(row);
    const initialDraft: Record<string, string> = {};
    Object.keys(row).forEach((k) => {
      initialDraft[k] = String(row[k] ?? "");
    });
    setDraft(initialDraft);
    setIsEditing(true);
  }

  function handleDelete(id: string) {
    removeRow(getSliceKey(), id);
    toast.success("Registo eliminado.");
  }

  function handleSave() {
    if (editingRow) {
      updateRow(getSliceKey(), editingRow.id, draft);
      toast.success("Conteúdo atualizado.");
    } else {
      addRow(getSliceKey(), draft);
      toast.success("Novo conteúdo adicionado.");
    }
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <InlineFormEditor
        title={editingRow ? "Editar Registo Institucional" : "Novo Registo Institucional"}
        subtitle="Preencha os campos abaixo para atualizar as informações públicas do clube."
        fields={getFields()}
        draft={draft}
        setDraft={setDraft}
        onSave={handleSave}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  const currentList =
    subSection === "historia"
      ? historia
      : subSection === "palmares"
      ? palmares
      : subSection === "instalacoes"
      ? instalacoes
      : subSection === "hospitalidade"
      ? hospitalidade
      : subSection === "precosSocios"
      ? precosSocios
      : subSection === "precosLugarAnual"
      ? precosLugarAnual
      : contactos;

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-foreground font-display text-2xl uppercase tracking-tight">CONTEÚDOS INSTITUCIONAIS & INSTALAÇÕES</h1>
          <p className="text-muted-foreground text-xs font-mono">
            Gerir História, Palmarés, Estádio, Hospitalidade, Tabelas de Preços e Contactos do CD Aves
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center justify-center gap-2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          <Plus size={14} /> Adicionar Registo
        </button>
      </div>

      {/* Selector de Sub-Secções */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border pb-3">
        <button
          onClick={() => setSubSection("historia")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-all ${
            subSection === "historia" ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          <History size={14} /> História ({historia.length})
        </button>
        <button
          onClick={() => setSubSection("palmares")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-all ${
            subSection === "palmares" ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          <Trophy size={14} /> Palmarés ({palmares.length})
        </button>
        <button
          onClick={() => setSubSection("instalacoes")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-all ${
            subSection === "instalacoes" ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          <Building2 size={14} /> Estádio & Instalações ({instalacoes.length})
        </button>
        <button
          onClick={() => setSubSection("hospitalidade")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-all ${
            subSection === "hospitalidade" ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          <Award size={14} /> Hospitalidade & VIP ({hospitalidade.length})
        </button>
        <button
          onClick={() => setSubSection("precosSocios")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-all ${
            subSection === "precosSocios" ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          <ShieldCheck size={14} /> Preços Quotas ({precosSocios.length})
        </button>
        <button
          onClick={() => setSubSection("precosLugarAnual")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-all ${
            subSection === "precosLugarAnual" ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          <Ticket size={14} /> Lugar Anual ({precosLugarAnual.length})
        </button>
        <button
          onClick={() => setSubSection("contactos")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-all ${
            subSection === "contactos" ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          <PhoneCall size={14} /> Contactos ({contactos.length})
        </button>
      </div>

      {/* Lista de Registos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {currentList.map((row) => (
          <div key={String(row.id)} className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-display text-base uppercase text-foreground leading-tight">
                  {String(row.titulo || row.nome || row.categoria || row.sector || row.departamento || "Sem Título")}
                </h3>
                {row.ano && <span className="text-xs font-mono text-primary font-bold">Ano: {String(row.ano)}</span>}
                {row.epoca && <span className="text-xs font-mono text-accent font-bold"> Época {String(row.epoca)}</span>}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => openEdit(row)} className="text-muted-foreground hover:text-foreground p-1 rounded hover:bg-secondary">
                  <Edit2 size={14} />
                </button>
                <button onClick={() => handleDelete(row.id)} className="text-muted-foreground hover:text-destructive p-1 rounded hover:bg-secondary">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {row.descricao && <p className="text-xs text-muted-foreground line-clamp-3">{String(row.descricao)}</p>}
            {row.servicos && <p className="text-xs text-muted-foreground line-clamp-3 font-mono">{String(row.servicos)}</p>}

            <div className="text-xs font-mono text-muted-foreground border-t border-border pt-3 space-y-1">
              {row.capacidade && (
                <p>
                  <span className="text-slate-400">Capacidade:</span> <strong className="text-foreground">{String(row.capacidade)}</strong>
                </p>
              )}
              {row.preco && (
                <p>
                  <span className="text-slate-400">Preço:</span> <strong className="text-primary font-bold">{String(row.preco)}</strong>
                </p>
              )}
              {row.email && (
                <p>
                  <span className="text-slate-400">E-mail:</span> <strong className="text-foreground">{String(row.email)}</strong>
                </p>
              )}
              {row.telefone && (
                <p>
                  <span className="text-slate-400">Telefone:</span> <strong className="text-foreground">{String(row.telefone)}</strong>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
