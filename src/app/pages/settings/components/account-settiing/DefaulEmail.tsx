import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { FaEnvelope, FaEye, FaEyeSlash, FaKey } from "react-icons/fa";

type Props = {
  mode: string;
  goBack: any;
};

const initialValues = {
  email: "",
  password: "",
};

const emailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Password is required"),
});

const DefaulEmail = ({ mode, goBack }: Props) => {
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);
  const formik = useFormik({
    initialValues,
    validationSchema: emailSchema,
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
        <h1 className="font-semibold text-[18px]">Default Email</h1>
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
              <FaEnvelope />
              <span>Email</span>
            </label>
            <input
              placeholder="Email"
              {...formik.getFieldProps("email")}
              className={clsx(
                "form-control bg-transparent",
                { "is-invalid": formik.touched.email && formik.errors.email },
                {
                  "is-valid": formik.touched.email && !formik.errors.email,
                }
              )}
              type="email"
              name="email"
              autoComplete="off"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert" className="font-medium">
                    {formik.errors.email}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="fv-row relative w-full">
            <label className="flex font-medium text-[14px] items-center gap-[12px] mb-[8px]">
              <FaKey />
              <span>Password</span>
            </label>
            <input
              type={active ? "text" : "password"}
              autoComplete="off"
              placeholder="Password"
              {...formik.getFieldProps("password")}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid":
                    formik.touched.password && formik.errors.password,
                },
                {
                  "is-valid":
                    formik.touched.password && !formik.errors.password,
                }
              )}
            />
            {
              <button
                type="button"
                className="absolute right-12 top-[3.5rem] bg-transparent cursor-pointer"
                onClick={() => setActive(!active)}
              >
                {active ? <FaEyeSlash /> : <FaEye />}
              </button>
            }
            {formik.touched.password && formik.errors.password && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert" className="font-medium">
                    {formik.errors.password}
                  </span>
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
              <p>Change Email</p>
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
                  d="M4.25742 6.21587C4.41578 5.98965 4.72754 5.93463 4.95377 6.09299L8.00037 8.22561L11.047 6.09299C11.2732 5.93463 11.585 5.98965 11.7433 6.21587C11.9017 6.4421 11.8467 6.75386 11.6204 6.91222L8.2871 9.24555C8.11494 9.36607 7.8858 9.36607 7.71364 9.24555L4.3803 6.91222C4.15408 6.75386 4.09906 6.4421 4.25742 6.21587Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.66634 4.33594C2.2061 4.33594 1.83301 4.70903 1.83301 5.16927V11.8359C1.83301 12.2962 2.2061 12.6693 2.66634 12.6693H13.333C13.7932 12.6693 14.1663 12.2962 14.1663 11.8359V5.16927C14.1663 4.70903 13.7932 4.33594 13.333 4.33594H2.66634ZM0.833008 5.16927C0.833008 4.15675 1.65382 3.33594 2.66634 3.33594H13.333C14.3455 3.33594 15.1663 4.15675 15.1663 5.16927V11.8359C15.1663 12.8485 14.3455 13.6693 13.333 13.6693H2.66634C1.65382 13.6693 0.833008 12.8485 0.833008 11.8359V5.16927Z"
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
    </div>
  );
};

export default DefaulEmail;
