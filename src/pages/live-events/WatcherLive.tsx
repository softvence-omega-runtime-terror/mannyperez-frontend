/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { LiveEvent } from "../Live";
import { useEffect, useRef, useState, useCallback } from "react";
import { toast } from "sonner";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useAppSelector } from "@/store/hooks";
import { useJoinLiveStreamMutation } from "@/store/services/liveStreamApi";

type Props = { event: LiveEvent };

const WatcherLive = ({ event }: Props) => {
  const { eventId } = useParams<{ eventId: string }>();
  const liveRef = useRef<HTMLDivElement>(null);
  const zegoRoomRef = useRef<any>(null);

  const user = useAppSelector((state) => state.auth.user);
  const userID = user?._id || String(Date.now());
  const userName = user?.name || "Viewer";

  const [joinLive] = useJoinLiveStreamMutation();
  const [isEventAllowed, setIsEventAllowed] = useState(true);
  const [timeLeft, setTimeLeft] = useState<{
    minutes: number;
    seconds: number;
    diffMs: number;
  }>({
    minutes: 0,
    seconds: 0,
    diffMs: 0,
  });

  const startTime = new Date(event.startAt).getTime();
  const endTime = startTime + (event.durationMinutes || 0) * 60 * 1000;

  // Check if viewer can join (1 min before start until duration ends)
  const checkIsEventAllowed = useCallback(() => {
    const now = Date.now();
    return now >= startTime - 60 * 1000 && now <= endTime;
  }, [startTime, endTime]);

  // Countdown calculation
  const getCountdown = useCallback(() => {
    const diffMs = startTime - Date.now();
    const minutes = Math.floor(diffMs / 1000 / 60);
    const seconds = Math.floor((diffMs / 1000) % 60);
    return { minutes, seconds, diffMs };
  }, [startTime]);

  // Update countdown and allowed state every second
  useEffect(() => {
    const interval = setInterval(() => {
      setIsEventAllowed(checkIsEventAllowed());
      setTimeLeft(getCountdown());
    }, 1000);

    return () => clearInterval(interval);
  }, [checkIsEventAllowed, getCountdown]);

  // Initialize Zego for audience
  useEffect(() => {
    if (!isEventAllowed || !eventId || Date.now() < startTime) return;

    const initViewer = async () => {
      try {
        const response = await joinLive(eventId).unwrap();
        const { token, roomId, appID } = response.data;

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
          Number(appID),
          token,
          roomId,
          userID,
          userName
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zegoRoomRef.current = zp;

        zp.joinRoom({
          container: liveRef.current,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-expect-error
          scenario: { mode: "LiveStreaming", config: { role: "Audience" } },
          showUserList: true,
          showScreenSharingButton: false,
          showMyCameraToggleButton: false,
          showMyMicrophoneToggleButton: false,
          showTextChat: true,
          showLeaveRoomButton: true,
          onJoinRoom: () => console.log("Viewer joined room"),
          onLeaveRoom: () => toast.info("You left the live"),
          onYouRemovedFromRoom: () => toast.error("Removed from room"),
        });
      } catch (err: any) {
        console.error("Viewer init error:", err);
        toast.error(err?.data?.message || "Failed to load live");
      }
    };

    initViewer();

    return () => {
      if (zegoRoomRef.current) {
        zegoRoomRef.current.destroy();
        zegoRoomRef.current = null;
      }
    };
  }, [isEventAllowed, eventId, joinLive, userID, userName, startTime]);

  // Render UI for different states
  const renderContent = () => {
    const now = Date.now();

    // Event hasn't started yet
    // if (!isEventAllowed && now < startTime) {
    //   return (
    //     <div className="p-6 text-center">
    //       <h1 className="text-2xl font-bold text-gray-800">
    //         Live stream coming soon
    //       </h1>
    //       <p className="mt-2 text-gray-600">
    //         The live session will start within 1 minute of the scheduled time.
    //       </p>
    //       <p className="mt-4 text-lg font-semibold text-gray-700">
    //         Starts in {timeLeft.minutes}m {timeLeft.seconds}s
    //       </p>
    //     </div>
    //   );
    // }

    // Event duration passed
    // if (now > endTime) {
    //   return (
    //     <div className="p-6 text-center">
    //       <h1 className="text-2xl font-bold text-gray-800">
    //         Live stream has ended
    //       </h1>
    //       <p className="mt-2 text-gray-600">
    //         The live session duration has ended. Thank you for watching!
    //       </p>
    //     </div>
    //   );
    // }

    // Event is allowed and live
    if (isEventAllowed) {
      if (!zegoRoomRef.current) {
        return (
          <div className="p-6 text-center text-gray-500">
            Joining live session...
          </div>
        );
      }

      return (
        <div
          ref={liveRef}
          className="w-full h-[600px] bg-black rounded-lg overflow-hidden"
        />
      );
    }

    // Fallback / loading
    return (
      <div className="p-6 text-center text-gray-500">
        Loading live session...
      </div>
    );
  };

  return <div className="watcher-live-container">{renderContent()}</div>;
};

export default WatcherLive;
