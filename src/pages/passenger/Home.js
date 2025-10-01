import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import QrScanner from '../../components/QrScanner'; 
import '../../styles/home.css'; 

// Reusable Bottom Navigation Component
const PassengerBottomNav = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="passenger-bottom-nav">
      <Link to="/home" className={`nav-item ${isActive('/home') ? 'active' : ''}`}>
        <span className="material-icons">home</span><span className="nav-label">Home</span>
      </Link>
      <Link to="/timings" className="nav-item"><span className="material-icons">schedule</span><span className="nav-label">Timings</span></Link>
      <Link to="/payment" className="nav-item"><span className="material-icons">payment</span><span className="nav-label">Payment</span></Link>
      <Link to="#" className="nav-item"><span className="material-icons">history</span><span className="nav-label">History</span></Link>
      <Link to="#" className="nav-item"><span className="material-icons">report</span><span className="nav-label">Report</span></Link>
    </nav>
  );
};

function HomePage() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [fareAmount, setFareAmount] = useState(null);
  const [loadingFare, setLoadingFare] = useState(false);
  const [recentTrips, setRecentTrips] = useState([]);
  
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    const fetchRecentTrips = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/trips/my-trips", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRecentTrips(res.data);
      } catch (err) {
        console.error("Failed to fetch recent trips.", err);
      }
    };
    fetchRecentTrips();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleGetFare = async () => {
    if (!destination) {
      alert("Please enter a destination.");
      return;
    }
    setLoadingFare(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/trips/calculate-fare",
        { destination },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFareAmount(res.data.amount);
    } catch (err) {
      alert("Could not calculate fare. Please try again.");
    } finally {
      setLoadingFare(false);
    }
  };
  
  const handleScanSuccess = (decodedText) => {
    setShowScanner(false);
    setDestination(decodedText);
  };

  const handleScanError = (errorMessage) => {
    // console.error("QR Scan Error:", errorMessage);
  };

  return (
    <div className="passenger-home">
      <header className="passenger-header">
        <div className="brand">
          <span className="material-icons">directions_bus</span>
          <h1>TransitGo</h1>
        </div>
        <div className="header-actions">
          <span className="material-icons">notifications</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <main className="passenger-main">
        <section className="card qr-card" onClick={() => setShowScanner(true)}>
          <img src="https://i.imgur.com/g3d2rqN.png" alt="QR Code" className="qr-image" />
          <h2>Scan QR</h2>
          <p>Point your camera at the QR code on the bus destination.</p>
        </section>

        <section className="card fare-card">
          <h2>Where do you want to go?</h2>
          <div className="input-group">
            <span className="material-icons">my_location</span>
            <input type="text" value="From: Current Location" readOnly />
          </div>
          <div className="input-group">
            <span className="material-icons">location_on</span>
            <input 
              type="text" 
              placeholder="To: Enter destination" 
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <button className="btn-primary" onClick={handleGetFare} disabled={loadingFare}>
            <span className="material-icons">receipt_long</span>
            {loadingFare ? "Calculating..." : "Get Fare Amount"}
          </button>
          <div className="amount-display">
            <span className="rupee-symbol">₹</span>
            <span>Amount</span>
            <span className="amount-value">
              {fareAmount !== null ? fareAmount.toFixed(2) : "0.00"}
            </span>
          </div>
        </section>

        <section className="recent-trips">
          <h2>Recent Trips</h2>
          {recentTrips.length > 0 ? (
            recentTrips.map(trip => (
              <div key={trip._id} className="card trip-item">
                <div className="trip-icon"><span className="material-icons">directions_bus</span></div>
                <div className="trip-details">
                  <p className="trip-route">{trip.origin} to {trip.destination}</p>
                  <p className="trip-date">{new Date(trip.tripDate).toLocaleDateString()}</p>
                </div>
                <div className="trip-fare">₹{trip.fare}</div>
              </div>
            ))
          ) : (
            <p className="no-trips">No recent trips to show.</p>
          )}
        </section>
      </main>

      <PassengerBottomNav />

      <Modal show={showScanner} onHide={() => setShowScanner(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Scan Bus QR Code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showScanner && (
            <QrScanner 
              onScanSuccess={handleScanSuccess}
              onScanError={handleScanError}
            />
          )}
          <p className="text-center mt-3">Point your camera at the QR code</p>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default HomePage;