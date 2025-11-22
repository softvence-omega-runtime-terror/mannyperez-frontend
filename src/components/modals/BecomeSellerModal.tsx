/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";
import { useApplyForSellerMutation } from "@/store/services/seller/BecomeSellerApi";
import { useNavigate } from "react-router-dom";

interface BecomeSellerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (email: string) => void; // new callback
}

const BecomeSellerModal = ({ open, onOpenChange }: BecomeSellerModalProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
    userName: "",
    businessName: "",
    residentialAddress: "",
    officeAddress: "",
    aggriedToTerms: false,
  });

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [documents, setDocuments] = useState<File[]>([]);
  const [img, setImg] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);

  const [applyForSeller, { isLoading }] = useApplyForSellerMutation();

  const strongPasswordRegex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/]).{8,}$/;

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    if (name === "password") {
      if (!strongPasswordRegex.test(value)) {
        setPasswordError(
          "Password must be 8+ characters, include 1 uppercase letter and 1 special character."
        );
      } else {
        setPasswordError("");
      }
    }

    if (name === "confirmPassword") {
      if (value !== formData.password) {
        setConfirmPasswordError("Passwords do not match.");
      } else {
        setConfirmPasswordError("");
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDocumentUpload = (e: any) => {
    setDocuments(Array.from(e.target.files));
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    setImg(file);
    if (file) {
      setImgPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (passwordError || confirmPasswordError) return;

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value as any);
    });
    documents.forEach((file) => data.append("documents", file));
    if (img) data.append("img", img);

    try {
      const response: any = await applyForSeller(data).unwrap();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: response.message || "Seller request submitted successfully!",
      });
      navigate("/verify-email");
      console.log(response)

      // Reset form
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        phone: "",
        userName: "",
        businessName: "",
        residentialAddress: "",
        officeAddress: "",
        aggriedToTerms: false,
      });
      setDocuments([]);
      setImg(null);
      setImgPreview(null);
      onOpenChange(false);
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err?.data?.message || "Failed to submit seller request",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onInteractOutside={() => onOpenChange(false)}
        className="
          sm:max-w-[95%]
          lg:max-w-[1400px]
          w-full 
          bg-pink-50
          rounded-2xl 
          shadow-xl 
          max-h-[90vh]
          overflow-y-auto
          p-10
          border border-pink-200
        "
      >
        {/* Header */}
        <DialogHeader className="pb-5 border-b border-pink-200">
          <DialogTitle className="text-4xl font-bold text-pink-700">
            <span className="text-black">Become a</span> Seller
          </DialogTitle>
          <p className="text-gray-700 mt-1 text-base">
            Fill in the required information to apply as a seller.
          </p>
        </DialogHeader>

        {/* Form */}
        <form className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-800">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm bg-white"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2 relative">
            <label className="font-semibold text-gray-800">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className={`w-full border px-4 py-3 rounded-lg shadow-sm bg-white ${
                passwordError ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-2 relative">
            <label className="font-semibold text-gray-800">Re-type Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              className={`w-full border px-4 py-3 rounded-lg shadow-sm bg-white ${
                confirmPasswordError ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-10 text-gray-600"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {confirmPasswordError && (
              <p className="text-red-500 text-sm">{confirmPasswordError}</p>
            )}
          </div>

          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-800">Full Name</label>
            <input
              type="text"
              name="fullName"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm bg-white"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-800">Phone</label>
            <input
              type="text"
              name="phone"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm bg-white"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Username */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-800">Username</label>
            <input
              type="text"
              name="userName"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm bg-white"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Business Name */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-800">Business Name</label>
            <input
              type="text"
              name="businessName"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm bg-white"
              value={formData.businessName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Residential Address */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="font-semibold text-gray-800">Residential Address</label>
            <textarea
              name="residentialAddress"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm bg-white h-24"
              value={formData.residentialAddress}
              onChange={handleChange}
              required
            />
          </div>

          {/* Office Address */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="font-semibold text-gray-800">Office Address</label>
            <textarea
              name="officeAddress"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm bg-white h-24"
              value={formData.officeAddress}
              onChange={handleChange}
              required
            />
          </div>

          {/* Documents */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-800">Documents (Multiple)</label>
            <input
              type="file"
              multiple
              onChange={handleDocumentUpload}
              className="w-full bg-white border border-gray-300 px-3 py-2 rounded-lg"
              required
            />
            {documents.length > 0 && (
              <ul className="text-sm text-gray-600 mt-1">
                {documents.map((file, i) => (
                  <li key={i}>📄 {file.name}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Profile Image */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-800">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full bg-white border border-gray-300 px-3 py-2 rounded-lg"
              required
            />
            {imgPreview && (
              <img
                src={imgPreview}
                alt="Preview"
                className="mt-2 w-32 h-32 rounded-lg object-cover border"
              />
            )}
          </div>

          {/* Terms */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="aggriedToTerms"
                checked={formData.aggriedToTerms}
                onChange={handleChange}
                className="w-4 h-4"
                required
              />
              <span className="text-sm text-gray-700">
                I agree to the Terms & Policy
              </span>
            </label>
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <Button
              type="submit"
              className="w-full text-white py-6 rounded-lg text-base font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BecomeSellerModal;
