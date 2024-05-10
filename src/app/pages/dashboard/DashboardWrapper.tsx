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
import { useRecoilValue } from "recoil";
import modeAtomsAtom from "../../atoms/modeAtoms.atom";


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
  const {mode} = useRecoilValue(modeAtomsAtom);
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

  const options = {
    backgroundColor:"white",
    colorAxis: {colors: ['black']}
  };

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
          <h5 className="font-semibold text-lg">Security issues:</h5>
          <div className="grid md:grid-cols-5 w-full gap-2">
            <div className={`w-full md:col-span-1  p-3 rounded-lg border shadow-md ${mode === "dark" ? "bg-lightDark" : "bg-white"}`}>
              <p className="mb-3">Security issues by severity</p>
              <div className="flex flex-col">
                <div className="!border-l-2 border-l-rose-900 pl-2 mb-4">
                  <p>Critical</p>
                  <h1 className="text-xl font-semibold">0</h1>
                </div>
                <div className="!border-l-2 !border-l-red-500 pl-2  mb-4">
                  <p>High</p>
                  <h1 className="text-xl font-semibold">456</h1>
                </div>
                <div className="!border-l-2 !border-l-orange-400 pl-2  mb-4">
                  <p>Medium</p>
                  <h1 className="text-xl font-semibold">45</h1>
                </div>
                <div className="!border-l-2 !border-l-yellow-400 pl-2  mb-4">
                  <p>Low</p>
                  <h1 className="text-xl font-semibold">0</h1>
                </div>
              </div>
            </div>
            <div className={`w-full md:col-span-4 border p-3 md:p-6 rounded-lg shadow-md ${mode === "dark" ? "bg-lightDark" : "bg-white"}`}>
              <p className="mb-3 font-semibold text-lg">Top security issues</p>
              <div>
                <div className="flex flex-col gap-3 lg:flex-row items-start justify-between">
                  <p>Publicly exposed virtual machine with high priviledges</p>
                  <p className="flex items-start justify-center gap-2">
                    <span>
                      <i className="bi bi-bar-chart-fill !text-red-500 mr-1"></i>
                      High
                    </span>
                    <span>499 security issues </span>
                  </p>
                </div>
                <div className="my-3 flex flex-col gap-3 lg:flex-row items-start justify-between">
                  <p className="">
                    IAM Role with third party access and high priviledges
                  </p>
                  <p className="flex mr-6 items-start justify-center gap-2 ">
                    <span className="">
                      <i className="bi bi-bar-chart-fill !text-green-500 mr-1"></i>
                      Low
                    </span>
                    <span>0 security issues </span>
                  </p>
                </div>
                <div className="flex flex-col gap-3 lg:flex-row items-start justify-between">
                  <p className="">
                    Partially public virtual machine with high priviledges
                  </p>
                  <p className="flex items-start gap-2 ">
                    <span>
                      <i className="bi bi-bar-chart-fill !text-yellow-500 mr-1"></i>
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
          <h5 className="font-semibold text-lg">Assets at high risk</h5>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5">
            <div className={`border p-3 rounded-md shadow-md ${mode === "dark" ? "bg-lightDark" : "bg-white"}`}>
              <h4 className="mb-3">In total</h4>
              <h1 className="">
                <i className="fa-sharp !text-orange-400 fa-regular fa-gem fs-2 mr-1"></i>46
              </h1>
            </div>
            <div className={`border p-3 rounded-md shadow-md ${mode === "dark" ? "bg-lightDark" : "bg-white"}`}>
              <h4 className="mb-3">Public</h4>
              <section className="flex items-center justify-between mt-3">
                <aside className="flex items-start mt-3 gap-2">
                  <i className="bi bi-globe !text-green-500 fs-2"></i>
                  <div className="border-0 -mt-4 ">
                    <span>Network</span>
                    <h3 className="">0</h3>
                  </div>
                </aside>
                <aside className="flex items-start mt-3 gap-2 ">
                  <i className="bi bi-globe !text-yellow-500 fs-2 padding-2"></i>
                  <div className="border-0 -mt-4 ">
                    <span>IAM</span>
                    <h3 className="">1</h3>
                  </div>
                </aside>
              </section>
            </div>
            <div className={`border p-3 rounded-md shadow-md ${mode === "dark" ? "bg-lightDark" : "bg-white"}`}>
              <h4 className="mb-3 ">
                With critical/high severity secrets
              </h4>
              <h1 className="">
                <i className="bi bi-key !text-green-500 fs-2 rotate-45 mr-2"></i>0
              </h1>
            </div>
            <div className={`border p-3 rounded-md shadow-md ${mode === "dark" ? "bg-lightDark" : "bg-white"}`}>
              <h4 className="mb-3 ">
                With critical/high severity CVEs
              </h4>
              <h1 className="">
                <i className="bi bi-bug !text-green-500 fs-2 mr-2"></i>0
              </h1>
            </div>
            <div className={`border p-3 rounded-md shadow-md ${mode === "dark" ? "bg-lightDark" : "bg-white"}`}>
              <h4 className="mb-3 ">With sensitive data</h4>
              <h1 className="">
                <i className="bi !text-green-500 bi-file-earmark-lock fs-2 mr-2"></i>0
              </h1>
            </div>
          </div>
        </div>
        <div className="w-full mb-6">
          <h5 className="font-semibold text-lg">Riskiest entities:</h5>
          <div className="grid gap-2 md:grid-cols-5">
            <div className={`${mode === "dark" ? "bg-lightDark" : "bg-white"} md:col-span-2 border rounded-md p-3 shadow-md`}>
              <p className="font-semibold text-lg">By asset type</p>
              <div className="table">
                <div className="table_top">
                  <div className="table_top__left ">
                    <p className="">Highest Risk</p>
                    <p className="">Type</p>
                  </div>
                  <div className="table_top__right ">
                    <p className="">Critical</p>
                    <p className="">High</p>
                    <p className="">All</p>
                  </div>
                </div>
                <div className="table_bottom">
                  <div className="table_top___left">
                    <div className="table_bot__container ">
                      <span>8.2</span>
                      <p className="">AWS IAM User</p>
                    </div>
                    <div className="table_bot__container ">
                      <span>8.1</span>
                      <p className="">AWS API Gateway</p>
                    </div>
                    <div className="table_bot__container ">
                      <span>8.1</span>
                      <p className="">AWS SNS</p>
                    </div>
                    <div className="table_bot__container ">
                      <span>8.1</span>
                      <p className="">AWS S3 BUCKET</p>
                    </div>
                    <div className="table_bot__container ">
                      <span>8.1</span>
                      <p className="">AWS EKS CLUSTER</p>
                    </div>
                  </div>
                  <div className="table_bottom___left">
                    <div className="table_top___right ">
                      <p className="">0</p>
                      <p className="">30</p>
                      <p className="">30</p>
                    </div>
                    <div className="table_top___right ">
                      <p className="">0</p>
                      <p className="">30</p>
                      <p className="">30</p>
                    </div>
                    <div className="table_top___right ">
                      <p className="">0</p>
                      <p className="">30</p>
                      <p className="">30</p>
                    </div>
                    <div className="table_top___right ">
                      <p className="">0</p>
                      <p className="">30</p>
                      <p className="">30</p>
                    </div>
                    <div className="table_top___right ">
                      <p className="">0</p>
                      <p className="">30</p>
                      <p className="">30</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${mode === "dark" ? "bg-lightDark" : "bg-white"} md:col-span-2 border rounded-md p-3 shadow-md`}>
              <p className="font-semibold text-lg">By asset</p>
              <div className="table ">
                <div className="table_top ">
                  <div className="by_asset_top ">
                    <p className="">Risk</p>
                    <p className="">Entity</p>
                    <p className="">Type</p>
                    <p className="">Environment</p>
                  </div>
                </div>
                <div className="table_bottom_asset">
                  <div className="by_asset_top ">
                    <div className="table_bot__container ">
                      <span>8.2</span>
                    </div>
                    <p className="">jekins(AIDAICAJGIE...)</p>
                    <p className="">AWS IAM User</p>
                    <p className="">AWS(59639)</p>
                  </div>
                  <div className="by_asset_top ">
                    <div className="table_bot__container ">
                      <span>8.2</span>
                    </div>
                    <p className="">jekins(AIDAICAJGIE...)</p>
                    <p className="">AWS IAM User</p>
                    <p className="">AWS(59639)</p>
                  </div>
                  <div className="by_asset_top ">
                    <div className="table_bot__container ">
                      <span>8.2</span>
                    </div>
                    <p className="">jekins(AIDAICAJGIE...)</p>
                    <p className="">AWS IAM User</p>
                    <p className="">AWS(59639)</p>
                  </div>
                  <div className="by_asset_top ">
                    <div className="table_bot__container ">
                      <span>8.2</span>
                    </div>
                    <p className="">jekins(AIDAICAJGIE...)</p>
                    <p className="">AWS IAM User</p>
                    <p className="">AWS(59639)</p>
                  </div>
                  <div className="by_asset_top ">
                    <div className="table_bot__container ">
                      <span>8.2</span>
                    </div>
                    <p className="">jekins(AIDAICAJGIE...)</p>
                    <p className="">AWS IAM User</p>
                    <p className="">AWS(59639)</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${mode === "dark" ? "bg-lightDark" : "bg-white"} rounded-md p-3 shadow-md border`}>
              <p className="mb-3 font-semibold text-lg">Environment by risk</p>
              <div className="flex flex-col">
                <div className="!border-l-2 border-l-rose-900 pl-2 mb-4">
                  <p>Critical</p>
                  <h1 className="text-xl font-semibold">0</h1>
                </div>
                <div className="!border-l-2 !border-l-red-500 pl-2  mb-4">
                  <p>High</p>
                  <h1 className="text-xl font-semibold">456</h1>
                </div>
                <div className="!border-l-2 !border-l-orange-400 pl-2  mb-4">
                  <p>Medium</p>
                  <h1 className="text-xl font-semibold">45</h1>
                </div>
                <div className="!border-l-2 !border-l-yellow-400 pl-2  mb-4">
                  <p>Low</p>
                  <h1 className="text-xl font-semibold">0</h1>
                </div>
              </div>
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
        <div className="py-2 border-b border-b-gray-300">
          <h5 className="font-semibold text-lg">Status per AWS Region</h5>
        </div>
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
            options={options}
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
