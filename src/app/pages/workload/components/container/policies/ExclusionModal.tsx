import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { Modal } from "react-bootstrap";
import {
  FaCalendar,
  FaComment,
  FaDatabase,
  FaRegCheckSquare,
} from "react-icons/fa";

type Props = {
  isOpen: boolean;
  handleHide: any;
  mode: string;
};

const initialValues = {
  policy_id: "",
  registry_id: "",
  comment: "",
  exp_date: "",
  isSuppresed: false,
};

const reportSchema = Yup.object().shape({
  policy_id: Yup.string().required("Policy is required"),
  registry_id: Yup.string().required("Registry is required"),
  comment: Yup.string()
    .required("Comment is required")
    .min(3, "Minimum 3 characters"),
  exp_date: Yup.string().required("Expiry Date is required"),
});

const ExclusionModal = ({ isOpen, handleHide, mode }: Props) => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues,
    validationSchema: reportSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      console.log(values);
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
          <div className="w-full pb-[16px]  border-bottom flex items-center justify-center flex-col gap-2">
            <div className="bg-[#284CB31A] rounded-full w-12 h-12 flex items-center justify-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.4375 9C5.4375 10.9675 7.03249 12.5625 9 12.5625C10.9675 12.5625 12.5625 10.9675 12.5625 9C12.5625 7.03249 10.9675 5.4375 9 5.4375C7.03249 5.4375 5.4375 7.03249 5.4375 9ZM9 11.4375C7.65381 11.4375 6.5625 10.3462 6.5625 9C6.5625 7.65381 7.65381 6.5625 9 6.5625C10.3462 6.5625 11.4375 7.65381 11.4375 9C11.4375 10.3462 10.3462 11.4375 9 11.4375Z"
                  fill="#284CB3"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.49171 16.8687C9.18592 17.0386 8.81409 17.0386 8.50829 16.8687L2.20829 13.3687C1.88685 13.1901 1.6875 12.8513 1.6875 12.4836L1.68749 5.51316C1.68749 5.14545 1.88684 4.80665 2.20827 4.62807L8.50829 1.12807C8.81409 0.958186 9.18592 0.958185 9.49171 1.12807L15.7917 4.62807C16.1131 4.80665 16.3125 5.14545 16.3125 5.51315L16.3125 12.4836C16.3125 12.8513 16.1131 13.1901 15.7917 13.3687L9.49171 16.8687ZM9 15.8549L15.1875 12.4174L15.1875 5.57935L9 2.14185L2.81249 5.57935L2.8125 12.4174L9 15.8549Z"
                  fill="#284CB3"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.8666 5.18396C15.7157 4.91239 15.3733 4.81455 15.1017 4.96542L11.4267 7.00709C11.1552 7.15796 11.0573 7.50041 11.2082 7.77198C11.3591 8.04355 11.7015 8.14139 11.9731 7.99052L15.6481 5.94885C15.9196 5.79798 16.0175 5.45552 15.8666 5.18396ZM2.15451 5.19581C2.00364 5.46737 2.10149 5.80983 2.37305 5.9607L6.02674 7.99052C6.29831 8.14139 6.64076 8.04354 6.79163 7.77198C6.9425 7.50041 6.84466 7.15796 6.57309 7.00709L2.9194 4.97727C2.64783 4.8264 2.30538 4.92424 2.15451 5.19581Z"
                  fill="#284CB3"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9 16.3125C8.68934 16.3125 8.4375 16.0607 8.4375 15.75V12C8.4375 11.6893 8.68934 11.4375 9 11.4375C9.31066 11.4375 9.5625 11.6893 9.5625 12V15.75C9.5625 16.0607 9.31066 16.3125 9 16.3125Z"
                  fill="#284CB3"
                />
              </svg>
            </div>
            <h1 className="text-[18px] font-semibold">New Exclusion</h1>
            <p
              className={`text-[12px] font-medium ${
                mode === "dark" ? "text-[#FFFFFF]" : "text-[#6A6A6A]"
              }`}
            >
              Suppressions are used to ignore specific checks or images
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
            {/* policy */}
            <div className="w-full">
              <div className="fv-row mb-4 col-sm">
                <label className="mb-[8px] flex text-[14px] font-medium items-center gap-1">
                  <FaRegCheckSquare />
                  <span className="font-semibold">Suppress by Policy</span>
                </label>
                <select
                  {...formik.getFieldProps("policy_id")}
                  className={clsx(
                    "form-control bg-transparent",
                    {
                      "is-invalid":
                        formik.touched.policy_id && formik.errors.policy_id,
                    },
                    {
                      "is-valid":
                        formik.touched.policy_id && !formik.errors.policy_id,
                    }
                  )}
                >
                  <option value="" className="font-medium">
                    Select Rule
                  </option>
                  {/* {countries.map((policy_id) => (
                <option key={policy_id.id} value={policy_id.name}>
                  {policy_id.name}
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
                {formik.touched.policy_id && formik.errors.policy_id && (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      <span role="alert" className="font-medium text-xs">
                        {formik.errors.policy_id}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* registry */}
            <div className="w-full">
              <div className="fv-row mb-4 col-sm">
                <label className="mb-[8px] flex text-[14px] font-medium items-center gap-3">
                  <FaDatabase />
                  <span>Select Registry</span>
                </label>
                <select
                  {...formik.getFieldProps("registry_id")}
                  className={clsx(
                    "form-control bg-transparent",
                    {
                      "is-invalid":
                        formik.touched.registry_id && formik.errors.registry_id,
                    },
                    {
                      "is-valid":
                        formik.touched.registry_id &&
                        !formik.errors.registry_id,
                    }
                  )}
                >
                  <option value="" className="font-medium">
                    All Registry
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
                {formik.touched.registry_id && formik.errors.registry_id && (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      <span role="alert" className="font-medium text-xs">
                        {formik.errors.registry_id}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* description */}
            <div className="w-full">
              <div className="fv-row mb-4 col-sm">
                <label className="flex text-[14px] mb-[8px] font-medium items-center gap-1">
                  <FaComment />
                  <span className="font-semibold">Comment </span>
                </label>
                <textarea
                  placeholder="Write a Note for this suppression"
                  autoComplete="off"
                  {...formik.getFieldProps("comment")}
                  className={clsx(
                    "form-control bg-transparent",
                    {
                      "is-invalid":
                        formik.touched.comment && formik.errors.comment,
                    },
                    {
                      "is-valid":
                        formik.touched.comment && !formik.errors.comment,
                    }
                  )}
                ></textarea>
                {formik.touched.comment && formik.errors.comment && (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      <span role="alert" className="font-medium text-xs">
                        {formik.errors.comment}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* schedule */}
            <div className="w-full">
              <div className="fv-row mb-4 col-sm ">
                <label className="flex text-[14px] font-medium mb-[8px] items-center gap-3">
                  <FaCalendar />
                  <span className="font-semibold">Expiration Date</span>
                </label>
                <input
                  placeholder=""
                  type="date"
                  autoComplete="off"
                  {...formik.getFieldProps("exp_date")}
                  className={clsx(
                    "form-control bg-transparent",
                    {
                      "is-invalid":
                        formik.touched.exp_date && formik.errors.exp_date,
                    },
                    {
                      "is-valid":
                        formik.touched.exp_date && !formik.errors.exp_date,
                    }
                  )}
                />
                {formik.touched.exp_date && formik.errors.exp_date && (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      <span role="alert" className="font-medium text-xs">
                        {formik.errors.exp_date}
                      </span>
                    </div>
                  </div>
                )}
                <p className="mt-[8px] font-medium text-[10px]">
                  Expiration date can make suppression setup temporary or
                  permanent{" "}
                </p>
              </div>
            </div>
            <div className="w-full">
              <div className="fv-row mb-4 col-sm flex gap-[8px]">
                <input
                  type="checkbox"
                  // checked
                  id=""
                  {...formik.getFieldProps("isSuppresed")}
                  className={clsx(
                    "bg-transparent h-5 w-5 rounded-md",
                    {
                      "is-invalid":
                        formik.touched.isSuppresed && formik.errors.isSuppresed,
                    },
                    {
                      "is-valid":
                        formik.touched.isSuppresed &&
                        !formik.errors.isSuppresed,
                    }
                  )}
                />
                <p className="font-medium text-[12px]">
                  Suppress this check until further notice
                </p>
              </div>
            </div>
            <div className="flex items-end justify-end mt-[32px] w-full">
              <button
                type="submit"
                className="rounded-full bg-primary text-white font-medium  py-[8px] px-[24px] w-fit"
                disabled={formik.isSubmitting || !formik.isValid}
              >
                {!loading && (
                  <span className="indicator-label font-medium ">
                    Create Exclusion
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

export default ExclusionModal;
