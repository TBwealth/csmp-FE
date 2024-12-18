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
  useAccountLogin,
  useAccountRegister,
} from "../../../api/api-services/accountQuery";
import { useGetCloudCountries } from "../../../api/api-services/cloudProviderQuery";
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaGlobe,
  // FaLock,
  FaUser,
} from "react-icons/fa";
import { CloudProviderCountriesList200Response } from "../../../api/axios-client";
// import { useRecoilValue, useSetRecoilState } from "recoil";
// import modeAtoms from "../../../atoms/modeAtoms.atom";

const initialValues = {
  businessEmail: "",
  fullName: "",
  country: "",
  password: "",
  confirmpassword: "",
  role: 2,
  tenant: "",
  isAccept: false,
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
  country: Yup.string().required("Country is required"),
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
  isAccept: Yup.boolean().oneOf([true], "check the box to continue"),
});

export function Registration() {
  const [loading, setLoading] = useState(false);
  const [active, setIsActive] = useState(false);
  const [activeConfirm, setIsActiveConfirm] = useState(false);
  // const { mode } = useRecoilValue(modeAtoms);
  // const setModeState = useSetRecoilState(modeAtoms);
  const { data } = useGetCloudCountries();
  const datastr: CloudProviderCountriesList200Response | any = data;
  const [countries, setCountries] = useState<any[]>([]);

  const [showAlert, setShowAlert] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const { saveAuth, setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const { mutate, isLoading } = useAccountRegister();
  const { mutate: login } = useAccountLogin();

  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      mutate(
        {
          data: {
            business_email: values.businessEmail,
            country: values.country,
            full_name: values.fullName,
            password1: values.password,
            password2: values.confirmpassword,
          },
        },
        {
          onSuccess: (res: any) => {
            console.log(res.data, "Successss");
            setStatus(null);
            login(
              {
                email: values.businessEmail,
                password: values.password,
              },
              {
                onSuccess: (res: any) => {
                  console.log(res.data, "Successss");
                  if (res.data.code === 200) {
                    setLoading(false);
                    localStorage.setItem(
                      "user",
                      JSON.stringify(res?.data?.data?.user)
                    );
                    saveAuth(res?.data?.data?.token?.access);
                    localStorage.setItem(
                      "token",
                      res?.data?.data?.token?.access
                    );
                    setCurrentUser(res?.data?.data?.user);
                    navigate("/setup");
                  }
                  setStatus(null);
                },
                onError: (err: any) => {
                  console.log(err);
                  setLoading(false);
                  setStatus(err?.response?.data?.message || err?.message);
                },
              }
            );

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

  useEffect(() => {
    setCountries(datastr?.data?.data?.results ?? []);
  }, [datastr]);

  return (
    <div className="w-full md:h-screen overflow-auto pt-8 lg:pt-16 bg-white">
      <form
        className="text-[#373737] w-[80%] lg:w-[65%] mx-auto"
        id="kt_login_signup_form"
        onSubmit={formik.handleSubmit}
      >
        <h1 className="font-medium uppercase text-[14px] lg:text-[18px] mb-8">
          Try a <span className="font-semibold">free 30-day trial</span> with
          complete access to CloudAccoRD™.{" "}
          <span className="font-semibold">No credit card required</span>. Get up
          and running in minutes.
        </h1>

        {formik.status && (
          <div className="mb-lg-15 alert alert-danger">
            <div className="alert-text font-medium">{formik.status}</div>
          </div>
        )}

        <div className="">
          {/* begin::Form group Firstname */}
          <div className="fv-row mb-4 col-sm">
            <label className="flex text-[14px] font-medium items-center gap-3">
              <FaEnvelope />
              <span>
                Business Email <sup className="text-red-500">*</sup>
              </span>
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
                    formik.touched.businessEmail &&
                    !formik.errors.businessEmail,
                }
              )}
            />
            {formik.touched.businessEmail && formik.errors.businessEmail && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert" className="font-medium text-xs">
                    {formik.errors.businessEmail}
                  </span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}
          <div className="fv-row mb-4 col-sm">
            <label className="flex text-[14px] font-medium items-center gap-3">
              <FaUser />
              <span>
                Full Name <sup className="text-red-500">*</sup>
              </span>
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
                  <span role="alert" className="font-medium text-xs">
                    {formik.errors.fullName}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="">
          <div className="fv-row mb-4 col-sm">
            <label className="flex text-[14px] font-medium items-center gap-3">
              <FaGlobe />
              <span>
                Country <sup className="text-red-500">*</sup>
              </span>
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
              {countries.map((country) => (
                <option key={country.id} value={country.name}>
                  {country.name}
                </option>
              ))}
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
                  <span role="alert" className="font-medium text-xs">
                    {formik.errors.country}
                  </span>
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
                <span>
                  Password <sup className="text-red-500">*</sup>
                </span>
              </label>
              <div className="position-relative mb-3">
                <input
                  type={active ? "text" : "password"}
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
                {
                  <button
                    type="button"
                    className="absolute right-4 top-5 bg-transparent cursor-pointer"
                    onClick={() => setIsActive(!active)}
                  >
                    {active ? <FaEyeSlash /> : <FaEye />}
                  </button>
                }
                {formik.touched.password && formik.errors.password && (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      <span role="alert" className="font-medium text-xs">
                        {formik.errors.password}
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
              <FaUser />
              <span>
                Confirm Password <sup className="text-red-500">*</sup>
              </span>
            </label>
            {
              <button
                type="button"
                className="absolute right-4 top-12 bg-transparent cursor-pointer"
                onClick={() => setIsActiveConfirm(!activeConfirm)}
              >
                {activeConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            }
            <input
              type={activeConfirm ? "text" : "password"}
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
                    <span role="alert" className="font-medium text-xs">
                      {formik.errors.confirmpassword}
                    </span>
                  </div>
                </div>
              )}
          </div>
          {/* end::Form group */}
        </div>
        <div className="flex items-center mb-4 gap-3">
          <input
            type="checkbox"
            // checked
            id=""
            {...formik.getFieldProps("isAccept")}
            className={clsx(
              "bg-transparent h-5 w-5 rounded-md",
              {
                "is-invalid": formik.touched.isAccept && formik.errors.isAccept,
              },
              {
                "is-valid": formik.touched.isAccept && !formik.errors.isAccept,
              }
            )}
          />
          <p className="text-[12px] font-medium">
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
        {formik.touched.isAccept && formik.errors.isAccept && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert" className="font-medium text-xs">
                {formik.errors.isAccept}
              </span>
            </div>
          </div>
        )}
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
        <div className="text-[14px] mt-8 font-medium">
          Already a Cloud accord user?{" "}
          <Link to="/auth/login" className="text-primary">
            Sign In
          </Link>
        </div>

        {/* <Alert
          show={showAlert}
          variant="danger"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p className="font-medium">{errMessage}</p>
        </Alert> */}
        {/* end::Form group */}
      </form>
    </div>
  );
}
