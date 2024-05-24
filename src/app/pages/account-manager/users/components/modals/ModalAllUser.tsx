import { useEffect, useState } from "react";
import { KTIcon, KTSVG } from "../../../../../../_metronic/helpers";
import {
  // useGetAccountRoles,
  // useGetAccountTenant,
  useUpdateAccountUsers,
  usePostAccountUsers,
} from "../../../../../api/api-services/accountQuery";
import useAlert from "../../../../components/useAlert";
import { Modal } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ModalAllUser = ({ editItem, onClearEdit, isOpen, handleHide }: any) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [roles, setRoles] = useState<any[] | undefined>([]);
  const [tenant, setTenant] = useState<any[] | undefined>([]);
  const [valueId, setValueId] = useState("");
  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [password1Value, setpassword1Value] = useState("");
  const [password2Value, setpassword2Value] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [showP1, setShowP1] = useState(false);
  const [showP2, setShowP2] = useState(false);
  const { showAlert, hideAlert, Alert } = useAlert();

  // const {
  //   data: allRoles,
  //   isLoading: roleLoading,
  //   error: roleError,
  // } = useGetAccountRoles(page);
  // const {
  //   data: allTenant,
  //   isLoading: tenantLoading,
  //   error: tenantError,
  // } = useGetAccountTenant({ page, pageSize });

  const {
    mutate: editMutate,
    isLoading: editLoading,
    error: editError,
  } = useUpdateAccountUsers(+valueId);

  const {
    mutate,
    isLoading: createLoading,
    error: createError,
  } = usePostAccountUsers();

  // const allRolesData: AccountsApiRolesList200Response | any = allRoles;
  // const allTenantData: AccountsApiRolesList200Response | any = allTenant;

  const handleClose = () => {
    // setIsOpen(false);
    onClearEdit();
    hideAlert();
    setValueId("");
    setFirstNameValue("");
    setLastNameValue("");
    setEmailValue("");
  };

  useEffect(() => {
    // setRoles(allRolesData?.data?.data?.results);
    // setTenant(allTenantData?.data?.data?.results);
    if (editItem) {
      // setIsOpen(true);
      console.log(editItem, "Showwwwwwwwwwwww");
      setValueId(editItem?.id);
      setFirstNameValue(editItem?.first_name);
      setLastNameValue(editItem?.last_name);
      setEmailValue(editItem?.email);
      // setRoleValue(editItem?.role_id);
      // setTenantValue(editItem?.tenant);
    } else {
      handleClose();
    }
  }, [editItem]);

  const createHandleSubmit = () => {
    mutate(
      {
        data: {
          first_name: firstNameValue,
          last_name: lastNameValue,
          email: emailValue,
          password: password1Value,
          password2: password2Value,
        },
      },
      {
        onSuccess: (res) => {
          showAlert("User Added Successfully", "success");
          // handleClose();
          console.log(res);
        },

        onError: (err) => {
          if (err instanceof Error) {
            showAlert(err?.message || "An unknown error occurred", "danger");
          }
        },
      }
    );
  };
  const editHandleSubmit = () => {
    editMutate(
      {
        id: valueId,
        data: {
          first_name: firstNameValue,
          last_name: lastNameValue,
          email: emailValue,
        },
      },
      {
        onSuccess: (res) => {
          showAlert("User Added Successfully", "success");
          // handleClose();
          console.log(res);
        },

        onError: (err) => {
          if (err instanceof Error) {
            showAlert(err?.message || "An unknown error occurred", "danger");
          }
        },
      }
    );
  };

  return (
    <>
      <Modal
        show={isOpen}
        onHide={handleHide}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editItem ? "Edit this User" : "Create new User"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-1 gap-3">
            <div className="">
              <label className="form-label fs-6 fw-bold">First Name:</label>
              <input
                placeholder="Enter First Name"
                type="text"
                name="text"
                autoComplete="off"
                className="form-control bg-transparent"
                value={firstNameValue}
                onChange={(e) => setFirstNameValue(e.target.value)}
              />
            </div>
            <div className="">
              <label className="form-label fs-6 fw-bold">Last Name:</label>
              <input
                placeholder="Enter Last Name"
                type="text"
                name="text"
                autoComplete="off"
                className="form-control bg-transparent"
                value={lastNameValue}
                onChange={(e) => setLastNameValue(e.target.value)}
              />
            </div>
            <div className="">
              <label className="form-label fs-6 fw-bold">Email:</label>
              <input
                placeholder="Enter Email"
                type="text"
                name="text"
                autoComplete="off"
                className="form-control bg-transparent"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
              />
            </div>
            {!editItem && (
              <>
                <div className="relative">
                  <label className="form-label fs-6 fw-bold">Password:</label>
                  <input
                    placeholder="Enter Password"
                    type={showP1 ? "text" : "password"}
                    name="password1"
                    autoComplete="off"
                    className="form-control bg-transparent"
                    value={password1Value}
                    onChange={(e) => {
                      setpassword1Value(e.target.value);
                      if (e.target.value === password2Value) {
                        setIsValid(true);
                      } else {
                        setIsValid(false);
                      }
                    }}
                  />
                  <button
                    onClick={() => setShowP1(!showP1)}
                    className="absolute top-12 right-3"
                  >
                    {showP1 ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </button>
                </div>
                <div className="relative">
                  <label className="form-label fs-6 fw-bold">
                    Confirm Password:
                  </label>
                  <input
                    placeholder="Enter Password"
                    type={showP2 ? "text" : "password"}
                    name="password2"
                    autoComplete="off"
                    className="form-control bg-transparent"
                    value={password2Value}
                    onChange={(e) => {
                      setpassword2Value(e.target.value);
                      if (e.target.value === password1Value) {
                        setIsValid(true);
                      } else {
                        setIsValid(false);
                      }
                    }}
                  />
                  <button
                    onClick={() => setShowP2(!showP2)}
                    className="absolute top-12 right-3"
                  >
                    {showP2 ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </button>
                  {password2Value && !isValid && (
                    <p className="text-red-500 text-xs mt-1 italic">
                      Password does not match
                    </p>
                  )}
                </div>
              </>
            )}
            {/* <div className="mb-10">
              <label className="form-label fs-6 fw-bold">Role:</label>
              <select
                className="form-select form-select-solid fw-bolder"
                data-placeholder="Select option"
                value={+roleValue}
                onChange={(e) => setRoleValue(e.target.value)}
              >
                <option value="">Select a Role</option>
                {roles?.map((item) => (
                  <option key={item?.id} value={item?.id}>
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-10">
              <label className="form-label fs-6 fw-bold">
                Tenant: {tenantValue}
              </label>
              <select
                className="form-select form-select-solid fw-bolder"
                data-placeholder="Select option"
                value={tenantValue}
                onChange={(e) => setTenantValue(e.target.value)}
              >
                <option value="">Select a Tenant</option>
                {tenant?.map((item) => (
                  <option key={item?.id} value={item?.full_name}>
                    {item?.full_name}
                  </option>
                ))}
              </select>
            </div> */}
          </div>
        </Modal.Body>
        <Alert />
        <Modal.Footer>
          <button type="button" className="btn btn-light" onClick={handleHide}>
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={
              !firstNameValue ||
              !lastNameValue ||
              !emailValue ||
              (!editItem && !password1Value && !password2Value && !isValid)
            }
            onClick={editItem ? editHandleSubmit : createHandleSubmit}
          >
            {(!editLoading || !createLoading) &&
              (editItem ? (
                <span className="indicator-label">continue</span>
              ) : (
                <span>Create</span>
              ))}
            {(editLoading || createLoading) && (
              <span className="indicator-progress" style={{ display: "block" }}>
                Please wait...{" "}
              </span>
            )}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export { ModalAllUser };
