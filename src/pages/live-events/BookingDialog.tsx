import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { LiveEvent } from "../Live";
import { useBookLiveEventMutation } from "@/store/services/liveStreamApi";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
  event: LiveEvent | null;
}

const BookingDialog = ({ open, onClose, event }: Props) => {
  const [bookLiveEvent, { isLoading }] = useBookLiveEventMutation();

  if (!event) return null;

  const handleBooking = async () => {


    const loadingToast = toast.loading("Processing your booking...");

    try {
      const res = await bookLiveEvent(event._id).unwrap();
      console.log("🚀 ~ handleBooking ~ res:", res)
      const stripeUrl = res.data.stripeUrl;

      toast.success("Redirecting to payment...", {
        id: loadingToast,
      });

      if (stripeUrl) window.location.href = stripeUrl;

      onClose();
    } catch {
      toast.error("Booking failed. Please try again.", {
        id: loadingToast,
      });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={!isLoading ? onClose : undefined}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Confirm Purchase
          </DialogTitle>
          <DialogDescription className="text-sm">
            Review your booking details before continuing.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div className="rounded-md border p-4 bg-muted/30">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Title</span>
              <span className="font-medium">{event.title}</span>
            </div>

            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Starts</span>
              <span className="font-medium">
                {format(new Date(event.startAt), "PPp")}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Access Fee</span>
              <span className="font-semibold text-primary">
                {event.accessFee} USD
              </span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            You will be redirected to a secure checkout page to complete the
            payment.
          </p>
        </div>

        <DialogFooter className="mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>

          <Button
            onClick={handleBooking}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Confirm Purchase"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
