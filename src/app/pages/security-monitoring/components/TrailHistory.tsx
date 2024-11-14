import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { useRecoilValue } from "recoil";
import modeAtomsAtom from "../../../atoms/modeAtoms.atom";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import awsImg from "../../../../../public/media/logos/aws-logo.svg";
import axios from "axios";
import DefaultContent from "../../../components/defaultContent/defaultContent";

const Card = ({ data, mode, name }: any) => {
  return (
    <div
      className={`grid grid-cols-7 gap-[8px] p-4 h-[52px] place-content-center border-bottom mb-[8px] w-[180vw] md:w-full ${
        mode === "dark" ? "bg-lightDark" : "bg-white"
      }`}
    >
      <p className="font-bold text-[12px]">
        {`${data?.event_time.split("T")[0]}`}{" "}
        <span className="font-medium">{`${data?.event_time
          .split("T")[1]
          .slice(0, 5)}`}</span>
      </p>
      <p
        className={`font-medium text-[12px] col-span-2 ${
          mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
        }`}
      >
        {data?.scan_log}
      </p>
      <p
        className={`font-medium text-[12px] ${
          mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
        }`}
      >
        {data.active_alarms}
      </p>
      <p className="font-semibold flex items-center gap-[8px] text-[#FF161A] text-[12px]">
        <span>{data?.triggered_alarms ? data?.triggered_alarms : "--"}</span>
        {data?.triggered_alarms && <IoIosWarning color="#FF161A" />}
      </p>
      <div className="font-medium text-[12px] flex items-center justify-between col-span-2">
        <p
          className={`${mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"}`}
        >
          {data?.resolved} %
        </p>
        <Link
          to={`/monitoring/cloudtrail-detail?name=${name}&id=${data?.id}&log=${
            data?.scan_log
          }&time=${`${data?.event_time.split("T")[0]} ${
            data?.event_time.split("T")[1]
          }`}`}
        >
          <FaArrowRight color={mode === "dark" ? "#EAEAEA" : "#373737"} />
        </Link>
      </div>
    </div>
  );
};

const TrailHistory = () => {
  const navigate = useNavigate();
  const { mode } = useRecoilValue(modeAtomsAtom);
  const { name } = useParams();
  const [search] = useSearchParams();
  const serviceName = search.get("name");
  const [canNext, setCanNext] = useState(false);
  const [canPrev, setCanPrev] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [alarmLogs, setAlarmLogs] = useState<any[]>([]);
  const [alarmLogsOther, setAlarmLogsOther] = useState<any[]>([]);
  const [errMessage, setErrMessage] = useState("");
  

  const handleGetAlarmLogs = async (page: number) => {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    try {
      const resp = await axios.get(
        `https://cspm-api.midrapps.com/system_settings/api/v1/cloudtrail_logs/?cloud_provider_account_id=${name}&page=${page}&page_size=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (resp.status === 200) {
        setIsLoading(false);
        setAlarmLogs(resp?.data?.data?.results);
        setAlarmLogsOther(resp?.data?.data?.results);
        setCanNext(resp?.data?.data?.next ? true : false);
        setCanPrev(resp?.data?.data?.previous ? true : false);
        setTotalCount(resp?.data?.data?.count);
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetAlarmLogs(1);
  }, []);

  const handleSearch = (val: string) => {
    const keys = ["event_time", "scan_log"];
    if (val) {
      const filterd = alarmLogs.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(val.toLowerCase()))
      );

      setAlarmLogs(filterd);
    } else {
      setAlarmLogs(alarmLogsOther);
    }
  };

 

  return (
    <div className="w-full px-10 mt-[32px]">
      <div className="flex flex-col md:flex-row items-center gap-[16px]">
        <div className="flex items-center gap-[16px]">
          <button onClick={() => navigate(-1)}>
            <FaArrowLeft color={mode === "dark" ? "#EAEAEA" : "#373737"} />
          </button>
          <div className="flex items-center gap-[12px]">
            <img src={awsImg} alt="aws logo" className="w-[24px] h-[24px]" />
            <h1 className="font-semibold text-[14px] md:text-[18px]">
              {serviceName}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-[16px]">
          <p className="px-[16px] border-start border-end py-2 text-[12px] md:text-[14px] font-semibold">
            Alarm History
          </p>
          <p
            className={`text-[10px] md:text-[12px] capitalize font-medium ${
              mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
            }`}
          >
            {alarmLogs[0]?.scan_frequency} scan
          </p>
        </div>
      </div>
      <div className="mt-[16px] py-[18px] border-bottom flex items-center justify-between">
        <h1 className="uppercase font-medium text-[12px] md:text-[14px]">
          Alarm Scan logs
        </h1>
        <div className="flex items-center gap-[16px] justify-between">
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
      {alarmLogs.length < 1 || isLoading ? (
        <DefaultContent
          pageHeader="All Alarm Logs"
          pageDescription="No record found"
          loading={isLoading}
          buttonValue=""
          buttonClick={() => {
            // setCurPage(1);
            // handleGetAlarmLogs(1);
          }}
        />
      ) : (
        <div className="mt-[32px] w-full overflow-auto">
          <div
            className={`grid grid-cols-7 gap-[8px] p-4 rounded-t-[1.5rem] mb-3 place-content-center border-bottom h-[52px] w-[180vw] md:w-full ${
              mode === "dark" ? "bg-lightDark" : "bg-white"
            }`}
          >
            <p className="font-semibold text-[12px]">Event time</p>
            <p className="font-semibold text-[12px] col-span-2">Scan log</p>
            <p className="font-semibold text-[12px]">Active alarms</p>
            <p className="font-semibold text-[12px]">Triggered alarms</p>
            <p className="font-semibold text-[12px] col-span-2">Resolved</p>
          </div>
          {alarmLogs.map((alarm) => (
            <Card data={alarm} mode={mode} name={serviceName} />
          ))}
          {totalCount > 10 && (
            <div className="w-full mt-[24px] flex items-end justify-end gap-[12px]">
              <button
                disabled={!canPrev}
                onClick={() => {
                  setCurPage((cur) => cur - 1);
                  handleGetAlarmLogs(curPage - 1);
                }}
                className="bg-primary font-medium text-center w-32 p-2 text-white rounded-md"
              >
                Prevous
              </button>
              <button
                disabled={!canNext}
                onClick={() => {
                  setCurPage((cur) => cur + 1);
                  handleGetAlarmLogs(curPage + 1);
                }}
                className="bg-primary font-medium text-center w-32 p-2 text-white rounded-md"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TrailHistory;
