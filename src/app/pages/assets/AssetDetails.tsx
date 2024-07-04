import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import modeAtomsAtom from "../../atoms/modeAtoms.atom";
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
  const mode = useRecoilValue<any>(modeAtomsAtom);

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
        <div className={`w-[90%] border mx-auto mt-20  shadow-md rounded-md p-6 ${mode.mode === "dark" ? "bg-lightDark text-[#7E8299]" : "bg-white"}`}>
            <div className="mt-6 grid md:grid-cols-3 gap-4 mb-4">
                <p className="col-span-1 font-semibold text-[14px]">Name:</p>
                <p className={`col-span-2  shadow-md font-medium text-[14px]  p-2 rounded-md ${mode.mode === "dark" ? "bg-bgDark text-[#7E8299]" : ""}`}>{asset.name}</p>
            </div>
            <div className="mt-6 grid md:grid-cols-3 gap-4 mb-4">
                <p className="col-span-1 font-semibold text-[14px]">Services:</p>
                <p className={`col-span-2  shadow-md font-medium text-[14px]  p-2 rounded-md ${mode.mode === "dark" ? "bg-bgDark text-[#7E8299]" : ""}`}>{asset.services}</p>
            </div>
            <div className="mt-6 grid md:grid-cols-3 gap-4 mb-4">
                <p className="col-span-1 font-semibold text-[14px]">Resource Type:</p>
                <p className={`col-span-2  shadow-md font-medium text-[14px]  p-2 rounded-md ${mode.mode === "dark" ? "bg-bgDark text-[#7E8299]" : ""}`}>{asset.resource_types}</p>
            </div>
            <div className="mt-6 grid md:grid-cols-3 gap-4 mb-4">
                <p className="col-span-1 font-semibold text-[14px]">Cloud Provider:</p>
                <p className={`col-span-2  shadow-md font-medium text-[14px]  p-2 rounded-md ${mode.mode === "dark" ? "bg-bgDark text-[#7E8299]" : ""}`}>{asset.cloud_provider}</p>
            </div>
            <div className="mt-6 grid md:grid-cols-3 gap-4 mb-4">
                <p className="col-span-1 font-semibold text-[14px]">Cloud Identifier:</p>
                <p className={`col-span-2  shadow-md font-medium text-[14px]  p-2 rounded-md ${mode.mode === "dark" ? "bg-bgDark text-[#7E8299]" : ""}`}>{asset.cloud_identifier}</p>
            </div>
            <div className="mt-6 grid md:grid-cols-3 gap-4 mb-4">
                <p className="col-span-1 font-semibold text-[14px]">Region:</p>
                <p className={`col-span-2  shadow-md font-medium text-[14px]  p-2 rounded-md ${mode.mode === "dark" ? "bg-bgDark text-[#7E8299]" : ""}`}>{asset.region}</p>
            </div>
            <div className="mt-6 grid md:grid-cols-3 gap-4 mb-4">
                <p className="col-span-1 font-semibold text-[14px]">Cloud Account:</p>
                <p className={`col-span-2  shadow-md font-medium text-[14px]  p-2 rounded-md ${mode.mode === "dark" ? "bg-bgDark text-[#7E8299]" : ""}`}>{asset.cloud_account}</p>
            </div>
        </div>
      )}
    </div>
  );
};

export default AssetDetails;
