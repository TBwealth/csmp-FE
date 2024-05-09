import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import modeAtomsAtom from "../../../../atoms/modeAtoms.atom";
import { useParams, useNavigate } from "react-router-dom";
import { ComponentsheaderComponent } from "../../../../components/componentsheader/componentsheader.component";
import { useGetSingleAccountUsers } from "../../../../api/api-services/accountQuery";
import { AccountsApiAccountsApiUsersReadRequest } from "../../../../api/axios-client";
import DefaultContent from "../../../../components/defaultContent/defaultContent";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  console.log(id);
  const { data, isLoading, error } = useGetSingleAccountUsers(id!);
  function refreshrecord() {
    useGetSingleAccountUsers(id!);
  }

  const mode = useRecoilValue<any>(modeAtomsAtom);

  const datastsr: AccountsApiAccountsApiUsersReadRequest | any = data;
  useEffect(() => {
    setUser(datastsr?.data?.data);
  }, [data]);

  return (
    <div className="w-[95%] mx-auto h-screen">
      <ComponentsheaderComponent
        showbackbutton={true}
        backbuttonClick={() => navigate(-1)}
        pageName="User Profile"
        requiredButton={[]}
        buttonClick={(e) => {
          //   modal(e);
        }}
      />

      {isLoading ? (
        <DefaultContent
          pageHeader="User Profile"
          pageDescription="No record found"
          loading={isLoading}
          buttonValue="Refresh"
          buttonClick={() => refreshrecord()}
        />
      ) : (
        <div className="w-full md:w-[95%] md:mx-auto mt-16  gap-4 grid md:grid-cols-3">
          <div className={`shadow-md p-4 md:p-6 rounded-md md:col-span-1 flex items-center gap-2 justify-center flex-col ${mode.mode === "dark" ? "bg-lightDark text-[#7E8299]" : ""}`}>
            {user?.user_image ? (
              <img
                src={user?.user_image}
                alt="profile picture"
                className="w-56 h-60 rounded-full"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                // width="16"
                // height="16"
                fill="currentColor"
                className="bi bi-person-circle w-36 h-36 md:w-56 md:h-56 "
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fill-rule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
            )}
            <h3 className="text-lg">{`${user?.first_name} ${user?.last_name}`}</h3>
          </div>
          <div className={`shadow-md p-4 md:p-6 rounded-md md:col-span-2 ${mode.mode === "dark" ? "bg-lightDark text-[#7E8299]" : ""}`}>
            <h1 className="text-lg pb-3 border-bottom border-white">
              Personal Information
            </h1>
            <div className="mt-6 grid md:grid-cols-3 gap-x-4 gap-y-8">
              <p className="md:col-span-1 font-semibold">Full Name:</p>
              <div className="col-span-2 flex items-center gap-4">
                <p className={`shadow-md p-3 rounded-md w-full border-bottom font-semibold ${mode.mode === "dark" ? "bg-bgDark text-[#7E8299]" : ""}`}>
                  {user?.first_name}
                </p>
                <p className={`shadow-md p-3 rounded-md w-full border-bottom font-semibold ${mode.mode === "dark" ? "bg-bgDark text-[#7E8299]" : ""}`}>
                  {user?.last_name}
                </p>
              </div>
            </div>
            <div className="mt-6 grid md:grid-cols-3 gap-x-4 gap-y-8">
              <p className="md:col-span-1 font-semibold">Email:</p>
              <div className={`col-span-2 shadow-md p-3 rounded-md w-full border-bottom font-semibold ${mode.mode === "dark" ? "bg-bgDark text-[#7E8299]" : ""}`}>
                {user?.email}
              </div>
            </div>
            <div className="mt-6 grid md:grid-cols-3 gap-x-4 gap-y-8">
              <p className="md:col-span-1 font-semibold">Role:</p>
              <div className={`col-span-2 shadow-md p-3 rounded-md w-full border-bottom font-semibold ${mode.mode === "dark" ? "bg-bgDark text-[#7E8299]" : ""}`}>
                {user?.role?.name}
              </div>
            </div>
            <div className="mt-6 grid md:grid-cols-3 gap-x-4 gap-y-8">
              <p className="md:col-span-1 font-semibold">Tenant:</p>
              <div className={`col-span-2 shadow-md p-3 rounded-md w-full border-bottom font-semibold ${mode.mode === "dark" ? "bg-bgDark text-[#7E8299]" : ""}`}>
                {user?.tenant}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
