import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import useAlert from "../../components/useAlert";
import {
  useCreatePolicies,
  useUpdatePolicies,
} from "../../../api/api-services/policyQuery";

const RunPolicyModal = ({ editItem, isOpen, handleHide }: any) => {
  const [policy, setPolicy] = useState<any>({
    name: editItem ? editItem?.name : "",
    code: editItem ? editItem?.code : "",
    policy_type: editItem ? editItem?.policy_type : "",
    status: editItem ? editItem?.status : true,
  });
  const { showAlert, hideAlert, Alert } = useAlert();
  const { mutate, isLoading } = useCreatePolicies();
  const { mutate: editMutate, isLoading: editLoading } = useUpdatePolicies();

  const handleCreatePolicy = () => {
    mutate(
      {
        name: policy.name,
        code: policy?.code,
        status: policy?.staus,
        policy_type: policy?.policy_type
      },
      {
        onSuccess: (res: any) => {
          showAlert(res?.data?.message, "success");
        },
        onError: (err) => {
          if (err instanceof Error) {
            showAlert(err?.message || "An unknown error occurred", "danger");
          }
        },
      }
    );
    // handleHide();
  };

  const handleEditPolicy = () => {
    editMutate(
      {
        id: editItem?.id,
        data: {
          id: editItem?.id,
          name: policy?.name,
          code: policy?.code,
          status: policy?.status,
          policy_type: policy?.policy_type
        },
      },
      {
        onSuccess: (res: any) => {
          console.log(res);
          showAlert(res?.data?.message, "success");
          console.log(res);
        },
        onError: (err) => {
          if (err instanceof Error) {
            showAlert(err?.message || "An unknown error occurred", "danger");
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
            {editItem ? "Edit this policy" : "Create Policy"}
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
              value={policy.name}
              onChange={(e) => setPolicy({ ...policy, name: e.target.value })}
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
              value={policy.code}
              onChange={(e) => setPolicy({ ...policy, code: e.target.value })}
            />
          </div>
          <div className="mb-10">
            <label className="form-label fs-6 fw-bold">Type:</label>
            <select
              name="type"
              id="type"
              className="form-control bg-transparent"
              value={policy.policy_type}
              onChange={(e) =>
                setPolicy({ ...policy, policy_type: e.target.value })
              }
            >
              <option value-="" className="font-medium">select type</option>
              <option value="Cloud" className="font-medium">Cloud</option>
              <option value="Repository" className="font-medium">Repository</option>
            </select>
          </div>
          <div>
            <label className="form-label fs-6 fw-bold">Active?:</label>
            <input
              className="form-check-input p-2 w-15px h-15px mx-1 mt-1"
              type="checkbox"
              id="flexSwitchCheckChecked"
              checked={policy?.status}
              onChange={(e) =>
                setPolicy({ ...policy, status: e.target.checked })
              }
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
            disabled={!policy?.name || !policy?.code}
            onClick={editItem ? handleEditPolicy : handleCreatePolicy}
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

export default RunPolicyModal;
