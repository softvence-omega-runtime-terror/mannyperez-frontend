import { Calendar } from "lucide-react";
import React, { useState } from "react";
import LiveBookingSlotForm from "./forms/LiveBookingSlotForm";

const LiveSlotBookingButton = () => {
  const [showLiveSlotBookingModal, setShowLiveSlotBookingModal] =
    useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setShowLiveSlotBookingModal(true)}
        className="flex-1"
      >
        <div className="border w-full px-8 py-16 rounded-2xl grid place-content-center place-items-center bg-white">
          <div className="size-14 rounded-full mb-8 bg-[#229ECF] grid place-items-center">
            <Calendar className="text-white" />
          </div>
          <h3>Book Live Slot</h3>
          <p>Schedule live selling session</p>
        </div>
      </button>

      {showLiveSlotBookingModal && (
        <LiveBookingSlotForm
          open={showLiveSlotBookingModal}
          onOpenChange={setShowLiveSlotBookingModal}
        />
      )}
    </>
  );
};

export default LiveSlotBookingButton;
