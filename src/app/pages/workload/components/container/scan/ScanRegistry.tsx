import React, { useState } from "react";
import scanimg from "../../../../../../../public/media/logos/imagescan.svg";
import dockerimg from "../../../../../../../public/media/logos/docker.svg";
import { useFormik, Formik } from "formik";
import clsx from "clsx";
import * as Yup from "yup";
import { FaBars, FaClock, FaDatabase, FaGlobe, FaServer } from "react-icons/fa";
import { Link } from "react-router-dom";

type Props = {
  goBack: any;
  mode: string;
};

const scanSchema = Yup.object().shape({
  registry_id: Yup.string().required("registry is required"),
  policy_id: Yup.string().required("policy is required"),
  image_id: Yup.string().required("image is required"),
  frequency: Yup.string().required("scan frequency is  required"),
});

const ScanRegistry = ({ goBack, mode }: Props) => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="px-8 mt-[32px] w-full">
      <div className="flex items-center justify-between flex-col md:flex-row gap-[16px]">
        <div className="flex items-center flex-col md:flex-row gap-[16px]">
          <div className="flex items-center gap-[16px] border-end pr-[16px]">
            <button onClick={goBack}>
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.5303 5.96967C12.8232 6.26256 12.8232 6.73744 12.5303 7.03033L7.81066 11.75H18.5C18.9142 11.75 19.25 12.0858 19.25 12.5C19.25 12.9142 18.9142 13.25 18.5 13.25H7.81066L12.5303 17.9697C12.8232 18.2626 12.8232 18.7374 12.5303 19.0303C12.2374 19.3232 11.7626 19.3232 11.4697 19.0303L5.46967 13.0303C5.17678 12.7374 5.17678 12.2626 5.46967 11.9697L11.4697 5.96967C11.7626 5.67678 12.2374 5.67678 12.5303 5.96967Z"
                  fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                />
              </svg>
            </button>
            <h1 className="font-semibold text-[14px]">
              Scan Registry / Image
            </h1>
          </div>
          <p
            className={`${
              mode === "dark"
                ? "text-[#EAEAEA]"
                : "text-[#6A6A6A] border-end font-medium text-[12px] pr-[16px] py-[2px]"
            }`}
          >
            Ensure compliance and protect your Workload and containers
          </p>
        </div>
      </div>
      <div className="flex items-start justify-between w-full md:flex-row gap-[24px] flex-col mt-[32px]">
        <div
          className={`${
            mode === "dark" ? "bg-lightDark" : "bg-white"
          } border rounded-[12px] p-[32px] shadow-md md:w-[55%]`}
        >
          <div className="flex items-center gap-[16px]">
            <img src={scanimg} alt="cloud with search icon" />
            <h2 className="font-bold text-[18px]">Initiate New Image Scan</h2>
          </div>
          <div className="mt-[40px]">
            <Formik
              initialValues={{
                registry_id: "",
                policy_id: "",
                frequency: "",
                image_id: "",
              }}
              validationSchema={scanSchema}
              onSubmit={async (values) => {
                setLoading(true);
                console.log(values);
                setLoading(false);
              }}
            >
              {(form) => (
                <form onSubmit={form.handleSubmit}>
                  {/* policy_id */}
                  <div className="form-group mb-[32px]">
                    <label
                      htmlFor="policy_id"
                      className="flex items-center gap-[8px]"
                    >
                      <FaBars />
                      <p className="font-semibold text-[14px]">
                        Compliant Policy
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
                            form.touched.policy_id && !form.errors.policy_id,
                        }
                      )}
                    >
                      <option value="" className="font-medium">
                        Select a policy to use
                      </option>
                      {[
                        {
                          id: "AWS",
                          name: "Policy One",
                        },
                        {
                          id: "AZURE",
                          name: "Policy Two",
                        },
                        {
                          id: "GPC",
                          name: "Policy Three",
                        },
                      ].map((provider) => (
                        <option
                          key={provider.name}
                          value={provider.id}
                          className="font-medium"
                        >
                          {provider.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* registry_id */}
                  <div className="form-group mb-[32px]">
                    <label
                      htmlFor="policy_id"
                      className="flex items-center gap-[8px]"
                    >
                      <FaServer />
                      <p className="font-semibold text-[14px]">
                        Select Registry
                      </p>
                    </label>
                    <select
                      autoComplete="off"
                      {...form.getFieldProps("registry_id")}
                      className={clsx(
                        "form-control bg-transparent w-full h-45px mt-2",
                        {
                          "is-invalid":
                            form.touched.registry_id && form.errors.registry_id,
                        },
                        {
                          "is-valid":
                            form.touched.registry_id &&
                            !form.errors.registry_id,
                        }
                      )}
                    >
                      <option value="" className="font-medium">
                        Select
                      </option>
                      {[
                        {
                          id: "AWS",
                          name: "Registry One",
                        },
                        {
                          id: "AZURE",
                          name: "Registry Two",
                        },
                        {
                          id: "GPC",
                          name: "Registry Three",
                        },
                      ].map((provider) => (
                        <option
                          key={provider.name}
                          value={provider.id}
                          className="font-medium"
                        >
                          {provider.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* image_id */}
                  <div className="form-group mb-[32px]">
                    <label
                      htmlFor="policy_id"
                      className="flex items-center gap-[8px]"
                    >
                      <FaDatabase />
                      <p className="font-semibold text-[14px]">
                        Select an Image
                      </p>
                    </label>
                    <select
                      autoComplete="off"
                      {...form.getFieldProps("image_id")}
                      className={clsx(
                        "form-control bg-transparent w-full h-45px mt-2",
                        {
                          "is-invalid":
                            form.touched.image_id && form.errors.image_id,
                        },
                        {
                          "is-valid":
                            form.touched.image_id && !form.errors.image_id,
                        }
                      )}
                    >
                      <option value="" className="font-medium">
                        All Images
                      </option>
                      {[
                        {
                          id: "AWS",
                          name: "Image One",
                        },
                        {
                          id: "AZURE",
                          name: "Image Two",
                        },
                        {
                          id: "GPC",
                          name: "Image Three",
                        },
                      ].map((provider) => (
                        <option
                          key={provider.name}
                          value={provider.id}
                          className="font-medium"
                        >
                          {provider.name}
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
                      <FaClock
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
                            form.touched.frequency && !form.errors.frequency,
                        }
                      )}
                    >
                      <option value="" className="font-medium">
                        Select Frequency
                      </option>
                      {[
                        "once",
                        "weekly",
                        "monthly",
                        "yearly",
                        "bi-annually",
                      ].map((region) => (
                        <option
                          key={region}
                          value={region}
                          className="font-medium"
                        >
                          {region}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="px-[24px] py-[12px] font-medium rounded-full bg-primary text-white text-[14px] w-full flex items-center justify-center"
                    disabled={
                      loading ||
                      !form.isValid ||
                      !form.values.frequency ||
                      !form.values.policy_id ||
                      !form.values.image_id ||
                      !form.values.registry_id
                    }
                  >
                    {!loading && (
                      <span className="indicator-label flex items-center">
                        Scan
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
            className={`${
              mode === "dark" ? "bg-lightDark" : "bg-white"
            } border rounded-[12px] mb-[24px]`}
          >
            <div className="flex border-bottom items-center justify-between w-full px-[24px] py-[16px]">
              <h3 className="font-medium text-[14px]">Latest Image Scan</h3>
              <p
                className={`${
                  mode === "dark" ? "text-[#EAEAEA]" : "text-[#373737]"
                } font-medium text-[12px]`}
              >
                2/3/2024 12:00PM
              </p>
            </div>
            <div className="px-[24px] py-[16px]">
              <div className="flex items-center justify-between mb-[24px]">
                <div className="flex items-center gap-[8px]">
                  <img src={dockerimg} alt="docker logo" className="w-8 h-8" />
                  <h1 className="text-[18px] text-start font-semibold">
                    Gilotec Prod -Docker
                  </h1>
                </div>
                <span className="bg-[#284CB31A] text-[10px] text-primary rounded-full px-[10px] py-[2px] font-semibold">
                  Manual
                </span>
              </div>
              <div className="mb-[24px]">
                <div className="flex items-center gap-[8px] mb-[12px]">
                  <FaDatabase />
                  <h1 className="text-[12px] text-start font-semibold">
                    All Images and containers
                  </h1>
                </div>
                <div className="flex items-center gap-[8px] mb-[32px]">
                  <FaBars />
                  <h1 className="text-[12px] text-start font-semibold">
                    Workload Vulnerability Default 1.0
                  </h1>
                </div>
              </div>
              <div className="w-full">
                <h1 className="text-[14px] text-start font-medium mb-[16px]">
                  <span className="font-bold">1,082</span> checks performed
                </h1>
                <div className="flex items-center gap-[8px] mb-[16px]">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.923205 9.3C0.816026 9.11436 0.816025 8.88564 0.923205 8.7L4.70179 2.15529C4.80897 1.96965 5.00705 1.85529 5.22141 1.85529H12.7786C12.9929 1.85529 13.191 1.96965 13.2982 2.15529L17.0768 8.7C17.184 8.88564 17.184 9.11436 17.0768 9.3L13.2982 15.8447C13.191 16.0303 12.9929 16.1447 12.7786 16.1447H5.22141C5.00705 16.1447 4.80897 16.0304 4.70179 15.8447L0.923205 9.3Z"
                      stroke="#FF161A"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 6L9 9"
                      stroke="#FF161A"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 12.0075L9.0075 11.9992"
                      stroke="#FF161A"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <h1 className="text-[14px] text-start font-medium">
                    <span className="font-bold text-[#FF161A]">18</span>
                     Vulnerabilities Found
                  </h1>
                </div>
                <Link
                  //   to={`/monitoring/resource-scanning/${data?.policy_run?.id}`}
                  to={`/monitoring/resource-scanning/1`}
                  className="block w-fit mt-6 font-medium text-[12px]"
                >
                  <p className="underline">view report</p>
                </Link>
              </div>
            </div>
          </div>
          <div
            className={`${
              mode === "dark" ? "bg-lightDark" : "bg-white"
            } border rounded-[12px] px-[24px] py-[16px]`}
          >
            <div className="flex items-center gap-[8px] mb-[12px]">
              <img src={dockerimg} alt="docker logo" className="w-6 h-6" />
              <h1 className="text-[14px] text-start font-semibold">
                Gilotec Prod -Docker
              </h1>
            </div>
            <div className="flex items-center justify-between">
              <div className="">
                <div className="flex items-center gap-[8px] mb-[12px]">
                  <FaDatabase />
                  <h1 className="text-[10px] text-start font-semibold">
                    All Images and containers
                  </h1>
                </div>
                <div className="flex items-center gap-[8px]">
                  <FaGlobe />
                  <h1 className="text-[10px] text-start font-semibold">
                    All Region
                  </h1>
                </div>
              </div>
              <svg
                width="45"
                height="45"
                viewBox="0 0 45 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M45 22.5C45 34.9264 34.9264 45 22.5 45C10.0736 45 0 34.9264 0 22.5C0 10.0736 10.0736 0 22.5 0C34.9264 0 45 10.0736 45 22.5ZM5.625 22.5C5.625 31.8198 13.1802 39.375 22.5 39.375C31.8198 39.375 39.375 31.8198 39.375 22.5C39.375 13.1802 31.8198 5.625 22.5 5.625C13.1802 5.625 5.625 13.1802 5.625 22.5Z"
                  fill="url(#paint0_linear_2325_10333)"
                />
                <path
                  d="M9.04833 4.46385C5.81074 6.8785 3.2828 10.1201 1.7298 13.8485C0.176803 17.5768 -0.343986 21.6545 0.222089 25.6535C0.788163 29.6525 2.42023 33.4254 4.94701 36.5763C7.47378 39.7272 10.8021 42.1398 14.5827 43.561L16.562 38.2958C13.7266 37.2299 11.2303 35.4204 9.33525 33.0572C7.44017 30.6941 6.21612 27.8644 5.79157 24.8651C5.36701 21.8659 5.7576 18.8076 6.92235 16.0114C8.0871 13.2151 9.98306 10.7839 12.4113 8.97289L9.04833 4.46385Z"
                  fill="#4470EF"
                />
                <path
                  d="M15.232 20.504L14.112 21.424L13.552 20.76L15.32 19.336H16.192V25H15.232V20.504ZM19.2268 25L20.6828 22.896L20.6748 22.888C20.5948 22.9253 20.4961 22.952 20.3788 22.968C20.2668 22.984 20.1628 22.992 20.0668 22.992C19.8161 22.992 19.5815 22.9467 19.3628 22.856C19.1441 22.76 18.9521 22.632 18.7868 22.472C18.6215 22.3067 18.4908 22.1147 18.3948 21.896C18.3041 21.672 18.2588 21.432 18.2588 21.176C18.2588 20.8773 18.3121 20.6053 18.4188 20.36C18.5255 20.1147 18.6695 19.9067 18.8508 19.736C19.0375 19.56 19.2561 19.4267 19.5068 19.336C19.7628 19.24 20.0348 19.192 20.3228 19.192C20.6161 19.192 20.8881 19.2427 21.1388 19.344C21.3948 19.44 21.6161 19.576 21.8028 19.752C21.9895 19.928 22.1335 20.136 22.2348 20.376C22.3415 20.6107 22.3948 20.864 22.3948 21.136C22.3948 21.296 22.3815 21.448 22.3548 21.592C22.3281 21.7307 22.2881 21.8667 22.2348 22C22.1868 22.128 22.1255 22.2587 22.0508 22.392C21.9815 22.5253 21.9015 22.664 21.8108 22.808L20.3948 25H19.2268ZM21.4188 21.112C21.4188 20.9627 21.3921 20.8213 21.3388 20.688C21.2908 20.5547 21.2188 20.4373 21.1228 20.336C21.0268 20.2293 20.9121 20.1467 20.7788 20.088C20.6455 20.024 20.4961 19.992 20.3308 19.992C20.0055 19.992 19.7415 20.0987 19.5388 20.312C19.3415 20.52 19.2428 20.792 19.2428 21.128C19.2428 21.288 19.2668 21.4373 19.3148 21.576C19.3681 21.7093 19.4428 21.824 19.5388 21.92C19.6348 22.016 19.7468 22.0933 19.8748 22.152C20.0081 22.2053 20.1548 22.232 20.3148 22.232C20.4748 22.232 20.6215 22.2053 20.7548 22.152C20.8935 22.0987 21.0108 22.024 21.1068 21.928C21.2081 21.8267 21.2855 21.7067 21.3388 21.568C21.3921 21.4293 21.4188 21.2773 21.4188 21.112ZM26.9096 23.608C26.9096 23.4 26.947 23.208 27.0216 23.032C27.1016 22.8507 27.2083 22.6933 27.3416 22.56C27.4803 22.4213 27.6376 22.3147 27.8136 22.24C27.995 22.16 28.1896 22.12 28.3976 22.12C28.6056 22.12 28.7976 22.16 28.9736 22.24C29.155 22.3147 29.3123 22.4213 29.4456 22.56C29.5843 22.6933 29.691 22.8507 29.7656 23.032C29.8456 23.208 29.8856 23.4 29.8856 23.608C29.8856 23.816 29.8456 24.0107 29.7656 24.192C29.691 24.368 29.5843 24.5253 29.4456 24.664C29.3123 24.7973 29.155 24.904 28.9736 24.984C28.7976 25.0587 28.6056 25.096 28.3976 25.096C28.1896 25.096 27.995 25.0587 27.8136 24.984C27.6376 24.904 27.4803 24.7973 27.3416 24.664C27.2083 24.5253 27.1016 24.368 27.0216 24.192C26.947 24.0107 26.9096 23.816 26.9096 23.608ZM29.1176 23.608C29.1176 23.4053 29.0483 23.2347 28.9096 23.096C28.771 22.9573 28.6003 22.888 28.3976 22.888C28.195 22.888 28.0243 22.9573 27.8856 23.096C27.747 23.2347 27.6776 23.4053 27.6776 23.608C27.6776 23.8107 27.747 23.9813 27.8856 24.12C28.0243 24.2587 28.195 24.328 28.3976 24.328C28.6003 24.328 28.771 24.2587 28.9096 24.12C29.0483 23.9813 29.1176 23.8107 29.1176 23.608ZM23.0856 20.728C23.0856 20.52 23.123 20.328 23.1976 20.152C23.2776 19.9707 23.3843 19.8133 23.5176 19.68C23.6563 19.5413 23.8136 19.4347 23.9896 19.36C24.171 19.28 24.3656 19.24 24.5736 19.24C24.7816 19.24 24.9736 19.28 25.1496 19.36C25.331 19.4347 25.4883 19.5413 25.6216 19.68C25.7603 19.8133 25.867 19.9707 25.9416 20.152C26.0216 20.328 26.0616 20.52 26.0616 20.728C26.0616 20.936 26.0216 21.1307 25.9416 21.312C25.867 21.488 25.7603 21.6453 25.6216 21.784C25.4883 21.9173 25.331 22.024 25.1496 22.104C24.9736 22.1787 24.7816 22.216 24.5736 22.216C24.3656 22.216 24.171 22.1787 23.9896 22.104C23.8136 22.024 23.6563 21.9173 23.5176 21.784C23.3843 21.6453 23.2776 21.488 23.1976 21.312C23.123 21.1307 23.0856 20.936 23.0856 20.728ZM25.2936 20.728C25.2936 20.5253 25.2243 20.3547 25.0856 20.216C24.947 20.0773 24.7763 20.008 24.5736 20.008C24.371 20.008 24.2003 20.0773 24.0616 20.216C23.923 20.3547 23.8536 20.5253 23.8536 20.728C23.8536 20.9307 23.923 21.1013 24.0616 21.24C24.2003 21.3787 24.371 21.448 24.5736 21.448C24.7763 21.448 24.947 21.3787 25.0856 21.24C25.2243 21.1013 25.2936 20.9307 25.2936 20.728ZM27.8136 19.08L28.4776 19.384L25.1496 25.256L24.4856 24.952L27.8136 19.08Z"
                  fill="#373737"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_2325_10333"
                    x1="0"
                    y1="0"
                    x2="49.4904"
                    y2="39.3527"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.198551" stopColor="white" />
                    <stop offset="0.683389" stopColor="#DADADA" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanRegistry;
