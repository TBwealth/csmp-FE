import {
  AccountsApiAccountsApiPermissionsUpdateRequest,
  AccountsApiAccountsApiRolesUpdateRequest,
  AccountsApiAccountsApiTenantsUpdateRequest,
  AccountsApiAccountsApiUsersUpdateRequest,
  AccountsApiAccountsApiUpdateRolePermissionUpdateRequest,
  CustomPasswordReset,
  Login,
  Role,
  RolePermission,
  Tenant,
  TokenRefresh,
  AccountsApiAccountsApiTenantSelfOnboardRegisterCreateRequest,
  AccountsApiAccountsApiCreateUsersCreateRequest,
  AccountsApiAccountsApiPasswordChangeCreateRequest,
} from "../axios-client";
import { accountApi } from "./index";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useRefreshToken = () => {
  const mutation = useMutation((data: TokenRefresh) =>
    accountApi.accountsApiApiTokenRefreshCreate({ data })
  );
  return mutation;
};

export const useAccountLogin = () => {
  const mutation = useMutation((data: Login) =>
    accountApi.accountsApiLoginCreate({ data })
  );
  return mutation;
};

export const useAccountLogout = () => {
  const mutation = useMutation(() => accountApi.accountsApiLogoutCreate());
  return mutation;
};

export const useAccountRegister = () => {
  const mutation = useMutation((data: AccountsApiAccountsApiTenantSelfOnboardRegisterCreateRequest) =>
    accountApi.accountsApiTenantSelfOnboardRegisterCreate({ ...data })
  );
  return mutation;
};

export const useAccountPasswordReset = () => {
  const mutation = useMutation((data: CustomPasswordReset) =>
    accountApi.accountsApiPasswordResetCreate({ data })
  );
  return mutation;
};
export const useAccountPasswordChange = () => {
  const mutation = useMutation((data: AccountsApiAccountsApiPasswordChangeCreateRequest) =>
    accountApi.accountsApiPasswordChangeCreate({ ...data })
  );
  return mutation;
};

export const useGetAccountPermssion = (page: number) => {
  const query = useQuery(["permission"], () =>
    accountApi.accountsApiPermissionsList({ page })
  );
  return query;
};

export const usePostAccountPermission = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data: Role) => accountApi.accountsApiPermissionsCreate({ data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["permission"]);
      },
    }
  );
  return mutation;
};

export const useUpdateRolePermission = () => {
  const mutation = useMutation(
    (data: AccountsApiAccountsApiUpdateRolePermissionUpdateRequest) =>
      accountApi.accountsApiUpdateRolePermissionUpdate({ ...data })
  );

  return mutation;
};
export const useUpdateAccountPermission = (id: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ id, data }: AccountsApiAccountsApiRolesUpdateRequest) =>
      accountApi.accountsApiPermissionsUpdate({ id, data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["permission"]);
      },
    }
  );

  return mutation;
};

export const useGetAccountRoles = (page: number) => {
  const query = useQuery(["roles", page], () =>
    accountApi.accountsApiRolesList({ page })
  );
  return query;
};

export const usePostAccountRoles = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data: Role) => accountApi.accountsApiRolesCreate({ data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["roles"]);
      },
    }
  );
  return mutation;
};

export const useUpdateAccountRole = (id: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ id, data }: AccountsApiAccountsApiRolesUpdateRequest) =>
      accountApi.accountsApiRolesUpdate({ id, data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["roles"]);
      },
    }
  );

  return mutation;
};

export const useGetAccountRolesPermission = (page: number) => {
  const query = useQuery(["get_roles_permission", page], () =>
    accountApi.accountsApiRolePermissionList({ page })
  );
  return query;
};

export const usePostAccountRolesPermission = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data: RolePermission) =>
      accountApi.accountsApiRolePermissionCreate({ data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["get_roles_permission"]);
      },
    }
  );
  return mutation;
};

// export const useDeleteAccountRolesPermission = () => {
//   const queryClient = useQueryClient();
//   const mutation = useMutation(
//     (data: DeleteRolePermission) =>
//       accountApi.accountsApiDeleteRolePermissionDelete({ data }),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(["get_roles_permission"]);
//       },
//     }
//   );
//   return mutation;
// };

export const useUpdateAccountRolePermission = (id: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ id, data }: AccountsApiAccountsApiPermissionsUpdateRequest) =>
      accountApi.accountsApiPermissionsUpdate({ id, data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["get_roles_permission"]);
      },
    }
  );

  return mutation;
};

export const useGetAccountTenant = (data: any) => {
  const query = useQuery(["tenants", data], () =>
    accountApi.accountsApiTenantsList({ ...data })
  );
  return query;
};

export const useGetAccountCustomTenant = (page: number) => {
  const query = useQuery(["custom_tenants", page], () =>
    accountApi.accountsApiTenantsList({ page })
  );
  return query;
};

// export const usePostAccountTenant = () => {
//   const queryClient = useQueryClient();
//   const mutation = useMutation(
//     (data: any) => accountApi.accountsApiTenantsCreate({ data }),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(["tenants"]);
//       },
//     }
//   );
//   return mutation;
// };

export const useUpdateAccountTenant = (id: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ id, data }: AccountsApiAccountsApiTenantsUpdateRequest) =>
      accountApi.accountsApiTenantsUpdate({ id, data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["tenants"]);
      },
    }
  );

  return mutation;
};

export const useGetAccountUsers = (data: any) => {
  const query = useQuery(["users", data], () =>
    accountApi.accountsApiUsersList({...data })
  );
  return query;
};
export const useGetSingleAccountUsers = (id: string) => {
  const query = useQuery(["single_users"], () =>
    accountApi.accountsApiUsersRead({ id })
  );
  return query;
};

export const useUpdateAccountUsers = (id: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ id, data }: AccountsApiAccountsApiUsersUpdateRequest) =>
      accountApi.accountsApiUsersPartialUpdate({ id, data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
      },
    }
  );

  return mutation;
};

export const usePostAccountUsers = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ data }: AccountsApiAccountsApiCreateUsersCreateRequest) =>
      accountApi.accountsApiCreateUsersCreate({ data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
      },
    }
  );

  return mutation;
};

export const useGetAccountUserLoginLogs = (data: any) => {
  const query = useQuery(["user_login_logs", data], () =>
    accountApi.accountsApiActivityLogsList({ ...data })
  );
  return query;
};
