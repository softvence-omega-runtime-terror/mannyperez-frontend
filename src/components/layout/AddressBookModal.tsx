import { X, Edit } from "lucide-react";

interface AddressBookModalProps {
  onClose: () => void;
}

export default function AddressBookModal({ onClose }: AddressBookModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center sm:px-2">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-lg p-6 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center justify-between mb-6 mt-4 ">
          <h2 className="text-2xl font-bold text-gray-800">Address Book</h2>
          <button className="text-pink-600 font-medium hover:underline">
            + Add New Address
          </button>
        </div>

        {/* Address List */}
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl p-4 flex justify-between items-start hover:shadow-sm"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">John Smith</h3>
                  {i === 1 && (
                    <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-gray-700 mt-1">
                  123 Main Street, Apt 4B New York, NY 10001
                </p>
                <p className="text-gray-700">United States</p>
                <p className="text-gray-700 mt-1">+1 (555) 123–4567</p>
              </div>

              <button className="text-gray-500 hover:text-gray-700">
                <Edit className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
