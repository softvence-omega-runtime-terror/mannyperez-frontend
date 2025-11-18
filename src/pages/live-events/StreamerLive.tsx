/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useEndLiveStreamMutation,
  useStartLiveStreamMutation,
  useGetLiveEventInfoForHostQuery,
} from "@/store/services/liveStreamApi";
import { LiveEvent } from "../Live";
import { Button } from "@/components/ui/button";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { toast } from "sonner";
import { useAppSelector } from "@/store/hooks";

type Props = { event: LiveEvent };

const StreamerLive = ({ event }: Props) => {
  const { eventId } = useParams<{ eventId: string }>();
  const [startLive, { isLoading }] = useStartLiveStreamMutation();
  const [endLive] = useEndLiveStreamMutation();

  const liveRef = useRef<HTMLDivElement>(null);

  const zegoRoomRef = useRef<any>(null);
  const initializedRef = useRef(false);

  const user = useAppSelector((state) => state.auth.user);
  const userID = user?._id;
  const userName = user?.name || "Host";

  const eventStatus = event?.status;

  const { data: savedLiveConfig, isSuccess } = useGetLiveEventInfoForHostQuery(
    eventId!,
    { skip: !eventId }
  );

  const [liveConfig, setLiveConfig] = useState<{
    token: string | null;
    roomId: string | null;
    appID: string | null;
  }>({
    token: null,
    roomId: null,
    appID: null,
  });

  // Set liveConfig from saved data
  useEffect(() => {
    if (savedLiveConfig?.data) {
      setLiveConfig({
        token: savedLiveConfig.data.token,
        roomId: savedLiveConfig.data.roomId,
        appID: savedLiveConfig.data.appID,
      });
    }
  }, [savedLiveConfig]);

  // Initialize Zego
  const initZego = useCallback(
    async ({
      appID,
      roomId,
      token,
    }: {
      appID: string;
      roomId: string;
      token: string;
    }) => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

        const KitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
          Number(appID),
          token,
          roomId,
          userID!,
          userName
        );

        const zp = ZegoUIKitPrebuilt.create(KitToken);
        zegoRoomRef.current = zp;

        zp.joinRoom({
          container: liveRef.current,
          // @ts-ignore
          scenario: { mode: "LiveStreaming", config: { role: "Host" } },
          turnOnCameraWhenJoining: true,
          turnOnMicrophoneWhenJoining: true,
          showMyCameraToggleButton: true,
          showMyMicrophoneToggleButton: true,
          showTextChat: true,
          onLiveEnd: async () => {
            toast.info("Live stream ended");
            await endLive(eventId!).unwrap();
            setLiveConfig({ token: null, roomId: null, appID: null });
          },
        });
      } catch {
        toast.error("Failed to join live room.");
      }
    },
    [endLive, eventId, userID, userName]
  );

  // Auto-init Zego if config exists
  useEffect(() => {
    if (!liveRef.current) return;
    if (initializedRef.current) return;

    const config =
      liveConfig.token && liveConfig.roomId && liveConfig.appID
        ? liveConfig
        : isSuccess &&
          savedLiveConfig?.hostToken &&
          savedLiveConfig.roomId &&
          savedLiveConfig.appID
        ? {
            token: savedLiveConfig.hostToken,
            roomId: savedLiveConfig.roomId,
            appID: savedLiveConfig.appID,
          }
        : null;

    if (!config) return;

    initializedRef.current = true;
    initZego(config);
  }, [
    liveConfig.token,
    liveConfig.roomId,
    liveConfig.appID,
    isSuccess,
    savedLiveConfig,
    initZego,
    liveConfig,
  ]);

  const handleStartLive = async () => {
    try {
      const response = await startLive(eventId!).unwrap();
      const { token, roomId, appID } = response.data;
      setLiveConfig({ token, roomId, appID });
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to start live stream");
    }
  };

  useEffect(() => {
    return () => {
      if (zegoRoomRef.current) {
        zegoRoomRef.current.destroy();
        initializedRef.current = false;
      }
    };
  }, []);

  // --- Event timing calculations ---
  const startTime = new Date(event.startAt).getTime();
  const endTime = startTime + (event.durationMinutes || 0) * 60 * 1000;

  const checkIsEventAllowed = useCallback(() => {
    const now = Date.now();
    return now >= startTime - 60 * 1000 && now <= endTime; // 1 min before start until end
  }, [startTime, endTime]);

  const [isEventAllowed, setIsEventAllowed] = useState(checkIsEventAllowed());

  useEffect(() => {
    const interval = setInterval(() => {
      setIsEventAllowed(checkIsEventAllowed());
    }, 1000);
    return () => clearInterval(interval);
  }, [checkIsEventAllowed]);

  // Countdown to start
  const getCountdown = () => {
    const diffMs = startTime - Date.now();
    const minutes = Math.floor(diffMs / 1000 / 60);
    const seconds = Math.floor((diffMs / 1000) % 60);
    return { minutes, seconds, diffMs };
  };

  const countdown = getCountdown();

  // --- UI States ---

  // Not yet allowed (1 min before start)
  if (!isEventAllowed) {
    if (Date.now() < startTime) {
      return (
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Live stream coming soon
          </h1>
          <p className="mt-2 text-gray-600">
            The live session will start within 1 minute of the scheduled time.
          </p>
          <p className="mt-4 text-lg font-semibold text-gray-700">
            Starts in {countdown.minutes}m {countdown.seconds}s
          </p>
        </div>
      );
    } else {
      return (
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Live stream has ended
          </h1>
          <p className="mt-2 text-gray-600">
            The scheduled duration for this event has passed. Thank you for
            hosting!
          </p>
        </div>
      );
    }
  }

  // Scheduled but not started yet
  if (eventStatus === "scheduled") {
    return (
      <div className="flex flex-col items-center mt-4">
        <p className="mb-2 text-gray-700">
          Your live session is ready to start.
        </p>
        <Button
          onClick={handleStartLive}
          disabled={isLoading}
          size="lg"
        >
          {isLoading ? "Starting..." : "Start Live"}
        </Button>
      </div>
    );
  }

  // Event ended by status
  if (eventStatus === "ended" || Date.now() > endTime) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Live stream has ended
        </h1>
        <p className="mt-2 text-gray-600">
          Thank you for hosting! You can create a new live event anytime.
        </p>
      </div>
    );
  }

  // Preparing live session
  if (!liveConfig.token) {
    return (
      <div className="p-6 text-center text-gray-500">
        Preparing your live session. Hang tight, it will start shortly...
      </div>
    );
  }

  // Live ongoing
  return (
    <div
      ref={liveRef}
      className="w-full h-[600px] bg-black rounded-lg overflow-hidden"
    />
  );
};

export default StreamerLive;
