import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetMyLiveEventsQuery } from "@/store/services/liveStreamApi";
import { LiveEvent } from "../Live";
import SellerLiveEventCard from "./SellerLiveEventCard";

const SellerLivesPage = () => {
  const { data, isLoading } = useGetMyLiveEventsQuery(undefined);

  const events = data?.data || [];
  const EVENT_TABS = ["current", "upcoming", "past"] as const;

  const filterEvents = (tab: (typeof EVENT_TABS)[number]) => {
    return events.filter((event: LiveEvent) => {
      // Filter directly based on the backend-provided status:
      if (tab === "current") return event.status === "live";
      if (tab === "upcoming") return event.status === "scheduled";
      if (tab === "past") return event.status === "ended";

      // Returns false if the tab value is unexpected
      return false;
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <p className="text-muted-foreground animate-pulse">Loading events...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto w-full px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">My Live Events</h1>

      <Tabs
        defaultValue="current"
        className="w-full"
      >
        <TabsList className="mb-6 w-full justify-start">
          {" "}
          {/* Removed sm:w-auto constraint */}
          {EVENT_TABS.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="capitalize"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {EVENT_TABS.map((tab) => {
          const tabEvents = filterEvents(tab);

          return (
            <TabsContent
              key={tab}
              value={tab}
              className="w-full"
            >
              {tabEvents.length > 0 ? (
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {" "}
                  {/* Refined breakpoints */}
                  {tabEvents.map((event: LiveEvent) => (
                    <li key={event._id}>
                      <SellerLiveEventCard event={event} />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed bg-muted/30 p-8 text-center animate-in fade-in-50">
                  <p className="text-muted-foreground">
                    No{" "}
                    <span className="font-medium text-foreground">{tab}</span>{" "}
                    events found.
                  </p>
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default SellerLivesPage;
