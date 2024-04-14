import { useEffect, useState } from "react";
import { KTIcon, KTSVG } from "../../../../../../_metronic/helpers";
import {
  useGetAccountRoles,
  useGetAccountTenant,
  useUpdateAccountUsers,
} from "../../../../../api/api-services/accountQuery";
import useAlert from "../../../../components/useAlert";
import { Modal } from "react-bootstrap";
import { AccountsApiRolesList200Response } from "../../../../../api/axios-client";

const ModalAllUser = ({ editItem, onClearEdit }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [roles, setRoles] = useState<any[] | undefined>([]);
  const [tenant, setTenant] = useState<any[] | undefined>([]);
  const [valueId, setValueId] = useState("");
  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [roleValue, setRoleValue] = useState("");
  const [tenantValue, setTenantValue] = useState("");
  const { showAlert, hideAlert, Alert } = useAlert();

  const {
    data: allRoles,
    isLoading: roleLoading,
    error: roleError,
  } = useGetAccountRoles(page);
  const {
    data: allTenant,
    isLoading: tenantLoading,
    error: tenantError,
  } = useGetAccountTenant(page);

  const {
    mutate: editMutate,
    isLoading: editLoading,
    error: editError,
  } = useUpdateAccountUsers(+valueId);

  const allRolesData: AccountsApiRolesList200Response | any = allRoles;
  const allTenantData: AccountsApiRolesList200Response | any = allTenant;

  const handleClose = () => {
    setIsOpen(false);
    onClearEdit();
    hideAlert();
    setValueId("");
    setFirstNameValue("");
    setLastNameValue("");
    setEmailValue("");
    setRoleValue("");
    setTenantValue("");
  };

  useEffect(() => {
    setRoles(allRolesData?.data?.data?.results);
    setTenant(allTenantData?.data?.data?.results);
    if (editItem) {
      setIsOpen(true);
      console.log(editItem, "Showwwwwwwwwwwww");
      setValueId(editItem?.id);
      setFirstNameValue(editItem?.first_name);
      setLastNameValue(editItem?.last_name);
      setEmailValue(editItem?.email);
      setRoleValue(editItem?.role?.name);
      setTenantValue(editItem?.tenant);
    } else {
      handleClose();
    }
  }, [allRoles, allTenant, editItem]);

  const editHandleSubmit = () => {
    editMutate(
      {
        id: valueId,
        data: {
          first_name: firstNameValue,
          last_name: lastNameValue,
          tenant: tenantValue,
          email: emailValue,
          role: {
            name: roleValue,
          },
        },
      },
      {
        onSuccess: (res) => {
          handleClose();
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
      <span
        onClick={() => {
          setIsOpen(true), hideAlert();
        }}
      ></span>
      <Modal
        show={isOpen}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit this User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-10">
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
          <div className="mb-10">
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
          <div className="mb-10">
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
          <div className="mb-10">
            <label className="form-label fs-6 fw-bold">Role:</label>
            <select
              className="form-select form-select-solid fw-bolder"
              data-placeholder="Select option"
              value={roleValue}
              onChange={(e) => setRoleValue(e.target.value)}
            >
              <option value="">Select a Role</option>
              {roles?.map((item) => (
                <option key={item?.id} value={item?.name}>
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
                <option key={item?.id} value={item?.name}>
                  {item?.name}
                </option>
              ))}
            </select>
          </div>
        </Modal.Body>
        <Alert />
        <Modal.Footer>
          <button type="button" className="btn btn-light" onClick={handleClose}>
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={roleValue === "" || tenantValue === ""}
            onClick={editHandleSubmit}
          >
            {!editLoading && <span className="indicator-label">continue</span>}
            {editLoading && (
              <span className="indicator-progress" style={{ display: "block" }}>
                Please wait...{" "}
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            )}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export { ModalAllUser };
