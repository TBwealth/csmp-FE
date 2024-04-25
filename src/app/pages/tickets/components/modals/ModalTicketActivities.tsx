import { useEffect, useState } from "react";
import { KTIcon, KTSVG } from "../../../../../_metronic/helpers";
import {
  useGetTickets,
  useUpdateTicketActivities,
  useCreateTicketActivities,
} from "../../../../api/api-services/ticketQuery";
import {
 useGetAccountUsers
} from "../../../../api/api-services/accountQuery"
import useAlert from "../../../components/useAlert";
import { Modal } from "react-bootstrap";
import { TicketsTicketActivitiesList200Response } from "../../../../api/axios-client";

const ModalTicketActivities = ({
  editItem,
  onClearEdit,
  isOpen,
  handleHide,
  ticketId
}: any) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  console.log(editItem);
  const [user, setUsers] = useState<any[]>([]);
  const [valueId, setValueId] = useState("");
  const [timestampValue, setTimestampValue] = useState("");
  const [ticketValue, setTicketValue] = useState<any>(null);
  const [userValue, setUserValue] = useState<any>(null);
  const [commentValue, setCommentValue] = useState("");
  const [activityTypeValue, setActivityType] = useState("");
  const { showAlert, hideAlert, Alert } = useAlert();

  const {
    data: allTickets,
    isLoading: serviceLoading,
    error: serviceError,
  } = useGetTickets(page);

  const {
    data: users,
  } = useGetAccountUsers(page);

  const { mutate, isLoading, error } = useCreateTicketActivities();
  const {
    mutate: editMutate,
    isLoading: editLoading,
    error: editError,
  } = useUpdateTicketActivities(+valueId);

  const datastsr: TicketsTicketActivitiesList200Response | any = allTickets;
  const userstsr: TicketsTicketActivitiesList200Response | any = users;

  useEffect(() => {
    if(datastsr && ticketId) {
      const filtered = datastsr?.data?.data?.results?.filter((tick: any) => tick?.id === ticketId);
      setTicketValue(filtered[0]);
    } 
    setUsers(userstsr?.data?.data?.results);
    if (editItem) {
      // setIsOpen(true);
      console.log(editItem, "Showwwwwwwwwwwww");
      setValueId(editItem?.id);
      setTimestampValue(editItem?.timestamp);
      setTicketValue(editItem?.ticket);
      setUserValue(editItem?.user);
      setCommentValue(editItem?.comments);
      setActivityType(editItem?.activity_type);
    }
  }, [datastsr, editItem, userstsr]);

  const handleClose = () => {
    // setIsOpen(false);
    hideAlert();
    setValueId("");
    onClearEdit();
  };

  const handleSubmit = () => {
    mutate(
      {
        ticket: {
          id: ticketValue?.id,
        },
        timestamp: timestampValue,
        user: {
          id: userValue?.id
        },
        comments: commentValue,
        activity_type: activityTypeValue,
      },
      {
        onSuccess: (res) => {
          handleHide();
          console.log(res);
          // showAlert(res?.data?.message, "success");
          setTimestampValue(new Date().toISOString());
          setTicketValue(null);
          setUserValue(null);
          setCommentValue("");
          setActivityType("");
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
          ticket: {
            id: ticketValue?.id 
          },
          user: {
            id: userValue?.id
          },
          comments: commentValue,
          activity_type: activityTypeValue,
        },
      },
      {
        onSuccess: (res) => {
          handleHide();
          console.log(res);
          // showAlert(res?.data?.message, "success");
          setTicketValue(null);
          setUserValue(null);
          setCommentValue("");
          setActivityType("");
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
            {editItem ? "Edit Ticket Activity" : "Create New Activity"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-10">
            <label className="form-label fs-6 fw-bold">Ticket:</label>
            <input
              placeholder=""
              type="text"
              name="Comments"
              autoComplete="off"
              className="form-control bg-transparent"
              value={ticketValue ? ticketValue?.id : ""}
              disabled
            />
          </div>
          <div className="mb-10">
            <label className="form-label fs-6 fw-bold">User:</label>
            <select
              className="form-select form-select-solid fw-bolder"
              data-placeholder="Select option"
              value={userValue?.id}
              onChange={(e) => {
                const selected = user?.filter(
                  (tick) => tick.id === +e.target.value
                );
                setUserValue({id: selected[0]?.id});
              }}
            >
              <option value="">Select user</option>
              {user?.map((item: any) => (
                <option key={item?.id} value={item?.id}>
                  {`${item?.first_name} ${item?.last_name}`}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-10">
            <label className="form-label fs-6 fw-bold">Comments:</label>
            <input
              placeholder="Enter Comment"
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
              placeholder="Enter activity type"
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
          <button type="button" className="btn btn-light" onClick={handleHide}>
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={
              !ticketValue?.id ||
              !userValue?.id ||
              !commentValue ||
              !activityTypeValue
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

export { ModalTicketActivities };
