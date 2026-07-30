import player1 from "@/assets/player-1.jpg";
import player2 from "@/assets/player-2.jpg";
import player3 from "@/assets/player-3.jpg";
import player4 from "@/assets/player-4.jpg";

export const CLUB = {
  name: "CD Aurirrubro",
  fullName: "Clube Desportivo Aurirrubro",
  founded: 1919,
  stadium: "Estádio Municipal do Aurirrubro",
  address: "Rua do Estádio, 19 · 4400-000 Vila Nova",
  phone: "+351 220 000 019",
  email: "geral@cdaurirrubro.pt",
};

export type Player = {
  slug: string;
  name: string;
  fullName: string;
  number: number;
  position: string;
  age: number;
  birth: string;
  nationality: string;
  height: string;
  weight: string;
  foot: string;
  since: string;
  photo: string;
  bio: string;
  stats: { games: number; goals: number; assists: number; minutes: number };
};

const photos = [player1, player2, player3, player4];

function make(
  slug: string,
  name: string,
  fullName: string,
  number: number,
  position: string,
  age: number,
  nationality: string,
  i: number,
  stats: Player["stats"],
): Player {
  return {
    slug,
    name,
    fullName,
    number,
    position,
    age,
    birth: `${2026 - age}`,
    nationality,
    height: `1,${72 + (number % 15)} m`,
    weight: `${68 + (number % 14)} kg`,
    foot: number % 3 === 0 ? "Esquerdo" : "Direito",
    since: `${2019 + (number % 6)}`,
    photo: photos[i % photos.length],
    bio: `${name} chegou ao ${CLUB.name} vindo da formação regional e afirmou-se rapidamente como uma peça de confiança do plantel. Trabalhador, competitivo e muito ligado aos adeptos, é um dos rostos do projeto desportivo do clube.`,
    stats,
  };
}

export const SQUAD: Player[] = [
  make("rui-teixeira", "Rui Teixeira", "Rui Manuel Teixeira", 1, "Guarda-redes", 31, "Portugal", 2, { games: 28, goals: 0, assists: 0, minutes: 2520 }),
  make("diogo-matos", "Diogo Matos", "Diogo Almeida Matos", 2, "Defesa direito", 24, "Portugal", 0, { games: 26, goals: 1, assists: 4, minutes: 2210 }),
  make("amadou-sow", "Amadou Sow", "Amadou Ibrahima Sow", 4, "Defesa central", 27, "Senegal", 1, { games: 30, goals: 3, assists: 1, minutes: 2700 }),
  make("tomas-pinho", "Tomás Pinho", "Tomás Ferreira Pinho", 5, "Defesa central", 22, "Portugal", 3, { games: 19, goals: 2, assists: 0, minutes: 1540 }),
  make("bruno-alves", "Bruno Alves", "Bruno Miguel Alves", 6, "Médio defensivo", 29, "Portugal", 0, { games: 27, goals: 1, assists: 3, minutes: 2380 }),
  make("kevin-mendes", "Kevin Mendes", "Kevin dos Santos Mendes", 8, "Médio centro", 25, "Cabo Verde", 1, { games: 24, goals: 5, assists: 6, minutes: 1980 }),
  make("joao-serra", "João Serra", "João Pedro Serra", 10, "Médio ofensivo", 26, "Portugal", 3, { games: 29, goals: 9, assists: 11, minutes: 2510 }),
  make("iker-navarro", "Iker Navarro", "Iker Navarro Ruiz", 11, "Extremo esquerdo", 23, "Espanha", 0, { games: 25, goals: 7, assists: 5, minutes: 1870 }),
  make("marco-leal", "Marco Leal", "Marco António Leal", 7, "Extremo direito", 28, "Brasil", 1, { games: 31, goals: 12, assists: 7, minutes: 2640 }),
  make("henrique-sa", "Henrique Sá", "Henrique Duarte Sá", 9, "Avançado", 30, "Portugal", 3, { games: 30, goals: 18, assists: 4, minutes: 2450 }),
  make("nuno-barreto", "Nuno Barreto", "Nuno Filipe Barreto", 12, "Guarda-redes", 20, "Portugal", 2, { games: 6, goals: 0, assists: 0, minutes: 540 }),
  make("simao-costa", "Simão Costa", "Simão Rodrigues Costa", 21, "Lateral esquerdo", 21, "Portugal", 0, { games: 22, goals: 0, assists: 5, minutes: 1780 }),
];

export const TEAMS = [
  { slug: "equipa-a", name: "Equipa A", competition: "Liga Nacional", coach: "Sérgio Nogueira", players: SQUAD.length },
  { slug: "sub-23", name: "Sub-23", competition: "Campeonato Nacional Sub-23", coach: "Paulo Ramires", players: 24 },
  { slug: "sub-19", name: "Sub-19", competition: "Juniores A · 1ª Divisão", coach: "Hugo Mateus", players: 26 },
  { slug: "feminino", name: "Equipa Feminina", competition: "Liga Feminina", coach: "Rita Camacho", players: 22 },
];

export const NEWS = [
  { slug: "vitoria-classico", title: "Vitória no clássico com casa cheia", date: "28 Jul 2026", category: "Equipa A", excerpt: "Triunfo por 2-1 num estádio esgotado, com golos de Henrique Sá e Marco Leal." },
  { slug: "reforco-medio", title: "Kevin Mendes renova até 2029", date: "24 Jul 2026", category: "Mercado", excerpt: "O médio internacional prolongou o vínculo com o clube por mais três temporadas." },
  { slug: "modalidades-andebol", title: "Andebol garante subida de divisão", date: "19 Jul 2026", category: "Modalidades", excerpt: "A equipa sénior de andebol conquistou a promoção a duas jornadas do fim." },
  { slug: "lugares-anuais", title: "Campanha de lugares anuais 2026/27", date: "12 Jul 2026", category: "Sócios", excerpt: "Renovações abertas com condições especiais para sócios com quota em dia." },
  { slug: "academia-obras", title: "Nova ala da academia inaugurada", date: "05 Jul 2026", category: "Clube", excerpt: "Mais dois campos relvados e um ginásio dedicado à formação." },
  { slug: "parceria-energia", title: "Novo parceiro oficial de energia", date: "01 Jul 2026", category: "Corporate", excerpt: "Acordo de três épocas que reforça a sustentabilidade do estádio." },
];

export const MODALIDADES = [
  { name: "Futsal", athletes: 68, desc: "Seniores masculinos e femininos e cinco escalões de formação." },
  { name: "Andebol", athletes: 92, desc: "Uma das modalidades históricas do clube, com presença nacional." },
  { name: "Basquetebol", athletes: 74, desc: "Formação forte e equipa sénior nos campeonatos distritais." },
  { name: "Atletismo", athletes: 55, desc: "Pista e estrada, com atletas presentes em provas internacionais." },
  { name: "Natação", athletes: 130, desc: "Escola de natação e equipa de competição na piscina municipal." },
  { name: "Ténis de Mesa", athletes: 31, desc: "Núcleo competitivo com títulos regionais em várias categorias." },
];

export const PARTNERS = [
  { name: "Nortenergia", tier: "Main Sponsor" },
  { name: "Banco Atlântico", tier: "Patrocinador Oficial" },
  { name: "Grupo Vilar", tier: "Patrocinador Oficial" },
  { name: "SportWear PT", tier: "Equipamento" },
  { name: "Clínica Vitalis", tier: "Parceiro Médico" },
  { name: "Rádio Cidade", tier: "Media Partner" },
  { name: "Construtora Ribeira", tier: "Parceiro" },
  { name: "Café Central", tier: "Parceiro Local" },
];

export const MEMBERSHIPS = [
  { name: "Sócio Base", price: "5€/mês", perks: ["Cartão de sócio digital", "Descontos na loja oficial", "Newsletter exclusiva"] },
  { name: "Sócio Aurirrubro", price: "12€/mês", perks: ["Tudo do Base", "Prioridade em jogos fora", "Visita guiada ao estádio", "Desconto no lugar anual"] },
  { name: "Sócio Fundador", price: "25€/mês", perks: ["Tudo do Aurirrubro", "Convites para eventos do clube", "Acesso à sala de sócios", "Merchandising anual"] },
];

export const SEATS = [
  { zone: "Bancada Nascente", price: "180€", desc: "Central, coberta, a melhor vista de jogo." },
  { zone: "Bancada Poente", price: "150€", desc: "Coberta, junto às zonas de aquecimento." },
  { zone: "Topo Norte", price: "95€", desc: "A casa da claque, ambiente garantido." },
  { zone: "Topo Sul", price: "95€", desc: "Zona familiar com preços reduzidos para jovens." },
];
