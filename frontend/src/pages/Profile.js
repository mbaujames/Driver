import React, { useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    company: "DriverLog Inc.",
  });

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const handleEdit = () => setEditing(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser(formData);
    setEditing(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-900">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-purple-900 mb-4">Profile</h2>

        {editing ? (
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              className="w-full p-2 border rounded"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              className="w-full p-2 border rounded"
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              type="text"
              name="company"
              className="w-full p-2 border rounded"
              value={formData.company}
              onChange={handleChange}
            />
            <button className="w-full bg-purple-700 text-white p-2 rounded" onClick={handleSave}>
              Save
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Company:</strong> {user.company}</p>
            <button className="w-full bg-purple-700 text-white p-2 rounded" onClick={handleEdit}>
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
