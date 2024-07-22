import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import DefaultContent from "../../components/defaultContent/defaultContent";
import useAlert from "../components/useAlert";
import AssetModal from "./modals/AssetModal";
import axios from "axios";
import { useRecoilValue } from "recoil";
import modeAtomsAtom from "../../atoms/modeAtoms.atom";
import { FaChevronLeft, FaGlobe, FaPlus, FaTimes } from "react-icons/fa";
import assetachi from "../../../../public/media/logos/assetachi.png";
import { Modal } from "react-bootstrap";
import TagCard from "./TagCard";
import Inventory from "./Inventory";
import AssetDetails from "./AssetDetails";
import awsLogo from "../../../../public/media/logos/aws-light.svg";

const Assets = () => {
  const [items, setItems] = useState<any[]>([]);
  const [itemsCopy, setItemsCopy] = useState<any[]>([]);
  const [allServices, setAllServices] = useState<any[]>([]);
  const [selectedServ, setSelectedServ] = useState("");
  const [allNewTags, setAllNewTag] = useState<string[]>([]);
  const [allAssetRegion, setAllAssetRegion] = useState<any[]>([]);
  const [allTags, setAllTags] = useState<any[]>([]);
  const [currentNewTage, setCurrNewTag] = useState("");
  const [panels, setPanel] = useState("");
  const [showInvDetail, setShowInvDetail] = useState(false);
  const [tagLoading, setTagLoading] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selAsset, setSelAsset] = useState<any>(null);
  const [selectedInv, setSelectedInv] = useState<any>(null);
  const [addingTag, setAddingTag] = useState(false);
  const [page, setPage] = useState(1);
  const { mode } = useRecoilValue(modeAtomsAtom);
  const [canNext, setCanNext] = useState(false);
  const [canPrev, setCanPrev] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const { showAlert, Alert, hideAlert } = useAlert();
  const [showModalType, setShowModalType] = useState("");
  const [allInstances, setAllInstances] = useState<any[]>([]);
  const [allInstancesCopy, setAllInstancesCopy] = useState<any[]>([]);
  const [showEmpty, setshowEmpty] = useState(false);
  const [newTag, setNewTag] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [action, setAction] = useState("");
  const currentPage = 0;
  const [totalItems, settotalItems] = useState<number>(0);
  const navigate = useNavigate();
  const [editItems, setEditItems] = useState<any | undefined>();
  const filter = useRef<any>({
    page: 1,
    pageSize: 10,
    services: undefined,
    ruleCode: undefined,
  });

  // get all assets under inventory
  const handleGetAllAssets = async (
    service: string,
    cloud_id: string | number
  ) => {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    try {
      const resp = await axios.get(
        `https://cspm-api.midrapps.com/system_settings/asset_managements/?page=${filter.current.page}&page_size=${filter.current.pageSize}&services=${service}&cloud_account=${cloud_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resp.status === 200) {
        setItems(resp?.data?.data?.results ?? []);
        setItemsCopy(resp?.data?.data?.results ?? []);
        settotalItems(resp?.data?.data?.count);
        setCanNext(resp.data?.data?.next ? true : false);
        setCanPrev(resp.data?.data?.previous ? true : false);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      // console.log(err);
    }
  };

  // all asset region
  const handleGetAssetsRegion = async (id: string | number) => {
    const token = localStorage.getItem("token");
    try {
      const resp = await axios.post(
        `https://cspm-api.midrapps.com/system_settings/asset_inventory_count_by_region/`,
        { cloud_account_id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resp.status === 200) {
        setAllAssetRegion(resp?.data?.data ?? []);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  // get all inventory
  const handleGetAllAssetsInventory = async (id: number) => {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    try {
      const resp = await axios.post(
        `https://cspm-api.midrapps.com/system_settings/asset_inventory_count_by_service/`,
        {
          cloud_account_id: `${id}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resp.status === 200) {
        setAllInstances(resp?.data?.data);
        setAllInstancesCopy(resp?.data?.data);
        setshowEmpty(resp?.data?.data ? resp?.data?.data.length === 0 : true);
        // settotalItems(Math.ceil(resp?.data?.data?.count));
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

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
        if (resp?.data?.data?.results) {
          handleGetAllAssetsInventory(resp?.data?.data?.results[0]?.id);
          handleGetAssetsRegion(resp?.data?.data?.results[0]?.id);
        }
        // setSelectedServName(resp?.data?.data?.results[0]?.account_name);
        // setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  // get tags
  const handleGetAllTags = async () => {
    setTagLoading(true);
    const token = localStorage.getItem("token");
    try {
      const resp = await axios.get(
        `https://cspm-api.midrapps.com/system_settings/tags/?page=1&page_size=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resp.status === 200) {
        setAllTags(resp?.data?.data?.results ?? []);
        hideAlert();
        setTagLoading(false);
      }
    } catch (err) {
      setTagLoading(false);
      console.log(err);
    }
  };
  // add tags
  const handleAddTags = async () => {
    setAddingTag(true);
    const token = localStorage.getItem("token");
    try {
      const resp = await axios.post(
        `https://cspm-api.midrapps.com/system_settings/tags/?page=1&page_size=10`,
        {
          names: allNewTags,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resp.status === 201) {
        handleGetAllTags();
        setAllNewTag([]);
        setNewTag(false);
        setAddingTag(false);
      }
    } catch (err: any) {
      showAlert(err?.response?.data?.message, "danger");
      setAddingTag(false);
      console.log(err);
    }
  };

  const handleRemoveFromAllNewTags = (val: string) => {
    const filtered = allNewTags.filter((all) => all !== val);
    setAllNewTag(filtered);
  };

  useEffect(() => {
    if (selectedInv) {
      handleGetAllAssets(selectedInv.services, selectedServ);
    }
  }, [selectedInv?.id]);

  useEffect(() => {
    handleGetAllCloudAccount();
    handleGetAllTags();
  }, []);

  function refreshrecord() {
    if (showInvDetail) {
      handleGetAllAssets(selectedInv.services, selectedServ);
    } else {
      handleGetAllAssetsInventory(+selectedServ);
    }
  }

  function filterUpdated(data: any) {
    filter.current = {
      page: data?.page ?? 1,
      pageSize: data?.pageSize ?? 10,
    };
    handleGetAllAssets(selectedInv.services, selectedServ);
  }

  const handleSearch = (val: string) => {
    const keys = showInvDetail
      ? ["name", "resource_types", "services", "cloud_identifier", "region"]
      : ["services"];
    if (showInvDetail) {
      if (val) {
        const filterd = items.filter((item) =>
          keys.some((key) =>
            item[key].toLowerCase().includes(val.toLowerCase())
          )
        );
        setItems(filterd);
      } else {
        setItems(itemsCopy);
      }
    } else {
      if (val) {
        const filterd = allInstances.filter((item) =>
          keys.some((key) =>
            item[key].toLowerCase().includes(val.toLowerCase())
          )
        );
        setAllInstances(filterd);
      } else {
        setAllInstances(allInstancesCopy);
      }
    }
  };

  return (
    <div className="w-full px-10 mt-[32px]">
      <div className="flex items-center justify-between w-full md:w-fit flex-row gap-[24px] mb-[36px]">
        <div className="flex items-center gap-[8px]">
          <img src={awsLogo} alt="aws logo" />
          <select
            name="service"
            id="services"
            value={selectedServ}
            className="bg-transparent font-semibold w-64 p-4"
            onChange={(e) => {
              setSelectedServ(e.target.value);
              filter.current = {
                ...filter.current,
                page: 1,
                pageSize: 10
              }
              // const filtered = allServices.find(
              //   (serv) => serv.id === Number(e.target.value)
              // )?.account_name;
              // setSelectedServName(filtered);
              handleGetAssetsRegion(e.target.value);
              handleGetAllAssetsInventory(Number(e.target.value));
              setShowInvDetail(false);
              setSelectedInv(null);
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
        <h1 className="font-semibold text-[12px] md:text-[14px] border-start border-end px-[24px]">
          Total assets : {`${allInstances?.length}`}
        </h1>
        <button className="flex items-center gap-[7px] font-semibold">
          <p className="underline">Export</p>
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
      <div className="grid grid-cols-1 md:grid-cols-12 gap-[16px] mb-[24px]">
        <div
          className={`${
            mode === "dark" ? "bg-lightDark" : "bg-white"
          } rounded-[8px] p-[24px] border md:col-span-6`}
        >
          <p
            className={`${
              mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
            } font-semibold text-[12px] md:text-[14px] flex items-center gap-[16px]`}
          >
            <FaGlobe />
            <span>Assets by Region</span>
          </p>
          <div className="flex items-center gap-[24px] mt-[16px]">
            {allAssetRegion.slice(0, 3).map((alreg) => (
              <div
                className="border-end text-start w-full md:w-[120px]"
                key={alreg.id}
              >
                <h1 className="font-medium text-[14px] mb-[2px] md:text-[18px]">
                  {alreg.count}
                </h1>
                <p className="font-medium text-[12px]">{alreg.region}</p>
              </div>
            ))}
            {allAssetRegion.length > 3 && (
              <div className="text-start">
                <h1 className="font-medium text-[14px] mb-[2px] md:text-[18px]">
                  {allAssetRegion.length - 3}+
                </h1>
                <Link
                  to="/cloud-provider/cloud/region"
                  className="font-medium text-[12px] text-primary underline"
                >
                  View all
                </Link>
              </div>
            )}
          </div>
        </div>
        <div
          className={`${
            mode === "dark"
              ? "bg-gradient-to-r from-[#2A2C38] to-[#2A2C38]/20"
              : "bg-gradient-to-r from-[#FFF] to-[#F7F7F8]"
          } p-[24px] md:col-span-4 flex items-center justify-between rounded-[8px] border`}
        >
          <img src={assetachi} alt="asset architecture icon" />
          <button
            onClick={() =>
              navigate(`/cloud-provider/cloud/architecture/${selectedServ}`)
            }
            className="flex items-center gap-[16px]"
          >
            <h2 className="font-medium text-[14px]">View Architecture</h2>
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
          </button>
        </div>
      </div>
      <div className="mt-[16px] py-[18px] border-bottom flex items-center justify-between">
        <h1 className="uppercase font-medium text-[12px] md:text-[14px]">
          Resource type
        </h1>
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
          <button
            onClick={() => setShowModalType("new_assets")}
            className="flex border-start pl-[16px] py-[4px] text-[10px] md:text-[12px] font-medium items-center gap-3"
          >
            <p>Add new</p>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.5 9H9M13.5 9H9M9 9V4.5M9 9V13.5"
                stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={() => setShowModalType("tags")}
            className="flex border-start pl-[16px] py-[4px] text-[10px] md:text-[12px] font-medium items-center gap-3"
          >
            <p>Tags</p>
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
                d="M5.25 2.8125C4.73223 2.8125 4.3125 3.23223 4.3125 3.75V14.7197L7.88469 12.4233C8.56409 11.9865 9.43591 11.9865 10.1153 12.4233L13.6875 14.7197V3.75C13.6875 3.23223 13.2678 2.8125 12.75 2.8125H5.25ZM3.1875 3.75C3.1875 2.61091 4.11091 1.6875 5.25 1.6875H12.75C13.8891 1.6875 14.8125 2.61091 14.8125 3.75V15.75C14.8125 15.9558 14.7001 16.1451 14.5195 16.2437C14.3389 16.3423 14.1189 16.3344 13.9458 16.2232L9.50696 13.3696C9.19814 13.1711 8.80186 13.1711 8.49304 13.3696L4.05418 16.2232C3.88109 16.3344 3.66106 16.3423 3.48046 16.2437C3.29985 16.1451 3.1875 15.9558 3.1875 15.75V3.75Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
            </svg>
          </button>
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
      {showEmpty || loading ? (
        <DefaultContent
          pageHeader="All Assets"
          pageDescription="No record found"
          loading={loading}
          buttonValue="Refresh"
          buttonClick={() => refreshrecord()}
        />
      ) : showInvDetail ? (
        <div className="w-full mt-[24px]">
          <div className="flex items-center gap-[16px]">
            <button
              className="bg-transparent"
              onClick={() => {
                filter.current = {
                  ...filter.current,
                  page: 1,
                  pageSize: 10,
                }
                setPageSize(10)
                setSelectedInv(null);
                setShowInvDetail(false);
              }}
            >
              <FaChevronLeft />
            </button>
            <select
              name=""
              id=""
              value={selectedInv?.services}
              onChange={(e) => {
                const inv = allInstances.find(
                  (inst) => inst.services === e.target.value
                );
                filter.current = {
                  ...filter.current,
                  page: 1,
                  pageSize: 10,
                }
                handleGetAllAssets(e.target.value, selectedServ);
                setSelectedInv(inv);
              }}
              className="bg-transparent font-semibold w-52 p-4"
            >
              <option className="font-semibold text-[14px]" value="">
                select
              </option>
              {allInstances.map((instance) => (
                <option
                  key={instance.id}
                  className="font-semibold text-[14px]"
                  value={instance.services}
                >
                  {instance.services}
                </option>
              ))}
            </select>
            <p className="font-semibold text-[12px] border-start pl-[16px]">
              {totalItems}{" "}
              <span className="font-medium">
                {totalItems > 1 ? "Instances" : "Instance"}
              </span>
            </p>
          </div>
          <div className="w-full mt-[24px]">
            <div
              className={`grid grid-cols-10  p-4 gap-[8px] rounded-t-[1.5rem] mb-3 border-bottom h-[52px] w-[280vw] md:w-[180vw] lg:w-full ${
                mode === "dark" ? "bg-lightDark" : "bg-white"
              }`}
            >
              <p className="font-semibold text-[12px] col-span-2">Name</p>
              <p className="font-semibold text-[12px]">Resource Type</p>
              <p className="font-semibold text-[12px]">Service</p>
              <p className="font-semibold text-[12px] col-span-2">
                Cloud Identifier
              </p>
              <p className="font-semibold text-[12px]">Cloud Provider</p>
              <p className="font-semibold text-[12px]">Region</p>
              <p className="font-semibold text-[12px] col-span-2">Tags</p>
            </div>
            {items.map((item) => (
              <Inventory
                key={item?.id}
                data={item}
                mode={mode}
                addTag={() => {
                  setSelAsset(item);
                  setShowDetail(true);
                  setPanel("tags");
                }}
                showDetails={() => {
                  setSelAsset(item);
                  setShowDetail(true);
                  setPanel("details");
                }}
              />
            ))}
          </div>
          <div className="mt-[10px]">
            <div className="flex items-center justify-between">
              {totalItems > pageSize && (
                <div className="flex items-center font-medium justify-between w-full">
                  <div className="flex items-center gap-2">
                    <p>page size:</p>
                    <select
                      value={String(filter.current.pageSize)}
                      onChange={(e) => {
                        filterUpdated({
                          ...filter.current,
                          page: 1,
                          pageSize: e.target.value,
                        });
                        setPageSize(+e.target.value);
                      }}
                      className="w-24 border-2 rounded-md p-2 bg-none"
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </div>
                  <div className="flex font-medium items-center gap-3">
                    <button
                      disabled={!canPrev}
                      onClick={() => {
                        if (page <= 1) {
                          setPage(1);
                          // useGetAllScanHistory(1, 5);
                        } else {
                          // useGetAllScanHistory(page - 1, 5);
                          setPage((page) => page - 1);
                          filterUpdated({ ...filter.current, page: page - 1 });
                        }
                      }}
                      className="p-2 rounded-md font-medium w-24 bg-primary text-white hover:bg-transparent hover:text-primary hover:border-primary"
                    >
                      Previous
                    </button>
                    <button
                      disabled={!canNext}
                      onClick={() => {
                        // useGetAllScanHistory(page + 1, 5)
                        setPage((page) => page + 1);
                        filterUpdated({ ...filter.current, page: page + 1 });
                      }}
                      className="p-2 bg-primary font-medium text-white rounded-md w-24 hover:bg-transparent hover:text-primary hover:border-primary"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full grid md:grid-cols-4 gap-[23px] mt-[24px]">
          {allInstances.map((d) => (
            <div
              key={d.id}
              className={`${
                mode === "dark" ? "bg-lightDark" : "bg-[#FFF]"
              } rounded-[12px] px-[24px] py-[16px] border`}
            >
              <div className="flex items-center justify-between pb-[12px] border-bottom">
                <h1 className="font-semibold text-[14px]">{d.services}</h1>
              </div>
              <div className="flex items-center justify-between pt-[12px]">
                <p className="font-bold text-[14px]">
                  {d.count}{" "}
                  <span className="font-medium">
                    {d.count > 1 ? "Instances" : "Instance"}
                  </span>
                </p>
                <button
                  className="font-medium underline"
                  onClick={() => {
                    setShowInvDetail(true);
                    handleGetAllAssets(d?.services, selectedServ);
                    setSelectedInv(d);
                  }}
                >
                  view all
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {showDetail && (
        <AssetDetails
          data={selAsset}
          handleHide={() => {
            setShowDetail(false);
            setPanel("");
          }}
          isOpen={showDetail}
          panel={panels}
          tagList={allTags}
          refetch={() => handleGetAllAssets(selAsset.services, selectedServ)}
        />
      )}

      {showModalType === "new_assets" && (
        <AssetModal
          isOpen={showModalType === "new_assets"}
          editItem={editItems}
          handleHide={() => setShowModalType("")}
          action={action}
          mode={mode}
          handleRefetch={() => {
            handleGetAllAssetsInventory(+selectedServ);
            handleGetAssetsRegion(+selectedServ);
          }}
        />
      )}
      <Modal
        show={showModalType === "tags"}
        onHide={() => {
          setShowModalType("");
          setCurrNewTag("");
          setAllNewTag([]);
          setNewTag(false);
          hideAlert();
        }}
        keyboard={false}
      >
        <Modal.Header closeButton className="border-bottom-0 pb-0">
          <Modal.Title className="flex items-center gap-[16px]">
            <div className="rounded-full p-[12px] bg-[#284CB30D] flex items-center justify-center">
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
                  d="M9.49171 16.8687C9.18592 17.0386 8.81409 17.0386 8.50829 16.8687L2.20829 13.3687C1.88685 13.1901 1.6875 12.8513 1.6875 12.4836L1.68749 5.51316C1.68749 5.14545 1.88684 4.80665 2.20827 4.62807L8.50829 1.12807C8.81409 0.958187 9.18592 0.958185 9.49171 1.12807L15.7917 4.62807C16.1131 4.80665 16.3125 5.14545 16.3125 5.51315L16.3125 12.4836C16.3125 12.8513 16.1131 13.1901 15.7917 13.3687L9.49171 16.8687ZM9 15.8549L15.1875 12.4174L15.1875 5.57935L9 2.14185L2.81249 5.57935L2.8125 12.4174L9 15.8549Z"
                  fill="#284CB3"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.8666 5.18396C15.7157 4.91239 15.3733 4.81455 15.1017 4.96542L8.99991 8.35532L2.9194 4.97727C2.64783 4.8264 2.30538 4.92424 2.15451 5.19581C2.00364 5.46737 2.10149 5.80983 2.37305 5.9607L8.5082 9.3691C8.814 9.53899 9.18583 9.53899 9.49163 9.3691L15.6481 5.94885C15.9196 5.79798 16.0175 5.45552 15.8666 5.18396Z"
                  fill="#284CB3"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9 16.3125C8.68934 16.3125 8.4375 16.0607 8.4375 15.75V9C8.4375 8.68934 8.68934 8.4375 9 8.4375C9.31066 8.4375 9.5625 8.68934 9.5625 9L9.5625 15.75C9.5625 16.0607 9.31066 16.3125 9 16.3125Z"
                  fill="#284CB3"
                />
              </svg>
            </div>
            <p className="text-[14px] md:text-[18px] pr-[16px] font-semibold border-end">
              Manage Tags
            </p>
            <Link
              to="/"
              className={`font-medium text-[12px] ${
                mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
              }`}
            >
              Learn more
            </Link>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p
            className={`font-medium text-[10px] md:text-[12px] ${
              mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
            }`}
          >
            Add and edit tags for proper asset inventory management
          </p>
          <div className="mt-[20px]">
            <div className="flex items-center justify-between mb-[24px]">
              <p className="text-[12px] md:text-[14px] font-semibold">
                {allTags.length} Tags
              </p>
              <button
                onClick={() => setNewTag(!newTag)}
                className="flex py-[4px] text-[10px] md:text-[12px] font-medium items-center gap-[8px]"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.5 9H9M13.5 9H9M9 9V4.5M9 9V13.5"
                    stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="underline">New tag</p>
              </button>
            </div>
            {newTag && (
              <div className="w-full mt-[24px]">
                <input
                  type="text"
                  value={currentNewTage}
                  onChange={(e) => setCurrNewTag(e.target.value)}
                  className="mb-[12px] font-medium w-full p-3 rounded-md border-2 border-light"
                  placeholder="Tag name"
                />
                <div className="flex items-center gap-[8px]">
                  <button
                    disabled={!currentNewTage}
                    className={`rounded-full h-[32px] w-[32px] flex items-center justify-center ${
                      mode === "dark" ? "bg-lightDark" : "bg-[#6A6A6A]"
                    }`}
                    onClick={() => {
                      setAllNewTag([...allNewTags, currentNewTage]);
                      setCurrNewTag("");
                    }}
                  >
                    <FaPlus color="white" />
                  </button>
                  <div className="flex items-center gap-[2px] flex-wrap">
                    {allNewTags.map((all) => (
                      <button
                        key={all}
                        onClick={() => handleRemoveFromAllNewTags(all)}
                        className="font-medium bg-[#EFEFEF] text-[#6A6A6A] rounded-full px-[8px] py-[2px]uppercase flex items-center justify-center gap-[8px] text-[10px]"
                      >
                        <span>{all}</span>
                        <FaTimes color="#284CB3" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {(tagLoading || allTags.length < 1) && (
              <DefaultContent
                pageHeader="All Tags"
                pageDescription="No record found"
                loading={tagLoading}
                buttonValue="Refresh"
                buttonClick={handleGetAllTags}
              />
            )}
            {!tagLoading && (
              <div className="grid md:grid-cols-2 gap-y-[16px] gap-x-[32px] mt-[24px]">
                {allTags.map((tag) => (
                  <TagCard
                    key={tag.id}
                    name={tag.name}
                    id={tag.id}
                    mode={mode}
                    refetch={handleGetAllTags}
                  />
                ))}
              </div>
            )}
          </div>
        </Modal.Body>
        <Alert />
        <Modal.Footer className="border-top-0">
          {newTag && allNewTags.length > 0 && (
            <button
              onClick={handleAddTags}
              className="bg-[#284CB3] w-fit font-medium rounded-full px-[24px] py-[12px] text-white text-center"
            >
              {addingTag ? "processing" : "save"}
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Assets;
