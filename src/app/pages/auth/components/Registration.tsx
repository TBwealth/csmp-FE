import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { getUserByToken, register } from "../core/_requests";
import { Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { PasswordMeterComponent } from "../../../../_metronic/assets/ts/components";
import { useAuth } from "../core/Auth";
import {
  useAccountRegister,
  useGetAccountCustomTenant,
} from "../../../api/api-services/accountQuery";
import { FaEnvelope, FaGlobe, FaLock, FaUser } from "react-icons/fa";
import { AccountsApiTenantsList200Response } from "../../../api/axios-client";
import { useRecoilValue, useSetRecoilState } from "recoil";
import modeAtoms from "../../../atoms/modeAtoms.atom";

const initialValues = {
  businessEmail: "",
  fullName: "",
  country: "",
  password: "",
  confirmpassword: "",
  role: 2,
  tenant: "",
};

const registrationSchema = Yup.object().shape({
  businessEmail: Yup.string()
  .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Business email is required"),
  fullName: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Full name is required"),
  // lastname: Yup.string()
  //   .min(3, "Minimum 3 symbols")
  //   .max(50, "Maximum 50 symbols")
  //   .required("Last name is required"),
  // tenant: Yup.string()
  //   .min(1, "Minimum 3 symbols")
  //   .max(50, "Maximum 50 symbols")
  //   .required("Tenant is required"),
  country: Yup.string()
    .required("Country is required"),
  // lastname: Yup.string()
  //   .min(3, "Minimum 3 symbols")
  //   .max(50, "Maximum 50 symbols")
  //   .required("Last name is required"),
  password: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Password is required"),
  confirmpassword: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Password confirmation is required")
    .oneOf([Yup.ref("password")], "Password and Confirm Password didn't match"),
});

export function Registration() {
  const [loading, setLoading] = useState(false);
  const [active, setIsActive] = useState(true);
  const { mode } = useRecoilValue(modeAtoms);
  const setModeState = useSetRecoilState(modeAtoms);

  const [showAlert, setShowAlert] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const { saveAuth, setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const {
    data: tenantData,
    isLoading: tenantLoading,
    error,
  } = useGetAccountCustomTenant(1);
  const { mutate, isLoading } = useAccountRegister();

  const datastsr: AccountsApiTenantsList200Response | any = tenantData;
  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      mutate(
        {
          fullName: values.fullName,
          email: values.businessEmail,
          password: values.password,
          password2: values.confirmpassword,
          role: 2,
          tenant: +values.tenant,
          // company_url: imageUrl
        },
        {
          onSuccess: (res: any) => {
            console.log(res.data, "Successss");
            setLoading(false);
            setStatus(null);
            navigate("/setup");
            // sessionStorage.setItem("top-title", "Setup Account");
          },
          onError: (res: any) => {
            setStatus(res.response.data.message);
            setLoading(false);
          },
        }
      );
    },
  });

  useEffect(() => {
    PasswordMeterComponent.bootstrap();
  }, []);

  // const handleSwitchMode = (e: any) => {
  //   setModeState(() => (e ? { mode: "dark" } : { mode: "light" }));
  //   const curMode = document.documentElement.getAttribute("data-bs-theme");
  //   if (curMode === "dark") {
  //     document.documentElement.setAttribute("data-bs-theme", "light");
  //     setModeState({ mode: "light" });
  //     localStorage.setItem("mode", JSON.stringify("light"));

  //   } else {
  //     document.documentElement.setAttribute("data-bs-theme", "dark");
  //     setModeState({ mode: "dark" });
  //     localStorage.setItem("mode", JSON.stringify("dark"));
  //   }
  // };

  return (
    <div className="w-full md:h-screen pt-16 bg-white">
      <form
        className="text-[#373737] w-[80%] md:w-[65%] mx-auto"
        id="kt_login_signup_form"
        onSubmit={formik.handleSubmit}
      >
        <h1 className="font-medium uppercase text-[14px] md:text-[18px] mb-8">
          Try a <span className="font-semibold">free 30-day trial</span> with
          complete access to CloudAccoRD™.{" "}
          <span className="font-semibold">No credit card required</span>. Get up
          and running in minutes.
        </h1>

        {formik.status && (
          <div className="mb-lg-15 alert alert-danger">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        )}

        <div className="">
          {/* begin::Form group Firstname */}
          <div className="fv-row mb-4 col-sm">
            <label className="flex text-[14px] font-medium items-center gap-3">
              <FaEnvelope />
              <span>Business Email</span>
            </label>
            <input
              placeholder=""
              type="text"
              autoComplete="off"
              {...formik.getFieldProps("businessEmail")}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid":
                    formik.touched.businessEmail && formik.errors.businessEmail,
                },
                {
                  "is-valid":
                    formik.touched.businessEmail && !formik.errors.businessEmail,
                }
              )}
            />
            {formik.touched.businessEmail && formik.errors.businessEmail && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.businessEmail}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}
          <div className="fv-row mb-4 col-sm">
            <label className="flex text-[14px] font-medium items-center gap-3">
              <FaUser />
              <span>Full Name</span>
            </label>
            <input
              placeholder=""
              type="text"
              autoComplete="off"
              {...formik.getFieldProps("fullName")}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid":
                    formik.touched.fullName && formik.errors.fullName,
                },
                {
                  "is-valid":
                    formik.touched.fullName && !formik.errors.fullName,
                }
              )}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.fullName}</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="">
          <div className="fv-row mb-4 col-sm">
            <label className="flex text-[14px] font-medium items-center gap-3">
              <FaGlobe />
              <span>Country</span>
            </label>
            <select
            {...formik.getFieldProps("country")}
            className={clsx(
              "form-control bg-transparent",
              {
                "is-invalid": formik.touched.country && formik.errors.country,
              },
              {
                "is-valid": formik.touched.country && !formik.errors.country,
              }
            )}
            >
              <option value="">Select country</option>
              <option value="Nigeria">Nigeria</option>
            </select>
            {/* <input
              placeholder=""
              type="text"
              autoComplete="off"
              {...formik.getFieldProps("country")}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid": formik.touched.country && formik.errors.country,
                },
                {
                  "is-valid": formik.touched.country && !formik.errors.country,
                }
              )}
            /> */}
            {formik.touched.country && formik.errors.country && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.country}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="">
          {" "}
          {/* begin::Form group Password */}
          <div className="fv-row mb-4 col-sm" data-kt-password-meter="true">
            <div className="mb-1">
              <label className="flex text-[14px] font-medium items-center gap-3">
                <FaUser />
                <span>Password</span>
              </label>
              <div className="position-relative mb-3">
                <input
                  type="password"
                  placeholder=""
                  autoComplete="off"
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
                {formik.touched.password && formik.errors.password && (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      <span role="alert">{formik.errors.password}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* end::Form group */}
          {/* begin::Form group Confirm password */}
          <div className="fv-row mb-4 col-sm">
            <label className="flex font-medium text-[14px] items-center gap-3">
              <FaUser />
              <span>Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder=""
              autoComplete="off"
              {...formik.getFieldProps("confirmpassword")}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid":
                    formik.touched.confirmpassword &&
                    formik.errors.confirmpassword,
                },
                {
                  "is-valid":
                    formik.touched.confirmpassword &&
                    !formik.errors.confirmpassword,
                }
              )}
            />
            {formik.touched.confirmpassword &&
              formik.errors.confirmpassword && (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">
                    <span role="alert">{formik.errors.confirmpassword}</span>
                  </div>
                </div>
              )}
          </div>
          {/* end::Form group */}
        </div>
        <div className="flex items-center mb-4 gap-3">
          <input type="checkbox" name="" checked id="" className="h-5 w-5 rounded-md" />
          <p className="text-[12px]">
            I agree to{" "}
            <Link to="/" className="text-[#2E54C3] underline">
              Terms and conditions
            </Link>
            ,{" "}
            <Link to="/" className="text-[#2E54C3] underline">
              Privacy
            </Link>{" "}
            and{" "}
            <Link to="/" className="text-[#2E54C3] underline">
              Data collection policy
            </Link>
          </p>
        </div>
        <div className="row mb-4">
          <button
            type="submit"
            id="kt_sign_up_submit"
            className="btn btn-lg btn-primary col flex items-center justify-center rounded-full"
            disabled={
              formik.isSubmitting || !formik.isValid || !formik.values.role
            }
          >
            {!loading && (
              <span className="indicator-label flex items-center gap-3">
                <p>Create an Account</p>
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
              <span className="indicator-progress" style={{ display: "block" }}>
                Please wait...{" "}
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            )}
          </button>
        </div>
        <div className="text-[14px] mt-8">
          Already a Cloud accord user? <Link to="/auth/login" className="text-primary">Sign In</Link>
        </div>

        <Alert
          show={showAlert}
          variant="danger"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>{errMessage}</p>
        </Alert>
        {/* end::Form group */}
      </form>
    </div>
  );
}
