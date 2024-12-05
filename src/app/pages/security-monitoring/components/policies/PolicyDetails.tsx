import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import isoImg from "../../../../../../public/media/logos/iso-img.svg";
import pciImg from "../../../../../../public/media/logos/pci-img.svg";
import hippaImg from "../../../../../../public/media/logos/hippa-img.svg";
import gdprImg from "../../../../../../public/media/logos/gdpr-img.svg";
import awsrImg from "../../../../../../public/media/logos/aws-black-img.svg";
import aicpImg from "../../../../../../public/media/logos/aicpa-img.svg";
import cisImg from "../../../../../../public/media/logos/cis-img.svg";
import nistImg from "../../../../../../public/media/logos/nist.svg";
import awsLight from "../../../../../../public/media/logos/aws-logo.svg";
import modeAtomsAtom from "../../../../atoms/modeAtoms.atom";
import { useRecoilValue } from "recoil";

const ScanCard = ({ data, mode }: any) => {
  return (
    <div
      className={`grid grid-cols-7 p-[12px] mb-[8px] place-content-center border-bottom  ${
        mode === "dark" ? "bg-lightDark" : "bg-white"
      }`}
    >
      <p
        className={`font-semibold col-span-2 flex text-[12px] items-center justify-start ${
          mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
        }`}
      >
        {data?.rule_name}
      </p>
      <div className="flex items-center gap-[8px] justify-center ">
        <img src={awsLight} alt="aws logo" className="w-8 h-8" />
        <p className="font-medium text-[12px] text-center">
          {data?.cloud_provider}
        </p>
      </div>
      <p
        className={`font-medium flex text-[12px] items-center justify-center ${
          mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
        }`}
      >
        {data?.severity}
      </p>
      <p
        className={`font-medium flex text-[12px] items-center justify-center ${
          mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
        }`}
      >
        {data?.services}
      </p>
      <p
        className={`font-medium flex text-[12px] items-center justify-center ${
          mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
        }`}
      >
        {data?.rule_type}
      </p>
      <p className={`font-medium flex text-[12px] items-center justify-start ${
          mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
        }`}>
        {data?.desc}
      </p>
    </div>
  );
};

const PolicyDetails = () => {
  const { mode } = useRecoilValue(modeAtomsAtom);
  const [selectedPol, setSelectedPol] = useState<any>(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const policies = [
    {
      logo: isoImg,
      title: "ISO/IEC 27001",
      desc: "International standard for information security management systems (ISMS).",
      count: "14",
      id: 1,
    },
    {
      logo: pciImg,
      title: "PCI DSS - Payment Card Industry. . .",
      desc: "Standards for securing credit card transactions and protecting cardholder data.",
      count: "14",
      id: 2,
    },
    {
      logo: hippaImg,
      title: "Health Insurance Portability and Accou. . .",
      desc: "Standards for protecting sensitive patient health information.",
      count: "14",
      id: 3,
    },
    {
      logo: gdprImg,
      title: "General Data Protection Regulation. EU",
      desc: "European Union regulation for data protection and privacy.",
      count: "14",
      id: 4,
    },
    {
      logo: awsrImg,
      title: "AWS Security Benchmarks",
      desc: "Guidelines and practices recommended by AWS for securing AWS environments.",
      count: "14",
      id: 5,
    },
    {
      logo: aicpImg,
      title: "AICPA SOC",
      desc: "Standards for managing customer data based on five trust service criteria",
      count: "14",
      id: 6,
    },
    {
      logo: cisImg,
      title: "CIS Policy Benchmarks",
      desc: "Standards for managing customer data based on five trust service criteria",
      count: "14",
      id: 7,
    },
    {
      logo: nistImg,
      title: "NIST Cloud Compliance",
      desc: "Standards for managing customer data based on five trust service criteria",
      count: "14",
      id: 8,
    },
    {
      logo: "",
      title: "Custom Policy title",
      desc: "Client organization policy standard for 2024 security breach and solution",
      count: "23",
      id: 9,
    },
  ];

  const allHistory = [
    {
      rule_name: "ISO EAC 27001 system check",
      cloud_provider: "Amazon",
      severity: "High",
      services: "Ec2 Instance",
      rule_type: "Type",
      desc: "This is a system check for all EC2 instances. Cloud Regions in America",
      id: 0,
    },
    {
      rule_name: "Cloud Conformity Custom Policy Version",
      cloud_provider: "Amazon",
      severity: "Low",
      services: "S3 Bucket",
      rule_type: "Type",
      desc: "Conformity rules for s3 Bucket only",
      id: 1,
    },
    {
      rule_name: "Cloud Conformity Custom Policy Version",
      cloud_provider: "Amazon",
      severity: "Low",
      services: "S3 Bucket",
      rule_type: "Type",
      desc: "Conformity rules for s3 Bucket only",
      id: 2,
    },
  ];

  useEffect(() => {
    if (id) {
      const filtered = policies.filter((pol) => pol?.id === +id)[0];
      setSelectedPol(filtered);
    }
  }, []);

  return (
    <div className="px-8 mt-[32px] w-full">
      <div className="flex items-center flex-row gap-[16px] mb-[32px]">
        <div className="flex items-center gap-[16px] border-end pr-[16px]">
          <button
            onClick={() => {
              navigate("/monitoring/policies-and-ruleset?cur=policies");
            }}
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
          <h1 className="font-semibold text-[14px]">Cloud Security Policy</h1>
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
      <div className="w-full flex items-center gap-[14px] flex-col md:flex-row mb-[55px]">
        <div
          className={`rounded-full ${
            selectedPol?.logo ? "" : "bg-[#284CB31A] p-[16px]"
          } flex items-center justify-center"`}
        >
          {selectedPol?.logo ? (
            <img
              src={selectedPol?.logo}
              alt="logo"
              className="w-[70px] h-[70px]"
            />
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 18L11 21L16 16"
                stroke="#284CB3"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 17.6073C21.4937 17.0221 23 15.6889 23 13C23 9 19.6667 8 18 8C18 6 18 2 12 2C6 2 6 6 6 8C4.33333 8 1 9 1 13C1 15.6889 2.50628 17.0221 4 17.6073"
                stroke="#284CB3"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <div className="w-full">
          <h1 className="font-semibold text-[14px] text-start mb-[8px]">
            {selectedPol?.title}
          </h1>
          <p
            className={`${
              mode === "dark"
                ? "text-[#EAEAEA] text-start"
                : "text-[#6A6A6A] text-start font-medium"
            } text-[12px]`}
          >
            {selectedPol?.desc}
          </p>
        </div>
      </div>
      <p className="w-full border-bottom mb-[16px] pb-[14px] font-medium text-[14px] text-start">
        {selectedPol?.count ?? 0} rules and benchmark
      </p>
      <div
        className={`grid grid-cols-7 p-[12px] h-[45px] rounded-t-[16px] mb-[8px] border-bottom  ${
          mode === "dark" ? "bg-lightDark" : "bg-white"
        }`}
      >
        <p className="text-start font-semibold text-[12px] col-span-2">
          Rule Name
        </p>
        <p className="text-center font-semibold text-[12px]">Cloud Provider</p>
        <p className="text-center font-semibold text-[12px]">Severity</p>
        <p className="text-center font-semibold text-[12px]">Services</p>
        <p className="text-center font-semibold text-[12px]">Rule type</p>
        <p className="text-start font-semibold text-[12px]">Description</p>
      </div>
      {allHistory.map((hist) => (
        <ScanCard data={hist} mode={mode} key={hist?.id}/>
      ))}
    </div>
  );
};

export default PolicyDetails;
