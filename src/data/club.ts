import player1 from "@/assets/player-1.jpg";
import player2 from "@/assets/player-2.jpg";
import player3 from "@/assets/player-3.jpg";
import player4 from "@/assets/player-4.jpg";
import newsMatch from "@/assets/news-match.jpg";
import newsGeneral from "@/assets/news-general.jpg";
import newsAdmin from "@/assets/news-admin.jpg";
import heroStadium from "@/assets/hero-stadium.jpg";
import logoCd from "@/assets/logo-cd.png";
import teamPhoto from "@/assets/team-photo.jpg";

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
    slug: "antevisao-aves-vs-maritimo",
    title: "Antevisão: CD Aves Recebe SC Marítimo com Informações aos Adeptos",
    date: "02/08/2026",
    category: "Equipa A",
    kind: "jogo",
    image: heroStadium,
    excerpt: "Informações de bilheteira (entradas gratuitas para sócios), abertura de portas às 18h30, convocatória e conselhos de segurança.",
    body: [
      "A equipa principal do CD Aves recebe este domingo o SC Marítimo em partida a contar para a Liga Portugal.",
      "Entradas gratuitas para todos os sócios com a quota de agosto em dia. As portas do estádio abrem às 18h30 com animação na fan zone.",
    ],
    blocks: [
      { type: "paragraph", text: "A equipa principal do CD Aves recebe este domingo o SC Marítimo no Estádio Municipal do CD Aves. A direção informa que os sócios com quota de agosto em dia têm acesso gratuito aos seus lugares na bancada." },
      { type: "heading", text: "Bilheteira, Acessos e Fan Zone" },
      { type: "paragraph", text: "As portas do complexo abrem às 18h30. Recomenda-se a chegada antecipada para evitar filas nos torniquetes da Porta 1 e Porta 2. A fan zone junto à bancada central contará com bifanas, merchandising e música ao vivo a partir das 17h00." },
      { type: "quote", text: "Queremos uma grande mancha encarnada e branca nas bancadas. O apoio dos nossos adeptos desde o primeiro minuto fará a diferença.", author: "Manuel Costa, Treinador Principal" },
      { type: "image", url: heroStadium, caption: "Estádio do CD Aves preparado para receber os adeptos no domingo" },
    ],
    match: {
      home: "CD Aves",
      away: "SC Marítimo do Vale",
      score: "vs",
      competition: "Liga Portugal",
      venue: "Estádio Municipal do CD Aves",
      scorers: ["Domingo, 20:30h"],
    },
  },
  {
    slug: "novo-patrocinador-master-energia",
    title: "CD Aves Anuncia Novo Patrocinador Master de 350.000€ por Época",
    date: "30/07/2026",
    category: "Corporate",
    kind: "geral",
    image: newsAdmin,
    excerpt: "Parceria histórica de 3 épocas com encaixe financeiro global de 1.050.000€ para o clube.",
    body: [
      "O CD Aves formalizou o maior contrato de patrocínio master da história recente do clube, válido por 3 épocas no valor global de 1.050.000€.",
      "A marca figurará na frente das camisolas oficiais de jogo da Equipa A e em toda a sinalética do estádio.",
    ],
    blocks: [
      { type: "paragraph", text: "O CD Aves formalizou o maior contrato de patrocínio master da história recente do clube. A parceria celebrada com o grupo empresarial de tecnologia e energia tem a duração de três épocas (2026/27 a 2028/29) e garante um encaixe anual fixo de 350.000€." },
      { type: "heading", text: "Visibilidade nas Camisolas e Naming do Centro de Treinos" },
      { type: "paragraph", text: "O acordo abrange o patrocínio principal na frente do equipamento de jogo da Equipa A, presença nos painéis LED do estádio, plataformas digitais do clube e a modernização do centro de treinos." },
      { type: "quote", text: "Este patrocínio de 1,05 milhões de euros representa uma alavanca fundamental para a estabilidade financeira e ambição desportiva do CD Aves.", author: "António Oliveira, Presidente da Direção" },
      { type: "image", url: logoCd, caption: "Assinatura do protocolo oficial de patrocínio na sala de imprensa do clube" },
    ],
  },
  {
    slug: "vitoria-classico",
    title: "CD Aves Vence Dérbi com Exibição de Gala (2-1)",
    date: "28/07/2026",
    category: "Equipa A",
    kind: "jogo",
    image: newsMatch,
    excerpt: "Triunfo por 2-1 com estádio cheio, golos decisivos de Henrique Sá e Marco Leal e resumo em vídeo das melhores jogadas.",
    body: [
      "O CD Aves venceu o clássico da jornada diante de mais de 12 mil adeptos nas bancadas do Estádio Municipal do CD Aves, num jogo emocionante resolvido no segundo tempo.",
      "Henrique Sá abriu o marcador aos 54 minutos e Marco Leal ampliou aos 78 minutos numa grande jogada individual. O adversário reduziu nos descontos.",
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
    slug: "convocatoria-assembleia-geral-ordinaria",
    title: "Convocatória Oficial: Assembleia Geral Ordinária de Sócios",
    date: "26/07/2026",
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
    slug: "reforco-marco-leal-transferencia",
    title: "Marco Leal Assina pelo CD Aves num Negócio de 250.000€",
    date: "25/07/2026",
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
    slug: "renovacao-capitao-kevin-mendes",
    title: "Capitão Kevin Mendes Renova Vínculo até 2029",
    date: "22/07/2026",
    category: "Mercado",
    kind: "geral",
    image: player2,
    excerpt: "O médio internacional e capitão de equipa prolongou a ligação ao clube por mais três épocas.",
    body: [
      "O médio e capitão Kevin Mendes assinou a renovação de contrato até junho de 2029.",
      "Chegado em 2022, o atleta soma mais de 100 jogos oficiais com a camisola encarnada e branca.",
    ],
    blocks: [
      { type: "paragraph", text: "O CD Aves garantiu a continuidade do capitão Kevin Mendes. O influente médio de 26 anos renovou contrato até junho de 2029 na presença do presidente do clube." },
      { type: "heading", text: "Liderança de Balneário e Mais de 100 Jogos Oficiais" },
      { type: "paragraph", text: "Desde que chegou ao clube em 2022, Kevin tornou-se uma referência para os jovens da formação e uma peça basilar no esquema do treinador." },
      { type: "quote", text: "Esta é a minha casa. Sentir o carinho dos sócios todos os dias torna a decisão de continuar muito simples.", author: "Kevin Mendes, Capitão do CD Aves" },
    ],
  },
  {
    slug: "modalidades-andebol-subida",
    title: "Andebol do CD Aves Conquista Subida de Divisão no Pavilhão Cheio",
    date: "19/07/2026",
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
  {
    slug: "saida-atleta-joao-serra",
    title: "Transferência: João Serra Transferido para o Estrangeiro por 180.000€",
    date: "15 Jul 2026",
    category: "Mercado",
    kind: "geral",
    image: player3,
    excerpt: "Acordo de transferência definitiva do extremo de 24 anos envolve 180.000€ e 15% de mais-valia futura.",
    body: [
      "O CD Aves chegou a acordo com o clube comprador para a transferência do extremo João Serra por 180.000€.",
      "O clube salvaguardou ainda 15% do valor de uma futura transferência do jogador.",
    ],
    blocks: [
      { type: "paragraph", text: "O CD Aves informa que concluiu o processo de transferência do atleta João Serra. O negócio ficou selado pelo montante de 180.000€ líquidos." },
      { type: "heading", text: "Agradecimento do Clube e Cláusula Futura" },
      { type: "paragraph", text: "O clube mantém 15% dos direitos económicos sobre uma mais-valia em futura venda do atleta. O CD Aves agradece o empenho e profissionalismo demonstrados durante a sua passagem." },
      { type: "quote", text: "Desejamos as maiores felicidades ao João Serra neste novo desafio profissional na sua carreira.", author: "Gabinete de Imprensa do CD Aves" },
    ],
  },
  {
    slug: "lugares-anuais-campanha",
    title: "Campanha de Lugares Anuais 2026/27: Prioridade para Sócios",
    date: "12 Jul 2026",
    category: "Sócios",
    kind: "geral",
    image: newsGeneral,
    excerpt: "Renovações abertas na bancada central coberta com descontos até 15% para sócios com quota em dia.",
    body: [
      "Arrancou a campanha de lugares anuais para a nova época desportiva. Os sócios têm prioridade de renovação até 31 de agosto.",
      "Duas modalidades disponíveis na bancada central coberta com facilidades de pagamento fracionado.",
    ],
    blocks: [
      { type: "paragraph", text: "O CD Aves lançou oficialmente a campanha de Lugares Anuais para a época 2026/27 sob o lema 'O Teu Lugar é Aqui'. As renovações decorrem com prioridade até ao dia 31 de agosto." },
      { type: "heading", text: "Descontos de Renovação e Vantagens Exclusivas" },
      { type: "paragraph", text: "Os sócios que mantenham o seu lugar da época transata beneficiam de 15% de desconto no pagamento integral ou opção de pagamento fracionado em 3 prestações." },
    ],
  },
  {
    slug: "parceria-saude-fisioterapia",
    title: "CD Aves Firma Parceria Oficial com Centro de Fisioterapia e Saúde",
    date: "08 Jul 2026",
    category: "Corporate",
    kind: "geral",
    image: newsGeneral,
    excerpt: "Protocolo médico garante exames de pré-época e acompanhamento de recuperação para o futebol e modalidades.",
    body: [
      "O CD Aves assinou um acordo de parceria com uma clínica médica de referência da região norte.",
      "A parceria cobre exames de diagnóstico médico, fisioterapia preventiva e recuperação de lesões dos atletas.",
    ],
    blocks: [
      { type: "paragraph", text: "O CD Aves estabeleceu um protocolo de cooperação médica com o prestigiado grupo de saúde desportiva. O acordo garante assistência especializada a todas as equipas de futebol e modalidades do clube." },
      { type: "heading", text: "Exames de Pré-Época e Recuperação de Atletas" },
      { type: "paragraph", text: "A parceria assegura a realização de testes ergométricos, ecocardiogramas e tratamentos de fisioterapia avançada com tecnologias de ponta." },
    ],
  },
  {
    slug: "inauguracao-relvado-academia",
    title: "Novo Relvado Sintético da Academia de Formação Inaugurado",
    date: "05 Jul 2026",
    category: "Clube",
    kind: "geral",
    image: newsGeneral,
    excerpt: "Investimento de 120.000€ na modernização dos campos de treino para os escalões jovens de futebol.",
    body: [
      "Foi inaugurado o novo relvado sintético de última geração do complexo desportivo da academia.",
      "A obra beneficia mais de 250 jovens atletas dos escalões de formação dos Sub-7 aos Sub-19.",
    ],
    blocks: [
      { type: "paragraph", text: "A direção do CD Aves inaugurou o novo relvado sintético do complexo da academia. A intervenção representou um investimento total de 120.000€ suportado com o apoio de parceiros locais." },
      { type: "heading", text: "Condições de Excelência para a Formação" },
      { type: "paragraph", text: "O novo piso possui certificação máxima da federação e inclui iluminação LED economizadora para os treinos noturnos das equipas de formação." },
    ],
  },
  {
    slug: "resumo-jogo-taca-liga-goleada",
    title: "CD Aves Goleia na Estreia da Taça da Liga (3-0 com Vídeo)",
    date: "28 Jun 2026",
    category: "Equipa A",
    kind: "jogo",
    image: newsMatch,
    excerpt: "Exibição de gala na Taça da Liga com bis de Henrique Sá e golo de Kevin Mendes. Veja os golos no leitor de vídeo.",
    body: [
      "O CD Aves garantiu o apuramento na Taça da Liga após vencer por 3-0 no Estádio Municipal.",
      "Henrique Sá bisou na primeira parte e Kevin Mendes fechou a contagem no segundo tempo.",
    ],
    blocks: [
      { type: "paragraph", text: "Exibição de grande categoria da equipa do CD Aves na jornada de abertura da Taça da Liga, com uma vitória incontestada por 3-0 no Estádio Municipal." },
      { type: "heading", text: "Bis de Henrique Sá e Domínio Total" },
      { type: "paragraph", text: "Henrique Sá inaugurou o marcador aos 12 minutos e dilatou aos 36 minutos. Na segunda parte, Kevin Mendes sentenciou o encontro aos 65 minutos num remate à entrada da área." },
      { type: "video", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", title: "Vídeo: Resumo e Golos da Vitória por 3-0 na Taça da Liga" },
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
    slug: "assembleia-geral-extraordinaria-aprovacao",
    title: "Assembleia Geral Extraordinária Aprova Revisão dos Estatutos",
    date: "20 Jun 2026",
    category: "Administração",
    kind: "administracao",
    image: newsAdmin,
    excerpt: "Votação histórica com aprovação de 92% dos sócios presentes para a atualização do regulamento associativo.",
    body: [
      "Os sócios do CD Aves aprovaram por expressiva maioria a proposta de revisão dos estatutos sociais do clube.",
      "A sessão contou com a presença de mais de 300 associados no auditório da sede.",
    ],
    blocks: [
      { type: "paragraph", text: "A Assembleia Geral Extraordinária do CD Aves deliberou com 92% de votos favoráveis a aprovação da revisão dos Estatutos do Clube, marcando um momento histórico de modernização associativa." },
      { type: "heading", text: "Modernização e Votação Eletrónica" },
      { type: "paragraph", text: "Entre as principais alterações aprovadas destaca-se a introdução da votação eletrónica em assembleias futuras e a regulamentação das modalidades de formação." },
    ],
  },
  {
    slug: "patrocinio-equipamentos-desportivos",
    title: "CD Aves Anuncia Novo Fornecedor de Equipamentos Desportivos",
    date: "10 Jun 2026",
    category: "Corporate",
    kind: "geral",
    image: newsGeneral,
    excerpt: "Contrato comercial para as épocas 2026/27 e 2027/28 com linha personalizada na loja oficial.",
    body: [
      "O CD Aves estabeleceu acordo com uma prestigiada marca desportiva para o fornecimento dos equipamentos oficiais.",
      "Os novos equipamentos da equipa principal e modalidades serão apresentados aos sócios em julho.",
    ],
    blocks: [
      { type: "paragraph", text: "O CD Aves assinou contrato de fornecimento oficial de vestuário desportivo para as próximas duas temporadas com uma marca de relevo internacional." },
      { type: "heading", text: "Linha Exclusiva de Merchandising para Sócios" },
      { type: "paragraph", text: "A parceria inclui o desenvolvimento de uma coleção exclusiva de treino, passeio e equipamento de jogo que estará disponível para venda na loja oficial do estádio." },
    ],
  },
  {
    slug: "resumo-final-campeonato-vitoria",
    title: "CD Aves Encerra Campeonato com Vitória Fora de Portas (1-2)",
    date: "25 Mai 2026",
    category: "Equipa A",
    kind: "jogo",
    image: newsMatch,
    excerpt: "Vitória por 2-1 na última jornada do campeonato sela balanço altamente positivo da época desportiva.",
    body: [
      "O CD Aves encerrou o campeonato da Liga com um triunfo por 2-1 fora de portas na última jornada.",
      "Os adeptos avenses deslocaram-se em grande número e festejaram com os atletas no apito final.",
    ],
    blocks: [
      { type: "paragraph", text: "A equipa principal do CD Aves fechou a época desportiva 2025/26 com um excelente resultado positivo, triunfando por 2-1 na deslocação da última jornada." },
      { type: "heading", text: "Balanço Positivo da Época e Consagração" },
      { type: "paragraph", text: "Com esta vitória, o clube garantiu a manutenção tranquila na divisão principal e registou uma das melhores retomas da sua história no segundo volta." },
      { type: "quote", text: "Obrigado a todos os sócios e adeptos pelo apoio incondicional ao longo de toda a temporada.", author: "Equipa Técnica e Atletas do CD Aves" },
    ],
    match: {
      home: "AD Vila Real",
      away: "CD Aves",
      score: "1-2",
      competition: "Liga Portugal",
      venue: "Estádio do Vale",
      scorers: ["P. Moutinho 30' (adv.)", "Henrique Sá 58'", "Kevin Mendes 84'"],
    },
  },
  {
    slug: "apresentacao-plano-pre-epoca",
    title: "Direção Apresenta Plano de Pré-Época e Estágio de Preparação",
    date: "15 Mai 2026",
    category: "Clube",
    kind: "geral",
    image: teamPhoto,
    excerpt: "Definido o calendário de trabalhos de pré-temporada com 5 jogos de preparação agendados.",
    body: [
      "O gabinete de futebol apresentou o plano detalhado de preparação para a época 2026/27.",
      "Os trabalhos arrancam com exames médicos seguidos de estágio de preparação de 8 dias.",
    ],
    blocks: [
      { type: "paragraph", text: "O CD Aves definiu o programa completo de trabalhos para a pré-temporada da equipa principal de futebol. Os exames médicos e físicos realizam-se a 1 de julho." },
      { type: "heading", text: "Estágio e Jogos de Preparação" },
      { type: "paragraph", text: "O plantel cumpre um estágio de 8 dias onde estão agendados 5 jogos de preparação com equipas nacionais e espanholas." },
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
  activa: boolean;
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
    slug: "futsal-masculino",
    name: "Futsal Masculino",
    athletes: 34,
    desc: "Equipa sénior masculina e escalões de formação competitivos.",
    coach: "Ricardo Bastos",
    competition: "Campeonato Nacional de Futsal",
    venue: "Pavilhão Municipal do CD Aves",
    activa: true,
    roster: [
      athlete("futsal-masculino", "André Faria", "André Miguel Faria", 1, "Guarda-redes", 29),
      athlete("futsal-masculino", "Tiago Melo", "Tiago Sousa Melo", 5, "Fixo", 26),
      athlete("futsal-masculino", "Rafa Duarte", "Rafael Duarte Nunes", 7, "Ala", 23),
      athlete("futsal-masculino", "Léo Prado", "Leonardo Prado", 9, "Ala", 27, "Brasil"),
      athlete("futsal-masculino", "Miguel Antunes", "Miguel Ângelo Antunes", 10, "Pivô", 31),
      athlete("futsal-masculino", "Zé Rocha", "José Maria Rocha", 12, "Universal", 21),
    ],
  },
  {
    slug: "futsal-feminino",
    name: "Futsal Feminino",
    athletes: 28,
    desc: "Equipa sénior feminina a competir a nível nacional.",
    coach: "Cátia Ferreira",
    competition: "Campeonato Nacional Feminino de Futsal",
    venue: "Pavilhão Municipal do CD Aves",
    activa: true,
    roster: [
      athlete("futsal-feminino", "Inês Santos", "Inês Filipa Santos", 1, "Guarda-redes", 24),
      athlete("futsal-feminino", "Mariana Costa", "Mariana Silva Costa", 6, "Fixo", 22),
      athlete("futsal-feminino", "Sofia Ribeiro", "Sofia Alexandra Ribeiro", 8, "Ala", 25),
      athlete("futsal-feminino", "Beatriz Martins", "Beatriz Rocha Martins", 10, "Pivô", 23),
    ],
  },
  {
    slug: "basquetebol",
    name: "Basquetebol",
    athletes: 62,
    desc: "Formação jovem e equipa sénior em ascensão.",
    coach: "Carlos Bento",
    competition: "Campeonato Distrital / Nacional de Basquetebol",
    venue: "Pavilhão Municipal do CD Aves",
    activa: true,
    roster: [
      athlete("basquetebol", "Rui Cordeiro", "Rui Manuel Cordeiro", 3, "Base", 26),
      athlete("basquetebol", "Jamal Owens", "Jamal Owens", 5, "Extremo", 28, "EUA"),
      athlete("basquetebol", "Vasco Neto", "Vasco Neto Ribeiro", 8, "Poste", 24),
      athlete("basquetebol", "Tomé Aguiar", "Tomé Aguiar Silva", 11, "Ala-poste", 22),
    ],
  },
  {
    slug: "ciclismo",
    name: "Ciclismo",
    athletes: 40,
    desc: "Equipa de ciclismo de estrada e BTT com presença em provas nacionais.",
    coach: "Manuel Vilar",
    competition: "Troféu Nacional de Ciclismo / BTT",
    venue: "Vila das Aves e Circuitos Nacionais",
    activa: true,
    roster: [
      athlete("ciclismo", "Gonçalo Pereira", "Gonçalo Nuno Pereira", 2, "Ciclista Estrada", 27),
      athlete("ciclismo", "Diogo Machado", "Diogo Silva Machado", 4, "Trepador", 24),
      athlete("ciclismo", "Pedro Fontes", "Pedro Miguel Fontes", 7, "Sprinter", 26),
    ],
  },
  {
    slug: "walking-football",
    name: "Walking Football",
    athletes: 35,
    desc: "Modalidade sénior (+50 anos) promovendo a saúde e o convívio desportivo.",
    coach: "António Silva",
    competition: "Liga Nacional de Walking Football",
    venue: "Sintético do Complexo Desportivo do CD Aves",
    activa: true,
    roster: [
      athlete("walking-football", "Fernando Ramos", "Fernando Manuel Ramos", 9, "Avançado", 58),
      athlete("walking-football", "Joaquim Bastos", "Joaquim Alberto Bastos", 5, "Defesa", 62),
      athlete("walking-football", "Mário Jorge", "Mário Jorge Fernandes", 1, "Guarda-redes", 55),
    ],
  },
  {
    slug: "futebol",
    name: "Futebol Profissional",
    athletes: 0,
    desc: "Futebol profissional atualmente inativo/sem competição oficial sénior.",
    coach: "Inativo",
    competition: "Inativo",
    venue: "Estádio Municipal do CD Aves",
    activa: false,
    roster: [],
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

