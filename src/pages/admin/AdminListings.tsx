import React from "react";

export default function AdminListings() {
  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Listings</h2>
        <p className="text-sm text-gray-500">Manage all product listings</p>
      </div>

      {/* SEARCH + FILTERS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

        {/* Search */}
        <input
          type="text"
          placeholder="Search listings..."
          className="w-full md:w-72 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
        />

        {/* Filters */}
        <div className="flex items-center gap-3">
          <select className="px-3 py-2 border rounded-lg text-sm">
            <option>All Categories</option>
            <option>DTF</option>
            <option>Stickers</option>
            <option>Electronics</option>
          </select>

          <select className="px-3 py-2 border rounded-lg text-sm">
            <option>All Status</option>
            <option>Draft</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      {/* LISTINGS TABLE */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-600">
                Product
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">
                Seller
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">
                Category
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">
                Status
              </th>
              <th className="px-4 py-3 text-right font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">

            {[
              {
                title: "Wireless Bluetooth Headphones",
                seller: "Rahim Tech",
                category: "Electronics",
                status: "Active",
                img: "/dummy/product1.jpg",
              },
              {
                title: "Holographic Sticker Sheet",
                seller: "Vinyl Master",
                category: "Stickers",
                status: "Pending",
                img: "/dummy/product2.jpg",
              },
              {
                title: "DTF Custom Print",
                seller: "Printify",
                category: "DTF",
                status: "Draft",
                img: "/dummy/product3.jpg",
              },
            ].map((item, i) => (
              <tr key={i}>
                {/* PRODUCT + IMAGE */}
                <td className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={item.img}
                    alt="product"
                    className="w-12 h-12 rounded-md object-cover border"
                  />
                  <div className="font-medium text-gray-800">
                    {item.title}
                  </div>
                </td>

                <td className="px-4 py-3 text-gray-600">{item.seller}</td>
                <td className="px-4 py-3 text-gray-600">{item.category}</td>

                <td className="px-4 py-3">
                  {item.status === "Active" && (
                    <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                      Active
                    </span>
                  )}
                  {item.status === "Pending" && (
                    <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-700">
                      Pending
                    </span>
                  )}
                  {item.status === "Draft" && (
                    <span className="px-2 py-1 text-xs rounded bg-gray-200 text-gray-600">
                      Draft
                    </span>
                  )}
                  {item.status === "Rejected" && (
                    <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-700">
                      Rejected
                    </span>
                  )}
                </td>

                <td className="px-4 py-3 text-right">
                  <button className="px-3 py-1 text-xs border rounded-md hover:bg-gray-50">
                    View
                  </button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-500">Showing 1–3 of 3 listings</p>

        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded-md text-sm hover:bg-gray-50">
            Prev
          </button>
          <button className="px-3 py-1 border rounded-md text-sm hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
