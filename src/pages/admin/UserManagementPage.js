import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import '../../styles/userManagement.css';

const UserManagementPage = () => {
  // Placeholder data - replace with API calls
  const users = [
    { name: 'user123', role: 'Operator', status: 'Approved' },
    { name: 'passenger456', role: 'Passenger', status: 'Approved' },
    { name: 'new_operator', role: 'Operator', status: 'Pending' },
    { name: 'pending_user', role: 'Passenger', status: 'Pending' },
    { name: 'existing_user', role: 'Passenger', status: 'Approved' },
  ];

  return (
    <AdminLayout>
      <div className="user-management-page">
        <div className="page-header">
          <h2 className="page-title">User Management</h2>
          <button className="add-user-btn">
            <span className="material-icons">add</span> Add User
          </button>
        </div>
        <div className="search-bar">
          <span className="material-icons">search</span>
          <input type="text" placeholder="Search..." />
        </div>
        <div className="user-list">
          {users.map((user, index) => (
            <div key={index} className="user-card">
              <div className="user-info">
                <p className="user-name">{user.name}</p>
                <p className="user-role">{user.role}</p>
              </div>
              <div className="user-actions">
                <span className={`status-badge ${user.status.toLowerCase()}`}>
                  {user.status}
                </span>
                {user.status === 'Approved' && (
                  <>
                    <button className="icon-btn edit-btn">
                      <span className="material-icons">edit</span>
                    </button>
                    <button className="icon-btn delete-btn">
                      <span className="material-icons">delete</span>
                    </button>
                  </>
                )}
                {user.status === 'Pending' && (
                  <div className="approval-actions">
                    <button className="approve-btn">Approve</button>
                    <button className="reject-btn">Reject</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserManagementPage;