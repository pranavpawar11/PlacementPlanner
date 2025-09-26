// pages/SignupPage.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import {
  Mail,
  Phone,
  Eye,
  EyeOff,
  Lock,
  User,
  AlertCircle,
  UserPlus,
  Calendar,
} from "lucide-react";

const SignupPage = ({ onSwitchToLogin }) => {
  const navigate = useNavigate();
  const { signup, isLoading, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [step, setStep] = useState(1);

  useEffect(() => {
    clearError();
    return () => clearError();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: null }));
    }

    if (error) {
      clearError();
    }
  };

  const validateStep = (currentStep) => {
    const errors = {};

    switch (currentStep) {
      case 1:
        if (!formData.name.trim()) {
          errors.name = "Full name is required";
        } else if (formData.name.trim().length < 2) {
          errors.name = "Name must be at least 2 characters";
        }
        break;

      case 2:
        if (!formData.email.trim()) {
          errors.email = "Email address is required";
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(formData.email)) {
            errors.email = "Please enter a valid email address";
          }
        }

        if (!formData.phone.trim()) {
          errors.phone = "Phone number is required";
        } else {
          const phoneRegex = /^\+?[\d\s-()]{10,}$/;
          if (!phoneRegex.test(formData.phone)) {
            errors.phone = "Please enter a valid phone number";
          }
        }
        break;

      case 3:
        if (!formData.password) {
          errors.password = "Password is required";
        } else if (formData.password.length < 8) {
          errors.password = "Password must be at least 8 characters";
        }

        if (!formData.confirmPassword) {
          errors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
          errors.confirmPassword = "Passwords do not match";
        }
        break;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < 3) {
        setStep(step + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
      setValidationErrors({});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(3)) {
      return;
    }

    const res = await signup({
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      password: formData.password,
    });
    if (res.success) {
      navigate("/login");
    }
  };

  const getStepProgress = () => ((step - 1) / 2) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg mb-4">
            <Calendar className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Join PlaceMate
          </h1>
          <p className="text-gray-600">
            Create your account and start your preparation journey
          </p>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span className={step >= 1 ? "text-blue-600 font-medium" : ""}>
              Basic Info
            </span>
            <span className={step >= 2 ? "text-blue-600 font-medium" : ""}>
              Contact
            </span>
            <span className={step >= 3 ? "text-blue-600 font-medium" : ""}>
              Security
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getStepProgress()}%` }}
            ></div>
          </div>
          <div className="text-center mt-2 text-sm text-gray-600">
            Step {step} of 3
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl shadow-xl p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {step === 1 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`block w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      validationErrors.name
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 bg-white/50"
                    }`}
                    disabled={isLoading}
                  />
                </div>
                {validationErrors.name && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {validationErrors.name}
                  </p>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className={`block w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        validationErrors.email
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 bg-white/50"
                      }`}
                      disabled={isLoading}
                    />
                  </div>
                  {validationErrors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {validationErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className={`block w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        validationErrors.phone
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 bg-white/50"
                      }`}
                      disabled={isLoading}
                    />
                  </div>
                  {validationErrors.phone && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {validationErrors.phone}
                    </p>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a strong password"
                      className={`block w-full pl-11 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        validationErrors.password
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 bg-white/50"
                      }`}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
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
                  <div className="mt-2 text-xs text-gray-500">
                    Password must contain at least 8 characters
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-gray-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className={`block w-full pl-11 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        validationErrors.confirmPassword
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 bg-white/50"
                      }`}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  {validationErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {validationErrors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-700 flex items-center gap-2">
                  <AlertCircle size={16} />
                  {error}
                </p>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={isLoading}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-xl transition-all duration-200 border border-gray-300"
                >
                  Previous
                </button>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:hover:scale-100"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <UserPlus size={18} />
                      Create Account
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
