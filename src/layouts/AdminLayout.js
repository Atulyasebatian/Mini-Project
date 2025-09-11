import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/adminLayout.css';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: '/admin/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/admin/users', icon: 'group', label: 'Users' },
    { path: '/admin/operators', icon: 'engineering', label: 'Operators' },
    { path: '/admin/vehicles', icon: 'directions_bus', label: 'Vehicles' },
    { path: '/admin/fares', icon: 'receipt_long', label: 'Fares' },
  ];

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <button className="menu-btn">
          <span className="material-icons">menu</span>
        </button>
        <div className="header-brand">
          <span className="material-icons">directions_bus</span>
          <h1>TransitGo</h1>
        </div>
        <div className="header-actions">
          <button className="notification-btn">
            <span className="material-icons">notifications</span>
            <span className="notification-badge">3</span>
          </button>
          <img src="https://i.pravatar.cc/150?img=3" alt="Admin" className="profile-pic" />
        </div>
      </header>
      
      <main className="admin-main-content">
        {children}
      </main>

      <footer className="admin-bottom-nav">
        {navItems.map(item => (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`nav-item ${currentPath === item.path ? 'active' : ''}`}
          >
            <span className="material-icons">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
        {currentPath === '/admin/dashboard' && (
             <button className="fab">+</button>
        )}
      </footer>
    </div>
  );
};

export default AdminLayout;