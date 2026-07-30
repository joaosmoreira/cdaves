import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { useAdmin } from "@/admin/store";

export const Route = createFileRoute("/admin/modalidades/equipas")({
  head: () => ({
    meta: [
      { title: "Equipas das modalidades · CD Aurirrubro" },
      { name: "description", content: "Gerir as equipas e escalões de cada modalidade do clube." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Equipas das modalidades · CD Aurirrubro" },
      { property: "og:description", content: "Backoffice das equipas das modalidades." },
    ],
  }),
  component: ModalidadeEquipas,
});

function ModalidadeEquipas() {
  const modalidades = useAdmin((s) => s.modalidades).map((m) => String(m.nome));

  return (
    <ResourceManager
      slice="modalidadeEquipas"
      title="Equipas das modalidades"
      singular="Equipa"
      description="Cada modalidade pode ter várias equipas e escalões."
      fields={[
        { key: "nome", label: "Nome da equipa" },
        { key: "modalidade", label: "Modalidade", type: "select", options: modalidades },
        { key: "escalao", label: "Escalão", type: "select", options: ["Seniores", "Sub-23", "Sub-19", "Sub-16", "Formação", "Feminino"] },
        { key: "treinador", label: "Treinador" },
        { key: "competicao", label: "Competição" },
      ]}
    />
  );
}
