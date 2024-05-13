import { Dispatch, useEffect, useState } from "react";
import useAlert from "../../../components/useAlert";
import {
  useGetTickets,
  useUpdateTickets,
  useCreateTickets,
  useGetTicketsTypes,
} from "../../../../api/api-services/ticketQuery";
import {
  useGetAccountUsers,
  useGetAccountTenant,
} from "../../../../api/api-services/accountQuery";
import { Modal } from "react-bootstrap";
import { useGetAssets } from "../../../../api/api-services/systemQuery";
import { useRecoilValue } from "recoil";
import modeAtomsAtom from "../../../../atoms/modeAtoms.atom";
import {
  AccountsApiTenantsList200Response,
  AccountsApiUsersList200Response,
  SystemSettingsAssetManagementsList200Response,
  TicketsTicketTypesList200Response,
} from "../../../../api/axios-client";

type Props = {
  isOpen: boolean;
  handleHide: Dispatch<void>;
};

const ResolveModal = ({ isOpen, handleHide }: any) => {
  const [page, setPage] = useState(1);
  const [token, setToken] = useState("");
  const [tickets, setTickets] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [assignedToValue, setAssignedToValue] = useState<any>(null);
  const [valueId, setValueId] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [assetValue, setAssetValue] = useState<any>(null);
  const [tenantValue, setTenantValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [ticketType, setTicketType] = useState<any>(null);
  const [codeValue, setCodeValue] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [subjectValue, setSubjectValue] = useState("");
  const { showAlert, hideAlert, Alert } = useAlert();
  const [listTenants, setListTenants] = useState<any[]>([]);
  const [ticketAssets, setTicketAssets] = useState<any[]>([]);
  const [authUser, setAuthUser] = useState<any>(null);

  const { data: ticketTypes } = useGetTicketsTypes(page);
  const { data: tenantData } = useGetAccountTenant(1);
  const { data: assets } = useGetAssets(1);

  const { data: userData } = useGetAccountUsers(page);
  const userstsr: AccountsApiUsersList200Response | any = userData;
  const tenantstsr: AccountsApiTenantsList200Response | any = tenantData;
  const assetstsr: SystemSettingsAssetManagementsList200Response | any = assets;
  const { mutate, isLoading, error } = useCreateTickets();
  const datastsr: TicketsTicketTypesList200Response | any = ticketTypes;
  // console.log(datastsr);
  const handleFetchTenantUsers = (val: string) => {
    const filtered = userstsr?.data?.data?.results.filter(
      (user: any) => user?.tenant === val
    );
    setUsers(filtered);
  };

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    const localuser = localStorage.getItem("user");
    setToken(localToken!);
    if (localuser) {
      const parsedUser = JSON.parse(localuser);
      setAuthUser(parsedUser);
    }
  }, []);

  useEffect(() => {
    if (authUser?.role?.name.toLowerCase() === "tenant") {
      handleFetchTenantUsers(authUser?.role?.name);
    }
  }, [authUser, userstsr]);

  useEffect(() => {
    setTickets(datastsr?.data?.data?.results);
    setListTenants(tenantstsr?.data?.data?.results);
    setTicketAssets(assetstsr?.data?.data?.results);
  }, [ticketTypes, tenantstsr, assetstsr]);

  const handleSubmit = () => {
    mutate(
      {
        assigned_to: { id: assignedToValue?.id },
        code: codeValue,
        status: statusValue.toUpperCase(),
        asset: { id: assetValue?.id },
        description: descriptionValue,
        subject: subjectValue,
        ticket_type: { id: ticketType?.id },
        // date_joined: new Date()
      },
      {
        onSuccess: (res: any) => {
          // handleHide();
          console.log(res);
          showAlert(res?.data?.message, "success");
          setAssignedToValue(null);
          setCodeValue("");
          setAssetValue(null);
          setDescriptionValue("");
          setSubjectValue("");
          setTicketType(null);
          setStatusValue("");
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
            Create New Ticket
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="">
              <label className="form-label fs-6 fw-bold">Ticket Type:</label>
              <select
                name="ticket_type"
                id="ticket_type"
                className="form-control bg-transparent"
                value={ticketType?.id}
                onChange={(e) => {
                  const selected = tickets.filter(
                    (ticket) => ticket?.id === +e.target.value
                  );
                  setTicketType(selected[0]);
                }}
              >
                <option value="">Select Type</option>
                {tickets?.map((data: any) => (
                  <option value={data.id} key={data.name}>
                    {data.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="">
              <label className="form-label fs-6 fw-bold">Asset:</label>
              <select
                name="assets"
                id="assets"
                value={assetValue?.id}
                className="form-control bg-transparent"
                onChange={(e) => {
                  const selected = ticketAssets.filter(
                    (tick) => tick.id === +e.target.value
                  );
                  setAssetValue(selected[0]);
                }}
              >
                <option value="">Select Assets</option>
                {ticketAssets?.map((data: any) => (
                  <option key={data?.id} value={data?.id}>
                    {data?.name}
                  </option>
                ))}
              </select>
            </div>
            {authUser?.role.name.toLowerCase() != "tenant" && (
              <div className="">
                <label className="form-label fs-6 fw-bold">Tenant:</label>
                <select
                  name="tenant"
                  id="tenant"
                  value={tenantValue}
                  className="form-control bg-transparent"
                  onChange={(e) => {
                    setTenantValue(e.target.value);
                    handleFetchTenantUsers(e.target.value)
                  }}
                >
                  <option value="">Select Tenant</option>
                  {listTenants?.map((data: any) => (
                    <option key={data?.id} value={data?.tenant_name}>
                      {data?.tenant_name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="">
              <label className="form-label fs-6 fw-bold">Assigned To:</label>
              <select
                name="assigned_to"
                id="assigned_to"
                className="form-control bg-transparent"
                value={assignedToValue?.id}
                onChange={(e) => {
                  const selected = users.filter(
                    (user) => user?.id === +e.target.value
                  );
                  setAssignedToValue(selected[0]);
                }}
              >
                <option value="">Select User</option>
                {users?.map((data: any) => (
                  <option
                    value={data.id}
                    key={`${data.first_name}_${data.last_name}`}
                  >{`${data.first_name} ${data.last_name}`}</option>
                ))}
              </select>
            </div>
            <div className="">
              <label className="form-label fs-6 fw-bold">Code:</label>
              <input
                placeholder="Enter Code"
                type="text"
                name="code"
                autoComplete="off"
                className="form-control bg-transparent"
                value={codeValue}
                onChange={(e) => setCodeValue(e.target.value)}
              />
            </div>
            <div className="">
              <label className="form-label fs-6 fw-bold">Subject:</label>
              <input
                placeholder=""
                type="text"
                name="text"
                autoComplete="off"
                className="form-control bg-transparent"
                value={subjectValue}
                onChange={(e) => setSubjectValue(e.target.value)}
              />
            </div>
            <div>
              <label className="form-label fs-6 fw-bold">Status:</label>
              <select
                name="tenant"
                id="tenant"
                className="form-control bg-transparent"
                value={statusValue}
                onChange={(e) => setStatusValue(e.target.value)}
              >
                <option value="">Select Status</option>
                {["Open", "Closed", "Pending"].map((data: any) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <label className="form-label fs-6 fw-bold">Description:</label>
              <textarea
                name="desc"
                id="desc"
                cols={30}
                className="form-control bg-transparent"
                rows={3}
                value={descriptionValue}
                onChange={(e) => setDescriptionValue(e.target.value)}
              ></textarea>
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
              !codeValue ||
              !descriptionValue ||
              !subjectValue ||
              !statusValue ||
              !ticketType?.name ||
              !assignedToValue?.first_name ||
              !assetValue?.name
            }
            onClick={handleSubmit}
          >
            {!isLoading && (
              <span className="indicator-label">
                Continue
              </span>
            )}
            {isLoading && (
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
  );
};

export default ResolveModal;
