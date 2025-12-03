import { useState, useEffect } from "react";
import { ExtraOptionsStep } from "./ExtraOptionStep";
import { PricingInventoryStep } from "./PricingInventoryStep";
import { UploadPhotoStep } from "./UploadPhotoStep";
import { Button } from "@/components/ui/button";
import { ProductInformationStep } from "./ProductInformationSte";
import { useCreateProductMutation, useGetProductByIdQuery, useGetProductByIdWithoutFormatQuery, useUpdateProductMutation } from "@/store/services/productsApi";
import { useAppSelector } from "@/store/hooks";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
    const { productId } = useParams();
    const [updateProduct, { isLoading, isError, isSuccess }] = useUpdateProductMutation();
    const { data: productData, isLoading: isProductLoading } = useGetProductByIdWithoutFormatQuery(productId || "");
    const { user } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    const [formData, setFormData] = useState<{
        images: File[];
        title: string;
        description: string;
        tags: string;
        category: string;
        price: string;
        quantity: string;
        extraOptions: { size: string; color: string }[];
        hasVariants: boolean;
        removedImages: string[];
    }>(
        {
            images: [],
            title: "",
            description: "",
            tags: "",
            category: "",
            price: "",
            quantity: "",
            extraOptions: [],
            hasVariants: false,
            removedImages: [],
        }
    );

    const [errors, setErrors] = useState<Record<string, string>>({});

    // Populate formData when productData is loaded
    useEffect(() => {
        if (productData?.data) {
            const data = productData.data;
            setFormData({
                images: [], // Note: images are URLs, not Files; handle separately if needed
                title: data.productInformation?.title || "",
                description: data.productInformation?.description || "",
                tags: data.productInformation?.tags?.join(", ") || "",
                category: data.productInformation?.category || "",
                price: data.pricingAndInventory?.[0]?.price?.toString() || "",
                quantity: data.pricingAndInventory?.[0]?.quantity?.toString() || "",
                extraOptions: Array.isArray(data.extraOptions) 
                    ? data.extraOptions.map(v => ({
                        size: v.size?.toString() || '',
                        color: v.color || ''
                    }))
                    : data.extraOptions?.variants?.map(v => ({
                        size: v.size?.toString() || '',
                        color: v.color || ''
                    })) || [],
                hasVariants: Array.isArray(data.extraOptions) 
                    ? data.extraOptions.length > 0 
                    : !!data.extraOptions?.productVariants,
                removedImages: [],
            });
        }
    }, [productData]);

    const validate = () => {
        const e: Record<string, string> = {};

        if (!formData.title || !formData.title.trim()) {
            e.title = "Product title is required.";
        }

        if (!formData.description || !formData.description.trim()) {
            e.description = "Product description is required.";
        }

        if (!formData.images || formData.images.length === 0) {
            // For update, allow if existing images are present
            const existingImages = productData?.data?.images || [];
            if (existingImages.length === 0) {
                e.images = "Please upload at least one product photo.";
            }
        }

        if (!formData.category || !formData.category.trim()) {
            e.category = "Please select a category.";
        }

        const price = parseFloat(formData.price as any);
        if (isNaN(price) || price <= 0) {
            e.price = "Enter a valid price greater than 0.";
        }

        const qty = parseInt(formData.quantity as any, 10);
        if (isNaN(qty) || qty < 0) {
            e.quantity = "Enter a valid quantity (0 or more).";
        }

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    // Build FormData and submit the listing
    const handleSubmit = async (e?: any) => {
        if (e && typeof e.preventDefault === "function") e.preventDefault();

        // check user/seller id first
        if (!user?._id) {
            Swal.fire("Error", "Seller ID is missing. Please log in again.", "error");
            return;
        }

        // run validation and show per-field messages
        if (!validate()) {
            // focus handled by browser/user; errors are shown under fields
            return;
        }

        try {
            // construct payload object expected by server
            const payload = {
                sellerId: user._id,
                productInformation: {
                    title: formData.title,
                    description: formData.description,
                    tags: formData.tags
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean),
                    category: formData.category,
                },
                pricingAndInventory: [
                    {
                        price: Number(parseFloat(formData.price) || 0),
                        quantity: Number(parseInt(formData.quantity) || 0),
                    },
                ],
                // include any collected extra options (variants)
                extraOptions: formData.extraOptions.map(option => ({
                    size: isNaN(parseFloat(option.size)) ? option.size : parseFloat(option.size),
                    color: option.color
                })) || [],
                removedImages: formData.removedImages,
            };

            const data = new FormData();

            // Append image files (server should accept multiple 'images' fields)
            formData.images.forEach((file) => {
                data.append("images", file);
            });

            // Append the JSON payload under the `data` field
            data.append("data", JSON.stringify(payload));

            // productsApi.updateProduct expects { payload: FormData, id: string }
            await updateProduct({ payload: data, id: productId || "" }).unwrap();

            Swal.fire("Success", "Listing submitted successfully!", "success");
            setErrors({});
            navigate("/seller/products");

        } catch (err) {
            console.error(err);
            Swal.fire("Error", "An error occurred while submitting the listing.", "error");
        }
    };

    if (isProductLoading) {
        return <div className="flex justify-center items-center h-64">Loading product data...</div>;
    }

    if (!productData?.data) {
        return <div className="flex justify-center items-center h-64">Product not found.</div>;
    }

    return (
            <div className="max-w-6xl mx-auto space-y-6 grid mt-10">

                {/* ---- IMAGE UPLOAD ---- */}
                <UploadPhotoStep
                    onFilesSelect={(files: File[]) => {
                        setFormData((prev) => ({
                            ...prev,
                            images: files, // update entire array of images
                        }));
                        setErrors((prev) => {
                            const copy = { ...prev };
                            delete copy.images;
                            return copy;
                        });
                    }}
                    onFileRemove={(index: number) => {
                        setFormData((prev) => ({
                            ...prev,
                            images: prev.images.filter((_, i) => i !== index),
                        }));
                        setErrors((prev) => {
                            const copy = { ...prev };
                            delete copy.images;
                            return copy;
                        });
                    }}
                    onRemoveExisting={(url: string) => {
                        setFormData((prev) => ({
                            ...prev,
                            removedImages: [...prev.removedImages, url],
                        }));
                    }}
                    selectedFiles={formData.images} // prefill existing images if any
                    existingImages={productData?.data?.images || []}
                    removedImages={formData.removedImages}
                    error={errors.images}
                />

                {/* ---- PRODUCT INFORMATION ---- */}
                <ProductInformationStep
                    title={formData.title}
                    description={formData.description}
                    tags={formData.tags}
                    category={formData.category}
                    onTitleChange={(value: string) => {
                        setFormData((prev) => ({ ...prev, title: value }));
                        setErrors((prev) => {
                            const c = { ...prev };
                            delete c.title;
                            return c;
                        });
                    }}
                    onDescriptionChange={(value: string) => {
                        setFormData((prev) => ({ ...prev, description: value }));
                        setErrors((prev) => {
                            const c = { ...prev };
                            delete c.description;
                            return c;
                        });
                    }}
                    onTagsChange={(value: string) => {
                        setFormData((prev) => ({ ...prev, tags: value }));
                        setErrors((prev) => {
                            const c = { ...prev };
                            delete c.tags;
                            return c;
                        });
                    }}
                    onCategoryChange={(value: string) => {
                        setFormData((prev) => ({ ...prev, category: value }));
                        setErrors((prev) => {
                            const c = { ...prev };
                            delete c.category;
                            return c;
                        });
                    }}
                    errors={{
                        title: errors.title,
                        description: errors.description,
                        tags: errors.tags,
                        category: errors.category,
                    }}
                />

                {/* ---- PRICING & INVENTORY ---- */}
                <PricingInventoryStep
                    price={formData.price}
                    quantity={formData.quantity}
                    onPriceChange={(value: string) => {
                        setFormData((prev) => ({ ...prev, price: value }));
                        setErrors((prev) => {
                            const c = { ...prev };
                            delete c.price;
                            return c;
                        });
                    }}
                    onQuantityChange={(value: string) => {
                        setFormData((prev) => ({ ...prev, quantity: value }));
                        setErrors((prev) => {
                            const c = { ...prev };
                            delete c.quantity;
                            return c;
                        });
                    }}
                    errors={{ price: errors.price, quantity: errors.quantity }}
                />

                {/* ---- EXTRA OPTIONS ---- */}
                <ExtraOptionsStep
                    hasVariants={formData.hasVariants}
                    onVariantsToggle={(value: boolean) =>
                        setFormData((prev) => ({ ...prev, hasVariants: value }))
                    }
                    variants={formData.extraOptions}
                    onVariantsChange={(variants) =>
                        setFormData((prev) => ({ ...prev, extraOptions: variants }))
                    }
                />

                <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="px-10 py-6 my-10 place-self-center text-lg"
                >
                    {isLoading ? "Updating..." : "Update Listing"}
                </Button>
            </div>
    );
};

export default UpdateProduct;
