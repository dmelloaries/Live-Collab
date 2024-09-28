import React, { useState } from "react";
import { BsPencilFill } from "react-icons/bs";
import { PiFileTextBold } from "react-icons/pi";
import { RiCodeBoxFill } from "react-icons/ri";
import { MdCallEnd } from "react-icons/md"; // Icon for the Call End button
import { useNavigate } from "react-router-dom"; // React Router for navigation

interface Props {
  clickedIcon: (arg0: string) => void;
}

interface ClickedIcons {
  [key: string]: boolean;
}

const SideBar = (props: Props) => {
  const initial = "CodeBox";
  const [clickedIcons, setClickedIcons] = useState<ClickedIcons>({
    Draw: false,
    Video: false,
    FileText: false,
    CodeBox: true,
  });

  const navigate = useNavigate();

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

  // Handle call end button click
  const handleCallEndClick = () => {
    // Refresh the page while staying on the same path
    window.location.reload();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center items-center bg-transparent text-white shadow-lg">
      <div className="flex space-x-4 py-2">
        <SideBarIcon
          icon={<BsPencilFill />}
          onClick={() => handleIconClick("Draw")}
          isClicked={clickedIcons["Draw"]}
        />
        {/* <SideBarIcon
          icon={<FaVideo />}
          onClick={() => handleIconClick("Video")}
          isClicked={clickedIcons["Video"]}
        /> */}
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
        {/* Red Call End Button */}
        <SideBarIcon
          icon={<MdCallEnd className="text-red-600" />} // Red call end icon
          onClick={handleCallEndClick} // Refresh the page
          isClicked={false} // Call end button doesn't need a toggle
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
      className={`sidebar-icons cursor-pointer ${
        i.isClicked ? "text-gray-900 bg-secondary" : ""
      }`}
      onClick={i.onClick}
    >
      {i.icon}
    </div>
  );
};

export default SideBar;
