import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { useAdmin } from "@/admin/store";

export const Route = createFileRoute("/admin/futebol/atletas")({
  head: () => ({
    meta: [
      { title: "Gestão de atletas de futebol · CD Aurirrubro" },
      { name: "description", content: "Gerir jogadores de futebol: número, posição, idade e fotografia." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Gestão de atletas de futebol · CD Aurirrubro" },
      { property: "og:description", content: "Backoffice dos jogadores de futebol." },
    ],
  }),
  component: FutebolAtletas,
});

function FutebolAtletas() {
  const equipas = useAdmin((s) => s.equipas.map((e) => String(e.nome)));

  return (
    <ResourceManager
      slice="jogadores"
      title="Atletas de futebol"
      singular="Atleta"
      description="Jogadores apresentados nas páginas de plantel e nas fichas individuais."
      fields={[
        { key: "nome", label: "Nome" },
        { key: "equipa", label: "Equipa", type: "select", options: equipas },
        { key: "numero", label: "Número", type: "number" },
        { key: "posicao", label: "Posição" },
        { key: "idade", label: "Idade", type: "number" },
        { key: "nacionalidade", label: "Nacionalidade" },
        { key: "foto", label: "Fotografia", type: "image" },
      ]}
    />
  );
}
