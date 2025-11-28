import { useState } from "react";
import BookingDialog from "./BookingDialog";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LiveEvent } from "../Live";
import { format } from "date-fns";

interface Props {
  event: LiveEvent;
  isBooked?: boolean;
}

const BuyerLiveEventCard = ({ event, isBooked = false }: Props) => {
  const [openDialog, setOpenDialog] = useState(false);

  const goToStream = () => {
    window.location.href = event.streamEmbedUrl; // always external
  };

  const isLive = event.status === "live";
  const isScheduled = event.status === "scheduled";

  return (
    <>
      {" "}
      <Card className="overflow-hidden border rounded-xl shadow-sm hover:shadow-md transition">
        {/* Thumbnail */}{" "}
        <div className="w-full aspect-video overflow-hidden bg-muted relative">
          <img
            src={event.thumbnailUrl}
            alt={`${event.title} thumbnail`}
            className="w-full h-full object-cover"
          />
          {isBooked && (
            <Badge className="absolute top-2 right-2 bg-green-500 text-white">
              Booked{" "}
            </Badge>
          )}
          {isLive && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white">
              LIVE{" "}
            </Badge>
          )}
          {isScheduled && !isLive && (
            <Badge className="absolute top-2 left-2 bg-gray-200 text-gray-800">
              Scheduled{" "}
            </Badge>
          )}{" "}
        </div>
        {/* Content */}
        <CardContent className="p-4 space-y-2">
          <h3 className="font-semibold text-lg leading-tight">{event.title}</h3>

          {isScheduled && (
            <p className="text-sm text-muted-foreground">
              Starts:{" "}
              {event.startAt ? format(new Date(event.startAt), "PPp") : "TBA"}
            </p>
          )}

          <p className="text-sm text-muted-foreground">
            Access Fee: {event.accessFee === 0 ? "Free" : `$${event.accessFee}`}
          </p>
        </CardContent>
        {/* Footer */}
        <CardFooter className="p-4">
          {(isLive || isBooked) && (
            <Button
              className="w-full"
              onClick={goToStream}
            >
              Watch Now
            </Button>
          )}

          {isScheduled && !isBooked && (
            <Button
              className="w-full"
              onClick={() =>
                event.accessFee === 0 ? goToStream() : setOpenDialog(true)
              }
            >
              {event.accessFee === 0 ? "Join for Free" : "Book"}
            </Button>
          )}
        </CardFooter>
      </Card>
      <BookingDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        event={event}
      />
    </>
  );
};

export default BuyerLiveEventCard;
