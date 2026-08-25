// Meta Pixel (Facebook) — o mesmo pixel nas duas variantes da landing page.
// O código base fica no index.html, para carregar antes do React e disparar o
// PageView do primeiro carregamento. Aqui ficam só os disparos que dependem da
// navegação SPA e do formulário de inscrição.

export const PIXEL_ID = "1643323880139413";

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
