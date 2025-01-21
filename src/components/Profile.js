import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(true);
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

  const handleClosePopup = () => {
    setIsOpen(false);
    navigate("/");
  };

  const handleLogout = () => {
    setIsOpen(false);
    navigate("/");
  };

  return (
    <>
      {isOpen && (
        <div className="profile-overlay">
          <div className="profile-popup">
            <button className="close-button" onClick={handleClosePopup}>
              &times;
            </button>
            <h1>Welcome, {user.name || "User"}!</h1>
            <p>Email: {user.email}</p>
            <p>User ID: {user.uid}</p>
            <button className="logout-button" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
