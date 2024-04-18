import { useEffect, useState } from "react";
import { KTIcon, KTSVG } from "../../../../../_metronic/helpers";
import useAlert from "../../../components/useAlert";
import { Modal } from "react-bootstrap";

const ModalTenant = ({ editItem, onClearEdit }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [editLoading, seteditLoading] = useState(false);
    const [policies, setPolicies] = useState<any[] | undefined>([]);
    const [valueId, setValueId] = useState("");
    const [nameValue, setNameValue] = useState("");
    const [codeValue, setCodeValue] = useState("");
    const [statusValue, setStatusValue] = useState(false);
    const [tenantValue, setTenantValue] = useState(0);
    const { showAlert, hideAlert, Alert } = useAlert();
  
    const handleClose = () => {
      setIsOpen(false);
      hideAlert();
      setValueId("");
      onClearEdit();
    };
  
    const handleSubmit = () => {
      console.log("new admin user added");
      handleClose();
    };
    const editHandleSubmit = () => {
      console.log("admin user edited successfully");
      handleClose();
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
              {editItem ? "Edit Policy" : "Create New Policy"}
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
              disabled={nameValue === "" || codeValue === ""}
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
}

export default ModalTenant