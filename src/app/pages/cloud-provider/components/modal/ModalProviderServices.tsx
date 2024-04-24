import { useEffect, useState } from "react";
import { KTIcon, KTSVG } from "../../../../../_metronic/helpers";
import {
    useGetCloudProviderServicesList,
 useUpdateCloudProviderServices,
  usePostCloudProviderServices
 } from "../../../../api/api-services/cloudProviderQuery";
import useAlert from "../../../components/useAlert";
import { Modal } from "react-bootstrap";


const ModalProviderServices = ({ editItem, handleHide, isOpen }: any) => {
  const [page, setPage] = useState(1);
  const [valueId, setValueId] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [codeValue, setCodeValue] = useState("");
  const [statusValue, setStatusValue] = useState(false);
  const { showAlert, hideAlert, Alert } = useAlert();

    const{
        data: allServices,
        isLoading: serviceLoading,
        error: serviceError
    } = useGetCloudProviderServicesList(page);

  const { mutate, isLoading, error } = usePostCloudProviderServices();
  const {
    mutate: editMutate,
    isLoading: editLoading,
    error: editError,
  } = useUpdateCloudProviderServices();

  useEffect(() => {
    if (editItem) {
      console.log(editItem, "Showwwwwwwwwwwww");
      setValueId(editItem?.id);
      setNameValue(editItem?.name);
      setCodeValue(editItem?.code);
      setStatusValue(editItem?.status);
    } else {
      setValueId("");
      setNameValue("");
      setCodeValue("");
      setStatusValue(true);
    }
  }, [editItem]);

  // const handleClose = () => {
  //   hideAlert();
  //   setValueId("");
  //   onClearEdit();
  // };

  const handleSubmit = () => {
    mutate(
      {
        name: nameValue,
        code: codeValue,
        status: statusValue,
      },
      {
        onSuccess: (res) => {
          handleHide();
          console.log(res);
          // showAlert(res?.data?.message, "success");
          setNameValue("");
          setCodeValue("");
          setStatusValue(true);
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
          handleHide();
          // showAlert(res?.data?.message, "success");
          setNameValue("");
          setCodeValue("");
          setStatusValue(false);
        },

        onError: (err) => {
          if (err instanceof Error) {
            showAlert(err?.message || "An unknown error occurred", "danger");
          }
          // showAlert(err?.response?.data?.message, "danger");
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
            {editItem ? "Edit Resource" : "Create New Resource"}
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
          <button type="button" className="btn btn-light" onClick={handleHide}>
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

export {ModalProviderServices };
 