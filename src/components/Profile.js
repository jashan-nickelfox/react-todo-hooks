import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  if (!user) {
    return (
      <div className="profile-container">
        <p>No user data available. Please log in.</p>
      </div>
    );
  }

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="profile-container">
      <h1>Welcome, {user.name || "User"}!</h1>
      <p>Email: {user.email}</p>
      <p>User ID: {user.uid}</p>
      <button className="logout-button" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default Profile;
