import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useParams, useNavigate } from "react-router-dom";
import { useGetSingleTicketActivity } from "../../../api/api-services/ticketQuery";
import useAlert from "../../components/useAlert";
import modeAtomsAtom from "../../../atoms/modeAtoms.atom";
import { ModalTicketActivities } from "./modals/ModalTicketActivities";
import { ComponentsheaderComponent } from "../../../components/componentsheader/componentsheader.component";
import DefaultContent from "../../../components/defaultContent/defaultContent";

const TicketsActivities = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState<any>(null);
  const [editItems, setEditItems] = useState<any | undefined>();
  const [errorMess, setErrorMess] = useState("");
  const { showAlert, hideAlert } = useAlert();
  const [showModal, setShowModal] = useState(false);
  const [showEmpty, setshowEmpty] = useState(true);
  const { data, isLoading, error } = useGetSingleTicketActivity(+id!);
  const {mode} = useRecoilValue<any>(modeAtomsAtom);
  console.log(data);
  const topActionButtons = [
    {
      name: "add_new_user",
      label: "Add Activity",
      icon: "plus",
      outline: false,
    },
  ];
  const datastsr: any = data;
  useEffect(() => {
    setActivity(datastsr?.data?.data);
    setshowEmpty(datastsr?.data?.data.length > 0 ? false : true);
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

  function modal(buttion: any) {
    if (buttion === "add_new_user") {
      setShowModal(true);
      setEditItems(null);
    }
  }

  return (
    <div className="relative">
      <ComponentsheaderComponent
        backbuttonClick={() => navigate(-1)}
        showbackbutton={true}
        pageName={`Ticket Activities - ${id}`}
        requiredButton={topActionButtons}
        buttonClick={(e) => {
          modal(e);
        }}
      />
      <div className="mt-20">
        {showEmpty ? (
          <DefaultContent
            pageHeader="Ticket Activities"
            pageDescription="No record found"
            loading={isLoading}
            buttonValue="Refresh"
            buttonClick={() => refreshrecord()}
          />
        ) : (
          <div className="relative">
            {/* <div className="w-[30%] absolute right-10 -top-4 flex items-center gap-3">
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
            </div> */}
            {activity?.map((act: any) => (
              <div className={`border shadow-md w-[95%] mx-auto rounded-md p-4 md:p-8 mt-10 ${mode === "dark" ? "bg-lightDark text-[#7E8299]" : ""}`}>
                <div className="p-3">
                  <div className="flex items-center gap-4">
                    <span className="bg-primary rounded-full p-2  flex items-center justify-center">
                      <i className="bi bi-check2"></i>
                    </span>
                    <h3 className="font-semibold text-[18px]">
                      {act?.activity_type} @ {act?.timestamp.split(".")[0]}
                    </h3>
                  </div>
                  <div className="pl-5 border-l-4 ml-3 mt-2 border-l-primary">
                  <div className="w-full  flex items-start justify-between h-20">
                    <p className="pl-2 pb-5  text-[14px] font-medium ">
                      {act?.comments}
                    </p>
                    <button
                    className="btn btn-primary"
                    onClick={() => {
                      setEditItems(act);
                      setShowModal(true);
                    }}
                    >
                      update
                    </button>
                  </div>
                  <p>By: {`${act?.user?.first_name} ${act?.user?.last_name}`}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <ModalTicketActivities
          editItem={editItems}
          ticketId={+id!}
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
