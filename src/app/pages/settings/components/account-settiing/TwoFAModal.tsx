import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { QRCodeSVG } from "qrcode.react";
import { FaKey, FaPhoneAlt, FaQrcode } from "react-icons/fa";

const TwoFAModal = ({ isOpen, handleHide, mode, type }: any) => {
  const [curType, setCurType] = useState<string>("");
  const [phoneNum, setPhoneNum] = useState("");
  const [newValue, setValue] = useState("");
  const RE_DIGIT = new RegExp(/^\d+$/);
  const [link, setLink] = useState("https://google.com/");

  useEffect(() => {
    setCurType(type);
  }, [type]);

  return (
    <Modal
      show={isOpen}
      onHide={() => {
        handleHide();
        setCurType("");
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
          <div className="bg-[#284CB31A] rounded-full w-12 h-12 mb-[16px] flex items-center justify-center">
            {curType === "sms" || curType === "google" ? (
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
                  d="M8.87656 4.74701C9.15442 4.88594 9.26705 5.22382 9.12812 5.50168L7.66014 8.43762H11.25C11.445 8.43762 11.626 8.53857 11.7285 8.7044C11.831 8.87023 11.8403 9.07731 11.7531 9.25168L9.87812 13.0017C9.73918 13.2795 9.40131 13.3922 9.12344 13.2532C8.84558 13.1143 8.73295 12.7764 8.87189 12.4986L10.3399 9.56262H6.75C6.55505 9.56262 6.374 9.46168 6.27151 9.29585C6.16902 9.13001 6.1597 8.92293 6.24689 8.74857L8.12189 4.99857C8.26082 4.7207 8.5987 4.60808 8.87656 4.74701Z"
                  fill="#284CB3"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.55234 1.02568C8.84703 0.960191 9.1525 0.960191 9.44718 1.02568L15.1938 2.3027C15.8603 2.45082 16.3063 3.08448 16.2088 3.76641L14.8066 13.582C14.7723 13.8219 14.6483 14.6377 13.8035 15.3774C12.9685 16.1085 11.5166 16.69 8.99976 16.69C6.48288 16.69 5.031 16.1085 4.19597 15.3774C3.35122 14.6377 3.22719 13.8219 3.19292 13.582L1.79069 3.76642C1.69327 3.08449 2.13919 2.45082 2.80572 2.3027L8.55234 1.02568ZM9.20313 2.12389C9.06919 2.09412 8.93034 2.09412 8.79639 2.12389L3.04977 3.40091C2.95117 3.42283 2.89095 3.51332 2.90438 3.60732L4.30746 13.4289C4.32732 13.5687 4.39682 14.0579 4.93708 14.531C5.49504 15.0195 6.64165 15.565 8.99976 15.565C11.3579 15.565 12.5045 15.0195 13.0624 14.531C13.6027 14.0579 13.6722 13.5687 13.6921 13.4289L15.0951 3.60732C15.1086 3.51332 15.0484 3.42283 14.9498 3.40091L9.20313 2.12389Z"
                  fill="#284CB3"
                />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_3333_3904)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9 0.9375C4.5472 0.9375 0.9375 4.5472 0.9375 9C0.9375 13.4528 4.5472 17.0625 9 17.0625C13.4528 17.0625 17.0625 13.4528 17.0625 9C17.0625 4.5472 13.4528 0.9375 9 0.9375ZM5.64783 8.97725C5.42816 8.75758 5.07201 8.75758 4.85234 8.97725C4.63267 9.19692 4.63267 9.55308 4.85234 9.77275L7.10234 12.0227C7.32201 12.2424 7.67816 12.2424 7.89783 12.0227L13.1478 6.77275C13.3675 6.55308 13.3675 6.19692 13.1478 5.97725C12.9282 5.75758 12.572 5.75758 12.3523 5.97725L7.50008 10.8295L5.64783 8.97725Z"
                    fill="#284CB3"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_3333_3904">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            )}
          </div>
          <h1 className="text-[18px] font-semibold">
            {curType === "sms"
              ? "SMS Verification"
              : curType === "google"
              ? "Google Auth"
              : "Two-Factor Authentication is enabled successfully"}
          </h1>
          <p
            className={`text-[12px] font-medium ${
              mode === "dark" ? "text-[#FFFFFF]" : "text-[#6A6A6A]"
            }`}
          >
            {curType === "sms"
              ? "Verification codes are sent via sms Text messages"
              : curType === "google"
              ? "Use authenticator app to get verification codes"
              : "From now on you would be ask to enter a verification code after you login"}
          </p>
        </div>
        <div className="w-full px-[24px] pt-[24px] pb-[48px]">
          {curType === "google" ? (
            <div className="flex items-center justify-center flex-col gap-[32px]">
              <QRCodeSVG value={link} size={150} />
              <div className="w-full">
                <p className="font-medium text-center text-[14px] mb-[16px]">
                  Scan QR Code using Google authenticator on your mobile phone
                  or enter the following code:
                </p>
                <div className="w-full bg-[#284CB31A] rounded-[8px] p-[16px] flex items-center justify-between flex-col md:flex-row">
                  <h1 className="font-semibold text-[16px]">
                    9430IWEURENF384AJHU8837402930
                  </h1>
                  <button>
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
              <div className="w-full flex items-center flex-col justify-center gap-[12px]">
                <div className="flex items-center gap-[6px]">
                  <FaKey />
                  <p className="font-medium text-[12px]">
                    Enter 6 figure verification code shown on app
                  </p>
                </div>
                <div className="w-full gap-[12px] flex items-center justify-center">
                  {[1, 2, 3, 4, 5, 6].map((digit) => (
                    <input
                      key={digit}
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      pattern="\d{1}"
                      maxLength={1}
                      onChange={(e) => {
                        if (!RE_DIGIT.test(e.target.value)) {
                          // toast.warn("Only digits are allowed");
                        } else {
                          setValue((cur) => (cur += e.target.value));
                        }
                      }}
                      className="font-semibold border-2 w-[40px] h-[40px] px-[16px] py-[8px] rounded-[6px] text-center"
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : curType === "sms" ? (
            <div className="w-full flex items-center flex-col justify-center gap-[32px]">
              <div className="w-full">
                <label
                  htmlFor="phone"
                  className="flex items-center gap-[6px] mb-[8px]"
                >
                  <FaPhoneAlt />
                  <span className="font-semibold text-[14px]">
                    Setup a Phone number
                  </span>
                </label>
                <div className="flex relative items-center w-full">
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    value={phoneNum}
                    onChange={(e) => setPhoneNum(e.target.value)}
                    className="border-2 font-medium text-[14px] w-full pl-[12px] py-[12px] rounded-[12px]"
                  />
                  <button
                    disabled={!phoneNum}
                    className="border border-primary absolute right-0 bg-primary text-white font-medium rounded-r-[12px] px-[24px] py-[12px]"
                  >
                    Send Code
                  </button>
                </div>
                <p className="font-medium text-[12px] my-[32px]">
                  Please note that this phone number would be used to Verify
                  your account login. Please use a valid digit.
                </p>
                <div className="w-full flex flex-col items-center justify-center gap-[12px]">
                  <div className="flex items-center w-full gap-[6px]">
                    <FaKey />
                    <p className="font-medium text-[12px]">
                      Enter 6 figure verification code shown on app
                    </p>
                  </div>
                  <div className="w-full gap-[12px] flex items-center justify-start">
                    {[1, 2, 3, 4, 5, 6].map((digit) => (
                      <input
                        key={digit}
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        pattern="\d{1}"
                        maxLength={1}
                        onChange={(e) => {
                          if (!RE_DIGIT.test(e.target.value)) {
                            // toast.warn("Only digits are allowed");
                          } else {
                            setValue((cur) => (cur += e.target.value));
                          }
                        }}
                        className="font-semibold border-2 w-[40px] h-[40px] px-[16px] py-[8px] rounded-[6px] text-center"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full">
              <h3 className="text-[16px] font-semibold mb-[16px]">
                Your Recovery Codes
              </h3>
              <p
                className={`text-[12px] text-center font-medium ${
                  mode === "dark" ? "text-[#FFFFFF]" : "text-[#6A6A6A]"
                }`}
              >
                You can use these recovery codes to access your account in the
                event you cannot reach your mobile phone. Please save and secure
                these codes carefully.
              </p>
              <div className="border rounded-[8px] p-[24px] md:w-[80%] md:mx-auto mt-[32px] grid grid-cols-3 gap-[54px] bg-gradient-to-r from-[#FFFFFF] to-[#F7F7F8]">
                <p className="font-semibold text-[12px]">49584</p>
                <p className="font-semibold text-[12px]">49584</p>
                <p className="font-semibold text-[12px]">49584</p>
                <p className="font-semibold text-[12px]">49584</p>
                <p className="font-semibold text-[12px]">49584</p>
                <p className="font-semibold text-[12px]">49584</p>
                <p className="font-semibold text-[12px]">49584</p>
                <p className="font-semibold text-[12px]">49584</p>
                <p className="font-semibold text-[12px]">49584</p>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-end justify-end gap-[10px]">
          {curType === "sms" || curType === "google" ? (
            <button
              onClick={() => setCurType("")}
              className="py-[8px] px-[24px] bg-primary font-medium text-white flex items-center justify-center rounded-full"
            >
              Activate
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  handleHide();
                  setCurType("");
                }}
                className="py-[8px] px-[24px] bg-[#909BBC] font-medium text-white flex items-center justify-center rounded-full"
              >
                Copy
              </button>
              <button
                onClick={() => {
                  handleHide();
                  setCurType("");
                }}
                className="py-[8px] px-[24px] bg-primary font-medium text-white flex items-center justify-center rounded-full"
              >
                Dowload
              </button>
            </>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TwoFAModal;
