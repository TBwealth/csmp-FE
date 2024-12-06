import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover } from "react-tiny-popover";
import isoImg from "../../../../../../public/media/logos/iso-img.svg";
import pciImg from "../../../../../../public/media/logos/pci-img.svg";
import hippaImg from "../../../../../../public/media/logos/hippa-img.svg";
import gdprImg from "../../../../../../public/media/logos/gdpr-img.svg";
import awsrImg from "../../../../../../public/media/logos/aws-black-img.svg";
import aicpImg from "../../../../../../public/media/logos/aicpa-img.svg";
import cisImg from "../../../../../../public/media/logos/cis-img.svg";
import nistImg from "../../../../../../public/media/logos/nist.svg";
import PolicyCard from "./PolicyCard";

type Props = {
  goBack: any;
  mode: string;
};

const PolicyIndex = ({ goBack, mode }: Props) => {
  const [popUp, showPopUP] = useState(false);
  const navigate = useNavigate()
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
  return (
    <div className="">
      <div className="flex items-center justify-between flex-col md:flex-row gap-[16px] mb-[44px]">
        <div className="flex items-center flex-row gap-[16px]">
          <div className="flex items-center gap-[16px] border-end pr-[16px]">
            <button onClick={goBack}>
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
            <h1 className="font-semibold text-[14px]">Cloud Policy (9)</h1>
          </div>
          <Link
            to="/"
            className={`${
              mode === "dark"
                ? "text-[#EAEAEA]"
                : "text-[#6A6A6A] border-end font-medium text-[12px] pr-[16px] py-[2px]"
            }`}
          >
            Learn more
          </Link>
        </div>
        <div className="flex items-center flex-row gap-[16px]">
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
          <Popover
            onClickOutside={() => showPopUP(false)}
            isOpen={popUp}
            positions={["bottom"]} // preferred positions by priority
            content={
              <div>
                <div
                  key={20}
                  id="dropdown"
                  className={`z-10 ${
                    mode === "dark" ? "bg-lightDark" : "bg-white"
                  } divide-y divide-gray-100 rounded-md shadow-sm px-2`}
                  style={{ minWidth: "11rem" }}
                >
                  <ul
                    key={28}
                    className="py-2 text-[10px] font-medium"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li className="border-start-0 w-full">
                      <button
                        onClick={() => {
                          // showDetails();
                          // navigate(`repository/list/${data?.id}`);
                          showPopUP(false);
                        }}
                        className="text-start w-full text-[12px] p-4 border-bottom  font-medium"
                      >
                        View all policy
                      </button>
                    </li>
                    <li className="border-start-0">
                      <button
                        onClick={() => {
                          // setDelete();
                          showPopUP(false);
                        }}
                        className="text-start p-4 text-[12px] border-bottom font-medium"
                      >
                        View Custom policy
                      </button>
                    </li>
                    <li className="border-start-0">
                      <button
                        onClick={() => {
                          // showDetails();
                          // navigate(`repository/list/${data?.id}`);
                          showPopUP(false);
                        }}
                        className="text-start p-4 text-[12px] font-medium"
                      >
                        View standard policy
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            }
          >
            <button
              onClick={() => showPopUP(true)}
              className="flex text-[10px] md:text-[12px] font-medium items-center gap-3 border-start border-end px-[16px]"
            >
              <p>View all policy</p>
              <svg
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.5 7.25L9 11.75L13.5 7.25"
                  stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </Popover>

          <button
            onClick={() => navigate("/monitoring/policies-and-ruleset/new")}
            className="rounded-full text-white px-[24px] py-[8px] flex font-medium items-center justify-center gap-2 bg-[#284CB3] text-White"
          >
            <p>Create New policy</p>
            <svg
              width="10"
              height="9"
              viewBox="0 0 10 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 0C5.27614 0 5.5 0.223858 5.5 0.5V4H9C9.27614 4 9.5 4.22386 9.5 4.5C9.5 4.77614 9.27614 5 9 5H5.5V8.5C5.5 8.77614 5.27614 9 5 9C4.72386 9 4.5 8.77614 4.5 8.5V5H1C0.723858 5 0.5 4.77614 0.5 4.5C0.5 4.22386 0.723858 4 1 4H4.5V0.5C4.5 0.223858 4.72386 0 5 0Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
        {policies.map((policy) => (
          <PolicyCard data={policy} key={policy?.title} mode={mode} />
        ))}
      </div>
    </div>
  );
};

export default PolicyIndex;
