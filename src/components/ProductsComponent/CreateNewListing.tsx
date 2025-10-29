import { Plus } from "lucide-react";

import { NavLink } from "react-router-dom";
import LiveSlotBookingButton from "./LiveSlotBooking/LiveSlotBookingButton";

const CreateNewListing = () => {
  return (
    <div className="lg:flex space-y-6 lg:space-y-0 gap-6 w-full">
      {/* --- Card 1 : Listing --- */}
      <NavLink
        to="/new-listing"
        className="flex-1"
      >
        <div className="border w-full px-8 py-16 rounded-2xl grid place-content-center place-items-center bg-white">
          <div className="size-14 rounded-full mb-8 bg-[#D82479] grid place-items-center">
            <Plus className="text-white" />
          </div>
          <h3>Create New Listing</h3>
          <p>Add products with proof photos</p>
        </div>
      </NavLink>

      {/* --- Card 2 : Live Booking (button, not link) --- */}
      <LiveSlotBookingButton />
    </div>
  );
};

export default CreateNewListing;
