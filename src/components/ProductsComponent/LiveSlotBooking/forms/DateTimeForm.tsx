import { Dispatch, SetStateAction } from "react";
import { formDataType } from "./LiveBookingSlotForm";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type Props = {
  formData: formDataType;
  setFormData: Dispatch<SetStateAction<formDataType>>;
};

const DateTimeForm = ({ formData, setFormData }: Props) => {
  const durationsValue = [
    { value: "15", label: "15 mins" },
    { value: "30", label: "30 mins" },
    { value: "45", label: "45 mins" },
    { value: "60", label: "1 hour" },
  ];

  return (
    <div className="border p-3 border-gray-300 space-y-3 rounded-md">
      <div className="flex gap-2 w-full">
        <div className="flex-1 space-y-1">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>

        <div className="flex-1 space-y-1">
          <Label htmlFor="time">Time</Label>
          <Input
            id="time"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          />
        </div>

        <div className="space-y-1">
          <Label>Duration</Label>
          <Select
            value={formData.duration ? String(formData.duration) : undefined}
            onValueChange={(v) =>
              setFormData({ ...formData, duration: Number(v) })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {durationsValue.map((d) => (
                  <SelectItem
                    key={d.value}
                    value={d.value}
                  >
                    {d.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* DURATION */}
    </div>
  );
};

export default DateTimeForm;
