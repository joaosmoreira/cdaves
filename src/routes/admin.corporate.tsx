import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";

export const Route = createFileRoute("/admin/corporate")({
  head: () => ({
    meta: [
      { title: "Gestão de patrocínios · CD Aurirrubro" },
      { name: "description", content: "Adicionar e editar patrocinadores e parceiros, incluindo o logotipo da empresa." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Gestão de patrocínios · CD Aurirrubro" },
      { property: "og:description", content: "Backoffice de parceiros e patrocínios." },
    ],
  }),
  component: () => (
    <ResourceManager
      slice="patrocinios"
      title="Patrocínios e parceiros"
      singular="Patrocínio"
      description="Marcas apresentadas na página Corporate. Pode carregar o logotipo de cada empresa."
      fields={[
        { key: "nome", label: "Empresa" },
        { key: "tipo", label: "Tipo de parceria", type: "select", options: ["Main Sponsor", "Patrocinador Oficial", "Equipamento", "Parceiro Médico", "Media Partner", "Parceiro", "Parceiro Local"] },
        { key: "site", label: "Website" },
        { key: "logotipo", label: "Logotipo", type: "image" },
      ]}
    />
  ),
});
