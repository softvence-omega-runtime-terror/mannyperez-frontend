import { useState } from "react";
import BookingDialog from "./BookingDialog";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LiveEvent } from "../Live";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

interface Props {
  event: LiveEvent;
}

const BuyerLiveEventCard = ({ event }: Props) => {
  const isLive = event.status === "live";
  const isScheduled = event.status === "scheduled";

  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Card className="overflow-hidden">
        <img
          src={event.thumbnailUrl}
          alt={event.title}
          className="w-full h-40 object-cover object-center"
        />

        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
          {isScheduled && (
            <p className="text-sm text-muted-foreground">
              Starts: {format(new Date(event.startAt), "PPp")}
            </p>
          )}
        </CardContent>

        <CardFooter className="p-4">
          {isLive && (
            <Button
              className="w-full"
              onClick={() => navigate(event.streamEmbedUrl)}
            >
              View
            </Button>
          )}

          {isScheduled && event.accessFee !== 0 && (
            <Button
              className="w-full"
              onClick={() => setOpenDialog(true)}
            >
              Book
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
