import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login", form);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg p-8 rounded-2xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full rounded mb-3"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full rounded mb-4"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="bg-yellow-500 hover:bg-yellow-600 w-full py-2 rounded text-white font-semibold">
          Login
        </button>
      </form>
    </div>
  );
}
