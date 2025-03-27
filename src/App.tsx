
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { MetaMaskProvider } from "@/hooks/use-metamask";
import Background3D from "@/components/three/Background3D";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Transactions from "./pages/Transactions";
import Login from "./pages/Login";
import HowItWorks from "./pages/HowItWorks";
import Disputes from "./pages/Disputes";

const queryClient = new QueryClient();
const GOOGLE_CLIENT_ID = "your-google-client-id.apps.googleusercontent.com"; // Replace with actual client ID

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <MetaMaskProvider>
        <TooltipProvider>
          <Background3D />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/login" element={<Login />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/disputes" element={<Disputes />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </MetaMaskProvider>
    </GoogleOAuthProvider>
  </QueryClientProvider>
);

export default App;
