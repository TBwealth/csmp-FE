import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import modeAtomsAtom from "../../../../../atoms/modeAtoms.atom";
import { useParams, useNavigate } from "react-router-dom";
import cloud from "../../../../../../../public/media/logos/logoBig.svg";
import aws from "../../../../../../../public/media/logos/awsBig.svg";

const Card = ({ data, mode }: any) => {
  return (
    <div
      className={`grid grid-cols-7 p-[12px] h-[45px] place-content-center  mb-[8px] border-bottom  ${
        mode === "dark" ? "bg-lightDark" : "bg-white"
      }`}
    >
      <p className="text-start flex items-center justify-start col-span-2 font-semibold text-[12px]">
        {data?.rule_name}
      </p>
      <p
        className={`font-medium col-span-2 flex text-[12px] items-center justify-start text-start ${
          mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
        }`}
      >
        {data?.rule_name}
      </p>
      <p
        className={`font-medium flex text-[12px] items-center justify-start text-start ${
          mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
        }`}
      >
        {data?.severity}
      </p>
      <p
        className={`font-medium col-span-2 flex text-[12px] items-start justify-start text-start ${
          mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
        }`}
      >
        {data?.remediation}
      </p>
    </div>
  );
};

type Props = {
  goBack: any;
  mode: string;
};

const WorkloadDetails = () => {
  const { mode } = useRecoilValue(modeAtomsAtom);
  const navigate = useNavigate();
  const { id } = useParams();
  const [selected, setSelected] = useState<any>({});
  const complianceData = [
    {
      logo: aws,
      title: "Workload Vulnerability Default 1.0",
      desc: "Aws Instance contains Package with Critical Severity CVEs",
      id: 0,
    },
    {
      logo: aws,
      title: "Workload Vulnerability Default 2.0",
      desc: "Aws Instance contains Package with Critical Severity CVEs",
      id: 1,
    },
    {
      logo: cloud,
      title: "Container Image Assurance Speed",
      desc: "CloudGuard validation of container image speed and port validations",
      id: 2,
    },
    {
      logo: cloud,
      title: "Container Image Assurance 1.0",
      desc: "CloudGuard validation of container image",
      id: 3,
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
              onClick={() =>
                navigate("/workload-protection/container/policies")
              }
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

export default WorkloadDetails;
