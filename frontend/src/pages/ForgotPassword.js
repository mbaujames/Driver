import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("If an account with this email exists, you will receive a password reset link.");
    console.log("Password reset requested for:", email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-900">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-purple-900 mb-4">Forgot Password</h2>
        <p className="text-center text-gray-600 text-sm mb-4">
          Enter your email and we'll send you a link to reset your password.
        </p>
        {message && <p className="text-green-600 text-center mb-4">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-purple-700 text-white p-2 rounded">
            Reset Password
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          <Link to="/login" className="text-purple-700">Back to Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
