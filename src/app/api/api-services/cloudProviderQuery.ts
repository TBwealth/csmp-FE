import {
  CloudProviderResourceTypes,
  // CloudProviderApiCloudProviderCloudProviderCreateRequest,
  CloudProviderApiCloudProviderCloudProviderUpdateRequest,
  CloudProviderApiCloudProviderResourceTypesUpdateRequest,
  CloudProviderApiCloudProviderUpdateCloudResourceUpdateRequest,
  CloudProviderApiCloudProviderProviderServiceOnboardingCreateRequest,
} from "../axios-client";
import { cloudApi } from "./index";
import { useMutation, useQuery, useQueryClient } from "react-query";

//CLOUD PROVIDER

export const useGetCloudProviderResourceTypes = (data: any) => {
  const query = useQuery(["resource"], () =>
    cloudApi.cloudProviderCloudProviderList({ ...data })
  );
  return query;
};

export const useCloudProviderCreate = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data: any) =>
      cloudApi.cloudProviderCloudProviderResourceTypesCreate({ ...data }),
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
    ({ id, data }: CloudProviderApiCloudProviderCloudProviderUpdateRequest) =>
      cloudApi.cloudProviderCloudProviderUpdate({ id, data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["resource"]);
      },
    }
  );

  return mutation;
};

//CLOUD PROVIDER SERVICE

export const useGetCloudProviderServicesList = (data: any) => {
  const query = useQuery(["service"], () =>
    cloudApi.cloudProviderResourceTypesList({ ...data })
  );
  return query;
};

export const usePostCloudProviderServices = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    // (data: CloudProviderApiCloudProviderCloudProviderCreateRequest) =>
    (data: any) => cloudApi.cloudProviderResourceTypesCreate({ data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["service"]);
      },
    }
  );
  return mutation;
};

export const useUpdateCloudProviderServices = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ id, data }: CloudProviderApiCloudProviderResourceTypesUpdateRequest) =>
      cloudApi.cloudProviderResourceTypesUpdate({ id, data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["services"]);
      },
    }
  );

  return mutation;
};

export const useAddResourceToProvider = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    // (data: CloudProviderApiCloudProviderCloudProviderCreateRequest) =>
    (data: CloudProviderApiCloudProviderUpdateCloudResourceUpdateRequest) =>
      cloudApi.cloudProviderUpdateCloudResourceUpdate({ ...data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["service"]);
      },
    }
  );
  return mutation;
};

// CLOUD PROVIDER RESOURCE

export const useGetCloudProviderResourceList = (id: number) => {
  const query = useQuery(["resource-list"], () =>
    cloudApi.cloudProviderCloudProviderResourceTypesRead({ id })
  );
  return query;
};

export const usePostCloudProviderResourceTypes = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data: CloudProviderResourceTypes) =>
      cloudApi.cloudProviderCloudProviderResourceTypesCreate({ data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["resource"]);
      },
    }
  );
  return mutation;
};

// PROVIDER SERVICE ONBOARDING

export const useCreateProviderServiceOnboarding = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (
      data: CloudProviderApiCloudProviderProviderServiceOnboardingCreateRequest
    ) => cloudApi.cloudProviderProviderServiceOnboardingCreate(data),
    {
      onSuccess: (res) => {
        console.log(res);
        queryClient.invalidateQueries(["resource"]);
      },
    }
  );

  return mutation;
};
