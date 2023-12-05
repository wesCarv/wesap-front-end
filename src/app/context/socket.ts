import React from "react";
import { io } from "socket.io-client";

// const SOCKET_URL = "http://localhost:3003";

export const socket = io("http://localhost:3003", {
  autoConnect: false
});
export const SocketContext = React.createContext(socket);
