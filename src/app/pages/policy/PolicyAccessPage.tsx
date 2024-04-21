import React from "react";
import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import PolicyAccessHeader from "./PolicyAccessHeader";
import PolicyRule from "./PolicyRule";
import RolePermission from "../account-manager/account-access/components/RolePermission";
import Roles from "../account-manager/account-access/components/Roles";
import Permissions from "../account-manager/account-access/components/Permissions";
import Tenant from "../account-manager/account-access/components/Tenant";


const policyBreadCrumbs: Array<PageLink> = [
    {
      title: "Policy",
      path: "/policy",
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
const PolicyAccessPage: React.FC = () => {
  return (
    <Routes>
      <Route
        element={
          <>
            {/* <PolicyAccessHeader /> */}
            <Outlet />
          </>
        }
      >
        <Route
          path="policy-rules/:id"
          element={
            <>
              <PageTitle breadcrumbs={policyBreadCrumbs}>
                Policy Rules
              </PageTitle>
              <PolicyRule />
            </>
          }
        />
        <Route index element={<Navigate to="/policy" />} />
      </Route>
    </Routes>
  )
}

export default PolicyAccessPage