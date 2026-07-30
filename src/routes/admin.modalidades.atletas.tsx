import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { useAdmin } from "@/admin/store";

export const Route = createFileRoute("/admin/modalidades/atletas")({
  head: () => ({
    meta: [
      { title: "Atletas das modalidades · CD Aurirrubro" },
      { name: "description", content: "Gerir os atletas de futsal, andebol, basquetebol, atletismo, natação e ténis de mesa." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Atletas das modalidades · CD Aurirrubro" },
      { property: "og:description", content: "Backoffice dos atletas das modalidades." },
    ],
  }),
  component: ModalidadeAtletas,
});

function ModalidadeAtletas() {
  const modalidades = useAdmin((s) => s.modalidades.map((m) => String(m.nome)));
  const equipas = useAdmin((s) => s.modalidadeEquipas.map((e) => String(e.nome)));

  return (
    <ResourceManager
      slice="atletas"
      title="Atletas das modalidades"
      singular="Atleta"
      description="Atletas apresentados nas páginas de equipa e nas fichas individuais das modalidades."
      fields={[
        { key: "nome", label: "Nome" },
        { key: "modalidade", label: "Modalidade", type: "select", options: modalidades },
        { key: "equipa", label: "Equipa", type: "select", options: equipas },
        { key: "numero", label: "Número", type: "number" },
        { key: "posicao", label: "Posição" },
        { key: "idade", label: "Idade", type: "number" },
        { key: "foto", label: "Fotografia", type: "image" },
      ]}
    />
  );
}
