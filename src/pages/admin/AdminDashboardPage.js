import React from "react";
import { Link } from "react-router-dom"; // FIX: Import Link for SPA navigation
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Dashboard = () => {
  return (
    <div className="d-flex flex-column vh-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky-top">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center py-2">
            {/* Left: Logo */}
            <div className="d-flex align-items-center">
              <button className="btn btn-link text-secondary d-lg-none">
                <span className="material-icons">menu</span>
              </button>
              <div className="d-flex align-items-center ms-2">
                <i className="material-icons text-primary fs-2">directions_bus</i>
                <span className="ms-2 h5 mb-0 fw-bold text-dark">TransitGo</span>
              </div>
            </div>

            {/* Center: Search */}
            <form className="d-none d-md-block w-50 mx-3">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i className="material-icons text-muted">search</i>
                </span>
                <input type="search" className="form-control border-start-0" placeholder="Search" />
              </div>
            </form>

            {/* Right: Notifications + Avatar */}
            <div className="d-flex align-items-center gap-3">
              <button className="btn btn-link text-secondary">
                <i className="material-icons">notifications</i>
              </button>
              <img
                src="https://lh3.googleusercontent.com/a-/ALV-UjXhE8bQ6U2z3a7d9b7c8e9f0a1b2c3d4e5f6g7h8i9j0_k=s40-c"
                className="rounded-circle"
                width="40"
                height="40"
                alt="User avatar"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow-1 p-4 bg-light">
        <h1 className="h3 fw-bold mb-4">Dashboard</h1>

        {/* Stats Cards */}
        <div className="row g-4">
          {[
            { title: "Total Users", value: 0, icon: "groups", color: "primary" },
            { title: "Total Vehicles", value: 0, icon: "directions_bus", color: "success" },
            { title: "Total Operators", value: 0, icon: "engineering", color: "warning" },
            { title: "Fares Today", value: "₹0", icon: "attach_money", color: "danger" },
          ].map((card, index) => (
            <div key={index} className="col-sm-6 col-lg-3">
              <div className="card shadow-sm border-0 rounded-3">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <p className="text-muted mb-1">{card.title}</p>
                    <h3 className="fw-bold mb-0">{card.value}</h3>
                  </div>
                  <div className={`bg-${card.color} bg-opacity-10 p-3 rounded-circle`}>
                    <i className={`material-icons text-${card.color}`}>{card.icon}</i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="card shadow-sm border-0 rounded-3 mt-5">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">Recent Activity</h5>
              <Link to="#" className="text-primary fw-medium d-none d-sm-inline">View All</Link>
            </div>
            <div className="text-center py-5">
              <i className="material-icons text-muted display-4">history</i>
              <p className="mt-3 text-muted">No recent activities available.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-top shadow-sm">
        <div className="container-fluid">
          <div className="d-flex justify-content-around align-items-center py-3">
            {[
              { name: "Dashboard", icon: "dashboard", active: true, path: "/dashboard" },
              { name: "Users", icon: "groups", path: "/admin/users" },
              { name: "Vehicles", icon: "directions_bus", path: "/admin/vehicles" },
              { name: "Operators", icon: "engineering", path: "/admin/operators" },
              { name: "Fares", icon: "receipt", path: "/admin/fares" },
            ].map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`text-center text-decoration-none ${item.active ? "text-primary" : "text-muted"}`}
              >
                <i className="material-icons">{item.icon}</i>
                <div className="small">{item.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;