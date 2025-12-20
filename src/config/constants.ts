import { Plan, Course, StudioLocation, Teacher, FAQItem } from './types';

// Centralized Contact Configuration
export const CONTACT_CONFIG = {
  whatsapp: {
    display: '(35) 99129-5022',
    link: 'https://wa.me/5535991295022' // Formatted for API
  },
  social: {
    instagram: 'https://www.instagram.com/soarmusicstudios/',
    facebook: 'https://www.facebook.com/soarmusicstudios',
    youtube: 'https://www.youtube.com/@PiuGuitar'
  },
  email: 'pliniofagundesdefaria@gmail.com'
};

export const PLANS: Plan[] = [
  {
    id: 'plan-class',
    name: 'PLANO CLASS',
    description: 'A porta de entrada para o mundo da música.',
    features: ['Aula em Grupo', 'Repertório Variado', 'Desenvolvimento Nivelado'],
    colorTheme: 'cyan',
    imagePlaceholder: 'https://pdoynmsyyhdkjmivyplg.supabase.co/storage/v1/object/public/soar-site/CLASS.png'
  },
  {
    id: 'plan-gold',
    name: 'PLANO GOLD',
    description: 'Foco total no seu desenvolvimento técnico.',
    features: ['Aula Particular', 'Sistema Modular', 'Oficinas de Ensaios', 'Gravações'],
    colorTheme: 'gold',
    imagePlaceholder: 'https://pdoynmsyyhdkjmivyplg.supabase.co/storage/v1/object/public/soar-site/GOLD.png'
  },
  {
    id: 'plan-master',
    name: 'MASTER CLASS',
    description: 'Para quem busca a excelência profissional.',
    features: [
      'Teoria e Percepção',
      'Harmonia e Improvisação',
      'Composição',
      'Técnica de Estúdio e Produção',
      'Prática de Conjunto'
    ],
    colorTheme: 'cyan',
    imagePlaceholder: 'https://pdoynmsyyhdkjmivyplg.supabase.co/storage/v1/object/public/soar-site/MASTER-CLASS.png'
  },
  {
    id: 'plan-shine',
    name: 'PLANO SHINE',
    description: 'Desenvolva sua carreira artística e vocal.',
    features: ['Vocal Coach', 'Produção Mensal', 'Desenvolvimento de Carreira', 'Agenciamento Artístico'],
    colorTheme: 'purple',
    imagePlaceholder: 'https://pdoynmsyyhdkjmivyplg.supabase.co/storage/v1/object/public/soar-site/SHINE.png'
  }
];

export const TEACHERS: Teacher[] = [
  {
    id: 't1',
    name: 'Plínio Fagundes',
    role: 'Músico, Professor e Produtor',
    bio: 'Graduação em Música Popular e Licenciatura Plena em Música (UNAERP). Aluno de João Magioni com extensão em Audiovisual. Destaques: TCC nota 10, Composição na Coletânea Midas Music (Rick Bonadio), contemplado nas Leis Aldir Blanc e Paulo Gustavo. Editor/Audiovisual para Ana Hickmann.',
    photoUrl: 'https://pdoynmsyyhdkjmivyplg.supabase.co/storage/v1/object/public/soar-site/Plinio.jpeg'
  },
  {
    id: 't2',
    name: 'Gustavo Rodrigues',
    role: 'Músico, Professor e Vocal Coach',
    bio: 'Pedagogia Vocal e Conservatório de Tatuí (Polo SJRP). Aluno de Rodolpho Custódio (Raíz Coral) e Israel Salazar. Extensão em Fonoaudiologia. Regente de coral LBV e IEMP. Preparador vocal da nova formação "Milionário e Moysés Rico" e Vocalista Gospel.',
    photoUrl: 'https://pdoynmsyyhdkjmivyplg.supabase.co/storage/v1/object/public/soar-site/Gustavo.jpg'
  }
];

// Helper to generate Google Maps Embed URL
const getMapUrl = (address: string) => 
  `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

export const STUDIOS: StudioLocation[] = [
  {
    id: 's1',
    name: 'Unidade Arceburgo',
    address: 'Dr. Nickson Russo, 91 – Vila Progresso, Arceburgo - MG',
    phone: CONTACT_CONFIG.whatsapp.display,
    mapUrl: getMapUrl('Dr. Nickson Russo, 91 – Vila Progresso, Arceburgo - MG')
  },
  {
    id: 's2',
    name: 'Unidade Guaranésia',
    address: 'Rua Mario Ribeiro Lima, 260 - Bom Jesus, Guaranésia - MG',
    phone: CONTACT_CONFIG.whatsapp.display,
    mapUrl: getMapUrl('Rua Mario Ribeiro Lima, 260 - Bom Jesus, Guaranésia - MG')
  },
  {
    id: 's3',
    name: 'Unidade Guaxupé',
    address: 'Av. Dona Floriana, 846 - Centro, Guaxupé - MG',
    phone: CONTACT_CONFIG.whatsapp.display,
    mapUrl: getMapUrl('Av. Dona Floriana, 846 - Centro, Guaxupé - MG')
  },
  {
    id: 's4',
    name: 'Unidade Juruaia',
    address: 'Praça Prefeito Beijamim Antônio, 70 - Centro, Juruaia - MG',
    phone: CONTACT_CONFIG.whatsapp.display,
    mapUrl: getMapUrl('Praça Prefeito Beijamim Antônio, 70 - Centro, Juruaia - MG')
  }
];

export const COURSES: Course[] = [
  {
    id: 'c-guitarra',
    name: 'Guitarra',
    description: 'Do rock ao jazz, domine as escalas, improvisação e timbres.',
    imageUrl: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'c-violao',
    name: 'Violão',
    description: 'Popular e Erudito. Acordes, dedilhados e ritmos brasileiros.',
    imageUrl: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'c-voz',
    name: 'Canto & Técnica Vocal',
    description: 'Respiração, afinação, extensão vocal e performance de palco.',
    imageUrl: 'https://images.unsplash.com/photo-1541592553160-82008b127ccb?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'c-baixo',
    name: 'Contrabaixo',
    description: 'O fundamento da banda. Groove, slap e harmonia grave.',
    imageUrl: 'https://images.unsplash.com/photo-1462965326201-d02e4f455804?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'c-teclado',
    name: 'Teclado & Piano',
    description: 'Harmonia, leitura de partitura, sintetizadores e piano clássico.',
    imageUrl: 'https://images.unsplash.com/photo-1552422535-c45813c61732?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'c-bateria',
    name: 'Bateria',
    description: 'Coordenação motora, ritmos variados e dinâmica.',
    imageUrl: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&q=80&w=800'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'f1',
    question: 'Por que 1 ano de contrato nas aulas presenciais?',
    answer: 'O estudo da música exige processos no aprendizado que demandaram um tempo mínimo para o desenvolvimento e acompanhamento do mesmo. Não podemos garantir resultados a curto prazo sem um deadline modular nos estudos. Em nossa filosofia de trabalho definimos o período de 12 meses para uma boa tutoria desde que o aluno seja assíduo nas presenças e se esforce para potencializar seu desenvolvimento.'
  },
  {
    id: 'f2',
    question: 'Posso renovar o contrato posterior ao 1 ano?',
    answer: 'Claro, na verdade até recomendamos pois são muitos módulos a serem estudados dentro das fases iniciante, intermediário e avançado.'
  },
  {
    id: 'f3',
    question: 'Quanto tempo para a conclusão de todos os módulos?',
    answer: 'Essa pergunta é um pouco relativa pois depende de uma série de fatores como, objetivos do aluno, presença nas aulas e possíveis dificuldades ao longo do processo. O tempo se dará conforme a disposição do aluno em sua evolução musical, portanto não preocupamos com tempo e sim com a qualidade da absorção de nossos conteúdos mesmo que demandam anos para isso. E realmente demanda.'
  },
  {
    id: 'f4',
    question: 'Posso fazer aula sem contrato?',
    answer: 'Sim, o contrato não é nenhuma imposição de nossa parte, mas uma recomendação como já explicado na pergunta [Por que 1 ano de contrato nas aulas presenciais?]. Porém o aluno deverá estar ciente que não existe desenvolvimento significativo a curto prazo e também o valor do plano será um pouco mais caro.'
  },
  {
    id: 'f5',
    question: 'O que é o Plano Gold na Soar?',
    answer: 'Se trata do plano particular presencial com duração de 1 hora por semana, além das aulas dos conteúdos programáticos os aluno matriculados nesse plano possui acesso ao estúdio da Soar com aulas complementares como: Oficinas de ensaios, técnica e teoria e gravações.'
  },
  {
    id: 'f6',
    question: 'O que é o Plano Class na Soar?',
    answer: 'É o plano de aulas em grupo podendo variar conforme o curso de 3 a 5 pessoas por turma. Diferentemente do plano particular o aluno não possui acesso ao estúdio com as aulas complementares e gravações. Priorizamos ao máximo sempre em manter a turma equivalente em faixa etária e nível. A duração da aula com a turma fechada é de 1 hora/semanal.'
  },
  {
    id: 'f7',
    question: 'O que é o Plano Shine na Soar?',
    answer: 'É um plano voltado ao objetivo artístico, uma vez que a pessoa já possua contato com a música e/ou um projeto com intenção de carreira musical. Então nossa equipe da Soar fará todo o acompanhamento e suporte de carreira entre produções musicais que irão divulgar e fomentar profissionalmente o seu trabalho artístico. Geralmente voltado para cantores e bandas.'
  },
  {
    id: 'f8',
    question: 'Como funciona os pagamentos na Soar?',
    answer: 'Os pagamentos na Soar são em forma de mensalidades acertadas sempre no início de cada mês entre os dias 5 a 10 (uteis). Após a data de vencimento posterior ao dia 10 é cobrado multa de 2% dia (útil) a partir da data de solicitação.'
  },
  {
    id: 'f9',
    question: 'Existe período de férias na Soar?',
    answer: 'Sim, somente entre os dias 15/12 a 15/01 do ano seguinte temos um período de pausa das aulas e expediente da escola. Pelos seguintes motivos: - Festividades de fim de ano, viagens quase sempre agendadas nesse período, descanso letivo de aulas assim como qualquer outra instituição de ensino e organizações gerais de gestão/ administrativas de nossa equipe para o próximo ano.'
  },
  {
    id: 'f10',
    question: 'Pagarei normalmente a mensalidade no período de pausa da escola?',
    answer: 'Sim, o contrato firmado nos 12 meses ou termo de matricula sem contrato na continuidade das aulas, inclui o pagamento normal das mensalidades nas devidas datas como parte de nossa filosofia de trabalho. Durante esse período de uma quinzena em cada mês (dezembro e janeiro) ainda haverá 4 aulas presenciais. Débitos de mensalidades nesse período não renovam a vaga e horário para o ano seguinte, até que seja quitado quaisquer pendencias.'
  },
  {
    id: 'f11',
    question: 'Como funcionam o atendimento das aulas quanto as faixa-etárias na Soar?',
    answer: 'A partir dos 4 a 7 anos de idade a criança poderá matricular no Curso de Musicalização, ensino voltado para a educação musical infantil. Onde trabalharemos propriedades do som, percepção, partitura para crianças, cantigas populares, etc. Os instrumentos trabalhados são: Canto-coral, ukulelê, xilofone, teclado, flauta doce e percussão. Será desenvolvido um trabalho de preparação musical lúdica fornecendo noções e bases fundamentais para prosseguir no estudo da música estimulando seu desenvolvimento artístico, facilitando futuros estudos musicais. Nos 8 anos em diante o aluno poderá escolher seu instrumento ou canto. O ensino para idosos também é aberto desde que não haja limitações físicas significativas do qual nossa estrutura não consiga melhor atendê-los.'
  },
  {
    id: 'f12',
    question: 'Quais cursos a Soar atende?',
    answer: 'Canto, violão, guitarra, ukulelê, baixo, teclado, bateria, musicalização, acordeon, violino, gaita, orquestra de ukulelês e coral soar.'
  },
  {
    id: 'f13',
    question: 'No Plano Gold o aluno é obrigado a fazer as aulas complementares?',
    answer: 'Não. A não participação das oficinas também não altera o valor do curso.'
  }
];