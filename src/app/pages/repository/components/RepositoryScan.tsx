import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Popover } from "react-tiny-popover";
import modeAtomsAtom from "../../../atoms/modeAtoms.atom";
import { useGetAccountTenant } from "../../../api/api-services/accountQuery";
import scanimg from "../../../../../public/media/logos/repodb.svg";
import emptyImg from "../../../../../public/media/logos/empty-result.svg";
import {
  useGetPolicies,
  useRunRepoOnceScan,
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
import { FaGlobe, FaKey, FaLink, FaServer } from "react-icons/fa";
import ScanLoading from "../../security-monitoring/components/ScanLoading";
import ScanPolicyModal from "../../security-monitoring/components/modals/ScanModal";

const scanSchema = Yup.object().shape({
  policy_id: Yup.string().required("policy id is required"),
  repo_id: Yup.string().required("repo id is required"),
});

const RepositoryScan = () => {
  const { mode } = useRecoilValue(modeAtomsAtom);
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [scanData, setScanData] = useState<any>(null);
  const [allRepos, setAllRepos] = useState<any[]>([]);
  const [allDataRepos, setAllDataRepos] = useState<any[]>([]);
  const [allPolicy, setAllPolicy] = useState<any[]>([]);
  const [allTenant, setAllTenant] = useState<any[]>([]);
  const [token, setToken] = useState("");
  const [showScan, setShowScan] = useState(false);
  const [showPopup, setShowPopUp] = useState(false);
  const [newRepo, setNewRepo] = useState(false);
  const [errorMess, setErrorMess] = useState<any>(null);
  const [errType, setErrType] = useState<any>(null);
  const [width, setWidth] = useState(0);
  const [loadingData, setLoadingData] = useState({
    name: "",
    policy: "",
    region: "",
  });

  const [repoData, setRepoData] = useState<any>({
    pat: "",
    url: "",
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
        `https://cspm-api.midrapps.com/policy/policy_run_results/?tenant=${tenant_id}&scan_type=Repository&page=1&page_size=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resp.status === 200) {
        // console.log(resp.data.data.results[0]);
        setScanData(resp?.data?.data?.results[0] ?? {});
        setWidth(() => Math.floor(resp?.data?.data?.results[0]?.result_json?.Compliance ?? 0))
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getSelectedData = (pol_id: string, reg_id: string) => {
    const selectedPol = allPolicy.filter((pol) => pol.id === Number(pol_id))[0];

    let selectedReg: any = {};
    if (reg_id) {
      selectedReg = allRepos.filter((pol) => pol.id === Number(reg_id))[0];
    }

    setLoadingData({
      policy: selectedPol.name,
      name: selectedReg?.repo_name ?? repoData?.url,
      region: selectedReg?.repo_url ?? repoData?.url,
    });
  };

  useEffect(() => {
    setAllRepos(datastsr?.data?.data?.results || []);
    setAllDataRepos(datastsr?.data?.data?.results || []);
    setAllPolicy(policystsr?.data?.data?.results || []);
    setAllTenant(tenantstsr?.data?.data?.results || []);
    if (tenantstsr?.data?.data?.results && isAdmin) {
      fetchTenantLatestScan("1");
    } else {
      fetchTenantLatestScan(user?.tenant?.id);
    }
  }, [datastsr, policystsr, tenantstsr, user]);

  const { mutate, isLoading: scanLoading } = useRunRepoScan();
  const { mutate: oneTimeScan, isLoading: oneTimeLoading } =
    useRunRepoOnceScan();

  const selectedRepo = (id: number) => {
    const val = allRepos.find((repo) => repo.id === id)?.repo_name;
    return val;
  };

  const handleSearch = (val: string) => {
    if (val) {
      const filtered = allRepos.filter((repo) =>
        repo.repo_name.toLowerCase().includes(val.toLocaleLowerCase())
      );
      setAllRepos(filtered);
    } else {
      setAllRepos(allDataRepos);
    }
  };

  return (
    <div className="p-12">
      {loading ? (
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
                    if (!newRepo) {
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
                            navigate("/repository/scan-history");
                          },
                          onError: (err: any) => {
                            setShowScan(true);
                            setLoading(false);
                            setErrorMess(err.response.data);
                            setErrType("danger");
                          },
                        }
                      );
                    } else {
                      oneTimeScan(
                        {
                          data: {
                            access_token: repoData?.pat,
                            policy_id: +values?.policy_id,
                            repo_url: repoData?.url,
                          },
                        },
                        {
                          onSuccess: (res) => {
                            setShowScan(true);
                            setErrorMess(res);
                            setErrType("success");
                            setLoading(false);
                            setNewRepo(false);
                            navigate("/repository/scan-history");
                          },
                          onError: (err: any) => {
                            setNewRepo(false);
                            setShowScan(true);
                            setLoading(false);
                            setErrorMess(err.response.data);
                            setErrType("danger");
                          },
                        }
                      );
                    }
                  }}
                >
                  {(form) => (
                    <form onSubmit={form.handleSubmit}>
                      {/* repo */}
                      <div className="form-group mb-10 relative">
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
                        <Popover
                          onClickOutside={() => {
                            form.setFieldError(
                              "repo_id",
                              "repo id is required"
                            );
                            form.setFieldTouched(form.values.repo_id);
                            setShowPopUp(false);
                          }}
                          isOpen={showPopup}
                          positions={["bottom", "left"]} // preferred positions by priority
                          content={
                            <div className="w-[24rem] lg:w-[35rem]">
                              <div
                                key={20}
                                id="dropdown"
                                className={`z-10 ${
                                  mode === "dark" ? "bg-lightDark" : "bg-white"
                                } rounded-md shadow-sm p-5 w-full`}
                              >
                                <h1 className="font-semibold text-[12px] md:text-[18px] mb-3">
                                  Select a Repository
                                </h1>
                                <div className="group relative">
                                  <input
                                    type="text"
                                    onChange={(e) =>
                                      handleSearch(e.target.value)
                                    }
                                    className="form-control bg-transparent w-full h-35px"
                                  />
                                  <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute top-3 right-3"
                                  >
                                    <path
                                      d="M9.9165 9.91797L12.2498 12.2513"
                                      stroke={
                                        mode === "dark" ? "#FFFFFF" : "#373737"
                                      }
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M1.75 6.41667C1.75 8.994 3.83934 11.0833 6.41667 11.0833C7.70756 11.0833 8.87604 10.5592 9.72088 9.71211C10.5628 8.86795 11.0833 7.7031 11.0833 6.41667C11.0833 3.83934 8.994 1.75 6.41667 1.75C3.83934 1.75 1.75 3.83934 1.75 6.41667Z"
                                      stroke={
                                        mode === "dark" ? "#FFFFFF" : "#373737"
                                      }
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </div>
                                <ul
                                  key={28}
                                  className="py-2 text-[10px] mt-5 font-medium"
                                  aria-labelledby="dropdownDefaultButton"
                                >
                                  <li className="border-start-0">
                                    <button
                                      onClick={() => {
                                        form.setFieldTouched(
                                          form.values.repo_id,
                                          false,
                                          false
                                        );
                                        setNewRepo(true);
                                        setShowPopUp(false);
                                      }}
                                      className="flex items-center py-3 gap-4 justify-between font-medium"
                                    >
                                      <svg
                                        width="14"
                                        height="15"
                                        viewBox="0 0 14 15"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M7 0.75C7.41421 0.75 7.75 1.08579 7.75 1.5V6.75H13C13.4142 6.75 13.75 7.08579 13.75 7.5C13.75 7.91421 13.4142 8.25 13 8.25H7.75V13.5C7.75 13.9142 7.41421 14.25 7 14.25C6.58579 14.25 6.25 13.9142 6.25 13.5V8.25H1C0.585786 8.25 0.25 7.91421 0.25 7.5C0.25 7.08579 0.585786 6.75 1 6.75H6.25V1.5C6.25 1.08579 6.58579 0.75 7 0.75Z"
                                          fill={
                                            mode === "dark"
                                              ? "#EAEAEA"
                                              : "#373737"
                                          }
                                        />
                                      </svg>
                                      <p className="text-[12px] md:text-[18px] font-medium">
                                        Scan New Repository
                                      </p>
                                    </button>
                                  </li>
                                  {allRepos.length > 0 ? (
                                    allRepos.map((repo) => (
                                      <li className="border-start-0">
                                        <button
                                          onClick={() => {
                                            form.setFieldValue(
                                              "repo_id",
                                              repo?.id
                                            );
                                            setShowPopUp(false);
                                          }}
                                          className="flex items-center gap-4 py-3 justify-between font-medium"
                                        >
                                          {repo?.repo_type === "Github" ? (
                                            <svg
                                              width="24"
                                              height="25"
                                              viewBox="0 0 24 25"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M24 12.8003C24 15.4811 23.2368 17.8919 21.7104 20.0327C20.1852 22.1735 18.2136 23.6543 15.7968 24.4763C15.516 24.5303 15.3096 24.4931 15.18 24.3647C15.1161 24.3025 15.0657 24.2278 15.032 24.1451C14.9984 24.0625 14.9821 23.9739 14.9844 23.8847V20.5043C14.9844 19.4687 14.7132 18.7103 14.172 18.2303C14.7127 18.176 15.2483 18.0797 15.774 17.9423C16.2468 17.8139 16.7364 17.6063 17.2416 17.3183C17.7273 17.0465 18.1569 16.6849 18.5076 16.2527C18.846 15.8303 19.122 15.2699 19.3356 14.5703C19.5492 13.8707 19.656 13.0679 19.656 12.1607C19.656 10.8683 19.2444 9.7679 18.4224 8.8607C18.8064 7.8887 18.7656 6.8003 18.2964 5.5931C18.0048 5.4971 17.5836 5.5571 17.0316 5.7695C16.5309 5.95759 16.0495 6.19348 15.594 6.4739L15 6.8579C14.0244 6.57974 13.0145 6.43998 12 6.4427C10.9854 6.44037 9.97558 6.58054 9 6.8591C8.78297 6.70879 8.56168 6.56473 8.3364 6.4271C8.0604 6.2555 7.6248 6.0503 7.0308 5.8103C6.438 5.5703 5.9892 5.4983 5.6868 5.5943C5.2296 6.8003 5.1924 7.8887 5.5788 8.8607C4.7556 9.7679 4.3428 10.8683 4.3428 12.1607C4.3428 13.0679 4.4508 13.8683 4.6644 14.5631C4.878 15.2567 5.1516 15.8171 5.484 16.2443C5.82868 16.681 6.25602 17.0456 6.7416 17.3171C7.2468 17.6051 7.7376 17.8139 8.2104 17.9411C8.6844 18.0707 9.2184 18.1667 9.8124 18.2303C9.396 18.6143 9.1404 19.1651 9.0468 19.8803C8.82307 19.9887 8.58691 20.0693 8.3436 20.1203C8.05038 20.1778 7.75198 20.2048 7.4532 20.2007C7.1088 20.2007 6.7692 20.0855 6.4296 19.8563C6.0912 19.6259 5.802 19.2923 5.562 18.8555C5.37452 18.5252 5.11587 18.2407 4.8048 18.0227C4.4976 17.8091 4.2396 17.6807 4.0308 17.6387L3.7188 17.5907C3.5004 17.5907 3.3492 17.6147 3.2652 17.6627C3.1812 17.7107 3.1572 17.7707 3.1872 17.8463C3.22249 17.9277 3.26982 18.0034 3.3276 18.0707C3.38754 18.1427 3.45605 18.2072 3.5316 18.2627L3.6396 18.3419C3.87 18.4499 4.0956 18.6527 4.32 18.9515C4.5444 19.2503 4.7088 19.5227 4.812 19.7675L4.968 20.1359C5.1036 20.5415 5.3328 20.8703 5.6568 21.1211C5.9796 21.3731 6.3288 21.5327 6.7032 21.6011C7.0776 21.6707 7.44 21.7091 7.7892 21.7139C8.1372 21.7187 8.4276 21.7007 8.6568 21.6575L9.0156 21.5939C9.0156 21.9995 9.018 22.4747 9.024 23.0195L9.0312 23.8835C9.0312 24.0755 8.964 24.2363 8.8272 24.3635C8.6928 24.4931 8.484 24.5303 8.2032 24.4763C5.7864 23.6543 3.8148 22.1723 2.2896 20.0327C0.7632 17.8919 0 15.4811 0 12.8003C0 10.5683 0.5364 8.5115 1.6092 6.6263C2.64778 4.77728 4.1541 3.23372 5.9772 2.1503C7.7946 1.05627 9.87878 0.485292 12 0.500297C14.1216 0.48507 16.2063 1.05606 18.024 2.1503C19.8467 3.23388 21.3526 4.77743 22.3908 6.6263C23.4636 8.5103 24 10.5695 24 12.8003Z"
                                                fill="#373737"
                                              />
                                            </svg>
                                          ) : repo?.repo_type === "Git Lab" ? (
                                            <svg
                                              width="26"
                                              height="25"
                                              viewBox="0 0 26 25"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <g clip-path="url(#clip0_877_6577)">
                                                <path
                                                  d="M13.0077 24.5083L17.7917 9.76562H8.22363L13.0077 24.5083Z"
                                                  fill="#E24329"
                                                />
                                                <path
                                                  d="M13.0072 24.5083L8.2231 9.76562H1.51855L13.0072 24.5083Z"
                                                  fill="#FC6D26"
                                                />
                                                <path
                                                  d="M1.51885 9.76562L0.0650873 14.2459C0.000448361 14.4451 0.000439445 14.6596 0.0650618 14.8588C0.129684 15.058 0.25562 15.2316 0.424822 15.3547L13.0075 24.5084L1.51885 9.76562Z"
                                                  fill="#FCA326"
                                                />
                                                <path
                                                  d="M1.51855 9.76511H8.2231L5.34187 0.885617C5.19359 0.428702 4.54806 0.428803 4.39988 0.885617L1.51855 9.76511Z"
                                                  fill="#E24329"
                                                />
                                                <path
                                                  d="M13.0078 24.5083L17.7918 9.76562H24.4965L13.0078 24.5083Z"
                                                  fill="#FC6D26"
                                                />
                                                <path
                                                  d="M24.4965 9.76562L25.9502 14.2459C26.0149 14.4451 26.0148 14.6596 25.9502 14.8588C25.8856 15.058 25.7596 15.2316 25.5904 15.3547L13.0078 24.5084L24.4965 9.76562Z"
                                                  fill="#FCA326"
                                                />
                                                <path
                                                  d="M24.4966 9.76511H17.792L20.6733 0.885617C20.8216 0.428702 21.4671 0.428803 21.6153 0.885617L24.4966 9.76511Z"
                                                  fill="#E24329"
                                                />
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_877_6577">
                                                  <rect
                                                    width="26"
                                                    height="24"
                                                    fill="white"
                                                    transform="translate(0 0.5)"
                                                  />
                                                </clipPath>
                                              </defs>
                                            </svg>
                                          ) : repo?.repo_type ===
                                            "Bit Bucket" ? (
                                            <svg
                                              width="21"
                                              height="17"
                                              viewBox="0 0 41 37"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M1.34943 0.195432C1.15936 0.192882 0.970955 0.23125 0.797013 0.307932C0.623575 0.384807 0.468888 0.497776 0.344669 0.639572C0.22071 0.780534 0.129467 0.947171 0.0774816 1.12754C0.0257077 1.30722 0.0146582 1.49618 0.0451378 1.68067L5.58201 34.6708C5.65196 35.0763 5.8639 35.4437 6.1799 35.7072C6.49908 35.9736 6.90088 36.1209 7.31662 36.1239H33.8788C34.1905 36.1281 34.4936 36.0218 34.7345 35.8239C34.9729 35.6282 35.1323 35.3526 35.1831 35.0484L40.72 1.68699C40.7505 1.50251 40.7394 1.31354 40.6876 1.13387C40.6356 0.95355 40.5443 0.786988 40.4202 0.646135C40.2954 0.50416 40.1411 0.391073 39.9681 0.314729C39.7941 0.237941 39.6056 0.199492 39.4155 0.201994L1.34943 0.195432ZM24.6639 24.0386H16.1858L13.8904 12.2674H26.7182L24.6639 24.0386Z"
                                                fill="#2684FF"
                                              />
                                            </svg>
                                          ) : (
                                            <svg
                                              width="24"
                                              height="19"
                                              viewBox="0 0 24 19"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <g clip-path="url(#clip0_877_6614)">
                                                <path
                                                  d="M23.5046 7.35917C22.9641 6.96998 21.7256 6.82403 20.7573 7.01863C20.6448 6.04565 20.1269 5.1944 19.2261 4.44035L18.7083 4.05116L18.3479 4.61062C17.8976 5.34035 17.6724 6.36197 17.7399 7.33494C17.7624 7.67538 17.875 8.28349 18.2128 8.81863C17.8976 9.01322 17.2445 9.25646 16.3889 9.25646H0.108256L0.0632558 9.45106C-0.0944317 10.4239 -0.0944318 13.4644 1.75207 15.7994C3.14819 17.575 5.21988 18.475 7.94454 18.475C13.8442 18.475 18.2128 15.5318 20.262 10.205C21.0726 10.2293 22.8065 10.205 23.6848 8.38069C23.7073 8.33204 23.7523 8.23475 23.9099 7.86998L24 7.67538L23.5046 7.35917ZM13.1237 0.5H10.6468V2.93234H13.1237V0.5ZM13.1237 3.41882H10.6468V5.85116H13.1237V3.41882ZM10.1963 3.41882H7.71944V5.85116H10.1963V3.41882ZM7.26897 3.41882H4.79201V5.85116H7.26897V3.41882ZM4.34163 6.33764H1.86466V8.76998H4.34154L4.34163 6.33764ZM7.26897 6.33764H4.79201V8.76998H7.26897V6.33764ZM10.1963 6.33764H7.71944V8.76998H10.1963V6.33764ZM13.1238 6.33764H10.6467V8.76998H13.1238V6.33764ZM16.0511 6.33764H13.574V8.76998H16.0511V6.33764Z"
                                                  fill="#2396ED"
                                                />
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_877_6614">
                                                  <rect
                                                    width="24"
                                                    height="18"
                                                    fill="white"
                                                    transform="translate(0 0.5)"
                                                  />
                                                </clipPath>
                                              </defs>
                                            </svg>
                                          )}

                                          <p className="text-[12px] md:text-[18px] font-medium">
                                            {repo?.repo_name}
                                          </p>
                                        </button>
                                      </li>
                                    ))
                                  ) : (
                                    <p className="font-semibold text-[12px] md:text-[18px]">
                                      No repo found
                                    </p>
                                  )}
                                </ul>
                              </div>
                            </div>
                          }
                        >
                          <button
                            type="button"
                            onClick={() => setShowPopUp(!showPopup)}
                            {...form.getFieldProps("repo_id")}
                            className={clsx(
                              `border w-full rounded-md text-start pl-2 font-medium h-45px mt-2 ${
                                form.values.repo_id
                                  ? "text-[#373737]"
                                  : "text-[#C7C7CC]"
                              }`,
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
                            {selectedRepo(+form.values.repo_id) ??
                              "Select a Repository to scan"}
                          </button>
                        </Popover>
                      </div>
                      {/* policy */}
                      <div className="form-group mb-10">
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

                      {newRepo && (
                        <>
                          {/* url */}
                          <div className="form-group mb-10">
                            <label
                              htmlFor="url"
                              className="flex items-center gap-1"
                            >
                              <FaGlobe
                                size={12}
                                color={mode === "dark" ? "#EAEAEA" : "#000000"}
                              />
                              <p className="font-semibold text-[14px]">
                                Repo Url
                              </p>
                            </label>
                            <input
                              autoComplete="off"
                              className="form-control bg-transparent"
                              type="text"
                              id="url"
                              name="url"
                              value={repoData.url}
                              onChange={(e) => {
                                form.setFieldValue("repo_id", e.target.value);
                                setRepoData({
                                  ...repoData,
                                  url: e.target.value,
                                });
                              }}
                            />
                          </div>
                          {/* PAT */}
                          <div className="form-group mb-10">
                            <label
                              htmlFor="pat"
                              className="flex items-center gap-1"
                            >
                              <FaKey
                                size={12}
                                color={mode === "dark" ? "#EAEAEA" : "#000000"}
                              />
                              <p className="font-semibold text-[14px]">
                                Personal Access Token(PAT)
                              </p>
                            </label>
                            <input
                              autoComplete="off"
                              className="form-control bg-transparent"
                              type="text"
                              id="pat"
                              name="pat"
                              value={repoData.pat}
                              onChange={(e) =>
                                setRepoData({
                                  ...repoData,
                                  pat: e.target.value,
                                })
                              }
                            />
                          </div>
                        </>
                      )}
                      <button
                        type="submit"
                        className=" font-medium rounded-full p-3 bg-primary text-white w-full flex items-center justify-center"
                        disabled={
                          loading ||
                          oneTimeLoading ||
                          !form.isValid ||
                          !form.values.repo_id ||
                          !form.values.policy_id ||
                          (newRepo && (!repoData?.url || !repoData?.pat))
                        }
                      >
                        {!loading && (
                          <span className="indicatorLabel flex items-center">
                            {newRepo ? "Initiate Scan" : "Scan Repo"}
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
              {!scanData ? (
                <div
                  className={`rounded-md flex items-center gap-8 justify-center flex-col mb-10 border shadow-md p-12 ${
                    mode === "dark" ? "bg-lightDark" : "bg-white"
                  }`}
                >
                  <h3 className="text-center font-medium text-[18px]">
                    Scan History:No Records Found
                  </h3>
                  <img src={emptyImg} alt="empty data image file" />
                </div>
              ) : (
                <>
                  <div
                    className={`rounded-xl font-medium flex items-center justify-between mb-10 border shadow-md p-6 ${
                      mode === "dark" ? "bg-lightDark" : "bg-white"
                    }`}
                  >
                    <div className="">
                      <div className="flex items-center gap-2 mb-4">
                        {scanData?.repo?.repo_type === "Github" ? (
                          <svg
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M24 12.8003C24 15.4811 23.2368 17.8919 21.7104 20.0327C20.1852 22.1735 18.2136 23.6543 15.7968 24.4763C15.516 24.5303 15.3096 24.4931 15.18 24.3647C15.1161 24.3025 15.0657 24.2278 15.032 24.1451C14.9984 24.0625 14.9821 23.9739 14.9844 23.8847V20.5043C14.9844 19.4687 14.7132 18.7103 14.172 18.2303C14.7127 18.176 15.2483 18.0797 15.774 17.9423C16.2468 17.8139 16.7364 17.6063 17.2416 17.3183C17.7273 17.0465 18.1569 16.6849 18.5076 16.2527C18.846 15.8303 19.122 15.2699 19.3356 14.5703C19.5492 13.8707 19.656 13.0679 19.656 12.1607C19.656 10.8683 19.2444 9.7679 18.4224 8.8607C18.8064 7.8887 18.7656 6.8003 18.2964 5.5931C18.0048 5.4971 17.5836 5.5571 17.0316 5.7695C16.5309 5.95759 16.0495 6.19348 15.594 6.4739L15 6.8579C14.0244 6.57974 13.0145 6.43998 12 6.4427C10.9854 6.44037 9.97558 6.58054 9 6.8591C8.78297 6.70879 8.56168 6.56473 8.3364 6.4271C8.0604 6.2555 7.6248 6.0503 7.0308 5.8103C6.438 5.5703 5.9892 5.4983 5.6868 5.5943C5.2296 6.8003 5.1924 7.8887 5.5788 8.8607C4.7556 9.7679 4.3428 10.8683 4.3428 12.1607C4.3428 13.0679 4.4508 13.8683 4.6644 14.5631C4.878 15.2567 5.1516 15.8171 5.484 16.2443C5.82868 16.681 6.25602 17.0456 6.7416 17.3171C7.2468 17.6051 7.7376 17.8139 8.2104 17.9411C8.6844 18.0707 9.2184 18.1667 9.8124 18.2303C9.396 18.6143 9.1404 19.1651 9.0468 19.8803C8.82307 19.9887 8.58691 20.0693 8.3436 20.1203C8.05038 20.1778 7.75198 20.2048 7.4532 20.2007C7.1088 20.2007 6.7692 20.0855 6.4296 19.8563C6.0912 19.6259 5.802 19.2923 5.562 18.8555C5.37452 18.5252 5.11587 18.2407 4.8048 18.0227C4.4976 17.8091 4.2396 17.6807 4.0308 17.6387L3.7188 17.5907C3.5004 17.5907 3.3492 17.6147 3.2652 17.6627C3.1812 17.7107 3.1572 17.7707 3.1872 17.8463C3.22249 17.9277 3.26982 18.0034 3.3276 18.0707C3.38754 18.1427 3.45605 18.2072 3.5316 18.2627L3.6396 18.3419C3.87 18.4499 4.0956 18.6527 4.32 18.9515C4.5444 19.2503 4.7088 19.5227 4.812 19.7675L4.968 20.1359C5.1036 20.5415 5.3328 20.8703 5.6568 21.1211C5.9796 21.3731 6.3288 21.5327 6.7032 21.6011C7.0776 21.6707 7.44 21.7091 7.7892 21.7139C8.1372 21.7187 8.4276 21.7007 8.6568 21.6575L9.0156 21.5939C9.0156 21.9995 9.018 22.4747 9.024 23.0195L9.0312 23.8835C9.0312 24.0755 8.964 24.2363 8.8272 24.3635C8.6928 24.4931 8.484 24.5303 8.2032 24.4763C5.7864 23.6543 3.8148 22.1723 2.2896 20.0327C0.7632 17.8919 0 15.4811 0 12.8003C0 10.5683 0.5364 8.5115 1.6092 6.6263C2.64778 4.77728 4.1541 3.23372 5.9772 2.1503C7.7946 1.05627 9.87878 0.485292 12 0.500297C14.1216 0.48507 16.2063 1.05606 18.024 2.1503C19.8467 3.23388 21.3526 4.77743 22.3908 6.6263C23.4636 8.5103 24 10.5695 24 12.8003Z"
                              fill="#373737"
                            />
                          </svg>
                        ) : scanData?.repo?.repo_type === "Git Lab" ? (
                          <svg
                            width="26"
                            height="25"
                            viewBox="0 0 26 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_877_6577)">
                              <path
                                d="M13.0077 24.5083L17.7917 9.76562H8.22363L13.0077 24.5083Z"
                                fill="#E24329"
                              />
                              <path
                                d="M13.0072 24.5083L8.2231 9.76562H1.51855L13.0072 24.5083Z"
                                fill="#FC6D26"
                              />
                              <path
                                d="M1.51885 9.76562L0.0650873 14.2459C0.000448361 14.4451 0.000439445 14.6596 0.0650618 14.8588C0.129684 15.058 0.25562 15.2316 0.424822 15.3547L13.0075 24.5084L1.51885 9.76562Z"
                                fill="#FCA326"
                              />
                              <path
                                d="M1.51855 9.76511H8.2231L5.34187 0.885617C5.19359 0.428702 4.54806 0.428803 4.39988 0.885617L1.51855 9.76511Z"
                                fill="#E24329"
                              />
                              <path
                                d="M13.0078 24.5083L17.7918 9.76562H24.4965L13.0078 24.5083Z"
                                fill="#FC6D26"
                              />
                              <path
                                d="M24.4965 9.76562L25.9502 14.2459C26.0149 14.4451 26.0148 14.6596 25.9502 14.8588C25.8856 15.058 25.7596 15.2316 25.5904 15.3547L13.0078 24.5084L24.4965 9.76562Z"
                                fill="#FCA326"
                              />
                              <path
                                d="M24.4966 9.76511H17.792L20.6733 0.885617C20.8216 0.428702 21.4671 0.428803 21.6153 0.885617L24.4966 9.76511Z"
                                fill="#E24329"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_877_6577">
                                <rect
                                  width="26"
                                  height="24"
                                  fill="white"
                                  transform="translate(0 0.5)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        ) : scanData?.repo?.repo_type === "Bit Bucket" ? (
                          <svg
                            width="21"
                            height="17"
                            viewBox="0 0 41 37"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1.34943 0.195432C1.15936 0.192882 0.970955 0.23125 0.797013 0.307932C0.623575 0.384807 0.468888 0.497776 0.344669 0.639572C0.22071 0.780534 0.129467 0.947171 0.0774816 1.12754C0.0257077 1.30722 0.0146582 1.49618 0.0451378 1.68067L5.58201 34.6708C5.65196 35.0763 5.8639 35.4437 6.1799 35.7072C6.49908 35.9736 6.90088 36.1209 7.31662 36.1239H33.8788C34.1905 36.1281 34.4936 36.0218 34.7345 35.8239C34.9729 35.6282 35.1323 35.3526 35.1831 35.0484L40.72 1.68699C40.7505 1.50251 40.7394 1.31354 40.6876 1.13387C40.6356 0.95355 40.5443 0.786988 40.4202 0.646135C40.2954 0.50416 40.1411 0.391073 39.9681 0.314729C39.7941 0.237941 39.6056 0.199492 39.4155 0.201994L1.34943 0.195432ZM24.6639 24.0386H16.1858L13.8904 12.2674H26.7182L24.6639 24.0386Z"
                              fill="#2684FF"
                            />
                          </svg>
                        ) : (
                          <svg
                            width="24"
                            height="19"
                            viewBox="0 0 24 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_877_6614)">
                              <path
                                d="M23.5046 7.35917C22.9641 6.96998 21.7256 6.82403 20.7573 7.01863C20.6448 6.04565 20.1269 5.1944 19.2261 4.44035L18.7083 4.05116L18.3479 4.61062C17.8976 5.34035 17.6724 6.36197 17.7399 7.33494C17.7624 7.67538 17.875 8.28349 18.2128 8.81863C17.8976 9.01322 17.2445 9.25646 16.3889 9.25646H0.108256L0.0632558 9.45106C-0.0944317 10.4239 -0.0944318 13.4644 1.75207 15.7994C3.14819 17.575 5.21988 18.475 7.94454 18.475C13.8442 18.475 18.2128 15.5318 20.262 10.205C21.0726 10.2293 22.8065 10.205 23.6848 8.38069C23.7073 8.33204 23.7523 8.23475 23.9099 7.86998L24 7.67538L23.5046 7.35917ZM13.1237 0.5H10.6468V2.93234H13.1237V0.5ZM13.1237 3.41882H10.6468V5.85116H13.1237V3.41882ZM10.1963 3.41882H7.71944V5.85116H10.1963V3.41882ZM7.26897 3.41882H4.79201V5.85116H7.26897V3.41882ZM4.34163 6.33764H1.86466V8.76998H4.34154L4.34163 6.33764ZM7.26897 6.33764H4.79201V8.76998H7.26897V6.33764ZM10.1963 6.33764H7.71944V8.76998H10.1963V6.33764ZM13.1238 6.33764H10.6467V8.76998H13.1238V6.33764ZM16.0511 6.33764H13.574V8.76998H16.0511V6.33764Z"
                                fill="#2396ED"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_877_6614">
                                <rect
                                  width="24"
                                  height="18"
                                  fill="white"
                                  transform="translate(0 0.5)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        )}
                        <p className="font-medium text-[12px] md:text-[14px]">
                          {scanData?.repo?.repo_name ?? "scrapenext.git"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaLink
                          size={14}
                          color={mode === "dark" ? "#EAEAEA" : "#373737"}
                        />
                        <a
                          href={scanData?.repo?.repo_url ?? "/"}
                          target="_blank"
                          className="font-medium text-[10px] hover:text-primary"
                        >
                          {scanData?.repo?.repo_url ?? "https://github.com"}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`rounded-xl flex items-center gap-8 justify-center flex-col mb-10 border shadow-md py-6 ${
                      mode === "dark" ? "bg-lightDark" : "bg-white"
                    }`}
                  >
                    <div className="w-full px-10 pb-2 border-bottom flex items-center justify-between">
                      <h3 className="font-semibold text-center text-[14px]">
                        Latest Scan Report
                      </h3>
                      <h3 className="flex items-center gap-3 font-medium text-[12px]">
                        <span>{`${new Date(scanData?.created_on).getDate()}/${
                          new Date(scanData?.created_on).getMonth() + 1
                        }/${new Date(
                          scanData?.created_on
                        ).getFullYear()}`}</span>
                        <span>{`${
                          new Date(scanData?.created_on).getHours() > 12
                            ? new Date(scanData?.created_on).getHours() - 12
                            : new Date(scanData?.created_on).getHours()
                        }:${
                          new Date(scanData?.created_on).getSeconds() < 10
                            ? `0${new Date(scanData?.created_on).getSeconds()}`
                            : new Date(scanData?.created_on).getSeconds()
                        } ${
                          new Date(scanData?.created_on).getHours() < 12
                            ? "AM"
                            : "PM"
                        }`}</span>
                      </h3>
                    </div>
                    <div className="w-full px-10">
                      <h3 className="font-medium text-[14px] mb-3 text-left">
                        <span className="font-bold">
                          {scanData?.result_json?.Total_checks ?? 0} 
                        </span>
                        checks performed
                      </h3>
                      <div className="grid grid-cols-3 gap-3 mt-8">
                        <div className="flex items-center justify-center flex-col border-end">
                          <h1 className="font-semibold text-[14px]">
                            {Math.floor(scanData?.result_json?.Compliance ?? 0)}%
                          </h1>
                          <p className="font-medium text-[10px] mb-2">
                            compliant
                          </p>
                          <div
                            className={`rounded-md h-[8px] w-[100px] bg-gradient-to-r from-[#00B712] ${
                              width > 0 ? `from-[${width}%]` : "from-[0%]"
                            } to-[#DADADA] via-[#DADADA] via-[10%] t0-[20%]`}
                          ></div>
                        </div>
                        <div className="border-end">
                          <h3 className="font-medium text-[12px] mb-3 text-left">
                            Failed checks
                          </h3>
                          <h3 className="font-bold text-[14px] text-[#FF161A]">
                            {scanData?.result_json?.Failed ?? 0}
                          </h3>
                        </div>
                        <div className="">
                          <h3 className="font-medium text-[12px] mb-3 text-left">
                            Successful
                          </h3>
                          <h3 className="font-bold text-[14px] text-[#00B712]">
                            {scanData?.result_json?.Passed ?? 0}
                          </h3>
                        </div>
                      </div>
                      <div className="mt-12">
                        <div className="flex items-center gap-4 my-4">
                          <svg
                            width="24px"
                            height="24px"
                            stroke-width="1.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            color={mode === "dark" ? "#EAEAEA" : "#000000"}
                          >
                            <path
                              d="M3 5H21"
                              stroke={mode === "dark" ? "#EAEAEA" : "#000000"}
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M3 12H21"
                              stroke={mode === "dark" ? "#EAEAEA" : "#000000"}
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M3 19H21"
                              stroke={mode === "dark" ? "#EAEAEA" : "#000000"}
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                          <p className="text-[12px] font-medium">
                            {scanData?.policy_run?.policy?.name ?? ""}
                          </p>
                        </div>
                        <div className="flex items-center gap-4 my-4">
                          <FaGlobe
                            color={mode === "dark" ? "#EAEAEA" : "#000000"}
                            size={24}
                          />
                          <p className="text-[12px] font-medium">
                            {scanData?.region}
                          </p>
                        </div>
                      </div>
                      <Link
                        to={`/repository/scan-history/${scanData?.policy_run?.id}`}
                        className="block w-fit mt-6 font-medium text-[12px]"
                      >
                        <p className="underline">view report</p>
                      </Link>
                    </div>
                  </div>
                </>
              )}
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
