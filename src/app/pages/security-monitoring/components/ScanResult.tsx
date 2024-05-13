import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import modeAtomsAtom from "../../../atoms/modeAtoms.atom";
import { useGetAllScanResults } from "../../../api/api-services/policyQuery";
import { FaChevronLeft, FaGlobe } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import ScanAccordion from "./modals/ScanAccordion";
import { PolicyPolicyListCreateList200Response } from "../../../api/axios-client";
import DefaultContent from "../../../components/defaultContent/defaultContent";
const ScanResult = () => {
  const { mode } = useRecoilValue(modeAtomsAtom);
  const [activeBtn, setActiveBtn] = useState("Daily");
  const [scanresult, setScanResult] = useState<any>(null);
  const [time, setTime] = useState("");
  const [pageCount, setPageCount] = useState(5);
  const [offset, setOffset] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: scanResult,
    isLoading,
    refetch,
  } = useGetAllScanResults({ policy_run_id: id! });

  const scanstsr: PolicyPolicyListCreateList200Response | any = scanResult;

  useEffect(() => {
    setScanResult(scanstsr?.data?.data?.results[0]);
    if (scanstsr?.data?.data?.results[0]) {
      const sliptedTime = scanstsr?.data?.data?.results[0].stop_time
        .split("T")[1]
        .slice(0, 5);
      setTime(sliptedTime);
      // const
    }
  }, [scanResult]);

  console.log(scanresult);

  const data = [
    {
      name: "AWS Config Enabled",
      region: "us-east-1",
      service: "us-east-1",
      severity: "",
      status: "failed",
      message:
        "Security group launch-wizard-1 allows ingress from 0.0.0.0/0 or ::/0 to ports 11211, 11211",
      description: "launch-wizard-1 created 2023-11-23T14:35:09.092Z",
      groupId: "sg-04cc9e5ccd9ca7f80",
    },
    {
      name: "	Restricted Security Group Ingress on Port",
      region: "us-east-1",
      service: "EConfigC2",
      severity: "LOW",
      status: "pass",
      message:
        "Security group launch-wizard-1 allows ingress from 0.0.0.0/0 or ::/0 to ports 11211, 11211",
      description: "launch-wizard-1 created 2023-11-23T14:35:09.092Z",
      groupId: "sg-04cc9e5ccd9ca7f80",
    },
    {
      name: "	S3 Bucket Public Access Via Policy",
      region: "global",
      service: "S23B",
      severity: "HIGH",
      status: "failed",
      message:
        "Security group launch-wizard-1 allows ingress from 0.0.0.0/0 or ::/0 to ports 11211, 11211",
      description: "launch-wizard-1 created 2023-11-23T14:35:09.092Z",
      groupId: "sg-04cc9e5ccd9ca7f80",
    },
    {
      name: "	S3 Bucket Public Access Via Policy",
      region: "global",
      service: "S23B",
      severity: "HIGH",
      status: "failed",
      message:
        "Security group launch-wizard-1 allows ingress from 0.0.0.0/0 or ::/0 to ports 11211, 11211",
      description: "launch-wizard-1 created 2023-11-23T14:35:09.092Z",
      groupId: "sg-04cc9e5ccd9ca7f80",
    },
  ];
  return (
    <div className="">
      {isLoading ? (
        <DefaultContent
          pageHeader="Scan Result"
          pageDescription="No record found"
          loading={isLoading}
          buttonValue="Refresh"
          buttonClick={() => refetch()}
        />
      ) : (
        <div className="mt-10 md:w-[95%] mx-auto p-4">
          <div className="flex items-center justify-between flex-cols md:flex-row gap-10">
            <div className="flex justify-between items-center w-full md:w-[60%] gap-2">
              <button onClick={() => navigate(-1)}>
                <FaChevronLeft
                  className="hover:cursor-pointer"
                  color={mode === "dark" ? "#EAEAEA" : "#000000"}
                  size={14}
                />
              </button>
              <p>
                <span className="font-semibold">ISO EAC 27001</span> system
                check
              </p>
              <div className="flex items-center gap-2">
                <FaGlobe
                  color={mode === "dark" ? "#EAEAEA" : "#000000"}
                  size={14}
                />
                <p>All Region</p>
              </div>
              <p>{scanresult && `${scanresult.stop_time.split("T")[0]}`}</p>
              <p className="rounded-2xl px-2 py-1 w-24 text-primary text-center bg-[#284CB31A]">
                Manual
              </p>
              <button className="flex items-center gap-3 hover:cursor-pointer">
                <p className="underline">JSON</p>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.9375 15C3.9375 14.6893 4.18934 14.4375 4.5 14.4375L13.5 14.4375C13.8107 14.4375 14.0625 14.6893 14.0625 15C14.0625 15.3107 13.8107 15.5625 13.5 15.5625L4.5 15.5625C4.18934 15.5625 3.9375 15.3107 3.9375 15Z"
                    fill={mode === "dark" ? "#EAEAEA" : "#000000"}
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.60225 12.3977C8.82192 12.6174 9.17808 12.6174 9.39775 12.3977L12.0227 9.77275C12.2424 9.55308 12.2424 9.19692 12.0227 8.97725C11.8031 8.75758 11.4469 8.75758 11.2273 8.97725L9.5625 10.642V3C9.5625 2.68934 9.31066 2.4375 9 2.4375C8.68934 2.4375 8.4375 2.68934 8.4375 3V10.642L6.77275 8.97725C6.55308 8.75758 6.19692 8.75758 5.97725 8.97725C5.75758 9.19692 5.75758 9.55308 5.97725 9.77275L8.60225 12.3977Z"
                    fill={mode === "dark" ? "#EAEAEA" : "#000000"}
                  />
                </svg>
              </button>
            </div>

            <button className="w-32 bg-[#284CB3] py-2 px-3 rounded-full flex items-center gap-2 justify-center">
              <span className="text-white">Rescan</span>
              <svg
                width="20px"
                height="20px"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="#FFFFFF"
              >
                <path
                  d="M13.5 13L15 14.5"
                  stroke="#FFFFFF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M9 11C9 12.3807 10.1193 13.5 11.5 13.5C12.1916 13.5 12.8175 13.2192 13.2701 12.7654C13.7211 12.3132 14 11.6892 14 11C14 9.61929 12.8807 8.5 11.5 8.5C10.1193 8.5 9 9.61929 9 11Z"
                  stroke="#FFFFFF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M5 18L3.13036 4.91253C3.05646 4.39524 3.39389 3.91247 3.90398 3.79912L11.5661 2.09641C11.8519 2.03291 12.1481 2.03291 12.4339 2.09641L20.096 3.79912C20.6061 3.91247 20.9435 4.39524 20.8696 4.91252L19 18C18.9293 18.495 18.5 21.5 12 21.5C5.5 21.5 5.07071 18.495 5 18Z"
                  stroke="#FFFFFF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
          </div>
          <h3 className="font-medium text-xl md:text-2xl my-8 pl-3 text-left">
            Gilotec cloudname
          </h3>
          <div className="mt-16 grid md:grid-cols-4 gap-6 mb-8">
            <div className="flex items-center gap-10 border-end">
              <div className="rounded-t-full h-[150px] w-[200px] bg-gradient-to-r from-[#00B712] from-[45%] to-[#DADADA] via-[#DADADA] via-[10%] t0-[20%]">
                <div
                  className={`rounded-t-full mt-5 h-[120px] w-[165px] mx-auto pt-2 ${
                    mode === "dark" ? "bg-bgDark" : "bg-[#fbfbfb]"
                  }`}
                >
                  <div className="rounded-t-full h-[120px] w-[150px] text-center mx-auto bg-none border-3 border-dotted">
                    <h3 className="font-semibold text-5xl mt-12">57%</h3>
                  </div>
                </div>
                <div
                  className={`-mt-5 py-3 flex items-center w-full justify-between ${
                    mode === "dark" ? "bg-bgDark" : "bg-[#fbfbfb]"
                  }`}
                >
                  <svg
                    width="14px"
                    height="14px"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    color={mode === "dark" ? "#EAEAEA" : "#000000"}
                  >
                    <path
                      d="M9 22L12.0005 19M15 16L12.0005 19M12.0005 19L9 16M12.0005 19L15 22"
                      stroke={mode === "dark" ? "#EAEAEA" : "#000000"}
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M20 17.6073C21.4937 17.0221 23 15.6889 23 13C23 9 19.6667 8 18 8C18 6 18 2 12 2C6 2 6 6 6 8C4.33333 8 1 9 1 13C1 15.6889 2.50628 17.0221 4 17.6073"
                      stroke={mode === "dark" ? "#EAEAEA" : "#000000"}
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                  <svg
                    width="14px"
                    height="14px"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    color="#00B712"
                  >
                    <path
                      d="M8 18L11 21L16 16"
                      stroke="#00B712"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M20 17.6073C21.4937 17.0221 23 15.6889 23 13C23 9 19.6667 8 18 8C18 6 18 2 12 2C6 2 6 6 6 8C4.33333 8 1 9 1 13C1 15.6889 2.50628 17.0221 4 17.6073"
                      stroke="#00B712"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="border-end pt-10 pr-4">
              <h3 className="font-medium text-xl mb-3 text-left">
                <span className="font-bold pr-2">
                  {scanresult?.result_json.Total_checks ?? 0}
                </span>
                checks performed
              </h3>
              <div className="flex items-center justify-between md:w-[80%]">
                <div className="">
                  <h3 className="font-medium text-xl mb-3 text-left">
                    Failed checks
                  </h3>
                  <h3 className="font-bold text-2xl text-[#FF161A]">
                    {scanresult?.result_json.Failed ?? 0}
                  </h3>
                </div>
                <div className="">
                  <h3 className="font-medium text-xl mb-3 text-left">
                    Successful
                  </h3>
                  <h3 className="font-bold text-2xl text-[#00B712]">
                    {scanresult?.result_json.Passed ?? 0}
                  </h3>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 col-span-2 gap-3 mt-6">
              <div className="flex items-center gap-3 p-3">
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="34" height="34" rx="17" fill="#FF161A" />
                  <g clip-path="url(#clip0_98_13081)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.3523 19.6023C14.572 19.3826 14.9281 19.3826 15.1478 19.6022L17.0004 21.4545L18.8523 19.6023C19.072 19.3826 19.4281 19.3826 19.6478 19.6022C19.8675 19.8219 19.8675 20.178 19.6479 20.3977L17.7959 22.25L19.6479 24.1023C19.8675 24.322 19.8675 24.6781 19.6478 24.8978C19.4281 25.1174 19.072 25.1174 18.8523 24.8977L17.0004 23.0455L15.1478 24.8978C14.9281 25.1174 14.572 25.1174 14.3523 24.8977C14.1327 24.678 14.1327 24.3219 14.3524 24.1022L16.2049 22.25L14.3524 20.3978C14.1327 20.1781 14.1327 19.822 14.3523 19.6023Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.5448 11.4769C13.0741 12.2614 13.0625 13.2293 13.0625 14C13.0625 14.3107 12.8107 14.5625 12.5 14.5625C11.965 14.5625 11.15 14.7276 10.4849 15.2065C9.84851 15.6647 9.3125 16.4333 9.3125 17.75C9.3125 18.6466 9.56117 19.2788 9.90304 19.7295C10.2494 20.1861 10.7181 20.4909 11.2052 20.6817C11.4944 20.795 11.6371 21.1213 11.5238 21.4106C11.4104 21.6999 11.0841 21.8425 10.7948 21.7292C10.1616 21.4811 9.50529 21.0666 9.00674 20.4094C8.50368 19.7462 8.1875 18.8701 8.1875 17.75C8.1875 16.0667 8.90149 14.9603 9.82758 14.2935C10.513 13.8 11.2932 13.561 11.9422 13.4756C11.9619 12.7419 12.063 11.7601 12.5802 10.8981C13.272 9.74497 14.613 8.9375 17 8.9375C19.387 8.9375 20.728 9.74497 21.4198 10.8981C21.937 11.7601 22.0381 12.7419 22.0578 13.4756C22.7068 13.561 23.487 13.8 24.1724 14.2935C25.0985 14.9603 25.8125 16.0667 25.8125 17.75C25.8125 18.8701 25.4963 19.7462 24.9933 20.4094C24.4947 21.0666 23.8384 21.4811 23.2052 21.7292C22.9159 21.8425 22.5896 21.6999 22.4762 21.4106C22.3629 21.1213 22.5056 20.795 22.7948 20.6817C23.2819 20.4909 23.7506 20.1861 24.097 19.7295C24.4388 19.2788 24.6875 18.6466 24.6875 17.75C24.6875 16.4333 24.1515 15.6647 23.5151 15.2065C22.85 14.7276 22.035 14.5625 21.5 14.5625C21.1893 14.5625 20.9375 14.3107 20.9375 14C20.9375 13.2293 20.9259 12.2614 20.4552 11.4769C20.022 10.755 19.113 10.0625 17 10.0625C14.887 10.0625 13.978 10.755 13.5448 11.4769Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_98_13081">
                      <rect
                        width="18"
                        height="18"
                        fill="white"
                        transform="translate(8 8)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <p className="font-bold text-lg">
                  {scanresult?.result_json.Critical_Severity ?? 0} 
                  <span className="font-thin">Critical threats</span>
                </p>
              </div>
              <div className="flex items-center gap-3 p-3">
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="34" height="34" rx="17" fill="#FF7D30" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17 20.5625C16.6893 20.5625 16.4375 20.3107 16.4375 20V17C16.4375 16.6893 16.6893 16.4375 17 16.4375C17.3107 16.4375 17.5625 16.6893 17.5625 17V20C17.5625 20.3107 17.3107 20.5625 17 20.5625Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17 15.3125C16.6893 15.3125 16.4375 15.0607 16.4375 14.75V14C16.4375 13.6893 16.6893 13.4375 17 13.4375C17.3107 13.4375 17.5625 13.6893 17.5625 14V14.75C17.5625 15.0607 17.3107 15.3125 17 15.3125Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17 11.5625C13.997 11.5625 11.5625 13.997 11.5625 17C11.5625 20.003 13.997 22.4375 17 22.4375C20.003 22.4375 22.4375 20.003 22.4375 17C22.4375 13.997 20.003 11.5625 17 11.5625ZM10.4375 17C10.4375 13.3756 13.3756 10.4375 17 10.4375C20.6244 10.4375 23.5625 13.3756 23.5625 17C23.5625 20.6244 20.6244 23.5625 17 23.5625C13.3756 23.5625 10.4375 20.6244 10.4375 17Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.3485 10.9636C11.5757 11.1755 11.5882 11.5314 11.3763 11.7586C10.0954 13.1323 9.3125 14.9741 9.3125 17C9.3125 19.0259 10.0954 20.8677 11.3763 22.2414C11.5882 22.4686 11.5757 22.8245 11.3485 23.0364C11.1213 23.2483 10.7654 23.2358 10.5535 23.0086C9.08613 21.4349 8.1875 19.3218 8.1875 17C8.1875 14.6782 9.08613 12.5651 10.5535 10.9914C10.7654 10.7642 11.1213 10.7517 11.3485 10.9636Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M22.6515 10.9636C22.8788 10.7517 23.2347 10.7642 23.4466 10.9914C24.9139 12.5651 25.8126 14.6782 25.8126 17C25.8126 19.3218 24.9139 21.4349 23.4466 23.0086C23.2347 23.2358 22.8788 23.2483 22.6515 23.0364C22.4243 22.8245 22.4119 22.4686 22.6238 22.2414C23.9046 20.8677 24.6876 19.0259 24.6876 17C24.6876 14.9741 23.9046 13.1323 22.6238 11.7586C22.4119 11.5314 22.4243 11.1755 22.6515 10.9636Z"
                    fill="white"
                  />
                </svg>

                <p className="font-bold text-lg">
                  {scanresult?.result_json.High_Severity ?? 0} 
                  <span className="font-thin">High threats</span>
                </p>
              </div>
              <div className="flex items-center gap-3 p-3">
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="34" height="34" rx="17" fill="#FFCC00" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.2121 10.7312C16.0052 9.35198 17.9951 9.35197 18.7881 10.7312L24.8203 21.222C25.6109 22.597 24.6184 24.3126 23.0323 24.3126H10.9679C9.38181 24.3126 8.38929 22.597 9.17991 21.222L15.2121 10.7312ZM17.8128 11.292C17.4524 10.665 16.5479 10.665 16.1874 11.292L10.1552 21.7828C9.79581 22.4078 10.247 23.1876 10.9679 23.1876H23.0323C23.7533 23.1876 24.2044 22.4078 23.8451 21.7828L17.8128 11.292Z"
                    fill="#373737"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17 14.1875C17.3107 14.1875 17.5625 14.4393 17.5625 14.75V17.75C17.5625 18.0607 17.3107 18.3125 17 18.3125C16.6893 18.3125 16.4375 18.0607 16.4375 17.75V14.75C16.4375 14.4393 16.6893 14.1875 17 14.1875Z"
                    fill="#373737"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.3838 20.3309C17.6147 20.5387 17.6334 20.8944 17.4256 21.1253L17.4181 21.1337C17.2103 21.3646 16.8546 21.3833 16.6237 21.1755C16.3928 20.9676 16.3741 20.612 16.5819 20.3811L16.5894 20.3727C16.7972 20.1418 17.1529 20.1231 17.3838 20.3309Z"
                    fill="#373737"
                  />
                </svg>

                <p className="font-bold text-lg">
                  {scanresult?.result_json.Medium_Severity ?? 0} 
                  <span className="font-thin">Warnings threats</span>
                </p>
              </div>
              <div className="flex items-center gap-3 p-3">
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="34" height="34" rx="17" fill="#6A6A6A" />
                  <g clip-path="url(#clip0_98_13096)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17 12.6875C17.3107 12.6875 17.5625 12.9393 17.5625 13.25V17.75C17.5625 18.0607 17.3107 18.3125 17 18.3125C16.6893 18.3125 16.4375 18.0607 16.4375 17.75V13.25C16.4375 12.9393 16.6893 12.6875 17 12.6875Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17.3838 20.3309C17.6147 20.5387 17.6334 20.8944 17.4256 21.1253L17.4181 21.1337C17.2103 21.3646 16.8546 21.3833 16.6237 21.1755C16.3928 20.9676 16.3741 20.612 16.5819 20.3811L16.5894 20.3727C16.7972 20.1418 17.1529 20.1231 17.3838 20.3309Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17 10.0625C13.1685 10.0625 10.0625 13.1685 10.0625 17C10.0625 20.8315 13.1685 23.9375 17 23.9375C20.8315 23.9375 23.9375 20.8315 23.9375 17C23.9375 13.1685 20.8315 10.0625 17 10.0625ZM8.9375 17C8.9375 12.5472 12.5472 8.9375 17 8.9375C21.4528 8.9375 25.0625 12.5472 25.0625 17C25.0625 21.4528 21.4528 25.0625 17 25.0625C12.5472 25.0625 8.9375 21.4528 8.9375 17Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_98_13096">
                      <rect
                        width="18"
                        height="18"
                        fill="white"
                        transform="translate(8 8)"
                      />
                    </clipPath>
                  </defs>
                </svg>

                <p className="font-bold text-lg">
                  {scanresult?.result_json.Low_Severity ?? 0} 
                  <span className="font-thin">Low Risks</span>
                </p>
              </div>
            </div>
          </div>
          <div className="mt-16 flex items-center justify-between gap-10 border-bottom pb-8">
            <h2 className="flex-1 font-lg md:font-xl font-bold">
              Compliance Status{" "}
              <span className="font-thin">
                (based on last scan{" "}
                {`${time} ${Number(time.split(":")[0]) > 12 ? "PM" : "AM"}`})
              </span>
            </h2>
            <div className="flex items-center gap-4">
              <select name="" id="" className="bg-transparent p-2">
                <option value="">Group By</option>
              </select>
              <button className="flex items-center gap-3">
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
              <button className="flex items-center gap-3">
                <p className="underline">Export PDF</p>
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
                    d="M3.5625 2.5625V16.4375H10.5C10.8107 16.4375 11.0625 16.6893 11.0625 17C11.0625 17.3107 10.8107 17.5625 10.5 17.5625H3.45C2.89081 17.5625 2.4375 17.1092 2.4375 16.55V2.45C2.4375 1.89081 2.89081 1.4375 3.45 1.4375H12.1886C12.4571 1.4375 12.7147 1.54417 12.9045 1.73405L15.2659 4.09545C15.4558 4.28533 15.5625 4.54286 15.5625 4.8114V10.25C15.5625 10.5607 15.3107 10.8125 15 10.8125C14.6893 10.8125 14.4375 10.5607 14.4375 10.25V4.858L12.142 2.5625H3.5625Z"
                    fill={mode === "dark" ? "#EAEAEA" : "black"}
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 1.4375C12.3107 1.4375 12.5625 1.68934 12.5625 2V4.4375H15C15.3107 4.4375 15.5625 4.68934 15.5625 5C15.5625 5.31066 15.3107 5.5625 15 5.5625H12.45C11.8908 5.5625 11.4375 5.10919 11.4375 4.55V2C11.4375 1.68934 11.6893 1.4375 12 1.4375Z"
                    fill={mode === "dark" ? "#EAEAEA" : "black"}
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.8523 17.3977C14.0719 17.6174 14.4281 17.6174 14.6477 17.3977L16.8977 15.1477C17.1174 14.9281 17.1174 14.5719 16.8977 14.3523L14.6477 12.1023C14.4281 11.8826 14.0719 11.8826 13.8523 12.1023C13.6326 12.3219 13.6326 12.6781 13.8523 12.8977L15.142 14.1875H12C11.6893 14.1875 11.4375 14.4393 11.4375 14.75C11.4375 15.0607 11.6893 15.3125 12 15.3125H15.142L13.8523 16.6023C13.6326 16.8219 13.6326 17.1781 13.8523 17.3977Z"
                    fill={mode === "dark" ? "#EAEAEA" : "black"}
                  />
                </svg>
              </button>
            </div>
          </div>

          <div>
            <div
              className={`grid grid-cols-6 p-4 rounded-md mb-3 shadow-sm w-full ${
                mode === "dark" ? "bg-lightDark" : "bg-white"
              }`}
            >
              <p className="font-semibold col-span-3 flex items-center gap-2">
                <svg
                  width="18px"
                  height="18px"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  color={mode === "dark" ? "#EAEAEA" : "#000000"}
                >
                  <path
                    d="M8 9C8 9 9 8 12 8C15 8 16 9 16 9"
                    stroke={mode === "dark" ? "#EAEAEA" : "#000000"}
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M12 14C12.5523 14 13 13.5523 13 13C13 12.4477 12.5523 12 12 12C11.4477 12 11 12.4477 11 13C11 13.5523 11.4477 14 12 14Z"
                    fill={mode === "dark" ? "#EAEAEA" : "#000000"}
                    stroke={mode === "dark" ? "#EAEAEA" : "#000000"}
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M5 18L3.13036 4.91253C3.05646 4.39524 3.39389 3.91247 3.90398 3.79912L11.5661 2.09641C11.8519 2.03291 12.1481 2.03291 12.4339 2.09641L20.096 3.79912C20.6061 3.91247 20.9435 4.39524 20.8696 4.91252L19 18C18.9293 18.495 18.5 21.5 12 21.5C5.5 21.5 5.07071 18.495 5 18Z"
                    stroke={mode === "dark" ? "#EAEAEA" : "#000000"}
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
                <span>Compliant Rule</span>
              </p>
              <button className="flex items-center justify-center gap-2 font-semibold">
                <span>Service</span>{" "}
                <svg
                  width="10"
                  height="5"
                  viewBox="0 0 10 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.5 0.75L5 4.25L8.5 0.75"
                    stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button className="flex items-center justify-center gap-2 font-semibold">
                <span>Severity</span>{" "}
                <svg
                  width="10"
                  height="5"
                  viewBox="0 0 10 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.5 0.75L5 4.25L8.5 0.75"
                    stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <p className="font-semibold">Status</p>
            </div>
            <div className="w-[200%] md:w-full overflow-x-auto">
              {scanresult &&
                scanresult.result_json.checks
                  .slice(offset, offset+pageCount)
                  .map((d: any, idx: number) => (
                    <ScanAccordion
                      description={d.status_detail}
                      // groupId={d.groupId}
                      message={d.rule_code}
                      name={d.rule_code}
                      region={d.region}
                      service={d.service}
                      status={d.status_code}
                      key={d.name + String(idx)}
                      severity={d.severity}
                      remediation={d.remediation_desc}
                      provider={d.provider}
                    />
                  ))}
            </div>
            <div className="mt-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <p>Num on row:</p>
                <select
                  name=""
                  id=""
                  className="p-2"
                  value={pageCount}
                  onChange={(e) => setPageCount(+e.target.value)}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <button 
                disabled={offset === 0}
                onClick={() => {
                  if(offset <= 0) {
                    setOffset(0)
                  } else {
                    setOffset((offset) => offset - pageCount)
                  }
                }}
                className="bg-primary w-24 rounded-md p-2 text-white">
                  previous
                </button>
                <button
                disabled={
                  offset >= scanresult?.result_json.checks.length
                }
                onClick={() => setOffset((offset) => offset + pageCount)}
                className="bg-primary w-24 rounded-md p-2 text-white">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScanResult;
