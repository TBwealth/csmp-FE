import { useEffect, useState } from "react";
import { KTIcon, KTSVG } from "../../../../../_metronic/helpers";
import {
    useGetTicketsTypes,
 useUpdateTicketTypes,
  useCreateTicketTypes
 } from "../../../../api/api-services/ticketQuery";
import useAlert from "../../../components/useAlert";
import { Modal } from "react-bootstrap";
import { TicketsTicketTypesList200Response  } from "../../../../api/axios-client";


const ModalTicketTypes = ({ editItem, onClearEdit, isOpen, handleHide, handleRefetch }: any) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);

  const [tickets, setTickets] = useState<any[] | undefined>([]);
  const [valueId, setValueId] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [codeValue, setCodeValue] = useState("");
  const [statusValue, setStatusValue] = useState(false);
  const { showAlert, hideAlert, Alert } = useAlert();

    const{
        data: allTickets,
        isLoading: serviceLoading,
        error: serviceError
    } =   useGetTicketsTypes({page, pageSize: 100});

  const { mutate, isLoading, error } = useCreateTicketTypes();
  const {
    mutate: editMutate,
    isLoading: editLoading,
    error: editError,
  } = useUpdateTicketTypes(+valueId);

  const datastsr: TicketsTicketTypesList200Response  | any = allTickets;

  useEffect(() => {
    setTickets(datastsr?.data?.data?.results);
    if (editItem) {
      // setIsOpen(true);
      console.log(editItem, "Showwwwwwwwwwwww");
      setValueId(editItem?.id);
      setNameValue(editItem?.name);
      setCodeValue(editItem?.code);
      setStatusValue(editItem?.status);
    } else {
      setValueId("");
      setNameValue("");
      setCodeValue("");
      setStatusValue(true);
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
        name: nameValue,
        code: codeValue,
        status: statusValue,
      },
      {
        onSuccess: (res: any) => {
          // handleClose();
          handleRefetch()
          console.log(res);
          showAlert(res?.data?.message, "success");
          setNameValue("");
          setCodeValue("");
          setStatusValue(true);
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
        },
      },
      {
        onSuccess: (res: any) => {
          // handleClose();
          handleRefetch()
          console.log(res);
          showAlert(res?.data?.message, "success");
          setNameValue("");
          setCodeValue("");
          setStatusValue(false);
        },

        onError: (err) => {
          if (err instanceof Error) {
            showAlert(err?.message || "An unknown error occurred", "danger");
          }
          // showAlert(err?.response?.data?.message, "danger");
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
            <label className="form-label fs-6 fw-bold">Name:</label>
            <input
              placeholder=" "
              type="text"
              name="assignedTo"
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
              name="code"
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
            {(isLoading || editLoading) && (
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

export {ModalTicketTypes };
 