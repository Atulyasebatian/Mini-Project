import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// --- Import all pages ---

// Public Pages
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import NotFound from "./pages/NotFound";

// Passenger Pages
import HomePage from "./pages/passenger/Home"; 
import TimingsPage from "./pages/passenger/TimingsPage";
import PaymentPage from "./pages/passenger/PaymentPage";
// Operator Pages
import OperatorDashboard from "./pages/operator/Dashboard";
import OperatorRoutesPage from "./pages/operator/OperatorRoutesPage";

// Admin Pages
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import UserManagementPage from "./pages/admin/UserManagementPage";
import AssignOperatorsPage from "./pages/admin/AssignOperatorsPage";
import Vehicle from "./pages/admin/Vehicle"; 
import Faresmgt from "./pages/admin/Faresmgt"; 


function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* --- PUBLIC ROUTES --- */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* --- PASSENGER ROUTE --- */}
        {/* Users are redirected here after login */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/timings" element={<TimingsPage />} />
        <Route path="/payment" element={<PaymentPage />} />

        {/* --- OPERATOR ROUTES --- */}
        <Route path="/operator/dashboard" element={<OperatorDashboard />} />
        <Route path="/operator/routes" element={<OperatorRoutesPage />} />

        {/* --- ADMIN ROUTES --- */}
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/users" element={<UserManagementPage />} />
        <Route path="/admin/operators" element={<AssignOperatorsPage />} />
        <Route path="/admin/vehicles" element={<Vehicle />} />
        <Route path="/admin/fares" element={<Faresmgt />} />
        
        {/* --- REDIRECTS & FALLBACK --- */}
        {/* Redirect /admin to the admin dashboard for convenience */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
        {/* Any unknown URL will show the NotFound page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;