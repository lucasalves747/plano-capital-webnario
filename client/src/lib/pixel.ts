// Meta Pixel (Facebook) — o mesmo pixel (1849456986213300) nas duas variantes
// da landing page. O id só aparece no index.html: o código base fica lá para
// carregar antes do React e disparar o PageView do primeiro carregamento. Aqui
// ficam só os disparos que dependem da navegação SPA e do formulário.
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
