import React, { useEffect, useState, useRef } from "react";
import modeAtomsAtom from "../../../atoms/modeAtoms.atom";
import {
  useGetAllScanHistory,
  useGetScanStat,
  useGetPolicies,
} from "../../../api/api-services/policyQuery";
import { useRecoilValue } from "recoil";
import { FaGlobe } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  PolicyPolicyRunScanHistoryList200Response,
  PolicyPolicyRunScanStatsList200Response,
} from "../../../api/axios-client";
import DefaultContent from "../../../components/defaultContent/defaultContent";
import { ColumnTypes } from "../../../components/models";
import FilterModal from "../../../components/FilterModal";
import { TableColumn } from "../../../components/tableComponents/models";

const ScanCard = ({
  policy,
  cloud,
  Date,
  Vulnerability,
  Compliance,
  mode,
  id,
}: any) => {
  return (
    <div
      className={`grid grid-cols-7 p-4 h-[52px] place-content-center border-bottom mb-3 w-full ${
        mode === "dark" ? "bg-lightDark" : "bg-white"
      }`}
    >
      <p className="font-semibold text-[12px] col-span-2">{policy}</p>
      <p
        className={`font-medium flex text-[12px] items-center justify-center ${
          mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
        }`}
      >
        {cloud}
      </p>
      <p
        className={`font-medium flex text-[12px] items-center justify-center ${
          mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
        }`}
      >
        {Date}
      </p>
      <p className="font-semibold text-[#FF161A] text-[12px] flex items-center justify-center">
        {Vulnerability}
      </p>
      <div className="font-medium text-[12px] flex items-center justify-between">
        <p
          className={`${mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"}`}
        >
          {Compliance} %
        </p>
        <Link to={`/monitoring/resource-scanning/${id}`}>
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14.5 1.5C14.7761 1.5 15 1.72386 15 2V6C15 6.27614 14.7761 6.5 14.5 6.5C14.2239 6.5 14 6.27614 14 6V3.20711L8.85355 8.35355C8.65829 8.54882 8.34171 8.54882 8.14645 8.35355C7.95118 8.15829 7.95118 7.84171 8.14645 7.64645L13.2929 2.5H10.5C10.2239 2.5 10 2.27614 10 2C10 1.72386 10.2239 1.5 10.5 1.5L14.5 1.5Z"
              fill={mode === "dark" ? "#EAEAEA" : "black"}
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.83333 2.5C3.3731 2.5 3 2.8731 3 3.33333V12.6667C3 13.1269 3.3731 13.5 3.83333 13.5H13.1667C13.6269 13.5 14 13.1269 14 12.6667V8.66667C14 8.39052 14.2239 8.16667 14.5 8.16667C14.7761 8.16667 15 8.39052 15 8.66667V12.6667C15 13.6792 14.1792 14.5 13.1667 14.5H3.83333C2.82081 14.5 2 13.6792 2 12.6667V3.33333C2 2.32081 2.82081 1.5 3.83333 1.5H7.83333C8.10948 1.5 8.33333 1.72386 8.33333 2C8.33333 2.27614 8.10948 2.5 7.83333 2.5H3.83333Z"
              fill={mode === "dark" ? "#EAEAEA" : "black"}
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};
const ReOccurringCard = ({ title, next, region, mode }: any) => {
  return (
    <div
      className={`grid grid-cols-2 p-4 rounded-md mb-3 shadow-sm w-full ${
        mode === "dark" ? "bg-lightDark" : "bg-white"
      }`}
    >
      <p className="font-semibold text-[14px]">{title}</p>
      <div className="font-medium flex items-center justify-between w-full">
        <p className="flex items-center gap-2">
          <FaGlobe color={mode === "dark" ? "#EAEAEA" : "#000000"} size={14} />
          <span className="text-[12px] font-semibold">{region}</span>
        </p>
        <p
          className={`${mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"}`}
        >
          {next}
        </p>
        <div className="flex items-center gap-4">
          <button>
            <svg
              width="24px"
              height="24px"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color={mode === "dark" ? "#EAEAEA" : "#000000"}
            >
              <path
                d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                stroke={mode === "dark" ? "#EAEAEA" : "#000000"}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M19.6224 10.3954L18.5247 7.7448L20 6L18 4L16.2647 5.48295L13.5578 4.36974L12.9353 2H10.981L10.3491 4.40113L7.70441 5.51596L6 4L4 6L5.45337 7.78885L4.3725 10.4463L2 11V13L4.40111 13.6555L5.51575 16.2997L4 18L6 20L7.79116 18.5403L10.397 19.6123L11 22H13L13.6045 19.6132L16.2551 18.5155C16.6969 18.8313 18 20 18 20L20 18L18.5159 16.2494L19.6139 13.598L21.9999 12.9772L22 11L19.6224 10.3954Z"
                stroke={mode === "dark" ? "#EAEAEA" : "#000000"}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </button>
          <button>
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color={mode === "dark" ? "#EAEAEA" : "#000000"}
            >
              <path
                d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9"
                stroke={mode === "dark" ? "#EAEAEA" : "#000000"}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M21 6L15.375 6M3 6L8.625 6M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6L15.375 6"
                stroke={mode === "dark" ? "#EAEAEA" : "#000000"}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const ScanHistory = () => {
  const { mode } = useRecoilValue(modeAtomsAtom);
  const [showPopOver, setShowPopOver] = useState(false);
  const [allScanHistory, setAllScanHistory] = useState<any[]>([]);
  const [isNext, setIsNext] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [stats, setStats] = useState<any>(null);
  const [tab, setTab] = useState("scan history");
  const filter = useRef<any>({
    page: 1,
    pageSize: 10,
    policy: undefined,
    cloudProvider: undefined,
    date: undefined,
    scanType: "Cloud",
  });

  const [filterFields, setFilterFields] = useState<TableColumn[]>([
    {
      name: "cloudProvider",
      title: "Cloud Provider",
      type: ColumnTypes.List,
      listValue: [
        { id: "AWS", name: "aws" },
        { id: "AZURE", name: "azure" },
        { id: "GCP", name: "gcp" },
      ],
      listIdField: "id",
      listTextField: "name",
    },
    {
      name: "policy",
      title: "Policy",
      type: ColumnTypes.List,
      listValue: [],
      listIdField: "id",
      listTextField: "name",
    },
    {
      name: "date",
      title: "Date",
      type: ColumnTypes.Date,
    },
  ]);

  const {
    data: scanHistory,
    isLoading,
    refetch,
  } = useGetAllScanHistory({ ...filter.current });
  const datastsr: PolicyPolicyRunScanHistoryList200Response | any = scanHistory;

  const { data: stat } = useGetScanStat();
  const statstr: PolicyPolicyRunScanStatsList200Response | any = stat;
  const { data: policies } = useGetPolicies({ page: 1, pageSize: 1000 });
  const policiestr: PolicyPolicyRunScanStatsList200Response | any = policies;

  useEffect(() => {
    setAllScanHistory(datastsr?.data?.data?.results ?? []);
    setIsNext(datastsr?.data?.data.next ? true : false);
    setTotalCount(datastsr?.data?.data.count);
    setStats(statstr?.data?.data.cloud);
    if (policiestr?.data?.data?.results) {
      const trans: TableColumn[] = filterFields.map((fi: TableColumn) => {
        if (fi.name === "policy") {
          return {
            ...fi,
            listValue: policiestr?.data?.data?.results.map((res: any) => {
              return {
                id: res?.id,
                name: res?.name,
              };
            }),
          };
        } else {
          return fi;
        }
      });
      setFilterFields([...trans]);
    }
  }, [scanHistory, statstr, policiestr]);

  // const ocuringdata = [
  //   {
  //     title: "ISO EAC 27001 system check . ",
  //     next: "Next Scheduled scan: 12:00PM",
  //     region: "All Region",
  //   },
  //   {
  //     title: "ISO EAC 27001 system check . ",
  //     next: "Next Scheduled scan: 12:00PM",
  //     region: "All Region",
  //   },
  //   {
  //     title: "ISO EAC 27001 system check . ",
  //     next: "Next Scheduled scan: 12:00PM",
  //     region: "All Region",
  //   },
  // ];

  function refreshrecord() {
    filter.current = {
      page: 1,
      pageSize: 10,
      policy: undefined,
      cloudProvider: undefined,
      date: undefined,
      scanType: "Cloud",
    };
    refetch();
  }

  function filterUpdated(data: any) {
    filter.current = {
      page: data?.page ?? 1,
      pageSize: data?.pageSize ?? 10,
      policy: data?.policy,
      cloudProvider: data?.cloudProvider,
      date: data?.date,
      scanType: "Cloud",
    };
    refetch();
  }
  useEffect(() => {
    refetch();
  }, [page, pageSize]);

  return (
    <div className="w-full px-10 mt-[32px]">
      <div className="grid md:grid-cols-4 gap-4 gap-lg-8">
        <div
          className={`flex border border-[#EAEAEA] items-center justify-center rounded-xl p-3 p-lg-6 gap-4 ${
            mode === "dark" ? "bg-lightDark" : "bg-white"
          }`}
        >
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
              fill-opacity="0.1"
            />
            <path
              d="M27.375 27.375L28.5 28.5"
              stroke="#284CB3"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M24 25.875C24 26.9105 24.8395 27.75 25.875 27.75C26.3937 27.75 26.8631 27.5394 27.2026 27.1991C27.5409 26.8599 27.75 26.3919 27.75 25.875C27.75 24.8395 26.9105 24 25.875 24C24.8395 24 24 24.8395 24 25.875Z"
              stroke="#284CB3"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15 16.5V21C15 21 15 23.25 20.25 23.25C25.5 23.25 25.5 21 25.5 21V16.5"
              stroke="#284CB3"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M20.25 14.25C25.5 14.25 25.5 16.5 25.5 16.5C25.5 16.5 25.5 18.75 20.25 18.75C15 18.75 15 16.5 15 16.5C15 16.5 15 14.25 20.25 14.25Z"
              stroke="#284CB3"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M20.25 27.75C15 27.75 15 25.5 15 25.5V21"
              stroke="#284CB3"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <h1 className="font-semibold text-[18px]">
            {stats?.total_scans ?? 0}
            <span
              className={`pl-2 font-medium text-[12px] md:text-[14px] ${
                mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
              }`}
            >
              Total scan{" "}
            </span>
          </h1>
        </div>
        <div
          className={`flex items-center justify-center border border-[#EAEAEA] rounded-xl p-3 p-lg-6 gap-4 ${
            mode === "dark" ? "bg-lightDark" : "bg-white"
          }`}
        >
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
              fill-opacity="0.1"
            />
            <path
              d="M17.25 15L17.25 15.75"
              stroke="#284CB3"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M17.25 18.75L17.25 19.5"
              stroke="#284CB3"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M24.75 27V15M24.75 15L27 17.25M24.75 15L22.5 17.25"
              stroke="#284CB3"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M17.25 22.5V27M17.25 27L19.5 24.75M17.25 27L15 24.75"
              stroke="#284CB3"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <h1 className="font-semibold text-[18px]">
            {stats?.recurring_scans ?? 0}
            <span
              className={`pl-2 font-medium text-[12px] md:text-[14px] ${
                mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
              }`}
            >
              Reoccurring Scans{" "}
            </span>
          </h1>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.75 2.25L11.25 2.25M15.75 2.25L9 9M15.75 2.25V6.75"
              stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15.75 9.75V13.75C15.75 14.8546 14.8546 15.75 13.75 15.75H4.25C3.14543 15.75 2.25 14.8546 2.25 13.75V4.25C2.25 3.14543 3.14543 2.25 4.25 2.25H8.25"
              stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <div
          className={`md:col-span-2 w-fit flex items-center justify-center border border-[#EAEAEA] rounded-xl p-6 gap-4 ${
            mode === "dark" ? "bg-lightDark" : "bg-white"
          }`}
        >
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
              fill="#FF161A"
              fill-opacity="0.1"
            />
            <path
              d="M12.9227 21.3C12.8155 21.1144 12.8155 20.8856 12.9227 20.7L16.7013 14.1553C16.8085 13.9697 17.0066 13.8553 17.2209 13.8553H24.7781C24.9925 13.8553 25.1905 13.9696 25.2977 14.1553L29.0763 20.7C29.1835 20.8856 29.1835 21.1144 29.0763 21.3L25.2977 27.8447C25.1905 28.0303 24.9925 28.1447 24.7781 28.1447H17.2209C17.0066 28.1447 16.8085 28.0304 16.7013 27.8447L12.9227 21.3Z"
              stroke="#FF161A"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M21 18L21 21"
              stroke="#FF161A"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M21 24.0075L21.0075 23.9992"
              stroke="#FF161A"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <h1 className="font-semibold text-[18px]">
            {stats?.threats_found ?? 0}
            <span
              className={`pl-2 font-medium text-[12px] md:text-[14px] ${
                mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
              }`}
            >
              Threats found{" "}
            </span>
          </h1>
          <div className="flex items-center gap-3 border-start pl-2">
            <h1 className="font-semibold text-[18px]">
              {stats?.resolved ?? 0}
              <span
                className={`pl-2 font-medium text-[14px] ${
                  mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
                }`}
              >
                Resolved{" "}
              </span>
            </h1>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.125 9.375L4.07574 12.3257C4.31005 12.56 4.68995 12.5601 4.92426 12.3257L6.75 10.5"
                stroke="#2AB849"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M12 5.25L9 8.25"
                stroke="#2AB849"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M5.25 9L8.57574 12.3257C8.81005 12.5601 9.18995 12.5601 9.42426 12.3257L16.5 5.25"
                stroke="#2AB849"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="mt-[48px] mb-[24px] flex flex-col md:flex-row items-center w-full justify-between border-bottom">
        <div className="">
          {["scan history", "reocurring", "threat", "incident"].map((d) => (
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
          {/* <select
            name=""
            id=""
            className="bg-transparent p-2 text-[12px] font-medium"
          >
            <option value="">Group By</option>
          </select> */}
          <button
            onClick={() => setShowPopOver(!showPopOver)}
            className="flex text-[10px] md:text-[12px] font-medium items-center gap-3"
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
      {tab === "scan history" && (
        <>
          <div className="mt-10 w-full overflow-auto">
            <div
              className={`grid grid-cols-7 p-4 rounded-t-[1.5rem] mb-3 place-content-center border-bottom h-[52px] w-[180vw] md:w-full ${
                mode === "dark" ? "bg-lightDark" : "bg-white"
              }`}
            >
              <p className="font-semibold text-[12px] col-span-2">
                Policy Used
              </p>
              <button className="flex text-[12px] items-center justify-center gap-2 font-semibold">
                <span>Cloud</span>{" "}
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
              <button className="flex text-[12px] items-center justify-center gap-2 font-semibold">
                <span>Date</span>{" "}
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
              <p className="font-semibold text-[12px] text-center">
                Vulnerability
              </p>
              <p className="font-semibold text-[12px]">Compliance</p>
            </div>
            <div className="w-[180vw] md:w-full">
              {isLoading || allScanHistory.length < 1 ? (
                <DefaultContent
                  pageHeader="Scan History"
                  pageDescription="No record found"
                  loading={isLoading}
                  buttonValue="Refresh"
                  buttonClick={() => refreshrecord()}
                />
              ) : (
                allScanHistory.map((d: any) => (
                  <ScanCard
                    policy={d.policy}
                    cloud={d.cloud}
                    Region={d.Region}
                    Date={d.end_date}
                    Vulnerability={d.vulnerability}
                    Compliance={d.compliance}
                    mode={mode}
                    id={d.id}
                  />
                ))
              )}
            </div>
          </div>
          <div className="w-full mt-10">
            {allScanHistory.length > 0 && totalCount > 10 && (
              <div className="flex items-center font-medium justify-between w-full">
                <div className="flex items-center gap-2">
                  <p>page size:</p>
                  <select
                    value={String(pageSize)}
                    onChange={(e) => setPageSize(+e.target.value)}
                    className="w-24 border-2 rounded-md p-2 bg-none"
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>
                <div className="flex font-medium items-center gap-3">
                  <button
                    disabled={page === 0}
                    onClick={() => {
                      if (page <= 1) {
                        setPage(1);
                        // useGetAllScanHistory(1, 5);
                      } else {
                        // useGetAllScanHistory(page - 1, 5);
                        setPage((page) => page - 1);
                      }
                    }}
                    className="p-2 rounded-md font-medium w-24 bg-primary text-white hover:bg-transparent hover:text-primary hover:border-primary"
                  >
                    Previous
                  </button>
                  <button
                    disabled={!isNext}
                    onClick={() => {
                      // useGetAllScanHistory(page + 1, 5)
                      setPage((page) => page + 1);
                    }}
                    className="p-2 bg-primary font-medium text-white rounded-md w-24 hover:bg-transparent hover:text-primary hover:border-primary"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
      {tab === "reocurring" && (
        <div className="mt-10 w-full">
          <h3 className="font-medium text-base mb-8 text-left">
            These are scheduled recurring resource scan.
          </h3>
          {/* {ocuringdata.map((d) => (
            <ReOccurringCard
              title={d.title}
              next={d.next}
              region={d.region}
              mode={mode}
            />
          ))} */}
        </div>
      )}
      <FilterModal
        filterDataChange={(e) => filterUpdated(e)}
        headfilterFields={filterFields}
        setshowFilter={(e) => setShowPopOver(e)}
        showFilter={showPopOver}
      />
    </div>
  );
};

export default ScanHistory;
