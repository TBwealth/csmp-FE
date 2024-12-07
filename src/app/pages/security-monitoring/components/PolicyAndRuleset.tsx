import React, { useEffect, useState } from "react";
import modeAtomsAtom from "../../../atoms/modeAtoms.atom";
import { useRecoilValue } from "recoil";
import regCompImg from "../../../../../public/media/logos/reg-comp.svg";
import { Link, useSearchParams } from "react-router-dom";
import PolicyIndex from "./policies/PolicyIndex";
import ExclusionIndex from "./policies/ExclusionIndex";

const PolicyAndRuleset = () => {
  const { mode } = useRecoilValue(modeAtomsAtom);
  const [search] = useSearchParams();
  const current = search.get("cur");
  const [isHome, setIsHome] = useState(true);
  const [selection, setSelection] = useState("");

  useEffect(() => {
    if (current) {
      setIsHome(false);
      setSelection(current);
    } else {
      setIsHome(true);
      setSelection("");
    }
  }, []);

  return (
    <div className="px-8 mt-[32px] w-full">
      {isHome && (
        <>
          <div
            className={`rounded-[12px] p-[16px] mb-[48px] flex items-center gap-[16px]  ${
              mode === "dark" ? "bg-lightDark" : "bg-white"
            }`}
          >
            <img
              src={regCompImg}
              alt="compliance shield"
              className="w-10 h-10"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-start text-[14px] mb-[8px]">
                Security Policies
              </h3>
              <p className="font-medium text-start text-[12px]">
                Manage and enforce your cloud and repo security policies. To
                learn more about policies and benchmarks, click here
              </p>
            </div>
            <Link to="/">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.73167 7C6.73167 6.51675 7.12342 6.125 7.60667 6.125H22.1667C22.6499 6.125 23.0417 6.51675 23.0417 7V21.56C23.0417 22.0432 22.6499 22.435 22.1667 22.435C21.6834 22.435 21.2917 22.0432 21.2917 21.56V9.11244L7.61872 22.7854C7.27701 23.1271 6.72299 23.1271 6.38128 22.7854C6.03957 22.4437 6.03957 21.8897 6.38128 21.5479L20.0542 7.875H7.60667C7.12342 7.875 6.73167 7.48325 6.73167 7Z"
                  fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                />
              </svg>
            </Link>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[24px]">
            <button
              onClick={() => {
                setIsHome(false);
                setSelection("policies");
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
                      d="M16 36L22 42L32 32"
                      stroke="#284CB3"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M40 35.2145C42.9874 34.0443 46 31.3778 46 26C46 18 39.3333 16 36 16C36 12 36 4 24 4C12 4 12 12 12 16C8.66667 16 2 18 2 26C2 31.3778 5.01255 34.0443 8 35.2145"
                      stroke="#284CB3"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="w-full">
                  <h1 className="text-start font-semibold text-[14px] mb-[8px]">
                    Cloud Security Policies{" "}
                  </h1>
                  <p
                    className={`${
                      mode === "dark"
                        ? "text-[#EAEAEA] text-start"
                        : "text-[#6A6A6A] text-start font-medium text-[12px]"
                    }`}
                  >
                    Ensure compliance and protect your cloud resources.
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
                // setIsHome(false);
                // setSelection("rules");
                console.log("rules")
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
                    Rules{" "}
                  </h1>
                  <p
                    className={`${
                      mode === "dark"
                        ? "text-[#EAEAEA] text-start"
                        : "text-[#6A6A6A] text-start font-medium text-[12px]"
                    }`}
                  >
                    Manage and create new rules.
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
                sessionStorage.setItem("cur_policy_page", "exclusion");
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
        </>
      )}

      {selection === "policies" && (
        <PolicyIndex
          goBack={() => {
            setIsHome(true);
            setSelection("");
          }}
          mode={mode}
        />
      )}
      {selection === "exclusion" && (
        <ExclusionIndex
          goBack={() => {
            setIsHome(true);
            setSelection("");
          }}
          mode={mode}
        />
      )}
    </div>
  );
};

export default PolicyAndRuleset;
