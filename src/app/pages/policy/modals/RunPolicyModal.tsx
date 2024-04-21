import React, { useEffect, useState } from "react";
import { Alert, Modal } from "react-bootstrap";
import { useGetCloudProviderResourceTypes } from "../../../api/api-services/cloudProviderQuery";
import useAlert from "../../components/useAlert";
import { useGetPolicies } from "../../../api/api-services/policyQuery";
import { CloudProviderCloudProviderResourceTypesList200Response } from "../../../api/axios-client";
import { PolicyPoliciesList200Response } from "../../../api/axios-client";

const RunPolicyModal = ({ isOpen, handleHide, state }: any) => {
  const [items, setItems] = useState<any[]>([]);
  const [selectedProvider, setSelectedProv] = useState<any>(null);
  const { showAlert, hideAlert } = useAlert();
  const { data, error } = useGetCloudProviderResourceTypes(1);
  const { data:policies, error:PolicyErr } = useGetPolicies(1);
  const datastsr: CloudProviderCloudProviderResourceTypesList200Response | any =
    data;
  const polstsr: CloudProviderCloudProviderResourceTypesList200Response | any =
  policies;

  useEffect(() => {
    if(state === "policy") {
        setItems(datastsr?.data?.data?.results);
    } else {
        setItems(polstsr?.data?.data?.results);
    }
    hideAlert();
    if (error) {
      if (error instanceof Error) {
        showAlert(error?.message || "An unknown error occurred", "danger");
      }
    }
  }, [data, error, policies, PolicyErr]);

  const handleRunPolicy = () => {
    console.log(selectedProvider);
    handleHide();
  }

  return (
    <>
      <Modal
        show={isOpen}
        onHide={handleHide}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Run Policy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-10">
            <label className="form-label fs-6 fw-bold">{state === "policy" ? "Providers:" : "Policy:"}</label>
            <select
              name="ticket_type"
              id="ticket_type"
              className="form-control bg-transparent"
              onChange={(e) => {
                const selected = items.filter(
                  (item) => item?.id === +e.target.value
                );
                setSelectedProv(selected[0]);
              }}
            >
              <option value="">Select {state === "policy" ? "Provider" : "Policy"}</option>
              {items?.map((data: any) => (
                <option value={data.id} key={data.name}>
                  {data.name}
                </option>
              ))}
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-light" onClick={handleHide}>
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
              disabled={
               !selectedProvider
              }
              onClick={handleRunPolicy}
          >
            {/* {!isLoading && !editLoading && (
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
                ))} */}
            Continue
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RunPolicyModal;
