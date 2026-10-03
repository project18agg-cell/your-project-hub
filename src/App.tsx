import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { MainLayout } from "@/components/layout/MainLayout";
import { ScrollToTop } from "@/components/ScrollToTop";
import Auth from "./pages/Auth";
import Landing from "./pages/Landing";
import CustomSaas from "./pages/CustomSaas";
import Blog from "./pages/Blog";
import BlogPostPage from "./pages/BlogPost";
import PricingPage from "./pages/Pricing";
import UseCase from "./pages/UseCase";
import { useCasePages } from "@/lib/useCasePages";
import UpcurvHalls from "./pages/UpcurvHalls";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Refund from "./pages/Refund";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Products from "./pages/Products";
import Subscriptions from "./pages/Subscriptions";
import Partners from "./pages/Partners";
import Tickets from "./pages/Tickets";
import Revenue from "./pages/Revenue";
import Expenses from "./pages/Expenses";
import Reports from "./pages/Reports";
import SystemLogs from "./pages/SystemLogs";
import Leads from "./pages/Leads";
import Enquiries from "./pages/Enquiries";
import Analytics from "./pages/Analytics";
import InternshipApplications from "./pages/InternshipApplications";
import Careers from "./pages/Careers";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Public pages */}
            <Route path="/" element={<Landing />} />
            <Route path="/custom-saas" element={<CustomSaas />} />
            <Route path="/pricing" element={<PricingPage />} />
            {useCasePages.map((page) => (
              <Route key={page.slug} path={`/${page.slug}`} element={<UseCase page={page} />} />
            ))}
            <Route path="/upcurv-halls" element={<UpcurvHalls />} />
            {['/vahanhub', '/upcurv-ecom', '/upcurv-retail', '/upcurv-prime', '/upcurv-wash', '/upcurv-labs', '/upcurv-prime/privacy', '/upcurv-prime/terms', '/upcurv-prime/data-deletion'].map((path) => (
              <Route key={path} path={path} element={<Navigate to="/#products" replace />} />
            ))}
            <Route path="/blogs" element={<Navigate to="/blog" replace />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/refund" element={<Refund />} />
            <Route path="/franchise" element={<Navigate to="/" replace />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/auth" element={<Auth />} />
            {/* Admin pages */}
            <Route
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/products" element={<Products />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/tickets" element={<Tickets />} />
              <Route path="/revenue" element={<Revenue />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/leads" element={<Leads />} />
              <Route path="/enquiries" element={<Enquiries />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/internship-applications" element={<InternshipApplications />} />
              <Route path="/logs" element={<SystemLogs />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
