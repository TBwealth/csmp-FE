import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAlert from "../components/useAlert";
import { ComponentsheaderComponent } from "../../components/componentsheader/componentsheader.component";
import {
  useGetPolicies,
  useGetSinglePolicyRules,
} from "../../api/api-services/policyQuery";
import DefaultContent from "../../components/defaultContent/defaultContent";
import { PolicyApiPolicyRulesListRequest } from "../../api/axios-client";

const PolicyRule = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rules, setRules] = useState<any>(null);
  const { data, isLoading } = useGetSinglePolicyRules(+id!);
  const datastsr: PolicyApiPolicyRulesListRequest | any = data;
  function refreshrecord() {
    useGetSinglePolicyRules(+id!);
  }

  useEffect(() => {
    setRules(datastsr?.data?.data);
  }, [datastsr]);
  console.log(data);
  return (
    <div className="mt-10">
      <ComponentsheaderComponent
        backbuttonClick={() => navigate(-1)}
        showbackbutton={true}
        pageName={`Rule ${id}`}
        requiredButton={[]}
        buttonClick={(e) => {
          //   modal(e);
        }}
      />

      {isLoading ? (
        <DefaultContent
          pageHeader="Rule"
          pageDescription="No record found"
          loading={isLoading}
          buttonValue="Refresh"
          buttonClick={() => refreshrecord()}
        />
      ) : (
        <div className="w-[90%] mx-auto mt-20">
          <div className="bg-lightDark rounded-md p-3">
            <div className="mt-6 grid md:grid-cols-3 gap-4 mb-4">
              <p className="col-span-1">Policy Name:</p>
              <p className="col-span-2 bg-bgDark p-2 rounded-md">
                {rules?.policy?.name}
              </p>
            </div>
            <div className="mt-6 grid md:grid-cols-3 gap-4 mb-4">
              <p className="col-span-1">Policy Code:</p>
              <p className="col-span-2 bg-bgDark p-2 rounded-md">
                {rules?.policy?.code}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyRule;
