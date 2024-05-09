import React from "react";
import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import PolicyRule from "./PolicyRule";
import ScanResult from "../security-monitoring/components/ScanResult";
import PolicyWrapper from "./PolicyWrapper";


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
            <Outlet />
          </>
        }
      >
        <Route
          path="policies"
          element={
            <>
              <PageTitle breadcrumbs={policyBreadCrumbs}>
                Policy Rules
              </PageTitle>
              <PolicyWrapper />
            </>
          }
        />
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
        <Route
          path="policy-scan-result"
          element={
            <>
              <PageTitle breadcrumbs={policyBreadCrumbs}>
                Scan Results
              </PageTitle>
              <ScanResult />
            </>
          }
        />
        <Route index element={<Navigate to="/policy/policies" />} />
      </Route>
    </Routes>
  )
}

export default PolicyAccessPage