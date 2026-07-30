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

export type Athlete = {
  slug: string;
  name: string;
  fullName: string;
  number: number;
  position: string;
  age: number;
  birth: string;
  nationality: string;
  height: string;
  since: string;
  photo: string;
  bio: string;
};

export type Modalidade = {
  slug: string;
  name: string;
  athletes: number;
  desc: string;
  coach: string;
  competition: string;
  venue: string;
  roster: Athlete[];
};

function athlete(
  modalidade: string,
  name: string,
  fullName: string,
  number: number,
  position: string,
  age: number,
  nationality = "Portugal",
): Athlete {
  return {
    slug: name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z]+/g, "-"),
    name,
    fullName,
    number,
    position,
    age,
    birth: `${2026 - age}`,
    nationality,
    height: `1,${68 + (number % 20)} m`,
    since: `${2018 + (number % 8)}`,
    photo: photos[number % photos.length],
    bio: `${name} representa o ${CLUB.name} no ${modalidade} e é um dos atletas de referência do plantel. Formado nos escalões jovens da região, destaca-se pela entrega competitiva e pela ligação ao clube.`,
  };
}

export const MODALIDADES: Modalidade[] = [
  {
    slug: "futsal",
    name: "Futsal",
    athletes: 68,
    desc: "Seniores masculinos e femininos e cinco escalões de formação.",
    coach: "Ricardo Bastos",
    competition: "Campeonato Nacional de Futsal",
    venue: "Pavilhão Municipal do Aurirrubro",
    roster: [
      athlete("futsal", "André Faria", "André Miguel Faria", 1, "Guarda-redes", 29),
      athlete("futsal", "Tiago Melo", "Tiago Sousa Melo", 5, "Fixo", 26),
      athlete("futsal", "Rafa Duarte", "Rafael Duarte Nunes", 7, "Ala", 23),
      athlete("futsal", "Léo Prado", "Leonardo Prado", 9, "Ala", 27, "Brasil"),
      athlete("futsal", "Miguel Antunes", "Miguel Ângelo Antunes", 10, "Pivô", 31),
      athlete("futsal", "Zé Rocha", "José Maria Rocha", 12, "Universal", 21),
    ],
  },
  {
    slug: "andebol",
    name: "Andebol",
    athletes: 92,
    desc: "Uma das modalidades históricas do clube, com presença nacional.",
    coach: "Marta Vilela",
    competition: "Campeonato Nacional de Andebol",
    venue: "Pavilhão Municipal do Aurirrubro",
    roster: [
      athlete("andebol", "Pedro Vaz", "Pedro Nuno Vaz", 1, "Guarda-redes", 30),
      athlete("andebol", "Hugo Lima", "Hugo Alexandre Lima", 4, "Central", 25),
      athlete("andebol", "Nelson Braga", "Nelson Braga Cunha", 6, "Lateral esquerdo", 28),
      athlete("andebol", "Ivan Petrov", "Ivan Petrov", 8, "Lateral direito", 24, "Bulgária"),
      athlete("andebol", "Filipe Nogueira", "Filipe Nogueira Sousa", 11, "Pivô", 27),
      athlete("andebol", "Duarte Reis", "Duarte Reis Antunes", 13, "Ponta", 22),
    ],
  },
  {
    slug: "basquetebol",
    name: "Basquetebol",
    athletes: 74,
    desc: "Formação forte e equipa sénior nos campeonatos distritais.",
    coach: "Carlos Bento",
    competition: "Campeonato Distrital de Basquetebol",
    venue: "Pavilhão Municipal do Aurirrubro",
    roster: [
      athlete("basquetebol", "Rui Cordeiro", "Rui Manuel Cordeiro", 3, "Base", 26),
      athlete("basquetebol", "Jamal Owens", "Jamal Owens", 5, "Extremo", 28, "EUA"),
      athlete("basquetebol", "Vasco Neto", "Vasco Neto Ribeiro", 8, "Poste", 24),
      athlete("basquetebol", "Tomé Aguiar", "Tomé Aguiar Silva", 11, "Ala-poste", 22),
      athlete("basquetebol", "Bruno Pires", "Bruno Pires Gomes", 14, "Base", 20),
    ],
  },
  {
    slug: "atletismo",
    name: "Atletismo",
    athletes: 55,
    desc: "Pista e estrada, com atletas presentes em provas internacionais.",
    coach: "Isabel Freire",
    competition: "Campeonatos Nacionais de Pista e Estrada",
    venue: "Pista Municipal do Aurirrubro",
    roster: [
      athlete("atletismo", "Ana Salgado", "Ana Rita Salgado", 2, "Meio-fundo", 24),
      athlete("atletismo", "Luís Grilo", "Luís Miguel Grilo", 6, "Velocidade", 23),
      athlete("atletismo", "Sara Peixoto", "Sara Peixoto Lopes", 9, "Fundo", 27),
      athlete("atletismo", "Élio Tavares", "Élio Tavares Correia", 12, "Salto em comprimento", 21),
    ],
  },
  {
    slug: "natacao",
    name: "Natação",
    athletes: 130,
    desc: "Escola de natação e equipa de competição na piscina municipal.",
    coach: "Nuno Cardoso",
    competition: "Circuito Nacional de Natação",
    venue: "Piscina Municipal do Aurirrubro",
    roster: [
      athlete("natacao", "Inês Mota", "Inês Mota Ferreira", 1, "Estilos", 22),
      athlete("natacao", "Gonçalo Vieira", "Gonçalo Vieira Pinto", 4, "Livres", 25),
      athlete("natacao", "Beatriz Lourenço", "Beatriz Lourenço Dias", 7, "Costas", 19),
      athlete("natacao", "Martim Sousa", "Martim Sousa Andrade", 10, "Bruços", 20),
    ],
  },
  {
    slug: "tenis-de-mesa",
    name: "Ténis de Mesa",
    athletes: 31,
    desc: "Núcleo competitivo com títulos regionais em várias categorias.",
    coach: "Jorge Amaral",
    competition: "Campeonato Regional de Ténis de Mesa",
    venue: "Pavilhão Municipal do Aurirrubro",
    roster: [
      athlete("tenis-de-mesa", "Paulo Ventura", "Paulo Ventura Matos", 2, "Singulares", 30),
      athlete("tenis-de-mesa", "Carlos Nunes", "Carlos Nunes Ferraz", 5, "Singulares", 26),
      athlete("tenis-de-mesa", "Rita Bastos", "Rita Bastos Neves", 8, "Singulares e pares", 23),
    ],
  },
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
