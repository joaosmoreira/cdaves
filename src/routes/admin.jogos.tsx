import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";

export const Route = createFileRoute("/admin/jogos")({
  head: () => ({
    meta: [
      { title: "Gestão de jogos · CD Aurirrubro" },
      { name: "description", content: "Definir o próximo jogo e o resultado do último jogo apresentados na homepage." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Gestão de jogos · CD Aurirrubro" },
      { property: "og:description", content: "Backoffice de próximo jogo e último resultado." },
    ],
  }),
  component: JogosAdmin,
});

function JogosAdmin() {
  return (
    <div className="space-y-8">
      <ResourceManager
        slice="jogos"
        title="Jogos"
        singular="Jogo"
        description="O bloco da homepage mostra o próximo jogo; se não existir, mostra o último jogo. Em casa, o clube aparece à esquerda; fora, à direita."
        fields={[
          { key: "tipo", label: "Tipo", type: "select", options: ["Próximo jogo", "Último jogo"] },
          { key: "adversario", label: "Adversário" },
          { key: "logo", label: "Logótipo do adversário", type: "image" },
          { key: "local", label: "Casa ou fora", type: "select", options: ["Casa", "Fora"] },
          { key: "competicao", label: "Competição", type: "select", options: ["Liga Portugal", "Taça da Liga", "Taça de Portugal"] },
          { key: "data", label: "Data" },
          { key: "hora", label: "Hora (próximo jogo)" },
          { key: "estadio", label: "Estádio" },
          { key: "resultado", label: "Resultado (último jogo)" },
        ]}
      />
    </div>
  );
}
