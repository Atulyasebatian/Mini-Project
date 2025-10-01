import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import '../../styles/timings.css';

// Reusable Header Component
const PassengerHeader = () => {
  const navigate = useNavigate();
  return (
    <header className="passenger-header">
      <button className="menu-btn"><span className="material-icons">menu</span></button>
      <div className="brand-center"><h1>TransitGo</h1></div>
      <div className="header-actions">
        <span className="material-icons">notifications</span>
        <img src="https://i.pravatar.cc/150?img=1" alt="User" className="profile-pic" />
      </div>
    </header>
  );
};

// Reusable Bottom Navigation Component
const PassengerBottomNav = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="passenger-bottom-nav">
      <Link to="/Home" className={`nav-item ${isActive('/Home') ? 'active' : ''}`}>
        <span className="material-icons">home</span><span className="nav-label">Home</span>
      </Link>
      <Link to="/Timings" className={`nav-item ${isActive('/Timings') ? 'active' : ''}`}>
        <span className="material-icons">schedule</span><span className="nav-label">Timing</span>
      </Link>
      <Link to="/Payment" className="nav-item"><span className="material-icons">payment</span><span className="nav-label">Payment</span></Link>
      <Link to="#" className="nav-item"><span className="material-icons">history</span><span className="nav-label">History</span></Link>
      <Link to="#" className="nav-item"><span className="material-icons">report</span><span className="nav-label">Report</span></Link>
    </nav>
  );
};

function TimingsPage() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Use navigate for redirection

  useEffect(() => {
    const fetchRoutes = async () => {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem("token");
      // NEW: Check for a token first. If it doesn't exist, redirect to login.
      if (!token) {
        navigate('/'); // Redirect to the login page
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/fares", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRoutes(res.data);
      } catch (err) {
        // NEW: Provide a more specific error if the token is invalid (unauthorized)
        if (err.response && err.response.status === 401) {
          setError('Your session has expired. Please log in again.');
          localStorage.removeItem('token'); // Clear the invalid token
          setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds
        } else {
          setError('Failed to load bus schedules. Please try again later.');
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoutes();
  }, [navigate]); // Add navigate to the dependency array

  // Filtered routes are now derived directly in the return statement for simplicity
  const filteredRoutes = routes.filter(route =>
    route.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.endPoint.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Simulate departure times and statuses for a dynamic UI
  const getDepartureDetails = (index) => {
    const baseTime = 8 * 60; // 8:00 AM in minutes
    const newTime = new Date();
    newTime.setHours(0, baseTime + index * 15, 0, 0);
    const statuses = ['On Time', 'Delayed', 'On Time', 'Scheduled'];
    return {
      time: newTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: statuses[index % statuses.length],
    };
  };

  return (
    <div className="timings-page">
      <PassengerHeader />
      <main className="timings-main">
        <section className="hero-section">
          <h2>Bus Schedules</h2>
          <p>Find real-time bus schedules and route information.</p>
          <div className="search-bar">
            <span className="material-icons">search</span>
            <input 
              type="text" 
              placeholder="Search for a route"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </section>

        <section className="upcoming-buses">
          <h3>Upcoming Buses</h3>
          {loading ? (
            <div className="status-indicator"><Spinner animation="border" variant="primary" /></div>
          ) : error ? (
            <div className="status-indicator error">{error}</div>
          ) : (
            <div className="bus-list">
              {filteredRoutes.length > 0 ? (
                filteredRoutes.map((route, index) => {
                  const { time, status } = getDepartureDetails(index);
                  return (
                    <div key={route._id} className="bus-card">
                      <div className="bus-info">
                        <h4>{route.routeName}</h4>
                        <p>To: <strong>{route.endPoint}</strong></p>
                        <span>Departs at: {time}</span>
                      </div>
                      <div className={`status-badge ${status.toLowerCase().replace(' ', '-')}`}>{status}</div>
                    </div>
                  );
                })
              ) : (
                <p className="status-indicator">No routes found matching your search.</p>
              )}
            </div>
          )}
        </section>
      </main>
      <PassengerBottomNav />
    </div>
  );
}

export default TimingsPage;