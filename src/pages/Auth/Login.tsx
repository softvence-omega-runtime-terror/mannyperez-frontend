import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useLoginMutation } from "@/store/services/authApi";
import { useAppSelector } from "@/store/hooks";

const Login = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    try {
      // Call login API
      const result = await login({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      }).unwrap();


      if (result) navigate("/feed");
    } catch (err: any) {
      // Handle API errors
      const errorMessage =
        err?.data?.message ||
        err?.message ||
        "Login failed. Please check your credentials.";
    }
  };

  // If already authenticated, show welcome message
  if (isAuthenticated && user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-secondary">
        <div className="max-w-md mx-auto p-12 bg-[#F9ECF3] rounded-3xl shadow-xl border-2 border-white text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome, <span className="text-primary">{user.name}!</span>
          </h1>
          <p className="text-gray-600 mb-6">You're already logged in.</p>
          <Button onClick={() => navigate("/")} className="w-full">
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary">
      <div className="w-7xl mx-auto p-12 bg-[#F9ECF3] rounded-3xl shadow-xl border-2 border-white">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome Back, <span className="text-primary">Login!</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium text-gray-800 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent ${errors.email ? "border-red-500" : "border-gray-300"
                }`}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-800 mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••••••••"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent pr-12 ${errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                disabled={isLoading}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={rememberPassword}
                onChange={(e) => setRememberPassword(e.target.checked)}
                className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-pink-500"
                disabled={isLoading}
              />
              <span className="ml-2 text-sm text-gray-700">Remember Password</span>
            </label>
            <Link to="/forgot-password" className="text-sm text-gray-700 hover:text-pink-500">
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full text-white py-6 rounded-lg text-base font-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/70 text-gray-500">Or Continue With</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition"
              disabled={isLoading}
            >
              <FcGoogle className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium text-gray-700">Log In with Google</span>
            </button>

            <button
              type="button"
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition"
              disabled={isLoading}
            >
              <FaApple className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium text-gray-700">Log In with Apple</span>
            </button>
          </div>

          <p className="text-center text-gray-800 mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="font-bold hover:text-primary transition">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;