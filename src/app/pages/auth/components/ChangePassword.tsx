import React from "react";
import { FaChevronLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import clsx from "clsx";
import { useAccountPasswordChange } from "../../../api/api-services/accountQuery";
import axios from "axios";

const initialValues = {
  new_password1: "",
  new_password2: "",
};

const changePasswordSchema = Yup.object().shape({
  new_password1: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Password is required"),
  new_password2: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Password confirmation is required")
    .oneOf(
      [Yup.ref("new_password1")],
      "Password and Confirm Password didn't match"
    ),
});
const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const id = search.get("id");
  const [isOpen, setIsOpen] = useState(false);
  const [active, setIsActive] = useState(false);
  const { mutate, isLoading } = useAccountPasswordChange();
  const [activeConfirm, setIsActiveConfirm] = useState(false);

  const handleChangePassword = async (setStatus: any, payload: any) => {
    try {
      const resp = await axios.post(
        "https://cspm-api.midrapps.com/accounts/api/forgot_password_change/",
        payload
      );
      if (resp.status === 201) {
        setLoading(false);
        setStatus(null);
        navigate("/login");
      }
    } catch (err: any) {
      setStatus(err.response.data.message);
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: changePasswordSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      if (id) {
        const data = {
          id,
          password1: values.new_password1,
          password2: values.new_password2,
        };
        handleChangePassword(setStatus, data);
      } else {
        mutate(
          {
            data: {
              new_password1: values.new_password1,
              new_password2: values.new_password2,
            },
          },
          {
            onSuccess: (res: any) => {
              console.log(res.data, "Successss");
              setLoading(false);
              setStatus(null);
              // sessionStorage.setItem("top-title", "Setup Account");
            },
            onError: (res: any) => {
              setStatus(res.response.data.message);
              setLoading(false);
            },
          }
        );
      }
    },
  });

  return (
    <div className="mt-[32px]">
      <div
        className={`w-full ${
          id
            ? "md:w-full flex items-center justify-center h-[90vh]"
            : "md:w-[50%]"
        }`}
      >
        <form
          className="text-[#373737] w-[80%] lg:w-[65%] mx-auto"
          id="kt_login_signup_form"
          onSubmit={formik.handleSubmit}
        >
          {id ? (
            <div className="separator separator-content my-14">
              <span className="w-full  text-[12px] md:text-[18px] font-medium">
                Change Password
              </span>
            </div>
          ) : (
            <button onClick={() => navigate(-1)} className="block w-fit mb-10">
              <FaChevronLeft size={22} />
            </button>
          )}

          {formik.status && (
            <div className="mb-lg-15 alert alert-danger">
              <div className="alert-text font-medium">{formik.status}</div>
            </div>
          )}
          <div className="">
            {" "}
            {/* begin::Form group Password */}
            <div className="fv-row mb-4 col-sm" data-kt-password-meter="true">
              <div className="mb-1">
                <label className="flex text-[14px] font-medium items-center gap-3">
                  <span>Password</span>
                </label>
                <div className="position-relative mb-3">
                  <input
                    type={active ? "text" : "password"}
                    placeholder=""
                    autoComplete="off"
                    {...formik.getFieldProps("new_password1")}
                    className={clsx(
                      "form-control bg-transparent",
                      {
                        "is-invalid":
                          formik.touched.new_password1 &&
                          formik.errors.new_password1,
                      },
                      {
                        "is-valid":
                          formik.touched.new_password1 &&
                          !formik.errors.new_password1,
                      }
                    )}
                  />
                  {
                    <button
                      type="button"
                      className="absolute right-10 top-5 bg-transparent cursor-pointer"
                      onClick={() => setIsActive(!active)}
                    >
                      {active ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  }
                  {formik.touched.new_password1 &&
                    formik.errors.new_password1 && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert" className="font-medium text-xs">
                            {formik.errors.new_password1}
                          </span>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
            {/* end::Form group */}
            {/* begin::Form group Confirm password */}
            <div className="fv-row mb-4 col-sm relative">
              <label className="flex font-medium text-[14px] items-center gap-3">
                <span>Confirm Password</span>
              </label>
              {
                <button
                  type="button"
                  className="absolute right-10 top-12 bg-transparent cursor-pointer"
                  onClick={() => setIsActiveConfirm(!activeConfirm)}
                >
                  {activeConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              }
              <input
                type={activeConfirm ? "text" : "password"}
                placeholder=""
                autoComplete="off"
                {...formik.getFieldProps("new_password2")}
                className={clsx(
                  "form-control bg-transparent",
                  {
                    "is-invalid":
                      formik.touched.new_password2 &&
                      formik.errors.new_password2,
                  },
                  {
                    "is-valid":
                      formik.touched.new_password2 &&
                      !formik.errors.new_password2,
                  }
                )}
              />
              {formik.touched.new_password2 && formik.errors.new_password2 && (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">
                    <span role="alert" className="font-medium text-xs">
                      {formik.errors.new_password2}
                    </span>
                  </div>
                </div>
              )}
            </div>
            {/* end::Form group */}
          </div>
          <div className="row mt-12">
            <button
              type="submit"
              id="kt_sign_up_submit"
              className="btn btn-lg btn-primary col flex items-center justify-center rounded-full"
              disabled={formik.isSubmitting || !formik.isValid}
            >
              {!loading && (
                <span className="indicator-label flex items-center gap-3">
                  <p>Change Password</p>
                  <svg
                    width="10"
                    height="9"
                    viewBox="0 0 10 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M4.97945 0.146447C4.78419 0.341709 4.78419 0.658291 4.97945 0.853553L8.1259 4H0.999675C0.723533 4 0.499675 4.22386 0.499675 4.5C0.499675 4.77614 0.723533 5 0.999675 5H8.1259L4.97945 8.14645C4.78419 8.34171 4.78419 8.65829 4.97945 8.85355C5.17472 9.04882 5.4913 9.04882 5.68656 8.85355L9.68656 4.85355C9.88182 4.65829 9.88182 4.34171 9.68656 4.14645L5.68656 0.146447C5.4913 -0.0488155 5.17472 -0.0488155 4.97945 0.146447Z"
                      fill="white"
                    />
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
