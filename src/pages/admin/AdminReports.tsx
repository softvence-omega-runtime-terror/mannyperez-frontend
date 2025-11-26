import React from "react";

export default function AdminReports() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Reports</h1>

      {/* Reports Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
          <h3 className="text-sm text-gray-500">Total Users</h3>
          <p className="text-2xl font-bold mt-2">1,245</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
          <h3 className="text-sm text-gray-500">Total Listings</h3>
          <p className="text-2xl font-bold mt-2">342</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
          <h3 className="text-sm text-gray-500">Incidents Reported</h3>
          <p className="text-2xl font-bold mt-2">17</p>
        </div>
      </div>

      {/* Detailed Reports Table */}
      <div className="bg-white rounded-lg shadow border border-gray-100 p-4">
        <h2 className="text-lg font-semibold mb-4">Recent Reports</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Report ID</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Created By</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { id: "RPT-001", type: "User Report", status: "Open", createdBy: "John Doe", date: "2025-11-25" },
                { id: "RPT-002", type: "Listing Issue", status: "Resolved", createdBy: "Jane Smith", date: "2025-11-24" },
                { id: "RPT-003", type: "Payment Issue", status: "Pending", createdBy: "Admin", date: "2025-11-23" },
              ].map((report) => (
                <tr key={report.id}>
                  <td className="px-4 py-2 text-sm text-gray-700">{report.id}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{report.type}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{report.status}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{report.createdBy}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{report.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
