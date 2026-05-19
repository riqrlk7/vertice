import { useState, useEffect, useRef } from 'react';
import logo from './assets/logo.png';

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

interface ExpertDossier {
  id: string;
  name: string;
  status: string;
  area: string;
  validation: string;
  directive: string;
}

interface OperationalFile {
  id: string;
  title: string;
  description: string;
  category: string;
}

export default function App() {
  const [activeSection, setActiveSection] = useState<'processos' | 'cronograma' | 'execucao' | 'experts' | 'arquivos'>('processos');

  // References for scroll linked navigation and blur reveals
  const mainRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);
  const section5Ref = useRef<HTMLDivElement>(null);
  
  const [section1InView, setSection1InView] = useState(false);
  const [section2InView, setSection2InView] = useState(false);
  const [section3InView, setSection3InView] = useState(false);
  const [section4InView, setSection4InView] = useState(false);
  const [section5InView, setSection5InView] = useState(false);

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
            } else if (entry.target.id === 'experts') {
              setActiveSection('experts');
              setSection4InView(true);
            } else if (entry.target.id === 'arquivos') {
              setActiveSection('arquivos');
              setSection5InView(true);
            }
          } else {
            if (entry.target.id === 'processos') {
              setSection1InView(false);
            } else if (entry.target.id === 'cronograma') {
              setSection2InView(false);
            } else if (entry.target.id === 'execucao') {
              setSection3InView(false);
            } else if (entry.target.id === 'experts') {
              setSection4InView(false);
            } else if (entry.target.id === 'arquivos') {
              setSection5InView(false);
            }
          }
        });
      },
      {
        rootMargin: '-30% 0px -50% 0px',
        threshold: 0.05,
      }
    );

    const s1 = section1Ref.current;
    const s2 = section2Ref.current;
    const s3 = section3Ref.current;
    const s4 = section4Ref.current;
    const s5 = section5Ref.current;

    if (s1) sectionObserver.observe(s1);
    if (s2) sectionObserver.observe(s2);
    if (s3) sectionObserver.observe(s3);
    if (s4) sectionObserver.observe(s4);
    if (s5) sectionObserver.observe(s5);

    return () => {
      if (s1) sectionObserver.unobserve(s1);
      if (s2) sectionObserver.unobserve(s2);
      if (s3) sectionObserver.unobserve(s3);
      if (s4) sectionObserver.unobserve(s4);
      if (s5) sectionObserver.unobserve(s5);
    };
  }, []);

  const scrollToSection = (id: 'processos' | 'cronograma' | 'execucao' | 'experts' | 'arquivos') => {
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
      warning: "Aqui decidimos se vale entrar ou não."
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
      warning: "Sem isso, a operação não avança."
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
      warning: "Tudo documentado estaticamente."
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
        "qual inimigo comum que ele combate",
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
      warning: "O expert precisa executar rígido."
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
      intro: "Onde reside a força da Vértice:",
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
      outcome: "decidir se vamos construir isso.",
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
      outcome: "o expert começa a parecer uma marca de status.",
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
      outcome: "geração contínua de leads, atenção e percepção.",
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
        "sem mentoria gigante ainda"
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
      objective: "transformar alunos em prova e comunidade.",
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
      objective: "Tráfego, escala, automação, equipe, vendas maiores.",
      actions: [
        "tráfego pago em escala",
        "automação de funis de e-mail/DM",
        "equipe comercial ativa",
        "vendas de ticket alto",
        "recorrência de alta fidelidade"
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
      outcome: "decisão absoluta: entra ou não entra."
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

  // Experts dossiers (Dossiês de experts)
  const expertDossiers: ExpertDossier[] = [
    {
      id: "EXP-01",
      name: "Giovanna Borja",
      status: "Em validação ativa",
      area: "Grooming de elite & Experiência física premium",
      validation: "Mensagem discursiva validada. Bio, identidade estética e esteira de produtos de entrada (workshop/aula premium) desenhadas.",
      directive: "Foco no alinhamento do Borja Academy. Transição da imagem artística pessoal para infraestrutura empresarial escalável."
    },
    {
      id: "EXP-02",
      name: "Confidencial // E-02",
      status: "Alinhamento estratégico",
      area: "Engenharia Comercial & Vendas de Alto Ticket",
      validation: "Estruturação de funil de aplicação em andamento. Mapeamento de audiência real.",
      directive: "Definição de modelo de participação societária estrita. Construção do cockpit operacional."
    },
    {
      id: "EXP-03",
      name: "Confidencial // E-03",
      status: "Diagnóstico inicial",
      area: "Medicina Integrativa & Saúde de Alta Performance",
      validation: "Raio-X operacional iniciado. Avaliação de nível de comprometimento do expert.",
      directive: "Identificação de gargalos de rotina. Avaliação se o expert aceita direção operacional pura."
    }
  ];

  // Operational Archives (Acervo Operacional)
  const operationalFiles: OperationalFile[] = [
    {
      id: "DOC-01",
      title: "Diretiva de Status & Posicionamento Editorial // V01",
      description: "Protocolo técnico para construção de percepção de autoridade inacessível. Diretrizes de comunicação, design minimalista e tom de voz institucional para marcas de elite.",
      category: "Estratégia"
    },
    {
      id: "DOC-02",
      title: "Protocolo de Qualificação de Leads (Funil de DM) // V02",
      description: "Manual de perguntas de triagem e fluxo comercial para filtrar leads no Instagram Direct. Regras estritas para agendamento de chamadas apenas com perfis de altíssima aderência.",
      category: "Comercial"
    },
    {
      id: "DOC-03",
      title: "Matriz de Escada de Valor & Esteira Sequencial // V01",
      description: "Desenho padrão para precificação de produtos de entrada (workshops), produto principal (mentoria) e recorrência premium (mastermind presencial).",
      category: "Produto"
    },
    {
      id: "DOC-04",
      title: "Raio-X Operacional Padronizado (Admissão) // V03",
      description: "Questionário técnico confidencial para auditoria completa de experts antes do contrato de parceria estratégica.",
      category: "Admissão"
    }
  ];

  return (
    <div className="vertice-shell" ref={mainRef}>
      {/* Background static overlays */}
      <div className="cinematic-noise"></div>
      <div className="bg-grid"></div>
      <div className="ambient-glow"></div>
      <img src={logo} alt="" className="bg-watermark-logo" />

      {/* Ultra Minimal Sidebar */}
      <aside className="sidebar">
        <div className="brand-section">
          <span className="brand-name">Vértice</span>
          <span className="brand-tagline">Acervo Operacional</span>
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
            onClick={() => scrollToSection('experts')} 
            className={`nav-item ${activeSection === 'experts' ? 'active' : ''}`}
          >
            Experts
          </button>

          <button 
            onClick={() => scrollToSection('arquivos')} 
            className={`nav-item ${activeSection === 'arquivos' ? 'active' : ''}`}
          >
            Arquivos
          </button>
        </nav>

        <div className="sidebar-footer">
          VÉRTICE_SYS<br />
          Internal Operational Infrastructure
        </div>
      </aside>

      {/* Main Reading Workspace */}
      <main className="cockpit-container">
        
        {/* Editorial Strategic Hero */}
        <header className="doctrine-hero">
          <span className="doctrine-label">Doutrina Operacional // V01</span>
          <h1 className="doctrine-hero-title">
            Estrutura antes<br />de <strong>escala.</strong>
          </h1>
          <p className="doctrine-hero-subtext">
            Infraestrutura operacional para experts e marcas pessoais.
          </p>
        </header>

        {/* SECTION 1: PROCESSOS (A DOUTRINA) */}
        <section 
          id="processos" 
          ref={section1Ref}
          className={`doctrine-section ${section1InView ? 'in-view' : 'out-of-view'}`}
        >
          <div className="section-divider"></div>
          
          <div className="section-header-editorial">
            <span className="section-index">Arquivo 01 // Acervo de Processos</span>
            <h2 className="section-title-editorial">A Linha de Produção Estratégica</h2>
            <p className="section-description-editorial">
              Cada etapa de admissão, validação e estruturação da Vértice segue protocolos estáticos rígidos de engenharia operacional.
            </p>
          </div>

          <div className="editorial-process-list">
            {chapters.map((ch) => (
              <div key={ch.id} className="editorial-process-block">
                <span className="editorial-num">{ch.num}</span>
                <div className="editorial-content">
                  <span className="editorial-meta">// Protocolo {ch.num}</span>
                  <h3 className="editorial-heading">{ch.title}</h3>
                  {ch.intro && <p className="editorial-body">{ch.intro}</p>}
                  
                  <ul className="editorial-bullets">
                    {ch.bullets.map((b, idx) => (
                      <li key={idx} className="editorial-bullet-item">
                        <span className="editorial-bullet-dot"></span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {ch.warning && (
                    <div className="editorial-warning">
                      <p className="editorial-warning-text">// Diretiva: {ch.warning}</p>
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
            <span className="section-index">Arquivo 02 // Cronograma Estratégico</span>
            <h2 className="section-title-editorial">Roadmap de Aço</h2>
            <p className="section-description-editorial">
              A linha de tempo operacional é dividida em blocos estanques de validação. Não passamos para a próxima etapa sem validar a anterior.
            </p>
          </div>

          <div className="strategic-roadmap">
            {phases.map((phase) => (
              <div key={phase.id} className="strategic-block">
                <span className="strategic-week-label">{phase.phaseLabel}</span>
                <h3 className="strategic-phase-title">{phase.title}</h3>
                
                <div className="strategic-phase-grid">
                  <div className="strategic-phase-cell">
                    <span className="strategic-cell-title">Objetivo</span>
                    <p className="strategic-cell-content" style={{ fontWeight: 400, color: 'var(--text-primary)' }}>
                      {phase.objective}
                    </p>
                  </div>
                  
                  <div className="strategic-phase-cell">
                    <span className="strategic-cell-title">Ações Operacionais</span>
                    <ul className="strategic-cell-list">
                      {phase.actions.map((act, idx) => (
                        <li key={idx} className="strategic-cell-list-item">
                          <span className="strategic-cell-list-dot"></span>
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="strategic-phase-cell">
                    <span className="strategic-cell-title">Entregas Técnicas</span>
                    <ul className="strategic-cell-list">
                      {phase.deliverables.map((del, idx) => (
                        <li key={idx} className="strategic-cell-list-item">
                          <span className="strategic-cell-list-dot"></span>
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                    <div style={{ marginTop: '16px', borderTop: '1px solid rgba(255,255,255,0.02)', paddingTop: '10px' }}>
                      <span className="strategic-cell-title">Resultado</span>
                      <p className="strategic-outcome">// {phase.outcome}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Strategic Retro Warning Box */}
            <div className="strategic-retro-box">
              <span className="doctrine-label">// Diagnóstico Retrospectivo</span>
              <h3 className="strategic-retro-title">O Erro Histórico da Operação</h3>
              <p className="strategic-retro-body">
                Começar pela estruturação do produto final sem validação comercial, sem posicionamento estrito e sem percepção elitizada de marca é o caminho garantido para o colapso operacional. A nova doutrina Vértice exige engenharia reversa estrita:
              </p>
              
              <div className="strategic-retro-pipeline">
                <span className="strategic-pipeline-item">PERCEPÇÃO</span>
                <span className="strategic-pipeline-arrow">→</span>
                <span className="strategic-pipeline-item">COMUNIDADE</span>
                <span className="strategic-pipeline-arrow">→</span>
                <span className="strategic-pipeline-item">VALIDAÇÃO</span>
                <span className="strategic-pipeline-arrow">→</span>
                <span className="strategic-pipeline-item">ESTRUTURA</span>
                <span className="strategic-pipeline-arrow">→</span>
                <span className="strategic-pipeline-item">ESCALA</span>
              </div>
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
            <span className="section-index">Arquivo 03 // Protocolos de Execução</span>
            <h2 className="section-title-editorial">Manual de Procedimentos Técnicos</h2>
            <p className="section-description-editorial">
              Rituais e metodologias estáticas para blindar a operação contra oscilações de humor ou interferências externas do expert.
            </p>
          </div>

          <div className="procedural-manual">
            {execChapters.map((ch) => (
              <div key={ch.num} className="procedure-block">
                <div className="procedure-header">
                  <div className="procedure-title-wrapper">
                    <span className="procedure-num">{ch.num}</span>
                    <h3 className="procedure-title">{ch.title}</h3>
                  </div>
                  <span className="procedure-objective">Objetivo: {ch.objective}</span>
                </div>
                
                <div className="procedure-body">
                  {ch.steps.map((step, idx) => (
                    <div key={idx} className="procedure-step-section">
                      <span className="procedure-step-label">// {step.label}</span>
                      <ul className="procedure-step-list">
                        {step.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="procedure-step-item">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  
                  <div className="procedure-outcome-box">
                    <span className="procedure-outcome-title">Diretiva de Resultado</span>
                    <p className="procedure-outcome-text">// {ch.outcome}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cockpit-dossier-box">
            <span className="doctrine-label">// Cockpit Operacional</span>
            <h3 className="cockpit-dossier-title">Infraestrutura Invisível</h3>
            <p className="strategic-retro-body" style={{ marginBottom: '32px' }}>
              A Vértice opera como uma camada técnica silenciosa. A reputação, a organização e o status comercial do expert são blindados e lapidados sob nossa tutela direta.
            </p>
            
            <div className="cockpit-dossier-grid">
              <div className="dossier-panel">
                <span className="dossier-panel-label">Estado de Entrada do Expert</span>
                <p className="dossier-panel-val">Desorganizado, Centralizador, Vulnerável ao humor</p>
              </div>
              <div className="dossier-panel">
                <span className="dossier-panel-label">Estado sob Supervisão Vértice</span>
                <p className="dossier-panel-val">Operação estática, Status inabalável, Escala blindada</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: EXPERTS (DOSSIÊS DE EXPERTS CONFIDENCIAIS) */}
        <section 
          id="experts" 
          ref={section4Ref}
          className={`doctrine-section ${section4InView ? 'in-view' : 'out-of-view'}`}
        >
          <div className="section-divider"></div>

          <div className="section-header-editorial">
            <span className="section-index">Arquivo 04 // Experts em Custódia</span>
            <h2 className="section-title-editorial">Coorte de Operações Ativas</h2>
            <p className="section-description-editorial">
              Marcas pessoais e experts sob tutela estratégica da Vértice. O acesso e as informações contidas nestes dossiês são de natureza restrita.
            </p>
          </div>

          <div className="experts-editorial-grid">
            {expertDossiers.map((exp) => (
              <div key={exp.id} className="expert-dossier-card">
                <div className="expert-dossier-header">
                  <span className="expert-id">{exp.id}</span>
                  <span className="expert-status-tag">{exp.status}</span>
                </div>
                
                <h3 className="expert-name">{exp.name}</h3>
                
                <div className="expert-details-list">
                  <div className="expert-detail-item">
                    <span className="expert-detail-label">Área de Atuação</span>
                    <p className="expert-detail-value">{exp.area}</p>
                  </div>
                  <div className="expert-detail-item">
                    <span className="expert-detail-label">Estado de Validação</span>
                    <p className="expert-detail-value">{exp.validation}</p>
                  </div>
                  <div className="expert-detail-item">
                    <span className="expert-detail-label">Diretiva Principal</span>
                    <p className="expert-detail-value">{exp.directive}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: ARQUIVOS (ACERVO TÉCNICO CONFIDENCIAL) */}
        <section 
          id="arquivos" 
          ref={section5Ref}
          className={`doctrine-section ${section5InView ? 'in-view' : 'out-of-view'}`}
        >
          <div className="section-divider"></div>

          <div className="section-header-editorial">
            <span className="section-index">Arquivo 05 // Acervo Técnico</span>
            <h2 className="section-title-editorial">Inteligência Organizacional</h2>
            <p className="section-description-editorial">
              Diretivas internas, manuais práticos e memorandos operacionais estáticos para uso da equipe técnica Vértice.
            </p>
          </div>

          <div className="archives-dossier-list">
            {operationalFiles.map((file) => (
              <div key={file.id} className="archive-file-row">
                <span className="archive-file-id">{file.id}</span>
                <div className="archive-file-meta-col">
                  <h3 className="archive-file-title">{file.title}</h3>
                  <p className="archive-file-desc">{file.description}</p>
                </div>
                <div className="archive-action-col">
                  <span className="archive-badge">{file.category}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
