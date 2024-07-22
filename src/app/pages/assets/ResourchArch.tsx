import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import modeAtomsAtom from "../../atoms/modeAtoms.atom";
import { useParams } from "react-router-dom";
import axios from "axios";
import awsLogo from "../../../../public/media/logos/aws-light.svg";
import image22 from "../../../../public/media/logos/image22.svg";
import assetachi from "../../../../public/media/logos/assetachi.png";
import { FaServer } from "react-icons/fa";

const ResourchArch = () => {
  const {id} = useParams();
  const [selectedServ, setSelectedServ] = useState("");
  const [allServices, setAllServices] = useState<any[]>([]);
  const { mode } = useRecoilValue(modeAtomsAtom);
  const [loading, setIsLoading] = useState(false);
  // get cloud accounts
  const handleGetAllCloudAccount = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    try {
      const resp = await axios.get(
        `https://cspm-api.midrapps.com/cloud_provider/cloud_provider/?page=1&page_size=1000`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resp.status === 200) {
        setAllServices(resp?.data?.data?.results ?? []);
        setSelectedServ(resp?.data?.data?.results[0]?.id);
        // if (resp?.data?.data?.results) {
        //   handleGetAllAssetsInventory(resp?.data?.data?.results[0]?.id);
        //   handleGetAssetsRegion(resp?.data?.data?.results[0]?.id);
        // }
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetAllCloudAccount();
  }, []);

  return (
    <div className="w-full px-10 mt-[32px]">
      <div className="flex items-center justify-between gap-[12px] flex-col md:flex-row mb-[32px]">
        <div className="flex items-center justify-between w-fit flex-row gap-[24px]">
          <div className="flex items-center gap-[8px]">
            <img src={awsLogo} alt="aws logo" />
            <select
              name="service"
              id="services"
              value={selectedServ}
              className="bg-transparent font-semibold w-52 p-4"
              onChange={(e) => {}}
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
          <h1 className="font-medium py-[8px] text-[12px] md:text-[14px] border-start border-end px-[24px]">
            last updated 12/23/2024
          </h1>
          <button className="">
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
                d="M3.9375 15.5C3.9375 15.1893 4.18934 14.9375 4.5 14.9375L13.5 14.9375C13.8107 14.9375 14.0625 15.1893 14.0625 15.5C14.0625 15.8107 13.8107 16.0625 13.5 16.0625L4.5 16.0625C4.18934 16.0625 3.9375 15.8107 3.9375 15.5Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.60225 12.8977C8.82192 13.1174 9.17808 13.1174 9.39775 12.8977L12.0227 10.2727C12.2424 10.0531 12.2424 9.69692 12.0227 9.47725C11.8031 9.25758 11.4469 9.25758 11.2273 9.47725L9.5625 11.142V3.5C9.5625 3.18934 9.31066 2.9375 9 2.9375C8.68934 2.9375 8.4375 3.18934 8.4375 3.5V11.142L6.77275 9.47725C6.55308 9.25758 6.19692 9.25758 5.97725 9.47725C5.75758 9.69692 5.75758 10.0531 5.97725 10.2727L8.60225 12.8977Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
            </svg>
          </button>
        </div>
        <button
          //   onClick={handleAddTags}
          className="bg-[#284CB3] w-fit font-medium rounded-full px-[24px] py-[12px] text-white text-center"
        >
          Resync Diagram
        </button>
      </div>
      <div className="w-full p-[24px] rounded-[12px] bg-white flex items-center justify-center flex-col gap-[16px]">
        <h1 className="font-semibold text-[14px] md:text-[18px]">
          Cloud Architecture Overview {id}
        </h1>
        <div className="w-full md:w-fit grid grid-cols-2 md:grid-cols-4 border rounded-[12px] gap-[16px] p-[24px]">
          <div className="flex items-center justify-center">
            <img
              src={assetachi}
              alt="architecture icon"
              className="max-w-xs h-24"
            />
          </div>
          <div className="flex items-center gap-[8px] w-fit px-[16px] border-start border-end">
            <p className="font-semibold text-[14px] md:text-[18px]">14</p>
            <p
              className={`font-semibold text-[12px] md:text-[14px] ${
                mode === "dark" ? "#EAEAEA" : "#6A6A6A"
              }`}
            >
              Nodes
            </p>
            <svg
              width="16"
              height="13"
              viewBox="0 0 16 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 1.4375C0 0.726562 0.574219 0.125 1.3125 0.125H3.9375C4.64844 0.125 5.25 0.726562 5.25 1.4375V1.875H10.5V1.4375C10.5 0.726562 11.0742 0.125 11.8125 0.125H14.4375C15.1484 0.125 15.75 0.726562 15.75 1.4375V4.0625C15.75 4.80078 15.1484 5.375 14.4375 5.375H11.8125C11.0742 5.375 10.5 4.80078 10.5 4.0625V3.625H5.25V4.0625C5.25 4.11719 5.22266 4.17188 5.22266 4.19922L7.4375 7.125H10.0625C10.7734 7.125 11.375 7.72656 11.375 8.4375V11.0625C11.375 11.8008 10.7734 12.375 10.0625 12.375H7.4375C6.69922 12.375 6.125 11.8008 6.125 11.0625V8.4375C6.125 8.41016 6.125 8.35547 6.125 8.30078L3.9375 5.375H1.3125C0.574219 5.375 0 4.80078 0 4.0625V1.4375Z"
                fill={mode === "dark" ? "#EAEAEA" : "#6A6A6A"}
              />
            </svg>
          </div>
          <div className="flex items-center gap-[8px] w-fit pr-[16px] border-end">
            <p className="font-semibold text-[14px] md:text-[18px]">34</p>
            <p
              className={`font-semibold text-[12px] md:text-[14px] ${
                mode === "dark" ? "#EAEAEA" : "#6A6A6A"
              }`}
            >
              servers
            </p>
            <FaServer />
          </div>
          <div className="flex items-center gap-[8px] w-fit">
            <p className="font-semibold text-[14px] md:text-[18px]">34</p>
            <p
              className={`font-semibold text-[12px] md:text-[14px] ${
                mode === "dark" ? "#EAEAEA" : "#6A6A6A"
              }`}
            >
              servers
            </p>
            <FaServer />
          </div>
        </div>
        <img src={image22} alt="sample cloud architecture" />
      </div>
    </div>
  );
};

export default ResourchArch;
