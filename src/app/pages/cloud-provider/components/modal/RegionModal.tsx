import { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import {
  useUpdateRegion,
  useCreateRegion,
} from "../../../../api/api-services/systemQuery";
import { useGetCloudProviderResourceTypes } from "../../../../api/api-services/cloudProviderQuery";
import { CloudProviderCloudProviderResourceTypesList200Response } from "../../../../api/axios-client";
import useAlert from "../../../components/useAlert";
type Region = {
  cloud_provider: string;
  region_name: string;
  status: boolean;
};

const RegionModal = ({ editItem, handleHide, isOpen, handleRefetch }: any) => {
  const [pageSize, setPageSize] = useState(100);
  const [page, setPage] = useState(1);
  const [user, setUser] = useState<any>(null);
  const [region, setRegion] = useState<Region>({
    cloud_provider: editItem?.cloud_provider ?? "AWS",
    region_name: editItem?.region_name ?? "",
    status: editItem?.status ?? true,
  });
  const { showAlert, hideAlert, Alert } = useAlert();
  const [listClouds, setListClouds] = useState<any[]>([]);
  const { data: cloud } = useGetCloudProviderResourceTypes({ page, pageSize });
  const cloudstsr:
    | CloudProviderCloudProviderResourceTypesList200Response
    | any = cloud;

  const { mutate, isLoading, error } = useCreateRegion();
  const {
    mutate: regionEdit,
    isLoading: assetIsLoading,
    error: regionError,
  } = useUpdateRegion(editItem ? editItem?.id : 0);


  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      const parsedUser = JSON.parse(localUser);
      setUser(parsedUser);
    }
  }, []);

  useEffect(() => {
    if (user?.role.name === "Tenant") {
      setListClouds(
        cloudstsr?.data?.data?.results.filter(
          (res: any) => user?.tenant?.id === res.tenant
        )
      );
    } else {
      setListClouds(cloudstsr?.data?.data?.results);
    }
  }, [cloud, user]);

  const handleSubmit = () => {
    mutate(
      { data: { 
        cloud_provider: "AWS",
        region_name: region.region_name,
        status: region.status
       } },
      {
        onSuccess: (res: any) => {
          setRegion({
            cloud_provider: "AWS",
            region_name: "",
            status: true
          });
          handleRefetch()
          showAlert(res?.data?.message, "success");
          console.log(res);
          // handleHide();
        },
        onError: (err) => {
          if (err instanceof Error) {
            showAlert(err?.message || "An unknow error occurred", "danger");
          }
        },
      }
    );
  };
  const editHandleSubmit = () => {
    regionEdit(
      {
        id: editItem?.id,
        data: { ...region },
      },
      {
        onSuccess: (res: any) => {
          setRegion({
            cloud_provider: "AWS",
            region_name: "",
            status: true,
          });
          handleRefetch()
          showAlert(res?.data?.message, "success");
          console.log(res);
          // handleHide();
        },
        onError: (err) => {
          if (err instanceof Error) {
            showAlert(err?.message || "An unknow error occurred", "danger");
          }
        },
      }
    );
  };

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
            {editItem ? "Edit this Region" : "Create new Region"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-1 gap-3">
            <div className="">
              <label className="form-label fs-6 fw-bold">Cloud Provider:</label>
              <select
                data-placeholder="Select option"
                autoComplete="off"
                className="form-control bg-transparent"
                value={region.cloud_provider}
                onChange={(e) =>
                  setRegion({ ...region, cloud_provider: e.target.value })
                }
              >
                <option value="">Select Provider</option>
                {[
                  {
                    id: "AWS",
                    name: "aws",
                  },
                  {
                    id: "AZURE",
                    name: "azure",
                  },
                  {
                    id: "GPC",
                    name: "gpc",
                  },
                ]?.map((item) => (
                  <option key={item?.id} value={item?.id}>
                    {/* {item?.cloud_provider_name} */}
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="">
              <label className="form-label fs-6 fw-bold">Region Name:</label>
              <input
                placeholder="Enter Name"
                type="text"
                name="name"
                autoComplete="off"
                className="form-control bg-transparent"
                value={region.region_name}
                onChange={(e) =>
                  setRegion({ ...region, region_name: e.target.value })
                }
              />
            </div>
            <div className="mt-3 flex items-center gap-3">
              <input
                placeholder="Enter Latitude"
                type="checkbox"
                name="latitude"
                autoComplete="off"
                className="w-5 h-5 rounded-md bg-primary"
                checked={region.status}
                onChange={(e) =>
                  setRegion({ ...region, status: e.target.checked })
                }
              />
              <label className="form-label fs-6 fw-bold">Status</label>
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
            disabled={!region.cloud_provider || !region.region_name}
            onClick={editItem ? editHandleSubmit : handleSubmit}
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

export default RegionModal;
