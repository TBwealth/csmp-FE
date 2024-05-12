import { Dispatch, useEffect, useState } from "react";
import useAlert from "../../../components/useAlert";
import { Modal } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import modeAtomsAtom from "../../../../atoms/modeAtoms.atom";

type Props = {
  isOpen: boolean;
  handleHide: Dispatch<void>;
};

const ResolveModal = ({ isOpen, handleHide }: Props) => {
  const { showAlert, hideAlert, Alert } = useAlert();
  const { mode } = useRecoilValue(modeAtomsAtom);
  return (
    <>
      <Modal
        show={isOpen}
        onHide={handleHide}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="w-full">
            <div className="flex items-center justify-center gap-2 flex-col px-4 pb-2 border-bottom">
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
                <g clip-path="url(#clip0_269_2077)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M21 20.0625C21.3107 20.0625 21.5625 20.3143 21.5625 20.625V24.375C21.5625 24.6857 21.3107 24.9375 21 24.9375C20.6893 24.9375 20.4375 24.6857 20.4375 24.375V20.625C20.4375 20.3143 20.6893 20.0625 21 20.0625Z"
                    fill="#284CB3"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M21.3838 17.2069C21.6147 17.4147 21.6334 17.7704 21.4256 18.0013L21.4181 18.0096C21.2103 18.2405 20.8546 18.2593 20.6237 18.0514C20.3928 17.8436 20.3741 17.488 20.5819 17.257L20.5894 17.2487C20.7972 17.0178 21.1529 16.9991 21.3838 17.2069Z"
                    fill="#284CB3"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M21 14.0625C17.1685 14.0625 14.0625 17.1685 14.0625 21C14.0625 24.8315 17.1685 27.9375 21 27.9375C24.8315 27.9375 27.9375 24.8315 27.9375 21C27.9375 17.1685 24.8315 14.0625 21 14.0625ZM12.9375 21C12.9375 16.5472 16.5472 12.9375 21 12.9375C25.4528 12.9375 29.0625 16.5472 29.0625 21C29.0625 25.4528 25.4528 29.0625 21 29.0625C16.5472 29.0625 12.9375 25.4528 12.9375 21Z"
                    fill="#284CB3"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_269_2077">
                    <rect
                      width="18"
                      height="18"
                      fill="white"
                      transform="translate(12 12)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <p className="font-bold text-xl">
                S3 Bucket Public Access Via Policy
              </p>
              <p
                className={`${
                  mode === "dark" ? "text-[#484848]" : "text-[#6A6A6A]"
                }`}
              >
                ID: 32749748347282
              </p>
            </div>
            <div className="mt-4 grid md:grid-cols-3 gap-3 pb-2 border-bottom px-4">
              <p>Status:</p>
              <p className="text-[#FF161A] md:col-span-2">Failed</p>
              <p>Resource Id:</p>
              <p className="md:col-span-2">sg-04cc9e5ccd9ca7f80</p>
              <p>Resource:</p>
              <p className="md:col-span-2">launch-wizard-7</p>
              <p>Message:</p>
              <p className="md:col-span-2">
                Security group launch-wizard-1 allows ingress from 0.0.0.0/0 or
                ::/0 to ports 11211, 11211
              </p>
              <p>Description:</p>
              <p className="md:col-span-2">
                launch-wizard-1 created 2023-11-23T14:35:09.092Z
              </p>
            </div>
            <div className="mt-4 px-4 pb-2">
              <h2 className="text-lg mb-3">Remediation</h2>
              <div className="p-4 rounded-md bg-[#284CB31A] flex items-center gap-2">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.75 13.5H11.25"
                    stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7.5 15.75H10.5"
                    stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6.74989 11.25C6.75 9.75 6.375 9.375 5.62489 8.625C4.87477 7.875 4.51743 7.11517 4.49989 6C4.4639 3.71271 5.99977 2.25 8.99989 2.25C12 2.25 13.5359 3.71271 13.4999 6C13.4823 7.11517 13.1248 7.875 12.3749 8.625C11.625 9.375 11.25 9.75 11.2499 11.25"
                    stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p className="w-[90%]">
                  Check your Amazon EC2 security groups for inbound rules that
                  allow unrestricted access (i.e. 0.0.0.0/0 or ::/0) on TCP
                  and/or UDP port 11211 in order to reduce the attack surface
                  and protect the Memcached cache server instances associated
                  with your security groups. Memcached is an open-source,
                  high-performance, distributed memory object caching system,
                  intended for use in speeding up dynamic websites and web
                  applications by alleviating database load.
                </p>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Alert />
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              // setShowTicket(true);
              handleHide()
            }}
          >
            Create Ticket
          </button>
          {/* <button
            type="button"
            className="btn btn-primary"
            disabled={!policy?.name || !policy?.code}
            onClick={editItem ? handleEditPolicy : handleCreatePolicy}
          >
            {!isLoading && !editLoading && (
              <span className="indicator-label">
                {editItem ? "Edit" : "Continue"}
              </span>
            )}
            {(isLoading || editLoading) && (
              <span className="indicator-progress" style={{ display: "block" }}>
                Please wait...{" "}
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            )}
          </button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ResolveModal;
