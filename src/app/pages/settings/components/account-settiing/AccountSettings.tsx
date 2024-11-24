import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import modeAtomsAtom from "../../../../atoms/modeAtoms.atom";
import PasswordManagement from "./PasswordManagement";
import DefaulEmail from "./DefaulEmail";
import TwoFA from "./TwoFA";
import DeletAccount from "./DeletAccount";

const AccountSettings = () => {
  const [isHome, setIsHome] = useState(true);
  const [curPage, setCurPage] = useState("");
  const { mode } = useRecoilValue(modeAtomsAtom);
  const [user, setUser] = useState<any>({});
 

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      const parsedUser = JSON.parse(localUser);
      setUser({
        first_name: parsedUser?.first_name,
        last_name: parsedUser?.last_name,
        email: parsedUser?.email,
        id: parsedUser?.id,
        role: parsedUser?.role?.name,
      });
    }
  }, []);

  return (
    <div className="mt-[32px] w-full md:mx-auto md:w-[70%]">
      {isHome && (
        <div
          className={`rounded-[16px] p-[32px] border ${
            mode === "dark" ? "bg-lightDark" : "bg-white"
          }`}
        >
          <div className="flex items-center pb-[24px] border-bottom justify-between">
            <div className="flex items-center gap-[24px]">
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
              <div className="">
                <h1 className="font-semibold text-start text-[18px]">
                  {`${user?.first_name} ${user?.last_name}`}
                </h1>
                <p
                  className={`${
                    mode === "dark"
                      ? "text-[#EAEAEA]"
                      : "text-[#6A6A6A] font-medium text-[12px]"
                  }`}
                >
                  {user?.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-[16px]">
              <p
                className={`${
                  mode === "dark"
                    ? "text-[#EAEAEA]"
                    : "text-[#6A6A6A] font-medium text-[12px] pr-[16px] border-end"
                }`}
              >
                {user?.id}
              </p>
              <p className="rounded-full font-semibold bg-[#284CB31A] text-[8px] py-[2px] px-[10px] text-primary">
                {user?.role}
              </p>
            </div>
          </div>
          <div className="flex items-center py-[24px] border-bottom justify-between">
            <div className="">
              <div className="flex items-center gap-[8px] mb-[8px]">
                <svg
                  width="18"
                  height="19"
                  viewBox="0 0 18 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.5 7.0625C5.84619 7.0625 6.9375 8.15381 6.9375 9.5C6.9375 10.8462 5.84619 11.9375 4.5 11.9375C3.15381 11.9375 2.0625 10.8462 2.0625 9.5C2.0625 8.15381 3.15381 7.0625 4.5 7.0625ZM8.01834 8.9375C7.74865 7.23726 6.27611 5.9375 4.5 5.9375C2.53249 5.9375 0.9375 7.53249 0.9375 9.5C0.9375 11.4675 2.53249 13.0625 4.5 13.0625C6.27611 13.0625 7.74865 11.7627 8.01834 10.0625H15.9375V11.75C15.9375 12.0607 16.1893 12.3125 16.5 12.3125C16.8107 12.3125 17.0625 12.0607 17.0625 11.75V9.5C17.0625 9.18934 16.8107 8.9375 16.5 8.9375H8.01834Z"
                    fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.5 8.9375C13.1893 8.9375 12.9375 9.18934 12.9375 9.5V11.75C12.9375 12.0607 13.1893 12.3125 13.5 12.3125C13.8107 12.3125 14.0625 12.0607 14.0625 11.75V9.5C14.0625 9.18934 13.8107 8.9375 13.5 8.9375Z"
                    fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                  />
                </svg>

                <h1 className="font-semibold text-start text-[14px]">
                  Password Management
                </h1>
              </div>
              <p
                className={`${
                  mode === "dark"
                    ? "text-[#EAEAEA]"
                    : "text-[#6A6A6A] font-medium text-[12px]"
                }`}
              >
                Option to update/change the account password
              </p>
            </div>
            <button
              onClick={() => {
                setIsHome(false);
                setCurPage("password");
              }}
              className="flex items-center justify-center"
            >
              <svg
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.5 9.5H13.875M13.875 9.5L9.375 5M13.875 9.5L9.375 14"
                  stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center py-[24px] border-bottom justify-between">
            <div className="">
              <div className="flex items-center gap-[8px] mb-[8px]">
                <svg
                  width="18"
                  height="19"
                  viewBox="0 0 18 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.78923 6.92743C4.96738 6.67292 5.31812 6.61103 5.57262 6.78918L9.00005 9.18838L12.4275 6.78918C12.682 6.61103 13.0327 6.67292 13.2109 6.92743C13.389 7.18193 13.3271 7.53266 13.0726 7.71082L9.32262 10.3358C9.12894 10.4714 8.87116 10.4714 8.67748 10.3358L4.92748 7.71082C4.67297 7.53266 4.61108 7.18193 4.78923 6.92743Z"
                    fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3 4.8125C2.48223 4.8125 2.0625 5.23223 2.0625 5.75V13.25C2.0625 13.7678 2.48223 14.1875 3 14.1875H15C15.5178 14.1875 15.9375 13.7678 15.9375 13.25V5.75C15.9375 5.23223 15.5178 4.8125 15 4.8125H3ZM0.9375 5.75C0.9375 4.61091 1.86091 3.6875 3 3.6875H15C16.1391 3.6875 17.0625 4.61091 17.0625 5.75V13.25C17.0625 14.3891 16.1391 15.3125 15 15.3125H3C1.86091 15.3125 0.9375 14.3891 0.9375 13.25V5.75Z"
                    fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                  />
                </svg>

                <h1 className="font-semibold text-start text-[14px]">
                  Default Email
                </h1>
              </div>
              <p
                className={`${
                  mode === "dark"
                    ? "text-[#EAEAEA]"
                    : "text-[#6A6A6A] font-medium text-[12px]"
                }`}
              >
                Configure or change default email credentials or username
              </p>
            </div>
            <button
              onClick={() => {
                setIsHome(false);
                setCurPage("email");
              }}
              className="flex items-center justify-center"
            >
              <svg
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.5 9.5H13.875M13.875 9.5L9.375 5M13.875 9.5L9.375 14"
                  stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center py-[24px] border-bottom justify-between">
            <div className="">
              <div className="flex items-center gap-[8px] mb-[8px]">
                <svg
                  width="18"
                  height="19"
                  viewBox="0 0 18 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.14351 4.29633C6.6978 3.52649 7.61667 2.9375 9 2.9375C10.3833 2.9375 11.3022 3.52649 11.8565 4.29633C12.3901 5.03749 12.5625 5.90999 12.5625 6.5V8.9375H13.05C13.6092 8.9375 14.0625 9.39081 14.0625 9.95V15.05C14.0625 15.6092 13.6092 16.0625 13.05 16.0625H4.95C4.39081 16.0625 3.9375 15.6092 3.9375 15.05V9.95C3.9375 9.39081 4.39081 8.9375 4.95 8.9375H5.4375V6.5C5.4375 5.90999 5.60988 5.03749 6.14351 4.29633ZM6.5625 8.9375H11.4375V6.5C11.4375 6.09001 11.3099 5.46251 10.9435 4.95367C10.5978 4.47351 10.0167 4.0625 9 4.0625C7.98333 4.0625 7.4022 4.47351 7.05649 4.95367C6.69012 5.46251 6.5625 6.09001 6.5625 6.5V8.9375ZM5.0625 10.0625V14.9375H12.9375V10.0625H5.0625Z"
                    fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                  />
                </svg>

                <h1 className="font-semibold text-start text-[14px]">
                  Two-Factor Authentication (2FA/MFA)
                </h1>
              </div>
              <p
                className={`${
                  mode === "dark"
                    ? "text-[#EAEAEA]"
                    : "text-[#6A6A6A] font-medium text-[12px]"
                }`}
              >
                Enable or manage two-factor authentication options (via SMS,
                authenticator app, etc.).
              </p>
            </div>
            <button
              onClick={() => {
                setIsHome(false);
                setCurPage("2fa");
              }}
              className="flex items-center justify-center"
            >
              <svg
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.5 9.5H13.875M13.875 9.5L9.375 5M13.875 9.5L9.375 14"
                  stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center py-[24px] justify-between">
            <div className="">
              <div className="flex items-center gap-[8px] mb-[8px]">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.0975 6.19609C15.4035 6.24989 15.6079 6.54154 15.5541 6.8475L14.0578 15.3572C14.0578 15.3572 14.0578 15.3572 14.0578 15.3572C13.8845 16.3434 13.0278 17.0626 12.0266 17.0626H5.97365C4.97234 17.0626 4.1157 16.3434 3.94231 15.3572L2.44609 6.8475C2.3923 6.54153 2.59672 6.24989 2.90269 6.19609C3.20865 6.1423 3.5003 6.34672 3.5541 6.65269L5.05032 15.1624C5.12913 15.6107 5.51853 15.9376 5.97365 15.9376H12.0266C12.4816 15.9376 12.871 15.6107 12.9498 15.1624L12.9498 15.1624L14.4461 6.65268C14.4999 6.34672 14.7915 6.14229 15.0975 6.19609Z"
                    fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.96875 2.0625C7.45098 2.0625 7.03125 2.48223 7.03125 3V3.9375H10.9688V3C10.9688 2.48223 10.549 2.0625 10.0312 2.0625H7.96875ZM5.90625 3.9375V3C5.90625 1.86091 6.82966 0.9375 7.96875 0.9375H10.0312C11.1704 0.9375 12.0938 1.86092 12.0938 3V3.9375H15.75C16.0607 3.9375 16.3125 4.18934 16.3125 4.5C16.3125 4.81066 16.0607 5.0625 15.75 5.0625H2.25C1.93934 5.0625 1.6875 4.81066 1.6875 4.5C1.6875 4.18934 1.93934 3.9375 2.25 3.9375H5.90625Z"
                    fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                  />
                </svg>

                <h1 className="font-semibold text-start text-[14px]">
                  Delete Account
                </h1>
              </div>
              <p
                className={`${
                  mode === "dark"
                    ? "text-[#EAEAEA]"
                    : "text-[#6A6A6A] font-medium text-[12px]"
                }`}
              >
                Deleting your account has consequences and can’t be reversed.
                Think carefully before doing this!!!
              </p>
            </div>
            <button
              onClick={() => {
                setIsHome(false);
                setCurPage("delete-account");
              }}
              className="flex items-center justify-center"
            >
              <svg
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.5 9.5H13.875M13.875 9.5L9.375 5M13.875 9.5L9.375 14"
                  stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
      {curPage === "password" && (
        <PasswordManagement
          mode={mode}
          goBack={() => {
            setCurPage("");
            setIsHome(true);
          }}
        />
      )}
      {curPage === "email" && (
        <DefaulEmail
          mode={mode}
          goBack={() => {
            setCurPage("");
            setIsHome(true);
          }}
        />
      )}
      {curPage === "2fa" && (
        <TwoFA
          mode={mode}
          goBack={() => {
            setCurPage("");
            setIsHome(true);
          }}
        />
      )}
      {curPage === "delete-account" && (
        <DeletAccount
          mode={mode}
          goBack={() => {
            setCurPage("");
            setIsHome(true);
          }}
        />
      )}
    </div>
  );
};

export default AccountSettings;
