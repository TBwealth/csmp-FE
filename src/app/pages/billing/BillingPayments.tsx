import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetPaymentMethods,
  useUpdatePaymentMethod,
} from "../../api/api-services/billing";
import DefaultContent from "../../components/defaultContent/defaultContent";

type Props = {
  mode: string;
};

const BillingPayments = ({ mode }: Props) => {
  const { data, isLoading } = useGetPaymentMethods({ page: 1, page_size: 10 });
  const [allMethod, setAllMethods] = useState(0);
  const { mutate } = useUpdatePaymentMethod();
  const handleUpdatePayment = (id: string) => {
    mutate(
      { id },
      {
        onSuccess: (res) => {
          console.log(res);
        },
      }
    );
  };

  useEffect(() => {
    if (data?.data) {
      setAllMethods(data?.data?.results.length);
    }
  }, [data]);

  console.log(data);
  return (
    <>
      {isLoading && allMethod < 1 ? (
        <DefaultContent
          pageHeader="All Payments Methods"
          pageDescription="No record found"
          loading={isLoading}
          buttonValue=""
          buttonClick={() => {}}
        />
      ) : (
        <div className="my-[32px] flex items-center flex-col md:flex-row justify-between gap-[24px] p-[24px] bg-gradient-to-r from-[#F7F7F8] to-[#FFFFFF] md:w-[70vw] lg:w-[50vw] border shadow-md rounded-[8px]">
          <div className="">
            <h1 className="font-semibold text-start text-[12px] md:text-[14px]">
              Payment Method
            </h1>
            <p
              className={`${
                mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
              } font-medium text-[10px] md:text-[12px] my-[12px]`}
            >
              Manage how you pay for your plans
            </p>
            <button
              onClick={() => handleUpdatePayment(data?.data?.results[0]?.id)}
              className={`${
                mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
              } underline font-medium text-[12px] hover:underline`}
            >
              Change{" "}
            </button>
          </div>
          <div className="bg-gradient-to-r from-[#FFFFFF] to-[#F7F7F8] border rounded-[8px] p-[24px] flex items-start gap-[16px]">
            <svg
              width="57"
              height="39"
              viewBox="0 0 57 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="56"
                height="38"
                rx="5.5"
                fill="white"
                stroke="#D9D9D9"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.3035 26.4197H13.8505L11.261 16.5626C11.1381 16.1092 10.8772 15.7083 10.4933 15.5194C9.53534 15.0446 8.47972 14.6668 7.32812 14.4762V14.0967H12.8908C13.6585 14.0967 14.2343 14.6668 14.3303 15.3288L15.6738 22.439L19.1252 14.0967H22.4823L17.3035 26.4197ZM24.4017 26.4197H21.1405L23.8259 14.0967H27.087L24.4017 26.4197ZM31.3062 17.5105C31.4021 16.8468 31.9779 16.4673 32.6497 16.4673C33.7053 16.372 34.8552 16.5626 35.8149 17.0358L36.3907 14.3826C35.431 14.0031 34.3754 13.8125 33.4174 13.8125C30.2522 13.8125 27.949 15.5194 27.949 17.8884C27.949 19.6906 29.5805 20.6369 30.7321 21.2069C31.9779 21.7753 32.4578 22.1548 32.3618 22.7233C32.3618 23.5759 31.4021 23.9554 30.4442 23.9554C29.2926 23.9554 28.141 23.6712 27.087 23.1964L26.5112 25.8512C27.6628 26.3244 28.9087 26.5149 30.0603 26.5149C33.6094 26.6086 35.8149 24.9033 35.8149 22.3438C35.8149 19.1205 31.3062 18.9316 31.3062 17.5105ZM47.2281 26.4197L44.6387 14.0967H41.8574C41.2816 14.0967 40.7058 14.4762 40.5139 15.0446L35.7189 26.4197H39.0761L39.7461 24.6191H43.871L44.2549 26.4197H47.2281ZM42.3372 17.4153L43.2952 22.0596H40.6098L42.3372 17.4153Z"
                fill="#172B85"
              />
            </svg>
            <div className="">
              <h1 className="font-semibold text-[14px]">
                {`* * * * * * * * ${data?.data?.results[0]?.card_last4}`}
              </h1>
              <p
                className={`${
                  mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
                } font-medium text-[12px]`}
              >
                Expiry{" "}
                {`${data?.data?.results[0]?.exp_month}/${data?.data?.results[0]?.exp_year}`}
              </p>
            </div>
            <button className="bg-none flex items-center justify-center">
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
                  d="M1.6875 15.75C1.6875 15.4393 1.93934 15.1875 2.25 15.1875L15.75 15.1875C16.0607 15.1875 16.3125 15.4393 16.3125 15.75C16.3125 16.0607 16.0607 16.3125 15.75 16.3125L2.25 16.3125C1.93934 16.3125 1.6875 16.0607 1.6875 15.75Z"
                  fill="#373737"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.3972 6.35869C15.6168 6.13902 15.6168 5.78286 15.3972 5.56319L11.6849 1.85088C11.4652 1.63121 11.109 1.63121 10.8894 1.85088L4.5631 8.17715C4.31696 8.42329 4.17867 8.75713 4.17868 9.10523L4.17868 12.5069C4.17868 12.8175 4.43052 13.0694 4.74118 13.0694L8.14282 13.0694C8.49092 13.0694 8.82476 12.9311 9.0709 12.685L15.3972 6.35869ZM14.2039 5.96094L12.8781 7.28676L9.96129 4.36995L11.2871 3.04412L14.2039 5.96094ZM9.1658 5.16544L12.0826 8.08226L8.27541 11.8895C8.24025 11.9246 8.19255 11.9444 8.14282 11.9444L5.30368 11.9444L5.30368 9.10523C5.30367 9.0555 5.32343 9.00781 5.35859 8.97265L9.1658 5.16544Z"
                  fill="#373737"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BillingPayments;
