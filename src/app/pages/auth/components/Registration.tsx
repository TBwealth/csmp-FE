import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { getUserByToken, register } from "../core/_requests";
import { Alert } from "react-bootstrap";
import { Upload, UploadProps } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { PasswordMeterComponent } from "../../../../_metronic/assets/ts/components";
import { useAuth } from "../core/Auth";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  useAccountRegister,
  useGetAccountCustomTenant,
} from "../../../api/api-services/accountQuery";
import { AccountsApiTenantsList200Response } from "../../../api/axios-client";

const initialValues = {
  companyname: "",
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmpassword: "",
  role: 2,
  tenant: "",
};

const registrationSchema = Yup.object().shape({
  companyname: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Company name is required"),
  firstname: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("First name is required"),
  lastname: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Last name is required"),
  // tenant: Yup.string()
  //   .min(1, "Minimum 3 symbols")
  //   .max(50, "Maximum 50 symbols")
  //   .required("Tenant is required"),
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
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

// const uploadButton = (
//   <button style={{ border: 0, background: 'none' }} type="button">
//     {loading ? <LoadingOutlined /> : <PlusOutlined />}
//     <div style={{ marginTop: 8 }}>Upload</div>
//   </button>
// );

export function Registration() {
  const [loading, setLoading] = useState(false);
  const [active, setIsActive] = useState(true);
  // const allowedFileType = ["jpg", "png", "jpeg"];
  // const maxFileSize = 1050000;
  // const [fileList, setFileList] = useState<any[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  // const [imageUrl, setImageUrl] = useState<string>();
  // const [listTenants, setListTenants] = useState<any[] | undefined>([]);
  const { saveAuth, setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const {
    data: tenantData,
    isLoading: tenantLoading,
    error,
  } = useGetAccountCustomTenant(1);
  const { mutate, isLoading } = useAccountRegister();

  const datastsr: AccountsApiTenantsList200Response | any = tenantData;

  // useEffect(() => {
  //   setListTenants(datastsr?.data?.data?.results);
  // }, [tenantData]);

  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      mutate(
        {
          first_name: values.firstname,
          last_name: values.lastname,
          email: values.email,
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
            navigate("/");
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

  const handleSwitchMode = (e: any) => {
    setIsActive(e.target.checked);
  };

  // function getBase64(rfile: any) {
  //   return new Promise((resolved, rejected) => {
  //     let file = rfile;
  //     let reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     let b64 = "";
  //     reader.onload = function () {
  //       //  b64 = reader.result.toString().split(",")[1];
  //       b64 = reader!.result!.toString();
  //       resolved(b64);
  //     };

  //     reader.onerror = function (error) {
  //       console.log("Error: ", error);
  //     };
  //   });
  // }
  // function formatBytes(bytes: any, decimals = 2) {
  //   if (bytes === 0 || bytes == null) return "0 Bytes";

  //   const k = 1024;
  //   const dm = decimals < 0 ? 0 : decimals;
  //   const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  //   const i = Math.floor(Math.log(bytes) / Math.log(k));

  //   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  // }
  // const props: UploadProps = {
  //   name: "file",
  //   multiple: false,
  //   onRemove: (file: any) => {
  //     const index = fileList.indexOf(file);
  //     const newFileList = fileList.slice();
  //     newFileList.splice(index, 1);
  //     setImageUrl("");
  //     setFileList(newFileList);
  //   },
  //   beforeUpload: (file: any) => {
  //     const splitedName = file.name.split(".");
  //     const fileExt = splitedName[splitedName.length - 1];
  //     const fileSize = file.size;
  //     if (allowedFileType.includes(fileExt.toLowerCase())) {
  //       if (fileSize > maxFileSize) {
  //         setErrMessage(
  //           `Maximum file size allowed is ${formatBytes(maxFileSize)} - ${
  //             file.name
  //           }`
  //         );
  //         setShowAlert(true);
  //         return Upload.LIST_IGNORE;
  //       }
  //     } else {
  //       setErrMessage(
  //         `${file.name} - Please Upload any of these file type: JPEG, PNG,JPEG`
  //       );
  //       setShowAlert(true);
  //       return Upload.LIST_IGNORE;
  //     }
  //     getBase64(file).then((base64data: any) => {
  //       setImageUrl(base64data);
  //       // setValue("profile_image", base64data);
  //     });
  //     setFileList([...fileList, file]);
  //     return false;
  //   },
  //   onDrop(e: any) {
  //     let dataTrasferFiles = e.dataTransfer.files;
  //     const file = dataTrasferFiles[0];
  //     const splitedName = file.name.split(".");
  //     const fileExt = splitedName[splitedName.length - 1];
  //     const fileSize = file.size;
  //     if (allowedFileType.includes(fileExt.toLowerCase())) {
  //       if (fileSize > maxFileSize) {
  //         setErrMessage(
  //           `Maximum file size allowed is ${formatBytes(maxFileSize)} - ${
  //             file.name
  //           }`
  //         );
  //         setShowAlert(true);
  //         return Upload.LIST_IGNORE;
  //       }
  //     } else {
  //       setErrMessage(
  //         `${file.name} - Please Upload any of these file type: JPEG, PNG,JPEG`
  //       );
  //       setShowAlert(true);
  //       return Upload.LIST_IGNORE;
  //     }
  //     getBase64(file).then((base64data: any) => {
  //       setImageUrl(base64data);
  //       // setValue("profile_image", base64data);
  //     });
  //     setFileList([...fileList, file]);
  //     return false;
  //   },
  // };

  // const uploadButton = (
  //   <div className="">
  //     <PlusOutlined color="white"/>
  //     <div style={{ marginTop: 8, color:"white" }}>Upload</div>
  //   </div>
  // );

  return (
    <div className="grid md:grid-cols-3 md:w-[80%] mr-60 md:gap-20 mt-20">
      <div className="md:col-span-1 left_container">
        <div>LOGO</div>
        <button className={active ? "active" : "inactive"}>
          <input
            type="checkbox"
            defaultChecked
            name="toggle"
            id="toggle"
            onChange={(e) => handleSwitchMode(e)}
          />
          <div className="button"></div>
        </button>
      </div>
      <form
        className="md:col-span-2 bg-lightDark rounded-md w-100 fv-plugins-bootstrap5 fv-plugins-framework p-10 shadow-lg border border-2"
        // style={{ backgroundColor: "white" }}
        noValidate
        id="kt_login_signup_form"
        onSubmit={formik.handleSubmit}
      >
        {/* <div className="d-flex justify-content-between px-5 border border-1 h-75px align-items-center  rounded-3  ">
        <h1 className="fw-bold" style={{ fontSize: "24px" }}>
          Enrolee Registration
        </h1>
        <p className="" style={{ fontSize: "12px" }}>
          Change
        </p>
      </div> */}
        <div className="text-center mb-11">
          <h1 className="text-gray-900 fw-bolder mb-3">Sign Up</h1>
        </div>
        {/* <div className="mt-10">
        <h2 className="fs-20 fw-bold">Personal Information</h2>
        <p className="fs-5 fw-light text-gray-900">
          Provide the following details below
        </p>
      </div> */}
        <div className="separator separator-content mb-5">
          <span className="w-300px text-gray-500 fw-semibold fs-7">
            Create Tenant Account
          </span>
        </div>

        {formik.status && (
          <div className="mb-lg-15 alert alert-danger">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        )}

        <div className="row ">
          {/* begin::Form group Firstname */}
          <div className="fv-row mb-8 col-sm">
            <label className="form-label fw-bolder text-gray-900 fs-6">
              Company name
            </label>
            <input
              placeholder="Company name"
              type="text"
              autoComplete="off"
              {...formik.getFieldProps("companyname")}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid":
                    formik.touched.companyname && formik.errors.companyname,
                },
                {
                  "is-valid":
                    formik.touched.companyname && !formik.errors.companyname,
                }
              )}
            />
            {formik.touched.companyname && formik.errors.companyname && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.companyname}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}
          <div className="fv-row mb-8 col-sm">
            <label className="form-label fw-bolder text-gray-900 fs-6">
              Admin First Name
            </label>
            <input
              placeholder="First Name"
              type="text"
              autoComplete="off"
              {...formik.getFieldProps("firstname")}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid":
                    formik.touched.firstname && formik.errors.firstname,
                },
                {
                  "is-valid":
                    formik.touched.firstname && !formik.errors.firstname,
                }
              )}
            />
            {formik.touched.firstname && formik.errors.firstname && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.firstname}</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="fv-row mb-8 col-sm">
            <label className="form-label fw-bolder text-gray-900 fs-6">
              Admin Last name
            </label>
            <input
              placeholder="Last name"
              type="text"
              autoComplete="off"
              {...formik.getFieldProps("lastname")}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid":
                    formik.touched.lastname && formik.errors.lastname,
                },
                {
                  "is-valid":
                    formik.touched.lastname && !formik.errors.lastname,
                }
              )}
            />
            {formik.touched.lastname && formik.errors.lastname && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.lastname}</span>
                </div>
              </div>
            )}
          </div>
          <div className="fv-row mb-8 col-sm">
            <label className="form-label fw-bolder text-gray-900 fs-6">
              Admin Email
            </label>
            <input
              placeholder="Email"
              type="email"
              autoComplete="off"
              {...formik.getFieldProps("email")}
              className={clsx(
                "form-control bg-transparent",
                { "is-invalid": formik.touched.email && formik.errors.email },
                {
                  "is-valid": formik.touched.email && !formik.errors.email,
                }
              )}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.email}</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="row">
          {/* begin::Form group Email */}
          {/* <div className="fv-row mb-8 col-sm">
            <label className="form-label fw-bolder text-gray-900 fs-6">
              Email
            </label>
            <input
              placeholder="Email"
              type="email"
              autoComplete="off"
              {...formik.getFieldProps("email")}
              className={clsx(
                "form-control bg-transparent",
                { "is-invalid": formik.touched.email && formik.errors.email },
                {
                  "is-valid": formik.touched.email && !formik.errors.email,
                }
              )}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.email}</span>
                </div>
              </div>
            )}
          </div> */}
          {/* end::Form group */}
          {/* <div className="fv-row mb-8 col-sm">
            {" "}
            <label className="form-label fw-bolder text-gray-900 fs-6">
              Tenant
            </label>
            <select
              data-placeholder="Select option"
              autoComplete="off"
              {...formik.getFieldProps("tenant")}
              className={clsx(
                "form-select form-select-solid fw-bolder",
                { "is-invalid": formik.touched.tenant && formik.errors.tenant },
                {
                  "is-valid": formik.touched.tenant && !formik.errors.tenant,
                }
              )}
            >
              <option value="">Select Tenant</option>
              {listTenants?.map((item) => (
                <option key={item?.id} value={item?.id}>
                  {item?.name}
                </option>
              ))}
            </select>
          </div> */}
        </div>

        <div className="row">
          {" "}
          {/* begin::Form group Password */}
          <div className="fv-row mb-8 col-sm" data-kt-password-meter="true">
            <div className="mb-1">
              <label className="form-label fw-bolder text-gray-900 fs-6">
                Password
              </label>
              <div className="position-relative mb-3">
                <input
                  type="password"
                  placeholder="Password"
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
              {/* begin::Meter */}
              <div
                className="d-flex align-items-center mb-3"
                data-kt-password-meter-control="highlight"
              >
                <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px"></div>
              </div>
              {/* end::Meter */}
            </div>
            <div className="text-muted">
              Use 8 or more characters with a mix of letters, numbers & symbols.
            </div>
          </div>
          {/* end::Form group */}
          {/* begin::Form group Confirm password */}
          <div className="fv-row mb-5 col-sm">
            <label className="form-label fw-bolder text-gray-900 fs-6">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Password confirmation"
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

        {/* begin::Form group */}
        {/* <div className="row">
          <div className="fv-row mb-8 col-sm flex gap-3 items-center">
            <label className="form-label fw-bolder text-gray-900 fs-6">
              Company Logo
            </label>
            <Upload
              name="avatar"
              listType="picture-circle"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={props.beforeUpload}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </div>
        </div> */}
        <div className="row gap-6">
          <button
            type="button"
            id="kt_login_signup_form_cancel_button"
            className="btn btn-lg btn-light-primary w-50"
            onClick={() => navigate("/auth/login")}
          >
            Cancel
          </button>
          <button
            type="submit"
            id="kt_sign_up_submit"
            className="btn btn-lg btn-primary col"
            disabled={
              formik.isSubmitting || !formik.isValid || !formik.values.role
            }
          >
            {!loading && <span className="indicator-label">Submit</span>}
            {loading && (
              <span className="indicator-progress" style={{ display: "block" }}>
                Please wait...{" "}
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            )}
          </button>
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
