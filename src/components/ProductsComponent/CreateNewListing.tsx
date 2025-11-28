/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar as CalendarIcon,
  Plus,
  CheckCircle2,
  ImagePlus,
  Loader2,
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
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { cn, combineDateAndTime } from "@/lib/utils";

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

// Zod schema for validation
const schema = z.object({
  date: z.date({ error: "Date is required" }),
  time: z.string().min(1, "Time is required"),
  duration: z.number().min(1, "Duration is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  paymentMethod: z.string().min(1, "Payment method is required"),
  accessFee: z
    .number()
    .optional()
    .refine((val) => {
      if (!val) return true;
      return val >= 0;
    }, "Access fee must be a non-negative number"),
});

// const promoOptions = [
//   {
//     id: "homepage",
//     label: "Homepage Feature",
//     desc: "Featured on homepage",
//     price: 25,
//   },
//   {
//     id: "email",
//     label: "Email Blast",
//     desc: "Notify all subscribers",
//     price: 20,
//   },
//   {
//     id: "buyer",
//     label: "Buyer Notifications",
//     desc: "Push to interested buyers",
//     price: 10,
//   },
// ];

type FormValues = z.infer<typeof schema>;

const CreateNewListing = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [step, setStep] = useState(1);
  // const [selectedPromos, setSelectedPromos] = useState<string[]>([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const [createLiveStream, { isLoading }] = useCreateLiveStreamMutation();

  const liveSlotFee = 150;
  // const selectedPromoTotal = promoOptions
  //   .filter((p) => selectedPromos.includes(p.id))
  //   .reduce((acc, curr) => acc + curr.price, 0);
  // const totalCost = liveSlotFee + selectedPromoTotal;

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

  const {
    control,
    register,
    watch,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      date: undefined,
      time: "",
      duration: undefined,
      title: "",
      description: "",
      paymentMethod: "**** **** **** 4242 (Visa)",
    },
    mode: "onBlur",
  });

  const currentValues = watch();

  const handleNext = async () => {
    let valid = false;
    if (step === 1) valid = await trigger(["date", "time", "duration"]);
    else if (step === 2) valid = await trigger(["title", "description"]);
    else if (step === 4) valid = await trigger(["paymentMethod"]);
    else valid = true;

    if (valid) setStep(step + 1);
  };

  const handlePrevious = () => setStep(step - 1);

  const handleLiveStream = async () => {
    // Early exit if validation fails
    const isValid = await trigger();
    if (!isValid) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!image) {
      toast.error("Thumbnail is required");
      return;
    }

    // Show loading toast
    const loadingToastId = toast.loading("Processing your live stream...");

    try {
      const formData = new FormData();
      formData.append("title", currentValues.title);
      formData.append("description", currentValues.description);
      const startAt = combineDateAndTime(
        currentValues.date,
        currentValues.time
      );
      formData.append("startAt", startAt);
      formData.append("durationMinutes", currentValues.duration.toString());
      // formData.append("promos", JSON.stringify(selectedPromos));
      formData.append("paymentMethod", currentValues.paymentMethod);
      formData.append("thumbnail", image);
      formData.append("totalCost", liveSlotFee.toString());

      if (currentValues.accessFee) {
        formData.append("accessFee", currentValues.accessFee.toString());
      }

      const res = await createLiveStream(formData).unwrap();

      if (res.success) {
        toast.success("Redirecting to payment...", { id: loadingToastId });
        window.location.replace(res.data.stripeUrl);
        return;
      }

      // If API returned success: false
      toast.error("Failed to create live stream", { id: loadingToastId });
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create live stream", {
        id: loadingToastId,
      });
      console.error("Create live stream failed:", err);
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

          {step === 1 && (
            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Date Picker */}
                <div className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${
                          !currentValues.date ? "text-muted-foreground" : ""
                        }`}
                        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {currentValues.date ? (
                          format(currentValues.date, "PPP")
                        ) : (
                          <span>Select Date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    {isCalendarOpen && (
                      <PopoverContent className="p-0">
                        <Controller
                          control={control}
                          name="date"
                          render={({ field }) => (
                            <Calendar
                              selected={field.value}
                              onSelect={field.onChange}
                              closePopover={() => setIsCalendarOpen(false)}
                            />
                          )}
                        />
                      </PopoverContent>
                    )}
                  </Popover>
                  {/* Inline error (better UI) */}
                  {errors.date && (
                    <span className="mt-1 text-red-700 text-sm font-medium">
                      {errors.date.message}
                    </span>
                  )}
                </div>

                {/* Time Picker */}
                <div className="flex flex-col">
                  <Controller
                    control={control}
                    name="time"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
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
                    )}
                  />
                  {errors.time && (
                    <span className="mt-1 text-red-700 text-sm font-medium">
                      {errors.time.message}
                    </span>
                  )}
                </div>

                {/* Duration Picker */}
                <div className="flex flex-col">
                  <Controller
                    control={control}
                    name="duration"
                    render={({ field }) => (
                      <Select
                        value={field.value?.toString()}
                        onValueChange={(v) => field.onChange(parseInt(v))}
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
                    )}
                  />
                  {errors.duration && (
                    <span className="mt-1 text-red-700 text-sm font-medium">
                      {errors.duration.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}

          {step === 2 && (
            <div className="space-y-6 mt-4">
              {/* Event Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  placeholder="Enter event title"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-red-600 text-sm">{errors.title.message}</p>
                )}
              </div>

              {/* Event Description */}
              <div className="flex flex-col gap-3 mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Description
                </label>
                <textarea
                  className="w-full border rounded p-2"
                  placeholder="Enter event description"
                  rows={4}
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-red-600 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>
              {/* Access Fee */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Access Fee ($)
                </label>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  placeholder="Enter amount viewers will pay"
                  className="w-full border rounded p-2"
                  {...register("accessFee", {
                    valueAsNumber: true,
                    required: false,
                    validate: (value) => {
                      // value can be: undefined | NaN | number

                      if (value === undefined || isNaN(value)) {
                        return true; // optional → empty allowed
                      }

                      return value > 0 || "Fee must be positive";
                    },
                  })}
                />
                {errors.accessFee && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.accessFee.message}
                  </p>
                )}
              </div>
              {/* Thumbnail Upload */}
              <div>
                <p className="text-sm font-medium text-gray-700">Thumbnail</p>{" "}
                {/* Hidden file input */}{" "}
                <Input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="imageUpload"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border rounded shadow-sm text-gray-700 cursor-pointer hover:bg-gray-100 transition"
                >
                  {" "}
                  <ImagePlus
                    className="h-5 w-5 text-gray-600"
                    strokeWidth={2}
                  />{" "}
                  Upload Thumbnail{" "}
                </label>
                <p className="text-xs text-gray-500 -mt-1 ml-1">
                  Add a thumbnail for your event (required){" "}
                </p>
                {preview && (
                  <div className="mt-2">
                    <img
                      src={preview}
                      alt="Thumbnail Preview"
                      className="h-32 w-32 rounded-lg border object-cover shadow-sm"
                    />{" "}
                  </div>
                )}
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
                {/* {promoOptions.map((opt) => (
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
                ))} */}
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
                {/* {promoOptions
                  .filter((p) => selectedPromos.includes(p.id))
                  .map((p) => (
                    <div
                      key={p.id}
                      className="flex justify-between text-gray-700"
                    >
                      <p>{p.label}</p>
                      <p>${p.price}</p>
                    </div>
                  ))} */}
                <hr />
                <div className="flex justify-between font-semibold text-gray-900">
                  <p>Total Cost</p>
                  <p>${liveSlotFee}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Payment Method
                </label>
                <Controller
                  control={control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
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
                  )}
                />
                {errors.paymentMethod && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.paymentMethod.message}
                  </p>
                )}
              </div>
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
                Your live slot has been successfully booked. We'll send
                confirmation shortly.
              </p>
            </div>
          )}

          {/* FOOTER */}
          {step < 5 && (
            <DialogFooter className="mt-6 flex justify-between items-center">
              {/* Back button on the left */}
              {step > 1 ? (
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                >
                  Back
                </Button>
              ) : (
                <div />
              )}

              {/* Cancel + Next/Submit on the right */}
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={step === 4 ? handleLiveStream : handleNext}
                  disabled={step === 4 ? isLoading : false} // disable only during submission
                  className={cn(
                    "flex items-center justify-center gap-2",
                    step === 4 ? "bg-[#D82479] hover:bg-[#c41f6d]" : ""
                  )}
                >
                  {step === 4 && isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : step === 4 ? (
                    "Submit Booking"
                  ) : (
                    "Next Step"
                  )}
                </Button>
              </div>
            </DialogFooter>
          )}

          {step === 5 && (
            <div className="mt-8 flex justify-center">
              <Button
                onClick={() => {
                  setStep(1);
                  setIsDialogOpen(false);
                }}
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
