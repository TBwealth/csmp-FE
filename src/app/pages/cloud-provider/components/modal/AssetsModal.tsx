import React, { Dispatch, useState } from "react";
import { Modal } from "react-bootstrap";


const AssetsModal = ({ isOpen, handleHide }: any) => {
  const [assetValue, setAssetValue] = useState({
    name: "",
    code: "",
    description: "",
  });
  const handleRunPolicy = () => {
    console.log("Added Assets");
    handleHide();
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
          <Modal.Title>Add Asset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-10">
            <label className="form-label fs-6 fw-bold">Name:</label>
            <input
              placeholder="Asset Name"
              type="text"
              name="Asset"
              autoComplete="off"
              className="form-control bg-transparent"
              value={assetValue.name}
              onChange={(e) =>
                setAssetValue({ ...assetValue, name: e.target.value })
              }
            />
          </div>
          <div className="mb-10">
            <label className="form-label fs-6 fw-bold">Code:</label>
            <input
              placeholder="Asset Code"
              type="text"
              name="Asset"
              autoComplete="off"
              className="form-control bg-transparent"
              value={assetValue.code}
              onChange={(e) =>
                setAssetValue({ ...assetValue, code: e.target.value })
              }
            />
          </div>
          <div className="">
            <label className="form-label fs-6 fw-bold">Description:</label>
            <textarea
              name="description"
              id="description"
              cols={30}
              rows={5}
              placeholder="Enter description"
              className="form-control bg-transparent"
              value={assetValue.description}
              onChange={(e) =>
                setAssetValue({ ...assetValue, description: e.target.value })
              }
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-light" onClick={handleHide}>
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={
             !assetValue.code || !assetValue.description || !assetValue.name
            }
            onClick={handleRunPolicy}
          >
            {/* {!isLoading && !editLoading && (
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
              ))} */}
            Continue
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AssetsModal;
