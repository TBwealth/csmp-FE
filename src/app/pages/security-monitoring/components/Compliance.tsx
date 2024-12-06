import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { AgCharts } from "ag-charts-react";
import modeAtomsAtom from "../../../atoms/modeAtoms.atom";
import awsLogo from "../../../../../public/media/logos/aws-light.svg";
import { useGetCloudProviderResourceTypes } from "../../../api/api-services/cloudProviderQuery";
import { CloudProviderCloudProviderResourceTypesList200Response } from "../../../api/axios-client";
import isoImg from "../../../../../public/media/logos/iso-img.svg";
import pciImg from "../../../../../public/media/logos/pci-img.svg";
import hippaImg from "../../../../../public/media/logos/hippa-img.svg";
import gdprImg from "../../../../../public/media/logos/gdpr-img.svg";
import awsrImg from "../../../../../public/media/logos/aws-black-img.svg";
import aicpImg from "../../../../../public/media/logos/aicpa-img.svg";
import cisImg from "../../../../../public/media/logos/cis-img.svg";
import nistImg from "../../../../../public/media/logos/nist.svg";
import { BsGraphUp } from "react-icons/bs";
import { CiCalendar } from "react-icons/ci";
import { FaPlay } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import getData from "../../workload/components/model";

const Card = ({ data, showTrend, mode }: any) => {
  return (
    <div
      className={`w-full border ${
        mode === "dark" ? "bg-lightDark" : "bg-white"
      } p-[16px] rounded-[12px] flex flex-col md:flex-row items-start md:items-center mb-[16px] justify-between gap-[8px]`}
    >
      <div className="flex items-center gap-[8px]">
        <img
          src={
            data?.logo === "iso"
              ? isoImg
              : data?.logo === "gdpr"
              ? gdprImg
              : data?.logo === "aws"
              ? awsrImg
              : data?.logo === "nist"
              ? nistImg
              : data?.logo === "cis"
              ? cisImg
              : data?.logo === "hippa"
              ? hippaImg
              : data?.logo === "pci"
              ? pciImg
              : aicpImg
          }
          alt={`${data?.name} logo`}
          className="w-10 h-10"
        />
        <h2 className="font-semibold text-start text-[14px]">{data?.name}</h2>
      </div>
      <div className="flex items-center gap-[16px]">
        {data?.hasTrend && (
          <button onClick={showTrend} className="border-end pr-[16px]">
            <BsGraphUp color="#EAEAEA" size={20} />
          </button>
        )}
        <div className="flex items-center gap-[8px] pr-[16px] border-end">
          <CiCalendar color={mode === "dark" ? "#EAEAEA" : "#373737"} />
          <p className="text-[12px] text-start font-medium">
            Last scanned {data?.date}
          </p>
        </div>
        <p className="text-[16px] text-start font-semibold border-end pr-[16px]">
          {data?.score}
        </p>
        <button>
          <FaPlay color="#2AB849" />
        </button>
      </div>
    </div>
  );
};

const Compliance = () => {
  const { mode } = useRecoilValue(modeAtomsAtom);
  const [allServices, setAllServices] = useState<any[]>([]);
  const [selectedServ, setSelectedServ] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedData, setSelectedData] = useState<any>({});
  const [selectedServName, setSelectedServName] = useState("");
  const location = window.origin;

  const handleGetAllFilters = async () => {
    // const token = localStorage.getItem("token");
    // setIsLoading(true);
    // try {
    //   const resp = await axios.get(
    //     `https://cspm-api.midrapps.com/system_settings/api/v1/cloud_trail_filters/?page=1&page_size=100`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );
    //   if (resp.status === 200) {
    //     if (resp.data?.data?.results) {
    //       const mapped = resp?.data?.data?.results.map((res: any) => {
    //         return {
    //           id: res?.id,
    //           name: res?.name,
    //           description: res?.description,
    //           isCheck: true,
    //         };
    //       });
    //       setAllAlerms(mapped);
    //       setAllOtherAlerms(mapped);
    //     }
    //     setAllAlarmsCounts(resp?.data?.data?.count);
    //     setALLActiveAlarms(resp?.data?.data?.count);
    //     setIsLoading(false);
    //   }
    // } catch (err) {
    //   setIsLoading(false);
    //   console.log(err);
    // }
  };

  const { data } = useGetCloudProviderResourceTypes({
    page: 1,
    pageSize: 1000,
  });
  const datastsr: CloudProviderCloudProviderResourceTypesList200Response | any =
    data;

  useEffect(() => {
    setAllServices(datastsr?.data?.data?.results ?? []);
    if (datastsr?.data?.data?.results) {
      setSelectedServ(datastsr?.data?.data?.results[0]?.id);
      setSelectedServName(datastsr?.data?.data?.results[0]?.account_name);
      //   setSetup({
      //     ...setup,
      //     cloud_provider_account_id: datastsr?.data?.data?.results[0]?.id,
      //   });
    }
  }, [datastsr]);

  const allData = [
    {
      logo: "iso",
      name: "ISO/IEC 27001",
      date: "23/14/24",
      score: "85%",
      hasTrend: true,
      id: 0,
    },
    {
      logo: "gdpr",
      name: "General Data Protection Regulation. EU",
      date: "23/14/24",
      score: "15%",
      hasTrend: false,
      id: 1,
    },
    {
      logo: "aws",
      name: "AWS Security Benchmarks",
      date: "23/14/24",
      score: "15%",
      hasTrend: false,
      id: 2,
    },
    {
      logo: "nist",
      name: "NIST Cloud Compliance",
      date: "23/14/24",
      score: "15%",
      hasTrend: false,
      id: 3,
    },
    {
      logo: "cis",
      name: "CIS Policy Benchmarks",
      date: "23/14/24",
      score: "15%",
      hasTrend: false,
      id: 4,
    },
    {
      logo: "aicpa",
      name: "AICPA SOC 2024",
      date: "23/14/24",
      score: "15%",
      hasTrend: false,
      id: 5,
    },
  ];

  const handleSetSelected = (id: number) => {
    const filtered = allData.filter((d) => d?.id === id);
    setSelectedData(filtered[0]);
  };

  const lineData: any = {
    data: getData(),
    theme: {
      overrides: {
        line: {
          series: {
            interpolation: {
              type: "smooth",
            },
            marker: {
              enabled: false,
            },
            tooltip: {
              renderer: ({ title, datum, xKey, yKey }: any) => ({
                title,
                content:`${datum[xKey]} - ${datum[yKey]}`,
              }),
            },
          },
        },
      },
    },
    // showInLegend: false,
    series: [
      {
        type: "line",
        xKey: "age",
        xName: "Month",
        yKey: "timeSpentAlone",
        yName: "Resolved",
        stroke: "#2AB849",
      },
      {
        type: "line",
        xKey: "age",
        xName: "Month",
        yKey: "timeSpentWithFriends",
        yName: "Unresolved",
        stroke: "#FF7D30",
      },
      {
        type: "line",
        xKey: "age",
        xName: "Month",
        yKey: "timeSpentWithFamily",
        yName: "content",
        stroke: "#E697FF",
      },
    ],
  }

  return (
    <div className="px-8 mt-[32px] w-full">
      <p
        className={`text-[12px] mb-[24px] font-medium ${
          mode === "dark" ? "text-[#FFFFFF]" : "text-[#6A6A6A]"
        }`}
      >
        Showing compliance score and standards across your environments. To
        learn more about compliance standard{" "}
        <a
          target="_blank"
          href={`${location}/compliance`}
          className="text-primary font-semibold"
        >
          click here
        </a>
      </p>
      <div className="flex items-center border-bottom pb-[8px] mb-[24px] justify-between flex-col md:flex-row gap-[10px]">
        <div className="flex items-center gap-[18px]">
          <div className="flex items-center gap-[8px] pr-[18px] border-end">
            <img src={awsLogo} alt="aws logo" />
            <select
              name="service"
              id="services"
              value={selectedServ}
              className="bg-transparent p-[6px] font-medium"
              onChange={(e) => {
                //   setSetup({
                //     ...setup,
                //     cloud_provider_account_id: Number(e.target.value),
                //   });
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
          <p
            className={`text-[12px] font-medium ${
              mode === "dark" ? "text-[#FFFFFF]" : "text-[#6A6A6A]"
            }`}
          >
            Switch environment
          </p>
        </div>
        <div className="flex items-center gap-[16px] justify-between">
          <div className="relative">
            <input
              type="text"
              //   onChange={(e) => handleSearch(e.target.value)}
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
            className="flex text-[10px] border-start md:text-[12px] font-medium items-center pl-[16px] gap-3"
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
      <div className="w-full">
        {allData.map((d) => (
          <Card
            data={d}
            mode={mode}
            key={d?.id}
            showTrend={() => {
              setShowPopup(!showPopup);
              handleSetSelected(d?.id);
            }}
          />
        ))}
      </div>
      <Modal
        show={showPopup}
        onHide={() => {
          setShowPopup(false);
        }}
        keyboard={false}
        size="lg"
      >
        <Modal.Header
          closeButton
          className="border-0 pt-3 pr-3 pb-0"
        ></Modal.Header>
        <Modal.Body className="p-0">
          <div className="w-full pb-[16px]  border-bottom flex items-center justify-center flex-col gap-2">
            <div className="bg-[#284CB31A] rounded-full w-12 h-12 flex items-center justify-center">
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
                  d="M5.4375 9C5.4375 10.9675 7.03249 12.5625 9 12.5625C10.9675 12.5625 12.5625 10.9675 12.5625 9C12.5625 7.03249 10.9675 5.4375 9 5.4375C7.03249 5.4375 5.4375 7.03249 5.4375 9ZM9 11.4375C7.65381 11.4375 6.5625 10.3462 6.5625 9C6.5625 7.65381 7.65381 6.5625 9 6.5625C10.3462 6.5625 11.4375 7.65381 11.4375 9C11.4375 10.3462 10.3462 11.4375 9 11.4375Z"
                  fill="#284CB3"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.49171 16.8687C9.18592 17.0386 8.81409 17.0386 8.50829 16.8687L2.20829 13.3687C1.88685 13.1901 1.6875 12.8513 1.6875 12.4836L1.68749 5.51316C1.68749 5.14545 1.88684 4.80665 2.20827 4.62807L8.50829 1.12807C8.81409 0.958186 9.18592 0.958185 9.49171 1.12807L15.7917 4.62807C16.1131 4.80665 16.3125 5.14545 16.3125 5.51315L16.3125 12.4836C16.3125 12.8513 16.1131 13.1901 15.7917 13.3687L9.49171 16.8687ZM9 15.8549L15.1875 12.4174L15.1875 5.57935L9 2.14185L2.81249 5.57935L2.8125 12.4174L9 15.8549Z"
                  fill="#284CB3"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.8666 5.18396C15.7157 4.91239 15.3733 4.81455 15.1017 4.96542L11.4267 7.00709C11.1552 7.15796 11.0573 7.50041 11.2082 7.77198C11.3591 8.04355 11.7015 8.14139 11.9731 7.99052L15.6481 5.94885C15.9196 5.79798 16.0175 5.45552 15.8666 5.18396ZM2.15451 5.19581C2.00364 5.46737 2.10149 5.80983 2.37305 5.9607L6.02674 7.99052C6.29831 8.14139 6.64076 8.04354 6.79163 7.77198C6.9425 7.50041 6.84466 7.15796 6.57309 7.00709L2.9194 4.97727C2.64783 4.8264 2.30538 4.92424 2.15451 5.19581Z"
                  fill="#284CB3"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9 16.3125C8.68934 16.3125 8.4375 16.0607 8.4375 15.75V12C8.4375 11.6893 8.68934 11.4375 9 11.4375C9.31066 11.4375 9.5625 11.6893 9.5625 12V15.75C9.5625 16.0607 9.31066 16.3125 9 16.3125Z"
                  fill="#284CB3"
                />
              </svg>
            </div>
            <h1 className="text-[18px] font-semibold">Posture Trend</h1>
            <p
              className={`text-[12px] font-medium ${
                mode === "dark" ? "text-[#FFFFFF]" : "text-[#6A6A6A]"
              }`}
            >
              Shows the posture overtime of your environment against a policy
              checkup
            </p>
          </div>
          <div className="w-full p-[24px]">
            <div className="w-full flex items-center justify-center gap-[4px] mb-[24px]">
              <img
                src={
                  selectedData?.logo === "iso"
                    ? isoImg
                    : selectedData?.logo === "gdpr"
                    ? gdprImg
                    : selectedData?.logo === "aws"
                    ? awsrImg
                    : selectedData?.logo === "nist"
                    ? nistImg
                    : selectedData?.logo === "cis"
                    ? cisImg
                    : selectedData?.logo === "hippa"
                    ? hippaImg
                    : selectedData?.logo === "pci"
                    ? pciImg
                    : aicpImg
                }
                alt={`${selectedData?.name} logo`}
                className="w-10 h-10"
              />
              <h2 className="font-semibold text-start text-[14px]">
                {selectedData?.name}
              </h2>
            </div>
            <div className="border rounded-[5px] p-[8px]">
              <div className="flex items-center justify-between mb-[16px]">
                <p className="text-[12px] font-medium">
                  Posture Trend Sample Chart
                </p>
                <select name="" id="" className="w-[96px] font-semibold">
                  <option className="font-medium" value="Monthly">
                    Monthly
                  </option>
                  <option className="font-medium" value="Daily">
                    Daily
                  </option>
                  <option className="font-medium" value="Yearly">
                    Yearly
                  </option>
                </select>
              </div>
              <div className="flex items-center w-full justify-center">
              <AgCharts options={lineData} className="w-full" />
            </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Compliance;
