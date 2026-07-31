import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";

export const Route = createFileRoute("/admin/multimedia/categorias")({
  head: () => ({
    meta: [
      { title: "Categorias de multimédia · CD Aves" },
      { name: "description", content: "Criar categorias para separar conteúdos institucionais, assembleias e jogos." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Categorias de multimédia · CD Aves" },
      { property: "og:description", content: "Backoffice das categorias da galeria." },
    ],
  }),
  component: () => (
    <ResourceManager
      slice="mediaCategorias"
      title="Categorias de multimédia"
      singular="Categoria"
      description="As categorias criadas aqui ficam disponíveis ao adicionar fotos e vídeos."
      fields={[
        { key: "nome", label: "Nome da categoria" },
        { key: "descricao", label: "Descrição", type: "textarea" },
      ]}
    />
  ),
});
