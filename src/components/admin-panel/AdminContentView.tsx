import { AdminJogosView } from "./AdminJogosView";
import { AdminArtigosView } from "./AdminArtigosView";
import { AdminFutebolEquipasView } from "./AdminFutebolEquipasView";
import { AdminFutebolAtletasView } from "./AdminFutebolAtletasView";
import { AdminModalidadesView } from "./AdminModalidadesView";
import { AdminPaginasView } from "./AdminPaginasView";
import { AdminPatrociniosView } from "./AdminPatrociniosView";
import { AdminMultimediaFotosView } from "./AdminMultimediaFotosView";
import { AdminMultimediaVideosView } from "./AdminMultimediaVideosView";
import { AdminMediaCategoriasView } from "./AdminMediaCategoriasView";
import { AdminSociosView } from "./AdminSociosView";
import { AdminContactosView } from "./AdminContactosView";
import { AdminDesignView } from "./AdminDesignView";
import { AdminCtasView } from "./AdminCtasView";

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
    case "institucional":
      return <AdminPaginasView />;

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

    default:
      return null;
  }
}
