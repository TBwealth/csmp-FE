import React, { useEffect, useState } from "react";
import scanimg from "../../../../../public/media/logos/scan-search.svg";
import { useGetCloudProviderResourceTypes } from "../../../api/api-services/cloudProviderQuery";
import modeAtomsAtom from "../../../atoms/modeAtoms.atom";
import { useRecoilValue } from "recoil";
import clsx from "clsx";
import * as Yup from "yup";
import { useFormik, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { FaGlobe } from "react-icons/fa";
import { useGetRegions } from "../../../api/api-services/systemQuery";
import {
  useGetPolicies,
  useScanPolicy,
  useGetAllScanResults,
} from "../../../api/api-services/policyQuery";
import {
  CloudProviderCloudProviderResourceTypesList200Response,
  SystemSettingsRegionsList200Response,
  PolicyPolicyListCreateList200Response,
} from "../../../api/axios-client";
import { Link } from "react-router-dom";
import ScanPolicyModal from "./modals/ScanModal";
import DefaultContent from "../../../components/defaultContent/defaultContent";
import ScanLoading from "./ScanLoading";

const scanSchema = Yup.object().shape({
  provider: Yup.string().required("provider is required"),
  policy_id: Yup.string().required("policy id is required"),
  region: Yup.string().required("region is  required"),
  frequency: Yup.string().required("scan frequency is  required"),
});

const ResourceScan = () => {
  const { mode } = useRecoilValue(modeAtomsAtom);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [allProviders, setAllProviders] = useState<any[]>([]);
  const [allRegions, setAllRegions] = useState<any[]>([]);
  const [allPolicy, setAllPolicy] = useState<any[]>([]);
  const [allScan, setAllScan] = useState<any[]>([]);
  const [showScan, setShowScan] = useState(false);
  const [errorMess, setErrorMess] = useState<any>(null);
  const [errType, setErrType] = useState<any>(null);
  const { data } = useGetCloudProviderResourceTypes(1);
  const [loadingData, setLoadingData] = useState({
    name: "",
    policy: "",
    region: "",
  });
  const datastsr: CloudProviderCloudProviderResourceTypesList200Response | any =
    data;
  const { data: region } = useGetRegions(1);
  const regionstsr: SystemSettingsRegionsList200Response | any = region;
  const { data: policies } = useGetPolicies(1);
  const policystsr: PolicyPolicyListCreateList200Response | any = policies;
  const { data: scan } = useGetAllScanResults();
  const scanstsr: PolicyPolicyListCreateList200Response | any = scan;

  const { mutate, isLoading: scanLoading } = useScanPolicy();

  useEffect(() => {
    setAllProviders(datastsr?.data?.data?.results || []);
    setAllRegions(regionstsr?.data?.data?.results || []);
    setAllPolicy(policystsr?.data?.data?.results || []);
    setAllScan(scanstsr?.data?.data?.results || []);
  }, [datastsr, regionstsr, policystsr, scanstsr]);

  const getSelectedData = (pol_id: string, reg_id: string, pro_id: string) => {
    const selectedPol = allPolicy.filter((pol) => pol.id === Number(pol_id))[0];
    const selectedReg = allRegions.filter(
      (pol) => pol.id === Number(reg_id)
    )[0];
    const selectedPro = allProviders.filter(
      (pol) => pol.id === Number(pro_id)
    )[0];
    setLoadingData({
      policy: selectedPol.name,
      name: selectedPro.name,
      region: selectedReg.name,
    });
  };

  return (
    <div className="p-4 md:p-12 lg:p-36">
      {scanLoading ? (
        <ScanLoading
          name={loadingData.name}
          policy={loadingData.policy}
          region={loadingData.region}
        />
      ) : (
        <div className="flex items-start justify-between flex-col md:flex-row gap-10">
          <div
            className={`rounded-md border shadow-md p-4 md:p-8 w-full md:w-[50%] ${
              mode === "dark" ? "bg-lightDark" : "bg-white"
            }`}
          >
            <div className="flex items-center gap-6">
              <img src={scanimg} alt="cloud with search icon" />
              <h2 className="font-bold text-lg md:text-xl">
                Initiate New Resource Scan
              </h2>
            </div>
            <div className="mt-10">
              <Formik
                initialValues={{
                  provider: "",
                  policy_id: "",
                  region: "",
                  frequency: "",
                }}
                validationSchema={scanSchema}
                onSubmit={async (values) => {
                  getSelectedData(
                    values.policy_id,
                    values.region,
                    values.provider
                  );
                  setLoading(true);
                  mutate(
                    {
                      data: {
                        policy_id: +values.policy_id,
                        regions: [values.region],
                        services: [values.provider],
                      },
                    },
                    {
                      onSuccess: (res) => {
                        console.log(res);
                        setShowScan(true);
                        setErrorMess(res.data);
                        setErrType("success");
                        setLoading(false);
                        // navigate("/policy-scan-result");
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
                    <div className="form-group mb-10">
                      <label
                        htmlFor="provider"
                        className="flex items-center gap-4"
                      >
                        <span>
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
                        <p>Select your Cloud Provider</p>
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
                        <option>Select Provider</option>
                        {allProviders.map((provider) => (
                          <option key={provider.name} value={provider.id}>
                            {provider.name}
                          </option>
                        ))}
                      </select>
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
                        </span>
                        <p>Compliant Policy </p>
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
                              form.touched.policy_id && !form.errors.policy_id,
                          }
                        )}
                      >
                        <option>Select Policy</option>
                        {allPolicy.map((policy) => (
                          <option key={policy.name} value={policy.id}>
                            {policy.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* Region */}
                    <div className="form-group mb-10">
                      <label
                        htmlFor="region"
                        className="flex items-center gap-4"
                      >
                        <FaGlobe
                          color={mode === "dark" ? "#EAEAEA" : "#000000"}
                          size={16}
                        />
                        <p>Select a Region</p>
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
                        <option>Select Region</option>
                        {allRegions.map((region) => (
                          <option key={region.name} value={region.id}>
                            {region.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* frequency */}
                    <div className="form-group mb-10">
                      <label
                        htmlFor="frequency"
                        className="flex items-center gap-4"
                      >
                        <FaGlobe
                          color={mode === "dark" ? "#EAEAEA" : "#000000"}
                          size={16}
                        />
                        <p>Scan Frequency </p>
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
                              form.touched.frequency && !form.errors.frequency,
                          }
                        )}
                      >
                        <option>Select Frequency</option>
                        {[
                          "once",
                          "weekly",
                          "monthly",
                          "yearly",
                          "bi-annually",
                        ].map((region) => (
                          <option key={region} value={region}>
                            {region}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/*  */}
                    <div>
                      <div className="form-group">
                        <input
                          className="form-check-input p-2 w-15px h-15px mx-1 mt-1"
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                          checked
                        />
                        <label className="form-label fs-6 fw-bold">
                          Initiate runtime action for all servers
                        </label>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary w-full flex items-center justify-center"
                      disabled={
                        loading ||
                        !form.isValid ||
                        !form.values.frequency ||
                        !form.values.policy_id ||
                        !form.values.provider ||
                        !form.values.region
                      }
                    >
                      {!loading && (
                        <span className="indicator-label flex items-center">
                          Scan Cloud
                          <svg
                            width="20px"
                            height="20px"
                            stroke-width="1.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            color="#FFFFFF"
                          >
                            <path
                              d="M13.5 13L15 14.5"
                              stroke="#FFFFFF"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M9 11C9 12.3807 10.1193 13.5 11.5 13.5C12.1916 13.5 12.8175 13.2192 13.2701 12.7654C13.7211 12.3132 14 11.6892 14 11C14 9.61929 12.8807 8.5 11.5 8.5C10.1193 8.5 9 9.61929 9 11Z"
                              stroke="#FFFFFF"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M5 18L3.13036 4.91253C3.05646 4.39524 3.39389 3.91247 3.90398 3.79912L11.5661 2.09641C11.8519 2.03291 12.1481 2.03291 12.4339 2.09641L20.096 3.79912C20.6061 3.91247 20.9435 4.39524 20.8696 4.91252L19 18C18.9293 18.495 18.5 21.5 12 21.5C5.5 21.5 5.07071 18.495 5 18Z"
                              stroke="#FFFFFF"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </span>
                      )}
                      {loading && (
                        <span
                          className="indicator-progress"
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
            <div
              className={`rounded-md flex items-center justify-between mb-10 border shadow-md p-4 md:p-8 ${
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
                    fill-opacity="0.1"
                  />
                  <path
                    d="M17.25 15L17.25 15.75"
                    stroke="#4470EF"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M17.25 18.75L17.25 19.5"
                    stroke="#4470EF"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M24.75 27V15M24.75 15L27 17.25M24.75 15L22.5 17.25"
                    stroke="#4470EF"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M17.25 22.5V27M17.25 27L19.5 24.75M17.25 27L15 24.75"
                    stroke="#4470EF"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div className="flex items-center gap-4">
                  <h1 className="font-bold text-2xl md:text-4xl">0</h1>
                  <h1 className="font-mediun texl-lg md:text-xl">
                    Reoccurring Scans
                  </h1>
                </div>
              </div>
              <Link to="">
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
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.75 9.75V13.75C15.75 14.8546 14.8546 15.75 13.75 15.75H4.25C3.14543 15.75 2.25 14.8546 2.25 13.75V4.25C2.25 3.14543 3.14543 2.25 4.25 2.25H8.25"
                    stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </Link>
            </div>
            <div
              className={`rounded-md flex items-center gap-8 justify-center flex-col mb-10 border shadow-md p-12 ${
                mode === "dark" ? "bg-lightDark" : "bg-white"
              }`}
            >
              <h3 className="text-center font-medium text-xl">
                Scan History:{" "}
                {allScan.length > 0 ? allScan.length : "No Records Found"}
              </h3>
              <svg
                width="221"
                height="221"
                viewBox="0 0 221 221"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M221 169.02H0V169.13H221V169.02Z" fill="#EBEBEB" />
                <path
                  d="M198.857 176.133H184.217V176.243H198.857V176.133Z"
                  fill="#EBEBEB"
                />
                <path
                  d="M146.399 177.334H142.557V177.444H146.399V177.334Z"
                  fill="#EBEBEB"
                />
                <path
                  d="M183.774 172.029H175.291V172.14H183.774V172.029Z"
                  fill="#EBEBEB"
                />
                <path
                  d="M42.2778 172.773H23.1865V172.884H42.2778V172.773Z"
                  fill="#EBEBEB"
                />
                <path
                  d="M49.0131 172.773H46.2139V172.884H49.0131V172.773Z"
                  fill="#EBEBEB"
                />
                <path
                  d="M99.5151 174.639H58.1104V174.749H99.5151V174.639Z"
                  fill="#EBEBEB"
                />
                <path
                  d="M37.8495 45.4583C37.8982 39.6672 42.6059 34.9874 48.4085 34.9874C49.8065 34.9874 51.14 35.2614 52.3613 35.7551C54.4352 31.5128 58.7915 28.5898 63.8321 28.5898C69.9277 28.5898 75.0213 32.8644 76.2881 38.5786C82.0208 38.9472 86.5571 43.7111 86.5571 49.5367C86.5571 55.6031 81.6394 60.5204 75.5734 60.5204H40.6222C36.322 60.5204 32.8359 57.0343 32.8359 52.7341C32.8359 49.4111 34.9186 46.5762 37.8495 45.4583Z"
                  fill="#E0E0E0"
                />
                <path
                  d="M161.81 131.61C161.84 128.037 164.745 125.149 168.325 125.149C169.188 125.149 170.011 125.318 170.764 125.623C172.044 123.005 174.732 121.201 177.842 121.201C181.603 121.201 184.747 123.839 185.528 127.365C189.065 127.592 191.864 130.532 191.864 134.127C191.864 137.87 188.83 140.904 185.086 140.904H163.52C160.867 140.904 158.716 138.753 158.716 136.099C158.717 134.049 160.002 132.299 161.81 131.61Z"
                  fill="#E0E0E0"
                />
                <path
                  d="M45.1508 112.367C45.2016 106.296 50.1366 101.39 56.2189 101.39C57.6846 101.39 59.0826 101.677 60.3627 102.195C62.5364 97.7475 67.1032 94.6836 72.3868 94.6836C78.7764 94.6836 84.1162 99.1646 85.444 105.155C91.4534 105.541 96.2084 110.535 96.2084 116.642C96.2084 123.001 91.0534 128.156 84.6943 128.156H48.0565C43.549 128.156 39.8945 124.502 39.8945 119.994C39.895 116.51 42.0785 113.538 45.1508 112.367Z"
                  fill="#F0F0F0"
                />
                <path
                  d="M52.7722 122.874C52.7722 123.796 52.0243 124.545 51.1014 124.545C50.1785 124.545 49.4307 123.797 49.4307 122.874C49.4307 121.951 50.1785 121.203 51.1014 121.203C52.0243 121.203 52.7722 121.951 52.7722 122.874Z"
                  fill="#E6E6E6"
                />
                <path
                  d="M59.07 122.874C59.07 123.796 58.3222 124.545 57.3993 124.545C56.4764 124.545 55.7285 123.797 55.7285 122.874C55.7285 121.951 56.4764 121.203 57.3993 121.203C58.3222 121.203 59.07 121.951 59.07 122.874Z"
                  fill="white"
                />
                <path
                  d="M159.43 58.8993C159.465 54.695 162.883 51.2969 167.096 51.2969C168.111 51.2969 169.079 51.4962 169.966 51.8542C171.471 48.7739 174.634 46.6523 178.294 46.6523C182.719 46.6523 186.418 49.7556 187.337 53.9042C191.499 54.1721 194.792 57.6307 194.792 61.8602C194.792 66.2643 191.222 69.8348 186.818 69.8348H161.443C158.321 69.8348 155.79 67.3039 155.79 64.1821C155.79 61.7692 157.302 59.7108 159.43 58.8993Z"
                  fill="#F5F5F5"
                />
                <path
                  d="M182.582 65.8658C182.582 66.4625 182.098 66.9465 181.502 66.9465C180.905 66.9465 180.421 66.4625 180.421 65.8658C180.421 65.2691 180.905 64.7852 181.502 64.7852C182.098 64.7852 182.582 65.2691 182.582 65.8658Z"
                  fill="white"
                />
                <path
                  d="M186.656 65.8658C186.656 66.4625 186.173 66.9465 185.576 66.9465C184.979 66.9465 184.495 66.4625 184.495 65.8658C184.495 65.2691 184.979 64.7852 185.576 64.7852C186.173 64.7852 186.656 65.2691 186.656 65.8658Z"
                  fill="white"
                />
                <path
                  d="M178.507 65.8658C178.507 66.4625 178.023 66.9465 177.426 66.9465C176.83 66.9465 176.346 66.4625 176.346 65.8658C176.346 65.2691 176.83 64.7852 177.426 64.7852C178.023 64.7852 178.507 65.2691 178.507 65.8658Z"
                  fill="#E6E6E6"
                />
                <path
                  d="M110.5 188.982C157.83 188.982 196.199 186.741 196.199 183.977C196.199 181.213 157.83 178.973 110.5 178.973C63.1695 178.973 24.8008 181.213 24.8008 183.977C24.8008 186.741 63.1695 188.982 110.5 188.982Z"
                  fill="#F5F5F5"
                />
                <path
                  d="M89.0391 43.0625H80.9112C70.1251 43.0625 60.8776 49.6262 56.9292 58.9745H50.4623C38.1481 58.9745 28.166 68.9571 28.166 81.2712C28.166 93.5849 38.1486 103.567 50.4623 103.567H89.0391V43.0625Z"
                  fill="#407BFF"
                />
                <path
                  d="M69.8337 44.3128L69.6533 43.9092C70.6668 43.4566 71.7192 43.061 72.7809 42.7344L72.9109 43.1565C71.866 43.4783 70.8308 43.8672 69.8337 44.3128Z"
                  fill="#407BFF"
                />
                <path
                  d="M59.7471 52.1034L59.4023 51.8267C61.4413 49.2821 63.8922 47.1388 66.6861 45.457L66.9141 45.8358C64.1649 47.4907 61.7538 49.5995 59.7471 52.1034Z"
                  fill="#407BFF"
                />
                <path
                  opacity="0.2"
                  d="M89.0391 43.0625H80.9112C70.1251 43.0625 60.8776 49.6262 56.9292 58.9745H50.4623C38.1481 58.9745 28.166 68.9571 28.166 81.2712C28.166 93.5849 38.1486 103.567 50.4623 103.567H89.0391V43.0625Z"
                  fill="black"
                />
                <path
                  opacity="0.5"
                  d="M58.4727 55.9099H70.1326L78.7516 48.25H65.3237C62.5656 50.3186 60.2274 52.9219 58.4727 55.9099Z"
                  fill="#407BFF"
                />
                <path
                  opacity="0.5"
                  d="M31.975 68.8047C30.428 71.0898 29.2965 73.6799 28.6865 76.4645H41.9907V68.8047H31.975Z"
                  fill="#407BFF"
                />
                <path
                  opacity="0.5"
                  d="M86.5572 44.8477H71.4231C69.7966 45.4841 68.2451 46.2797 66.7998 47.2168H77.9382L86.5572 44.8477Z"
                  fill="#407BFF"
                />
                <path
                  d="M133.421 76.125C131.195 66.7055 122.999 59.5964 113.045 59.0165C109.106 49.6448 99.8421 43.0625 89.0391 43.0625C77.9259 43.0625 68.445 50.0297 64.7115 59.8324C62.7658 59.2782 60.714 58.9745 58.5902 58.9745C46.2761 58.9745 36.2939 68.9571 36.2939 81.2712C36.2939 93.5849 46.2765 103.567 58.5902 103.567H129.602C137.327 103.567 143.589 97.3052 143.589 89.5799C143.589 83.1797 139.289 77.7873 133.421 76.125Z"
                  fill="#407BFF"
                />
                <path
                  opacity="0.2"
                  d="M132.941 77.8273L131.938 77.5445L131.699 76.5323C129.63 67.7807 121.917 61.3054 112.94 60.7794L111.84 60.7175L111.416 59.7009C107.619 50.6664 98.8363 44.832 89.0371 44.832C88.7233 44.832 88.4139 44.8365 88.1045 44.8497C97.5191 45.2122 105.864 50.9582 109.537 59.7009L109.961 60.7175L111.062 60.7794C120.039 61.3054 127.752 67.7807 129.82 76.5323L130.059 77.5445L131.062 77.8273C136.291 79.308 139.942 84.1391 139.942 89.5801C139.942 96.3162 134.461 101.801 127.725 101.801H129.604C136.34 101.801 141.821 96.3162 141.821 89.5801C141.821 84.1395 138.17 79.308 132.941 77.8273Z"
                  fill="black"
                />
                <path
                  d="M131.063 77.8272L130.059 77.5443L129.821 76.5322C127.752 67.7806 120.039 61.3053 111.062 60.7793L109.962 60.7174L109.537 59.7008C105.864 50.9581 97.5194 45.212 88.1048 44.8496H88.0738C78.4559 45.2386 69.8104 51.4133 66.3628 60.4611L65.7882 61.9771L64.2279 61.5307C64.1837 61.5174 64.1351 61.5042 64.0909 61.4953C62.2964 60.9959 60.44 60.7439 58.5924 60.7439C58.2698 60.7439 57.9515 60.7528 57.6289 60.766C46.7557 61.2699 38.0615 70.2734 38.0615 81.2704C38.0615 92.59 47.2728 101.801 58.5924 101.801H127.726C134.462 101.801 139.943 96.3161 139.943 89.58C139.943 84.1394 136.292 79.3079 131.063 77.8272Z"
                  fill="white"
                />
                <path
                  d="M80.1616 75.457V93.0026H97.8425V75.457H103.429L89.0025 59.2422L74.5752 75.457H80.1616Z"
                  fill="#407BFF"
                />
                <path
                  d="M77.5088 126.892H76.6032C75.3342 126.892 74.3057 125.864 74.3057 124.595V115.508H79.8064V124.595C79.8064 125.864 78.7774 126.892 77.5088 126.892Z"
                  fill="#407BFF"
                />
                <path
                  opacity="0.2"
                  d="M77.5088 126.892H76.6032C75.3342 126.892 74.3057 125.864 74.3057 124.595V115.508H79.8064V124.595C79.8064 125.864 78.7774 126.892 77.5088 126.892Z"
                  fill="black"
                />
                <path
                  d="M77.9125 118.337H76.1984C73.7966 118.337 71.8496 116.39 71.8496 113.988V103.566H82.2609V113.988C82.2614 116.39 80.3144 118.337 77.9125 118.337Z"
                  fill="#407BFF"
                />
                <path
                  opacity="0.2"
                  d="M82.2619 106.176L71.8506 107.748V103.566H82.2619V106.176Z"
                  fill="black"
                />
                <path
                  d="M80.0766 112.8C80.8394 112.8 81.4578 112.181 81.4578 111.418C81.4578 110.656 80.8394 110.037 80.0766 110.037C79.3137 110.037 78.6953 110.656 78.6953 111.418C78.6953 112.181 79.3137 112.8 80.0766 112.8Z"
                  fill="white"
                />
                <path
                  opacity="0.5"
                  d="M76.393 112.8C77.1558 112.8 77.7742 112.181 77.7742 111.418C77.7742 110.656 77.1558 110.037 76.393 110.037C75.6301 110.037 75.0117 110.656 75.0117 111.418C75.0117 112.181 75.6301 112.8 76.393 112.8Z"
                  fill="white"
                />
                <path
                  d="M111.728 142.174H88.5482C81.6021 142.174 75.9512 136.523 75.9512 129.577V126.893H78.1612V129.577C78.1612 135.305 82.8207 139.964 88.5482 139.964H111.728V142.174Z"
                  fill="#407BFF"
                />
                <path
                  d="M165.833 86.7793H127.846C124.676 86.7793 122.082 89.373 122.082 92.5434V178.213C122.082 181.383 124.676 183.977 127.846 183.977H165.833C169.004 183.977 171.598 181.383 171.598 178.213V92.5434C171.598 89.3734 169.004 86.7793 165.833 86.7793Z"
                  fill="#407BFF"
                />
                <path
                  opacity="0.2"
                  d="M165.833 86.7793H127.846C124.676 86.7793 122.082 89.373 122.082 92.5434V178.213C122.082 181.383 124.676 183.977 127.846 183.977H165.833C169.004 183.977 171.598 181.383 171.598 178.213V92.5434C171.598 89.3734 169.004 86.7793 165.833 86.7793Z"
                  fill="black"
                />
                <path
                  d="M155.479 86.7793H117.492C114.321 86.7793 111.728 89.373 111.728 92.5434V178.213C111.728 181.383 114.321 183.977 117.492 183.977H155.479C158.649 183.977 161.243 181.383 161.243 178.213V92.5434C161.243 89.3734 158.649 86.7793 155.479 86.7793Z"
                  fill="#407BFF"
                />
                <path
                  opacity="0.2"
                  d="M117.491 182.056C115.372 182.056 113.648 180.332 113.648 178.213V92.5439C113.648 90.425 115.372 88.7012 117.491 88.7012H155.478C157.597 88.7012 159.321 90.425 159.321 92.5439V178.213C159.321 180.332 157.597 182.056 155.478 182.056H117.491Z"
                  fill="black"
                />
                <path
                  d="M119.279 182.056C117.16 182.056 115.437 180.332 115.437 178.213V92.5439C115.437 90.425 117.16 88.7012 119.279 88.7012H155.479C157.598 88.7012 159.321 90.425 159.321 92.5439V178.213C159.321 180.332 157.598 182.056 155.479 182.056H119.279Z"
                  fill="white"
                />
                <path
                  opacity="0.3"
                  d="M153.344 99.9385H121.415C119.771 99.9385 118.426 98.5935 118.426 96.9497C118.426 95.3059 119.771 93.9609 121.415 93.9609H153.344C154.988 93.9609 156.333 95.3059 156.333 96.9497C156.333 98.5935 154.988 99.9385 153.344 99.9385Z"
                  fill="#407BFF"
                />
                <path
                  d="M142.817 97.6043H120.934C120.574 97.6043 120.28 97.3099 120.28 96.9506C120.28 96.5908 120.575 96.2969 120.934 96.2969H142.817C143.176 96.2969 143.47 96.5912 143.47 96.9506C143.47 97.3104 143.176 97.6043 142.817 97.6043Z"
                  fill="white"
                />
                <path
                  d="M150.715 97.6043C151.076 97.6043 151.369 97.3116 151.369 96.9506C151.369 96.5896 151.076 96.2969 150.715 96.2969C150.354 96.2969 150.062 96.5896 150.062 96.9506C150.062 97.3116 150.354 97.6043 150.715 97.6043Z"
                  fill="#407BFF"
                />
                <path
                  d="M153.598 97.6043C153.959 97.6043 154.252 97.3116 154.252 96.9506C154.252 96.5896 153.959 96.2969 153.598 96.2969C153.237 96.2969 152.944 96.5896 152.944 96.9506C152.944 97.3116 153.237 97.6043 153.598 97.6043Z"
                  fill="#407BFF"
                />
                <path
                  d="M147.833 97.6043C148.194 97.6043 148.487 97.3116 148.487 96.9506C148.487 96.5896 148.194 96.2969 147.833 96.2969C147.472 96.2969 147.18 96.5896 147.18 96.9506C147.18 97.3116 147.472 97.6043 147.833 97.6043Z"
                  fill="#407BFF"
                />
                <path
                  opacity="0.3"
                  d="M153.344 109.546H121.415C119.771 109.546 118.426 108.201 118.426 106.557C118.426 104.913 119.771 103.568 121.415 103.568H153.344C154.988 103.568 156.333 104.913 156.333 106.557C156.333 108.201 154.988 109.546 153.344 109.546Z"
                  fill="#407BFF"
                />
                <path
                  d="M142.817 107.212H120.934C120.574 107.212 120.28 106.917 120.28 106.558C120.28 106.198 120.575 105.904 120.934 105.904H142.817C143.176 105.904 143.47 106.199 143.47 106.558C143.47 106.918 143.176 107.212 142.817 107.212Z"
                  fill="white"
                />
                <path
                  d="M150.715 107.21C151.076 107.21 151.369 106.917 151.369 106.556C151.369 106.195 151.076 105.902 150.715 105.902C150.354 105.902 150.062 106.195 150.062 106.556C150.062 106.917 150.354 107.21 150.715 107.21Z"
                  fill="#407BFF"
                />
                <path
                  d="M153.598 107.212C153.959 107.212 154.252 106.919 154.252 106.558C154.252 106.197 153.959 105.904 153.598 105.904C153.237 105.904 152.944 106.197 152.944 106.558C152.944 106.919 153.237 107.212 153.598 107.212Z"
                  fill="#407BFF"
                />
                <path
                  opacity="0.3"
                  d="M147.833 107.21C148.194 107.21 148.487 106.917 148.487 106.556C148.487 106.195 148.194 105.902 147.833 105.902C147.472 105.902 147.18 106.195 147.18 106.556C147.18 106.917 147.472 107.21 147.833 107.21Z"
                  fill="#407BFF"
                />
                <path
                  opacity="0.3"
                  d="M153.344 119.153H121.415C119.771 119.153 118.426 117.808 118.426 116.165C118.426 114.521 119.771 113.176 121.415 113.176H153.344C154.988 113.176 156.333 114.521 156.333 116.165C156.333 117.808 154.988 119.153 153.344 119.153Z"
                  fill="#407BFF"
                />
                <path
                  d="M142.817 116.819H120.934C120.574 116.819 120.28 116.525 120.28 116.165C120.28 115.806 120.575 115.512 120.934 115.512H142.817C143.176 115.512 143.47 115.806 143.47 116.165C143.47 116.525 143.176 116.819 142.817 116.819Z"
                  fill="white"
                />
                <path
                  d="M150.715 116.819C151.076 116.819 151.369 116.526 151.369 116.165C151.369 115.804 151.076 115.512 150.715 115.512C150.354 115.512 150.062 115.804 150.062 116.165C150.062 116.526 150.354 116.819 150.715 116.819Z"
                  fill="#407BFF"
                />
                <path
                  d="M153.598 116.819C153.959 116.819 154.252 116.526 154.252 116.165C154.252 115.804 153.959 115.512 153.598 115.512C153.237 115.512 152.944 115.804 152.944 116.165C152.944 116.526 153.237 116.819 153.598 116.819Z"
                  fill="#407BFF"
                />
                <path
                  opacity="0.6"
                  d="M147.833 116.819C148.194 116.819 148.487 116.526 148.487 116.165C148.487 115.804 148.194 115.512 147.833 115.512C147.472 115.512 147.18 115.804 147.18 116.165C147.18 116.526 147.472 116.819 147.833 116.819Z"
                  fill="#407BFF"
                />
                <path
                  opacity="0.3"
                  d="M153.344 128.761H121.415C119.771 128.761 118.426 127.416 118.426 125.772C118.426 124.128 119.771 122.783 121.415 122.783H153.344C154.988 122.783 156.333 124.128 156.333 125.772C156.333 127.416 154.988 128.761 153.344 128.761Z"
                  fill="#407BFF"
                />
                <path
                  d="M142.817 126.427H120.934C120.574 126.427 120.28 126.132 120.28 125.773C120.28 125.413 120.575 125.119 120.934 125.119H142.817C143.176 125.119 143.47 125.414 143.47 125.773C143.47 126.132 143.176 126.427 142.817 126.427Z"
                  fill="white"
                />
                <path
                  d="M150.715 126.425C151.076 126.425 151.369 126.132 151.369 125.771C151.369 125.41 151.076 125.117 150.715 125.117C150.354 125.117 150.062 125.41 150.062 125.771C150.062 126.132 150.354 126.425 150.715 126.425Z"
                  fill="#407BFF"
                />
                <path
                  opacity="0.3"
                  d="M153.598 126.427C153.959 126.427 154.252 126.134 154.252 125.773C154.252 125.412 153.959 125.119 153.598 125.119C153.237 125.119 152.944 125.412 152.944 125.773C152.944 126.134 153.237 126.427 153.598 126.427Z"
                  fill="#407BFF"
                />
                <path
                  opacity="0.6"
                  d="M147.833 126.425C148.194 126.425 148.487 126.132 148.487 125.771C148.487 125.41 148.194 125.117 147.833 125.117C147.472 125.117 147.18 125.41 147.18 125.771C147.18 126.132 147.472 126.425 147.833 126.425Z"
                  fill="#407BFF"
                />
                <path
                  opacity="0.3"
                  d="M153.344 138.368H121.415C119.771 138.368 118.426 137.023 118.426 135.379C118.426 133.736 119.771 132.391 121.415 132.391H153.344C154.988 132.391 156.333 133.736 156.333 135.379C156.333 137.023 154.988 138.368 153.344 138.368Z"
                  fill="#407BFF"
                />
                <path
                  d="M142.817 136.034H120.934C120.574 136.034 120.28 135.74 120.28 135.38C120.28 135.02 120.575 134.727 120.934 134.727H142.817C143.176 134.727 143.47 135.021 143.47 135.38C143.47 135.74 143.176 136.034 142.817 136.034Z"
                  fill="white"
                />
                <path
                  d="M150.715 136.034C151.076 136.034 151.369 135.741 151.369 135.38C151.369 135.019 151.076 134.727 150.715 134.727C150.354 134.727 150.062 135.019 150.062 135.38C150.062 135.741 150.354 136.034 150.715 136.034Z"
                  fill="#407BFF"
                />
                <path
                  opacity="0.6"
                  d="M153.598 136.034C153.959 136.034 154.252 135.741 154.252 135.38C154.252 135.019 153.959 134.727 153.598 134.727C153.237 134.727 152.944 135.019 152.944 135.38C152.944 135.741 153.237 136.034 153.598 136.034Z"
                  fill="#407BFF"
                />
                <path
                  d="M147.833 136.034C148.194 136.034 148.487 135.741 148.487 135.38C148.487 135.019 148.194 134.727 147.833 134.727C147.472 134.727 147.18 135.019 147.18 135.38C147.18 135.741 147.472 136.034 147.833 136.034Z"
                  fill="#407BFF"
                />
                <path
                  opacity="0.3"
                  d="M153.344 147.974H121.415C119.771 147.974 118.426 146.629 118.426 144.985C118.426 143.341 119.771 141.996 121.415 141.996H153.344C154.988 141.996 156.333 143.341 156.333 144.985C156.333 146.629 154.988 147.974 153.344 147.974Z"
                  fill="#407BFF"
                />
                <path
                  d="M142.817 145.639H120.934C120.574 145.639 120.28 145.345 120.28 144.986C120.28 144.626 120.575 144.332 120.934 144.332H142.817C143.176 144.332 143.47 144.626 143.47 144.986C143.47 145.346 143.176 145.639 142.817 145.639Z"
                  fill="white"
                />
                <path
                  opacity="0.3"
                  d="M150.715 145.639C151.076 145.639 151.369 145.347 151.369 144.986C151.369 144.625 151.076 144.332 150.715 144.332C150.354 144.332 150.062 144.625 150.062 144.986C150.062 145.347 150.354 145.639 150.715 145.639Z"
                  fill="#407BFF"
                />
                <path
                  d="M153.598 145.639C153.959 145.639 154.252 145.347 154.252 144.986C154.252 144.625 153.959 144.332 153.598 144.332C153.237 144.332 152.944 144.625 152.944 144.986C152.944 145.347 153.237 145.639 153.598 145.639Z"
                  fill="#407BFF"
                />
                <path
                  d="M147.833 145.639C148.194 145.639 148.487 145.347 148.487 144.986C148.487 144.625 148.194 144.332 147.833 144.332C147.472 144.332 147.18 144.625 147.18 144.986C147.18 145.347 147.472 145.639 147.833 145.639Z"
                  fill="#407BFF"
                />
                <path
                  opacity="0.3"
                  d="M153.344 157.581H121.415C119.771 157.581 118.426 156.236 118.426 154.592C118.426 152.949 119.771 151.604 121.415 151.604H153.344C154.988 151.604 156.333 152.949 156.333 154.592C156.333 156.236 154.988 157.581 153.344 157.581Z"
                  fill="#407BFF"
                />
                <path
                  d="M142.817 155.247H120.934C120.574 155.247 120.28 154.953 120.28 154.593C120.28 154.233 120.575 153.939 120.934 153.939H142.817C143.176 153.939 143.47 154.234 143.47 154.593C143.47 154.953 143.176 155.247 142.817 155.247Z"
                  fill="white"
                />
                <path
                  opacity="0.3"
                  d="M150.715 155.245C151.076 155.245 151.369 154.952 151.369 154.591C151.369 154.23 151.076 153.938 150.715 153.938C150.354 153.938 150.062 154.23 150.062 154.591C150.062 154.952 150.354 155.245 150.715 155.245Z"
                  fill="#407BFF"
                />
                <path
                  d="M153.598 155.247C153.959 155.247 154.252 154.954 154.252 154.593C154.252 154.232 153.959 153.939 153.598 153.939C153.237 153.939 152.944 154.232 152.944 154.593C152.944 154.954 153.237 155.247 153.598 155.247Z"
                  fill="#407BFF"
                />
                <path
                  opacity="0.3"
                  d="M147.833 155.245C148.194 155.245 148.487 154.952 148.487 154.591C148.487 154.23 148.194 153.938 147.833 153.938C147.472 153.938 147.18 154.23 147.18 154.591C147.18 154.952 147.472 155.245 147.833 155.245Z"
                  fill="#407BFF"
                />
                <path
                  opacity="0.3"
                  d="M153.344 167.189H121.415C119.771 167.189 118.426 165.844 118.426 164.2C118.426 162.556 119.771 161.211 121.415 161.211H153.344C154.988 161.211 156.333 162.556 156.333 164.2C156.333 165.844 154.988 167.189 153.344 167.189Z"
                  fill="#407BFF"
                />
                <path
                  d="M142.817 164.854H120.934C120.574 164.854 120.28 164.56 120.28 164.201C120.28 163.841 120.575 163.547 120.934 163.547H142.817C143.176 163.547 143.47 163.841 143.47 164.201C143.47 164.56 143.176 164.854 142.817 164.854Z"
                  fill="white"
                />
                <path
                  d="M150.715 164.854C151.076 164.854 151.369 164.562 151.369 164.201C151.369 163.84 151.076 163.547 150.715 163.547C150.354 163.547 150.062 163.84 150.062 164.201C150.062 164.562 150.354 164.854 150.715 164.854Z"
                  fill="#407BFF"
                />
                <path
                  d="M153.598 164.854C153.959 164.854 154.252 164.562 154.252 164.201C154.252 163.84 153.959 163.547 153.598 163.547C153.237 163.547 152.944 163.84 152.944 164.201C152.944 164.562 153.237 164.854 153.598 164.854Z"
                  fill="#407BFF"
                />
                <path
                  d="M147.833 164.854C148.194 164.854 148.487 164.562 148.487 164.201C148.487 163.84 148.194 163.547 147.833 163.547C147.472 163.547 147.18 163.84 147.18 164.201C147.18 164.562 147.472 164.854 147.833 164.854Z"
                  fill="#407BFF"
                />
                <path
                  opacity="0.3"
                  d="M153.344 176.794H121.415C119.771 176.794 118.426 175.449 118.426 173.805C118.426 172.161 119.771 170.816 121.415 170.816H153.344C154.988 170.816 156.333 172.161 156.333 173.805C156.333 175.449 154.988 176.794 153.344 176.794Z"
                  fill="#407BFF"
                />
                <path
                  d="M142.817 174.46H120.934C120.574 174.46 120.28 174.165 120.28 173.806C120.28 173.446 120.575 173.152 120.934 173.152H142.817C143.176 173.152 143.47 173.447 143.47 173.806C143.47 174.165 143.176 174.46 142.817 174.46Z"
                  fill="white"
                />
                <path
                  d="M150.715 174.46C151.076 174.46 151.369 174.167 151.369 173.806C151.369 173.445 151.076 173.152 150.715 173.152C150.354 173.152 150.062 173.445 150.062 173.806C150.062 174.167 150.354 174.46 150.715 174.46Z"
                  fill="#407BFF"
                />
                <path
                  d="M153.598 174.46C153.959 174.46 154.252 174.167 154.252 173.806C154.252 173.445 153.959 173.152 153.598 173.152C153.237 173.152 152.944 173.445 152.944 173.806C152.944 174.167 153.237 174.46 153.598 174.46Z"
                  fill="#407BFF"
                />
                <path
                  opacity="0.6"
                  d="M147.833 174.46C148.194 174.46 148.487 174.167 148.487 173.806C148.487 173.445 148.194 173.152 147.833 173.152C147.472 173.152 147.18 173.445 147.18 173.806C147.18 174.167 147.472 174.46 147.833 174.46Z"
                  fill="#407BFF"
                />
                <path
                  opacity="0.2"
                  d="M168.655 114.991H164.186C163.465 114.991 162.875 114.401 162.875 113.68V108.158C162.875 107.437 163.465 106.848 164.186 106.848H168.655C169.376 106.848 169.966 107.438 169.966 108.158V113.68C169.966 114.401 169.376 114.991 168.655 114.991Z"
                  fill="black"
                />
                <path
                  d="M116.209 86.2754L121.209 88.4483L118.343 91.7933L114.162 89.9816L116.209 86.2754Z"
                  fill="#CE7A63"
                />
                <path
                  opacity="0.2"
                  d="M116.21 86.2773L121.211 88.4511L119.605 90.3234L115.062 88.3525L116.21 86.2773Z"
                  fill="black"
                />
                <path
                  d="M118.982 93.5597L118.422 93.4089C118.088 93.3192 117.821 93.069 117.711 92.742L117.344 92.8971C117.132 92.9868 116.895 93.0032 116.673 92.9435L109.031 90.8882C109.079 90.1974 109.719 89.4517 109.719 89.4517C109.719 89.4517 113.125 90.1753 114.149 89.3951C114.228 89.335 114.331 89.3187 114.419 89.3633C115.03 89.6732 117.442 90.8369 119.021 90.7481C119.23 90.7362 119.386 90.9351 119.336 91.1393C119.066 92.2606 118.982 93.5597 118.982 93.5597Z"
                  fill="#263238"
                />
                <path
                  d="M161.129 70.5393L158.987 75.0243C155.827 81.6446 148.04 84.9728 141.823 82.3685C138.194 80.845 134.231 77.629 131.534 76.158C129.226 81.2118 124.91 86.7877 121.605 90.6675L114.922 87.3026C117.417 81.5747 121.304 72.6277 123.77 66.8172C124.665 64.712 126.758 63.2675 128.966 63.2078C140.078 62.9077 161.129 70.5393 161.129 70.5393Z"
                  fill="#263238"
                />
                <path
                  d="M128.94 100.931L133.744 100.719L132.856 105.996L128.841 106.18L128.94 100.931Z"
                  fill="#CE7A63"
                />
                <path
                  opacity="0.2"
                  d="M128.94 100.931L133.747 100.719L133.381 102.889L128.897 103.18L128.94 100.931Z"
                  fill="black"
                />
                <path
                  d="M134.699 106.237L134.145 106.41C133.816 106.514 133.456 106.446 133.188 106.229L132.961 106.557C132.83 106.747 132.64 106.887 132.42 106.957L124.87 109.325C124.538 108.717 124.679 107.744 124.679 107.744C124.679 107.744 127.941 106.526 128.386 105.318C128.421 105.225 128.498 105.156 128.597 105.146C129.278 105.08 131.938 104.767 133.223 103.844C133.393 103.722 133.631 103.806 133.699 104.005C134.074 105.095 134.699 106.237 134.699 106.237Z"
                  fill="#263238"
                />
                <path
                  d="M164.243 68.7656L164.206 73.5021C164.15 80.4892 158.227 86.7263 151.154 87.2518C147.026 87.5559 141.447 87.6518 138.227 87.5891C137.758 92.4807 136.23 98.2453 134.691 102.423L127.737 101.937C127.555 96.0074 127.287 87.5988 127.063 82.023C126.976 79.8483 128.322 77.7099 130.397 76.6885C140.826 71.5555 164.243 68.7656 164.243 68.7656Z"
                  fill="#263238"
                />
                <path
                  opacity="0.1"
                  d="M133.211 102.484C133.195 102.484 133.179 102.482 133.163 102.477C133.076 102.451 133.027 102.358 133.053 102.271C134.105 98.8143 135.999 88.022 136.083 83.0712C136.084 83.0239 136.105 82.9792 136.14 82.9487C136.176 82.9178 136.223 82.9037 136.27 82.9103C146.429 84.2615 153.309 83.8022 156.167 81.5816C161.186 77.6814 161.114 71.3683 159.841 68.0763C159.808 67.991 159.851 67.8955 159.936 67.8628C160.021 67.8297 160.117 67.8721 160.149 67.9574C161.458 71.3414 161.531 77.8322 156.369 81.8429C153.416 84.1377 146.702 84.6151 136.409 83.2621C136.281 88.3155 134.412 98.9368 133.369 102.368C133.348 102.438 133.282 102.484 133.211 102.484Z"
                  fill="black"
                />
                <path
                  opacity="0.2"
                  d="M131.261 76.741C130.171 79.0049 128.704 81.355 127.127 83.596C127.162 84.5741 127.2 85.6124 127.24 86.6895C129.701 82.8026 131.265 76.7344 131.265 76.7344C131.265 76.7344 131.265 76.7379 131.261 76.741Z"
                  fill="black"
                />
                <path
                  d="M149.254 46.4704C149.067 47.1546 148.891 47.7505 148.687 48.3772C148.493 48.9982 148.275 49.6091 148.058 50.2212C147.611 51.4416 147.147 52.6575 146.608 53.8598C146.075 55.0664 145.516 56.2634 144.851 57.4577C144.198 58.6577 143.472 59.8436 142.563 61.0458L142.279 61.422C142.099 61.6611 141.863 61.8467 141.611 61.9692C141.121 62.2043 140.616 62.3992 140.11 62.5628C139.607 62.7369 139.084 62.8465 138.57 62.9495C138.05 63.0388 137.527 63.0967 136.998 63.1122C136.734 63.1219 136.465 63.113 136.198 63.1033L135.788 63.0706C135.642 63.0565 135.523 63.0308 135.331 63.0193C134.479 62.9698 133.829 62.2388 133.879 61.3875C133.887 61.2381 133.917 61.0944 133.965 60.9601L134.551 59.3357C134.573 59.276 134.666 59.1974 134.733 59.1258L134.955 58.9145L135.407 58.5017C135.706 58.229 136.002 57.9717 136.284 57.7069C136.573 57.4572 136.843 57.1907 137.112 56.9472C137.382 56.7041 137.627 56.4424 137.88 56.2099L136.927 57.1328C137.424 56.2775 137.891 55.2715 138.349 54.2448L138.684 53.4607L139.003 52.6544C139.221 52.1187 139.431 51.5724 139.635 51.0217C140.041 49.9202 140.443 48.8002 140.827 47.674L141.961 44.328L141.988 44.248C142.663 42.2595 144.821 41.1943 146.809 41.8683C148.72 42.5154 149.776 44.5477 149.254 46.4704Z"
                  fill="#CE7A63"
                />
                <path
                  d="M145.607 40.25C143.589 40.829 140.875 43.0571 139.942 48.1035C141.294 50.203 147.638 48.5821 147.638 48.5821L145.607 40.25Z"
                  fill="#407BFF"
                />
                <path
                  d="M136.115 59.385L136.32 61.5698C135.708 63.7931 132.986 62.5117 132.986 62.5117L131.428 62.4247C130.9 62.395 130.468 61.9274 130.406 61.3197L130.251 59.7934C130.18 59.0977 130.617 58.4723 131.219 58.4069L132.572 58.2601C132.966 58.2173 133.365 58.273 133.732 58.4215L136.115 59.385Z"
                  fill="#CE7A63"
                />
                <path
                  d="M146.584 39.9479C149.755 39.2694 153.401 38.7606 156.661 38.5785C160.384 38.3704 163.481 41.3808 163.386 45.1078C163.102 56.2404 164.669 67.945 164.447 70.0914C164.447 70.0914 140.973 73.4709 137.373 66.4935C135.862 56.5971 140.747 57.8581 141.138 46.4952C141.24 43.5183 143.672 40.5711 146.584 39.9479Z"
                  fill="#407BFF"
                />
                <path
                  d="M144.733 50.0108L144.812 49.9882L144.827 49.9029C144.949 49.1666 145.536 48.63 146.256 48.5977L146.343 48.5942L146.373 48.5089C146.624 47.7756 147.266 47.3013 148.021 47.2832H148.024C148.799 47.3287 149.525 47.8618 149.847 48.6304L149.901 48.759L150.024 48.7232C150.028 48.7224 150.032 48.721 150.036 48.7206C150.177 48.6808 150.325 48.6618 150.474 48.6645C150.5 48.6649 150.526 48.6662 150.551 48.6675C151.428 48.7246 152.172 49.4967 152.227 50.4254C152.284 51.3814 151.59 52.147 150.68 52.1319L145.123 52.0396C144.581 52.0307 144.113 51.56 144.079 50.9911C144.051 50.5319 144.32 50.1288 144.733 50.0108Z"
                  fill="white"
                />
                <path
                  d="M163.135 42.3562L163.35 42.8326L163.537 43.2662C163.659 43.5535 163.768 43.8413 163.879 44.1281C164.101 44.701 164.294 45.2818 164.484 45.8643C164.851 47.0325 165.174 48.2215 165.417 49.4454C165.539 50.0576 165.647 50.6772 165.74 51.3044C165.823 51.9347 165.887 52.5743 165.933 53.2218C166.025 54.5209 166.003 55.8668 165.819 57.2661L165.776 57.5919C165.719 58.0206 165.558 58.4229 165.332 58.7597C164.843 59.4832 164.35 60.0088 163.852 60.4565C163.355 60.9029 162.865 61.2782 162.377 61.6225C161.405 62.3049 160.421 62.8305 159.446 63.3171C158.462 63.7879 157.478 64.2016 156.479 64.5591C155.47 64.9154 154.491 65.2252 153.411 65.4732C152.378 65.7101 151.348 65.0652 151.111 64.0323C150.941 63.2897 151.226 62.5494 151.784 62.1034L151.865 62.0393C152.603 61.451 153.41 60.8561 154.163 60.2651C154.926 59.6742 155.675 59.0854 156.382 58.4861C157.097 57.9004 157.76 57.2838 158.338 56.7004C158.622 56.4078 158.878 56.1156 159.079 55.8447C159.277 55.5746 159.432 55.3297 159.465 55.1985L158.979 56.692C158.974 55.8509 158.869 54.9425 158.721 54.0086C158.557 53.0738 158.338 52.1155 158.082 51.1497C157.812 50.1862 157.525 49.2111 157.194 48.2445C157.035 47.7592 156.857 47.2792 156.69 46.7987L156.187 45.4409L156.11 45.2358C155.381 43.2689 156.384 41.0836 158.351 40.3539C160.233 39.6555 162.32 40.5554 163.135 42.3562Z"
                  fill="#CE7A63"
                />
                <path
                  d="M157.895 38.627C159.516 38.8064 162.951 40.0232 165.21 44.6784C162.992 49.0617 157.205 50.7298 157.205 50.7298C157.205 50.7298 153.178 40.9567 157.895 38.627Z"
                  fill="#407BFF"
                />
                <path
                  d="M144.642 70.0441H125.562C124.731 70.0441 124.554 69.8518 125.17 69.6171L133.875 66.2942C134.49 66.0595 135.673 65.8672 136.504 65.8672H155.585C156.416 65.8672 156.592 66.0595 155.977 66.2942L147.272 69.6171C146.657 69.8518 145.473 70.0441 144.642 70.0441Z"
                  fill="#407BFF"
                />
                <path
                  opacity="0.4"
                  d="M144.642 70.0441H125.562C124.731 70.0441 124.554 69.8518 125.17 69.6171L133.875 66.2942C134.49 66.0595 135.673 65.8672 136.504 65.8672H155.585C156.416 65.8672 156.592 66.0595 155.977 66.2942L147.272 69.6171C146.657 69.8518 145.473 70.0441 144.642 70.0441Z"
                  fill="black"
                />
                <path
                  d="M144.642 69.2555H125.562C124.731 69.2555 123.926 68.5757 123.774 67.7448L121.613 55.9854C121.461 55.1544 122.015 54.4746 122.846 54.4746H141.927C142.758 54.4746 143.562 55.1544 143.715 55.9854L145.875 67.7448C146.028 68.5757 145.473 69.2555 144.642 69.2555Z"
                  fill="#407BFF"
                />
                <path
                  opacity="0.3"
                  d="M144.642 69.2555H125.562C124.731 69.2555 123.926 68.5757 123.774 67.7448L121.613 55.9854C121.461 55.1544 122.015 54.4746 122.846 54.4746H141.927C142.758 54.4746 143.562 55.1544 143.715 55.9854L145.875 67.7448C146.028 68.5757 145.473 69.2555 144.642 69.2555Z"
                  fill="black"
                />
                <path
                  opacity="0.3"
                  d="M144.196 69.2555H125.563C124.732 69.2555 123.927 68.5757 123.775 67.7448L121.614 55.9854C121.462 55.1544 122.016 54.4746 122.847 54.4746H141.481C142.312 54.4746 143.117 55.1544 143.269 55.9854L145.429 67.7448C145.582 68.5757 145.027 69.2555 144.196 69.2555Z"
                  fill="#407BFF"
                />
                <path
                  d="M152.868 62.8567L153.823 63.8604C154.718 65.9856 151.787 66.6632 151.787 66.6632L150.509 67.5582C150.076 67.8619 149.447 67.762 149.022 67.3226L147.956 66.2194C147.47 65.7168 147.426 64.9548 147.859 64.531L148.831 63.578C149.114 63.3009 149.461 63.098 149.841 62.9875L151.533 62.496C152.011 62.3576 152.525 62.4969 152.868 62.8567Z"
                  fill="#CE7A63"
                />
                <path
                  d="M147.864 41.0955C147.98 40.6106 148.446 39.8102 149.026 39.4535C149.139 38.8638 149.047 38.249 148.701 37.5763L153.97 33.166C154.299 35.3628 155.072 38.2937 156.155 39.2457C154.948 40.3596 152.728 42.3698 149.964 42.8396C147.2 43.3099 147.609 42.155 147.864 41.0955Z"
                  fill="#CE7A63"
                />
                <path
                  opacity="0.2"
                  d="M148.801 37.7817L153.3 35.9062C152.733 38.194 150.186 40.0854 149.064 39.1775C149.099 38.7324 149.019 38.2732 148.801 37.7817Z"
                  fill="black"
                />
                <path
                  d="M148.538 30.7102C148.538 32.3288 147.225 33.6411 145.607 33.6411C143.988 33.6411 142.676 32.3288 142.676 30.7102C142.676 29.0916 143.988 27.7793 145.607 27.7793C147.225 27.7793 148.538 29.0916 148.538 30.7102Z"
                  fill="#263238"
                />
                <path
                  d="M153.581 29.0625C154.272 32.4128 154.668 34.7028 153.134 36.6136C150.084 40.4095 147.315 39.2307 145.634 36.1455C144.12 33.3689 143.245 28.3562 146.129 26.197C148.97 24.0701 152.891 25.7121 153.581 29.0625Z"
                  fill="#CE7A63"
                />
                <path
                  d="M147.002 28.1741C146.324 28.9476 144.534 30.5684 141.931 29.1071C139.328 27.6459 140.387 24.1501 141.956 23.0318C144.23 21.411 146.499 22.4281 146.499 22.4281C146.499 22.4281 146.284 20.5681 148.9 20.4943C151.515 20.4205 151.386 22.2809 151.386 22.2809C151.386 22.2809 154.775 20.8709 156.395 23.4778C157.903 25.9035 155.655 27.7873 155.655 27.7873C155.655 27.7873 158.002 28.7969 157.23 31.2332C156.567 33.3234 154.664 33.3132 154.664 33.3132C154.664 33.3132 152.159 33.4887 151.735 31.6632C151.312 29.8378 152.104 28.487 152.104 28.487C152.104 28.487 148.089 30.0526 147.002 28.1741Z"
                  fill="#263238"
                />
                <path
                  d="M150.851 32.1258C150.848 32.1258 150.844 32.1254 150.84 32.1254L150.223 32.0622C150.163 32.056 150.118 32.0016 150.125 31.941C150.131 31.8801 150.186 31.8367 150.246 31.8425L150.844 31.9035L153.966 31.1437C154.026 31.1295 154.084 31.1658 154.099 31.225C154.114 31.2842 154.077 31.3439 154.018 31.3585L150.877 32.1227C150.868 32.1245 150.86 32.1258 150.851 32.1258Z"
                  fill="#263238"
                />
                <path
                  d="M155.354 28.1318C155.254 28.1318 155.152 28.1265 155.047 28.1159C154.926 28.1035 154.837 27.9952 154.85 27.8736C154.862 27.7521 154.974 27.6624 155.092 27.6765C155.785 27.7472 156.349 27.5399 156.644 27.1085C156.875 26.7713 156.901 26.3536 156.715 25.9898C156.659 25.8811 156.702 25.7481 156.811 25.6924C156.92 25.6367 157.053 25.6795 157.108 25.7883C157.366 26.2908 157.328 26.8924 157.009 27.3583C156.667 27.8577 156.074 28.1318 155.354 28.1318Z"
                  fill="#263238"
                />
                <path
                  d="M143.209 30.2929C142.802 30.2929 142.357 30.2341 141.872 30.1002C140.618 29.7546 139.82 28.8454 139.684 27.6056C139.542 26.3083 140.181 24.9337 141.171 24.4086C141.279 24.3516 141.413 24.3922 141.47 24.5001C141.527 24.6079 141.486 24.7419 141.378 24.7989C140.539 25.244 139.999 26.4299 140.124 27.5574C140.191 28.1749 140.524 29.2706 141.99 29.6746C144.581 30.388 145.886 28.7199 146.433 27.6617C146.489 27.5534 146.622 27.5105 146.731 27.5671C146.839 27.6233 146.881 27.7567 146.826 27.865C146.319 28.8432 145.227 30.2929 143.209 30.2929Z"
                  fill="#263238"
                />
                <path
                  d="M148.114 35.3637C147.963 35.4278 147.799 35.4822 147.619 35.5228C147.57 35.5339 147.525 35.5016 147.517 35.4508C147.509 35.4004 147.541 35.3509 147.591 35.3394C148.904 35.0419 149.369 33.9449 149.374 33.9338C149.394 33.8852 149.446 33.8609 149.491 33.879C149.536 33.8976 149.557 33.9515 149.537 33.9997C149.519 34.043 149.145 34.9266 148.114 35.3637Z"
                  fill="#263238"
                />
                <path
                  opacity="0.2"
                  d="M149.428 30.872C149.428 30.872 149.976 30.396 150.573 30.5016C149.992 30.8269 149.428 30.872 149.428 30.872Z"
                  fill="black"
                />
                <path
                  opacity="0.2"
                  d="M149.534 31.1389C149.534 31.1389 150.114 30.8181 150.623 31.0731C150.043 31.2397 149.534 31.1389 149.534 31.1389Z"
                  fill="black"
                />
                <path
                  opacity="0.2"
                  d="M144.901 32.1475C144.901 32.1475 144.523 31.9371 144.393 32.1784C144.712 32.2668 144.901 32.1475 144.901 32.1475Z"
                  fill="black"
                />
                <path
                  opacity="0.2"
                  d="M144.946 32.4175C144.946 32.4175 144.629 32.2177 144.592 32.5351C144.84 32.593 144.946 32.4175 144.946 32.4175Z"
                  fill="black"
                />
                <path
                  d="M155.654 32.7015C155.387 33.5811 154.735 34.2529 154.058 34.5946C153.04 35.1086 152.301 34.2538 152.391 33.1797C152.472 32.2126 153.099 30.7801 154.213 30.712C155.311 30.6449 155.961 31.6959 155.654 32.7015Z"
                  fill="#CE7A63"
                />
                <path
                  d="M148.602 31.2848C148.675 31.5531 148.591 31.8081 148.415 31.8541C148.239 31.9001 148.037 31.7197 147.964 31.4514C147.891 31.1832 147.975 30.9281 148.151 30.8822C148.327 30.8362 148.529 31.0165 148.602 31.2848Z"
                  fill="#263238"
                />
                <path
                  d="M145.766 32.0916C145.839 32.3599 145.755 32.6149 145.579 32.6609C145.403 32.7068 145.201 32.5265 145.128 32.2582C145.055 31.9899 145.139 31.7349 145.315 31.6889C145.491 31.6425 145.693 31.8228 145.766 32.0916Z"
                  fill="#263238"
                />
                <path
                  d="M144.131 34.0996C143.958 34.0996 143.777 33.9984 143.69 33.8442L143.24 33.0384C143.184 32.9398 143.176 32.8306 143.217 32.7392C143.257 32.6512 143.338 32.588 143.441 32.565L145.74 32.0545C145.935 32.0112 146.17 32.1186 146.271 32.3003L146.721 33.106C146.777 33.2046 146.785 33.3138 146.744 33.4053C146.705 33.4932 146.623 33.5564 146.52 33.5794L144.221 34.0899C144.192 34.0965 144.162 34.0996 144.131 34.0996ZM145.831 32.2662C145.816 32.2662 145.802 32.2675 145.788 32.2706L143.489 32.7811C143.465 32.7864 143.433 32.7993 143.419 32.8298C143.407 32.8567 143.412 32.8934 143.433 32.931L143.883 33.7363C143.937 33.8322 144.073 33.8972 144.173 33.8742L146.472 33.3637C146.496 33.3584 146.529 33.3456 146.542 33.3151C146.554 33.2881 146.549 33.2514 146.529 33.2139L146.078 32.4081C146.032 32.3259 145.924 32.2662 145.831 32.2662Z"
                  fill="#263238"
                />
                <path
                  d="M146.709 32.1211L147.682 34.2476C147.682 34.2476 146.954 34.8018 146.31 34.6564C146.09 33.4347 146.709 32.1211 146.709 32.1211Z"
                  fill="#BA4D3C"
                />
                <path
                  d="M147.943 33.2535C147.769 33.2535 147.588 33.1522 147.502 32.998L147.051 32.1927C146.996 32.0941 146.988 31.9849 147.029 31.8934C147.068 31.8055 147.15 31.7423 147.253 31.7193L149.551 31.2088C149.749 31.1655 149.981 31.2733 150.082 31.4545L150.533 32.2598C150.588 32.3584 150.597 32.4676 150.556 32.5591C150.516 32.647 150.435 32.7102 150.332 32.7337L148.033 33.2442C148.004 33.2504 147.973 33.2535 147.943 33.2535ZM149.642 31.42C149.627 31.42 149.613 31.4214 149.6 31.4245L147.301 31.935C147.276 31.9403 147.244 31.9531 147.231 31.9836C147.219 32.0106 147.223 32.0472 147.244 32.0848L147.695 32.8906C147.749 32.9861 147.883 33.0515 147.985 33.0285L150.284 32.518C150.308 32.5127 150.34 32.4999 150.354 32.4694C150.366 32.4424 150.361 32.4057 150.34 32.3681L149.89 31.5628C149.843 31.4793 149.735 31.42 149.642 31.42Z"
                  fill="#263238"
                />
                <path
                  d="M146.358 32.7938C146.347 32.7938 146.335 32.7921 146.323 32.7881C146.266 32.7682 146.235 32.7094 146.253 32.6524C146.259 32.6329 146.412 32.1741 147.354 32.3611C147.413 32.373 147.452 32.4309 147.44 32.4911C147.428 32.5507 147.371 32.5905 147.31 32.5777C146.583 32.434 146.464 32.7187 146.463 32.7213C146.446 32.7655 146.403 32.7938 146.358 32.7938Z"
                  fill="#263238"
                />
                <path
                  d="M149.25 30.3099C149.276 30.2997 149.298 30.283 149.316 30.26C149.371 30.1892 149.359 30.0867 149.287 30.031C148.571 29.4736 147.852 29.707 147.822 29.7172C147.736 29.7459 147.691 29.8387 147.721 29.924C147.751 30.0089 147.843 30.0549 147.929 30.0261C147.952 30.0186 148.514 29.8423 149.086 30.2874C149.135 30.3249 149.198 30.3316 149.25 30.3099Z"
                  fill="#263238"
                />
                <path
                  d="M144 31.6963C144.051 31.6817 144.094 31.6433 144.11 31.5889C144.326 30.9034 144.89 30.735 144.914 30.7284C145 30.7036 145.05 30.6139 145.025 30.5272C145 30.4411 144.91 30.3902 144.824 30.4141C144.792 30.4234 144.067 30.6307 143.798 31.4895C143.771 31.5752 143.819 31.6672 143.905 31.6946C143.937 31.7047 143.97 31.7047 144 31.6963Z"
                  fill="#263238"
                />
              </svg>
            </div>
          </div>
        </div>
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
