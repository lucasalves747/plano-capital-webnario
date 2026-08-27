// Meta Pixel (Facebook) — cada variante da landing page tem o seu (ver
// `pixelId` em lib/variants.ts). O código base fica no index.html, que escolhe
// o pixel pelo caminho da URL, carrega antes do React e dispara o PageView do
// primeiro carregamento. Aqui ficam só os disparos que dependem da navegação
// SPA e do formulário de inscrição: como só um pixel é inicializado por
// carregamento, o `fbq("track", ...)` já vai para o pixel certo.

declare global {
  interface Window {
    fbq?: (
      command: string,
      event: string,
      params?: Record<string, unknown>,
    ) => void;
  }
}

function track(event: string, params?: Record<string, unknown>) {
  // O pixel pode não ter carregado (bloqueador, offline) — nesse caso, ignora
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("track", event, params);
}

/**
 * PageView. O index.html já dispara o do primeiro carregamento; este cobre as
 * trocas de rota dentro da SPA (ex.: "/" → "/obrigado").
 */
export function trackPageView() {
  track("PageView");
}

/** Lead — inscrição enviada no formulário. */
export function trackLead(origem: string) {
  track("Lead", {
    content_name: "Masterclass Escala Inteligente",
    content_category: origem,
  });
}

/**
 * Inscrição concluída — evento padrão "CompleteRegistration" do Meta, que
 * aparece como "Cadastro concluído" no gerenciador. Dispara junto do Lead: o
 * Lead serve para otimização de campanha, este marca a inscrição em si.
 */
export function trackInscricao(origem: string) {
  track("CompleteRegistration", {
    content_name: "Masterclass Escala Inteligente",
    content_category: origem,
    status: true,
  });
}
