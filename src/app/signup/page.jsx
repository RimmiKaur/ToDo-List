"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSignUp = () => {
    if (!username || !password) {
      setError("Username and Password are required");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((user) => user.username === username);

    if (userExists) {
      setError("User already exists");
    } else {
      const updatedUsers = [...users, { username, password }];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setSuccess(true);
      setError("");
      setTimeout(() => router.push("/login"), 2000); // Redirect to login after 2 seconds
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-pink-500">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">
          Create Your Account
        </h1>
        <p className="text-sm text-gray-600 text-center mb-8">
          Sign up and start managing your tasks effectively.
        </p>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
        {success && (
          <p className="text-green-500 text-sm mb-4 text-center">
            Sign up successful! Redirecting...
          </p>
        )}
        <button
          onClick={handleSignUp}
          className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition duration-200"
        >
          Sign Up
        </button>
        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-pink-500 hover:underline font-medium"
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}
