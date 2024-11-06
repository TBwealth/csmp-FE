import { useState } from "react";
import { useRecoilValue } from "recoil";
import NewReportModal from "./modals/NewReportModal";
import { Link, useNavigate } from "react-router-dom";
import modeAtomsAtom from "../../../atoms/modeAtoms.atom";
import database from "../../../../../public/media/logos/report_database_1.svg";
import DefaultContent from "../../../components/defaultContent/defaultContent";

const EmptyTemplates = ({ showModal, mode }: any) => {
  return (
    <div className="w-full flex items-center justify-center flex-col gap-[24px] h-screen md:h-[40rem]">
      <img
        src={database}
        alt="database of repository"
        className="maxW-md h-72"
      />
      <h1 className="font-semibold text-[24px] mb-8">
        No Report Template Yet{" "}
      </h1>
      <p
        className={`${
          mode === "dark" ? "#EAEAEA" : "#6A6A6A"
        } text-[8px] md:text-[12px] font-medium md:w-[45%] text-center`}
      >
        Create custom reports for your analysis, set schedules, and compile all
        the necessary data within your CSPM platform. Click here to learn more
        about reports
      </p>
      <button
        onClick={showModal}
        className="rounded-full text-white w-52 p-3 flex font-medium textWhite items-center justify-center gap-2 bg-[#284CB3] text-White"
      >
        <p>New Template</p>
        <svg
          width="10"
          height="9"
          viewBox="0 0 10 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5 0C5.27614 0 5.5 0.223858 5.5 0.5V4H9C9.27614 4 9.5 4.22386 9.5 4.5C9.5 4.77614 9.27614 5 9 5H5.5V8.5C5.5 8.77614 5.27614 9 5 9C4.72386 9 4.5 8.77614 4.5 8.5V5H1C0.723858 5 0.5 4.77614 0.5 4.5C0.5 4.22386 0.723858 4 1 4H4.5V0.5C4.5 0.223858 4.72386 0 5 0Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
};

const ReportCard = ({ data, mode, isLast }: any) => {
  return (
    <div
      className={`grid grid-cols-6 p-4 gap-[8px] py-[18px] px-[24px]  mb-3 ${isLast ? "border-0" : "border-bottom"}  ${
        mode === "dark" ? "bg-lightDark" : "bg-white"
      }`}
    >
      <div className="flex items-center gap-[16px] col-span-2">
        <img src={database} alt="database icon" className="w-6 h-6" />
        <h1 className="font-semibold text-[14px] md:text-[18px]">
          {data.report}
        </h1>
      </div>
      <p className="font-medium text-[12px] text-center">{data.total}</p>
      <p className="font-medium text-[12px] text-center">{data.range}</p>
      <p className={`${mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"} font-medium text-[12px] text-center`}>{data.target}</p>
      <div className="flex items-center justify-center gap-[32px] w-full ">
        <button className="bg-none border-start pl-[24px] flex items-center justify-center">
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
              d="M5.0625 4.48492V14.5106L13.5216 9.49774L5.0625 4.48492ZM3.9375 4.28748C3.9375 3.50294 4.79124 3.01648 5.46618 3.41644L14.2585 8.62669C14.9202 9.01885 14.9202 9.97663 14.2585 10.3688L5.46617 15.579C4.79124 15.979 3.9375 15.4925 3.9375 14.708V4.28748Z"
              fill={mode === "dark" ? "#EAEAEA" : "black"}
            />
          </svg>
        </button>
        <button className="bg-none flex items-center justify-center">
          <svg
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 9.875C9.20711 9.875 9.375 9.70711 9.375 9.5C9.375 9.29289 9.20711 9.125 9 9.125C8.79289 9.125 8.625 9.29289 8.625 9.5C8.625 9.70711 8.79289 9.875 9 9.875Z"
              fill={mode === "dark" ? "#EAEAEA" : "black"}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9 9.6875C9.10355 9.6875 9.1875 9.60355 9.1875 9.5C9.1875 9.39645 9.10355 9.3125 9 9.3125C8.89645 9.3125 8.8125 9.39645 8.8125 9.5C8.8125 9.60355 8.89645 9.6875 9 9.6875ZM8.0625 9.5C8.0625 8.98223 8.48223 8.5625 9 8.5625C9.51777 8.5625 9.9375 8.98223 9.9375 9.5C9.9375 10.0178 9.51777 10.4375 9 10.4375C8.48223 10.4375 8.0625 10.0178 8.0625 9.5Z"
              fill={mode === "dark" ? "#EAEAEA" : "black"}
            />
            <path
              d="M9 14.375C9.20711 14.375 9.375 14.2071 9.375 14C9.375 13.7929 9.20711 13.625 9 13.625C8.79289 13.625 8.625 13.7929 8.625 14C8.625 14.2071 8.79289 14.375 9 14.375Z"
              fill={mode === "dark" ? "#EAEAEA" : "black"}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9 14.1875C9.10355 14.1875 9.1875 14.1036 9.1875 14C9.1875 13.8964 9.10355 13.8125 9 13.8125C8.89645 13.8125 8.8125 13.8964 8.8125 14C8.8125 14.1036 8.89645 14.1875 9 14.1875ZM8.0625 14C8.0625 13.4822 8.48223 13.0625 9 13.0625C9.51777 13.0625 9.9375 13.4822 9.9375 14C9.9375 14.5178 9.51777 14.9375 9 14.9375C8.48223 14.9375 8.0625 14.5178 8.0625 14Z"
              fill={mode === "dark" ? "#EAEAEA" : "black"}
            />
            <path
              d="M9 5.375C9.20711 5.375 9.375 5.20711 9.375 5C9.375 4.79289 9.20711 4.625 9 4.625C8.79289 4.625 8.625 4.79289 8.625 5C8.625 5.20711 8.79289 5.375 9 5.375Z"
              fill={mode === "dark" ? "#EAEAEA" : "black"}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9 5.1875C9.10355 5.1875 9.1875 5.10355 9.1875 5C9.1875 4.89645 9.10355 4.8125 9 4.8125C8.89645 4.8125 8.8125 4.89645 8.8125 5C8.8125 5.10355 8.89645 5.1875 9 5.1875ZM8.0625 5C8.0625 4.48223 8.48223 4.0625 9 4.0625C9.51777 4.0625 9.9375 4.48223 9.9375 5C9.9375 5.51777 9.51777 5.9375 9 5.9375C8.48223 5.9375 8.0625 5.51777 8.0625 5Z"
              fill={mode === "dark" ? "#EAEAEA" : "black"}
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const ReportTemplates = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showPopOver, setShowPopOver] = useState(false);
  const { mode } = useRecoilValue(modeAtomsAtom);
  const [allReports, setAllReports] = useState<any[]>([
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
  const [isLoading, setLoading] = useState(false);

  const handleSearch = (val: string) => {
    const keys = ["report", "target"];
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
      {allReports.length < 1 ? (
        <>
          {isLoading ? (
            <DefaultContent
              pageHeader="All Reports"
              pageDescription="No record found"
              loading={isLoading}
              buttonValue=""
              buttonClick={() => {}}
            />
          ) : (
            <EmptyTemplates showModal={() => setShowAdd(true)} mode={mode} />
          )}
        </>
      ) : (
        <>
          <div className="flex items-center w-full justify-between">
            <button
              type="button"
              onClick={() => setShowAdd(true)}
              className="rounded-full flex items-center justify-center gap-1 bg-primary text-white font-medium  py-[12px] px-[24px] w-fit"
            >
              <span className="indicator-label font-medium ">New Template</span>
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
                  d="M8 4C8.27614 4 8.5 4.22386 8.5 4.5V8H12C12.2761 8 12.5 8.22386 12.5 8.5C12.5 8.77614 12.2761 9 12 9H8.5V12.5C8.5 12.7761 8.27614 13 8 13C7.72386 13 7.5 12.7761 7.5 12.5V9H4C3.72386 9 3.5 8.77614 3.5 8.5C3.5 8.22386 3.72386 8 4 8H7.5V4.5C7.5 4.22386 7.72386 4 8 4Z"
                  fill="white"
                />
              </svg>
            </button>
            <Link
              to="/"
              className="font-medium border-start border-end py-[2px] px-[16px]"
            >
              Learn more
            </Link>
          </div>
          <div
            className={`mb-3 ${
              mode === "dark" ? "bg-lightDark" : "bg-white"
            } border rounded-[12px] mt-[32px]`}
          >
            <div className="flex items-center justify-between py-[18px] px-[24px] border-bottom">
              <div className="">
                <h1 className="font-bold text-[14px] md:text-[18px] mb-[1px]">
                  {allReports.length} Total Templates
                </h1>
                <p className="font-medium text-[10px] md:text-[12px]">
                  Custom reports for your analysis
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
              className={`grid grid-cols-6 p-4 gap-[8px] py-[18px] px-[24px]  mb-3 border-bottom  ${
                mode === "dark" ? "bg-lightDark" : "bg-white"
              }`}
            >
              <p className="col-span-2 font-semibold text-[12px]">Reports</p>
              <p className="font-semibold text-[12px] text-center">Count</p>
              <p className="font-semibold text-[12px] text-center">
                Time Range
              </p>
              <p className="font-semibold text-[12px] text-center">Target</p>
              <p className="font-semibold text-[12px] text-center">Actions</p>
            </div>
            {allReports.map((report, idx) => (
              <ReportCard mode={mode} data={report} key={report.total + idx} isLast={idx === allReports.length - 1} />
            ))}
          </div>
        </>
      )}

      {showAdd && (
        <NewReportModal
          isOpen={showAdd}
          handleHide={() => setShowAdd(!showAdd)}
          mode={mode}
          handleRefetch={() => console.log("refetching")}
        />
      )}
    </div>
  );
};

export default ReportTemplates;
