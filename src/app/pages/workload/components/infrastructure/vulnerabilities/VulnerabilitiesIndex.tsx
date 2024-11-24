import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import modeAtomsAtom from "../../../../../atoms/modeAtoms.atom";
import VulAssessHistory from "./VulAssessHistory";
import VulScan from "./VulScan";

const VulnerabilitiesIndex = () => {
  const [isHome, setIsHome] = useState(true);
  const { mode } = useRecoilValue(modeAtomsAtom);
  const [selection, setSelection] = useState("");
  return (
    <div className="px-8 mt-[32px] w-full">
      {isHome && (
        <div className="flex items-center justify-between flex-col md:flex-row gap-[16px]">
          <button
            onClick={() => {
              setIsHome(false);
              setSelection("scan");
            }}
            className={`${
              mode === "dark" ? "bg-lightDark" : "bg-white"
            } rounded-[12px] flex-1 p-[24px] border-2 flex items-center justify-between`}
          >
            <div className="flex items-center gap-[16px]">
              <div className="rounded-full bg-[#284CB31A] p-[24px]">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M41 41L44 44"
                    stroke="#284CB3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M32 37C32 39.7614 34.2386 42 37 42C38.3831 42 39.635 41.4384 40.5402 40.5308C41.4423 39.6264 42 38.3783 42 37C42 34.2386 39.7614 32 37 32C34.2386 32 32 34.2386 32 37Z"
                    stroke="#284CB3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 12V24C8 24 8 30 22 30C36 30 36 24 36 24V12"
                    stroke="#284CB3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 6C36 6 36 12 36 12C36 12 36 18 22 18C8 18 8 12 8 12C8 12 8 6 22 6Z"
                    stroke="#284CB3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 42C8 42 8 36 8 36V24"
                    stroke="#284CB3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="w-full">
                <h1 className="text-start font-semibold text-[14px] mb-[8px]">
                  Scan IAC / Templates{" "}
                </h1>
                <p
                  className={`${
                    mode === "dark"
                      ? "text-[#EAEAEA] text-start"
                      : "text-[#6A6A6A] text-start font-medium text-[12px]"
                  }`}
                >
                  Ensure compliance and protect your IAC and Templates
                </p>
              </div>
            </div>
            <span className="flex items-center justify-center">
              <svg
                width="38"
                height="38"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.9513 8.66031C18.4876 9.12406 18.4876 9.87594 18.9513 10.3397L26.4241 17.8125H9.49935C8.84351 17.8125 8.31185 18.3442 8.31185 19C8.31185 19.6558 8.84351 20.1875 9.49935 20.1875H26.4241L18.9513 27.6603C18.4876 28.1241 18.4876 28.8759 18.9513 29.3397C19.4151 29.8034 20.167 29.8034 20.6307 29.3397L30.1307 19.8397C30.5945 19.3759 30.5945 18.6241 30.1307 18.1603L20.6307 8.66031C20.167 8.19656 19.4151 8.19656 18.9513 8.66031Z"
                  fill="url(#paint0_linear_2374_30932)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_2374_30932"
                    x1="30.4785"
                    y1="8.3125"
                    x2="6.79212"
                    y2="27.8445"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.198551" stopColor="#2E54C3" />
                    <stop offset="0.683389" stopColor="#1F3A89" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </button>
          <button
            onClick={() => {
              setIsHome(false);
              setSelection("assess");
            }}
            className={`${
              mode === "dark" ? "bg-lightDark" : "bg-white"
            } rounded-[12px] flex-1 p-[24px] border-2 flex items-center justify-between`}
          >
            <div className="flex items-center gap-[16px]">
              <div className="rounded-full bg-[#284CB31A] p-[24px]">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 8H10C8.89543 8 8 8.89543 8 10V42C8 43.1046 8.89543 44 10 44H24"
                    stroke="#284CB3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M31 8H38C39.1046 8 40 8.89543 40 10V30"
                    stroke="#284CB3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M16 13.4V9C16 8.44772 16.4477 8 17 8C17.5523 8 18.0084 7.55209 18.103 7.00796C18.3994 5.30343 19.548 2 24 2C28.452 2 29.6006 5.30343 29.897 7.00796C29.9916 7.55209 30.4477 8 31 8C31.5523 8 32 8.44772 32 9V13.4C32 13.7314 31.7314 14 31.4 14H16.6C16.2686 14 16 13.7314 16 13.4Z"
                    stroke="#284CB3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M31 41L35 45L45 35"
                    stroke="#284CB3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="w-full">
                <h1 className="text-start font-semibold text-[14px] mb-[8px]">
                  Assessment History{" "}
                </h1>
                <p
                  className={`${
                    mode === "dark"
                      ? "text-[#EAEAEA] text-start"
                      : "text-[#6A6A6A] text-start font-medium text-[12px]"
                  }`}
                >
                  View all Vulnerability report of your templates
                </p>
              </div>
            </div>
            <span className="flex items-center justify-center">
              <svg
                width="38"
                height="38"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.9513 8.66031C18.4876 9.12406 18.4876 9.87594 18.9513 10.3397L26.4241 17.8125H9.49935C8.84351 17.8125 8.31185 18.3442 8.31185 19C8.31185 19.6558 8.84351 20.1875 9.49935 20.1875H26.4241L18.9513 27.6603C18.4876 28.1241 18.4876 28.8759 18.9513 29.3397C19.4151 29.8034 20.167 29.8034 20.6307 29.3397L30.1307 19.8397C30.5945 19.3759 30.5945 18.6241 30.1307 18.1603L20.6307 8.66031C20.167 8.19656 19.4151 8.19656 18.9513 8.66031Z"
                  fill="url(#paint0_linear_2374_30932)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_2374_30932"
                    x1="30.4785"
                    y1="8.3125"
                    x2="6.79212"
                    y2="27.8445"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.198551" stopColor="#2E54C3" />
                    <stop offset="0.683389" stopColor="#1F3A89" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </button>
        </div>
      )}
      {selection === "scan" && (
        <VulScan
          mode={mode}
          goBack={() => {
            setIsHome(true);
            setSelection("");
          }}
        />
      )}
      {selection === "assess" && (
        <VulAssessHistory
          mode={mode}
          goBack={() => {
            setIsHome(true);
            setSelection("");
          }}
        />
      )}
    </div>
  );
};

export default VulnerabilitiesIndex;
