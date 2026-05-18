import { useState, useEffect, useRef } from 'react';
import logo from './assets/logo.png';
import hero from './assets/hero.png';

// Interfaces
interface Chapter {
  id: string;
  num: string;
  title: string;
  intro?: string;
  bullets: string[];
  warning?: string;
}

interface Phase {
  id: string;
  phaseLabel: string;
  title: string;
  objective: string;
  actions: string[];
  deliverablesTitle: string;
  deliverables: string[];
  outcome: string;
  active: boolean;
}

interface ExecChapter {
  num: string;
  title: string;
  objective: string;
  steps: {
    label: string;
    items: string[];
  }[];
  outcome: string;
}

interface ScriptBloco {
  num: string;
  time: string;
  title: string;
  subtext: string;
  actions?: string[];
  speeches?: { author: string; text: string }[];
  questions?: string[];
  insights?: string[];
}

export default function App() {
  const [activeSection, setActiveSection] = useState<'processos' | 'cronograma' | 'execucao' | 'giovanna'>('processos');

  // References for scroll linked navigation and blur reveals
  const mainRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);
  
  const [section1InView, setSection1InView] = useState(false);
  const [section2InView, setSection2InView] = useState(false);
  const [section3InView, setSection3InView] = useState(false);
  const [section4InView, setSection4InView] = useState(false);

  // Mouse spotlight coordinates
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (mainRef.current) {
        const rect = mainRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mainRef.current.style.setProperty('--mouse-x', `${x}px`);
        mainRef.current.style.setProperty('--mouse-y', `${y}px`);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Section observer to trigger sidebar active state and blur reveals
  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === 'processos') {
              setActiveSection('processos');
              setSection1InView(true);
            } else if (entry.target.id === 'cronograma') {
              setActiveSection('cronograma');
              setSection2InView(true);
            } else if (entry.target.id === 'execucao') {
              setActiveSection('execucao');
              setSection3InView(true);
            } else if (entry.target.id === 'giovanna') {
              setActiveSection('giovanna');
              setSection4InView(true);
            }
          } else {
            if (entry.target.id === 'processos') {
              setSection1InView(false);
            } else if (entry.target.id === 'cronograma') {
              setSection2InView(false);
            } else if (entry.target.id === 'execucao') {
              setSection3InView(false);
            } else if (entry.target.id === 'giovanna') {
              setSection4InView(false);
            }
          }
        });
      },
      {
        rootMargin: '-20% 0px -40% 0px',
        threshold: 0.05,
      }
    );

    const s1 = section1Ref.current;
    const s2 = section2Ref.current;
    const s3 = section3Ref.current;
    const s4 = section4Ref.current;

    if (s1) sectionObserver.observe(s1);
    if (s2) sectionObserver.observe(s2);
    if (s3) sectionObserver.observe(s3);
    if (s4) sectionObserver.observe(s4);

    return () => {
      if (s1) sectionObserver.unobserve(s1);
      if (s2) sectionObserver.unobserve(s2);
      if (s3) sectionObserver.unobserve(s3);
      if (s4) sectionObserver.unobserve(s4);
    };
  }, []);

  const scrollToSection = (id: 'processos' | 'cronograma' | 'execucao' | 'giovanna') => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Strategic 10 Chapters (Processos)
  const chapters: Chapter[] = [
    {
      id: "ch-1",
      num: "01",
      title: "Diagnóstico",
      intro: "Antes de qualquer proposta:",
      bullets: [
        "quem é o expert",
        "qual autoridade ele já tem",
        "audiência real",
        "conteúdo atual",
        "oferta atual",
        "histórico de vendas",
        "nível de comprometimento",
        "disponibilidade",
        "se aceita direção"
      ],
      warning: "Aqui vocês decidem se vale entrar ou não."
    },
    {
      id: "ch-2",
      num: "02",
      title: "Validação da oportunidade",
      intro: "Responder com clareza absoluta:",
      bullets: [
        "existe dor real?",
        "o público compra?",
        "tem ticket?",
        "tem recorrência?",
        "o expert consegue comunicar?",
        "o nicho permite comunidade?",
        "existe diferencial claro?"
      ],
      warning: "Se não tiver isso, não entra."
    },
    {
      id: "ch-3",
      num: "03",
      title: "Alinhamento de parceria",
      intro: "Antes de produzir qualquer coisa:",
      bullets: [
        "papel da Vértice",
        "papel do expert",
        "divisão financeira",
        "custos",
        "regra de saída",
        "frequência de entregas",
        "rotina de calls",
        "responsabilidades"
      ],
      warning: "Tudo documentado."
    },
    {
      id: "ch-4",
      num: "04",
      title: "Posicionamento",
      intro: "Definir com precisão:",
      bullets: [
        "quem ele é no mercado",
        "qual promessa central",
        "para quem ele fala",
        "qual inimigo/comum que ele combate",
        "qual narrativa",
        "qual percepção queremos construir"
      ],
      warning: "Sem posicionamento, vira conteúdo solto."
    },
    {
      id: "ch-5",
      num: "05",
      title: "Escada de produtos",
      intro: "Criar a esteira sequencial:",
      bullets: [
        "entrada: workshop / desafio / aula",
        "principal: mentoria / formação",
        "recorrência: comunidade / acompanhamento",
        "premium: presencial / imersão / mastermind"
      ],
      warning: "Não começa pelo produto maior sem validar."
    },
    {
      id: "ch-6",
      num: "06",
      title: "Estrutura comercial",
      intro: "Montar a engrenagem:",
      bullets: [
        "página",
        "formulário",
        "grupo",
        "script",
        "funil de DM",
        "CRM",
        "checkout",
        "oferta",
        "follow-up"
      ],
      warning: "Aqui nasce a máquina."
    },
    {
      id: "ch-7",
      num: "07",
      title: "Conteúdo e captação",
      intro: "Definir rotina de execução:",
      bullets: [
        "conteúdo de autoridade",
        "conteúdo de conexão",
        "conteúdo de prova",
        "conteúdo de oferta",
        "CTA para grupo / aplicação"
      ],
      warning: "O expert precisa executar."
    },
    {
      id: "ch-8",
      num: "08",
      title: "Lançamento controlado",
      intro: "Primeira venda pequena:",
      bullets: [
        "validar mensagem discursiva",
        "validar aderência da oferta",
        "validar qualificação de público"
      ],
      warning: "Objetivo: validar mensagem, oferta e público. Não é escalar ainda."
    },
    {
      id: "ch-9",
      num: "09",
      title: "Entrega e retenção",
      intro: "Aqui vocês precisam ser fortes:",
      bullets: [
        "calendário fixo",
        "onboarding",
        "suporte estudantil",
        "comunidade",
        "aulas",
        "acompanhamento",
        "registros",
        "feedbacks"
      ],
      warning: "Sem entrega, a operação morre."
    },
    {
      id: "ch-10",
      num: "10",
      title: "Escala",
      intro: "Só escala depois de provar:",
      bullets: [
        "venda",
        "entrega",
        "retenção",
        "depoimento",
        "caixa",
        "comprometimento do expert"
      ],
      warning: "Primeiro estrutura, depois escala."
    }
  ];

  // Tactical 7 Phases (Cronograma)
  const phases: Phase[] = [
    {
      id: "p-1",
      phaseLabel: "FASE 1 — DIAGNÓSTICO & ALINHAMENTO",
      title: "Semana 1",
      objective: "entender se vale construir.",
      actions: [
        "call profunda",
        "análise do expert",
        "análise do nicho",
        "análise da audiência",
        "análise do conteúdo",
        "identificar dores",
        "identificar potencial de ticket",
        "identificar diferencial"
      ],
      deliverablesTitle: "Entregas",
      deliverables: [
        "documento estratégico",
        "definição de posicionamento",
        "visão da operação",
        "alinhamento financeiro",
        "responsabilidades",
        "contrato"
      ],
      outcome: "decidir: “vamos construir isso?”",
      active: true
    },
    {
      id: "p-2",
      phaseLabel: "FASE 2 — POSICIONAMENTO & ESTRUTURA",
      title: "Semana 2",
      objective: "organizar percepção.",
      actions: [
        "bio",
        "branding",
        "narrativa",
        "direção visual",
        "promessa",
        "posicionamento",
        "oferta inicial",
        "escada de produtos"
      ],
      deliverablesTitle: "Estruturas",
      deliverables: [
        "Instagram",
        "página simples",
        "formulário",
        "grupo",
        "WhatsApp",
        "CRM",
        "domínio",
        "identidade"
      ],
      outcome: "o expert começa parecer: marca.",
      active: true
    },
    {
      id: "p-3",
      phaseLabel: "FASE 3 — CONTEÚDO & AQUECIMENTO",
      title: "Semanas 3 e 4",
      objective: "gerar percepção + demanda.",
      actions: [
        "rotina de reels",
        "bastidores",
        "autoridade",
        "provas",
        "storytelling",
        "CTA leve",
        "construção de audiência qualificada"
      ],
      deliverablesTitle: "Também",
      deliverables: [
        "mapear dúvidas",
        "validar dores",
        "observar comentários",
        "identificar linguagem do público"
      ],
      outcome: "começar gerar: leads, atenção e percepção.",
      active: false
    },
    {
      id: "p-4",
      phaseLabel: "FASE 4 — PRIMEIRA OFERTA",
      title: "Semana 5",
      objective: "validar venda.",
      actions: [
        "workshop",
        "intensivo",
        "aula premium",
        "grupo fechado",
        "experiência curta",
        "NÃO: mentoria gigante ainda"
      ],
      deliverablesTitle: "Meta",
      deliverables: [
        "validar mensagem",
        "validar ticket",
        "validar entrega",
        "gerar caixa inicial",
        "criar prova"
      ],
      outcome: "primeiras vendas reais consolidadas.",
      active: false
    },
    {
      id: "p-5",
      phaseLabel: "FASE 5 — ENTREGA & PROVA",
      title: "Semana 6",
      objective: "transformar alunos em: prova, comunidade, defensores.",
      actions: [
        "onboarding forte",
        "suporte próximo",
        "acompanhamento",
        "prints",
        "feedbacks",
        "depoimentos",
        "bastidores"
      ],
      deliverablesTitle: "Foco",
      deliverables: [
        "Instalar canais de suporte rápido",
        "Mapear feedbacks do beta",
        "Coleta contínua de depoimentos"
      ],
      outcome: "base sólida e estruturada de defensores da marca.",
      active: false
    },
    {
      id: "p-6",
      phaseLabel: "FASE 6 — ESTRUTURAÇÃO DA MENTORIA",
      title: "Semanas 7 e 8",
      objective: "construção do produto principal.",
      actions: [
        "mentoria",
        "comunidade",
        "recorrência",
        "calendário",
        "módulos",
        "calls",
        "acompanhamento"
      ],
      deliverablesTitle: "Fundação",
      deliverables: [
        "Com base no que VALIDOU antes."
      ],
      outcome: "mentoria estruturada e modelada sobre dados reais.",
      active: false
    },
    {
      id: "p-7",
      phaseLabel: "FASE 7 — ESCALA",
      title: "Após 60~90 dias",
      objective: "Só agora: tráfego, escala, automação, equipe, vendas maiores, tickets altos, recorrência forte.",
      actions: [
        "tráfego pago em escala",
        "automação de funis de e-mail/DM",
        "equipe comercial ativa",
        "vendas de ticket alto",
        "recorrência consolidada"
      ],
      deliverablesTitle: "Engenharia",
      deliverables: [
        "Processos automatizados",
        "Delegação de suporte estudantil",
        "Otimização contínua de LTV"
      ],
      outcome: "crescimento previsível e margem financeira robusta.",
      active: false
    }
  ];

  // Execution Steps (Como a Vértice Executa Cada Etapa)
  const execChapters: ExecChapter[] = [
    {
      num: "01",
      title: "Diagnóstico",
      objective: "entender se vale construir.",
      steps: [
        { label: "Como executar", items: ["Call profunda (1h~2h)"] },
        { label: "Perguntas", items: ["história dele", "visão", "dores", "faturamento", "rotina", "equipe", "objetivo", "bloqueios", "audiência", "produtos anteriores"] },
        { label: "Análise prática", items: ["Instagram", "conteúdo", "comentários", "percepção", "ticket atual", "comunicação", "autoridade", "energia da marca"] },
        { label: "Documento", items: ["criar um “Raio-X Operacional”"] }
      ],
      outcome: "decisão: entra ou não entra."
    },
    {
      num: "02",
      title: "Validação da oportunidade",
      objective: "entender se existe mercado real.",
      steps: [
        { label: "Pesquisa", items: ["concorrentes", "tickets", "formatos", "comunidade", "dores do nicho"] },
        { label: "Mapear", items: ["o que vende", "o que saturou", "o que falta", "o que gera percepção premium"] },
        { label: "Definir", items: ["potencial de escala", "potencial de recorrência", "força emocional do nicho"] }
      ],
      outcome: "tese estratégica validada."
    },
    {
      num: "03",
      title: "Alinhamento de parceria",
      objective: "evitar caos futuro.",
      steps: [
        { label: "Documento oficial", items: ["divisão", "responsabilidades", "frequência", "metas", "regras", "comunicação", "saída"] },
        { label: "Definir quem faz", items: ["conteúdo", "edição", "suporte", "vendas", "comunidade", "posicionamento"] }
      ],
      outcome: "clareza operacional estática."
    },
    {
      num: "04",
      title: "Posicionamento",
      objective: "criar percepção forte.",
      steps: [
        { label: "Construir", items: ["narrativa", "autoridade", "diferenciação", "promessa", "tom", "estética", "percepção emocional"] },
        { label: "Responder", items: ["quem ele é?", "por que seguir?", "por que comprar?", "por que confiar?"] },
        { label: "Ajustar", items: ["bio", "feed", "destaques", "linguagem", "visual", "CTA"] }
      ],
      outcome: "marca coerente construída."
    },
    {
      num: "05",
      title: "Escada de produtos",
      objective: "não depender de uma oferta única.",
      steps: [
        { label: "Criar", items: ["Produto entrada (workshop / desafio / aula)", "Produto principal (mentoria / formação)", "Recorrência (comunidade / acompanhamento)", "Premium (presencial / mastermind)"] },
        { label: "Validar", items: ["ordem lógica das ofertas de valor"] }
      ],
      outcome: "ecossistema sequencial integrado."
    },
    {
      num: "06",
      title: "Estrutura comercial",
      objective: "transformar atenção em venda.",
      steps: [
        { label: "Criar", items: ["página", "formulário", "CRM", "grupo", "checkout", "scripts", "follow-up"] },
        { label: "Organizar", items: ["funil de direct", "qualificação", "agendamento", "fechamento"] },
        { label: "Definir", items: ["CTA", "oferta", "urgência", "aplicação"] }
      ],
      outcome: "máquina comercial tracionada."
    },
    {
      num: "07",
      title: "Conteúdo & Captação",
      objective: "gerar percepção diária.",
      steps: [
        { label: "Conteúdo dividido em", items: ["autoridade", "conexão", "prova", "bastidor", "oferta"] },
        { label: "Criar", items: ["calendário", "roteiros", "hooks", "CTA", "gravações"] },
        { label: "Frequência mínima", items: ["1 a 2 reels publicados por dia"] }
      ],
      outcome: "audiência aquecida e qualificada."
    },
    {
      num: "08",
      title: "Lançamento controlado",
      objective: "validar antes de escalar.",
      steps: [
        { label: "Primeira oferta", items: ["pequena (workshop / aula premium / grupo fechado)"] },
        { label: "Meta", items: ["validar copy", "validar dor", "validar entrega", "validar ticket"] }
      ],
      outcome: "primeira prova real de viabilidade comercial."
    },
    {
      num: "09",
      title: "Entrega & Retenção",
      objective: "transformar aluno em ativo.",
      steps: [
        { label: "Criar", items: ["onboarding", "calendário", "suporte", "comunidade", "encontros", "acompanhamento"] },
        { label: "Coletar", items: ["feedback", "prints", "depoimentos", "resultados"] },
        { label: "Monitorar", items: ["retenção", "participação", "satisfação"] }
      ],
      outcome: "base sólida estruturada."
    },
    {
      num: "10",
      title: "Escala",
      objective: "crescimento previsível.",
      steps: [
        { label: "Só depois de validar", items: ["venda", "entrega", "retenção", "caixa", "operação"] },
        { label: "Aí sim", items: ["tráfego", "equipe", "automação", "lançamentos maiores", "eventos", "recorrência forte"] }
      ],
      outcome: "empresa 100% escalável."
    }
  ];

  // Script Call Giovanna (Giovanna // 18/05)
  const scriptBlocos: ScriptBloco[] = [
    {
      num: "I",
      time: "0:00 → 0:10",
      title: "Abertura",
      subtext: "Começa leve. A intenção é ouvir e criar percepção de inteligência sem qualquer pressão comercial.",
      actions: [
        "Escuta ativa absoluta.",
        "Não interrompe.",
        "Não acelera.",
        "Só deixa ela se expressar e desenvolver o fluxo."
      ],
      speeches: [
        { author: "Você", text: "Giovana, muito bom falar com você. Aqui comigo tá o [nome do sócio], a gente trabalha junto estruturando operações digitais e marcas pessoais." },
        { author: "Você", text: "Mas antes de qualquer coisa, a gente queria mais te ouvir mesmo." },
        { author: "Você", text: "O que chamou atenção no teu perfil foi justamente que parece ter muito mais aí do que só grooming." },
        { author: "Você", text: "Dá pra perceber uma construção de marca muito forte." },
        { author: "Você", text: "Conta um pouco de você e do momento que vocês estão vivendo agora." }
      ]
    },
    {
      num: "II",
      time: "0:10 → 0:25",
      title: "História Dela",
      subtext: "Aqui vocês investigam a fundo a trajetória, ambição, visão do mercado e sua autopercepção como marca.",
      questions: [
        "Como você entrou no grooming?",
        "Teve um momento que você percebeu que começou virar referência?",
        "O que mais te move hoje dentro disso?",
        "Você sempre teve essa preocupação maior com estética, experiência e marca ou isso foi acontecendo naturalmente?",
        "O que você sente que falta hoje no mercado groomer?",
        "O que você vê que a maioria faz igual e você tenta fazer diferente?",
        "O que você acha que fez as pessoas começarem enxergar valor no teu trabalho?",
        "Hoje você se enxerga mais como groomer, empresária ou marca?",
        "Você sente que tua imagem hoje representa o tamanho do que você construiu?",
        "Ou sente que ainda existe muito potencial que as pessoas nem enxergaram direito?"
      ],
      insights: [
        "Olhando o perfil dela dá pra perceber claramente: percepção premium, estética forte, autoridade natural, conexão emocional forte, presença feminina muito marcante no nicho e uma experiência física de atendimento muito bem elaborada."
      ]
    },
    {
      num: "III",
      time: "0:25 → 0:45",
      title: "Entender o que Existe Hoje",
      subtext: "Investigar a estrutura física, equipe do Borja, cursos, operação comercial e o tamanho real de sua visão (sem parecer interrogatório).",
      questions: [
        "Como surgiu essa ideia dos cursos? Foi algo que já vinha da tua cabeça ou surgiu mais através da equipe?",
        "Hoje isso ainda tá começando ou já existe uma estrutura mais organizada? Vocês já sabem exatamente o que querem construir?",
        "Hoje quem cuida mais da parte estratégica e comercial? Você ainda centraliza muita coisa?",
        "Você participa mais da criação ou da operação também? Hoje você sente que existe uma estrutura real por trás ou ainda muita coisa vai no fluxo?",
        "Quando você pensa nisso daqui alguns anos, o que você imagina? Você pensa só em curso ou enxerga algo maior?",
        "Já passou pela cabeça: comunidade, imersão, certificação, presencial, treinamento pra petshops?"
      ],
      insights: [
        "Foco total em mapear a maturidade operacional dela e o nível de delegação da equipe."
      ]
    },
    {
      num: "IV",
      time: "0:45 → 1:05",
      title: "Devolver a Leitura de Vocês",
      subtext: "Demonstrar visão e autoridade operacional profunda. Sem realizar pitches de venda.",
      speeches: [
        { author: "Você", text: "Uma coisa que chamou atenção no teu perfil é que você não passa sensação de alguém tentando vender curso. Você passa sensação de marca. E isso é raro no mercado groomer." },
        { author: "Sócio", text: "A maioria das pessoas tenta crescer só fazendo conteúdo. Mas as que realmente crescem acabam virando operação. E honestamente… teu perfil parece muito mais próximo disso." }
      ],
      insights: [
        "percepção premium",
        "estética consistente",
        "autoridade natural",
        "conexão emocional forte",
        "potencial muito forte pra presencial",
        "potencial de comunidade",
        "potencial empresarial",
        "potencial pra treinamento de petshops",
        "sensação de exclusividade estrutural"
      ]
    },
    {
      num: "V",
      time: "1:05 → 1:20",
      title: "Dor Operacional",
      subtext: "Onde a oportunidade estratégica se consolida. Descobrir os gargalos da rotina dela.",
      questions: [
        "O que mais te desgasta hoje?",
        "Onde você sente mais bagunça?",
        "O que ainda depende muito de você?",
        "O que você sente que ainda falta estrutura?",
        "Você sente que tá construindo empresa ou ainda muito presa na rotina?",
        "Hoje teu crescimento acompanha tua capacidade de organizar tudo?"
      ],
      speeches: [
        { author: "Pergunta Forte", text: "Se tua audiência dobrasse amanhã… tua estrutura sustentaria?" }
      ],
      actions: [
        "Fazer a pergunta forte e silenciar completamente. Deixar a gravidade do cenário assentar."
      ]
    },
    {
      num: "VI",
      time: "1:20 → 1:40",
      title: "Expandir a Visão Dela",
      subtext: "Projetar a escala real de ecossistema que ela não consegue enxergar presa no operacional.",
      insights: [
        "Esteira de Produtos: workshop, formação, comunidade, assinatura, acompanhamento próximo, presencial, imersão, certificação, treinamento pra petshops."
      ],
      speeches: [
        { author: "Sócio", text: "Uma coisa que a gente enxergou muito forte é teu potencial no mercado de petshops. Porque hoje muita empresa precisa de treinamento, experiência, posicionamento, padrão e equipe. E isso é algo que você naturalmente transmite. Isso sobe muito percepção e ticket." }
      ]
    },
    {
      num: "VII",
      time: "1:40 → 1:50",
      title: "Entender a Abertura Dela",
      subtext: "Análise crucial de ego, maturidade e receptividade para receber direção estratégica.",
      questions: [
        "Você gosta de receber direção estratégica?",
        "Você prefere construir algo sólido aos poucos ou acelerar?",
        "O quanto você realmente quer transformar isso numa empresa?",
        "Você gosta mais da parte artística ou da ideia de construir algo maior ao redor da tua marca?",
        "Você sente vontade de deixar algo grande nesse mercado?"
      ]
    },
    {
      num: "VIII",
      time: "1:50 → 2:00",
      title: "Fechamento Leve",
      subtext: "Terminar em alta sintonia intelectual. Sem propor negócios, sem valores, sem afobação.",
      speeches: [
        { author: "Você", text: "Pra ser sincero, essa conversa confirmou muito do que a gente já tinha sentido olhando teu perfil. Existe muita construção aí. E parece muito um momento de virada." },
        { author: "Sócio", text: "E normalmente é exatamente nesses momentos que nasce algo realmente grande." },
        { author: "Você", text: "A gente vai digerir tudo que você trouxe, entender melhor o cenário e depois conversa com mais clareza sobre próximos passos. Muito obrigado pela conversa. Foi boa de verdade." }
      ]
    }
  ];

  return (
    <div className="vertice-shell" ref={mainRef}>
      {/* Background static and dynamic overlays */}
      <div className="cinematic-noise"></div>
      <div className="bg-grid"></div>
      <div className="ambient-glow"></div>
      
      {/* Spotlight dynamic mouse element */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(0, 82, 255, 0.015) 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 2
        }}
      ></div>

      {/* Ultra Minimal Sidebar */}
      <aside className="sidebar">
        <div className="brand-section" style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '60px' }}>
          <img src={logo} alt="Vértice Logo" style={{ height: '200px', width: 'auto', alignSelf: 'flex-start', opacity: 0.95 }} />
        </div>

        <nav className="nav-menu">
          <button 
            onClick={() => scrollToSection('processos')} 
            className={`nav-item ${activeSection === 'processos' ? 'active' : ''}`}
          >
            Processos
          </button>
          
          <button 
            onClick={() => scrollToSection('cronograma')} 
            className={`nav-item ${activeSection === 'cronograma' ? 'active' : ''}`}
          >
            Cronograma
          </button>

          <button 
            onClick={() => scrollToSection('execucao')} 
            className={`nav-item ${activeSection === 'execucao' ? 'active' : ''}`}
          >
            Execução
          </button>

          <button 
            onClick={() => scrollToSection('giovanna')} 
            className={`nav-item ${activeSection === 'giovanna' ? 'active' : ''}`}
          >
            Giovanna 18/05
          </button>
        </nav>

        <div className="sidebar-footer">
          VÉRTICE OS<br />
          CONFIDENCIAL // V0.1
        </div>
      </aside>

      {/* Main Reading Workspace */}
      <main className="cockpit-container">
        
        {/* Editorial Strategic Hero */}
        <header className="doctrine-hero" style={{ display: 'flex', justifyContent: 'space-between', gap: '40px', alignItems: 'flex-start' }}>
          <div style={{ maxWidth: '640px' }}>
            <span className="doctrine-label">Doutrina Operacional // V01</span>
            <h1 className="doctrine-hero-title">
              Estrutura antes<br />de <strong>escala.</strong>
            </h1>
            <p className="doctrine-hero-subtext">
              A VÉRTICE documenta, organiza e estrutura operações digitais para experts e marcas pessoais de elite, construindo a infraestrutura invisível por trás do crescimento previsível.
            </p>
          </div>
          <img src={hero} alt="Vértice Blueprint Layers" style={{ height: '220px', width: 'auto', opacity: 0.35, mixBlendMode: 'screen', filter: 'contrast(1.15)', marginTop: '12px', pointerEvents: 'none' }} />
        </header>

        {/* SECTION 1: PROCESSOS (A DOUTRINA) */}
        <section 
          id="processos" 
          ref={section1Ref}
          className={`doctrine-section ${section1InView ? 'in-view' : 'out-of-view'}`}
        >
          <div className="section-divider"></div>
          
          <div className="section-header-editorial">
            <span className="section-index">Arquivo 01 // Processos</span>
            <h2 className="section-title-editorial">A Linha de Produção Estratégica</h2>
          </div>

          <div className="timeline-editorial">
            {chapters.map((ch) => (
              <div key={ch.id} className="chapter-editorial">
                <span className="chapter-num">{ch.num}</span>
                <span className="chapter-heading">{ch.title}</span>
                <div className="chapter-body">
                  {ch.intro && (
                    <span 
                      style={{ 
                        fontFamily: 'var(--font-mono)', 
                        fontSize: '9.5px', 
                        color: 'var(--glow-blue-solid)', 
                        textTransform: 'uppercase', 
                        letterSpacing: '1px', 
                        marginBottom: '10px', 
                        display: 'block' 
                      }}
                    >
                      {ch.intro}
                    </span>
                  )}
                  
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '8px' }}>
                    {ch.bullets.map((b, idx) => (
                      <li 
                        key={idx} 
                        style={{ 
                          fontSize: '13px', 
                          color: 'var(--text-secondary)', 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '8px', 
                          fontWeight: 300 
                        }}
                      >
                        <span style={{ width: '3px', height: '3px', backgroundColor: 'var(--text-muted)', borderRadius: '50%' }}></span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  {ch.warning && (
                    <div style={{ borderLeft: '1px solid var(--text-primary)', paddingLeft: '10px', marginTop: '12px' }}>
                      <p 
                        style={{ 
                          fontSize: '11px', 
                          fontFamily: 'var(--font-mono)', 
                          color: 'var(--text-primary)', 
                          textTransform: 'uppercase', 
                          letterSpacing: '0.5px', 
                          fontWeight: 500 
                        }}
                      >
                        // {ch.warning}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: CRONOGRAMA (O ROADMAP DE AÇO) */}
        <section 
          id="cronograma" 
          ref={section2Ref}
          className={`doctrine-section ${section2InView ? 'in-view' : 'out-of-view'}`}
        >
          <div className="section-divider"></div>

          <div className="section-header-editorial">
            <span className="section-index">Arquivo 02 // Cronograma</span>
            <h2 className="section-title-editorial">Roadmap de Aço</h2>
          </div>

          <div className="roadmap-vertical">
            {phases.map((phase) => (
              <div 
                key={phase.id} 
                className={`roadmap-phase ${phase.active ? 'active' : ''}`}
              >
                <div className="phase-header">
                  <span className="phase-label">{phase.phaseLabel}</span>
                  <h3 className="phase-title">{phase.title}</h3>
                </div>

                <div className="phase-grid">
                  <div className="phase-cell">
                    <span className="phase-cell-title">Objetivo</span>
                    <p className="phase-cell-content" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                      {phase.objective}
                    </p>
                  </div>
                  
                  <div className="phase-cell">
                    <span className="phase-cell-title">Fazer / Ações</span>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {phase.actions.map((act, idx) => (
                        <li key={idx} style={{ fontSize: '12.5px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 300 }}>
                          <span style={{ width: '3px', height: '3px', backgroundColor: 'var(--text-muted)', borderRadius: '50%' }}></span>
                          {act}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="phase-cell">
                    <span className="phase-cell-title">{phase.deliverablesTitle}</span>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {phase.deliverables.map((del, idx) => (
                        <li key={idx} style={{ fontSize: '12.5px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 300 }}>
                          <span style={{ width: '3px', height: '3px', backgroundColor: 'var(--text-muted)', borderRadius: '50%' }}></span>
                          {del}
                        </li>
                      ))}
                    </ul>
                    
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.02)', paddingTop: '8px', marginTop: '12px' }}>
                      <span className="phase-cell-title" style={{ color: 'var(--text-primary)' }}>Resultado</span>
                      <p className="phase-cell-content" style={{ color: 'var(--glow-blue-solid)', fontFamily: 'var(--font-mono)', fontSize: '11.5px', marginTop: '2px' }}>
                        {phase.outcome}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Retro Retrospective strategic warning box */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '40px', marginTop: '80px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', color: 'var(--glow-blue-solid)', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
                // DIAGNÓSTICO RETROSPECTIVO
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '16px', letterSpacing: '-0.3px' }}>
                O Erro Que Quebrou Vocês Antes
              </h3>
              <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '24px', fontWeight: 300 }}>
                Vocês começaram pela mentoria. Sem: percepção forte, validação, produto menor, estrutura emocional e operação sólida. A nova Vértice precisa seguir um caminho de engenharia limpa:
              </p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-primary)', backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', padding: '16px 20px', borderRadius: '4px' }}>
                <span>PERCEPÇÃO</span>
                <span style={{ color: 'var(--text-muted)' }}>→</span>
                <span>COMUNIDADE</span>
                <span style={{ color: 'var(--text-muted)' }}>→</span>
                <span>VALIDAÇÃO</span>
                <span style={{ color: 'var(--text-muted)' }}>→</span>
                <span>ESTRUTURA</span>
                <span style={{ color: 'var(--text-muted)' }}>→</span>
                <span>ESCALA</span>
              </div>
              
              <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginTop: '16px' }}>
                // E não: “abre turma e vende.”
              </p>
            </div>

          </div>
        </section>

        {/* SECTION 3: EXECUÇÃO (COMO A VÉRTICE EXECUTA CADA ETAPA) */}
        <section 
          id="execucao" 
          ref={section3Ref}
          className={`doctrine-section ${section3InView ? 'in-view' : 'out-of-view'}`}
        >
          <div className="section-divider"></div>

          <div className="section-header-editorial">
            <span className="section-index">Arquivo 03 // Execução</span>
            <h2 className="section-title-editorial">Protocolos de Execução</h2>
            <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'var(--text-secondary)', marginTop: '16px', fontWeight: 300, maxWidth: '780px' }}>
              A diferença entre uma “ideia bonita” e uma “operação real” é a execução rígida. A Vértice opera sob rituais, processos padronizados e documentação técnica estática — a operação nunca deve depender do humor do expert.
            </p>
          </div>

          <div className="timeline-editorial">
            {execChapters.map((ch) => (
              <div key={ch.num} className="chapter-editorial">
                <span className="chapter-num">{ch.num}</span>
                <div>
                  <span className="chapter-heading" style={{ display: 'block', marginBottom: '8px' }}>{ch.title}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--glow-blue-solid)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Objetivo: {ch.objective}
                  </span>
                </div>
                <div className="chapter-body">
                  {ch.steps.map((step, sIdx) => (
                    <div key={sIdx} style={{ marginBottom: '12px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>
                        // {step.label}
                      </span>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {step.items.map((item, iIdx) => (
                          <li key={iIdx} style={{ fontSize: '12.5px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 300 }}>
                            <span style={{ width: '3px', height: '3px', backgroundColor: 'var(--text-muted)', borderRadius: '50%' }}></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.02)', paddingTop: '8px', marginTop: '12px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8.5px', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                      Resultado Esperado
                    </span>
                    <p style={{ fontSize: '13px', color: 'var(--glow-blue-solid)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                      {ch.outcome}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* O SEGREDO DA VÉRTICE strategic warning box */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '40px', marginTop: '80px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', color: 'var(--glow-blue-solid)', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
              // COCKPIT OPERACIONAL
            </span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '16px', letterSpacing: '-0.3px' }}>
              O Segredo da Vértice
            </h3>
            <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '24px', fontWeight: 300 }}>
              A Vértice não deveria operar como uma agência tradicional. Ela deveria operar como uma infraestrutura estratégica de escala estática:
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', padding: '24px', borderRadius: '4px' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                  Entrada do Expert
                </span>
                <p style={{ fontSize: '15px', color: 'var(--text-primary)', fontWeight: 400 }}>
                  Desorganizado & Centralizado
                </p>
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--glow-blue-solid)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                  Saída do Expert
                </span>
                <p style={{ fontSize: '15px', color: 'var(--text-primary)', fontWeight: 400 }}>
                  Operação & Infraestrutura de Status
                </p>
              </div>
            </div>
            
            <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginTop: '16px' }}>
              // Ritual + Processo + Documentação Técnica Confidencial.
            </p>
          </div>
        </section>

        {/* SECTION 4: GIOVANNA // 18/05 (ROTEIRO DA CALL) */}
        <section 
          id="giovanna" 
          ref={section4Ref}
          className={`doctrine-section ${section4InView ? 'in-view' : 'out-of-view'}`}
        >
          <div className="section-divider"></div>

          <div className="section-header-editorial">
            <span className="section-index">Arquivo 04 // Giovanna // 18/05</span>
            <h2 className="section-title-editorial">Roteiro da Call — Giovanna</h2>
            <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'var(--text-secondary)', marginTop: '16px', fontWeight: 300, maxWidth: '780px' }}>
              Duração: <strong>1h30 ~ 2h</strong> | Participantes: Você + Sócio + Giovana.
              <br />
              <span style={{ color: 'var(--glow-blue-solid)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                // A ideia da call NÃO é vender nada. É entender ela, o momento dela e o que realmente existe por trás da marca. Tem que parecer uma conversa inteligente e natural — não uma reunião comercial.
              </span>
            </p>
          </div>

          <div className="timeline-editorial">
            {scriptBlocos.map((bloco) => (
              <div key={bloco.num} className="chapter-editorial" style={{ gridTemplateColumns: '120px 1.2fr 2fr' }}>
                <div>
                  <span className="chapter-num" style={{ display: 'block' }}>Bloco {bloco.num}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
                    {bloco.time}
                  </span>
                </div>
                <div>
                  <span className="chapter-heading" style={{ display: 'block', marginBottom: '8px' }}>{bloco.title}</span>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 300 }}>
                    {bloco.subtext}
                  </p>
                </div>
                <div className="chapter-body">
                  
                  {/* Actions checklist */}
                  {bloco.actions && (
                    <div style={{ marginBottom: '16px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--glow-blue-solid)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>
                        // Ações de Cockpit
                      </span>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {bloco.actions.map((act, idx) => (
                          <li key={idx} style={{ fontSize: '12.5px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 400 }}>
                            <span style={{ width: '4px', height: '4px', backgroundColor: 'var(--glow-blue-solid)', borderRadius: '50%' }}></span>
                            {act}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Suggest Speech bubbles */}
                  {bloco.speeches && (
                    <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block' }}>
                        // Roteiro / Falas Sugeridas
                      </span>
                      {bloco.speeches.map((sp, idx) => (
                        <div key={idx} style={{ backgroundColor: 'rgba(255,255,255,0.01)', borderLeft: '1px solid var(--border-color-active)', padding: '10px 14px' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8.5px', color: 'var(--glow-blue-solid)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                            {sp.author}
                          </span>
                          <p style={{ fontSize: '13px', color: 'var(--text-primary)', fontStyle: 'italic', fontWeight: 300, lineHeight: '1.5' }}>
                            "{sp.text}"
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Key Questions */}
                  {bloco.questions && (
                    <div style={{ marginBottom: '16px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>
                        // Perguntas Estratégicas
                      </span>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {bloco.questions.map((q, idx) => (
                          <li key={idx} style={{ fontSize: '13px', color: 'var(--text-primary)', display: 'flex', alignItems: 'flex-start', gap: '8px', fontWeight: 300 }}>
                            <span style={{ color: 'var(--glow-blue-solid)', fontFamily: 'var(--font-mono)' }}>•</span>
                            <span>{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Operational insights */}
                  {bloco.insights && (
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.02)', paddingTop: '8px', marginTop: '12px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8.5px', color: 'var(--glow-blue-solid)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                        Diretiva Operacional / Leitura
                      </span>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px' }}>
                        {bloco.insights.map((ins, idx) => (
                          <li key={idx} style={{ fontSize: '12.5px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 300 }}>
                            <span style={{ width: '3px', height: '3px', backgroundColor: 'var(--text-muted)', borderRadius: '50%' }}></span>
                            {ins}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>
              </div>
            ))}
          </div>

          {/* O QUE ANOTAR & O QUE NÃO FAZER Grid */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '60px', marginTop: '80px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', color: 'var(--glow-blue-solid)', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '24px' }}>
              // PROTOCOLOS DE AVALIAÇÃO DE COCKPIT
            </span>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '30px', marginBottom: '40px' }}>
              
              {/* Col 1: Mentalidade */}
              <div style={{ backgroundColor: 'rgba(255,255,255,0.005)', border: '1px solid var(--border-color)', padding: '24px', borderRadius: '4px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '16px' }}>
                  1. Mentalidade (Anotar)
                </span>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 300 }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '4px', height: '4px', backgroundColor: 'var(--glow-blue-solid)', borderRadius: '50%' }}></span>artista ou empresária</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '4px', height: '4px', backgroundColor: 'var(--glow-blue-solid)', borderRadius: '50%' }}></span>emocional ou racional</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '4px', height: '4px', backgroundColor: 'var(--glow-blue-solid)', borderRadius: '50%' }}></span>organizada ou caótica</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '4px', height: '4px', backgroundColor: 'var(--glow-blue-solid)', borderRadius: '50%' }}></span>disciplinada</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '4px', height: '4px', backgroundColor: 'var(--glow-blue-solid)', borderRadius: '50%' }}></span>ambiciosa</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '4px', height: '4px', backgroundColor: 'var(--glow-blue-solid)', borderRadius: '50%' }}></span>aberta à direção</li>
                </ul>
              </div>

              {/* Col 2: Operação */}
              <div style={{ backgroundColor: 'rgba(255,255,255,0.005)', border: '1px solid var(--border-color)', padding: '24px', borderRadius: '4px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '16px' }}>
                  2. Operação (Anotar)
                </span>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 300 }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '4px', height: '4px', backgroundColor: 'var(--glow-blue-solid)', borderRadius: '50%' }}></span>quem lidera</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '4px', height: '4px', backgroundColor: 'var(--glow-blue-solid)', borderRadius: '50%' }}></span>quem executa</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '4px', height: '4px', backgroundColor: 'var(--glow-blue-solid)', borderRadius: '50%' }}></span>gargalos reais</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '4px', height: '4px', backgroundColor: 'var(--glow-blue-solid)', borderRadius: '50%' }}></span>dependência pessoal</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '4px', height: '4px', backgroundColor: 'var(--glow-blue-solid)', borderRadius: '50%' }}></span>maturidade da equipe</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '4px', height: '4px', backgroundColor: 'var(--glow-blue-solid)', borderRadius: '50%' }}></span>visão da operação</li>
                </ul>
              </div>

              {/* Col 3: Mercado */}
              <div style={{ backgroundColor: 'rgba(255,255,255,0.005)', border: '1px solid var(--border-color)', padding: '24px', borderRadius: '4px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '16px' }}>
                  3. Mercado (Anotar)
                </span>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 300 }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '4px', height: '4px', backgroundColor: 'var(--glow-blue-solid)', borderRadius: '50%' }}></span>ticket atual</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '4px', height: '4px', backgroundColor: 'var(--glow-blue-solid)', borderRadius: '50%' }}></span>potencial de comunidade</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '4px', height: '4px', backgroundColor: 'var(--glow-blue-solid)', borderRadius: '50%' }}></span>potencial presencial</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '4px', height: '4px', backgroundColor: 'var(--glow-blue-solid)', borderRadius: '50%' }}></span>potencial empresarial</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '4px', height: '4px', backgroundColor: 'var(--glow-blue-solid)', borderRadius: '50%' }}></span>potencial de recorrência</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '4px', height: '4px', backgroundColor: 'var(--glow-blue-solid)', borderRadius: '50%' }}></span>percepção da marca</li>
                </ul>
              </div>

            </div>

            {/* O QUE NÃO FAZER (Contra-protocolo de Segurança) */}
            <div style={{ backgroundColor: 'rgba(255, 77, 77, 0.01)', border: '1px solid rgba(255, 77, 77, 0.1)', padding: '24px', borderRadius: '4px', marginBottom: '40px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#FF4D4D', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '16px' }}>
                // Contra-protocolo de Segurança: O QUE NÃO FAZER
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 300 }}>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: '#FF4D4D' }}>❌</span> Falar mais do que ouvir</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: '#FF4D4D' }}>❌</span> Tentar impressionar ou ostentar métodos</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: '#FF4D4D' }}>❌</span> Parecer um lançador tradicional</li>
                </ul>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: '#FF4D4D' }}>❌</span> Parecer uma agência de marketing genérica</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: '#FF4D4D' }}>❌</span> Mencionar dinheiro ou divisão comercial cedo demais</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: '#FF4D4D' }}>❌</span> Preencher silêncios ou tentar vender na primeira call</li>
                </ul>
              </div>
            </div>

            {/* A PERGUNTA FINAL */}
            <div style={{ backgroundColor: 'rgba(0, 82, 255, 0.02)', border: '1px solid var(--glow-blue-solid)', padding: '32px', borderRadius: '4px', textAlign: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--glow-blue-solid)', textTransform: 'uppercase', letterSpacing: '3px', display: 'block', marginBottom: '12px' }}>
                // CRITÉRIO DE ADMISSÃO FINAL
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 500, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
                “Vale construir uma operação ao redor dessa pessoa?”
              </h2>
              <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginTop: '16px' }}>
                // VÉRTICE COCKPIT DECISORIO. APROVAÇÃO OU RECUSA ABSOLUTA.
              </p>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}
