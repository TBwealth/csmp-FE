import React from "react";
import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import Index from "./components/container/assets/Index";
import ScanHome from "./components/container/scan/ScanHome";
import WorkloadOverview from "./components/WorkloadOverview";
import ContainerPoliciesHome from "./components/container/policies/ContainerPoliciesHome";
import WorkloadDetails from "./components/container/policies/WorkloadDetails";
import TemplateIndex from "./components/infrastructure/templates/TemplateIndex";
import VulnerabilitiesIndex from "./components/infrastructure/vulnerabilities/VulnerabilitiesIndex";

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
                Workload Overview
              </PageTitle>
              <WorkloadOverview />
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
                Container Policies
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
                Container Policies Details
              </PageTitle>
              <WorkloadDetails />
            </>
          }
        />
        <Route
          path="iac/templates"
          element={
            <>
              <PageTitle breadcrumbs={cloudProviderBreadCrumbs}>
                IAC Template
              </PageTitle>
              <TemplateIndex />
            </>
          }
        />
        <Route
          path="iac/iac-vulnerability"
          element={
            <>
              <PageTitle breadcrumbs={cloudProviderBreadCrumbs}>
                IAC Vulnerabilities
              </PageTitle>
              <VulnerabilitiesIndex />
            </>
          }
        />

        <Route
          index
          element={<Navigate to="/workload-protection/overview" />}
        />
      </Route>
    </Routes>
  );
};

export default WorkloadPage;
