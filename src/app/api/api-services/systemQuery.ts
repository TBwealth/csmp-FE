import {
  SystemSettingsApiSystemSettingsAssetManagementsCreateRequest,
  SystemSettingsApiSystemSettingsAssetManagementsUpdateRequest,
  SystemSettingsApiSystemSettingsRegionsCreateRequest,
  SystemSettingsApiSystemSettingsRuleSuppressionSetupCreateRequest,
  SystemSettingsApiSystemSettingsRuleSuppressionSetupPartialUpdateRequest,
} from "../axios-client";

import { systemApi } from "./apiUrl";
import { useQuery, useMutation, useQueryClient } from "react-query";

// ASSETS

export const useGetAssets = (data: any) => {
  const query = useQuery(["assets"], () =>
    systemApi.systemSettingsAssetManagementsList({ ...data })
  );
  return query;
};

export const useGetSingleAsset = (id: any) => {
  const query = useQuery(["asset-id"], () =>
    systemApi.systemSettingsAssetManagementsRead({ id })
  );
  return query;
};

export const useCreateAssets = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data: SystemSettingsApiSystemSettingsAssetManagementsCreateRequest) =>
      systemApi.systemSettingsAssetManagementsCreate({ ...data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["assets"]);
      },
    }
  );

  return mutation;
};

export const useUpdateAssets = (id: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ({
      id,
      data,
    }: SystemSettingsApiSystemSettingsAssetManagementsUpdateRequest) =>
      systemApi.systemSettingsAssetManagementsUpdate({ id, data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["assets"]);
      },
    }
  );
  return mutation;
};

// Region

export const useGetRegions = (data: any) => {
  const query = useQuery(["regions"], () =>
    systemApi.systemSettingsRegionsList({ ...data })
  );
  return query;
};

export const useGetSingleRegion = (id: number) => {
  const query = useQuery(["region-id"], () =>
    systemApi.systemSettingsRegionsRead({ id })
  );
  return query;
};

export const useCreateRegion = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data: SystemSettingsApiSystemSettingsRegionsCreateRequest) =>
      systemApi.systemSettingsRegionsCreate({ ...data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["regions"]);
      },
    }
  );
  return mutation;
};

export const useUpdateRegion = (id: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ({
      id,
      data,
    }: //   }: SystemSettingsApiSystemSettingsSystemSettingsUpdateRequest ) =>
    any) => systemApi.systemSettingsRegionsUpdate({ id, data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["regions"]);
      },
    }
  );
  return mutation;
};

/*
  SUPPRESSION

  */

//suppression setup

export const useGetSuppressionSetups = (data: any) => {
  const query = useQuery(["setups"], () =>
    systemApi.systemSettingsRuleSuppressionSetupList({ ...data })
  );
  return query;
};

export const usePostSuppressionSetup = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data: SystemSettingsApiSystemSettingsRuleSuppressionSetupCreateRequest) =>
      systemApi.systemSettingsRuleSuppressionSetupCreate({ ...data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["setups"]);
      },
    }
  );
  return mutation;
};

export const useUpdateSuppressionSetup = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ({
      id,
      data,
    }: SystemSettingsApiSystemSettingsRuleSuppressionSetupPartialUpdateRequest) =>
      systemApi.systemSettingsRuleSuppressionSetupPartialUpdate({ id, data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["setups"]);
      },
    }
  );
  return mutation;
};

// suppression logs
export const useGetSuppressionLogs = (data: any) => {
  const query = useQuery(["suplogs"], () =>
    systemApi.systemSettingsRuleSuppressionLogList({ ...data })
  );
  return query;
};


// export const usePostSuppressionLog = () => {
//   const queryClient = useQueryClient();
//   const mutation = useMutation(
//     (data: SystemSettingsApiSystemSettingsRuleSuppressionSetupCreateRequest) =>
//       systemApi.({ ...data }),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(["setups"]);
//       },
//     }
//   );
//   return mutation;
// };
