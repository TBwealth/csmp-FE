import React from "react";
import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import { PageLink, PageTitle } from "../../../../_metronic/layout/core";
import Roles from "./components/Roles";
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
            {/* <AccountManagerHeader /> */}
            <Outlet />
          </>
        }
      >
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
