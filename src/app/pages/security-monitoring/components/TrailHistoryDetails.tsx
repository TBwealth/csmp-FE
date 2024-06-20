import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Tooltip } from "flowbite-react";
import { useRecoilValue } from "recoil";
import modeAtomsAtom from "../../../atoms/modeAtoms.atom";
import { useNavigate, useSearchParams } from "react-router-dom";
import awsImg from "../../../../../public/media/logos/aws-logo.svg";
import { Popover } from "react-tiny-popover";
import { Modal } from "react-bootstrap";

const Card = ({ data, mode, handleCheck, setSelected, setShowModal }: any) => {
  const [openPopup, setOpenPop] = useState(false);
  return (
    <div
      className={`grid grid-cols-10 gap-[8px] p-4 h-[52px] place-content-center border-bottom mb-[8px] w-[350vw] md:w-[180vw] lg:w-[120vw] ${
        mode === "dark" ? "bg-lightDark" : "bg-white"
      }`}
    >
      <div className="flex relative items-center gap-[8px]">
        <Popover
          onClickOutside={() => setOpenPop(false)}
          isOpen={openPopup}
          positions={["bottom", "right"]}
          content={
            <ul
              className={`rounded-[12px] shadow-md ${
                mode === "dark" ? "bg-lightDark " : "bg-white"
              }`}
            >
              <li className="border-start-0 p-0">
                <button
                  onClick={() => {
                    setOpenPop(false);
                    setSelected();
                    setShowModal();
                  }}
                  className="w-full flex items-center py-[16px] px-[30px] gap-[12px] font-medium"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.2372 9.98083C12.7362 4.42306 5.26409 4.42306 2.76309 9.98083C2.63561 10.2641 2.30261 10.3904 2.01931 10.263C1.73601 10.1355 1.6097 9.80247 1.73718 9.51917C4.63619 3.07694 13.3641 3.07694 16.2631 9.51917C16.3906 9.80247 16.2643 10.1355 15.981 10.263C15.6977 10.3904 15.3647 10.2641 15.2372 9.98083Z"
                      fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9 8.8125C9.93198 8.8125 10.6875 9.56802 10.6875 10.5C10.6875 11.432 9.93198 12.1875 9 12.1875C8.06802 12.1875 7.3125 11.432 7.3125 10.5C7.3125 9.56802 8.06802 8.8125 9 8.8125ZM11.8125 10.5C11.8125 8.9467 10.5533 7.6875 9 7.6875C7.4467 7.6875 6.1875 8.9467 6.1875 10.5C6.1875 12.0533 7.4467 13.3125 9 13.3125C10.5533 13.3125 11.8125 12.0533 11.8125 10.5Z"
                      fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                    />
                  </svg>

                  <p className="text-[12px] font-medium">view details</p>
                </button>
              </li>
              <li className="border-start-0 p-0">
                <button
                  onClick={() => {
                    setOpenPop(false);
                  }}
                  className="w-full flex items-center border-top border-bottom py-[16px] px-[30px] gap-[12px] font-medium"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1311_7579)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.85185 8.97725C5.07152 8.75758 5.42767 8.75758 5.64734 8.97725L7.4996 10.8295L12.3518 5.97725C12.5715 5.75758 12.9277 5.75758 13.1473 5.97725C13.367 6.19692 13.367 6.55308 13.1473 6.77275L7.89734 12.0227C7.67767 12.2424 7.32152 12.2424 7.10185 12.0227L4.85185 9.77275C4.63218 9.55308 4.63218 9.19692 4.85185 8.97725Z"
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
                      <clipPath id="clip0_1311_7579">
                        <rect width="18" height="18" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  <p className="text-[12px] font-medium">Mark as Resolved</p>
                </button>
              </li>
              <li className="border-start-0 p-0">
                <button
                  onClick={() => {
                    setOpenPop(false);
                  }}
                  className="w-full flex items-center py-[16px] px-[30px] gap-[12px] font-medium"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.5 3.5625C3.98223 3.5625 3.5625 3.98223 3.5625 4.5V15C3.5625 15.5178 3.98223 15.9375 4.5 15.9375H9C9.31066 15.9375 9.5625 16.1893 9.5625 16.5C9.5625 16.8107 9.31066 17.0625 9 17.0625H4.5C3.36091 17.0625 2.4375 16.1391 2.4375 15V4.5C2.4375 3.36091 3.36091 2.4375 4.5 2.4375H6.375C6.68566 2.4375 6.9375 2.68934 6.9375 3C6.9375 3.31066 6.68566 3.5625 6.375 3.5625H4.5Z"
                      fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.0625 3C11.0625 2.68934 11.3143 2.4375 11.625 2.4375H13.5C14.6391 2.4375 15.5625 3.36091 15.5625 4.5V11.25C15.5625 11.5607 15.3107 11.8125 15 11.8125C14.6893 11.8125 14.4375 11.5607 14.4375 11.25V4.5C14.4375 3.98223 14.0178 3.5625 13.5 3.5625H11.625C11.3143 3.5625 11.0625 3.31066 11.0625 3Z"
                      fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.739 1.81302C7.49971 2.0953 7.38985 2.45386 7.34283 2.72433C7.2777 3.09893 6.98655 3.46054 6.5625 3.54436V4.6875H11.4375V3.54436C11.0135 3.46054 10.7223 3.09893 10.6572 2.72433C10.6102 2.45386 10.5003 2.0953 10.261 1.81302C10.041 1.55351 9.6748 1.3125 9 1.3125C8.3252 1.3125 7.95899 1.55351 7.739 1.81302ZM6.88085 1.08556C7.32138 0.56588 8.00529 0.1875 9 0.1875C9.99471 0.1875 10.6786 0.56588 11.1192 1.08556C11.509 1.5454 11.676 2.07677 11.7495 2.4457C12.2084 2.50659 12.5625 2.89945 12.5625 3.375V4.8C12.5625 5.35919 12.1092 5.8125 11.55 5.8125H6.45C5.89081 5.8125 5.4375 5.35919 5.4375 4.8V3.375C5.4375 2.89945 5.79158 2.50659 6.25049 2.4457C6.32404 2.07677 6.49104 1.5454 6.88085 1.08556Z"
                      fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.2268 14.9773C11.4465 14.7576 11.8027 14.7576 12.0223 14.9773L13.1246 16.0795L16.4768 12.7273C16.6965 12.5076 17.0527 12.5076 17.2723 12.7273C17.492 12.9469 17.492 13.3031 17.2723 13.5227L13.5223 17.2727C13.3027 17.4924 12.9465 17.4924 12.7268 17.2727L11.2268 15.7727C11.0072 15.5531 11.0072 15.1969 11.2268 14.9773Z"
                      fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                    />
                  </svg>

                  <p className="text-[12px] font-medium">Resolve issue</p>
                </button>
              </li>
            </ul>
          }
        >
          <button onClick={() => setOpenPop(true)}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.0003 8.33464C12.1844 8.33464 12.3337 8.1854 12.3337 8.0013C12.3337 7.81721 12.1844 7.66797 12.0003 7.66797C11.8162 7.66797 11.667 7.81721 11.667 8.0013C11.667 8.1854 11.8162 8.33464 12.0003 8.33464Z"
                fill={mode === "dark" ? "#EAEAEA" : "black"}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.0003 8.16797C12.0924 8.16797 12.167 8.09335 12.167 8.0013C12.167 7.90925 12.0924 7.83464 12.0003 7.83464C11.9083 7.83464 11.8337 7.90925 11.8337 8.0013C11.8337 8.09335 11.9083 8.16797 12.0003 8.16797ZM11.167 8.0013C11.167 7.54106 11.5401 7.16797 12.0003 7.16797C12.4606 7.16797 12.8337 7.54106 12.8337 8.0013C12.8337 8.46154 12.4606 8.83464 12.0003 8.83464C11.5401 8.83464 11.167 8.46154 11.167 8.0013Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
              <path
                d="M8.00033 8.33464C8.18442 8.33464 8.33366 8.1854 8.33366 8.0013C8.33366 7.81721 8.18442 7.66797 8.00033 7.66797C7.81623 7.66797 7.66699 7.81721 7.66699 8.0013C7.66699 8.1854 7.81623 8.33464 8.00033 8.33464Z"
                fill={mode === "dark" ? "#EAEAEA" : "black"}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.00033 8.16797C8.09237 8.16797 8.16699 8.09335 8.16699 8.0013C8.16699 7.90925 8.09237 7.83464 8.00033 7.83464C7.90828 7.83464 7.83366 7.90925 7.83366 8.0013C7.83366 8.09335 7.90828 8.16797 8.00033 8.16797ZM7.16699 8.0013C7.16699 7.54106 7.54009 7.16797 8.00033 7.16797C8.46056 7.16797 8.83366 7.54106 8.83366 8.0013C8.83366 8.46154 8.46056 8.83464 8.00033 8.83464C7.54009 8.83464 7.16699 8.46154 7.16699 8.0013Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
              <path
                d="M4.00033 8.33464C4.18442 8.33464 4.33366 8.1854 4.33366 8.0013C4.33366 7.81721 4.18442 7.66797 4.00033 7.66797C3.81623 7.66797 3.66699 7.81721 3.66699 8.0013C3.66699 8.1854 3.81623 8.33464 4.00033 8.33464Z"
                fill={mode === "dark" ? "#EAEAEA" : "black"}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.00033 8.16797C4.09237 8.16797 4.16699 8.09335 4.16699 8.0013C4.16699 7.90925 4.09237 7.83464 4.00033 7.83464C3.90828 7.83464 3.83366 7.90925 3.83366 8.0013C3.83366 8.09335 3.90828 8.16797 4.00033 8.16797ZM3.16699 8.0013C3.16699 7.54106 3.54009 7.16797 4.00033 7.16797C4.46056 7.16797 4.83366 7.54106 4.83366 8.0013C4.83366 8.46154 4.46056 8.83464 4.00033 8.83464C3.54009 8.83464 3.16699 8.46154 3.16699 8.0013Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
            </svg>
          </button>
        </Popover>
        <input
          type="checkbox"
          checked={data?.isChecked}
          onChange={handleCheck}
          className="w-[16px] h-[16px] border-light rounded border"
        />
      </div>
      <p
        className={`font-medium flex items-center text-[12px] ${
          data?.status === "Triggered"
            ? "text-[#FF161A]"
            : mode === "dark"
            ? "text-[#909BBC]"
            : "text-[#6A6A6A]"
        }`}
      >
        {data?.status}
      </p>
      <p
        className={`flex items-center font-medium text-[12px] ${
          mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
        }`}
      >
        {data.event_name}
      </p>
      <p
        className={`flex items-center font-medium text-[12px] ${
          mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
        }`}
      >
        {data?.event_source}
      </p>
      <p
        className={`flex items-center font-medium text-[12px] ${
          mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
        }`}
      >
        {data?.ip_address}
      </p>
      <p
        className={`flex items-center font-medium text-[12px] ${
          mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
        }`}
      >
        {data?.region}
      </p>
      <Tooltip
        className="shadow-md"
        content={
          <div className="bg-primary border-0 w-64 p-[16px] text-white">
            <p className="font-medium mb-[3px]">User ID</p>
            {JSON.stringify(data?.user_identity, null, 2)}
          </div>
        }
      >
        <p
          className={`flex items-center font-medium p-1 text-[12px] bg-[#284CB30D] ${
            mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
          }`}
        >
          {`${data?.user_identity?.userName.slice(0, 20)}...`}
        </p>
      </Tooltip>
      <Tooltip
        className="shadow-md"
        content={
          <div className="bg-primary border-0 w-72 p-[16px] text-white">
            <p className="font-medium mb-[3px]">Request parameters</p>
            {JSON.stringify(data?.req_params, null, 2)}
          </div>
        }
      >
        <p
          className={`flex items-center font-medium p-1 text-[12px] bg-[#284CB30D] ${
            mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
          }`}
        >
          {`${data?.req_params?.policyArn.slice(0, 20)}...`}
        </p>
      </Tooltip>
      <p
        className={`flex items-center font-medium text-[12px] ${
          mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
        }`}
      >
        {`${data?.res_element.slice(0, 20)}...`}
      </p>
      <p
        className={`flex items-center font-medium text-[12px] ${
          mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
        }`}
      >
        {data?.event_type}
      </p>
    </div>
  );
};

const TrailHistoryDetails = () => {
  const navigate = useNavigate();
  const { mode } = useRecoilValue(modeAtomsAtom);
  const [search] = useSearchParams();
  const name = search.get("name");
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [numChecked, setNumChecked] = useState(0);
  const [checkall, setCheckAll] = useState(false);
  const [data, setData] = useState<any[]>([
    {
      status: "Triggered",
      id: 2,
      event_name: "AttachUserPolicy",
      event_source: "iam.amazonaws.com",
      ip_address: "197.211.59.10",
      region: "US-East-1",
      isChecked: false,
      user_identity: {
        type: "Root",
        principalId: "211125495289",
        arn: "aws:iam::211125495289:root",
        accountId: "211125495289",
        userName: "CspmUser",
      },
      req_params: {
        userName: "CspmUser",
        policyArn:
          "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy",
      },
      res_element: "{BucketArn: arn:aws:s3:::example-bucket}",
      event_type: "AwsApiCall",
    },
    {
      status: "Normal",
      id: 1,
      event_name: "CreateBucket",
      event_source: "iam.amazonaws.com",
      ip_address: "197.211.59.10",
      region: "US-East-1",
      isChecked: false,
      user_identity: {
        type: "Root",
        principalId: "211125495289",
        arn: "aws:iam::211125495289:root",
        accountId: "211125495289",
        userName: "CspmUser",
      },
      req_params: {
        userName: "CspmUser",
        policyArn:
          "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy",
      },
      res_element: "{BucketArn: arn:aws:s3:::example-bucket}",
      event_type: "AwsApiCall",
    },
  ]);

  const handleCheck = (val: boolean, id: string) => {
    if (id === "all") {
      const mapped = data?.map((d) => {
        return {
          ...d,
          isChecked: val,
        };
      });
      setData(mapped);
      const filtered = mapped.filter((m) => m.isChecked).length;
      setNumChecked(filtered);
    } else {
      const mapped = data?.map((d) => {
        if (Number(id) === d.id) {
          return {
            ...d,
            isChecked: val,
          };
        } else {
          return d;
        }
      });
      setData(mapped);
      const filtered = mapped.filter((m) => m.isChecked).length;
      setNumChecked(filtered);
    }
  };

  return (
    <div className="w-full px-10 mt-[32px]">
      <div className="flex flex-col md:flex-row items-center gap-[16px] mb-[32px]">
        <div className="flex items-center gap-[16px]">
        <button onClick={() => navigate(-1)}>
          <FaArrowLeft color={mode === "dark" ? "#EAEAEA" : "#373737"} />
        </button>
        <div className="flex items-center gap-[12px]">
          <img src={awsImg} alt="aws logo" className="w-[24px] h-[24px]" />
          <h1 className="font-semibold text-[14px] md:text-[18px]">{name}</h1>
        </div>
        </div>
        <div className="flex items-center gap-[16px]">
        <p className="px-[16px] border-start py-2 text-[12px] md:text-[14px] font-semibold">
          Scan log SC5478AWS-00023
        </p>
        <p
          className={`text-[10px] md:text-[12px] font-medium ${
            mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
          }`}
        >
          2024-05-10 09:35:26Z
        </p>
        </div>
      </div>
      <div
        className={`w-fit rounded-[12px] flex items-center gap-[16px] border py-[16px] px-[24px] ${
          mode === "dark" ? "bg-lightDark" : "bg-white"
        }`}
      >
        <div className="flex items-center gap-[8px] md:gap-[12px]">
          <div className="rounded-full p-[12px] flex items-center justify-center bg-[#FF161A]/20">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.1679 15.75H3.83205C2.29402 15.75 1.33158 14.0864 2.09824 12.7531L7.26619 3.76533C8.0352 2.42792 9.9648 2.42791 10.7338 3.76533L15.9018 12.7531C16.6684 14.0864 15.706 15.75 14.1679 15.75Z"
                stroke="#FF161A"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M9 6.75V9.75"
                stroke="#FF161A"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M9 12.7575L9.0075 12.7492"
                stroke="#FF161A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex items-center gap-[2px] md:gap-[8px]">
            <h1 className="font-semibold text-[14px] md:text-[18px]">23</h1>
            <p
              className={`font-medium text-[12px] md:text-[14px] ${
                mode === "dark" ? "#EAEAEA" : "#6A6A6A"
              }`}
            >
              Triggered Alarms
            </p>
          </div>
        </div>
        <div className="flex items-center gap-[8px] py-[3px] border-start pl-[16px]">
          <h1 className="font-semibold text-[14px] md:text-[18px]">14</h1>
          <p
            className={`font-medium text-[12px] md:text-[14px] ${
              mode === "dark" ? "#EAEAEA" : "#6A6A6A"
            }`}
          >
            Resolved
          </p>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.125 9.375L4.07574 12.3257C4.31005 12.56 4.68995 12.5601 4.92426 12.3257L6.75 10.5"
              stroke="#2AB849"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M12 5.25L9 8.25"
              stroke="#2AB849"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M5.25 9L8.57574 12.3257C8.81005 12.5601 9.18995 12.5601 9.42426 12.3257L16.5 5.25"
              stroke="#2AB849"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      <div className="mt-[16px] py-[18px] border-bottom flex items-center justify-between">
        <h1 className="uppercase font-medium text-[12px] md:text-[14px]">
          Trails
        </h1>
        <div className="flex items-center gap-[16px] justify-between">
          <div className="relative">
            <input
              type="text"
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
          <button
            // onClick={() => setShowPopOver(!showPopOver)}
            className="flex border-start pl-[16px] py-[4px] text-[10px] md:text-[12px] font-medium items-center gap-3"
          >
            <p className="underline">Filter</p>
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
                stroke={mode === "dark" ? "#EAEAEA" : "black"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.25 13.5L9.75 13.5"
                stroke={mode === "dark" ? "#EAEAEA" : "black"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      {(numChecked > 1) && (
        <div className="flex items-center justify-end gap-[16px] w-full mt-[16px]">
          <button
            onClick={() => console.log("hello world")}
            className="flex items-center gap-[8px] font-medium border-end pr-[16px] py-[3px]"
          >
            <span> Mark as resolved</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1307_17750)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.85234 8.97725C5.07201 8.75758 5.42816 8.75758 5.64783 8.97725L7.50008 10.8295L12.3523 5.97725C12.572 5.75758 12.9282 5.75758 13.1478 5.97725C13.3675 6.19692 13.3675 6.55308 13.1478 6.77275L7.89783 12.0227C7.67816 12.2424 7.32201 12.2424 7.10234 12.0227L4.85234 9.77275C4.63267 9.55308 4.63267 9.19692 4.85234 8.97725Z"
                  fill={mode === "dark" ? "#EAEAEA" : "black"}
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9 2.0625C5.16852 2.0625 2.0625 5.16852 2.0625 9C2.0625 12.8315 5.16852 15.9375 9 15.9375C12.8315 15.9375 15.9375 12.8315 15.9375 9C15.9375 5.16852 12.8315 2.0625 9 2.0625ZM0.9375 9C0.9375 4.5472 4.5472 0.9375 9 0.9375C13.4528 0.9375 17.0625 4.5472 17.0625 9C17.0625 13.4528 13.4528 17.0625 9 17.0625C4.5472 17.0625 0.9375 13.4528 0.9375 9Z"
                  fill={mode === "dark" ? "#EAEAEA" : "black"}
                />
              </g>
              <defs>
                <clipPath id="clip0_1307_17750">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
          <button
            onClick={() => console.log("hello world")}
            className="flex items-center gap-[8px] font-medium "
          >
            <span> Resolve issues</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.5 3.5625C3.98223 3.5625 3.5625 3.98223 3.5625 4.5V15C3.5625 15.5178 3.98223 15.9375 4.5 15.9375H9C9.31066 15.9375 9.5625 16.1893 9.5625 16.5C9.5625 16.8107 9.31066 17.0625 9 17.0625H4.5C3.36091 17.0625 2.4375 16.1391 2.4375 15V4.5C2.4375 3.36091 3.36091 2.4375 4.5 2.4375H6.375C6.68566 2.4375 6.9375 2.68934 6.9375 3C6.9375 3.31066 6.68566 3.5625 6.375 3.5625H4.5Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.0625 3C11.0625 2.68934 11.3143 2.4375 11.625 2.4375H13.5C14.6391 2.4375 15.5625 3.36091 15.5625 4.5V11.25C15.5625 11.5607 15.3107 11.8125 15 11.8125C14.6893 11.8125 14.4375 11.5607 14.4375 11.25V4.5C14.4375 3.98223 14.0178 3.5625 13.5 3.5625H11.625C11.3143 3.5625 11.0625 3.31066 11.0625 3Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.739 1.81302C7.49971 2.0953 7.38985 2.45386 7.34283 2.72433C7.2777 3.09893 6.98655 3.46054 6.5625 3.54436V4.6875H11.4375V3.54436C11.0135 3.46054 10.7223 3.09893 10.6572 2.72433C10.6102 2.45386 10.5003 2.0953 10.261 1.81302C10.041 1.55351 9.6748 1.3125 9 1.3125C8.3252 1.3125 7.95899 1.55351 7.739 1.81302ZM6.88085 1.08556C7.32138 0.56588 8.00529 0.1875 9 0.1875C9.99471 0.1875 10.6786 0.56588 11.1192 1.08556C11.509 1.5454 11.676 2.07677 11.7495 2.4457C12.2084 2.50659 12.5625 2.89945 12.5625 3.375V4.8C12.5625 5.35919 12.1092 5.8125 11.55 5.8125H6.45C5.89081 5.8125 5.4375 5.35919 5.4375 4.8V3.375C5.4375 2.89945 5.79158 2.50659 6.25049 2.4457C6.32404 2.07677 6.49104 1.5454 6.88085 1.08556Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.2273 14.9773C11.447 14.7576 11.8032 14.7576 12.0228 14.9773L13.1251 16.0795L16.4773 12.7273C16.697 12.5076 17.0532 12.5076 17.2728 12.7273C17.4925 12.9469 17.4925 13.3031 17.2728 13.5227L13.5228 17.2727C13.3032 17.4924 12.947 17.4924 12.7273 17.2727L11.2273 15.7727C11.0077 15.5531 11.0077 15.1969 11.2273 14.9773Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
            </svg>
          </button>
        </div>
      )}
      <div className="mt-[32px] w-full overflow-auto">
        <div
          className={`grid grid-cols-10 gap-[8px] p-4 rounded-t-[1.5rem] mb-3 place-content-center border-bottom h-[52px] w-[350vw] md:w-[180vw] lg:w-[120vw] ${
            mode === "dark" ? "bg-lightDark" : "bg-white"
          }`}
        >
          <div className="flex items-center gap-[12px]">
            <p className="opacity-0">...</p>
            <input
              type="checkbox"
              name="checkall"
              checked={checkall}
              id="checkall"
              onChange={(e) => {
                setCheckAll(!checkall);
                handleCheck(e.target.checked, "all");
            }}
              className="w-[16px] h-[16px] border-light rounded border"
            />
          </div>
          <p className="font-semibold text-[12px]">Status</p>
          <p className="font-semibold text-[12px]">Event Name</p>
          <p className="font-semibold text-[12px]">Event Source</p>
          <p className="font-semibold text-[12px]">IP address</p>
          <p className="font-semibold text-[12px]">Region</p>
          <p className="font-semibold text-[12px]">User Identity</p>
          <p className="font-semibold text-[12px]">Request parameters</p>
          <p className="font-semibold text-[12px]">Response elements</p>
          <p className="font-semibold text-[12px]">Event type</p>
        </div>
        {data.map((d) => (
          <Card
            data={d}
            mode={mode}
            handleCheck={() => {
                handleCheck(!d?.isChecked, d?.id);
                setCheckAll(false);
            }}
            setSelected={() => setSelected(d)}
            setShowModal={() => setShowModal(true)}
          />
        ))}
      </div>
      <Modal
        show={showModal}
        onHide={() => setShowModal(!showModal)}
        keyboard={false}
      >
        <Modal.Header closeButton className="border-bottom-0  items-start">
          <Modal.Title className="w-full pb-0 flex flex-col items-center justify-center">
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
                fillOpacity="0.05"
              />
              <g clip-path="url(#clip0_1311_504)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M21 14.0625C17.1685 14.0625 14.0625 17.1685 14.0625 21C14.0625 24.8315 17.1685 27.9375 21 27.9375C24.4773 27.9375 27.3579 25.3786 27.8599 22.0413C27.9062 21.7341 28.1927 21.5225 28.4999 21.5688C28.8071 21.615 29.0186 21.9015 28.9724 22.2087C28.3889 26.0883 25.0423 29.0625 21 29.0625C16.5472 29.0625 12.9375 25.4528 12.9375 21C12.9375 16.5472 16.5472 12.9375 21 12.9375C24.307 12.9375 27.1478 14.9284 28.3914 17.7748C28.5158 18.0595 28.3858 18.3911 28.1011 18.5154C27.8165 18.6398 27.4849 18.5099 27.3605 18.2252C26.2894 15.7738 23.8439 14.0625 21 14.0625Z"
                  fill="#284CB3"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M28.5 13.6875C28.8107 13.6875 29.0625 13.9393 29.0625 14.25V17.55C29.0625 18.1092 28.6092 18.5625 28.05 18.5625H24.75C24.4393 18.5625 24.1875 18.3107 24.1875 18C24.1875 17.6893 24.4393 17.4375 24.75 17.4375H27.9375V14.25C27.9375 13.9393 28.1893 13.6875 28.5 13.6875Z"
                  fill="#284CB3"
                />
              </g>
              <defs>
                <clipPath id="clip0_1311_504">
                  <rect
                    width="18"
                    height="18"
                    fill="white"
                    transform="translate(12 12)"
                  />
                </clipPath>
              </defs>
            </svg>
            <div className="mt-[16px]">
              <h1 className="font-semibold text-[14px] md:text-[18px] text-center">
                Cloud Trail
              </h1>
              <p className="font-medium text-[14px] text-center">
                {selected?.id}
              </p>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="border-top">
          <div className="grid font-medium text-[12px] grid-cols-3 w-full gap-[16px]">
            <p className="font-semibold">Event Time</p>
            <p className="col-span-2">2024-05-10 09:35:26Z</p>
            <p className="font-semibold">Event Name</p>
            <p className="col-span-2">{selected?.event_name}</p>
            <p className="font-semibold">IP Address</p>
            <p className="col-span-2">{selected?.ip_address}</p>
            <p className="font-semibold">Region</p>
            <p className="col-span-2">{selected?.region}</p>
            <p className="font-semibold">User Identity</p>
            <div className="grid grid-cols-3 col-span-2">
              <p>Type:</p>
              <p className="col-span-2">{selected?.user_identity?.type}</p>
              <p>PrincipalId:</p>
              <p className="col-span-2">
                {selected?.user_identity?.principalId}
              </p>
              <p>Arn:</p>
              <p className="col-span-2">{selected?.user_identity?.arn}</p>
              <p>AccountID:</p>
              <p className="col-span-2">{selected?.user_identity?.accountId}</p>
              <p>UserName:</p>
              <p className="col-span-2">{selected?.user_identity?.userName}</p>
            </div>
            <p className="font-semibold">Request parameters</p>
            <div className="grid grid-cols-3 col-span-2">
              <p>Policyarn:</p>
              <p className="col-span-2">{selected?.req_params?.policyArn}</p>
              <p>userName:</p>
              <p className="col-span-2">{selected?.req_params?.userName}</p>
            </div>
            <p className="font-semibold">Event Type</p>
            <p className="col-span-2">{selected?.event_type}</p>
            <p className="font-semibold">Response Element</p>
            <p className="col-span-2">{selected?.res_element}</p>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <div className="flex items-center justify-between w-full">
            <label htmlFor="mark" className="flex items-center gap-[8px]">
              <input
                type="checkbox"
                name="mark"
                id="mark"
                className="rounded-[12px] w-5 h-5"
              />
              <p className="font-medium text-[12px]">mark as Resloved</p>
            </label>
            <button
              onClick={() => setShowModal(!showModal)}
              className="bg-primary font-medium rounded-full text-white px-[24px] py-[12px]"
            >
              Resolve issue
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TrailHistoryDetails;
