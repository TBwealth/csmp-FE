import React, { useEffect, useState } from "react";
import {
  useCreateAssets,
  useUpdateAssets,
  useGetRegions,
} from "../../../api/api-services/systemQuery";
import useAlert from "../../components/useAlert";
import axios from "axios";
import { useGetCloudProviderResourceTypes } from "../../../api/api-services/cloudProviderQuery";
import { Modal } from "react-bootstrap";
import { useGetAccountTenant } from "../../../api/api-services/accountQuery";
import {
  AccountsApiTenantsList200Response,
  CloudProviderCloudProviderResourceTypesList200Response,
  CloudProviderResourceTypesList200Response,
} from "../../../api/axios-client";
import { useGetCloudProviderServicesList } from "../../../api/api-services/cloudProviderQuery";
import { Link } from "react-router-dom";
import { FaCloud, FaCube, FaGlobe } from "react-icons/fa";
import { dropDownSetting } from "../../../components/tableComponents/models";
import { MultiSelectComponent } from "../../../components/multiSelect/multiselect";

type Asset = {
  id?: number;
  tenant: number;
  resource_types: number;
  name: string;
  code: string;
  public_ip?: string;
  description: string;
  cloud_identifier: string;
  cloud_provider: string;
  region: number;
};

///cloud_provider/cloud_provider/{id}/

const AssetModal = ({
  editItem,
  handleHide,
  isOpen,
  action,
  handleRefetch,
  mode,
}: any) => {
  const [asset, setAsset] = useState<any>({
    region: editItem?.region ?? "",
    cloud_identifier: editItem?.cloud_identifier ?? "",
    cloud_provider: editItem?.cloud_provider ?? "AWS",
    services: editItem?.services ?? "",
    name: editItem?.name ?? "",
    resource_types: editItem?.resource_types ?? "",
    cloud_account: editItem?.cloud_account ?? 0,
    tag_ids: editItem?.tags ?? [],
  });

  const [token, setToken] = useState("");
  const [listTenants, setListTenants] = useState<any[]>([]);
  const [pageSize, setPageSize] = useState(100);
  const [page, setPage] = useState(1);
  const [listRegions, setListRegions] = useState<any[]>([]);
  const [listClouds, setListClouds] = useState<any[]>([]);
  const [allServices, setAllServices] = useState<any[]>([]);
  const [allCloudAccounts, setAllCloudAccounts] = useState<any[]>([]);
  const [listTags, setListTags] = useState<any[]>([]);
  const { showAlert, hideAlert, Alert } = useAlert();
  const { data: tenantData } = useGetAccountTenant({ page, pageSize });

  const { data: cloud } = useGetCloudProviderResourceTypes({
    page: 1,
    pageSize: 1000,
  });
  const { data: regions } = useGetRegions({ page: 1, pageSize: 1000 });

  const cloudstsr:
    | CloudProviderCloudProviderResourceTypesList200Response
    | any = cloud;
  const datastsr: AccountsApiTenantsList200Response | any = tenantData;
  const regionstsr: AccountsApiTenantsList200Response | any = regions;

  const { mutate, isLoading, error } = useCreateAssets();

  const dropdown: dropDownSetting = {
    selectAllText: "Select All",
    unSelectAllText: "UnSelect All",
    singleSelection: true,
    allowSearchFilter: true,
    itemsShowLimit: 3,
  };

  const {
    mutate: assetEdit,
    isLoading: assetIsLoading,
    error: assetError,
  } = useUpdateAssets(editItem ? editItem?.id : 0);

  const handleSubmit = () => {
    mutate(
      {
        data: {
          ...asset,
          tag_ids: Array.from(new Set(asset.tag_ids))
        },
      },
      {
        onSuccess: (res) => {
          setAsset({
            tenant: 0,
            region: "",
            cloud_identifier: "",
            cloud_provider: "AWS",
            service: "",
            cloud_account: 0,
            name: "",
            resource_types: "",
          });
          handleRefetch();
          handleHide();
          showAlert("data created successfully", "success");
        },
        onError: () => {
          if (error instanceof Error) {
            showAlert(error?.message || "An unknow error occurred", "danger");
          }
        },
      }
    );
  };

  useEffect(() => {
    const localToken = localStorage.getItem("token") ?? "";
    console.log(localToken);
    setToken(localToken);
  }, []);

  const editHandleSubmit = () => {
    assetEdit(
      { id: editItem?.id, data: { ...asset } },
      {
        onSuccess: (res) => {
          setAsset({
            tenant: 0,
            region: "",
            cloud_identifier: "",
            cloud_provider: "AWS",
            service: "",
            cloud_account: 0,
            name: "",
            resource_types: "",
          });
          handleRefetch();
          handleHide();
          showAlert("data updated successfully", "success");
          console.log(res);
        },

        onError: () => {
          if (assetError instanceof Error) {
            showAlert(
              assetError?.message || "An unknown error occurred",
              "danger"
            );
          }
        },
      }
    );
  };

  // const handleFetchProviderResource = async (id: string) => {
  //   try {
  //     const res = await axios.get(
  //       `https://cspm-api.midrapps.com/cloud_provider/resource_types/?cloud_provider=${id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     if (res?.status === 200) {
  //       setListResources(res?.data?.data?.results);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleFetchAllServiceResource = async () => {
    try {
      const res = await axios.get(
        `https://cspm-api.midrapps.com/cloud_provider/service_resource_types/?page=1&page_size=1000`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res?.status === 200) {
        setListClouds(res?.data?.data?.results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetTags = async () => {
    try {
      const res = await axios.get(
        `https://cspm-api.midrapps.com/system_settings/tags/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setListTags(res.data.data.results);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const { data: resource } = useGetCloudProviderServicesList({
    page: 1,
    pageSize: 1000,
  });
  const resourcestr: CloudProviderResourceTypesList200Response | any = resource;

  useEffect(() => {
    handleFetchAllServiceResource();
    handleGetTags();
  }, []);
  useEffect(() => {
    setListTenants(datastsr?.data?.data?.results ?? []);
    setAllCloudAccounts(cloudstsr?.data?.data?.results ?? []);
    setListRegions(regionstsr?.data?.data?.results ?? []);
    setAllServices(resourcestr?.data?.data?.results ?? []);
    // handleFetchProviderResource("AWS");
  }, [tenantData, regionstsr, cloudstsr, resourcestr]);

  return (
    <>
      <Modal
        show={isOpen}
        onHide={handleHide}
        backdrop="static"
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
              {action === "edit" ? "Edit this Asset" : "Add New Cloud Asset"}
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
            you can add custom cloud asset to your inventory for easy management
            and overview
          </p>
          <div className="grid md:grid-cols-2 gap-[16px] mt-[24px]">
            {/* Name */}
            <div className="">
              <label className="form-label fs-6 font-medium gap-[8px] flex items-center">
                <FaCube />
                <span>
                  Asset Name: <sup className="text-red-500">*</sup>
                </span>
              </label>
              <input
                placeholder="Enter Name"
                type="text"
                name="text"
                autoComplete="off"
                className="form-control bg-transparent"
                value={asset.name}
                onChange={(e) => setAsset({ ...asset, name: e.target.value })}
              />
            </div>
            {/* cloud provider */}
            <div className="">
              <label className="form-label fs-6 font-medium gap-[8px] flex items-center">
                <FaCloud />
                <span>
                  Cloud Provider <sup className="text-red-500">*</sup>
                </span>
              </label>
              <select
                className="form-select bg-transparent  font-mediumer"
                data-placeholder="Select option"
                value={asset.cloud_provider}
                onChange={(e) => {
                  // handleFetchProviderResource(e.target.value);
                  setAsset({ ...asset, cloud_provider: e.target.value });
                }}
              >
                <option value="">Select a Provider</option>
                {[
                  {
                    id: "aws",
                    name: "aws",
                  },
                  {
                    id: "azure",
                    name: "azure",
                  },
                  {
                    id: "gpc",
                    name: "gpc",
                  },
                ]?.map((item) => (
                  <option
                    key={item?.id}
                    value={item?.id}
                    className="font-medium"
                  >
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>
            {/* services */}
            <div className="">
              <label className="form-label fs-6 font-medium gap-[8px] flex items-center">
                <FaCube />
                <span>
                  Services: <sup className="text-red-500">*</sup>
                </span>
              </label>
              <select
                className="form-select bg-transparent font-mediumer"
                data-placeholder="Select option"
                value={asset.services}
                onChange={(e) => {
                  setAsset({ ...asset, services: e.target.value });
                }}
              >
                <option value="">Select Service</option>
                {allServices.map((item) => (
                  <option
                    key={item?.resource_type}
                    value={item?.resource_type}
                    className="font-medium"
                  >
                    {item?.resource_type}
                  </option>
                ))}
              </select>
            </div>
            {/* cloud identifier */}
            <div className="">
              <label className="form-label fs-6 font-medium gap-[8px] flex items-center">
                <FaCube />
                <span>
                  Cloud Identifier: <sup className="text-red-500">*</sup>
                </span>
              </label>
              <input
                placeholder="Enter Cloud Identifier"
                type="text"
                name="text"
                autoComplete="off"
                maxLength={50}
                className="form-control bg-transparent"
                value={asset.cloud_identifier}
                onChange={(e) =>
                  setAsset({ ...asset, cloud_identifier: e.target.value })
                }
              />
            </div>
            {/* resource types */}
            <div className="">
              <label className="form-label fs-6 font-medium gap-[8px] flex items-center">
                <FaCube />
                <span>
                  Resource Type: <sup className="text-red-500">*</sup>
                </span>
              </label>
              <select
                className="form-select bg-transparent font-mediumer"
                data-placeholder="Select option"
                value={asset.resource_types}
                onChange={(e) =>
                  setAsset({ ...asset, resource_types: e.target.value })
                }
              >
                <option value="">Select a resource type</option>
                {listClouds?.map((item) => (
                  <option
                    key={item?.service_resource}
                    value={item?.service_resource}
                    className="font-medium"
                  >
                    {item?.service_resource}
                  </option>
                ))}
              </select>
            </div>
            {/* region */}
            <div className="">
              <label className="form-label fs-6 font-medium gap-[8px] flex items-center">
                <FaGlobe />
                <span>
                  Region: <sup className="text-red-500">*</sup>
                </span>
              </label>
              <select
                className="form-select bg-transparent font-mediumer"
                data-placeholder="Select option"
                value={asset.region}
                onChange={(e) => setAsset({ ...asset, region: e.target.value })}
              >
                <option value="">Select a region</option>
                {listRegions?.map((item) => (
                  <option
                    key={item?.region_name}
                    value={item?.region_name}
                    className="font-medium"
                  >
                    {item?.region_name}
                  </option>
                ))}
              </select>
            </div>
            {/* cloud accounts */}
            <div className="">
              <label className="form-label fs-6 font-medium gap-[8px] flex items-center">
                <FaCube />
                <span>
                  Cloud Account: <sup className="text-red-500">*</sup>
                </span>
              </label>
              <select
                className="form-select bg-transparent font-mediumer"
                data-placeholder="Select option"
                value={asset.cloud_account}
                onChange={(e) =>
                  setAsset({ ...asset, cloud_account: +e.target.value })
                }
              >
                <option value="">Select account</option>
                {allCloudAccounts?.map((item) => (
                  <option
                    key={item?.id}
                    value={item?.id}
                    className="font-medium"
                  >
                    {item?.account_name}
                  </option>
                ))}
              </select>
            </div>
            {/* tags */}
            <div className="">
              <label className="form-label fs-6 font-medium gap-[8px] flex items-center">
                <FaCube />
                <span>
                  Tags: <sup className="text-red-500">*</sup>
                </span>
              </label>
              <div className="flex-1">
                <MultiSelectComponent
                  dropDownSettings={dropdown}
                  data={listTags}
                  enableAddNew={false}
                  value={""}
                  change={(e) => {}}
                  onAddNewClick={() => {}}
                  onItemSelect={() => {}}
                  onSelectAll={() => {}}
                  othersClick={(e) => console.log(e)}
                  placeholder="Select Option"
                  valueChange={(e) => {
                    // let splt = e.split(",")
                    // console.log(splt);
                      setAsset({
                        ...asset, tag_ids: [...asset.tag_ids, e]
                      })
                  }}
                  idField="id"
                  textField="name"
                />
              </div>
              {/* <select
                className="form-select bg-transparent font-mediumer"
                data-placeholder="Select option"
                value={asset.cloud_account}
                onChange={(e) =>
                  setAsset({ ...asset, cloud_account: +e.target.value })
                }
              >
                <option value="">Select tags</option>
                {listTags?.map((item) => (
                  <option
                    key={item?.id}
                    value={item?.id}
                    className="font-medium"
                  >
                    {item?.name}
                  </option>
                ))}
              </select> */}
            </div>
          </div>
        </Modal.Body>
        <Alert />
        <Modal.Footer className="border-top-0">
          <button
            type="button"
            className={`bg-[#284CB3] font-medium rounded-full px-[24px] py-[12px] text-white text-center`}
            disabled={!asset}
            onClick={action === "edit" ? editHandleSubmit : handleSubmit}
          >
            {(!isLoading || !assetIsLoading) && (
              <span className="indicator-label">Add Asset</span>
            )}
            {(isLoading || assetIsLoading) && (
              <span className="indicator-progress" style={{ display: "block" }}>
                Please wait...{" "}
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            )}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AssetModal;
