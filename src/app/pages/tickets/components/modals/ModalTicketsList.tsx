import { useEffect, useState } from "react";
import { KTIcon, KTSVG } from "../../../../../_metronic/helpers";
import {
  useGetTickets,
  useUpdateTickets,
  useCreateTickets,
  useGetTicketsTypes
} from "../../../../api/api-services/ticketQuery";
import {
  useGetAccountUsers,
} from "../../../../api/api-services/accountQuery";
import useAlert from "../../../components/useAlert";
import { Modal } from "react-bootstrap";
import { AccountsApiUsersList200Response, TicketsTicketTypesList200Response } from "../../../../api/axios-client";
import { opendirSync } from "fs";

const ModalTicketsList = ({
  editItem,
  onClearEdit,
  isOpen,
  handleHide,
}: any) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);

  const [tickets, setTickets] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [assignedToValue, setAssignedToValue] = useState<any>(null);
  const [valueId, setValueId] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [assetValue, setAssetValue] = useState(0);
  const [createdByValue, setCreatedByValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [tenant, setTenantValue] = useState("");
  const [ticketType, setTicketType] = useState<any>(null);
  const [codeValue, setCodeValue] = useState("");
  const [statusValue, setStatusValue] = useState("open");
  const [subjectValue, setSubjectValue] = useState("");
  const { showAlert, hideAlert, Alert } = useAlert();

  // const {
  //   data: allTickets,
  //   isLoading: serviceLoading,
  //   error: serviceError,
  // } = useGetTickets(page);
  // console.log("daaaaa", allTickets);

  const {
    data: ticketTypes
  } = useGetTicketsTypes(page);

  const { data:userData } = useGetAccountUsers(page);
  const userstsr: AccountsApiUsersList200Response | any = userData;

  
  const { mutate, isLoading, error } = useCreateTickets();
  const {
    mutate: editMutate,
    isLoading: editLoading,
    error: editError,
  } = useUpdateTickets(+valueId);
  
  const datastsr: TicketsTicketTypesList200Response | any = ticketTypes;
  // console.log(datastsr);

  useEffect(() => {
    setTickets(datastsr?.data?.data?.results);
    setUsers(userstsr?.data?.data?.results);
    if (editItem) {
      // setIsOpen(true);
      console.log(editItem, "Showwwwwwwwwwwww");
      setValueId(editItem?.id);
      setAssignedToValue(editItem?.assigned_to);
      setCodeValue(editItem?.code);
      setStatusValue(editItem?.status);
      setAssetValue(editItem?.asset);
      setCreatedByValue(editItem?.created_by);
      setDescriptionValue(editItem?.description);
      setTenantValue(editItem?.tenant);
      setTicketType(editItem?.ticket_type);
      setSubjectValue(editItem?.subject);
    } else {
      setValueId("");
      setAssignedToValue(0);
      setCodeValue("");
      setStatusValue("open");
      setAssetValue(0);
      setCreatedByValue("");
      setDescriptionValue("");
      setTenantValue("");
      setTicketType(0);
      setSubjectValue("");
      handleClose();
    }
  }, [ticketTypes, editItem, userstsr]);

  const handleClose = () => {
    // setIsOpen(false);
    hideAlert();
    setValueId("");
    onClearEdit();
  };

  console.log(users);

  const handleSubmit = () => {
    mutate(
      {
        assigned_to: assignedToValue,
        code: codeValue,
        status: statusValue === "open" ? "true" : "false",
        asset: {
          code: editItem?.asset_code ?? "",
          description: editItem?.asset_description ?? "",
          name: editItem?.asset_name ?? "",
          id: editItem?.asset_id ?? "",
        },
        created_by: createdByValue,
        description: descriptionValue,
        subject: subjectValue,
        tenant: tenant,
        ticket_type: ticketType,
      },
      {
        onSuccess: (res) => {
          handleClose();
          console.log(res);
          // showAlert(res?.data?.message, "success");
          setAssignedToValue(0);
          setCodeValue("");
          setAssetValue(0);
          setCreatedByValue("");
          setDescriptionValue("");
          setSubjectValue("");
          setTenantValue("");
          setTicketType(0);
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
        id: valueId,
        data: {
          assigned_to: assignedToValue,
          code: codeValue,
          status: statusValue === "open" ? "true" : "false",
          asset: {
            code: editItem?.asset_code ?? "",
            description: editItem?.asset_description ?? "",
            name: editItem?.asset_name ?? "",
            id: editItem?.asset_id ?? "",
          },
          created_by: createdByValue,
        description: descriptionValue,
        subject: subjectValue,
        tenant: tenant,
        ticket_type: ticketType,
        },
      },
      {
        onSuccess: (res) => {
          handleClose();
          console.log(res);
          // showAlert(res?.data?.message, "success");
          setAssignedToValue(0);
          setCodeValue("");
          setStatusValue("open");
          setAssetValue(0);
          setCreatedByValue("");
          setDescriptionValue("");
          setSubjectValue("");
          setTenantValue("");
          setTicketType(0);
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
            {editItem ? "Edit Tickets" : "Create New Ticket"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="">
              <label className="form-label fs-6 fw-bold">Asset:</label>
              <input
                placeholder="Asset Name"
                type="text"
                name="Asset"
                autoComplete="off"
                className="form-control bg-transparent"
                value={assetValue}
                onChange={(e) => setAssetValue(parseInt(e.target.value))}
              />
            </div>
            <div className="">
              <label className="form-label fs-6 fw-bold">Assigned To:</label>
              <select 
              name="assigned_to" 
              id="assigned_to" 
              className="form-control bg-transparent"
              onChange={(e) => {
                const selected = users.filter((user) => user?.id === +e.target.value);
                console.log(selected[0]);
                setAssignedToValue(selected[0]);
              }}
              >
                <option value="">Select User</option>
                {
                  users?.map((data: any) => <option value={data.id} key={`${data.first_name}_${data.last_name}`}>{`${data.first_name} ${data.last_name}`}</option>)
                }
              </select>
              {/* <input
                placeholder=" "
                type="text"
                name="assignedTo"
                autoComplete="off"
                className="form-control bg-transparent"
                value={assignedToValue}
                onChange={(e) => setAssignedToValue(parseInt(e.target.value))}
              /> */}
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
              <label className="form-label fs-6 fw-bold">Created By:</label>
              <input
                placeholder=""
                type="text"
                name="createdBy"
                autoComplete="off"
                className="form-control bg-transparent"
                value={createdByValue}
                onChange={(e) => setCreatedByValue(e.target.value)}
              />
            </div>
            <div className="">
              <label className="form-label fs-6 fw-bold">Description:</label>
              <input
                placeholder=""
                type="text"
                name="description"
                autoComplete="off"
                className="form-control bg-transparent"
                value={descriptionValue}
                onChange={(e) => setDescriptionValue(e.target.value)}
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
            <div className="">
              <label className="form-label fs-6 fw-bold">Tenant:</label>
              <input
                placeholder=""
                type="text"
                name="text"
                autoComplete="off"
                className="form-control bg-transparent"
                value={tenant}
                onChange={(e) => setTenantValue(e.target.value)}
              />
            </div>
            <div className="">
              <label className="form-label fs-6 fw-bold">Ticket Type:</label>
              <select 
              name="ticket_type" 
              id="ticket_type" 
              className="form-control bg-transparent"
              onChange={(e) => {
                const selected = tickets.filter((ticket) => ticket?.id === +e.target.value);
                setTicketType(selected[0]);
              }}
              >
                <option value="">Select Type</option>
                {
                  tickets?.map((data: any) => <option value={data.id} key={data.name}>{data.name}</option>)
                }
              </select>
              {/* <input
                placeholder=""
                type="text"
                name="text"
                autoComplete="off"
                className="form-control bg-transparent"
                value={ticketType}
                onChange={(e) => setTicketType(parseInt(e.target.value))}
              /> */}
            </div>
            <div>
              <label className="form-label fs-6 fw-bold">Status:</label>
              <input
                className="form-check-input w-15px h-15px mx-1 mt-1"
                type="checkbox"
                id="flexSwitchCheckChecked"
                checked={statusValue === "open"}
                onChange={(e) =>
                  setStatusValue(e.target.checked ? "open" : "close")
                }
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
              codeValue === "" ||
              descriptionValue === "" ||
              subjectValue === "" ||
              tenant === ""
            }
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

export { ModalTicketsList };
