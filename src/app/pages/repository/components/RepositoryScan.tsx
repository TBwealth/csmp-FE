import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import modeAtomsAtom from "../../../atoms/modeAtoms.atom";
import { useGetAccountTenant } from "../../../api/api-services/accountQuery";
import scanimg from "../../../../../public/media/logos/repodb.svg";
import {
  useGetPolicies,
  useGetAllRepository,
  useRunRepoScan,
} from "../../../api/api-services/policyQuery";
import {
  PolicyPolicyListCreateList200Response,
  AccountsApiTenantsList200Response,
  PolicyRepoScanSetupList200Response,
} from "../../../api/axios-client";
import { Formik } from "formik";
import clsx from "clsx";
import * as Yup from "yup";
import axios from "axios";
import ScanData from "../../security-monitoring/components/modals/ScanData";
import { FaGlobe, FaServer } from "react-icons/fa";
import ScanLoading from "../../security-monitoring/components/ScanLoading";
import ScanPolicyModal from "../../security-monitoring/components/modals/ScanModal";

const scanSchema = Yup.object().shape({
  policy_id: Yup.string().required("policy id is required"),
  repo_id: Yup.string().required("repo id is  required"),
});

const RepositoryScan = () => {
  const { mode } = useRecoilValue(modeAtomsAtom);
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [scanData, setScanData] = useState<any>(null);
  const [allRepos, setAllRepos] = useState<any[]>([]);
  const [allPolicy, setAllPolicy] = useState<any[]>([]);
  const [allTenant, setAllTenant] = useState<any[]>([]);
  const [token, setToken] = useState("");
  const [showScan, setShowScan] = useState(false);
  const [errorMess, setErrorMess] = useState<any>(null);
  const [errType, setErrType] = useState<any>(null);
  const [loadingData, setLoadingData] = useState({
    name: "",
    policy: "",
    region: "",
  });
  const { data: policies } = useGetPolicies({ page: 1, pageSize: 10000 });
  const policystsr: PolicyPolicyListCreateList200Response | any = policies;
  const { data } = useGetAllRepository({
    page: 1,
    pageSize: 10000,
  });
  const datastsr: PolicyRepoScanSetupList200Response | any = data;
  const { data: tenant } = useGetAccountTenant({ page: 1, pageSize: 100 });
  const tenantstsr: AccountsApiTenantsList200Response | any = tenant;

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
        `https://cspm-api.midrapps.com/policy/policy_run_results/${tenant_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resp.status === 200) {
        // console.log(resp.data.data);
        setScanData(resp.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getSelectedData = (pol_id: string, reg_id: string) => {
    const selectedPol = allPolicy.filter((pol) => pol.id === Number(pol_id))[0];
    const selectedReg = allRepos.filter((pol) => pol.id === Number(reg_id))[0];
    setLoadingData({
      policy: selectedPol.name,
      name: "",
      region: selectedReg.name,
    });
  };

  useEffect(() => {
    setAllRepos(datastsr?.data?.data?.results || []);
    setAllPolicy(policystsr?.data?.data?.results || []);
    setAllTenant(tenantstsr?.data?.data?.results || []);
    // if (tenantstsr?.data?.data?.results && isAdmin) {
    //   fetchTenantLatestScan("1");
    // } else {
    //   fetchTenantLatestScan(user?.tenant?.id);
    // }
  }, [datastsr, policystsr, tenantstsr, user]);

  const { mutate, isLoading: scanLoading } = useRunRepoScan();

  return (
    <div className="p-4 md:p-12 lg:p-36">
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
              <option value="" className="font-medium">
                Select Tenant
              </option>
              {allTenant.map((tenant) => (
                <option
                  key={tenant?.id}
                  value={tenant?.id}
                  className="font-medium"
                >
                  {tenant?.full_name}
                </option>
              ))}
            </select>
          )}
          <div className="flex items-start justify-between flex-col md:flex-row gap-10">
            <div
              className={`rounded-xl border shadow-md  p-6 w-full md:w-[50%] ${
                mode === "dark" ? "bg-lightDark" : "bg-white"
              }`}
            >
              <div className="flex items-center gap-6">
                <img src={scanimg} alt="cloud with search icon" />
                <h2 className="font-bold text-[18px]">Scan a repository</h2>
              </div>
              <div className="mt-10">
                <Formik
                  initialValues={{
                    policy_id: "",
                    repo_id: "",
                  }}
                  validationSchema={scanSchema}
                  onSubmit={async (values) => {
                    getSelectedData(values.policy_id, values.repo_id);
                    setLoading(true);
                    mutate(
                      {
                        data: {
                          policy_id: +values.policy_id,
                          repo_id: +values.repo_id,
                        },
                      },
                      {
                        onSuccess: (res) => {
                          setShowScan(true);
                          setErrorMess(res);
                          setErrType("success");
                          setLoading(false);
                          //   navigate("/monitoring/scan-history");
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
                      {/* repo */}
                      <div className="form-group mb-15">
                        <label
                          htmlFor="provider"
                          className="flex items-center gap-4"
                        >
                          <FaServer
                            size={16}
                            color={mode === "dark" ? "#EAEAEA" : "#000000"}
                          />
                          <p className="font-semibold text-[14px]">
                            Select Repo
                          </p>
                        </label>
                        <select
                          autoComplete="off"
                          {...form.getFieldProps("repo_id")}
                          className={clsx(
                            "form-control bg-transparent w-full h-45px mt-2",
                            {
                              "is-invalid":
                                form.touched.repo_id && form.errors.repo_id,
                            },
                            {
                              "is-valid":
                                form.touched.repo_id && !form.errors.repo_id,
                            }
                          )}
                        >
                          <option value="" className="font-medium">
                            Select Repo
                          </option>
                          {allRepos.map((provider) => (
                            <option
                              key={provider.repo_name}
                              value={provider.id}
                              className="font-medium"
                            >
                              {provider.repo_name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {/* policy */}
                      <div className="form-group mb-15">
                        <label
                          htmlFor="policy_id"
                          className="flex items-center gap-4"
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
                          <option value="" className="font-medium">
                            Select Policy
                          </option>
                          {allPolicy.map((policy) => (
                            <option
                              key={policy.name}
                              value={policy.id}
                              className="font-medium"
                            >
                              {policy.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button
                        type="submit"
                        className=" font-medium rounded-full p-3 bg-primary text-white w-full flex items-center justify-center"
                        disabled={
                          loading ||
                          !form.isValid ||
                          !form.values.repo_id ||
                          !form.values.policy_id
                        }
                      >
                        {!loading && (
                          <span className="indicatorLabel flex items-center">
                            Scan Repo
                            <svg
                              width="20px"
                              height="20px"
                              strokeWidth="1.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              color="#FFFFFF"
                              className="pl-2"
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
            <div className="w-full md:w-[45%]">
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

export default RepositoryScan;
