import { Dispatch, useState } from "react";
import { useRecoilValue } from "recoil";
import modeAtomsAtom from "../../../atoms/modeAtoms.atom";
import awsLogo from "../../../../../public/media/logos/aws-logo.svg";
import { Link } from "react-router-dom";
import { HiServer } from "react-icons/hi";
import { FaCode } from "react-icons/fa";

type Props = {
  goBack: Dispatch<void>;
  next: Dispatch<void>;
  handleHide: Dispatch<void>;
};

const StepTwo = ({ goBack, next, handleHide }: Props) => {
  const { mode } = useRecoilValue(modeAtomsAtom);
  const [data, setData] = useState({
    cloud_name: "",
    environment: "",
  });
  return (
    <div
      className={`w-[90%] rounded-lg border-2 mx-auto md:w-[68%] ${
        mode === "dark" ? "bg-lightDark" : "bg-[#FFFFFF]"
      }`}
    >
      <div className="flex items-center p-6 justify-between w-full">
        <div className="flex items-center gap-5">
          <button onClick={() => goBack()}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.5303 5.46967C12.8232 5.76256 12.8232 6.23744 12.5303 6.53033L7.81066 11.25H18.5C18.9142 11.25 19.25 11.5858 19.25 12C19.25 12.4142 18.9142 12.75 18.5 12.75H7.81066L12.5303 17.4697C12.8232 17.7626 12.8232 18.2374 12.5303 18.5303C12.2374 18.8232 11.7626 18.8232 11.4697 18.5303L5.46967 12.5303C5.17678 12.2374 5.17678 11.7626 5.46967 11.4697L11.4697 5.46967C11.7626 5.17678 12.2374 5.17678 12.5303 5.46967Z"
                fill="black"
              />
            </svg>
          </button>
          <p className="text-[18px] font-semibold text-[#373737]">
            Add a new AWS account
          </p>
          <Link to="/" className="p-3 border-start text-[#6A6A6A] text-[12px]">
            Need help? Click here{" "}
          </Link>
        </div>
        <button onClick={() => handleHide()}>
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.670548 0.670272C0.890218 0.450602 1.24637 0.450602 1.46604 0.670272L5.00028 4.2045L8.53451 0.670272C8.75418 0.450602 9.11033 0.450602 9.33 0.670272C9.54967 0.889942 9.54967 1.2461 9.33 1.46577L5.79577 5L9.33 8.53423C9.54967 8.7539 9.54967 9.11006 9.33 9.32973C9.11033 9.5494 8.75418 9.5494 8.53451 9.32973L5.00028 5.7955L1.46604 9.32973C1.24637 9.5494 0.890218 9.5494 0.670548 9.32973C0.450878 9.11006 0.450879 8.7539 0.670548 8.53423L4.20478 5L0.670548 1.46577C0.450879 1.2461 0.450878 0.889942 0.670548 0.670272Z"
              fill="#373737"
            />
          </svg>
        </button>
      </div>
      <div className="grid md:grid-cols-4 p-6 gap-10 mt-10">
        <div className="md:col-span-2">
          <div className="form-group mb-10">
            <label htmlFor="provider" className="flex items-center gap-4">
              <HiServer size={18} />
              <p className="font-semibold text-[14px]">Cloud Name</p>
            </label>
            <input
              type="text"
              placeholder="Account Name"
              autoComplete="off"
              value={data?.cloud_name}
              onChange={(e) => setData({ ...data, cloud_name: e.target.value })}
              className="w-full p-3 mt-2 rounded-md border-2 border-light"
            />
          </div>
          <div className="form-group">
            <label htmlFor="provider" className="flex items-center gap-4">
              <FaCode size={18} />
              <p className="font-semibold text-[14px]">Enviroment</p>
            </label>
            <input
              type="text"
              placeholder="Eg: Staging, Prod. . ."
              autoComplete="off"
              value={data?.environment}
              onChange={(e) =>
                setData({ ...data, environment: e.target.value })
              }
              className="w-full p-3 mt-2 rounded-md border-2 border-light"
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="bg-white  rounded-md border-2 shadow-md flex items-center flex-col gap-3 px-5 py-8 w-full md:w-64 mx-auto">
            <img src={awsLogo} alt="amazon web service logo" />
            <p
              className={`text-[16px] mt-6 font-semibold ${
                mode === "dark" ? "text-[#EAEAEA]" : "text-[#373737]"
              }`}
            >
              AWS Account
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 border-top-2 w-full flex p-5 items-end justify-end gap-6">
        <button
          onClick={() => goBack()}
          className="bg-[#284CB3]/40 w-32 rounded-full p-2 text-white text-center"
        >
          Cancel
        </button>
        <button
          onClick={() => next()}
          disabled={!data?.cloud_name || !data?.environment}
          className="bg-[#284CB3] w-32 rounded-full p-2 text-white text-center"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default StepTwo;
