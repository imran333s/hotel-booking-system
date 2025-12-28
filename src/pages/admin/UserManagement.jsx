import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/users`, { headers: { Authorization: `Bearer ${token}` } });
        setUsers(res.data || []);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchUsers();
  }, [API_URL, token]); // ✅ dependencies added

  const addUser = async () => {
    if (!name || !email || !password) return;
    try {
      const res = await axios.post(`${API_URL}/api/users`, { name, email, password, role }, { headers: { Authorization: `Bearer ${token}` } });
      setUsers(prev => [...prev, res.data]);
      setName(""); setEmail(""); setPassword(""); setRole("user");
    } catch (err) { console.error(err); }
  };

  if (loading) return <Loader text="Loading Users..." />;

  return (
    <div>
      <h2>User & Employee Management</h2>

      <div style={{ marginBottom: "20px" }}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>
        <button onClick={addUser}>Add User</button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead><tr><th>Name</th><th>Email</th><th>Role</th></tr></thead>
        <tbody>
          {users.length === 0 ? (
            <tr><td colSpan="3">No users found</td></tr>
          ) : users.map(u => (<tr key={u._id}><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td></tr>))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
