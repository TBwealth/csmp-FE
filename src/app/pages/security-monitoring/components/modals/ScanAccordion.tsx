import React, { useState } from "react";
import modeAtomsAtom from "../../../../atoms/modeAtoms.atom";
import { useRecoilValue } from "recoil";
import ResolveModal from "./ResolveModal";
type Props = {
  name: string;
  status: string;
  region: string;
  service: string;
  severity?: string;
  remediation: string;
  message: string;
  description: string;
  provider: string;
};

const ScanAccordion = ({data}: any) => {
  const { mode } = useRecoilValue(modeAtomsAtom);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ticketOpen, setTicketOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="w-full">
      <button
        className={`grid grid-cols-7 border-bottom h-[52px] place-content-center ${
          mode === "dark" ? "bg-lightDark" : "bg-white"
        } p-4 w-full mb-3`}
        onClick={() => {
          // setIsOpen(!isOpen);
          setIsChecked(!isChecked);
        }}
      >
        <div className=" col-span-3 flex items-center gap-5">
          <input
            type="checkbox"
            checked={isChecked}
            className="h-5 w-5 rounded-md border"
          />
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 3.3335H7.33333"
              stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 8H10.6667"
              stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12.6665H14"
              stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="font-semibold text-[14px]">{data?.resource ? data?.resource : "N/A"}</p>
        </div>
        <p className={`font-medium text-[14px] ${mode === "dark" ? "text-[#909BBC]": "text-[#373737]"}`}>{data?.service ? data?.service : "N/A"}</p>
        <p className={data?.status_code ? `${data?.status_code.toLowerCase().includes("fail") ? "text-[#FF161A]" : "text-[#2AB849]"} font-medium text-center` : "N/A"}>
          {data?.status_code}
        </p>
        <p className="font-medium col-span-2 text-center">
          {data?.finding_desc ? data?.finding_desc : "N/A"}
        </p>
      </button>
      {/* {isOpen && (
        <div
          className={`w-full font-medium md:pl-8 p-10 my-2 shadow-sm ${
            mode === "dark" ? "bg-lightDark" : "bg-white"
          }`}
        >
          <div className="grid grid-cols-3 gap-y-4">
            <p className="font-semibold">Status:</p>
            <p
              className={
                status.toLowerCase() === "fail"
                  ? "text-[#FF161A] col-span-2"
                  : "text-[#2AB849] col-span-2"
              }
            >
              {status.toUpperCase()}
            </p>
            <p className="font-semibold">Message:</p>
            <p className="text-left col-span-2">{message}</p>
            <p className="font-semibold">Description:</p>
            <p className="text-left col-span-2">{description}</p>
            <p className="font-semibold">Region:</p>
            <p className="text-left col-span-2">{region}</p>
          </div>
          <button
            onClick={() => {
              setIsModalOpen(true);
              setIsOpen(false);
              setIsChecked(false);
            }}
            className="bg-[#284CB3] text-white flex items-center justify-center gap-3 rounded-full w-36 px-3 py-2 mt-6"
          >
            <p className="font-medium">Resolve</p>
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
                d="M8.97977 12.813C9.17504 12.6177 9.49162 12.6177 9.68688 12.813L11.3333 14.4594L14.3131 11.4796C14.5084 11.2844 14.825 11.2844 15.0202 11.4796C15.2155 11.6749 15.2155 11.9915 15.0202 12.1867L11.6869 15.5201C11.4916 15.7153 11.175 15.7153 10.9798 15.5201L8.97977 13.5201C8.78451 13.3248 8.78451 13.0082 8.97977 12.813Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.66675 4C2.94289 4 3.16675 4.22386 3.16675 4.5V8.48743C3.16712 8.49079 3.16782 8.49629 3.16906 8.50374C3.1731 8.52798 3.18284 8.57258 3.20567 8.63128C3.25022 8.74584 3.34929 8.92649 3.57548 9.12037C4.03142 9.51118 5.05991 10 7.33341 10C9.60692 10 10.6354 9.51118 11.0914 9.12037C11.3175 8.92649 11.4166 8.74584 11.4612 8.63128C11.484 8.57258 11.4937 8.52798 11.4978 8.50374C11.499 8.49629 11.4997 8.49079 11.5001 8.48743V4.5C11.5001 4.22386 11.7239 4 12.0001 4C12.2762 4 12.5001 4.22386 12.5001 4.5V8.5H12.0001C12.5001 8.5 12.5001 8.50058 12.5001 8.50116L12.5001 8.50238L12.5001 8.50496L12.5 8.51071L12.4996 8.52454C12.4992 8.53478 12.4985 8.54706 12.4974 8.56123C12.4952 8.58957 12.4913 8.62557 12.4842 8.66814C12.47 8.75328 12.4433 8.86492 12.3932 8.99372C12.2919 9.25416 12.0993 9.57351 11.7421 9.87963C11.0314 10.4888 9.72657 11 7.33341 11C4.94025 11 3.63541 10.4888 2.92469 9.87963C2.56754 9.57351 2.37494 9.25416 2.27366 8.99372C2.22357 8.86492 2.19686 8.75328 2.18267 8.66814C2.17557 8.62557 2.1716 8.58957 2.16939 8.56123C2.16829 8.54706 2.16763 8.53478 2.16724 8.52454L2.16685 8.51071L2.16677 8.50496L2.16675 8.50238L2.16675 8.50116C2.16675 8.50058 2.16675 8.5 2.66675 8.5H2.16675V4.5C2.16675 4.22386 2.39061 4 2.66675 4Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.92468 3.12037C3.63541 2.51118 4.94025 2 7.33341 2C9.72657 2 11.0314 2.51118 11.7421 3.12037C12.0993 3.42649 12.2919 3.74584 12.3932 4.00628C12.4433 4.13508 12.47 4.24672 12.4842 4.33186C12.4913 4.37443 12.4952 4.41043 12.4974 4.43877C12.4985 4.45294 12.4992 4.46522 12.4996 4.47546L12.5 4.48929L12.5001 4.49504L12.5001 4.49762L12.5001 4.49884C12.5001 4.49942 12.5001 4.5 12.0001 4.5C12.5001 4.5 12.5001 4.50058 12.5001 4.50116L12.5001 4.50238L12.5001 4.50496L12.5 4.51071L12.4996 4.52454C12.4992 4.53478 12.4985 4.54706 12.4974 4.56123C12.4952 4.58957 12.4913 4.62557 12.4842 4.66814C12.47 4.75328 12.4433 4.86492 12.3932 4.99372C12.2919 5.25416 12.0993 5.57351 11.7421 5.87963C11.0314 6.48882 9.72657 7 7.33341 7C4.94025 7 3.63541 6.48882 2.92468 5.87963C2.56754 5.57351 2.37494 5.25416 2.27366 4.99372C2.22357 4.86492 2.19685 4.75328 2.18266 4.66814C2.17557 4.62557 2.1716 4.58957 2.16939 4.56123C2.16829 4.54706 2.16763 4.53478 2.16724 4.52454L2.16685 4.51071L2.16677 4.50496L2.16675 4.50238L2.16675 4.50116C2.16675 4.50058 2.16675 4.5 2.66675 4.5C2.16675 4.5 2.16675 4.49942 2.16675 4.49884L2.16675 4.49762L2.16677 4.49504L2.16685 4.48929L2.16724 4.47546C2.16763 4.46522 2.16829 4.45294 2.16939 4.43877C2.1716 4.41043 2.17557 4.37443 2.18266 4.33186C2.19685 4.24672 2.22357 4.13508 2.27366 4.00628C2.37494 3.74584 2.56754 3.42649 2.92468 3.12037ZM3.16845 4.5C3.16864 4.50119 3.16884 4.50243 3.16906 4.50374C3.1731 4.52797 3.18284 4.57258 3.20567 4.63128C3.25022 4.74584 3.34929 4.92649 3.57548 5.12037C4.03142 5.51118 5.05991 6 7.33341 6C9.60692 6 10.6354 5.51118 11.0914 5.12037C11.3175 4.92649 11.4166 4.74584 11.4612 4.63128C11.484 4.57258 11.4937 4.52797 11.4978 4.50374C11.498 4.50243 11.4982 4.50119 11.4984 4.5C11.4982 4.49881 11.498 4.49757 11.4978 4.49626C11.4937 4.47203 11.484 4.42742 11.4612 4.36872C11.4166 4.25416 11.3175 4.07351 11.0914 3.87963C10.6354 3.48882 9.60692 3 7.33341 3C5.05991 3 4.03142 3.48882 3.57548 3.87963C3.34929 4.07351 3.25022 4.25416 3.20567 4.36872C3.18284 4.42742 3.1731 4.47203 3.16906 4.49626C3.16884 4.49757 3.16864 4.49881 3.16845 4.5Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.66675 8C2.94289 8 3.16675 8.22386 3.16675 8.5V12.4874C3.16712 12.4908 3.16782 12.4963 3.16906 12.5037C3.1731 12.528 3.18284 12.5726 3.20567 12.6313C3.25022 12.7458 3.34929 12.9265 3.57548 13.1204C4.03142 13.5112 5.05991 14 7.33342 14C7.60956 14 7.83342 14.2239 7.83342 14.5C7.83342 14.7761 7.60956 15 7.33342 15C4.94025 15 3.63541 14.4888 2.92469 13.8796C2.56754 13.5735 2.37494 13.2542 2.27366 12.9937C2.22357 12.8649 2.19686 12.7533 2.18267 12.6681C2.17557 12.6256 2.1716 12.5896 2.16939 12.5612C2.16829 12.5471 2.16763 12.5348 2.16724 12.5245L2.16685 12.5107L2.16677 12.505L2.16675 12.5024L2.16675 12.5012C2.16675 12.5006 2.16675 12.5 2.66675 12.5H2.16675V8.5C2.16675 8.22386 2.39061 8 2.66675 8Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      )} */}
      {/* {isModalOpen && (
        <div className="w-full font-medium flex items-center justify-center h-[100vh] fixed z-[9999999] top-0 left-0 bg-black/70">
          <div
            className={`w-[90%] md:w-[60%] lg:w-[40%] rounded-md ${
              mode === "dark" ? "bg-lightDark" : "bg-white"
            }`}
          >
            <div className="flex font-medium items-end justify-end p-4">
              <button onClick={() => setIsModalOpen(false)}>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.670266 0.670272C0.889936 0.450602 1.24609 0.450602 1.46576 0.670272L4.99999 4.2045L8.53423 0.670272C8.7539 0.450602 9.11005 0.450602 9.32972 0.670272C9.54939 0.889942 9.54939 1.2461 9.32972 1.46577L5.79549 5L9.32972 8.53423C9.54939 8.7539 9.54939 9.11006 9.32972 9.32973C9.11005 9.5494 8.7539 9.5494 8.53423 9.32973L4.99999 5.7955L1.46576 9.32973C1.24609 9.5494 0.889936 9.5494 0.670266 9.32973C0.450596 9.11006 0.450596 8.7539 0.670266 8.53423L4.2045 5L0.670266 1.46577C0.450596 1.2461 0.450596 0.889942 0.670266 0.670272Z"
                    fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                  />
                </svg>
              </button>
            </div>
            <div className="w-full">
              <div className="flex items-center justify-center gap-2 flex-col px-4 pb-2 border-bottom">
                <svg
                  width="42"
                  height="42"
                  viewBox="0 0 42 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="42"
                    height="42"
                    rx="21"
                    fill="#284CB3"
                    fill-opacity="0.05"
                  />
                  <g clip-path="url(#clip0_269_2077)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M21 20.0625C21.3107 20.0625 21.5625 20.3143 21.5625 20.625V24.375C21.5625 24.6857 21.3107 24.9375 21 24.9375C20.6893 24.9375 20.4375 24.6857 20.4375 24.375V20.625C20.4375 20.3143 20.6893 20.0625 21 20.0625Z"
                      fill="#284CB3"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M21.3838 17.2069C21.6147 17.4147 21.6334 17.7704 21.4256 18.0013L21.4181 18.0096C21.2103 18.2405 20.8546 18.2593 20.6237 18.0514C20.3928 17.8436 20.3741 17.488 20.5819 17.257L20.5894 17.2487C20.7972 17.0178 21.1529 16.9991 21.3838 17.2069Z"
                      fill="#284CB3"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M21 14.0625C17.1685 14.0625 14.0625 17.1685 14.0625 21C14.0625 24.8315 17.1685 27.9375 21 27.9375C24.8315 27.9375 27.9375 24.8315 27.9375 21C27.9375 17.1685 24.8315 14.0625 21 14.0625ZM12.9375 21C12.9375 16.5472 16.5472 12.9375 21 12.9375C25.4528 12.9375 29.0625 16.5472 29.0625 21C29.0625 25.4528 25.4528 29.0625 21 29.0625C16.5472 29.0625 12.9375 25.4528 12.9375 21Z"
                      fill="#284CB3"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_269_2077">
                      <rect
                        width="18"
                        height="18"
                        fill="white"
                        transform="translate(12 12)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <p className="font-bold text-xl">
                  {name}
                </p>
              </div>
              <div className="mt-4 font-medium grid md:grid-cols-3 gap-3 pb-2 border-bottom px-4">
                <p className="font-semibold">Status:</p>
                <p className="text-[#FF161A] md:col-span-2">{status}</p>
               
                <p className="font-semibold">Resource:</p>
                <p className="md:col-span-2">{provider}</p>
                <p className="font-semibold">Message:</p>
                <p className="md:col-span-2">
                  {message}
                </p>
                <p className="font-semibold">Description:</p>
                <p className="md:col-span-2">
                  {description}
                </p>
              </div>
              <div className="mt-4 px-4 pb-2">
                <h2 className="text-lg mb-3 font-medium">Remediation</h2>
                <div className="p-4 font-medium rounded-md bg-[#284CB31A] flex items-center gap-2">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.75 13.5H11.25"
                      stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M7.5 15.75H10.5"
                      stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6.74989 11.25C6.75 9.75 6.375 9.375 5.62489 8.625C4.87477 7.875 4.51743 7.11517 4.49989 6C4.4639 3.71271 5.99977 2.25 8.99989 2.25C12 2.25 13.5359 3.71271 13.4999 6C13.4823 7.11517 13.1248 7.875 12.3749 8.625C11.625 9.375 11.25 9.75 11.2499 11.25"
                      stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <p className="w-[90%]">
                    {remediation}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 w-full flex items-end justify-end p-4">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setIsModalOpen(false);
                  setTicketOpen(true);
                  // handleHide();
                }}
              >
                Create Ticket
              </button>
            </div>
          </div>
        </div>
      )} */}
      {ticketOpen && (
        <ResolveModal
          isOpen={ticketOpen}
          editItem={null}
          handleHide={() => {
            setIsModalOpen(false);
            setTicketOpen(false);
          }}
          onClearEdit={() => setTicketOpen(false)}
        />
      )}
    </div>
  );
};

export default ScanAccordion;
