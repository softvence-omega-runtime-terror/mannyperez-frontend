import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Camera } from "lucide-react";
import Wrapper from "@/components/layout/Wrapper";
import Footer from "@/components/layout/Footer";

export default function BuyerProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulated form data
  const [formData, setFormData] = useState({
    fullName: "Sarah Johnson",
    username: "@sarahjohnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Senior Product Designer with 8+ years of experience creating user-centered digital experiences. Passionate about accessibility and inclusive design.",
  });

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    // TODO: handle form save logic (API integration)
    console.log("Saved:", formData);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <>
   <Wrapper>
     <div className="min-h-screen  mt-8">
      <div className="w-full">
        {/* === Profile Header === */}
        <div className="flex items-center justify-between mb-8 bg-white rounded-xl shadow p-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={profileImage}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
              />
              {/* Camera Icon Overlay */}
              <button
                onClick={handleImageClick}
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-200 hover:bg-pink-700 text-black p-2 rounded-full shadow-md transition"
              >
                <Camera className="w-4 h-4" />
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-gray-900">
                {formData.fullName}
              </h1>
              <p className="text-gray-600">{formData.email}</p>
              <p className="text-sm text-gray-500 mt-1">
                Last updated: January 15, 2025
              </p>
            </div>
          </div>

          <Button
            onClick={handleEditToggle}
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold"
            style={{ backgroundColor: "#EE2A7B" }}
          >
            {isEditing ? "Cancel Edit" : "Edit Profile"}
          </Button>
        </div>

        {/* === Information Sections === */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* === Basic Information === */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Basic Information
            </h2>
            <p className="text-gray-600 mb-6">
              Update your personal details and contact information
            </p>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Full Name*
                  </label>
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full h-12 border-gray-300 ${
                      isEditing
                        ? "focus:border-pink-500 focus:ring-pink-500"
                        : "bg-gray-100 cursor-not-allowed"
                    }`}
                  />
                </div>

                {/* Username */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Username
                  </label>
                  <Input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full h-12 border-gray-300 ${
                      isEditing
                        ? "focus:border-pink-500 focus:ring-pink-500"
                        : "bg-gray-100 cursor-not-allowed"
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Email Address *
                  </label>
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full h-12 border-gray-300 ${
                      isEditing
                        ? "focus:border-pink-500 focus:ring-pink-500"
                        : "bg-gray-100 cursor-not-allowed"
                    }`}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Phone Number
                  </label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full h-12 border-gray-300 ${
                      isEditing
                        ? "focus:border-pink-500 focus:ring-pink-500"
                        : "bg-gray-100 cursor-not-allowed"
                    }`}
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Bio
                </label>
                <Textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full min-h-[120px] resize-none border-gray-300 ${
                    isEditing
                      ? "focus:border-pink-500 focus:ring-pink-500"
                      : "bg-gray-100 cursor-not-allowed"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* === Account Security === */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Account Security
            </h2>
            <p className="text-gray-600 mb-6">
              Manage your account security settings
            </p>

            <div className="space-y-8">
              {/* Password and 2FA */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Password
                  </label>
                  <p className="text-sm text-gray-600 mb-3">
                    Last changed 3 months ago
                  </p>
                  <Button
                    variant="outline"
                    className="w-full py-6 border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    Change Password
                  </Button>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Two-Factor Authentication
                  </label>
                  <p className="text-xs font-bold text-green-600 mb-3">
                    Not enabled - Recommended
                  </p>
                  <Button
                    className="w-full py-6 text-white font-semibold"
                    style={{ backgroundColor: "#EE2A7B" }}
                  >
                    Enable 2FA
                  </Button>
                </div>
              </div>

              {/* Recent Security Activity */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Recent Security Activity
                </h3>
                <div className="space-y-1">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0"
                    >
                      <div>
                        <p className="text-base font-medium text-gray-900">
                          Login from Chrome on Mac
                        </p>
                        <p className="text-sm text-gray-500">
                          San Francisco, CA • 2 hours ago
                        </p>
                      </div>
                      {i === 1 ? (
                        <span className="text-sm font-semibold text-gray-500">
                          Current
                        </span>
                      ) : (
                        <button
                          className="text-sm font-semibold"
                          style={{ color: "#EE2A7B" }}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* === Save Changes Button === */}
        <div className="mt-10 flex justify-center">
          <Button
            onClick={handleSave}
            disabled={!isEditing}
            className={`text-white font-semibold shadow-lg transition-transform transform hover:scale-[1.02] ${
              isEditing ? "bg-pink-600 hover:bg-pink-700" : "bg-gray-400"
            }`}
            style={{ width: "480px", height: "50px", fontSize: "1rem" }}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
   </Wrapper>
   <Footer/>
    </>
    
  );
}
