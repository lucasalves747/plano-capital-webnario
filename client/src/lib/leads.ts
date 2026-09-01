// Envio de leads para o CRM (webhook de contatos).
import { getTracking } from "./tracking";

const WEBHOOK_URL =
  "https://contact-blossom-39.lovable.app/api/public/contatos/ck_bbf86380_bbf863806b4d8493ecc18133fdaada0db4550266241c8f1871d335968eb273d5";

// Webhook adicional (LeadConnector) — recebe apenas nome, email e telefone
const LEADCONNECTOR_URL =
  "https://services.leadconnectorhq.com/hooks/dkM0aNpySiIFf3uusFTa/webhook-trigger/fd05de75-bfe1-4e6f-b354-7337bcc868fc";

// Tag usada para identificar de qual site o lead veio
const SITE_TAG = "Escala Inteligente - Webinário";

export interface LeadInput {
  nome: string;
  email: string;
  telefone: string;
  regiao: string;
  profissao: string;
  /** Tag da variante que originou o lead (ver lib/variants.ts). */
  origem: string;
}

export async function submitLead(lead: LeadInput): Promise<boolean> {
  const tracking = getTracking();

  const comentarioPartes = [
    "Inscrição na masterclass gratuita Escala Inteligente (01/09/2026, ao vivo).",
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
    tags: [SITE_TAG, "lead", lead.origem],
    redes_sociais: [],
    comentario: comentarioPartes.join(" "),
    link_origem: tracking.link_origem || window.location.href,
    utm_source: tracking.utm_source,
    utm_medium: tracking.utm_medium,
    utm_campaign: tracking.utm_campaign,
    utm_term: tracking.utm_term,
    utm_content: tracking.utm_content,
  };

  // Os dois webhooks são disparados em paralelo; a falha de um não impede o outro
  const [crmOk, lcOk] = await Promise.all([
    postJson(WEBHOOK_URL, body),
    postJson(LEADCONNECTOR_URL, {
      nome: lead.nome,
      email: lead.email,
      telefone: lead.telefone,
      origem: lead.origem,
    }),
  ]);
  return crmOk && lcOk;
}

async function postJson(url: string, payload: unknown): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // keepalive garante o envio mesmo se a página navegar logo em seguida
      keepalive: true,
    });
    return res.ok;
  } catch {
    return false;
  }
}

// ─── Presença na aula ao vivo ────────────────────────────────────────────────
// A página /aula pede só e-mail e telefone antes de mandar a pessoa para a sala
// do Zoom — é o que permite saber, depois, quem realmente entrou na reunião.

/** Tag que marca quem entrou na sala da masterclass do dia 01/09/2026. */
export const TAG_PRESENCA = "presente_masterclass_010926";

export interface PresencaInput {
  email: string;
  telefone: string;
}

/**
 * Marca a presença no contato que já existe no CRM. O e-mail e o telefone são
 * só a chave de busca — o CRM encontra o contato por eles e acrescenta a tag.
 *
 * Por isso o corpo vai deliberadamente enxuto: nome, região, profissão, UTMs e
 * comentário não são enviados, já que qualquer campo que fosse junto poderia
 * sobrescrever o que o contato já tem com o vazio deste formulário.
 *
 * Não bloqueia o acesso à aula: quem chama isto redireciona para o Zoom mesmo
 * se o webhook falhar.
 */
export async function submitPresenca(presenca: PresencaInput): Promise<boolean> {
  return postJson(WEBHOOK_URL, {
    email: presenca.email,
    telefone: presenca.telefone,
    tags: [TAG_PRESENCA],
  });
}
