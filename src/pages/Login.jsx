import React, { useState } from "react";
import LoginForm from "../Components/LoginForm";
import SignUpForm from "../Components/SignUpForm"; 
import Logo from "../assets/Logo.png";
import BgImage from "../assets/BgImg.png";

function Login({ onLogin }) {
  const [activeTab, setActiveTab] = useState("login"); // "login" | "signup"

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-contain bg-center relative px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${BgImage})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Logo + Heading */}
        <div className="text-center">
          <img
            src={Logo}
            alt="Tapi Tubes Logo"
            className="mx-auto w-20 h-20 mb-2"
          />
          <h2 className="text-4xl font-bold text-[#405FFC] mb-2">
            Tapi Tubes Admin
          </h2>
          <p className="text-[#FFFFFF] text-lg">
            Manage your products and content
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center bg-gray-800 rounded-full p-1 mb-6">
          <button
            onClick={() => setActiveTab("login")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition ${
              activeTab === "login"
                ? "bg-black text-[#405FFC]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition ${
              activeTab === "signup"
                ? "bg-black text-[#405FFC]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Forms */}
        {activeTab === "login" ? (
          <LoginForm onLogin={onLogin} />
        ) : (
          <SignUpForm onSignup={(data) => console.log("Signup data:", data)} />
        )}
      </div>
    </div>
  );
}

export default Login;
