import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);

    if (res.success) {
      const role = res.user.role;
      if (role === "Super Admin") navigate("/dashboard/admin");
      else if (role === "User") navigate("/dashboard/user");
      else navigate("/dashboard/employee");
    } else {
      setError(res.message);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "400px", margin: "auto" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} required />
        <button type="submit" style={buttonStyle}>Login</button>
      </form>
    </div>
  );
};

const inputStyle = { width: "100%", padding: "10px", marginBottom: "10px" };
const buttonStyle = { width: "100%", padding: "10px", background: "#111827", color: "#fff", border: "none", cursor: "pointer" };

export default Login;
