

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { format } from "date-fns";

import { LiveEvent } from "../Live";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import EditEventDialog from "./EditLiveEvent";
import { Badge } from "@/components/ui/badge";

interface Props {
  event: LiveEvent;
}

const SellerLiveEventCard = ({ event }: Props) => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isScheduled = event.status === "scheduled";
  const isCurrent = event.status === "live";

  const handleNavigate = () => navigate(event.streamEmbedUrl);

  return (
    <>
      <Card className="w-full max-w-sm shadow-xl rounded-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
        <img
          src={event.thumbnailUrl}
          alt={event.title}
          className="w-full h-48 object-cover object-center transition-opacity duration-500"
        />
        <CardContent className="space-y-3 pt-4">
          <h3 className="text-2xl font-extrabold text-indigo-800 truncate">
            {event.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {event.description}
          </p>
          <div className="text-sm grid grid-cols-2 gap-y-1">
            <p>
              <span className="font-semibold text-gray-700">Starts at:</span>{" "}
              {format(new Date(event.startAt), "MMM dd, yyyy @ p")}
            </p>
            <p>
              <span className="font-semibold text-gray-700">Duration:</span>{" "}
              {event.durationMinutes} min
            </p>
            <p>
              <span className="font-semibold text-gray-700">Fee:</span> $
              {event.accessFee}
            </p>
            {!isScheduled && (
              <p>
                <span className="font-semibold text-gray-700">Viewers:</span>{" "}
                {event.viewerCount}
              </p>
            )}
          </div>

          {event.featuredProductIds.length > 0 && (
            <p className="text-xs text-gray-500 italic">
              Products: {event.featuredProductIds.slice(0, 3).join(", ")}
              {event.featuredProductIds.length > 3 ? "..." : ""}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-between gap-2 bg-gray-50/50">
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

          <div className="flex gap-2">
            {isScheduled && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsDialogOpen(true)} // Open the Dialog
                className="text-indigo-600 hover:bg-indigo-50 border-indigo-300"
              >
                Edit
              </Button>
            )}
            {isCurrent && (
              <Button
                variant="default"
                size="sm"
                onClick={handleNavigate}
              >
                Go to Live
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
      {isScheduled && (
        <EditEventDialog
          event={event}
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      )}
    </>
  );
};

export default SellerLiveEventCard;
