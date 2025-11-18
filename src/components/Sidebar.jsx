import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
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
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
