import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import modeAtomsAtom from "../../../atoms/modeAtoms.atom";

const Notification = () => {
  const { mode } = useRecoilValue(modeAtomsAtom);
  const [newsChecked, setNewsChecked] = useState(false);
  const [tipChecked, setTipChecked] = useState(false);
  return (
    <div className="mt-[32px] w-full md:mx-auto md:w-[70%]">
      <div
        className={`rounded-[16px] p-[32px] mb-[32px] border ${
          mode === "dark" ? "bg-lightDark" : "bg-white"
        }`}
      >
        <div className="flex items-center py-[16px] justify-between">
          <div className="flex items-center gap-[8px]">
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
                d="M5.40769 3.02117C6.35388 2.01191 7.64524 1.4375 9.00004 1.4375C10.3548 1.4375 11.6462 2.01191 12.5924 3.02117C13.5374 4.02921 14.0625 5.38907 14.0625 6.8C14.0625 9.52291 14.609 11.2332 15.1259 12.2439C15.3848 12.7503 15.6388 13.086 15.819 13.289C15.9093 13.3906 15.9815 13.4594 16.0271 13.4999C16.0499 13.5202 16.0661 13.5334 16.0746 13.5402L16.0811 13.5453C16.2769 13.6878 16.3597 13.9399 16.2859 14.1711C16.2114 14.4042 15.9948 14.5625 15.75 14.5625H2.25004C2.0053 14.5625 1.78864 14.4042 1.71419 14.1711C1.64038 13.9399 1.72316 13.6878 1.91897 13.5452L1.92551 13.5402C1.93402 13.5334 1.95021 13.5202 1.97301 13.4999C2.01861 13.4594 2.09077 13.3906 2.18103 13.289C2.36126 13.086 2.61525 12.7503 2.87422 12.2439C3.39106 11.2332 3.93754 9.52291 3.93754 6.8C3.93754 5.38907 4.46266 4.02921 5.40769 3.02117ZM14.5209 13.4375C14.3918 13.2428 14.2575 13.0168 14.1242 12.7561C13.5161 11.5668 12.9375 9.67709 12.9375 6.8C12.9375 5.66485 12.5145 4.58292 11.7717 3.7906C11.03 2.99952 10.0322 2.5625 9.00004 2.5625C7.96789 2.5625 6.97007 2.99952 6.22842 3.7906C5.48563 4.58292 5.06254 5.66485 5.06254 6.8C5.06254 9.67709 4.48401 11.5668 3.87586 12.7561C3.74256 13.0168 3.60831 13.2428 3.47918 13.4375H14.5209ZM1.92335 13.5421C1.92335 13.5421 1.92335 13.5421 1.92334 13.5421L1.92295 13.5424L1.92268 13.5426L1.9226 13.5426C1.92272 13.5425 1.92283 13.5425 1.92295 13.5424C1.92308 13.5423 1.92322 13.5422 1.92335 13.5421Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.42097 15.7635C7.68969 15.6076 8.0339 15.6991 8.18978 15.9678C8.27219 16.1099 8.39048 16.2278 8.5328 16.3098C8.67512 16.3918 8.83648 16.4349 9.00072 16.4349C9.16496 16.4349 9.32632 16.3918 9.46864 16.3098C9.61096 16.2278 9.72924 16.1099 9.81165 15.9678C9.96754 15.6991 10.3117 15.6076 10.5805 15.7635C10.8492 15.9194 10.9407 16.2636 10.7848 16.5323C10.6035 16.8449 10.3432 17.1043 10.0301 17.2847C9.71703 17.465 9.36205 17.5599 9.00072 17.5599C8.63939 17.5599 8.2844 17.465 7.9713 17.2847C7.65819 17.1043 7.39796 16.8449 7.21666 16.5323C7.06077 16.2636 7.15225 15.9194 7.42097 15.7635Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
            </svg>
            <h1 className="font-semibold text-start text-[18px]">
              Notification Preference
            </h1>
          </div>
          <div className="flex items-center gap-[24px]">
            <div className="border-end pr-[24px]">
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
                  d="M3.28203 6.93798C3.45435 6.6795 3.80359 6.60965 4.06208 6.78197L7.12506 8.82396L10.188 6.78197C10.4465 6.60965 10.7958 6.6795 10.9681 6.93798C11.1404 7.19647 11.0706 7.5457 10.8121 7.71803L7.43708 9.96803C7.24814 10.094 7.00199 10.094 6.81304 9.96803L3.43804 7.71803C3.17956 7.54571 3.10971 7.19647 3.28203 6.93798Z"
                  fill={mode === "dark" ? "#EAEAEA" : "black"}
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.25 4.8125C1.73223 4.8125 1.3125 5.23223 1.3125 5.75V13.25C1.3125 13.7678 1.73223 14.1875 2.25 14.1875H12.75C13.0607 14.1875 13.3125 14.4393 13.3125 14.75C13.3125 15.0607 13.0607 15.3125 12.75 15.3125H2.25C1.11091 15.3125 0.1875 14.3891 0.1875 13.25V5.75C0.1875 4.61091 1.11091 3.6875 2.25 3.6875H12C13.1391 3.6875 14.0625 4.61091 14.0625 5.75V7.25C14.0625 7.56066 13.8107 7.8125 13.5 7.8125C13.1893 7.8125 12.9375 7.56066 12.9375 7.25V5.75C12.9375 5.23223 12.5178 4.8125 12 4.8125H2.25Z"
                  fill={mode === "dark" ? "#EAEAEA" : "black"}
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.6477 11.3977C17.8674 11.1781 17.8674 10.8219 17.6477 10.6023L15.3977 8.35225C15.1781 8.13258 14.8219 8.13258 14.6023 8.35225C14.3826 8.57192 14.3826 8.92808 14.6023 9.14775L15.892 10.4375H12.75C12.4393 10.4375 12.1875 10.6893 12.1875 11C12.1875 11.3107 12.4393 11.5625 12.75 11.5625H15.892L14.6023 12.8523C14.3826 13.0719 14.3826 13.4281 14.6023 13.6477C14.8219 13.8674 15.1781 13.8674 15.3977 13.6477L17.6477 11.3977Z"
                  fill={mode === "dark" ? "#EAEAEA" : "black"}
                />
              </svg>
            </div>
            <div className="">
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
                  d="M0.9375 16.25C0.9375 15.9393 1.18934 15.6875 1.5 15.6875L12.75 15.6875C13.0607 15.6875 13.3125 15.9393 13.3125 16.25C13.3125 16.5607 13.0607 16.8125 12.75 16.8125L1.5 16.8125C1.18934 16.8125 0.9375 16.5607 0.9375 16.25Z"
                  fill={mode === "dark" ? "#EAEAEA" : "black"}
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.1875 16.25C15.1875 15.9393 15.4393 15.6875 15.75 15.6875L16.5 15.6875C16.8107 15.6875 17.0625 15.9393 17.0625 16.25C17.0625 16.5607 16.8107 16.8125 16.5 16.8125L15.75 16.8125C15.4393 16.8125 15.1875 16.5607 15.1875 16.25Z"
                  fill={mode === "dark" ? "#EAEAEA" : "black"}
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.0625 3.3125V12.6875H15.9375V3.3125H2.0625ZM0.9375 3.2C0.9375 2.64081 1.39081 2.1875 1.95 2.1875H16.05C16.6092 2.1875 17.0625 2.64081 17.0625 3.2V12.8C17.0625 13.3592 16.6092 13.8125 16.05 13.8125H1.95C1.39081 13.8125 0.9375 13.3592 0.9375 12.8V3.2Z"
                  fill={mode === "dark" ? "#EAEAEA" : "black"}
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex py-[32px] border-bottom items-center justify-between">
          <div className="">
            <h1 className="font-semibold text-[14px] text-start mb-[8px]">
              Security Alerts
            </h1>
            <p
              className={`font-medium text-start text-[12px] ${
                mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
              }`}
            >
              Notify users when high or critical vulnerabilities are found in
              cloud resources or IaC templates.
            </p>
          </div>
          <div className="flex items-center gap-[24px]">
            <div className="border-end pr-[24px]">
              <input type="checkbox" name="" id="" className="w-5 h-5" defaultChecked/>
            </div>
            <div className="">
              <input type="checkbox" name="" id="" className="w-5 h-5" defaultChecked/>
            </div>
          </div>
        </div>
        <div className="flex py-[32px] border-bottom items-center justify-between">
          <div className="">
            <h1 className="font-semibold text-[14px] text-start mb-[8px]">
              Compliance Violations
            </h1>
            <p
              className={`font-medium text-start text-[12px] ${
                mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
              }`}
            >
              Alerts when a resource violates compliance rules (e.g.,
              non-compliance with PCI-DSS, GDPR, etc.)
            </p>
          </div>
          <div className="flex items-center gap-[24px]">
            <div className="border-end pr-[24px]">
              <input type="checkbox" name="" id="" className="w-5 h-5" defaultChecked/>
            </div>
            <div className="">
              <input type="checkbox" name="" id="" className="w-5 h-5" defaultChecked/>
            </div>
          </div>
        </div>
        <div className="flex py-[32px] border-bottom items-center justify-between">
          <div className="">
            <h1 className="font-semibold text-[14px] text-start mb-[8px]">
            Account or Resource Changes
            </h1>
            <p
              className={`font-medium text-start text-[12px] ${
                mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
              }`}
            >
              Alerts when new cloud resources are added, removed, or modified (e.g., new instances, containers, or services are deployed).
            </p>
          </div>
          <div className="flex items-center gap-[24px]">
            <div className="border-end pr-[24px]">
              <input type="checkbox" name="" id="" className="w-5 h-5" defaultChecked/>
            </div>
            <div className="">
              <input type="checkbox" name="" id="" className="w-5 h-5" defaultChecked/>
            </div>
          </div>
        </div>
        <div className="flex py-[32px] border-bottom items-center justify-between">
          <div className="">
            <h1 className="font-semibold text-[14px] text-start mb-[8px]">
            Scan completion 
            </h1>
            <p
              className={`font-medium text-start text-[12px] ${
                mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
              }`}
            >
              Notify when scans are successfully completed and reports are ready to view.
            </p>
          </div>
          <div className="flex items-center gap-[24px]">
            <div className="border-end pr-[24px]">
              <input type="checkbox" name="" id="" className="w-5 h-5" defaultChecked/>
            </div>
            <div className="">
              <input type="checkbox" name="" id="" className="w-5 h-5" defaultChecked/>
            </div>
          </div>
        </div>
        <div className="flex py-[32px] items-center justify-between">
          <div className="">
            <h1 className="font-semibold text-[14px] text-start mb-[8px]">
            Credential Expiry Alerts 
            </h1>
            <p
              className={`font-medium text-start text-[12px] ${
                mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
              }`}
            >
              Notify users when high or critical vulnerabilities are found in cloud resources or IaC templates.
            </p>
          </div>
          <div className="flex items-center gap-[24px]">
            <div className="border-end pr-[24px]">
              <input type="checkbox" name="" id="" className="w-5 h-5" defaultChecked/>
            </div>
            <div className="">
              <input type="checkbox" name="" id="" className="w-5 h-5" defaultChecked/>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`rounded-[16px] p-[32px] border ${
          mode === "dark" ? "bg-lightDark" : "bg-white"
        }`}
      >
        <div className="flex items-center py-[16px] justify-between">
          <div className="flex items-center gap-[8px]">
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
                d="M5.40769 3.02117C6.35388 2.01191 7.64524 1.4375 9.00004 1.4375C10.3548 1.4375 11.6462 2.01191 12.5924 3.02117C13.5374 4.02921 14.0625 5.38907 14.0625 6.8C14.0625 9.52291 14.609 11.2332 15.1259 12.2439C15.3848 12.7503 15.6388 13.086 15.819 13.289C15.9093 13.3906 15.9815 13.4594 16.0271 13.4999C16.0499 13.5202 16.0661 13.5334 16.0746 13.5402L16.0811 13.5453C16.2769 13.6878 16.3597 13.9399 16.2859 14.1711C16.2114 14.4042 15.9948 14.5625 15.75 14.5625H2.25004C2.0053 14.5625 1.78864 14.4042 1.71419 14.1711C1.64038 13.9399 1.72316 13.6878 1.91897 13.5452L1.92551 13.5402C1.93402 13.5334 1.95021 13.5202 1.97301 13.4999C2.01861 13.4594 2.09077 13.3906 2.18103 13.289C2.36126 13.086 2.61525 12.7503 2.87422 12.2439C3.39106 11.2332 3.93754 9.52291 3.93754 6.8C3.93754 5.38907 4.46266 4.02921 5.40769 3.02117ZM14.5209 13.4375C14.3918 13.2428 14.2575 13.0168 14.1242 12.7561C13.5161 11.5668 12.9375 9.67709 12.9375 6.8C12.9375 5.66485 12.5145 4.58292 11.7717 3.7906C11.03 2.99952 10.0322 2.5625 9.00004 2.5625C7.96789 2.5625 6.97007 2.99952 6.22842 3.7906C5.48563 4.58292 5.06254 5.66485 5.06254 6.8C5.06254 9.67709 4.48401 11.5668 3.87586 12.7561C3.74256 13.0168 3.60831 13.2428 3.47918 13.4375H14.5209ZM1.92335 13.5421C1.92335 13.5421 1.92335 13.5421 1.92334 13.5421L1.92295 13.5424L1.92268 13.5426L1.9226 13.5426C1.92272 13.5425 1.92283 13.5425 1.92295 13.5424C1.92308 13.5423 1.92322 13.5422 1.92335 13.5421Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.42097 15.7635C7.68969 15.6076 8.0339 15.6991 8.18978 15.9678C8.27219 16.1099 8.39048 16.2278 8.5328 16.3098C8.67512 16.3918 8.83648 16.4349 9.00072 16.4349C9.16496 16.4349 9.32632 16.3918 9.46864 16.3098C9.61096 16.2278 9.72924 16.1099 9.81165 15.9678C9.96754 15.6991 10.3117 15.6076 10.5805 15.7635C10.8492 15.9194 10.9407 16.2636 10.7848 16.5323C10.6035 16.8449 10.3432 17.1043 10.0301 17.2847C9.71703 17.465 9.36205 17.5599 9.00072 17.5599C8.63939 17.5599 8.2844 17.465 7.9713 17.2847C7.65819 17.1043 7.39796 16.8449 7.21666 16.5323C7.06077 16.2636 7.15225 15.9194 7.42097 15.7635Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
            </svg>
            <h1 className="font-semibold text-start text-[18px]">
            Newsletters and Updates
            </h1>
          </div>
        </div>
        <div className="flex py-[32px] border-bottom items-center justify-between">
          <div className="">
            <h1 className="font-semibold text-[14px] text-start mb-[8px]">
            Monthly Newsletter
            </h1>
            <p
              className={`font-medium text-start text-[12px] md:w-[80%] ${
                mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
              }`}
            >
              General Newsletter is sent out about once a month and contains information about new features and other relevant cloud accord news
            </p>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              value=""
              onChange={(e) => {
                setNewsChecked(e.target.checked);
                // handleChecked("all", !checkAll);
              }}
            />
            <div
              className={`relative w-11 h-6 rounded-full peer after:content-[''] after:absolute after:top-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${
                newsChecked
                  ? "bg-[#4470EF] after:end-[2px]"
                  : "bg-[#D1D1D6] after:start-[2px]"
              }`}
            ></div>
          </label>
        </div>
        <div className="flex py-[32px] items-center justify-between">
          <div className="">
            <h1 className="font-semibold text-[14px] text-start mb-[8px]">
            Tips and security updates
            </h1>
            <p
              className={`font-medium text-start text-[12px] ${
                mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
              }`}
            >
              This email notify you about latest security update and information of trends in ensuring cloud security
            </p>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              value=""
              onChange={(e) => {
                setTipChecked(e.target.checked);
                // handleChecked("all", !checkAll);
              }}
            />
            <div
              className={`relative w-11 h-6 rounded-full peer after:content-[''] after:absolute after:top-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${
                tipChecked
                  ? "bg-[#4470EF] after:end-[2px]"
                  : "bg-[#D1D1D6] after:start-[2px]"
              }`}
            ></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Notification;
