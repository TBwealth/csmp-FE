import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import modeAtomsAtom from "../../../atoms/modeAtoms.atom";
import UserComponent from "./UserComponent";
import RoleComponent from "./RoleComponent";

const UserManagement = () => {
  const { mode } = useRecoilValue(modeAtomsAtom);
  const [isHome, setIsHome] = useState(true);
  const [selection, setSelection] = useState("");
  return (
    <div className="px-8 mt-[32px] w-full">
      {isHome && (
        <div className="flex items-center justify-between flex-col md:flex-row gap-[16px]">
          <button
            onClick={() => {
              setIsHome(false);
              setSelection("user");
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
                    d="M10 40V31C10 27.134 13.134 24 17 24H31C34.866 24 38 27.134 38 31V40"
                    stroke="#284CB3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M24 24C28.4183 24 32 20.4183 32 16C32 11.5817 28.4183 8 24 8C19.5817 8 16 11.5817 16 16C16 20.4183 19.5817 24 24 24Z"
                    stroke="#284CB3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="w-full">
                <h1 className="text-left font-semibold text-[14px] mb-[8px]">
                  Manage Users{" "}
                </h1>
                <p
                  className={`${
                    mode === "dark"
                      ? "text-[#EAEAEA]"
                      : "text-[#6A6A6A] font-medium text-[12px]"
                  }`}
                >
                  Add, Remove and edit users in your account.
                </p>
              </div>
            </div>
            <button className="flex items-center justify-center">
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
                    <stop offset="0.198551" stop-color="#2E54C3" />
                    <stop offset="0.683389" stop-color="#1F3A89" />
                  </linearGradient>
                </defs>
              </svg>
            </button>
          </button>
          <button
            onClick={() => {
              setIsHome(false);
              setSelection("role");
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
                    d="M5 19L24 8L43 19"
                    stroke="#284CB3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 42V37C14 33.134 17.134 30 21 30H27C30.866 30 34 33.134 34 37V42"
                    stroke="#284CB3"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M24 30C27.3137 30 30 27.3137 30 24C30 20.6863 27.3137 18 24 18C20.6863 18 18 20.6863 18 24C18 27.3137 20.6863 30 24 30Z"
                    stroke="#284CB3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="w-full">
                <h1 className="text-left font-semibold text-[14px] mb-[8px]">
                  Roles and Permission{" "}
                </h1>
                <p
                  className={`${
                    mode === "dark"
                      ? "text-[#EAEAEA]"
                      : "text-[#6A6A6A] font-medium text-[12px]"
                  }`}
                >
                  Manage roles and permission on your acccount.
                </p>
              </div>
            </div>
            <button className="flex items-center justify-center">
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
                    <stop offset="0.198551" stop-color="#2E54C3" />
                    <stop offset="0.683389" stop-color="#1F3A89" />
                  </linearGradient>
                </defs>
              </svg>
            </button>
          </button>
        </div>
      )}
      {selection === "user" && (
        <UserComponent
          goBack={() => {
            setIsHome(true);
            setSelection("");
          }}
        />
      )}
      {selection === "role" && (
        <RoleComponent
          goBack={() => {
            setIsHome(true);
            setSelection("");
          }}
        />
      )}
    </div>
  );
};

export default UserManagement;
