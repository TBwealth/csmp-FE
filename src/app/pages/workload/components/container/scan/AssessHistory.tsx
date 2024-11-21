import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import kuberImage from "../../../../../../../public/media/logos/kuber.svg";
import awsimg from "../../../../../../../public/media/logos/aws-logo.svg";
import alipay from "../../../../../../../public/media/logos/registry.svg";
import dockerImg from "../../../../../../../public/media/logos/docker.svg";

type Props = {
  goBack: any;
  mode: string;
};

const ReoccurCard = ({ data, mode }: any) => {
  return (
    <div
      className={`${
        mode === "dark" ? "bg-lightDark" : "bg-white"
      } mb-[8px] rounded-[12px] flex items-center justify-between w-full px-[24px] py-[16px] border`}
    >
      <div className="flex items-center gap-[16px]">
        <div className="flex items-center gap-[8px] pr-[16px] border-end">
          <img src={data?.logo} alt="company logo" className="w-8 h-8" />
          <h1 className="font-semibold text-[14px]">{data?.title}</h1>
        </div>
        <p className="font-medium text-[12px] pr-[16px] border-end">
          {data?.desc}
        </p>
        <p className="font-medium text-[12px]">All Images</p>
      </div>
      <div className="flex items-center gap-[16px]">
        <p className="font-medium text-[12px]">
          Next Scan: <span className="font-bold">{data?.next_scan}</span>
        </p>
        <button className="flex items-center justify-center px-[16px] border-start border-end">
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
              d="M9 7.8125C8.06802 7.8125 7.3125 8.56802 7.3125 9.5C7.3125 10.432 8.06802 11.1875 9 11.1875C9.93198 11.1875 10.6875 10.432 10.6875 9.5C10.6875 8.56802 9.93198 7.8125 9 7.8125ZM6.1875 9.5C6.1875 7.9467 7.4467 6.6875 9 6.6875C10.5533 6.6875 11.8125 7.9467 11.8125 9.5C11.8125 11.0533 10.5533 12.3125 9 12.3125C7.4467 12.3125 6.1875 11.0533 6.1875 9.5Z"
              fill={mode === "dark" ? "#EAEAEA" : "#373737"}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.69176 1.85684C7.75679 1.60973 7.98021 1.4375 8.23573 1.4375H9.7015C9.95712 1.4375 10.1806 1.60986 10.2455 1.8571L10.6412 3.36358L12.0945 3.96122L13.1346 3.07238C13.3578 2.88163 13.6901 2.89464 13.8977 3.10225L15.3977 4.60225C15.6046 4.80906 15.6184 5.13985 15.4295 5.36319L14.5444 6.41005L15.1286 7.82087L16.6386 8.20485C16.888 8.26825 17.0625 8.49275 17.0625 8.75004L17.0624 10.2329C17.0624 10.489 16.8894 10.7128 16.6416 10.7773L15.123 11.1724L14.538 12.5851L15.4291 13.6363C15.6184 13.8596 15.6048 14.1907 15.3977 14.3977L13.8977 15.8977C13.6865 16.109 13.3469 16.1183 13.1244 15.9188L13.0828 15.8815C13.0558 15.8574 13.0168 15.8226 12.9688 15.7801C12.8729 15.695 12.7418 15.5793 12.6006 15.4564C12.4265 15.3049 12.248 15.1521 12.1027 15.0322L10.6794 15.6216L10.2953 17.1381C10.2321 17.3877 10.0075 17.5625 9.75 17.5625H8.25C7.99239 17.5625 7.7677 17.3875 7.70462 17.1377L7.32175 15.6217L5.9391 15.0528L4.85535 15.936C4.63166 16.1183 4.3063 16.1018 4.10225 15.8977L2.60225 14.3977C2.39143 14.1869 2.38172 13.8482 2.58012 13.6257L3.48043 12.6158L2.88877 11.2122L1.35186 10.7926C1.1072 10.7259 0.9375 10.5036 0.9375 10.25V8.75C0.9375 8.48859 1.11759 8.26163 1.37216 8.20222L2.86802 7.85313L3.44358 6.43801L2.56343 5.3547C2.38167 5.13098 2.39843 4.80607 2.60225 4.60225L4.10225 3.10225C4.3129 2.89161 4.65124 2.88172 4.87383 3.0797L5.88691 3.98076L7.28827 3.39003L7.69176 1.85684ZM8.66936 2.5625L8.30579 3.944C8.26137 4.11278 8.14113 4.25138 7.98031 4.31917L5.99681 5.1553C5.79697 5.23954 5.56651 5.2014 5.40447 5.05728L4.52259 4.2729L3.75646 5.03903L4.5266 5.98694C4.65603 6.14625 4.68841 6.36342 4.61108 6.55356L3.80043 8.54667C3.73164 8.71581 3.58503 8.84103 3.40721 8.88253L2.0625 9.19634V9.82048L3.44898 10.199C3.61559 10.2445 3.75208 10.364 3.81917 10.5231L4.65514 12.5063C4.73947 12.7064 4.70115 12.9371 4.55669 13.0991L3.77333 13.9778L4.53849 14.743L5.48802 13.9692C5.648 13.8388 5.86652 13.8065 6.05738 13.885L8.01177 14.689C8.17657 14.7568 8.2995 14.8987 8.34314 15.0715L8.68811 16.4375H9.31221L9.65811 15.0718C9.70172 14.8996 9.82408 14.7581 9.98818 14.6902L11.9761 13.867C12.1555 13.7927 12.3605 13.8161 12.5184 13.929C12.7107 14.0665 13.0601 14.3649 13.3392 14.6079C13.3865 14.649 13.4325 14.6893 13.4766 14.7279L14.2359 13.9686L13.4579 13.0508C13.3216 12.89 13.2866 12.6666 13.3672 12.4719L14.1907 10.4833C14.2582 10.3204 14.3981 10.1985 14.5688 10.1541L15.9374 9.79801L15.9375 9.18736L14.5781 8.8417C14.4062 8.79797 14.2649 8.67568 14.1971 8.51176L13.3738 6.52381C13.2933 6.32933 13.3281 6.10615 13.464 5.94541L14.2364 5.0319L13.47 4.26553L12.564 5.03984C12.4035 5.17696 12.1798 5.21272 11.9846 5.13244L9.95438 4.29753C9.79128 4.23046 9.66908 4.09077 9.62428 3.9202L9.26767 2.5625H8.66936Z"
              fill={mode === "dark" ? "#EAEAEA" : "#373737"}
            />
          </svg>
        </button>
        <button className="flex items-center justify-center">
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
              d="M15.0975 6.69609C15.4035 6.74989 15.6079 7.04154 15.5541 7.3475L14.0578 15.8572C14.0578 15.8572 14.0578 15.8572 14.0578 15.8572C13.8845 16.8434 13.0278 17.5626 12.0266 17.5626H5.97365C4.97234 17.5626 4.1157 16.8434 3.94231 15.8572L2.44609 7.3475C2.3923 7.04153 2.59672 6.74989 2.90269 6.69609C3.20865 6.6423 3.5003 6.84672 3.5541 7.15269L5.05032 15.6624C5.12913 16.1107 5.51853 16.4376 5.97365 16.4376H12.0266C12.4816 16.4376 12.871 16.1107 12.9498 15.6624L12.9498 15.6624L14.4461 7.15268C14.4999 6.84672 14.7915 6.64229 15.0975 6.69609Z"
              fill={mode === "dark" ? "#EAEAEA" : "#373737"}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.96875 2.5625C7.45098 2.5625 7.03125 2.98223 7.03125 3.5V4.4375H10.9688V3.5C10.9688 2.98223 10.549 2.5625 10.0312 2.5625H7.96875ZM5.90625 4.4375V3.5C5.90625 2.36091 6.82966 1.4375 7.96875 1.4375H10.0312C11.1704 1.4375 12.0938 2.36092 12.0938 3.5V4.4375H15.75C16.0607 4.4375 16.3125 4.68934 16.3125 5C16.3125 5.31066 16.0607 5.5625 15.75 5.5625H2.25C1.93934 5.5625 1.6875 5.31066 1.6875 5C1.6875 4.68934 1.93934 4.4375 2.25 4.4375H5.90625Z"
              fill={mode === "dark" ? "#EAEAEA" : "#373737"}
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const ScanCard = ({ data, mode }: any) => {
  const navigate = useNavigate();
  return (
    <div
      className={`grid grid-cols-8 p-[12px] h-[45px] mb-[8px] place-content-center border-bottom  ${
        mode === "dark" ? "bg-lightDark" : "bg-white"
      }`}
    >
      <p
        className={`font-medium flex text-[12px] items-center justify-center ${
          mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
        }`}
      >
        {data?.date}
      </p>
      <div className="flex items-center justify-center ">
        <span className="rounded-full  text-primary font-semibold text-[8px] px-[10px] py-[2px] bg-[#284CB31A]  w-16 text-center">{data?.type}</span>
      </div>
      <p
        className={`font-medium flex text-[12px] items-center justify-center ${
          mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
        }`}
      >
        {data?.policy_used}
      </p>
      <p
        className={`font-medium flex text-[12px] items-center justify-center ${
          mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
        }`}
      >
        {data?.registry}
      </p>
      <p
        className={`font-medium flex text-[12px] items-center justify-center ${
          mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
        }`}
      >
        {data?.img_scanned}
      </p>
      <p
        className={`font-semibold flex text-[12px] items-center justify-center ${
          mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
        }`}
      >
        {data?.exclusion}
      </p>
      <p className="font-medium text-[12px] text-[#FF161A] flex items-center justify-center">
        {data?.vulnerability}
      </p>
      <div className="flex items-center justify-between">
        <p className="font-medium text-[12px]">{data?.compliance}</p>
        <button className="bg-transparent" onClick={() => navigate("")}>
          <svg
            width="45"
            height="52"
            viewBox="0 0 45 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M22.4795 21.6464C22.2842 21.8417 22.2842 22.1583 22.4795 22.3536L25.6259 25.5H18.4997C18.2235 25.5 17.9997 25.7239 17.9997 26C17.9997 26.2761 18.2235 26.5 18.4997 26.5H25.6259L22.4795 29.6464C22.2842 29.8417 22.2842 30.1583 22.4795 30.3536C22.6747 30.5488 22.9913 30.5488 23.1866 30.3536L27.1866 26.3536C27.3818 26.1583 27.3818 25.8417 27.1866 25.6464L23.1866 21.6464C22.9913 21.4512 22.6747 21.4512 22.4795 21.6464Z"
              fill="#373737"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const AssessHistory = ({ goBack, mode }: Props) => {
  const [tab, setTab] = useState("Scan History");
  const [showPopOver, setShowPopOver] = useState(false);
  const [allData, setAllData] = useState<any[]>([]);
  const allHistory = [
    {
      next_scan: "12:00PM",
      title: "Gilotec Prod -Docker",
      desc: " Workload Vulnerability Default 1.0",
      logo: dockerImg,
      id: 0,
    },
    {
      next_scan: "12:00PM",
      title: "Gilotec Prod -Docker",
      desc: " Workload Vulnerability Default 1.0",
      logo: awsimg,
      id: 1,
    },
    {
      next_scan: "12:00PM",
      title: "Gilotec Prod -Docker",
      desc: " Workload Vulnerability Default 1.0",
      logo: kuberImage,
      id: 2,
    },
  ];

  const allScans = [
    {
      date: "2/3/2024 12:40PM",
      type: "manual",
      policy_used: "Workload Vulnerabili. . ",
      registry: "Gilotec Prod",
      img_scanned: "All",
      exclusion: "N/A",
      vulnerability: "360",
      compliance: "37%",
      id: 0,
    },
    {
      date: "2/3/2024 8:13AM",
      type: "Auto",
      policy_used: "Workload Vulnerabili. . ",
      registry: "Gilotec Prod",
      img_scanned: "my-app-image",
      exclusion: "4",
      vulnerability: "129",
      compliance: "98%",
      id: 1,
    },
  ];

  useEffect(() => {
    if (tab.includes("Reoccurring Scans")) {
      setAllData(allHistory);
    } else {
      setAllData(allScans);
    }
  }, [tab]);

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
            Assessment History
          </h1>
          <p
            className={`${
              mode === "dark"
                ? "text-[#EAEAEA]"
                : "text-[#6A6A6A] border-end font-medium text-[12px] pr-[16px] py-[2px]"
            }`}
          >
            View all Vulnerability report of your registry
          </p>
        </div>
      </div>
      <div className="w-full mt-[24px] mb-[47px] flex items-center gap-[24px] flex-col md:flex-row">
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
                d="M15.375 15.375L16.5 16.5"
                stroke="#284CB3"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 13.875C12 14.9105 12.8395 15.75 13.875 15.75C14.3937 15.75 14.8631 15.5394 15.2026 15.1991C15.5409 14.8599 15.75 14.3919 15.75 13.875C15.75 12.8395 14.9105 12 13.875 12C12.8395 12 12 12.8395 12 13.875Z"
                stroke="#284CB3"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 4.5V9C3 9 3 11.25 8.25 11.25C13.5 11.25 13.5 9 13.5 9V4.5"
                stroke="#284CB3"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.25 2.25C13.5 2.25 13.5 4.5 13.5 4.5C13.5 4.5 13.5 6.75 8.25 6.75C3 6.75 3 4.5 3 4.5C3 4.5 3 2.25 8.25 2.25Z"
                stroke="#284CB3"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.25 15.75C3 15.75 3 13.5 3 13.5V9"
                stroke="#284CB3"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex items-center gap-[8px]">
            <h1 className="font-bold text-start text-[18px]">300k</h1>
            <p
              className={`font-medium text-start text-[14px] mb-0 ${
                mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
              }`}
            >
              Total scan{" "}
            </p>
          </div>
        </div>
        <div
          className={`rounded-[12px] p-[24px] flex items-center gap-[36px] justify-between border ${
            mode === "dark" ? "bg-lightDark" : "bg-white"
          }`}
        >
          <div className="flex items-center gap-[12px]">
            <div className="bg-[#284CB31A] rounded-full p-[12px] flex items-center justify-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.25 3L5.25 3.75"
                  stroke="#284CB3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.25 6.75L5.25 7.5"
                  stroke="#284CB3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.75 15V3M12.75 3L15 5.25M12.75 3L10.5 5.25"
                  stroke="#284CB3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.25 10.5V15M5.25 15L7.5 12.75M5.25 15L3 12.75"
                  stroke="#284CB3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex items-center gap-[8px]">
              <h1 className="font-bold text-start text-[18px]">3</h1>
              <p
                className={`font-medium text-start text-[14px] ${
                  mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
                }`}
              >
                Reoccurring Scans{" "}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.75 2.25L11.25 2.25M15.75 2.25L9 9M15.75 2.25V6.75"
                stroke="#373737"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.75 9.75V13.75C15.75 14.8546 14.8546 15.75 13.75 15.75H4.25C3.14543 15.75 2.25 14.8546 2.25 13.75V4.25C2.25 3.14543 3.14543 2.25 4.25 2.25H8.25"
                stroke="#373737"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
        <div
          className={`rounded-[12px] p-[24px] flex items-center gap-[12px] border ${
            mode === "dark" ? "bg-lightDark" : "bg-white"
          }`}
        >
          <div className="bg-[#FF161A]/20 rounded-full p-[12px] flex items-center justify-center">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.923205 9.3C0.816026 9.11436 0.816025 8.88564 0.923205 8.7L4.70179 2.15529C4.80897 1.96965 5.00705 1.85529 5.22141 1.85529H12.7786C12.9929 1.85529 13.191 1.96965 13.2982 2.15529L17.0768 8.7C17.184 8.88564 17.184 9.11436 17.0768 9.3L13.2982 15.8447C13.191 16.0303 12.9929 16.1447 12.7786 16.1447H5.22141C5.00705 16.1447 4.80897 16.0304 4.70179 15.8447L0.923205 9.3Z"
                stroke="#FF161A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 6L9 9"
                stroke="#FF161A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 12.0075L9.0075 11.9992"
                stroke="#FF161A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex items-center gap-[8px]">
            <h1 className="font-bold text-start text-[18px]">45</h1>
            <p
              className={`font-medium text-start text-[14px] mb-0 ${
                mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
              }`}
            >
              Image Vulnerabilities{" "}
            </p>
          </div>
        </div>
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
              <g clipPath="url(#clip0_2402_47888)">
                <path
                  d="M9 4.5L9 9L13.5 9"
                  stroke="#284CB3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.4162 7.875C15.8734 4.26655 12.7598 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5C12.0755 16.5 14.7186 14.6489 15.8759 12"
                  stroke="#284CB3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.75 12H15.9C16.2314 12 16.5 12.2686 16.5 12.6V15.75"
                  stroke="#284CB3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_2402_47888">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="flex items-center gap-[8px]">
            <h1 className="font-bold text-start text-[18px]">Monthly</h1>
            <p
              className={`font-medium text-start text-[14px] mb-0 ${
                mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
              }`}
            >
              Scan Frequency{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center w-full justify-between border-bottom">
        <div className="">
          {["Scan History", "Reoccurring Scans (3)"].map((d) => (
            <button
              key={d}
              className={`uppercase p-4 ${
                d === tab
                  ? "font-bold text-[10px] md:text-[14px] border-bottom-3 border-primary"
                  : `font-medium text-[8px] md:text-[14px] ${
                      mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
                    }`
              }`}
              onClick={() => setTab(d)}
            >
              {d}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-5 -order-1 md:order-1">
          <div className="flex items-center gap-[16px]">
            <div className="relative">
              <input
                type="text"
                // onChange={(e) => handleSearch(e.target.value)}
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
              onClick={() => setShowPopOver(!showPopOver)}
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
      </div>
      {tab.includes("Reoccurring Scans") && (
        <p className="my-[24px] text-start text-[14px] font-medium">
          These are scheduled recurring container scan.{" "}
        </p>
      )}
      <div
        className={`${
          !tab.includes("Reoccurring Scans") ? "mt-[24px]" : ""
        } w-full overflow-x scroll`}
      >
        {tab === "Scan History" ? (
          <>
            <div
              className={`grid grid-cols-8 p-[12px] h-[45px] rounded-t-[16px] mb-[8px] border-bottom  ${
                mode === "dark" ? "bg-lightDark" : "bg-white"
              }`}
            >
              <p className="text-start font-semibold text-[12px]">Date</p>
              <p className="text-center font-semibold text-[12px]">Scan type</p>
              <p className="text-center font-semibold text-[12px]">
                Policy Used
              </p>
              <p className="text-center font-semibold text-[12px]">Registry</p>
              <p className="text-center font-semibold text-[12px]">
                Images Scanned
              </p>
              <p className="text-center font-semibold text-[12px]">Excluded</p>
              <p className="text-center font-semibold text-[12px]">
                Vulnerabilities
              </p>
              <p className="text-start font-semibold text-[12px]">Compliance</p>
            </div>
            {allData.map((scans) => (
              <ScanCard data={scans} key={scans?.id} mode={mode} />
            ))}
          </>
        ) : (
          allData.map((scans) => (
            <ReoccurCard data={scans} key={scans?.id} mode={mode} />
          ))
        )}
      </div>
    </div>
  );
};

export default AssessHistory;
