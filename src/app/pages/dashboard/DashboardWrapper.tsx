import { FC } from "react";
import { useIntl } from "react-intl";
import { toAbsoluteUrl } from "../../../_metronic/helpers";
import { PageTitle } from "../../../_metronic/layout/core";
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
  ChartsWidget3,
} from "../../../_metronic/partials/widgets";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { Content } from "../../../_metronic/layout/components/content";
import {
  useGetAccountPermssion,
  useGetAccountRoles,
  useGetAccountTenant,
  useGetAccountUsers,
} from "../../api/api-services/accountQuery";
import {
  AccountsApiCustomTenantsList200Response,
  AccountsApiRolePermissionsList200Response,
  AccountsApiRolesList200Response,
  AccountsApiUsersList200Response,
} from "../../api/axios-client";

import "./style.css";

const DashboardPage: FC = () => {
  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useGetAccountUsers(1);
  const {
    data: rolesData,
    isLoading: rolesLoading,
    error: rolesError,
  } = useGetAccountRoles(1);
  const {
    data: tenantData,
    isLoading: tenantLoading,
    error: tenantError,
  } = useGetAccountTenant(1);
  const {
    data: permissionData,
    isLoading: permissionLoading,
    error: permError,
  } = useGetAccountPermssion(1);

  const allUserData: AccountsApiUsersList200Response | any = userData;
  const allPermissionData: AccountsApiRolePermissionsList200Response | any =
    permissionData;
  const allRoleData: AccountsApiRolesList200Response | any = rolesData;
  const allTenantData: AccountsApiCustomTenantsList200Response | any =
    tenantData;

  // console.log(rolesData, "rolesData")
  return (
    <>
      <ToolbarWrapper />
      <Content>
        {/* begin::Row */}
        <div className="security_issue">
          <h5>Security issues:</h5>
          <div className="security_container">
            <div className="issues">
              <p className="mb-3">Security issues by severity</p>
              <ul className="issue_score">
                <li className="critical">
                  <p>Critical</p>
                  <h1>0</h1>
                </li>
                <li className="high">
                  <p>High</p>
                  <h1>456</h1>
                </li>
                <li className="med">
                  <p>Medium</p>
                  <h1>45</h1>
                </li>
                <li className="low">
                  <p>Low</p>
                  <h1>0</h1>
                </li>
              </ul>
            </div>
            <div className="top_issues">
              <p className="">Top security issues</p>
              <div className="top_issues__container">
                <div className="left">
                  <p>Publicly exposed virtual machine with high priviledges</p>
                  <p>IAM Role with third party access and high priviledges</p>
                  <p>Partially public virtual machine with high priviledges</p>
                </div>
                <div className="right">
                  <p>
                    <span><i className="bi bi-bar-chart-fill text-red-400 mr-1"></i>High</span>
                    <span>499 security issues </span>
                  </p>
                  <p>
                    <span><i className="bi bi-bar-chart-fill text-red-400 mr-1"></i>High</span>
                    <span>4 security issues </span>
                  </p>
                  <p>
                    <span><i className="bi bi-bar-chart-fill text-red-400 mr-1"></i>Medium</span>
                    <span>4 security issues </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="assets_container">
          <h5>Assets at high risk</h5>
          <div className="assets">
            <div className="total">
              <h4 className="mb-3">In total</h4>
              <h1><i className="fa-sharp fa-regular fa-gem fs-2 mr-1"></i>46</h1>
            </div>
            <div className="public">
              <h4 className="mb-3">Public</h4>
              <section className="public_inner">
                <aside className="flex items-start">
                <i className="bi bi-globe fs-2"></i>
                <div className="border-0 -mt-4">
                  <span>Network</span>
                  <h3>0</h3>
                </div>
                </aside>
                <aside className="flex items-start">
                <i className="bi bi-globe fs-2 padding-2"></i>
                <div className="border-0 -mt-4">
                  <span>IAM</span>
                  <h3>1</h3>
                  </div>
                </aside>
              </section>
            </div>
            <div className="with_crit">
              <h4 className="mb-3">With critical/high severity secrets</h4>
              <h1><i className="bi bi-key fs-2 rotate-45"></i>0</h1>
            </div>
            <div className="high_crit">
              <h4 className="mb-3">With critical/high severity CVEs</h4>
              <h1><i className="bi bi-bug fs-2"></i>0</h1>
            </div>
            <div className="sense">
              <h4 className="mb-3">With sensitive data</h4>
              <h1><i className="bi bi-file-earmark-lock fs-2"></i>0</h1>
            </div>
          </div>
        </div>
        <div className="entities_container">
          <h5>Riskiest entities:</h5>
          <div className="entities">
            <div className="type">
              <p>By asset type</p>
              <div className="table">
                <div className="table_top">
                  <div className="table_top__left">
                    <p>Highest Risk</p>
                    <p>Type</p>
                  </div>
                  <div className="table_top__right">
                    <p>Critical</p>
                    <p>High</p>
                    <p>All</p>
                  </div>
                </div>
                <div className="table_bottom">
                  <div className="table_top___left">
                    <div className="table_bot__container">
                      <span>8.2</span>
                      <p>AWS IAM User</p>
                    </div>
                    <div className="table_bot__container">
                      <span>8.1</span>
                      <p>AWS API Gateway</p>
                    </div>
                    <div className="table_bot__container">
                      <span>8.1</span>
                      <p>AWS SNS</p>
                    </div>
                    <div className="table_bot__container">
                      <span>8.1</span>
                      <p>AWS S3 BUCKET</p>
                    </div>
                    <div className="table_bot__container">
                      <span>8.1</span>
                      <p>AWS EKS CLUSTER</p>
                    </div>
                  </div>
                  <div className="table_bottom___left">
                    <div className="table_top___right">
                      <p>0</p>
                      <p>30</p>
                      <p>30</p>
                    </div>
                    <div className="table_top___right">
                      <p>0</p>
                      <p>30</p>
                      <p>30</p>
                    </div>
                    <div className="table_top___right">
                      <p>0</p>
                      <p>30</p>
                      <p>30</p>
                    </div>
                    <div className="table_top___right">
                      <p>0</p>
                      <p>30</p>
                      <p>30</p>
                    </div>
                    <div className="table_top___right">
                      <p>0</p>
                      <p>30</p>
                      <p>30</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="type">
              <p>By asset</p>
              <div className="table">
                <div className="table_top">
                  <div className="by_asset_top">
                    <p>Risk</p>
                    <p>Entity</p>
                    <p>Type</p>
                    <p>Environment</p>
                  </div>
                </div>
                <div className="table_bottom_asset">
                  <div className="by_asset_top">
                    <div className="table_bot__container">
                      <span>8.2</span>
                    </div>
                    <p>jekins(AIDAICAJGIE...)</p>
                    <p>AWS IAM User</p>
                    <p>AWS(59639)</p>
                  </div>
                  <div className="by_asset_top">
                    <div className="table_bot__container">
                      <span>8.2</span>
                    </div>
                    <p>jekins(AIDAICAJGIE...)</p>
                    <p>AWS IAM User</p>
                    <p>AWS(59639)</p>
                  </div>
                  <div className="by_asset_top">
                    <div className="table_bot__container">
                      <span>8.2</span>
                    </div>
                    <p>jekins(AIDAICAJGIE...)</p>
                    <p>AWS IAM User</p>
                    <p>AWS(59639)</p>
                  </div>
                  <div className="by_asset_top">
                    <div className="table_bot__container">
                      <span>8.2</span>
                    </div>
                    <p>jekins(AIDAICAJGIE...)</p>
                    <p>AWS IAM User</p>
                    <p>AWS(59639)</p>
                  </div>
                  <div className="by_asset_top">
                    <div className="table_bot__container">
                      <span>8.2</span>
                    </div>
                    <p>jekins(AIDAICAJGIE...)</p>
                    <p>AWS IAM User</p>
                    <p>AWS(59639)</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="table_bottom_issues">
              <p className="mb-3">Environment by risk</p>
              <ul className="issue_score">
                <li className="critical">
                  <p>Critical</p>
                  <h1>0</h1>
                </li>
                <li className="high">
                  <p>High</p>
                  <h1>456</h1>
                </li>
                <li className="med">
                  <p>Medium</p>
                  <h1>45</h1>
                </li>
                <li className="low">
                  <p>Low</p>
                  <h1>0</h1>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <div className="row g-5 g-xl-8">
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
        </div> */}

        <div className="row g-5 gx-xxl-8">
          <div>
            <ChartsWidget3 className="card-xl-stretch mb-5 mb-xl-8" />
          </div>
        </div>
      </Content>
    </>
  );
};

const DashboardWrapper: FC = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.DASHBOARD" })}
      </PageTitle>
      <DashboardPage />
    </>
  );
};

export { DashboardWrapper };
