import { useEffect, useState } from "react";
import { KTIcon, KTSVG } from "../../../../../_metronic/helpers";
import {
  useGetCloudProviderResourceTypes,
  useUpdateCloudProviderResourceTypes,
  usePostCloudProviderResourceTypes
 } from "../../../../api/api-services/cloudProviderQuery";
import useAlert from "../../../components/useAlert";
import { Modal } from "react-bootstrap";
import { CloudProviderProviderResourceTypesList200Response } from "../../../../api/axios-client";

const ModalProviderResources = ({ editItem, onClearEdit }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [resources, setResources] = useState<any[] | undefined>([]);
  const [valueId, setValueId] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [codeValue, setCodeValue] = useState("");
  const [statusValue, setStatusValue] = useState(false);
  const { showAlert, hideAlert, Alert } = useAlert();

  const{
    data: allResources,
    isLoading: resourceLoading,
    error: resourceError
  } = useGetCloudProviderResourceTypes(page);

  const { mutate, isLoading, error } =  usePostCloudProviderResourceTypes();
  const {
    mutate: editMutate,
    isLoading: editLoading,
    error: editError,
  } = useUpdateCloudProviderResourceTypes(+valueId);

  const datastsr: CloudProviderProviderResourceTypesList200Response | any = allResources;

  useEffect(() => {
    setResources(datastsr?.data?.data?.results);
    if (editItem) {
      setIsOpen(true);
      console.log(editItem, "Showwwwwwwwwwwww");
      setValueId(editItem?.id);
      setNameValue(editItem?.name);
      setCodeValue(editItem?.code);
      setStatusValue(editItem?.status);
    } else {
      setValueId("");
      setNameValue("");
      setCodeValue("");
      setStatusValue(false);
      handleClose();
    }
  }, [allResources, editItem]);

  const handleClose = () => {
    setIsOpen(false);
    hideAlert();
    setValueId("");
    onClearEdit();
  };

  const handleSubmit = () => {
    mutate(
      {
        name: nameValue,
        code: codeValue,
        status: statusValue,
      },
      {
        onSuccess: (res) => {
          handleClose();
          console.log(res);
          setNameValue("");
          setCodeValue("");
          setStatusValue(false);
        },

        onError: (err) => {
          if (error instanceof Error) {
            showAlert(error?.message || "An unknown error occurred", "danger");
            // showAlert(err?.response?.data?.message, "danger");
          }
        },
      }
    );
  };

  const editHandleSubmit = () => {
    editMutate(
      {
        id: +valueId,
        data: {
          name: nameValue,
          code: codeValue,
          status: statusValue,
        },
      },
      {
        onSuccess: (res) => {
          handleClose();
          console.log(res);
          setNameValue("");
          setCodeValue("");
          setStatusValue(false);
        },

        onError: (err) => {
          if (error instanceof Error) {
            showAlert(error?.message || "An unknown error occurred", "danger");
          }

        },
      }
    );
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary btn-sm"
        onClick={() => {
          setIsOpen(true), hideAlert();
        }}
      >
        <KTIcon iconName="plus" className="fs-1" />
        Add New
      </button>

      <Modal
        show={isOpen}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editItem ? "Edit Resources" : "Create New Resource"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-10">
            <label className="form-label fs-6 fw-bold">Name:</label>
            <input
              placeholder="Enter Name"
              type="text"
              name="text"
              autoComplete="off"
              className="form-control bg-transparent"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
            />
          </div>
          <div className="mb-10">
            <label className="form-label fs-6 fw-bold">Code:</label>
            <input
              placeholder="Enter Code"
              type="text"
              name="text"
              autoComplete="off"
              className="form-control bg-transparent"
              value={codeValue}
              onChange={(e) => setCodeValue(e.target.value)}
            />
          </div>
          <div>
            <label className="form-label fs-6 fw-bold">Active?:</label>
            <input
              className="form-check-input w-15px h-15px mx-1 mt-1"
              type="checkbox"
              id="flexSwitchCheckChecked"
              checked={statusValue}
              onChange={(e) => setStatusValue(e.target.checked)}
            />
          </div>

        </Modal.Body>
        <Alert />
        <Modal.Footer>
          <button type="button" className="btn btn-light" onClick={handleClose}>
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={
              nameValue === "" || codeValue === ""
            }
            onClick={editItem ? editHandleSubmit : handleSubmit}
          >
            {!isLoading && !editLoading && (
              <span className="indicator-label">
                {editItem ? "Edit" : "Continue"}
              </span>
            )}
            {isLoading ||
              (editLoading && (
                <span
                  className="indicator-progress"
                  style={{ display: "block" }}
                >
                  Please wait...{" "}
                  <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              ))}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export {ModalProviderResources };
