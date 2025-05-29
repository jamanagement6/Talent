import { BiCalendar, BiSearch } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import Button from "../Components/button";
import { useEffect, useState } from "react";
import {
  IMerchantAd,
} from "../types";
import { AdsFetches } from "../BackendServices/adsFetchServices";
import { JobDetails } from "../Pages/JobDetails";
import Loader from "../Components/Loader";

const Gigs = () => {
  const adsfetches = new AdsFetches();
  const [isOpenViewGig, SetIsOpenViewGig] = useState<boolean>(false);
  const [currentGig, setCurrentGig] = useState<IMerchantAd|null>(null);
  const [allAvailableAds, setAllAvailableAds] = useState<IMerchantAd[] | null>(null);
  const [loading, setIsLoading] = useState<boolean>(false);
  
  const getAllAds = async () => {
    setIsLoading(true);
    const allAvailableAds = await adsfetches.GetAllAvailableAds();
    setAllAvailableAds(allAvailableAds.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getAllAds();
  }, []);
  return (
    <div className="flex flex-col px-3 justify-center">
      <h3 className=" flex mx-auto text-2xl font-semibold py-5">Gigs</h3>
      <div>
        <div className="w-full mt-10 rounded-2xl h-[60px] shadow-xl flex flex-row bg-white px-3 items-center justify-center">
          <input
            type="text"
            className="w-full px-5 h-full focus:outline-none"
          />
          <BiSearch className="text-2xl font-extralight" />
        </div>


        <div className="pb-20">
          {allAvailableAds?.map((gig, index) => (
            <div
              key={index}
              className="flex flex-col bg-white mt-5 px-5 py-8  gap-5 rounded-2xl w-full"
            >
              <div key={index} className="flex flex-row justify-between ">
                <div className="flex flex-col">
                  <span className="font-semibold">
                    {gig.title.slice(0, 20)}...
                  </span>
                  <span className="text-slate-400">
                    {gig.by.slice(0, 20)}...
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
                alt={gig.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <div className="flex flex-row justify-around">
                <span className="flex flex-row gap-2 bg-slate-200 rounded-2xl px-2 py-2 justify-center items-center text-slate-500">
                  <CiLocationOn />
                  {gig.state} {gig.city}
                </span>
                <span className="flex flex-row gap-2 bg-slate-200 rounded-2xl px-2 py-2 justify-center items-center text-slate-500">
                  <BiCalendar /> {new Date(gig.created_at).getMonth() + 1}/
                  {new Date(gig.created_at).getDate()}/
                  {new Date(gig.created_at).getFullYear()}
                </span>
              </div>
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
          ))}
        </div>

        {isOpenViewGig && (
          <div className="bg-white fixed transform -translate-x-3 top-0 w-full h-screen overflow-auto z-20 justify-center">
            <JobDetails SetIsOpenViewGig={SetIsOpenViewGig} Gig={currentGig as IMerchantAd} />
          </div>
        )}
      </div>
      <Loader isLoading={loading}/>
    </div>
  );
};

export default Gigs;
