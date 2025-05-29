import { useCallback, useContext, useEffect, useState } from "react";
import { BiBell, BiCalendar } from "react-icons/bi";
import { CiBellOn, CiLocationOn } from "react-icons/ci";

import Button from "../Components/button";
import { TabsData } from "../constatnts";

import CreateJobAdvert from "./CreateGig";
import { MdAddBusiness } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { CgTrashEmpty } from "react-icons/cg";
import EditJobAdvert from "./EditGig";
import {
  IMerchantAd,
} from "../types";
import { JobDetails } from "../Pages/JobDetails";
import { AdsFetches } from "../BackendServices/adsFetchServices";
import { AuthContext, AuthContextType } from "../Contexts/AuthContext";
import Loader from "../Components/Loader";

const Home = () => {
  const { fulluser } = useContext(AuthContext) as AuthContextType;
  const adsfetches = new AdsFetches();
  const [allUserOwnAds, setAllUserOwnAds] = useState<IMerchantAd[] | null>(
    null
  );

  const userOwnAds = useCallback(async () => {
    setIsLoading(true);
    const userAds = await adsfetches.getUserAds();
    setAllUserOwnAds(userAds.data);
    setIsLoading(false);

  }, []);

  useEffect(() => {
    userOwnAds();
  }, []);
  const [selectedTab, setSelectedTab] = useState("Manage");
  const [isOpenCreateGig, SetIsOpenCreateGig] = useState<boolean>(false);
  const [isOpenEditGig, SetIsOpenEditGig] = useState<boolean>(false);
  const [isOpenViewGig, SetIsOpenViewGig] = useState<boolean>(false);
  const [currentGig, setCurrentGig] = useState<IMerchantAd | null>(null);
  const [loading, setIsLoading] = useState<boolean>(false);
  const renderTypesOfGigs = () => {
    switch (selectedTab) {
      case "Manage":
        return allUserOwnAds;
      case "Active":
        return allUserOwnAds;
      default:
        return allUserOwnAds;
    }
  };

  const DeleteGig = async (id: string) => {
    setIsLoading(true);
    const deletedGig = await adsfetches.DeleteAds(id);
    userOwnAds();
    setIsLoading(false);
    alert(deletedGig.message);
  };

  return (
    <div className="py-10 px-3  justify-between overflow-scroll">
      <div className="flex  justify-between ">
        <div className="flex items-center justify-center w-16 h-16 bg-blue-500 text-white text-2xl font-bold rounded-full">
          OM
        </div>
        <div className="flex flex-col">
          <span>Welcome 👋</span>
          <span className="font-extrabold">{fulluser?.lastName}</span>
        </div>
        <div>
          <div className="flex items-center justify-center text-black bg-white w-16 h-16 text-2xl font-bold rounded-full">
            <BiBell />
          </div>
        </div>
      </div>

      <div className="flex flex-col px-3 py-5 bg-gradient-to-r from-blue-900 to-blue-500 mt-10 rounded-2xl">
        <div className="flex flex-row items-center">
          <h3 className="text-xl font-extrabold text-white">
            Complete profile setup
          </h3>
          <CiBellOn className="text-lime-300 outline-2 font-extrabold text-3xl items-center" />
        </div>
        <div>
          <div className=" font-extralight text-white">
            You're one step closer to securing your next gig
          </div>

          <Button
            background="bg-white"
            extra=" font-semibold px-10 mt-10"
            label="complete"
            onClick={() => console.log("clicked")}
          />
        </div>
      </div>

      <div className="w-full bg-slate-300 h-[70px] mt-10 rounded-3xl flex flex-row justify-around items-center">
        {TabsData.map(({ name }, index) => (
          <span
            key={index}
            onClick={() => setSelectedTab(`${name}`)}
            className={`${
              selectedTab == name ? "bg-white px-10 py-4 rounded-3xl " : ""
            }`}
          >
            {name}
          </span>
        ))}
      </div>

      {isOpenCreateGig && (
        <div className="bg-white fixed transform -translate-x-3 top-0 w-full h-screen overflow-auto z-20 justify-center">
          <CreateJobAdvert SetIsOpenCreateGig={SetIsOpenCreateGig} />
        </div>
      )}

      {isOpenEditGig && (
        <div className="bg-white fixed transform -translate-x-3 top-0 w-full h-screen overflow-auto z-20 justify-center">
          <EditJobAdvert
            SetIsOpenEditGig={SetIsOpenEditGig}
            Gig={currentGig as IMerchantAd}
            userOwnAds={userOwnAds}
          />
        </div>
      )}

      {isOpenViewGig && (
        <div className="bg-white fixed transform -translate-x-3 top-0 w-full h-screen overflow-auto z-20 justify-center">
          <JobDetails SetIsOpenViewGig={SetIsOpenViewGig} Gig={currentGig as IMerchantAd} />
        </div>
      )}
      <div
        onClick={() => SetIsOpenCreateGig((prev) => !prev)}
        className="flex flex-row justify-center items-center gap-10 bg-gradient-to-r from-teal-500 to-blue-400 shadow-2xl text-2xl font-extralight text-white rounded-3xl h-[50px] mt-10"
      >
        <span>
          <MdAddBusiness />
        </span>
        <span>Create Gig</span>
      </div>
      <div className="pb-20 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {renderTypesOfGigs()?.map((gig, index) => {
          const formattedDate = new Date(gig.created_at).toLocaleDateString();
          return (
            <div
              key={index}
              className="flex flex-col bg-white mt-5 px-5 py-8  gap-5 rounded-2xl w-full"
            >
              <div key={index} className="flex flex-row justify-between ">
                <div className="flex flex-col">
                  <span className="font-semibold">{gig.title}</span>
                  <span className="text-slate-400">
                    {gig.creatorName.slice(0, 20)}...
                  </span>
                </div>
                <div>
                  <Button
                    background="bg-blue-200"
                    extra="px-3 text-blue-500"
                    label={gig.amount.toString()}
                    onClick={() => console.log("clicked")}
                  />
                </div>
              </div>
              <img
                src={gig.image}
                alt={gig.image}
                className="h-[200px] w-full"
              />
              <div className="flex flex-row justify-around">
                <span className="flex flex-row gap-2 bg-slate-200 rounded-2xl px-2 py-2 justify-center items-center text-slate-500">
                  <CiLocationOn /> {gig.state} {gig.city}
                </span>
                <span className="flex flex-row gap-2 bg-slate-200 rounded-2xl px-2 py-2 justify-center items-center text-slate-500">
                  <BiCalendar /> {formattedDate}
                </span>
              </div>
              {selectedTab === "Manage" && (
                <div className="flex flex-row justify-around">
                  <span
                    onClick={() => {
                      setCurrentGig(gig);
                      SetIsOpenEditGig((prev) => !prev);
                    }}
                    className="flex flex-row gap-2  rounded-2xl px-2 py-2 justify-center items-center text-slate-500"
                  >
                    <FiEdit3 />
                    Edit gig
                  </span>
                  <span
                    onClick={() => DeleteGig(gig.id)}
                    className="flex flex-row gap-2 rounded-2xl px-2 py-2 justify-center items-center text-slate-500"
                  >
                    <CgTrashEmpty /> Delete Gig
                  </span>
                </div>
              )}
              <Button
                label="View Job"
                background=""
                extra="h-[50px] w-full bg-blue-300"
                onClick={() => {
                  setCurrentGig(gig);
                  SetIsOpenViewGig((prev) => !prev);
                }}
              />
            </div>
          );
        })}
      </div>
      <Loader isLoading={loading} />
    </div>
  );
};

export default Home;
