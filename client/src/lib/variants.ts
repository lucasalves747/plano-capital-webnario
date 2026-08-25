// Variantes da landing page — mesmo evento, mesma copy, públicos diferentes.
// A única coisa que muda entre elas é o grupo VIP de destino e a tag do lead,
// então não existe página duplicada: as duas rotas renderizam os mesmos
// componentes e leem daqui o que precisa variar.

export type VariantId = "us" | "br";

export interface Variant {
  id: VariantId;
  /** Prefixo de rota. Vazio na variante padrão (raiz do site). */
  basePath: string;
  /** Tag enviada ao CRM para segmentar de onde veio o lead. */
  tag: string;
  /** Grupo VIP de WhatsApp para onde a página de obrigado encaminha. */
  whatsappGroup: string;
  /**
   * Linha de horário do evento. É o mesmo instante nas duas variantes — muda
   * só a ordem, para o fuso do público aparecer primeiro.
   */
  horario: string;
  /** Exemplo no campo "Cidade / Estado" do formulário. */
  regiaoPlaceholder: string;
}

export const VARIANTS: Record<VariantId, Variant> = {
  us: {
    id: "us",
    basePath: "",
    tag: "Estados Unidos",
    whatsappGroup: "https://chat.whatsapp.com/Eg9HvGtjkk0Gn361tkX1hJ",
    horario: "8:00 PM (Flórida) | 9:00 PM (Brasília)",
    regiaoPlaceholder: "Ex: São Paulo - SP ou Orlando - FL",
  },
  br: {
    id: "br",
    basePath: "/br",
    tag: "Brasil",
    whatsappGroup: "https://chat.whatsapp.com/K0HBBlySDwB2GqOZQvBLLk",
    horario: "21h (Brasília) | 20h (Flórida)",
    regiaoPlaceholder: "Ex: São Paulo - SP ou Belo Horizonte - MG",
  },
};

export const DEFAULT_VARIANT = VARIANTS.us;

/**
 * Descobre a variante pelo caminho atual — "/br" e "/br/obrigado" caem na
 * variante Brasil; qualquer outro caminho usa a padrão.
 */
export function variantFromPath(path: string): Variant {
  const { basePath } = VARIANTS.br;
  return path === basePath || path.startsWith(`${basePath}/`)
    ? VARIANTS.br
    : DEFAULT_VARIANT;
}
