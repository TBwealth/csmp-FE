import { useEffect, useState } from "react";
import axios from "axios";
import useAlert from "../../components/useAlert";
import { Modal } from "react-bootstrap";
import { PolicyPolicyListCreateList200Response } from "../../../api/axios-client";
import {
  useRuleCreate,
  useGetPolicies,
  useRuleUpdate,
} from "../../../api/api-services/policyQuery";

type Rule = {
  name: string;
  description: string;
  severity: string;
  cloud_provider: string;
  service: string;
  rule_type: string;
  id: string | undefined;
};

const RuleModal = ({ editItem, onClearEdit, isOpen, handleHide }: any) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [pageSize, setPageSize] = useState(100);
  const [page, setPage] = useState(1);
  const [policies, setPolicies] = useState<any[] | undefined>([]);
  const [valueId, setValueId] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [ruleTypeValue, setRuleTypeValue] = useState("");
  const [codeValue, setCodeValue] = useState("");
  const [providerValue, setProviderValue] = useState("");
  const [severityValue, setSeverityValue] = useState("");
  const [statusValue, setStatusValue] = useState(false);
  const [descValue, setDescValue] = useState("");
  const [serviceValue, setServiceValue] = useState("");
  const [tenantValue, setTenantValue] = useState(0);
  const [token, setToken] = useState("");
  const [allservice, setAllService] = useState<any[]>([]);
  const { showAlert, hideAlert, Alert } = useAlert();

  const [ruleData, setRuleData] = useState<Rule>({
    cloud_provider: "",
    description: "",
    name: "",
    rule_type: "",
    service: "",
    severity: "",
    id: "",
  });

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
      setRuleData({
        cloud_provider: editItem?.cloud_provider,
        description: editItem?.description,
        name: editItem?.name,
        rule_type: editItem?.rule_type,
        service: editItem?.service,
        severity: editItem?.severity,
        id: editItem?.id,
      });
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

  useEffect(() => {
    const localToken = localStorage.getItem("token") ?? "";
    setToken(localToken);
  }, []);

  async function getServices(service: string) {
    try {
      const res = await axios.get(
        `https://cspm-api.midrapps.com/cloud_provider/api/v1/resource_types/?cloud_provider=${service}&page=1&page_size=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setAllService(res?.data?.data?.results);
      }
    } catch (err) {
      console.log(err);
    }
  }

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
                value={ruleData?.name}
                onChange={(e) => setRuleData({...ruleData, name:e.target.value})}
              />
            </div>
            {/* <div className="mb-10">
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
            </div> */}
            <div className="mb-10">
              <label className="form-label fs-6 fw-bold">Cloud Provider:</label>
              <select
                className="form-control bg-transparent"
                value={ruleData?.cloud_provider}
                onChange={(e) => {
                  getServices(e.target.value);
                  setRuleData({...ruleData, cloud_provider:e.target.value});
                }}
                name="rule_type"
                id="rule_type"
              >
                <option value="" className="font-medium">
                  select provider
                </option>
                <option value="AWS" className="font-medium">
                  AWS
                </option>
                <option value="AZURE" className="font-medium">
                  AZURE
                </option>
                <option value="GCP" className="font-medium">
                  GCP
                </option>
                <option value="Re[ository" className="font-medium">
                  Repository
                </option>
              </select>
            </div>
            <div className="mb-10">
              <label className="form-label fs-6 fw-bold">Service:</label>
              <select
                className="form-control bg-transparent"
                value={ruleData.service}
                onChange={(e) => setRuleData({...ruleData, service:e.target.value})}
                name="rule_type"
                id="rule_type"
              >
                <option value="" className="font-medium">
                  select services
                </option>
                {allservice.map((services) => (
                  <option value={services?.resource_type} key={services?.id}>
                    {services?.resource_type}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-10">
              <label className="form-label fs-6 fw-bold">Rule Type:</label>
              <select
                className="form-control bg-transparent"
                value={ruleData.rule_type}
                onChange={(e) => setRuleData({...ruleData, rule_type:e.target.value})}
                name="rule_type"
                id="rule_type"
              >
                <option value="" className="font-medium">
                  select rule type
                </option>
                <option value="Cloud" className="font-medium">
                  Cloud
                </option>
                <option value="Repository" className="font-medium">
                  Repository
                </option>
              </select>
            </div>
            <div className="mb-10">
              <label className="form-label fs-6 fw-bold">Severity:</label>
              <select
                className="form-control bg-transparent"
                value={ruleData.severity}
                onChange={(e) => setRuleData({...ruleData, severity:e.target.value})}
                name="severity"
                id="severity"
              >
                <option value="" className="font-medium">
                  select severity
                </option>
                <option value="Critical" className="font-medium">
                  Critical
                </option>
                <option value="High" className="font-medium">
                  High
                </option>
                <option value="Low" className="font-medium">
                  Low
                </option>
                <option value="Medium" className="font-medium">
                  Medium
                </option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="form-label fs-6 fw-bold">Description:</label>
              <textarea
                name="description"
                id=""
                rows={3}
                cols={30}
                value={ruleData.description}
                className="form-control bg-transparent"
                onChange={(e) => setRuleData({...ruleData, description:e.target.value})}
              ></textarea>
            </div>
            {/* <div className="md:col-span-2">
              <label className="form-label fs-6 fw-bold">Active?:</label>
              <input
                className="form-check-input w-15px h-15px mx-1 mt-1"
                type="checkbox"
                id="flexSwitchCheckChecked"
                checked={statusValue}
                onChange={(e) => setStatusValue(e.target.checked)}
              />
            </div> */}
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
