import { useState } from "react";
import { Eye, Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import Swal from "sweetalert2";
import { useGetAllPendingListingsQuery } from "@/store/services/admin/pendingLisitngApi";
import {
  IPendingProduct,
  useApproveOrRejectListingMutation,
} from "@/store/services/admin/approveRejectListinApi";

export default function AdminListings() {
  const { data, isLoading, isError } = useGetAllPendingListingsQuery({
    page: 1,
    limit: 10,
  });

  // ✅ FIX: TypeScript-safe casting
  const listings = (data?.products as unknown as IPendingProduct[]) || [];
  const meta = data?.meta;

  const [approveOrReject] = useApproveOrRejectListingMutation();

  const [selectedListing, setSelectedListing] = useState<IPendingProduct | null>(null);
  const [open, setOpen] = useState(false);

  // -----------------------------------
  // OPEN MODAL
  // -----------------------------------
  const openModal = (item: IPendingProduct) => {
    setSelectedListing(item);
    setOpen(true);
  };

  // -----------------------------------
  // APPROVE
  // -----------------------------------
  const handleApprove = async (id: string) => {
    const confirm = await Swal.fire({
      title: "Approve Listing?",
      text: "Are you sure you want to approve this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve",
    });

    if (!confirm.isConfirmed) return;

    try {
      await approveOrReject({
        productId: id,
        approvalStatus: true,
      }).unwrap();

      Swal.fire("Approved!", "Product has been approved.", "success");
    } catch (error: any) {
      Swal.fire("Error", error?.data?.message || "Failed to approve", "error");
    }
  };

  // -----------------------------------
  // REJECT
  // -----------------------------------
  const handleReject = async (id: string) => {
    const confirm = await Swal.fire({
      title: "Reject Listing?",
      text: "Provide a reason for rejection:",
      icon: "warning",
      input: "text",
      inputPlaceholder: "Enter rejection reason...",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Reject",
      preConfirm: (value) => {
        if (!value || value.trim() === "") {
          Swal.showValidationMessage("Rejection reason is required");
          return false;
        }
        return value;
      },
    });

    if (!confirm.isConfirmed) return;

    const rejectionReason = confirm.value;

    try {
      await approveOrReject({
        productId: id,
        approvalStatus: false,
        rejectionReason,
      }).unwrap();

      Swal.fire("Rejected!", "Product has been rejected.", "success");
    } catch (error: any) {
      Swal.fire("Error", error?.data?.message || "Failed to reject", "error");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Listings</h2>
        <p className="text-sm text-gray-500">Manage all product listings</p>
      </div>

      {isLoading && (
        <div className="text-center py-10 text-gray-500">Loading...</div>
      )}

      {isError && (
        <div className="text-center py-10 text-red-500">
          Failed to load listings.
        </div>
      )}

      {!isLoading && !isError && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Product Name</th>
                <th className="px-4 py-3">Seller ID</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {listings.map((item: IPendingProduct) => (
                <tr key={item._id}>
                  <td className="px-4 py-3">
                    <img
                      src={item.images?.[0] || "/dummy/no-image.png"}
                      alt="product"
                      className="w-12 h-12 rounded-md object-cover border"
                    />
                  </td>

                  <td className="px-4 py-3 font-medium text-gray-800">
                    {item.productInformation?.title}
                  </td>

                  <td className="px-4 py-3 text-gray-600">{item.sellerId}</td>

                  <td className="px-4 py-3 text-gray-600">
                    {item.productInformation?.category}
                  </td>

                  <td className="px-4 py-3 capitalize">{item.type}</td>

                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-700">
                      Pending
                    </span>
                  </td>

                  <td className="px-4 py-3 text-right flex justify-end gap-2">
                    <button
                      onClick={() => openModal(item)}
                      className="p-2 border rounded-md hover:bg-gray-50"
                    >
                      <Eye className="w-4 h-4 text-gray-700" />
                    </button>

                    <button
                      onClick={() => handleApprove(item._id)}
                      className="p-2 rounded-md bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Check className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleReject(item._id)}
                      className="p-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!isLoading && !isError && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-500">
            Showing {listings.length} of {meta?.total} listings
          </p>

          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded-md text-sm hover:bg-gray-50">
              Prev
            </button>
            <button className="px-3 py-1 border rounded-md text-sm hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {selectedListing?.productInformation?.title}
            </DialogTitle>
          </DialogHeader>

          {selectedListing && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {selectedListing.images?.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="product image"
                    className="rounded-lg object-cover w-full h-32 border"
                  />
                ))}
              </div>

              <div className="space-y-2">
                <p>
                  <strong>Category:</strong>{" "}
                  {selectedListing.productInformation?.category}
                </p>

                <p>
                  <strong>Type:</strong> {selectedListing.type}
                </p>

                <p>
                  <strong>Seller ID:</strong> {selectedListing.sellerId}
                </p>

                <p>
                  <strong>Description:</strong>{" "}
                  {selectedListing.productInformation?.description}
                </p>

                <p>
                  <strong>Tags:</strong>{" "}
                  {selectedListing.productInformation?.tags?.join(", ")}
                </p>

                <p>
                  <strong>Price:</strong> $
                  {selectedListing.pricingAndInventory?.[0]?.price}
                </p>

                <p>
                  <strong>Quantity:</strong>{" "}
                  {selectedListing.pricingAndInventory?.[0]?.quantity}
                </p>

                <p>
                  <strong>Created:</strong>{" "}
                  {new Date(selectedListing.createdAt).toLocaleString()}
                </p>

                <p>
                  <strong>Updated:</strong>{" "}
                  {new Date(selectedListing.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
