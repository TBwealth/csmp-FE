import {
  Policy,
  PolicyApiPolicyCreateCloudtrailLogsCreateRequest,
  PolicyApiPolicyPolicyDetailUpdateRequest,
  PolicyApiPolicyPolicyOneTimeRepoScanCreateRequest,
  PolicyApiPolicyPolicyRepoRunScanCreateRequest,
  PolicyApiPolicyPolicyRunScanCreateRequest,
  PolicyApiPolicyRepoScanSetupCreateRequest,
  PolicyApiPolicyRepoScanSetupDeleteRequest,
  PolicyApiPolicyRepoScanSetupUpdateRequest,
  PolicyApiPolicyRulesUpdateRequest,
  PolicyApiPolicyUpdatePolicyRuleUpdateRequest,
  Rule,
} from "../axios-client";
import { policyApi } from "./index";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

// POLICY
export const useGetPolicies = (data: any) => {
  const query = useQuery(["policies", data], () =>
    policyApi.policyPolicyListCreateList({ ...data })
  );
  return query;
};

export const useCreatePolicies = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data: any) => policyApi.policyPolicyListCreateCreate({ data }),
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
    ({ id, data }: any) =>
      policyApi.policyPolicyDetailPartialUpdate({ id, data }),
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

export const useGetRulesList = (data: any) => {
  const query = useQuery(["rules", data], () =>
    policyApi.policyRulesList({ ...data })
  );
  return query;
};

export const useRuleCreate = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data: any) => policyApi.policyRulesCreate({ data }),
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
    ({ id, data }: any) => policyApi.policyRulesUpdate({ id, data }),
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

export const useGetAllScanResults = (data: any) => {
  const query = useQuery(["all-scan", data], () =>
    policyApi.policyPolicyRunResultsList({ ...data })
  );
  return query;
};

export const useGetSingleResult = (id: number) => {
  const query = useQuery(["single-scan"], () =>
    policyApi.policyPolicyDetailRead({ id })
  );
  return query;
};

export const useGetAllScanHistory = (data: any) => {
  const query = useQuery(["scan-history", data], () =>
    policyApi.policyPolicyRunScanHistoryList({ ...data })
  );

  return query;
};

export const useGetScanStat = () => {
  const query = useQuery(["scan-stats"], () =>
    policyApi.policyPolicyRunScanStatsList()
  );

  return query;
};

/*   

REPOSITORY
*/

// GET REPOSITORY

export const useGetAllRepository = (data: any) => {
  const query = useQuery(["all-repo"], () =>
    policyApi.policyRepoScanSetupList({ ...data })
  );
  return query;
};

export const useCreateRepoScan = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data: PolicyApiPolicyRepoScanSetupCreateRequest) =>
      policyApi.policyRepoScanSetupCreate(data),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(["all-repo"]);
      },
    }
  );

  return mutation;
};

export const useDeleteRepoScan = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data: PolicyApiPolicyRepoScanSetupDeleteRequest) =>
      policyApi.policyRepoScanSetupDelete(data),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(["all-repo"]);
      },
    }
  );

  return mutation;
};
export const useGetSingleRepoScan = (id: number) => {
  const query = useQuery(["all-repo"], () =>
    policyApi.policyRepoScanSetupRead({ id })
  );
  return query;
};
export const useRunRepoScan = () => {
  const mutation = useMutation(
    (data: PolicyApiPolicyPolicyRepoRunScanCreateRequest) =>
      policyApi.policyPolicyRepoRunScanCreate(data)
  );

  return mutation;
};
export const useUpdateRepoScan = () => {
  const mutation = useMutation(
    ({ id, data }: PolicyApiPolicyRepoScanSetupUpdateRequest) =>
      policyApi.policyRepoScanSetupUpdate({ id, data })
  );

  return mutation;
};
export const useRunRepoOnceScan = () => {
  const mutation = useMutation(
    (data: PolicyApiPolicyPolicyOneTimeRepoScanCreateRequest) =>
      policyApi.policyPolicyOneTimeRepoScanCreate(data)
  );

  return mutation;
};

// CLOUDTRAILS

export const useGetAllCloudTrails = (data: any) => {
  const query = useQuery(["all-trails"], () =>
    policyApi.policyFetchCloudtrailLogResultsList({ ...data })
  );

  return query;
};

export const useCreateCloudTrail = () => {
  const queryClient = new QueryClient();
  const mutation = useMutation(
    (data: PolicyApiPolicyCreateCloudtrailLogsCreateRequest) =>
      policyApi.policyCreateCloudtrailLogsCreate(data),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(["all-trails"])
      }
    }
  );

  return mutation;
};
