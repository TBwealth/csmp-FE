import { FC } from "react"
import { useIntl } from "react-intl"
import { toAbsoluteUrl } from "../../../_metronic/helpers"
import { PageTitle } from "../../../_metronic/layout/core"
import {
  ListsWidget2,
  ListsWidget3,
  ListsWidget4,
  ListsWidget6,
  TablesWidget5,
  TablesWidget10,
  MixedWidget8,
  CardsWidget7,
  CardsWidget17,
  CardsWidget20,
  ListsWidget26,
  EngageWidget10,
  ChartsWidget4,
  ChartsWidget3,
  StatisticsWidget5,
} from "../../../_metronic/partials/widgets"
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar"
import { Content } from "../../../_metronic/layout/components/content"
import {
  useGetAccountPermssion,
  useGetAccountRoles,
  useGetAccountTenant,
  useGetAccountUsers,
} from "../../api/api-services/accountQuery"
import {
  AccountsApiCustomTenantsList200Response,
  AccountsApiRolePermissionsList200Response,
  AccountsApiRolesList200Response,
  AccountsApiUsersList200Response,
} from "../../api/axios-client"

const DashboardPage: FC = () => {
  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useGetAccountUsers(1)
  const {
    data: rolesData,
    isLoading: rolesLoading,
    error: rolesError,
  } = useGetAccountRoles(1)
  const {
    data: tenantData,
    isLoading: tenantLoading,
    error: tenantError,
  } = useGetAccountTenant(1)
  const {
    data: permissionData,
    isLoading: permissionLoading,
    error: permError,
  } = useGetAccountPermssion(1)

  const allUserData: AccountsApiUsersList200Response | any = userData
  const allPermissionData: AccountsApiRolePermissionsList200Response | any =
    permissionData
  const allRoleData: AccountsApiRolesList200Response | any = rolesData
  const allTenantData: AccountsApiCustomTenantsList200Response | any =
    tenantData

  console.log(rolesData, "rolesData")
  return (
    <>
      <ToolbarWrapper />
      <Content>
        {/* begin::Row */}
        <div className="row g-5 g-xl-8">
          <div className="col-xl-3">
            <StatisticsWidget5
              className="card-xl-stretch mb-xl-8"
              svgIcon="user"
              color="success"
              iconColor="primary"
              title={
                userLoading || userError ? "0" : allUserData?.data?.data?.count
              }
              description="Users"
            />
          </div>

          <div className="col-xl-3">
            <StatisticsWidget5
              className="card-xl-stretch mb-xl-8"
              svgIcon="gear"
              color="dark"
              iconColor="white"
              title={
                rolesLoading || rolesError
                  ? "0"
                  : allRoleData?.data?.data?.count
              }
              titleColor="white"
              description="Roles"
              descriptionColor="white"
            />
          </div>

          <div className="col-xl-3">
            <StatisticsWidget5
              className="card-xl-stretch mb-xl-8"
              svgIcon="shield-cross"
              color="warning"
              iconColor="white"
              title={
                permissionLoading || permError
                  ? "0"
                  : allPermissionData?.data?.data?.count
              }
              titleColor="white"
              description="Permission"
              descriptionColor="white"
            />
          </div>

          <div className="col-xl-3">
            <StatisticsWidget5
              className="card-xl-stretch mb-5 mb-xl-8"
              svgIcon="people"
              color="info"
              iconColor="white"
              title={
                tenantLoading || tenantError
                  ? "0"
                  : allTenantData?.data?.data?.count
              }
              titleColor="white"
              description="Tenants"
              descriptionColor="white"
            />
          </div>
        </div>

        <div className="row g-5 gx-xxl-8">
          <div>
            <ChartsWidget3 className="card-xl-stretch mb-5 mb-xl-8" />
          </div>
        </div>
      </Content>
    </>
  )
}

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.DASHBOARD" })}
      </PageTitle>
      <DashboardPage />
    </>
  )
}

export { DashboardWrapper }
