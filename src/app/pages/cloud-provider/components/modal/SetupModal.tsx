import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import useAlert from "../../../components/useAlert";
import {
  usePostSuppressionSetup,
  useUpdateSuppressionSetup,
  useGetAssets,
} from "../../../../api/api-services/systemQuery";
import { useGetRulesList } from "../../../../api/api-services/policyQuery";

import { useGetCloudProviderServicesList } from "../../../../api/api-services/cloudProviderQuery";
import {
  FaGlobe,
  FaBars,
  FaCheckSquare,
  FaComment,
  FaCalendar,
  FaServer,
} from "react-icons/fa";
import {
  CloudProviderResourceTypesList200Response,
  PolicyRulesList200Response,
} from "../../../../api/axios-client";

type Props = {};

const SetupModal = ({ editItem, handleHide, isOpen, mode, regions, handleRefetch }: any) => {
  const [setupData, setSetupData] = useState({
    region: editItem ? editItem.region : "",
    resource_id: editItem ? editItem.resource_type?.id : "",
    cloud_provider: "AWS",
    type: editItem ? editItem?.resource?.id : "",
    rule_id: editItem ? editItem.rule?.id : "",
    exp_date: editItem ? editItem.expiration : "",
    comment: editItem ? editItem.comments : "",
    status: editItem ? editItem.status : false,
  });

  const [allResource, setAllResource] = useState<any[]>([]);
  const [allRules, setAllRules] = useState<any[]>([]);
  const [allAssets, setAllAssets] = useState<any[]>([]);

  const { mutate, isLoading, error } = usePostSuppressionSetup();
  const { mutate: editMutate, isLoading: editLoading } =
    useUpdateSuppressionSetup();
  const { showAlert, hideAlert, Alert } = useAlert();

  const { data: resource } = useGetCloudProviderServicesList({
    page: 1,
    pageSize: 1000,
  });
  const resourcestr: CloudProviderResourceTypesList200Response | any = resource;
  const { data: assets } = useGetAssets({ page: 1, pageSize: 1000 });
  const assetstr: CloudProviderResourceTypesList200Response | any = assets;
  const { data: rules } = useGetRulesList({ page: 1, pageSize: 1000 });
  const rulesstr: PolicyRulesList200Response | any = rules;

  const editHandleSubmit = () => {
    editMutate(
      {
        id: editItem?.id,
        data: {
          cloud_provider: setupData?.cloud_provider,
          comments: setupData.comment,
          expiration: setupData.exp_date,
          region: setupData.region,
          resource: setupData.type,
          resource_type: setupData.resource_id,
          rule: setupData.rule_id,
          status: setupData.status,
        },
      },
      {
        onSuccess: (res: any) => {
          handleHide();
          handleRefetch();
          showAlert(res?.data?.message, "success");
          setSetupData({
            cloud_provider: "AWS",
            comment: "",
            exp_date: "",
            region: "",
            resource_id: "",
            rule_id: "",
            status: false,
            type: "",
          });
        },

        onError: (err) => {
          if (err instanceof Error) {
            showAlert(err?.message || "An unknown error occurred", "danger");
          }
        },
      }
    );
  };

  useEffect(() => {
    setAllResource(resourcestr?.data?.data?.results!);
    setAllRules(rulesstr?.data?.data?.results!);
    setAllAssets(assetstr?.data?.data?.results!);
  }, [rulesstr, resourcestr, assetstr]);

  const handleCreate = () => {
    mutate(
      {
        data: {
          cloud_provider: setupData?.cloud_provider,
          comments: setupData.comment,
          expiration: setupData.exp_date,
          region: setupData.region,
          resource: setupData.type,
          resource_type: setupData.resource_id,
          rule: setupData.rule_id,
          status: setupData.status,
        },
      },
      {
        onSuccess: (res: any) => {
          handleRefetch();
          showAlert(res?.data?.message, "success");
          setSetupData({
            cloud_provider: "AWS",
            comment: "",
            exp_date: "",
            region: "",
            resource_id: "",
            rule_id: "",
            status: false,
            type: "",
          });
          handleHide();
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
        <Modal.Header
          closeButton
          className="border-0 pt-3 pr-3 pb-0"
        ></Modal.Header>
        <Modal.Body>
          {editItem ? (
            <div className="w-full mb-3 pb-3 border-bottom flex items-center justify-center flex-col gap-2">
              <div className="bg-[#284CB31A] rounded-full w-12 h-12 flex items-center justify-center">
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
                    d="M5.4375 9C5.4375 10.9675 7.03249 12.5625 9 12.5625C10.9675 12.5625 12.5625 10.9675 12.5625 9C12.5625 7.03249 10.9675 5.4375 9 5.4375C7.03249 5.4375 5.4375 7.03249 5.4375 9ZM9 11.4375C7.65381 11.4375 6.5625 10.3462 6.5625 9C6.5625 7.65381 7.65381 6.5625 9 6.5625C10.3462 6.5625 11.4375 7.65381 11.4375 9C11.4375 10.3462 10.3462 11.4375 9 11.4375Z"
                    fill="#284CB3"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.49171 16.8687C9.18592 17.0386 8.81409 17.0386 8.50829 16.8687L2.20829 13.3687C1.88685 13.1901 1.6875 12.8513 1.6875 12.4836L1.68749 5.51316C1.68749 5.14545 1.88684 4.80665 2.20827 4.62807L8.50829 1.12807C8.81409 0.958187 9.18592 0.958185 9.49171 1.12807L15.7917 4.62807C16.1131 4.80665 16.3125 5.14545 16.3125 5.51315L16.3125 12.4836C16.3125 12.8513 16.1131 13.1901 15.7917 13.3687L9.49171 16.8687ZM9 15.8549L15.1875 12.4174L15.1875 5.57935L9 2.14185L2.81249 5.57935L2.8125 12.4174L9 15.8549Z"
                    fill="#284CB3"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.8666 5.18396C15.7157 4.91239 15.3733 4.81455 15.1017 4.96542L11.4267 7.00709C11.1552 7.15796 11.0573 7.50041 11.2082 7.77198C11.3591 8.04355 11.7015 8.14139 11.9731 7.99052L15.6481 5.94885C15.9196 5.79798 16.0175 5.45552 15.8666 5.18396ZM2.15451 5.19581C2.00364 5.46737 2.10149 5.80983 2.37305 5.9607L6.02674 7.99052C6.29831 8.14139 6.64076 8.04354 6.79163 7.77198C6.9425 7.50041 6.84466 7.15796 6.57309 7.00709L2.9194 4.97727C2.64783 4.8264 2.30538 4.92424 2.15451 5.19581Z"
                    fill="#284CB3"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9 16.3125C8.68934 16.3125 8.4375 16.0607 8.4375 15.75V12C8.4375 11.6893 8.68934 11.4375 9 11.4375C9.31066 11.4375 9.5625 11.6893 9.5625 12V15.75C9.5625 16.0607 9.31066 16.3125 9 16.3125Z"
                    fill="#284CB3"
                  />
                </svg>
              </div>
              <h1 className="text-[18px] font-semibold">Edit Setup</h1>
              <p
                className={`text-[12px] font-medium ${
                  mode === "dark" ? "text-[#FFFFFF]" : "text-[#6A6A6A]"
                }`}
              >
                Suppression ID: {editItem?.id}
              </p>
            </div>
          ) : (
            <div className="w-full mb-3 pb-3 border-bottom flex items-center justify-center flex-col gap-2">
              <div className="bg-[#284CB31A] rounded-full w-12 h-12 flex items-center justify-center">
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
                    d="M5.4375 9C5.4375 10.9675 7.03249 12.5625 9 12.5625C10.9675 12.5625 12.5625 10.9675 12.5625 9C12.5625 7.03249 10.9675 5.4375 9 5.4375C7.03249 5.4375 5.4375 7.03249 5.4375 9ZM9 11.4375C7.65381 11.4375 6.5625 10.3462 6.5625 9C6.5625 7.65381 7.65381 6.5625 9 6.5625C10.3462 6.5625 11.4375 7.65381 11.4375 9C11.4375 10.3462 10.3462 11.4375 9 11.4375Z"
                    fill="#284CB3"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.49171 16.8687C9.18592 17.0386 8.81409 17.0386 8.50829 16.8687L2.20829 13.3687C1.88685 13.1901 1.6875 12.8513 1.6875 12.4836L1.68749 5.51316C1.68749 5.14545 1.88684 4.80665 2.20827 4.62807L8.50829 1.12807C8.81409 0.958187 9.18592 0.958185 9.49171 1.12807L15.7917 4.62807C16.1131 4.80665 16.3125 5.14545 16.3125 5.51315L16.3125 12.4836C16.3125 12.8513 16.1131 13.1901 15.7917 13.3687L9.49171 16.8687ZM9 15.8549L15.1875 12.4174L15.1875 5.57935L9 2.14185L2.81249 5.57935L2.8125 12.4174L9 15.8549Z"
                    fill="#284CB3"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.8666 5.18396C15.7157 4.91239 15.3733 4.81455 15.1017 4.96542L11.4267 7.00709C11.1552 7.15796 11.0573 7.50041 11.2082 7.77198C11.3591 8.04355 11.7015 8.14139 11.9731 7.99052L15.6481 5.94885C15.9196 5.79798 16.0175 5.45552 15.8666 5.18396ZM2.15451 5.19581C2.00364 5.46737 2.10149 5.80983 2.37305 5.9607L6.02674 7.99052C6.29831 8.14139 6.64076 8.04354 6.79163 7.77198C6.9425 7.50041 6.84466 7.15796 6.57309 7.00709L2.9194 4.97727C2.64783 4.8264 2.30538 4.92424 2.15451 5.19581Z"
                    fill="#284CB3"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9 16.3125C8.68934 16.3125 8.4375 16.0607 8.4375 15.75V12C8.4375 11.6893 8.68934 11.4375 9 11.4375C9.31066 11.4375 9.5625 11.6893 9.5625 12V15.75C9.5625 16.0607 9.31066 16.3125 9 16.3125Z"
                    fill="#284CB3"
                  />
                </svg>
              </div>
              <h1 className="text-[18px] font-semibold">
                Setup new suppression
              </h1>
              <p
                className={`text-[12px] font-medium ${
                  mode === "dark" ? "text-[#FFFFFF]" : "text-[#6A6A6A]"
                }`}
              >
                Suppressions are used to ignore specific checks.
              </p>
            </div>
          )}
          <div className="grid md:grid-cols-2 gap-3">
            <div className="">
              <label className="form-label fs-6 fw-bold flex items-center gap-2">
                <FaServer color={mode === "dark" ? "#FFFFFF" : "#373737"} />
                <p>Cloud Provider <span className="text-red-500">*</span></p>
              </label>
              <select
                data-placeholder="Select option"
                autoComplete="off"
                className="form-control bg-transparent"
                disabled
                value={setupData.cloud_provider}
                onChange={(e) =>
                  setSetupData({ ...setupData, cloud_provider: e.target.value })
                }
              >
                <option value="">Select Provider</option>
                {[
                  {
                    id: "AWS",
                    name: "aws",
                  },
                  {
                    id: "AZURE",
                    name: "azure",
                  },
                  {
                    id: "GPC",
                    name: "gpc",
                  },
                ]?.map((item: any) => (
                  <option key={item?.id} value={item?.id}>
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="">
              <label className="form-label fs-6 fw-bold flex items-center gap-2">
                <FaGlobe color={mode === "dark" ? "#FFFFFF" : "#373737"} />
                <p>Suppress by Region <span className="text-red-500">*</span></p>
              </label>
              <select
                data-placeholder="Select option"
                autoComplete="off"
                className="form-control bg-transparent"
                value={setupData.region}
                onChange={(e) =>
                  setSetupData({ ...setupData, region: e.target.value })
                }
              >
                <option value="">Select Region</option>
                {regions?.map((item: any) => (
                  <option key={item?.id} value={item?.region_name}>
                    {item?.region_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="">
              <label className="form-label fs-6 fw-bold flex items-center gap-2">
                <FaBars color={mode === "dark" ? "#FFFFFF" : "#373737"} />
                <p>Suppress by Resource Type <span className="text-red-500">*</span></p>
              </label>
              <select
                data-placeholder="Select option"
                autoComplete="off"
                className="form-control bg-transparent"
                value={setupData.resource_id}
                onChange={(e) =>
                  setSetupData({ ...setupData, resource_id: +e.target.value })
                }
              >
                <option value="">Select Resource Type</option>
                {allResource?.map((item) => (
                  <option key={item?.id} value={item?.id}>
                    {item?.resource_type}
                  </option>
                ))}
              </select>
            </div>
            <div className="">
              <label className="form-label fs-6 fw-bold flex items-center gap-2">
                <FaBars color={mode === "dark" ? "#FFFFFF" : "#373737"} />
                <p>Suppress by Specific resource <span className="text-red-500">*</span></p>
              </label>
              <select
                data-placeholder="Select option"
                autoComplete="off"
                className="form-control bg-transparent"
                value={setupData.type}
                onChange={(e) =>
                  setSetupData({ ...setupData, type: +e.target.value })
                }
              >
                <option value="">Select Resource Type</option>
                {allAssets?.map((item) => (
                  <option key={item?.id} value={item?.id}>
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="">
              <label className="form-label fs-6 fw-bold flex items-center gap-2">
                <FaCheckSquare
                  color={mode === "dark" ? "#FFFFFF" : "#373737"}
                />
                <p>Suppress by Rule <span className="text-red-500">*</span></p>
              </label>
              <select
                data-placeholder="Select option"
                autoComplete="off"
                className="form-control bg-transparent"
                value={setupData.rule_id}
                onChange={(e) =>
                  setSetupData({ ...setupData, rule_id: +e.target.value })
                }
              >
                <option value="">Select Rule</option>
                {allRules?.map((item) => (
                  <option key={item?.id} value={item?.id}>
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="">
              <label className="form-label fs-6 fw-bold flex items-center gap-2">
                <FaCalendar color={mode === "dark" ? "#FFFFFF" : "#373737"} />
                <p>Expiration Date <span className="text-red-500">*</span></p>
              </label>
              <input
                placeholder="Enter Date"
                type="date"
                name="date"
                autoComplete="off"
                className="form-control bg-transparent"
                value={setupData.exp_date}
                onChange={(e) =>
                  setSetupData({ ...setupData, exp_date: e.target.value })
                }
              />
              <p className="text-[10px] font-medium mt-1">
                Expiration date can make suppression setup temporary or
                permanent{" "}
              </p>
            </div>
            <div className="md:col-span-2">
              <label className="form-label fs-6 fw-bold flex items-center gap-2">
                <FaComment color={mode === "dark" ? "#FFFFFF" : "#373737"} />
                <p>Comment <span className="text-red-500">*</span></p>
              </label>
              <textarea
                placeholder="Enter Comment"
                name="code"
                autoComplete="off"
                className="form-control bg-transparent"
                rows={3}
                cols={10}
                value={setupData.comment}
                onChange={(e) =>
                  setSetupData({ ...setupData, comment: e.target.value })
                }
              ></textarea>
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="status"
                className="form-label fs-6 fw-bold flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  name="status"
                  id="status"
                  className="bg-transparent w-5 h-5 rounded-md"
                  checked={setupData.status}
                  onChange={(e) =>
                    setSetupData({ ...setupData, status: e.target.checked })
                  }
                />
                <span>Suppress this check until further notice</span>
              </label>
            </div>
          </div>
        </Modal.Body>
        <Alert />
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-light rounded-full font-medium "
            onClick={handleHide}
          >
            Close
          </button>
          <button
            type="button"
            className={`rounded-full bg-primary text-white font-medium  py-2 px-4 ${
              editItem ? "w-32" : "w-fit"
            }`}
            disabled={
              !setupData.comment ||
              !setupData.exp_date ||
              !setupData.region ||
              !setupData.resource_id ||
              !setupData.rule_id ||
              !setupData.type
            }
            onClick={editItem ? editHandleSubmit : handleCreate}
          >
            {!isLoading && !editLoading && (
              <span className="indicator-label font-medium ">
                {editItem ? "Save" : "Create Suppression"}
              </span>
            )}
            {(isLoading || editLoading) && (
              <span className="indicator-progress" style={{ display: "block" }}>
                Please wait...{" "}
                <span className=" font-medium spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            )}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SetupModal;
