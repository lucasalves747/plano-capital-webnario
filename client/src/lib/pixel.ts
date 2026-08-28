// Meta Pixel (Facebook) — um pixel por variante da landing page:
//   Brasil (/br): 1741861587087825 · EUA (raiz): 1849456986213300
// Os ids só aparecem no index.html: o código base fica lá para carregar antes
// do React, escolher o pixel pelo caminho da URL e disparar o PageView do
// primeiro carregamento. Como só um pixel é inicializado por visita, os
// fbq("track", ...) daqui já caem no pixel certo sem precisar saber a variante.
//
// São só dois eventos, de propósito: PageView e CompleteRegistration. Nada de
// Lead em paralelo — era o mesmo acontecimento contado duas vezes.

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

/**
 * Inscrição concluída — evento padrão "CompleteRegistration" do Meta, que
 * aparece como "Cadastro concluído" no gerenciador. É o evento de conversão da
 * página: quem preencheu o formulário chegou até aqui.
 */
export function trackInscricao(origem: string) {
  track("CompleteRegistration", {
    content_name: "Masterclass Escala Inteligente",
    content_category: origem,
    status: true,
  });
}
