import { useState } from "react";
import { ExtraOptionsStep } from "./ExtraOptionStep";
import { PricingInventoryStep } from "./PricingInventoryStep";
import { UploadPhotoStep } from "./UploadPhotoStep";
import { Button } from "@/components/ui/button";
import { ProductInformationStep } from "./ProductInformationSte";

const NewListingStepsContainer = () => {
  const [formData, setFormData] = useState<{
    images: File[];
    title: string;
    description: string;
    tags: string;
    price: string;
    quantity: string;
    hasVariants: boolean;
  }>({
    images: [],
    title: "",
    description: "",
    tags: "",
    price: "",
    quantity: "",
    hasVariants: false,
  });

  return (
    <div className="">
      <div className="max-w-6xl mx-auto space-y-6 grid">

        {/* ---- IMAGE UPLOAD ---- */}
        <UploadPhotoStep
          onFilesSelect={(files: File[]) =>
            setFormData((prev) => ({
              ...prev,
              images: files, // update entire array of images
            }))
          }
          onFileRemove={(index: number) =>
            setFormData((prev) => ({
              ...prev,
              images: prev.images.filter((_, i) => i !== index),
            }))
          }
          selectedFiles={formData.images} // prefill existing images if any
        />

        {/* ---- PRODUCT INFORMATION ---- */}
        <ProductInformationStep
          title={formData.title}
          description={formData.description}
          tags={formData.tags}
          onTitleChange={(value: string) =>
            setFormData((prev) => ({ ...prev, title: value }))
          }
          onDescriptionChange={(value: string) =>
            setFormData((prev) => ({ ...prev, description: value }))
          }
          onTagsChange={(value: string) =>
            setFormData((prev) => ({ ...prev, tags: value }))
          }
        />

        {/* ---- PRICING & INVENTORY ---- */}
        <PricingInventoryStep
          price={formData.price}
          quantity={formData.quantity}
          onPriceChange={(value: string) =>
            setFormData((prev) => ({ ...prev, price: value }))
          }
          onQuantityChange={(value: string) =>
            setFormData((prev) => ({ ...prev, quantity: value }))
          }
        />

        {/* ---- EXTRA OPTIONS ---- */}
        <ExtraOptionsStep
          hasVariants={formData.hasVariants}
          onVariantsToggle={(value: boolean) =>
            setFormData((prev) => ({ ...prev, hasVariants: value }))
          }
        />

        <Button
        
          type="submit"
          className="px-10 py-6 my-10 place-self-center text-lg"
        >
          Submit for Approval
        </Button>
      </div>
    </div>
  );
};

export default NewListingStepsContainer;
