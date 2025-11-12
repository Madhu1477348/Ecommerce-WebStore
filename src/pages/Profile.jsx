import React from "react";

import { useAuth } from "../contexts/AuthContext";

function Profile() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="text-center mt-5">
        <h3>No User Data Found </h3>
      </div>
    );
  }
  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow-sm">
        <div className="card-body text-center">
          <h3 className="mb-3">👤 Profile</h3>

          <div className="text-start mb-3">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>

          <button className="btn btn-outline-danger w-100" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
