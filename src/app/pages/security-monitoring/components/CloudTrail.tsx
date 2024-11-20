import React, { useEffect, useState } from "react";
import { useGetCloudProviderResourceTypes } from "../../../api/api-services/cloudProviderQuery";
import { setupFilters } from "../../../api/api-services/systemQuery";
import { CloudProviderCloudProviderResourceTypesList200Response } from "../../../api/axios-client";
import { Link } from "react-router-dom";
import DefaultContent from "../../../components/defaultContent/defaultContent";
import { useRecoilValue } from "recoil";
import modeAtomsAtom from "../../../atoms/modeAtoms.atom";
import { FaStopwatch } from "react-icons/fa";
import axios from "axios";
import { Modal } from "react-bootstrap";
import useAlert from "../../components/useAlert";
import awsLogo from "../../../../../public/media/logos/aws-light.svg";

const CloudTrail = () => {
  const [allServices, setAllServices] = useState<any[]>([]);
  const [selectedServ, setSelectedServ] = useState("");
  const [selectedServName, setSelectedServName] = useState("");
  const [checkAll, setCheckAll] = useState(false);
  const [allAlarms, setAllAlerms] = useState<any[]>([]);
  const [allOtherAlarms, setAllOtherAlerms] = useState<any[]>([]);
  const curPagesize = 10;
  const [allAlarmsCounts, setAllAlarmsCounts] = useState(0);
  const [activeAlarms, setALLActiveAlarms] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [errMessage, setErrMessage] = useState("");
  const [errType, setErrType] = useState("");
  const [endOffset, setEndOffset] = useState(offset + 10);
  const [showModal, setShowModal] = useState(false);
  const { mode } = useRecoilValue(modeAtomsAtom);
  const { Alert, showAlert, hideAlert } = useAlert();
  const [setup, setSetup] = useState<any>({
    cloud_provider_account_id: 0,
    scan_frequency: "",
    filter_patterns: [],
  });

  const handleGetAllFilters = async () => {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    try {
      const resp = await axios.get(
        `https://cspm-api.midrapps.com/system_settings/api/v1/cloud_trail_filters/?page=1&page_size=100`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resp.status === 200) {
        if (resp.data?.data?.results) {
          const mapped = resp?.data?.data?.results.map((res: any) => {
            return {
              id: res?.id,
              name: res?.name,
              description: res?.description,
              isCheck: true,
            };
          });
          setAllAlerms(mapped);
          setAllOtherAlerms(mapped);
        }
        setAllAlarmsCounts(resp?.data?.data?.count);
        setALLActiveAlarms(resp?.data?.data?.count);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  const { data } = useGetCloudProviderResourceTypes({
    page: 1,
    pageSize: 1000,
  });
  const datastsr: CloudProviderCloudProviderResourceTypesList200Response | any =
    data;

  const handleChecked = (id: string, checked: boolean) => {
    if (id === "all") {
      const mapped = allAlarms.map((alams) => {
        return {
          ...alams,
          isCheck: checked,
        };
      });
      setAllAlerms(mapped);
      const allchecked = mapped.filter((m: any) => m.isCheck).map((v) => v.id);
      const allActive = mapped.filter((m: any) => m.isCheck);
      setALLActiveAlarms(allActive.length);
      setSetup({ ...setup, filter_patterns: allchecked });
    } else {
      const mapped = allAlarms.map((alams) => {
        if (alams.name === id) {
          return {
            ...alams,
            isCheck: checked,
          };
        } else {
          return alams;
        }
      });
      setAllAlerms(mapped);
      const allchecked = mapped.filter((m: any) => m.isCheck).map((v) => v.id);
      setSetup({ ...setup, filter_patterns: allchecked });
      const allActive = mapped.filter((m: any) => m.isCheck);
      setALLActiveAlarms(allActive.length);
    }
  };

  useEffect(() => {
    setAllServices(datastsr?.data?.data?.results ?? []);
    if (datastsr?.data?.data?.results) {
      setSelectedServ(datastsr?.data?.data?.results[0]?.id);
      setSelectedServName(datastsr?.data?.data?.results[0]?.account_name);
      setSetup({
        ...setup,
        cloud_provider_account_id: datastsr?.data?.data?.results[0]?.id,
      });
    }
  }, [datastsr]);

  useEffect(() => {
    handleGetAllFilters();
  }, []);

  const { mutate, isLoading: settingup } = setupFilters();

  const handleSetSetup = () => {
    mutate(
      {
        data: {
          ...setup,
        },
      },
      {
        onSuccess: (res: any) => {
          setErrType("success");
          setErrMessage(res?.data?.message);
          setShowModal(true);
        },
        onError: (err) => {
          console.log(err);
          setErrType("failed");
          setShowModal(true);
          if (err instanceof Error) {
            setErrMessage(err?.message || "An unknown error occurred");
          }
        },
      }
    );
  };

  const handleSearch = (val: string) => {
    const keys = ["name", "description"];
    if (val) {
      const filterd = allAlarms.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(val.toLowerCase()))
      );

      setAllAlerms(filterd);
    } else {
      setAllAlerms(allOtherAlarms);
    }
  };

  return (
    <div className="w-full px-10 mt-[32px]">
      <div className="flex items-center justify-between flex-row gap-[10px]">
        <div className="flex items-center gap-[8px]">
          <img src={awsLogo} alt="aws logo" />
          <select
            name="service"
            id="services"
            value={selectedServ}
            className="w-[60%] md:w-[452px] bg-[#EAEAEA] p-4 rounded-[8px] border-2 border-light font-medium"
            onChange={(e) => {
              setSetup({
                ...setup,
                cloud_provider_account_id: Number(e.target.value),
              });
              setSelectedServ(e.target.value);
              handleGetAllFilters();
              const filtered = allServices.find(
                (serv) => serv.id === Number(e.target.value)
              )?.account_name;
              setSelectedServName(filtered);
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
        <Link
          to={`/monitoring/cloudtrail-history/${selectedServ}?name=${selectedServName}`}
          className="font-medium text-[12px] md:text-[14px] flex items-center gap-[8px] pl-[8px] md:pl-[16px] border-start"
        >
          <p>Alarm History</p>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.75 9.75H9V6"
              stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
              strokeWidth="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3.75 2.625L5.25 1.5"
              stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.25 2.625L12.75 1.5"
              stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 16.5C12.7279 16.5 15.75 13.4779 15.75 9.75C15.75 6.02208 12.7279 3 9 3C5.27208 3 2.25 6.02208 2.25 9.75C2.25 13.4779 5.27208 16.5 9 16.5Z"
              stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
      <p className="mt-[16px] font-medium text-[12px] md:text-[14px] leading-[26px]">
        Set up alarms to monitor your cloud environment for suspicious
        activities. Choose from predefined alarm groups and customize scan
        frequency. Learn more about alarms and CloudTrail{" "}
        <a href="#" className="text-primary">
          here
        </a>
      </p>
      <div className="flex mt-[47px] pb-[14px] border-bottom mb-[24px] items-center justify-between flex-col md:flex-row gap-[16px]">
        <h2 className="font-medium text-[10px] md:text-[14px] capitalize">
          {allAlarmsCounts} total alarm
        </h2>
        <div className="flex items-center gap-[16px] justify-between">
          <div className="relative">
            <input
              type="text"
              onChange={(e) => handleSearch(e.target.value)}
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
          <button className="flex items-center gap-[8px] justify-center border-start border-end px-[16px] py-2">
            <p className="font-medium text-[10px] md:text-[14px]">Create new</p>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.5 7H7M10.5 7H7M7 7V3.5M7 7V10.5"
                stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            // onClick={() => setShowPopOver(!showPopOver)}
            className="flex text-[10px] md:text-[12px] font-medium items-center gap-3"
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
      <div className="flex items-center justify-between flex-row mb-[2px]">
        <div className="w-[60%] md:w-[40%] lg:w-[24%]">
          <label
            htmlFor="frequency"
            className="flex font-medium items-center gap-[8px] mb-[8px]"
          >
            <FaStopwatch color={mode === "dark" ? "#EAEAEA" : "#373737"} />
            <p>Scan frequency</p>
          </label>
          <select
            id="frequency"
            name="frequency"
            onChange={(e) => {
              setSetup({ ...setup, scan_frequency: e.target.value });
              hideAlert();
            }}
            className={`w-full rounded-[8px] border py-[12px] px-[16px] font-medium ${
              mode === "dark" ? "bg-lightDark" : "bg-[#FFF]"
            }`}
          >
            <option className="font-medium" value="">
              select frequency
            </option>
            <option className="font-medium" value="hourly">
              Hourly
            </option>
            <option className="font-medium" value="daily">
              Daily
            </option>
            <option className="font-medium" value="weekly">
              Weekly
            </option>
            <option className="font-medium" value="monthly">
              Monthly
            </option>
          </select>
        </div>
        <button
          // disabled={
          //   activeAlarms < 1 ||
          //   !setup.scan_frequency ||
          //   !setup.cloud_provider_account_id
          // }
          onClick={() => {
            if (
              activeAlarms < 1 ||
              !setup.scan_frequency ||
              !setup.cloud_provider_account_id
            ) {
              showAlert(
                "please set scanfrequency, service and set atleast one active alarm",
                "danger"
              );
            } else {
              handleSetSetup();
            }
          }}
          className="bg-[#284CB3] py-[12px] px-[24px] rounded-full text-white font-medium text-center"
        >
          {settingup ? "processing..." : "Save Setup"}
        </button>
      </div>
      <Alert />
      <div
        className={`rounded-[12px] my-[16px] flex items-center justify-between border px-[24px] py-[16px] ${
          mode === "dark" ? "bg-lightDark" : "bg-[#FFF]"
        }`}
      >
        <p className="font-medium text-[14px]">{activeAlarms} active alarms</p>

        <div className="flex items-center gap-[8px] py-2 pl-[16px] border-start">
          <p className="font-medium text-[14px]">Switch on all alarms</p>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              value=""
              onChange={() => {
                setCheckAll(!checkAll);
                handleChecked("all", !checkAll);
              }}
            />
            {/* ? "bg-[#4470EF] peer-checked:after:translate-x-full"
                  : "bg-[#D1D1D6] rtl:peer-checked:after:-translate-x-full" */}
            <div
              className={`relative w-11 h-6 rounded-full peer after:content-[''] after:absolute after:top-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${
                checkAll
                  ? "bg-[#4470EF] after:end-[2px]"
                  : "bg-[#D1D1D6] after:start-[2px]"
              }`}
            ></div>
          </label>
        </div>
      </div>
      {isLoading || allAlarms.length < 1 ? (
        <DefaultContent
          pageHeader="All Alarm Filters"
          pageDescription="No record found"
          loading={isLoading}
          buttonValue=""
          buttonClick={() => {}}
        />
      ) : (
        <>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[16px]">
            {allAlarms.slice(offset, endOffset).map((al) => (
              <div
                className={`w-full flex flex-row items-center justify-between rounded-[12px] border py-[16px] px-[24px] font-medium ${
                  mode === "dark" ? "bg-lightDark" : "bg-[#FFF]"
                }`}
              >
                <div className="">
                  <h1 className="font-semibold text-[12px] md:text-[14px] mb-[8px]">
                    {al.name}
                  </h1>
                  <p
                    className={`font-medium text-[10px] md:text-[12px] ${
                      mode === "dark" ? "#EAEAEA" : "#6A6A6A"
                    }`}
                  >
                    {al.description}
                  </p>
                </div>
                <div className="flex items-center gap-[16px]">
                  <button>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.5 9.375C13.7071 9.375 13.875 9.20711 13.875 9C13.875 8.79289 13.7071 8.625 13.5 8.625C13.2929 8.625 13.125 8.79289 13.125 9C13.125 9.20711 13.2929 9.375 13.5 9.375Z"
                        fill="#6A6A6A"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.5 9.1875C13.6036 9.1875 13.6875 9.10355 13.6875 9C13.6875 8.89645 13.6036 8.8125 13.5 8.8125C13.3964 8.8125 13.3125 8.89645 13.3125 9C13.3125 9.10355 13.3964 9.1875 13.5 9.1875ZM12.5625 9C12.5625 8.48223 12.9822 8.0625 13.5 8.0625C14.0178 8.0625 14.4375 8.48223 14.4375 9C14.4375 9.51777 14.0178 9.9375 13.5 9.9375C12.9822 9.9375 12.5625 9.51777 12.5625 9Z"
                        fill={mode === "dark" ? "#EAEAEA" : "#6A6A6A"}
                      />
                      <path
                        d="M9 9.375C9.20711 9.375 9.375 9.20711 9.375 9C9.375 8.79289 9.20711 8.625 9 8.625C8.79289 8.625 8.625 8.79289 8.625 9C8.625 9.20711 8.79289 9.375 9 9.375Z"
                        fill={mode === "dark" ? "#EAEAEA" : "#6A6A6A"}
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9 9.1875C9.10355 9.1875 9.1875 9.10355 9.1875 9C9.1875 8.89645 9.10355 8.8125 9 8.8125C8.89645 8.8125 8.8125 8.89645 8.8125 9C8.8125 9.10355 8.89645 9.1875 9 9.1875ZM8.0625 9C8.0625 8.48223 8.48223 8.0625 9 8.0625C9.51777 8.0625 9.9375 8.48223 9.9375 9C9.9375 9.51777 9.51777 9.9375 9 9.9375C8.48223 9.9375 8.0625 9.51777 8.0625 9Z"
                        fill={mode === "dark" ? "#EAEAEA" : "#6A6A6A"}
                      />
                      <path
                        d="M4.5 9.375C4.70711 9.375 4.875 9.20711 4.875 9C4.875 8.79289 4.70711 8.625 4.5 8.625C4.29289 8.625 4.125 8.79289 4.125 9C4.125 9.20711 4.29289 9.375 4.5 9.375Z"
                        fill={mode === "dark" ? "#EAEAEA" : "#6A6A6A"}
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.5 9.1875C4.60355 9.1875 4.6875 9.10355 4.6875 9C4.6875 8.89645 4.60355 8.8125 4.5 8.8125C4.39645 8.8125 4.3125 8.89645 4.3125 9C4.3125 9.10355 4.39645 9.1875 4.5 9.1875ZM3.5625 9C3.5625 8.48223 3.98223 8.0625 4.5 8.0625C5.01777 8.0625 5.4375 8.48223 5.4375 9C5.4375 9.51777 5.01777 9.9375 4.5 9.9375C3.98223 9.9375 3.5625 9.51777 3.5625 9Z"
                        fill={mode === "dark" ? "#EAEAEA" : "#6A6A6A"}
                      />
                    </svg>
                  </button>
                  <label className="inline-flex items-center cursor-pointer border-start pl-[16px]">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      onChange={() => {
                        setCheckAll(false);
                        handleChecked(al.name, !al.isCheck);
                      }}
                    />
                    <div
                      className={`relative w-11 h-6 rounded-full peer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${
                        al.isCheck
                          ? "bg-[#4470EF] after:translate-x-full"
                          : "bg-[#D1D1D6] rtl:peer-checked:after:-translate-x-full"
                      }`}
                    ></div>
                  </label>
                </div>
              </div>
            ))}
          </div>
          {allAlarmsCounts > curPagesize && (
            <div className="w-full mt-[24px] flex items-end justify-end gap-[12px]">
              <button
                disabled={offset <= 0}
                onClick={() => {
                  // handleGetAllFilters(`${curPage - 1}`);
                  setOffset((off) => off - 10);
                  setEndOffset((cur) => cur - 10);
                }}
                className="bg-primary font-medium text-center w-32 p-2 text-white rounded-md"
              >
                Prevous
              </button>
              <button
                disabled={endOffset >= allAlarmsCounts}
                onClick={() => {
                  // handleGetAllFilters(`${curPage + 1}`);
                  setOffset((off) => off + 10);
                  setEndOffset((cur) => cur + 10);
                }}
                className="bg-primary font-medium text-center w-32 p-2 text-white rounded-md"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className="border-bottom-0  items-start">
          <Modal.Title className="w-full flex items-center justify-center">
            {errType !== "failed" ? (
              <div className="flex-1 flex items-center justify-center">
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
                  <g clipPath="url(#clip0_1149_5645)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M21 12.9375C16.5472 12.9375 12.9375 16.5472 12.9375 21C12.9375 25.4528 16.5472 29.0625 21 29.0625C25.4528 29.0625 29.0625 25.4528 29.0625 21C29.0625 16.5472 25.4528 12.9375 21 12.9375ZM17.6478 20.9773C17.4282 20.7576 17.072 20.7576 16.8523 20.9773C16.6327 21.1969 16.6327 21.5531 16.8523 21.7727L19.1023 24.0227C19.322 24.2424 19.6782 24.2424 19.8978 24.0227L25.1478 18.7727C25.3675 18.5531 25.3675 18.1969 25.1478 17.9773C24.9282 17.7576 24.572 17.7576 24.3523 17.9773L19.5001 22.8295L17.6478 20.9773Z"
                      fill="#284CB3"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1149_5645">
                      <rect
                        width="18"
                        height="18"
                        fill="white"
                        transform="translate(12 12)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            ) : (
              <div className="rounded-full w-fit p-[12px] bg-[#FF161A1A] flex items-center justify-center">
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
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-[25px]">
          <h1 className="font-medium text-center text-[14px] md:text-[18px]">
            {errMessage}
          </h1>
        </Modal.Body>
        <Modal.Footer className="border-0 items-end justify-end ">
          <button
            onClick={() => setShowModal(false)}
            className="bg-primary font-medium w-36 rounded-full text-white px-[24px] py-[12px]"
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CloudTrail;
