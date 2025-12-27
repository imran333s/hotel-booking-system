import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(name, email, password);

    if (res.success) {
      navigate("/dashboard/user");
    } else {
      setError(res.message);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "400px", margin: "auto" }}>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={inputStyle} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} required />
        <button type="submit" style={buttonStyle}>Register</button>
      </form>
    </div>
  );
};

const inputStyle = { width: "100%", padding: "10px", marginBottom: "10px" };
const buttonStyle = { width: "100%", padding: "10px", background: "#111827", color: "#fff", border: "none", cursor: "pointer" };

export default Register;
