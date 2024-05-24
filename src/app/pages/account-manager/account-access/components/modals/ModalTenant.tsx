import { useEffect, useState } from "react";
import {
  // usePostAccountTenant,
  useUpdateAccountTenant,
} from "../../../../../api/api-services/accountQuery";
import useAlert from "../../../../components/useAlert";
import Modal from "react-bootstrap/Modal";
import { useGetCloudCountries } from "../../../../../api/api-services/cloudProviderQuery";
import { CloudProviderCountriesList200Response } from "../../../../../api/axios-client";

const AddTenantModal = ({ editItem, onClearEdit, isOpen, handleHide }: any) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [countries, setCountries] = useState<any[]>([]);
  const [valueId, setValueId] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [adminEmailValue, setAdminEmailValue] = useState("");
  const [countryValue, setCountryValue] = useState("");
  const { showAlert, hideAlert, Alert } = useAlert();
  const { data } = useGetCloudCountries();
  const datastr: CloudProviderCountriesList200Response | any = data;
  // const { mutate, isLoading, error } = usePostAccountTenant();
  const {
    mutate: editMutate,
    isLoading: editLoading,
    error: editError,
  } = useUpdateAccountTenant(+valueId);

  useEffect(() => {
    setCountries(datastr?.data?.data?.results ?? []);
    if (editItem) {
      setValueId(editItem?.id);
      setAdminEmailValue(editItem?.business_email);
      setNameValue(editItem?.full_name);
      setCountryValue(editItem?.country);
    } else {
      setValueId("");
      setAdminEmailValue("");
      setNameValue("");
      setCountryValue("");
      handleClose();
    }
  }, [editItem, datastr]);

  const handleClose = () => {
    // setIsOpen(false);
    hideAlert();
    setValueId("");
    onClearEdit();
  };

  // const handleSubmit = () => {
  //   mutate(
  //     {
  //       tenant_name: nameValue,
  //       admin_email: adminEmailValue,
  //     },
  //     {
  //       onSuccess: (res: any) => {
  //         // handleClose();
  //         console.log(res);
  //         showAlert(res?.data?.message, "success");
  //         setAdminEmailValue("");
  //         setNameValue("");
  //       },

  //       onError: (err) => {
  //         if (error instanceof Error) {
  //           showAlert(error?.message || "An unknown error occurred", "danger");
  //           // showAlert(err?.response?.data?.message, "danger");
  //         }
  //       },
  //     }
  //   );
  // };

  const editHandleSubmit = () => {
    editMutate(
      {
        id: +valueId,
        data: {
          business_email: adminEmailValue,
          full_name: nameValue,
          country: countryValue
        },
      },
      {
        onSuccess: (res: any) => {
          // handleClose();
          console.log(res);
          showAlert(res?.data?.message, "success");
          setAdminEmailValue("");
          setNameValue("");
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
            <label className="form-label fs-6 fw-bold">Name:</label>
            <input
              placeholder="Enter Name"
              type="text"
              name="text"
              autoComplete="off"
              className="form-control bg-transparent"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
            />
          </div>

          <div className="mb-10">
            <label className="form-label fs-6 fw-bold">Business Email:</label>
            <input
              placeholder="Enter Admin Email"
              type="text"
              name="text"
              autoComplete="off"
              className="form-control bg-transparent"
              value={adminEmailValue}
              onChange={(e) => setAdminEmailValue(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label className="form-label fs-6 fw-bold">Country:</label>
            <select 
            className="form-control bg-transparent"
            name="" 
            id=""
            value={+countryValue}
              onChange={(e) => setCountryValue(e.target.value)}
            >
              <option value="">select country</option>
              {countries.map((country) => (
                <option key={country.id} value={country.name}>
                  {country.name}
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
            disabled={
              nameValue === "" || adminEmailValue === ""
            }
            onClick={editHandleSubmit}
          >
            {!editLoading && (
              <span className="indicator-label">
                {editItem ? "Edit" : "Continue"}
              </span>
            )}
            {(editLoading) && (
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

export { AddTenantModal };
