import { FC } from "react";
import { useIntl } from "react-intl";
import { toAbsoluteUrl } from "../../../_metronic/helpers";
import { Chart } from "react-google-charts";
import { PageTitle } from "../../../_metronic/layout/core";
import { ChartsWidget3 } from "../../../_metronic/partials/widgets";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { Content } from "../../../_metronic/layout/components/content";
import {
  useGetAccountPermssion,
  useGetAccountRoles,
  useGetAccountTenant,
  useGetAccountUsers,
} from "../../api/api-services/accountQuery";
import {
  AccountsApiTenantsList200Response,
  AccountsApiRolesList200Response,
  AccountsApiUsersList200Response,
} from "../../api/axios-client";

import "./style.css";

export const data = [
  ["Country", "Availability"],
  ["Germany", 200],
  ["United States", 700],
  ["Brazil", 400],
  ["Canada", 500],
  ["France", 600],
  ["RU", 700],
  ["South Africa", 200],
];

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

  // const allUserData: AccountsApiUsersList200Response | any = userData;
  // const allPermissionData: AccountsApiRolePermissionsList200Response | any =
  //   permissionData;
  // const allRoleData: AccountsApiRolesList200Response | any = rolesData;
  // const allTenantData: AccountsApiTenantsList200Response | any = tenantData;

  // console.log(rolesData, "rolesData")
  return (
    <>
      <ToolbarWrapper />
      <Content>
        {/* begin::Row */}
        <div className="w-full mb-6">
          <h5>Security issues:</h5>
          <div className="grid md:grid-cols-5 w-full gap-2">
            <div className="w-full md:col-span-1  p-3 rounded-md border-2 border-[#3B4852] bg-bgDark dark:bg-lightDark shadow-md">
              <p className="mb-3 dark:text-white">Security issues by severity</p>
              <ul className="grid grid-cols-2 gap-6 md:block">
                <li className="border-l-3 border-l-rose-900 pl-2 dark:text-white">
                  <p>Critical</p>
                  <h1 className="text-xl font-semibold dark:text-white">0</h1>
                </li>
                <li className="border-l-3 border-l-red-500 pl-2 dark:text-white">
                  <p>High</p>
                  <h1 className="text-xl font-semibold dark:text-white">456</h1>
                </li>
                <li className="border-l-3 border-l-orange-400 pl-2 dark:text-white">
                  <p>Medium</p>
                  <h1 className="text-xl font-semibold dark:text-white">45</h1>
                </li>
                <li className="border-l-3 border-l-yellow-400 pl-2 dark:text-white">
                  <p>Low</p>
                  <h1 className="text-xl font-semibold dark:text-white">0</h1>
                </li>
              </ul>
            </div>
            <div className="w-full md:col-span-4 border-2 p-3 md:p-6 rounded-md border-[#3B4852] bg-lightDark shadow-md">
              <p className="mb-3 dark:text-white">Top security issues</p>
              <div>
                <div className="flex flex-col gap-3 lg:flex-row items-start justify-between dark:text-white">
                  <p>Publicly exposed virtual machine with high priviledges</p>
                  <p className="flex items-start justify-center gap-2">
                    <span>
                      <i className="bi bi-bar-chart-fill text-red-400 mr-1"></i>
                      High
                    </span>
                    <span>499 security issues </span>
                  </p>
                </div>
                <div className="my-3 flex flex-col gap-3 lg:flex-row items-start justify-between">
                  <p className="dark:text-white">
                    IAM Role with third party access and high priviledges
                  </p>
                  <p className="flex mr-6 items-start justify-center gap-2 dark:text-white">
                    <span className="text-white">
                      <i className="bi bi-bar-chart-fill text-red-400 mr-1"></i>
                      High
                    </span>
                    <span>4 security issues </span>
                  </p>
                </div>
                <div className="flex flex-col gap-3 lg:flex-row items-start justify-between">
                  <p className="dark:text-white">Partially public virtual machine with high priviledges</p>
                  <p className="flex items-start gap-2 dark:text-white">
                    <span>
                      <i className="bi bi-bar-chart-fill text-red-400 mr-1"></i>
                      Medium
                    </span>
                    <span>4 security issues </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mb-6">
          <h5>Assets at high risk</h5>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5">
            <div className="border-2 p-3 rounded-md border-[#3B4852] shadow-md bg-lightDark">
              <h4 className="mb-3 dark:text-white">In total</h4>
              <h1 className="dark:text-white">
                <i className="fa-sharp fa-regular fa-gem fs-2 mr-1"></i>46
              </h1>
            </div>
            <div className="border-2 p-3 rounded-md border-[#3B4852] shadow-md bg-lightDark">
              <h4 className="mb-3 dark:text-white">Public</h4>
              <section className="flex items-center justify-between mt-3 dark:text-white">
                <aside className="flex items-start mt-3 gap-2">
                  <i className="bi bi-globe fs-2"></i>
                  <div className="border-0 -mt-4 dark:text-white">
                    <span>Network</span>
                    <h3 className="dark:text-white">0</h3>
                  </div>
                </aside>
                <aside className="flex items-start mt-3 gap-2 ">
                  <i className="bi bi-globe fs-2 padding-2"></i>
                  <div className="border-0 -mt-4 dark:text-white">
                    <span>IAM</span>
                    <h3 className="dark:text-white">1</h3>
                  </div>
                </aside>
              </section>
            </div>
            <div className="border-2 p-3 rounded-md border-[#3B4852] shadow-md bg-lightDark">
              <h4 className="mb-3 dark:text-white">With critical/high severity secrets</h4>
              <h1 className="dark:text-white">
                <i className="bi bi-key fs-2 rotate-45 mr-2"></i>0
              </h1>
            </div>
            <div className="border-2 p-3 rounded-md border-[#3B4852] shadow-md bg-lightDark">
              <h4 className="mb-3 dark:text-white">With critical/high severity CVEs</h4>
              <h1 className="dark:text-white">
                <i className="bi bi-bug fs-2 mr-2"></i>0
              </h1>
            </div>
            <div className="border-2 p-3 rounded-md border-[#3B4852] shadow-md bg-lightDark">
              <h4 className="mb-3 dark:text-white">With sensitive data</h4>
              <h1 className="dark:text-white">
                <i className="bi bi-file-earmark-lock fs-2 mr-2"></i>0
              </h1>
            </div>
          </div>
        </div>
        <div className="w-full mb-6">
          <h5>Riskiest entities:</h5>
          <div className="grid gap-2 md:grid-cols-5">
            <div className="md:col-span-2 border-2 border-[#3B4852] rounded-md p-3 shadow-md bg-lightDark dark:text-white">
              <p>By asset type</p>
              <div className="table">
                <div className="table_top">
                  <div className="table_top__left dark:text-white">
                    <p className="text-white">Highest Risk</p>
                    <p className="text-white">Type</p>
                  </div>
                  <div className="table_top__right text-white">
                    <p className="text-white">Critical</p>
                    <p className="text-white">High</p>
                    <p className="text-white">All</p>
                  </div>
                </div>
                <div className="table_bottom">
                  <div className="table_top___left">
                    <div className="table_bot__container dark:text-white">
                      <span>8.2</span>
                      <p className="dark:text-white">AWS IAM User</p>
                    </div>
                    <div className="table_bot__container dark:text-white">
                      <span>8.1</span>
                      <p className="dark:text-white">AWS API Gateway</p>
                    </div>
                    <div className="table_bot__container dark:text-white">
                      <span>8.1</span>
                      <p className="dark:text-white">AWS SNS</p>
                    </div>
                    <div className="table_bot__container dark:text-white">
                      <span>8.1</span>
                      <p className="dark:text-white">AWS S3 BUCKET</p>
                    </div>
                    <div className="table_bot__container dark:text-white">
                      <span>8.1</span>
                      <p className="dark:text-white">AWS EKS CLUSTER</p>
                    </div>
                  </div>
                  <div className="table_bottom___left">
                    <div className="table_top___right dark:text-white">
                      <p className="dark:text-white">0</p>
                      <p className="dark:text-white">30</p>
                      <p className="dark:text-white">30</p>
                    </div>
                    <div className="table_top___right dark:text-white">
                      <p className="dark:text-white">0</p>
                      <p className="dark:text-white">30</p>
                      <p className="dark:text-white">30</p>
                    </div>
                    <div className="table_top___right dark:text-white">
                      <p className="dark:text-white">0</p>
                      <p className="dark:text-white">30</p>
                      <p className="dark:text-white">30</p>
                    </div>
                    <div className="table_top___right dark:text-white">
                      <p className="dark:text-white">0</p>
                      <p className="dark:text-white">30</p>
                      <p className="dark:text-white">30</p>
                    </div>
                    <div className="table_top___right dark:text-white">
                      <p className="dark:text-white">0</p>
                      <p className="dark:text-white">30</p>
                      <p className="dark:text-white">30</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-2 border-2 border-[#3B4852] rounded-md p-3 shadow-md bg-lightDark">
              <p className="dark:text-white">By asset</p>
              <div className="table dark:text-white">
                <div className="table_top dark:text-white">
                  <div className="by_asset_top dark:text-white">
                    <p className="text-white">Risk</p>
                    <p className="text-white">Entity</p>
                    <p className="text-white">Type</p>
                    <p className="text-white">Environment</p>
                  </div>
                </div>
                <div className="table_bottom_asset">
                  <div className="by_asset_top dark:text-white">
                    <div className="table_bot__container dark:text-white">
                      <span>8.2</span>
                    </div>
                    <p className="text-white">jekins(AIDAICAJGIE...)</p>
                    <p className="text-white">AWS IAM User</p>
                    <p className="text-white">AWS(59639)</p>
                  </div>
                  <div className="by_asset_top text-white">
                    <div className="table_bot__container text-white">
                      <span>8.2</span>
                    </div>
                    <p className="text-white">jekins(AIDAICAJGIE...)</p>
                    <p className="text-white">AWS IAM User</p>
                    <p className="text-white">AWS(59639)</p>
                  </div>
                  <div className="by_asset_top text-white">
                    <div className="table_bot__container text-white">
                      <span>8.2</span>
                    </div>
                    <p className="text-white">jekins(AIDAICAJGIE...)</p>
                    <p className="text-white">AWS IAM User</p>
                    <p className="text-white">AWS(59639)</p>
                  </div>
                  <div className="by_asset_top text-white">
                    <div className="table_bot__container text-white">
                      <span>8.2</span>
                    </div>
                    <p className="text-white">jekins(AIDAICAJGIE...)</p>
                    <p className="text-white">AWS IAM User</p>
                    <p className="text-white">AWS(59639)</p>
                  </div>
                  <div className="by_asset_top text-white">
                    <div className="table_bot__container text-white">
                      <span>8.2</span>
                    </div>
                    <p className="text-white">jekins(AIDAICAJGIE...)</p>
                    <p className="text-white">AWS IAM User</p>
                    <p className="text-white">AWS(59639)</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-2 border-[#3B4852] rounded-md p-3 shadow-md bg-lightDark">
              <p className="mb-3 dark:text-white">Environment by risk</p>
              <ul className="grid grid-cols-2 gap-4 md:block dark:text-white">
                <li className="border-l-3 border-l-rose-900 pl-2">
                  <p>Critical</p>
                  <h1 className="text-xl font-semibold dark:text-white">0</h1>
                </li>
                <li className="border-l-3 border-l-red-500 pl-2">
                  <p>High</p>
                  <h1 className="text-xl font-semibold dark:text-white">456</h1>
                </li>
                <li className="border-l-3 border-l-orange-400 pl-2">
                  <p>Medium</p>
                  <h1 className="text-xl font-semibold dark:text-white">45</h1>
                </li>
                <li className="border-l-3 border-l-yellow-400 pl-2">
                  <p>Low</p>
                  <h1 className="text-xl font-semibold dark:text-white">0</h1>
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
          <Chart
            chartEvents={[
              {
                eventName: "select",
                callback: ({ chartWrapper }) => {
                  const chart = chartWrapper.getChart();
                  const selection = chart.getSelection();
                  if (selection.length === 0) return;
                  const region = data[selection[0].row + 1];
                  console.log("Selected : " + region);
                },
              },
            ]}
            chartType="GeoChart"
            width="100%"
            height="400px"
            data={data}
          />
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
