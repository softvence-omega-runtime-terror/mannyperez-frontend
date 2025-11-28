import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllLiveEventsQuery } from "@/store/services/liveStreamApi";
import BuyerLiveEventCard from "./BuyerLiveEventCard";
import { useState } from "react";
import { LiveEvent } from "../Live";

const BuyerLivesPage = () => {
  const [filter, setFilter] = useState<"current" | "upcoming">("current");

  const { data, isLoading } = useGetAllLiveEventsQuery({ status: filter });

  const events: LiveEvent[] = data?.data || [];

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <Tabs
        defaultValue="current"
        onValueChange={(v) => setFilter(v as "current" | "upcoming")}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="current">Live</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        </TabsList>

        <TabsContent value="current">
          {isLoading ? (
            <div>Loading...</div>
          ) : events.length === 0 ? (
            <div className="py-10 text-center text-muted-foreground">
              No live events right now.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-4">
              {events.map((event) => (
                <BuyerLiveEventCard key={event._id} event={event} />
              ))}
            </div>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-4">
              {events.map((event) => (
                <BuyerLiveEventCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BuyerLivesPage;
