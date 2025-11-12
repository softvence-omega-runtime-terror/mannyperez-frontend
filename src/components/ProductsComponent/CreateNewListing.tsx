/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar as CalendarIcon,
  Plus,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useCreateLiveStreamMutation } from "@/store/services/liveStreamApi";

// Popover wrappers
const Popover = ({ children }: any) => (
  <div className="relative">{children}</div>
);
const PopoverTrigger = ({ children }: any) => <>{children}</>;
const PopoverContent = ({ children, className }: any) => (
  <div
    className={`absolute z-50 mt-2 bg-white shadow-md rounded-lg ${className}`}
  >
    {children}
  </div>
);

type InlineCalendarProps = {
  selected?: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  closePopover?: () => void;
};

const Calendar = ({
  selected,
  onSelect,
  closePopover,
}: InlineCalendarProps) => (
  <div className="p-2">
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={(date) => {
        onSelect(date || undefined);
        if (closePopover) closePopover();
      }}
    />
  </div>
);

const generateTimeOptions = () => {
  const times: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 5) {
      const hour12 = h % 12 === 0 ? 12 : h % 12;
      const ampm = h < 12 ? "AM" : "PM";
      const min = m.toString().padStart(2, "0");
      times.push(`${hour12}:${min} ${ampm}`);
    }
  }
  return times;
};

const generateDurationOptions = () =>
  Array.from({ length: 12 }, (_, i) => (i + 1) * 5);

const CreateNewListing = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");

  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string | undefined>();
  const [duration, setDuration] = useState<number | undefined>();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [selectedPromos, setSelectedPromos] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<string>(
    "**** **** **** 4242 (Visa)"
  );

  const [createLiveStream] = useCreateLiveStreamMutation();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const promoOptions = [
    {
      id: "homepage",
      label: "Homepage Feature",
      desc: "Featured on homepage",
      price: 25,
    },
    {
      id: "email",
      label: "Email Blast",
      desc: "Notify all subscribers",
      price: 20,
    },
    {
      id: "buyer",
      label: "Buyer Notifications",
      desc: "Push to interested buyers",
      price: 10,
    },
  ];

  const liveSlotFee = 150;
  const selectedPromoTotal = promoOptions
    .filter((p) => selectedPromos.includes(p.id))
    .reduce((acc, curr) => acc + curr.price, 0);
  const totalCost = liveSlotFee + selectedPromoTotal;

  const actions = [
    {
      id: 1,
      icon: Plus,
      iconBg: "bg-[#D82479]",
      title: "Create New Listing",
      description: "Add products with proof photos",
      onClick: () => navigate("/new-listing"),
    },
    {
      id: 2,
      icon: CalendarIcon,
      iconBg: "bg-[#229ECF]",
      title: "Book Live Slot",
      description: "Schedule live selling session",
      onClick: () => setIsDialogOpen(true),
    },
  ];

  const handleNext = () => {
    setErrorMsg("");
    if (step < 5) setStep(step + 1);
  };

  const handlePrevious = () => {
    setErrorMsg("");
    if (step > 1) setStep(step - 1);
  };

  const handleDone = () => {
    setStep(1);
    setIsDialogOpen(false);
    setErrorMsg("");
  };

  const handleLiveStream = async () => {
    setErrorMsg("");
    if (!date || !time || !duration || !title || !description) {
      setErrorMsg("All fields are required before submitting.");
      return;
    }

    const payload = {
      title,
      description,
      startAt: date.toISOString(),
      time,
      durationMinutes: duration,
      promos: selectedPromos,
      paymentMethod,
      totalCost,
    };

    try {
      await createLiveStream(payload).unwrap();
      setStep(5);
    } catch (err: any) {
      console.error("Create live stream failed:", err);
      setErrorMsg(
        err?.data?.message || "Failed to create live stream. Try again."
      );
    }
  };

  return (
    <>
      <div className="lg:flex space-y-6 lg:space-y-0 gap-6 w-full">
        {actions.map((item) => (
          <div
            key={item.id}
            onClick={item.onClick}
            className="cursor-pointer flex-1 border w-full px-8 py-16 rounded-2xl grid place-content-center place-items-center bg-white hover:shadow-md transition"
          >
            <div
              className={`size-14 rounded-full mb-8 ${item.iconBg} grid place-items-center`}
            >
              <item.icon className="text-white" />
            </div>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        ))}
      </div>

      <Dialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      >
        <DialogContent className="sm:max-w-2xl w-full">
          <DialogHeader>
            <DialogTitle>Book Live Slot</DialogTitle>
            <DialogDescription>
              Schedule your live selling session. Buyers will join through
              marketplace live events.
            </DialogDescription>
          </DialogHeader>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${
                        !date ? "text-muted-foreground" : ""
                      }`}
                      onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Select Date</span>}
                    </Button>
                  </PopoverTrigger>
                  {isCalendarOpen && (
                    <PopoverContent className="p-0">
                      <Calendar
                        selected={date}
                        onSelect={setDate}
                        closePopover={() => setIsCalendarOpen(false)}
                      />
                    </PopoverContent>
                  )}
                </Popover>

                <Select
                  value={time}
                  onValueChange={setTime}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose Time" />
                  </SelectTrigger>
                  <SelectContent>
                    {generateTimeOptions().map((t) => (
                      <SelectItem
                        key={t}
                        value={t}
                      >
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={duration?.toString()}
                  onValueChange={(v) => setDuration(parseInt(v))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {generateDurationOptions().map((d) => (
                      <SelectItem
                        key={d}
                        value={d.toString()}
                      >
                        {d} min
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-6 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  placeholder="Enter event title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Description
                </label>
                <textarea
                  className="w-full border rounded p-2"
                  placeholder="Enter event description"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-3">
                Select Promote Options
              </h4>
              <div className="space-y-3">
                {promoOptions.map((opt) => (
                  <div
                    key={opt.id}
                    className="flex justify-between items-center border rounded-lg p-4 hover:shadow-sm transition"
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={selectedPromos.includes(opt.id)}
                        onChange={() =>
                          setSelectedPromos((prev) =>
                            prev.includes(opt.id)
                              ? prev.filter((p) => p !== opt.id)
                              : [...prev, opt.id]
                          )
                        }
                        className="mt-1 size-4"
                      />
                      <div>
                        <p className="font-medium">{opt.label}</p>
                        <p className="text-gray-500 text-sm">{opt.desc}</p>
                      </div>
                    </div>
                    <p className="font-semibold">${opt.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="mt-4 space-y-6">
              <h4 className="text-lg font-semibold">Payment Summary</h4>
              <div className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <p>Live Slot Fee</p>
                  <p className="font-medium">${liveSlotFee}</p>
                </div>
                {promoOptions
                  .filter((p) => selectedPromos.includes(p.id))
                  .map((p) => (
                    <div
                      key={p.id}
                      className="flex justify-between text-gray-700"
                    >
                      <p>{p.label}</p>
                      <p>${p.price}</p>
                    </div>
                  ))}
                <hr />
                <div className="flex justify-between font-semibold text-gray-900">
                  <p>Total Cost</p>
                  <p>${totalCost}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Payment Method
                </label>
                <Select
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Payment Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="**** **** **** 4242 (Visa)">
                      **** **** **** 4242 (Visa)
                    </SelectItem>
                    <SelectItem value="**** **** **** 1111 (Mastercard)">
                      **** **** **** 1111 (Mastercard)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {errorMsg && (
                <div className="flex items-center text-red-600 text-sm mt-2">
                  <XCircle className="h-4 w-4 mr-1" />
                  {errorMsg}
                </div>
              )}
            </div>
          )}

          {/* STEP 5 SUCCESS */}
          {step === 5 && (
            <div className="text-center py-12">
              <CheckCircle2
                className="mx-auto mb-4 text-green-500"
                size={60}
              />
              <h3 className="text-2xl font-semibold mb-2">
                Booking Confirmed!
              </h3>
              <p className="text-gray-600">
                Your live slot has been successfully booked. We’ll send
                confirmation shortly.
              </p>
            </div>
          )}

          {/* FOOTER */}
          {step < 5 && (
            <DialogFooter className="mt-6 flex justify-between">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                >
                  Back
                </Button>
              )}
              <div className="ml-auto space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() =>
                    step === 4 ? handleLiveStream() : handleNext()
                  }
                  className={
                    step === 4 ? "bg-[#D82479] hover:bg-[#c41f6d]" : ""
                  }
                >
                  {step === 4 ? "Submit Booking" : "Next Step"}
                </Button>
              </div>
            </DialogFooter>
          )}

          {step === 5 && (
            <div className="mt-8 flex justify-center">
              <Button
                onClick={handleDone}
                className="bg-[#D82479] hover:bg-[#c41f6d]"
              >
                Done
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateNewListing;
