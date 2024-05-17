import React, { Dispatch, useState } from "react";
import { useRecoilValue } from "recoil";
import modeAtomsAtom from "../../../atoms/modeAtoms.atom";
import { Link } from "react-router-dom";

type Props = {
  goBack: Dispatch<void>;
  next: Dispatch<void>;
  handleHide: Dispatch<void>;
};

const StepThree = ({ goBack, next, handleHide }: Props) => {
  const { mode } = useRecoilValue(modeAtomsAtom);
  const [authType, setAuthType] = useState("");

  return (
    <div
      className={`w-[90%] rounded-lg border-2 mx-auto md:w-[68%] ${
        mode === "dark" ? "bg-lightDark" : "bg-[#FFFFFF]"
      }`}
    >
      <div className="flex items-center p-6 justify-between w-full">
        <div className="flex items-center gap-5">
          <button onClick={() => goBack()}>
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
                d="M12.5303 5.46967C12.8232 5.76256 12.8232 6.23744 12.5303 6.53033L7.81066 11.25H18.5C18.9142 11.25 19.25 11.5858 19.25 12C19.25 12.4142 18.9142 12.75 18.5 12.75H7.81066L12.5303 17.4697C12.8232 17.7626 12.8232 18.2374 12.5303 18.5303C12.2374 18.8232 11.7626 18.8232 11.4697 18.5303L5.46967 12.5303C5.17678 12.2374 5.17678 11.7626 5.46967 11.4697L11.4697 5.46967C11.7626 5.17678 12.2374 5.17678 12.5303 5.46967Z"
                fill="black"
              />
            </svg>
          </button>
          <p className="text-[18px] font-semibold text-[#373737]">
            Choose the authentication type
          </p>
          <Link to="/" className="p-3 border-start text-[#6A6A6A] text-[12px]">
            Need help? Click here{" "}
          </Link>
        </div>
        <button onClick={() => handleHide()}>
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.670548 0.670272C0.890218 0.450602 1.24637 0.450602 1.46604 0.670272L5.00028 4.2045L8.53451 0.670272C8.75418 0.450602 9.11033 0.450602 9.33 0.670272C9.54967 0.889942 9.54967 1.2461 9.33 1.46577L5.79577 5L9.33 8.53423C9.54967 8.7539 9.54967 9.11006 9.33 9.32973C9.11033 9.5494 8.75418 9.5494 8.53451 9.32973L5.00028 5.7955L1.46604 9.32973C1.24637 9.5494 0.890218 9.5494 0.670548 9.32973C0.450878 9.11006 0.450879 8.7539 0.670548 8.53423L4.20478 5L0.670548 1.46577C0.450879 1.2461 0.450878 0.889942 0.670548 0.670272Z"
              fill="#373737"
            />
          </svg>
        </button>
      </div>
      <div className="p-6 mt-6">
        <div className="mb-6">
          <label htmlFor="auto" className="flex items-center gap-2">
            <input
              type="radio"
              name="auth-type"
              id="auto"
              value="auto"
              className="w-5 h-5"
              onChange={(e) => {
                setAuthType(e.target.value);
                sessionStorage.setItem("type", e.target.value);
              }}
            />
            <p className="font-semibold text-[14px]">
              Automated setup (recommended)
            </p>
          </label>
          <div className="w-full md:w-[80%] pl-6 text-[#373737] mt-3 text-[14px]">
            Use CloudFormation to enable Cross-Account Access, delegating access
            to your resources from Cloud Conformity account using a predefined
            policy. You can review the CloudFormation template.
          </div>
        </div>
        <div className="">
          <label htmlFor="manual" className="flex items-center gap-2">
            <input
              type="radio"
              name="auth-type"
              id="manual"
              value="manual"
              className="w-5 h-5"
              onChange={(e) => {
                setAuthType(e.target.value);
                sessionStorage.setItem("type", e.target.value);
              }}
            />
            <p className="font-semibold text-[14px]">Manual setup (DIY)</p>
          </label>
          <div className="w-full md:w-[80%] pl-6 text-[#373737] mt-3 text-[14px]">
            Manually setup Cross-Account Access, delegating access to your
            resources from Cloud Conformity account using a custom policy.
          </div>
        </div>
      </div>
      <div className="mt-8 border-top-2 w-full flex p-5 items-end justify-end gap-6">
        <button
          onClick={() => goBack()}
          className="bg-[#284CB3]/40 w-32 rounded-full p-2 text-white text-center"
        >
          Cancel
        </button>
        <button
          disabled={!authType}
          onClick={() => next()}
          className="bg-[#284CB3] w-32 rounded-full p-2 text-white text-center"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default StepThree;
