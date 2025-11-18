import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";

import GCS from "./pages/GCS";
import DatabricksUC from "./pages/DatabricksUC";
import CloudSQL from "./pages/CloudSQL";

import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <Router>
      <button
        className={`hamburger ${isOpen ? "shift" : ""}`}
        onClick={toggleSidebar}
      >
        ☰
      </button>

      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className={`content ${isOpen ? "shift" : ""}`}>
        <Routes>
          {/* Default route redirects to /gcs */}
          <Route path="/" element={<Navigate to="/gcs" />} />

          {/* Pages */}
          <Route path="/gcs" element={<GCS />} />
          <Route path="/databricks-uc" element={<DatabricksUC />} />
          <Route path="/cloud-sql" element={<CloudSQL />} />

          {/* 404 fallback */}
          <Route path="*" element={<Navigate to="/gcs" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
