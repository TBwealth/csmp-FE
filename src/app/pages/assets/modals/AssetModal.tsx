import React, { useEffect, useState } from "react";
import {
  useCreateAssets,
  useUpdateAssets,
  useGetRegions,
} from "../../../api/api-services/systemQuery";
import useAlert from "../../components/useAlert";
import axios from "axios";
import {
  useGetCloudProviderResourceTypes,
} from "../../../api/api-services/cloudProviderQuery";
import { Modal } from "react-bootstrap";
import { useGetAccountTenant } from "../../../api/api-services/accountQuery";
import {
  AccountsApiTenantsList200Response,
  CloudProviderCloudProviderResourceTypesList200Response,
} from "../../../api/axios-client";

type Asset = {
  id?: number;
  tenant: number;
  resource_types: number;
  name: string;
  code: string;
  public_ip?: string;
  description: string;
  cloud_identifier: string;
  cloud_provider: number;
  region: number;
};

///cloud_provider/cloud_provider/{id}/

const AssetModal = ({ editItem, handleHide, isOpen, action }: any) => {
  const [asset, setAsset] = useState<any>({
    tenant: editItem?.tenant ?? 0,
    region: editItem?.region ?? 0,
    cloud_identifier: editItem?.cloud_identifier ?? "",
    cloud_provider: editItem?.cloud_provider ?? 0,
    code: editItem?.code ?? "",
    description: editItem?.description ?? "",
    name: editItem?.name ?? "",
    resource_types: editItem?.resource_types ?? 0,
    public_ip: editItem?.public_ip ?? "",
  });

  const [token, setToken] = useState("");
  const [listTenants, setListTenants] = useState<any[]>([]);
  const [listRegions, setListRegions] = useState<any[]>([]);
  const [listClouds, setListClouds] = useState<any[]>([]);
  const [listResources, setListResources] = useState<any[]>([]);
  const { showAlert, hideAlert, Alert } = useAlert();
  const { data: tenantData } = useGetAccountTenant(1);

  const { data: cloud } = useGetCloudProviderResourceTypes(1);
  const { data: regions } = useGetRegions(1);

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
            region: 0,
            cloud_identifier: "",
            cloud_provider: 0,
            code: "",
            description: "",
            name: "",
            resource_types: 0,
          });
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
            region: 0,
            cloud_identifier: "",
            cloud_provider: 0,
            code: "",
            description: "",
            name: "",
            resource_types: 0,
          });
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

  const handleFetchProviderResource = async (id: number) => {
    try {
      const res = await axios.get(
        `https://cspm-api.midrapps.com/cloud_provider/cloud_provider_resource_types/${id ? id : 0}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res?.status === 200) {
        setListResources(res?.data?.data?.resource_type);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setListTenants(datastsr?.data?.data?.results);
    setListClouds(cloudstsr?.data?.data?.results);
    setListRegions(regionstsr?.data?.data?.results);
    if(cloudstsr) {
        handleFetchProviderResource(editItem?.cloud_provider);
    }
  }, [tenantData, cloud, regionstsr]);

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
          <div className="grid grid-cols-2 gap-3">
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
                  <option key={item?.id} value={item?.id}>
                    {item?.tenant_name}
                  </option>
                ))}
              </select>
            </div>
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
            <div className="">
              <label className="form-label fs-6 fw-bold">Code:</label>
              <input
                placeholder="Enter Code"
                type="text"
                name="text"
                autoComplete="off"
                className="form-control bg-transparent"
                value={asset.code}
                onChange={(e) => setAsset({ ...asset, code: e.target.value })}
              />
            </div>
            <div className="">
              <label className="form-label fs-6 fw-bold">Cloud Provider</label>
              <select
                className="form-select form-select-solid fw-bolder"
                data-placeholder="Select option"
                value={asset.cloud_provider}
                onChange={(e) => {
                  handleFetchProviderResource(+e.target.value);
                  setAsset({ ...asset, cloud_provider: +e.target.value });
                }}
              >
                <option value="">Select a Provider</option>
                {listClouds?.map((item) => (
                  <option key={item?.id} value={item?.id}>
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>
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
            <div className="">
              <label className="form-label fs-6 fw-bold">Resource Type</label>
              <select
                className="form-select form-select-solid fw-bolder"
                data-placeholder="Select option"
                value={asset.resource_types}
                onChange={(e) =>
                  setAsset({ ...asset, resource_types: +e.target.value })
                }
              >
                <option value="">Select a resource type</option>
                {listResources?.map((item) => (
                  <option key={item?.id} value={item?.id}>
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="">
              <label className="form-label fs-6 fw-bold">Region</label>
              <select
                className="form-select form-select-solid fw-bolder"
                data-placeholder="Select option"
                value={asset.region}
                onChange={(e) =>
                  setAsset({ ...asset, region: +e.target.value })
                }
              >
                <option value="">Select a region</option>
                {listRegions?.map((item) => (
                  <option key={item?.id} value={item?.id}>
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="">
              <label className="form-label fs-6 fw-bold">Public IP</label>
              <input
                placeholder="Enter IP"
                type="text"
                name="text"
                autoComplete="off"
                maxLength={50}
                className="form-control bg-transparent"
                value={asset.public_ip}
                onChange={(e) =>
                  setAsset({ ...asset, public_ip: e.target.value })
                }
              />
            </div>
            <div className="col-span-2">
              <label className="form-label fs-6 fw-bold">Description</label>
              <textarea
                name="desc"
                id="desc"
                className="form-control bg-transparent"
                cols={30}
                rows={3}
                value={asset.description}
                onChange={(e) =>
                  setAsset({ ...asset, description: e.target.value })
                }
              ></textarea>
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
