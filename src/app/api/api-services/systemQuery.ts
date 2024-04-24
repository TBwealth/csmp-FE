import {
  SystemSettingsApiSystemSettingsAssetManagementsCreateRequest,
  SystemSettingsApiSystemSettingsAssetManagementsUpdateRequest,
  SystemSettingsApiSystemSettingsRegionsCreateRequest,
  SystemSettingsApiSystemSettingsSystemSettingsUpdateRequest,
  SystemSetting,
} from "../axios-client";

import { systemApi } from "./apiUrl";
import { useQuery, useMutation, useQueryClient } from "react-query";

// ASSETS

export const useGetAssets = (page: number) => {
  const query = useQuery(["assets"], () =>
    systemApi.systemSettingsAssetManagementsList({ page })
  );
  return query;
};

export const useGetSingleAsset = (id: number) => {
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

export const useGetRegions = (page: number) => {
  const query = useQuery(["regions"], () =>
    systemApi.systemSettingsRegionsList({ page })
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
    //   }: SystemSettingsApiSystemSettingsSystemSettingsUpdateRequest ) =>
      }: any ) =>
        systemApi.systemSettingsRegionsUpdate({id, data }),
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["regions"]);
        },
      }
    );
    return mutation;
  };


