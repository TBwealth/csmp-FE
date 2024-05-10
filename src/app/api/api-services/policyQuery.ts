import {
  Policy,
  PolicyApiPolicyPolicyDetailUpdateRequest,
  PolicyApiPolicyPolicyRunScanCreateRequest,
  PolicyApiPolicyRulesUpdateRequest,
  PolicyApiPolicyUpdatePolicyRuleUpdateRequest,
  Rule,
} from "../axios-client";
import { policyApi } from "./index";
import { useMutation, useQuery, useQueryClient } from "react-query";

// POLICY
export const useGetPolicies = (page: number) => {
  const query = useQuery(["policies"], () =>
    policyApi.policyPolicyListCreateList({ page })
  );
  return query;
};

export const useCreatePolicies = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data: Policy) => policyApi.policyPolicyListCreateCreate({ data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["policies"]);
      },
    }
  );
  return mutation;
};

export const useUpdatePolicies = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ data }: PolicyApiPolicyPolicyDetailUpdateRequest) =>
      policyApi.policyPolicyDetailPartialUpdate({ data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["policies"]);
      },
    }
  );

  return mutation;
};

// Rules
export const useGetSinglePolicyRules = (policyId: any) => {
  const query = useQuery(["policy_rules"], () =>
    policyApi.policyPolicyRuleRead({ policyId })
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
    ({ id, data }: PolicyApiPolicyRulesUpdateRequest) =>
      policyApi.policyRulesUpdate({ id, data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["policy_rules"]);
      },
    }
  );

  return mutation;
};

export const useGetRulesList = (page: number) => {
  const query = useQuery(["rules"], () => policyApi.policyRulesList({ page }));
  return query;
};

export const useRuleCreate = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data: Rule) => policyApi.policyRulesCreate({ data }),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(["rules"]);
      },
    }
  );

  return mutation;
};

export const useRuleUpdate = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ({ id, data }: PolicyApiPolicyRulesUpdateRequest) =>
      policyApi.policyRulesUpdate({ id, data }),
    {
      onSuccess: (res) => {
        console.log(res);
        queryClient.invalidateQueries(["rules"]);
      },
    }
  );

  return mutation;
};

export const useAddPolicyRule = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data: PolicyApiPolicyUpdatePolicyRuleUpdateRequest) =>
      policyApi.policyUpdatePolicyRuleUpdate({ ...data }),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(["rules"]);
        console.log(res);
      },
    }
  );
  return mutation;
};

// policy scan
export const useScanPolicy = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data: PolicyApiPolicyPolicyRunScanCreateRequest) =>
      policyApi.policyPolicyRunScanCreate(data),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(["rules"]);
        queryClient.invalidateQueries(["policies"]);
        console.log(res);
      },
    }
  );

  return mutation;
};

export const useGetAllScanResults = () => {
  const query = useQuery(["all-scan"], () =>
    policyApi.policyPolicyRunResultsList()
  );
  return query;
}
