import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { adminSignup } from "../redux/authSlice"; 

function SignUpForm() {
  const dispatch = useDispatch();
  const { loading, error, token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.phone) {
      setLocalError("All fields are required!");
      return;
    }

    if (!formData.phone.match(/^[0-9]{10}$/)) {
      setLocalError("Enter a valid 10-digit phone number!");
      return;
    }

    setLocalError("");
    dispatch(
      adminSignup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phone,
      })
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#0a0f1c] p-6 rounded-lg shadow space-y-4"
    >
      {/* Local Validation Error */}
      {localError && <p className="text-red-500 text-sm">{localError}</p>}

      {/* API Error */}
      {error && <p className="text-red-500 text-sm">{error.message || error}</p>}

      {/* Name Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white">First Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
            className="mt-1 block w-full px-3 py-2 bg-[#1b2333] text-white placeholder-gray-400 border border-gray-600 rounded-md focus:ring-[#405FFC] focus:border-[#405FFC] sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white">Last Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
            className="mt-1 block w-full px-3 py-2 bg-[#1b2333] text-white placeholder-gray-400 border border-gray-600 rounded-md focus:ring-[#405FFC] focus:border-[#405FFC] sm:text-sm"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-white">Email Address <span className="text-red-500">*</span></label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email address"
          className="mt-1 block w-full px-3 py-2 bg-[#1b2333] text-white placeholder-gray-400 border border-gray-600 rounded-md focus:ring-[#405FFC] focus:border-[#405FFC] sm:text-sm"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-white">Phone Number <span className="text-red-500">*</span></label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
          className="mt-1 block w-full px-3 py-2 bg-[#1b2333] text-white placeholder-gray-400 border border-gray-600 rounded-md focus:ring-[#405FFC] focus:border-[#405FFC] sm:text-sm"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-white">Password <span className="text-red-500">*</span></label>
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
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#405FFC] text-black font-medium py-2 px-4 rounded-md hover:bg-blue-500 transition"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      {/* Success Message */}
      {token && <p className="text-green-400 text-sm">✅ Account created successfully!</p>}
    </form>
  );
}

export default SignUpForm;
