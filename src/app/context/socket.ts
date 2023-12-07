import React from "react";
import { io } from "socket.io-client";


export const socket = io("https://wesap-back-end-production.up.railway.app", {
  autoConnect: false

});
export const SocketContext = React.createContext(socket);
