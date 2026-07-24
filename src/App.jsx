import React, { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail, Zap, Code2, ArrowRight, ExternalLink } from "lucide-react";

// ---- Design tokens (subject: electrical blueprints meeting code) ----
const tokens = {
  bg: "#0B1220",
  bgAlt: "#0F1830",
  surface: "#141F3A",
  surfaceBorder: "#233156",
  copper: "#E8A34D",
  copperSoft: "#C97C4E",
  cyan: "#5EEAD4",
  text: "#EDEFF5",
  textMuted: "#8B96AD",
};

const displayFont = "'Space Grotesk', sans-serif";
const bodyFont = "'Inter', sans-serif";
const monoFont = "'JetBrains Mono', monospace";

function useDrawOnLoad() {
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 200);
    return () => clearTimeout(t);
  }, []);
  return drawn;
}

function GridBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage:
          "linear-gradient(rgba(94,234,212,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(94,234,212,0.06) 1px, transparent 1px)",
        backgroundSize: "42px 42px",
        maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
      }}
    />
  );
}

function CircuitTrace({ drawn }) {
  return (
    <svg
      viewBox="0 0 600 160"
      className="w-full max-w-xl h-auto"
      role="img"
      aria-label="Trilha de circuito conectando um símbolo elétrico a um símbolo de código"
    >
      <circle cx="40" cy="80" r="6" fill={tokens.copper} />
      <circle cx="560" cy="80" r="6" fill={tokens.cyan} />
      <path
        d="M 40 80 L 140 80 L 170 50 L 220 50 L 250 80 L 350 80 L 380 110 L 430 110 L 460 80 L 560 80"
        fill="none"
        stroke={tokens.copperSoft}
        strokeWidth="2"
        strokeDasharray="700"
        strokeDashoffset={drawn ? 0 : 700}
        style={{ transition: "stroke-dashoffset 1.8s ease-out" }}
      />
      {[140, 250, 350, 460].map((cx, i) => (
        <rect
          key={i}
          x={cx - 4}
          y={76}
          width="8"
          height="8"
          fill={tokens.bgAlt}
          stroke={tokens.cyan}
          strokeWidth="1.5"
          opacity={drawn ? 1 : 0}
          style={{ transition: `opacity 0.4s ease ${0.6 + i * 0.2}s` }}
        />
      ))}
    </svg>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span style={{ fontFamily: monoFont, color: tokens.cyan }} className="text-sm">
        {children}
      </span>
      <span className="h-px flex-1" style={{ backgroundColor: tokens.surfaceBorder }} />
    </div>
  );
}

function Tag({ children }) {
  return (
    <span
      className="text-xs px-2.5 py-1 rounded-full border"
      style={{
        fontFamily: monoFont,
        color: tokens.cyan,
        borderColor: "rgba(94,234,212,0.35)",
        backgroundColor: "rgba(94,234,212,0.06)",
      }}
    >
      {children}
    </span>
  );
}

function ProjectCard({ title, subtitle, description, tags, href, accent }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-lg border p-6 transition-transform duration-300 hover:-translate-y-1"
      style={{ backgroundColor: tokens.surface, borderColor: tokens.surfaceBorder }}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <h3
            style={{ fontFamily: displayFont, color: tokens.text }}
            className="text-xl font-semibold leading-snug"
          >
            {title}
          </h3>
          <p style={{ fontFamily: monoFont, color: accent }} className="text-xs mt-1">
            {subtitle}
          </p>
        </div>
        <ExternalLink
          size={18}
          style={{ color: tokens.textMuted }}
          className="shrink-0 mt-1 group-hover:opacity-100 opacity-60 transition-opacity"
        />
      </div>
      <p style={{ fontFamily: bodyFont, color: tokens.textMuted }} className="text-sm leading-relaxed mb-4">
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
    </a>
  );
}

function EducationCard({ title, institution, period, badge, accent }) {
  return (
    <div className="rounded-lg border p-6" style={{ backgroundColor: tokens.surface, borderColor: tokens.surfaceBorder }}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 style={{ fontFamily: displayFont, color: tokens.text }} className="text-base font-semibold leading-snug">
          {title}
        </h3>
        {badge && (
          <span
            className="text-[10px] px-2 py-1 rounded-full shrink-0"
            style={{ fontFamily: monoFont, color: accent, backgroundColor: "rgba(255,255,255,0.04)", border: `1px solid ${accent}55` }}
          >
            {badge}
          </span>
        )}
      </div>
      <p style={{ fontFamily: bodyFont, color: tokens.textMuted }} className="text-sm">
        {institution}
      </p>
      <p style={{ fontFamily: monoFont, color: tokens.textMuted }} className="text-xs mt-2">
        {period}
      </p>
    </div>
  );
}

function TrackCard({ title, provider, count, examples, accent }) {
  return (
    <div className="rounded-lg border p-5" style={{ backgroundColor: tokens.bgAlt, borderColor: tokens.surfaceBorder }}>
      <div className="flex items-start justify-between gap-3 mb-1">
        <h4 style={{ fontFamily: displayFont, color: tokens.text }} className="text-sm font-semibold leading-snug">
          {title}
        </h4>
        <span style={{ fontFamily: monoFont, color: accent }} className="text-xs shrink-0">
          {count}
        </span>
      </div>
      <p style={{ fontFamily: monoFont, color: tokens.textMuted }} className="text-[11px] mb-2">
        {provider}
      </p>
      <p style={{ fontFamily: bodyFont, color: tokens.textMuted }} className="text-xs leading-relaxed">
        {examples}
      </p>
    </div>
  );
}

function SkillGroup({ title, icon, skills, accent }) {
  return (
    <div className="rounded-lg border p-6" style={{ backgroundColor: tokens.surface, borderColor: tokens.surfaceBorder }}>
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 style={{ fontFamily: displayFont, color: tokens.text }} className="text-base font-semibold">
          {title}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((s) => (
          <span
            key={s}
            className="text-sm px-3 py-1.5 rounded-md"
            style={{ fontFamily: bodyFont, color: tokens.textMuted, backgroundColor: tokens.bgAlt }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const drawn = useDrawOnLoad();

  return (
    <div style={{ backgroundColor: tokens.bg, fontFamily: bodyFont }} className="min-h-screen w-full">
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />

      {/* Nav */}
      <header className="sticky top-0 z-20 backdrop-blur border-b" style={{ borderColor: tokens.surfaceBorder, backgroundColor: "rgba(11,18,32,0.85)" }}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span style={{ fontFamily: displayFont, color: tokens.text }} className="text-base font-semibold tracking-tight">
            Hilmara Costa<span style={{ color: tokens.copper }}>.</span>dev
          </span>
          <nav className="flex gap-6 text-sm" style={{ fontFamily: monoFont }}>
            <a href="#sobre" style={{ color: tokens.textMuted }} className="hover:opacity-100 transition-opacity">sobre</a>
            <a href="#formacao" style={{ color: tokens.textMuted }} className="hover:opacity-100 transition-opacity">formação</a>
            <a href="#projetos" style={{ color: tokens.textMuted }} className="hover:opacity-100 transition-opacity">projetos</a>
            <a href="#contato" style={{ color: tokens.textMuted }} className="hover:opacity-100 transition-opacity">contato</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <GridBackdrop />
        <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          <p style={{ fontFamily: monoFont, color: tokens.copper }} className="text-sm mb-4">
            // eletrotécnica → desenvolvimento front-end
          </p>
          <h1
            style={{ fontFamily: displayFont, color: tokens.text }}
            className="text-4xl md:text-6xl font-semibold leading-[1.05] tracking-tight max-w-3xl"
          >
            Traduzo sistemas complexos em interfaces que fazem sentido.
          </h1>
          <p style={{ fontFamily: bodyFont, color: tokens.textMuted }} className="text-lg mt-6 max-w-xl leading-relaxed">
            Técnica em Eletrotécnica com vivência em subestações de média e alta tensão, hoje construindo dashboards e produtos digitais para o mesmo tipo de problema que eu resolvia em campo.
          </p>

          <div className="my-10">
            <CircuitTrace drawn={drawn} />
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projetos"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md text-sm font-medium transition-opacity hover:opacity-90"
              style={{ backgroundColor: tokens.copper, color: tokens.bg, fontFamily: bodyFont }}
            >
              Ver projetos <ArrowRight size={16} />
            </a>
            <a
              href="#contato"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md text-sm font-medium border transition-colors"
              style={{ borderColor: tokens.surfaceBorder, color: tokens.text, fontFamily: bodyFont }}
            >
              Falar comigo
            </a>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <SectionLabel>// sobre</SectionLabel>
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-10">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Zap size={18} style={{ color: tokens.copper }} />
              <span style={{ fontFamily: monoFont, color: tokens.textMuted }} className="text-xs">
                Técnica em Eletrotécnica
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Code2 size={18} style={{ color: tokens.cyan }} />
              <span style={{ fontFamily: monoFont, color: tokens.textMuted }} className="text-xs">
                Estudante de ADS · Front-End
              </span>
            </div>
          </div>
          <p style={{ fontFamily: bodyFont, color: tokens.textMuted }} className="text-base leading-relaxed">
            Sou uma profissional com formação em segundo grau técnico, com habilitação em Técnica em Eletrotécnica,
            atualmente cursando o segundo semestre em Análise e Desenvolvimento de Sistemas. Tenho uma trajetória
            sólida e prática na área de manutenção elétrica e infraestrutura de média e alta tensão, atuando diretamente no
            setor de mobilidade urbana, em sistemas de subestações de metrô. Lidar com gerenciamento de energia,
            diagnóstico de equipamentos complexos e garantir a continuidade de serviços essenciais sempre foi o
            núcleo do meu trabalho.
            <br /><br />
            Recentemente, decidi expandir meus horizontes e unir essa bagagem técnica ao universo da tecnologia.
            Me apaixonei pelo desenvolvimento Front-End, área na qual venho me capacitando intensamente para criar
            interfaces inteligentes, simuladores e dashboards que traduzam dados técnicos complexos em soluções
            visuais intuitivas. Já contribuí ativamente como uma das mentes por trás de projetos voltados para
            monitoramento climático e de infraestrutura regional.
          </p>
        </div>
      </section>

      {/* Formação */}
      <section id="formacao" className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <SectionLabel>// formação</SectionLabel>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <EducationCard
            title="Técnico em Eletrotécnica"
            institution="Escola Técnica Estadual Newton Sucupira"
            period="Concluído em dez/1997"
            badge="Elétrica"
            accent={tokens.copper}
          />
          <EducationCard
            title="Análise e Desenvolvimento de Sistemas"
            institution="Centro Universitário Unigrande"
            period="2º semestre · previsão de conclusão jul/2028"
            badge="Tecnologia"
            accent={tokens.cyan}
          />
        </div>

        <div className="rounded-lg border p-5 mb-10 flex items-center justify-between gap-4 flex-wrap" style={{ backgroundColor: tokens.surface, borderColor: tokens.surfaceBorder }}>
          <div>
            <p style={{ fontFamily: displayFont, color: tokens.text }} className="text-sm font-semibold">
              Gerenciamento de Projetos
            </p>
            <p style={{ fontFamily: monoFont, color: tokens.textMuted }} className="text-xs mt-1">
              Google + CIEE
            </p>
          </div>
          <span
            className="text-[10px] px-2.5 py-1 rounded-full"
            style={{ fontFamily: monoFont, color: tokens.copper, border: `1px solid ${tokens.copper}55` }}
          >
            em andamento
          </span>
        </div>

        <p style={{ fontFamily: monoFont, color: tokens.textMuted }} className="text-xs mb-4">
          trilhas de especialização complementares
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <TrackCard
            title="Elétrica & Automação"
            provider="SENAI"
            count="1 curso"
            examples="Comandos Elétricos"
            accent={tokens.copper}
          />
          <TrackCard
            title="Front-End & Web"
            provider="SENAI (parceria Ford Enter) + Alura"
            count="9 cursos"
            examples="Curso de Front-End (SENAI/Ford Enter) · HTML e CSS (estrutura, formulários, responsividade, SEO) · fundamentos da web · lógica de programação com JavaScript"
            accent={tokens.cyan}
          />
          <TrackCard
            title="Java & Lógica de Programação"
            provider="DIO"
            count="7 cursos"
            examples="Introdução ao Java · estruturas de controle · herança e polimorfismo · abstração com classes e encapsulamento"
            accent={tokens.cyan}
          />
          <TrackCard
            title="IA Aplicada & Engenharia de Prompt"
            provider="DIO + Alura"
            count="19 cursos"
            examples="Copilotos com IA · Azure AI Agents · Machine Learning, LLMs e Agentes · engenharia de prompt"
            accent={tokens.copper}
          />
          <TrackCard
            title="Dados & Business Intelligence"
            provider="Alura"
            count="13 cursos"
            examples="Power BI (DAX, Power Query, dashboards) · Excel avançado (tabelas dinâmicas, cenários, Power Pivot) · Power Automate"
            accent={tokens.cyan}
          />
          <TrackCard
            title="UX Design"
            provider="Coursera"
            count="1 curso"
            examples="Fundamentos do design da experiência do usuário (UX)"
            accent={tokens.copper}
          />
        </div>
      </section>

      {/* Projetos */}
      <section id="projetos" className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <SectionLabel>// projetos</SectionLabel>
        <div className="grid md:grid-cols-2 gap-6">
          <ProjectCard
            title="Metrô Gêmeo Digital"
            subtitle="Digital Twin · Centro de Controle Operacional"
            description="Gêmeo digital de um CCO metroviário, simulando sinalização e segurança (ATP/CBTC), gestão de energia e tração, monitoramento de via e lógica fail-safe — unindo experiência real como técnica de manutenção metroviária à simulação do sistema."
            tags={["Angular", "TypeScript", "RxJS", "SCSS"]}
            href="https://github.com/Hilmara/Metro-gemeo-digital"
            accent={tokens.copper}
          />
          <ProjectCard
            title="CoreDrive Ecosystem"
            subtitle="Logística reversa · Baterias de veículos elétricos"
            description="Plataforma que gerencia o ciclo de vida completo de baterias de VE — do monitoramento de saúde pela montadora à coleta e reciclagem — conectando montadoras, autorizadas, clientes e recicladoras com telemetria em tempo real e dashboards por perfil de acesso."
            tags={["Angular", "TypeScript", "Autenticação", "LGPD"]}
            href="https://github.com/hilmaracosta-blip/Coredrive_Ecosystem"
            accent={tokens.cyan}
          />
        </div>
        <p style={{ fontFamily: monoFont, color: tokens.textMuted }} className="text-xs mt-6">
        
        </p>
      </section>

      {/* Habilidades */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <SectionLabel>// habilidades</SectionLabel>
        <div className="grid md:grid-cols-2 gap-6">
          <SkillGroup
            title="Desenvolvimento"
            icon={<Code2 size={18} style={{ color: tokens.cyan }} />}
            skills={["HTML/CSS", "JavaScript", "TypeScript", "Angular", "React", "SCSS", "Git & GitHub"]}
          />
          <SkillGroup
            title="Eletrotécnica"
            icon={<Zap size={18} style={{ color: tokens.copper }} />}
            skills={["Subestações de média e alta tensão", "Diagnóstico de equipamentos", "Gerenciamento de energia", "Manutenção preditiva"]}
          />
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <SectionLabel>// contato</SectionLabel>
        <h2 style={{ fontFamily: displayFont, color: tokens.text }} className="text-2xl md:text-3xl font-semibold mb-6 max-w-md">
          Vamos conversar sobre o próximo projeto?
        </h2>
        <div className="flex flex-wrap gap-4">
          <a
            href="mailto:hilmarasantos.tech@gmail.com"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-md text-sm border transition-colors"
            style={{ borderColor: tokens.surfaceBorder, color: tokens.text, fontFamily: bodyFont }}
          >
            <Mail size={16} /> hilmarasantos.tech@gmail.com
          </a>
          <a
            href="https://wa.me/5571981321714"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-md text-sm border transition-colors"
            style={{ borderColor: tokens.surfaceBorder, color: tokens.text, fontFamily: bodyFont }}
          >
            (71) 98132-1714
          </a>
          <a
            href="https://github.com/Hilmara"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-md text-sm border transition-colors"
            style={{ borderColor: tokens.surfaceBorder, color: tokens.text, fontFamily: bodyFont }}
          >
            <Github size={16} /> GitHub
          </a>
          <a
            href="https://linkedin.com/in/seu-usuario"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-md text-sm border transition-colors"
            style={{ borderColor: tokens.surfaceBorder, color: tokens.text, fontFamily: bodyFont }}
          >
            <Linkedin size={16} /> LinkedIn
          </a>
        </div>
      </section>

      <footer className="border-t py-8" style={{ borderColor: tokens.surfaceBorder }}>
        <div className="max-w-5xl mx-auto px-6">
          <p style={{ fontFamily: monoFont, color: tokens.textMuted }} className="text-xs">
            © 2026 Hilmara dos Santos da Costa — feito com Angular na cabeça e React neste portfólio.
          </p>
        </div>
      </footer>
    </div>
  );
}
