import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navigation from "./components/Navigation";
import siaLogo from './assets/sia-logo.svg';
import Home from "./pages/Home";
import About from "./pages/About";
import Team from "./pages/Team";
import Research from "./pages/Research";
import Publications from "./pages/Publications";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background font-sans">
          <Navigation />

          {/* Main Content */}
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Team />} />
              <Route path="/research" element={<Research />} />
              <Route path="/publications" element={<Publications />} />
              <Route path="/contact" element={<Contact />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="footer bg-background">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="footer-content">
                <div className="footer-copyright flex items-center gap-2">
                  <span>© {new Date().getFullYear()}</span>
                  <img src={siaLogo} alt="SIA Laboratories" className="h-5" />
                  <span style={{ fontFamily: 'Moonspace, sans-serif' }} className="tracking-wider">SIA LABORATORIES</span>
                  <span>All rights reserved.</span>
                </div>

                <div className="footer-links">
                  <Link to="/about">About</Link>
                  <Link to="/research">Research</Link>
                  <Link to="/publications">Publications</Link>
                  <Link to="/contact">Contact</Link>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
