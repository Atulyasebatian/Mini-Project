    import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";
import "../../styles/vehicle.css"; // Styles for this page

function VehicleManagementPage() {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleId, setVehicleId] = useState("");
  const [model, setModel] = useState("");
  const [capacity, setCapacity] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch all vehicles
  const fetchVehicles = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/vehicles", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVehicles(res.data);
    } catch (err) {
      setError("Failed to fetch vehicles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!vehicleId || !model || !capacity) {
      setError("All fields are required.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:3000/api/vehicles",
        { vehicleId, model, capacity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setVehicles([res.data, ...vehicles]); // Add new vehicle to the top of the list
      // Clear form fields
      setVehicleId("");
      setModel("");
      setCapacity("");
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to register vehicle.");
    }
  };
  
  // Handle vehicle deletion
  const handleDelete = async (id) => {
    try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3000/api/vehicles/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setVehicles(vehicles.filter(v => v._id !== id));
    } catch (err) {
        setError("Failed to delete vehicle.");
    }
  };

  return (
    <AdminLayout>
      <div className="vehicle-management-page">
        <h2 className="page-title">Vehicle Registration</h2>
        <p className="page-subtitle">Add new vehicles to the fleet.</p>

        <div className="form-card">
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="vehicleId">Vehicle ID / Number</label>
              <input
                type="text"
                id="vehicleId"
                placeholder=""
                value={vehicleId}
                onChange={(e) => setVehicleId(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="model">Vehicle Model</label>
              <input
                type="text"
                id="model"
                placeholder=""
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="capacity">Seating Capacity</label>
              <input
                type="number"
                id="capacity"
                placeholder=""
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
            </div>
            <button type="submit" className="register-btn">
              <span className="material-icons">add_circle</span>
              Register Vehicle
            </button>
          </form>
        </div>

        <h3 className="section-title">Registered Vehicles</h3>
        {loading ? (
            <p>Loading vehicles...</p>
        ) : vehicles.length === 0 ? (
          <div className="empty-state">
            <span className="material-icons empty-icon">directions_bus</span>
            <h4 className="empty-title">No vehicles registered</h4>
            <p className="empty-subtitle">Use the form above to add a vehicle.</p>
          </div>
        ) : (
          <div className="vehicles-list">
            {vehicles.map((v) => (
              <div key={v._id} className="vehicle-card">
                <div className="vehicle-info">
                    <p className="vehicle-model">{v.model}</p>
                    <p className="vehicle-details">ID: {v.vehicleId} | Capacity: {v.capacity}</p>
                </div>
                <button className="delete-btn" onClick={() => handleDelete(v._id)}>
                    <span className="material-icons">delete_outline</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default VehicleManagementPage;