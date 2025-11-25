import { useState } from "react";
import { ExtraOptionsStep } from "./ExtraOptionStep";
import { PricingInventoryStep } from "./PricingInventoryStep";
import { UploadPhotoStep } from "./UploadPhotoStep";
import { Button } from "@/components/ui/button";
import { ProductInformationStep } from "./ProductInformationSte";
import { useCreateProductMutation } from "@/store/services/productsApi";

const NewListingStepsContainer = () => {
  const [createProduct, { isLoading, isError, isSuccess }] = useCreateProductMutation();

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
  // Build FormData and submit the listing
  const handleSubmit = async (e?: any) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();

    try {
      // construct payload object expected by server
      const payload = {
        sellerId: "68f751a0cc24941364bd593f",
        type: "featured_post",
        productInformation: {
          title: formData.title,
          description: formData.description,
          tags: formData.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          // default category — replace if you collect category in UI
          category: "DTF",
        },
        pricingAndInventory: [
          {
            price: Number(parseFloat(formData.price) || 0),
            quantity: Number(parseInt(formData.quantity, 10) || 0),
          },
        ],
        // extra options: this example sends an empty array — update when you collect variants
        extraOptions: [],
      };

      const data = new FormData();

      // Append image files (server should accept multiple 'images' fields)
      formData.images.forEach((file) => {
        data.append("images", file);
      });

      // Append the JSON payload under the `data` field
      data.append("data", JSON.stringify(payload));

      const res = await createProduct({
        ...payload,
        userId: payload.sellerId,
      } as any).unwrap();

      if (res) {
        alert("Listing submitted successfully!");
        // Optionally reset form or redirect user
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while submitting the listing.");
    }
  };

  return (
    <div className="">
      <div className="max-w-6xl mx-auto space-y-6 grid mt-10">

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
          type="button"
          onClick={handleSubmit}
          className="px-10 py-6 my-10 place-self-center text-lg"
        >
          Submit for Approval
        </Button>
      </div>
    </div>
  );
};

export default NewListingStepsContainer;
