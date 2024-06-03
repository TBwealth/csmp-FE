import { useEffect, useState } from "react";
import useAlert from "../../components/useAlert";
import { Modal } from "react-bootstrap";
import { PolicyPolicyListCreateList200Response } from "../../../api/axios-client";
import {
  useRuleCreate,
  useGetPolicies,
  useRuleUpdate,
} from "../../../api/api-services/policyQuery";

const RuleModal = ({ editItem, onClearEdit, isOpen, handleHide }: any) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [pageSize, setPageSize] = useState(100);
  const [page, setPage] = useState(1);
  const [policies, setPolicies] = useState<any[] | undefined>([]);
  const [valueId, setValueId] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [ruleTypeValue, setRuleTypeValue] = useState("");
  const [codeValue, setCodeValue] = useState("");
  const [statusValue, setStatusValue] = useState(false);
  const [descValue, setDescValue] = useState("");
  const [serviceValue, setServiceValue] = useState("");
  const [tenantValue, setTenantValue] = useState(0);
  const { showAlert, hideAlert, Alert } = useAlert();

  const {
    data: allPolicies,
    isLoading: serviceLoading,
    error: serviceError,
  } = useGetPolicies({ page, pageSize });

  const { mutate, isLoading, error } = useRuleCreate();
  const {
    mutate: editMutate,
    isLoading: editLoading,
    error: editError,
  } = useRuleUpdate();

  const datastsr: PolicyPolicyListCreateList200Response | any = allPolicies;
  useEffect(() => {
    setPolicies(datastsr?.data?.data?.results);
    if (editItem) {
      //   setIsOpen(true);
      // console.log(editItem, "Showwwwwwwwwwwww");
      setValueId(editItem?.id);
      setNameValue(editItem?.name);
      setCodeValue(editItem?.code);
      setStatusValue(editItem?.status);
      setTenantValue(editItem?.tenant);
      setDescValue(editItem?.description);
      setServiceValue(editItem?.service);
      setRuleTypeValue(editItem?.rule_type);
    } else {
      setValueId("");
      setCodeValue("");
      setStatusValue(false);
      setNameValue("");
      setDescValue("");
      setServiceValue("");
      setRuleTypeValue("");
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
        description: descValue,
        service: serviceValue,
        rule_type: ruleTypeValue,
      },
      {
        onSuccess: (res: any) => {
          // handleHide();
          console.log(res);
          showAlert(res?.data?.message, "success");
          setValueId("");
          setCodeValue("");
          setStatusValue(false);
          setNameValue("");
          setServiceValue("");
          setRuleTypeValue("");
          setTenantValue(0);
        },

        onError: (err) => {
          if (err instanceof Error) {
            showAlert(err?.message || "An unknown error occurred", "danger");
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
          description: descValue,
          service: serviceValue,
          rule_type: ruleTypeValue,
        },
      },
      {
        onSuccess: (res: any) => {
          // handleHide();
          console.log(res);
          showAlert(res?.data?.message, "success");
          setValueId("");
          setCodeValue("");
          setStatusValue(false);
          setNameValue("");
          setServiceValue("");
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
          <div className="grid md:grid-cols-2 gap-3">
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
            <label className="form-label fs-6 fw-bold">Service:</label>
            <input
              placeholder="Enter Seervice"
              type="text"
              name="text"
              autoComplete="off"
              className="form-control bg-transparent"
              value={serviceValue}
              onChange={(e) => setServiceValue(e.target.value)}
            />
          </div>
          <div className="mb-10">
            <label className="form-label fs-6 fw-bold">Rule Type:</label>
            <select
              className="form-control bg-transparent"
              value={ruleTypeValue}
              onChange={(e) => setRuleTypeValue(e.target.value)}
              name="rule_type"
              id="rule_type"
            >
              <option value="" className="font-medium">select rule type</option>
              <option value="Cloud" className="font-medium">Cloud</option>
              <option value="Repository" className="font-medium">Repository</option>
            </select>
            {/* <input
              placeholder="Enter Seervice"
              type="text"
              name="text"
              autoComplete="off"
              className="form-control bg-transparent"
              value={serviceValue}
              onChange={(e) => setServiceValue(e.target.value)}
            /> */}
          </div>
          <div className="md:col-span-2">
            <label className="form-label fs-6 fw-bold">Description:</label>
            <textarea
              name="description"
              id=""
              rows={3}
              cols={30}
              value={descValue}
              className="form-control bg-transparent"
              onChange={(e) => setDescValue(e.target.value)}
            ></textarea>
          </div>
          <div className="md:col-span-2">
            <label className="form-label fs-6 fw-bold">Active?:</label>
            <input
              className="form-check-input w-15px h-15px mx-1 mt-1"
              type="checkbox"
              id="flexSwitchCheckChecked"
              checked={statusValue}
              onChange={(e) => setStatusValue(e.target.checked)}
            />
          </div>

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
              nameValue === "" || codeValue === "" || serviceValue === ""
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

export default RuleModal;
