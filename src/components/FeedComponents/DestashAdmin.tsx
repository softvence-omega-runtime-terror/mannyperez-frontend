import { Pin } from 'lucide-react';

function DestashAdmin() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-[#EFF6FF] rounded-2xl border-2 border-cyan-200 p-8 relative shadow-sm">
        {/* Pin Icon */}
        <div className="absolute top-6 right-6">
          <Pin className="w-6 h-6 text-red-500 fill-red-500" />
        </div>

        {/* Header Section */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-800 to-green-900 flex items-center justify-center">
            <span className="text-2xl font-bold text-yellow-400">D</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold text-gray-900">DTF Destash Admin</h3>
              <span className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-md">
                Admin
              </span>
            </div>
            <p className="text-gray-600 text-sm mt-1">Posted 1h ago</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">📢</span>
            New Rule Update
          </h2>
          <p className="text-gray-700 text-base leading-relaxed">
            All listings must include a proof photo with handwritten name & date. This helps ensure authenticity and builds trust in our community.
          </p>
        </div>

        {/* Button */}
        <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200">
          Read Full Seller Guide
        </button>
      </div>
    </div>
  );
}

export default DestashAdmin;