export default function AdminPayout() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Payout Management</h1>

      <div className="bg-white shadow rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold mb-2">Overview</h2>
        <p className="text-gray-600 text-sm">
          Manage seller payouts, pending withdrawals, and transaction history.
        </p>
      </div>

      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Pending Payouts</h2>
        <div className="border rounded-lg p-4 text-center text-gray-500 text-sm">
          No pending payout requests.
        </div>
      </div>
    </div>
  );
}
