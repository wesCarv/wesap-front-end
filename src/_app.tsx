import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { SocketContext, socket } from "./app/context/socket";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  socket.auth = { token: 'wdawdawdawd'};
  return (
    <>
      <SocketContext.Provider value={socket}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
        <ToastContainer />
      </SocketContext.Provider>
    </>
  );
}

export default MyApp;
