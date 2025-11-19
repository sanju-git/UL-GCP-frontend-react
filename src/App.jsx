import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import GCS from "./pages/GCS";
import DatabricksUC from "./pages/DatabricksUC";
import CloudSQL from "./pages/CloudSQL";
import MainLayout from "./components/MainLayout";
import Login from "./pages/Login";
import "./App.css";

// --- CONFIGURATION ---
// REPLACE with your actual Client ID from Google Cloud Console
const CLIENT_ID =
  "1076232659917-0l8b4f8p3a4tqttfp4n6ouddgk0nm9mt.apps.googleusercontent.com";

// --- AUTH COMPONENTS ---

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

function App() {
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Navigate to="/gcs" replace />} />
            <Route path="/gcs" element={<GCS />} />
            <Route path="/databricks-uc" element={<DatabricksUC />} />
            <Route path="/cloud-sql" element={<CloudSQL />} />
          </Route>

          <Route path="*" element={<Navigate to="/gcs" replace />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
