import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../styles/dashboard.css";

function DashboardLayout() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Users", path: "/users", icon: "👥" },
    { name: "Vehicles", path: "/vehicles", icon: "🚌" },
    { name: "Operators", path: "/operators", icon: "🧑‍🔧" },
    { name: "Fares", path: "/fares", icon: "💵" },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">🚍 TransitGo</h2>
        <nav>
          <ul>
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={location.pathname === item.path ? "active" : ""}
                >
                  <span>{item.icon}</span> {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="logout">
          <Link to="/">🚪 Logout</Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <input type="text" placeholder="Search for anything..." />
          <div className="profile">
            <span>🔔</span>
            <span>👤 Admin User</span>
          </div>
        </header>

        {/* Page Content */}
        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
