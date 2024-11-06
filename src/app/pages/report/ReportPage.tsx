import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import ReportHistory from "./components/ReportHistory";
import ReportTemplates from "./components/ReportTemplates";

const RepositoryBreadCrumbs: Array<PageLink> = [
    {
      title: "Repository MANAGEMENT",
      path: "/reports/template",
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

const ReportPage = () => {
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
          path="template"
          element={
            <>
              <PageTitle breadcrumbs={RepositoryBreadCrumbs}>
                Report Template
              </PageTitle>
              <ReportTemplates />
            </>
          }
        />

        <Route
          path="history"
          element={
            <>
              <PageTitle breadcrumbs={RepositoryBreadCrumbs}>
                Report History 
              </PageTitle>
              <ReportHistory />
            </>
          }
        />

        <Route index element={<Navigate to="/report/template" />} />
      </Route>
    </Routes>
  )
}

export default ReportPage