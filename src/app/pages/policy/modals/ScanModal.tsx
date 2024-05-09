import React, { useEffect } from "react";
import useAlert from "../../components/useAlert";
import { Modal } from "react-bootstrap";

const ScanPolicyModal = ({ isOpen, handleHide, err }: any) => {
  const { showAlert, Alert } = useAlert();

  useEffect(() => {
    showAlert(err?.message || "An unknow error occured", "danger");
  }, []);
  return (
    <>
      <Modal
        show={isOpen}
        onHide={handleHide}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Policy Scan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-10"></div>
        </Modal.Body>
        <Alert />
        <Modal.Footer>
          <button type="button" className="btn btn-light" onClick={handleHide}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ScanPolicyModal;
