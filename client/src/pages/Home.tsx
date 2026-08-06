// Home — Landing Page do Webinário Escala Inteligente
// Design: Executivo Dourado — fundo preto, dourado como acento, Playfair Display + Montserrat
// Seções: Hero, O que você vai aprender, Para quem é, Sobre o mentor, Urgência, Formulário, FAQ

import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import {
  ChevronDown,
  ChevronRight,
  Calendar,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  Lock,
} from "lucide-react";

// ─── 3 Bônus Estratégicos do Grupo VIP ───────────────────────────────────────
// Alinhados ao conteúdo da masterclass: transição operacional→estratégico,
// 5 Capitais e delegação de alto nível.
const BONUSES = [
  {
    number: "01",
    tag: "Bônus Exclusivo",
    title: "Guia de Transição Operacional: Do Gargalo à Escala",
    desc: "O mapa definitivo para identificar onde o seu tempo está sendo desperdiçado e como estruturar a base para que a sua empresa opere sem a sua microgestão. Um diagnóstico prático para ser preenchido antes da masterclass.",
    format: "PDF · 15 páginas",
    icon: "📋",
  },
  {
    number: "02",
    tag: "Bônus Exclusivo",
    title: "Matriz de Delegação Estratégica",
    desc: "A planilha exata utilizada nas mentorias do Plano Capital para mapear 100% das suas atividades semanais e identificar o que deve ser delegado, automatizado ou eliminado. O quadrante automático vai revelar onde o CEO não deveria estar gastando seu tempo.",
    format: "Planilha Google Sheets / Excel",
    icon: "📊",
  },
  {
    number: "03",
    tag: "Bônus Exclusivo",
    title: "Diagnóstico dos 5 Capitais: Onde Está o Seu Gargalo",
    desc: "Uma ferramenta de autoavaliação para medir o nível atual dos seus 5 Capitais — Intelectual, Emocional, Financeiro, Digital e Empresarial — e identificar qual deles está limitando o crescimento do seu negócio hoje.",
    format: "Ferramenta interativa · PDF",
    icon: "🔍",
  },
];

const GOLD = "#C9A84C";
const BG_DEEP = "#080808";
const BG_CARD = "#111111";
const TEXT_PRIMARY = "#F5F5F0";
const TEXT_SECONDARY = "#AAAAAA";
const TEXT_MUTED = "#666660";

// Countdown hook — target: 25 Aug 2026 20:00 Florida (EDT = UTC-4)
const EVENT_DATE = new Date("2026-08-25T20:00:00-04:00");

function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, over: true };
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds, over: false };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// Countdown display block
function CountdownBlock() {
  const { days, hours, minutes, seconds, over } = useCountdown(EVENT_DATE);

  if (over) {
    return (
      <div
        className="animate-fade-in-up animate-delay-200"
        style={{ marginBottom: "2rem" }}
      >
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.1rem",
            fontStyle: "italic",
            color: GOLD,
          }}
        >
          O evento está acontecendo agora. Entre na sala.
        </p>
      </div>
    );
  }

  const units = [
    { value: days, label: "Dias" },
    { value: hours, label: "Horas" },
    { value: minutes, label: "Min" },
    { value: seconds, label: "Seg" },
  ];

  return (
    <div
      className="animate-fade-in-up animate-delay-200"
      style={{ marginBottom: "2.5rem" }}
    >
      {/* Label */}
      <p
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.65rem",
          fontWeight: 600,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: GOLD,
          marginBottom: "1.25rem",
          opacity: 0.8,
        }}
      >
        O evento começa em
      </p>

      {/* Digits row */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {units.map((unit, i) => (
          <div
            key={unit.label}
            style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  backgroundColor: "#111111",
                  border: "1px solid rgba(201,168,76,0.2)",
                  borderRadius: "2px",
                  padding: "0.75rem 1.25rem",
                  minWidth: "72px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Top gold accent line */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "15%",
                    right: "15%",
                    height: "1px",
                    backgroundColor: GOLD,
                    opacity: 0.5,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(2rem, 5vw, 2.8rem)",
                    fontWeight: 700,
                    color: TEXT_PRIMARY,
                    lineHeight: 1,
                    display: "block",
                    fontVariantNumeric: "tabular-nums",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {String(unit.value).padStart(2, "0")}
                </span>
              </div>
              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: TEXT_MUTED,
                  display: "block",
                  marginTop: "0.5rem",
                }}
              >
                {unit.label}
              </span>
            </div>
            {/* Separator colon — not after last */}
            {i < units.length - 1 && (
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
                  fontWeight: 700,
                  color: GOLD,
                  opacity: 0.4,
                  lineHeight: 1,
                  marginTop: "0.75rem",
                  userSelect: "none",
                }}
              >
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// FAQ Accordion item
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(201,168,76,0.12)",
        padding: "0",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.25rem 0",
          background: "none",
          border: "none",
          color: TEXT_PRIMARY,
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.95rem",
          fontWeight: 500,
          textAlign: "left",
          cursor: "pointer",
          gap: "1rem",
        }}
      >
        <span>{question}</span>
        <ChevronDown
          size={16}
          style={{
            color: GOLD,
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 250ms ease",
          }}
        />
      </button>
      {open && (
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.9rem",
            color: TEXT_SECONDARY,
            lineHeight: 1.8,
            paddingBottom: "1.25rem",
            margin: 0,
          }}
        >
          {answer}
        </p>
      )}
    </div>
  );
}

export default function Home() {
  const [, navigate] = useLocation();
  const [formData, setFormData] = useState({ name: "", email: "", whatsapp: "" });
  const [submitting, setSubmitting] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.whatsapp) return;
    setSubmitting(true);
    setTimeout(() => {
      navigate("/obrigado");
    }, 800);
  };

  const learningPoints = [
    {
      title: "A transição do operacional para o estratégico",
      desc: "Como deixar de ser o funcionário mais caro da sua empresa e assumir a verdadeira posição de CEO.",
    },
    {
      title: "Estruturação de processos escaláveis",
      desc: "O framework para criar sistemas que funcionam com excelência, independentemente da sua presença física.",
    },
    {
      title: "O princípio dos 5 Capitais",
      desc: "Como o alinhamento entre o capital Intelectual, Emocional, Financeiro, Digital e Empresarial destrava o próximo nível de faturamento.",
    },
    {
      title: "Delegação de alto nível",
      desc: "A metodologia exata para contratar, treinar e reter talentos que resolvem problemas em vez de criá-los.",
    },
    {
      title: "Crescimento sustentável",
      desc: "Entenda sobre escala, margem, recorrência e captação de recursos.",
    },
  ];

  const forWhom = [
    "Empresários que sabem que sua empresa pode gerar muito mais lucro e caixa do que está gerando atualmente.",
    "Fundadores que sentem que a empresa paralisa quando se ausentam.",
    "Líderes que buscam maturidade decisória e clareza estratégica para expandir operações no Brasil ou nos Estados Unidos.",
    "Profissionais que compreendem que o próximo nível do negócio exige uma nova versão do dono.",
    "Para empreendedores que querem conhecer e entender novas oportunidades de negócios.",
  ];

  const faqItems = [
    {
      question: "O evento é gratuito?",
      answer:
        "Sim. A masterclass \"Escala Inteligente\" é um evento estratégico 100% gratuito, desenhado para empresários que buscam estruturação e crescimento.",
    },
    {
      question: "Haverá gravação disponível?",
      answer:
        "Não. O conteúdo é exclusivo para os participantes que estiverem ao vivo no dia 25 de agosto.",
    },
    {
      question: "Como receberei o link de acesso?",
      answer:
        "Após a inscrição, você será direcionado para um grupo VIP no WhatsApp. O link exclusivo da sala virtual será enviado unicamente por lá, junto com os materiais de apoio.",
    },
  ];

  return (
    <div style={{ backgroundColor: BG_DEEP, color: TEXT_PRIMARY, minHeight: "100vh" }}>
      {/* Sticky Header */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "1rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background 300ms ease, border-color 300ms ease",
          backgroundColor: scrolled ? "rgba(8,8,8,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.15)" : "1px solid transparent",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <img
            src="/manus-storage/logo-symbol_84ad4f9e.png"
            alt="Logo"
            style={{ height: "30px", width: "30px", objectFit: "contain" }}
          />
          <div>
            <div
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: GOLD,
              }}
            >
              Plano Capital × Hewerton Scheidegger
            </div>
          </div>
        </div>
        <a
          href="#inscricao"
          className="btn-cta"
          style={{ fontSize: "0.7rem", padding: "0.6rem 1.5rem" }}
        >
          Garantir Vaga
        </a>
      </header>

      {/* HERO SECTION */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          backgroundImage: "url('/manus-storage/hero-bg_3f0fe8a4.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          paddingTop: "80px",
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.75) 60%, rgba(8,8,8,0.88) 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "760px",
            margin: "0 auto",
            padding: "4rem 1.5rem",
            textAlign: "center",
          }}
        >
          {/* Event badge */}
          <div
            className="animate-fade-in-up"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              border: "1px solid rgba(201,168,76,0.3)",
              borderRadius: "2px",
              padding: "0.4rem 1rem",
              marginBottom: "2rem",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#E8440A",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: GOLD,
              }}
            >
              Masterclass Gratuita · Ao Vivo · 25 de Agosto de 2026
            </span>
          </div>

          {/* Main headline */}
          <h1
            className="headline-serif animate-fade-in-up animate-delay-100"
            style={{
              fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)",
              marginBottom: "1.5rem",
              lineHeight: 1.12,
            }}
          >
            O caminho estratégico para{" "}
            <span style={{ color: GOLD, fontStyle: "italic" }}>
              dobrar o faturamento
            </span>{" "}
            da sua empresa sem sacrificar sua vida pessoal.
          </h1>

          {/* Sub-headline */}
          <p
            className="animate-fade-in-up animate-delay-200"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
              color: TEXT_SECONDARY,
              lineHeight: 1.85,
              marginBottom: "2.5rem",
              maxWidth: "620px",
              margin: "0 auto 2.5rem",
            }}
          >
            Descubra o método utilizado por empresários de alto nível para escalar operações,
            organizar processos e recuperar o controle do próprio tempo.
          </p>

          {/* Date/Time info */}
          <div
            className="animate-fade-in-up animate-delay-300"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1.5rem",
              marginBottom: "2.5rem",
            }}
          >
            {[
              { icon: <Calendar size={15} />, text: "25 de Agosto de 2026" },
              { icon: <Clock size={15} />, text: "8:00 PM (Flórida) | 9:00 PM (Brasília)" },
              { icon: <Lock size={15} />, text: "Transmissão Única · Sem Gravação" },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.82rem",
                  color: TEXT_SECONDARY,
                }}
              >
                <span style={{ color: GOLD }}>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div
            className="animate-fade-in-up animate-delay-400"
            style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
          >
            <a
              href="#inscricao"
              className="btn-cta"
              style={{ minWidth: "260px" }}
            >
              Garantir Minha Vaga Agora
            </a>
            <a
              href="#sobre"
              className="btn-outline-gold"
            >
              Conhecer o Mentor
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.4rem",
            opacity: 0.4,
          }}
        >
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: GOLD,
            }}
          >
            Rolar
          </span>
          <ChevronDown size={14} style={{ color: GOLD }} />
        </div>
      </section>

      <div className="gold-divider" />

      {/* O QUE VOCÊ VAI APRENDER */}
      <section style={{ padding: "5rem 1.5rem", maxWidth: "760px", margin: "0 auto" }}>
        <div className="animate-fade-in-up" style={{ marginBottom: "3rem", textAlign: "center" }}>
          <p className="section-label" style={{ marginBottom: "0.75rem" }}>
            Neste Encontro Estratégico
          </p>
          <h2
            className="headline-serif"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
          >
            O que você vai aprender
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {learningPoints.map((point, i) => (
            <div
              key={i}
              className="animate-fade-in-up"
              style={{
                animationDelay: `${i * 0.08}s`,
                display: "flex",
                gap: "1.25rem",
                alignItems: "flex-start",
                padding: "1.5rem",
                backgroundColor: BG_CARD,
                borderLeft: `2px solid ${GOLD}`,
                transition: "background-color 200ms ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLDivElement).style.backgroundColor = "#181818")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLDivElement).style.backgroundColor = BG_CARD)
              }
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  color: GOLD,
                  opacity: 0.3,
                  lineHeight: 1,
                  minWidth: "2rem",
                  textAlign: "right",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    color: TEXT_PRIMARY,
                    marginBottom: "0.4rem",
                    lineHeight: 1.3,
                  }}
                >
                  {point.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.88rem",
                    color: TEXT_SECONDARY,
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  {point.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="gold-divider" />

      {/* PARA QUEM É */}
      <section
        style={{
          padding: "5rem 1.5rem",
          backgroundColor: "#0c0c0c",
        }}
      >
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <div className="animate-fade-in-up" style={{ marginBottom: "3rem", textAlign: "center" }}>
            <p className="section-label" style={{ marginBottom: "0.75rem" }}>
              Exclusivamente Para
            </p>
            <h2
              className="headline-serif"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
            >
              Para quem é este webinário
            </h2>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0",
            }}
          >
            {forWhom.map((item, i) => (
              <div
                key={i}
                className="animate-fade-in-up"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1.25rem",
                  padding: "1.5rem 0",
                  borderBottom: "1px solid rgba(201,168,76,0.1)",
                }}
              >
                <span style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: GOLD,
                  opacity: 0.3,
                  lineHeight: 1,
                  minWidth: "2rem",
                  textAlign: "right",
                  flexShrink: 0,
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.88rem",
                    color: TEXT_SECONDARY,
                    lineHeight: 1.75,
                    margin: 0,
                    paddingTop: "0.1rem",
                  }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* SOBRE O MENTOR */}
      <section
        id="sobre"
        style={{ padding: "5rem 1.5rem", maxWidth: "900px", margin: "0 auto" }}
      >
        <div
          className="animate-fade-in-up"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.6fr",
            gap: "3rem",
            alignItems: "center",
          }}
        >
          {/* Mentor image */}
          <div
            style={{
              position: "relative",
              aspectRatio: "3/4",
              overflow: "hidden",
              borderRadius: "2px",
            }}
          >
            <img
              src="/manus-storage/mentor-bg_9ea99b32.jpg"
              alt="Hewerton Scheidegger"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(8,8,8,0.6) 0%, transparent 60%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "1.25rem",
                left: "1.25rem",
                right: "1.25rem",
              }}
            >
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: TEXT_PRIMARY,
                  margin: 0,
                }}
              >
                Hewerton Scheidegger
              </p>
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.7rem",
                  color: GOLD,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  margin: "0.25rem 0 0",
                }}
              >
                Mentor · Fundador Plano Capital
              </p>
            </div>
          </div>

          {/* Mentor bio */}
          <div>
            <p className="section-label" style={{ marginBottom: "0.75rem" }}>
              Sobre o Mentor
            </p>
            <h2
              className="headline-serif"
              style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", marginBottom: "1.5rem" }}
            >
              20+ anos construindo negócios de alto desempenho
            </h2>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.9rem",
                color: TEXT_SECONDARY,
                lineHeight: 1.9,
                marginBottom: "1.5rem",
              }}
            >
              Empresário com mais de 20 anos de experiência, advogado tributarista, contador e
              mentor de negócios. Fundador de múltiplas empresas nas áreas de consultoria,
              tecnologia e finanças.
            </p>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.9rem",
                color: TEXT_SECONDARY,
                lineHeight: 1.9,
                marginBottom: "2rem",
              }}
            >
              Ultraman e Ironman, Hewerton aplica na prática o princípio de que o crescimento
              empresarial exige uma base pessoal inabalável. Como criador do Método REI e autor
              de obras voltadas para a prosperidade executiva, ele já guiou centenas de
              empresários na construção de negócios altamente lucrativos e autogerenciáveis.
            </p>

            {/* Quote */}
            <div className="gold-quote">
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1rem",
                  fontStyle: "italic",
                  color: TEXT_PRIMARY,
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                "Você cresce, seus negócios crescem também."
              </p>
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.75rem",
                  color: GOLD,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginTop: "0.5rem",
                  marginBottom: 0,
                }}
              >
                — Tese Central do Plano Capital
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* URGÊNCIA */}
      <section
        style={{
          padding: "4rem 1.5rem",
          backgroundColor: "#0c0c0c",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <div
            className="animate-fade-in-up"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1.5rem",
            }}
          >
            <AlertCircle size={16} style={{ color: "#E8440A" }} />
            <span
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#E8440A",
              }}
            >
              Transmissão Única e Ao Vivo
            </span>
          </div>
          <h2
            className="headline-serif animate-fade-in-up animate-delay-100"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", marginBottom: "1rem" }}
          >
            Este encontro não terá gravação.
          </h2>
          <p
            className="animate-fade-in-up animate-delay-200"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.95rem",
              color: TEXT_SECONDARY,
              lineHeight: 1.85,
              marginBottom: "2rem",
            }}
          >
            O conteúdo compartilhado envolve estratégias de negócios aplicadas no ecossistema
            Plano Capital e requer presença em tempo real. As vagas na sala virtual são limitadas
            para garantir a qualidade da transmissão.
          </p>

          {/* COUNTDOWN */}
          <CountdownBlock />

          <div
            className="animate-fade-in-up animate-delay-300"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            {[
              { icon: <Users size={20} />, label: "Vagas Limitadas" },
              { icon: <Lock size={20} />, label: "Sem Gravação" },
              { icon: <Calendar size={20} />, label: "25 de Agosto" },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span style={{ color: GOLD }}>{item.icon}</span>
                <span
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: TEXT_SECONDARY,
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* FORMULÁRIO DE INSCRIÇÃO */}
      <section
        id="inscricao"
        style={{ padding: "5rem 1.5rem" }}
      >
        <div style={{ maxWidth: "520px", margin: "0 auto" }}>
          <div className="animate-fade-in-up" style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p className="section-label" style={{ marginBottom: "0.75rem" }}>
              Inscrição Gratuita
            </p>
            <h2
              className="headline-serif"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", marginBottom: "0.75rem" }}
            >
              Garantir Minha Vaga Agora
            </h2>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.85rem",
                color: TEXT_MUTED,
                lineHeight: 1.7,
              }}
            >
              Preencha os dados abaixo para reservar sua vaga na masterclass.
            </p>
          </div>

          {/* BÔNUS VIP — antes do formulário */}
          <div
            className="animate-fade-in-up animate-delay-100"
            style={{
              marginBottom: "2.5rem",
              border: "1px solid rgba(201,168,76,0.18)",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            {/* Header do bloco */}
            <div
              style={{
                backgroundColor: "rgba(201,168,76,0.07)",
                borderBottom: "1px solid rgba(201,168,76,0.18)",
                padding: "1rem 1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
              }}
            >
              <span style={{ fontSize: "0.9rem" }}>🎁</span>
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: GOLD,
                  margin: 0,
                }}
              >
                Ao se inscrever, você recebe acesso imediato a 3 bônus no grupo VIP
              </p>
            </div>

            {/* Lista de bônus */}
            {BONUSES.map((b, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "1rem",
                  padding: "1.1rem 1.5rem",
                  borderBottom: i < BONUSES.length - 1 ? "1px solid rgba(201,168,76,0.08)" : "none",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: GOLD,
                    opacity: 0.45,
                    minWidth: "1.4rem",
                    paddingTop: "2px",
                    flexShrink: 0,
                  }}
                >
                  {b.number}
                </span>
                <div>
                  <p
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      color: TEXT_PRIMARY,
                      margin: "0 0 0.2rem",
                      lineHeight: 1.4,
                    }}
                  >
                    {b.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.7rem",
                      color: GOLD,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      margin: 0,
                      opacity: 0.7,
                    }}
                  >
                    {b.format}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="animate-fade-in-up animate-delay-200"
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: TEXT_MUTED,
                  marginBottom: "0.5rem",
                }}
              >
                Nome Completo
              </label>
              <input
                type="text"
                className="input-dark"
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: TEXT_MUTED,
                  marginBottom: "0.5rem",
                }}
              >
                E-mail Profissional
              </label>
              <input
                type="email"
                className="input-dark"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: TEXT_MUTED,
                  marginBottom: "0.5rem",
                }}
              >
                WhatsApp (com código do país)
              </label>
              <input
                type="tel"
                className="input-dark"
                placeholder="+55 (11) 99999-9999"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-cta"
              disabled={submitting}
              style={{
                marginTop: "0.5rem",
                width: "100%",
                opacity: submitting ? 0.7 : 1,
                fontSize: "0.85rem",
                padding: "1.1rem 2rem",
              }}
            >
              {submitting ? "Confirmando..." : "Garantir Minha Vaga Agora"}
            </button>

            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.72rem",
                color: TEXT_MUTED,
                textAlign: "center",
                lineHeight: 1.6,
                margin: "0.25rem 0 0",
              }}
            >
              <Lock size={10} style={{ display: "inline", marginRight: "0.3rem", verticalAlign: "middle" }} />
              Seus dados estão seguros. Sem spam.
            </p>
          </form>
        </div>
      </section>

      <div className="gold-divider" />

      {/* FAQ */}
      <section
        style={{
          padding: "5rem 1.5rem",
          backgroundColor: "#0c0c0c",
          maxWidth: "680px",
          margin: "0 auto",
        }}
      >
        <div className="animate-fade-in-up" style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <p className="section-label" style={{ marginBottom: "0.75rem" }}>
            Dúvidas Frequentes
          </p>
          <h2
            className="headline-serif"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)" }}
          >
            Perguntas Frequentes
          </h2>
        </div>

        <div className="animate-fade-in-up animate-delay-200">
          {faqItems.map((item, i) => (
            <FaqItem key={i} question={item.question} answer={item.answer} />
          ))}
        </div>
      </section>

      <div className="gold-divider" />

      {/* Final CTA */}
      <section
        style={{
          padding: "5rem 1.5rem",
          textAlign: "center",
          backgroundImage: "url('/manus-storage/hero-bg_3f0fe8a4.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(8,8,8,0.88)",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "600px", margin: "0 auto" }}>
          <p className="section-label animate-fade-in-up" style={{ marginBottom: "1rem" }}>
            Última Chamada
          </p>
          <h2
            className="headline-serif animate-fade-in-up animate-delay-100"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", marginBottom: "1rem" }}
          >
            O próximo nível do seu negócio começa aqui.
          </h2>
          <p
            className="animate-fade-in-up animate-delay-200"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.95rem",
              color: TEXT_SECONDARY,
              lineHeight: 1.85,
              marginBottom: "2.5rem",
            }}
          >
            25 de Agosto de 2026 · 8:00 PM (Flórida) | 9:00 PM (Brasília)
            <br />
            Transmissão única. Sem gravação. Vagas limitadas.
          </p>
          <a
            href="#inscricao"
            className="btn-cta animate-fade-in-up animate-delay-300"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
          >
            Garantir Minha Vaga Agora
            <ChevronRight size={16} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "2.5rem 1.5rem",
          textAlign: "center",
          borderTop: "1px solid rgba(201,168,76,0.08)",
          backgroundColor: BG_DEEP,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
          <img
            src="/manus-storage/logo-symbol_84ad4f9e.png"
            alt="Logo"
            style={{ height: "20px", width: "20px", objectFit: "contain", opacity: 0.5 }}
          />
        </div>
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#333330",
          }}
        >
          © 2026 Plano Capital Business · Hewerton Scheidegger · Todos os direitos reservados
        </p>
      </footer>
    </div>
  );
}
