import React from "react";
import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import AccountSettings from "./components/AccountSettings";
import Notification from "./components/Notification";
import AuditLogs from "./components/AuditLogs";
import UserManagement from "./components/UserManagement";
// import { Account } from '../../modules/profile/components/account/Account';
const cloudProviderBreadCrumbs: Array<PageLink> = [
  {
    title: "Settings",
    // path: "/settings/account-settings",
    path: "/settings/user-management",
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

const SettingsPage = () => {
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
          path="user-management"
          element={
            <>
              <PageTitle breadcrumbs={cloudProviderBreadCrumbs}>
                User Management
              </PageTitle>
              <UserManagement />
            </>
          }
        />

        <Route
          path="account-setting"
          element={
            <>
              <PageTitle breadcrumbs={cloudProviderBreadCrumbs}>
                Account Setting
              </PageTitle>
              <AccountSettings />
            </>
          }
        />
        <Route
          path="notifications"
          element={
            <>
              <PageTitle breadcrumbs={cloudProviderBreadCrumbs}>
                Notification
              </PageTitle>
              <Notification />
            </>
          }
        />
        <Route
          path="audit-logs"
          element={
            <>
              <PageTitle breadcrumbs={cloudProviderBreadCrumbs}>
                Audit Logs
              </PageTitle>
              <AuditLogs />
            </>
          }
        />

        <Route index element={<Navigate to="/settings/user-management" />} />
      </Route>
    </Routes>
  );
};

export default SettingsPage;
