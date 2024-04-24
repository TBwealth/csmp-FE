import React from "react";
import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import PolicyRule from "./PolicyRule";


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