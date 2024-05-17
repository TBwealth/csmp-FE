import { Dispatch, useState } from "react";
import { useRecoilValue } from "recoil";
import modeAtomsAtom from "../../../atoms/modeAtoms.atom";
import awsLogo from "../../../../../public/media/logos/aws-logo.svg";
import azureLogo from "../../../../../public/media/logos/azure-logo.svg";
import gcpLogo from "../../../../../public/media/logos/gogle-logo.svg";

type Props = {
  next: Dispatch<void>;
  handleHide: Dispatch<void>;
  inModal: boolean;
};

const StepOne = ({ next, handleHide, inModal }: Props) => {
  const { mode } = useRecoilValue(modeAtomsAtom);
  const [selectedProvider, setSelectedProvider] = useState("aws");
  return (
    <div
      className={`w-[90%] rounded-lg border-2 mx-auto md:w-[68%] ${
        mode === "dark" ? "bg-lightDark" : "bg-[#FFFFFF]"
      }`}
    >
      <div className="flex items-center p-6 justify-between w-full">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 rounded-full flex bg-[#284CB30D] items-center justify-center">
            <svg
              width="18"
              height="14"
              viewBox="0 0 18 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.54484 2.9769C5.07414 3.7614 5.0625 4.72927 5.0625 5.5C5.0625 5.81066 4.81066 6.0625 4.5 6.0625C3.96501 6.0625 3.15001 6.22762 2.48492 6.70649C1.84851 7.1647 1.3125 7.93333 1.3125 9.25C1.3125 10.5667 1.84851 11.3353 2.48492 11.7935C3.15001 12.2724 3.96501 12.4375 4.5 12.4375H13.5C14.035 12.4375 14.85 12.2724 15.5151 11.7935C16.1515 11.3353 16.6875 10.5667 16.6875 9.25C16.6875 7.93333 16.1515 7.1647 15.5151 6.70649C14.85 6.22762 14.035 6.0625 13.5 6.0625C13.1893 6.0625 12.9375 5.81066 12.9375 5.5C12.9375 4.72927 12.9259 3.7614 12.4552 2.9769C12.022 2.25503 11.113 1.5625 9 1.5625C6.88698 1.5625 5.97796 2.25503 5.54484 2.9769ZM4.58016 2.3981C5.27204 1.24497 6.61302 0.4375 9 0.4375C11.387 0.4375 12.728 1.24497 13.4198 2.3981C13.937 3.26011 14.0381 4.24186 14.0578 4.97563C14.7068 5.06101 15.487 5.30002 16.1724 5.79351C17.0985 6.4603 17.8125 7.56667 17.8125 9.25C17.8125 10.9333 17.0985 12.0397 16.1724 12.7065C15.275 13.3526 14.215 13.5625 13.5 13.5625H4.5C3.78499 13.5625 2.72499 13.3526 1.82758 12.7065C0.901487 12.0397 0.1875 10.9333 0.1875 9.25C0.1875 7.56667 0.901487 6.4603 1.82758 5.79351C2.51299 5.30002 3.29324 5.06101 3.9422 4.97562C3.96186 4.24186 4.06295 3.26011 4.58016 2.3981Z"
                fill="#284CB3"
              />
            </svg>
          </div>
          <p className="text-[18px] font-semibold text-[#373737]">
            Add New Cloud Account
          </p>
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
      <div className="w-full grid md:grid-cols-3 p-6 gap-5 mt-10">
        <div className="flex flex-col items-start justify-center">
          <h4
            className={`mb-4 text-[16px] font-semibold ${
              mode === "dark" ? "text-[#EAEAEA]" : "text-[#373737]"
            }`}
          >
            Select a cloud account provider
          </h4>
          <p
            className={
              mode === "dark"
                ? "text-[#EAEAEA] md:w-72 text-[14px]"
                : "text-[#373737] md:w-72 text-[14px]"
            }
          >
            We currently have provisions for AWS and other services would be
            available soon
          </p>
        </div>
        <div className="grid md:grid-cols-3 md:col-span-2 w-full gap-16">
          <label htmlFor="aws" className="hover:cursor-pointer w-full">
            <div
              className={`${
                selectedProvider === "aws" ? "bg-white" : "bg-[#EAEAEA]/20"
              }  rounded-md border-2 shadow-md flex items-center flex-col gap-3 px-5 py-8 w-full`}
            >
              <img src={awsLogo} alt="amazon web service logo" />
              <p
                className={`text-[16px] mt-6 font-semibold ${
                  mode === "dark" ? "text-[#EAEAEA]" : "text-[#373737]"
                }`}
              >
                AWS Account
              </p>
            </div>
            <input
              type="radio"
              name="provider"
              id="aws"
              value="aws"
              onChange={(e) => setSelectedProvider(e.target.value)}
              className="opacity-0"
            />
          </label>
          <label
            htmlFor="azure"
            className="hover:cursor-pointer w-full relative"
          >
            <small className="text-primary bg-[#E9EDF7] w-fit rounded-full py-1 px-4 absolute -top-2 -right-2">
              <b>SOON</b>
            </small>
            <div
              className={`${
                selectedProvider === "azure" ? "bg-white" : "bg-[#EAEAEA]/20"
              }  rounded-md border-2 shadow-md flex items-center flex-col gap-3 px-5 py-8 w-full`}
            >
              <img src={azureLogo} alt="Azure logo" />
              <p
                className={`text-[16px] mt-6 font-semibold ${
                  mode === "dark" ? "text-[#EAEAEA]" : "text-[#373737]"
                }`}
              >
                Azure Project
              </p>
            </div>
            {/* <input
              type="radio"
              name="provider"
              id="azure"
              value="azure"
              onChange={(e) => setSelectedProvider(e.target.value)}
              className="opacity-0"
            /> */}
          </label>
          <label htmlFor="gcp" className="hover:cursor-pointer w-full relative">
            <small className="text-primary bg-[#E9EDF7] w-fit rounded-full py-1 px-4 absolute -top-2 -right-2">
              <b>SOON</b>
            </small>
            <div
              className={`${
                selectedProvider === "gcp" ? "bg-white" : "bg-[#EAEAEA]/20"
              }  rounded-md border-2 shadow-md flex items-center flex-col gap-3 px-5 py-8 w-full`}
            >
              <img src={gcpLogo} alt="google cloud provider logo" />
              <p
                className={`text-[16px] mt-6 font-semibold ${
                  mode === "dark" ? "text-[#EAEAEA]" : "text-[#373737]"
                }`}
              >
                GCP Project
              </p>
            </div>
            <input
              type="radio"
              name="provider"
              id="gpc"
              value="gcp"
              onChange={(e) => setSelectedProvider(e.target.value)}
              className="opacity-0"
            />
          </label>
        </div>
      </div>
      <div className="mt-8 border-top-2 w-full flex p-5 items-end justify-end gap-6">
        <button 
        onClick={inModal ? () => handleHide : () => {}}
        className="bg-[#284CB3]/40 w-32 rounded-full p-2 text-white text-center">
          Cancel
        </button>
        <button
          onClick={() => next()}
          className="bg-[#284CB3] w-32 rounded-full p-2 text-white text-center"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default StepOne;
