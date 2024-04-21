import { useEffect, useState } from "react";
import { KTIcon, KTSVG } from "../../../../../../_metronic/helpers";
import {
  usePostAccountPermission,
  useUpdateAccountPermission,
} from "../../../../../api/api-services/accountQuery";
import useAlert from "../../../../components/useAlert";
import { Modal } from "react-bootstrap";

const AddPermissionModal = ({ editItem, onClearEdit, isOpen, handleHide, selectedRole }: any) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [valueId, setValueId] = useState("");
  const [roleName, setRoleName] = useState("");
  const { showAlert, hideAlert, Alert } = useAlert();

  const { mutate, isLoading, error } = usePostAccountPermission();
  const {
    mutate: editMutate,
    isLoading: editLoading,
    error: editError,
  } = useUpdateAccountPermission(+valueId);

  useEffect(() => {
    if (editItem) {
      // setIsOpen(true);
      console.log(editItem, "Showwwwwwwwwwwww");
      setValueId(editItem?.id);
      setRoleName(editItem?.name);
    } else {
      setValueId("");
      setRoleName("");
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
        name: roleName,
      },
      {
        onSuccess: (res) => {
          console.log(res);
          setRoleName("");
        },

        onError: (err) => {
          if (error) {
            if (error instanceof Error) {
              showAlert(
                error?.message || "An unknown error occurred",
                "danger"
              );
            }
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
          name: roleName,
        },
      },
      {
        onSuccess: (res) => {
          handleClose();
          console.log(res);
          setRoleName("");
        },

        onError: (err) => {
          if (err) {
            if (err instanceof Error) {
              showAlert(err?.message || "An unknown error occurred", "danger");
            }
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
            {editItem ? "Edit Permission" : "Create New Permission"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-10">
            <label className="form-label fs-6 fw-bold">Role:</label>
            <input
              placeholder="Enter Name"
              type="text"
              name="text"
              autoComplete="off"
              className="form-control bg-transparent"
              value={selectedRole}
              disabled
              // onChange={(e) => setRoleName(e.target.value)}
            />
          </div>
          <div className="mb-10">
            <label className="form-label fs-6 fw-bold">Name:</label>
            <input
              placeholder="Enter Name"
              type="text"
              name="text"
              autoComplete="off"
              className="form-control bg-transparent"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
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
            disabled={roleName === ""}
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

export { AddPermissionModal };
