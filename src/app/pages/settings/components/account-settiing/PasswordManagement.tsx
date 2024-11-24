import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { FaEye, FaEyeSlash, FaKey } from "react-icons/fa";

type Props = {
  mode: string;
  goBack: any;
};

const initialValues = {
  old_password: "",
  new_password: "",
  confirm_password: "",
};

const passwordSchema = Yup.object().shape({
  old_password: Yup.string().required("Old password is required"),
  new_password: Yup.string().required("New password is required"),
  confirm_password: Yup.string().required("Confirm password is required"),
});

const PasswordManagement = ({ mode, goBack }: Props) => {
  const [loading, setLoading] = useState(false);
  const [oldActive, setOldActive] = useState(false);
  const [newActive, setNewActive] = useState(false);
  const [confirmActive, setConfirmActive] = useState(false);
  const formik = useFormik({
    initialValues,
    validationSchema: passwordSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      //   setLoading(true);
      console.log(values);
      //   try {
      //     // mutate(
      //     //   {
      //     //     email: values.email,
      //     //     password: values.password,
      //     //   },
      //     //   {
      //     //     onSuccess: (res: any) => {
      //     //       console.log(res.data, "Successss");
      //     //       if (res.data.code === 200) {
      //     //         localStorage.setItem(
      //     //           "user",
      //     //           JSON.stringify(res?.data?.data?.user)
      //     //         );
      //     //         sessionStorage.setItem("top-title", "Dashboard");
      //     //         sessionStorage.setItem(
      //     //           "children",
      //     //           JSON.stringify([
      //     //             {
      //     //               title: "Dashboard",
      //     //               href: "/dashboard",
      //     //             },
      //     //           ])
      //     //         );
      //     //         // saveAuth(res?.data?.data?.token?.access);
      //     //         localStorage.setItem("token", res?.data?.data?.token?.access);
      //     //         // setCurrentUser(res?.data?.data?.user);
      //     //         // navigate("/dashboard");
      //     //       }
      //     //       setStatus(null);
      //     //     },
      //     //     onError: (err: any) => {
      //     //       console.log(err);
      //     //     //   setLoading(false);
      //     //       setStatus(err?.response?.data?.message || err?.message);
      //     //     },
      //     //   }
      //     // );
      //   } catch (error) {
      //     console.log(error);
      //     // setLoading(false);
      //     setStatus("The login details are incorrect");
      //     setSubmitting(false);
      //   }
    },
  });

  return (
    <div
      className={`rounded-[16px] p-[32px] border ${
        mode === "dark" ? "bg-lightDark" : "bg-white"
      }`}
    >
      <div className="flex items-center pb-[16px] border-bottom gap-[16px]">
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
        <h1 className="font-semibold text-[18px]">Password Management</h1>
      </div>
      <form className="w-full" onSubmit={formik.handleSubmit} noValidate>
        {formik.status && (
          <div className="mb-lg-15 alert alert-danger">
            <div className="alert-text font-weight-bold text-center">
              {formik.status}
            </div>
          </div>
        )}
        <div className="flex items-center flex-col justify-center gap-[32px] py-[32px] w-full">
          <div className="fv-row relative w-full">
            <label className="flex font-medium text-[14px] items-center gap-[12px] mb-[8px]">
              <FaKey />
              <span>Old Password</span>
            </label>
            <input
              type={oldActive ? "text" : "password"}
              autoComplete="off"
              placeholder="Password"
              {...formik.getFieldProps("old_password")}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid":
                    formik.touched.old_password && formik.errors.old_password,
                },
                {
                  "is-valid":
                    formik.touched.old_password && !formik.errors.old_password,
                }
              )}
            />
            {
              <button
                type="button"
                className="absolute right-12 top-[3.5rem] bg-transparent cursor-pointer"
                onClick={() => setOldActive(!oldActive)}
              >
                {oldActive ? <FaEyeSlash /> : <FaEye />}
              </button>
            }
            {formik.touched.old_password && formik.errors.old_password && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert" className="font-medium">{formik.errors.old_password}</span>
                </div>
              </div>
            )}
          </div>
          <div className="fv-row relative w-full">
            <label className="flex font-medium text-[14px] items-center gap-[12px] mb-[8px]">
              <FaKey />
              <span>New Password</span>
            </label>
            <input
              type={newActive ? "text" : "password"}
              autoComplete="off"
              placeholder="Password"
              {...formik.getFieldProps("new_password")}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid":
                    formik.touched.new_password && formik.errors.new_password,
                },
                {
                  "is-valid":
                    formik.touched.new_password && !formik.errors.new_password,
                }
              )}
            />
            {
              <button
                type="button"
                className="absolute right-12 top-[3.5rem] bg-transparent cursor-pointer"
                onClick={() => setNewActive(!newActive)}
              >
                {newActive ? <FaEyeSlash /> : <FaEye />}
              </button>
            }
            {formik.touched.new_password && formik.errors.new_password && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert" className="font-medium">{formik.errors.new_password}</span>
                </div>
              </div>
            )}
          </div>
          <div className="fv-row relative w-full">
            <label className="flex font-medium text-[14px] items-center gap-[12px] mb-[8px]">
              <FaKey />
              <span>Confirm New Password</span>
            </label>
            <input
              type={confirmActive ? "text" : "password"}
              autoComplete="off"
              placeholder="Password"
              {...formik.getFieldProps("confirm_password")}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid":
                    formik.touched.confirm_password &&
                    formik.errors.confirm_password,
                },
                {
                  "is-valid":
                    formik.touched.confirm_password &&
                    !formik.errors.confirm_password,
                }
              )}
            />
            {
              <button
                type="button"
                className="absolute right-12 top-[3.5rem] bg-transparent cursor-pointer"
                onClick={() => setConfirmActive(!confirmActive)}
              >
                {confirmActive ? <FaEyeSlash /> : <FaEye />}
              </button>
            }
            {formik.touched.confirm_password && formik.errors.confirm_password && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert" className="font-medium">{formik.errors.confirm_password}</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <button
          type="submit"
          id="kt_sign_up_submit"
          className="py-[8px] px-[24px] bg-primary font-medium text-white flex items-center justify-center rounded-full"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && (
            <span className="indicator-label flex items-center gap-3">
              <p>Change Password</p>
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.00033 6.33594C5.19694 6.33594 6.16699 7.30599 6.16699 8.5026C6.16699 9.69922 5.19694 10.6693 4.00033 10.6693C2.80371 10.6693 1.83366 9.69922 1.83366 8.5026C1.83366 7.30599 2.80371 6.33594 4.00033 6.33594ZM7.12774 8.0026C6.88802 6.49128 5.57909 5.33594 4.00033 5.33594C2.25142 5.33594 0.833658 6.7537 0.833658 8.5026C0.833658 10.2515 2.25142 11.6693 4.00033 11.6693C5.57909 11.6693 6.88802 10.5139 7.12774 9.0026H14.167V10.5026C14.167 10.7787 14.3908 11.0026 14.667 11.0026C14.9431 11.0026 15.167 10.7787 15.167 10.5026V8.5026C15.167 8.22646 14.9431 8.0026 14.667 8.0026H7.12774Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 8C11.7239 8 11.5 8.22386 11.5 8.5V10.5C11.5 10.7761 11.7239 11 12 11C12.2761 11 12.5 10.7761 12.5 10.5V8.5C12.5 8.22386 12.2761 8 12 8Z"
                  fill="white"
                />
              </svg>
            </span>
          )}
          {loading && (
            <span className="indicator-progress" style={{ display: "block" }}>
              Please wait...{" "}
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </button>
      </form>
      {/* <div className="flex items-center justify-between flex-col md:flex-row gap-[16px]">
        </div> */}
    </div>
  );
};

export default PasswordManagement;
