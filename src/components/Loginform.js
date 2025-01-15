import React, { useState } from "react";
import loginicon from "../images/login.svg";
import "./loginform.css";
import {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setDoc,
  doc,
  getDoc,
} from "../firebase";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleForm = () => {
    setIsOpen(!isOpen);
    setIsSignup(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), { email, password });

      alert("User signed up successfully!");
      setIsOpen(false);
    } catch (error) {
      alert("Error signing up: " + error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        alert("Logged in successfully!");
        setIsOpen(false);
      } else {
        alert("User not found!");
      }
    } catch (error) {
      alert("Error logging in: " + error.message);
    }
  };

  return (
    <div>
      <img
        src={loginicon}
        alt="Login Icon"
        className="login-icon"
        onClick={toggleForm}
      />
      {isOpen && (
        <div className="overlay">
          <div className="form-container">
            <button className="close-button" onClick={toggleForm}>
              &times;
            </button>
            <h2>{isSignup ? "SignUp Here" : "Login Here"}</h2>
            <form onSubmit={isSignup ? handleSignUp : handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="action-button">
                {isSignup ? "Sign Up" : "Log In"}
              </button>
            </form>
            <p className="auth-toggle">
              {isSignup
                ? "Already have an account? "
                : "Don't have an account? "}
              <span
                onClick={() => setIsSignup(!isSignup)}
                className="auth-toggle-link"
              >
                {isSignup ? "Log In" : "Sign Up"}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
