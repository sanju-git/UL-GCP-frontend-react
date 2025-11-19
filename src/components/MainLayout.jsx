import { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Toggle button (inside sidebar when open) */}
      {isOpen && (
        <button
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          style={{
            position: "fixed",
            top: 10,
            left: 10,
            zIndex: 1002,
            fontSize: "20px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#fff",
            padding: 8,
          }}
        >
          ☰
        </button>
      )}

      {/* Top navbar/header */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: isOpen ? "250px" : "0",
          width: isOpen ? "calc(100vw - 250px)" : "100vw",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          boxSizing: "border-box",
          zIndex: 1000,
          transition: "left 0.3s, width 0.3s",
          background: "transparent",
        }}
      >
        {!isOpen && (
          <button
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
            style={{
              fontSize: "24px",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: isOpen ? "#fff" : "#0F0E9A",
              padding: 8,
            }}
          >
            ☰
          </button>
        )}

        <div style={{ flex: 1, textAlign: "center", pointerEvents: "none" }}>
          <strong style={{ fontSize: "16px" }}>UL GCP Dashboard</strong>
        </div>

        <div style={{ width: 40 }} />
      </header>

      {/* Main content area - account for header height */}
      <main
        style={{
          marginLeft: isOpen ? "250px" : "0",
          transition: "0.3s",
          paddingTop: "60px",
          height: "calc(100vh - 60px)",
          width: isOpen ? "calc(100vw - 250px)" : "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
