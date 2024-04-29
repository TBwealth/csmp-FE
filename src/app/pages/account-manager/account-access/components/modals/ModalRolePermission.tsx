import { useEffect, useState } from "react";
import { KTIcon, KTSVG } from "../../../../../../_metronic/helpers";
import { usePostAccountPermission } from "../../../../../api/api-services/accountQuery";
import useAlert from "../../../../components/useAlert";
import { Modal } from "react-bootstrap";

const AddRolePermissionModal = ({
  editItem,
  onClearEdit,
  isOpen,
  handleHide,
}: any) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [roles, setRoles] = useState<any[] | undefined>([]);
  const [permissions, setPermissions] = useState<any[] | undefined>([]);
  const [valueId, setValueId] = useState("");
  const [permissionValue, setPermissionValue] = useState("");
  const { showAlert, hideAlert, Alert } = useAlert();

  const { mutate, isLoading, error } = usePostAccountPermission();

  const handleSubmit = () => {
    mutate(
      {
        name: permissionValue,
      },
      {
        onSuccess: (res: any) => {
          console.log(res);
          showAlert(res?.data?.message, "success");
          setPermissionValue("");
          // handleHide();
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
          <Modal.Title>Create New Permission</Modal.Title>
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
              value={permissionValue}
              onChange={(e) => setPermissionValue(e.target.value)}
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
            disabled={permissionValue === ""}
            onClick={handleSubmit}
          >
            {!isLoading && <span className="indicator-label">Continue</span>}
            {isLoading && (
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

export { AddRolePermissionModal };
