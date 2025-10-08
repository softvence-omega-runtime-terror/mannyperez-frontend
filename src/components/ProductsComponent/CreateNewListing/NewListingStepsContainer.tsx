import { useState } from "react";
import { ExtraOptionsStep } from "./ExtraOptionStep";
import { PricingInventoryStep } from "./PricingInventoryStep";
import { ProductInformationStep } from "./ProductInformationSte";
import { UploadPhotoStep } from "./UploadPhotoStep";
import { Button } from "@/components/ui/button";



const NewListingStepsContainer = () => {
    const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    price: '',
    quantity: '',
    hasVariants: false,
  });
  return (
    <div className="">
       <div className="max-w-6xl mx-auto space-y-6 grid">
              <UploadPhotoStep
                onFileSelect={(file) => console.log('File selected:', file)}
                onFileRemove={() => console.log('File removed')}
              />

              <ProductInformationStep
                title={formData.title}
                description={formData.description}
                tags={formData.tags}
                onTitleChange={(value) => setFormData({ ...formData, title: value })}
                onDescriptionChange={(value) => setFormData({ ...formData, description: value })}
                onTagsChange={(value) => setFormData({ ...formData, tags: value })}
              />

              <PricingInventoryStep
                price={formData.price}
                quantity={formData.quantity}
                onPriceChange={(value) => setFormData({ ...formData, price: value })}
                onQuantityChange={(value) => setFormData({ ...formData, quantity: value })}
              />

              <ExtraOptionsStep
                hasVariants={formData.hasVariants}
                onVariantsToggle={(value) => setFormData({ ...formData, hasVariants: value })}
              />
              
              <Button type="submit" className="px-10 py-6 my-10 place-self-center text-lg">Submit for Approval</Button>
            </div>
    </div>
  );
};

export default NewListingStepsContainer;