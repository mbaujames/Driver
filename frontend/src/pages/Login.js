import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with", { email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-900">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-purple-900 mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-purple-700 text-white p-2 rounded">
            Login
          </button>
          <div className="text-center">
            <Link to="/forgot-password" className="text-purple-700 text-sm">Forgot Password?</Link>
          </div>
        </form>
        <p className="text-sm text-center mt-4">
          Don't have an account? <Link to="/register" className="text-purple-700">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
