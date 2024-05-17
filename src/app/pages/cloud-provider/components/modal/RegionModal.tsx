import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import {
  useUpdateRegion,
  useCreateRegion,
} from "../../../../api/api-services/systemQuery";
import { useGetCloudProviderResourceTypes } from "../../../../api/api-services/cloudProviderQuery";
import { CloudProviderCloudProviderResourceTypesList200Response } from "../../../../api/axios-client";
import useAlert from "../../../components/useAlert";
type Region = {
  cloud_provider: number;
  name: string;
  code: string;
  latitude: string;
  longitude: string;
};

const RegionModal = ({ editItem, handleHide, isOpen }: any) => {
  const [pageSize, setPageSize] = useState(100);
  const [page, setPage] = useState(1);
  const [region, setRegion] = useState<Region>({
    cloud_provider: editItem?.cloud_provider ?? 0,
    code: editItem?.code ?? "",
    latitude: editItem?.latitude ?? "",
    longitude: editItem?.longitude ?? "",
    name: editItem?.name ?? "",
  });
  const { showAlert, hideAlert, Alert } = useAlert();
  const [listClouds, setListClouds] = useState<any[]>([]);
  const { data: cloud } = useGetCloudProviderResourceTypes({page, pageSize});
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
    setListClouds(cloudstsr?.data?.data?.results);
  }, [cloud]);

  const handleSubmit = () => {
    mutate(
      { data: { ...region } },
      {
        onSuccess: (res: any) => {
          setRegion({
            cloud_provider: 0,
            code: "",
            latitude: "",
            longitude: "",
            name: "",
          });
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
            cloud_provider: 0,
            code: "",
            latitude: "",
            longitude: "",
            name: "",
          });
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
          <div className="grid grid-cols-2 gap-3">
            <div className="">
              <label className="form-label fs-6 fw-bold">Cloud Provider:</label>
              <select
                data-placeholder="Select option"
                autoComplete="off"
                className="form-control bg-transparent"
                value={region.cloud_provider}
                onChange={(e) =>
                  setRegion({ ...region, cloud_provider: +e.target.value })
                }
              >
                <option value="">Select Provider</option>
                {listClouds?.map((item) => (
                  <option key={item?.id} value={item?.id}>
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="">
              <label className="form-label fs-6 fw-bold">Name:</label>
              <input
                placeholder="Enter Name"
                type="text"
                name="name"
                autoComplete="off"
                className="form-control bg-transparent"
                value={region.name}
                onChange={(e) => setRegion({ ...region, name: e.target.value })}
              />
            </div>
            <div className="">
              <label className="form-label fs-6 fw-bold">Code:</label>
              <input
                placeholder="Enter Code"
                type="text"
                name="code"
                autoComplete="off"
                className="form-control bg-transparent"
                value={region.code}
                onChange={(e) => setRegion({ ...region, code: e.target.value })}
              />
            </div>
            <div className="">
              <label className="form-label fs-6 fw-bold">Longitude:</label>
              <input
                placeholder="Enter Longitude"
                type="text"
                name="longitude"
                autoComplete="off"
                maxLength={50}
                className="form-control bg-transparent"
                value={region.longitude}
                onChange={(e) =>
                  setRegion({ ...region, longitude: e.target.value })
                }
              />
            </div>
            <div className="">
              <label className="form-label fs-6 fw-bold">Latitude</label>
              <input
                placeholder="Enter Latitude"
                type="text"
                name="latitude"
                autoComplete="off"
                maxLength={50}
                className="form-control bg-transparent"
                value={region.latitude}
                onChange={(e) =>
                  setRegion({ ...region, latitude: e.target.value })
                }
              />
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
            disabled={
              !region.cloud_provider ||
              !region.code ||
              !region.latitude ||
              !region.longitude ||
              !region.name
            }
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
