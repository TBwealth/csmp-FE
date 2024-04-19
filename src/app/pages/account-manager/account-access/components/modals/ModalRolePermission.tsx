import { useEffect, useState } from "react";
import { KTIcon, KTSVG } from "../../../../../../_metronic/helpers";
import {
  useGetAccountPermssion,
  useGetAccountRoles,
  usePostAccountRolesPermission,
  useUpdateAccountRolePermission,
} from "../../../../../api/api-services/accountQuery";
import useAlert from "../../../../components/useAlert";
import { Modal } from "react-bootstrap";
import { AccountsApiRolesList200Response } from "../../../../../api/axios-client";

const AddRolePermissionModal = ({ editItem, onClearEdit, isOpen, handleHide }: any) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [roles, setRoles] = useState<any[] | undefined>([]);
  const [permissions, setPermissions] = useState<any[] | undefined>([]);
  const [valueId, setValueId] = useState("");
  const [roleValue, setRoleValue] = useState("");
  const [permissionValue, setPermissionValue] = useState("");
  const { showAlert, hideAlert, Alert } = useAlert();

  const {
    data: allRoles,
    isLoading: roleLoading,
    error: roleError,
  } = useGetAccountRoles(page);
  const {
    data: allPermissions,
    isLoading: permissionLoading,
    error: permissionError,
  } = useGetAccountPermssion(page);

  const { mutate, isLoading, error } = usePostAccountRolesPermission();
  const {
    mutate: editMutate,
    isLoading: editLoading,
    error: editError,
  } = useUpdateAccountRolePermission(+valueId);

  const datastsr: AccountsApiRolesList200Response | any = allRoles;
  const datastsr2: AccountsApiRolesList200Response | any = allPermissions;

  useEffect(() => {
    setRoles(datastsr?.data?.data?.results);
    setPermissions(datastsr2?.data?.data?.results);
    if (editItem) {
      // setIsOpen(true);
      console.log(editItem, "Showwwwwwwwwwwww");
      setValueId(editItem?.id);
      setRoleValue(editItem?.role_id);
      setPermissionValue(editItem?.permission_id);
    } else {
      setValueId("");
      setRoleValue("");
      setPermissionValue("");
      handleClose();
    }
  }, [allRoles, allPermissions, editItem]);

  const handleClose = () => {
    // setIsOpen(false);
    hideAlert();
    setValueId("");
    onClearEdit();
  };

  const handleSubmit = () => {
    mutate(
      {
        role_id: +roleValue,
        permission__id: [+permissionValue],
      },
      {
        onSuccess: (res) => {
          // setIsOpen(false);
          console.log(res);
          // showAlert(res?.data?.data?.message, "success");
          setPermissionValue("");
          setRoleValue("");
        },

        onError: (err) => {
          if (error instanceof Error) {
            showAlert(error?.message || "An unknown error occurred", "danger");
          }
          // showAlert(err?.response?.data?.message, "danger");
        },
      }
    );
  };

  const editHandleSubmit = () => {
    editMutate(
      {
        id: +valueId,
        data: {
          role_id: +roleValue,
          permission__id: [+permissionValue],
        },
      },
      {
        onSuccess: (res) => {
          handleClose();
          console.log(res);
          // showAlert(res?.data?.message, "success");
          setPermissionValue("");
          setRoleValue("");
        },

        onError: (err) => {
          if (err instanceof Error) {
            showAlert(err?.message || "An unknown error occurred", "danger");
          }
          // showAlert(err?.response?.data?.message, "danger");
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
            {editItem ? "Edit Tenant" : "Create New Tenant"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-10">
            <label className="form-label fs-6 fw-bold">Role:</label>
            <select
              className="form-select form-select-solid fw-bolder"
              data-placeholder="Select option"
              value={roleValue}
              onChange={(e) => setRoleValue(e.target.value)}
            >
              <option value=""></option>
              {roles?.map((item) => (
                <option key={item?.id} value={item?.id}>
                  {item?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-10">
            <label className="form-label fs-6 fw-bold">Permissions:</label>
            <select
              className="form-select form-select-solid fw-bolder"
              data-placeholder="Select option"
              value={permissionValue}
              onChange={(e) => setPermissionValue(e.target.value)}
            >
              <option value=""></option>
              {permissions?.map((item) => (
                <option key={item?.id} value={item?.id}>
                  {item?.name}
                </option>
              ))}
            </select>
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
            disabled={roleValue === "" || permissionValue === ""}
            onClick={editItem ? editHandleSubmit : handleSubmit}
          >
            {!isLoading && !editLoading && (
              <span className="indicator-label">
                {editItem ? "Edit" : "Continue"}
              </span>
            )}
            {isLoading ||
              (editLoading && (
                <span
                  className="indicator-progress"
                  style={{ display: "block" }}
                >
                  Please wait...{" "}
                  <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              ))}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export { AddRolePermissionModal };
