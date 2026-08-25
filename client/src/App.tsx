import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { trackPageView } from "@/lib/pixel";
import { captureTracking } from "@/lib/tracking";
import NotFound from "@/pages/NotFound";
import { useEffect, useRef } from "react";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ThankYou from "./pages/ThankYou";


// Dispara um PageView no Meta Pixel a cada troca de rota. O primeiro
// carregamento já é contado pelo código base no index.html.
function PageViewTracker() {
  const [location] = useLocation();
  const primeiraRota = useRef(true);

  useEffect(() => {
    if (primeiraRota.current) {
      primeiraRota.current = false;
      return;
    }
    trackPageView();
  }, [location]);

  return null;
}

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/obrigado"} component={ThankYou} />
      {/* Variante Brasil — mesma página; muda o grupo de WhatsApp e a tag do lead */}
      <Route path={"/br"} component={Home} />
      <Route path={"/br/obrigado"} component={ThankYou} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  // Salva as UTMs e o link de origem assim que o visitante chega
  useEffect(() => {
    captureTracking();
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <PageViewTracker />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
