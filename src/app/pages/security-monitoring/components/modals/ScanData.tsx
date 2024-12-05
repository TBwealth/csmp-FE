import React from "react";
import emptyImg from "../../../../../../public/media/logos/empty-result.svg";
import modeAtomsAtom from "../../../../atoms/modeAtoms.atom";
import { useRecoilValue } from "recoil";
import { FaGlobe } from "react-icons/fa";
import { Link } from "react-router-dom";
type Props = {
  data: any;
};

const ScanData = ({ data }: Props) => {
  const { mode } = useRecoilValue(modeAtomsAtom);
  return (
    <>
      {data ? (
        <div
          className={`rounded-[12px] flex items-center gap-8 justify-center flex-col border ${
            mode === "dark" ? "bg-lightDark" : "bg-white"
          }`}
        >
          <div className="w-full px-[24px] py-[16px] border-bottom flex items-center justify-between">
            <h3 className="font-semibold text-center text-[14px]">
              Latest Scan Report
            </h3>
            <h3 className="flex items-center gap-3 font-medium text-[12px]">
              <span>{`${new Date(data?.created_on).getDate()}/${
                new Date(data?.created_on).getMonth() + 1
              }/${new Date(data?.created_on).getFullYear()}`}</span>
              <span>{`${
                new Date(data?.created_on).getHours() > 12
                  ? new Date(data?.created_on).getHours() - 12
                  : new Date(data?.created_on).getHours()
              }:${
                new Date(data?.created_on).getSeconds() < 10
                  ? `0${new Date(data?.created_on).getSeconds()}`
                  : new Date(data?.created_on).getSeconds()
              } ${
                new Date(data?.created_on).getHours() < 12 ? "AM" : "PM"
              }`}</span>
            </h3>
          </div>
          <div className="w-full px-[24px] py-[16px]">
            <h3 className="font-medium text-[14px] mb-3 text-left">
              <span className="font-bold">
                {data?.result_json?.Total_checks} 
              </span>
              checks performed
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="flex items-center gap-10 col-span-2 border-end">
                <div className="rounded-t-full h-[50px] w-[100px] bg-gradient-to-r from-[#00B712] from-[45%] to-[#DADADA] via-[#DADADA] via-[10%] t0-[20%]">
                  <div
                    className={`rounded-t-full mt-2.5 h-[50px] w-[85px] mx-auto pt-2 ${
                      mode === "dark" ? "bg-lightDark" : "bg-white"
                    }`}
                  >
                    <div className="rounded-t-full h-[30px] w-[75px] text-center mx-auto bg-none border border-dotted">
                      <h3 className="font-semibold text-2xl mt-2">38%</h3>
                    </div>
                  </div>
                  <div className="flex items-center w-full justify-between">
                    <svg
                      width="14px"
                      height="14px"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      color={mode === "dark" ? "#EAEAEA" : "#000000"}
                    >
                      <path
                        d="M9 22L12.0005 19M15 16L12.0005 19M12.0005 19L9 16M12.0005 19L15 22"
                        stroke={mode === "dark" ? "#EAEAEA" : "#000000"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M20 17.6073C21.4937 17.0221 23 15.6889 23 13C23 9 19.6667 8 18 8C18 6 18 2 12 2C6 2 6 6 6 8C4.33333 8 1 9 1 13C1 15.6889 2.50628 17.0221 4 17.6073"
                        stroke={mode === "dark" ? "#EAEAEA" : "#000000"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <svg
                      width="14px"
                      height="14px"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      color="#00B712"
                    >
                      <path
                        d="M8 18L11 21L16 16"
                        stroke="#00B712"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M20 17.6073C21.4937 17.0221 23 15.6889 23 13C23 9 19.6667 8 18 8C18 6 18 2 12 2C6 2 6 6 6 8C4.33333 8 1 9 1 13C1 15.6889 2.50628 17.0221 4 17.6073"
                        stroke="#00B712"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="">
                  <h3 className="font-medium text-[12px] mb-3 text-left">
                    Failed checks
                  </h3>
                  <h3 className="font-bold text-[14px] text-[#FF161A]">
                    {data?.result_json?.Failed}
                  </h3>
                </div>
              </div>
              <div className="">
                <h3 className="font-medium text-[12px] mb-3 text-left">
                  Successful
                </h3>
                <h3 className="font-bold text-[14px] text-[#00B712]">
                  {data?.result_json?.Passed}
                </h3>
              </div>
            </div>
            <div className="mt-12">
              <h1 className="text-[18px] font-semibold">{data?.provider}</h1>
              <div className="flex items-center gap-4 my-4">
                <svg
                  width="24px"
                  height="24px"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  color={mode === "dark" ? "#EAEAEA" : "#000000"}
                >
                  <path
                    d="M3 5H21"
                    stroke={mode === "dark" ? "#EAEAEA" : "#000000"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M3 12H21"
                    stroke={mode === "dark" ? "#EAEAEA" : "#000000"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M3 19H21"
                    stroke={mode === "dark" ? "#EAEAEA" : "#000000"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <p className="text-[12px] font-medium">
                  {data?.policy_run?.policy?.name ?? ""}
                </p>
              </div>
              <div className="flex items-center gap-4 my-4">
                <FaGlobe
                  color={mode === "dark" ? "#EAEAEA" : "#000000"}
                  size={24}
                />
                <p className="text-[12px] font-medium">{data?.region}</p>
              </div>
            </div>
            <Link
              to={`/monitoring/resource-scanning/${data?.policy_run?.id}`}
              className="block w-fit mt-6 font-medium text-[12px]"
            >
              <p className="underline">view report</p>
            </Link>
          </div>
        </div>
      ) : (
        <div
          className={`rounded-md flex items-center gap-8 justify-center flex-col mb-10 border p-12 ${
            mode === "dark" ? "bg-lightDark" : "bg-white"
          }`}
        >
          <h3 className="text-center font-medium text-[18px]">
            Scan History:No Records Found
          </h3>
          <img src={emptyImg} alt="empty data image file" />
        </div>
      )}
    </>
  );
};

export default ScanData;
