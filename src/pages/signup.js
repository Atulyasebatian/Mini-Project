import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/signup.css";

function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // 'role' is not sent; backend defaults to 'Passenger'
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || 'Failed to sign up');
      }

      console.log("Sign Up successful:", data);
      alert('Registration successful! Please log in.'); // Give user feedback
      navigate("/"); // Navigate to login page

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
          <p className="text-light">Sign up to start your journey.</p>
        </div>

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
              onChange={(e) => setPassword(e.target.value)}
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