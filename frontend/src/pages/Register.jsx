import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
      padding: "1rem",
    },
    card: {
      width: "100%",
      maxWidth: "420px",
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
      overflow: "hidden",
    },
    header: {
      padding: "1.75rem",
      background: "linear-gradient(90deg, #059669 0%, #10b981 100%)",
      color: "white",
    },
    formContainer: {
      padding: "1.75rem",
    },
    error: {
      marginBottom: "1.25rem",
      padding: "0.75rem",
      backgroundColor: "#fef2f2",
      color: "#dc2626",
      borderRadius: "8px",
      fontSize: "0.875rem",
    },
    inputContainer: {
      marginBottom: "1.25rem",
    },
    label: {
      display: "block",
      marginBottom: "0.5rem",
      fontSize: "0.875rem",
      fontWeight: "500",
      color: "#374151",
    },
    input: {
      width: "100%",
      padding: "0.75rem",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      fontSize: "0.875rem",
      outline: "none",
      transition: "all 0.2s",
    },
    inputFocus: {
      borderColor: "#059669",
      boxShadow: "0 0 0 3px rgba(5, 150, 105, 0.15)",
    },
    button: {
      width: "100%",
      padding: "0.75rem",
      backgroundColor: "#059669",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "0.875rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
   
    buttonDisabled: {
      opacity: "0.7",
      cursor: "not-allowed",
    },
    loginText: {
      marginTop: "1.5rem",
      textAlign: "center",
      fontSize: "0.875rem",
      color: "#6b7280",
    },
    loginLink: {
      color: "#059669",
      fontWeight: "500",
      textDecoration: "none",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "0.25rem" }}>Create Account</h1>
          <p style={{ fontSize: "0.875rem", color: "#d1fae5" }}>Join us to get started</p>
        </div>
        
        <div style={styles.formContainer}>
          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleRegister}>
            <div style={styles.inputContainer}>
              <label htmlFor="username" style={styles.label}>Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
               
                required
              />
            </div>
            
            <div style={styles.inputContainer}>
              <label htmlFor="password" style={styles.label}>Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
               
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              style={isLoading ? {...styles.button, ...styles.buttonDisabled} : styles.button}
             
            >
              {isLoading ? "Creating account..." : "Register"}
            </button>
          </form>
          
          <p style={styles.loginText}>
            Already have an account?{" "}
            <a href="/login" style={styles.loginLink}>Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;