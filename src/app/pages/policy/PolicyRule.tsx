import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAlert from "../components/useAlert";
import { ComponentsheaderComponent } from "../../components/componentsheader/componentsheader.component";
import {
  useGetPolicies,
  useGetSinglePolicyRules,
} from "../../api/api-services/policyQuery";

const PolicyRule = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useGetSinglePolicyRules(+id!);

  console.log(data);
  return (
    <div className="mt-10">
      <ComponentsheaderComponent
        backbuttonClick={() => console.log("back")}
        showbackbutton={true}
        pageName="Policy Rule"
        requiredButton={[]}
        buttonClick={(e) => {
          //   modal(e);
        }}
      />
    </div>
  );
};

export default PolicyRule;
