import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import modeAtomsAtom from "../../../../../atoms/modeAtoms.atom";
import IACExclusion from "./IACExclusion";
import IACompliance from "./IACompliance";


const IACPoliciesHome = () => {
    const [isHome, setIsHome] = useState(true);
  const { mode } = useRecoilValue(modeAtomsAtom);
  const [selection, setSelection] = useState("");

  useEffect(() => {
    const curPage = sessionStorage.getItem("cur_policy_page");
    if (curPage) {
      setIsHome(false);
      setSelection(curPage);
    }
  }, []);

  return (
    <div className="px-8 mt-[32px] w-full">
     {isHome && (
        <div className="flex items-center justify-between flex-col md:flex-row gap-[16px]">
          <button
            onClick={() => {
              setIsHome(false);
              setSelection("compliance");
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
                    d="M28 38L34 44L44 34"
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
                IAC Compliance{" "}
                </h1>
                <p
                  className={`${
                    mode === "dark"
                      ? "text-[#EAEAEA] text-start"
                      : "text-[#6A6A6A] text-start font-medium text-[12px]"
                  }`}
                >
                  Ensure compliance and protect your IAC Templates
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
              setSelection("exclusion");
              sessionStorage.setItem("cur_policy_page", "exclusion")
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
                    d="M24 32C28.4183 32 32 28.4183 32 24C32 19.5817 28.4183 16 24 16C19.5817 16 16 19.5817 16 24C16 28.4183 19.5817 32 24 32Z"
                    stroke="#284CB3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M42 14.353L42 33.647C42 33.8649 41.8819 34.0656 41.6914 34.1715L24.2914 43.8381C24.1102 43.9388 23.8898 43.9388 23.7086 43.8381L6.30861 34.1715C6.11813 34.0656 6 33.8649 6 33.647L5.99996 14.353C5.99996 14.1351 6.1181 13.9344 6.30857 13.8285L23.7086 4.16188C23.8898 4.06121 24.1102 4.06121 24.2914 4.16188L41.6913 13.8285C41.8818 13.9344 42 14.1351 42 14.353Z"
                    stroke="#284CB3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.05688 14.5863L16.8 19.9991M41 14.5547L31.2 19.9991"
                    stroke="#284CB3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M24 42V32"
                    stroke="#284CB3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="w-full">
                <h1 className="text-start font-semibold text-[14px] mb-[8px]">
                  Exclusions{" "}
                </h1>
                <p
                  className={`${
                    mode === "dark"
                      ? "text-[#EAEAEA] text-start"
                      : "text-[#6A6A6A] text-start font-medium text-[12px]"
                  }`}
                >
                  Create and setup exclusions and policy exception
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
      {selection === "compliance" && (
        <IACompliance
          mode={mode}
          goBack={() => {
            setIsHome(true);
            setSelection("");
          }}
        />
      )}
      {selection === "exclusion" && (
        <IACExclusion
          mode={mode}
          goBack={() => {
            setIsHome(true);
            setSelection("");
          }}
        />
      )}
    </div>
  )
}

export default IACPoliciesHome