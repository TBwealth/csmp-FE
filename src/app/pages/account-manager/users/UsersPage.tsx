import React from "react";
import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import { PageLink, PageTitle } from "../../../../_metronic/layout/core";
import UsersHeader from "./UsersHeader";
import AllUsers from "./components/AllUsers";
import UserLogs from "./components/UserLogs";
import Profile from "./components/Profile";

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
          <div>
            {/* <UsersHeader /> */}
            <Outlet />
          </div>
        }
      >
        <Route
          path="all-users"
          element={
            <>
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
        <Route
          path="all-users/:id"
          element={
            <>
              <PageTitle breadcrumbs={accountManagerBreadCrumbs}>
                User Profile
              </PageTitle>
              <Profile />
            </>
          }
        />
        
        <Route index element={<Navigate to="/account-manager/all-users" />} />
      </Route>
    </Routes>
  );
};

export default AccountManagerPage;
