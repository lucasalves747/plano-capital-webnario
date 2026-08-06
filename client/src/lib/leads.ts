// Envio de leads para o CRM (webhook de contatos).
import { getTracking } from "./tracking";

const WEBHOOK_URL =
  "https://contact-blossom-39.lovable.app/api/public/contatos/ck_bbf86380_bbf863806b4d8493ecc18133fdaada0db4550266241c8f1871d335968eb273d5";

// Tag usada para identificar de qual site o lead veio
const SITE_TAG = "Escala Inteligente - Webinário";

export interface LeadInput {
  nome: string;
  email: string;
  telefone: string;
  regiao: string;
  profissao: string;
}

export async function submitLead(lead: LeadInput): Promise<boolean> {
  const tracking = getTracking();

  const comentarioPartes = [
    "Inscrição na masterclass gratuita Escala Inteligente (25/08/2026, ao vivo).",
    `Enviado em ${new Date().toLocaleString("pt-BR")}.`,
  ];
  if (document.referrer) {
    comentarioPartes.push(`Referrer: ${document.referrer}`);
  }

  const body = {
    nome: lead.nome,
    email: lead.email,
    telefone: lead.telefone,
    regiao: lead.regiao,
    profissao: lead.profissao,
    tags: [SITE_TAG, "lead"],
    redes_sociais: [],
    comentario: comentarioPartes.join(" "),
    link_origem: tracking.link_origem || window.location.href,
    utm_source: tracking.utm_source,
    utm_medium: tracking.utm_medium,
    utm_campaign: tracking.utm_campaign,
    utm_term: tracking.utm_term,
    utm_content: tracking.utm_content,
  };

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      // keepalive garante o envio mesmo se a página navegar logo em seguida
      keepalive: true,
    });
    return res.ok;
  } catch {
    return false;
  }
}
