// File: /src/pages/signup.js

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/signup.css";

function SignupPage() {
  const [role, setRole] = useState("Passenger");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        // If server responds with an error, display it
        throw new Error(data.msg || 'Failed to sign up');
      }

      console.log("Sign Up successful:", data);
      // Navigate to login page on successful registration
      navigate("/");

    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const backgroundImageUrl = "/rr-modified.jpg";

  return (
    <div
      className="signup-wrapper"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className="signup-overlay"></div>
      <div className="signup-card glassmorphism">
        <div className="text-center mb-4">
          <div className="d-flex justify-content-center align-items-center mb-3">
            <span className="material-icons text-white fs-1 me-2">
              directions_bus
            </span>
            <h2 className="fw-bold text-white m-0">TransitGo</h2>
          </div>
          <h3 className="fw-bold text-white">Create an Account</h3>
          <p className="text-light">Choose your role to get started.</p>
        </div>

        {/* Role Selection */}
        <div className="mb-4">
          <p className="text-white fw-medium">Choose your role</p>
          <div className="d-flex gap-3">
            <button
              type="button"
              onClick={() => setRole("Passenger")}
              className={`btn flex-fill d-flex flex-column align-items-center p-3 rounded glassmorphism role-btn ${
                role === "Passenger" ? "active" : ""
              }`}
            >
              <span className="material-icons fs-2">person</span>
              <span className="fw-semibold mt-2">Passenger</span>
            </button>
            <button
              type="button"
              onClick={() => setRole("Operator")}
              className={`btn flex-fill d-flex flex-column align-items-center p-3 rounded glassmorphism role-btn ${
                role === "Operator" ? "active" : ""
              }`}
            >
              <span className="material-icons fs-2">engineering</span>
              <span className="fw-semibold mt-2">Operator</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label text-white">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              className="form-control glassmorphism-input"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-white">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="form-control glassmorphism-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control glassmorphism-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // <-- FIX: e.g.value to e.target.value
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">
            Sign Up
          </button>
        </form>

        <p className="text-center text-light mt-4">
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