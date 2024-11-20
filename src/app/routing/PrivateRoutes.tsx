import { lazy, FC, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { MasterLayout } from "../../_metronic/layout/MasterLayout";
import TopBarProgress from "react-topbar-progress-indicator";
import { DashboardWrapper } from "../pages/dashboard/DashboardWrapper";
import { MenuTestPage } from "../pages/MenuTestPage";
import { getCSSVariableValue } from "../../_metronic/assets/ts/_utils";
import { WithChildren } from "../../_metronic/helpers";
import BuilderPageWrapper from "../pages/layout-builder/BuilderPageWrapper";
import ChangePassword from "../pages/auth/components/ChangePassword";
import BillingPage from "../pages/billing/BillingPage";

const PrivateRoutes = () => {
  const ProfilePage = lazy(() => import("../modules/profile/ProfilePage"));
  const WizardsPage = lazy(() => import("../modules/wizards/WizardsPage"));
  const AccountPage = lazy(() => import("../modules/accounts/AccountPage"));
  const WidgetsPage = lazy(() => import("../modules/widgets/WidgetsPage"));
  const ChatPage = lazy(() => import("../modules/apps/chat/ChatPage"));
  const UsersPage = lazy(
    () => import("../modules/apps/user-management/UsersPage")
  );
  const AccountManagerPage = lazy(
    () => import("../pages/account-manager/account-access/AccountAccessPage")
  );
  const UserManagerPage = lazy(
    () => import("../pages/account-manager/users/UsersPage")
  );
  const CloudProviderPage = lazy(
    () => import("../pages/cloud-provider/CloudProviderPage")
  );
  const TicketPage = lazy(() => import("../pages/tickets/TicketsPage"));
  const WorkloadProtect = lazy(() => import("../pages/workload/WorkloadPage"))

  const Policy = lazy(() => import("../pages/policy/PolicyAccessPage"));
  const PolicyRule = lazy(() => import("../pages/policy/PolicyRule"));
  const AssetsPage = lazy(() => import("../pages/assets/AssetsPage"));
  const SettingsPage = lazy(() => import("../pages/settings/SettingsPage"));
  const RepositoryPage = lazy(() => import("../pages/repository/RepositoryPage"));
  const SecurityMonitoring = lazy(() => import("../pages/security-monitoring/SecurityMonitoringPage"));
  const Report = lazy(() => import("../pages/report/ReportPage"));
  // const BillingPage = lazy(() => import("../pages/billing/BillingPage"))
  

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />
        {/* Pages */}
        <Route path="dashboard" element={<DashboardWrapper />} />
        <Route path="change-password" element={<ChangePassword />} />
        {/* <Route path="policy" element={<Policy />} /> */}
        <Route path="policy-rules/:id" element={<PolicyRule />} />
        <Route path="builder" element={<BuilderPageWrapper />} />
        <Route path="menu-test" element={<MenuTestPage />} />
        {/* Lazy Modules */}
        <Route
          path="account-manager/account*"
          element={
            <SuspensedView>
              <AccountManagerPage />
            </SuspensedView>
          }
        />
        <Route
          path="account-manager/users*"
          element={
            <SuspensedView>
              <UserManagerPage />
            </SuspensedView>
          }
        />
        <Route
          path="/cloud-provider/cloud/*"
          element={
            <SuspensedView>
              <CloudProviderPage />
            </SuspensedView>
          }
        />
        <Route
          // path="/tickets/*"
          path="/integration/*"
          element={
            <SuspensedView>
              <TicketPage />
            </SuspensedView>
          }
        />
        <Route
          path="/monitoring/*"
          element={
            <SuspensedView>
              <SecurityMonitoring />
            </SuspensedView>
          }
        />
        <Route
          path="/policy/*"
          element={
            <SuspensedView>
              <Policy />
            </SuspensedView>
          }
        />
        <Route
          path="/repository/*"
          element={
            <SuspensedView>
              <RepositoryPage />
            </SuspensedView>
          }
        />
        <Route
          path="/workload-protection/*"
          element={
            <SuspensedView>
              <WorkloadProtect />
            </SuspensedView>
          }
        />
        <Route
          path="/settings/*"
          element={
            <SuspensedView>
              <SettingsPage />
            </SuspensedView>
          }
        />
        <Route
          path="/reports/*"
          element={
            <SuspensedView>
              <Report />
            </SuspensedView>
          }
        />
        <Route
          path="/billing/*"
          element={
            <SuspensedView>
              <BillingPage />
            </SuspensedView>
          }
        />
        <Route
          path="/assets/*"
          element={
            <SuspensedView>
              <AssetsPage />
            </SuspensedView>
          }
        />
        <Route
          path="crafted/pages/profile/*"
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path="crafted/pages/wizards/*"
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path="crafted/widgets/*"
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path="crafted/account/*"
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path="apps/chat/*"
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path="apps/user-management/*"
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />

        {/* Page Not Found */}
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
};

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue("--bs-primary");
  TopBarProgress.config({
    barColors: {
      "0": baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
