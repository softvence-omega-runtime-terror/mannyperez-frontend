import React from "react";

export default function AdminIncidents() {
  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Incident Reports</h2>
        <p className="text-sm text-gray-500">
          Manage user complaints, reports & violations
        </p>
      </div>

      {/* SEARCH + FILTERS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

        {/* Search */}
        <input
          type="text"
          placeholder="Search incidents..."
          className="w-full md:w-72 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
        />

        {/* Filters */}
        <div className="flex items-center gap-3">
          <select className="px-3 py-2 border rounded-lg text-sm">
            <option>All Priorities</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <select className="px-3 py-2 border rounded-lg text-sm">
            <option>All Status</option>
            <option>Open</option>
            <option>Investigating</option>
            <option>Resolved</option>
            <option>Dismissed</option>
          </select>
        </div>
      </div>

      {/* INCIDENTS TABLE */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-600">
                Incident
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">
                Reporter
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">
                Priority
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
                title: "Scam listing reported",
                reporter: "johndoe32",
                priority: "High",
                status: "Open",
              },
              {
                title: "Fake product claimed",
                reporter: "creative_seller",
                priority: "Medium",
                status: "Investigating",
              },
              {
                title: "Harassment in messages",
                reporter: "buyer_rahim",
                priority: "High",
                status: "Resolved",
              },
              {
                title: "Incorrect category",
                reporter: "vinyl_master",
                priority: "Low",
                status: "Dismissed",
              },
            ].map((item, i) => (
              <tr key={i}>
                {/* INCIDENT TITLE */}
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-800">{item.title}</div>
                  <div className="text-xs text-gray-500">ID: INC-00{i + 1}</div>
                </td>

                {/* REPORTER */}
                <td className="px-4 py-3 text-gray-700">{item.reporter}</td>

                {/* PRIORITY BADGES */}
                <td className="px-4 py-3">
                  {item.priority === "High" && (
                    <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-700">
                      High
                    </span>
                  )}
                  {item.priority === "Medium" && (
                    <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-700">
                      Medium
                    </span>
                  )}
                  {item.priority === "Low" && (
                    <span className="px-2 py-1 text-xs rounded bg-gray-200 text-gray-700">
                      Low
                    </span>
                  )}
                </td>

                {/* STATUS BADGES */}
                <td className="px-4 py-3">
                  {item.status === "Open" && (
                    <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
                      Open
                    </span>
                  )}
                  {item.status === "Investigating" && (
                    <span className="px-2 py-1 text-xs rounded bg-purple-100 text-purple-700">
                      Investigating
                    </span>
                  )}
                  {item.status === "Resolved" && (
                    <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                      Resolved
                    </span>
                  )}
                  {item.status === "Dismissed" && (
                    <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-600">
                      Dismissed
                    </span>
                  )}
                </td>

                {/* ACTIONS */}
                <td className="px-4 py-3 text-right">
                  <button className="px-3 py-1 text-xs border rounded-md hover:bg-gray-50 mr-2">
                    View
                  </button>
                  <button className="px-3 py-1 text-xs border rounded-md hover:bg-gray-50">
                    Resolve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-500">Showing 1–4 of 4 incidents</p>

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
