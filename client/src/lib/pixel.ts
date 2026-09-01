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

// Marca, na sessão do navegador, que a inscrição já foi contada — é o que
// impede o mesmo cadastro de virar duas conversões (formulário do site e,
// logo depois, a página de obrigado).
const MARCA_INSCRICAO = "pc:inscricao-registrada";

function jaContou(): boolean {
  try {
    return sessionStorage.getItem(MARCA_INSCRICAO) === "1";
  } catch {
    // Navegação privada pode bloquear o sessionStorage
    return false;
  }
}

function marcarContada() {
  try {
    sessionStorage.setItem(MARCA_INSCRICAO, "1");
  } catch {
    // Sem storage, o pior caso é contar de novo numa recarga — segue o jogo
  }
}

/**
 * Inscrição concluída — evento padrão "CompleteRegistration" do Meta, que
 * aparece como "Cadastro concluído" no gerenciador. É o evento de conversão da
 * página: quem preencheu o formulário chegou até aqui.
 */
export function trackInscricao(origem: string) {
  marcarContada();
  track("CompleteRegistration", {
    content_name: "Masterclass Escala Inteligente",
    content_category: origem,
    status: true,
  });
}

/**
 * Conversão de quem cai direto na página de obrigado sem passar pelo
 * formulário do site — o caso do formulário nativo do Facebook (Lead Ad), que
 * coleta o lead dentro do anúncio e só manda a pessoa para cá. Não dispara se
 * a inscrição já foi contada nesta sessão.
 */
export function trackInscricaoDireta(origem: string) {
  if (jaContou()) return;
  trackInscricao(origem);
}
