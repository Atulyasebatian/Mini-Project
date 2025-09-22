import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/signup.css";

function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!role) {
      setError("Please select a role");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email, role, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Failed to sign up");
      }

      alert("Registration successful! Please log in.");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const backgroundImageUrl = "/rr-modified.jpg";

  return (
    <div
      className="signup-wrapper d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
      }}
    >
      <div className="signup-overlay"></div>
      <div className="signup-card glassmorphism small-card text-center">
        {/* Logo + Title */}
        <div className="mb-3">
          <div className="d-flex justify-content-center align-items-center mb-2">
            <span className="material-icons text-white fs-1 me-2">
              directions_bus
            </span>
            <h2 className="fw-bold text-white m-0">TransitGo</h2>
          </div>
          <h3 className="fw-bold text-white">Create an Account</h3>
          <p className="text-light">Choose your role to get started.</p>
        </div>

        {/* Error Message */}
        {error && <div className="error-box">{error}</div>}

        {/* Role Buttons */}
        <div className="d-flex justify-content-center gap-3 mb-3">
          <button
            type="button"
            className={`role-btn ${role === "Passenger" ? "active" : ""}`}
            onClick={() => setRole("Passenger")}
          >
            <span className="material-icons">person</span>
            Passenger
          </button>
          <button
            type="button"
            className={`role-btn ${role === "Operator" ? "active" : ""}`}
            onClick={() => setRole("Operator")}
          >
            <span className="material-icons">engineering</span>
            Operator
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Full Name"
              className="form-control glassmorphism-input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              placeholder="Email Address"
              className="form-control glassmorphism-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              className="form-control glassmorphism-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold">
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-light mt-3">
          Already have an account?{" "}
          <Link to="/" className="fw-bold text-white text-decoration-none">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
