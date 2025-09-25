// pages/LoginPage.jsx - Updated with AuthManager and dark mode
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthManager } from "../hooks/useAuthManager";
import { useApp } from "../context/AppProvider";
import {
  Calendar,
  Mail,
  Phone,
  Eye,
  EyeOff,
  Lock,
  User,
  AlertCircle,
  CheckCircle,
  Sun,
  Moon,
} from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearAuthError } = useAuthManager();
  const { isDark, toggleTheme } = useApp();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    loginType: "email",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    clearAuthError();
    return () => clearAuthError();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: null }));
    }

    if (error) {
      clearAuthError();
    }
  };

  const toggleLoginType = () => {
    setFormData((prev) => ({
      ...prev,
      loginType: prev.loginType === "email" ? "phone" : "email",
      identifier: "",
    }));
    setValidationErrors({});
    clearAuthError();
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.identifier.trim()) {
      errors.identifier = `${
        formData.loginType === "email" ? "Email" : "Phone number"
      } is required`;
    } else if (formData.loginType === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.identifier)) {
        errors.identifier = "Please enter a valid email address";
      }
    } else if (formData.loginType === "phone") {
      const phoneRegex = /^\+?[\d\s-()]{10,}$/;
      if (!phoneRegex.test(formData.identifier)) {
        errors.identifier = "Please enter a valid phone number";
      }
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const res = await login({
      identifier: formData.identifier.trim(),
      password: formData.password,
      loginType: formData.loginType,
    });

    if (res.success) {
      navigate("/");
    }
    // AuthManager now handles error toasts automatically
  };

  const fillDemoCredentials = (userIndex = 0) => {
    const demoUsers = [
      {
        identifier: "user@example.com",
        password: "password123",
        type: "email",
      },
      { identifier: "demo@placemate.com", password: "demo123", type: "email" },
    ];

    const demo = demoUsers[userIndex];
    setFormData((prev) => ({
      ...prev,
      identifier: demo.identifier,
      password: demo.password,
      loginType: demo.type,
    }));
    clearAuthError();
    setValidationErrors({});
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
      isDark 
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900" 
        : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
    }`}>
      <div className="w-full max-w-md">
        {/* Header with theme toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-xl transition-all hover:scale-105 shadow-sm ${
              isDark
                ? "bg-gray-800/80 text-yellow-400 hover:bg-gray-700/80"
                : "bg-white/80 text-gray-600 hover:bg-gray-100/80"
            } backdrop-blur-sm border ${
              isDark ? "border-gray-700/50" : "border-white/50"
            }`}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Logo and title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg mb-4">
            <Calendar className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Sign in to continue your preparation journey
          </p>
        </div>

        {/* Demo credentials info */}
        <div className={`border rounded-lg p-3 mb-6 ${
          isDark 
            ? "bg-blue-900/30 border-blue-800/50" 
            : "bg-blue-50 border-blue-200"
        }`}>
          <div className="flex items-start gap-2">
            <CheckCircle
              size={16}
              className="text-blue-500 mt-0.5 flex-shrink-0"
            />
            <div className="text-sm">
              <p className={`font-medium mb-1 ${
                isDark ? "text-blue-300" : "text-blue-700"
              }`}>
                Demo Credentials:
              </p>
              <div className={`space-y-1 ${
                isDark ? "text-blue-400" : "text-blue-600"
              }`}>
                <button
                  type="button"
                  onClick={() => fillDemoCredentials(0)}
                  className={`block underline text-left transition-colors ${
                    isDark ? "hover:text-blue-300" : "hover:text-blue-800"
                  }`}
                >
                  user@example.com / password123
                </button>
                <button
                  type="button"
                  onClick={() => fillDemoCredentials(1)}
                  className={`block underline text-left transition-colors ${
                    isDark ? "hover:text-blue-300" : "hover:text-blue-800"
                  }`}
                >
                  demo@placemate.com / demo123
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main form */}
        <div className={`backdrop-blur-sm border rounded-2xl shadow-xl p-6 ${
          isDark 
            ? "bg-gray-800/80 border-gray-700/50" 
            : "bg-white/80 border-white/50"
        }`}>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Login type toggle */}
            <div className="flex items-center justify-center mb-6">
              <div className={`rounded-xl p-1 flex ${
                isDark ? "bg-gray-700/80" : "bg-gray-100"
              }`}>
                <button
                  type="button"
                  onClick={toggleLoginType}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    formData.loginType === "email"
                      ? isDark 
                        ? "bg-gray-600 text-blue-400 shadow-sm"
                        : "bg-white text-blue-600 shadow-sm"
                      : isDark
                        ? "text-gray-300 hover:text-gray-100"
                        : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <Mail size={16} />
                  Email
                </button>
                <button
                  type="button"
                  onClick={toggleLoginType}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    formData.loginType === "phone"
                      ? isDark 
                        ? "bg-gray-600 text-blue-400 shadow-sm"
                        : "bg-white text-blue-600 shadow-sm"
                      : isDark
                        ? "text-gray-300 hover:text-gray-100"
                        : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <Phone size={16} />
                  Phone
                </button>
              </div>
            </div>

            {/* Identifier input */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? "text-gray-200" : "text-gray-700"
              }`}>
                {formData.loginType === "email"
                  ? "Email Address"
                  : "Phone Number"}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {formData.loginType === "email" ? (
                    <Mail size={18} className={isDark ? "text-gray-500" : "text-gray-400"} />
                  ) : (
                    <Phone size={18} className={isDark ? "text-gray-500" : "text-gray-400"} />
                  )}
                </div>
                <input
                  type={formData.loginType === "email" ? "email" : "tel"}
                  name="identifier"
                  value={formData.identifier}
                  onChange={handleChange}
                  placeholder={
                    formData.loginType === "email"
                      ? "Enter your email address"
                      : "Enter your phone number"
                  }
                  className={`block w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    validationErrors.identifier
                      ? "border-red-300 bg-red-50"
                      : isDark
                        ? "border-gray-600 bg-gray-700/50 text-gray-100 placeholder-gray-400"
                        : "border-gray-300 bg-white/50 text-gray-900 placeholder-gray-500"
                  }`}
                  disabled={isLoading}
                />
              </div>
              {validationErrors.identifier && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {validationErrors.identifier}
                </p>
              )}
            </div>

            {/* Password input */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? "text-gray-200" : "text-gray-700"
              }`}>
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className={isDark ? "text-gray-500" : "text-gray-400"} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`block w-full pl-11 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    validationErrors.password
                      ? "border-red-300 bg-red-50"
                      : isDark
                        ? "border-gray-600 bg-gray-700/50 text-gray-100 placeholder-gray-400"
                        : "border-gray-300 bg-white/50 text-gray-900 placeholder-gray-500"
                  }`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute inset-y-0 right-0 pr-3 flex items-center transition-colors ${
                    isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600"
                  }`}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {validationErrors.password && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {validationErrors.password}
                </p>
              )}
            </div>

            {/* Error display - only for validation errors since AuthManager handles auth errors */}
            {error && (
              <div className={`border rounded-lg p-3 ${
                isDark 
                  ? "bg-red-900/30 border-red-800/50" 
                  : "bg-red-50 border-red-200"
              }`}>
                <p className={`text-sm flex items-center gap-2 ${
                  isDark ? "text-red-300" : "text-red-700"
                }`}>
                  <AlertCircle size={16} />
                  {error}
                </p>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:hover:shadow-lg transform hover:scale-[1.02] disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <User size={18} />
                  Sign In
                </>
              )}
            </button>

            {/* Signup link */}
            <div className="text-center pt-4">
              <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className={`font-medium hover:underline transition-colors ${
                    isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                  }`}
                >
                  Sign Up here
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;