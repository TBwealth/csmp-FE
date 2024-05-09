import React from 'react'
import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import { PageLink, PageTitle } from '../../../_metronic/layout/core';
// import AccountSettings from './components/AccountSettings';
import { Account } from '../../modules/profile/components/account/Account';
const cloudProviderBreadCrumbs: Array<PageLink> = [
    {
      title: "Settings",
      path: "/settings/account-settings",
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
        path="account-settings"
        element={
          <>
            <PageTitle breadcrumbs={cloudProviderBreadCrumbs}>
              Account Settings
            </PageTitle>
            <Account />
          </>
        }
      />

      <Route
        path=""
        element={
          <>
            <PageTitle breadcrumbs={cloudProviderBreadCrumbs}>
            Notification Preferences
            </PageTitle>
            {/* <ProviderServices /> */}
          </>
        }
      />
      <Route
        path=""
        element={
          <>
            <PageTitle breadcrumbs={cloudProviderBreadCrumbs}>
              Billing & Subscription
            </PageTitle>
            {/* <CloudRegion /> */}
          </>
        }
      />
      

      <Route index element={<Navigate to="/settings/account-settings" />} />
    </Route>
  </Routes>
  )
}

export default SettingsPage