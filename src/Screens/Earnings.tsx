import { BiBell } from "react-icons/bi";
import { IoEyeOutline } from "react-icons/io5";

const Earnings = () => {
  const amount = new Intl.NumberFormat("en-US", {
    style: "decimal",
  }).format(2750);
  return (
    <div className="flex justify-between gap-10 flex-col px-5 py-5">
      <div className="flex flex-row justify-between ">
        <span className="text-xl font-semibold">Earnings</span>

        <BiBell className="text-2xl" />
      </div>

      <div className="flex flex-row px-5">
        <div className="flex justify-center  py-2 items-center  w-auto px-3 mx-auto bg-gradient-to-r from-blue-100 to-blue-300  rounded-2xl">
          <span>Current balance</span>
        </div>
        <span className="text-2xl">
          <IoEyeOutline />
        </span>
      </div>
      <div className="flex justify-center mt-9">
        <sup className="font-bold">NGN</sup>
        <span className="text-5xl font-bold">{amount}</span>
      </div>
      <div className="flex flex-col">
        <h3 className="font-semibold">Transactions History</h3>
      </div>
    </div>
  );
};

export default Earnings;
