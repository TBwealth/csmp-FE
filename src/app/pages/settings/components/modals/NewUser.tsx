import React from "react";
import { Modal } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { FaEnvelope, FaUser } from "react-icons/fa";

const initialValues = {
  email: "",
  role: "",
  isAdmin: false,
};

const newUserSchema = Yup.object().shape({
  email: Yup.string()
    .email("wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
  role: Yup.string().required("Role is required"),
  isAdmin: Yup.boolean(),
});

const NewUser = ({ isOpen, handleHide, mode }: any) => {
  const formik = useFormik({
    initialValues,
    validationSchema: newUserSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  return (
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
      <Modal.Body>
        <div className="w-full mb-3 pb-3 border-bottom flex items-center justify-center flex-col gap-2">
          <div className="bg-[#284CB31A] rounded-full mb-[16px] w-12 h-12 flex items-center justify-center">
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
                d="M9 9.5625C6.41117 9.5625 4.3125 11.6612 4.3125 14.25V15C4.3125 15.3107 4.06066 15.5625 3.75 15.5625C3.43934 15.5625 3.1875 15.3107 3.1875 15V14.25C3.1875 11.0398 5.78984 8.4375 9 8.4375C12.2102 8.4375 14.8125 11.0398 14.8125 14.25V15C14.8125 15.3107 14.5607 15.5625 14.25 15.5625C13.9393 15.5625 13.6875 15.3107 13.6875 15V14.25C13.6875 11.6612 11.5888 9.5625 9 9.5625Z"
                fill="#284CB3"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 3.5625C7.65381 3.5625 6.5625 4.65381 6.5625 6C6.5625 7.34619 7.65381 8.4375 9 8.4375C10.3462 8.4375 11.4375 7.34619 11.4375 6C11.4375 4.65381 10.3462 3.5625 9 3.5625ZM5.4375 6C5.4375 4.03249 7.03249 2.4375 9 2.4375C10.9675 2.4375 12.5625 4.03249 12.5625 6C12.5625 7.96751 10.9675 9.5625 9 9.5625C7.03249 9.5625 5.4375 7.96751 5.4375 6Z"
                fill="#284CB3"
              />
            </svg>
          </div>
          <h1 className="text-[18px] font-semibold">Add New Users</h1>
          <p
            className={`text-[12px] font-medium ${
              mode === "dark" ? "text-[#FFFFFF]" : "text-[#6A6A6A]"
            }`}
          >
            Invite new users to your account and give them roles and permission
          </p>
        </div>
        <form
          className="text-[#373737]"
          id="kt_login_signup_form"
          onSubmit={formik.handleSubmit}
        >
          {formik.status && (
            <div className="mb-lg-15 alert alert-danger">
              <div className="alert-text font-medium">{formik.status}</div>
            </div>
          )}
          <div className="fv-row mb-4 col-sm">
            <label className="mb-[8px] flex text-[14px] font-medium items-center gap-3">
              <FaEnvelope />
              <span>Email</span>
            </label>
            <input
              placeholder=""
              type="text"
              autoComplete="off"
              {...formik.getFieldProps("email")}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid": formik.touched.email && formik.errors.email,
                },
                {
                  "is-valid": formik.touched.email && !formik.errors.email,
                }
              )}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert" className="font-medium text-xs">
                    {formik.errors.email}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="fv-row mb-4 col-sm">
            <label className="mb-[8px] flex text-[14px] font-medium items-center gap-3">
              <FaUser />
              <span>Select Role</span>
            </label>
            <select
              {...formik.getFieldProps("role")}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid": formik.touched.role && formik.errors.role,
                },
                {
                  "is-valid": formik.touched.role && !formik.errors.role,
                }
              )}
            >
              <option value="" className="font-medium">
                Select role
              </option>
              {/* {countries.map((country) => (
                <option key={country.id} value={country.name}>
                  {country.name}
                </option>
              ))} */}
            </select>
            {formik.touched.role && formik.errors.role && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert" className="font-medium text-xs">
                    {formik.errors.role}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="fv-row mb-4 col-sm">
            <label
              htmlFor="make_admin"
              className="flex text-[14px] font-medium items-center gap-3"
            >
              <input
                type="checkbox"
                name="make_admin"
                id="make_admin"
                className="w-5 h-5"
              />
              <div className="flex items-center gap-[12px]">
                <span>Make this role a super admin</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_2385_9856)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.729492 6.9974C0.729492 3.53411 3.53704 0.726562 7.00033 0.726562C10.4636 0.726562 13.2712 3.53411 13.2712 6.9974C13.2712 10.4607 10.4636 13.2682 7.00033 13.2682C3.53704 13.2682 0.729492 10.4607 0.729492 6.9974ZM7.00033 6.26823C7.24195 6.26823 7.43783 6.46411 7.43783 6.70573V9.6224C7.43783 9.86402 7.24195 10.0599 7.00033 10.0599C6.7587 10.0599 6.56283 9.86402 6.56283 9.6224V6.70573C6.56283 6.46411 6.7587 6.26823 7.00033 6.26823ZM7.33135 4.6645C7.49299 4.4849 7.47843 4.20828 7.29883 4.04664C7.11924 3.885 6.84261 3.89956 6.68097 4.07916L6.67514 4.08564C6.5135 4.26524 6.52806 4.54186 6.70766 4.7035C6.88726 4.86514 7.16388 4.85058 7.32552 4.67098L7.33135 4.6645Z"
                      fill="#6A6A6A"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2385_9856">
                      <rect width="14" height="14" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </label>
          </div>
          <button
            type="button"
            className="flex items-center gap-[8px] mt-[32px] "
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_2385_9949)">
                <rect
                  x="4"
                  y="2"
                  width="32"
                  height="32"
                  rx="16"
                  fill="#6A6A6A"
                />
                <path
                  d="M15.5 18H20M24.5 18H20M20 18V13.5M20 18V22.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_2385_9949"
                  x="0"
                  y="0"
                  width="40"
                  height="40"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="2" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.156863 0 0 0 0 0.298039 0 0 0 0 0.701961 0 0 0 0.05 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_2385_9949"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_2385_9949"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
            <span
              className={`font-medium ${
                mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
              } text-[12px] underline`}
            >
              Add another user
            </span>
          </button>
          <div className="flex items-end justify-end pt-[24px]">
            <button
              type="button"
              className="bg-primary rounded-full text-white font-medium text-[12px] px-[24px] py-[8px] "
              onClick={() => {
                handleHide();
                formik.resetForm();
              }}
            >
              Send Invite
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default NewUser;
