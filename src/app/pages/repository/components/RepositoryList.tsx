import { useRef, useState, useEffect } from "react";
import modeAtomsAtom from "../../../atoms/modeAtoms.atom";
import { Link, useNavigate } from "react-router-dom";
import { Popover } from "react-tiny-popover";
import { useGetAccountTenant } from "../../../api/api-services/accountQuery";
import {
  useGetAllRepository,
  useDeleteRepoScan,
  useCreateRepoScan,
} from "../../../api/api-services/policyQuery";
import { useRecoilValue } from "recoil";
import RepoDetails from "./modal/RepoDetails";
import FilterModal from "../../../components/FilterModal";
import githubImg from "../../../../../public/media/logos/github.svg";
import gitlabImg from "../../../../../public/media/logos/gitlab.svg";
import bitImg from "../../../../../public/media/logos/bitbucket.svg";
import dockerImg from "../../../../../public/media/logos/docker.svg";
import database from "../../../../../public/media/logos/database.svg";
import { Modal } from "react-bootstrap";
import { FaCheckSquare, FaUser, FaKey, FaGlobe } from "react-icons/fa";
import {
  PolicyRepoScanSetupList200Response,
  AccountsApiTenantsList200Response,
} from "../../../api/axios-client";
import useAlert from "../../components/useAlert";
import DefaultContent from "../../../components/defaultContent/defaultContent";
import {
  ColumnTypes,
  TableColumn,
} from "../../../components/tableComponents/models";

const EmptyRepo = ({ showModal }: any) => {
  return (
    <div className="w-full flex items-center justify-center flex-col gap-8 h-screen md:h-[40rem]">
      <img
        src={database}
        alt="database of repository"
        className="maxW-md h-72"
      />
      <h1 className="font-semibold text-[24px] mb-8">
        No Repository added or saved{" "}
      </h1>
      <button
        onClick={showModal}
        className="rounded-full text-white w-52 p-3 flex font-medium textWhite items-center justify-center gap-2 bg-[#284CB3] text-White"
      >
        <p>Connect new Repo</p>
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
  );
};

const RepoCard = ({ data, setDelete, mode, showDetails }: any) => {
  const [popUp, showPopUP] = useState(false);
  // const navigate = useNavigate();
  return (
    <div
      className={`flex relative shadow-md mb-5 items-center border justify-between rounded-xl p-5 ${
        mode === "dark" ? "bg-lightDark" : "bg-white"
      }`}
    >
      <div className="flex items-center gap-3">
        {data?.repo_type === "Github" ? (
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24 12.8003C24 15.4811 23.2368 17.8919 21.7104 20.0327C20.1852 22.1735 18.2136 23.6543 15.7968 24.4763C15.516 24.5303 15.3096 24.4931 15.18 24.3647C15.1161 24.3025 15.0657 24.2278 15.032 24.1451C14.9984 24.0625 14.9821 23.9739 14.9844 23.8847V20.5043C14.9844 19.4687 14.7132 18.7103 14.172 18.2303C14.7127 18.176 15.2483 18.0797 15.774 17.9423C16.2468 17.8139 16.7364 17.6063 17.2416 17.3183C17.7273 17.0465 18.1569 16.6849 18.5076 16.2527C18.846 15.8303 19.122 15.2699 19.3356 14.5703C19.5492 13.8707 19.656 13.0679 19.656 12.1607C19.656 10.8683 19.2444 9.7679 18.4224 8.8607C18.8064 7.8887 18.7656 6.8003 18.2964 5.5931C18.0048 5.4971 17.5836 5.5571 17.0316 5.7695C16.5309 5.95759 16.0495 6.19348 15.594 6.4739L15 6.8579C14.0244 6.57974 13.0145 6.43998 12 6.4427C10.9854 6.44037 9.97558 6.58054 9 6.8591C8.78297 6.70879 8.56168 6.56473 8.3364 6.4271C8.0604 6.2555 7.6248 6.0503 7.0308 5.8103C6.438 5.5703 5.9892 5.4983 5.6868 5.5943C5.2296 6.8003 5.1924 7.8887 5.5788 8.8607C4.7556 9.7679 4.3428 10.8683 4.3428 12.1607C4.3428 13.0679 4.4508 13.8683 4.6644 14.5631C4.878 15.2567 5.1516 15.8171 5.484 16.2443C5.82868 16.681 6.25602 17.0456 6.7416 17.3171C7.2468 17.6051 7.7376 17.8139 8.2104 17.9411C8.6844 18.0707 9.2184 18.1667 9.8124 18.2303C9.396 18.6143 9.1404 19.1651 9.0468 19.8803C8.82307 19.9887 8.58691 20.0693 8.3436 20.1203C8.05038 20.1778 7.75198 20.2048 7.4532 20.2007C7.1088 20.2007 6.7692 20.0855 6.4296 19.8563C6.0912 19.6259 5.802 19.2923 5.562 18.8555C5.37452 18.5252 5.11587 18.2407 4.8048 18.0227C4.4976 17.8091 4.2396 17.6807 4.0308 17.6387L3.7188 17.5907C3.5004 17.5907 3.3492 17.6147 3.2652 17.6627C3.1812 17.7107 3.1572 17.7707 3.1872 17.8463C3.22249 17.9277 3.26982 18.0034 3.3276 18.0707C3.38754 18.1427 3.45605 18.2072 3.5316 18.2627L3.6396 18.3419C3.87 18.4499 4.0956 18.6527 4.32 18.9515C4.5444 19.2503 4.7088 19.5227 4.812 19.7675L4.968 20.1359C5.1036 20.5415 5.3328 20.8703 5.6568 21.1211C5.9796 21.3731 6.3288 21.5327 6.7032 21.6011C7.0776 21.6707 7.44 21.7091 7.7892 21.7139C8.1372 21.7187 8.4276 21.7007 8.6568 21.6575L9.0156 21.5939C9.0156 21.9995 9.018 22.4747 9.024 23.0195L9.0312 23.8835C9.0312 24.0755 8.964 24.2363 8.8272 24.3635C8.6928 24.4931 8.484 24.5303 8.2032 24.4763C5.7864 23.6543 3.8148 22.1723 2.2896 20.0327C0.7632 17.8919 0 15.4811 0 12.8003C0 10.5683 0.5364 8.5115 1.6092 6.6263C2.64778 4.77728 4.1541 3.23372 5.9772 2.1503C7.7946 1.05627 9.87878 0.485292 12 0.500297C14.1216 0.48507 16.2063 1.05606 18.024 2.1503C19.8467 3.23388 21.3526 4.77743 22.3908 6.6263C23.4636 8.5103 24 10.5695 24 12.8003Z"
              fill="#373737"
            />
          </svg>
        ) : data?.repo_type === "Git Lab" ? (
          <svg
            width="26"
            height="25"
            viewBox="0 0 26 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_877_6577)">
              <path
                d="M13.0077 24.5083L17.7917 9.76562H8.22363L13.0077 24.5083Z"
                fill="#E24329"
              />
              <path
                d="M13.0072 24.5083L8.2231 9.76562H1.51855L13.0072 24.5083Z"
                fill="#FC6D26"
              />
              <path
                d="M1.51885 9.76562L0.0650873 14.2459C0.000448361 14.4451 0.000439445 14.6596 0.0650618 14.8588C0.129684 15.058 0.25562 15.2316 0.424822 15.3547L13.0075 24.5084L1.51885 9.76562Z"
                fill="#FCA326"
              />
              <path
                d="M1.51855 9.76511H8.2231L5.34187 0.885617C5.19359 0.428702 4.54806 0.428803 4.39988 0.885617L1.51855 9.76511Z"
                fill="#E24329"
              />
              <path
                d="M13.0078 24.5083L17.7918 9.76562H24.4965L13.0078 24.5083Z"
                fill="#FC6D26"
              />
              <path
                d="M24.4965 9.76562L25.9502 14.2459C26.0149 14.4451 26.0148 14.6596 25.9502 14.8588C25.8856 15.058 25.7596 15.2316 25.5904 15.3547L13.0078 24.5084L24.4965 9.76562Z"
                fill="#FCA326"
              />
              <path
                d="M24.4966 9.76511H17.792L20.6733 0.885617C20.8216 0.428702 21.4671 0.428803 21.6153 0.885617L24.4966 9.76511Z"
                fill="#E24329"
              />
            </g>
            <defs>
              <clipPath id="clip0_877_6577">
                <rect
                  width="26"
                  height="24"
                  fill="white"
                  transform="translate(0 0.5)"
                />
              </clipPath>
            </defs>
          </svg>
        ) : data?.repo_type === "Bit Bucket" ? (
          <svg
            width="21"
            height="17"
            viewBox="0 0 41 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.34943 0.195432C1.15936 0.192882 0.970955 0.23125 0.797013 0.307932C0.623575 0.384807 0.468888 0.497776 0.344669 0.639572C0.22071 0.780534 0.129467 0.947171 0.0774816 1.12754C0.0257077 1.30722 0.0146582 1.49618 0.0451378 1.68067L5.58201 34.6708C5.65196 35.0763 5.8639 35.4437 6.1799 35.7072C6.49908 35.9736 6.90088 36.1209 7.31662 36.1239H33.8788C34.1905 36.1281 34.4936 36.0218 34.7345 35.8239C34.9729 35.6282 35.1323 35.3526 35.1831 35.0484L40.72 1.68699C40.7505 1.50251 40.7394 1.31354 40.6876 1.13387C40.6356 0.95355 40.5443 0.786988 40.4202 0.646135C40.2954 0.50416 40.1411 0.391073 39.9681 0.314729C39.7941 0.237941 39.6056 0.199492 39.4155 0.201994L1.34943 0.195432ZM24.6639 24.0386H16.1858L13.8904 12.2674H26.7182L24.6639 24.0386Z"
              fill="#2684FF"
            />
          </svg>
        ) : (
          <svg
            width="24"
            height="19"
            viewBox="0 0 24 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_877_6614)">
              <path
                d="M23.5046 7.35917C22.9641 6.96998 21.7256 6.82403 20.7573 7.01863C20.6448 6.04565 20.1269 5.1944 19.2261 4.44035L18.7083 4.05116L18.3479 4.61062C17.8976 5.34035 17.6724 6.36197 17.7399 7.33494C17.7624 7.67538 17.875 8.28349 18.2128 8.81863C17.8976 9.01322 17.2445 9.25646 16.3889 9.25646H0.108256L0.0632558 9.45106C-0.0944317 10.4239 -0.0944318 13.4644 1.75207 15.7994C3.14819 17.575 5.21988 18.475 7.94454 18.475C13.8442 18.475 18.2128 15.5318 20.262 10.205C21.0726 10.2293 22.8065 10.205 23.6848 8.38069C23.7073 8.33204 23.7523 8.23475 23.9099 7.86998L24 7.67538L23.5046 7.35917ZM13.1237 0.5H10.6468V2.93234H13.1237V0.5ZM13.1237 3.41882H10.6468V5.85116H13.1237V3.41882ZM10.1963 3.41882H7.71944V5.85116H10.1963V3.41882ZM7.26897 3.41882H4.79201V5.85116H7.26897V3.41882ZM4.34163 6.33764H1.86466V8.76998H4.34154L4.34163 6.33764ZM7.26897 6.33764H4.79201V8.76998H7.26897V6.33764ZM10.1963 6.33764H7.71944V8.76998H10.1963V6.33764ZM13.1238 6.33764H10.6467V8.76998H13.1238V6.33764ZM16.0511 6.33764H13.574V8.76998H16.0511V6.33764Z"
                fill="#2396ED"
              />
            </g>
            <defs>
              <clipPath id="clip0_877_6614">
                <rect
                  width="24"
                  height="18"
                  fill="white"
                  transform="translate(0 0.5)"
                />
              </clipPath>
            </defs>
          </svg>
        )}
        <p className="text-[12px] md:text-[18px] font-medium">
          {data?.repo_name}
        </p>
      </div>
      <div className="flex relative items-center gap-6">
        <a href={data?.repo_url} className="bg-transparent" target="_blank">
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
              d="M6.64286 6.3125L5.35714 6.3125C3.52226 6.3125 2.0625 7.75388 2.0625 9.49822C2.0625 11.0019 3.14511 12.2788 4.62112 12.6043C4.85723 12.6563 5.1035 12.6839 5.35714 12.6839C5.6678 12.6839 5.91964 12.9358 5.91964 13.2464C5.91964 13.5571 5.6678 13.8089 5.35714 13.8089C5.02159 13.8089 4.6941 13.7724 4.37888 13.7029C2.41948 13.2708 0.9375 11.5622 0.9375 9.49822C0.9375 7.1024 2.93154 5.1875 5.35714 5.1875L6.64286 5.1875C9.07603 5.1875 11.0625 7.32187 11.0625 9.49822C11.0625 9.80888 10.8107 10.0607 10.5 10.0607C10.1893 10.0607 9.9375 9.80888 9.9375 9.49822C9.9375 7.93698 8.44852 6.3125 6.64286 6.3125Z"
              fill={mode === "dark" ? "#EAEAEA" : "#373737"}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.3571 12.6836L12.6429 12.6836C14.4777 12.6836 15.9375 11.2422 15.9375 9.49787C15.9375 7.9942 14.8549 6.71731 13.3789 6.39184C13.1428 6.33978 12.8965 6.31216 12.6429 6.31216C12.3322 6.31216 12.0804 6.06032 12.0804 5.74966C12.0804 5.439 12.3322 5.18716 12.6429 5.18716C12.9784 5.18716 13.3059 5.22372 13.6211 5.29323C15.5805 5.72529 17.0625 7.43393 17.0625 9.49787C17.0625 11.8937 15.0685 13.8086 12.6429 13.8086L11.3571 13.8086C8.92397 13.8086 6.9375 11.6742 6.9375 9.49787C6.9375 9.18721 7.18934 8.93537 7.5 8.93537C7.81066 8.93537 8.0625 9.18721 8.0625 9.49787C8.0625 11.0591 9.55148 12.6836 11.3571 12.6836Z"
              fill={mode === "dark" ? "#EAEAEA" : "#373737"}
            />
          </svg>
        </a>
        <Popover
          onClickOutside={() => showPopUP(false)}
          isOpen={popUp}
          positions={["bottom", "right"]} // preferred positions by priority
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
                  <li className="border-start-0">
                    <button
                      onClick={() => {
                        showDetails();
                        // navigate(`repository/list/${data?.id}`);
                        showPopUP(false);
                      }}
                      className="flex items-center p-4 gap-4 border-bottom justify-between font-medium"
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
                      <p className="text-[12px] font-medium">view Repo</p>
                    </button>
                  </li>
                  <li className="border-start-0">
                    <button
                      onClick={() => {
                        setDelete();
                        showPopUP(false);
                      }}
                      className="flex items-center gap-4 p-4 justify-between font-medium"
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
                          d="M15.0975 6.19609C15.4035 6.24989 15.6079 6.54154 15.5541 6.8475L14.0578 15.3572C14.0578 15.3572 14.0578 15.3572 14.0578 15.3572C13.8845 16.3434 13.0278 17.0626 12.0266 17.0626H5.97365C4.97234 17.0626 4.1157 16.3434 3.94231 15.3572L2.44609 6.8475C2.3923 6.54153 2.59672 6.24989 2.90269 6.19609C3.20865 6.1423 3.5003 6.34672 3.5541 6.65269L5.05032 15.1624C5.12913 15.6107 5.51853 15.9376 5.97365 15.9376H12.0266C12.4816 15.9376 12.871 15.6107 12.9498 15.1624L12.9498 15.1624L14.4461 6.65268C14.4999 6.34672 14.7915 6.14229 15.0975 6.19609Z"
                          fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.96875 2.0625C7.45098 2.0625 7.03125 2.48223 7.03125 3V3.9375H10.9688V3C10.9688 2.48223 10.549 2.0625 10.0312 2.0625H7.96875ZM5.90625 3.9375V3C5.90625 1.86091 6.82966 0.9375 7.96875 0.9375H10.0312C11.1704 0.9375 12.0938 1.86092 12.0938 3V3.9375H15.75C16.0607 3.9375 16.3125 4.18934 16.3125 4.5C16.3125 4.81066 16.0607 5.0625 15.75 5.0625H2.25C1.93934 5.0625 1.6875 4.81066 1.6875 4.5C1.6875 4.18934 1.93934 3.9375 2.25 3.9375H5.90625Z"
                          fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                        />
                      </svg>

                      <p className="text-[12px] font-medium">Remove Repo</p>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          }
        >
          <button onClick={() => showPopUP(true)} className="bg-transparent">
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
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.5 9.6875C13.6036 9.6875 13.6875 9.60355 13.6875 9.5C13.6875 9.39645 13.6036 9.3125 13.5 9.3125C13.3964 9.3125 13.3125 9.39645 13.3125 9.5C13.3125 9.60355 13.3964 9.6875 13.5 9.6875ZM12.5625 9.5C12.5625 8.98223 12.9822 8.5625 13.5 8.5625C14.0178 8.5625 14.4375 8.98223 14.4375 9.5C14.4375 10.0178 14.0178 10.4375 13.5 10.4375C12.9822 10.4375 12.5625 10.0178 12.5625 9.5Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
              <path
                d="M9 9.875C9.20711 9.875 9.375 9.70711 9.375 9.5C9.375 9.29289 9.20711 9.125 9 9.125C8.79289 9.125 8.625 9.29289 8.625 9.5C8.625 9.70711 8.79289 9.875 9 9.875Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9 9.6875C9.10355 9.6875 9.1875 9.60355 9.1875 9.5C9.1875 9.39645 9.10355 9.3125 9 9.3125C8.89645 9.3125 8.8125 9.39645 8.8125 9.5C8.8125 9.60355 8.89645 9.6875 9 9.6875ZM8.0625 9.5C8.0625 8.98223 8.48223 8.5625 9 8.5625C9.51777 8.5625 9.9375 8.98223 9.9375 9.5C9.9375 10.0178 9.51777 10.4375 9 10.4375C8.48223 10.4375 8.0625 10.0178 8.0625 9.5Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
              <path
                d="M4.5 9.875C4.70711 9.875 4.875 9.70711 4.875 9.5C4.875 9.29289 4.70711 9.125 4.5 9.125C4.29289 9.125 4.125 9.29289 4.125 9.5C4.125 9.70711 4.29289 9.875 4.5 9.875Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.5 9.6875C4.60355 9.6875 4.6875 9.60355 4.6875 9.5C4.6875 9.39645 4.60355 9.3125 4.5 9.3125C4.39645 9.3125 4.3125 9.39645 4.3125 9.5C4.3125 9.60355 4.39645 9.6875 4.5 9.6875ZM3.5625 9.5C3.5625 8.98223 3.98223 8.5625 4.5 8.5625C5.01777 8.5625 5.4375 8.98223 5.4375 9.5C5.4375 10.0178 5.01777 10.4375 4.5 10.4375C3.98223 10.4375 3.5625 10.0178 3.5625 9.5Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
            </svg>
          </button>
        </Popover>
      </div>
    </div>
  );
};

const RepositoryList = () => {
  const [allRepos, setAllRepos] = useState<any>([]);
  const { mode } = useRecoilValue(modeAtomsAtom);
  const [showDelete, setShowDelete] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const filter = useRef<any>({
    page: 1,
    pageSize: 10,
    tenant: undefined,
    repoUrl: undefined,
    repoType: undefined,
  });
  const [selectedProvider, setSelectedProvider] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [showPopOver, setShowPopOver] = useState(false);
  const { showAlert, Alert } = useAlert();
  const [step, setStep] = useState(1);
  const [selectedId, setSelectedId] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<any>({});
  const [repoData, setRepoData] = useState<any>({
    pat: "",
    username: "",
    url: "",
  });

  const repos = ["Github", "Git Lab", "Bit Bucket", "Docker Hub"];
  const [filterFields, setFilterFields] = useState<TableColumn[]>([
    {
      name: "repoUrl",
      title: "Repo Url",
      type: ColumnTypes.Text,
    },
    {
      name: "repoType",
      title: "Repo Type",
      type: ColumnTypes.List,
      listValue: [
        {
          name: "Github",
        },
        {
          name: "Git Lab",
        },
        {
          name: "Bit Bucket",
        },
        {
          name: "Docker Hub",
        },
      ],
      listIdField: "name",
      listTextField: "name",
    },
  ]);

  const { data, isLoading, error, refetch } = useGetAllRepository({
    ...filter.current,
  });
  const datastsr: PolicyRepoScanSetupList200Response | any = data;
  const { data: tenant } = useGetAccountTenant({ page: 1, pageSize: 100 });
  const tenantstsr: AccountsApiTenantsList200Response | any = tenant;

  const { mutate, isLoading: createLoading } = useCreateRepoScan();
  const { mutate: deleteMutate, isLoading: deleteLoading } =
    useDeleteRepoScan();

  const handleCreateRepo = () => {
    mutate(
      {
        data: {
          access_token: repoData.pat,
          repo_type: selectedProvider,
          repo_url: repoData.url,
          repo_name: repoData?.username,
        },
      },
      {
        onSuccess: (res) => {
          console.log(res);
          setShowAdd(false);
        },
        onError: (err) => {
          if (err instanceof Error) {
            showAlert(err?.message || "An unknown error occurred", "danger");
          }
        },
      }
    );
  };

  const handleDeleteRepo = () => {
    deleteMutate(
      {
        id: +selectedId,
      },
      {
        onSuccess: (res) => {
          console.log(res);
          setShowDelete(false);
        },
        onError: (err) => {
          if (err instanceof Error) {
            showAlert(err?.message || "An unknown error occurred", "danger");
          }
        },
      }
    );
  };

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      const parsedUser = JSON.parse(localUser);
      if (parsedUser.role.name === "Admin") {
        setIsAdmin(true);
      }
    }
  }, []);

  useEffect(() => {
    setAllRepos(datastsr?.data?.data?.results ?? []);
    if (tenantstsr?.data?.data?.results && isAdmin) {
      setFilterFields([
        {
          name: "repoUrl",
          title: "Repo Url",
          type: ColumnTypes.Text,
        },
        {
          name: "repoType",
          title: "Repo Type",
          type: ColumnTypes.List,
          listValue: [
            {
              name: "Github",
            },
            {
              name: "Git Lab",
            },
            {
              name: "Bit Bucket",
            },
            {
              name: "Docker Hub",
            },
          ],
          listIdField: "name",
          listTextField: "name",
        },
        {
          name: "tenant",
          title: "Tenant",
          type: ColumnTypes.List,
          listValue: tenantstsr?.data?.data?.results,
          listIdField: "id",
          listTextField: "full_name",
        },
      ]);
    }
    if (error) {
      if (error instanceof Error) {
        showAlert(error?.message || "An unknown error occurred", "danger");
      }
    }
  }, [datastsr, tenantstsr, error]);

  function filterUpdated(data: any) {
    filter.current = {
      page: data?.page ?? 1,
      pageSize: data?.pageSize ?? 10,
      tenant: data?.tenant,
      repoUrl: data?.repoUrl,
      repoType: data?.repoType,
    };
    refetch();
  }

  return (
    <div className="p-4 md:p-12 w-full lg:p-36">
      {allRepos.length < 1 ? (
        <>
          <DefaultContent
            pageHeader="All Repository"
            pageDescription="No record found"
            loading={isLoading}
            buttonValue=""
            buttonClick={() => {}}
          />
          {!isLoading && <EmptyRepo showModal={() => setShowAdd(true)} />}
        </>
      ) : (
        <div className="W-[90%] md:w-[70%] mx-auto">
          <div className="flex border-bottom pb-5 items-center justify-between my-10">
            <div className="flex items-center gap-4">
              <p className="font-semibold text-[16px]">
                {`Repository (${allRepos.length})`}
              </p>
              <button
                onClick={() => setShowPopOver(true)}
                className="border-start p-3 flex items-center justify-center"
              >
                <svg
                  width="18"
                  height="19"
                  viewBox="0 0 18 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.25 5H15.75"
                    stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.25 9.5L12.75 9.5"
                    stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.25 14L9.75 14"
                    stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <button
              onClick={() => setShowAdd(true)}
              className="rounded-full w-48 p-3 flex font-medium text-white items-center justify-center gap-2 bg-primary text-White"
            >
              <p>Connect new Repo</p>
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
          {allRepos.map((repo: any) => (
            <RepoCard
              key={repo?.id}
              data={repo}
              mode={mode}
              showDetails={() => {
                setSelectedRepo(() => repo);
                setShowDetails(true);
              }}
              setDelete={() => {
                setSelectedId(repo?.id);
                setShowDelete(true);
              }}
            />
          ))}
        </div>
      )}
      <FilterModal
        filterDataChange={(e) => filterUpdated(e)}
        headfilterFields={filterFields}
        setshowFilter={(e) => setShowPopOver(e)}
        showFilter={showPopOver}
      />
      <Modal
        show={showDelete}
        onHide={() => setShowDelete(!showDelete)}
        keyboard={false}
      >
        <Modal.Header closeButton className="border-bottom-0  items-start">
          <Modal.Title className="w-full pb-0 flex items-center justify-center">
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
                fill="#FF161A"
                fill-opacity="0.05"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M27.0975 18.1961C27.4035 18.2499 27.6079 18.5415 27.5541 18.8475L26.0578 27.3572C26.0578 27.3572 26.0578 27.3572 26.0578 27.3572C25.8845 28.3434 25.0278 29.0626 24.0266 29.0626H17.9736C16.9723 29.0626 16.1157 28.3434 15.9423 27.3572L14.4461 18.8475C14.3923 18.5415 14.5967 18.2499 14.9027 18.1961C15.2087 18.1423 15.5003 18.3467 15.5541 18.6527L17.0503 27.1624C17.1291 27.6107 17.5185 27.9376 17.9736 27.9376H24.0266C24.4816 27.9376 24.871 27.6107 24.9498 27.1624L24.9498 27.1624L26.4461 18.6527C26.4999 18.3467 26.7915 18.1423 27.0975 18.1961Z"
                fill="#FF161A"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.9688 14.0625C19.451 14.0625 19.0312 14.4822 19.0312 15V15.9375H22.9688V15C22.9688 14.4822 22.549 14.0625 22.0312 14.0625H19.9688ZM17.9062 15.9375V15C17.9062 13.8609 18.8297 12.9375 19.9688 12.9375H22.0312C23.1704 12.9375 24.0938 13.8609 24.0938 15V15.9375H27.75C28.0607 15.9375 28.3125 16.1893 28.3125 16.5C28.3125 16.8107 28.0607 17.0625 27.75 17.0625H14.25C13.9393 17.0625 13.6875 16.8107 13.6875 16.5C13.6875 16.1893 13.9393 15.9375 14.25 15.9375H17.9062Z"
                fill="#FF161A"
              />
            </svg>
          </Modal.Title>
        </Modal.Header>
        <Alert />
        <Modal.Body className="p-3">
          <div className="flex w-full items-center mb-6 flex-col justify-center gap-4">
            <h1 className="font-semibold text-[18px]">Delete Repo</h1>
            <p
              className={`font-medium text-center text-[12px] ${
                mode === "dark" ? "#EAEAEA" : "#6A6A6A"
              }`}
            >
              Are you sure you want to delete Scrapenext.git from your saved
              repositories? Once deleted, you will need to reconnect it to
              perform a scan.
            </p>
            <div className="flex items-center justify-center w-full gap-4">
              <button
                onClick={() => setShowDelete(!showDelete)}
                className="bg-[#909BBC]  font-medium w-32 rounded-full text-white p-3"
              >
                Cancel
              </button>
              <button
                disabled={!selectedId}
                onClick={handleDeleteRepo}
                className="bg-[#284CB3] font-medium w-48 rounded-full text-white p-3"
              >
                {deleteLoading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={showAdd}
        onHide={() => {
          setShowAdd(!showAdd);
          setSelectedProvider("");
          setRepoData({
            pat: "",
            username: "",
          });
        }}
        keyboard={false}
      >
        <Modal.Header closeButton className="border-bottom-0  items-start">
          <Modal.Title>
            <div className="flex items-center gap-3">
              {step === 1 ? (
                <>
                  <div className="bg-[#284CB30D] w-12 h-12 rounded-full flex items-center justify-center p-2">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_947_792)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.8838 13.0819C5.11471 13.2897 5.13343 13.6454 4.92561 13.8763L4.91811 13.8846C4.71029 14.1155 4.35462 14.1343 4.12371 13.9264C3.8928 13.7186 3.87408 13.363 4.0819 13.132L4.0894 13.1237C4.29722 12.8928 4.65289 12.8741 4.8838 13.0819Z"
                          fill="#284CB3"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.8838 4.0819C5.11471 4.28972 5.13343 4.64539 4.92561 4.8763L4.91811 4.88463C4.71029 5.11554 4.35462 5.13426 4.12371 4.92644C3.8928 4.71862 3.87408 4.36296 4.0819 4.13205L4.0894 4.12371C4.29722 3.8928 4.65289 3.87408 4.8838 4.0819Z"
                          fill="#284CB3"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2.0625 2.0625V6.9375H15.9375V2.0625H2.0625ZM0.9375 1.95C0.9375 1.39081 1.39081 0.9375 1.95 0.9375H16.05C16.6092 0.9375 17.0625 1.39081 17.0625 1.95V7.05C17.0625 7.60919 16.6092 8.0625 16.05 8.0625H1.95C1.39081 8.0625 0.9375 7.60919 0.9375 7.05V1.95Z"
                          fill="#284CB3"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2.0625 11.0625V15.9375H15.9375V11.0625H2.0625ZM0.9375 10.95C0.9375 10.3908 1.39081 9.9375 1.95 9.9375H16.05C16.6092 9.9375 17.0625 10.3908 17.0625 10.95V16.05C17.0625 16.6092 16.6092 17.0625 16.05 17.0625H1.95C1.39081 17.0625 0.9375 16.6092 0.9375 16.05V10.95Z"
                          fill="#284CB3"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_947_792">
                          <rect width="18" height="18" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <p className="font-semibold text-[18px]">Add New Repo</p>
                </>
              ) : (
                <>
                  <button onClick={() => setStep(() => step - 1)}>
                    <svg
                      width="15"
                      height="14"
                      viewBox="0 0 15 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.53033 0.46967C7.82322 0.762563 7.82322 1.23744 7.53033 1.53033L2.81066 6.25H13.5C13.9142 6.25 14.25 6.58579 14.25 7C14.25 7.41421 13.9142 7.75 13.5 7.75H2.81066L7.53033 12.4697C7.82322 12.7626 7.82322 13.2374 7.53033 13.5303C7.23744 13.8232 6.76256 13.8232 6.46967 13.5303L0.46967 7.53033C0.176777 7.23744 0.176777 6.76256 0.46967 6.46967L6.46967 0.46967C6.76256 0.176777 7.23744 0.176777 7.53033 0.46967Z"
                        fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                      />
                    </svg>
                  </button>
                  <p className="font-semibold text-[18px]">
                    Add New Repo{" "}
                    <Link
                      to=""
                      className="p-2 font-medium border-start text-[12px] underline text-[#6A6A6A]"
                    >
                      Learn more
                    </Link>
                  </p>
                </>
              )}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3">
          {step === 1 ? (
            <div className="grid grid-cols-2 p-6 gap-4">
              {repos.map((repo) => (
                <label
                  htmlFor={repo}
                  className="hover:cursor-pointer w-full relative"
                >
                  <div
                    className={`${
                      selectedProvider === repo ? "bg-white" : "bg-[#EAEAEA]/20"
                    }  rounded-md border-2 shadow-md flex items-center flex-col gap-3 p-5 w-full`}
                  >
                    <img
                      src={
                        repo === "Github"
                          ? githubImg
                          : repo === "Git Lab"
                          ? gitlabImg
                          : repo === "Bit Bucket"
                          ? bitImg
                          : dockerImg
                      }
                      className="max-w-xs"
                      alt={`${repo} logo`}
                    />
                    <p
                      className={`text-[16px] mt-6 font-semibold ${
                        mode === "dark" ? "text-[#EAEAEA]" : "text-[#373737]"
                      }`}
                    >
                      {repo}
                    </p>
                  </div>
                  {selectedProvider === repo && (
                    <FaCheckSquare
                      color="#284CB3"
                      size={14}
                      className="absolute top-2 right-3"
                    />
                  )}
                  <input
                    type="radio"
                    name="provider"
                    id={repo}
                    value={repo}
                    onChange={(e) => setSelectedProvider(e.target.value)}
                    className="opacity-0"
                  />
                </label>
              ))}
            </div>
          ) : (
            <div className="w-full p-6" role="role">
              {/* username */}
              <div className="form-group mb-10">
                <label htmlFor="username" className="flex items-center gap-1">
                  <FaUser
                    size={12}
                    color={mode === "dark" ? "#EAEAEA" : "#000000"}
                  />
                  <p className="font-semibold text-[14px]">Username</p>
                </label>
                <input
                  autoComplete="off"
                  className="form-control bg-transparent"
                  type="text"
                  id="username"
                  name="username"
                  value={repoData.username}
                  onChange={(e) =>
                    setRepoData({ ...repoData, username: e.target.value })
                  }
                />
              </div>
              {/* url */}
              <div className="form-group mb-10">
                <label htmlFor="url" className="flex items-center gap-1">
                  <FaGlobe
                    size={12}
                    color={mode === "dark" ? "#EAEAEA" : "#000000"}
                  />
                  <p className="font-semibold text-[14px]">Repo Url</p>
                </label>
                <input
                  autoComplete="off"
                  className="form-control bg-transparent"
                  type="text"
                  id="url"
                  name="url"
                  value={repoData.url}
                  onChange={(e) =>
                    setRepoData({ ...repoData, url: e.target.value })
                  }
                />
              </div>
              {/* PAT */}
              <div className="form-group mb-10">
                <label htmlFor="pat" className="flex items-center gap-1">
                  <FaKey
                    size={12}
                    color={mode === "dark" ? "#EAEAEA" : "#000000"}
                  />
                  <p className="font-semibold text-[14px]">
                    Personal Access Token(PAT)
                  </p>
                </label>
                <input
                  autoComplete="off"
                  className="form-control bg-transparent"
                  type="text"
                  id="pat"
                  name="pat"
                  value={repoData.pat}
                  onChange={(e) =>
                    setRepoData({ ...repoData, pat: e.target.value })
                  }
                />
              </div>
            </div>
          )}
        </Modal.Body>
        <Alert />
        <Modal.Footer className="border-top-0">
          <div className="flex w-full items-end justify-end">
            <button
              disabled={
                !selectedProvider ||
                (step === 2 && (!repoData?.pat || !repoData?.username))
              }
              onClick={() => {
                if (step === 1) {
                  setStep(2);
                } else {
                  handleCreateRepo();
                }
              }}
              className={`rounded-full ${
                createLoading ? "w-fit" : "w-48"
              }  font-medium bg-primary p-3 text-white`}
            >
              {createLoading ? "Connecting..." : "Connect Repo"}
            </button>
          </div>
        </Modal.Footer>
      </Modal>

      <RepoDetails
        data={selectedRepo}
        handleHide={() => setShowDetails(false)}
        isOpen={showDetails}
      />
    </div>
  );
};

export default RepositoryList;
