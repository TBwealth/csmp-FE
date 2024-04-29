import { useEffect, useState } from "react";
import {
  usePostAccountTenant,
  useUpdateAccountTenant,
} from "../../../../../api/api-services/accountQuery";
import useAlert from "../../../../components/useAlert";
import Modal from "react-bootstrap/Modal";

const AddTenantModal = ({ editItem, onClearEdit, isOpen, handleHide }: any) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);

  const [valueId, setValueId] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [codeValue, setCodeValue] = useState("");
  const [adminEmailValue, setAdminEmailValue] = useState("");
  const [statusValue, setStatusValue] = useState(false);
  const { showAlert, hideAlert, Alert } = useAlert();

  const { mutate, isLoading, error } = usePostAccountTenant();
  const {
    mutate: editMutate,
    isLoading: editLoading,
    error: editError,
  } = useUpdateAccountTenant(+valueId);

  useEffect(() => {
    if (editItem) {
      // setIsOpen(true);
      console.log(editItem, "Showwwwwwwwwwwww");
      setValueId(editItem?.id);
      setAdminEmailValue(editItem?.admin_email);
      setNameValue(editItem?.tenant_name);
      setCodeValue(editItem?.code);
      setStatusValue(editItem?.status);
    } else {
      setValueId("");
      setAdminEmailValue("");
      setNameValue("");
      setCodeValue("");
      setStatusValue(false);
      handleClose();
    }
  }, [editItem]);

  const handleClose = () => {
    // setIsOpen(false);
    hideAlert();
    setValueId("");
    onClearEdit();
  };

  const handleSubmit = () => {
    mutate(
      {
        tenant_name: nameValue,
        code: codeValue,
        admin_email: adminEmailValue,
        status: statusValue,
      },
      {
        onSuccess: (res: any) => {
          // handleClose();
          console.log(res);
          showAlert(res?.data?.message, "success");
          setAdminEmailValue("");
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
          tenant_name: nameValue,
          code: codeValue,
          admin_email: adminEmailValue,
          status: statusValue,
        },
      },
      {
        onSuccess: (res: any) => {
          // handleClose();
          console.log(res);
          showAlert(res?.data?.message, "success");
          setAdminEmailValue("");
          setNameValue("");
          setCodeValue("");
          setStatusValue(false);
        },

        onError: (err) => {
          if (error instanceof Error) {
            showAlert(error?.message || "An unknown error occurred", "danger");
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
            {editItem ? "Edit Tenant" : "Create New Tenant"}
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

          <div className="mb-10">
            <label className="form-label fs-6 fw-bold">Admin Email:</label>
            <input
              placeholder="Enter Admin Email"
              type="text"
              name="text"
              autoComplete="off"
              className="form-control bg-transparent"
              value={adminEmailValue}
              onChange={(e) => setAdminEmailValue(e.target.value)}
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
              nameValue === "" || codeValue === "" || adminEmailValue === ""
            }
            onClick={editItem ? editHandleSubmit : handleSubmit}
          >
            {!isLoading && !editLoading && (
              <span className="indicator-label">
                {editItem ? "Edit" : "Continue"}
              </span>
            )}
            {(isLoading || editLoading) && (
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

export { AddTenantModal };
