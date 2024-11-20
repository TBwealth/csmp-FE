import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import modeAtomsAtom from "../../../atoms/modeAtoms.atom";

const HistoryCard = ({ data, mode, isLast }: any) => {
  return (
    <div
      className={`grid grid-cols-6 p-4 gap-[8px] py-[18px] px-[24px]  mb-[8px] ${
        isLast ? "border-0" : "border-bottom"
      }  ${mode === "dark" ? "bg-lightDark" : "bg-white"}`}
    >
      <div className="flex items-center gap-[16px] col-span-2">
        <input
          type="checkbox"
          name={data.time}
          id={data.time}
          className="w-5 h-5 rounded-full mr-2"
        />
        <h1 className="font-semibold text-[10px] md:text-[12px]">
          {data.time}
        </h1>
      </div>
      <p
        className={`${
          mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
        } font-medium text-[12px] text-center`}
      >
        {data.template}
      </p>
      <p
        className={`${
          mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
        } font-medium text-[12px] text-center`}
      >
        {data.range}
      </p>
      <p
        className={`${
          mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
        } font-medium text-[12px] text-center`}
      >
        {data.sentTo}
      </p>
      <div className="flex items-center justify-center gap-[32px] w-full ">
        <button className="bg-none flex items-center justify-center">
          <svg
            width="42"
            height="19"
            viewBox="0 0 42 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="border-start pl-[6px]"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M27.9375 15.5C27.9375 15.1893 28.1893 14.9375 28.5 14.9375L37.5 14.9375C37.8107 14.9375 38.0625 15.1893 38.0625 15.5C38.0625 15.8107 37.8107 16.0625 37.5 16.0625L28.5 16.0625C28.1893 16.0625 27.9375 15.8107 27.9375 15.5Z"
              fill={mode === "dark" ? "#EAEAEA" : "#373737"}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M32.6023 12.8977C32.8219 13.1174 33.1781 13.1174 33.3977 12.8977L36.0227 10.2727C36.2424 10.0531 36.2424 9.69692 36.0227 9.47725C35.8031 9.25758 35.4469 9.25758 35.2273 9.47725L33.5625 11.142V3.5C33.5625 3.18934 33.3107 2.9375 33 2.9375C32.6893 2.9375 32.4375 3.18934 32.4375 3.5V11.142L30.7727 9.47725C30.5531 9.25758 30.1969 9.25758 29.9773 9.47725C29.7576 9.69692 29.7576 10.0531 29.9773 10.2727L32.6023 12.8977Z"
              fill={mode === "dark" ? "#EAEAEA" : "#373737"}
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const ReportHistory = () => {
  const { mode } = useRecoilValue(modeAtomsAtom);
  const [showPopOver, setShowPopOver] = useState(false);
  const [allReports, setAllReports] = useState<any[]>([
    {
      time: "Dec 1, 2024 12:45 PM",
      template: "CSPM monthly analysis",
      range: "1 month",
      sentTo: "targetemail@organise.com",
    },
    {
      time: "Dec 1, 2024 12:45 PM",
      template: "CSPM monthly analysis",
      range: "1 month",
      sentTo: "targetemail@organise.com",
    },
    {
      time: "Dec 1, 2024 12:45 PM",
      template: "CSPM monthly analysis",
      range: "1 month",
      sentTo: "targetemail@organise.com",
    },
    {
      time: "Dec 1, 2024 12:45 PM",
      template: "CSPM monthly analysis",
      range: "1 month",
      sentTo: "targetemail@organise.com",
    },
  ]);
  const [allReportsCopy, setAllReportsCopy] = useState<any[]>([
    {
      report: "CSPM monthly analysis",
      total: 48,
      range: "Last 3 weeks",
      target: "targetemail@organise.com",
    },
    {
      report: "Generic Cluster health check",
      total: 34,
      range: "Last 3 weeks",
      target: "targetemail@organise.com",
    },
    {
      report: "Generic Cluster health check",
      total: 3,
      range: "Last 3 weeks",
      target: "targetemail@organise.com",
    },
  ]);
  const handleSearch = (val: string) => {
    const keys = ["template", "sentTo", "range"];
    if (val) {
      const filterd = allReports.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(val.toLowerCase()))
      );
      setAllReports(filterd);
    } else {
      setAllReports(allReportsCopy);
    }
  };
  return (
    <div className="px-8 mt-[32px] w-full">
      <p className={`${mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"} font-medium text-[12px]`}>
        List of all generated reports from your templates till date. to learn
        more about report click ere
      </p>
      <div
        className={`mb-3 ${
          mode === "dark" ? "bg-lightDark" : "bg-white"
        } border rounded-[12px] mt-[24px]`}
      >
        <div className="flex items-center justify-between py-[18px] px-[24px] border-bottom">
          <div className="flex items-center gap-1">
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
                d="M14.8125 15.75C14.8125 15.2322 15.2322 14.8125 15.75 14.8125H26.25C26.7678 14.8125 27.1875 15.2322 27.1875 15.75V26.25C27.1875 26.7678 26.7678 27.1875 26.25 27.1875H15.75C15.2322 27.1875 14.8125 26.7678 14.8125 26.25V15.75ZM15.75 13.6875C14.6109 13.6875 13.6875 14.6109 13.6875 15.75V26.25C13.6875 27.3891 14.6109 28.3125 15.75 28.3125H26.25C27.3891 28.3125 28.3125 27.3891 28.3125 26.25V15.75C28.3125 14.6109 27.3891 13.6875 26.25 13.6875H15.75Z"
                fill="#284CB3"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.6875 17.25C16.6875 16.9393 16.9393 16.6875 17.25 16.6875L24.75 16.6875C25.0607 16.6875 25.3125 16.9393 25.3125 17.25C25.3125 17.5607 25.0607 17.8125 24.75 17.8125L17.25 17.8125C16.9393 17.8125 16.6875 17.5607 16.6875 17.25Z"
                fill="#284CB3"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.6875 21C16.6875 20.6893 16.9393 20.4375 17.25 20.4375L24.75 20.4375C25.0607 20.4375 25.3125 20.6893 25.3125 21C25.3125 21.3107 25.0607 21.5625 24.75 21.5625L17.25 21.5625C16.9393 21.5625 16.6875 21.3107 16.6875 21Z"
                fill="#284CB3"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.6875 24.75C16.6875 24.4393 16.9393 24.1875 17.25 24.1875L21.75 24.1875C22.0607 24.1875 22.3125 24.4393 22.3125 24.75C22.3125 25.0607 22.0607 25.3125 21.75 25.3125L17.25 25.3125C16.9393 25.3125 16.6875 25.0607 16.6875 24.75Z"
                fill="#284CB3"
              />
            </svg>
            <h1 className="font-bold text-[14px] md:text-[18px] mb-[1px]">
              89
            </h1>
            <p
              className={`font-medium text-[10px] md:text-[14px] ${
                mode === "dark" ? "#EAEAEA" : "#6A6A6A"
              }`}
            >
              Generated reports
            </p>
          </div>
          <div className="flex items-center gap-[16px] -order-1 md:order-1">
            <div className="relative">
              <input
                type="text"
                onChange={(e) => handleSearch(e.target.value)}
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
        <div
          className={`grid grid-cols-6 p-4 py-[18px] px-[24px]  mb-3 border-bottom  ${
            mode === "dark" ? "bg-lightDark" : "bg-white"
          }`}
        >
          <div className="flex items-center gap-[16px] col-span-2">
            <input
              type="checkbox"
              name="all"
              id="all"
              className="w-5 h-5 rounded-full"
            />
            <p className="font-semibold text-[12px]">Time</p>
          </div>
          <p className="font-semibold text-[12px] text-center">Template</p>
          <p className="font-semibold text-[12px] text-center">Time range</p>
          <p className="font-semibold text-[12px] text-center">Sent to</p>
          <p className="flex items-center justify-center">
            <svg
              width="42"
              height="19"
              viewBox="0 0 42 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="border-start pl-[6px]"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M27.9375 15.5C27.9375 15.1893 28.1893 14.9375 28.5 14.9375L37.5 14.9375C37.8107 14.9375 38.0625 15.1893 38.0625 15.5C38.0625 15.8107 37.8107 16.0625 37.5 16.0625L28.5 16.0625C28.1893 16.0625 27.9375 15.8107 27.9375 15.5Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M32.6023 12.8977C32.8219 13.1174 33.1781 13.1174 33.3977 12.8977L36.0227 10.2727C36.2424 10.0531 36.2424 9.69692 36.0227 9.47725C35.8031 9.25758 35.4469 9.25758 35.2273 9.47725L33.5625 11.142V3.5C33.5625 3.18934 33.3107 2.9375 33 2.9375C32.6893 2.9375 32.4375 3.18934 32.4375 3.5V11.142L30.7727 9.47725C30.5531 9.25758 30.1969 9.25758 29.9773 9.47725C29.7576 9.69692 29.7576 10.0531 29.9773 10.2727L32.6023 12.8977Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
            </svg>
          </p>
        </div>
        {
          allReports.map((report, idx) => (
            <HistoryCard mode={mode} data={report} isLast={idx === allReports.length - 1}  key={report.time+`${idx}`}/>
          ))
        }
      </div>
    </div>
  );
};

export default ReportHistory;
