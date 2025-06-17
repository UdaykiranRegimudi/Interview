import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Main container styles
  const containerStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
  };

  // Card styles
  const cardStyle = {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  };

  // Header styles
  const headerStyle = {
    padding: "1.5rem",
    background: "linear-gradient(90deg, #2563eb 0%, #4f46e5 100%)",
    color: "white",
  };

  // Form container styles
  const formContainerStyle = {
    padding: "1.5rem",
  };

  // Error message styles
  const errorStyle = {
    marginBottom: "1rem",
    padding: "0.75rem",
    backgroundColor: "#fef2f2",
    color: "#dc2626",
    borderRadius: "8px",
    fontSize: "0.875rem",
  };

  // Input container styles
  const inputContainerStyle = {
    marginBottom: "1rem",
  };

  // Label styles
  const labelStyle = {
    display: "block",
    marginBottom: "0.5rem",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#374151",
  };

  // Input styles
  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "0.875rem",
    outline: "none",
    transition: "all 0.2s",
  };

  const inputFocusStyle = {
    ...inputStyle,
    borderColor: "#3b82f6",
    boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.2)",
  };

  // Checkbox container styles
  const checkboxContainerStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
  };

  // Checkbox styles
  const checkboxStyle = {
    width: "1rem",
    height: "1rem",
    marginRight: "0.5rem",
    accentColor: "#2563eb",
  };

  // Forgot password link styles
  const forgotPasswordStyle = {
    fontSize: "0.875rem",
    color: "#2563eb",
    textDecoration: "none",
  };

  // Button styles
  const buttonStyle = {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "0.875rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s",
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: "#1d4ed8",
  };

  const buttonDisabledStyle = {
    ...buttonStyle,
    opacity: "0.75",
    cursor: "not-allowed",
  };

  // Divider styles
  const dividerContainerStyle = {
    position: "relative",
    margin: "1.5rem 0",
  };

  const dividerLineStyle = {
    position: "absolute",
    top: "50%",
    left: "0",
    right: "0",
    height: "1px",
    backgroundColor: "#d1d5db",
  };

  const dividerTextStyle = {
    position: "relative",
    display: "inline-block",
    padding: "0 0.5rem",
    backgroundColor: "white",
    color: "#6b7280",
    fontSize: "0.875rem",
  };

  // Sign up button styles
  const signUpButtonStyle = {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "white",
    color: "#374151",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "0.875rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s",
  };

  const signUpButtonHoverStyle = {
    ...signUpButtonStyle,
    backgroundColor: "#f9fafb",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "0.25rem" }}>Welcome back</h1>
          <p style={{ fontSize: "0.875rem", color: "#bfdbfe" }}>Sign in to your account</p>
        </div>
        
        <div style={formContainerStyle}>
          {error && (
            <div style={errorStyle}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin} style={{ marginBottom: "1.5rem" }}>
            <div style={inputContainerStyle}>
              <label htmlFor="username" style={labelStyle}>Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={inputStyle}
            
                required
              />
            </div>
            
            <div style={inputContainerStyle}>
              <label htmlFor="password" style={labelStyle}>Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
            
                required
              />
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <div style={checkboxContainerStyle}>
                <input
                  id="remember-me"
                  type="checkbox"
                  style={checkboxStyle}
                />
                <label htmlFor="remember-me" style={{ fontSize: "0.875rem", color: "#374151" }}>Remember me</label>
              </div>
              
              <a href="/forgot-password" style={forgotPasswordStyle}>Forgot password?</a>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              style={isLoading ? buttonDisabledStyle : buttonStyle}
           
            >
              {isLoading ? (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg style={{ animation: "spin 1s linear infinite", marginRight: "0.5rem" }} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="4"></circle>
                    <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="#ffffff" fillOpacity="0.75"></path>
                  </svg>
                  Signing in...
                </span>
              ) : 'Sign in'}
            </button>
          </form>
          
          <div>
            <div style={dividerContainerStyle}>
              <div style={dividerLineStyle}></div>
              <div style={{ textAlign: "center" }}>
                <span style={dividerTextStyle}>Don't have an account?</span>
              </div>
            </div>
            
            <div style={{ marginTop: "1rem" }}>
              <a
                href="/register"
                style={signUpButtonStyle}
                
              >
                Create new account
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;