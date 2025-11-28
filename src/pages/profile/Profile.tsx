import React, { useState, ChangeEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FiCamera } from "react-icons/fi";
import Swal from "sweetalert2";
import {
  useGetUserByIdQuery,
  useUpdateProfileDataMutation,
  useUpdateProfileImageMutation,
} from "@/store/services/profile/profileApi";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { updateUser } from "@/store/slices/authSlice";

const Profile: React.FC = () => {
  // Get logged-in user
  const authUser = useAppSelector((state) => state.auth.user);
  const userId = authUser?._id;
  const dispatch = useAppDispatch();

  // Fetch profile
  const { data, isLoading } = useGetUserByIdQuery(userId as any);
  const profile = data?.data;

  const [updateProfileData] = useUpdateProfileDataMutation();
  const [updateProfileImage] = useUpdateProfileImageMutation();

  // Local state
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Sync backend → local state
  useEffect(() => {
    if (profile) {
      setFullName(profile.fullName || "");
      setUsername(profile.userName || "");
      setEmail(profile.email || "");
      setPhone(profile.phone || "");
      setBio(profile.bio || "");
      setProfileImagePreview(profile.img || "");
    }
  }, [profile]);

  if (isLoading) return <p>Loading...</p>;

  // Handle Image Upload
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Preview
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) setProfileImagePreview(e.target.result as string);
      };
      reader.readAsDataURL(file);

      // Upload
      const formData = new FormData();
      formData.append("files", file);

      try {
        const updated = await updateProfileImage(formData).unwrap();

        // update Redux instantly
        dispatch(updateUser(updated.data));

        Swal.fire("Success!", "Profile image updated successfully!", "success");
      } catch (err: any) {
        Swal.fire("Error!", err?.data?.message || "Image upload failed", "error");
      }
    }
  };

  // Save Text Data
  const handleSaveChanges = async () => {
    try {
      const updated = await updateProfileData({
        fullName,
        userName: username,
        email,
        phone,
        bio,
        ...(newPassword ? { password: newPassword, oldPassword } : {}),
      }).unwrap();

      // update Redux instantly
      dispatch(updateUser(updated.data));

      Swal.fire("Success!", "Profile updated successfully!", "success");

      setIsEditing(false);
      setIsChangingPassword(false);
      setOldPassword("");
      setNewPassword("");
    } catch (error: any) {
      Swal.fire("Error!", error?.data?.message || "Update failed", "error");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="flex items-center space-x-4 relative">
          <div className="relative">
            <img
              src={profileImagePreview || authUser?.img || ""}
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
            <h2 className="text-lg font-semibold">
              {authUser?.fullName || fullName}
            </h2>
            <p className="text-gray-500">{email}</p>
            <p className="text-gray-400 text-sm">
              Last updated: {new Date(profile?.updatedAt || "").toDateString()}
            </p>
          </div>
        </div>

        <Button
          className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      {/* Main */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
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
                <label className="block text-sm font-medium mb-1">Email*</label>
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
                <label className="block text-sm font-medium mb-1">Phone</label>
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
          <h3 className="text-lg font-semibold mb-4">Account Security</h3>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="flex gap-2 mb-2">
              <input
                type="password"
                className="flex-1 border rounded-lg p-2 bg-gray-100 cursor-not-allowed"
                value="********"
                readOnly
              />
              {isEditing && (
                <Button
                  className="bg-gray-200 text-gray-700 hover:bg-gray-300"
                  onClick={() => setIsChangingPassword(!isChangingPassword)}
                >
                  Change Password
                </Button>
              )}
            </div>

            {isChangingPassword && (
              <div className="space-y-4 mt-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Old Password</label>
                  <input
                    type="password"
                    className="w-full border rounded-lg p-2"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">New Password</label>
                  <input
                    type="password"
                    className="w-full border rounded-lg p-2"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Save Button */}
      {isEditing && (
        <div className="mt-6 flex justify-center">
          <Button
            className="w-2xl bg-pink-600 text-white hover:bg-pink-700 py-3 px-12 rounded-lg"
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
};

export default Profile;
