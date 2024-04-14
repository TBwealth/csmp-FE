import React from "react";
import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import { PageLink, PageTitle } from "../../../../_metronic/layout/core";
import UsersHeader from "./UsersHeader";
import AllUsers from "./components/AllUsers";
import UserLogs from "./components/UserLogs";

const accountManagerBreadCrumbs: Array<PageLink> = [
  {
    title: "Account Manager",
    path: "/account-manager/users",
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

const AccountManagerPage: React.FC = () => {
  return (
    <Routes>
      <Route
        element={
          <>
            <UsersHeader />
            <Outlet />
          </>
        }
      >
        <Route
          path="all-users"
          element={
            <>
              <PageTitle breadcrumbs={accountManagerBreadCrumbs}>
                All Users
              </PageTitle>
              <AllUsers />
            </>
          }
        />
        <Route
          path="user-logs"
          element={
            <>
              <PageTitle breadcrumbs={accountManagerBreadCrumbs}>
                User Logs
              </PageTitle>
              <UserLogs />
            </>
          }
        />
        
        <Route index element={<Navigate to="/account-manager/users" />} />
      </Route>
    </Routes>
  );
};

export default AccountManagerPage;
