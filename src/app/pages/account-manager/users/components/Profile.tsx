import React, { useEffect, useState } from "react";
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
        <div className="w-full md:w-[95%] md:mx-auto bg-lightDark mt-16 rounded-md p-4 md:p-6">
          <h1 className="text-lg pb-3 border-bottom border-white">
            Personal Information
          </h1>
          <div className="mt-6 grid md:grid-cols-3 gap-x-4 gap-y-8">
            <p className="md:col-span-1">Full Name:</p>
            <div className="col-span-2 flex items-center gap-4">
              <p className="bg-bgDark p-3 rounded-md w-full">
                {user?.first_name}
              </p>
              <p className="bg-bgDark p-3 rounded-md w-full">
                {user?.last_name}
              </p>
            </div>
          </div>
          <div className="mt-6 grid md:grid-cols-3 gap-x-4 gap-y-8">
            <p className="md:col-span-1">Email:</p>
            <div className="col-span-2 bg-bgDark p-3 rounded-md w-full">
              {user?.email}
            </div>
          </div>
          <div className="mt-6 grid md:grid-cols-3 gap-x-4 gap-y-8">
            <p className="md:col-span-1">Role:</p>
            <div className="col-span-2 bg-bgDark p-3 rounded-md w-full">
              {user?.role?.name}
            </div>
          </div>
          <div className="mt-6 grid md:grid-cols-3 gap-x-4 gap-y-8">
            <p className="md:col-span-1">Tenant:</p>
            <div className="col-span-2 bg-bgDark p-3 rounded-md w-full">
              {user?.tenant}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
