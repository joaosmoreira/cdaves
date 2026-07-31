import player1 from "@/assets/player-1.jpg";
import player2 from "@/assets/player-2.jpg";
import player3 from "@/assets/player-3.jpg";
import player4 from "@/assets/player-4.jpg";
import newsMatch from "@/assets/news-match.jpg";
import newsGeneral from "@/assets/news-general.jpg";
import newsAdmin from "@/assets/news-admin.jpg";

export const CLUB = {
  name: "CD Aves",
  fullName: "Clube Desportivo das Aves",
  founded: 1930,
  stadium: "Estádio do Clube Desportivo das Aves",
  address: "R. Luis Gonzaga Mendes Carvalho 265, 4795-080 Vila das Aves",
  phone: "252 941 058",
  email: "geral@cdaves.pt",
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

export type NewsKind = "jogo" | "geral" | "administracao";

export type NewsItem = {
  slug: string;
  title: string;
  date: string;
  category: string;
  kind: NewsKind;
  image: string;
  excerpt: string;
  body: string[];
  match?: {
    home: string;
    away: string;
    score: string;
    competition: string;
    venue: string;
    scorers: string[];
  };
};

export const NEWS: NewsItem[] = [
  {
    slug: "vitoria-classico",
    title: "Vitória no clássico com casa cheia",
    date: "28 Jul 2026",
    category: "Equipa A",
    kind: "jogo",
    image: newsMatch,
    excerpt: "Triunfo por 2-1 num estádio esgotado, com golos de Henrique Sá e Marco Leal.",
    body: [
      "O CD Aves venceu o clássico da jornada diante de mais de 12 mil adeptos, num jogo decidido na segunda parte.",
      "Henrique Sá abriu o marcador aos 54 minutos e Marco Leal fechou a contagem já perto do apito final. O adversário reduziu nos descontos.",
      "Com este resultado, a equipa consolida a posição na primeira metade da tabela e prepara agora a deslocação da próxima jornada.",
    ],
    match: {
      home: "CD Aves",
      away: "SC Marítimo do Vale",
      score: "2-1",
      competition: "Liga Portugal",
      venue: "Estádio Municipal do CD Aves",
      scorers: ["Henrique Sá 54'", "Marco Leal 78'", "R. Fontes 90+3' (adv.)"],
    },
  },
  {
    slug: "empate-fora-taca",
    title: "Empate na deslocação a Vila Real",
    date: "21 Jul 2026",
    category: "Equipa A",
    kind: "jogo",
    image: newsMatch,
    excerpt: "1-1 fora de casa para a Taça de Portugal, com eliminatória decidida no desempate.",
    body: [
      "Jogo equilibrado fora de portas, com o clube a chegar à igualdade ainda antes do intervalo.",
      "João Serra assistiu para o golo do empate e a equipa segurou o resultado até final.",
    ],
    match: {
      home: "AD Vila Real",
      away: "CD Aves",
      score: "1-1",
      competition: "Taça de Portugal",
      venue: "Estádio do Vale Norte",
      scorers: ["P. Moutinho 22' (adv.)", "Iker Navarro 41'"],
    },
  },
  {
    slug: "goleada-taca-liga",
    title: "Goleada na estreia da Taça da Liga",
    date: "14 Jul 2026",
    category: "Equipa A",
    kind: "jogo",
    image: newsMatch,
    excerpt: "3-0 em casa, com Henrique Sá bisar e Kevin Mendes a fechar a contagem.",
    body: [
      "Exibição de autoridade na estreia da competição, com a equipa a resolver o jogo ainda na primeira parte.",
      "O treinador aproveitou o resultado para dar minutos aos mais jovens do plantel.",
    ],
    match: {
      home: "CD Aves",
      away: "FC Serra Alta",
      score: "3-0",
      competition: "Taça da Liga",
      venue: "Estádio Municipal do CD Aves",
      scorers: ["Henrique Sá 12'", "Henrique Sá 36'", "Kevin Mendes 65'"],
    },
  },
  {
    slug: "reforco-medio",
    title: "Kevin Mendes renova até 2029",
    date: "24 Jul 2026",
    category: "Mercado",
    kind: "geral",
    image: newsGeneral,
    excerpt: "O médio internacional prolongou o vínculo com o clube por mais três temporadas.",
    body: [
      "O médio assinou a renovação na sede do clube, na presença do presidente e do director desportivo.",
      "Chegado em 2022, soma já mais de cem jogos oficiais pelo emblema avense.",
    ],
  },
  {
    slug: "modalidades-andebol",
    title: "Andebol garante subida de divisão",
    date: "19 Jul 2026",
    category: "Modalidades",
    kind: "geral",
    image: newsGeneral,
    excerpt: "A equipa sénior de andebol conquistou a promoção a duas jornadas do fim.",
    body: [
      "A equipa orientada por Marta Vilela assegurou matematicamente a subida com duas jornadas de antecedência.",
      "O pavilhão encheu para festejar com os atletas no final do encontro.",
    ],
  },
  {
    slug: "academia-obras",
    title: "Nova ala da academia inaugurada",
    date: "05 Jul 2026",
    category: "Clube",
    kind: "geral",
    image: newsGeneral,
    excerpt: "Mais dois campos relvados e um ginásio dedicado à formação.",
    body: [
      "A nova ala da academia acrescenta dois campos relvados, balneários e um ginásio exclusivo para os escalões de formação.",
      "O investimento foi suportado por receitas próprias e apoio dos parceiros oficiais.",
    ],
  },
  {
    slug: "parceria-energia",
    title: "Novo parceiro oficial de energia",
    date: "01 Jul 2026",
    category: "Corporate",
    kind: "geral",
    image: newsGeneral,
    excerpt: "Acordo de três épocas que reforça a sustentabilidade do estádio.",
    body: [
      "O acordo prevê a instalação de painéis solares na cobertura da bancada central.",
      "É o maior contrato de patrocínio de sempre celebrado pelo clube fora do sector desportivo.",
    ],
  },
  {
    slug: "assembleia-geral-setembro",
    title: "Convocatória: Assembleia Geral Ordinária",
    date: "26 Jul 2026",
    category: "Administração",
    kind: "administracao",
    image: newsAdmin,
    excerpt: "Assembleia marcada para 12 de setembro, na sede do clube, com quatro pontos na ordem de trabalhos.",
    body: [
      "Nos termos dos Estatutos, são convocados todos os sócios com quota em dia para a Assembleia Geral Ordinária.",
      "Ordem de trabalhos: 1) Informações da Direção; 2) Apreciação e votação do relatório e contas; 3) Plano de atividades; 4) Outros assuntos.",
      "Os documentos ficam disponíveis para consulta na secretaria durante os quinze dias anteriores à assembleia.",
    ],
  },
  {
    slug: "relatorio-contas-2025-26",
    title: "Relatório e Contas da época 2025/26",
    date: "18 Jul 2026",
    category: "Administração",
    kind: "administracao",
    image: newsAdmin,
    excerpt: "Documento aprovado pelo Conselho Fiscal já disponível para consulta dos sócios.",
    body: [
      "O relatório apresenta um resultado líquido positivo pela segunda época consecutiva.",
      "A redução do passivo e o crescimento das receitas de sócios são os principais destaques do exercício.",
    ],
  },
  {
    slug: "nova-modalidade-voleibol",
    title: "Clube cria secção de voleibol",
    date: "10 Jul 2026",
    category: "Administração",
    kind: "administracao",
    image: newsAdmin,
    excerpt: "A nova modalidade arranca na época 2026/27 com escalões de formação e equipa sénior feminina.",
    body: [
      "A Direção aprovou a criação da secção de voleibol, que passa a ser a sétima modalidade do clube.",
      "As inscrições abrem em setembro no pavilhão municipal.",
    ],
  },
  {
    slug: "encerramento-seccao-xadrez",
    title: "Encerramento da secção de xadrez",
    date: "02 Jul 2026",
    category: "Administração",
    kind: "administracao",
    image: newsAdmin,
    excerpt: "A secção é suspensa por falta de atletas inscritos, com reavaliação prevista para 2027.",
    body: [
      "A Direção decidiu suspender a atividade competitiva da secção de xadrez a partir do final da presente época.",
      "Os atletas inscritos serão apoiados no processo de transferência para núcleos da região.",
    ],
  },
  {
    slug: "lugares-anuais",
    title: "Campanha de lugares anuais 2026/27",
    date: "12 Jul 2026",
    category: "Sócios",
    kind: "geral",
    image: newsGeneral,
    excerpt: "Renovações abertas com condições especiais para sócios com quota em dia.",
    body: [
      "A campanha decorre até 31 de agosto, com prioridade de renovação para quem já teve lugar anual na época passada.",
      "Estão disponíveis duas modalidades, ambas na bancada central coberta.",
    ],
  },
];

export const MATCH_INFO = {
  next: {
    opponent: "SC Marítimo do Vale",
    place: "Casa",
    date: "09 Ago 2026",
    time: "20:30",
    venue: "Estádio Municipal do CD Aves",
    competition: "Liga Portugal",
  },
  last: {
    opponent: "FC Serra Alta",
    place: "Fora",
    score: "2-1",
    venue: "Estádio da Serra",
    competition: "Liga Portugal",
    date: "28 Jul 2026",
  },
};


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
    venue: "Pavilhão Municipal do CD Aves",
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
    venue: "Pavilhão Municipal do CD Aves",
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
    venue: "Pavilhão Municipal do CD Aves",
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
    venue: "Pista Municipal do CD Aves",
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
    venue: "Piscina Municipal do CD Aves",
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
    venue: "Pavilhão Municipal do CD Aves",
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

export const MONTHLY_FEE = 8;

export const MEMBER_PERKS = [
  "Cartão de sócio digital",
  "Descontos na loja oficial e bilheteira",
  "Prioridade na compra de bilhetes",
  "Newsletter e conteúdos exclusivos",
  "Direito de voto na Assembleia Geral",
];

export type PaymentPlan = {
  name: string;
  months: number;
  discount: number;
  note: string;
};

export const PAYMENT_PLANS: PaymentPlan[] = [
  { name: "Mensal", months: 1, discount: 0, note: "Pagamento mês a mês por débito direto." },
  { name: "Trimestral", months: 3, discount: 0.05, note: "Três meses pagos de uma só vez." },
  { name: "Semestral", months: 6, discount: 0.1, note: "Seis meses pagos de uma só vez." },
  { name: "Anual", months: 12, discount: 0.15, note: "Ano completo pago de uma só vez." },
];

export function planTotals(plan: PaymentPlan) {
  const gross = MONTHLY_FEE * plan.months;
  const total = gross * (1 - plan.discount);
  return { gross, total, saving: gross - total, perMonth: total / plan.months };
}

export const SEATS = [
  {
    slug: "futebol-11",
    zone: "Lugar Anual Futebol 11",
    stand: "Bancada Central Coberta",
    price: "180€",
    desc: "Todos os jogos em casa do futebol de 11: campeonato e Taça da Liga.",
    includes: ["Campeonato — jogos em casa", "Taça da Liga — jogos em casa", "Lugar fixo na bancada central coberta", "Prioridade de renovação"],
  },
  {
    slug: "clube-total",
    zone: "Lugar Anual Clube Total",
    stand: "Bancada Central Coberta",
    price: "260€",
    desc: "Todas as competições do clube, incluindo as modalidades com jogos pagos no pavilhão.",
    includes: [
      "Tudo o que inclui o Futebol 11",
      "Todas as competições do futebol de 11",
      "Modalidades no pavilhão com bilhete pago",
      "Lugar fixo na bancada central coberta",
    ],
  },
];

