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
  const [valueId, setValueId] = useState("");
  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");

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
              !emailValue
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
