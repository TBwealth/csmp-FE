import { useEffect, useState } from "react";
import { KTIcon, KTSVG } from "../../../../../../_metronic/helpers";
import {
  useGetAccountPermssion,
  useGetAccountRoles,
  usePostAccountRoles,
  useUpdateAccountRole,
  usePostAccountRolesPermission,
  useUpdateAccountRolePermission,
} from "../../../../../api/api-services/accountQuery";
import useAlert from "../../../../components/useAlert";
import { Modal } from "react-bootstrap";

const AddRoleModal = ({ editItem, onClearEdit, isOpen, handleHide }: any) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [roles, setRoles] = useState<any[] | undefined>([]);
  const [valueId, setValueId] = useState("");
  const [roleName, setRoleName] = useState("");
  const { showAlert, hideAlert, Alert } = useAlert();

  const { mutate, isLoading, error } = usePostAccountRoles();
  const {
    mutate: editMutate,
    isLoading: editLoading,
    error: editError,
  } = useUpdateAccountRole(+valueId);

  useEffect(() => {
    if (editItem) {
      // setIsOpen(true);
      setValueId(editItem?.id);
      setRoleName(editItem?.name);
    } else {
      setValueId("");
      setRoleName("");
      handleClose();
    }
  }, [editItem]);

  const handleClose = () => {
    // setIsOpen(false);
    hideAlert();
    setValueId("");
    onClearEdit();
  };

  const handleSubmit = () => {
    mutate(
      {
        name: roleName,
      },
      {
        onSuccess: (res: any) => {
          // setIsOpen(false);
          showAlert(res?.data?.message, "success");
          console.log(res);
          setRoleName("");
        },
        onError: (err) => {
          if (err) {
            if (err instanceof Error) {
              showAlert(err?.message || "An unknown error occurred", "danger");
            }
          }
        },
      }
    );
  };

  const editHandleSubmit = () => {
    editMutate(
      {
        id: +valueId,
        data: {
          name: roleName,
        },
      },
      {
        onSuccess: (res: any) => {
          // handleClose();
          showAlert(res?.data?.message, "success");
          console.log(res);
          setRoleName("");
        },
        onError: (err) => {
          if (err) {
            if (err instanceof Error) {
              showAlert(err?.message || "An unknown error occurred", "danger");
            }
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
            {editItem ? "Edit Role" : "Create New Role"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-10">
            <label className="form-label fs-6 fw-bold">Role:</label>
            <input
              placeholder="Enter Name"
              type="text"
              name="text"
              autoComplete="off"
              className="form-control bg-transparent"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
          </div>
          {/* <div className="mb-10">
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
          </div> */}
        </Modal.Body>
        <Alert />
        <Modal.Footer>
          <button type="button" className="btn btn-light" onClick={handleHide}>
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={roleName === ""}
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

export { AddRoleModal };
