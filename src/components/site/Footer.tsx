import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { CLUB } from "@/data/club";
import logo from "@/assets/logo-cd.png";

const COLUMNS = [
  {
    title: "Clube",
    links: [
      { label: "História", to: "/clube/historia" },
      { label: "Notícias", to: "/noticias" },
      { label: "Contactos", to: "/contactos" },
      { label: "Estádio", to: "/clube/estadio" },
    ],
  },
  {
    title: "Desporto",
    links: [
      { label: "Futebol", to: "/futebol" },
      { label: "Plantel Equipa A", to: "/futebol/equipa-a" },
      { label: "Modalidades", to: "/modalidades" },
      { label: "Formação", to: "/futebol" },
    ],
  },
  {
    title: "Sócios",
    links: [
      { label: "Quotas", to: "/socios" },
      { label: "Lugar Anual", to: "/socios" },
      { label: "Benefícios", to: "/socios" },
      { label: "Bilhetes", to: "/socios" },
    ],
  },
  {
    title: "Corporate",
    links: [
      { label: "Parceiros", to: "/corporate" },
      { label: "Patrocínios", to: "/corporate" },
      { label: "Hospitalidade", to: "/corporate" },
      { label: "Multimédia", to: "/multimedia" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <img src={logo} alt={`Emblema do ${CLUB.name}`} width={816} height={816} className="h-11 w-11 object-contain" />
              <span className="font-display text-xl uppercase leading-none">{CLUB.fullName}</span>
            </div>
            <p className="mt-4 max-w-sm text-sm opacity-70">
              Fundado em {CLUB.founded}. Vermelho e branco desde o primeiro dia, com o bairro,
              a formação e os sócios como pilares do clube.
            </p>
            <ul className="mt-6 space-y-2 text-sm opacity-80">
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4" />{CLUB.address}</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" />{CLUB.phone}</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" />{CLUB.email}</li>
            </ul>
            <div className="mt-6 flex gap-3">
              {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
                <span
                  key={i}
                  className="grid h-9 w-9 place-items-center rounded-sm border border-background/25 transition-colors hover:bg-primary hover:border-primary"
                >
                  <Icon className="h-4 w-4" />
                </span>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-sm uppercase tracking-widest text-background">{col.title}</h3>
              <ul className="mt-4 space-y-2 text-sm opacity-75">
                {col.links.map((l, i) => (
                  <li key={i}>
                    <Link to={l.to} className="transition-opacity hover:opacity-100 hover:text-accent">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-background/15 pt-6 text-xs opacity-60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {CLUB.fullName}. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <span>Política de Privacidade</span>
            <span>Termos e Condições</span>
            <span>Livro de Reclamações</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
