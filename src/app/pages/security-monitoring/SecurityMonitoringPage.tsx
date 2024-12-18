import React from "react";
import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import ScanResult from "./components/ScanResult";
import ResourceScan from "./components/ResourceScan";
import ScanHistory from "./components/ScanHistory";
import CloudTrail from "./components/CloudTrail";
import PolicyAndRuleset from "./components/PolicyAndRuleset";
import PolicyDetails from "./components/policies/PolicyDetails";
import TrailHistory from "./components/TrailHistory";
import TrailHistoryDetails from "./components/TrailHistoryDetails";
import NewPolicy from "./components/policies/NewPolicy";
import Compliance from "./components/Compliance";
const cloudProviderBreadCrumbs: Array<PageLink> = [
  {
    title: "Security Monitoring",
    path: "/monitoring/resource-scanning",
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

const SecurityMonitoringPage = () => {
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
          path="resource-scanning"
          element={
            <>
              <PageTitle breadcrumbs={cloudProviderBreadCrumbs}>
                Resource Scanning
              </PageTitle>
              <ResourceScan />
            </>
          }
        />
        <Route
          path="policies-and-ruleset"
          element={
            <>
              <PageTitle breadcrumbs={cloudProviderBreadCrumbs}>
                Policy And Ruleset
              </PageTitle>
              <PolicyAndRuleset />
            </>
          }
        />
        <Route
          path="compliance"
          element={
            <>
              <PageTitle breadcrumbs={cloudProviderBreadCrumbs}>
                Compliance
              </PageTitle>
              <Compliance />
            </>
          }
        />
        <Route
          path="policies-and-ruleset/new"
          element={
            <>
              <PageTitle breadcrumbs={cloudProviderBreadCrumbs}>
                New Policy And Ruleset
              </PageTitle>
              <NewPolicy />
            </>
          }
        />
        <Route
          path="policies-and-ruleset/:id"
          element={
            <>
              <PageTitle breadcrumbs={cloudProviderBreadCrumbs}>
                Policy And Ruleset Details
              </PageTitle>
              <PolicyDetails />
            </>
          }
        />

        <Route
          path="assessment-history/:id"
          element={
            <>
              <PageTitle breadcrumbs={cloudProviderBreadCrumbs}>
                Scan Details
              </PageTitle>
              <ScanResult />
            </>
          }
        />
        <Route
          // path="scan-history"
          path="assessment-history"
          element={
            <>
              <PageTitle breadcrumbs={cloudProviderBreadCrumbs}>
                Scan History
              </PageTitle>
              <ScanHistory />
            </>
          }
        />
        <Route
          path="cloudtrail-setup"
          element={
            <>
              <PageTitle breadcrumbs={cloudProviderBreadCrumbs}>
                Cloud Trail Setup
              </PageTitle>
              <CloudTrail />
            </>
          }
        />
        <Route
          path="cloudtrail-history/:name"
          element={
            <>
              <PageTitle breadcrumbs={cloudProviderBreadCrumbs}>
                Cloud Trail History
              </PageTitle>
              <TrailHistory />
            </>
          }
        />
        <Route
          path="cloudtrail-detail"
          element={
            <>
              <PageTitle breadcrumbs={cloudProviderBreadCrumbs}>
                Cloud Trail Details
              </PageTitle>
              <TrailHistoryDetails />
            </>
          }
        />
        <Route
          path=""
          element={
            <>
              <PageTitle breadcrumbs={cloudProviderBreadCrumbs}>
                Network Logs
              </PageTitle>
              {/* <CloudRegion /> */}
            </>
          }
        />

        <Route
          index
          element={<Navigate to="/monitoring/resource-scanning" />}
        />
      </Route>
    </Routes>
  );
};

export default SecurityMonitoringPage;
