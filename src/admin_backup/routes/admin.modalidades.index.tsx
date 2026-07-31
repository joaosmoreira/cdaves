import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";

export const Route = createFileRoute("/admin/modalidades/")({
  head: () => ({
    meta: [
      { title: "Gestão de modalidades · CD Aves" },
      { name: "description", content: "Gerir as modalidades desportivas do clube, treinadores e recintos." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Gestão de modalidades · CD Aves" },
      { property: "og:description", content: "Backoffice das modalidades do clube." },
    ],
  }),
  component: () => (
    <ResourceManager
      slice="modalidades"
      title="Modalidades"
      singular="Modalidade"
      description="Departamentos desportivos do clube listados na secção Modalidades."
      fields={[
        { key: "nome", label: "Nome" },
        { key: "treinador", label: "Treinador" },
        { key: "competicao", label: "Competição" },
        { key: "recinto", label: "Recinto" },
        { key: "atletas", label: "Nº de atletas", type: "number" },
        { key: "descricao", label: "Descrição", type: "textarea" },
      ]}
    />
  ),
});
