import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { ImagePlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LiveEvent } from "../Live";
import { useUpdateLiveEventMutation } from "@/store/services/liveStreamApi";
import { toast } from "sonner";

type Props = {
  event: LiveEvent;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

// Optional fields for update
const updateEventSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  startAt: z.string().optional(),
  durationMinutes: z.string().optional(),
  accessFee: z.string().optional(),
  featuredProductIds: z.string().optional(),
  promotionAddons: z.string().optional(),
  thumbnail: z.any().optional(),
});

type UpdateEventForm = z.infer<typeof updateEventSchema>;

const EditEventDialog = ({ event, isOpen, onOpenChange }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,

    formState: { isSubmitting },
  } = useForm<UpdateEventForm>({
    resolver: zodResolver(updateEventSchema),
    defaultValues: {
      title: event.title,
      description: event.description,
      startAt: format(new Date(event.startAt), "yyyy-MM-dd'T'HH:mm"),
      durationMinutes: event.durationMinutes?.toString(),
      accessFee: event.accessFee?.toString(),
      featuredProductIds: event.featuredProductIds.join(", "),
      promotionAddons: event.promotionAddons.join(", "),
      thumbnail: undefined,
    },
  });

  const [updateLiveEvent, { isLoading }] = useUpdateLiveEventMutation();

  useEffect(() => {
    if (isOpen) {
      reset({
        title: event.title,
        description: event.description,
        startAt: format(new Date(event.startAt), "yyyy-MM-dd'T'HH:mm"),
        durationMinutes: event.durationMinutes?.toString(),
        accessFee: event.accessFee?.toString(),
        featuredProductIds: event.featuredProductIds.join(", "),
        promotionAddons: event.promotionAddons.join(", "),
        thumbnail: undefined,
      });
      setPreview(event.thumbnailUrl || null);
    }
  }, [isOpen, event, reset]);

  const onSubmit = async (data: UpdateEventForm) => {
    try {
      const formData = new FormData();

      if (image) {
        formData.append("thumbnail", image);
      }

      if (data.title) formData.append("title", data.title);
      if (data.description) formData.append("description", data.description);
      if (data.startAt) formData.append("startAt", data.startAt);

      if (data.accessFee) formData.append("accessFee", data.accessFee);
      if (data.featuredProductIds)
        formData.append("featuredProductIds", data.featuredProductIds);
      if (data.promotionAddons)
        formData.append("promotionAddons", data.promotionAddons);

      await updateLiveEvent({ payload: formData, eventId: event._id }).unwrap();

      toast.success("Event updated successfully");
      onOpenChange(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message =
        error?.data?.message || error?.message || "Failed to update event";
      toast.error(message);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      {" "}
      <DialogContent className="sm:max-w-xl rounded-lg shadow-xl bg-white p-6">
        {" "}
        <DialogHeader>
          {" "}
          <DialogTitle className="text-2xl font-semibold">
            Edit Live Event{" "}
          </DialogTitle>{" "}
          <DialogDescription className="text-gray-500">
            Update your event details and click save.{" "}
          </DialogDescription>{" "}
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 mt-4"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                {...register("title")}
                placeholder="Enter event title"
                className="mt-1 rounded-lg shadow-sm"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Enter event description"
                className="mt-1 rounded-lg shadow-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startAt">Start Time</Label>
                <Input
                  id="startAt"
                  type="datetime-local"
                  {...register("startAt")}
                  className="mt-1 rounded-lg shadow-sm"
                />
              </div>

              <div>
                <Label htmlFor="accessFee">Access Fee ($)</Label>
                <Input
                  id="accessFee"
                  type="number"
                  step="0.01"
                  min="0"
                  {...register("accessFee")}
                  className="mt-1 rounded-lg shadow-sm"
                />
              </div>
            </div>

            <div>
              <Label>Thumbnail</Label>
              <div className="mt-1 flex items-center gap-4">
                <input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="thumbnail"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition"
                >
                  <ImagePlus className="h-5 w-5 text-gray-600" />
                  Upload
                </label>
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-20 w-20 rounded-lg object-cover border"
                  />
                )}
              </div>
            </div>
          </div>

          <DialogFooter className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              //   disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={isLoading}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditEventDialog;
