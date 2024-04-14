import {
  CloudProviderApiCloudProviderProviderResourceTypesUpdateRequest,
  CloudProviderResourceTypes,
  CloudProviderApiCloudProviderProviderServicesCreateRequest,
  CloudProviderApiCloudProviderProviderServicesUpdateRequest,
  
} from "../axios-client";
import { cloudApi } from "./index";
import { useMutation, useQuery, useQueryClient } from "react-query";

//CLOUD PROVIDER RESOURCE

export const useGetCloudProviderResourceTypes = (page: number) => {
  const query = useQuery(["resource"], () =>
    cloudApi.cloudProviderProviderResourceTypesList({ page })
  );
  return query;
};

export const usePostCloudProviderResourceTypes = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data: CloudProviderResourceTypes) =>
      cloudApi.cloudProviderProviderResourceTypesCreate({ data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["resource"]);
      },
    }
  );
  return mutation;
};

export const useUpdateCloudProviderResourceTypes = (id: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({
      id,
      data,
    }: CloudProviderApiCloudProviderProviderResourceTypesUpdateRequest) =>
      cloudApi.cloudProviderProviderResourceTypesUpdate({ id, data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["resource"]);
      },
    }
  );

  return mutation;
};

//CLOUD PROVIDER SERVICE

export const useGetCloudProviderServicesList = (page: number) => {
    const query = useQuery(["service"], () =>
      cloudApi.cloudProviderProviderServicesList({ page })
    );
    return query;
  };

  export const usePostCloudProviderServices = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
      (data: CloudProviderApiCloudProviderProviderServicesCreateRequest) =>
        cloudApi.cloudProviderProviderServicesCreate({data}),
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["service"]);
        },
      }
    );
    return mutation;
  };

  export const useUpdateCloudProviderServices = (id: number) => {
    const queryClient = useQueryClient();
  
    const mutation = useMutation(
      ({
        id,
        data,
      }: CloudProviderApiCloudProviderProviderServicesUpdateRequest) =>
        cloudApi.cloudProviderProviderServicesUpdate({ id, data }),
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["services"]);
        },
      }
    );
  
    return mutation;
  };