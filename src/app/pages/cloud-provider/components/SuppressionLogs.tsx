import React, { useEffect, useState } from "react";
import { Popover } from "react-tiny-popover";
import { useRecoilValue } from "recoil";
import modeAtomsAtom from "../../../atoms/modeAtoms.atom";
import { useGetAccountTenant } from "../../../api/api-services/accountQuery";
import { AccountsApiTenantsList200Response } from "../../../api/axios-client";

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
    <div className="w-[280vw] md:w-full">
      <button
        className={`grid grid-cols-10 gap-2 p-4 rounded-md mb-3 shadow-sm w-full ${
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
        <p className="col-span-2 flex items-center justify-between w-full">
          {comment}
        </p>
      </button>
      {isOpen && (
        <div
          className={`w-full md:pl-8 p-10 my-2 shadow-sm ${
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
            <p>Resource Id:</p>
            <p className="text-left col-span-2">{resource_id}</p>
            <p>Resource:</p>
            <p className="text-left col-span-2">{resource}</p>
            <p>Region:</p>
            <p className="text-left col-span-2">{region}</p>
            <p>Message:</p>
            <p className="text-left col-span-2">{message}</p>
            <p>Description:</p>
            <p className="text-left col-span-2">{description}</p>
            <p>Comment:</p>
            <p className="text-left col-span-2">{comment}</p>
            <p>Exp Date:</p>
            <p className="text-left col-span-2">Suppressed until {exp_date}</p>
            <p>Suppressed by:</p>
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
  const [listTenants, setListTenants] = useState<any[]>([]);
  const [showPopOver, setShowPopOver] = useState(false);
  const [filterValue, setFilterValue] = useState<Filter>({
    severity: "",
    tenant: "",
  });
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

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      const parsedUser = JSON.parse(localUser);
      setUser(parsedUser);
    }
  }, []);

  useEffect(() => {
    setListTenants(tenantstsr?.data?.data?.results);
  }, [tenantstsr]);
  return (
    <div className="w-[90%] mx-auto pt-12">
      <div className="pb-4 mb-10 border-bottom flex items-center  justify-between w-full">
        <p className="text-[14px] font-semibold">Suppressions logs</p>
        <Popover
          onClickOutside={() => setShowPopOver(false)}
          isOpen={showPopOver}
          positions={["bottom", "left", "top", "right"]}
          content={
            <div
              className={`w-64 p-6 rounded-md shadow-sm ${
                mode === "dark" ? "bg-lightDark" : "bg-[#FFFFFF]"
              }`}
            >
              {user?.role.name !== "Tenant" && (
                <div className="form-group">
                  <label htmlFor="tenant" className="w-full mb-2">
                    Tenant
                  </label>
                  <select
                    data-placeholder="Select option"
                    autoComplete="off"
                    value={filterValue.tenant}
                    onChange={(e) =>
                      setFilterValue({ ...filterValue, tenant: e.target.value })
                    }
                    className="form-control bg-transparent"
                    // value={asset.tenant}
                  >
                    <option value="">Select Tenant</option>
                    {listTenants?.map((item) => (
                      <option key={item?.id} value={item?.id}>
                        {item?.full_name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="form-group">
                <label htmlFor="severity" className="w-full mb-2">
                  Severity
                </label>
                <input
                  type="text"
                  className="form-control bg-transparent"
                  placeholder="enter severity"
                  value={filterValue.severity}
                  onChange={(e) =>
                    setFilterValue({ ...filterValue, severity: e.target.value })
                  }
                />
              </div>

              <button
                onClick={() => setShowPopOver(false)}
                className="bg-primary block w-24 my-4 rounded-md p-3 text-white"
              >
                Apply
              </button>
            </div>
          }
        >
          <button
            onClick={() => setShowPopOver(!showPopOver)}
            className="text-[14px] pl-3 border-start flex items-center justify-center gap-3"
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
        </Popover>
      </div>
      <p className="mt-4 mb-8 text-[14px] font-semibold">
        Instances or logs where suppression setups were applied or utilized
      </p>
      <div className="w-full overflow-auto p-2">
        <div
          className={`grid grid-cols-10 p-4 gap-3 rounded-md mb-3 shadow-sm border w-[280vw] md:w-full ${
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
          <p className="font-semibold text-[12px] text-center">Resource ID</p>
          <p className="font-semibold text-[12px] text-center">Severity</p>
          <p className="font-semibold text-[12px]">Exp Date</p>
          <p className="font-semibold text-[12px] col-span-2">Comment</p>
        </div>
        {logs.map((log, idx) => (
          <LogsCard
            key={log.comment + idx}
            region={log.region}
            comment={log.comment}
            date={log.date}
            description={log.description}
            exp_date={log.exp_date}
            message={log.message}
            resource_id={log.resource_id}
            rule={log.rule}
            severity={log.severity}
            suppressed_by={log.suppressed_by}
            status={log.status}
            resource={log.resource}
            mode={mode}
          />
        ))}
      </div>
    </div>
  );
};

export default SuppressionLogs;
