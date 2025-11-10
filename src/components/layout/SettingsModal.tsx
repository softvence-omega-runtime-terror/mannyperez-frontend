import { X } from "lucide-react";
import { useState } from "react";

interface SettingsModalProps {
  onClose: () => void;
}

export default function SettingsModal({ onClose }: SettingsModalProps) {
  const [settings, setSettings] = useState({
    orderUpdates: true,
    liveReminders: false,
    sellerMessages: true,
    showProfile: true,
    allowAllMessages: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-gray-700 font-semibold mb-3">Notifications</h3>
            <div className="space-y-3">
              {[
                { label: "Order & Shipping Updates", key: "orderUpdates" },
                { label: "Live Event Reminders", key: "liveReminders" },
                { label: "Messages from Sellers", key: "sellerMessages" },
              ].map(({ label, key }) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-gray-800">{label}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings[key as keyof typeof settings]}
                      onChange={() => toggleSetting(key as keyof typeof settings)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500 transition-colors"></div>
                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-gray-700 font-semibold mb-3">Privacy</h3>
            <div className="space-y-3">
              {[
                { label: "Show My Profile to Sellers", key: "showProfile" },
                { label: "Allow Messages from All Sellers", key: "allowAllMessages" },
              ].map(({ label, key }) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-gray-800">{label}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings[key as keyof typeof settings]}
                      onChange={() => toggleSetting(key as keyof typeof settings)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500 transition-colors"></div>
                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
