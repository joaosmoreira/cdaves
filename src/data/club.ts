import player1 from "@/assets/player-1.jpg";
import player2 from "@/assets/player-2.jpg";
import player3 from "@/assets/player-3.jpg";
import player4 from "@/assets/player-4.jpg";
import newsMatch from "@/assets/news-match.jpg";
import newsGeneral from "@/assets/news-general.jpg";
import newsAdmin from "@/assets/news-admin.jpg";
import heroStadium from "@/assets/hero-stadium.jpg";
import logoCd from "@/assets/logo-cd.png";

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
  blocks?: any[];
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
    title: "CD Aves Vence Dérbi com Exibição de Gala (2-1)",
    date: "28 Jul 2026",
    category: "Equipa A",
    kind: "jogo",
    image: newsMatch,
    excerpt: "Triunfo por 2-1 com estádio cheio, golos decisivos de Henrique Sá e Marco Leal e resumo em vídeo das melhores jogadas.",
    body: [
      "O CD Aves venceu o clássico da jornada diante de mais de 12 mil adeptos nas bancadas do Estádio Municipal do CD Aves, num jogo emocionante resolvido no segundo tempo.",
      "Henrique Sá abriu o marcador aos 54 minutos e Marco Leal ampliou aos 78 minutos numa grande jogada individual. O adversário reduziu nos descontos.",
      "Com este resultado, a equipa consolida a posição cimeira da tabela e prepara agora a deslocação da próxima jornada.",
    ],
    blocks: [
      { type: "paragraph", text: "O CD Aves venceu o clássico da jornada diante de mais de 12 mil adeptos nas bancadas do Estádio Municipal do CD Aves, num jogo emocionante resolvido no segundo tempo." },
      { type: "heading", text: "Resumo da Partida e Momentos Decisivos" },
      { type: "paragraph", text: "Henrique Sá inaugurou o marcador aos 54 minutos com um remate cruzado após grande passe de João Serra. Aos 78 minutos, Marco Leal ampliou para 2-0 numa grande jogada individual. O adversário reduziu nos descontos." },
      { type: "video", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", title: "Resumo em Vídeo: CD Aves 2-1 SC Marítimo do Vale" },
      { type: "quote", text: "O apoio vindo das bancadas impulsionou os jogadores nos momentos cruciais. Foi uma vitória de união e carácter.", author: "Manuel Costa, Treinador Principal" },
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
    slug: "antevisao-proximo-jogo-maritimo",
    title: "Antevisão: CD Aves Recebe SC Marítimo no Estádio do Clube",
    date: "01 Ago 2026",
    category: "Equipa A",
    kind: "jogo",
    image: heroStadium,
    excerpt: "Antevisão tática da próxima jornada, boletim clínico, lista de convocados e declarações da conferência de imprensa.",
    body: [
      "A equipa principal do CD Aves ultima os preparativos para o importante confronto da próxima jornada em casa.",
      "O boletim clínico confirma a recuperação total do capitão. O treinador apelou à máxima concentração perante um adversário exigente.",
    ],
    blocks: [
      { type: "paragraph", text: "A equipa principal do CD Aves ultima os preparativos para o importante confronto da próxima jornada no Estádio Municipal do CD Aves. A sessão de treino à porta aberta registou forte afluência de sócios." },
      { type: "heading", text: "Análise do Adversário e Boletim Clínico" },
      { type: "paragraph", text: "O departamento médico confirmou a total recuperação dos médios. O treinador principal destacou a intensidade exigida no setor intermédio." },
      { type: "quote", text: "Sabemos da importância de somar os três pontos perante os nossos adeptos. Trabalhámos as transições táticas durante a semana e a equipa está motivada.", author: "Manuel Costa, Treinador Principal" },
      { type: "image", url: newsGeneral, caption: "Sessão de treino tático no relvado principal do Estádio do CD Aves" },
    ],
    match: {
      home: "CD Aves",
      away: "SC Marítimo do Vale",
      score: "vs",
      competition: "Liga Portugal",
      venue: "Estádio Municipal do CD Aves",
      scorers: ["Domingo, 18:00h"],
    },
  },
  {
    slug: "novo-patrocinador-master-energia",
    title: "CD Aves Anuncia Novo Patrocinador Master de 350.000€ por Época",
    date: "30 Jul 2026",
    category: "Corporate",
    kind: "geral",
    image: newsAdmin,
    excerpt: "Parceria histórica de 3 épocas com encaixe financeiro global de 1.050.000€ para o clube.",
    body: [
      "O CD Aves formalizou o maior contrato de patrocínio master da história recente do clube, válido por 3 épocas no valor global de 1.050.000€.",
      "A marca figurará na frente das camisolas oficiais de jogo da Equipa A e em toda a sinalética do estádio.",
    ],
    blocks: [
      { type: "paragraph", text: "O CD Aves formalizou o maior contrato de patrocínio master da história recente do clube. A parceria celebrada com o grupo empresarial tem a duração de três épocas (2026/27 a 2028/29) e garante um encaixe anual fixo de 350.000€." },
      { type: "heading", text: "Visibilidade nas Camisolas e Naming do Centro de Treinos" },
      { type: "paragraph", text: "O acordo abrange o patrocínio principal na frente do equipamento de jogo da Equipa A, presença nos painéis LED do estádio, plataformas digitais do clube e o reforço da academia de formação." },
      { type: "quote", text: "Este patrocínio de 1,05 milhões de euros representa uma alavanca fundamental para a estabilidade financeira e ambição desportiva do CD Aves.", author: "António Oliveira, Presidente da Direção" },
      { type: "image", url: logoCd, caption: "Assinatura do protocolo oficial de patrocínio na sala de imprensa do clube" },
    ],
  },
  {
    slug: "reforco-marco-leal-transferencia",
    title: "Marco Leal Assina pelo CD Aves num Negócio de 250.000€",
    date: "25 Jul 2026",
    category: "Mercado",
    kind: "geral",
    image: player1,
    excerpt: "Avançado internacional jovem assina contrato válido por 3 épocas por 250.000€ com cláusula de rescisão de 5M€.",
    body: [
      "O CD Aves assegurou a contratação do jovem avançado Marco Leal. A transferência envolveu um valor de 250.000€ por 80% dos direitos desportivos.",
      "O jogador rubricou um contrato de três anos válido até 2029, com cláusula de rescisão fixada nos 5.000.000€.",
    ],
    blocks: [
      { type: "paragraph", text: "O CD Aves assegurou a contratação do promissor avançado Marco Leal. A operação envolveu um montante de transferência fixado nos 250.000€ por 80% dos direitos desportivos do atleta." },
      { type: "heading", text: "Vínculo até 2029 e Cláusula de Rescisão de 5 Milhões" },
      { type: "paragraph", text: "O jogador de 23 anos assinou um contrato válido por três temporadas (até junho de 2029), ficando resguardado com uma cláusula de rescisão de 5.000.000€." },
      { type: "quote", text: "Assinar pelo CD Aves é um passo de enorme orgulho na minha carreira. Vou dar tudo pela camisola em cada jogo.", author: "Marco Leal, Novo Avançado do CD Aves" },
      { type: "image", url: player1, caption: "Marco Leal apresentado oficialmente com a camisola do CD Aves" },
    ],
  },
  {
    slug: "convocatoria-assembleia-geral-ordinaria",
    title: "Convocatória Oficial: Assembleia Geral Ordinária de Sócios",
    date: "26 Jul 2026",
    category: "Administração",
    kind: "administracao",
    image: newsAdmin,
    excerpt: "Convocatória formal para a Assembleia Geral de sócios com aprovação do Relatório e Contas da época 2025/26.",
    body: [
      "Nos termos estatutários, são convocados todos os sócios com quota em dia para a Assembleia Geral Ordinária no dia 12 de setembro de 2026.",
      "Ordem de trabalhos inclui apresentação de contas, plano de atividades e votação das opções estratégicas do clube.",
    ],
    blocks: [
      { type: "paragraph", text: "Nos termos estatutários, são convocados todos os sócios com quota em dia para a Assembleia Geral Ordinária a realizar no dia 12 de setembro de 2026, às 20h30, no Auditório da Sede Social do CD Aves." },
      { type: "heading", text: "Ordem de Trabalhos da Sessão" },
      { type: "paragraph", text: "1) Leitura e aprovação da ata anterior; 2) Apreciação e votação do Relatório e Contas do exercício 2025/26; 3) Apresentação do plano de investimentos para 2026/27; 4) Outros assuntos de interesse associativo." },
      { type: "quote", text: "A participação de todos os sócios é essencial para reforçar a vitalidade e transparência da vida do nosso clube.", author: "Mesa da Assembleia Geral do CD Aves" },
    ],
  },
  {
    slug: "modalidades-andebol-subida",
    title: "Andebol do CD Aves Conquista Subida de Divisão no Pavilhão Cheio",
    date: "19 Jul 2026",
    category: "Modalidades",
    kind: "geral",
    image: newsGeneral,
    excerpt: "Triunfo decisivo no pavilhão municipal por 28-24 assegura a promoção a duas jornadas do fim.",
    body: [
      "A equipa sénior de andebol do CD Aves carimbou a subida de divisão perante um pavilhão completamente esgotado.",
      "A vitória por 28-24 desencadeou a festa entre atletas e sócios nas bancadas.",
    ],
    blocks: [
      { type: "paragraph", text: "A equipa sénior de andebol do CD Aves carimbou a subida de divisão perante um pavilhão municipal completamente esgotado. A vitória por 28-24 desencadeou a festa entre atletas e adeptos." },
      { type: "heading", text: "Trabalho de Formação e Consagração" },
      { type: "paragraph", text: "Com um percurso irrepreensível durante toda a época, o conjunto orientado pela equipa técnica do clube garantiu a promoção com duas jornadas ainda por disputar." },
      { type: "quote", text: "Este título premia o esforço coletivo da secção e a dedicação exemplar de todas as nossas atletas.", author: "Direção de Modalidades do CD Aves" },
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

