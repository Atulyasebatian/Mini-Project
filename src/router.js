import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Public & User-facing Pages
import LoginPage from "./pages/login"; 
import SignupPage from "./pages/signup"; 
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";

// New Mobile-First Admin Pages
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import UserManagementPage from "./pages/admin/UserManagementPage";
import AssignOperatorsPage from "./pages/admin/AssignOperatorsPage";
import OperatorDashboardPage from "./pages/DashboardPage";

function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* --- PUBLIC & USER ROUTES --- */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} /> 

        <Route path="/operator/dashboard" element={<OperatorDashboardPage />} />

        {/* --- NEW ADMIN ROUTES --- */}
        {/* The main dashboard for the new mobile UI */}
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        
        {/* The user management page */}
        <Route path="/admin/users" element={<UserManagementPage />} />

        {/* The operator assignment page */}
        <Route path="/admin/operators" element={<AssignOperatorsPage />} />
        
        {/* Add other admin routes here as you create them */}
        {/* e.g., <Route path="/admin/vehicles" element={<VehiclePage />} /> */}

        {/* --- REDIRECT & FALLBACK --- */}
        {/* Convenience redirect: if a user navigates to "/admin", send them to the dashboard */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />

        {/* Fallback to NotFound for any other unknown routes */}
        <Route path="*" element={<NotFound />} />         
      </Routes>
    </Router>
  );
}

export default AppRouter;