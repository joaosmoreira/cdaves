import { toast } from "sonner";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateSettings, useAdmin } from "@/admin/store";

type ContentProps = {
  tabId: string;
};

export function AdministratorContentView({ tabId }: ContentProps) {
  const settings = useAdmin((s) => s.settings);
  const mediaCategorias = useAdmin((s) => (s.mediaCategorias ?? []).map((c) => String(c.nome)));

  switch (tabId) {
    case "jogos":
      return (
        <ResourceManager
          slice="jogos"
          title="Jogos e Resultados"
          singular="Jogo"
          description="O bloco da homepage mostra o próximo jogo; se não existir, mostra o último jogo."
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
      );

    case "artigos":
      return (
        <ResourceManager
          slice="noticias"
          title="Artigos e Notícias"
          singular="Artigo"
          description="Artigos publicados na página de notícias e destacados na homepage."
          fields={[
            { key: "titulo", label: "Título" },
            { key: "data", label: "Data" },
            { key: "categoria", label: "Categoria", type: "select", options: ["Equipa A", "Mercado", "Modalidades", "Sócios", "Clube", "Corporate"] },
            { key: "resumo", label: "Resumo", type: "textarea" },
          ]}
        />
      );

    case "futebol-equipas":
      return (
        <ResourceManager
          slice="equipas"
          title="Equipas de Futebol"
          singular="Equipa"
          description="Equipas de futebol do clube (Equipa A, Sub-23, Sub-19, Feminino)."
          fields={[
            { key: "nome", label: "Nome da equipa" },
            { key: "competicao", label: "Competição" },
            { key: "treinador", label: "Treinador principal" },
          ]}
        />
      );

    case "futebol-atletas":
      return (
        <ResourceManager
          slice="jogadores"
          title="Atletas de Futebol"
          singular="Atleta"
          description="Plantel de atletas de futebol."
          fields={[
            { key: "nome", label: "Nome público" },
            { key: "equipa", label: "Equipa", type: "select", options: ["Equipa A", "Sub-23", "Sub-19", "Equipa Feminina"] },
            { key: "numero", label: "Número", type: "number" },
            { key: "posicao", label: "Posição" },
            { key: "idade", label: "Idade", type: "number" },
            { key: "nacionalidade", label: "Nacionalidade" },
            { key: "foto", label: "Foto do atleta", type: "image" },
          ]}
        />
      );

    case "modalidades":
      return (
        <ResourceManager
          slice="modalidades"
          title="Modalidades Desportivas"
          singular="Modalidade"
          description="Seções de modalidades do clube."
          fields={[
            { key: "nome", label: "Nome da modalidade" },
            { key: "descricao", label: "Descrição", type: "textarea" },
            { key: "recinto", label: "Instalação / Pavilhão" },
          ]}
        />
      );

    case "modalidades-equipas":
      return (
        <ResourceManager
          slice="modalidadeEquipas"
          title="Equipas de Modalidades"
          singular="Equipa"
          fields={[
            { key: "modalidade", label: "Modalidade" },
            { key: "nome", label: "Nome da equipa" },
            { key: "escalao", label: "Escalão / Categoria" },
            { key: "treinador", label: "Treinador" },
          ]}
        />
      );

    case "modalidades-atletas":
      return (
        <ResourceManager
          slice="atletas"
          title="Atletas de Modalidades"
          singular="Atleta"
          fields={[
            { key: "nome", label: "Nome do atleta" },
            { key: "modalidade", label: "Modalidade" },
            { key: "equipa", label: "Equipa" },
            { key: "posicao", label: "Posição / Função" },
          ]}
        />
      );

    case "paginas":
      return (
        <ResourceManager
          slice="clubePaginas"
          title="Páginas do Clube"
          singular="Página"
          description="Conteúdo das páginas História, Estádio e Presidente."
          fields={[
            { key: "pagina", label: "Página", type: "select", options: ["História", "Estádio", "Presidente"] },
            { key: "resumo", label: "Resumo", type: "textarea" },
            { key: "conteudo", label: "Conteúdo", type: "textarea", hideInTable: true },
          ]}
        />
      );

    case "institucional":
      return (
        <ResourceManager
          slice="institucional"
          title="Secções Institucionais"
          singular="Secção"
          description="Secções do accordion da página Institucional."
          fields={[
            { key: "seccao", label: "Secção" },
            { key: "conteudo", label: "Conteúdo", type: "textarea" },
          ]}
        />
      );

    case "patrocinios":
      return (
        <ResourceManager
          slice="patrocinios"
          title="Patrocínios e Parceiros"
          singular="Patrocínio"
          description="Marcas apresentadas na página Corporate. Pode carregar o logotipo de cada empresa."
          fields={[
            { key: "nome", label: "Empresa" },
            { key: "tipo", label: "Tipo de parceria", type: "select", options: ["Main Sponsor", "Patrocinador Oficial", "Equipamento", "Parceiro Médico", "Media Partner", "Parceiro", "Parceiro Local"] },
            { key: "site", label: "Website" },
            { key: "logotipo", label: "Logotipo", type: "image" },
          ]}
        />
      );

    case "fotos":
    case "videos":
      return (
        <ResourceManager
          slice="media"
          title={tabId === "fotos" ? "Galeria de Fotografias" : "Galeria de Vídeos"}
          singular={tabId === "fotos" ? "Fotografia" : "Vídeo"}
          fields={[
            { key: "titulo", label: "Título" },
            { key: "tipo", label: "Tipo", type: "select", options: ["Foto", "Vídeo"] },
            { key: "categoria", label: "Categoria", type: "select", options: mediaCategorias },
            { key: "data", label: "Data" },
            { key: "url", label: "Link do vídeo" },
            { key: "ficheiro", label: "Ficheiro (foto)", type: "image" },
          ]}
        />
      );

    case "media-categorias":
      return (
        <ResourceManager
          slice="mediaCategorias"
          title="Categorias de Multimédia"
          singular="Categoria"
          fields={[{ key: "nome", label: "Nome da categoria" }]}
        />
      );

    case "socios":
      return (
        <div className="space-y-12">
          <section className="rounded-lg border border-border bg-card p-6">
            <h3 className="font-display text-xl uppercase text-foreground">Definições da Quota de Sócios</h3>
            <form
              className="mt-6 grid gap-5 md:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Dados de sócios guardados.");
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="quota">Quota mensal (€)</Label>
                <Input
                  id="quota"
                  type="number"
                  step="0.01"
                  value={settings.quota}
                  onChange={(e) => updateSettings({ quota: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="moeda">Moeda</Label>
                <Input id="moeda" value={settings.moeda} onChange={(e) => updateSettings({ moeda: e.target.value })} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="nota">Métodos de pagamento</Label>
                <Textarea
                  id="nota"
                  rows={3}
                  value={settings.notaPagamento}
                  onChange={(e) => updateSettings({ notaPagamento: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <Button type="submit">Guardar Quota</Button>
              </div>
            </form>
          </section>

          <ResourceManager
            slice="planos"
            title="Modalidades de pagamento"
            singular="Plano"
            fields={[
              { key: "nome", label: "Nome do plano" },
              { key: "meses", label: "Meses", type: "number" },
              { key: "desconto", label: "Desconto" },
              { key: "nota", label: "Nota", type: "textarea" },
            ]}
          />

          <ResourceManager
            slice="lugares"
            title="Lugares Anuais"
            singular="Lugar Anual"
            fields={[
              { key: "nome", label: "Designação" },
              { key: "bancada", label: "Bancada" },
              { key: "preco", label: "Preço", type: "number" },
              { key: "descricao", label: "Descrição", type: "textarea" },
            ]}
          />
        </div>
      );

    case "contactos":
      return (
        <div className="space-y-12">
          <section className="rounded-lg border border-border bg-card p-6">
            <h3 className="font-display text-xl uppercase text-foreground">Definições Gerais de Contacto</h3>
            <form
              className="mt-6 grid gap-5 md:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Contactos guardados.");
              }}
            >
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="morada">Morada do Clube</Label>
                <Textarea id="morada" rows={2} value={settings.morada} onChange={(e) => updateSettings({ morada: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" value={settings.telefone} onChange={(e) => updateSettings({ telefone: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emailGeral">Email Geral</Label>
                <Input id="emailGeral" type="email" value={settings.emailGeral} onChange={(e) => updateSettings({ emailGeral: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <Button type="submit">Guardar Geral</Button>
              </div>
            </form>
          </section>

          <ResourceManager
            slice="emails"
            title="Emails por Departamento"
            singular="Email"
            fields={[
              { key: "departamento", label: "Departamento" },
              { key: "email", label: "Endereço de email" },
            ]}
          />

          <ResourceManager
            slice="horarios"
            title="Horários de Funcionamento"
            singular="Horário"
            fields={[
              { key: "servico", label: "Serviço" },
              { key: "dias", label: "Dias" },
              { key: "horario", label: "Horário" },
            ]}
          />
        </div>
      );

    default:
      return null;
  }
}
