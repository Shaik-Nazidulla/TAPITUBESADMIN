import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../redux/authSlice"; 
import { useNavigate } from "react-router-dom"; // <-- import

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // <-- initialize

  const { loading, error, token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setLocalError("Email and Password are required!");
      return;
    }

    setLocalError("");
    dispatch(adminLogin(formData));
  };

  // ✅ Redirect after successful login
  useEffect(() => {
    if (token) {
      navigate("/products"); // <-- redirect to products page
    }
  }, [token, navigate]);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#0a0f1c] p-6 rounded-lg shadow space-y-4"
    >
      {localError && <p className="text-red-500 text-sm">{localError}</p>}
      {error && <p className="text-red-500 text-sm">{error.message || error}</p>}

      <div>
        <label className="block text-sm font-medium text-white">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email address"
          className="mt-1 block w-full px-3 py-2 bg-[#1b2333] text-white placeholder-gray-400 border border-gray-600 rounded-md focus:ring-[#405FFC] focus:border-[#405FFC] sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white">
          Password <span className="text-red-500">*</span>
        </label>
        <div className="relative mt-1">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Password"
            className="block w-full px-3 py-2 bg-[#1b2333] text-white placeholder-gray-400 border border-gray-600 rounded-md focus:ring-[#405FFC] focus:border-[#405FFC] sm:text-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="text-right mt-1">
          <button
            type="button"
            className="text-sm text-blue-400 hover:text-blue-300"
            onClick={() => alert("Forgot password clicked")}
          >
            Forgot Password
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#405FFC] text-black font-medium py-2 px-4 rounded-md hover:bg-blue-500 transition"
      >
        {loading ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
}

export default LoginForm;
