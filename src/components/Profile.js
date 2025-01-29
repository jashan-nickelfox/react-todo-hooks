import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Profile.css";
import profileimg from "../images/profileimg.svg";
import arrowimg from "../images/arrowicon.svg";
import starimg from "../images/staricon.svg";
import bagimg from "../images/bagicon.svg";

const Profile = ({ userData, icons }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(userData);
  const location = useLocation();
  const navigate = useNavigate();
  const user = editedUser || location.state?.user;

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

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
  };

  return (
    <>
      {isOpen && (
        <div className="profile-overlay">
          <div className="profile-popup">
            <div className="profile-header">
              <div className="profile1">
                <div className="profile-details">
                  <img
                    src={profileimg}
                    alt="User Avatar"
                    className="profile-avatar"
                  />
                  <div>
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          name="name"
                          className="edit-input"
                          value={user.name || ""}
                          onChange={handleInputChange}
                        />
                        <input
                          type="text"
                          name="role"
                          className="edit-input"
                          value={user.role || ""}
                          onChange={handleInputChange}
                        />
                        <input
                          type="text"
                          name="location"
                          className="edit-input"
                          value={user.location || ""}
                          onChange={handleInputChange}
                        />
                      </>
                    ) : (
                      <>
                        <h1 className="profile-name">
                          {user.name || "User Name"}
                        </h1>
                        <p className="profile-role">
                          {user.role || "Software Engineer"}
                        </p>
                        <p className="profile-location">
                          {user.location || "Noida, UP"}
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <div className="info-section1">
                  <div className="skills1">
                    <h3>Current Role</h3>
                    <img alt="bagimg" src={bagimg} />
                  </div>
                  <div className="skills2">
                    {isEditing ? (
                      <input
                        type="text"
                        name="currentRole"
                        className="edit-input"
                        value={user.currentRole || ""}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <span>{user.currentRole || "Software Engineer"}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-actions">
              {isEditing ? (
                <>
                  <button className="save-button" onClick={handleSaveChanges}>
                    Save
                  </button>
                  <button className="cancel-button" onClick={handleEditToggle}>
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="edit-profile-button"
                  onClick={handleEditToggle}
                >
                  Edit Profile
                </button>
              )}
              <button className="settings-button">Settings</button>
            </div>
            <div className="profile-info">
              <div className="info-section">
                <div className="skills1">
                  <h3>Skills</h3>
                  <img alt="starimg" src={starimg} />
                </div>
                <div className="skills">
                  {isEditing ? (
                    <textarea
                      name="skills"
                      className="edit-input"
                      value={user.skills?.join(", ") || ""}
                      onChange={(e) =>
                        handleInputChange({
                          target: {
                            name: "skills",
                            value: e.target.value
                              .split(",")
                              .map((s) => s.trim()),
                          },
                        })
                      }
                    />
                  ) : user.skills?.length > 0 ? (
                    user.skills.map((skill, index) => (
                      <span key={index}>{skill}</span>
                    ))
                  ) : (
                    ["HTML", "CSS", "Dart", "C++", "UI Design"].map(
                      (skill, index) => <span key={index}>{skill}</span>
                    )
                  )}
                </div>
              </div>
              <div className="quick-actions">
                {user.quickActions?.length > 0
                  ? user.quickActions.map((action, index) => (
                      <div className="quick-action" key={index}>
                        <div className="quick-action5">
                          <div className="quick-action3">
                            <div className="quick-action1">{action.title}</div>
                            <div className="quick-action2">
                              {action.description}
                            </div>
                          </div>
                          <div className="quick-action4">
                            <img
                              alt="arrowimg"
                              src={icons?.arrowIcon || "default-arrow.svg"}
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  : ["Ready for Work", "Share Posts", "Update"].map(
                      (title, index) => (
                        <div className="quick-action" key={index}>
                          <div className="quick-action5">
                            <div className="quick-action3">
                              <div className="quick-action1">{title}</div>
                              <div className="quick-action2">
                                Description for {title.toLowerCase()}.
                              </div>
                            </div>
                            <div className="quick-action4">
                              <img alt="arrowimg" src={arrowimg} />
                            </div>
                          </div>
                        </div>
                      )
                    )}
              </div>
            </div>
            <button className="close-button" onClick={handleClosePopup}>
              &times;
            </button>
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
