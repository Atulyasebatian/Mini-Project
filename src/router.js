import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login"; // Login component
import SignupPage from "./pages/signup"; // Signup component
import Dashboard from "./pages/admdash"; // Dashboard component

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />        {/* Correct component */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;