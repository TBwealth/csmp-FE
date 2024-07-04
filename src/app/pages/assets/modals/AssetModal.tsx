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

const AssetModal = ({ editItem, handleHide, isOpen, action, handleRefetch }: any) => {
  const [asset, setAsset] = useState<any>({
    tenant: editItem?.tenant ?? 0,
    region: editItem?.region ?? "",
    cloud_identifier: editItem?.cloud_identifier ?? "",
    cloud_provider: editItem?.cloud_provider ?? "AWS",
    services: editItem?.services ?? "",
    name: editItem?.name ?? "",
    resource_types: editItem?.resource_types ?? "",
    cloud_account: editItem?.cloud_account ?? 0,
  });

  const [token, setToken] = useState("");
  const [listTenants, setListTenants] = useState<any[]>([]);
  const [pageSize, setPageSize] = useState(100);
  const [page, setPage] = useState(1);
  const [listRegions, setListRegions] = useState<any[]>([]);
  const [listClouds, setListClouds] = useState<any[]>([]);
  const [allServices, setAllServices] = useState<any[]>([]);
  const [allCloudAccounts, setAllCloudAccounts] = useState<any[]>([]);
  const [listResources, setListResources] = useState<any[]>([]);
  const { showAlert, hideAlert, Alert } = useAlert();
  const { data: tenantData } = useGetAccountTenant({ page, pageSize });

  const { data: cloud } = useGetCloudProviderResourceTypes({
    page: 1,
    pageSize: 1000,
  });
  const { data: regions } = useGetRegions({page: 1, pageSize: 1000});

  const cloudstsr:
    | CloudProviderCloudProviderResourceTypesList200Response
    | any = cloud;
  const datastsr: AccountsApiTenantsList200Response | any = tenantData;
  const regionstsr: AccountsApiTenantsList200Response | any = regions;

  const { mutate, isLoading, error } = useCreateAssets();

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

  const { data: resource } = useGetCloudProviderServicesList({
    page: 1,
    pageSize: 1000,
  });
  const resourcestr: CloudProviderResourceTypesList200Response | any = resource;

  useEffect(() => {
    handleFetchAllServiceResource();
  }, []);
  useEffect(() => {
    setListTenants(datastsr?.data?.data?.results ?? []);
    setAllCloudAccounts(cloudstsr?.data?.data?.results ?? []);
    setListRegions(regionstsr?.data?.data?.results ?? []);
    setAllServices(resourcestr?.data?.data?.results  ?? []);
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
        <Modal.Header closeButton>
          <Modal.Title>
            {action === "edit" ? "Edit this Asset" : "Create new Asset"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="grid md:grid-cols-2 gap-3">
            {/* tenant */}
            <div className="">
              <label className="form-label fs-6 fw-bold">Tenant:</label>
              <select
                data-placeholder="Select option"
                autoComplete="off"
                className="form-control bg-transparent"
                value={asset.tenant}
                onChange={(e) =>
                  setAsset({ ...asset, tenant: +e.target.value })
                }
              >
                <option value="">Select Tenant</option>
                {listTenants?.map((item) => (
                  <option
                    key={item?.id}
                    value={item?.id}
                    className="font-medium"
                  >
                    {item?.full_name}
                  </option>
                ))}
              </select>
            </div>
            {/* Name */}
            <div className="">
              <label className="form-label fs-6 fw-bold">Name:</label>
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
              <label className="form-label fs-6 fw-bold">Cloud Provider</label>
              <select
                className="form-select form-select-solid fw-bolder"
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
              <label className="form-label fs-6 fw-bold">Services:</label>
              <select
                className="form-select form-select-solid fw-bolder"
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
              <label className="form-label fs-6 fw-bold">
                Cloud Identifier:
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
              <label className="form-label fs-6 fw-bold">Resource Type</label>
              <select
                className="form-select form-select-solid fw-bolder"
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
              <label className="form-label fs-6 fw-bold">Region</label>
              <select
                className="form-select form-select-solid fw-bolder"
                data-placeholder="Select option"
                value={asset.region}
                onChange={(e) =>
                  setAsset({ ...asset, region: e.target.value })
                }
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
              <label className="form-label fs-6 fw-bold">Cloud Account</label>
              {/* <input
                placeholder="Enter Rule Code"
                type="text"
                name="text"
                autoComplete="off"
                maxLength={50}
                className="form-control bg-transparent"
                value={asset.rule_code}
                onChange={(e) =>
                  setAsset({ ...asset, rule_code: e.target.value })
                }
              /> */}
              <select
                className="form-select form-select-solid fw-bolder"
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
          </div>
        </Modal.Body>
        <Alert />
        <Modal.Footer>
          <button type="button" className="btn btn-light" onClick={handleHide}>
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary w-50"
            disabled={!asset}
            onClick={action === "edit" ? editHandleSubmit : handleSubmit}
          >
            {(!isLoading || !assetIsLoading) && (
              <span className="indicator-label">continue</span>
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
