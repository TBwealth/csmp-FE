import React from "react";
import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import CloudProviderHeader from "./CloudProviderHeader";
import Resources from "./components/ProviderResources";
import ProviderResources from "./components/ProviderResources";
import ProviderServices from "./components/ProviderServices";

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
            <CloudProviderHeader />
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
          path="provider-service"
          element={
            <>
              <PageTitle breadcrumbs={cloudProviderBreadCrumbs}>
                Provider Services
              </PageTitle>
              <ProviderServices />
            </>
          }
        />

    <Route index element={<Navigate to="clouder-provider/cloud" />} />

      </Route>
    </Routes>
  );
};

export default CloudProviderPage;
