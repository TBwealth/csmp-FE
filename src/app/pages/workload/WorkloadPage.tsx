import React from 'react'
import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import Index from './components/container/assets/Index';
import ScanHome from './components/container/scan/ScanHome';
import ContainerPoliciesHome from './components/container/policies/ContainerPoliciesHome';
import WorkloadDetails from './components/container/policies/WorkloadDetails';


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
                Container Assets
              </PageTitle>
              <Index />
            </>
          }
        />
        <Route
          path="container/container-scan"
          element={
            <>
              <PageTitle breadcrumbs={cloudProviderBreadCrumbs}>
              Container Scan
              </PageTitle>
              <ScanHome />
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
              <ContainerPoliciesHome />
            </>
          }
        />
        <Route
          path="container/policies/:id"
          element={
            <>
              <PageTitle breadcrumbs={cloudProviderBreadCrumbs}>
                Audit Logs
              </PageTitle>
              <WorkloadDetails />
            </>
          }
        />

        <Route index element={<Navigate to="/workload-protection/overview" />} />
      </Route>
    </Routes>
  )
}

export default WorkloadPage