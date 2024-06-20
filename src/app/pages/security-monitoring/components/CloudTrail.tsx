import React, { useEffect, useState } from "react";
import { useGetCloudProviderResourceTypes } from "../../../api/api-services/cloudProviderQuery";
import { CloudProviderCloudProviderResourceTypesList200Response } from "../../../api/axios-client";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import modeAtomsAtom from "../../../atoms/modeAtoms.atom";
import { FaStopwatch } from "react-icons/fa";

const CloudTrail = () => {
  const [allServices, setAllServices] = useState<any[]>([]);
  const [selectedServ, setSelectedServ] = useState("");
  const [checkAll, setCheckAll] = useState(false);
  const [allAlarms, setAllAlerms] = useState<any[]>([
    {
      name: "SecurityGroupChange",
      desc: "Monitors changes to security groups",
      isCheck: true,
    },
    {
      name: "BucketAccess",
      desc: "Alerts on access to specific buckets",
      isCheck: true,
    },
    {
      name: "UnauthorizedAccess",
      desc: "Detects unauthorized access attempts",
      isCheck: true,
    },
    {
      name: "RootAccountUsage",
      desc: "Alerts on root account usage",
      isCheck: true,
    },
    {
      name: "AccountAccssChange",
      desc: "Monitors changes to account groups",
      isCheck: true,
    },
  ]);
  const [allActiveAlarms, setAllActiveAlarms] = useState(0);

  const { mode } = useRecoilValue(modeAtomsAtom);

  const { data } = useGetCloudProviderResourceTypes({
    page: 1,
    pageSize: 1000,
  });

  const handleChecked = (id: string, checked: boolean) => {
    if (id === "all") {
      const mapped = allAlarms.map((alams) => {
        return {
          ...alams,
          isCheck: checked,
        };
      });
      setAllAlerms(mapped);
      const val = mapped.filter((m: any) => m.isCheck).length;
      setAllActiveAlarms(val);
    } else {
      const mapped = allAlarms.map((alams) => {
        if (alams.name === id) {
          return {
            ...alams,
            isCheck: checked,
          };
        } else {
          return alams;
        }
      });
      setAllAlerms(mapped);
      const val = mapped.filter((m: any) => m.isCheck).length;
      setAllActiveAlarms(val);
    }
  };

  const datastsr: CloudProviderCloudProviderResourceTypesList200Response | any =
    data;

  useEffect(() => {
    setAllActiveAlarms(allAlarms.length);
    setAllServices(datastsr?.data?.data?.results ?? []);
    if (datastsr?.data?.data?.results) {
      setSelectedServ(datastsr?.data?.data?.results[0]?.account_name);
    }
  }, [datastsr]);

  return (
    <div className="w-full px-10 mt-[32px]">
      <div className="flex items-center justify-between flex-row gap-[10px]">
        <select
          name="service"
          id="services"
          value={selectedServ}
          className="w-[60%] md:w-[452px] bg-[#EAEAEA] p-4 rounded-[8px] border-2 border-light font-medium"
          onChange={(e) => setSelectedServ(e.target.value)}
        >
          <option className="font-medium">select service</option>
          {allServices.map((serv) => (
            <option
              key={serv.account_name}
              value={serv.account_name}
              className="font-medium"
            >
              {serv.account_name}
            </option>
          ))}
        </select>
        <Link
          to={`/monitoring/cloudtrail-history/${selectedServ}`}
          className="font-medium text-[12px] md:text-[14px] flex items-center gap-[8px] pl-[8px] md:pl-[16px] border-start"
        >
          <p>Alarm History</p>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.75 9.75H9V6"
              stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
              strokeWidth="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3.75 2.625L5.25 1.5"
              stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.25 2.625L12.75 1.5"
              stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 16.5C12.7279 16.5 15.75 13.4779 15.75 9.75C15.75 6.02208 12.7279 3 9 3C5.27208 3 2.25 6.02208 2.25 9.75C2.25 13.4779 5.27208 16.5 9 16.5Z"
              stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
      <p className="mt-[16px] font-medium text-[12px] md:text-[14px] leading-[26px]">
        Set up alarms to monitor your cloud environment for suspicious
        activities. Choose from predefined alarm groups and customize scan
        frequency. Learn more about alarms and CloudTrail{" "}
        <a href="#" className="text-primary">
          here
        </a>
      </p>
      <div className="flex mt-[47px] pb-[14px] border-bottom mb-[24px] items-center justify-between flex-col md:flex-row gap-[16px]">
        <h2 className="font-medium text-[10px] md:text-[14px] capitalize">
          {allAlarms.length} total alarm
        </h2>
        <div className="flex items-center gap-[16px] justify-between">
          <div className="relative">
            <input
              type="text"
              className={`${mode === "dark" ? "placeholder:text-[#EAEAEA]" : "placeholder:text-[#373737]"} w-32 bg-transparent focus:outline-none focus:border focus:w-full rounded-[8px] font-medium px-3 py-2 placeholder:font-medium `}
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
          <button className="flex items-center gap-[8px] justify-center border-start border-end px-[16px] py-2">
            <p className="font-medium text-[10px] md:text-[14px]">Create new</p>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.5 7H7M10.5 7H7M7 7V3.5M7 7V10.5"
                stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            // onClick={() => setShowPopOver(!showPopOver)}
            className="flex text-[10px] md:text-[12px] font-medium items-center gap-3"
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
      <div className="flex items-center justify-between flex-row">
        <div className="w-[60%] md:w-[40%] lg:w-[24%]">
          <label
            htmlFor="frequency"
            className="flex font-medium items-center gap-[8px] mb-[8px]"
          >
            <FaStopwatch color={mode === "dark" ? "#EAEAEA" : "#373737"} />
            <p>Scan frequency</p>
          </label>
          <select
            id="frequency"
            name="frequency"
            className={`w-full rounded-[8px] border py-[12px] px-[16px] font-medium ${
              mode === "dark" ? "bg-lightDark" : "bg-[#FFF]"
            }`}
          >
            <option className="font-medium" value="">select frequency</option>
            <option className="font-medium" value="Hourly">
              Hourly
            </option>
            <option className="font-medium" value="Daily">
              Daily
            </option>
            <option className="font-medium" value="Weekly">
              Weekly
            </option>
            <option className="font-medium" value="Monthly">
              Monthly
            </option>
          </select>
        </div>
        <button className="bg-[#284CB3] py-[12px] px-[24px] rounded-full text-white font-medium text-center">
          Save Setup
        </button>
      </div>
      <div
        className={`rounded-[12px] my-[16px] flex items-center justify-between border px-[24px] py-[16px] ${
          mode === "dark" ? "bg-lightDark" : "bg-[#FFF]"
        }`}
      >
        <p className="font-medium text-[14px]">
          {allActiveAlarms} active alarms
        </p>

        <div className="flex items-center gap-[8px] py-2 pl-[16px] border-start">
          <p className="font-medium text-[14px]">Switch on all alarms</p>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              value=""
              onChange={() => {
                setCheckAll(!checkAll);
                handleChecked("all", !checkAll);
              }}
            />
            <div
              className={`relative w-11 h-6 rounded-full peer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${
                checkAll
                  ? "bg-[#4470EF] peer-checked:after:translate-x-full"
                  : "bg-[#D1D1D6] rtl:peer-checked:after:-translate-x-full"
              }`}
            ></div>
          </label>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[16px]">
        {allAlarms.map((al) => (
          <div
            className={`w-full flex flex-row items-center justify-between rounded-[12px] border py-[16px] px-[24px] font-medium ${
              mode === "dark" ? "bg-lightDark" : "bg-[#FFF]"
            }`}
          >
            <div className="">
              <h1 className="font-semibold text-[12px] md:text-[14px] mb-[8px]">
                {al.name}
              </h1>
              <p
                className={`font-medium text-[10px] md:text-[12px] ${
                  mode === "dark" ? "#EAEAEA" : "#6A6A6A"
                }`}
              >
                {al.desc}
              </p>
            </div>
            <div className="flex items-center gap-[16px]">
              <button>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5 9.375C13.7071 9.375 13.875 9.20711 13.875 9C13.875 8.79289 13.7071 8.625 13.5 8.625C13.2929 8.625 13.125 8.79289 13.125 9C13.125 9.20711 13.2929 9.375 13.5 9.375Z"
                    fill="#6A6A6A"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.5 9.1875C13.6036 9.1875 13.6875 9.10355 13.6875 9C13.6875 8.89645 13.6036 8.8125 13.5 8.8125C13.3964 8.8125 13.3125 8.89645 13.3125 9C13.3125 9.10355 13.3964 9.1875 13.5 9.1875ZM12.5625 9C12.5625 8.48223 12.9822 8.0625 13.5 8.0625C14.0178 8.0625 14.4375 8.48223 14.4375 9C14.4375 9.51777 14.0178 9.9375 13.5 9.9375C12.9822 9.9375 12.5625 9.51777 12.5625 9Z"
                    fill={mode === "dark" ? "#EAEAEA" : "#6A6A6A"}
                  />
                  <path
                    d="M9 9.375C9.20711 9.375 9.375 9.20711 9.375 9C9.375 8.79289 9.20711 8.625 9 8.625C8.79289 8.625 8.625 8.79289 8.625 9C8.625 9.20711 8.79289 9.375 9 9.375Z"
                    fill={mode === "dark" ? "#EAEAEA" : "#6A6A6A"}
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9 9.1875C9.10355 9.1875 9.1875 9.10355 9.1875 9C9.1875 8.89645 9.10355 8.8125 9 8.8125C8.89645 8.8125 8.8125 8.89645 8.8125 9C8.8125 9.10355 8.89645 9.1875 9 9.1875ZM8.0625 9C8.0625 8.48223 8.48223 8.0625 9 8.0625C9.51777 8.0625 9.9375 8.48223 9.9375 9C9.9375 9.51777 9.51777 9.9375 9 9.9375C8.48223 9.9375 8.0625 9.51777 8.0625 9Z"
                    fill={mode === "dark" ? "#EAEAEA" : "#6A6A6A"}
                  />
                  <path
                    d="M4.5 9.375C4.70711 9.375 4.875 9.20711 4.875 9C4.875 8.79289 4.70711 8.625 4.5 8.625C4.29289 8.625 4.125 8.79289 4.125 9C4.125 9.20711 4.29289 9.375 4.5 9.375Z"
                    fill={mode === "dark" ? "#EAEAEA" : "#6A6A6A"}
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.5 9.1875C4.60355 9.1875 4.6875 9.10355 4.6875 9C4.6875 8.89645 4.60355 8.8125 4.5 8.8125C4.39645 8.8125 4.3125 8.89645 4.3125 9C4.3125 9.10355 4.39645 9.1875 4.5 9.1875ZM3.5625 9C3.5625 8.48223 3.98223 8.0625 4.5 8.0625C5.01777 8.0625 5.4375 8.48223 5.4375 9C5.4375 9.51777 5.01777 9.9375 4.5 9.9375C3.98223 9.9375 3.5625 9.51777 3.5625 9Z"
                    fill={mode === "dark" ? "#EAEAEA" : "#6A6A6A"}
                  />
                </svg>
              </button>
              <label className="inline-flex items-center cursor-pointer border-start pl-[16px]">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  onChange={() => {
                    setCheckAll(false);
                    handleChecked(al.name, !al.isCheck);
                  }}
                />
                <div
                  className={`relative w-11 h-6 rounded-full peer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${
                    al.isCheck
                      ? "bg-[#4470EF] after:translate-x-full"
                      : "bg-[#D1D1D6] rtl:peer-checked:after:-translate-x-full"
                  }`}
                ></div>
              </label>
            </div>
          </div>
        ))}
      </div>
      {allAlarms.length > 10 && (
        <div className="w-full mt-[24px] flex items-end justify-end gap-[12px]">
          <button className="bg-primary font-medium text-center w-32 p-2 text-white rounded-md">Prevous</button>
          <button className="bg-primary font-medium text-center w-32 p-2 text-white rounded-md">Next</button>
        </div>
      )}
    </div>
  );
};

export default CloudTrail;
