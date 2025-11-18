/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { LiveEventStatus } from "../Live";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useAppSelector } from "@/store/hooks";
import { useJoinLiveStreamMutation } from "@/store/services/liveStreamApi";

type Props = {
  eventStatus: LiveEventStatus;
};

const WatcherLive = ({ eventStatus }: Props) => {
  const { eventId } = useParams<{ eventId: string }>();
  const liveRef = useRef<HTMLDivElement>(null);
  const zegoRoomRef = useRef<any>(null);

  const user = useAppSelector((state) => state.auth.user);
  const userID = user?._id || String(Date.now());
  const userName = user?.name || "Viewer";

  const [joinLive] = useJoinLiveStreamMutation();

  useEffect(() => {
    console.log("🚀 Event status:", eventStatus);
    if (eventStatus !== "live") return;

    if (!eventId) return;

    const initViewer = async () => {
      try {
        // 1️⃣ Fetch viewer token + room info
        const response = await joinLive(eventId).unwrap();
        console.log("🚀 Viewer config:", response);
        const { token, roomId, appID } = response.data;

        // 2️⃣ Generate kit token and create Zego instance
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
          Number(appID),
          token,
          roomId,
          userID,
          userName
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zegoRoomRef.current = zp;

        // 3️⃣ Join room as audience
        zp.joinRoom({
          container: liveRef.current,
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
          onRemoteStreamUpdated: (userList, type) =>
            console.log("Viewer remote stream:", userList, type),
          onRoomStateChanged: (state) =>
            console.log("Room state changed:", state),
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
  }, [eventStatus, eventId, joinLive, userID, userName]);

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

export default WatcherLive;
