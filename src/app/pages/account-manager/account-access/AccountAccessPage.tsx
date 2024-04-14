import React from "react";
import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import { PageLink, PageTitle } from "../../../../_metronic/layout/core";
import RolePermission from "./components/RolePermission";
import Permissions from "./components/Permissions";
import Roles from "./components/Roles";
import AccountManagerHeader from "./AccountAccessHeader";
import Tenant from "./components/Tenant";

const accountManagerBreadCrumbs: Array<PageLink> = [
  {
    title: "Account Manager",
    path: "/account-manager/account",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "",
    path: "",
    isSeparator: true,
    isActive: false,
  },
];

const AccountManagerPage: React.FC = () => {
  return (
    <Routes>
      <Route
        element={
          <>
            <AccountManagerHeader />
            <Outlet />
          </>
        }
      >
        <Route
          path="permissions"
          element={
            <>
              <PageTitle breadcrumbs={accountManagerBreadCrumbs}>
                Permissions
              </PageTitle>
              <Permissions />
            </>
          }
        />
        <Route
          path="roles"
          element={
            <>
              <PageTitle breadcrumbs={accountManagerBreadCrumbs}>
                Roles
              </PageTitle>
              <Roles />
            </>
          }
        />
        <Route
          path="role-permissions"
          element={
            <>
              <PageTitle breadcrumbs={accountManagerBreadCrumbs}>
                Role Permissions
              </PageTitle>
              <RolePermission />
            </>
          }
        />
        <Route
          path="tenants"
          element={
            <>
              <PageTitle breadcrumbs={accountManagerBreadCrumbs}>
                Tenants
              </PageTitle>
              <Tenant />
            </>
          }
        />
        <Route index element={<Navigate to="/account-manager/account" />} />
      </Route>
    </Routes>
  );
};

export default AccountManagerPage;
