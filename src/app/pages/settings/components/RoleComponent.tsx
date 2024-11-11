import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import modeAtomsAtom from "../../../atoms/modeAtoms.atom";
import NewRole from "./modals/NewRole";
import { Popover } from "react-tiny-popover";
import { FaEllipsisH } from "react-icons/fa";
import DefaultContent from "../../../components/defaultContent/defaultContent";

const RoleCard = ({ data, mode, setCurUser }: any) => {
  const [showPopup, setShowPopUp] = useState(false);
  return (
    <div
      className={`grid grid-cols-5 p-[16px] border-bottom mb-[8px] place-content-center h-[52px] w-[180vw] md:w-full ${
        mode === "dark" ? "bg-lightDark" : "bg-white"
      }`}
    >
      <p className="font-semibold text-[12px] col-span-2">{data?.role}</p>
      <p
        className={`font-medium ${
          mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
        } text-[12px] col-span-2`}
      >
        {data?.desc}
      </p>
      <div className="flex items-center justify-between">
        <p
          className={`font-medium ${
            mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
          } text-[12px] col-span-2`}
        >
          {data?.user}
        </p>
        <Popover
          onClickOutside={() => setShowPopUp(false)}
          isOpen={showPopup}
          positions={["top", "right"]} // preferred positions by priority
          content={
            <div>
              <div
                key={20}
                id="dropdown"
                className={`z-10 ${
                  mode === "dark" ? "bg-lightDark" : "bg-white"
                } divide-y divide-gray-100 rounded-[12px] shadow-sm px-2`}
                style={{ minWidth: "11rem" }}
              >
                <ul
                  key={28}
                  className="py-2 text-[10px] font-medium"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li className="border-start-0 px-0">
                    <button
                      onClick={() => {
                        setCurUser(data);
                        setShowPopUp(false);
                      }}
                      className="flex items-center px-[30px] py-[16px] gap-[12px] border-bottom justify-between font-medium"
                    >
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
                          d="M8.71826 2.5132C8.89259 2.41227 9.10759 2.41227 9.28193 2.5132L16.4069 6.6382C16.6758 6.79385 16.7675 7.13798 16.6119 7.40683C16.4562 7.67569 16.1121 7.76745 15.8433 7.6118L9.00009 3.64997L2.15693 7.6118C1.88807 7.76745 1.54394 7.67569 1.38829 7.40683C1.23264 7.13798 1.32441 6.79385 1.59326 6.6382L8.71826 2.5132Z"
                          fill="#373737"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9 11.8125C7.23959 11.8125 5.8125 13.2396 5.8125 15V15.75H4.6875V15C4.6875 12.6183 6.61827 10.6875 9 10.6875C11.3817 10.6875 13.3125 12.6183 13.3125 15V15.75H12.1875V15C12.1875 13.2396 10.7604 11.8125 9 11.8125Z"
                          fill="#373737"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9 7.3125C8.06802 7.3125 7.3125 8.06802 7.3125 9C7.3125 9.93198 8.06802 10.6875 9 10.6875C9.93198 10.6875 10.6875 9.93198 10.6875 9C10.6875 8.06802 9.93198 7.3125 9 7.3125ZM6.1875 9C6.1875 7.4467 7.4467 6.1875 9 6.1875C10.5533 6.1875 11.8125 7.4467 11.8125 9C11.8125 10.5533 10.5533 11.8125 9 11.8125C7.4467 11.8125 6.1875 10.5533 6.1875 9Z"
                          fill="#373737"
                        />
                      </svg>

                      <p className="text-[12px] font-medium">
                        Edit permissions
                      </p>
                    </button>
                  </li>
                  <li className="border-start-0 px-0">
                    <button
                      onClick={() => {
                        setCurUser(data);
                        setShowPopUp(false);
                      }}
                      className="flex items-center gap-[12px] px-[30px] py-[16px] justify-between font-medium"
                    >
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
                          fill="#373737"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.96875 2.0625C7.45098 2.0625 7.03125 2.48223 7.03125 3V3.9375H10.9688V3C10.9688 2.48223 10.549 2.0625 10.0312 2.0625H7.96875ZM5.90625 3.9375V3C5.90625 1.86091 6.82966 0.9375 7.96875 0.9375H10.0312C11.1704 0.9375 12.0938 1.86092 12.0938 3V3.9375H15.75C16.0607 3.9375 16.3125 4.18934 16.3125 4.5C16.3125 4.81066 16.0607 5.0625 15.75 5.0625H2.25C1.93934 5.0625 1.6875 4.81066 1.6875 4.5C1.6875 4.18934 1.93934 3.9375 2.25 3.9375H5.90625Z"
                          fill="#373737"
                        />
                      </svg>

                      <p className="text-[12px] font-medium">Delete role</p>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          }
        >
          <button
            onClick={() => {
              setShowPopUp(true);
            }}
            className="flex items-center justify-center font-semibold"
          >
            <FaEllipsisH />
          </button>
        </Popover>
      </div>
    </div>
  );
};

type Props = {
  goBack: any;
};

const RoleComponent = ({ goBack }: Props) => {
  const { mode } = useRecoilValue(modeAtomsAtom);
  const [showAdd, setShowAdd] = useState(false);
  const [curUser, setCurUser] = useState<any>({});
  const [allRoles, setAllRoles] = useState<any[]>([
    {
      role: "Kubernetes agent",
      desc: "Internal roles used by agents",
      user: "2",
    },
    {
      role: "Admin",
      desc: "Manage all system resources",
      user: "0",
    },
    {
      role: "CSPM Manager",
      desc: "Cloud and security manager",
      user: "1",
    },
    {
      role: "Auditor",
      desc: "Internal role used by kubernertes",
      user: "1",
    },
  ]);
  return (
    <div className="px-8 mt-[32px] w-full">
      <div className="flex items-center justify-between flex-col md:flex-row gap-[16px]">
        <div className="flex items-center gap-[16px]">
          <button onClick={goBack}>
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.5303 5.96967C12.8232 6.26256 12.8232 6.73744 12.5303 7.03033L7.81066 11.75H18.5C18.9142 11.75 19.25 12.0858 19.25 12.5C19.25 12.9142 18.9142 13.25 18.5 13.25H7.81066L12.5303 17.9697C12.8232 18.2626 12.8232 18.7374 12.5303 19.0303C12.2374 19.3232 11.7626 19.3232 11.4697 19.0303L5.46967 13.0303C5.17678 12.7374 5.17678 12.2626 5.46967 11.9697L11.4697 5.96967C11.7626 5.67678 12.2374 5.67678 12.5303 5.96967Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
            </svg>
          </button>
          <h1 className="font-semibold text-[14px] border-end pr-[16px] py-[2px]">
            Roles and Permission
          </h1>
          <p
            className={`${
              mode === "dark"
                ? "text-[#EAEAEA]"
                : "text-[#6A6A6A] border-end font-medium text-[12px] pr-[16px] py-[2px]"
            }`}
          >
            View users
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-primary font-medium text-[14px] text-white px-[24px] w-fit  py-[12px] rounded-full flex items-center justify-center gap-[10px]"
        >
          <span>Create new role</span>
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.74989 2.73135C7.90485 2.64163 8.09596 2.64163 8.25093 2.73135L14.5843 6.39802C14.8232 6.53637 14.9048 6.84227 14.7665 7.08125C14.6281 7.32023 14.3222 7.4018 14.0832 7.26344L8.00041 3.74181L1.91759 7.26344C1.67861 7.4018 1.37272 7.32023 1.23436 7.08125C1.096 6.84227 1.17758 6.53637 1.41656 6.39802L7.74989 2.73135Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.00033 11C6.43552 11 5.16699 12.2685 5.16699 13.8333V14.5H4.16699V13.8333C4.16699 11.7162 5.88323 10 8.00033 10C10.1174 10 11.8337 11.7162 11.8337 13.8333V14.5H10.8337V13.8333C10.8337 12.2685 9.56513 11 8.00033 11Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 7C7.17157 7 6.5 7.67157 6.5 8.5C6.5 9.32843 7.17157 10 8 10C8.82843 10 9.5 9.32843 9.5 8.5C9.5 7.67157 8.82843 7 8 7ZM5.5 8.5C5.5 7.11929 6.61929 6 8 6C9.38071 6 10.5 7.11929 10.5 8.5C10.5 9.88071 9.38071 11 8 11C6.61929 11 5.5 9.88071 5.5 8.5Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
      <div className="my-[32px] flex items-center justify-between border-bottom pb-[14px] mb-[24px]">
        <div className="flex items-center flex-col md:flex-row gap-[16px]">
          <h1 className="font-semibold text-[14px] uppercase md:text-[18px]">
            Roles (4)
          </h1>
        </div>
        <div className="flex items-center gap-[16px] -order-1 md:order-1">
          <div className="relative">
            <input
              type="text"
              //   onChange={(e) => handleSearch(e.target.value)}
              className={`${
                mode === "dark"
                  ? "placeholder:text-[#EAEAEA]"
                  : "placeholder:text-[#373737]"
              } w-32 bg-transparent focus:outline-none focus:border focus:w-full rounded-[8px] font-medium px-3 py-2 placeholder:font-medium `}
              placeholder="Search"
            />
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-2 right-2"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.3523 12.3523C12.5719 12.1326 12.9281 12.1326 13.1477 12.3523L16.1477 15.3523C16.3674 15.5719 16.3674 15.9281 16.1477 16.1477C15.9281 16.3674 15.5719 16.3674 15.3523 16.1477L12.3523 13.1477C12.1326 12.9281 12.1326 12.5719 12.3523 12.3523Z"
                fill={mode === "dark" ? "#EAEAEA" : "black"}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.25 2.8125C5.24695 2.8125 2.8125 5.24695 2.8125 8.25C2.8125 11.253 5.24695 13.6875 8.25 13.6875C9.75428 13.6875 11.115 13.0774 12.1 12.0898C13.0816 11.1056 13.6875 9.74908 13.6875 8.25C13.6875 5.24695 11.253 2.8125 8.25 2.8125ZM1.6875 8.25C1.6875 4.62563 4.62563 1.6875 8.25 1.6875C11.8744 1.6875 14.8125 4.62563 14.8125 8.25C14.8125 10.0589 14.0799 11.6977 12.8966 12.8842C11.7091 14.0748 10.0652 14.8125 8.25 14.8125C4.62563 14.8125 1.6875 11.8744 1.6875 8.25Z"
                fill={mode === "dark" ? "#EAEAEA" : "black"}
              />
            </svg>
          </div>
          <button
            // onClick={() => setShowPopOver(!showPopOver)}
            className="flex text-[10px] md:text-[12px] font-medium items-center gap-3 border-start pl-[16px]"
          >
            <p>Filter</p>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.25 4.5H15.75"
                stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.25 9L12.75 9"
                stroke={mode === "dark" ? "#EAEAEA" : "black"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.25 13.5L9.75 13.5"
                stroke={mode === "dark" ? "#EAEAEA" : "black"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="w-full overflow-x-scroll">
        <div
          className={`grid grid-cols-5 p-[12px] rounded-t-[16px] mb-3 border-bottom place-content-center h-[52px] w-[180vw] md:w-full ${
            mode === "dark" ? "bg-lightDark" : "bg-white"
          }`}
        >
          <p className="font-medium text-[12px] col-span-2">Role</p>
          <p className="font-medium text-[12px] col-span-2">Description</p>
          <div className="flex items-center justify-between">
            <p className="font-medium text-[12px]">Users</p>
            <button className="flex items-center justify-center font-semibold">
              <FaEllipsisH />
            </button>
          </div>
        </div>
        {allRoles.length < 1 ? (
          <DefaultContent
            pageHeader="All Users"
            pageDescription="No record found"
            loading={false}
            buttonValue="Refresh"
            // buttonClick={() => refreshrecord()}
            buttonClick={() => {}}
          />
        ) : (
          allRoles.map((roles) => (
            <RoleCard
              data={roles}
              mode={mode}
              key={roles?.role}
              setCurUser={setCurUser}
              //   showEdit={() => setShowEdit(true)}
            />
          ))
        )}
      </div>
      <NewRole
        isOpen={showAdd}
        handleHide={() => setShowAdd(false)}
        mode={mode}
      />
    </div>
  );
};

export default RoleComponent;
