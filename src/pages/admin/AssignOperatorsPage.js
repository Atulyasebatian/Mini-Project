import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";
import "../../styles/assignOperators.css";

function AssignOperatorsPage() {
  // Master lists
  const [allOperators, setAllOperators] = useState([]);
  const [allVehicles, setAllVehicles] = useState([]);
  
  // Current assignments list
  const [assignments, setAssignments] = useState([]);
  
  // Form state
  const [selectedOperator, setSelectedOperator] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  
  // UI state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      
      try {
        const [userRes, vehicleRes, assignmentRes] = await Promise.all([
          axios.get("http://localhost:5000/api/users", { headers }),
          axios.get("http://localhost:5000/api/vehicles", { headers }),
          axios.get("http://localhost:5000/api/assignments", { headers }),
        ]);

        setAllOperators(userRes.data.filter(u => u.role === "Operator"));
        setAllVehicles(vehicleRes.data);
        setAssignments(assignmentRes.data);

      } catch (err) {
        setError("Failed to load data. Please ensure the server is running and you are logged in.");
        console.error("Data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle creating a new assignment
  const handleAssign = async () => {
    setIsSubmitting(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/assignments",
        { operatorId: selectedOperator, vehicleId: selectedVehicle },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAssignments([res.data, ...assignments]);
      setSelectedOperator("");
      setSelectedVehicle("");
    } catch (err) {
      alert("Failed to create assignment. The operator or vehicle may already be in use.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle removing an assignment
  const handleRemove = async (assignmentIdToRemove) => {
    if (window.confirm("Are you sure you want to remove this assignment?")) {
      const token = localStorage.getItem("token");
      try {
        await axios.delete(`http://localhost:5000/api/assignments/${assignmentIdToRemove}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAssignments(assignments.filter(a => a._id !== assignmentIdToRemove));
      } catch (err) {
        alert("Failed to remove assignment.");
      }
    }
  };

  // --- THE FIX IS HERE ---
  // This logic now defensively checks for null values before trying to map over them.
  const availableOperators = useMemo(() => {
    const assignedIds = new Set(
      assignments
        .filter(a => a.operator) // CRITICAL: Only include assignments with a valid operator.
        .map(a => a.operator._id)
    );
    return allOperators.filter(op => !assignedIds.has(op._id));
  }, [allOperators, assignments]);

  const availableVehicles = useMemo(() => {
    const assignedIds = new Set(
      assignments
        .filter(a => a.vehicle) // CRITICAL: Only include assignments with a valid vehicle.
        .map(a => a.vehicle._id)
    );
    return allVehicles.filter(v => !assignedIds.has(v._id));
  }, [allVehicles, assignments]);

  const isFormInvalid = !selectedOperator || !selectedVehicle;

  return (
    <AdminLayout>
      <div className="assign-operators-page">
        <h2 className="page-title">Assign Operators</h2>
        <p className="page-subtitle">Link available operators to vehicles.</p>
        
        {error && <div className="error-banner">{error}</div>}
        
        <div className="form-card">
          <div className="form-group">
            <label>Select Operator</label>
            <select value={selectedOperator} onChange={(e) => setSelectedOperator(e.target.value)} disabled={loading || isSubmitting}>
              <option value="">{loading ? "Loading..." : availableOperators.length > 0 ? "Choose an available operator" : "No operators available"}</option>
              {availableOperators.map(op => <option key={op._id} value={op._id}>{op.fullName}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Select Vehicle</label>
            <select value={selectedVehicle} onChange={(e) => setSelectedVehicle(e.target.value)} disabled={loading || isSubmitting}>
              <option value="">{loading ? "Loading..." : availableVehicles.length > 0 ? "Choose an available vehicle" : "No vehicles available"}</option>
              {availableVehicles.map(v => <option key={v._id} value={v._id}>{v.model} ({v.vehicleId})</option>)}
            </select>
          </div>

          <button className="assign-btn" onClick={handleAssign} disabled={isFormInvalid || isSubmitting}>
            {isSubmitting ? "Assigning..." : "Assign Operator"}
          </button>
        </div>

        <h3 className="section-title">Current Assignments</h3>
        {loading ? <p className="loading-text">Loading assignments...</p> : assignments.length === 0 ? (
          <div className="empty-state">
            <span className="material-icons empty-icon">no_accounts</span>
            <h4 className="empty-title">No Operators Assigned</h4>
            <p className="empty-subtitle">Use the form above to link an operator to a vehicle.</p>
          </div>
        ) : (
          <div className="assignments-list">
            {/* --- AND THE FIX IS HERE --- */}
            {/* This filter prevents the page from crashing if an assignment is "broken" */}
            {assignments
              .filter(a => a.operator && a.vehicle)
              .map(a => (
              <div key={a._id} className="assignment-card">
                <div className="assignment-info">
                  <p className="operator-name">{a.operator.fullName}</p>
                  <p className="fare-name">Assigned to: {a.vehicle.model}</p>
                </div>
                <button className="remove-btn" onClick={() => handleRemove(a._id)}>
                  <span className="material-icons">close</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AssignOperatorsPage;