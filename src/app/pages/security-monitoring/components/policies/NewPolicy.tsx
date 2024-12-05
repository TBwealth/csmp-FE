import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import modeAtomsAtom from "../../../../atoms/modeAtoms.atom";
import { useRecoilValue } from "recoil";
import awsLight from "../../../../../../public/media/logos/aws-logo.svg";

const ScanCard = ({ data, mode, handleCheck }: any) => {
  return (
    <div
      className={`grid grid-cols-7 p-[12px] mb-[8px] place-content-center border-bottom  ${
        mode === "dark" ? "bg-lightDark" : data?.isChecked ?  "bg-[#F9FBFF]" : "bg-white"
      }`}
    >
      <div className="col-span-2 flex items-center gap-[8px]">
        <input
          type="checkbox"
          name="all"
          id="all"
          checked={data?.isChecked}
          className="w-5 h-5 border-0 outline-none"
          onChange={handleCheck}
        />

        <p
          className={`font-semibold flex text-[12px] items-center justify-start ${
            mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
          }`}
        >
          {data?.rule_name}
        </p>
      </div>
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
      <p
        className={`font-medium flex text-[12px] items-center justify-start ${
          mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
        }`}
      >
        {data?.desc}
      </p>
    </div>
  );
};

const NewPolicy = () => {
  const navigate = useNavigate();
  const { mode } = useRecoilValue(modeAtomsAtom);
  const [allchecked, setAllChecked] = useState(false);
  const [selectedRules, setSelectedRules] = useState<any[]>([]);
  const [allHistory, setAllHistory] = useState<any[]>([
    {
      rule_name: "ISO EAC 27001 system check",
      cloud_provider: "Amazon",
      severity: "High",
      services: "Ec2 Instance",
      rule_type: "Type",
      desc: "This is a system check for all EC2 instances. Cloud Regions in America",
      id: 0,
      isChecked: false,
    },
    {
      rule_name: "Cloud Conformity Custom Policy Version",
      cloud_provider: "Amazon",
      severity: "Low",
      services: "S3 Bucket",
      rule_type: "Type",
      desc: "Conformity rules for s3 Bucket only",
      id: 1,
      isChecked: false,
    },
    {
      rule_name: "Cloud Conformity Custom Policy Version",
      cloud_provider: "Amazon",
      severity: "Low",
      services: "S3 Bucket",
      rule_type: "Type",
      desc: "Conformity rules for s3 Bucket only",
      id: 2,
      isChecked: false,
    },
  ]);
  const [newPolicy, setNewPolicy] = useState({
    policy_name: "",
    description: "",
  });

  const handleSetChecked = (e: any) => {
    setAllHistory(
      allHistory?.map((hist) => {
        if (e === hist?.id) {
          return {
            ...hist,
            isChecked: !hist?.isChecked,
          };
        }
        return hist;
      })
    );
    if (selectedRules.includes(e)) {
      setSelectedRules(selectedRules.filter((rule) => rule !== e));
    } else {
      setSelectedRules([...selectedRules, e]);
    }
  };

  return (
    <div className="px-8 mt-[32px] w-full">
      <div className="flex items-center justify-between flex-row gap-[16px] mb-[27px]">
        <div className="flex items-center flex-row gap-[16px]">
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
            <h1 className="font-semibold text-[14px]">New Cloud Policy</h1>
          </div>
          <p
            className={`${
              mode === "dark"
                ? "text-[#EAEAEA]"
                : "text-[#6A6A6A] border-end font-medium text-[12px] pr-[16px] py-[2px]"
            }`}
          >
            Custom Policy
          </p>
        </div>
        <button
          // onClick={showModal}
          disabled={
            !newPolicy.description ||
            !newPolicy.policy_name ||
            selectedRules.length === 0
          }
          className={`rounded-full text-white px-[24px] py-[8px] flex font-medium items-center justify-center gap-2 ${
            !newPolicy.description ||
            !newPolicy.policy_name ||
            selectedRules.length === 0
              ? "bg-[#284CB3]/40"
              : "bg-[#284CB3]"
          } text-White`}
        >
          <p>Save Policy</p>
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.97953 8.81442C3.17479 8.61915 3.49137 8.61915 3.68664 8.81442L5.99975 11.1275L12.3129 4.81442C12.5081 4.61915 12.8247 4.61915 13.02 4.81442C13.2152 5.00968 13.2152 5.32626 13.02 5.52152L6.3533 12.1882C6.15804 12.3835 5.84146 12.3835 5.6462 12.1882L2.97953 9.52152C2.78427 9.32626 2.78427 9.00968 2.97953 8.81442Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
      <div className="flex items-center flex-col md:flex-row gap-[24px] mb-[50px]">
        <div className="rounded-full bg-[#284CB31A] p-[24px]">
          <svg
            width="32"
            height="33"
            viewBox="0 0 32 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.667 24.5L14.667 28.5L21.3337 21.8333"
              stroke="#284CB3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M26.6663 23.9776C28.658 23.1975 30.6663 21.4198 30.6663 17.8346C30.6663 12.5013 26.2219 11.168 23.9997 11.168C23.9997 8.5013 23.9997 3.16797 15.9997 3.16797C7.99967 3.16797 7.99967 8.5013 7.99967 11.168C5.77745 11.168 1.33301 12.5013 1.33301 17.8346C1.33301 21.4198 3.34138 23.1975 5.33301 23.9776"
              stroke="#284CB3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="w-full flex items-center gap-[24px] flex-col md:flex-row">
          <div className="w-full">
            <label
              htmlFor="policy_name"
              className="font-semibold text-start text-[14px] mb-[8px]"
            >
              Policy name
            </label>
            <input
              type="text"
              name="policy_name"
              placeholder="Enter policy name"
              id="policy_name"
              value={newPolicy.policy_name}
              onChange={(e) =>
                setNewPolicy({ ...newPolicy, policy_name: e.target.value })
              }
              className="form-control bg-white"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="description"
              className="font-semibold text-start text-[14px] mb-[8px]"
            >
              Description
            </label>
            <input
              type="text"
              placeholder="Enter description"
              name="description"
              value={newPolicy.description}
              onChange={(e) =>
                setNewPolicy({ ...newPolicy, description: e.target.value })
              }
              id="description"
              className="form-control bg-white"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-[8px] mb-[24px]">
        <p className="font-medium text-[14px] text-start">
          Add rules and benchmark
        </p>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_2284_29765)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9 5.4375C9.31066 5.4375 9.5625 5.68934 9.5625 6V8.4375H12C12.3107 8.4375 12.5625 8.68934 12.5625 9C12.5625 9.31066 12.3107 9.5625 12 9.5625H9.5625V12C9.5625 12.3107 9.31066 12.5625 9 12.5625C8.68934 12.5625 8.4375 12.3107 8.4375 12V9.5625H6C5.68934 9.5625 5.4375 9.31066 5.4375 9C5.4375 8.68934 5.68934 8.4375 6 8.4375H8.4375V6C8.4375 5.68934 8.68934 5.4375 9 5.4375Z"
              fill={mode === "dark" ? "#EAEAEA" : "#373737"}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9 2.0625C5.16852 2.0625 2.0625 5.16852 2.0625 9C2.0625 12.8315 5.16852 15.9375 9 15.9375C12.8315 15.9375 15.9375 12.8315 15.9375 9C15.9375 5.16852 12.8315 2.0625 9 2.0625ZM0.9375 9C0.9375 4.5472 4.5472 0.9375 9 0.9375C13.4528 0.9375 17.0625 4.5472 17.0625 9C17.0625 13.4528 13.4528 17.0625 9 17.0625C4.5472 17.0625 0.9375 13.4528 0.9375 9Z"
              fill={mode === "dark" ? "#EAEAEA" : "#373737"}
            />
          </g>
          <defs>
            <clipPath id="clip0_2284_29765">
              <rect width="18" height="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <div className="flex-1 border-bottom border"></div>
      </div>
      <div
        className={`grid grid-cols-7 p-[12px] h-[45px] rounded-t-[16px] mb-[8px] border-bottom  ${
          mode === "dark" ? "bg-lightDark" : "bg-white"
        }`}
      >
        <div className="col-span-2 flex items-center gap-[8px]">
          <input
            type="checkbox"
            name="all"
            id="all"
            checked={allchecked}
            className="w-5 h-5 border-0 outline-none"
            onChange={(e) => {
              setAllChecked(e.target.checked);
              if (e.target.checked) {
                const allIds = allHistory.map((hist) => hist?.id);
                setSelectedRules(allIds);
                setAllHistory(
                  allHistory?.map((hist) => {
                    return {
                      ...hist,
                      isChecked: true,
                    };
                  })
                );
              } else {
                setSelectedRules([]);
                setAllHistory(
                  allHistory?.map((hist) => {
                    return {
                      ...hist,
                      isChecked: false,
                    };
                  })
                );
              }
            }}
          />
          <p className="text-start font-semibold text-[12px]">Rule Name</p>
        </div>
        <p className="text-center font-semibold text-[12px]">Cloud Provider</p>
        <p className="text-center font-semibold text-[12px]">Severity</p>
        <p className="text-center font-semibold text-[12px]">Services</p>
        <p className="text-center font-semibold text-[12px]">Rule type</p>
        <p className="text-start font-semibold text-[12px]">Description</p>
      </div>
      {allHistory.map((hist) => (
        <ScanCard
          data={hist}
          mode={mode}
          key={hist?.id}
          isAllChecked={allchecked}
          handleCheck={() => handleSetChecked(hist?.id)}
        />
      ))}
    </div>
  );
};

export default NewPolicy;
