import React from 'react'
import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";


const cloudProviderBreadCrumbs: Array<PageLink> = [
    {
      title: "Workload-protection",
      // path: "/settings/account-settings",
      path: "/workload-protection/overview",
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


const WorkloadPage = () => {
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
          // path="account-settings"
          path="overview"
          element={
            <>
              <PageTitle breadcrumbs={cloudProviderBreadCrumbs}>
                User Management
              </PageTitle>
              {/* <UserManagement /> */}
            </>
          }
        />

        <Route
          path="container/container-assets"
          element={
            <>
              <PageTitle breadcrumbs={cloudProviderBreadCrumbs}>
                Account Setting
              </PageTitle>
              {/* <AccountSettings /> */}
            </>
          }
        />
        <Route
          path="container/container-scan"
          element={
            <>
              <PageTitle breadcrumbs={cloudProviderBreadCrumbs}>
                Notification
              </PageTitle>
              {/* <Notification /> */}
            </>
          }
        />
        <Route
          path="container/policies"
          element={
            <>
              <PageTitle breadcrumbs={cloudProviderBreadCrumbs}>
                Audit Logs
              </PageTitle>
              {/* <AuditLogs /> */}
            </>
          }
        />

        <Route index element={<Navigate to="/workload-protection/overview" />} />
      </Route>
    </Routes>
  )
}

export default WorkloadPage