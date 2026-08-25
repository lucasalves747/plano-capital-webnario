// Variantes da landing page — mesmo evento, mesma copy, públicos diferentes.
// O que muda entre elas é o grupo VIP de destino, a tag do lead e quem aparece
// na seção de mentores — não existe página duplicada: as duas rotas renderizam
// os mesmos componentes e leem daqui o que precisa variar.

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
  /** Mentores apresentados na página, na ordem em que aparecem. */
  mentores: Mentor[];
}

/** Um mentor apresentado na seção "Sobre o Mentor". */
export interface Mentor {
  nome: string;
  /** Linha de credencial exibida sobre a foto. */
  papel: string;
  foto: string;
  /** Manchete da bio. */
  headline: string;
  paragrafos: string[];
}

const HEWERTON: Mentor = {
  nome: "Hewerton Scheidegger",
  papel: "Mentor · Fundador Plano Capital",
  foto: "/manus-storage/mentor-bg_9ea99b32.jpg",
  headline: "20+ anos construindo negócios de alto desempenho",
  paragrafos: [
    "Empresário com mais de 20 anos de experiência, advogado tributarista, contador e mentor de negócios. Fundador de múltiplas empresas nas áreas de consultoria, tecnologia e finanças.",
    "Ultraman e Ironman, Hewerton aplica na prática o princípio de que o crescimento empresarial exige uma base pessoal inabalável. Como criador do Método REI e autor de obras voltadas para a prosperidade executiva, ele já guiou centenas de empresários na construção de negócios altamente lucrativos e autogerenciáveis.",
  ],
};

const SANTIAGO: Mentor = {
  nome: "Santiago Vecina",
  papel: "Mentor · Global Training",
  foto: "/manus-storage/santiago-vecina.jpg",
  headline: "Da precisão da medicina à estratégia de alta performance",
  paragrafos: [
    "Médico, nutrólogo, empresário e mentor de alta performance. Sua trajetória combina a precisão da ciência médica com a visão estratégica de quem construiu e reconstruiu negócios.",
    "Baseado em Miami, lidera a Global Training, conectando empresários brasileiros ao ecossistema de alto nível nos EUA. Sua missão é ajudar líderes a pararem de viver abaixo do potencial que Deus criou para eles.",
  ],
};

export const VARIANTS: Record<VariantId, Variant> = {
  us: {
    id: "us",
    basePath: "",
    tag: "Estados Unidos",
    whatsappGroup: "https://chat.whatsapp.com/Eg9HvGtjkk0Gn361tkX1hJ",
    horario: "8:00 PM (Flórida) | 9:00 PM (Brasília)",
    regiaoPlaceholder: "Ex: São Paulo - SP ou Orlando - FL",
    mentores: [HEWERTON],
  },
  br: {
    id: "br",
    basePath: "/br",
    tag: "Brasil",
    whatsappGroup: "https://chat.whatsapp.com/K0HBBlySDwB2GqOZQvBLLk",
    horario: "21h (Brasília) | 20h (Flórida)",
    regiaoPlaceholder: "Ex: São Paulo - SP ou Belo Horizonte - MG",
    mentores: [SANTIAGO, HEWERTON],
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
