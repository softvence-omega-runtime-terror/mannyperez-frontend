import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

import { LiveEvent } from "../Live";
import EditEventDialog from "./EditLiveEvent";

interface Props {
  event: LiveEvent;
}

const SellerLiveEventCard = ({ event }: Props) => {
  const navigate = useNavigate();
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const isScheduled = event.status === "scheduled";
  const isCurrent = event.status === "live";

  const handleNavigate = () => navigate(event.streamEmbedUrl);

  return (
    <>
      {/* Minimal Card */}
      <Card className="w-full max-w-sm shadow-xl rounded-2xl overflow-hidden">
        <img
          src={event.thumbnailUrl}
          alt={event.title}
          className="w-full h-48 object-cover"
        />

        <CardContent className="pt-3">
          <h3 className="text-xl font-bold text-indigo-800 truncate">
            {event.title}
          </h3>
        </CardContent>

        <CardFooter className="flex justify-between items-center">
          <Badge
            className={`px-3 py-1 text-xs font-bold rounded-full ${
              isCurrent
                ? "bg-red-500 text-white animate-pulse"
                : isScheduled
                ? "bg-indigo-100 text-indigo-700"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {isCurrent ? "LIVE NOW" : isScheduled ? "SCHEDULED" : "COMPLETED"}
          </Badge>

          <Button size="sm" onClick={() => setViewDetailsOpen(true)}>
            View Details
          </Button>
        </CardFooter>
      </Card>

      {/* DETAILS MODAL */}
      <Dialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{event.title}</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <img
              src={event.thumbnailUrl}
              alt={event.title}
              className="w-full h-48 object-cover rounded-md"
            />

            <p className="text-gray-700">{event.description}</p>

            <div className="text-sm space-y-1">
              <p>
                <span className="font-semibold">Starts at:</span>{" "}
                {format(new Date(event.startAt), "MMM dd, yyyy @ p")}
              </p>
              <p>
                <span className="font-semibold">Duration:</span>{" "}
                {event.durationMinutes} min
              </p>
              <p>
                <span className="font-semibold">Fee:</span> $
                {event.accessFee}
              </p>

              {!isScheduled && (
                <p>
                  <span className="font-semibold">Viewers:</span>{" "}
                  {event.viewerCount}
                </p>
              )}

              {event.featuredProductIds.length > 0 && (
                <p className="text-xs text-gray-500 italic">
                  Products: {event.featuredProductIds.slice(0, 3).join(", ")}
                  {event.featuredProductIds.length > 3 ? "..." : ""}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-2 mt-4">
              {isScheduled && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setViewDetailsOpen(false);
                    setEditOpen(true);
                  }}
                >
                  Edit Event
                </Button>
              )}

              {isCurrent && (
                <Button onClick={handleNavigate}>
                  Go to Live
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* EDIT MODAL */}
      {isScheduled && (
        <EditEventDialog
          event={event}
          isOpen={editOpen}
          onOpenChange={setEditOpen}
        />
      )}
    </>
  );
};

export default SellerLiveEventCard;
