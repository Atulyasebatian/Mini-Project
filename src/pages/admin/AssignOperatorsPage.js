import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import '../../styles/assignOperators.css';

const AssignOperatorsPage = () => {
    // Placeholder state - replace with API calls
    const [assignments, setAssignments] = useState([]);

    return (
        <AdminLayout>
            <div className="assign-operators-page">
                <h2 className="page-title">Assign Operators</h2>
                <p className="page-subtitle">Remove all current operator assignments and reset their fares.</p>
                
                <div className="form-card">
                    <div className="form-group">
                        <label>Select Operator</label>
                        <select>
                            <option>Choose an operator</option>
                            <option>John Doe (Operator)</option>
                            <option>Jane Smith (Operator)</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Select Fare</label>
                        <select>
                            <option>Choose a fare</option>
                            <option>Standard Fare - $5.00</option>
                            <option>Peak Hour Fare - $7.50</option>
                        </select>
                    </div>
                    <button className="assign-btn">
                        <span className="material-icons">add</span> Assign Operator
                    </button>
                </div>

                <h3 className="section-title">Current Assignments</h3>

                {assignments.length === 0 ? (
                    <div className="empty-state">
                        <span className="material-icons empty-icon">group_off</span>
                        <p className="empty-title">No operators assigned</p>
                        <p className="empty-subtitle">Assign operators using the form above to see them here.</p>
                    </div>
                ) : (
                    <div className="assignments-list">
                        {/* Map over assignments here when data exists */}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default AssignOperatorsPage;