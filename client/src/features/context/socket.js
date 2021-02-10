import React, { createContext } from "react";
import io from "socket.io-client";

export const socket = io();

const SocketContext = createContext(socket);

export default SocketContext;
