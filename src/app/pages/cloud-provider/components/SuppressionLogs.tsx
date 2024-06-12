import React, { useEffect, useState, useRef } from "react";
import { Popover } from "react-tiny-popover";
import { useRecoilValue } from "recoil";
import modeAtomsAtom from "../../../atoms/modeAtoms.atom";
import { useGetAccountTenant } from "../../../api/api-services/accountQuery";
import {
  AccountsApiTenantsList200Response,
  SystemSettingsRuleSuppressionLogList200Response,
} from "../../../api/axios-client";
import { useGetSuppressionLogs } from "../../../api/api-services/systemQuery";
import { TableColumn } from "../../../components/tableComponents/models";
import { ColumnTypes } from "../../../components/models";
import FilterModal from "../../../components/FilterModal";
import DefaultContent from "../../../components/defaultContent/defaultContent";

const LogsCard = ({
  date,
  resource_id,
  rule,
  severity,
  exp_date,
  comment,
  mode,
  status,
  resource,
  region,
  description,
  message,
  suppressed_by,
}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-[280vw] md:w-[180vw] lg:w-full">
      <button
        className={`grid grid-cols-10 gap-2 p-4  mb-3 place-content-center  h-[52px] border-bottom w-full ${
          mode === "dark" ? "bg-lightDark" : "bg-white"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="col-span-2 flex text-[12px] items-center justify-center gap-4 font-semibold">
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={isOpen}
              className="w-4 h-4 rounded-md"
            />
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
                d="M1.6875 4.25C1.6875 3.93934 1.93934 3.6875 2.25 3.6875H8.25C8.56066 3.6875 8.8125 3.93934 8.8125 4.25C8.8125 4.56066 8.56066 4.8125 8.25 4.8125H2.25C1.93934 4.8125 1.6875 4.56066 1.6875 4.25Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.6875 9.5C1.6875 9.18934 1.93934 8.9375 2.25 8.9375H12C12.3107 8.9375 12.5625 9.18934 12.5625 9.5C12.5625 9.81066 12.3107 10.0625 12 10.0625H2.25C1.93934 10.0625 1.6875 9.81066 1.6875 9.5Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.6875 14.75C1.6875 14.4393 1.93934 14.1875 2.25 14.1875H15.75C16.0607 14.1875 16.3125 14.4393 16.3125 14.75C16.3125 15.0607 16.0607 15.3125 15.75 15.3125H2.25C1.93934 15.3125 1.6875 15.0607 1.6875 14.75Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
            </svg>
          </div>
          <span className="w-44 text-start">{date}</span>{" "}
        </p>
        <p className="col-span-2 font-semibold text-[12px] text-start">
          {rule}
        </p>
        <p className="font-semibold text-[12px]">{resource_id}</p>
        <p
          className={`font-semibold text-[12px] ${
            severity.toLowerCase() === "high"
              ? "text-[#FF7D30]"
              : "text-[#FF161A]"
          }`}
        >
          {severity}
        </p>
        <p className="font-semibold text-[12px] text-start">{exp_date}</p>
        <p className="col-span-2 font-medium flex items-center justify-between w-full">
          {comment}
        </p>
      </button>
      {isOpen && (
        <div
          className={`w-full md:pl-8 p-10 my-2 font-medium rounded-sm ${
            mode === "dark" ? "bg-lightDark" : "bg-white"
          }`}
        >
          <div className="grid grid-cols-3 gap-y-4">
            <p>Status:</p>
            <p
              className={
                status.toLowerCase() === "failed"
                  ? "text-[#FF161A] col-span-2 font-semibold"
                  : "text-[#2AB849] col-span-2 font-semibold"
              }
            >
              {status.toUpperCase()}
            </p>
            <p className="font-semibold">Resource Id:</p>
            <p className="text-left col-span-2">{resource_id}</p>
            <p className="font-semibold">Resource:</p>
            <p className="text-left col-span-2">{resource}</p>
            <p className="font-semibold">Region:</p>
            <p className="text-left col-span-2">{region}</p>
            <p className="font-semibold">Message:</p>
            <p className="text-left col-span-2">{message}</p>
            <p className="font-semibold">Description:</p>
            <p className="text-left col-span-2">{description}</p>
            <p className="font-semibold">Comment:</p>
            <p className="text-left col-span-2">{comment}</p>
            <p className="font-semibold">Exp Date:</p>
            <p className="text-left col-span-2">Suppressed until {exp_date}</p>
            <p className="font-semibold">Suppressed by:</p>
            <p className="text-left col-span-2">{suppressed_by}</p>
          </div>
        </div>
      )}
    </div>
  );
};

type Filter = {
  severity: string;
  tenant: string;
};

const SuppressionLogs = () => {
  const { mode } = useRecoilValue(modeAtomsAtom);
  const [allLogs, setAllLogs] = useState<any[]>([]);
  const [showEmpty, setshowEmpty] = useState<boolean>(false);
  const [listTenants, setListTenants] = useState<any[]>([]);
  const [showPopOver, setShowPopOver] = useState(false);
  const [checks, setChecks] = useState<any[]>([]);
  const [filterValue, setFilterValue] = useState<Filter>({
    severity: "",
    tenant: "",
  });
  const filter = useRef<any>({
    page: 1,
    pageSize: 10,
    severity: undefined,
    expiration: undefined,
  });

  const filterFields = [
    {
      name: "severity",
      title: "Severity",
      type: ColumnTypes.List,
      listValue: [
        { id: "High", name: "High" },
        { id: "Low", name: "Low" },
        { id: "Medium", name: "Medium" },
      ],
      listIdField: "id",
      listTextField: "name",
    },
    {
      name: "expiration",
      title: "Expiration",
      type: ColumnTypes.Date,
    },
  ];

  const { data, isLoading, refetch } = useGetSuppressionLogs({
    ...filter.current,
  });

  const datastsr: SystemSettingsRuleSuppressionLogList200Response | any = data;
  const [user, setUser] = useState<any>(null);
  const { data: tenantData } = useGetAccountTenant({ page: 1, pageSize: 100 });
  const tenantstsr: AccountsApiTenantsList200Response | any = tenantData;
  const logs = [
    {
      date: "2/3/2024 ",
      rule: "AWS Config Enabled",
      resource_id: "sg-04cc9e5ccd9. . ",
      severity: "HIGH",
      exp_date: "2/3/2024 ",
      comment: "We will not run rule RL001 on EC2-00. . .",
      status: "Failed",
      resource: "launch-wizard-7",
      region: "US-EAST-1",
      message:
        "Security group launch-wizard-1 allows ingress from 0.0.0.0/0 or ::/0 to ports 11211, 11211",
      description: "launch-wizard-1 created 2023-11-23T14:35:09.092Z",
      suppressed_by: "Joseph Kelvin",
    },
    {
      date: "2/3/2024 ",
      rule: "AWS Config Enabled",
      resource_id: "--",
      severity: "CRITICAL",
      exp_date: "2/3/2024 ",
      comment: "WE WILL NOT RUN  AWS-RDS  FOREVER UNTIL UPDATED",
      status: "Failed",
      resource: "launch-wizard-7",
      region: "US-EAST-1",
      message:
        "Security group launch-wizard-1 allows ingress from 0.0.0.0/0 or ::/0 to ports 11211, 11211",
      description: "launch-wizard-1 created 2023-11-23T14:35:09.092Z",
      suppressed_by: "Joseph Kelvin",
    },
    {
      date: "2/3/2024 ",
      rule: "	Unrestricted Security Group Ingress on Port",
      resource_id: "EC2-04cc9e5eeu. . .",
      severity: "HIGH",
      exp_date: "2/3/2024 ",
      comment: "WE WILL NOT RUN  AWS-RDS  FOREVER UNTIL UPDATED",
      status: "Failed",
      resource: "launch-wizard-7",
      region: "US-EAST-1",
      message:
        "Security group launch-wizard-1 allows ingress from 0.0.0.0/0 or ::/0 to ports 11211, 11211",
      description: "launch-wizard-1 created 2023-11-23T14:35:09.092Z",
      suppressed_by: "Joseph Kelvin",
    },
  ];

  function filterUpdated(data: any) {
    filter.current = {
      page: data?.page ?? 1,
      pageSize: data?.pageSize ?? 10,
      expiration: data?.expiration,
      severity: data?.severity,
    };
    refetch();
  }

  function refreshrecord() {
    filter.current = {
      page: 1,
      pageSize: 10,
      severity: undefined,
      expiration: undefined,
    };
    refetch();
  }

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      const parsedUser = JSON.parse(localUser);
      setUser(parsedUser);
    }
  }, []);

  useEffect(() => {
    setListTenants(tenantstsr?.data?.data?.results);
    setAllLogs(datastsr?.data?.data?.results ?? []);
    setshowEmpty(
      datastsr?.data?.data?.results
        ? datastsr?.data?.data?.results.length === 0
        : true
    );
  }, [tenantstsr, datastsr]);
  return (
    <div className="w-[90%] mx-auto mt-[32px]">
      <div className="pb-4 mb-10 border-bottom flex items-center  justify-between w-full">
        <p className="text-[14px] font-semibold">Suppressions logs</p>
        <button
          onClick={() => setShowPopOver(!showPopOver)}
          className="text-[14px] font-medium pl-3 border-start flex items-center justify-center gap-3"
        >
          <span className="underline">Filter</span>
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
              stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.25 13.5L9.75 13.5"
              stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <p className="mt-4 mb-8 text-[14px] font-semibold">
        Instances or logs where suppression setups were applied or utilized
      </p>
      <div className="w-full overflow-auto p-2">
        {showEmpty ? (
          <DefaultContent
            pageHeader="All Suppression logs"
            pageDescription="No record found"
            loading={isLoading}
            buttonValue="Refresh"
            buttonClick={() => refreshrecord()}
          />
        ) : (
          <>
            <div
              className={`grid grid-cols-10 p-4 gap-3 rounded-t-[1.5rem] mb-3 border-bottom h-[52px] w-[280vw] md:w-[180vw] lg:w-full ${
                mode === "dark" ? "bg-lightDark" : "bg-white"
              }`}
            >
              <p className="col-span-2 flex text-[12px] items-center justify-center gap-4 font-semibold">
                <div className="flex items-center gap-4">
                  <input type="checkbox" className="w-4 h-4 rounded-md" />
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
                      d="M1.6875 4.25C1.6875 3.93934 1.93934 3.6875 2.25 3.6875H8.25C8.56066 3.6875 8.8125 3.93934 8.8125 4.25C8.8125 4.56066 8.56066 4.8125 8.25 4.8125H2.25C1.93934 4.8125 1.6875 4.56066 1.6875 4.25Z"
                      fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.6875 9.5C1.6875 9.18934 1.93934 8.9375 2.25 8.9375H12C12.3107 8.9375 12.5625 9.18934 12.5625 9.5C12.5625 9.81066 12.3107 10.0625 12 10.0625H2.25C1.93934 10.0625 1.6875 9.81066 1.6875 9.5Z"
                      fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.6875 14.75C1.6875 14.4393 1.93934 14.1875 2.25 14.1875H15.75C16.0607 14.1875 16.3125 14.4393 16.3125 14.75C16.3125 15.0607 16.0607 15.3125 15.75 15.3125H2.25C1.93934 15.3125 1.6875 15.0607 1.6875 14.75Z"
                      fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                    />
                  </svg>
                </div>
                <span className="w-44">Date</span>{" "}
              </p>
              <p className="col-span-2 font-semibold text-[12px]">Rule</p>
              <p className="font-semibold text-[12px] text-center">
                Resource ID
              </p>
              <p className="font-semibold text-[12px] text-center">Severity</p>
              <p className="font-semibold text-[12px]">Exp Date</p>
              <p className="font-semibold text-[12px] col-span-2">Comment</p>
            </div>
            {allLogs.map((log, idx) => (
              <LogsCard
                key={log.comment + idx}
                region={log?.result_json?.checks[0].region ?? ""}
                comment={log?.comments ? `${log?.comments.slice(0, 20)}...` : ""}
                date={log?.created_on.split("T")[0] ?? ""}
                description={log?.result_json?.checks[0]?.remediation_desc ?? ""}
                exp_date={log?.expiration ?? ""}
                message={log?.result_json?.checks[0].finding_desc ?? ""}
                resource_id={log?.result_json?.checks[0]?.resource_id ?? ""}
                rule={log?.result_json ? `${log?.result_json?.checks[0].rule_code.slice(0, 25)}...` : ""}
                severity={log?.result_json?.checks[0]?.severity ?? ""}
                suppressed_by={log?.suppressed_by?.full_name ?? ""}
                status={log?.result_json?.checks[0].status_code ?? ""}
                resource={log?.result_json?.checks[0].service ?? ""}
                mode={mode}
              />
            ))}
          </>
        )}
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

export default SuppressionLogs;
