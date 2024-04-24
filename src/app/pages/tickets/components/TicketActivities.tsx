import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetSingleTicketActivity } from "../../../api/api-services/ticketQuery";
import useAlert from "../../components/useAlert";
import {  } from "../../../api/axios-client";
import { ModalTicketActivities } from "./modals/ModalTicketActivities";
import { ComponentsheaderComponent } from "../../../components/componentsheader/componentsheader.component";
import DefaultContent from "../../../components/defaultContent/defaultContent";

const TicketsActivities = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editItems, setEditItems] = useState<any | undefined>();
  const [errorMess, setErrorMess] = useState("");
  const { showAlert, hideAlert } = useAlert();
  const [showModal, setShowModal] = useState(false);
  const [showEmpty, setshowEmpty] = useState<boolean>(false);
  const { data, isLoading, error } = useGetSingleTicketActivity(+id!);
  console.log(data);

  const datastsr: any = data;

  useEffect(() => {
    setshowEmpty(
      datastsr?.data?.data?.results
        ? datastsr?.data?.data?.results?.length === 0
        : true
    );
    hideAlert();
    if (error) {
      if (error instanceof Error) {
        setErrorMess(error?.message);
        showAlert(error?.message || "An unknown error occurred", "danger");
      }
    }
  }, [data, error]);

  function refreshrecord() {
    useGetSingleTicketActivity(+id!);
  }


  return (
    <div className="relative">
      <ComponentsheaderComponent
        backbuttonClick={() => navigate(-1)}
        showbackbutton={true}
        pageName={`Ticket Activities ${id}`}
        requiredButton={[]}
        buttonClick={(e) => {
          // modal(e);
        }}
      />
      {showEmpty ? (
        <DefaultContent
          pageHeader="Ticket Activities"
          pageDescription="No record found"
          loading={isLoading}
          buttonValue="Refresh"
          buttonClick={() => refreshrecord()}
        />
      ) : (
        <>
          <div className="w-[30%] absolute right-10 top-4 flex items-center gap-3">
            <button
              className="bg-primary p-3 rounded-md w-24"
              onClick={() => setShowModal(true)}
            >
              filter
            </button>
            <input
              placeholder="Search Activities"
              type="text"
              name="search"
              autoComplete="off"
              className="form-control bg-lightDark"
              // onChange={(e) => setAssignedToValue(parseInt(e.target.value))}
            />
          </div>
          <div className="bg-lightDark w-[95%] mx-auto rounded-md p-4 md:p-8 mt-10">
            <div className="p-3">
              <div className="flex items-center gap-4">
                <span className="bg-primary rounded-full p-2 text-white flex items-center justify-center">
                  <i className="bi bi-check2"></i>
                </span>
                <h3 className="font-semibold text-lg md:text-xl">Step 1</h3>
              </div>
              <div className="w-full pl-5 border-l-4 ml-3 mt-2 border-l-primary h-20">
                <p className="pl-2 pb-5  text-lg ">
                  Endorsed by: HOD recieves and endorsed. Forward by FTPS{" "}
                </p>
                <hr />
              </div>
            </div>
          </div>
        </>
      )}

      {showModal && (
        <ModalTicketActivities
          editItem={editItems}
          isOpen={showModal}
          handleHide={() => {
            setShowModal(false);
            setEditItems(false);
          }}
          onClearEdit={() => {
            setEditItems(null);
          }}
        />
      )}
    </div>
  );
};
export default TicketsActivities;
