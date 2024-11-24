import React, { useState } from "react";
import { IoShield } from "react-icons/io5";

type Props = {
  mode: string;
  goBack: any;
};

const DeletAccount = ({ mode, goBack }: Props) => {
  const [loading, setLoading] = useState(false);
  const [inpValue, setInpValue] = useState("");
  return (
    <div
      className={`rounded-[16px] p-[32px] border ${
        mode === "dark" ? "bg-lightDark" : "bg-white"
      }`}
    >
      <div className="flex items-center pb-[16px] border-bottom gap-[16px]">
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
        <h1 className="font-semibold text-[18px]">Delete Account</h1>
      </div>
      <div className="my-[32px]">
        <div className="flex items-center gap-[8px] mb-[32px]">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.61617 3.64483C10.6736 1.80589 13.3268 1.80589 14.3841 3.64483L22.4271 17.6326C23.4813 19.4659 22.1579 21.7534 20.0431 21.7534H3.95721C1.84242 21.7534 0.519055 19.4659 1.57322 17.6326L9.61617 3.64483ZM12 8.25293C12.4142 8.25293 12.75 8.58872 12.75 9.00293V13.0029C12.75 13.4171 12.4142 13.7529 12 13.7529C11.5858 13.7529 11.25 13.4171 11.25 13.0029V9.00293C11.25 8.58872 11.5858 8.25293 12 8.25293ZM12.5675 17.5037C12.8446 17.1958 12.8196 16.7216 12.5117 16.4445C12.2038 16.1674 11.7296 16.1924 11.4525 16.5002L11.4425 16.5113C11.1654 16.8192 11.1904 17.2934 11.4983 17.5705C11.8062 17.8476 12.2804 17.8227 12.5575 17.5148L12.5675 17.5037Z"
              fill="#FF161A"
            />
          </svg>
          <p
            className={`font-medium text-start text-[12px] ${
              mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
            }`}
          >
            Deleting your account has consequences and can’t be reversed. Think
            carefully before doing this!!! If you need further assistance or
            would like have an issue resolve kindly contact our support center
          </p>
        </div>
        <div className="w-full bg-[#284CB31A] rounded-[8px] p-[16px] mb-[32px] flex items-center justify-between flex-col md:flex-row">
          <h1 className="font-semibold text-[16px]">
            384A-JHU8-8374-02930- <i>{`{YOUR PASSWORD}`}</i>
          </h1>
          <button>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_2370_29783)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.833008 8.0026C0.833008 4.04456 4.04163 0.835938 7.99967 0.835938C11.9577 0.835938 15.1663 4.04456 15.1663 8.0026C15.1663 11.9606 11.9577 15.1693 7.99967 15.1693C4.04163 15.1693 0.833008 11.9606 0.833008 8.0026ZM7.99967 7.16927C8.27582 7.16927 8.49967 7.39313 8.49967 7.66927V11.0026C8.49967 11.2787 8.27582 11.5026 7.99967 11.5026C7.72353 11.5026 7.49967 11.2787 7.49967 11.0026V7.66927C7.49967 7.39313 7.72353 7.16927 7.99967 7.16927ZM8.37799 5.33644C8.56272 5.13119 8.54608 4.81504 8.34083 4.63031C8.13557 4.44558 7.81943 4.46222 7.6347 4.66747L7.62803 4.67488C7.4433 4.88014 7.45994 5.19628 7.6652 5.38101C7.87045 5.56574 8.1866 5.5491 8.37133 5.34385L8.37799 5.33644Z"
                  fill="#6A6A6A"
                />
              </g>
              <defs>
                <clipPath id="clip0_2370_29783">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
        <div className="w-full">
          <label className="flex font-medium text-[14px] items-center gap-[12px] mb-[8px]">
            <IoShield />
            <span>Input key to delete account</span>
          </label>
          <input
            type="text"
            name="key"
            id="key"
            value={inpValue}
            onChange={(e) => setInpValue(e.target.value)}
            placeholder="Passphrase"
            className="w-full rounded-[8px] font-medium text-[14px] border p-[12px]"
          />
        </div>
      </div>
      <button
        type="submit"
        id="kt_sign_up_submit"
        className={`py-[8px] px-[24px] ${inpValue.length < 10 ? "bg-[#284CB3]/50" : "bg-primary"}  font-medium text-white flex items-center justify-center rounded-full`}
        disabled={!inpValue || inpValue.length < 10}
      >
        {!loading && (
          <span className="indicator-label flex items-center gap-3">
            <p>Delete Account</p>
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
                d="M13.4203 6.00764C13.6923 6.05546 13.874 6.3147 13.8262 6.58667L12.4962 14.1508C12.4962 14.1509 12.4962 14.1509 12.4962 14.1509C12.3421 15.0275 11.5806 15.6667 10.6906 15.6667H5.31024C4.42019 15.6667 3.65873 15.0275 3.5046 14.1509L2.17463 6.58667C2.12681 6.3147 2.30852 6.05546 2.58049 6.00764C2.85246 5.95982 3.1117 6.14153 3.15952 6.4135L4.48949 13.9777C4.55956 14.3762 4.90569 14.6667 5.31024 14.6667H10.6906C11.0951 14.6667 11.4413 14.3762 11.5113 13.9777L11.5113 13.9777L12.8413 6.4135C12.8891 6.14153 13.1484 5.95982 13.4203 6.00764Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.08333 2.33594C6.6231 2.33594 6.25 2.70903 6.25 3.16927V4.0026H9.75V3.16927C9.75 2.70903 9.37692 2.33594 8.91667 2.33594H7.08333ZM5.25 4.0026V3.16927C5.25 2.15675 6.07081 1.33594 7.08333 1.33594H8.91667C9.92921 1.33594 10.75 2.15675 10.75 3.16927V4.0026H14C14.2761 4.0026 14.5 4.22646 14.5 4.5026C14.5 4.77875 14.2761 5.0026 14 5.0026H2C1.72386 5.0026 1.5 4.77875 1.5 4.5026C1.5 4.22646 1.72386 4.0026 2 4.0026H5.25Z"
                fill="white"
              />
            </svg>
          </span>
        )}
        {loading && (
          <span className="indicator-progress" style={{ display: "block" }}>
            Please wait...{" "}
            <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
          </span>
        )}
      </button>
    </div>
  );
};

export default DeletAccount;
