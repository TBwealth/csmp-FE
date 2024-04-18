import React from 'react';
import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import SystemActorsHeader from './SystemActorsHeader';
import AdminUser from './components/AdminUser';
import TenantEmployees from './components/TenantEmployees';
import TenantUser from './components/TenantUser';

const systemactorsBreadCrumbs: Array<PageLink> = [
    {
      title: "System Actors",
      path: "/actors",
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

const SystemActorsPage: React.FC = () => {
  return (
    <Routes>
      <Route
        element={
          <>
            <SystemActorsHeader />
            <Outlet />
          </>
        }
      >
        <Route
          path="admin-users"
          element={
            <>
              <PageTitle breadcrumbs={systemactorsBreadCrumbs}>
                Admin users
              </PageTitle>
              <AdminUser/>
            </>
          }
        />
        <Route
          path="tenant-employees"
          element={
            <>
              <PageTitle breadcrumbs={systemactorsBreadCrumbs}>
               Tenant Employees
              </PageTitle>
              <TenantEmployees/>
            </>
          }
        />
        <Route
          path="tenant-users"
          element={
            <>
              <PageTitle breadcrumbs={systemactorsBreadCrumbs}>
                Tenant Users
              </PageTitle>
              <TenantUser/>
            </>
          }
        />


    <Route index element={<Navigate to="/actors/admin-users" />} />

      </Route>
    </Routes>
  )
}

export default SystemActorsPage