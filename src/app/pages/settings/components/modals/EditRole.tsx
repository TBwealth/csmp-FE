import React from "react";
import { FaUser } from "react-icons/fa";
import { Modal } from "react-bootstrap";



const EditRole = ({ data, isOpen, handleHide, task, mode }: any) => {
  return (
    <Modal
      show={isOpen}
      onHide={() => {
        handleHide();
        //   formik.resetForm();
      }}
      keyboard={false}
    >
      <Modal.Header
        closeButton
        className="border-0 pt-3 pr-3 pb-0"
      ></Modal.Header>
      <Modal.Body>
        <div className="w-full mb-3 pb-3 border-bottom flex items-center justify-center flex-col gap-2">
          <div className="bg-[#284CB31A] mb-[16px] rounded-full w-12 h-12 flex items-center justify-center">
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
                d="M9 9.5625C6.41117 9.5625 4.3125 11.6612 4.3125 14.25V15C4.3125 15.3107 4.06066 15.5625 3.75 15.5625C3.43934 15.5625 3.1875 15.3107 3.1875 15V14.25C3.1875 11.0398 5.78984 8.4375 9 8.4375C12.2102 8.4375 14.8125 11.0398 14.8125 14.25V15C14.8125 15.3107 14.5607 15.5625 14.25 15.5625C13.9393 15.5625 13.6875 15.3107 13.6875 15V14.25C13.6875 11.6612 11.5888 9.5625 9 9.5625Z"
                fill="#284CB3"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 3.5625C7.65381 3.5625 6.5625 4.65381 6.5625 6C6.5625 7.34619 7.65381 8.4375 9 8.4375C10.3462 8.4375 11.4375 7.34619 11.4375 6C11.4375 4.65381 10.3462 3.5625 9 3.5625ZM5.4375 6C5.4375 4.03249 7.03249 2.4375 9 2.4375C10.9675 2.4375 12.5625 4.03249 12.5625 6C12.5625 7.96751 10.9675 9.5625 9 9.5625C7.03249 9.5625 5.4375 7.96751 5.4375 6Z"
                fill="#284CB3"
              />
            </svg>
          </div>
          <h1 className="text-[18px] font-semibold">
            {task === "edit" ? "Edit User Role" : "User Details"}
          </h1>
          <p
            className={`text-[12px] font-medium ${
              mode === "dark" ? "text-[#FFFFFF]" : "text-[#6A6A6A]"
            }`}
          >
            {task === "edit" ? `Change role of ${data?.name}` : `${data?.id}`}
          </p>
        </div>
        <div className="w-full px-[12px] pt-[12px]">
          <div className="p-[16px] w-full bg-[#284CB31A] rounded-[8px] border flex items-center justify-between">
            <div className="flex items-center gap-[16px]">
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="60"
                  height="60"
                  rx="30"
                  fill="#284CB3"
                  fillOpacity="0.1"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M30 31.0547C25.1459 31.0547 21.2109 34.9897 21.2109 39.8438V41.25C21.2109 41.8325 20.7387 42.3047 20.1562 42.3047C19.5738 42.3047 19.1016 41.8325 19.1016 41.25V39.8438C19.1016 33.8247 23.981 28.9453 30 28.9453C36.019 28.9453 40.8984 33.8247 40.8984 39.8438V41.25C40.8984 41.8325 40.4262 42.3047 39.8438 42.3047C39.2613 42.3047 38.7891 41.8325 38.7891 41.25V39.8438C38.7891 34.9897 34.8541 31.0547 30 31.0547Z"
                  fill="#284CB3"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M30 19.8047C27.4759 19.8047 25.4297 21.8509 25.4297 24.375C25.4297 26.8991 27.4759 28.9453 30 28.9453C32.5241 28.9453 34.5703 26.8991 34.5703 24.375C34.5703 21.8509 32.5241 19.8047 30 19.8047ZM23.3203 24.375C23.3203 20.6859 26.3109 17.6953 30 17.6953C33.6891 17.6953 36.6797 20.6859 36.6797 24.375C36.6797 28.0641 33.6891 31.0547 30 31.0547C26.3109 31.0547 23.3203 28.0641 23.3203 24.375Z"
                  fill="#284CB3"
                />
              </svg>
              <div className="">
                <h1 className="font-semibold text-[18px] mb-[4px]">
                  {data?.name}
                </h1>
                <p
                  className={`font-medium ${
                    mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
                  } text-[12px] col-span-2`}
                >
                  {data?.email}
                </p>
              </div>
            </div>
            <p
              className={`text-[12px] font-medium border-bottom pb-[16px] ${
                mode === "dark" ? "text-[#FFFFFF]" : "text-[#6A6A6A]"
              }`}
            >
              {data?.id}
            </p>
          </div>
          <div className="w-full pt-[24px]">
            {task === "edit" ? (
              <>
                <label
                  htmlFor="role"
                  className="flex mb-[8px] font-medium items-center gap-[8px]"
                >
                  <FaUser />
                  <span>Select user role</span>
                </label>
                <select
                  data-placeholder="Select option"
                  autoComplete="off"
                  className="form-control bg-transparent"
                  // value={region.cloud_provider}
                  // onChange={(e) =>
                  //   setRegion({ ...region, cloud_provider: e.target.value })
                  // }
                >
                  <option value="" className="font-medium">
                    Select Role
                  </option>
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
                  ]?.map((item) => (
                    <option
                      key={item?.id}
                      value={item?.id}
                      className="font-medium"
                    >
                      {/* {item?.cloud_provider_name} */}
                      {item?.name}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              <>
                <p className="rounded-full w-fit px-[16px] py-[2px] mb-[14px] text-[12px] font-semibold bg-[#284CB31A] text-primary">
                  {data?.role}
                </p>
                <p
                  className={`text-[12px] font-medium border-bottom pb-[16px] ${
                    mode === "dark" ? "text-[#FFFFFF]" : "text-[#6A6A6A]"
                  }`}
                >
                  {data?.permissions}
                </p>
                <div className="flex items-center pt-[24px] justify-between">
                  <div className="">
                    <h3 className="font-semibold text-[14px] mb-[8px]">
                      Created at
                    </h3>
                    <p
                      className={`text-[12px] font-medium pb-[24px] ${
                        mode === "dark" ? "text-[#FFFFFF]" : "text-[#6A6A6A]"
                      }`}
                    >
                      {data?.created_at}
                    </p>
                  </div>
                  <p
                    className={`font-medium ${
                      data?.status === "Active"
                        ? "text-[#2AB849]"
                        : data?.status === "Suspended"
                        ? "text-[#FF7D30]"
                        : "text-[#FF161A]"
                    } text-[12px]`}
                  >
                    {data?.status}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className=" border-0 flex items-end justify-end">
        {task === "edit" ? (
          <button
            type="button"
            className="bg-primary w-36 rounded-full text-white font-medium text-[12px] px-[24px] py-[8px] "
            onClick={handleHide}
          >
            Change
          </button>
        ) : (
          <button
            type="button"
            className="bg-primary w-32 rounded-full text-white font-medium text-[12px] px-[24px] py-[8px] "
            onClick={handleHide}
          >
            Done
          </button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default EditRole;
