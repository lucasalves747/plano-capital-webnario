// Tracking — captura e persistência de UTMs e link de origem.
// As UTMs chegam na URL (ex: ?utm_source=google&utm_medium=cpc) e são salvas
// no localStorage na primeira visita, para não se perderem quando o visitante
// navega entre páginas antes de preencher o formulário.

const STORAGE_KEY = "pc_tracking";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export interface TrackingData {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  link_origem: string;
}

/**
 * Deve ser chamada no carregamento do app. Se a URL atual tiver UTMs,
 * elas sobrescrevem as anteriores (última campanha vence). Se não tiver,
 * mantém o que já estava salvo de uma visita anterior.
 */
export function captureTracking(): void {
  try {
    const params = new URLSearchParams(window.location.search);
    const hasUtms = UTM_KEYS.some((k) => params.get(k));

    const existing = getTracking();

    if (hasUtms || !existing.link_origem) {
      const data: TrackingData = {
        utm_source: params.get("utm_source") || existing.utm_source || "",
        utm_medium: params.get("utm_medium") || existing.utm_medium || "",
        utm_campaign: params.get("utm_campaign") || existing.utm_campaign || "",
        utm_term: params.get("utm_term") || existing.utm_term || "",
        utm_content: params.get("utm_content") || existing.utm_content || "",
        link_origem: window.location.href,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  } catch {
    // localStorage indisponível (modo privado etc.) — segue sem tracking
  }
}

export function getTracking(): TrackingData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...emptyTracking(), ...JSON.parse(raw) };
  } catch {
    // ignora e retorna vazio
  }
  return emptyTracking();
}

function emptyTracking(): TrackingData {
  return {
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
    link_origem: typeof window !== "undefined" ? window.location.href : "",
  };
}
