/* eslint-disable @typescript-eslint/no-explicit-any */
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

  const { status: eventStatus } = event;

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
          // @ts-expect-error ts(2322)
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
    if (!liveRef.current || initializedRef.current) return;

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
  }, [liveConfig, isSuccess, savedLiveConfig, initZego]);

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

  // --- UI States ---

  if (eventStatus === "scheduled") {
    return (
      <div className="flex flex-col items-center mt-4">
        {" "}
        <p className="mb-2 text-gray-700">
          Your live session is ready to start.
        </p>{" "}
        <Button
          onClick={handleStartLive}
          disabled={isLoading}
          size="lg"
        >
          {isLoading ? "Starting..." : "Start Live"}{" "}
        </Button>{" "}
      </div>
    );
  }

  if (eventStatus === "ended") {
    return (
      <div className="p-6 text-center">
        {" "}
        <h1 className="text-2xl font-bold text-gray-800">
          Live stream has ended
        </h1>{" "}
        <p className="mt-2 text-gray-600">
          Thank you for hosting! You can create a new live event anytime.{" "}
        </p>{" "}
      </div>
    );
  }

  if (!liveConfig.token) {
    return (
      <div className="p-6 text-center text-gray-500">
        Preparing your live session. Hang tight, it will start shortly...{" "}
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
