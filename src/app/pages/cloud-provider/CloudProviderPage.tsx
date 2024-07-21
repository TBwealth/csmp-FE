import React from "react";
import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import ProviderResources from "./components/ProviderResources";
import ProviderServices from "./components/ProviderServices";
import CloudRegion from "./components/CloudRegion";
import SuppressionSetup from "./components/SuppressionSetup";
import SuppressionLogs from "./components/SuppressionLogs";
import ResourchArch from "../assets/ResourchArch";

const cloudProviderBreadCrumbs: Array<PageLink> = [
  {
    title: "Cloud Provider",
    path: "clouder-provider/cloud",
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

const CloudProviderPage: React.FC = () => {
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
          path="provider-resource"
          element={
            <>
              <PageTitle breadcrumbs={cloudProviderBreadCrumbs}>
                Provider Resource
              </PageTitle>
              <ProviderResources />
            </>
          }
        />
        <Route
          path="region"
          element={
            <>
              <PageTitle breadcrumbs={cloudProviderBreadCrumbs}>
                Provider Regions
              </PageTitle>
              <CloudRegion />
            </>
          }
        />

        <Route
          path="resource/:id"
          element={
            <>
              <PageTitle breadcrumbs={cloudProviderBreadCrumbs}>
                Provider Services
              </PageTitle>
              <ProviderServices />
            </>
          }
        />
        <Route
          path="suppression-setup"
          element={
            <>
              <PageTitle breadcrumbs={cloudProviderBreadCrumbs}>
                Suppression Setup
              </PageTitle>
              <SuppressionSetup />
            </>
          }
        />
        <Route
          path="suppression-logs"
          element={
            <>
              <PageTitle breadcrumbs={cloudProviderBreadCrumbs}>
                Suppression Logs
              </PageTitle>
              <SuppressionLogs />
            </>
          }
        />
        <Route
          path="architecture/:id"
          element={
            <>
              <PageTitle breadcrumbs={cloudProviderBreadCrumbs}>
                Resource Architecture
              </PageTitle>
              <ResourchArch />
            </>
          }
        />

        <Route
          index
          element={<Navigate to="clouder-provider/cloud/provider-resource" />}
        />
      </Route>
    </Routes>
  );
};

export default CloudProviderPage;
