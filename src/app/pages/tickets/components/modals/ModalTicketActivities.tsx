import { useEffect, useState } from "react";
import { KTIcon, KTSVG } from "../../../../../_metronic/helpers";
import {
    useGetTicketsActivities,
 useUpdateTicketActivities,
  useCreateTicketActivities
 } from "../../../../api/api-services/ticketQuery";
import useAlert from "../../../components/useAlert";
import { Modal } from "react-bootstrap";
import { TicketsTicketActivitiesList200Response  } from "../../../../api/axios-client";


const ModalTicketActivities = ({ editItem, onClearEdit }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);

  const [tickets, setTickets] = useState<any[] | undefined>([]);
  const [valueId, setValueId] = useState("");
  const [timestampValue, setTimestampValue] = useState("");
  const [ticketValue, setTicketValue] = useState("");
  const [userValue, setUserValue] = useState("");
  const [commentValue, setCommentValue] = useState("");
  const [activityTypeValue, setActivityType] = useState("");
  const { showAlert, hideAlert, Alert } = useAlert();

    const{
        data: allTickets,
        isLoading: serviceLoading,
        error: serviceError
    } =   useGetTicketsActivities(page);

  const { mutate, isLoading, error } = useCreateTicketActivities();
  const {
    mutate: editMutate,
    isLoading: editLoading,
    error: editError,
  } = useUpdateTicketActivities(+valueId);

  const datastsr: TicketsTicketActivitiesList200Response  | any = allTickets;

  useEffect(() => {
    setTickets(datastsr?.data?.data?.results);
    if (editItem) {
      setIsOpen(true);
      console.log(editItem, "Showwwwwwwwwwwww");
      setValueId(editItem?.id);
      setTimestampValue(editItem?.timestamp)
      setTicketValue(editItem?.ticket);
      setUserValue(editItem?.user);
      setCommentValue(editItem?.comment);
      setActivityType(editItem?.activity_type);
    } else {
      setValueId("");
      setTimestampValue("");
      setTicketValue("");
      setUserValue("");
      setCommentValue("");
      setActivityType("");
      handleClose();
    }
  }, [allTickets, editItem]);

  const handleClose = () => {
    setIsOpen(false);
    hideAlert();
    setValueId("");
    onClearEdit();
  };

  const handleSubmit = () => {
    mutate(
      {
        ticket: 0,
        timestamp: timestampValue,
        user: 5,
        comments: commentValue,
        activity_type: activityTypeValue,

      },
      {
        onSuccess: (res) => {
          handleClose();
          console.log(res);
          // showAlert(res?.data?.message, "success");
          setTimestampValue(new Date().toISOString())
          setTicketValue("");
          setUserValue("");
          setCommentValue("");
          setActivityType("");
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
        data: {
            ticket: 0,
            user: 5,
            comments: commentValue,
            activity_type: activityTypeValue,
        },
      },
      {
        onSuccess: (res) => {
          handleClose();
          console.log(res);
          // showAlert(res?.data?.message, "success");
          setTicketValue("");
          setUserValue("");
          setCommentValue("");
          setActivityType("");
        },

        onError: (err) => {
          if (error instanceof Error) {
            showAlert(error?.message || "An unknown error occurred", "danger");
          }
          // showAlert(err?.response?.data?.message, "danger");
        },
      }
    );
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary btn-sm"
        onClick={() => {
          setIsOpen(true), hideAlert();
        }}
      >
        <KTIcon iconName="plus" className="fs-1" />
        Add New
      </button>

      <Modal
        show={isOpen}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editItem ? "Edit Ticket Activity" : "Create New Activity"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-10">
            <label className="form-label fs-6 fw-bold">Ticket:</label>
            <input
              placeholder=" "
              type="text"
              name="Ticket"
              autoComplete="off"
              className="form-control bg-transparent"
              value={ticketValue}
              onChange={(e) => setTicketValue(e.target.value)}
            />
          </div>
          <div className="mb-10">
            <label className="form-label fs-6 fw-bold">User:</label>
            <input
              placeholder="Enter Code"
              type="text"
              name="User"
              autoComplete="off"
              className="form-control bg-transparent"
              value={userValue}
              onChange={(e) => setUserValue(e.target.value)}
            />
          </div>
          <div className="mb-10">
            <label className="form-label fs-6 fw-bold">Comments:</label>
            <input
              placeholder="Enter Code"
              type="text"
              name="Comments"
              autoComplete="off"
              className="form-control bg-transparent"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
            />
          </div>
          <div className="mb-10">
            <label className="form-label fs-6 fw-bold">Activity Type:</label>
            <input
              placeholder="Enter Code"
              type="text"
              name="Activity Type"
              autoComplete="off"
              className="form-control bg-transparent"
              value={activityTypeValue}
              onChange={(e) => setActivityType(e.target.value)}
            />
          </div>
          

        </Modal.Body>
        <Alert />
        <Modal.Footer>
          <button type="button" className="btn btn-light" onClick={handleClose}>
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={
              ticketValue === "" || userValue === "" || commentValue ==="" || activityTypeValue ===""
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

export {ModalTicketActivities };
 