import { BiBriefcase, BiCheck, BiHelpCircle } from "react-icons/bi";
import { BsBank, BsPersonDash, BsPersonFillCheck } from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";
import { PiCaretRightLight } from "react-icons/pi";

import { useContext } from "react";
import { AuthContext, AuthContextType } from "../Contexts/AuthContext";

const profileItems = [
  {
    name: "Profile Settings",
    link: "/profile",
    logo: <BsPersonDash />,
  },
  {
    name: "Payment method",
    link: "/",
    logo: <BsBank />,
  },
  {
    name: "Privacy Policy",
    link: "/",
    logo: <BiBriefcase />,
  },
  {
    name: "Contact us",
    link: "/",
    logo: <BiHelpCircle />,
  },
  {
    name: "Logout",
    link: "/",
    logo: <IoLogOutOutline />,
  },
];

const Profile = () => {
  const { fulluser }  = useContext(
    AuthContext
  ) as AuthContextType;

  return (
    <div className="flex flex-col bg-gradient-to-b from-slate-300 to-slate-200 h-screen px-3 pb-20">
      <h3 className=" flex mx-auto text-2xl font-semibold py-5">Profile</h3>
      <div className="flex flex-row justify-between">
        <div className="flex items-center bg-slate-400 rounded-xl justify-center relative h-[60px] w-[60px]">
          <BsPersonFillCheck className="text-slate-200 text-4xl" />
          <span className="flex justify-center p-1 bg-blue-700 rounded-full text-white absolute -bottom-3 -right-3">
            <BiCheck />
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">{fulluser?.email}</span>
          <span className="font-light text-slate-400">{fulluser?.firstName} {fulluser?.lastName}</span>
        </div>
        <PiCaretRightLight className="text-slate-400 text-2xl" />
      </div>

      <div className="flex flex-row w-full px-3  bg-white mt-10 mx-auto rounded-2xl">
        <div className="flex flex-col px-4  h-[100px] my-3 py-4 gap-2">
          <span className="font-semibold text-3xl">0</span>
          <span className="text-slate-300 text-xl">Completed gigs</span>
        </div>
        <div className="flex flex-col px-4  my-3 h-[100px] py-4 gap-2">
          <span className="font-semibold text-3xl">NGN 0.00</span>
          <span className="text-slate-300 text-xl">Total earnings</span>
        </div>
      </div>
      <div className=" flex flex-col mt-8">
        {profileItems.map(({ name, link, logo }, index) => (
          <div
            key={index}
            className="flex flex-row justify-between items-center p-4 border-b border-gray-200 bg-white py-6"
          >
            <a href={link} className="flex flex-row items-center space-x-3">
              <span className="text-3xl">{logo}</span>
              <span className="font-light">{name}</span>
            </a>

            {/* Right Section: Icon */}
            <PiCaretRightLight className="text-slate-400 text-2xl" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
