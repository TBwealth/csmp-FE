import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import modeAtomsAtom from "../../../../../atoms/modeAtoms.atom";
import { useParams, useNavigate } from "react-router-dom";
import cloud from "../../../../../../../public/media/logos/logoBig.svg";
import aws from "../../../../../../../public/media/logos/awsBig.svg";

const Card = ({ data, mode }: any) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate(`/workload-protection/iac/policies/${data?.id}`);
        sessionStorage.setItem("cur_policy_page", "compliance");
      }}
      className={`${
        mode === "dark" ? "bg-lightDark" : "bg-white"
      } relative border rounded-[12px] w-full`}
    >
      <div className="p-[24px] border-bottom flex items-end justify-end">
        <svg
          width="18"
          height="19"
          viewBox="0 0 18 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.5 9.875C13.7071 9.875 13.875 9.70711 13.875 9.5C13.875 9.29289 13.7071 9.125 13.5 9.125C13.2929 9.125 13.125 9.29289 13.125 9.5C13.125 9.70711 13.2929 9.875 13.5 9.875Z"
            fill={mode === "dark" ? "#EAEAEA" : "#373737"}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.5 9.6875C13.6036 9.6875 13.6875 9.60355 13.6875 9.5C13.6875 9.39645 13.6036 9.3125 13.5 9.3125C13.3964 9.3125 13.3125 9.39645 13.3125 9.5C13.3125 9.60355 13.3964 9.6875 13.5 9.6875ZM12.5625 9.5C12.5625 8.98223 12.9822 8.5625 13.5 8.5625C14.0178 8.5625 14.4375 8.98223 14.4375 9.5C14.4375 10.0178 14.0178 10.4375 13.5 10.4375C12.9822 10.4375 12.5625 10.0178 12.5625 9.5Z"
            fill={mode === "dark" ? "#EAEAEA" : "#373737"}
          />
          <path
            d="M9 9.875C9.20711 9.875 9.375 9.70711 9.375 9.5C9.375 9.29289 9.20711 9.125 9 9.125C8.79289 9.125 8.625 9.29289 8.625 9.5C8.625 9.70711 8.79289 9.875 9 9.875Z"
            fill={mode === "dark" ? "#EAEAEA" : "#373737"}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9 9.6875C9.10355 9.6875 9.1875 9.60355 9.1875 9.5C9.1875 9.39645 9.10355 9.3125 9 9.3125C8.89645 9.3125 8.8125 9.39645 8.8125 9.5C8.8125 9.60355 8.89645 9.6875 9 9.6875ZM8.0625 9.5C8.0625 8.98223 8.48223 8.5625 9 8.5625C9.51777 8.5625 9.9375 8.98223 9.9375 9.5C9.9375 10.0178 9.51777 10.4375 9 10.4375C8.48223 10.4375 8.0625 10.0178 8.0625 9.5Z"
            fill={mode === "dark" ? "#EAEAEA" : "#373737"}
          />
          <path
            d="M4.5 9.875C4.70711 9.875 4.875 9.70711 4.875 9.5C4.875 9.29289 4.70711 9.125 4.5 9.125C4.29289 9.125 4.125 9.29289 4.125 9.5C4.125 9.70711 4.29289 9.875 4.5 9.875Z"
            fill={mode === "dark" ? "#EAEAEA" : "#373737"}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.5 9.6875C4.60355 9.6875 4.6875 9.60355 4.6875 9.5C4.6875 9.39645 4.60355 9.3125 4.5 9.3125C4.39645 9.3125 4.3125 9.39645 4.3125 9.5C4.3125 9.60355 4.39645 9.6875 4.5 9.6875ZM3.5625 9.5C3.5625 8.98223 3.98223 8.5625 4.5 8.5625C5.01777 8.5625 5.4375 8.98223 5.4375 9.5C5.4375 10.0178 5.01777 10.4375 4.5 10.4375C3.98223 10.4375 3.5625 10.0178 3.5625 9.5Z"
            fill={mode === "dark" ? "#EAEAEA" : "#373737"}
          />
        </svg>
      </div>
      <div className="rounded-full bg-white absolute left-8 top-12 flex items-center justify-center">
        <img src={data?.logo} alt="logo" className="max-w-sm" />
      </div>
      <div className="w-full p-[24px] mt-[16px]">
        <h1 className="font-semibold text-[14px] text-start mb-[8px]">
          {data?.title}
        </h1>
        <p className="font-medium text-[12px] text-start">{data?.desc}</p>
      </div>
    </button>
  );
};

const IAComplianceDetails = () => {
  const { mode } = useRecoilValue(modeAtomsAtom);
  const navigate = useNavigate();
  const { id } = useParams();
  const [selected, setSelected] = useState<any>({});
  const complianceData = [
    {
      logo: aws,
      title: "AWS CloudFormation",
      desc: "Uses AWS Config and AWS Policy-as-Code to enforce rules.",
      id: 0,
    },
    {
      logo: cloud,
      title: "IAC Standard benchmarks",
      desc: "CloudGuard validation of container image speed and port validations",
      id: 1,
    },
    {
      logo: cloud,
      title: "AIPAC Json formetter",
      desc: "CloudGuard validation of container image",
      id: 2,
    },
  ];

  const policyData = [
    {
      rule_name: "Insecure Code of Critical Severity",
      desc: "This is a system check for all EC2 instances. Cloud Regions in America",
      severity: "High",
      remediation: "Review your application code and modify this risky code.",
    },
    {
      rule_name: "Insecure Content of Critical Severity",
      desc: "Conformity rules for s3 Bucket only",
      severity: "Low",
      remediation:
        "Review your application code to determine if this data is sensitive.",
    },
    {
      rule_name: "Malicious IP of Critical Severity",
      desc: "Conformity rules for s3 Bucket only",
      severity: "Low",
      remediation: "Conformity rules for s3 Bucket only",
    },
  ];

  useEffect(() => {
    if (id) {
      const filtered = complianceData.filter((data) => data.id === +id)[0];
      setSelected(filtered);
    }
  }, [id]);
  return (
    <div className="px-8 mt-[32px] w-full">
      <div className="flex items-center justify-between flex-col md:flex-row gap-[16px]">
        <div className="flex items-center flex-col md:flex-row gap-[16px]">
          <div className="flex items-center gap-[16px] border-end pr-[16px]">
            <button
              onClick={() => navigate("/workload-protection/iac/policies")}
            >
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.5303 5.96967C12.8232 6.26256 12.8232 6.73744 12.5303 7.03033L7.81066 11.75H18.5C18.9142 11.75 19.25 12.0858 19.25 12.5C19.25 12.9142 18.9142 13.25 18.5 13.25H7.81066L12.5303 17.9697C12.8232 18.2626 12.8232 18.7374 12.5303 19.0303C12.2374 19.3232 11.7626 19.3232 11.4697 19.0303L5.46967 13.0303C5.17678 12.7374 5.17678 12.2626 5.46967 11.9697L11.4697 5.96967C11.7626 5.67678 12.2374 5.67678 12.5303 5.96967Z"
                  fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                />
              </svg>
            </button>
            <h1 className="font-semibold text-[14px]">Details</h1>
          </div>
          <p
            className={`${
              mode === "dark"
                ? "text-[#EAEAEA]"
                : "text-[#6A6A6A] border-end font-medium text-[12px] pr-[16px] py-[2px]"
            }`}
          >
            System Policy
          </p>
        </div>
      </div>
      <div className="flex items-center gap-[16px] w-full mt-[34.5px] mb-[55px]">
        <img src={selected?.logo} alt="logo" />
        <div className="w-full">
          <h1 className="font-semibold text-[14px] text-start mb-[8px]">
            {selected?.title}
          </h1>
          <p className="text-[12px] font-medium text-start">{selected?.desc}</p>
        </div>
      </div>
      <div className="w-full border-bottom">
        <h1 className="pb-[14px] font-semibold text-[10px] md:text-[14px] text-start">
          Rules and benchmark
        </h1>
      </div>
      <div
        className={`grid grid-cols-7 p-[12px] h-[45px] rounded-t-[16px] mt-[24px]  mb-[8px] border-bottom  ${
          mode === "dark" ? "bg-lightDark" : "bg-white"
        }`}
      >
        <p className="text-start col-span-2 font-semibold text-[12px]">
          Rule Name
        </p>
        <p className="font-semibold col-span-2 text-[12px] text-start">
          Description
        </p>
        <p className="font-semibold text-[12px] text-start">Severity</p>
        <p className="font-semibold col-span-2 text-[12px] text-start">
          Remediation
        </p>
      </div>
      {policyData.map((pol) => (
        <Card data={pol} mode={mode} key={pol?.rule_name} />
      ))}
    </div>
  );
};

export default IAComplianceDetails;
