import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";

export const Route = createFileRoute("/admin/noticias")({
  head: () => ({
    meta: [
      { title: "Gestão de notícias · CD Aves" },
      { name: "description", content: "Criar, editar e eliminar artigos de notícias do clube." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Gestão de notícias · CD Aves" },
      { property: "og:description", content: "Backoffice de notícias do clube." },
    ],
  }),
  component: () => (
    <ResourceManager
      slice="noticias"
      title="Notícias"
      singular="Artigo"
      description="Artigos publicados na página de notícias e destacados na homepage."
      fields={[
        { key: "titulo", label: "Título" },
        { key: "data", label: "Data" },
        { key: "categoria", label: "Categoria", type: "select", options: ["Equipa A", "Mercado", "Modalidades", "Sócios", "Clube", "Corporate"] },
        { key: "resumo", label: "Resumo", type: "textarea" },
      ]}
    />
  ),
});
