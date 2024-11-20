import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { FaDatabase } from "react-icons/fa";
import modeAtomsAtom from "../../../../../atoms/modeAtoms.atom";
import { useGetCloudProviderResourceTypes } from "../../../../../api/api-services/cloudProviderQuery";
import { CloudProviderCloudProviderResourceTypesList200Response } from "../../../../../api/axios-client";
import awsLogo from "../../../../../../../public/media/logos/aws-light.svg";
import { Link } from "react-router-dom";
import SingleCard, { RuntimeCard } from "./SingleCard";

const Index = () => {
  const { mode } = useRecoilValue(modeAtomsAtom);
  const [showModal, setShowModal] = useState(false);
  const [showPopOver, setShowPopOver] = useState(false);
  const [tab, setTab] = useState("Images");
  const [allServices, setAllServices] = useState<any[]>([]);
  const [allData, setAllData] = useState<any[]>([]);
  const imagesData = [
    {
      image: "my-web",
      registry: "AWS ECR",
      region: "Ap-northeast",
      in_use: "32 instances",
      tags: "--",
      size: "10MB",
      last_scanned: "2/4/2012 10:45 AM",
      created_at: "2/4/2012 10:45 AM",
      cve: "5 (high)",
    },
    {
      image: "nginx",
      registry: "AWS ECR",
      region: "Ap-northeast",
      in_use: "32 instances",
      tags: "--",
      size: "234kB",
      last_scanned: "2/4/2012 10:45 AM",
      created_at: "2/4/2012 10:45 AM",
      cve: "2",
    },
  ];
  const runtimeData = [
    {
      container: "web-server-1",
      id: "c-1234abcd",
      cluster: "EKS",
      image_use: "app:1.0",
      health: "HEALTHY",
      cpu: "35%",
      ip_address: "10.0.1.100",
      created_at: "2 hours ago",
      Status: "RUNNING",
    },
    {
      container: "web-server-1",
      id: "c-5678efgh",
      cluster: "EKS",
      image_use: "my-web:1.0",
      health: "DEGRADED",
      cpu: "75%",
      ip_address: "10.0.2.50",
      created_at: "2 hours ago",
      Status: "RUNNING",
    },
  ];
  const { data } = useGetCloudProviderResourceTypes({
    page: 1,
    pageSize: 1000,
  });

  const [setup, setSetup] = useState<any>({
    cloud_provider_account_id: 0,
    scan_frequency: "",
    filter_patterns: [],
  });

  const datastsr: CloudProviderCloudProviderResourceTypesList200Response | any =
    data;

  useEffect(() => {
    setAllServices(datastsr?.data?.data?.results ?? []);
    if (datastsr?.data?.data?.results) {
      //   setSelectedServ(datastsr?.data?.data?.results[0]?.id);
      //   setSelectedServName(datastsr?.data?.data?.results[0]?.account_name);
      setSetup({
        ...setup,
        cloud_provider_account_id: datastsr?.data?.data?.results[0]?.id,
      });
    }
  }, [datastsr]);

  useEffect(() => {
    if (tab === "Images") {
      setAllData(imagesData);
    } else {
      setAllData(runtimeData);
    }
  }, [tab]);

  return (
    <div className="w-full px-10 mt-[32px]">
      <div className="flex items-center justify-between flex-col md:flex-row gap-[10px]">
        <div className="flex items-center gap-[24px]">
          <div className="w-[60%] flex md:w-full">
            <img src={awsLogo} alt="aws logo" />
            <select
              name="service"
              id="services"
              // value={selectedServ}
              className=" p-4 rounded-[8px] bg-transparent font-medium"
              onChange={(e) => {
                setSetup({
                  ...setup,
                  cloud_provider_account_id: Number(e.target.value),
                });
                //   setSelectedServ(e.target.value);
                //   handleGetAllFilters();
                const filtered = allServices.find(
                  (serv) => serv.id === Number(e.target.value)
                )?.account_name;
                //   setSelectedServName(filtered);
              }}
            >
              <option className="font-medium">select service</option>
              {allServices.map((serv) => (
                <option
                  key={serv.account_name}
                  value={serv.id}
                  className="font-medium"
                >
                  {serv.account_name}
                </option>
              ))}
            </select>
          </div>
          <button className="flex items-center gap-[8px] border-start pl-[24px]">
            <span className="font-medium underline text-[14px]">Export</span>
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
                d="M3.5625 2.0625V15.9375H10.5C10.8107 15.9375 11.0625 16.1893 11.0625 16.5C11.0625 16.8107 10.8107 17.0625 10.5 17.0625H3.45C2.89081 17.0625 2.4375 16.6092 2.4375 16.05V1.95C2.4375 1.39081 2.89081 0.9375 3.45 0.9375H12.1886C12.4571 0.9375 12.7147 1.04417 12.9045 1.23405L15.2659 3.59545C15.4558 3.78533 15.5625 4.04286 15.5625 4.3114V9.75C15.5625 10.0607 15.3107 10.3125 15 10.3125C14.6893 10.3125 14.4375 10.0607 14.4375 9.75V4.358L12.142 2.0625H3.5625Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 0.9375C12.3107 0.9375 12.5625 1.18934 12.5625 1.5V3.9375H15C15.3107 3.9375 15.5625 4.18934 15.5625 4.5C15.5625 4.81066 15.3107 5.0625 15 5.0625H12.45C11.8908 5.0625 11.4375 4.60919 11.4375 4.05V1.5C11.4375 1.18934 11.6893 0.9375 12 0.9375Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.8523 16.8977C14.0719 17.1174 14.4281 17.1174 14.6477 16.8977L16.8977 14.6477C17.1174 14.4281 17.1174 14.0719 16.8977 13.8523L14.6477 11.6023C14.4281 11.3826 14.0719 11.3826 13.8523 11.6023C13.6326 11.8219 13.6326 12.1781 13.8523 12.3977L15.142 13.6875H12C11.6893 13.6875 11.4375 13.9393 11.4375 14.25C11.4375 14.5607 11.6893 14.8125 12 14.8125H15.142L13.8523 16.1023C13.6326 16.3219 13.6326 16.6781 13.8523 16.8977Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-[24px]">
          <button
            onClick={() => setShowModal(true)}
            className="rounded-full w-48 p-3 flex font-medium text-white items-center justify-center gap-2 bg-primary text--white"
          >
            <p>Add new Registry</p>
          </button>
          <button className="flex items-center gap-[8px] border-start pl-[24px]">
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
                d="M11.0625 11.5625V15.6875H15.1875V11.5625H11.0625ZM9.9375 11.45C9.9375 10.8908 10.3908 10.4375 10.95 10.4375H15.3C15.8592 10.4375 16.3125 10.8908 16.3125 11.45V15.8C16.3125 16.3592 15.8592 16.8125 15.3 16.8125H10.95C10.3908 16.8125 9.9375 16.3592 9.9375 15.8V11.45Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.8125 11.5625V15.6875H6.9375V11.5625H2.8125ZM1.6875 11.45C1.6875 10.8908 2.14081 10.4375 2.7 10.4375H7.05C7.60919 10.4375 8.0625 10.8908 8.0625 11.45V15.8C8.0625 16.3592 7.60919 16.8125 7.05 16.8125H2.7C2.14081 16.8125 1.6875 16.3592 1.6875 15.8V11.45Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.0625 3.3125V7.4375H15.1875V3.3125H11.0625ZM9.9375 3.2C9.9375 2.64081 10.3908 2.1875 10.95 2.1875H15.3C15.8592 2.1875 16.3125 2.64081 16.3125 3.2V7.55C16.3125 8.10919 15.8592 8.5625 15.3 8.5625H10.95C10.3908 8.5625 9.9375 8.10919 9.9375 7.55V3.2Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.8125 3.3125V7.4375H6.9375V3.3125H2.8125ZM1.6875 3.2C1.6875 2.64081 2.14081 2.1875 2.7 2.1875H7.05C7.60919 2.1875 8.0625 2.64081 8.0625 3.2V7.55C8.0625 8.10919 7.60919 8.5625 7.05 8.5625H2.7C2.14081 8.5625 1.6875 8.10919 1.6875 7.55V3.2Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`${
          mode === "dark" ? "bg-lightDark" : "bg-white"
        } p-[24px] rounded-[16px] border w-fit mt-[24px] mb-[39px]`}
      >
        <div className="flex items-center gap-[6px] mb-[24px]">
          <FaDatabase color={mode === "dark" ? "#EAEAEA" : "#6A6A6A"} />
          <h1
            className={`font-semibold text-[14px] ${
              mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
            }`}
          >
            Container Asset summary
          </h1>
        </div>
        <div className="grid md:grid-cols-5 grid-cols-2 gap-[24px]">
          <div className="flex items-center gap-[24px] border-end pr-[24px]">
            <svg
              width="31"
              height="46"
              viewBox="0 0 31 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                y="45.5"
                width="45"
                height="5"
                rx="2.5"
                transform="rotate(-90 0 45.5)"
                fill="#E9EDF7"
              />
              <rect
                y="45.5"
                width="37.0385"
                height="5"
                rx="2.5"
                transform="rotate(-90 0 45.5)"
                fill="#4318FF"
              />
              <rect
                x="13"
                y="45.5"
                width="45"
                height="5"
                rx="2.5"
                transform="rotate(-90 13 45.5)"
                fill="#E9EDF7"
              />
              <rect
                x="13"
                y="45.5"
                width="31.1538"
                height="5"
                rx="2.5"
                transform="rotate(-90 13 45.5)"
                fill="#4318FF"
              />
              <rect
                x="26"
                y="45.5"
                width="45"
                height="5"
                rx="2.5"
                transform="rotate(-90 26 45.5)"
                fill="#E9EDF7"
              />
              <rect
                x="26"
                y="45.5"
                width="10.7308"
                height="5"
                rx="2.5"
                transform="rotate(-90 26 45.5)"
                fill="#4318FF"
              />
            </svg>
            <div className="">
              <h2 className="text-start mb-[8px] text-[#909BBC] font-medium text-[14px]">
                Total image
              </h2>
              <h1 className="text-start font-bold text-[20px]">35</h1>
            </div>
          </div>
          <div className="flex items-center gap-[24px] border-end pr-[24px]">
            <div className="">
              <h2 className="text-start mb-[8px] text-[#909BBC] font-medium text-[14px]">
                Running
              </h2>
              <h1 className="text-start font-bold text-[20px]">29</h1>
            </div>
          </div>
          <div className="flex items-center gap-[24px] border-end pr-[24px]">
            <div className="">
              <h2 className="text-start mb-[8px] text-[#909BBC] font-medium text-[14px]">
                Stopped
              </h2>
              <h1 className="text-start font-bold text-[20px]">45</h1>
            </div>
          </div>
          <div className="flex items-center gap-[24px] md:col-span-2">
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
                fillOpacity="0.1"
              />
              <path
                d="M12.9232 21.3C12.816 21.1144 12.816 20.8856 12.9232 20.7L16.7018 14.1553C16.809 13.9697 17.0071 13.8553 17.2214 13.8553H24.7786C24.9929 13.8553 25.191 13.9696 25.2982 14.1553L29.0768 20.7C29.184 20.8856 29.184 21.1144 29.0768 21.3L25.2982 27.8447C25.191 28.0303 24.9929 28.1447 24.7786 28.1447H17.2214C17.0071 28.1447 16.809 28.0304 16.7018 27.8447L12.9232 21.3Z"
                stroke="#FF161A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 18L21 21"
                stroke="#FF161A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 24.0075L21.0075 23.9992"
                stroke="#FF161A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex items-center gap-[8px]">
              <h1 className="text-start font-bold text-[20px]">45</h1>
              <h2 className="text-start text-[#909BBC] font-medium text-[14px]">
                Image Vulnerabilities
              </h2>
            </div>
            <Link to="/">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.73167 7C6.73167 6.51675 7.12342 6.125 7.60667 6.125H22.1667C22.6499 6.125 23.0417 6.51675 23.0417 7V21.56C23.0417 22.0432 22.6499 22.435 22.1667 22.435C21.6834 22.435 21.2917 22.0432 21.2917 21.56V9.11244L7.61872 22.7854C7.27701 23.1271 6.72299 23.1271 6.38128 22.7854C6.03957 22.4437 6.03957 21.8897 6.38128 21.5479L20.0542 7.875H7.60667C7.12342 7.875 6.73167 7.48325 6.73167 7Z"
                  fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center w-full justify-between border-bottom">
        <div className="">
          {["Images", "Runtime"].map((d) => (
            <button
              key={d}
              className={`uppercase p-4 ${
                d === tab
                  ? "font-bold text-[10px] md:text-[14px] border-bottom-3 border-primary"
                  : `font-medium text-[8px] md:text-[14px] ${
                      mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
                    }`
              }`}
              onClick={() => setTab(d)}
            >
              {d}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-5 -order-1 md:order-1">
          <div className="flex items-center gap-[16px]">
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
            <button
              onClick={() => setShowPopOver(!showPopOver)}
              className="flex text-[10px] md:text-[12px] font-medium items-center gap-3 border-start pl-[16px]"
            >
              <p>Filter</p>
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
      </div>
      <div
        className={`grid grid-cols-10 p-[12px] h-[45px] rounded-t-[16px] mt-[24px]  mb-[8px] border-bottom  ${
          mode === "dark" ? "bg-lightDark" : "bg-white"
        }`}
      >
        <p className="text-center font-semibold text-[12px]">
          {tab === "Images" ? "Image" : "Container "}
        </p>
        <p className="font-semibold text-[12px] text-center">
          {tab === "Images" ? "Registry" : "ID"}
        </p>
        <p className="font-semibold text-[12px] text-center">
          {tab === "Images" ? "Region" : "Cluster"}
        </p>
        <p className="font-semibold text-[12px] text-center">
          {tab === "Images" ? "In Use" : "Image used"}
        </p>
        <p className="font-semibold text-[12px] text-center">
          {tab === "Images" ? "Tags" : "Health"}
        </p>
        <p className="font-semibold text-[12px] text-center">
          {tab === "Images" ? "Size" : "CPU"}
        </p>
        <p className="font-semibold text-[12px] text-center">
          {tab === "Images" ? "Last scanned" : "IP Address"}
        </p>
        <p className="font-semibold text-[12px] text-center">
          {tab === "Images" ? "CVEs" : "Created at"}
        </p>
        <p className="font-semibold text-[12px] text-center">
          {tab === "Images" ? "Created at" : "Status"}
        </p>
        <p className="flex items-center justify-center">
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
        </p>
      </div>
      {allData.map((res, idx) => {
        if (tab === "Images") {
          return (
            <SingleCard mode={mode} data={res} key={`${res?.image}${idx}`} />
          );
        }
        return (
          <RuntimeCard mode={mode} data={res} key={`${res?.image}${idx}`} />
        );
      })}
    </div>
  );
};

export default Index;
