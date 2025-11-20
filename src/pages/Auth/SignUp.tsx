import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "@/store/services/authApi";
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "buyer" as "buyer" | "seller",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (formData.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email address";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    else if (!/(?=.*[A-Z])(?=.*\d)/.test(formData.password)) newErrors.password = "Password must include 1 uppercase letter and 1 number";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!agreeToTerms) newErrors.terms = "You must agree to the Terms of Service and Privacy Policy";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const result = await signup({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        aggriedToTerms: agreeToTerms, // Backend typo
        role: formData.role,
      }).unwrap();

      //  Show success toast
      toast.success("Account created successfully! Please verify your email.");
      console.log(result)

      if (result) {
        navigate("/verify-email", {
          state: { email: formData.email.trim().toLowerCase() }
        });
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      //  Show error toast
      toast.error(err?.data?.message || "Signup failed. Please try again.");

      // Set field-specific errors if provided by API
      if (err?.data?.errors) setErrors(err.data.errors);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary">
      <div className="w-7xl mx-auto p-12 bg-[#F9ECF3] rounded-3xl shadow-xl border-2 border-white">
        <h1 className="text-4xl font-bold text-center mb-8">
          First time here? <span className="text-primary">Sign up now!</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-800 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent ${errors.name ? "border-red-500" : "border-gray-300"}`}
                disabled={isLoading}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block font-medium text-gray-800 mb-2">
                Account Type <span className="text-red-500">*</span>
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                disabled={isLoading}
              >
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>
            </div>
          </div>

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
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent ${errors.email ? "border-red-500" : "border-gray-300"}`}
              disabled={isLoading}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
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
                  placeholder="Enter password"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent pr-12 ${errors.password ? "border-red-500" : "border-gray-300"}`}
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
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block font-medium text-gray-800 mb-2">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent pr-12 ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          <p className="text-xs text-gray-600">
            Minimum 8 characters, including 1 uppercase letter and 1 number
          </p>

          <div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-pink-500"
                disabled={isLoading}
              />
              <span className="ml-2 text-sm text-gray-700">
                I agree to the Terms of Service and Privacy Policy <span className="text-red-500">*</span>
              </span>
            </label>
            {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms}</p>}
          </div>

          <Button
            type="submit"
            className="w-full text-white py-6 rounded-lg text-base font-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                Creating Account...
              </span>
            ) : (
              "Sign Up"
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
              <span className="text-sm font-medium text-gray-700">Sign Up with Google</span>
            </button>

            <button
              type="button"
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition"
              disabled={isLoading}
            >
              <FaApple className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium text-gray-700">Sign Up with Apple</span>
            </button>
          </div>

          <p className="text-center text-gray-800 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="font-bold hover:text-primary transition">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
