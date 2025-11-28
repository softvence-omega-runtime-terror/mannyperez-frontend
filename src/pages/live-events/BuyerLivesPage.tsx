import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetAllLiveEventsQuery,
  useGetMyBookedLiveEventsQuery,
} from "@/store/services/liveStreamApi";
import BuyerLiveEventCard from "./BuyerLiveEventCard";
import { useState } from "react";
import { LiveEvent } from "../Live";

const BuyerLivesPage = () => {
  const [filter, setFilter] = useState<"current" | "upcoming">("current");

  const { data, isLoading } = useGetAllLiveEventsQuery({ status: filter });
  const { data: bookedEventsData, isLoading: isBookedLoading } =
    useGetMyBookedLiveEventsQuery(undefined);

  const events: LiveEvent[] = data?.data || [];
  const bookedEvents: LiveEvent[] = bookedEventsData?.data || [];
  const bookedEventIds = new Set(bookedEvents.map((e) => e._id));

  const renderEventGrid = (eventList: LiveEvent[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-4">
      {eventList.map((event) => (
        <BuyerLiveEventCard
          key={event._id}
          event={event}
          isBooked={bookedEventIds.has(event._id)}
        />
      ))}{" "}
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <Tabs
        defaultValue="current"
        onValueChange={(v) => setFilter(v as "current" | "upcoming")}
      >
        {" "}
        <TabsList className="grid w-full grid-cols-3">
          {" "}
          <TabsTrigger value="current">Live</TabsTrigger>{" "}
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>{" "}
          <TabsTrigger value="booked">Booked</TabsTrigger>{" "}
        </TabsList>
        <TabsContent value="current">
          {isLoading ? (
            <div>Loading...</div>
          ) : events.length === 0 ? (
            <div className="py-10 text-center text-muted-foreground">
              No live events right now.
            </div>
          ) : (
            renderEventGrid(events)
          )}
        </TabsContent>
        <TabsContent value="upcoming">
          {isLoading ? (
            <div>Loading...</div>
          ) : events.length === 0 ? (
            <div className="py-10 text-center text-muted-foreground">
              No upcoming events.
            </div>
          ) : (
            renderEventGrid(events)
          )}
        </TabsContent>
        <TabsContent value="booked">
          {isBookedLoading ? (
            <div>Loading...</div>
          ) : bookedEvents.length === 0 ? (
            <div className="py-10 text-center text-muted-foreground">
              You haven't booked any events yet.
            </div>
          ) : (
            renderEventGrid(bookedEvents)
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BuyerLivesPage;
