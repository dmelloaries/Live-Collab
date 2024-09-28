import React, { useState } from "react";
import { BsPencilFill } from "react-icons/bs";
import { FaVideo } from "react-icons/fa";
import { PiFileTextBold } from "react-icons/pi";
import { RiCodeBoxFill } from "react-icons/ri";

interface Props {
  clickedIcon: (arg0: string) => void;
}

interface ClickedIcons {
  [key: string]: boolean;
}

const SideBar = (props: Props) => {
  const initial = "Video";
  const [clickedIcons, setClickedIcons] = useState<ClickedIcons>({
    Draw: false,
    Video: true,
    FileText: false,
    CodeBox: false,
  });

  function handleIconClick(arg0: string) {
    props.clickedIcon(arg0 === undefined ? initial : arg0);
    
    const clickedIconKey = arg0 as keyof ClickedIcons;
    
    setClickedIcons((prevState) => {
      const newState: ClickedIcons = {};
      
      for (const key in prevState) {
        if (key === clickedIconKey) {
          newState[key] = !prevState[key];
        } else {
          newState[key] = false;
        }
      }
      
      return newState;
    });
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center items-center bg-gray-950 text-white shadow-lg">
      <div className="flex space-x-4 py-2">
        <SideBarIcon
          icon={<BsPencilFill />}
          onClick={() => handleIconClick("Draw")}
          isClicked={clickedIcons["Draw"]}
        />
        <SideBarIcon
          icon={<FaVideo />}
          onClick={() => handleIconClick("Video")}
          isClicked={clickedIcons["Video"]}
        />
        <SideBarIcon
          icon={<PiFileTextBold />}
          onClick={() => handleIconClick("FileText")}
          isClicked={clickedIcons["FileText"]}
        />
        <SideBarIcon
          icon={<RiCodeBoxFill />}
          onClick={() => handleIconClick("CodeBox")}
          isClicked={clickedIcons["CodeBox"]}
        />
      </div>
    </div>
  );
};

interface Icon {
  icon: React.ReactElement;
  onClick: () => void;
  isClicked: boolean;
}

const SideBarIcon = (i: Icon) => {
  return (
    <div
      className={`sidebar-icons ${
        i.isClicked ? "text-gray-900 bg-secondary" : ""
      }`}
      onClick={i.onClick}
    >
      {i.icon}
    </div>
  );
};

export default SideBar;


// also add this <button
// className="bg-red-600 hover:bg-red-600 hover:font-bold font-semibold rounded-full w-min py-3 px-36 grow-0 mb-10"
// onClick={disconnectRoom}
// >
// {<MdCallEnd />}
// </button>