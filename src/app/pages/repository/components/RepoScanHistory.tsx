import React, { useEffect, useState, useRef } from "react";
import modeAtomsAtom from "../../../atoms/modeAtoms.atom";
import {
  useGetAllScanHistory,
  useGetScanStat,
  useGetPolicies,
} from "../../../api/api-services/policyQuery";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import FilterModal from "../../../components/FilterModal";
import {
  ColumnTypes,
  TableColumn,
} from "../../../components/tableComponents/models";
import {
  PolicyPolicyRunScanHistoryList200Response,
  PolicyPolicyRunScanStatsList200Response,
} from "../../../api/axios-client";
import DefaultContent from "../../../components/defaultContent/defaultContent";

const ScanCard = ({
  policy,
  cloud,
  Date,
  Vulnerability,
  Compliance,
  mode,
  id,
}: any) => {
  // const navigate = useNavigate();

  return (
    <div
      className={`grid grid-cols-7 p-4 rounded-md mb-3 shadow-sm w-full ${
        mode === "dark" ? "bg-lightDark" : "bg-white"
      }`}
    >
      <p
        className={`font-medium flex text-[12px] items-center justify-center ${
          mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
        }`}
      >
        {Date}
      </p>
      <p className="font-semibold text-[12px] col-span-2">{policy}</p>
      <p
        className={`font-medium flex text-[12px] items-center justify-center ${
          mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
        }`}
      >
        {cloud}
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
        <Link to={`/repository/scan-history/${id}`}>
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

const RepoScanHistory = () => {
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
    repo: undefined,
    date: undefined,
    scanType: "Repository",
  });

  const [filterFields, setFilterFields] = useState<TableColumn[]>([
    {
      name: "repo",
      title: "Repo Type",
      type: ColumnTypes.List,
      listValue: [
        { name: "Github" },
        { name: "Git Lab" },
        { name: "Bit Bucket" },
        { name: "Docker Hub" },
      ],
      listIdField: "name",
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

  const { data: stat } = useGetScanStat();
  const statstr: PolicyPolicyRunScanStatsList200Response | any = stat;

  const {
    data: scanHistory,
    isLoading,
    refetch,
  } = useGetAllScanHistory({ ...filter.current });
  const datastsr: PolicyPolicyRunScanHistoryList200Response | any = scanHistory;
  const { data: policies } = useGetPolicies({ page: 1, pageSize: 1000 });
  const policiestr: PolicyPolicyRunScanStatsList200Response | any = policies;

  function refreshrecord() {
    filter.current = {
      page: 1,
      pageSize: 10,
      policy: undefined,
      repo: undefined,
      date: undefined,
      scanType: "Repository",
    };
    refetch();
  }

  function filterUpdated(data: any) {
    filter.current = {
      page: data?.page ?? 1,
      pageSize: data?.pageSize ?? 10,
      policy: data?.policy,
      repo: data?.repo,
      date: data?.date,
      scanType: "Repository",
    };
    refetch();
  }

  useEffect(() => {
    setAllScanHistory(datastsr?.data?.data?.results ?? []);
    setIsNext(datastsr?.data?.data.next ? true : false);
    setTotalCount(datastsr?.data?.data.count);
    setStats(statstr?.data?.data.repo);
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
  return (
    <div className="w-full p-10">
      <div className="grid grid-cols-4 gap-8">
        <div
          className={`flex shadow-sm items-center justify-center rounded-xl p-6 gap-4 ${
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
              fillOpacity="0.1"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.75 14.8125C15.2322 14.8125 14.8125 15.2322 14.8125 15.75V26.25C14.8125 26.7678 15.2322 27.1875 15.75 27.1875H26.25C26.7678 27.1875 27.1875 26.7678 27.1875 26.25V15.75C27.1875 15.2322 26.7678 14.8125 26.25 14.8125H15.75ZM13.6875 15.75C13.6875 14.6109 14.6109 13.6875 15.75 13.6875H26.25C27.3891 13.6875 28.3125 14.6109 28.3125 15.75V26.25C28.3125 27.3891 27.3891 28.3125 26.25 28.3125H15.75C14.6109 28.3125 13.6875 27.3891 13.6875 26.25V15.75Z"
              fill="#284CB3"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.5714 18.5625C19.4619 18.5625 18.5625 19.4619 18.5625 20.5714C18.5625 21.6809 19.4619 22.5804 20.5714 22.5804C21.1273 22.5804 21.6295 22.3553 21.9938 21.9901C22.3569 21.6261 22.5804 21.1254 22.5804 20.5714C22.5804 19.4619 21.6809 18.5625 20.5714 18.5625ZM17.4375 20.5714C17.4375 18.8406 18.8406 17.4375 20.5714 17.4375C22.3022 17.4375 23.7054 18.8406 23.7054 20.5714C23.7054 21.2324 23.5003 21.8462 23.1509 22.3516L24.3983 23.6029C24.6177 23.8229 24.6171 24.179 24.3972 24.3983C24.1772 24.6177 23.821 24.6171 23.6017 24.3972L22.3561 23.1478C21.8497 23.4991 21.2344 23.7054 20.5714 23.7054C18.8406 23.7054 17.4375 22.3022 17.4375 20.5714Z"
              fill="#284CB3"
            />
          </svg>

          <h1 className="font-semibold text-[18px]">
            {stats?.total_scans ?? 0}
            <span
              className={`pl-2 font-medium text-[14px] ${
                mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
              }`}
            >
              Total scan history
            </span>
          </h1>
        </div>
        <div
          className={`col-span-2 w-fit flex items-center justify-center shadow-sm rounded-xl p-6 gap-4 ${
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
              fillOpacity="0.1"
            />
            <path
              d="M12.9227 21.3C12.8155 21.1144 12.8155 20.8856 12.9227 20.7L16.7013 14.1553C16.8085 13.9697 17.0066 13.8553 17.2209 13.8553H24.7781C24.9925 13.8553 25.1905 13.9696 25.2977 14.1553L29.0763 20.7C29.1835 20.8856 29.1835 21.1144 29.0763 21.3L25.2977 27.8447C25.1905 28.0303 24.9925 28.1447 24.7781 28.1447H17.2209C17.0066 28.1447 16.8085 28.0304 16.7013 27.8447L12.9227 21.3Z"
              stroke="#FF161A"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 18L21 21"
              stroke="#FF161A"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 24.0075L21.0075 23.9992"
              stroke="#FF161A"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <h1 className="font-semibold text-[18px]">
            {stats?.threats_found ?? 0}
            <span
              className={`pl-2 font-medium text-[14px] ${
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
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M12 5.25L9 8.25"
                stroke="#2AB849"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M5.25 9L8.57574 12.3257C8.81005 12.5601 9.18995 12.5601 9.42426 12.3257L16.5 5.25"
                stroke="#2AB849"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="my-10 flex items-center w-full justify-between border-bottom">
        <div className="">
          {["scan history"].map((d) => (
            <button
              key={d}
              className={`uppercase p-4 ${
                d === tab
                  ? "font-bold text-[14px] border-bottom-3 border-primary"
                  : `font-medium text-[14px] ${
                      mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
                    }`
              }`}
              onClick={() => setTab(d)}
            >
              {d}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-5">
          <button
            onClick={() => setShowPopOver(!showPopOver)}
            className="flex text-[12px] font-medium items-center gap-3"
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
      <div className="mt-10 w-full">
        <div
          className={`grid grid-cols-7 p-4 rounded-t-xl mb-3 shadow-sm w-full ${
            mode === "dark" ? "bg-lightDark" : "bg-white"
          }`}
        >
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
          <p className="font-semibold text-[12px] col-span-2">Policy Used</p>
          <button className="flex text-[12px] items-center justify-center gap-2 font-semibold">
            <span>Repository</span>{" "}
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
          <p className="font-semibold text-[12px] text-center">Vulnerability</p>
          <p className="font-semibold text-[12px]">Compliance</p>
        </div>
        {isLoading || allScanHistory.length < 1 ? (
          <DefaultContent
            pageHeader="Scan History"
            pageDescription="No record found"
            loading={isLoading}
            buttonValue="Refresh"
            buttonClick={() => refreshrecord()}
          />
        ) : (
          allScanHistory.map((d) => (
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
      </div>
      <FilterModal
        filterDataChange={(e) => filterUpdated(e)}
        headfilterFields={filterFields}
        setshowFilter={(e) => setShowPopOver(e)}
        showFilter={showPopOver}
      />
    </div>
  );
};

export default RepoScanHistory;
