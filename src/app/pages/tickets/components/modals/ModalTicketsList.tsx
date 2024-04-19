import { useEffect, useState } from "react";
import { KTIcon, KTSVG } from "../../../../../_metronic/helpers";
import {
    useGetTickets,
 useUpdateTickets,
  useCreateTickets
 } from "../../../../api/api-services/ticketQuery";
import useAlert from "../../../components/useAlert";
import Select from 'react-select';
import { Modal } from "react-bootstrap";
import { TicketsTicketTypesList200Response } from "../../../../api/axios-client";
import { opendirSync } from "fs";


const ModalTicketsList = ({ editItem, onClearEdit, isOpen, handleHide }: any) => {

  // const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);

  const [tickets, setTickets] = useState<any[] | undefined>([]);
  const [assignedToValue, setAssignedToValue] = useState(0);
  const [valueId, setValueId] = useState("");
  const [nameValue, setNameValue] = useState("");
   const [assetValue, setAssetValue] = useState(0);
  const [createdByValue, setCreatedByValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [tenant, setTenantValue] = useState("");
  const [ticketType, setTicketType] = useState(0);
  const [codeValue, setCodeValue] = useState("");
  const [statusValue, setStatusValue] = useState("open");
  const [subjectValue, setSubjectValue] = useState("");
  const { showAlert, hideAlert, Alert } = useAlert();

    const{
        data: allTickets,
        isLoading: serviceLoading,
        error: serviceError
    } =   useGetTickets(page);
    console.log("daaaaa", allTickets)
    

  const { mutate, isLoading, error } = useCreateTickets();
  const {
    mutate: editMutate,
    isLoading: editLoading,
    error: editError,
  } = useUpdateTickets(+valueId);

  const datastsr: TicketsTicketTypesList200Response | any = allTickets;
 
  useEffect(() => {
    setTickets(datastsr?.data?.data?.results);
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
  }, [allTickets, editItem]);

  const handleClose = () => {
    // setIsOpen(false);
    hideAlert();
    setValueId("");
    onClearEdit();
  };

  const handleSubmit = () => {
    mutate(
      {
        assigned_to: {
          email: editItem?.assigned_to_email ?? "",
          first_name: editItem?.assigned_to_first_name ?? "",
          last_name: editItem?.assigned_to_last_name ?? "",
        },
        code: codeValue,
        status: statusValue === "open" ? "true" : "false",
        asset: {
          code: editItem?.asset_code ?? "",
          description: editItem?.asset_description ?? "",
          name: editItem?.asset_name ?? "",
          id: editItem?.asset_id ?? "",
        },
        created_by: editItem?.createdBy ?? "",
        description: editItem?.description ?? "",
        subject: editItem?.subject,
        tenant: editItem?.tenant,
        ticket_type: {
          code: editItem?.ticket_type_code,
          name: editItem?.ticket_type_name,
          id: editItem?.ticket_type_id,
        },
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
        data:{
          assigned_to: {
            email: editItem?.assigned_to_email ?? "",
            first_name: editItem?.assigned_to_first_name ?? "",
            last_name: editItem?.assigned_to_last_name ?? "",
          },
          code: codeValue,
          status: statusValue === "open" ? "true" : "false",
          asset: {
            code: editItem?.asset_code ?? "",
            description: editItem?.asset_description ?? "",
            name: editItem?.asset_name ?? "",
            id: editItem?.asset_id ?? "",
          },
          created_by: editItem?.createdBy ?? "",
          description: editItem?.description ?? "",
          subject: editItem?.subject,
          tenant: editItem?.tenant,
          ticket_type: {
            code: editItem?.ticket_type_code,
            name: editItem?.ticket_type_name,
            id: editItem?.ticket_type_id,
          },
        
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
          <div className="mb-10">
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
              <div className="mb-10">
              <label className="form-label fs-6 fw-bold">Assigned To:</label>
              <input
                placeholder=" "
                type="text"
                name="assignedTo"
                autoComplete="off"
                className="form-control bg-transparent"
                value={assignedToValue}
                onChange={(e) => setAssignedToValue(parseInt(e.target.value))}
              /> 
            </div>

          <div className="mb-10">
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
          <div className="mb-10">
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
          <div className="mb-10">
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
          <div className="mb-10">
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
          <div className="mb-10">
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
          <div className="mb-10">
            <label className="form-label fs-6 fw-bold">Ticket Type:</label>
            <input
              placeholder=""
              type="text"
              name="text"
              autoComplete="off"
              className="form-control bg-transparent"
              value={ticketType}
              onChange={(e) => setTicketType(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label className="form-label fs-6 fw-bold">Status:</label>
            <input
              className="form-check-input w-15px h-15px mx-1 mt-1"
              type="checkbox"
              id="flexSwitchCheckChecked"
              checked={statusValue === "open"}
              onChange={(e) => setStatusValue(e.target.checked ? "open" : "close")}
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
              codeValue === "" || descriptionValue ==="" || subjectValue ==="" || tenant ==="" 
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

export {ModalTicketsList };
 