import React, { useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import modeAtomsAtom from "../../../atoms/modeAtoms.atom";
import { Popover } from "react-tiny-popover";
import DefaultContent from "../../../components/defaultContent/defaultContent";
import EditRole from "./modals/EditRole";
import NewUser from "./modals/NewUser";

const UserCard = ({ data, mode, showEdit, setTask, setCurUser }: any) => {
  const [showPopup, setShowPopUp] = useState(false);
  return (
    <div
      className={`grid grid-cols-11 p-[16px] border-bottom mb-[8px] place-content-center h-[52px] w-[180vw] md:w-full ${
        mode === "dark" ? "bg-lightDark" : "bg-white"
      }`}
    >
      <p className="font-semibold text-[12px] col-span-2">{data?.name}</p>
      <p
        className={`font-medium ${
          mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
        } text-[12px]`}
      >
        {data?.id}
      </p>
      <p
        className={`font-medium ${
          mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
        } text-[12px] col-span-2`}
      >
        {data?.email}
      </p>
      <p
        className={`font-medium ${
          mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
        } text-[12px]`}
      >
        {data?.role}
      </p>
      <p
        className={`font-medium ${
          mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
        } text-[12px] col-span-2`}
      >
        {data?.permissions.join(",")}
      </p>
      <p
        className={`font-medium ${
          mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
        } text-[12px]`}
      >
        {data?.created_at}
      </p>
      <p
        className={`font-medium ${
          data?.status === "Active"
            ? "text-[#2AB849]"
            : data?.status === "Suspended"
            ? "text-[#FF7D30]"
            : "text-[#FF161A]"
        } text-[12px]`}
      >
        {data?.status}
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
                      setTask("view");
                      setCurUser(data);
                      showEdit();
                      // showDetails();
                      // navigate(`repository/list/${data?.id}`);
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
                        d="M15.2372 9.98083C12.7362 4.42306 5.26409 4.42306 2.76309 9.98083C2.63561 10.2641 2.30261 10.3904 2.01931 10.263C1.73601 10.1355 1.6097 9.80247 1.73718 9.51917C4.63619 3.07694 13.3641 3.07694 16.2631 9.51917C16.3906 9.80247 16.2643 10.1355 15.981 10.263C15.6977 10.3904 15.3647 10.2641 15.2372 9.98083Z"
                        fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9 8.8125C9.93198 8.8125 10.6875 9.56802 10.6875 10.5C10.6875 11.432 9.93198 12.1875 9 12.1875C8.06802 12.1875 7.3125 11.432 7.3125 10.5C7.3125 9.56802 8.06802 8.8125 9 8.8125ZM11.8125 10.5C11.8125 8.9467 10.5533 7.6875 9 7.6875C7.4467 7.6875 6.1875 8.9467 6.1875 10.5C6.1875 12.0533 7.4467 13.3125 9 13.3125C10.5533 13.3125 11.8125 12.0533 11.8125 10.5Z"
                        fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                      />
                    </svg>
                    <p className="text-[12px] font-medium">view Details</p>
                  </button>
                </li>
                <li className="border-start-0 px-0">
                  <button
                    onClick={() => {
                      setTask("edit");
                      setCurUser(data);
                      showEdit();
                      setShowPopUp(false);
                    }}
                    className="flex items-center gap-[12px] border-bottom px-[30px] py-[16px] justify-between font-medium"
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
                        fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9 11.8125C7.23959 11.8125 5.8125 13.2396 5.8125 15V15.75H4.6875V15C4.6875 12.6183 6.61827 10.6875 9 10.6875C11.3817 10.6875 13.3125 12.6183 13.3125 15V15.75H12.1875V15C12.1875 13.2396 10.7604 11.8125 9 11.8125Z"
                        fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9 7.3125C8.06802 7.3125 7.3125 8.06802 7.3125 9C7.3125 9.93198 8.06802 10.6875 9 10.6875C9.93198 10.6875 10.6875 9.93198 10.6875 9C10.6875 8.06802 9.93198 7.3125 9 7.3125ZM6.1875 9C6.1875 7.4467 7.4467 6.1875 9 6.1875C10.5533 6.1875 11.8125 7.4467 11.8125 9C11.8125 10.5533 10.5533 11.8125 9 11.8125C7.4467 11.8125 6.1875 10.5533 6.1875 9Z"
                        fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                      />
                    </svg>

                    <p className="text-[12px] font-medium">Change roles</p>
                  </button>
                </li>
                <li className="border-start-0 px-0">
                  <button
                    onClick={() => {
                      setShowPopUp(false);
                    }}
                    className="flex items-center gap-[12px] border-bottom px-[30px] py-[16px] justify-between font-medium"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_2959_11891)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13.5688 5.51126C13.7885 5.29159 14.1446 5.29159 14.3643 5.51126L15.5576 6.7045L16.7508 5.51126C16.9705 5.29159 17.3266 5.29159 17.5463 5.51126C17.766 5.73093 17.766 6.08709 17.5463 6.30676L16.353 7.5L17.5463 8.69324C17.766 8.91291 17.766 9.26907 17.5463 9.48874C17.3266 9.70841 16.9705 9.70841 16.7508 9.48874L15.5576 8.2955L14.3643 9.48874C14.1446 9.70841 13.7885 9.70841 13.5688 9.48874C13.3491 9.26907 13.3491 8.91291 13.5688 8.69324L14.7621 7.5L13.5688 6.30676C13.3491 6.08709 13.3491 5.73093 13.5688 5.51126Z"
                          fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M6 9.5625C3.41117 9.5625 1.3125 11.6612 1.3125 14.25V15C1.3125 15.3107 1.06066 15.5625 0.75 15.5625C0.43934 15.5625 0.1875 15.3107 0.1875 15V14.25C0.1875 11.0398 2.78984 8.4375 6 8.4375C9.21016 8.4375 11.8125 11.0398 11.8125 14.25V15C11.8125 15.3107 11.5607 15.5625 11.25 15.5625C10.9393 15.5625 10.6875 15.3107 10.6875 15V14.25C10.6875 11.6612 8.58883 9.5625 6 9.5625Z"
                          fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M6 3.5625C4.65381 3.5625 3.5625 4.65381 3.5625 6C3.5625 7.34619 4.65381 8.4375 6 8.4375C7.34619 8.4375 8.4375 7.34619 8.4375 6C8.4375 4.65381 7.34619 3.5625 6 3.5625ZM2.4375 6C2.4375 4.03249 4.03249 2.4375 6 2.4375C7.96751 2.4375 9.5625 4.03249 9.5625 6C9.5625 7.96751 7.96751 9.5625 6 9.5625C4.03249 9.5625 2.4375 7.96751 2.4375 6Z"
                          fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2959_11891">
                          <rect width="18" height="18" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>

                    <p className="text-[12px] font-medium">Suspend user</p>
                  </button>
                </li>
                <li className="border-start-0 px-0">
                  <button
                    onClick={() => {
                      // setDelete();
                      setShowPopUp(false);
                    }}
                    className="flex items-center gap-[12px] border-bottom px-[30px] py-[16px] justify-between font-medium"
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
                        d="M6.75 9.5625C4.16117 9.5625 2.0625 11.6612 2.0625 14.25V15C2.0625 15.3107 1.81066 15.5625 1.5 15.5625C1.18934 15.5625 0.9375 15.3107 0.9375 15V14.25C0.9375 11.0398 3.53984 8.4375 6.75 8.4375V9.5625Z"
                        fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.4361 8.8536C12.1406 8.08005 13.3577 8.08005 14.0622 8.8536C14.1927 8.9969 14.3803 9.07459 14.5739 9.06554C15.619 9.0167 16.4797 9.87736 16.4308 10.9225C16.4218 11.1161 16.4995 11.3037 16.6428 11.4342C17.4163 12.1386 17.4163 13.3558 16.6428 14.0603C16.4995 14.1908 16.4218 14.3783 16.4308 14.5719C16.4797 15.6171 15.619 16.4777 14.5739 16.4289C14.3803 16.4198 14.1927 16.4975 14.0622 16.6408C13.3577 17.4144 12.1406 17.4144 11.4361 16.6408C11.3056 16.4975 11.118 16.4198 10.9244 16.4289C9.87931 16.4777 9.01865 15.6171 9.0675 14.5719C9.07654 14.3783 8.99885 14.1908 8.85555 14.0603C8.082 13.3558 8.082 12.1386 8.85555 11.4342C8.99885 11.3037 9.07654 11.1161 9.0675 10.9225C9.01865 9.87736 9.87931 9.0167 10.9244 9.06554C11.118 9.07459 11.3056 8.9969 11.4361 8.8536ZM13.2304 9.61109C12.9722 9.32755 12.5261 9.32755 12.2679 9.61109C11.9118 10.002 11.4001 10.214 10.8719 10.1893C10.4888 10.1714 10.1734 10.4869 10.1913 10.87C10.216 11.3982 10.004 11.9099 9.61304 12.2659C9.32951 12.5241 9.32951 12.9703 9.61304 13.2285C10.004 13.5845 10.216 14.0963 10.1913 14.6245C10.1734 15.0075 10.4888 15.323 10.8719 15.3051C11.4001 15.2804 11.9118 15.4924 12.2679 15.8833C12.5261 16.1669 12.9722 16.1669 13.2304 15.8833C13.5865 15.4924 14.0982 15.2804 14.6264 15.3051C15.0095 15.323 15.325 15.0075 15.307 14.6245C15.2824 14.0963 15.4943 13.5845 15.8853 13.2285C16.1688 12.9703 16.1688 12.5241 15.8853 12.2659C15.4943 11.9099 15.2824 11.3982 15.307 10.87C15.325 10.4869 15.0095 10.1714 14.6264 10.1893C14.0982 10.214 13.5865 10.002 13.2304 9.61109Z"
                        fill="black"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.1243 12.3523C11.344 12.1326 11.7001 12.1326 11.9198 12.3523L12.3402 12.7727L13.5789 11.5341C13.7985 11.3144 14.1547 11.3144 14.3744 11.5341C14.594 11.7537 14.594 12.1099 14.3744 12.3296L12.738 13.9659C12.5183 14.1856 12.1622 14.1856 11.9425 13.9659L11.1243 13.1477C10.9046 12.9281 10.9046 12.5719 11.1243 12.3523Z"
                        fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.75 3.5625C5.40381 3.5625 4.3125 4.65381 4.3125 6C4.3125 7.34619 5.40381 8.4375 6.75 8.4375C8.09619 8.4375 9.1875 7.34619 9.1875 6C9.1875 4.65381 8.09619 3.5625 6.75 3.5625ZM3.1875 6C3.1875 4.03249 4.78249 2.4375 6.75 2.4375C8.71751 2.4375 10.3125 4.03249 10.3125 6C10.3125 7.96751 8.71751 9.5625 6.75 9.5625C4.78249 9.5625 3.1875 7.96751 3.1875 6Z"
                        fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                      />
                    </svg>

                    <p className="text-[12px] font-medium">Activate User</p>
                  </button>
                </li>
                <li className="border-start-0 px-0">
                  <button
                    onClick={() => {
                      // setDelete();
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
                        fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.96875 2.0625C7.45098 2.0625 7.03125 2.48223 7.03125 3V3.9375H10.9688V3C10.9688 2.48223 10.549 2.0625 10.0312 2.0625H7.96875ZM5.90625 3.9375V3C5.90625 1.86091 6.82966 0.9375 7.96875 0.9375H10.0312C11.1704 0.9375 12.0938 1.86092 12.0938 3V3.9375H15.75C16.0607 3.9375 16.3125 4.18934 16.3125 4.5C16.3125 4.81066 16.0607 5.0625 15.75 5.0625H2.25C1.93934 5.0625 1.6875 4.81066 1.6875 4.5C1.6875 4.18934 1.93934 3.9375 2.25 3.9375H5.90625Z"
                        fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                      />
                    </svg>

                    <p className="text-[12px] font-medium">Delete User</p>
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
  );
};

type Props = {
  goBack: any;
};

const UserComponent = ({ goBack }: Props) => {
  const { mode } = useRecoilValue(modeAtomsAtom);
  const [addNew, setAddNew] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [curUser, setCurUser] = useState<any>({});
  const [curTask, setCurTask] = useState("");
  const [users, setUsers] = useState<any[]>([
    {
      name: "Daniel Omolola",
      id: "T89203",
      email: "gestar@accord.com",
      role: "{Role name}",
      permissions: ["Permission1", "action2", "action3"],
      created_at: "3/12/2014",
      status: "Suspended",
    },
    {
      name: "Tery Apala",
      id: "T89223",
      email: "terry@accord.com",
      role: "{Role name}",
      permissions: ["Permission1", "action2", "action3"],
      created_at: "3/12/2014",
      status: "Active",
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
            Users
          </h1>
          <p
            className={`${
              mode === "dark"
                ? "text-[#EAEAEA]"
                : "text-[#6A6A6A] border-end font-medium text-[12px] pr-[16px] py-[2px]"
            }`}
          >
            Manage roles
          </p>
        </div>
        <button
          onClick={() => setAddNew(true)}
          className="bg-primary font-medium text-[14px] text-white px-[24px] w-44  py-[12px] rounded-full flex items-center justify-center gap-[10px]"
        >
          <span>Add User</span>
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
              d="M8.00065 9C5.69946 9 3.83398 10.8655 3.83398 13.1667V13.8333C3.83398 14.1095 3.61013 14.3333 3.33398 14.3333C3.05784 14.3333 2.83398 14.1095 2.83398 13.8333V13.1667C2.83398 10.3132 5.14718 8 8.00065 8C10.8541 8 13.1673 10.3132 13.1673 13.1667V13.8333C13.1673 14.1095 12.9435 14.3333 12.6673 14.3333C12.3912 14.3333 12.1673 14.1095 12.1673 13.8333V13.1667C12.1673 10.8655 10.3018 9 8.00065 9Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.00065 3.66406C6.80403 3.66406 5.83398 4.63411 5.83398 5.83073C5.83398 7.02735 6.80403 7.9974 8.00065 7.9974C9.19727 7.9974 10.1673 7.02735 10.1673 5.83073C10.1673 4.63411 9.19727 3.66406 8.00065 3.66406ZM4.83398 5.83073C4.83398 4.08183 6.25175 2.66406 8.00065 2.66406C9.74955 2.66406 11.1673 4.08183 11.1673 5.83073C11.1673 7.57963 9.74955 8.9974 8.00065 8.9974C6.25175 8.9974 4.83398 7.57963 4.83398 5.83073Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
      <div
        className={`mt-[27px] mb-[39px] ${
          mode === "dark" ? "bg-lightDark" : "bg-white"
        } w-fit px-[24px] py-[16px] flex items-center gap-[12px]  rounded-[12px] border`}
      >
        <div className="flex items-center gap-[12px]">
          <svg
            width="42"
            height="42"
            viewBox="0 0 42 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="42"
              height="42"
              rx="21"
              fill="#284CB3"
              fillOpacity="0.1"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21 21.5625C18.4112 21.5625 16.3125 23.6612 16.3125 26.25V27C16.3125 27.3107 16.0607 27.5625 15.75 27.5625C15.4393 27.5625 15.1875 27.3107 15.1875 27V26.25C15.1875 23.0398 17.7898 20.4375 21 20.4375C24.2102 20.4375 26.8125 23.0398 26.8125 26.25V27C26.8125 27.3107 26.5607 27.5625 26.25 27.5625C25.9393 27.5625 25.6875 27.3107 25.6875 27V26.25C25.6875 23.6612 23.5888 21.5625 21 21.5625Z"
              fill="#284CB3"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21 15.5625C19.6538 15.5625 18.5625 16.6538 18.5625 18C18.5625 19.3462 19.6538 20.4375 21 20.4375C22.3462 20.4375 23.4375 19.3462 23.4375 18C23.4375 16.6538 22.3462 15.5625 21 15.5625ZM17.4375 18C17.4375 16.0325 19.0325 14.4375 21 14.4375C22.9675 14.4375 24.5625 16.0325 24.5625 18C24.5625 19.9675 22.9675 21.5625 21 21.5625C19.0325 21.5625 17.4375 19.9675 17.4375 18Z"
              fill="#284CB3"
            />
          </svg>
          <div className="flex items-center gap-[8px] pr-[16px] border-end pt-[2px]">
            <h1 className="font-semibold text-[18px]">8</h1>
            <p
              className={`${
                mode === "dark"
                  ? "text-[#EAEAEA]"
                  : "text-[#6A6A6A] font-medium text-[14px]"
              }`}
            >
              Total Users
            </p>
          </div>
        </div>
        <div className="flex items-center gap-[8px] pr-[16px] border-end">
          <h1 className="font-semibold text-[18px]">3</h1>
          <p
            className={`${
              mode === "dark"
                ? "text-[#EAEAEA]"
                : "text-[#6A6A6A] font-medium text-[14px]"
            }`}
          >
            Super Admin
          </p>
        </div>
        <div className="flex items-center gap-[8px]">
          <h1 className="font-semibold text-[18px]">0</h1>
          <p
            className={`${
              mode === "dark"
                ? "text-[#EAEAEA]"
                : "text-[#6A6A6A] font-medium text-[14px]"
            }`}
          >
            Suspended Users
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between border-bottom pb-[14px] mb-[24px]">
        <div className="flex items-center flex-col md:flex-row gap-[16px]">
          <h1 className="font-semibold text-[14px] uppercase md:text-[18px]">
            Users
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
          className={`grid grid-cols-11 p-[12px] rounded-t-[16px] mb-3 border-bottom place-content-center h-[52px] w-[180vw] md:w-full ${
            mode === "dark" ? "bg-lightDark" : "bg-white"
          }`}
        >
          <p className="font-medium text-[12px] col-span-2">Name</p>
          <p className="font-medium text-[12px]">ID</p>
          <p className="font-medium text-[12px] col-span-2">Email</p>
          <p className="font-medium text-[12px]">Role</p>
          <p className="font-medium text-[12px] col-span-2">Permisions</p>
          <p className="font-medium text-[12px]">Created at</p>
          <p className="font-medium text-[12px]">Status</p>
          <button className="flex items-center justify-center font-semibold">
            <FaEllipsisH />
          </button>
        </div>
        {users.length < 1 ? (
          <DefaultContent
            pageHeader="All Users"
            pageDescription="No record found"
            loading={false}
            buttonValue="Refresh"
            // buttonClick={() => refreshrecord()}
            buttonClick={() => {}}
          />
        ) : (
          users.map((user) => (
            <UserCard
              data={user}
              mode={mode}
              key={user?.id}
              setTask={setCurTask}
              setCurUser={setCurUser}
              showEdit={() => setShowEdit(true)}
            />
          ))
        )}
      </div>
      <EditRole
        mode={mode}
        task={curTask}
        data={curUser}
        isOpen={showEdit}
        handleHide={() => setShowEdit(false)}
      />
      <NewUser
        isOpen={addNew}
        handleHide={() => setAddNew(false)}
        mode={mode}
      />
    </div>
  );
};

export default UserComponent;
