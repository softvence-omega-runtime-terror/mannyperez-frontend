import React, { useState } from "react";
import { useGetAllUsersQuery } from "@/store/services/admin/allUsers";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";

export default function AdminUsers() {
const [page, setPage] = useState(1);
const [search, setSearch] = useState("");
const [roleFilter, setRoleFilter] = useState("All Roles");
const [statusFilter, setStatusFilter] = useState("All Status");
const [selectedUser, setSelectedUser] = useState<any>(null);
const [isModalOpen, setIsModalOpen] = useState(false);

const { data: userData, isLoading } = useGetAllUsersQuery({ page } as any);
const users = userData?.data || [];

const filteredUsers = users.filter((u: any) => {
const matchesSearch =
u.name?.toLowerCase().includes(search.toLowerCase()) ||
u.fullName?.toLowerCase().includes(search.toLowerCase()) ||
u.email?.toLowerCase().includes(search.toLowerCase());


const matchesRole = roleFilter === "All Roles" || u.role === roleFilter.toLowerCase();
const matchesStatus =
  statusFilter === "All Status" ||
  (statusFilter === "Active" && u.isVerified && !u.isBlocked) ||
  (statusFilter === "Pending" && !u.isVerified) ||
  (statusFilter === "Suspended" && u.isBlocked);

return matchesSearch && matchesRole && matchesStatus;


});

const openModal = (user: any) => {
setSelectedUser(user);
setIsModalOpen(true);
};

const closeModal = () => {
setSelectedUser(null);
setIsModalOpen(false);
};

const totalUsers = userData?.total || users.length;
const totalPages = Math.ceil(totalUsers / 10);

if (isLoading) {
return ( <div className="space-y-6"> <h2 className="text-2xl font-semibold text-gray-800">Users</h2> <div className="grid gap-4">
{[...Array(5)].map((_, i) => ( <div key={i} className="h-12 bg-gray-200 animate-pulse rounded"></div>
))} </div> </div>
);
}

return ( <div className="space-y-6"> <div> <h2 className="text-2xl font-semibold text-gray-800">Users</h2> <p className="text-sm text-gray-500">Manage all platform users</p> </div>


  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
    <input
      type="text"
      placeholder="Search users..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full md:w-72 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
    />
    <div className="flex items-center gap-3">
      <select
        className="px-3 py-2 border rounded-lg text-sm"
        value={roleFilter}
        onChange={(e) => setRoleFilter(e.target.value)}
      >
        <option>All Roles</option>
        <option>Buyer</option>
        <option>Seller</option>
        <option>Admin</option>
      </select>
      <select
        className="px-3 py-2 border rounded-lg text-sm"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option>All Status</option>
        <option>Active</option>
        <option>Suspended</option>
        <option>Pending</option>
      </select>
    </div>
  </div>

  <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
    <table className="min-w-full text-sm">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-3 text-left font-medium text-gray-600">User</th>
          <th className="px-4 py-3 text-left font-medium text-gray-600">Email</th>
          <th className="px-4 py-3 text-left font-medium text-gray-600">Role</th>
          <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
          <th className="px-4 py-3 text-right font-medium text-gray-600">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {filteredUsers.map((user: any) => (
          <tr key={user._id}>
            <td className="px-4 py-3 flex items-center gap-3">
              <img
                src={user.img || "/placeholder-user.png"}
                alt={user.name || user.fullName}
                className="w-10 h-10 rounded-lg object-cover"
              />
              <span className="font-medium text-gray-800">{user.name || user.fullName}</span>
            </td>
            <td className="px-4 py-3 text-gray-600">{user.email || "N/A"}</td>
            <td className="px-4 py-3 text-gray-600">{user.role}</td>
            <td className="px-4 py-3">
              {user.isDeleted ? (
                <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-700">Deleted</span>
              ) : user.isBlocked ? (
                <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-700">Suspended</span>
              ) : user.isVerified ? (
                <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">Active</span>
              ) : (
                <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-700">Pending</span>
              )}
            </td>
            <td className="px-4 py-3 text-right flex gap-2 justify-end">
              <Button size="sm" variant="outline" onClick={() => openModal(user)}>
                <Eye className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="destructive">
                <Trash2 className="w-4 h-4" />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <div className="flex items-center justify-between mt-4">
    <p className="text-sm text-gray-500">
      Showing {filteredUsers.length} of {totalUsers} users
    </p>
    <div className="flex gap-2">
      <Button size="sm" disabled={page === 1} onClick={() => setPage((p) => Math.max(p - 1, 1))}>Prev</Button>
      <Button size="sm" disabled={page === totalPages} onClick={() => setPage((p) => Math.min(p + 1, totalPages))}>Next</Button>
    </div>
  </div>

  <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>User Details</DialogTitle>
      </DialogHeader>

      {selectedUser && (
        <div className="mt-2 space-y-2 text-gray-700">
          <p><strong>Name:</strong> {selectedUser.name || selectedUser.fullName}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <p>
            <strong>Role:</strong>{" "}
            <select className="px-2 py-1 border rounded text-sm">
              <option>Buyer</option>
              <option>Seller</option>
              <option>Admin</option>
            </select>
          </p>
          <p><strong>Status:</strong> {selectedUser.isBlocked ? "Suspended" : selectedUser.isVerified ? "Active" : "Pending"}</p>
          <p><strong>Created At:</strong> {new Date(selectedUser.createdAt).toLocaleString()}</p>
        </div>
      )}

      <DialogFooter>
        <Button variant="outline" onClick={closeModal}>Close</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</div>


);
}
