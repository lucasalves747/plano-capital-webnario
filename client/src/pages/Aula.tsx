// Aula ao vivo — porta de entrada da sala do Zoom.
// A pessoa deixa e-mail e telefone, o contato é salvo no CRM com a tag de
// presença e, em seguida, o navegador vai direto para a reunião. É assim que
// se sabe quem realmente entrou na aula.

import { useState } from "react";
import { Lock, Radio, Video } from "lucide-react";
import { useLocation } from "wouter";
import { useIsMobile } from "@/hooks/useMobile";
import { submitPresenca } from "@/lib/leads";
import { variantFromPath } from "@/lib/variants";

/** Sala da masterclass. Depois do cadastro, o navegador é enviado para cá. */
const ZOOM_URL =
  "https://us06web.zoom.us/j/87007821652?pwd=P32jTbm3LjhBtCTWkzPH0sI52FobeK.1";

const GOLD = "#C9A84C";
const TEXT_PRIMARY = "#F5F5F0";
const TEXT_SECONDARY = "#AAAAAA";
const TEXT_MUTED = "#666660";
const BG_LIGHT = "#F5F5F0";
const INK = "#17160F";
const INK_SECONDARY = "#45443C";

const labelStyle = {
  display: "block",
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "0.7rem",
  fontWeight: 600,
  letterSpacing: "0.15em",
  textTransform: "uppercase" as const,
  color: INK_SECONDARY,
  marginBottom: "0.5rem",
};

export default function Aula() {
  const isMobile = useIsMobile();
  const [location] = useLocation();
  const variant = variantFromPath(location);
  const [formData, setFormData] = useState({ email: "", whatsapp: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.whatsapp) return;
    setSubmitting(true);
    // O acesso à sala nunca depende do webhook — se o registro falhar, a
    // pessoa entra na aula do mesmo jeito.
    await submitPresenca({
      email: formData.email,
      telefone: formData.whatsapp,
    });
    window.location.href = ZOOM_URL;
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#080808",
        color: TEXT_PRIMARY,
        fontFamily: "'Montserrat', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
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

      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: isMobile ? "2.5rem 1.25rem" : "4rem 1.5rem",
        }}
      >
        <div style={{ width: "100%", maxWidth: "520px" }}>
          {/* Chamada */}
          <div className="animate-fade-in-up" style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                border: "1px solid rgba(201,168,76,0.25)",
                backgroundColor: "rgba(201,168,76,0.08)",
                borderRadius: "2px",
                padding: "0.3rem 0.8rem",
                marginBottom: "1.5rem",
              }}
            >
              <Radio size={13} style={{ color: GOLD }} />
              <span
                style={{
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: GOLD,
                }}
              >
                Masterclass ao vivo
              </span>
            </div>

            <h1
              className="headline-serif"
              style={{ fontSize: "clamp(1.8rem, 5vw, 2.6rem)", marginBottom: "1rem" }}
            >
              Acesso à sala da aula
            </h1>
            <p style={{ fontSize: "0.95rem", color: TEXT_SECONDARY, lineHeight: 1.8, margin: 0 }}>
              Confirme o <strong style={{ color: TEXT_PRIMARY, fontWeight: 600 }}>mesmo e-mail e
              WhatsApp que você usou na inscrição</strong> para registrar sua presença. Em
              seguida você será levado direto para a sala do{" "}
              <span style={{ color: GOLD, fontStyle: "italic" }}>Escala Inteligente</span>.
            </p>
          </div>

          {/* Formulário */}
          <div
            className="animate-fade-in-up animate-delay-100"
            style={{
              backgroundColor: BG_LIGHT,
              color: INK,
              padding: isMobile ? "1.75rem 1.35rem" : "2.5rem",
              borderTop: `2px solid ${GOLD}`,
            }}
          >
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={labelStyle}>E-mail</label>
                <input
                  type="email"
                  className="input-light"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  autoFocus
                />
              </div>
              <div>
                <label style={labelStyle}>WhatsApp (com código do país)</label>
                <input
                  type="tel"
                  className="input-light"
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
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.6rem",
                }}
              >
                <Video size={16} />
                {submitting ? "Entrando na sala..." : "Entrar na Aula Agora"}
              </button>

              <p
                style={{
                  fontSize: "0.72rem",
                  color: INK_SECONDARY,
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

          <p
            style={{
              fontSize: "0.72rem",
              color: TEXT_MUTED,
              textAlign: "center",
              lineHeight: 1.7,
              marginTop: "1.25rem",
            }}
          >
            A sala abre no aplicativo do Zoom ou no navegador. {variant.horario}.
          </p>
        </div>
      </main>

      <footer
        style={{
          padding: "2rem 1.5rem",
          textAlign: "center",
          borderTop: "1px solid rgba(201,168,76,0.08)",
        }}
      >
        <p
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#333330",
            margin: 0,
          }}
        >
          © 2026 Plano Capital Business · Hewerton Scheidegger · Todos os direitos reservados
        </p>
      </footer>
    </div>
  );
}
