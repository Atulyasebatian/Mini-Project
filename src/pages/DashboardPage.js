import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';

function OperatorDashboardPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  
  // Placeholder data - would be fetched from API
  const stats = {
    totalBuses: 48,
    activeRoutes: 12,
    todaysBookings: 156,
    totalUsers: 2450
  };

  const recentBookings = [
    { id: 'TKT-001', user: 'John Doe', route: 'NY -> BOS', date: '2023-11-15', status: 'Confirmed' },
    { id: 'TKT-002', user: 'Jane Smith', route: 'LA -> SF', date: '2023-11-15', status: 'Confirmed' },
    { id: 'TKT-003', user: 'Peter Jones', route: 'CHI -> DET', date: '2023-11-14', status: 'Completed' },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <aside className="dashboard-sidebar">
        <h1 className="sidebar-brand">TransitGo Admin</h1>
        <nav className="sidebar-nav">
          <ul>
            <li className="active"><a href="#"><span className="material-icons">dashboard</span> Dashboard</a></li>
            <li><a href="#"><span className="material-icons">directions_bus</span> Bus Management</a></li>
            <li><a href="#"><span className="material-icons">map</span> Route Management</a></li>
            <li><a href="#"><span className="material-icons">event_seat</span> Bookings</a></li>
            <li><a href="#"><span className="material-icons">group</span> User Management</a></li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn-dash">
            <span className="material-icons">logout</span> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main-content">
        <header className="main-header">
          <h2>Dashboard Overview</h2>
        </header>

        {/* Stats Cards */}
        <section className="stats-cards">
          <div className="stat-card">
            <div className="card-icon blue"><span className="material-icons">directions_bus</span></div>
            <div className="card-info">
              <h3>{stats.totalBuses}</h3>
              <p>Total Buses</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="card-icon green"><span className="material-icons">map</span></div>
            <div className="card-info">
              <h3>{stats.activeRoutes}</h3>
              <p>Active Routes</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="card-icon orange"><span className="material-icons">event_seat</span></div>
            <div className="card-info">
              <h3>{stats.todaysBookings}</h3>
              <p>Today's Bookings</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="card-icon purple"><span className="material-icons">group</span></div>
            <div className="card-info">
              <h3>{stats.totalUsers}</h3>
              <p>Registered Users</p>
            </div>
          </div>
        </section>

        {/* Recent Bookings Table */}
        <section className="data-table-section">
          <h3>Recent Bookings</h3>
          <table>
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>User</th>
                <th>Route</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map(booking => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.user}</td>
                  <td>{booking.route}</td>
                  <td>{booking.date}</td>
                  <td><span className={`status ${booking.status.toLowerCase()}`}>{booking.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default OperatorDashboardPage;