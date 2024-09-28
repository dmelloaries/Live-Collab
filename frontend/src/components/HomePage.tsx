import React, { useEffect, useState } from "react";
import { Home, Users, Clock, Plus, LogIn } from "lucide-react";

const HomePage = ({
  clickedIcon,
  roomInputRef,
  joinRoomInputRef,
  createRoom,
  joinRoom,
  user,
}: {
  clickedIcon: string;
  roomInputRef: React.MutableRefObject<HTMLInputElement | null>;
  joinRoomInputRef: React.MutableRefObject<HTMLInputElement | null>;
  createRoom: () => void;
  joinRoom: (id: string) => void;
  user: string | null | undefined;
}) => {
  const [roomId, setRoomId] = useState("");
  const [docIds, setDocIds] = useState<string[]>([]);

  useEffect(() => {
    const body = document.querySelector("body");

    if (body) {
      if (clickedIcon === "GoHome") {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "auto";
      }
    }

    return () => {
      if (body) body.style.overflow = "auto";
    };
  }, [clickedIcon]);

  useEffect(() => {
    if (clickedIcon !== "GoHome") return;
    const fetchDocument = async () => {
      console.log(user);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/find_recent_stops/${user}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);

          setDocIds((prevDocIds) => {
            const uniqueIds = new Set([...prevDocIds, ...data.docIds]);
            return [...uniqueIds];
          });
          console.log(docIds);
        } else {
          console.error("Failed to fetch document");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };
    fetchDocument();
  }, [clickedIcon, roomId, user]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(event.target.value);
  };

  return (
    <div
      className={`flex flex-col h-screen w-full md:w-10/12 mx-auto p-8 ${
        clickedIcon === "GoHome" ? "block" : "hidden"
      }`}
    >
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">Welcome to UniSync</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Home className="mr-2" /> Create a Room
          </h2>
          <input
            className="w-full bg-white bg-opacity-20 rounded-md py-2 px-4 placeholder-gray-300 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-white"
            type="text"
            ref={roomInputRef}
            placeholder="Stop Name (Optional)"
          />
          <button
            className="w-full bg-white text-purple-600 font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center"
            onClick={createRoom}
          >
            <Plus className="mr-2" /> Create
          </button>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Users className="mr-2" /> Join a Room
          </h2>
          <input
            className="w-full bg-white bg-opacity-20 rounded-md py-2 px-4 placeholder-gray-300 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-white"
            type="text"
            ref={joinRoomInputRef}
            placeholder="Stop Id (Required)"
            onChange={handleInputChange}
          />
          <button
            className="w-full bg-white text-teal-600 font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center"
            onClick={() => joinRoom(roomId)}
          >
            <LogIn className="mr-2" /> Join
          </button>
        </div>
      </div>
      <div className="mt-8 bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center text-white">
          <Clock className="mr-2" /> Recent Rooms
        </h2>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {docIds.map((docId, index) => (
            <div
              key={index}
              className="bg-gray-700 text-white rounded-md p-3 cursor-pointer hover:bg-gray-600 transition-all duration-300"
              onClick={() => joinRoom(docId)}
            >
              {docId}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;