import { Dispatch, useEffect, useState } from "react";
import { useUpdateRepoScan } from "../../../../api/api-services/policyQuery";
import useAlert from "../../../components/useAlert";
import { Modal } from "react-bootstrap";

type Props = {
  isOpen: boolean;
  handleHide: Dispatch<void>;
  data: any;
};

const RepoDetails = ({ isOpen, handleHide, data }: Props) => {
  const [items, setItems] = useState<any>({
    access_token: "",
    repo_url: "",
    repo_type: "",
    repo_name: "",
    tenant: "",
  });

  useEffect(() => {
    setItems(data);
  }, [data]);

  const { showAlert, Alert } = useAlert();
  const { mutate, isLoading } = useUpdateRepoScan();

  const editHandleSubmit = () => {
    mutate(
      {
        id: data?.id,
        data: {
          access_token: items?.access_token,
          repo_type: items.repo_type,
          repo_url: items.repo_url,
          repo_name: items.repo_name,
        },
      },
      {
        onSuccess: (res: any) => {
          console.log(res);
          showAlert(res?.data?.message, "success");
        },
        onError: (err) => {
          if (err instanceof Error) {
            showAlert(err?.message || "An unknown error occurred", "danger");
            // showAlert(err?.response?.data?.message, "danger");
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
          <Modal.Title>Repository Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="group mb-4">
            <label htmlFor="token" className="font-medium text-[14px]">
              Access Token
            </label>
            <input
              type="text"
              name="token"
              id="token"
              className="form-control bg-transparent"
              value={items?.access_token}
              onChange={(e) =>
                setItems({ ...items, access_token: e.target.value })
              }
            />
          </div>
          <div className="group mb-4">
            <label htmlFor="url" className="font-medium text-[14px]">
              Repo Url
            </label>
            <input
              type="text"
              name="url"
              id="url"
              className="form-control bg-transparent"
              value={items?.repo_url}
              onChange={(e) => setItems({ ...items, repo_url: e.target.value })}
            />
          </div>
          <div className="group mb-4">
            <label htmlFor="type" className="font-medium text-[14px]">
              Repo Type
            </label>
            <select
              name="type"
              id="type"
              className="form-control bg-transparent"
              value={items?.repo_type}
              onChange={(e) =>
                setItems({ ...items, repo_type: e.target.value })
              }
            >
              <option value-="" className="font-medium">
                select repo type
              </option>
              <option value="Github" className="font-medium">
                Github
              </option>
              <option value="Git Lab" className="font-medium">
                Git Lab
              </option>
              <option value="Bit Bucket" className="font-medium">
                Bit Bucket
              </option>
              <option value="Docker Hub" className="font-medium">
                Docker Hub
              </option>
            </select>
          </div>
          <div className="group mb-4">
            <label htmlFor="name" className="font-medium text-[14px]">
              Repo Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control bg-transparent"
              value={items?.repo_name}
            />
          </div>
          <div className="group">
            <label htmlFor="tenant" className="font-medium text-[14px]">
              Tenant
            </label>
            <input
              type="text"
              name="tenant"
              disabled
              id="tenant"
              className="form-control bg-transparent"
              value={items?.tenant}
            />
          </div>
        </Modal.Body>
        <Alert />
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => handleHide()}
          >
            Close
          </button>
          <button
            type="button"
            className="py-[8px] px-[24px] bg-primary font-medium text-white flex items-center justify-center rounded-full"
            disabled={
              !items.access_token ||
              !items.repo_url ||
              !items.repo_type ||
              !items.repo_name
            }
            onClick={editHandleSubmit}
          >
            {!isLoading && <span className="indicator-label">Continue</span>}
            {isLoading && (
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

export default RepoDetails;
