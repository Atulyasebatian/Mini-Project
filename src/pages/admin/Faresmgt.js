import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";
// FIX 1: Corrected the CSS import to match the file we created
import "../../styles/fares.css"; 

// Helper to format date to YYYY-MM-DD for the input
const getTodayDateString = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

// Component is named Fares to match the import in your router
function Faresmgt() {
  const [collections, setCollections] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getTodayDateString());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCollections = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        // FIX 2: Changed the port from 3000 to 5000 to match your server.js
        const res = await axios.get(`http://localhost:5000/api/collections`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { date: selectedDate }
        });
        setCollections(res.data);
      } catch (err) {
        setError("Failed to fetch collections for the selected date.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, [selectedDate]); // Refetch when the date changes

  const totalRevenue = collections.reduce((sum, item) => sum + item.amount, 0);

  return (
    <AdminLayout>
      <div className="fare-management-page">
        <h2 className="page-title">Fare Collections</h2>
        <p className="page-subtitle">Review daily revenue from each vehicle.</p>

        <div className="summary-card">
            <div className="form-group">
                <label htmlFor="date-picker">Select Date</label>
                <input 
                    type="date" 
                    id="date-picker"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
            </div>
            <div className="revenue-total">
                <span className="total-label">Total Revenue</span>
                <span className="total-amount">₹{totalRevenue.toLocaleString('en-IN')}</span>
            </div>
        </div>

        <h3 className="section-title">Collections for {selectedDate}</h3>
        {loading ? (
          <p className="loading-message">Loading collections...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : collections.length === 0 ? (
          <div className="empty-state">
            <span className="material-icons empty-icon">sentiment_dissatisfied</span>
            <h4 className="empty-title">No Collections Found</h4>
            <p className="empty-subtitle">There is no revenue data for the selected date.</p>
          </div>
        ) : (
          <div className="collections-list">
            {collections.map((collection) => (
              <div key={collection._id} className="collection-card">
                <div className="vehicle-icon-wrapper">
                  <span className="material-icons">directions_bus</span>
                </div>
                <div className="collection-info">
                  <p className="vehicle-model">{collection.vehicle?.model || "N/A"}</p>
                  <p className="vehicle-details">
                    ID: {collection.vehicle?.vehicleId || "N/A"} | Operator: {collection.operator?.fullName || "N/A"}
                  </p>
                </div>
                <p className="collection-amount">₹{collection.amount.toLocaleString('en-IN')}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default Faresmgt;