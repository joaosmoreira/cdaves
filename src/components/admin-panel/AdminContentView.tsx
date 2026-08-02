import { AdminJogosView } from "./AdminJogosView";
import { AdminArtigosView } from "./AdminArtigosView";
import { AdminFutebolEquipasView } from "./AdminFutebolEquipasView";
import { AdminFutebolAtletasView } from "./AdminFutebolAtletasView";
import { AdminModalidadesView } from "./AdminModalidadesView";
import { AdminPaginasView } from "./AdminPaginasView";
import { AdminInstitucionalView } from "./AdminInstitucionalView";
import { AdminPatrociniosView } from "./AdminPatrociniosView";
import { AdminMultimediaFotosView } from "./AdminMultimediaFotosView";
import { AdminMultimediaVideosView } from "./AdminMultimediaVideosView";
import { AdminMediaCategoriasView } from "./AdminMediaCategoriasView";
import { AdminSociosView } from "./AdminSociosView";
import { AdminContactosView } from "./AdminContactosView";
import { AdminDesignView } from "./AdminDesignView";
import { AdminCtasView } from "./AdminCtasView";
import { AdminUtilizadoresView } from "./AdminUtilizadoresView";

type ContentProps = {
  tabId: string;
};

export function AdminContentView({ tabId }: ContentProps) {
  switch (tabId) {
    case "jogos":
      return <AdminJogosView />;

    case "artigos":
      return <AdminArtigosView />;

    case "futebol-equipas":
      return <AdminFutebolEquipasView />;

    case "futebol-atletas":
      return <AdminFutebolAtletasView />;

    case "modalidades":
    case "modalidades-equipas":
    case "modalidades-atletas":
      return <AdminModalidadesView />;

    case "paginas":
      return <AdminPaginasView />;

    case "institucional":
      return <AdminInstitucionalView />;

    case "ctas":
      return <AdminCtasView />;

    case "patrocinios":
      return <AdminPatrociniosView />;

    case "fotos":
      return <AdminMultimediaFotosView />;

    case "media-categorias":
      return <AdminMediaCategoriasView />;

    case "videos":
      return <AdminMultimediaVideosView />;

    case "socios":
      return <AdminSociosView />;

    case "design":
      return <AdminDesignView />;

    case "contactos":
      return <AdminContactosView />;

    case "utilizadores":
      return <AdminUtilizadoresView />;

    case "socios-pagamentos":
      return (
        <div className="bg-card border border-border rounded-xl p-8 space-y-4">
          <h2 className="font-display text-xl uppercase text-foreground">CONFIGURAÇÃO DE MÉTODOS DE PAGAMENTO (SÓCIOS)</h2>
          <p className="text-muted-foreground text-xs font-mono">
            Módulo em preparação: Gestão de IBAN, Multibanco, MB WAY, Débito Direto e Gateway de Pagamentos.
          </p>
        </div>
      );

    case "perfis":
      return (
        <div className="bg-card border border-border rounded-xl p-8 space-y-4">
          <h2 className="font-display text-xl uppercase text-foreground">PERFIS E PERMISSÕES (RBAC)</h2>
          <p className="text-muted-foreground text-xs font-mono">
            Módulo em preparação: Gestão de funções (Super Admin, Editor de Notícias, Gestor de Modalidades, Gestor de Sócios).
          </p>
        </div>
      );

    default:
      return null;
  }
}
