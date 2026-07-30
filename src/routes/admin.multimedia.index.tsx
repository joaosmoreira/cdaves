import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { useAdmin } from "@/admin/store";

export const Route = createFileRoute("/admin/multimedia/")({
  head: () => ({
    meta: [
      { title: "Gestão de multimédia · CD Aurirrubro" },
      { name: "description", content: "Adicionar fotos e vídeos do clube e organizá-los por categoria." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Gestão de multimédia · CD Aurirrubro" },
      { property: "og:description", content: "Backoffice de fotos e vídeos." },
    ],
  }),
  component: MultimediaAdmin,
});

function MultimediaAdmin() {
  const categorias = useAdmin((s) => s.mediaCategorias).map((c) => String(c.nome));

  return (
    <ResourceManager
      slice="media"
      title="Fotos e vídeos"
      singular="Item"
      description="Conteúdos da galeria multimédia. Escolha a categoria para separar institucional, assembleias e jogos."
      fields={[
        { key: "titulo", label: "Título" },
        { key: "tipo", label: "Tipo", type: "select", options: ["Foto", "Vídeo"] },
        { key: "categoria", label: "Categoria", type: "select", options: categorias },
        { key: "data", label: "Data" },
        { key: "url", label: "Link do vídeo" },
        { key: "ficheiro", label: "Ficheiro (foto)", type: "image" },
      ]}
    />
  );
}
