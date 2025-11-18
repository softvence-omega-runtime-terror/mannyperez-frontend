import Footer from "@/components/layout/Footer";
import UserNavbar from "@/components/layout/UserNavbar";
import Wrapper from "@/components/layout/Wrapper";
import FeaturedProducts from "@/components/LiveComponent/FeaturedProducts";
import LiveHeader from "@/components/LiveComponent/LiveHeader";
import { useAppSelector } from "@/store/hooks";
import { useGetLiveEventInfoQuery } from "@/store/services/liveStreamApi";
import { useParams } from "react-router-dom";
import StreamerLive from "./live-events/StreamerLive";
import WatcherLive from "./live-events/WatcherLive";

export type LiveEventStatus = "scheduled" | "live" | "ended";

export type LiveEvent = {
  _id: string;
  sellerId: string;
  title: string;
  description: string;
  startAt: Date;
  durationMinutes: number;
  streamEmbedUrl: string;
  featuredProductIds: string[];
  status: LiveEventStatus;
  promotionAddons: string[];
  paymentStatus: "pending" | "completed" | "failed";
};

function Live() {
  const { eventId } = useParams();

  const { data, isLoading } = useGetLiveEventInfoQuery(eventId, {
    skip: !eventId,
  });

  const user = useAppSelector((state) => state.auth.user);

  if (isLoading) return <div>Loading...</div>;

  const event = data?.data;



  const isHost = event?.sellerId === user?._id;

  return (
    <div>
      <UserNavbar />
      <LiveHeader event={event} />
      <Wrapper>
        <div className="flex flex-col lg:flex-row justify-center gap-5 pt-6 pb-10">
          {/* <div className="flex-3 ">
            <VideoPlayer />
          </div>
          <div className="flex-1">
            <LiveChat />
          </div> */}
          {isHost ? (
            <StreamerLive event={event}/>
          ) : (
            <WatcherLive event={event} />
          )}
        </div>
      </Wrapper>
      <FeaturedProducts />

      <Footer />
    </div>
  );
}

export default Live;
