import React from "react";
import { useRecoilValue } from "recoil";
import modeAtomsAtom from "../../../atoms/modeAtoms.atom";
import awsLogo from "../../../../../public/media/logos/aws-logo.svg";
import { FaCheck } from "react-icons/fa";

const Success = ({ handleHide }: any) => {
  const { mode } = useRecoilValue(modeAtomsAtom);

  return (
    <div
      className={`w-[90%] rounded-lg border-2 mx-auto md:w-[68%] ${
        mode === "dark" ? "bg-lightDark" : "bg-[#FFFFFF]"
      }`}
    >
      <div className="relative flex items-center flex-col  pt-6 justify-center w-full">
        <div className=" bg-[#284CB30D] w-12 h-12 rounded-full flex items-center justify-center">
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <FaCheck size={8} color="white" />
          </div>
        </div>
        <div className="w-full mt-6">
          <p className="text-[18px] text-center font-semibold text-[#373737] mb-2">
            Account Connected Sucessfully
          </p>
          <p className="text-[12px] text-center font-light text-[#373737]">
            We have setup your account and by default we are scanning for cloud
            resources.
          </p>
        </div>
        <div className="mt-6 bg-white rounded-2xl border-2 shadow-md flex items-center flex-col gap-3 px-5 py-8">
          <img src={awsLogo} alt="amazon web service logo" />
          <p
            className={`text-[18px] mt-6 font-semibold ${
              mode === "dark" ? "text-[#EAEAEA]" : "text-[#373737]"
            }`}
          >
            Synthyl Database
          </p>
          <p className="bg-[#284CB31A] text-primary rounded-full px-2 py-1 w-24 text-center">
            PROD
          </p>
        </div>
        <div className="flex items-center gap-2 mt-6">
          <p className="text-primary text-[14px] font-medium">
            Scanning Resources. . .
          </p>
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.75 2.9375C6.06066 2.9375 6.3125 3.18934 6.3125 3.5L6.3125 4.25C6.3125 4.56066 6.06066 4.8125 5.75 4.8125C5.43934 4.8125 5.1875 4.56066 5.1875 4.25L5.1875 3.5C5.1875 3.18934 5.43934 2.9375 5.75 2.9375Z"
              fill="#284CB3"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.75 6.6875C6.06066 6.6875 6.3125 6.93934 6.3125 7.25L6.3125 8C6.3125 8.31066 6.06066 8.5625 5.75 8.5625C5.43934 8.5625 5.1875 8.31066 5.1875 8L5.1875 7.25C5.1875 6.93934 5.43934 6.6875 5.75 6.6875Z"
              fill="#284CB3"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.8523 3.10225C13.0719 2.88258 13.4281 2.88258 13.6477 3.10225L15.8977 5.35225C16.1174 5.57192 16.1174 5.92808 15.8977 6.14775C15.6781 6.36742 15.3219 6.36742 15.1023 6.14775L13.8125 4.858V15.5C13.8125 15.8107 13.5607 16.0625 13.25 16.0625C12.9393 16.0625 12.6875 15.8107 12.6875 15.5V4.858L11.3977 6.14775C11.1781 6.36742 10.8219 6.36742 10.6023 6.14775C10.3826 5.92808 10.3826 5.57192 10.6023 5.35225L12.8523 3.10225Z"
              fill="#284CB3"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.35225 15.8977C5.57192 16.1174 5.92808 16.1174 6.14775 15.8977L8.39775 13.6477C8.61742 13.4281 8.61742 13.0719 8.39775 12.8523C8.17808 12.6326 7.82192 12.6326 7.60225 12.8523L6.3125 14.142V11C6.3125 10.6893 6.06066 10.4375 5.75 10.4375C5.43934 10.4375 5.1875 10.6893 5.1875 11V14.142L3.89775 12.8523C3.67808 12.6326 3.32192 12.6326 3.10225 12.8523C2.88258 13.0719 2.88258 13.4281 3.10225 13.6477L5.35225 15.8977Z"
              fill="#284CB3"
            />
          </svg>
        </div>
        <button onClick={() => handleHide()} className="absolute top-3 right-4">
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
        <div className="mt-8 border-top-2 w-full flex p-5 items-end justify-end gap-6">
          <button
            onClick={() => handleHide()}
            className="bg-[#284CB3] w-32 rounded-full p-2 text-white text-center"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
