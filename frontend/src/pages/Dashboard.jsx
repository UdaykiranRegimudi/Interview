import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError("Failed to fetch tasks");
    } finally {
      setIsLoading(false);
    }
  };

  const createOrUpdateTask = async () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      const method = editingTaskId ? "PUT" : "POST";
      const url = editingTaskId
        ? `http://localhost:5000/api/tasks/${editingTaskId}`
        : "http://localhost:5000/api/tasks";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Operation failed");
      }

      setTitle("");
      setDescription("");
      setEditingTaskId(null);
      fetchTasks();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (id) => {
    try {
      setIsLoading(true);
      await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      setError("Failed to delete task");
    } finally {
      setIsLoading(false);
    }
  };

  const editTask = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setEditingTaskId(task._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setTitle("");
    setDescription("");
    setEditingTaskId(null);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const filteredTasks = filter
    ? tasks.filter((task) =>
        task.title.toLowerCase().includes(filter.toLowerCase())
      )
    : tasks;

  useEffect(() => {
    fetchTasks();
  }, []);

  const styles = {
    container: {
      padding: "2rem",
      backgroundColor: "#f8fafc",
      minHeight: "100vh",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "2rem",
    },
    heading: {
      fontSize: "1.875rem",
      fontWeight: "700",
      color: "#1e293b",
    },
    logoutButton: {
      backgroundColor: "#ef4444",
      color: "white",
      padding: "0.5rem 1rem",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "1rem",
    },
    th: {
      textAlign: "left",
      padding: "0.75rem",
      borderBottom: "1px solid #e2e8f0",
      backgroundColor: "#f1f5f9",
    },
    td: {
      padding: "0.75rem",
      borderBottom: "1px solid #e2e8f0",
    },
    actionButton: {
      marginRight: "0.5rem",
      padding: "0.4rem 0.75rem",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
    },
    editBtn: {
      backgroundColor: "#10b981",
      color: "white",
    },
    deleteBtn: {
      backgroundColor: "#ef4444",
      color: "white",
    },

   
    searchContainer: {
      marginBottom: "2rem",
    },
    searchInput: {
      width: "100%",
      padding: "0.75rem",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      fontSize: "0.875rem",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    },
    formContainer: {
      backgroundColor: "white",
      padding: "1.5rem",
      borderRadius: "12px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      marginBottom: "2rem",
    },
    formTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
      marginBottom: "1rem",
      color: "#1e293b",
    },
    input: {
      width: "100%",
      padding: "0.75rem",
      marginBottom: "1rem",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      fontSize: "0.875rem",
    },
    textarea: {
      width: "100%",
      padding: "0.75rem",
      marginBottom: "1rem",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      fontSize: "0.875rem",
      minHeight: "100px",
      resize: "vertical",
    },
    buttonGroup: {
      display: "flex",
      gap: "0.75rem",
    },
    primaryButton: {
      backgroundColor: editingTaskId ? "#f59e0b" : "#3b82f6",
      color: "white",
      padding: "0.75rem 1.25rem",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "500",
      flex: 1,
    },
    secondaryButton: {
      backgroundColor: "#e2e8f0",
      color: "#64748b",
      padding: "0.75rem 1.25rem",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "500",
    },
    taskList: {
      display: "grid",
      gap: "1rem",
    },
    taskCard: {
      backgroundColor: "white",
      padding: "1.25rem",
      borderRadius: "12px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    },
    taskHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "0.5rem",
    },
    taskTitle: {
      fontSize: "1.125rem",
      fontWeight: "600",
      color: "#1e293b",
    },
    taskDescription: {
      color: "#64748b",
      marginBottom: "1rem",
    },
    taskActions: {
      display: "flex",
      gap: "0.5rem",
    },
    deleteButton: {
      backgroundColor: "#ef4444",
      color: "white",
      padding: "0.5rem 1rem",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "0.875rem",
    },
    editButton: {
      backgroundColor: "#10b981",
      color: "white",
      padding: "0.5rem 1rem",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "0.875rem",
    },
    error: {
      backgroundColor: "#fee2e2",
      color: "#b91c1c",
      padding: "0.75rem",
      borderRadius: "8px",
      marginBottom: "1rem",
    },
    loading: {
      textAlign: "center",
      padding: "1rem",
      color: "#64748b",
    },
  
    // ...keep previous styles like error, input, formContainer, etc.
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.heading}>Task Dashboard</h1>
        <button onClick={logout} style={styles.logoutButton}>Logout</button>
      </div>

      {error && <div style={styles.error}>{error}</div>}

      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search tasks..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      <div style={styles.formContainer}>
        <h2 style={styles.formTitle}>
          {editingTaskId ? "Edit Task" : "Create New Task"}
        </h2>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
        ></textarea>
        <div style={styles.buttonGroup}>
          <button
            onClick={createOrUpdateTask}
            disabled={isLoading}
            style={styles.primaryButton}
          >
            {isLoading
              ? "Processing..."
              : editingTaskId
              ? "Update Task"
              : "Add Task"}
          </button>
          {editingTaskId && (
            <button
              onClick={cancelEdit}
              disabled={isLoading}
              style={styles.secondaryButton}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {isLoading && tasks.length === 0 ? (
        <div style={styles.loading}>Loading tasks...</div>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task._id}>
                <td style={styles.td}>{task.title}</td>
                <td style={styles.td}>{task.description}</td>
                <td style={styles.td}>
                  <button
                    style={{ ...styles.actionButton, ...styles.editBtn }}
                    onClick={() => editTask(task)}
                    disabled={isLoading}
                  >
                    Edit
                  </button>
                  <button
                    style={{ ...styles.actionButton, ...styles.deleteBtn }}
                    onClick={() => deleteTask(task._id)}
                    disabled={isLoading}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;
