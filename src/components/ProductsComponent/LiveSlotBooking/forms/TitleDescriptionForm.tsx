import { Label } from "@/components/ui/label";
import { formDataType } from "./LiveBookingSlotForm";
import { Dispatch, SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  formData: formDataType;
  setFormData: Dispatch<SetStateAction<formDataType>>;
};

const TitleDescriptionForm = ({ formData, setFormData }: Props) => {
  return (
    <div className="flex flex-col  justify-center gap-4">
      <div className="">
        <Label htmlFor="title">Title</Label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="border placeholder:text-gray-300 border-gray-500 mt-2 w-full"
        />
      </div>
      <div className="">
        <Label htmlFor="description">Description</Label>
        <Textarea
          value={formData.description}
          className="border placeholder:text-gray-300 border-gray-500 w-full mt-2 "
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>
    </div>
  );
};

export default TitleDescriptionForm;
