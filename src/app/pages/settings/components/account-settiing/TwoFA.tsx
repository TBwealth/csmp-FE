import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import authenticatorImg from "../../../../../../public/media/logos/authenticator.svg";
import smsImg from "../../../../../../public/media/logos/smsimg.svg";
import TwoFAModal from "./TwoFAModal";

type Props = {
  mode: string;
  goBack: any;
};

const initialValues = {
  email: "",
  password: "",
};

const deleteSchema = Yup.object().shape({
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Password is required"),
});

const TwoFA = ({ mode, goBack }: Props) => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [authType, setAuthType] = useState("");
  const formik = useFormik({
    initialValues,
    validationSchema: deleteSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      //   setLoading(true);
      console.log(values);
      //   try {
      //     // mutate(
      //     //   {
      //     //     email: values.email,
      //     //     password: values.password,
      //     //   },
      //     //   {
      //     //     onSuccess: (res: any) => {
      //     //       console.log(res.data, "Successss");
      //     //       if (res.data.code === 200) {
      //     //         localStorage.setItem(
      //     //           "user",
      //     //           JSON.stringify(res?.data?.data?.user)
      //     //         );
      //     //         sessionStorage.setItem("top-title", "Dashboard");
      //     //         sessionStorage.setItem(
      //     //           "children",
      //     //           JSON.stringify([
      //     //             {
      //     //               title: "Dashboard",
      //     //               href: "/dashboard",
      //     //             },
      //     //           ])
      //     //         );
      //     //         // saveAuth(res?.data?.data?.token?.access);
      //     //         localStorage.setItem("token", res?.data?.data?.token?.access);
      //     //         // setCurrentUser(res?.data?.data?.user);
      //     //         // navigate("/dashboard");
      //     //       }
      //     //       setStatus(null);
      //     //     },
      //     //     onError: (err: any) => {
      //     //       console.log(err);
      //     //     //   setLoading(false);
      //     //       setStatus(err?.response?.data?.message || err?.message);
      //     //     },
      //     //   }
      //     // );
      //   } catch (error) {
      //     console.log(error);
      //     // setLoading(false);
      //     setStatus("The login details are incorrect");
      //     setSubmitting(false);
      //   }
    },
  });

  return (
    <div
      className={`rounded-[16px] p-[32px] border ${
        mode === "dark" ? "bg-lightDark" : "bg-white"
      }`}
    >
      <div className="flex items-center pb-[16px] border-bottom gap-[16px]">
        <button onClick={goBack}>
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.5303 5.96967C12.8232 6.26256 12.8232 6.73744 12.5303 7.03033L7.81066 11.75H18.5C18.9142 11.75 19.25 12.0858 19.25 12.5C19.25 12.9142 18.9142 13.25 18.5 13.25H7.81066L12.5303 17.9697C12.8232 18.2626 12.8232 18.7374 12.5303 19.0303C12.2374 19.3232 11.7626 19.3232 11.4697 19.0303L5.46967 13.0303C5.17678 12.7374 5.17678 12.2626 5.46967 11.9697L11.4697 5.96967C11.7626 5.67678 12.2374 5.67678 12.5303 5.96967Z"
              fill={mode === "dark" ? "#EAEAEA" : "#373737"}
            />
          </svg>
        </button>
        <h1 className="font-semibold text-[18px]">
          Two-Factor Authentication (2FA/MFA)
        </h1>
      </div>
      <div className="my-[32px]">
        <p
          className={`font-medium text-start text-[12px] mb-[32px] ${
            mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
          }`}
        >
          Secure your account with additional security by enabling 2FA. you
          would be required to enter both your password and Verification codes
          to sign in. How would you want to set up your 2FA
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px]">
          <button
            onClick={() => {
              setShowModal(true);
              setAuthType("google");
            }}
            className="shadow-md flex flex-col items-center justify-center rounded-[16px] gap-[16px] p-[32px] border"
          >
            <img src={authenticatorImg} alt="google authenticator icon" />
            <h2 className="font-semibold text-[14px]">Google Auth</h2>
            <p
              className={`font-medium text-center text-[12px] ${
                mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
              }`}
            >
              Use authenticator app to get verification codes
            </p>
          </button>
          <button
            onClick={() => {
              setShowModal(true);
              setAuthType("sms");
            }}
            className="shadow-md flex flex-col items-center justify-center rounded-[16px] gap-[16px] p-[32px] border"
          >
            <img src={smsImg} alt="SMS icon" />
            <h2 className="font-semibold text-[14px]">SMS</h2>
            <p
              className={`font-medium text-center text-[12px] ${
                mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
              }`}
            >
              Verification codes are sent via sms Text messages
            </p>
          </button>
        </div>
      </div>
      <TwoFAModal
        isOpen={showModal}
        handleHide={() => setShowModal(false)}
        type={authType}
        mode={mode}
      />
    </div>
  );
};

export default TwoFA;
