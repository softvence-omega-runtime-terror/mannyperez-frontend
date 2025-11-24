import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const SuccessModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog
      open={open}
      onOpenChange={onClose}
    >
      <DialogContent className="max-w-md text-center py-10">
        <div className="flex justify-center mb-4">
          <CheckCircle className="text-green-500 w-12 h-12" />
        </div>

        <DialogHeader>
          <h2 className="text-xl font-semibold">Booking Submitted!</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Your live slot booking request has been submitted. You'll be
            notified once approved.
          </p>
        </DialogHeader>

        <Button
          className="mt-6 w-full"
          onClick={onClose}
        >
          Got It
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
