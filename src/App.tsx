import { useState, useEffect, useRef } from 'react';
import { Layers, Calendar, Cpu } from 'lucide-react';
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


export default function App() {
  const [activeSection, setActiveSection] = useState<'processos' | 'cronograma' | 'execucao'>('processos');

  // References for scroll linked navigation and blur reveals
  const mainRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  
  const [section1InView, setSection1InView] = useState(false);
  const [section2InView, setSection2InView] = useState(false);
  const [section3InView, setSection3InView] = useState(false);

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
            }
          } else {
            if (entry.target.id === 'processos') {
              setSection1InView(false);
            } else if (entry.target.id === 'cronograma') {
              setSection2InView(false);
            } else if (entry.target.id === 'execucao') {
              setSection3InView(false);
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

    if (s1) sectionObserver.observe(s1);
    if (s2) sectionObserver.observe(s2);
    if (s3) sectionObserver.observe(s3);

    return () => {
      if (s1) sectionObserver.unobserve(s1);
      if (s2) sectionObserver.unobserve(s2);
      if (s3) sectionObserver.unobserve(s3);
    };
  }, []);

  const scrollToSection = (id: 'processos' | 'cronograma' | 'execucao') => {
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

      {/* Scan technical light */}
      <div className="scan-light"></div>
      
      {/* Operational energy line */}
      <div className="operational-energy-line"></div>

      {/* Ultra Minimal Sidebar */}
      <aside className="sidebar">
        <div className="brand-section">
          <div className="logo-container">
            <svg className="logo-icon-svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="brand-title">VÉRTICE</span>
          </div>
        </div>

        <nav className="nav-menu">
          <button 
            onClick={() => scrollToSection('processos')} 
            className={`nav-item ${activeSection === 'processos' ? 'active' : ''}`}
          >
            <Layers className="nav-item-icon" />
            <span>Processos</span>
          </button>
          
          <button 
            onClick={() => scrollToSection('cronograma')} 
            className={`nav-item ${activeSection === 'cronograma' ? 'active' : ''}`}
          >
            <Calendar className="nav-item-icon" />
            <span>Cronograma</span>
          </button>

          <button 
            onClick={() => scrollToSection('execucao')} 
            className={`nav-item ${activeSection === 'execucao' ? 'active' : ''}`}
          >
            <Cpu className="nav-item-icon" />
            <span>Execução</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          VÉRTICE_SYS // V0.1<br />
          INFRASTRUCTURE ONLINE
        </div>
      </aside>

      {/* Main Reading Workspace */}
      <main className="cockpit-container">
        
        {/* Editorial Strategic Hero */}
        <header className="doctrine-hero">
          <div className="hero-left">
            <span className="doctrine-label">Doutrina Operacional // V01</span>
            <h1 className="doctrine-hero-title">
              <span className="break-line">Estrutura</span>
              <span className="break-line">antes</span>
              <span className="escala-glow">de escala.</span>
            </h1>
            <p className="doctrine-hero-subtext">
              A VÉRTICE estrutura operações digitais para experts, marcas pessoais e co-produtores que precisam transformar audiência em uma empresa previsível.
            </p>
            
            <a href="#aplicar" className="cta-button-minimal">
              [ Aplicar para a VÉRTICE ]
            </a>

            <div className="signature-micro-copy">
              <span className="pulse-green"></span>
              VÉRTICE_SYS // OPERATIONAL STRUCTURE ONLINE
            </div>
          </div>

          <div className="hero-right">
            <div className="logo-blur-wrapper">
              <div className="logo-blur-backdrop"></div>
              <img src={logo} className="giant-logo-glow" alt="Vértice Breathing System Logo" />
            </div>
          </div>
        </header>

        {/* SECTION: O QUE FAZEMOS */}
        <section className="doctrine-section in-view">
          <div className="section-divider"></div>
          <div className="section-header-editorial">
            <span className="section-index">Arquivo 00 // O que fazemos</span>
            <h2 className="section-title-editorial">O que fazemos.</h2>
            <p style={{ fontSize: '18px', lineHeight: '1.8', color: 'var(--text-primary)', marginTop: '24px', fontWeight: 300, maxWidth: '780px' }}>
              Não vendemos lançamentos. Estruturamos: <strong>produto</strong>, <strong>comercial</strong>, <strong>posicionamento</strong> e <strong>operação</strong>. Para que experts consigam crescer sem depender de improviso.
            </p>
          </div>

          <div className="operational-blocks-grid">
            <div className="operational-card">
              <span className="card-num">SYS_LAYER // 01</span>
              <h3 className="card-title">Estrutura Comercial</h3>
              <p className="card-text">
                Processos de vendas, aplicação de qualificação, integrações com CRM, funis estratégicos de aquisição direta e operação comercial automatizada.
              </p>
            </div>

            <div className="operational-card">
              <span className="card-num">SYS_LAYER // 02</span>
              <h3 className="card-title">Produtos & Posicionamento</h3>
              <p className="card-text">
                Construção estratégica de ofertas de alta conversão, esteira sequencial (escada de produtos) e engenharia de posicionamento com percepção premium.
              </p>
            </div>

            <div className="operational-card">
              <span className="card-num">SYS_LAYER // 03</span>
              <h3 className="card-title">Conteúdo & Distribuição</h3>
              <p className="card-text">
                Estratégia editorial direcionada para autoridade inquestionável, captação constante de leads qualificados e modelo de crescimento recorrente estático.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION: PARA QUEM CONSTRUÍMOS */}
        <section className="doctrine-section in-view">
          <div className="section-divider"></div>
          <div className="section-header-editorial">
            <span className="section-index">Arquivo 00 // Alvos operacionais</span>
            <h2 className="section-title-editorial">Para quem construímos.</h2>
          </div>

          <div className="para-quem-grid">
            <div className="para-quem-item">Experts</div>
            <div className="para-quem-item">Marcas pessoais</div>
            <div className="para-quem-item">Co-produtores</div>
            <div className="para-quem-item">Operações digitais</div>
          </div>

          {/* Frase de Impacto */}
          <div className="impact-quote-wrapper">
            <blockquote className="impact-quote">
              “O que parece crescimento na frente, normalmente é estrutura nos bastidores.”
            </blockquote>
            <span className="impact-quote-author">// VÉRTICE COCKPIT PROTOCOLS</span>
          </div>
        </section>

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
        {/* Footer */}
        <footer style={{ borderTop: '1px solid var(--border-color)', paddingTop: '40px', marginTop: '120px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
            VÉRTICE_SYS // BUILDING DIGITAL OPERATIONS
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--glow-blue-light)' }}>
            CONFIDENCIAL // V0.1
          </span>
        </footer>

      </main>
    </div>
  );
}
