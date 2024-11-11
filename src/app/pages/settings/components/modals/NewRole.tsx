import React from "react";
import { Modal } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { FaUsers } from "react-icons/fa";
import { MdMenu } from "react-icons/md";

const initialValues = {
  role: "",
  description: "",
  isAdmin: false,
  isReadOnly: false,
  canManageResource: false,
  canAddRules: false,
  canManageUsers: false,
  canManageBills: false,
  dynamicAccess: "",
};

const roleSchema = Yup.object().shape({
  role: Yup.string().required("Role is required"),
  description: Yup.string().required("Description is required"),
  isAdmin: Yup.boolean(),
  isReadOnly: Yup.boolean(),
  canManageResource: Yup.boolean(),
  canAddRules: Yup.boolean(),
  canManageUsers: Yup.boolean(),
  canManageBills: Yup.boolean(),
  dynamicAccess: Yup.string(),
});

const NewRole = ({ isOpen, handleHide, mode }: any) => {
  const formik = useFormik({
    initialValues,
    validationSchema: roleSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  return (
    <Modal
      show={isOpen}
      onHide={() => {
        handleHide();
        //   formik.resetForm();
      }}
      keyboard={false}
    >
      <Modal.Header
        closeButton
        className="border-0 pt-3 pr-3 pb-0"
      ></Modal.Header>
      <Modal.Body>
        <div className="w-full mb-3 pb-3 border-bottom flex items-center justify-center flex-col gap-2">
          <div className="bg-[#284CB31A] rounded-full w-12 h-12 mb-[16px] flex items-center justify-center">
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
                d="M20.7183 14.5132C20.8926 14.4123 21.1076 14.4123 21.2819 14.5132L28.4069 18.6382C28.6758 18.7938 28.7675 19.138 28.6119 19.4068C28.4562 19.6757 28.1121 19.7675 27.8433 19.6118L21.0001 15.65L14.1569 19.6118C13.8881 19.7675 13.5439 19.6757 13.3883 19.4068C13.2326 19.138 13.3244 18.7938 13.5933 18.6382L20.7183 14.5132Z"
                fill="#284CB3"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21 23.8125C19.2396 23.8125 17.8125 25.2396 17.8125 27V27.75H16.6875V27C16.6875 24.6183 18.6183 22.6875 21 22.6875C23.3817 22.6875 25.3125 24.6183 25.3125 27V27.75H24.1875V27C24.1875 25.2396 22.7604 23.8125 21 23.8125Z"
                fill="#284CB3"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21 19.3125C20.068 19.3125 19.3125 20.068 19.3125 21C19.3125 21.932 20.068 22.6875 21 22.6875C21.932 22.6875 22.6875 21.932 22.6875 21C22.6875 20.068 21.932 19.3125 21 19.3125ZM18.1875 21C18.1875 19.4467 19.4467 18.1875 21 18.1875C22.5533 18.1875 23.8125 19.4467 23.8125 21C23.8125 22.5533 22.5533 23.8125 21 23.8125C19.4467 23.8125 18.1875 22.5533 18.1875 21Z"
                fill="#284CB3"
              />
            </svg>
          </div>
          <h1 className="text-[18px] font-semibold">New role</h1>
          <p
            className={`text-[12px] font-medium ${
              mode === "dark" ? "text-[#FFFFFF]" : "text-[#6A6A6A]"
            }`}
          >
            Create a new role and add permissions
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
              <FaUsers />
              <span>Role</span>
            </label>
            <input
              placeholder=""
              type="text"
              autoComplete="off"
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
            />
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
            <label className="mb-[8px] flex text-[14px] font-medium items-center gap-3">
              <MdMenu />
              <span>Description</span>
            </label>
            <textarea
              placeholder="Enter role description"
              autoComplete="off"
              rows={3}
              cols={5}
              {...formik.getFieldProps("description")}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid":
                    formik.touched.description && formik.errors.description,
                },
                {
                  "is-valid":
                    formik.touched.description && !formik.errors.description,
                }
              )}
            />
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

          <div className="fv-row mb-4 col-sm mt-[32px]">
            <h1 className="font-semibold text-[18px]">Roles and Permission</h1>
            <div className="py-[24px] border-bottom">
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
            <div className="w-full">
              <div className="flex items-center justify-between py-[16px] border-bottom">
                <div className="">
                  <h2 className="font-semibold text-[14px] mb-[8px]">
                    Read only user
                  </h2>
                  <p
                    className={`font-medium ${
                      mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
                    } text-[12px]`}
                  >
                    View all details across system and cant edit or manage the
                    system
                  </p>
                </div>
                <input
                  type="checkbox"
                  name="make_admin"
                  id="make_admin"
                  className="w-5 h-5"
                />
              </div>
              <div className="flex items-center justify-between py-[16px] border-bottom">
                <div className="">
                  <h2 className="font-semibold text-[14px] mb-[8px]">
                    Manage Resources
                  </h2>
                  <p
                    className={`font-medium ${
                      mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
                    } text-[12px]`}
                  >
                    Manage, edit and add all cloud resources
                  </p>
                </div>
                <input
                  type="checkbox"
                  name="make_admin"
                  id="make_admin"
                  className="w-5 h-5"
                />
              </div>
              <div className="flex items-center justify-between py-[16px] border-bottom">
                <div className="">
                  <h2 className="font-semibold text-[14px] mb-[8px]">
                    Rulesets & Rules{" "}
                  </h2>
                  <p
                    className={`font-medium ${
                      mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
                    } text-[12px]`}
                  >
                    Manage, edit and create rules and policies
                  </p>
                </div>
                <input
                  type="checkbox"
                  name="make_admin"
                  id="make_admin"
                  className="w-5 h-5"
                />
              </div>
              <div className="flex items-center justify-between py-[16px] border-bottom">
                <div className="">
                  <h2 className="font-semibold text-[14px] mb-[8px]">
                    User management
                  </h2>
                  <p
                    className={`font-medium ${
                      mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
                    } text-[12px]`}
                  >
                    Add, edit and manage users except super admins and owners
                  </p>
                </div>
                <input
                  type="checkbox"
                  name="make_admin"
                  id="make_admin"
                  className="w-5 h-5"
                />
              </div>
              <div className="flex items-center justify-between py-[16px] border-bottom">
                <div className="">
                  <h2 className="font-semibold text-[14px] mb-[8px]">
                    Manage billings
                  </h2>
                  <p
                    className={`font-medium ${
                      mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
                    } text-[12px]`}
                  >
                    Add, edit and manage users except super admins and owners
                  </p>
                </div>
                <input
                  type="checkbox"
                  name="make_admin"
                  id="make_admin"
                  className="w-5 h-5"
                />
              </div>
              <div className="flex items-center justify-between py-[16px] border-bottom">
                <div className="">
                  <h2 className="font-semibold text-[14px] mb-[8px]">
                    Dynamic access
                  </h2>
                  <p
                    className={`font-medium ${
                      mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
                    } text-[12px]`}
                  >
                    Dynamic access for security groups and more.
                  </p>
                </div>
                <select
                  data-placeholder="Select option"
                  autoComplete="off"
                  className="w-48 form-control bg-transparent"
                  // value={region.cloud_provider}
                  // onChange={(e) =>
                  //   setRegion({ ...region, cloud_provider: e.target.value })
                  // }
                >
                  <option value="" className="font-medium">
                    Select Role
                  </option>
                  {[
                    {
                      id: "AWS",
                      name: "aws",
                    },
                    {
                      id: "AZURE",
                      name: "azure",
                    },
                    {
                      id: "GPC",
                      name: "gpc",
                    },
                  ]?.map((item) => (
                    <option
                      key={item?.id}
                      value={item?.id}
                      className="font-medium"
                    >
                      {/* {item?.cloud_provider_name} */}
                      {item?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-end pt-[24px]">
            <button
              type="button"
              className="bg-primary rounded-full text-white font-medium text-[12px] px-[24px] py-[12px] "
              onClick={() => {
                handleHide();
                formik.resetForm();
              }}
            >
              Create Role
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default NewRole;
