import React from "react";

export default function AdminSettings() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      {/* General Settings */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-3">General Settings</h2>
        <p className="text-gray-500 text-sm">Static placeholder section for general admin preferences.</p>
      </div>

      {/* Account Settings */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-3">Account Settings</h2>
        <p className="text-gray-500 text-sm">Static placeholder section for account configuration.</p>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-3">Notification Settings</h2>
        <p className="text-gray-500 text-sm">Static placeholder section for notification preferences.</p>
      </div>

      {/* System Info */}
      <div className="bg-gray-50 border rounded-xl p-4 text-sm text-gray-600">
        <p><strong>Environment:</strong> Development</p>
        <p><strong>Version:</strong> 0.1.0</p>
      </div>
    </div>
  );
}
