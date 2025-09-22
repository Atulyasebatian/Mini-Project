import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../layouts/AdminLayout';
import '../../styles/adminDashboard.css';

const AdminDashboardPage = () => {
  // Data for the statistics cards, aligned with the CSS classes
  const stats = [
    { title: "Total Users", value: 2450, icon: "group", color: "blue" },
    { title: "Total Vehicles", value: 48, icon: "directions_bus", color: "green" },
    { title: "Total Operators", value: 12, icon: "engineering", color: "yellow" },
    { title: "Fares Today", value: "₹1,560", icon: "receipt_long", color: "pink" },
  ];

  return (
    <AdminLayout>
      <div className="dashboard-page">
        <h2 className="page-title">Dashboard</h2>

        {/* Stats Cards Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div>
                <p className="stat-label">{stat.title}</p>
                <h3 className="stat-value">{stat.value}</h3>
              </div>
              <div className={`stat-icon-wrapper ${stat.color}`}>
                <span className="material-icons">{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity Section */}
        <div className="recent-activity">
          <div className="activity-header">
            <h3 className="section-title">Recent Activity</h3>
            <Link to="#" className="view-all-link">View All</Link>
          </div>
          
          {/* Placeholder for when no activities are available */}
          <div className="empty-state" style={{marginTop: '1rem', padding: '2rem'}}>
              <span className="material-icons empty-icon" style={{fontSize: '48px'}}>history_toggle_off</span>
              <p className="empty-title" style={{color: '#1c1c1e', fontSize: '1.1rem', fontWeight: '600'}}>No recent activities</p>
              <p className="empty-subtitle">New user registrations and bookings will appear here.</p>
          </div>
          
          {/* 
            When you have data, you would map over it like this:
            <div className="activity-item">
              ...
            </div> 
          */}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;