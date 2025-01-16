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
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
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

      await setDoc(doc(db, "users", user.uid), { email });

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

  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: user.displayName,
      });

      alert("Signed up with Google successfully!");
      setIsOpen(false);
    } catch (error) {
      alert("Error signing up with Google: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        alert("Logged in with Google successfully!");
        setIsOpen(false);
      } else {
        alert("User doesn't exist. Please sign up first.");
      }
    } catch (error) {
      alert("Error logging in with Google: " + error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email to reset the password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent. Please check your inbox.");
    } catch (error) {
      alert("Error sending password reset email: " + error.message);
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
            {isSignup && (
              <div className="additional-options">
                <button
                  type="button"
                  className="google-button"
                  onClick={handleGoogleSignUp}
                >
                  Sign up with Google
                </button>
              </div>
            )}
            {!isSignup && (
              <button
                type="button"
                className="forgot-password-button"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </button>
            )}
            {!isSignup && (
              <div className="login-options">
                <p className="oroption">--OR Continue With--</p>
                <button
                  type="button"
                  className="google-button"
                  onClick={handleGoogleLogin}
                >
                  Login with Google
                </button>
              </div>
            )}
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
