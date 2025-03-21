import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toast } from './components/ui/Toast';

// Pages
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import UseCasesPage from './pages/UseCasesPage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import DemoPage from './pages/DemoPage';

// SuperAdmin Pages
import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard';
import CompaniesPage from './pages/superadmin/CompaniesPage';
import CreateCompanyPage from './pages/superadmin/CreateCompanyPage';
import CompanyDetailsPage from './pages/superadmin/CompanyDetailsPage';
import CompanyStatusChangePage from './pages/superadmin/CompanyStatusChangePage';
import MonitoringPage from './pages/superadmin/MonitoringPage';
import BillingPage from './pages/superadmin/BillingPage';
import SettingsPage from './pages/superadmin/SettingsPage';

function App() {
  return (
    <Router>
      <Toast />
      <Routes>
        {/* Main site routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/use-cases" element={<UseCasesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/demo" element={<DemoPage />} />
        
        {/* SuperAdmin routes */}
        <Route path="/superadmin" element={<SuperAdminDashboard />} />
        <Route path="/superadmin/companies" element={<CompaniesPage />} />
        <Route path="/superadmin/companies/create" element={<CreateCompanyPage />} />
        <Route path="/superadmin/companies/:id" element={<CompanyDetailsPage />} />
        <Route path="/superadmin/companies/:id/:action" element={<CompanyStatusChangePage />} />
        <Route path="/superadmin/monitoring" element={<MonitoringPage />} />
        <Route path="/superadmin/billing" element={<BillingPage />} />
        <Route path="/superadmin/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
