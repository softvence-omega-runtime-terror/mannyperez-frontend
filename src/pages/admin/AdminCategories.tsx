import React from "react";

export default function AdminCategories() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Categories</h1>

      {/* Categories Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {[
          { name: "Electronics", total: 45 },
          { name: "Fashion", total: 30 },
          { name: "Home & Living", total: 25 },
        ].map((category, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow border border-gray-100"
          >
            <h3 className="text-sm text-gray-500">{category.name}</h3>
            <p className="text-2xl font-bold mt-2">{category.total} Listings</p>
          </div>
        ))}
      </div>

      {/* Detailed Categories Table */}
      <div className="bg-white rounded-lg shadow border border-gray-100 p-4">
        <h2 className="text-lg font-semibold mb-4">All Categories</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Category ID
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Total Listings
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Created On
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { id: "CAT-001", name: "Electronics", total: 45, created: "2025-11-20" },
                { id: "CAT-002", name: "Fashion", total: 30, created: "2025-11-18" },
                { id: "CAT-003", name: "Home & Living", total: 25, created: "2025-11-15" },
              ].map((cat) => (
                <tr key={cat.id}>
                  <td className="px-4 py-2 text-sm text-gray-700">{cat.id}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{cat.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{cat.total}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{cat.created}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
