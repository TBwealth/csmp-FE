import React, { useEffect, useState } from "react";
import scanimg from "../../../../../public/media/logos/scan-search.svg";
import { useGetCloudProviderResourceTypes } from "../../../api/api-services/cloudProviderQuery";
import modeAtomsAtom from "../../../atoms/modeAtoms.atom";
import { useRecoilValue } from "recoil";
import clsx from "clsx";
import * as Yup from "yup";
import { useFormik, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { FaGlobe, FaFile } from "react-icons/fa";
import { useGetAccountTenant } from "../../../api/api-services/accountQuery";
import { useGetRegions } from "../../../api/api-services/systemQuery";
import {
  useGetPolicies,
  useScanPolicy,
  useGetAllScanResults,
} from "../../../api/api-services/policyQuery";
import {
  SystemSettingsRegionsList200Response,
  PolicyPolicyListCreateList200Response,
  AccountsApiTenantsList200Response,
  CloudProviderCloudProviderResourceTypesList200Response,
} from "../../../api/axios-client";
import { Link } from "react-router-dom";
import ScanPolicyModal from "./modals/ScanModal";
import ScanLoading from "./ScanLoading";
import ScanData from "./modals/ScanData";
import axios from "axios";

const scanSchema = Yup.object().shape({
  provider: Yup.string(),
  policy_id: Yup.string().required("policy id is required"),
  cloud_provider_account_id: Yup.string().required("account id is required"),
  region: Yup.string(),
  frequency: Yup.string().required("scan frequency is  required"),
});

const ResourceScan = () => {
  const { mode } = useRecoilValue(modeAtomsAtom);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [allRegions, setAllRegions] = useState<any[]>([]);
  const [allPolicy, setAllPolicy] = useState<any[]>([]);
  const [allTenant, setAllTenant] = useState<any[]>([]);
  const [allResource, setAllResource] = useState<any[]>([]);
  const [showScan, setShowScan] = useState(false);
  const [errorMess, setErrorMess] = useState<any>(null);
  const [errType, setErrType] = useState<any>(null);
  const [loadingData, setLoadingData] = useState({
    name: "",
    policy: "",
    region: "",
  });
  const [scanData, setScanData] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState("");

  const { data: region } = useGetRegions({page: 1, pageSize: 1000});
  const regionstsr: SystemSettingsRegionsList200Response | any = region;
  const { data: policies } = useGetPolicies({ page: 1, pageSize: 10000 });
  const policystsr: PolicyPolicyListCreateList200Response | any = policies;
  const { data:resourcetypes, } = useGetCloudProviderResourceTypes({ page: 1, pageSize: 10000 });
  const datastsr: CloudProviderCloudProviderResourceTypesList200Response | any =
  resourcetypes;
  // const { data: scan } = useGetAllScanResults();
  // const scanstsr: PolicyPolicyListCreateList200Response | any = scan;

  const { data: tenant } = useGetAccountTenant({ page: 1, pageSize: 100 });

  const tenantstsr: AccountsApiTenantsList200Response | any = tenant;

  const { mutate, isLoading: scanLoading } = useScanPolicy();
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    const localUser = localStorage.getItem("user");
    if (localToken) {
      setToken(localToken);
    }

    if (localUser) {
      const parsedUser = JSON.parse(localUser);
      setUser(parsedUser);
      if (parsedUser.role.name === "Admin") {
        setIsAdmin(true);
      }
    }
  }, []);

  const fetchTenantLatestScan = async (tenant_id: string) => {
    try {
      const resp = await axios.get(
        `https://cspm-api.midrapps.com/policy/api/v1/policy_run_results/?tenant=${tenant_id}&scan_type=Cloud&page=1&page_size=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resp.status === 200) {
        // console.log(resp.data.data);
        setScanData(resp?.data?.data?.results[0] ?? {});
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setAllRegions(regionstsr?.data?.data?.results || []);
    setAllPolicy(policystsr?.data?.data?.results || []);
    setAllTenant(tenantstsr?.data?.data?.results || []);
    setAllResource(datastsr?.data?.data?.results || []);
    if (tenantstsr?.data?.data?.results && isAdmin) {
      fetchTenantLatestScan("1");
    } else {
      fetchTenantLatestScan(user?.tenant?.id);
    }
  }, [regionstsr, policystsr, tenantstsr, user, datastsr]);

  const getSelectedData = (pol_id: string, reg_id: string) => {
    const selectedPol = allPolicy.filter((pol) => pol.id === Number(pol_id))[0];
    const selectedReg = allRegions.filter(
      (pol) => pol.id === Number(reg_id)
    )[0];
    setLoadingData({
      policy: selectedPol.name,
      name: "AWS",
      region: selectedReg.name,
    });
  };

  return (
    <div className="px-8 mt-[32px]">
      {scanLoading ? (
        <ScanLoading
          name={loadingData.name}
          policy={loadingData.policy}
          region={loadingData.region}
        />
      ) : (
        <>
          {isAdmin && (
            <select
              name=""
              id=""
              className="form-control bg-transparent mb-3 md:w-[50%]"
              onChange={(e) => fetchTenantLatestScan(e.target.value)}
            >
              <option value="" className="font-medium">Select Tenant</option>
              {allTenant.map((tenant) => (
                <option key={tenant?.id} value={tenant?.id} className="font-medium">
                  {tenant?.full_name}
                </option>
              ))}
            </select>
          )}
          <div className="flex items-start justify-between w-full md:flex-row gap-[24px] flex-col mt-[32px]">
            <div
              className={`${
                mode === "dark" ? "bg-lightDark" : "bg-white"
              } border rounded-[12px] p-[32px] shadow-md md:w-[55%]`}
            >
              <div className="flex items-center gap-[16px]">
                <img src={scanimg} alt="cloud with search icon" />
                <h2 className="font-bold text-[18px]">
                  Initiate New Resource Scan
                </h2>
              </div>
              <div className="mt-[32px]">
                <Formik
                  initialValues={{
                    provider: "",
                    policy_id: "",
                    region: "",
                    frequency: "",
                    cloud_provider_account_id: ""
                  }}
                  validationSchema={scanSchema}
                  onSubmit={async (values) => {
                    getSelectedData(
                      values.policy_id,
                      values.region,
                    );
                    setLoading(true);
                    mutate(
                      {
                        data: {
                          policy_id: +values.policy_id,
                          regions: [values.region],
                          services: [values.provider],
                          scan_frequency: values.frequency,
                          cloud_provider_account_id: +values.cloud_provider_account_id
                        },
                      },
                      {
                        onSuccess: (res) => {
                          // setShowScan(true);
                          // setErrorMess(res.data);
                          // setErrType("success");
                          setLoading(false);
                          navigate("/monitoring/scan-history");
                        },
                        onError: (err: any) => {
                          setShowScan(true);
                          setLoading(false);
                          setErrorMess(err.response.data);
                          setErrType("danger");
                        },
                      }
                    );
                  }}
                >
                  {(form) => (
                    <form onSubmit={form.handleSubmit}>
                      {/* provider */}
                      <div className="form-group mb-[32px]">
                        <label
                          htmlFor="provider"
                          className="flex items-center gap-4 mb-[8px]"
                        >
                          <span>
                            <svg
                              width="24px"
                              height="24px"
                              strokeWidth="1.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              color={mode === "dark" ? "#EAEAEA" : "#000000"}
                            >
                              <path
                                d="M6 18.01L6.01 17.9989"
                                stroke={mode === "dark" ? "#EAEAEA" : "#000000"}
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M6 6.01L6.01 5.99889"
                                stroke={mode === "dark" ? "#EAEAEA" : "#000000"}
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M2 9.4V2.6C2 2.26863 2.26863 2 2.6 2H21.4C21.7314 2 22 2.26863 22 2.6V9.4C22 9.73137 21.7314 10 21.4 10H2.6C2.26863 10 2 9.73137 2 9.4Z"
                                stroke={mode === "dark" ? "#EAEAEA" : "#000000"}
                                strokeWidth="1.5"
                              ></path>
                              <path
                                d="M2 21.4V14.6C2 14.2686 2.26863 14 2.6 14H21.4C21.7314 14 22 14.2686 22 14.6V21.4C22 21.7314 21.7314 22 21.4 22H2.6C2.26863 22 2 21.7314 2 21.4Z"
                                stroke={mode === "dark" ? "#EAEAEA" : "#000000"}
                                strokeWidth="1.5"
                              ></path>
                            </svg>
                          </span>
                          <p className="font-semibold text-[14px]">
                            Select your Cloud Provider
                          </p>
                        </label>
                        <select
                          autoComplete="off"
                          {...form.getFieldProps("provider")}
                          className={clsx(
                            "form-control bg-transparent w-full h-45px mt-2",
                            {
                              "is-invalid":
                                form.touched.provider && form.errors.provider,
                            },
                            {
                              "is-valid":
                                form.touched.provider && !form.errors.provider,
                            }
                          )}
                        >
                          <option value="" className="font-medium">Select Provider</option>
                          {[
                            {
                              id: "AWS",
                              name: "aws",
                            },
                            {
                              id: "AZURE",
                              name: "azure",
                            },
                            {
                              id: "GPC",
                              name: "gpc",
                            },
                          ].map((provider) => (
                            <option key={provider.name} value={provider.id} className="font-medium">
                              {provider.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {/* policy */}
                      <div className="form-group mb-[32px]">
                        <label
                          htmlFor="policy_id"
                          className="flex items-center gap-4 mb-[8px]"
                        >
                          <span>
                            <svg
                              width="24px"
                              height="24px"
                              strokeWidth="1.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              color={mode === "dark" ? "#EAEAEA" : "#000000"}
                            >
                              <path
                                d="M3 5H21"
                                stroke={mode === "dark" ? "#EAEAEA" : "#000000"}
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M3 12H21"
                                stroke={mode === "dark" ? "#EAEAEA" : "#000000"}
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M3 19H21"
                                stroke={mode === "dark" ? "#EAEAEA" : "#000000"}
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </span>
                          <p className="font-semibold text-[14px]">
                            Compliant Policy{" "}
                          </p>
                        </label>
                        <select
                          autoComplete="off"
                          {...form.getFieldProps("policy_id")}
                          className={clsx(
                            "form-control bg-transparent w-full h-45px mt-2",
                            {
                              "is-invalid":
                                form.touched.policy_id && form.errors.policy_id,
                            },
                            {
                              "is-valid":
                                form.touched.policy_id &&
                                !form.errors.policy_id,
                            }
                          )}
                        >
                          <option value="" className="font-medium">Select Policy</option>
                          {allPolicy.map((policy) => (
                            <option key={policy.name} value={policy.id} className="font-medium">
                              {policy.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {/* Resource */}
                      <div className="form-group mb-[32px]">
                        <label
                          htmlFor="region"
                          className="flex items-center gap-4 mb-[8px]"
                        >
                          <FaFile
                            color={mode === "dark" ? "#EAEAEA" : "#000000"}
                            size={16}
                          />
                          <p className="font-semibold text-[14px]">
                            Select a Resource
                          </p>
                        </label>
                        <select
                          autoComplete="off"
                          {...form.getFieldProps("cloud_provider_account_id")}
                          className={clsx(
                            "form-control bg-transparent w-full h-45px mt-2",
                            {
                              "is-invalid":
                                form.touched.cloud_provider_account_id && form.errors.cloud_provider_account_id,
                            },
                            {
                              "is-valid":
                                form.touched.cloud_provider_account_id && !form.errors.cloud_provider_account_id,
                            }
                          )}
                        >
                          <option value="" className="font-medium">Select Resource</option>
                          {allResource.map((region) => (
                            <option key={region.account_name} value={region.id} className="font-medium">
                              {region.account_name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {/* Region */}
                      <div className="form-group mb-[32px]">
                        <label
                          htmlFor="region"
                          className="flex items-center gap-4 mb-[8px]"
                        >
                          <FaGlobe
                            color={mode === "dark" ? "#EAEAEA" : "#000000"}
                            size={16}
                          />
                          <p className="font-semibold text-[14px]">
                            Select a Region
                          </p>
                        </label>
                        <select
                          autoComplete="off"
                          {...form.getFieldProps("region")}
                          className={clsx(
                            "form-control bg-transparent w-full h-45px mt-2",
                            {
                              "is-invalid":
                                form.touched.region && form.errors.region,
                            },
                            {
                              "is-valid":
                                form.touched.region && !form.errors.region,
                            }
                          )}
                        >
                          <option value="" className="font-medium">Select Region</option>
                          {allRegions.map((region) => (
                            <option key={region.region_name} value={region.id} className="font-medium">
                              {region.region_name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {/* frequency */}
                      <div className="form-group mb-[32px]">
                        <label
                          htmlFor="frequency"
                          className="flex items-center gap-4 mb-[8px]"
                        >
                          <FaGlobe
                            color={mode === "dark" ? "#EAEAEA" : "#000000"}
                            size={16}
                          />
                          <p className="font-semibold text-[14px]">
                            Scan Frequency{" "}
                          </p>
                        </label>
                        <select
                          autoComplete="off"
                          {...form.getFieldProps("frequency")}
                          className={clsx(
                            "form-control bg-transparent w-full h-45px mt-2",
                            {
                              "is-invalid":
                                form.touched.frequency && form.errors.frequency,
                            },
                            {
                              "is-valid":
                                form.touched.frequency &&
                                !form.errors.frequency,
                            }
                          )}
                        >
                          <option value="" className="font-medium">Select Frequency</option>
                          {[
                            "once",
                            "weekly",
                            "monthly",
                            "yearly",
                            "bi-annually",
                          ].map((region) => (
                            <option key={region} value={region} className="font-medium">
                              {region}
                            </option>
                          ))}
                        </select>
                      </div>
                      {/*  */}
                      <div>
                        <div className="form-group">
                          <input
                            className="p-2 w-[15px] h-[15px] mx-1 mt-1"
                            type="checkbox"
                            defaultChecked
                            // id="flexSwitchCheckChecked"
                            // checked
                          />
                          <label className="form-label fs-6 fw-bold">
                            Initiate runtime action for all servers
                          </label>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="font-medium rounded-full p-3 bg-primary text-white w-full flex items-center justify-center"
                        disabled={
                          loading ||
                          !form.isValid ||
                          !form.values.frequency ||
                          !form.values.policy_id ||
                          !form.values.region
                        }
                      >
                        {!loading && (
                          <span className="indicator-label flex items-center">
                            Scan Cloud
                            <svg
                              width="20px"
                              height="20px"
                              strokeWidth="1.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              color="#FFFFFF"
                            >
                              <path
                                d="M13.5 13L15 14.5"
                                stroke="#FFFFFF"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M9 11C9 12.3807 10.1193 13.5 11.5 13.5C12.1916 13.5 12.8175 13.2192 13.2701 12.7654C13.7211 12.3132 14 11.6892 14 11C14 9.61929 12.8807 8.5 11.5 8.5C10.1193 8.5 9 9.61929 9 11Z"
                                stroke="#FFFFFF"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M5 18L3.13036 4.91253C3.05646 4.39524 3.39389 3.91247 3.90398 3.79912L11.5661 2.09641C11.8519 2.03291 12.1481 2.03291 12.4339 2.09641L20.096 3.79912C20.6061 3.91247 20.9435 4.39524 20.8696 4.91252L19 18C18.9293 18.495 18.5 21.5 12 21.5C5.5 21.5 5.07071 18.495 5 18Z"
                                stroke="#FFFFFF"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </span>
                        )}
                        {loading && (
                          <span
                            className="indicator-progress font-medium"
                            style={{ display: "block" }}
                          >
                            Please wait...{" "}
                            <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                          </span>
                        )}
                      </button>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="w-full md:w-[35%]">
              <div
                className={`rounded-[12px] font-medium flex items-center justify-between mb-10 border p-[24px] ${
                  mode === "dark" ? "bg-lightDark" : "bg-white"
                }`}
              >
                <div className="flex items-center gap-5">
                  <svg
                    width="42"
                    height="42"
                    viewBox="0 0 42 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="42"
                      height="42"
                      rx="21"
                      fill="#284CB3"
                      fillOpacity="0.1"
                    />
                    <path
                      d="M17.25 15L17.25 15.75"
                      stroke="#4470EF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.25 18.75L17.25 19.5"
                      stroke="#4470EF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M24.75 27V15M24.75 15L27 17.25M24.75 15L22.5 17.25"
                      stroke="#4470EF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.25 22.5V27M17.25 27L19.5 24.75M17.25 27L15 24.75"
                      stroke="#4470EF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex items-center gap-4">
                    <h1 className="font-bold text-[32px]">0</h1>
                    <h1 className="font-mediun texl-[14px]">
                      Reoccurring Scans
                    </h1>
                  </div>
                </div>
                <Link to="/monitoring/scan-history">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.75 2.25L11.25 2.25M15.75 2.25L9 9M15.75 2.25V6.75"
                      stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.75 9.75V13.75C15.75 14.8546 14.8546 15.75 13.75 15.75H4.25C3.14543 15.75 2.25 14.8546 2.25 13.75V4.25C2.25 3.14543 3.14543 2.25 4.25 2.25H8.25"
                      stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </Link>
              </div>
              <ScanData data={scanData} />
            </div>
          </div>
        </>
      )}
      {showScan && (
        <ScanPolicyModal
          isOpen={showScan}
          err={errorMess}
          errType={errType}
          handleHide={() => {
            setShowScan(false);
          }}
        />
      )}
    </div>
  );
};

export default ResourceScan;
