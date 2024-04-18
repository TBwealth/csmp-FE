import React from 'react';
import { useParams } from 'react-router-dom';
import useAlert from '../components/useAlert';
import {
    useGetPolicies,
    useGetSinglePolicyRules
   } from "../../api/api-services/policyQuery";


const PolicyRule = () => {
    const {id} = useParams();
    const {data} = useGetSinglePolicyRules(+id!);

    console.log(data);
  return (
    <div>PolicyRule</div>
  )
}

export default PolicyRule