import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";

export const Route = createFileRoute("/admin/futebol/equipas")({
  head: () => ({
    meta: [
      { title: "Gestão de equipas de futebol · CD Aurirrubro" },
      { name: "description", content: "Gerir equipas de futebol do clube: escalões, competições e treinadores." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Gestão de equipas de futebol · CD Aurirrubro" },
      { property: "og:description", content: "Backoffice das equipas de futebol." },
    ],
  }),
  component: () => (
    <ResourceManager
      slice="equipas"
      title="Equipas de futebol"
      singular="Equipa"
      description="Equipas de futebol de 11 apresentadas na secção Futebol."
      fields={[
        { key: "nome", label: "Nome da equipa" },
        { key: "competicao", label: "Competição" },
        { key: "treinador", label: "Treinador" },
        { key: "atletas", label: "Nº de atletas", type: "number" },
      ]}
    />
  ),
});
