import { useState } from "react";
import BookingDialog from "./BookingDialog";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LiveEvent } from "../Live";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

interface Props {
  event: LiveEvent;
}

const BuyerLiveEventCard = ({ event }: Props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const isLive = event.status === "live";
  const isScheduled = event.status === "scheduled";

  return (
    <>
      <Card className="overflow-hidden border rounded-xl shadow-sm hover:shadow-md transition">
        {/* Thumbnail */}
        <div className="w-full aspect-video overflow-hidden bg-muted">
          <img
            src={event.thumbnailUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <CardContent className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg leading-tight">
              {event.title}
            </h3>

            {isLive && <Badge variant="destructive">LIVE</Badge>}
            {isScheduled && <Badge variant="outline">Scheduled</Badge>}
          </div>

          {isScheduled && (
            <p className="text-sm text-muted-foreground">
              Starts: {format(new Date(event.startAt), "PPp")}
            </p>
          )}
        </CardContent>

        {/* Footer */}
        <CardFooter className="p-4">
          {isLive && (
            <Button
              className="w-full"
              onClick={() => navigate(event.streamEmbedUrl)}
            >
              Watch Now
            </Button>
          )}

          {isScheduled && (
            <>
              {event.accessFee === 0 ? (
                <Button className="w-full">Join for Free</Button>
              ) : (
                <Button
                  className="w-full"
                  onClick={() => setOpenDialog(true)}
                >
                  Book
                </Button>
              )}
            </>
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
