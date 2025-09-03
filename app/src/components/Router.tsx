import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SampleReport from './pages/SampleReport';
import SubscriptionFlow from './pages/SubscriptionFlow';
import Dashboard from './pages/Dashboard';
import ConsultationDashboard from './pages/ConsultationDashboard';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/sample-report" element={<SampleReport />} />
      <Route path="/subscribe" element={<SubscriptionFlow />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/consultation-dashboard" element={<ConsultationDashboard />} />
    </Routes>
  );
}

export default Router;