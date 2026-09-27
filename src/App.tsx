import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { MainLayout } from "@/components/layout/MainLayout";
import { ScrollToTop } from "@/components/ScrollToTop";
import Auth from "./pages/Auth";
import Landing from "./pages/Landing";
import Vahanhub from "./pages/Vahanhub";
import UpcurvEcom from "./pages/UpcurvEcom";
import UpcurvRetail from "./pages/UpcurvRetail";
import UpcurvPrime from "./pages/UpcurvPrime";
import UpcurvWash from "./pages/UpcurvWash";
import UpcurvHalls from "./pages/UpcurvHalls";
import UpcurvLabs from "./pages/UpcurvLabs";
import Blogs from "./pages/Blogs";
import Franchise from "./pages/Franchise";
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
import PrimePrivacy from "./pages/PrimePrivacy";
import PrimeTerms from "./pages/PrimeTerms";
import PrimeDataDeletion from "./pages/PrimeDataDeletion";
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
            <Route path="/vahanhub" element={<Vahanhub />} />
            <Route path="/upcurv-ecom" element={<UpcurvEcom />} />
            <Route path="/upcurv-retail" element={<UpcurvRetail />} />
            <Route path="/upcurv-prime" element={<UpcurvPrime />} />
            <Route path="/upcurv-wash" element={<UpcurvWash />} />
            <Route path="/upcurv-halls" element={<UpcurvHalls />} />
            <Route path="/upcurv-labs" element={<UpcurvLabs />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/refund" element={<Refund />} />
            <Route path="/franchise" element={<Franchise />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/upcurv-prime/privacy" element={<PrimePrivacy />} />
            <Route path="/upcurv-prime/terms" element={<PrimeTerms />} />
            <Route path="/upcurv-prime/data-deletion" element={<PrimeDataDeletion />} />
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
