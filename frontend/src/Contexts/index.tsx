import { useEffect } from "react";
import { io } from "socket.io-client";


const SocketProvider = () => {


  useEffect(() => {
    
    const newSocket = io(
      `${import.meta.env.VITE_BACKEND_URL}`
    );
    console.log("connected ? from socketProveider");
    
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <>
      // @ts-ignore
      
    </>
  );
};

export default SocketProvider;
