import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";

export const Route = createFileRoute("/admin/clube")({
  head: () => ({
    meta: [
      { title: "Gestão do Clube · CD Aves" },
      { name: "description", content: "Editar as páginas de História, Estádio, Presidente e as secções institucionais." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Gestão do Clube · CD Aves" },
      { property: "og:description", content: "Backoffice das páginas institucionais." },
    ],
  }),
  component: ClubeAdmin,
});

function ClubeAdmin() {
  return (
    <div className="space-y-14">
      <ResourceManager
        slice="clubePaginas"
        title="Páginas do Clube"
        singular="Página"
        description="Conteúdo das páginas História, Estádio e Presidente."
        fields={[
          { key: "pagina", label: "Página", type: "select", options: ["História", "Estádio", "Presidente"] },
          { key: "resumo", label: "Resumo", type: "textarea" },
          { key: "conteudo", label: "Conteúdo", type: "textarea", hideInTable: true },
        ]}
      />

      <ResourceManager
        slice="institucional"
        title="Institucional"
        singular="Secção"
        description="Secções do accordion da página Institucional."
        fields={[
          { key: "seccao", label: "Secção" },
          { key: "conteudo", label: "Conteúdo", type: "textarea" },
        ]}
      />
    </div>
  );
}
