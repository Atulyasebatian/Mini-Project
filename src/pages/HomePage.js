import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

function HomePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  // Placeholder data - in a real app, you'd fetch this from your API
  const upcomingTrips = [
    { id: 1, from: 'New York', to: 'Boston', date: '2023-11-15', time: '10:00 AM', seat: '14A' },
    { id: 2, from: 'Boston', to: 'New York', date: '2023-11-18', time: '02:30 PM', seat: '8B' },
  ];

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="brand-logo">TransitGo</h1>
        <div className="user-menu">
          <span>Welcome, Passenger!</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <main className="home-main">
        {/* Search Section */}
        <section className="card search-card">
          <h2>Find a Bus</h2>
          <p>Search for your next destination.</p>
          <form className="search-form">
            <div className="form-group">
              <label htmlFor="from">From</label>
              <input type="text" id="from" placeholder="Enter origin city" />
            </div>
            <div className="form-group">
              <label htmlFor="to">To</label>
              <input type="text" id="to" placeholder="Enter destination city" />
            </div>
            <button type="submit" className="btn-search">Search Buses</button>
          </form>
        </section>

        {/* Upcoming Trips Section */}
        <section className="trips-section">
          <h2>My Upcoming Trips</h2>
          {upcomingTrips.length > 0 ? (
            <div className="trips-list">
              {upcomingTrips.map(trip => (
                <div key={trip.id} className="card trip-card">
                  <div className="trip-details">
                    <h3>{trip.from} to {trip.to}</h3>
                    <p><strong>Date:</strong> {trip.date} at {trip.time}</p>
                    <p><strong>Seat:</strong> {trip.seat}</p>
                  </div>
                  <button className="btn-view-ticket">View Ticket</button>
                </div>
              ))}
            </div>
          ) : (
            <div className="card no-trips-card">
              <p>You have no upcoming trips.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default HomePage;