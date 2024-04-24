import { useEffect, useState } from "react";
import { KTIcon, KTSVG } from "../../../../_metronic/helpers";
import useAlert from "../../components/useAlert";
import { Modal } from "react-bootstrap";
import {
    PolicyPoliciesList200Response
} from "../../../api/axios-client"
import { useRuleCreate, useGetPolicies, useRuleUpdate } from "../../../api/api-services/policyQuery";


const RuleModal = ({ editItem, onClearEdit, isOpen, handleHide }: any) => {
    // const [isOpen, setIsOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [policies, setPolicies] = useState<any[] | undefined>([]);
  const [valueId, setValueId] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [codeValue, setCodeValue] = useState("");
  const [statusValue, setStatusValue] = useState(false);
  const [tenantValue, setTenantValue] = useState(0);
  const { showAlert, hideAlert, Alert } = useAlert();

  const {
    data: allPolicies,
    isLoading: serviceLoading,
    error: serviceError
  } = useGetPolicies(page);

  const {mutate, isLoading, error } = useRuleCreate();
  const {
    mutate:editMutate,
    isLoading: editLoading,
    error: editError
  } = useRuleUpdate();

  const datastsr: PolicyPoliciesList200Response | any = allPolicies;
  useEffect(() => {
    setPolicies(datastsr?.data?.data?.results);
    if (editItem) {
    //   setIsOpen(true);
      console.log(editItem, "Showwwwwwwwwwwww");
      setValueId(editItem?.id);
      setNameValue(editItem?.name);
      setCodeValue(editItem?.code);
      setStatusValue(editItem?.status);
      setTenantValue(editItem?.tenant);
    } else {
      setValueId("");
      setCodeValue("");
      setStatusValue(false);
      setNameValue("");
      setTenantValue(0);
    }
  }, [allPolicies, editItem]);

  const handleClose = () => {
    // setIsOpen(false);
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
          // showAlert(res?.data?.message, "success");
          setValueId("");
      setCodeValue("");
      setStatusValue(false);
      setNameValue("");
      setTenantValue(0);
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
        data:{
            name: nameValue,
            code: codeValue,
            status: statusValue,
        
        },
      },
      {
        onSuccess: (res) => {
          handleClose();
          console.log(res);
          // showAlert(res?.data?.message, "success");
          setValueId("");
          setCodeValue("");
          setStatusValue(false);
          setNameValue("");
          setTenantValue(0);
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
              {editItem ? "Edit Rule" : "Create New Rule"}
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
              {(isLoading ||
               editLoading) && (
                  <span
                    className="indicator-progress"
                    style={{ display: "block" }}
                  >
                    Please wait...{" "}
                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
              )}
            </button>
          </Modal.Footer>
        </Modal>
      </>
  )
}

export default RuleModal