import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { FaLink, FaUser, FaKey, FaCode } from "react-icons/fa";
import { MdShield } from "react-icons/md";
import { Link } from "react-router-dom";

type Props = {
  data: any;
  isOpen: boolean;
  onClose: any;
  mode: string;
};

const NewIntegrationModal = ({ data, onClose, isOpen, mode }: Props) => {
  const [isAtForm, setIsAtForm] = useState(true);
  const [showCopied, setShowCopied] = useState(false);
  const handleCopy = (text: string) => {
    window.navigator.clipboard.writeText(text);
    setShowCopied(true);
  };
  return (
    <Modal
      size="lg"
      show={isOpen}
      onHide={() => {
        onClose();
        setIsAtForm(true);
      }}
      keyboard={false}
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title>
          {isAtForm ? (
            <div className="flex items-center gap-[16px]">
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
                  fillOpacity="0.05"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.9375 15.75C15.9375 15.4393 16.1893 15.1875 16.5 15.1875H25.5C25.8107 15.1875 26.0625 15.4393 26.0625 15.75V21.75C26.0625 22.0607 25.8107 22.3125 25.5 22.3125H21.5625V25.6875H27.75C28.0607 25.6875 28.3125 25.9393 28.3125 26.25C28.3125 26.5607 28.0607 26.8125 27.75 26.8125H14.25C13.9393 26.8125 13.6875 26.5607 13.6875 26.25C13.6875 25.9393 13.9393 25.6875 14.25 25.6875H20.4375V22.3125H16.5C16.1893 22.3125 15.9375 22.0607 15.9375 21.75V15.75ZM17.0625 16.3125V21.1875H24.9375V16.3125H17.0625Z"
                  fill="#284CB3"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19.1338 18.3319C19.3647 18.5398 19.3834 18.8954 19.1756 19.1263L19.1681 19.1346C18.9603 19.3656 18.6046 19.3843 18.3737 19.1764C18.1428 18.9686 18.1241 18.6129 18.3319 18.382L18.3394 18.3737C18.5473 18.1428 18.9029 18.1241 19.1338 18.3319Z"
                  fill="#284CB3"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M21.3838 18.3319C21.6147 18.5398 21.6334 18.8954 21.4256 19.1263L21.4181 19.1346C21.2103 19.3656 20.8546 19.3843 20.6237 19.1764C20.3928 18.9686 20.3741 18.6129 20.5819 18.382L20.5894 18.3737C20.7973 18.1428 21.1529 18.1241 21.3838 18.3319Z"
                  fill="#284CB3"
                />
              </svg>
              <h2 className="text-[18px] font-semibold">
                {data?.name} Integration
              </h2>
            </div>
          ) : (
            <div className="flex items-center gap-[16px]">
              <button className="flex items-center justify-center bg-none" onClick={() => setIsAtForm(true)}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.5303 5.46967C12.8232 5.76256 12.8232 6.23744 12.5303 6.53033L7.81066 11.25H18.5C18.9142 11.25 19.25 11.5858 19.25 12C19.25 12.4142 18.9142 12.75 18.5 12.75H7.81066L12.5303 17.4697C12.8232 17.7626 12.8232 18.2374 12.5303 18.5303C12.2374 18.8232 11.7626 18.8232 11.4697 18.5303L5.46967 12.5303C5.17678 12.2374 5.17678 11.7626 5.46967 11.4697L11.4697 5.46967C11.7626 5.17678 12.2374 5.17678 12.5303 5.46967Z"
                    fill="#373737"
                  />
                </svg>
              </button>
              <div className="flex items-center gap-[16px]">
                <h2 className="text-[18px] font-semibold">
                  {data?.name} Onboarding
                </h2>
                <Link
                  to="/"
                  className={`border-start pl-[16px] underline ${
                    mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
                  }`}
                >
                  Need help? Click here
                </Link>
              </div>
            </div>
          )}
        </Modal.Title>
      </Modal.Header>
      {isAtForm ? (
        <Modal.Body className="flex items-center flex-col md:flex-row gap-[206px] px-[32px] py-[16px]">
          {data?.name !== "Kubernetes" ? (
            <div className="w-full md:w-[60%] flex flex-col items-center gap-[32px]">
              <div className="w-full">
                <label
                  htmlFor="url"
                  className="flex mb-[8px] items-center gap-[10px]"
                >
                  <FaLink />
                  <p className="text-[14px] font-medium">Git URL</p>
                </label>
                <input
                  type="text"
                  name="url"
                  placeholder="HTTPS"
                  autoComplete="off"
                  //   value={data?.cloud_name}
                  //   onChange={(e) => setData({ ...data, cloud_name: e.target.value })}
                  className="w-full p-3 font-medium rounded-md border-2 border-light placeholder:font-medium"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="username"
                  className="flex mb-[8px] items-center gap-[10px]"
                >
                  <FaUser />
                  <p className="text-[14px] font-medium">Username</p>
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="GIT USERNAME"
                  autoComplete="off"
                  //   value={data?.cloud_name}
                  //   onChange={(e) => setData({ ...data, cloud_name: e.target.value })}
                  className="w-full p-3 font-medium rounded-md border-2 border-light placeholder:font-medium"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="phrase"
                  className="flex mb-[8px] items-center gap-[10px]"
                >
                  <FaKey />
                  <p className="text-[14px] font-medium">Passphrase </p>
                </label>
                <input
                  type="text"
                  name="phrase"
                  placeholder="************************"
                  autoComplete="off"
                  //   value={data?.cloud_name}
                  //   onChange={(e) => setData({ ...data, cloud_name: e.target.value })}
                  className="w-full p-3 font-medium  rounded-md border-2 border-light placeholder:font-medium"
                />
              </div>
            </div>
          ) : (
            <div className="w-full md:w-[60%] flex flex-col items-center gap-[32px]">
              <div className="w-full">
                <label
                  htmlFor="env"
                  className="flex mb-[8px] items-center gap-[10px]"
                >
                  <FaCode />
                  <p className="text-[14px] font-medium">Enviroment</p>
                </label>
                <input
                  type="text"
                  name="env"
                  placeholder="Eg: Staging, Prod. . ."
                  autoComplete="off"
                  //   value={data?.cloud_name}
                  //   onChange={(e) => setData({ ...data, cloud_name: e.target.value })}
                  className="w-full p-3 font-medium rounded-md border-2 border-light placeholder:font-medium"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="key"
                  className="flex mb-[8px] items-center gap-[10px]"
                >
                  <FaKey />
                  <p className="text-[14px] font-medium">Key</p>
                </label>
                <input
                  type="text"
                  name="key"
                  placeholder="************************"
                  autoComplete="off"
                  //   value={data?.cloud_name}
                  //   onChange={(e) => setData({ ...data, cloud_name: e.target.value })}
                  className="w-full p-3 font-medium rounded-md border-2 border-light placeholder:font-medium"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="secret"
                  className="flex mb-[8px] items-center gap-[10px]"
                >
                  <MdShield />
                  <p className="text-[14px] font-medium">API Secret:</p>
                </label>
                <input
                  type="text"
                  name="secret"
                  placeholder="************************"
                  autoComplete="off"
                  //   value={data?.cloud_name}
                  //   onChange={(e) => setData({ ...data, cloud_name: e.target.value })}
                  className="w-full p-3 font-medium  rounded-md border-2 border-light placeholder:font-medium"
                />
              </div>
            </div>
          )}
          <div className="border w-52 h-48 shadow-md rounded-[12px] flex flex-col  gap-[16px] items-center justify-center p-[32px]">
            <img src={data?.logo} alt={`${data?.name} logo`} className="m-0" />
            <h2 className="w-full font-semibold text-center text-[16px]">
              {data?.name}
            </h2>
          </div>
        </Modal.Body>
      ) : (
        <Modal.Body className="flex items-center flex-col  gap-[32px] px-[32px] py-[16px]">
          <div className="w-full">
            <h2 className="font-semibold text-[18px]">
              Installation Instructions
            </h2>
            <p
              className={`${
                mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
              } text-[14px] font-medium`}
            >
              Install CloudGuard agent in your Kubernetes cluster using the
              following Helm command. Refer to documentation. for prerequisites,
              connectivity requirements, supported configurations, etc.
            </p>
          </div>
          <div className="w-full">
            {showCopied && (
              <span className="flex items-end justify-end font-medium text-red-500 italic text-xs mb-1">
                copied!
              </span>
            )}
            <div className="rounded-[8px] bg-[#F7F7F8] border-2 px-[16px] py-[4px] flex items-start justify-start">
              <p className="text-primary font-medium">
                helm upgrade --install asset-mgmt cloudguard --repo
                https://raw.githubusercontent.com/CheckPointSW/charts/master/repository/
                --set credentials.user=sd --set credentials.secret=sd --set
                clusterID=cda238a9-3888-4f6c-ad64-7a76f1f58eb0 --set
                addons.imageScan.enabled=true --set
                addons.admissionControl.enabled=true --set
                addons.runtimeProtection.enabled=true --namespace checkpoint
                --create-namespace
              </p>
              <button
                onClick={() =>
                  handleCopy(`helm upgrade --install asset-mgmt cloudguard --repo
              https://raw.githubusercontent.com/CheckPointSW/charts/master/repository/
              --set credentials.user=sd --set credentials.secret=sd --set
              clusterID=cda238a9-3888-4f6c-ad64-7a76f1f58eb0 --set
              addons.imageScan.enabled=true --set
              addons.admissionControl.enabled=true --set
              addons.runtimeProtection.enabled=true --namespace checkpoint
              --create-namespace`)
                }
                className="bg-[#284CB30D] p-4 rounded-full flex items-center justify-center"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.1875 7.2C6.1875 6.64081 6.64081 6.1875 7.2 6.1875H14.55C15.1092 6.1875 15.5625 6.64081 15.5625 7.2V14.55C15.5625 15.1092 15.1092 15.5625 14.55 15.5625H7.2C6.64081 15.5625 6.1875 15.1092 6.1875 14.55V7.2ZM7.3125 7.3125V14.4375H14.4375V7.3125H7.3125Z"
                    fill="#284CB3"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.4375 3.45C2.4375 2.89081 2.89081 2.4375 3.45 2.4375H10.8C11.3592 2.4375 11.8125 2.89081 11.8125 3.45V6.75C11.8125 7.06066 11.5607 7.3125 11.25 7.3125C10.9393 7.3125 10.6875 7.06066 10.6875 6.75V3.5625H3.5625V10.6875H6.75C7.06066 10.6875 7.3125 10.9393 7.3125 11.25C7.3125 11.5607 7.06066 11.8125 6.75 11.8125H3.45C2.89081 11.8125 2.4375 11.3592 2.4375 10.8V3.45Z"
                    fill="#284CB3"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="">
            <p className="font-medium text-[14px]">
              <b>Note: </b>for installation on GKE Autopilot, append '--set
              platform=gke.autopilot' to the Helm command. Notice that Autopilot
              version 1.25 or above is required, and that Runtime Protection
              blade is currently not supported ('--set
              addons.runtimeProtection.enabled=false').
            </p>
            <br />
            <br />
            <p className="font-medium text-[14px]">
              <b>Note: </b> for installation on Rancher, append '--set
              platform=k3s' to the Helm command.
            </p>
          </div>
          <table className="w-full font-medium border">
            <thead className="bg-[#F7F7F8] font-semibold">
              <th className="p-[4px]">Operating System</th>
              <th className="p-[4px]">Headers installation command</th>
            </thead>
            <tbody>
              <tr className="border-bottom">
                <td className="p-[4px]">Google COS / AWS Bottlerocket</td>
                <td className="p-[4px]">not required</td>
              </tr>
              <tr className="border-bottom">
                <td className="p-[4px]">Ubuntu / Debian</td>
                <td className="p-[4px]">
                  apt-get install -y linux-headers-$(uname -r)
                </td>
              </tr>
              <tr className="border-bottom">
                <td className="p-[4px]">CentOS / RHEL</td>
                <td className="p-[4px]">
                  yum -y install kernel-devel-$(uname -r)
                </td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
      )}

      <Modal.Footer className="flex items-end gap-[12px] justify-end mt-[32px]">
        <button
          onClick={() => {
            if (!isAtForm) {
              setIsAtForm(true);
            } else {
              onClose();
            }
          }}
          className="bg-[#284CB3]/40 w-36 font-medium rounded-full px-[24px] py-[12px] text-white text-center"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            if (isAtForm && data?.name === "Kubernetes") {
              setIsAtForm(false);
            } else {
              sessionStorage.setItem("data", JSON.stringify(data));
            }
          }}
          //   disabled={!data?.cloud_name || !data?.environment}
          className="bg-[#284CB3] w-48 font-medium rounded-full px-[24px] py-[12px] text-white text-center"
        >
          Continue
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewIntegrationModal;
