import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DateTimeForm from "./DateTimeForm";
import TitleDescriptionForm from "./TitleDescriptionForm";
import PromoAddOnForm from "./PromoAddOnForm";
import PaymentForm from "./PaymentForm";
import { useCreateLiveStreamMutation } from "@/store/services/liveStreamApi";
import SuccessModal from "./SuccessModal";

export type formDataType = {
  date: string;
  time: string;
  duration: number;
  title: string;
  description: string;
  promoAddOn: string[];
};

export default function LiveBookingSlotForm({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [formData, setFormData] = useState<formDataType>({
    date: new Date().toString(),
    time: "",
    duration: 0,
    title: "",
    description: "",
    promoAddOn: [],
  });

  const [step, setStep] = useState(1);
  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const [addLiveStream] = useCreateLiveStreamMutation();

  const startAt = new Date(`${formData.date} ${formData.time}`).toISOString();

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleAddLiveStream = async () => {
    try {
      const res = await addLiveStream({
        title: formData.title,
        description: formData.description,
        startAt,
        durationMinutes: formData.duration,
        status: "scheduled",
        promotionAddons: formData.promoAddOn,
        paymentStatus: "pending",
      }).unwrap();

      console.log(res);

      if (res.success) {
        setShowSuccessModal(true);
        setFormData({
          date: new Date().toString(),
          time: "",
          duration: 0,
          title: "",
          description: "",
          promoAddOn: [],
        });
        // onOpenChange(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={onOpenChange}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Book Live Slot</DialogTitle>
            <DialogDescription>
              Schedule your live selling session. Buyers will join through
              marketplace live events.
            </DialogDescription>
          </DialogHeader>

          {/* STEP 1 */}
          {step === 1 && (
            <DateTimeForm
              formData={formData}
              setFormData={setFormData}
            />
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <TitleDescriptionForm
              formData={formData}
              setFormData={setFormData}
            />
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <PromoAddOnForm
              formData={formData}
              setFormData={setFormData}
            />
          )}

          {
            // STEP 4
            step === 4 && <PaymentForm />
          }

          <DialogFooter className="flex justify-between w-full">
            <div>
              {step > 1 && (
                <Button
                  variant="ghost"
                  onClick={back}
                >
                  Back
                </Button>
              )}
            </div>
            <div>
              {step < 3 && <Button onClick={next}>Next</Button>}
              {step === 3 && (
                <Button
                  onClick={handleAddLiveStream}
                  type="button"
                >
                  Submit
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <SuccessModal
        open={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          onOpenChange(false);
        }}
      />
    </>
  );
}
