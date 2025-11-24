import { io } from "socket.io-client";

const dbUrl = import.meta.env.VITE_SOCKET_URL;

export const socket = (() => {
  const s = io(dbUrl, {
    reconnectionDelayMax: 10000,
    autoConnect: false,
  });

  s.on("connect", () => console.log("✅ Socket connected:", s.id));

  s.on("connect_error", (err) =>
    console.error("⚠️ Socket connect error:", err.message)
  );
  s.on("disconnect", (reason) =>
    console.log("⚠️ Socket disconnected:", reason)
  );

  return s;
})();

// --- Socket events ---
export const SocketEvent = {
  // lifecycle
  JOIN: "join",

  // chat - request
  SEND_MESSAGE: "send_message",
  LOAD_MESSAGES: "load_messages",
  LOAD_CONTACTS: "load_contacts",
  JOIN_ROOM: 'join_room',
  LEAVE_ROOM: 'leave_room',
  CONTACTS_UPDATED: "contacts_updated",

  // chat - server push
  RECEIVE_MESSAGE: "receive_message",
  MESSAGE_SENT_ACK: "message_sent_ack",
  MESSAGES_LOADED: "messages_loaded",
  CONTACTS_LOADED: "contacts_loaded",
} as const;

// Type for union of all event names
export type SocketEvent = (typeof SocketEvent)[keyof typeof SocketEvent];
