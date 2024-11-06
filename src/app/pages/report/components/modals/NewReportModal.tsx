import { useState } from "react";
import {
  FaClock,
  FaBars,
  FaDatabase,
  FaCloud,
  FaChartPie,
  FaPaperPlane,
  FaFile,
} from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { Modal } from "react-bootstrap";

const initialValues = {
  title: "",
  description: "",
  target: "",
  type: "",
  provider: "",
  registry: "",
  schedule: "",
  date: "",
  time: "",
};

const reportSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Minimum 3 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(3, "Minimum 3 characters"),
  target: Yup.string()
    .required("Target is required")
    .min(3, "Minimum 3 characters"),
  type: Yup.string().required("Type is required"),
  provider: Yup.string().required("Provider is required"),
  registry: Yup.string().required("Registry is required"),
  schedule: Yup.string().required("required"),
  date: Yup.string().required("required"),
  time: Yup.string().required("required"),
});

const NewReportModal = ({ handleHide, isOpen, mode, handleRefetch }: any) => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues,
    validationSchema: reportSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      console.log(values);
      //   setLoading(true);
      //   mutate(
      //     {
      //       data: {
      //         business_email: values.businessEmail,
      //         country: values.country,
      //         full_name: values.fullName,
      //         password1: values.password,
      //         password2: values.confirmpassword,
      //       },
      //     },
      //     {
      //       onSuccess: (res: any) => {
      //         console.log(res.data, "Successss");
      //         setStatus(null);
      //         login(
      //           {
      //             email: values.businessEmail,
      //             password: values.password,
      //           },
      //           {
      //             onSuccess: (res: any) => {
      //               console.log(res.data, "Successss");
      //               if (res.data.code === 200) {
      //                 console.log(res.data)
      //               }
      //               setStatus(null);
      //             },
      //             onError: (err: any) => {
      //               console.log(err);
      //             //   setLoading(false);
      //               setStatus(err?.response?.data?.message || err?.message);
      //             },
      //           }
      //         );
      //         // sessionStorage.setItem("top-title", "Setup Account");
      //       },
      //       onError: (res: any) => {
      //         console.log(res)
      //         setStatus(res.response.data.message);
      //         // setLoading(false);
      //       },
      //     }
      //   );
    },
  });
  return (
    <>
      <Modal
        show={isOpen}
        onHide={() => {
          handleHide();
          formik.resetForm();
        }}
        keyboard={false}
      >
        <Modal.Header
          closeButton
          className="border-0 pt-3 pr-3 pb-0"
        ></Modal.Header>
        <Modal.Body className="p-0">
          <div className="w-full pb-2  border-bottom flex items-center justify-center flex-col gap-2">
            <div className="bg-[#284CB31A] rounded-full w-12 h-12 flex items-center justify-center">
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
                  fill-opacity="0.05"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.5625 14.0625V27.9375H22.5C22.8107 27.9375 23.0625 28.1893 23.0625 28.5C23.0625 28.8107 22.8107 29.0625 22.5 29.0625H15.45C14.8908 29.0625 14.4375 28.6092 14.4375 28.05V13.95C14.4375 13.3908 14.8908 12.9375 15.45 12.9375H24.1886C24.4571 12.9375 24.7147 13.0442 24.9045 13.2341L27.2659 15.5955C27.4558 15.7853 27.5625 16.0429 27.5625 16.3114V21.75C27.5625 22.0607 27.3107 22.3125 27 22.3125C26.6893 22.3125 26.4375 22.0607 26.4375 21.75V16.358L24.142 14.0625H15.5625Z"
                  fill="#284CB3"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M24 12.9375C24.3107 12.9375 24.5625 13.1893 24.5625 13.5V15.9375H27C27.3107 15.9375 27.5625 16.1893 27.5625 16.5C27.5625 16.8107 27.3107 17.0625 27 17.0625H24.45C23.8908 17.0625 23.4375 16.6092 23.4375 16.05V13.5C23.4375 13.1893 23.6893 12.9375 24 12.9375Z"
                  fill="#284CB3"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M25.8523 28.8977C26.0719 29.1174 26.4281 29.1174 26.6477 28.8977L28.8977 26.6477C29.1174 26.4281 29.1174 26.0719 28.8977 25.8523L26.6477 23.6023C26.4281 23.3826 26.0719 23.3826 25.8523 23.6023C25.6326 23.8219 25.6326 24.1781 25.8523 24.3977L27.142 25.6875H24C23.6893 25.6875 23.4375 25.9393 23.4375 26.25C23.4375 26.5607 23.6893 26.8125 24 26.8125H27.142L25.8523 28.1023C25.6326 28.3219 25.6326 28.6781 25.8523 28.8977Z"
                  fill="#284CB3"
                />
              </svg>
            </div>
            <h1 className="text-[18px] font-semibold">
              Create a report templates
            </h1>
            <p
              className={`text-[12px] font-medium ${
                mode === "dark" ? "text-[#FFFFFF]" : "text-[#6A6A6A]"
              }`}
            >
              Create custom reports for your analysis
            </p>
          </div>
          <form
            className="font-medium w-full p-[24px] flex items-center flex-col gap-y-[16px]"
            onSubmit={formik.handleSubmit}
          >
            {formik.status && (
              <div className="mb-lg-15 alert alert-danger">
                <div className="alert-text font-medium">{formik.status}</div>
              </div>
            )}
            {/* title */}
            <div className="w-full">
              <div className="fv-row mb-4 col-sm">
                <label className="flex text-[14px] font-medium items-center gap-1">
                  <FaFile />
                  <span className="font-semibold">Report Title</span>
                </label>
                <input
                  placeholder="Title"
                  type="text"
                  autoComplete="off"
                  {...formik.getFieldProps("title")}
                  className={clsx(
                    "form-control bg-transparent",
                    {
                      "is-invalid": formik.touched.title && formik.errors.title,
                    },
                    {
                      "is-valid": formik.touched.title && !formik.errors.title,
                    }
                  )}
                />
                {formik.touched.title && formik.errors.title && (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      <span role="alert" className="font-medium text-xs">
                        {formik.errors.title}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* description */}
            <div className="w-full">
              <div className="fv-row mb-4 col-sm">
                <label className="flex text-[14px] font-medium items-center gap-1">
                  <FaBars />
                  <span className="font-semibold">Description</span>
                </label>
                <textarea
                  placeholder="Description"
                  autoComplete="off"
                  {...formik.getFieldProps("description")}
                  className={clsx(
                    "form-control bg-transparent",
                    {
                      "is-invalid":
                        formik.touched.description && formik.errors.description,
                    },
                    {
                      "is-valid":
                        formik.touched.description &&
                        !formik.errors.description,
                    }
                  )}
                ></textarea>
                {formik.touched.description && formik.errors.description && (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      <span role="alert" className="font-medium text-xs">
                        {formik.errors.description}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* target */}
            <div className="w-full">
              <div className="fv-row mb-4 col-sm">
                <label className="flex text-[14px] font-medium items-center gap-1">
                  <FaPaperPlane />
                  <span className="font-semibold">Report Target</span>
                </label>
                <input
                  placeholder="Where would you like this report to be sent to ?"
                  type="text"
                  autoComplete="off"
                  {...formik.getFieldProps("target")}
                  className={clsx(
                    "form-control bg-transparent",
                    {
                      "is-invalid":
                        formik.touched.target && formik.errors.target,
                    },
                    {
                      "is-valid":
                        formik.touched.target && !formik.errors.target,
                    }
                  )}
                />
                {formik.touched.target && formik.errors.target && (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      <span role="alert" className="font-medium text-xs">
                        {formik.errors.target}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* type */}
            <div className="w-full">
              <div className="fv-row mb-4 col-sm">
                <label className="flex text-[14px] font-medium items-center gap-3">
                  <FaChartPie />
                  <span>Report type</span>
                </label>
                <select
                  {...formik.getFieldProps("type")}
                  className={clsx(
                    "form-control bg-transparent",
                    {
                      "is-invalid": formik.touched.type && formik.errors.type,
                    },
                    {
                      "is-valid": formik.touched.type && !formik.errors.type,
                    }
                  )}
                >
                  <option value="" className="font-medium">
                    Select type
                  </option>
                  {/* {countries.map((type) => (
                <option key={type.id} value={type.name}>
                  {type.name}
                </option>
              ))} */}
                  <option value="first" className="font-medium">
                    First
                  </option>
                  <option value="second" className="font-medium">
                    Second
                  </option>
                  <option value="third" className="font-medium">
                    Third
                  </option>
                </select>
                {formik.touched.type && formik.errors.type && (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      <span role="alert" className="font-medium text-xs">
                        {formik.errors.type}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* provider */}
            <div className="w-full">
              <div className="fv-row mb-4 col-sm">
                <label className="flex text-[14px] font-medium items-center gap-3">
                  <FaCloud />
                  <span>Cloud Provider</span>
                </label>
                <select
                  {...formik.getFieldProps("provider")}
                  className={clsx(
                    "form-control bg-transparent",
                    {
                      "is-invalid":
                        formik.touched.provider && formik.errors.provider,
                    },
                    {
                      "is-valid":
                        formik.touched.provider && !formik.errors.provider,
                    }
                  )}
                >
                  <option value="" className="font-medium">
                    Select provider
                  </option>
                  <option value="AWS" className="font-medium">
                    AWS
                  </option>
                  <option value="GCP" className="font-medium">
                    GCP
                  </option>
                  <option value="AZURE" className="font-medium">
                    AZURE
                  </option>
                </select>
                {formik.touched.provider && formik.errors.provider && (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      <span role="alert" className="font-medium text-xs">
                        {formik.errors.provider}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* registry */}
            <div className="w-full">
              <div className="fv-row mb-4 col-sm">
                <label className="flex text-[14px] font-medium items-center gap-3">
                  <FaDatabase />
                  <span>Container Registry</span>
                </label>
                <select
                  {...formik.getFieldProps("registry")}
                  className={clsx(
                    "form-control bg-transparent",
                    {
                      "is-invalid":
                        formik.touched.registry && formik.errors.registry,
                    },
                    {
                      "is-valid":
                        formik.touched.registry && !formik.errors.registry,
                    }
                  )}
                >
                  <option value="" className="font-medium">
                    Select registry
                  </option>
                  <option value="First" className="font-medium">
                    First Registry
                  </option>
                  <option value="Second" className="font-medium">
                    Second Registry
                  </option>
                  <option value="Third" className="font-medium">
                    Third Registry
                  </option>
                </select>
                {formik.touched.registry && formik.errors.registry && (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      <span role="alert" className="font-medium text-xs">
                        {formik.errors.registry}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* schedule */}
            <div className="w-full">
              <div className="fv-row mb-4 col-sm">
                <label className="flex text-[14px] font-medium items-center gap-3">
                  <FaClock />
                  <span>Scheduled date</span>
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <select
                      {...formik.getFieldProps("schedule")}
                      className={clsx(
                        "form-control bg-transparent",
                        {
                          "is-invalid":
                            formik.touched.schedule && formik.errors.schedule,
                        },
                        {
                          "is-valid":
                            formik.touched.schedule && !formik.errors.schedule,
                        }
                      )}
                    >
                      <option value="" className="font-medium">
                        Select
                      </option>
                      <option value="daily" className="font-medium">
                        Daily
                      </option>
                      <option value="weekly" className="font-medium">
                        Weekly
                      </option>
                      <option value="monthly" className="font-medium">
                        Monthly
                      </option>
                    </select>
                    {formik.touched.schedule && formik.errors.schedule && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert" className="font-medium text-xs">
                            {formik.errors.schedule}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      placeholder=""
                      type="date"
                      autoComplete="off"
                      {...formik.getFieldProps("date")}
                      className={clsx(
                        "form-control bg-transparent",
                        {
                          "is-invalid":
                            formik.touched.date && formik.errors.date,
                        },
                        {
                          "is-valid":
                            formik.touched.date && !formik.errors.date,
                        }
                      )}
                    />
                    {formik.touched.date && formik.errors.date && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert" className="font-medium text-xs">
                            {formik.errors.date}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      placeholder=""
                      type="time"
                      autoComplete="off"
                      {...formik.getFieldProps("time")}
                      className={clsx(
                        "form-control bg-transparent",
                        {
                          "is-invalid":
                            formik.touched.time && formik.errors.time,
                        },
                        {
                          "is-valid":
                            formik.touched.time && !formik.errors.time,
                        }
                      )}
                    />
                    {formik.touched.time && formik.errors.time && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert" className="font-medium text-xs">
                            {formik.errors.time}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-end justify-end mt-[32px] w-full">
              <button
                type="submit"
                className="rounded-full bg-primary text-white font-medium  py-[12px] px-[24px] w-fit"
                disabled={formik.isSubmitting || !formik.isValid}
              >
                {!loading && (
                  <span className="indicator-label font-medium ">
                    Create Templates
                  </span>
                )}
                {loading && (
                  <span
                    className="indicator-progress"
                    style={{ display: "block" }}
                  >
                    Please wait...{" "}
                    <span className=" font-medium spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                )}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewReportModal;
