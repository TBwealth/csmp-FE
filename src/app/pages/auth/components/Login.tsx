import { useState } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { getUserByToken, login } from "../core/_requests";
import { useAuth } from "../core/Auth";
import { useAccountLogin } from "../../../api/api-services/accountQuery";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import "./styles/loginstyles.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import modeAtomsAtom from "../../../atoms/modeAtoms.atom";

const loginSchema = Yup.object().shape({
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

const initialValues = {
  email: "cspm_admin@gmail.com",
  password: "Test@123",
};

const initialValue = {
  email: "admin@demo.com",
  password: "demo",
};

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const [loading, setLoading] = useState(false);
  const { saveAuth, setCurrentUser } = useAuth();
  const [active, setIsActive] = useState(false);
  const navigate = useNavigate();
  // const { mode } = useRecoilValue(modeAtomsAtom);

  const { mutate, isLoading } = useAccountLogin();
  const setModeState = useSetRecoilState(modeAtomsAtom);

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        mutate(
          {
            email: values.email,
            password: values.password,
          },
          {
            onSuccess: (res: any) => {
              console.log(res.data, "Successss");
              if (res.data.code === 200) {
                localStorage.setItem(
                  "user",
                  JSON.stringify(res?.data?.data?.user)
                );
                sessionStorage.setItem("top-title", "Dashboard");
                sessionStorage.setItem(
                  "children",
                  JSON.stringify([
                    {
                      title: "Dashboard",
                      href: "/dashboard",
                    },
                  ])
                );
                saveAuth(res?.data?.data?.token?.access);
                localStorage.setItem("token", res?.data?.data?.token?.access);
                setCurrentUser(res?.data?.data?.user);
                navigate("/dashboard");
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
      } catch (error) {
        console.log(error);
        setLoading(false);
        setStatus("The login details are incorrect");
        setSubmitting(false);
      }
    },
  });


  return (
    <div className="w-full md:h-screen pt-20 bg-white">
      <form
      className="text-[#373737] w-[80%] lg:w-[60%] mx-auto"
        onSubmit={formik.handleSubmit}
        noValidate
        id="kt_login_signin_form"
      >

        <div className="separator separator-content my-14">
          <span className="w-full  text-[12px] md:text-[18px] font-medium">
            Enter your Login details
          </span>
        </div>

        {formik.status ? (
          <div className="mb-lg-15 alert alert-danger">
            <div className="alert-text font-weight-bold text-center">
              {formik.status}
            </div>
          </div>
        ) : (
          <></>
          // <div className="mb-10 bg-light-info p-8 rounded">
          //   <div className="text-info">
          //     Use account <strong>cspm_admin@gmail.com</strong> and password{" "}
          //     <strong>Test@123</strong> to continue.
          //   </div>
          // </div>
        )}

        {/* begin::Form group */}
        <div className="fv-row mb-8">
          <label className="text-[12px] md:text-[14px] font-medium">Email</label>
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
              <span role="alert">{formik.errors.email}</span>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className="fv-row mb-3">
          <label className="text-[12px] md:text-[14px] font-medium">Password</label>
          <input
            type="password"
            autoComplete="off"
            {...formik.getFieldProps("password")}
            className={clsx(
              "form-control bg-transparent",
              {
                "is-invalid": formik.touched.password && formik.errors.password,
              },
              {
                "is-valid": formik.touched.password && !formik.errors.password,
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
        {/* end::Form group */}

        {/* begin::Wrapper */}
        <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
          <div />

          {/* begin::Link */}
          <Link to="/auth/forgot-password" className="link-primary">
            Forgot Password ?
          </Link>
          {/* end::Link */}
        </div>
        {/* end::Wrapper */}

        {/* begin::Action */}
        <div className="d-grid mb-10">
          <button
            type="submit"
            id="kt_sign_in_submit"
            className="btn btn-primary"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {!isLoading && <span className="indicator-label">Continue</span>}
            {isLoading && (
              <span className="indicator-progress" style={{ display: "block" }}>
                Please wait...
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Action */}

        <div className="text-gray-500 text-center fw-semibold fs-6">
          Not a Member yet?{" "}
          <Link to="/auth/registration" className="link-primary">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
