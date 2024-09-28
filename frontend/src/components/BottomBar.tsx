import { useState } from "react";
import { IconType } from "react-icons";
import { AiFillAudio, AiOutlineAudioMuted } from "react-icons/ai";
import { FaVideo, FaVideoSlash } from "react-icons/fa6";
import { MdCallEnd } from "react-icons/md";

interface Props {
  handleToggleMute: () => void;
  disconnectRoom: () => void;
  handleToggleVideo: () => void;
  clickedIcon: string;
}

const BottomBar = ({
  handleToggleMute,
  disconnectRoom,
  handleToggleVideo,
  clickedIcon,
}: Props) => {
  const [muteIcon, setMuteIcon] = useState<IconType>(AiOutlineAudioMuted);
  const [videoIcon, setVideoIcon] = useState<IconType>(FaVideoSlash);

  const toggleMuteIcon = () => {
    setMuteIcon((prevIcon) =>
      prevIcon === AiFillAudio ? AiOutlineAudioMuted : AiFillAudio
    );
    handleToggleMute(); // Call the parent function
  };

  const toggleVideoIcon = () => {
    setVideoIcon((prevIcon) =>
      prevIcon === FaVideo ? FaVideoSlash : FaVideo
    );
    handleToggleVideo(); // Call the parent function
  };

  return (
    <div
      className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 z-60 flex justify-center space-x-20 ${
        clickedIcon !== "Video"
          ? "transition-all duration-300 transform translate-y-3 opacity-0 hover:opacity-100 hover:translate-y-0"
          : "transition-all duration-300 transform translate-y-6 opacity-100 hover:translate-y-0"
      }`}
    >
      <button onClick={toggleMuteIcon}>
        <muteIcon /> {/* Correctly render the current icon as a component */}
      </button>
      <button onClick={toggleVideoIcon}>
        <videoIcon /> {/* Correctly render the current icon as a component */}
      </button>
      <button onClick={disconnectRoom}>
        <MdCallEnd />
      </button>
    </div>
  );
};

export default BottomBar;
