import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader";
import Swal from "sweetalert2";

// -------------------- Edit User Modal --------------------
const EditUserModal = ({ user, roles, isOpen, onClose, onUpdate }) => {
  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
    role: user.role || roles[0]?.name || "user",
  });

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const token = localStorage.getItem("token");

  const handleUpdate = async () => {
    if (!form.name || !form.email) {
      Swal.fire("Error", "Name and Email are required", "error");
      return;
    }
    try {
      await axios.put(
        `${API_URL}/api/admin/users/${user._id}`,
        { name: form.name, email: form.email, role: form.role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire("Updated", "User updated successfully", "success");
      onUpdate();
      onClose();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update user", "error");
    }
  };

  if (!isOpen) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>Edit User</h2>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={inputStyle}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={inputStyle}
        />
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          style={selectStyle}
        >
          {roles.map((r) => (
            <option key={r._id} value={r.name}>
              {r.name}
            </option>
          ))}
        </select>
        <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
          <button style={buttonStyle} onClick={handleUpdate}>
            Save
          </button>
          <button
            style={{ ...buttonStyle, backgroundColor: "#ccc", color: "#333" }}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// -------------------- Add User Modal --------------------
const AddUserModal = ({ roles, isOpen, onClose, onAdd }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: roles[0]?.name || "user",
  });

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const token = localStorage.getItem("token");

  const handleAdd = async () => {
    if (!form.name || !form.email || !form.password) {
      Swal.fire("Error", "All fields are required", "error");
      return;
    }
    try {
      const res = await axios.post(`${API_URL}/api/admin/users`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire("Success", "User added successfully", "success");
      onAdd(res.data);
      setForm({
        name: "",
        email: "",
        password: "",
        role: roles[0]?.name || "user",
      });
      onClose();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to add user", "error");
    }
  };

  if (!isOpen) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>Add User</h2>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={inputStyle}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={inputStyle}
        />
        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          style={inputStyle}
        />
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          style={selectStyle}
        >
          {roles.map((r) => (
            <option key={r._id} value={r.name}>
              {r.name}
            </option>
          ))}
        </select>
        <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
          <button style={buttonStyle} onClick={handleAdd}>
            Add
          </button>
          <button
            style={{ ...buttonStyle, backgroundColor: "#ccc", color: "#333" }}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// -------------------- Main User Management --------------------
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/roles`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRoles(res.data || []);
    } catch (err) {
      console.error("Failed to fetch roles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete user?",
      icon: "warning",
      showCancelButton: true,
    });
    if (confirm.isConfirmed) {
      await axios.delete(`${API_URL}/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleAddUser = (user) => {
    setUsers((prev) => [...prev, user]);
  };

  if (loading) return <Loader text="Loading Users..." />;

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ marginBottom: "20px" }}>User & Employee Management</h2>

      <button
        style={{ ...buttonStyle, marginBottom: "20px" }}
        onClick={() => setAddModalOpen(true)}
      >
        + Add User
      </button>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} style={rowStyle}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={() => openEditModal(u)}
                  style={{ ...buttonStyle, padding: "4px 8px" }}
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => deleteUser(u._id)}
                  style={{ ...buttonStyle, backgroundColor: "#d33" }}
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && selectedUser && (
        <EditUserModal
          user={selectedUser}
          roles={roles}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onUpdate={fetchUsers}
        />
      )}

      {addModalOpen && (
        <AddUserModal
          roles={roles}
          isOpen={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          onAdd={handleAddUser}
        />
      )}
    </div>
  );
};

export default UserManagement;

// -------------------- STYLES --------------------
const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  width: "100%",
  boxSizing: "border-box",
};
const selectStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  width: "100%",
};
const buttonStyle = {
  padding: "10px 15px",
  border: "none",
  borderRadius: "6px",
  backgroundColor: "#007bff",
  color: "#fff",
  cursor: "pointer",
};
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};
const rowStyle = { borderBottom: "1px solid #ddd", textAlign: "center" };
const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 2000,
};
const modalStyle = {
  background: "#fff",
  padding: "25px",
  borderRadius: "12px",
  width: "400px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};
