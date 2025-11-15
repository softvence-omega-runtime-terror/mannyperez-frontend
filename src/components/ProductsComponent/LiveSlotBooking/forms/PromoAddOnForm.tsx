import { Dispatch, SetStateAction } from "react";
import { formDataType } from "./LiveBookingSlotForm";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  formData: formDataType;
  setFormData: Dispatch<SetStateAction<formDataType>>;
};

const promoteOptions = [
  {
    id: "homepage-feature",
    title: "Homepage Feature",
    desc: "Featured prominently on marketplace homepage",
    price: 25,
  },
  {
    id: "email-blast",
    title: "Email Blast",
    desc: "Notify all marketplace subscribers",
    price: 20,
  },
  {
    id: "buyer-notification",
    title: "Buyer Notifications",
    desc: "Push notifications to interested buyers",
    price: 10,
  },
];

const PromoAddOnForm = ({ formData, setFormData }: Props) => {
  const toggle = (id: string) => {
    const exists = formData.promoAddOn.includes(id);

    setFormData({
      ...formData,
      promoAddOn: exists
        ? formData.promoAddOn.filter((x) => x !== id)
        : [...formData.promoAddOn, id],
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Select Promote Options</h3>

      {promoteOptions.map((opt) => (
        <Card
          key={opt.id}
          className="p-4 flex items-start justify-between hover:bg-muted/50 cursor-pointer"
          onClick={() => toggle(opt.id)}
        >
          <div className="flex gap-3">
            <Checkbox
              checked={formData.promoAddOn.includes(opt.id)}
              onCheckedChange={() => toggle(opt.id)}
            />
            <div>
              <p className="font-medium">{opt.title}</p>
              <p className="text-sm text-muted-foreground">{opt.desc}</p>
            </div>
          </div>

          <div className="text-lg font-semibold">${opt.price}</div>
        </Card>
      ))}
    </div>
  );
};

export default PromoAddOnForm;
