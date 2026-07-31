import { AdminJogosView } from "./AdminJogosView";
import { AdminArtigosView } from "./AdminArtigosView";
import { AdminFutebolEquipasView } from "./AdminFutebolEquipasView";
import { AdminFutebolAtletasView } from "./AdminFutebolAtletasView";
import { AdminModalidadesView } from "./AdminModalidadesView";
import { AdminPaginasView } from "./AdminPaginasView";
import { AdminPatrociniosView } from "./AdminPatrociniosView";
import { AdminMultimediaFotosView } from "./AdminMultimediaFotosView";
import { AdminMultimediaVideosView } from "./AdminMultimediaVideosView";
import { AdminSociosView } from "./AdminSociosView";
import { AdminContactosView } from "./AdminContactosView";

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

    case "patrocinios":
      return <AdminPatrociniosView />;

    case "fotos":
    case "media-categorias":
      return <AdminMultimediaFotosView />;

    case "videos":
      return <AdminMultimediaVideosView />;

    case "socios":
      return <AdminSociosView />;

    case "contactos":
      return <AdminContactosView />;

    default:
      return null;
  }
}
