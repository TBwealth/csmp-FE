import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import modeAtomsAtom from "../../../atoms/modeAtoms.atom";
import { AgCharts } from "ag-charts-react";
import { FaEllipsisV } from "react-icons/fa";
import docker from "../../../../../public/media/logos/docker.svg";
import github from "../../../../../public/media/logos/github.svg";
import gitlabImg from "../../../../../public/media/logos/gitlab.svg";
import getData, { numFormatter, formatNumber } from "./model";

const Card = ({ data, isLast }: any) => {
  return (
    <div
      className={`${
        isLast ? "" : "border-bottom"
      } p-[16px] flex items-cente justify-between`}
    >
      <div className="flex items-center gap-[12px]">
        <div className="relative size-8">
          <svg
            className="size-full -rotate-90"
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* <!-- Background Circle --> */}
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className="stroke-current text-gray-200 dark:text-neutral-700"
              stroke-width="2"
            ></circle>
            {/* <!-- Progress Circle --> */}
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className="stroke-current text-blue-600 dark:text-blue-500"
              stroke-width="2"
              stroke-dasharray="100"
              stroke-dashoffset="75"
              stroke-linecap="round"
            ></circle>
          </svg>
        </div>
        <div className="flex items-center gap-[8px] border-start pl-[12px]">
          <img src={data?.logo} alt="logo" className="w-8 h-8" />
          <h2 className="font-medium text-start text-[12px]">{data?.name}</h2>
        </div>
      </div>
      <button className="flex items-center justify-center">
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
            d="M4.3275 4.5C4.3275 4.18934 4.57934 3.9375 4.89 3.9375H14.25C14.5607 3.9375 14.8125 4.18934 14.8125 4.5V13.86C14.8125 14.1707 14.5607 14.4225 14.25 14.4225C13.9393 14.4225 13.6875 14.1707 13.6875 13.86V5.858L4.89775 14.6477C4.67808 14.8674 4.32192 14.8674 4.10225 14.6477C3.88258 14.4281 3.88258 14.0719 4.10225 13.8523L12.892 5.0625H4.89C4.57934 5.0625 4.3275 4.81066 4.3275 4.5Z"
            fill="#373737"
          />
        </svg>
      </button>
    </div>
  );
};

const ImageCard = ({ data, isLast }: any) => {
  return (
    <div
      className={`${
        isLast ? "" : "border-bottom"
      } grid grid-cols-4 w-full place-content-center py-[16px] px-[24px]`}
    >
      <p className="font-medium text-start text-[12px]">{data?.image}</p>
      <p className="font-medium text-start text-[#FF161A] text-[12px]">
        {data?.checks}
      </p>
      <p className="font-medium text-start text-[12px]">{data?.rules}</p>
      <div className="flex items-center gap-[6px]">
        <img src={docker} alt="logo" className="w-6 h-6" />
        <p className="font-medium text-start text-[12px]">{data?.registry}</p>
      </div>
    </div>
  );
};
const VioCard = ({ data, isLast }: any) => {
  return (
    <div
      className={`${
        isLast ? "" : "border-bottom"
      } grid grid-cols-4 w-full place-content-center py-[16px] px-[24px]`}
    >
      <p className="font-medium text-start text-[12px]">{data?.template}</p>
      <p className="font-medium text-start text-[#FF7D30] col-span-2 text-[12px]">
        {data?.violated}
      </p>
      <p className="font-medium text-start text-[12px]">{data?.date}</p>
    </div>
  );
};
const WorkloadOverview = () => {
  const scans = [
    {
      name: "Scrapenext.git",
      id: 1,
      logo: github,
    },
    {
      name: "Scrapenext.git",
      id: 2,
      logo: gitlabImg,
    },
    {
      name: "Gilotec Prod -Docker",
      id: 3,
      logo: docker,
    },
  ];
  const criticalImage = [
    {
      image: "Ngnix-web-app",
      checks: "48",
      rules: "4",
      registry: "Gilotec Prod",
      id: 0,
    },
    {
      image: "Ngnix-web-app",
      checks: "48",
      rules: "4",
      registry: "Gilotec Prod",
      id: 1,
    },
    {
      image: "Ngnix-web-app",
      checks: "48",
      rules: "4",
      registry: "Gilotec Prod",
      id: 2,
    },
  ];

  const vioData = [
    {
      template: "main.tf",
      violated: "CIS AWS 3.1 Ensure S3 encryption",
      date: "23/03/2024",
      id: 0,
    },
    {
      template: "main.tf",
      violated: "CIS AWS 3.1 Ensure S3 encryption",
      date: "23/03/2024",
      id: 1,
    },
    {
      template: "main.tf",
      violated: "CIS AWS 3.1 Ensure S3 encryption",
      date: "23/03/2024",
      id: 2,
    },
  ];

  const doughnutData = [
    { type: "Images", count: 15349 },
    { type: "IAC Template", count: 1656 },
  ];
  const total = doughnutData.reduce((sum, d) => sum + d["count"], 0);
  const [donutOption, setDonutOption] = useState<any>({
    data: doughnutData,
    series: [
      {
        type: "donut",
        calloutLabelKey: "type",
        angleKey: "count",
        sectorLabelKey: "count",
        calloutLabel: {
          enabled: false,
        },
        sectorLabel: {
          formatter: ({ datum, sectorLabelKey }: any) => {
            const value = datum[sectorLabelKey];
            return numFormatter.format(value);
          },
        },
        fills: ["#FF161A", "#FF5678"],
        innerRadiusRatio: 0.5,
        innerLabels: [
          {
            text: numFormatter.format(total),
            fontSize: 24,
          },
          {
            text: "Total",
            fontSize: 16,
            spacing: 10,
          },
        ],
      },
    ],
  });

  const [lineData, setLineData] = useState<any>({
    data: getData(),
    theme: {
      overrides: {
        line: {
          series: {
            interpolation: {
              type: "smooth",
            },
            marker: {
              enabled: false,
            },
            tooltip: {
              renderer: ({ title, datum, xKey, yKey }: any) => ({
                title,
                content:`${datum[xKey]} - ${datum[yKey]}`,
              }),
            },
          },
        },
      },
    },
    // showInLegend: false,
    series: [
      {
        type: "line",
        xKey: "age",
        xName: "Month",
        yKey: "timeSpentAlone",
        yName: "Resolved",
        stroke: "#2AB849",
      },
      {
        type: "line",
        xKey: "age",
        xName: "Month",
        yKey: "timeSpentWithFriends",
        yName: "Unresolved",
        stroke: "#FF7D30",
      },
    ],
    // axes: [
    //   {
    //     position: "bottom",
    //     type: "number",
    //     title: {
    //       text: "Age",
    //     },
    //     nice: false,
    //     min: 15,
    //     max: 85,
    //   },
    //   {
    //     position: "left",
    //     type: "number",
    //     title: {
    //       text: "Time",
    //     },
    //     max: 540,
    //     nice: false,
    //     interval: { values: [0, 180, 360, 540] },
    //     label: {
    //       formatter: ({ value }: any) => `${Math.floor(value / 60)}h`,
    //     },
    //     crosshair: {
    //       label: {
    //         renderer: ({ value }: any) =>
    //           `<div style="padding: 0 7px; border-radius: 2px; line-height: 1.7em; background-color: rgb(71,71,71); color: rgb(255, 255, 255);">${formatNumber(
    //             value
    //           )}</div>`,
    //       },
    //     },
    //   },
    // ],
  });

  const { mode } = useRecoilValue(modeAtomsAtom);
  return (
    <div className="px-8 mt-[32px] w-full">
      <div className="flex mb-[32px] items-center justify-between flex-col md:flex-row gap-[16px]">
        <div className="flex items-center flex-row gap-[16px]">
          <h2 className="font-medium text-[14px]">Overview</h2>
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
          <button
            // onClick={() => setShowPopOver(!showPopOver)}
            className="flex border-start pl-[16px] py-[4px] text-[10px] md:text-[12px] font-medium items-center gap-3"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_3155_8307)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.00012 2.0625C5.40312 2.0625 2.44491 4.80043 2.0969 8.30558C2.06621 8.61472 1.79072 8.84044 1.48158 8.80975C1.17244 8.77906 0.94671 8.50357 0.977403 8.19443C1.38198 4.11958 4.81909 0.9375 9.00012 0.9375C12.3071 0.9375 15.1479 2.92845 16.3915 5.77479C16.5159 6.05947 16.3859 6.39107 16.1013 6.51545C15.8166 6.63983 15.485 6.50988 15.3606 6.22521C14.2896 3.77384 11.8441 2.0625 9.00012 2.0625Z"
                  fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.5 1.6875C16.8107 1.6875 17.0625 1.93934 17.0625 2.25V5.55C17.0625 6.10919 16.6092 6.5625 16.05 6.5625H12.75C12.4393 6.5625 12.1875 6.31066 12.1875 6C12.1875 5.68934 12.4393 5.4375 12.75 5.4375H15.9375V2.25C15.9375 1.93934 16.1893 1.6875 16.5 1.6875Z"
                  fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.03699 15.9375C12.634 15.9375 15.5922 13.1996 15.9402 9.69442C15.9709 9.38528 16.2464 9.15956 16.5555 9.19025C16.8647 9.22094 17.0904 9.49643 17.0597 9.80557C16.6551 13.8804 13.218 17.0625 9.03699 17.0625C5.72998 17.0625 2.88923 15.0716 1.64561 12.2252C1.52123 11.9405 1.65117 11.6089 1.93585 11.4846C2.22052 11.3602 2.55212 11.4901 2.6765 11.7748C3.74755 14.2262 6.19305 15.9375 9.03699 15.9375Z"
                  fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.53711 16.3125C1.22645 16.3125 0.974609 16.0607 0.974609 15.75V12.45C0.974609 11.8908 1.42792 11.4375 1.98711 11.4375H5.28711C5.59777 11.4375 5.84961 11.6893 5.84961 12C5.84961 12.3107 5.59777 12.5625 5.28711 12.5625H2.09961V15.75C2.09961 16.0607 1.84777 16.3125 1.53711 16.3125Z"
                  fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                />
              </g>
              <defs>
                <clipPath id="clip0_3155_8307">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
          <button
            // onClick={() => setShowPopOver(!showPopOver)}
            className="flex border-start py-[4px] text-[10px] md:text-[12px] font-medium items-center"
          >
            <svg
              width="42"
              height="19"
              viewBox="0 0 42 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className=""
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
        <button
          //   onClick={() => setShowAdd(true)}
          className="rounded-full px-[24px] py-[8px] flex font-medium text-white items-center justify-center gap-2 bg-primary text-White"
        >
          <p>Security Scan</p>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.5 6.75L9 11.25L13.5 6.75"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.10225 6.35225C4.32192 6.13258 4.67808 6.13258 4.89775 6.35225L9 10.4545L13.1023 6.35225C13.3219 6.13258 13.6781 6.13258 13.8977 6.35225C14.1174 6.57192 14.1174 6.92808 13.8977 7.14775L9.39775 11.6477C9.17808 11.8674 8.82192 11.8674 8.60225 11.6477L4.10225 7.14775C3.88258 6.92808 3.88258 6.57192 4.10225 6.35225Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-[32px] mb-[24px]">
        <div className="md:col-span-3">
          <div className="flex items-center gap-[31px] mb-[32px]">
            <div
              className={`rounded-[12px] px-[24px] py-[16px] relative flex items-start justify-between flex-col gap-[12px] border-2 shadow-md h-[110px] w-full ${
                mode === "dark" ? "bg-lightDark" : "bg-white"
              }`}
            >
              <div className="w-full rounded-full  flex items-start justify-between">
                <h3
                  className={`font-medium text-[14px] ${
                    mode === "dark" ? "text-[#EAEAEA]" : "text-[#909BBC]"
                  }`}
                >
                  Registry
                </h3>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.9591 24.6249C18.3496 24.2344 18.9827 24.2344 19.3733 24.6249L22.6662 27.9178L28.6257 21.9583C29.0163 21.5677 29.6494 21.5677 30.0399 21.9583C30.4305 22.3488 30.4305 22.9819 30.0399 23.3725L23.3733 30.0391C22.9827 30.4297 22.3496 30.4297 21.9591 30.0391L17.9591 26.0391C17.5685 25.6486 17.5685 25.0154 17.9591 24.6249Z"
                    fill="#284CB3"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.33398 7C5.88627 7 6.33398 7.44772 6.33398 8V15.9749C6.33473 15.9816 6.33612 15.9926 6.33861 16.0075C6.34669 16.056 6.36617 16.1452 6.41182 16.2626C6.50093 16.4917 6.69906 16.853 7.15144 17.2407C8.06332 18.0224 10.1203 19 14.6673 19C19.2143 19 21.2713 18.0224 22.1832 17.2407C22.6356 16.853 22.8337 16.4917 22.9228 16.2626C22.9685 16.1452 22.9879 16.056 22.996 16.0075C22.9985 15.9926 22.9999 15.9816 23.0007 15.9749V8C23.0007 7.44772 23.4484 7 24.0007 7C24.5529 7 25.0007 7.44772 25.0007 8V16H24.0007C25.0007 16 25.0006 16.0012 25.0006 16.0023L25.0006 16.0048L25.0006 16.0099L25.0004 16.0214L24.9997 16.0491C24.9989 16.0696 24.9976 16.0941 24.9954 16.1225C24.991 16.1791 24.983 16.2511 24.9688 16.3363C24.9404 16.5066 24.887 16.7298 24.7868 16.9874C24.5843 17.5083 24.1991 18.147 23.4848 18.7593C22.0633 19.9776 19.4536 21 14.6673 21C9.881 21 7.27131 19.9776 5.84986 18.7593C5.13557 18.147 4.75038 17.5083 4.54781 16.9874C4.44764 16.7298 4.3942 16.5066 4.36582 16.3363C4.35163 16.2511 4.34368 16.1791 4.33927 16.1225C4.33707 16.0941 4.33575 16.0696 4.33498 16.0491L4.33419 16.0214L4.33403 16.0099L4.334 16.0048L4.33399 16.0023C4.33399 16.0012 4.33398 16 5.33398 16H4.33398V8C4.33398 7.44772 4.7817 7 5.33398 7Z"
                    fill="#284CB3"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.84986 5.24074C7.27131 4.02235 9.88099 3 14.6673 3C19.4536 3 22.0633 4.02235 23.4848 5.24074C24.1991 5.85299 24.5843 6.49168 24.7868 7.01255C24.887 7.27015 24.9404 7.49345 24.9688 7.66373C24.983 7.74885 24.991 7.82087 24.9954 7.87753C24.9976 7.90588 24.9989 7.93043 24.9997 7.95092L25.0004 7.97859L25.0006 7.99009L25.0006 7.99524L25.0006 7.99767C25.0006 7.99884 25.0006 8 24.0006 8C25.0006 8 25.0006 8.00116 25.0006 8.00233L25.0006 8.00476L25.0006 8.00991L25.0004 8.02141L24.9997 8.04908C24.9989 8.06957 24.9976 8.09412 24.9954 8.12247C24.991 8.17913 24.983 8.25115 24.9688 8.33627C24.9404 8.50655 24.887 8.72985 24.7868 8.98745C24.5843 9.50832 24.1991 10.147 23.4848 10.7593C22.0633 11.9776 19.4536 13 14.6673 13C9.88099 13 7.27131 11.9776 5.84986 10.7593C5.13557 10.147 4.75037 9.50832 4.54781 8.98745C4.44763 8.72985 4.3942 8.50655 4.36582 8.33627C4.35163 8.25115 4.34368 8.17913 4.33927 8.12247C4.33707 8.09412 4.33574 8.06957 4.33497 8.04908L4.33419 8.02141L4.33403 8.00991L4.33399 8.00476L4.33398 8.00233C4.33398 8.00116 4.33398 8 5.33398 8C4.33398 8 4.33398 7.99884 4.33398 7.99767L4.33399 7.99524L4.33403 7.99009L4.33419 7.97859L4.33497 7.95092C4.33574 7.93043 4.33707 7.90588 4.33927 7.87753C4.34368 7.82087 4.35163 7.74885 4.36582 7.66373C4.3942 7.49345 4.44763 7.27015 4.54781 7.01255C4.75037 6.49168 5.13557 5.85299 5.84986 5.24074ZM6.3374 8C6.33777 8.00237 6.33817 8.00486 6.3386 8.00748C6.34668 8.05595 6.36616 8.14515 6.41182 8.26255C6.50092 8.49168 6.69906 8.85299 7.15144 9.24074C8.06332 10.0224 10.1203 11 14.6673 11C19.2143 11 21.2713 10.0224 22.1832 9.24074C22.6356 8.85299 22.8337 8.49168 22.9228 8.26255C22.9685 8.14515 22.9879 8.05595 22.996 8.00748C22.9965 8.00486 22.9969 8.00237 22.9972 8C22.9969 7.99763 22.9965 7.99514 22.996 7.99252C22.9879 7.94405 22.9685 7.85485 22.9228 7.73745C22.8337 7.50832 22.6356 7.14701 22.1832 6.75926C21.2713 5.97764 19.2143 5 14.6673 5C10.1203 5 8.06332 5.97764 7.15144 6.75926C6.69906 7.14701 6.50092 7.50832 6.41182 7.73745C6.36616 7.85485 6.34668 7.94405 6.3386 7.99252C6.33817 7.99514 6.33777 7.99763 6.3374 8Z"
                    fill="#284CB3"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.33398 15C5.88627 15 6.33398 15.4477 6.33398 16V23.9749C6.33473 23.9816 6.33612 23.9926 6.33861 24.0075C6.34669 24.056 6.36617 24.1452 6.41182 24.2626C6.50093 24.4917 6.69906 24.853 7.15144 25.2407C8.06332 26.0224 10.1203 27 14.6673 27C15.2196 27 15.6673 27.4477 15.6673 28C15.6673 28.5523 15.2196 29 14.6673 29C9.881 29 7.27131 27.9776 5.84986 26.7593C5.13557 26.147 4.75038 25.5083 4.54781 24.9874C4.44764 24.7298 4.3942 24.5066 4.36582 24.3363C4.35163 24.2511 4.34368 24.1791 4.33927 24.1225C4.33707 24.0941 4.33575 24.0696 4.33498 24.0491L4.33419 24.0214L4.33403 24.0099L4.334 24.0048L4.33399 24.0023C4.33399 24.0012 4.33398 24 5.33398 24H4.33398V16C4.33398 15.4477 4.7817 15 5.33398 15Z"
                    fill="#284CB3"
                  />
                </svg>
              </div>
              <div className="flex items-center gap-[8px]">
                <h1 className="font-bold text-start text-[18px]">6</h1>
              </div>
              <div className="rounded-full p-[12px] flex items-center justify-center bg-[#F7F7F8] absolute -right-4 -bottom-5">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 5.25C12.4142 5.25 12.75 5.58579 12.75 6V11.25H18C18.4142 11.25 18.75 11.5858 18.75 12C18.75 12.4142 18.4142 12.75 18 12.75H12.75V18C12.75 18.4142 12.4142 18.75 12 18.75C11.5858 18.75 11.25 18.4142 11.25 18V12.75H6C5.58579 12.75 5.25 12.4142 5.25 12C5.25 11.5858 5.58579 11.25 6 11.25H11.25V6C11.25 5.58579 11.5858 5.25 12 5.25Z"
                    fill="#284CB3"
                  />
                </svg>
              </div>
            </div>
            <div
              className={`rounded-[12px] px-[24px] py-[16px] relative flex items-start justify-between flex-col gap-[12px] border-2 shadow-md h-[110px] w-full ${
                mode === "dark" ? "bg-lightDark" : "bg-white"
              }`}
            >
              <div className="w-full rounded-full  flex items-start justify-between">
                <h3
                  className={`font-medium text-[14px] ${
                    mode === "dark" ? "text-[#EAEAEA]" : "text-[#909BBC]"
                  }`}
                >
                  Repository
                </h3>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.9591 24.6249C18.3496 24.2344 18.9827 24.2344 19.3733 24.6249L22.6662 27.9178L28.6257 21.9583C29.0163 21.5677 29.6494 21.5677 30.0399 21.9583C30.4305 22.3488 30.4305 22.9819 30.0399 23.3725L23.3733 30.0391C22.9827 30.4297 22.3496 30.4297 21.9591 30.0391L17.9591 26.0391C17.5685 25.6486 17.5685 25.0154 17.9591 24.6249Z"
                    fill="#284CB3"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.33398 7C5.88627 7 6.33398 7.44772 6.33398 8V15.9749C6.33473 15.9816 6.33612 15.9926 6.33861 16.0075C6.34669 16.056 6.36617 16.1452 6.41182 16.2626C6.50093 16.4917 6.69906 16.853 7.15144 17.2407C8.06332 18.0224 10.1203 19 14.6673 19C19.2143 19 21.2713 18.0224 22.1832 17.2407C22.6356 16.853 22.8337 16.4917 22.9228 16.2626C22.9685 16.1452 22.9879 16.056 22.996 16.0075C22.9985 15.9926 22.9999 15.9816 23.0007 15.9749V8C23.0007 7.44772 23.4484 7 24.0007 7C24.5529 7 25.0007 7.44772 25.0007 8V16H24.0007C25.0007 16 25.0006 16.0012 25.0006 16.0023L25.0006 16.0048L25.0006 16.0099L25.0004 16.0214L24.9997 16.0491C24.9989 16.0696 24.9976 16.0941 24.9954 16.1225C24.991 16.1791 24.983 16.2511 24.9688 16.3363C24.9404 16.5066 24.887 16.7298 24.7868 16.9874C24.5843 17.5083 24.1991 18.147 23.4848 18.7593C22.0633 19.9776 19.4536 21 14.6673 21C9.881 21 7.27131 19.9776 5.84986 18.7593C5.13557 18.147 4.75038 17.5083 4.54781 16.9874C4.44764 16.7298 4.3942 16.5066 4.36582 16.3363C4.35163 16.2511 4.34368 16.1791 4.33927 16.1225C4.33707 16.0941 4.33575 16.0696 4.33498 16.0491L4.33419 16.0214L4.33403 16.0099L4.334 16.0048L4.33399 16.0023C4.33399 16.0012 4.33398 16 5.33398 16H4.33398V8C4.33398 7.44772 4.7817 7 5.33398 7Z"
                    fill="#284CB3"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.84986 5.24074C7.27131 4.02235 9.88099 3 14.6673 3C19.4536 3 22.0633 4.02235 23.4848 5.24074C24.1991 5.85299 24.5843 6.49168 24.7868 7.01255C24.887 7.27015 24.9404 7.49345 24.9688 7.66373C24.983 7.74885 24.991 7.82087 24.9954 7.87753C24.9976 7.90588 24.9989 7.93043 24.9997 7.95092L25.0004 7.97859L25.0006 7.99009L25.0006 7.99524L25.0006 7.99767C25.0006 7.99884 25.0006 8 24.0006 8C25.0006 8 25.0006 8.00116 25.0006 8.00233L25.0006 8.00476L25.0006 8.00991L25.0004 8.02141L24.9997 8.04908C24.9989 8.06957 24.9976 8.09412 24.9954 8.12247C24.991 8.17913 24.983 8.25115 24.9688 8.33627C24.9404 8.50655 24.887 8.72985 24.7868 8.98745C24.5843 9.50832 24.1991 10.147 23.4848 10.7593C22.0633 11.9776 19.4536 13 14.6673 13C9.88099 13 7.27131 11.9776 5.84986 10.7593C5.13557 10.147 4.75037 9.50832 4.54781 8.98745C4.44763 8.72985 4.3942 8.50655 4.36582 8.33627C4.35163 8.25115 4.34368 8.17913 4.33927 8.12247C4.33707 8.09412 4.33574 8.06957 4.33497 8.04908L4.33419 8.02141L4.33403 8.00991L4.33399 8.00476L4.33398 8.00233C4.33398 8.00116 4.33398 8 5.33398 8C4.33398 8 4.33398 7.99884 4.33398 7.99767L4.33399 7.99524L4.33403 7.99009L4.33419 7.97859L4.33497 7.95092C4.33574 7.93043 4.33707 7.90588 4.33927 7.87753C4.34368 7.82087 4.35163 7.74885 4.36582 7.66373C4.3942 7.49345 4.44763 7.27015 4.54781 7.01255C4.75037 6.49168 5.13557 5.85299 5.84986 5.24074ZM6.3374 8C6.33777 8.00237 6.33817 8.00486 6.3386 8.00748C6.34668 8.05595 6.36616 8.14515 6.41182 8.26255C6.50092 8.49168 6.69906 8.85299 7.15144 9.24074C8.06332 10.0224 10.1203 11 14.6673 11C19.2143 11 21.2713 10.0224 22.1832 9.24074C22.6356 8.85299 22.8337 8.49168 22.9228 8.26255C22.9685 8.14515 22.9879 8.05595 22.996 8.00748C22.9965 8.00486 22.9969 8.00237 22.9972 8C22.9969 7.99763 22.9965 7.99514 22.996 7.99252C22.9879 7.94405 22.9685 7.85485 22.9228 7.73745C22.8337 7.50832 22.6356 7.14701 22.1832 6.75926C21.2713 5.97764 19.2143 5 14.6673 5C10.1203 5 8.06332 5.97764 7.15144 6.75926C6.69906 7.14701 6.50092 7.50832 6.41182 7.73745C6.36616 7.85485 6.34668 7.94405 6.3386 7.99252C6.33817 7.99514 6.33777 7.99763 6.3374 8Z"
                    fill="#284CB3"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.33398 15C5.88627 15 6.33398 15.4477 6.33398 16V23.9749C6.33473 23.9816 6.33612 23.9926 6.33861 24.0075C6.34669 24.056 6.36617 24.1452 6.41182 24.2626C6.50093 24.4917 6.69906 24.853 7.15144 25.2407C8.06332 26.0224 10.1203 27 14.6673 27C15.2196 27 15.6673 27.4477 15.6673 28C15.6673 28.5523 15.2196 29 14.6673 29C9.881 29 7.27131 27.9776 5.84986 26.7593C5.13557 26.147 4.75038 25.5083 4.54781 24.9874C4.44764 24.7298 4.3942 24.5066 4.36582 24.3363C4.35163 24.2511 4.34368 24.1791 4.33927 24.1225C4.33707 24.0941 4.33575 24.0696 4.33498 24.0491L4.33419 24.0214L4.33403 24.0099L4.334 24.0048L4.33399 24.0023C4.33399 24.0012 4.33398 24 5.33398 24H4.33398V16C4.33398 15.4477 4.7817 15 5.33398 15Z"
                    fill="#284CB3"
                  />
                </svg>
              </div>
              <div className="flex items-center gap-[8px]">
                <h1 className="font-bold text-start text-[18px]">6</h1>
              </div>
              <div className="rounded-full p-[12px] flex items-center justify-center bg-[#F7F7F8] absolute -right-4 -bottom-5">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 5.25C12.4142 5.25 12.75 5.58579 12.75 6V11.25H18C18.4142 11.25 18.75 11.5858 18.75 12C18.75 12.4142 18.4142 12.75 18 12.75H12.75V18C12.75 18.4142 12.4142 18.75 12 18.75C11.5858 18.75 11.25 18.4142 11.25 18V12.75H6C5.58579 12.75 5.25 12.4142 5.25 12C5.25 11.5858 5.58579 11.25 6 11.25H11.25V6C11.25 5.58579 11.5858 5.25 12 5.25Z"
                    fill="#284CB3"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[12px] mb-[32px]">
            <div
              className={`border-2 rounded-[12px] grid grid-cols-2 md:grid-cols-4 px-[24px] py-[18px] gap-[24px] col-span-2 w-full ${
                mode === "dark" ? "bg-lightDark" : "bg-white"
              }`}
            >
              <div className="border-end w-full">
                <h3
                  className={`font-medium text-start text-[14px] mb-[12px] ${
                    mode === "dark" ? "text-[#EAEAEA]" : "text-[#909BBC]"
                  }`}
                >
                  Total image
                </h3>
                <h1 className="text-start font-bold text-[20px]">35</h1>
              </div>
              <div className="border-end  w-full">
                <h3
                  className={`font-medium text-start text-[14px] mb-[12px] ${
                    mode === "dark" ? "text-[#EAEAEA]" : "text-[#909BBC]"
                  }`}
                >
                  Running
                </h3>
                <h1 className="text-start font-bold text-[20px]">29</h1>
              </div>
              <div className="border-end w-full">
                <h3
                  className={`font-medium text-start text-[14px] mb-[12px] ${
                    mode === "dark" ? "text-[#EAEAEA]" : "text-[#909BBC]"
                  }`}
                >
                  Stopped
                </h3>
                <h1 className="text-start font-bold text-[20px]">45</h1>
              </div>
              <div className="flex items-center justify-center">
                <svg
                  width="31"
                  height="46"
                  viewBox="0 0 31 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    y="45.5"
                    width="45"
                    height="5"
                    rx="2.5"
                    transform="rotate(-90 0 45.5)"
                    fill="#E9EDF7"
                  />
                  <rect
                    y="45.5"
                    width="37.0385"
                    height="5"
                    rx="2.5"
                    transform="rotate(-90 0 45.5)"
                    fill="#4318FF"
                  />
                  <rect
                    x="13"
                    y="45.5"
                    width="45"
                    height="5"
                    rx="2.5"
                    transform="rotate(-90 13 45.5)"
                    fill="#E9EDF7"
                  />
                  <rect
                    x="13"
                    y="45.5"
                    width="31.1538"
                    height="5"
                    rx="2.5"
                    transform="rotate(-90 13 45.5)"
                    fill="#4318FF"
                  />
                  <rect
                    x="26"
                    y="45.5"
                    width="45"
                    height="5"
                    rx="2.5"
                    transform="rotate(-90 26 45.5)"
                    fill="#E9EDF7"
                  />
                  <rect
                    x="26"
                    y="45.5"
                    width="10.7308"
                    height="5"
                    rx="2.5"
                    transform="rotate(-90 26 45.5)"
                    fill="#4318FF"
                  />
                </svg>
              </div>
            </div>
            <div
              className={`rounded-[12px] px-[24px] py-[18px] flex items-center flex-col md:flex-row gap-[24px] border-2 ${
                mode === "dark" ? "bg-lightDark" : "bg-white"
              }`}
            >
              <div className="rounded-full w-[60px] h-[60px] p-[12px] flex items-center justify-center bg-[#F7F7F8]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.71154 11.3077C5.71141 11.3077 5.71128 11.3078 5.71116 11.3079C5.71114 11.3079 5.71112 11.3079 5.7111 11.3079C5.71093 11.3079 5.71076 11.308 5.71059 11.3081C5.43164 11.4248 5.25 11.6976 5.25 12C5.25 12.3027 5.43196 12.5757 5.71131 12.6922L5.71141 12.6923L5.71154 12.6923L5.71838 12.6952L5.75155 12.7098C5.78164 12.7232 5.82625 12.7437 5.88044 12.77C5.99048 12.8235 6.13208 12.8975 6.26916 12.9832C6.41148 13.0722 6.51944 13.1555 6.58333 13.2219L6.58334 15.0002C6.58334 16.519 7.81464 17.75 9.33334 17.75L10 17.75C10.4142 17.75 10.75 17.4142 10.75 17C10.75 16.5858 10.4142 16.25 10 16.25L9.33334 16.25C8.64291 16.25 8.08334 15.6904 8.08334 15.0002L8.08333 13.1111C8.08333 12.6785 7.83436 12.3591 7.66604 12.1837C7.60343 12.1185 7.53642 12.0572 7.4678 12C7.53642 11.9428 7.60343 11.8815 7.66604 11.8163C7.83436 11.6409 8.08334 11.3215 8.08334 10.8889L8.08334 8.99998C8.08334 8.30963 8.64297 7.75 9.33334 7.75L10 7.75C10.4142 7.75 10.75 7.41421 10.75 7C10.75 6.58579 10.4142 6.25 10 6.25L9.33334 6.25C7.81457 6.25 6.58334 7.48119 6.58334 8.99998L6.58334 10.7781C6.51945 10.8445 6.41149 10.9278 6.26917 11.0168C6.13208 11.1025 5.99049 11.1765 5.88044 11.23C5.82625 11.2563 5.78164 11.2768 5.75155 11.2902L5.71838 11.3048L5.71154 11.3077ZM6.62008 10.7341C6.62033 10.7341 6.6189 10.7367 6.61502 10.7418C6.61789 10.7367 6.61982 10.7341 6.62008 10.7341ZM6.62007 13.2659C6.61982 13.2659 6.61788 13.2633 6.61502 13.2582C6.61889 13.2633 6.62032 13.2659 6.62007 13.2659Z"
                    fill="#284CB3"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.2885 11.3077C18.2886 11.3077 18.2887 11.3078 18.2888 11.3079C18.2889 11.3079 18.2889 11.3079 18.2889 11.3079C18.2891 11.3079 18.2892 11.308 18.2894 11.3081C18.5684 11.4248 18.75 11.6976 18.75 12C18.75 12.3027 18.568 12.5757 18.2887 12.6922L18.2886 12.6923L18.2885 12.6923L18.2816 12.6952L18.2484 12.7098C18.2184 12.7232 18.1738 12.7437 18.1196 12.77C18.0095 12.8235 17.8679 12.8975 17.7308 12.9832C17.5885 13.0722 17.4806 13.1555 17.4167 13.2219L17.4167 15.0002C17.4167 16.519 16.1854 17.75 14.6667 17.75L14 17.75C13.5858 17.75 13.25 17.4142 13.25 17C13.25 16.5858 13.5858 16.25 14 16.25L14.6667 16.25C15.3571 16.25 15.9167 15.6904 15.9167 15.0002L15.9167 13.1111C15.9167 12.6785 16.1656 12.3591 16.334 12.1837C16.3966 12.1185 16.4636 12.0572 16.5322 12C16.4636 11.9428 16.3966 11.8815 16.334 11.8163C16.1656 11.6409 15.9167 11.3215 15.9167 10.8889L15.9167 8.99998C15.9167 8.30963 15.357 7.75 14.6667 7.75L14 7.75C13.5858 7.75 13.25 7.41421 13.25 7C13.25 6.58579 13.5858 6.25 14 6.25L14.6667 6.25C16.1854 6.25 17.4167 7.48119 17.4167 8.99998L17.4167 10.7781C17.4806 10.8445 17.5885 10.9278 17.7308 11.0168C17.8679 11.1025 18.0095 11.1765 18.1196 11.23C18.1737 11.2563 18.2184 11.2768 18.2484 11.2902L18.2816 11.3048L18.2885 11.3077ZM17.3799 10.7341C17.3797 10.7341 17.3811 10.7367 17.385 10.7418C17.3821 10.7367 17.3802 10.7341 17.3799 10.7341ZM17.3799 13.2659C17.3802 13.2659 17.3821 13.2633 17.385 13.2582C17.3811 13.2633 17.3797 13.2659 17.3799 13.2659Z"
                    fill="#284CB3"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.25 20.25V3.75H3.75V20.25H20.25ZM21.75 20.4C21.75 21.1456 21.1456 21.75 20.4 21.75H3.6C2.85441 21.75 2.25 21.1456 2.25 20.4V3.6C2.25 2.85441 2.85442 2.25 3.6 2.25H20.4C21.1456 2.25 21.75 2.85442 21.75 3.6V20.4Z"
                    fill="#284CB3"
                  />
                </svg>
              </div>
              <div className="">
                <p
                  className={`font-medium text-start text-[14px] mb-[10px] ${
                    mode === "dark" ? "text-[#EAEAEA]" : "text-[#909BBC]"
                  }`}
                >
                  IAC Templates{" "}
                </p>
                <h1 className="font-bold text-start text-[20px]">12</h1>
              </div>
            </div>
          </div>
          <div
            className={`border-2 rounded-[12px] p-[20px] w-full flex items-start justify-between flex-col gap-[12px] ${
              mode === "dark" ? "bg-lightDark" : "bg-white"
            }`}
          >
            <div className="flex items-center w-full flex-col md:flex-row mb-[24px] justify-between">
              <h1 className="font-semibold text-[14px] text-start">
                Vulnerabilities Over Time
              </h1>
              <div className="flex items-center gap-[16px]">
                <div className="flex items-center gap-[20px]">
                  <div className="flex items-center gap-[8px]">
                    <span className="rounded-full bg-[#2AB849] h-2 w-2"></span>
                    <h3
                      className={`font-medium text-[12px] ${
                        mode === "dark" ? "text-[#EAEAEA]" : "text-[#909BBC]"
                      }`}
                    >
                      Resolved
                    </h3>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <span className="rounded-full bg-[#FF7D30] h-2 w-2"></span>
                    <h3
                      className={`font-medium text-[12px] ${
                        mode === "dark" ? "text-[#EAEAEA]" : "text-[#909BBC]"
                      }`}
                    >
                      Unresolved
                    </h3>
                  </div>
                </div>
                <div className="px-[20px] border-start border-end">
                  <select name="" id="" className="w-full font-semibold">
                    <option className="font-medium" value="Monthly">
                      Monthly
                    </option>
                    <option className="font-medium" value="Daily">
                      Daily
                    </option>
                    <option className="font-medium" value="Yearly">
                      Yearly
                    </option>
                  </select>
                </div>
                <button className="flex items-center justify-center">
                  <FaEllipsisV />
                </button>
              </div>
            </div>
            <div className="flex items-center w-full justify-center">
              <AgCharts options={lineData} className="w-full" />
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          <div
            className={`rounded-[12px] px-[24px] py-[18px] border-2 flex items-center justify-between flex-col gap-[24px] mb-[24px] w-full ${
              mode === "dark" ? "bg-lightDark" : "bg-white"
            }`}
          >
            <div className="w-full">
              <h1 className="font-semibold text-start mb-[4px] text-[12px]">
                Non Compliant Resources
              </h1>
              <p
                className={`font-medium text-[14px] ${
                  mode === "dark" ? "text-[#EAEAEA]" : "text-[#909BBC]"
                }`}
              >
                IACs and Images
              </p>
            </div>
            <div className="flex items-center justify-center">
              <AgCharts options={donutOption} />
            </div>
          </div>
          <div
            className={`rounded-[12px] border-2 w-full ${
              mode === "dark" ? "bg-lightDark" : "bg-white"
            }`}
          >
            <div className="p-[16px] flex items-center justify-between border-bottom">
              <h1 className="font-semibold text-start text-[14px]">
                Active scans (5)
              </h1>
              <button className="flex items-center justify-center pl-[16px] py-[8px] border-start">
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
                    d="M6.5625 3.5C6.5625 3.18934 6.31066 2.9375 6 2.9375H3C2.68934 2.9375 2.4375 3.18934 2.4375 3.5V6.5C2.4375 6.81066 2.68934 7.0625 3 7.0625C3.31066 7.0625 3.5625 6.81066 3.5625 6.5V4.858L6.35225 7.64775C6.57192 7.86742 6.92808 7.86742 7.14775 7.64775C7.36742 7.42808 7.36742 7.07192 7.14775 6.85225L4.358 4.0625H6C6.31066 4.0625 6.5625 3.81066 6.5625 3.5Z"
                    fill="#373737"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.4375 3.5C11.4375 3.18934 11.6893 2.9375 12 2.9375H15C15.3107 2.9375 15.5625 3.18934 15.5625 3.5V6.5C15.5625 6.81066 15.3107 7.0625 15 7.0625C14.6893 7.0625 14.4375 6.81066 14.4375 6.5V4.858L11.6477 7.64775C11.4281 7.86742 11.0719 7.86742 10.8523 7.64775C10.6326 7.42808 10.6326 7.07192 10.8523 6.85225L13.642 4.0625H12C11.6893 4.0625 11.4375 3.81066 11.4375 3.5Z"
                    fill="#373737"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.5625 15.5C6.5625 15.8107 6.31066 16.0625 6 16.0625H3C2.68934 16.0625 2.4375 15.8107 2.4375 15.5V12.5C2.4375 12.1893 2.68934 11.9375 3 11.9375C3.31066 11.9375 3.5625 12.1893 3.5625 12.5V14.142L6.35225 11.3523C6.57192 11.1326 6.92808 11.1326 7.14775 11.3523C7.36742 11.5719 7.36742 11.9281 7.14775 12.1477L4.358 14.9375H6C6.31066 14.9375 6.5625 15.1893 6.5625 15.5Z"
                    fill="#373737"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.4375 15.5C11.4375 15.8107 11.6893 16.0625 12 16.0625H15C15.3107 16.0625 15.5625 15.8107 15.5625 15.5V12.5C15.5625 12.1893 15.3107 11.9375 15 11.9375C14.6893 11.9375 14.4375 12.1893 14.4375 12.5V14.142L11.6477 11.3523C11.4281 11.1326 11.0719 11.1326 10.8523 11.3523C10.6326 11.5719 10.6326 11.9281 10.8523 12.1477L13.642 14.9375H12C11.6893 14.9375 11.4375 15.1893 11.4375 15.5Z"
                    fill="#373737"
                  />
                </svg>
              </button>
            </div>
            {scans.map((scan, idx) => (
              <Card
                data={scan}
                key={scan?.id}
                isLast={idx === scans.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center flex-col md:flex-row gap-[32px]">
        <div
          className={`rounded-[12px] border-2 w-full ${
            mode === "dark" ? "bg-lightDark" : "bg-white"
          }`}
        >
          <div className="px-[24px] py-[18px] border-bottom">
            <h1 className="font-semibold mb-[8px] text-start text-[18px]">
              Top Critical Images
            </h1>
            <p
              className={`font-medium text-[12px] ${
                mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
              }`}
            >
              Containers with high failed checks
            </p>
          </div>
          <div className="grid grid-cols-4 w-full place-content-center border-bottom py-[16px] px-[24px]">
            <p className="font-medium text-start text-[10px]">Images</p>
            <p className="font-medium text-start text-[10px]">Failed chekcs</p>
            <p className="font-medium text-start text-[10px]">Failed Rules</p>
            <p className="font-medium text-start text-[10px]">Registry</p>
          </div>
          {criticalImage.map((scan, idx) => (
            <ImageCard
              data={scan}
              key={scan?.id}
              isLast={idx === scans.length - 1}
            />
          ))}
        </div>
        <div
          className={`rounded-[12px] border-2 w-full ${
            mode === "dark" ? "bg-lightDark" : "bg-white"
          }`}
        >
          <div className="px-[24px] py-[18px] border-bottom">
            <h1 className="font-semibold mb-[8px] text-start text-[18px]">
              IaC Violations Table
            </h1>
            <p
              className={`font-medium text-[12px] ${
                mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
              }`}
            >
              Latest Failed rule checks and violations
            </p>
          </div>
          <div className="grid grid-cols-4 w-full place-content-center border-bottom py-[16px] px-[24px]">
            <p className="font-medium text-start text-[10px]">Template</p>
            <p className="font-medium text-start text-[10px] col-span-2">
              Policy voilated
            </p>
            <p className="font-medium text-start text-[10px]">Last Detected</p>
          </div>
          {vioData.map((scan, idx) => (
            <VioCard
              data={scan}
              key={scan?.id}
              isLast={idx === scans.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkloadOverview;
