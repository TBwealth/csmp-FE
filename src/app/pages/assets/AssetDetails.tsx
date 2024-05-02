import React, { useEffect, useState } from "react";
import { useGetSingleAsset } from "../../api/api-services/systemQuery";
import {SystemSettingsApiSystemSettingsAssetManagementsReadRequest } from "../../api/axios-client";
import { useNavigate, useParams } from "react-router-dom";
import { ComponentsheaderComponent } from "../../components/componentsheader/componentsheader.component";
import DefaultContent from "../../components/defaultContent/defaultContent";

const AssetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [asset, setAsset] = useState<any>(null);
  const { data, isLoading, error } = useGetSingleAsset(+id!);

  const datastsr: SystemSettingsApiSystemSettingsAssetManagementsReadRequest | any = data;

  function refreshrecord() {
    useGetSingleAsset(+id!);
  }

  useEffect(() => {
    if (data) {
      setAsset(datastsr?.data?.data);
    }
  }, [data, error]);

  return (
    <div>
      <ComponentsheaderComponent
        backbuttonClick={() => navigate(-1)}
        showbackbutton={true}
        pageName={`Asset ${id}`}
        requiredButton={[]}
        buttonClick={(e) => {
          //   modal(e);
        }}
      />
      {!asset ? (
        <DefaultContent
          pageHeader={`Assets ${id}`}
          pageDescription="No record found"
          loading={isLoading}
          buttonValue="Refresh"
          buttonClick={() => refreshrecord()}
        />
      ) : (
        <div className="w-[90%] border mx-auto mt-20  shadow-md  border-bottom  rk rounded-md p-6">
            <div className="mt-6 grid md:grid-cols-3 gap-4 mb-4">
                <p className="col-span-1">Name:</p>
                <p className="col-span-2  shadow-md  border-bottom  p-2 rounded-md">{asset.name}</p>
            </div>
            <div className="mt-6 grid md:grid-cols-3 gap-4 mb-4">
                <p className="col-span-1">Code:</p>
                <p className="col-span-2  shadow-md  border-bottom  p-2 rounded-md">{asset.code}</p>
            </div>
            <div className="mt-6 grid md:grid-cols-3 gap-4 mb-4">
                <p className="col-span-1">Public IP:</p>
                <p className="col-span-2  shadow-md  border-bottom  p-2 rounded-md">{asset.public_ip}</p>
            </div>
            <div className="mt-6 grid md:grid-cols-3 gap-4 mb-4">
                <p className="col-span-1">Tenant:</p>
                <p className="col-span-2  shadow-md  border-bottom  p-2 rounded-md">{asset.tenant}</p>
            </div>
            <div className="mt-6 grid md:grid-cols-3 gap-4 mb-4">
                <p className="col-span-1">Resource Type:</p>
                <p className="col-span-2  shadow-md  border-bottom  p-2 rounded-md">{asset.resource_types}</p>
            </div>
            <div className="mt-6 grid md:grid-cols-3 gap-4 mb-4">
                <p className="col-span-1">Cloud Provider:</p>
                <p className="col-span-2  shadow-md  border-bottom  p-2 rounded-md">{asset.cloud_provider}</p>
            </div>
            <div className="mt-6 grid md:grid-cols-3 gap-4 mb-4">
                <p className="col-span-1">Cloud Identifier:</p>
                <p className="col-span-2  shadow-md  border-bottom  p-2 rounded-md">{asset.cloud_identifier}</p>
            </div>
            <div className="mt-6 grid md:grid-cols-3 gap-4 mb-4">
                <p className="col-span-1">Region:</p>
                <p className="col-span-2  shadow-md  border-bottom  p-2 rounded-md">{asset.region}</p>
            </div>
            <div className="mt-6 grid md:grid-cols-3 gap-4 mb-4">
                <p className="col-span-1">Description:</p>
                <p className="col-span-2  shadow-md  border-bottom  p-2 rounded-md">{asset.description}</p>
            </div>
        </div>
      )}
    </div>
  );
};

export default AssetDetails;
