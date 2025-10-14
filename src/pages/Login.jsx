import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded-2xl w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-3">{error}</p>
        )}
        <input
          type="email"
          placeholder="Email"
          required
          className="border p-2 w-full rounded mb-3"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="border p-2 w-full rounded mb-4"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-500 w-full py-2 rounded text-white font-semibold hover:bg-yellow-600"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-yellow-600 font-semibold">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
