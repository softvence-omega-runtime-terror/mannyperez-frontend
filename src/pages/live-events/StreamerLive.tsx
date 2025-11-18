import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useStartLiveStreamMutation } from "@/store/services/liveStreamApi";
import { LiveEventStatus } from "../Live";
import { Button } from "@/components/ui/button";
import {
  LiveRole,
  LiveStreamingMode,
  ScenarioModel,
  ZegoUIKitPrebuilt,
} from "@zegocloud/zego-uikit-prebuilt";
import { toast } from "sonner";
import { useAppSelector } from "@/store/hooks";

type Props = {
  eventStatus: LiveEventStatus;
};

// Define a type for the config state
type LiveConfig = {
  token: string | null;
  roomId: string | null;
  appID: string | null;
};

const StreamerLive = ({ eventStatus }: Props) => {
  const { eventId } = useParams<{ eventId: string }>();
  const [startLive, { isLoading }] = useStartLiveStreamMutation();

  const liveRef = useRef<HTMLDivElement>(null);
  const zegoRoomRef = useRef<any>(null);

  const [liveConfig, setLiveConfig] = useState<LiveConfig>({
    token: null,
    roomId: null,
    appID: null,
  });

  const user = useAppSelector((state) => state.auth.user);
  const userID = user?._id;
  const userName = user?.name || "Host";

  const initZego = useCallback(
    async (config: LiveConfig) => {
      // Ensure we have a valid config
      if (!config.token || !config.roomId || !config.appID) return;

      try {
        await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

        const KitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
          Number(config.appID),
          config.token,
          config.roomId,
          userID!,
          userName
        );

        const zp = ZegoUIKitPrebuilt.create(KitToken);
        zegoRoomRef.current = zp;

        zp.joinRoom({
          container: liveRef.current,
          scenario: {
            mode: "LiveStreaming",
            config: { role: "Host" },
          },
          turnOnCameraWhenJoining: true,
          turnOnMicrophoneWhenJoining: true,
          showMyCameraToggleButton: true,
          showMyMicrophoneToggleButton: true,
          showTextChat: true,
          onLiveEnd: () => {
            toast.info("Live stream ended");
            setLiveConfig({ token: null, roomId: null, appID: null });
          },
          onJoinRoom: () => {
            console.log("Host joined room, starting camera & mic");
          },
          onLocalStreamUpdated: (state) => {
            console.log("Local stream state:", state);
            if (state !== "published") {
              // You might want to log non-published states
            }
          },
        });

        console.log("Zego room initialized");
      } catch (err) {
        console.error("Failed to init Zego:", err);
        toast.error("Failed to start live stream. Check camera/mic and token.");
        // Clear config on failure to allow retry
        setLiveConfig({ token: null, roomId: null, appID: null });
      }
    },
    [userID, userName] // liveRef is stable, no need to include
  );

  const handleStartLive = async () => {
    if (!eventId) return;

    try {
      const response = await startLive(eventId).unwrap();
      console.log("🚀 ~ handleStartLive ~ response:", response);
      const { token, roomId, appID } = response.data;

      // JUST set the config. Do not call initZego here.
      setLiveConfig({
        token,
        roomId,
        appID,
      });
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to start live stream");
      console.error("Start live error:", err);
    }
  };

  // This single useEffect handles Zego creation and destruction
  useEffect(() => {
    // Only run if we have a token and the Zego instance isn't already created
    if (
      liveConfig.token &&
      liveConfig.roomId &&
      liveConfig.appID &&
      !zegoRoomRef.current &&
      liveRef.current // And the container is ready
    ) {
      console.log("Config detected, initializing Zego...");
      initZego(liveConfig);
    }

    // This cleanup will run ONLY when the component unmounts
    return () => {
      if (zegoRoomRef.current) {
        console.log("Destroying Zego instance on unmount...");
        zegoRoomRef.current.destroy();
        zegoRoomRef.current = null;
      }
    };
    // Re-run this effect if the config changes (e.g., token becomes non-null)
    // or if initZego function identity changes (it shouldn't, due to useCallback)
  }, [liveConfig, initZego]);

  // Render logic based on whether we have a token, not eventStatus
  if (!liveConfig.token) {
    // We don't have a token. Show the button.
    // The div ref is not needed yet.
    return (
      <Button onClick={handleStartLive} disabled={isLoading}>
        {isLoading ? "Starting..." : "Start Live"}
      </Button>
    );
  }

  // We have a token. Render the container for Zego.
  // The useEffect will have already triggered initZego.
  return (
    <div
      ref={liveRef}
      style={{
        width: "100%",
        height: "600px",
        backgroundColor: "#000",
        position: "relative",
      }}
    />
  );
};

export default StreamerLive;