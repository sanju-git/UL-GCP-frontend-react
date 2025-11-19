import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <>
      <div
        className={`overlay ${isOpen ? "show" : ""}`}
        onClick={toggleSidebar}
      ></div>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <nav className="menu">
          <Link to="/gcs" onClick={toggleSidebar}>
            GCS
          </Link>
          <Link to="/databricks-uc" onClick={toggleSidebar}>
            Databricks UC
          </Link>
          <Link to="/cloud-sql" onClick={toggleSidebar}>
            Cloud SQL
          </Link>
          <div
            style={{
              position: "fixed",
              bottom: 80,
              left: 0,
              padding: "10px",
            }}
          >
            <button
              onClick={handleLogout}
              style={{
                padding: "8px 16px",
                background: "#ff4444",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
