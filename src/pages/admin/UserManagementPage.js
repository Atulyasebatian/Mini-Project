import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout"; // Import the layout
import "../../styles/UserManagement.css"; // Styles are still needed

function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch users from backend when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication failed. Please log in again.");
          setLoading(false);
          return;
        }

        const res = await axios.get("http://localhost:3000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError("Could not load user data. Please try refreshing the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // API call to update a user's status
  const updateStatus = (id, status) => {
    const token = localStorage.getItem("token");
    axios
      .put(`http://localhost:3000/api/users/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // Update the user in the local state to reflect the change immediately
        setUsers(users.map((user) => (user._id === id ? res.data : user)));
      })
      .catch((err) => console.error("Failed to update user status:", err));
  };

  // API call to delete a user
  const deleteUser = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:3000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        // Remove the user from the local state
        setUsers(users.filter((user) => user._id !== id));
      })
      .catch((err) => console.error("Failed to delete user:", err));
  };

  // Filter users based on the search term
  const filteredUsers = users.filter(user => 
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="um-header">
        <h2>User Management</h2>
      </div>

      {/* Search Input */}
      <div className="um-search">
        <span className="material-icons">search</span>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Conditional Rendering */}
      {loading ? (
        <p className="empty-message">Loading users...</p>
      ) : error ? (
        <p className="empty-message error">{error}</p>
      ) : (
        <div className="um-cards">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div className="um-card" key={user._id}>
                <div className="um-card-top">
                  <div className="user-info">
                    <p className="username">{user.fullName}</p>
                    <small className="role">{user.role}</small>
                  </div>
                  <span
                    className={`um-badge ${
                      user.status === "Approved" ? "success" : "pending"
                    }`}
                  >
                    {user.status || "Pending"}
                  </span>
                </div>

                <div className="um-card-actions">
                  {user.status === "Pending" && user.role !== "Admin" ? (
                    <>
                      <button
                        className="btn approve"
                        onClick={() => updateStatus(user._id, "Approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="btn reject"
                        onClick={() => deleteUser(user._id)}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="btn edit">
                        <span className="material-icons">edit</span>
                      </button>
                      <button
                        className="btn delete"
                        onClick={() => deleteUser(user._id)}
                      >
                        <span className="material-icons">delete</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="empty-message">No users found.</p>
          )}
        </div>
      )}
    </AdminLayout>
  );
}

export default UserManagementPage;