import React from "react";
import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import RepositoryList from "./components/RepositoryList";
import RepositoryScan from "./components/RepositoryScan";
import RepoScanHistory from "./components/RepoScanHistory";
import RepositoryScanResult from "./components/RepositoryScanResult";
// import SuppressionSetup from "./components/SuppressionSetup";
// import SuppressionLogs from "./components/SuppressionLogs";

const RepositoryBreadCrumbs: Array<PageLink> = [
  {
    title: "Repository MANAGEMENT",
    path: "/repository/list",
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

const RepositoryPage = () => {
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
          path="list"
          element={
            <>
              <PageTitle breadcrumbs={RepositoryBreadCrumbs}>
                Repository List
              </PageTitle>
              <RepositoryList />
            </>
          }
        />
        <Route
          path="scan"
          element={
            <>
              <PageTitle breadcrumbs={RepositoryBreadCrumbs}>
                Repository Scan
              </PageTitle>
              <RepositoryScan />
            </>
          }
        />

        <Route
          path="history"
          element={
            <>
              <PageTitle breadcrumbs={RepositoryBreadCrumbs}>
                RepoScan History
              </PageTitle>
              <RepoScanHistory />
            </>
          }
        />
        <Route
          path="scan-history/:id"
          element={
            <>
              <PageTitle breadcrumbs={RepositoryBreadCrumbs}>
                RepoScan History Details
              </PageTitle>
              <RepositoryScanResult />
            </>
          }
        />

        <Route index element={<Navigate to="/repository/list" />} />
      </Route>
    </Routes>
  );
};

export default RepositoryPage;
