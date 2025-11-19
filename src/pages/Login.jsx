import { GoogleLogin } from "@react-oauth/google";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/gcs";

  const handleSuccess = (credentialResponse) => {
    if (credentialResponse.credential) {
      console.log("Login Success:", credentialResponse);
      localStorage.setItem("authToken", credentialResponse.credential);
      navigate(from, { replace: true });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
        fontFamily: "sans-serif",
        width: "100vw",
      }}
    >
      <div
        style={{
          padding: "40px",
          background: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Data Dashboard</h2>
        <p style={{ marginBottom: "30px", color: "#666" }}>
          Please sign in to access authorized data.
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => console.log("Login Failed")}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
