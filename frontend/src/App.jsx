import { useEffect, useState } from "react";

// const API_URL="https://mongo-practice-phi.vercel.app/api"
// const API_URL="http://localhost:5000/api"
const API_URL = "https://mongo-n1sb.vercel.app/api";

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "" });
  

  // Fetch all users
  const getUsers = async () => {
    // const res = await fetch(`${API_URL}`);
    const res = await fetch(`${API_URL}/users`);
const data = await res.json();
// console.log("Response text:", text);

    // const data = await res.json();
    setUsers(data);
  };

  // Run once on mount
  useEffect(() => {
    getUsers();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    alert("User added with ID: " + data.insertedId);
    setFormData({ name: "", email: "" });
    getUsers(); // refresh user list
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ marginRight: "1rem" }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ marginRight: "1rem" }}
        />
        <button type="submit">Add User</button>
      </form>

      <h2>All Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
