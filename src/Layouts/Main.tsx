import { BiBriefcase, BiWallet } from "react-icons/bi";
import { CgMenuBoxed } from "react-icons/cg";
import { RiProfileLine } from "react-icons/ri";
import Home from "../Screens/Home";
import Gigs from "../Screens/Gigs";
import Earnings from "../Screens/Earnings";
import Profile from "../Screens/Profile";
import { useState } from "react";

const bottomBarList = [
  {
    name: "Home",
    link: "/home",
    logo: <CgMenuBoxed />,
    index: 0,
  },
  {
    name: "Gigs",
    link: "/gigs",
    logo: <BiBriefcase />,
    index: 1,
  },
  {
    name: " Earnings",
    link: "/earnings",
    logo: <BiWallet />,
    index: 2,
  },
  {
    name: "Profile",
    link: "/profile",
    logo: <RiProfileLine />,
    index: 3,
  },
];

const Main = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);

  const renderTabContent = () => {
    switch (currentTab) {
      case 0:
        return <Home />;
      case 1:
        return <Gigs />;
      case 2:
        return <Earnings />;
      case 3:
        return <Profile />;
      default:
        return <Home />;
    }
  };
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-100 to-blue-300">
      <div>{renderTabContent()}</div>
      <div className="flex flex-row justify-between px-5 py-3 fixed w-full bottom-0 bg-white shadow-md">
        {bottomBarList.map(({ name, logo,index:id }, index) => (
          <div key={index} onClick={()=>setCurrentTab(id)} className="flex flex-col items-center justify-center text-center">
            <span className={`${currentTab == id ? "text-blue-500" : "font-extralight text-slate-500"} text-xl `}>{logo}</span>
            <span className={`${currentTab ==id? " text-blue-500" :" text-slate-500"}  `}>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
