import React, { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { FiCamera } from "react-icons/fi";

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [fullName, setFullName] = useState("Sarah Johnson");
  const [username, setUsername] = useState("@sarahjohnson");
  const [email, setEmail] = useState("sarah.johnson@example.com");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [bio, setBio] = useState(
    "Senior Product Designer with 8+ years of experience creating user-centered digital experiences. Passionate about accessibility and inclusive design."
  );
  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/150"
  );
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="flex items-center space-x-4 relative">
          <div className="relative">
            <img
              src={profileImage}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            {isEditing && (
              <label className="absolute -bottom-4 right-5 bg-gray-200 p-1 rounded-full cursor-pointer hover:bg-gray-300">
                <FiCamera className="w-4 h-4 text-gray-700" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>
          <div>
            <h2 className="text-lg font-semibold">{fullName}</h2>
            <p className="text-gray-500">{email}</p>
            <p className="text-gray-400 text-sm">Last updated: January 15, 2025</p>
          </div>
        </div>
        <Button
          className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      {/* Form Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
          <p className="text-gray-500 mb-4">
            Update your personal details and contact information
          </p>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Full Name*</label>
                <input
                  type="text"
                  className={`w-full border rounded-lg p-2 ${
                    !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  readOnly={!isEditing}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Username</label>
                <input
                  type="text"
                  className={`w-full border rounded-lg p-2 ${
                    !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  readOnly={!isEditing}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Email Address*</label>
                <input
                  type="email"
                  className={`w-full border rounded-lg p-2 ${
                    !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  readOnly={!isEditing}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                  type="text"
                  className={`w-full border rounded-lg p-2 ${
                    !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  readOnly={!isEditing}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Bio</label>
              <textarea
                className={`w-full border rounded-lg p-2 ${
                  !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                readOnly={!isEditing}
              />
            </div>
          </div>
        </div>

        {/* Account Security */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Account Security</h3>
          <p className="text-gray-500 mb-4">Manage your account security settings</p>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="flex gap-2">
              <input
                type="password"
                className="flex-1 border rounded-lg p-2 bg-gray-100 cursor-not-allowed"
                value="********"
                readOnly
              />
              <Button
                className="bg-gray-200 text-gray-700 hover:bg-gray-300"
                onClick={() => setIsChangingPassword(!isChangingPassword)}
              >
                Change Password
              </Button>
            </div>
            <p className="text-gray-400 text-sm mt-1">Last changed 3 months ago</p>

            {isChangingPassword && (
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">New Password</label>
                  <input
                    type="password"
                    className="w-full border rounded-lg p-2"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="w-full border rounded-lg p-2"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <Button className="bg-pink-600 text-white hover:bg-pink-700 py-2 px-6 rounded-lg">
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Save Changes Button */}
      {isEditing && (
        <div className="mt-6 flex justify-center">
          <Button className="w-2xl bg-pink-600 text-white hover:bg-pink-700 py-3 px-12 rounded-lg">
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
};

export default Profile;
