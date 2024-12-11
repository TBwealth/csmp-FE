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
  region,
  mode,
  id,
}: any) => {
  return (
    <div
      className={`grid grid-cols-7 p-4 h-[52px] place-content-center border-bottom mb-3 w-full ${
        mode === "dark" ? "bg-lightDark" : "bg-white"
      }`}
    >
      <p className="font-semibold text-[12px] flex items-center justify-start">{Date}</p>
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
        {region}
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
        <Link to={`/monitoring/assessment-history/${id}`}>
          {/* <svg
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
          </svg> */}
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
              fill={mode === "dark" ? "#EAEAEA" : "#373737"}
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
      className={`${
        mode === "dark" ? "bg-lightDark" : "bg-white"
      } mb-[8px] rounded-[12px] flex items-center justify-between w-full px-[24px] py-[16px] border`}
    >
      <p className="font-semibold text-[14px]">{title}</p>
      <div className="font-medium flex items-center justify-between w-fit gap-[16px]">
        <p className="flex items-center gap-2 pl-[16px] border-start">
          <FaGlobe color={mode === "dark" ? "#EAEAEA" : "#000000"} size={14} />
          <span className="text-[12px] font-semibold">{region}</span>
        </p>
        <p
          className={`${mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"} pl-[16px] border-start`}
        >
          {next}
        </p>
        <div className="flex items-center gap-[16px]">
          <button
          className="border-start border-end px-[16px]"
          >
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
          <button>
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
    endDate: undefined,
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

  const ocuringdata = [
    {
      title: "ISO EAC 27001 system check . ",
      next: "Next Scheduled scan: 12:00PM",
      region: "All Region",
    },
    {
      title: "ISO EAC 27001 system check . ",
      next: "Next Scheduled scan: 12:00PM",
      region: "All Region",
    },
    {
      title: "ISO EAC 27001 system check . ",
      next: "Next Scheduled scan: 12:00PM",
      region: "All Region",
    },
  ];

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
      endDate: data?.date,
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
          {["scan history", "reocurring"].map((d) => (
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
        <div className="flex items-center gap-[16px] justify-between">
          {/* <select
            name=""
            id=""
            className="bg-transparent p-2 text-[12px] font-medium"
          >
            <option value="">Group By</option>
          </select> */}
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
            className="flex border-start pl-[16px] py-[4px] text-[10px] md:text-[12px] font-medium items-center gap-3"
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
              <p className="font-semibold text-[12px]">Date</p>
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
                <span>Region</span>{" "}
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
                    policy={d?.policy}
                    cloud={d?.cloud}
                    // Region={d?.Region}
                    Date={d?.end_date}
                    Vulnerability={d?.vulnerability}
                    Compliance={d?.compliance}
                    region={d?.Region}
                    mode={mode}
                    id={d?.id}
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
          {ocuringdata.map((d) => (
            <ReOccurringCard
              title={d.title}
              next={d.next}
              region={d.region}
              mode={mode}
            />
          ))}
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
