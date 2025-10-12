import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Public Pages
import LandingPage from "./pages/LandingPage";  
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";

// Passenger Pages (from the 'passenger' subfolder)
import HomePage from "./pages/passenger/Home"; 
import TimingsPage from "./pages/passenger/TimingsPage";
import PaymentPage from "./pages/passenger/PaymentPage";
import HistoryPage from "./pages/passenger/HistoryPage";
import ReportPage from "./pages/passenger/ReportPage";

// Operator Pages (from the 'operator' subfolder)
import OperatorDashboard from "./pages/operator/Dashboard";
import OperatorRoutesPage from "./pages/operator/OperatorRoutesPage";

// Admin Pages (from the 'admin' subfolder)
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import UserManagementPage from "./pages/admin/UserManagementPage";
import AssignOperatorsPage from "./pages/admin/AssignOperatorsPage";
import Vehicle from "./pages/admin/Vehicle";
import Faresmgt from "./pages/admin/Faresmgt";
import ViewReportsPage from "./pages/admin/ViewReportsPage";

function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* --- PUBLIC ROUTES --- */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        

        {/* --- PASSENGER ROUTES --- */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/timings" element={<TimingsPage />} />
        <Route path="/payment" element={<PaymentPage />} />
         <Route path="/history" element={<HistoryPage />} /> 
         <Route path="/report" element={<ReportPage />} /> 

        {/* --- OPERATOR ROUTES --- */}
        <Route path="/operator/dashboard" element={<OperatorDashboard />} />
        <Route path="/operator/routes" element={<OperatorRoutesPage />} />

        {/* --- ADMIN ROUTES --- */}
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/users" element={<UserManagementPage />} />
        <Route path="/admin/operators" element={<AssignOperatorsPage />} />
        <Route path="/admin/vehicles" element={<Vehicle />} />
        <Route path="/admin/fares" element={<Faresmgt />} />
        <Route path="/admin/reports" element={<ViewReportsPage />} />
        
        {/* --- REDIRECTS & FALLBACK --- */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;