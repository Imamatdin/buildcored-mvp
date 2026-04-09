import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Companies from "./pages/Companies";
import CompanyView from "./pages/CompanyView";
import Problems from "./pages/Problems";
import Problem from "./pages/Problem";
import About from "./pages/About";
import Showcase from "./pages/Showcase";
import Orcas from "./pages/Orcas";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Admin — no navbar/footer */}
          <Route path="/admin" element={<Admin />} />

          {/* All pages get navbar + footer */}
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/company/:token" element={<CompanyView />} />
            <Route path="/problems" element={<Problems />} />
            <Route path="/problem/:id" element={<Problem />} />
            <Route path="/about" element={<About />} />
            <Route path="/showcase" element={<Showcase />} />
            <Route path="/orcas" element={<Orcas />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
