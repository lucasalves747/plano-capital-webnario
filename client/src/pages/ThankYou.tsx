// ThankYou page — Página de Obrigado + Redirecionamento WhatsApp
// Design: Executivo Dourado — arquitetônico, sóbrio, sem celebração genérica
// Paleta: preto profundo, dourado cirúrgico, laranja para CTA principal
//
// A copy é deliberadamente de inscrição INCOMPLETA. A versão anterior abria com
// "Sua vaga está reservada" e só depois pedia a entrada no grupo — quem lia o
// topo já se dava por inscrito e fechava a página. Aqui nada é declarado
// concluído antes do grupo VIP, que é onde o link da aula é entregue.

import { useEffect } from "react";
import { Check, AlertCircle, Calendar, Clock, MapPin, Gift } from "lucide-react";
import { useLocation } from "wouter";
import { useIsMobile } from "@/hooks/useMobile";
import { variantFromPath } from "@/lib/variants";
import { trackInscricaoDireta } from "@/lib/pixel";

const GOLD = "#C9A84C";
const TEXT_PRIMARY = "#F5F5F0";
const TEXT_SECONDARY = "#AAAAAA";
const TEXT_MUTED = "#666660";

// ─── 3 Bônus Estratégicos — alinhados ao conteúdo da masterclass ─────────────
const BONUSES = [
  {
    number: "01",
    title: "Guia de Transição Operacional: Do Gargalo à Escala",
    desc: "O mapa definitivo para identificar onde o seu tempo está sendo desperdiçado e como estruturar a base para que a sua empresa opere sem a sua microgestão. Um diagnóstico prático para ser preenchido antes da masterclass — para que você chegue ao encontro com clareza sobre onde está travado.",
    format: "PDF · 15 páginas",
    deliveryDay: "Liberado no Dia 7 antes da aula",
  },
  {
    number: "02",
    title: "Matriz de Delegação Estratégica",
    desc: "A planilha exata utilizada nas mentorias de alto nível do Plano Capital para mapear 100% das suas atividades semanais. O quadrante automático categoriza cada tarefa em: Eliminar, Automatizar, Delegar ou Manter (Foco do CEO). O diagnóstico que você fará vai mudar a sua percepção sobre o próprio negócio.",
    format: "Planilha Google Sheets / Excel",
    deliveryDay: "Liberado no Dia 3 antes da aula",
  },
  {
    number: "03",
    title: "Diagnóstico dos 5 Capitais: Onde Está o Seu Gargalo",
    desc: "Uma ferramenta de autoavaliação para medir o nível atual dos seus 5 Capitais — Intelectual, Emocional, Financeiro, Digital e Empresarial. Identifica qual deles está limitando o crescimento do seu negócio hoje e qual deve ser priorizado imediatamente. Um CNPJ forte não se sustenta sobre um CPF frágil.",
    format: "Ferramenta interativa · PDF",
    deliveryDay: "Liberado imediatamente ao entrar no grupo",
  },
];

// Botão de entrada no grupo VIP. Aparece duas vezes — antes e depois dos
// bônus — porque é a única ação que a pessoa precisa executar nesta página.
function GrupoVipButton({ href, isMobile }: { href: string; isMobile: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-whatsapp"
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem",
        fontSize: isMobile ? "0.78rem" : "0.9rem",
        padding: isMobile ? "1rem 1.25rem" : "1.1rem 2rem",
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      Entrar no Grupo VIP e Garantir Minha Vaga
    </a>
  );
}

// Um dos dois passos da inscrição. O passo concluído fica apagado e o pendente
// fica dourado — a leitura de relance precisa ser "falta o segundo".
function PassoCard({
  numero,
  titulo,
  estado,
  concluido = false,
}: {
  numero: string;
  titulo: string;
  estado: string;
  concluido?: boolean;
}) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0.9rem 1rem",
        border: concluido ? "1px solid rgba(201,168,76,0.12)" : `1px solid ${GOLD}`,
        backgroundColor: concluido ? "transparent" : "rgba(201,168,76,0.07)",
        opacity: concluido ? 0.55 : 1,
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: "26px",
          height: "26px",
          borderRadius: "50%",
          border: `1px solid ${GOLD}`,
          backgroundColor: concluido ? GOLD : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.7rem",
          fontWeight: 700,
          color: concluido ? "#080808" : GOLD,
        }}
      >
        {concluido ? <Check size={14} strokeWidth={3} /> : numero}
      </div>
      <div>
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.85rem",
            fontWeight: 600,
            color: TEXT_PRIMARY,
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {titulo}
        </p>
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: concluido ? TEXT_MUTED : GOLD,
            margin: "0.2rem 0 0",
          }}
        >
          {estado}
        </p>
      </div>
    </div>
  );
}

export default function ThankYou() {
  const isMobile = useIsMobile();
  const [location] = useLocation();
  const variant = variantFromPath(location);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Quem chega pelo formulário nativo do Facebook não passa pelo formulário do
  // site — a conversão precisa ser contada aqui.
  useEffect(() => {
    trackInscricaoDireta(variant.tag);
  }, [variant.tag]);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#080808", color: TEXT_PRIMARY, fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid rgba(201,168,76,0.15)",
          padding: isMobile ? "1rem 1.25rem" : "1.25rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <img
            src="/manus-storage/logo-symbol_84ad4f9e.png"
            alt="Logo"
            style={{ height: "32px", width: "32px", objectFit: "contain" }}
          />
          <div
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: GOLD,
            }}
          >
            Plano Capital × Hewerton Scheidegger
          </div>
        </div>
      </header>

      {/* Hero confirmation — arquitetônico */}
      <section
        style={{
          position: "relative",
          padding: isMobile ? "3rem 1.25rem 2rem" : "4.5rem 1.5rem 2.5rem",
          textAlign: "center",
          backgroundColor: "#080808",
          borderBottom: "1px solid rgba(201,168,76,0.12)",
        }}
      >
        {/* Architectural vertical line */}
        <div style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "1px",
          height: "4rem",
          background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.4))",
        }} />
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <div className="animate-fade-in-up" style={{ marginBottom: "1.5rem", paddingTop: "1rem" }}>
            <AlertCircle size={44} style={{ color: GOLD, margin: "0 auto 1rem" }} />
          </div>
          <p className="section-label animate-fade-in-up animate-delay-100" style={{ marginBottom: "1rem" }}>
            Passo 2 de 2 — Ainda falta concluir
          </p>
          <h1
            className="headline-serif animate-fade-in-up animate-delay-200"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "1rem" }}
          >
            Sua inscrição ainda requer um último passo.
          </h1>
          <p
            className="animate-fade-in-up animate-delay-300"
            style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "1rem", color: TEXT_SECONDARY, lineHeight: 1.8, marginBottom: "2rem" }}
          >
            Recebemos seus dados para a masterclass{" "}
            <span style={{ color: GOLD, fontStyle: "italic" }}>Escala Inteligente</span> — mas a
            sua vaga só é garantida dentro do grupo VIP no WhatsApp. É lá, e somente lá, que o
            link de acesso da aula é enviado.
          </p>

          {/* Marcador dos dois passos — deixa visível que um deles está aberto */}
          <div
            className="animate-fade-in-up animate-delay-400"
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? "0.5rem" : "1rem",
              marginBottom: "2rem",
              textAlign: "left",
            }}
          >
            <PassoCard
              numero="1"
              titulo="Dados enviados"
              estado="Concluído"
              concluido
            />
            <PassoCard
              numero="2"
              titulo="Entrar no grupo VIP"
              estado="Pendente — falta você"
            />
          </div>

          {/* CTA no topo: a ação precisa estar visível antes de qualquer rolagem */}
          <div className="animate-fade-in-up animate-delay-500" style={{ marginBottom: "2rem" }}>
            <GrupoVipButton href={variant.whatsappGroup} isMobile={isMobile} />
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem", color: TEXT_MUTED, marginTop: "0.75rem" }}>
              Leva 10 segundos. Sem isso, você não recebe o link da aula.
            </p>
          </div>

          <div
            className="animate-fade-in-up animate-delay-500"
            style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.5rem", marginBottom: "1.5rem" }}
          >
            {[
              { icon: <Calendar size={16} />, text: "1º de Setembro de 2026" },
              { icon: <Clock size={16} />, text: variant.horario },
              { icon: <MapPin size={16} />, text: "Sala Virtual VIP" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: TEXT_SECONDARY, fontFamily: "'Montserrat', sans-serif", fontSize: "0.85rem" }}>
                <span style={{ color: GOLD }}>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
          <div style={{ width: "60px", height: "1px", backgroundColor: GOLD, opacity: 0.4, margin: "0 auto" }} />
        </div>
      </section>

      {/* Attention — WhatsApp step */}
      <section style={{ padding: isMobile ? "2rem 1.25rem 3rem" : "2.5rem 1.5rem 4rem", maxWidth: "680px", margin: "0 auto" }}>
        <div
          className="animate-fade-in-up"
          style={{
            borderLeft: "2px solid #C9A84C",
            paddingLeft: isMobile ? "1.1rem" : "2rem",
            marginBottom: "2rem",
          }}
        >
          <p className="section-label" style={{ marginBottom: "1rem" }}>
            Atenção — Passo Obrigatório
          </p>
          <h2 className="headline-serif" style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>
            O acesso à aula acontece dentro do grupo.
          </h2>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.95rem", color: TEXT_SECONDARY, lineHeight: 1.9, marginBottom: 0 }}>
            O link da sala é liberado poucos minutos antes de a masterclass começar, e vai
            exclusivamente para o grupo VIP de WhatsApp — junto com os 3 bônus e os lembretes do
            dia.{" "}
            <span style={{ color: TEXT_PRIMARY, fontWeight: 600 }}>
              Quem não está no grupo não recebe o acesso.
            </span>{" "}
            É um grupo silencioso: apenas a nossa equipe executiva envia mensagens.
          </p>
        </div>

        {/* CTA principal — antes dos bônus, para quem já entendeu o passo */}
        <div className="animate-fade-in-up animate-delay-100" style={{ textAlign: "center", marginBottom: "3rem" }}>
          <GrupoVipButton href={variant.whatsappGroup} isMobile={isMobile} />
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem", color: TEXT_MUTED, marginTop: "0.75rem" }}>
            Clique aqui para receber os 3 bônus e o link exclusivo da aula
          </p>
        </div>

        {/* ─── 3 BÔNUS DETALHADOS ─────────────────────────────────────────── */}
        <div className="animate-fade-in-up animate-delay-200" style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
            <Gift size={20} style={{ color: GOLD }} />
            <p className="section-label" style={{ marginBottom: 0 }}>
              3 Bônus Estratégicos liberados no grupo VIP
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {BONUSES.map((b, i) => (
              <div
                key={i}
                style={{
                  padding: "1.75rem 0",
                  borderBottom: "1px solid rgba(201,168,76,0.1)",
                  display: "grid",
                  gridTemplateColumns: "2.5rem 1fr",
                  gap: "1rem",
                  alignItems: "start",
                }}
              >
                {/* Number */}
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.8rem",
                    fontWeight: 700,
                    color: GOLD,
                    opacity: 0.25,
                    lineHeight: 1,
                    paddingTop: "4px",
                  }}
                >
                  {b.number}
                </span>

                {/* Content */}
                <div>
                  {/* Delivery badge */}
                  <div
                    style={{
                      display: "inline-block",
                      backgroundColor: "rgba(201,168,76,0.08)",
                      border: "1px solid rgba(201,168,76,0.2)",
                      borderRadius: "2px",
                      padding: "0.2rem 0.6rem",
                      marginBottom: "0.6rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: GOLD,
                      }}
                    >
                      {b.deliveryDay}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: TEXT_PRIMARY,
                      lineHeight: 1.3,
                      marginBottom: "0.6rem",
                    }}
                  >
                    {b.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.85rem",
                      color: TEXT_SECONDARY,
                      lineHeight: 1.8,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {b.desc}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.68rem",
                      color: TEXT_MUTED,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      margin: 0,
                    }}
                  >
                    {b.format}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp CTA — repetido no fim, para quem leu os bônus até aqui */}
        <div className="animate-fade-in-up animate-delay-300" style={{ textAlign: "center" }}>
          <GrupoVipButton href={variant.whatsappGroup} isMobile={isMobile} />
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem", color: TEXT_MUTED, marginTop: "0.75rem" }}>
            O link de acesso da aula é enviado somente dentro do grupo
          </p>

          {/* Executive note */}
          <div style={{ marginTop: "2rem", padding: "1.25rem 0", borderTop: "1px solid rgba(201,168,76,0.1)", borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.9rem", fontStyle: "italic", color: "#888880", lineHeight: 1.75, margin: 0 }}>
              "Este grupo é silencioso. Apenas nossa equipe executiva enviará mensagens — exclusivamente o link de acesso e os materiais estratégicos."
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "2.5rem 1.5rem", textAlign: "center", borderTop: "1px solid rgba(201,168,76,0.08)" }}>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#333330" }}>
          © 2026 Plano Capital Business · Hewerton Scheidegger · Todos os direitos reservados
        </p>
      </footer>
    </div>
  );
}
