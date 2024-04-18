import {
  Policy,
  PolicyApiPolicyPoliciesUpdateRequest,
  PolicyApiPolicyPolicyRulesUpdateRequest,
  PolicyApiPolicyRulesUpdateRequest,
  Rule,
} from "../axios-client";
import { policyApi } from "./index";
import { useMutation, useQuery, useQueryClient } from "react-query";

// POLICY
export const useGetPolicies = (page: number) => {
  const query = useQuery(["policies"], () =>
    policyApi.policyPoliciesList({ page })
  );
  return query;
};

export const useCreatePolicies = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data: Policy) => policyApi.policyPoliciesCreate({ data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["policies"]);
      },
    }
  );
  return mutation;
};

export const useUpdatePolicies = (id: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ id, data }: PolicyApiPolicyPoliciesUpdateRequest) =>
      policyApi.policyPoliciesUpdate({ id, data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["policies"]);
      },
    }
  );

  return mutation;
};

// Rules
export const useGetSinglePolicyRules = (id: number) => {
  const query = useQuery(["policy_rules"], () =>
    policyApi.policyRulesRead({ id })
  );
  return query;
};

export const useCreateSinglePolicyRules = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data: Rule) => policyApi.policyRulesCreate({ data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["policy_rules"]);
      },
    }
  );
  return mutation;
};

export const useUpdateSinglePolicyRules = (id: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({id, data}: PolicyApiPolicyRulesUpdateRequest) =>
      policyApi.policyRulesUpdate({id, data}),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["policy_rules"]);
      },
    }
  );

  return mutation;
};
