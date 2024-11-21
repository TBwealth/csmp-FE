import React, { useState } from "react";
import { Link } from "react-router-dom";
import ExclusionModal from "./ExclusionModal";

const Card = ({ data, mode }: any) => {
  return (
    <div
      className={`grid grid-cols-8 p-[12px] h-[45px] place-content-center  mb-[8px] border-bottom  ${
        mode === "dark" ? "bg-lightDark" : "bg-white"
      }`}
    >
      <p
        className={`col-span-2 font-medium flex text-[12px] items-center justify-start text-start ${
          mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
        }`}
      >
        {data?.rule}
      </p>
      <p
        className={`font-medium col-span-2 flex text-[12px] items-center justify-start text-start ${
          mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
        }`}
      >
        {data?.registry}
      </p>
      <p
        className={`font-medium flex text-[12px] items-center justify-start text-start ${
          mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
        }`}
      >
        {data?.exp_date}
      </p>
      <p
        className={`font-semibold px-[10px] py-[2px] flex text-[8px] rounded-full  items-center justify-center w-fit ${
          data?.status === "Active"
            ? "text-[#284CB3] bg-[#284CB31A]"
            : "text-[#FF7D30] bg-[#FF7D301A]"
        }`}
      >
        {data?.status}
      </p>
      <div className="flex col-span-2 items-center justify-between">
        <p
          className={`font-medium flex text-[12px] items-center justify-start text-start ${
            mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
          }`}
        >
          {data?.comment}
        </p>
        <button>
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.5 6.5C7.67157 6.5 7 7.17157 7 8C7 8.82843 7.67157 9.5 8.5 9.5C9.32843 9.5 10 8.82843 10 8C10 7.17157 9.32843 6.5 8.5 6.5ZM6 8C6 6.61929 7.11929 5.5 8.5 5.5C9.88071 5.5 11 6.61929 11 8C11 9.38071 9.88071 10.5 8.5 10.5C7.11929 10.5 6 9.38071 6 8Z"
              fill="#373737"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.33679 1.20478C7.3946 0.985126 7.59319 0.832031 7.82033 0.832031H9.12323C9.35045 0.832031 9.5491 0.985243 9.60683 1.20501L9.95855 2.5441L11.2503 3.07534L12.1748 2.28526C12.3732 2.1157 12.6687 2.12727 12.8532 2.31181L14.1866 3.64515C14.3704 3.82897 14.3827 4.12301 14.2148 4.32153L13.428 5.25208L13.9473 6.50614L15.2896 6.84745C15.5112 6.90381 15.6664 7.10337 15.6663 7.33206L15.6663 8.65019C15.6662 8.87782 15.5125 9.07672 15.2922 9.13404L13.9423 9.48527L13.4223 10.741L14.2144 11.6754C14.3827 11.8739 14.3706 12.1682 14.1866 12.3523L12.8532 13.6856C12.6654 13.8734 12.3636 13.8816 12.1658 13.7043L12.1288 13.6712C12.1048 13.6497 12.0701 13.6188 12.0275 13.581C11.9423 13.5054 11.8257 13.4025 11.7002 13.2933C11.5455 13.1586 11.3868 13.0227 11.2576 12.9162L9.99245 13.4401L9.65104 14.7881C9.59485 15.01 9.3952 15.1654 9.16634 15.1654H7.83301C7.60402 15.1654 7.4043 15.0098 7.34823 14.7878L7.0079 13.4402L5.77887 12.9346L4.81554 13.7196C4.6167 13.8817 4.3275 13.867 4.14612 13.6856L2.81279 12.3523C2.62539 12.1649 2.61676 11.8638 2.79312 11.666L3.59339 10.7683L3.06747 9.52068L1.70132 9.14771C1.48386 9.08834 1.33301 8.89079 1.33301 8.66536V7.33203C1.33301 7.09966 1.49309 6.89792 1.71938 6.84511L3.04902 6.53482L3.56063 5.27693L2.77828 4.31398C2.61671 4.11513 2.63161 3.82632 2.81279 3.64514L4.14612 2.31181C4.33336 2.12457 4.63411 2.11578 4.83197 2.29176L5.73248 3.09271L6.97814 2.56761L7.33679 1.20478ZM8.20577 1.83203L7.8826 3.06003C7.84312 3.21006 7.73623 3.33326 7.59328 3.39352L5.83017 4.13674C5.65254 4.21162 5.44769 4.17772 5.30365 4.04961L4.51976 3.35239L3.83875 4.03339L4.52332 4.87598C4.63837 5.01759 4.66715 5.21063 4.59841 5.37964L3.87783 7.15129C3.81668 7.30164 3.68636 7.41295 3.52831 7.44983L2.33301 7.72878V8.28357L3.56543 8.62003C3.71354 8.66046 3.83485 8.76669 3.89449 8.90816L4.63758 10.671C4.71254 10.8488 4.67848 11.0539 4.55006 11.1979L3.85374 11.979L4.53389 12.6591L5.37792 11.9713C5.52012 11.8554 5.71436 11.8267 5.88401 11.8965L7.62125 12.6112C7.76774 12.6714 7.87701 12.7976 7.9158 12.9512L8.22244 14.1654H8.77719L9.08466 12.9514C9.12342 12.7984 9.23219 12.6726 9.37805 12.6122L11.1451 11.8804C11.3046 11.8144 11.4868 11.8353 11.6272 11.9356C11.7981 12.0578 12.1086 12.323 12.3568 12.539C12.3987 12.5756 12.4397 12.6114 12.4789 12.6457L13.1538 11.9708L12.4622 11.155C12.3411 11.0121 12.31 10.8134 12.3817 10.6403L13.1136 8.87275C13.1736 8.72794 13.298 8.61963 13.4497 8.58016L14.6663 8.2636L14.6663 7.72079L13.458 7.41354C13.3052 7.37467 13.1796 7.26597 13.1193 7.12026L12.3875 5.3532C12.3159 5.18032 12.3469 4.98194 12.4677 4.83906L13.1543 4.02705L12.473 3.34584L11.6676 4.03411C11.525 4.156 11.3262 4.18778 11.1526 4.11642L9.34802 3.37428C9.20304 3.31466 9.09441 3.19049 9.05459 3.03888L8.7376 1.83203H8.20577Z"
              fill="#373737"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

type Props = {
  goBack: any;
  mode: string;
};

const Exclusion = ({ goBack, mode }: Props) => {
  const [showModalNew, setShowModalNew] = useState(false);
  const exclusionData = [
    {
      rule: "Insecure Code of Critical Severity",
      registry: "AWS ECR",
      exp_date: "2/3/2024",
      status: "Active",
      comment: "We will not run rule RL001 on EC2-00. . .",
      id: 0,
    },
    {
      rule: "Container Image Assurance Speed",
      registry: "Gilotec Prod",
      exp_date: "2/3/2024",
      status: "Expired",
      comment: "Ignore this instance for now till further notice",
      id: 1,
    },
  ];
  return (
    <div className="px-8 mt-[32px] w-full">
      <div className="flex items-center justify-between flex-col md:flex-row gap-[16px]">
        <div className="flex items-center flex-col md:flex-row gap-[16px]">
          <div className="flex items-center gap-[16px] border-end pr-[16px]">
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
            <h1 className="font-semibold text-[14px]">Exclusion</h1>
          </div>
          <Link
            to="/"
            className={`${
              mode === "dark"
                ? "text-[#EAEAEA]"
                : "text-[#6A6A6A] border-end font-medium text-[12px] pr-[16px] py-[2px]"
            }`}
          >
            Learn about exclusion
          </Link>
        </div>
      </div>
      <div className="w-full flex items-center mt-[28px] mb-[32px] justify-between">
        <div
          className={`rounded-[12px] p-[24px] flex items-center gap-[12px] border ${
            mode === "dark" ? "bg-lightDark" : "bg-white"
          }`}
        >
          <div className="bg-[#284CB31A] rounded-full p-[12px] flex items-center justify-center">
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
                d="M5.4375 9C5.4375 10.9675 7.03249 12.5625 9 12.5625C10.9675 12.5625 12.5625 10.9675 12.5625 9C12.5625 7.03249 10.9675 5.4375 9 5.4375C7.03249 5.4375 5.4375 7.03249 5.4375 9ZM9 11.4375C7.65381 11.4375 6.5625 10.3462 6.5625 9C6.5625 7.65381 7.65381 6.5625 9 6.5625C10.3462 6.5625 11.4375 7.65381 11.4375 9C11.4375 10.3462 10.3462 11.4375 9 11.4375Z"
                fill="#284CB3"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.49171 16.8687C9.18592 17.0386 8.81409 17.0386 8.50829 16.8687L2.20829 13.3687C1.88685 13.1901 1.6875 12.8513 1.6875 12.4836L1.68749 5.51316C1.68749 5.14545 1.88684 4.80665 2.20827 4.62807L8.50829 1.12807C8.81409 0.958187 9.18592 0.958185 9.49171 1.12807L15.7917 4.62807C16.1131 4.80665 16.3125 5.14545 16.3125 5.51315L16.3125 12.4836C16.3125 12.8513 16.1131 13.1901 15.7917 13.3687L9.49171 16.8687ZM9 15.8549L15.1875 12.4174L15.1875 5.57935L9 2.14185L2.81249 5.57935L2.8125 12.4174L9 15.8549Z"
                fill="#284CB3"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.8666 5.18396C15.7157 4.91239 15.3733 4.81455 15.1017 4.96542L11.4267 7.00709C11.1552 7.15796 11.0573 7.50041 11.2082 7.77198C11.3591 8.04355 11.7015 8.14139 11.9731 7.99052L15.6481 5.94885C15.9196 5.79798 16.0175 5.45552 15.8666 5.18396ZM2.15451 5.19581C2.00364 5.46737 2.10149 5.80983 2.37305 5.9607L6.02674 7.99052C6.29831 8.14139 6.64076 8.04354 6.79163 7.77198C6.9425 7.50041 6.84466 7.15796 6.57309 7.00709L2.9194 4.97727C2.64783 4.8264 2.30538 4.92424 2.15451 5.19581Z"
                fill="#284CB3"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 16.3125C8.68934 16.3125 8.4375 16.0607 8.4375 15.75V12C8.4375 11.6893 8.68934 11.4375 9 11.4375C9.31066 11.4375 9.5625 11.6893 9.5625 12V15.75C9.5625 16.0607 9.31066 16.3125 9 16.3125Z"
                fill="#284CB3"
              />
            </svg>
          </div>
          <div className="flex items-center gap-[8px]">
            <h1 className="font-bold text-start text-[18px]">40</h1>
            <p
              className={`font-medium text-start text-[14px] mb-0 ${
                mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
              }`}
            >
              Total Exclusions{" "}
            </p>
          </div>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_2330_13562)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.9375 9C0.9375 4.5472 4.5472 0.9375 9 0.9375C13.4528 0.9375 17.0625 4.5472 17.0625 9C17.0625 13.4528 13.4528 17.0625 9 17.0625C4.5472 17.0625 0.9375 13.4528 0.9375 9ZM9 8.0625C9.31066 8.0625 9.5625 8.31434 9.5625 8.625V12.375C9.5625 12.6857 9.31066 12.9375 9 12.9375C8.68934 12.9375 8.4375 12.6857 8.4375 12.375V8.625C8.4375 8.31434 8.68934 8.0625 9 8.0625ZM9.42561 6.00057C9.63343 5.76965 9.61471 5.41399 9.3838 5.20617C9.15289 4.99835 8.79722 5.01707 8.5894 5.24798L8.5819 5.25631C8.37408 5.48722 8.3928 5.84289 8.62371 6.05071C8.85462 6.25853 9.21029 6.23981 9.41811 6.0089L9.42561 6.00057Z"
                fill="#6A6A6A"
              />
            </g>
            <defs>
              <clipPath id="clip0_2330_13562">
                <rect width="18" height="18" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="flex items-center gap-[16px] justify-between">
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
            onClick={() => setShowModalNew(true)}
            className="flex border-start pl-[16px] py-[4px] text-[10px] md:text-[12px] font-medium items-center gap-3"
          >
            <p>Create New Exclusion</p>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.5 9H9M13.5 9H9M9 9V4.5M9 9V13.5"
                stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            // onClick={() => setShowPopOver(!showPopOver)}
            className="flex border-start pl-[16px] py-[4px] text-[10px] md:text-[12px] font-medium items-center gap-3"
          >
            <p className="underline">Filter</p>
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
      <div
        className={`grid grid-cols-8 p-[12px] h-[45px] rounded-t-[16px] mb-[8px] border-bottom  ${
          mode === "dark" ? "bg-lightDark" : "bg-white"
        }`}
      >
        <p className="text-start col-span-2 font-semibold text-[12px]">Rule</p>
        <p className="text-start col-span-2 font-semibold text-[12px]">
          Registry
        </p>
        <p className="text-start font-semibold text-[12px]">Exp Date</p>
        <p className="text-start font-semibold text-[12px]">Status</p>
        <p className="text-start col-span-2 font-semibold text-[12px]">
          Comment
        </p>
      </div>
      {exclusionData.map((exl) => (
        <Card data={exl} mode={mode} key={exl.id} />
      ))}
      <ExclusionModal
        isOpen={showModalNew}
        handleHide={() => setShowModalNew(false)}
        mode={mode}
      />
    </div>
  );
};

export default Exclusion;
