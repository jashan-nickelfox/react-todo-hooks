import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Profile.css";
import profileimg from "../images/profileimg.svg";
import arrowimg from "../images/arrowicon.svg";
import starimg from "../images/staricon.svg";
import bagimg from "../images/bagicon.svg";

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
            <div className="profile-header">
              <div className="profile-background" />
              <div className="profile-details">
                <img
                  src={profileimg}
                  alt="User Avatar"
                  className="profile-avatar"
                />
                <div>
                  <h1 className="profile-name">{user.name || "User Name"}</h1>
                  <p className="profile-role">Software Engineer</p>
                  <p className="profile-location">Noida, UP</p>
                </div>
              </div>
            </div>
            <div className="profile-actions">
              <button className="edit-profile-button">Edit Profile</button>
              <button className="settings-button">Settings</button>
            </div>
            <div className="profile-info">
              <div className="info-section">
                <div className="skills1">
                  <h3>Current Role</h3>
                  <img alt="bagimg" src={bagimg} />
                </div>
                <div className="skills2">
                  <span>Software Engineer</span>
                </div>
              </div>
              <div className="info-section">
                <div className="skills1">
                  <h3>Skills</h3>
                  <img alt="starimg" src={starimg} />
                </div>
                <div className="skills">
                  <span>HTML</span>
                  <span>CSS</span>
                  <span>Dart</span>
                  <span>C++</span>
                  <span>UI Design</span>
                </div>
              </div>
              <div className="quick-actions">
                <div className="quick-action">
                  <div className="quick-action5">
                    <div className="quick-action3">
                      <div className="quick-action1">Ready for Work</div>
                      <div className="quick-action2">
                        Show recruiters that you're ready for work.
                      </div>
                    </div>
                    <div className="quick-action4">
                      <img alt="arrowimg" src={arrowimg} />
                    </div>
                  </div>
                </div>
                <div className="quick-action">
                  <div className="quick-action5">
                    <div className="quick-action3">
                      <div className="quick-action1">Share Posts</div>
                      <div className="quick-action2">
                        Share latest news to get connected with others.
                      </div>
                    </div>
                    <div className="quick-action4">
                      <img alt="arrowimg" src={arrowimg} />
                    </div>
                  </div>
                </div>
                <div className="quick-action">
                  <div className="quick-action5">
                    <div className="quick-action3">
                      <div className="quick-action1">Update</div>
                      <div className="quick-action2">
                        Keep your profile updated so recruiters know you better.
                      </div>
                    </div>
                    <div className="quick-action4">
                      <img alt="arrowimg" src={arrowimg} />
                    </div>
                  </div>
                </div>
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
