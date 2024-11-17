import React, { useEffect, useRef, useState } from "react";
import { useGetBillingInvoices } from "../../api/api-services/billing";
import DefaultContent from "../../components/defaultContent/defaultContent";
import bill from "../../../../public/media/logos/bill_1.svg";

type Props = {
  mode: string;
};

const BillingCard = ({ data, mode, isLast }: any) => {
  return (
    <div
      className={`grid grid-cols-6 px-[24px] py-[18px]  mb-3 ${
        isLast ? "border-0" : "border-bottom"
      }  ${mode === "dark" ? "bg-lightDark" : "bg-white"}`}
    >
      <div className="flex items-center gap-[16px] col-span-2">
        <input
          type="checkbox"
          name={data?.id}
          id={data?.id}
          className="w-5 h-5 rounded-full mr-2"
        />
        <img src={bill} alt="invoice icon" />
        <h1 className="font-semibold text-[10px] md:text-[12px]">
          {data?.invoice}
        </h1>
      </div>
      <p
        className={`${
          mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
        } font-medium text-[12px] text-center`}
      >
        {data?.amount}
      </p>
      <p
        className={`${
          mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
        } flex items-center gap-[8px] font-medium text-[12px] text-center`}
      >
        <svg
          width="18"
          height="19"
          viewBox="0 0 18 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.4 13.25L15.75 5.75L11.025 8L9 5.75L6.975 8L2.25 5.75L3.6 13.25H14.4Z"
            stroke="url(#paint0_linear_2394_21360)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient
              id="paint0_linear_2394_21360"
              x1="2.25"
              y1="5.75"
              x2="7.22649"
              y2="17.0153"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.198551" stopColor="#2E54C3" />
              <stop offset="0.683389" stopColor="#1F3A89" />
            </linearGradient>
          </defs>
        </svg>
        <span>{data?.plan}</span>
      </p>
      <p
        className={`${
          mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
        } font-medium text-[12px] text-center`}
      >
        {data?.billing_date}
      </p>
      <div className="flex items-center justify-center gap-[32px] w-full ">
        <button
          onClick={() => {
            window.open(data?.invoice_pdf, "_blank");
          }}
          className="bg-none flex items-center justify-center"
        >
          <svg
            width="42"
            height="19"
            viewBox="0 0 42 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="border-start pl-[6px]"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M27.9375 15.5C27.9375 15.1893 28.1893 14.9375 28.5 14.9375L37.5 14.9375C37.8107 14.9375 38.0625 15.1893 38.0625 15.5C38.0625 15.8107 37.8107 16.0625 37.5 16.0625L28.5 16.0625C28.1893 16.0625 27.9375 15.8107 27.9375 15.5Z"
              fill={mode === "dark" ? "#EAEAEA" : "#373737"}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M32.6023 12.8977C32.8219 13.1174 33.1781 13.1174 33.3977 12.8977L36.0227 10.2727C36.2424 10.0531 36.2424 9.69692 36.0227 9.47725C35.8031 9.25758 35.4469 9.25758 35.2273 9.47725L33.5625 11.142V3.5C33.5625 3.18934 33.3107 2.9375 33 2.9375C32.6893 2.9375 32.4375 3.18934 32.4375 3.5V11.142L30.7727 9.47725C30.5531 9.25758 30.1969 9.25758 29.9773 9.47725C29.7576 9.69692 29.7576 10.0531 29.9773 10.2727L32.6023 12.8977Z"
              fill={mode === "dark" ? "#EAEAEA" : "#373737"}
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const BillingInvoices = ({ mode }: Props) => {
  const [showPopOver, setShowPopOver] = useState(false);
  const [allInvoices, setAllInvoices] = useState<any[]>([]);
  const filter = useRef<any>({
    page: 1,
    page_size: 10,
  });
  const {
    data: allPlans,
    isLoading,
    refetch,
  } = useGetBillingInvoices(filter.current);

  const handleSearch = (val: string) => {
    const keys = ["invoice", "amount", "plan"];
    if (val) {
      const filterd = allInvoices.filter((item: any) =>
        keys.some((key) => item[key].toLowerCase().includes(val.toLowerCase()))
      );
      setAllInvoices(filterd);
    } else {
      setAllInvoices(allPlans?.data?.results);
    }
  };

  useEffect(() => {
    if (allPlans.data?.results.length) {
      setAllInvoices(allPlans?.data?.results);
    }
  }, [allPlans]);

  function refreshrecord() {
    filter.current = {
      page: 1,
      pageSize: 10,
    };
    refetch();
  }
  return (
    <>
      {isLoading ? (
        <DefaultContent
          pageHeader="All Invoices"
          pageDescription="No record found"
          loading={isLoading}
          buttonValue="Refresh"
          buttonClick={() => refreshrecord()}
        />
      ) : (
        <div
          className={`w-full  overflow-x-scroll rounded-[8px] border ${
            mode === "dark" ? "bg-lightDark" : "bg-white"
          }`}
        >
          <div className="w-[200vw] md:w-full">
            <div className="flex items-center px-[24px] py-[18px] border-bottom justify-between">
              <div className="">
                <h1 className="text-[18px] font-semibold">Billing History</h1>
                <p
                  className={`${
                    mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
                  } font-medium text-[12px] mt-1`}
                >
                  Download your Previous receipt and usage details
                </p>
              </div>
              <div className="flex items-center gap-[16px]">
                <div className="relative">
                  <input
                    type="text"
                    onChange={(e) => handleSearch(e.target.value)}
                    className={`${
                      mode === "dark"
                        ? "placeholder:text-[#EAEAEA]"
                        : "placeholder:text-[#373737]"
                    } w-32 bg-transparent focus:outline-none focus:border focus:w-full rounded-[8px] font-medium px-3 py-2 placeholder:font-medium `}
                    placeholder="Search"
                  />
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-2 right-2"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.3523 12.3523C12.5719 12.1326 12.9281 12.1326 13.1477 12.3523L16.1477 15.3523C16.3674 15.5719 16.3674 15.9281 16.1477 16.1477C15.9281 16.3674 15.5719 16.3674 15.3523 16.1477L12.3523 13.1477C12.1326 12.9281 12.1326 12.5719 12.3523 12.3523Z"
                      fill={mode === "dark" ? "#EAEAEA" : "black"}
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.25 2.8125C5.24695 2.8125 2.8125 5.24695 2.8125 8.25C2.8125 11.253 5.24695 13.6875 8.25 13.6875C9.75428 13.6875 11.115 13.0774 12.1 12.0898C13.0816 11.1056 13.6875 9.74908 13.6875 8.25C13.6875 5.24695 11.253 2.8125 8.25 2.8125ZM1.6875 8.25C1.6875 4.62563 4.62563 1.6875 8.25 1.6875C11.8744 1.6875 14.8125 4.62563 14.8125 8.25C14.8125 10.0589 14.0799 11.6977 12.8966 12.8842C11.7091 14.0748 10.0652 14.8125 8.25 14.8125C4.62563 14.8125 1.6875 11.8744 1.6875 8.25Z"
                      fill={mode === "dark" ? "#EAEAEA" : "black"}
                    />
                  </svg>
                </div>
                <button
                  onClick={() => setShowPopOver(!showPopOver)}
                  className="flex text-[10px] md:text-[12px] font-medium items-center gap-3 border-start pl-[16px]"
                >
                  <p>Filter</p>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.25 4.5H15.75"
                      stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.25 9L12.75 9"
                      stroke={mode === "dark" ? "#EAEAEA" : "black"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.25 13.5L9.75 13.5"
                      stroke={mode === "dark" ? "#EAEAEA" : "black"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div
              className={`px-[24px] py-[18px] border-bottom grid grid-cols-6 ${
                mode === "dark" ? "bg-lightDark" : "bg-white"
              } `}
            >
              <div className="col-span-2 flex items-center gap-[12px]">
                <input
                  type="checkbox"
                  name="all"
                  id="all"
                  className="w-5 h-5 rounded-full"
                />
                <p className="font-semibold text-[12px]">Invoice</p>
              </div>
              <p className="font-semibold text-[12px] text-center">Amount</p>
              <p className="font-semibold text-[12px] text-center">Plan</p>
              <p className="font-semibold text-[12px] text-center">
                Billing date
              </p>
              <p className="font-semibold text-[12px] text-center"></p>
            </div>
            {allInvoices.length < 1 ? (
              <DefaultContent
                pageHeader="All Invoices"
                pageDescription="No record found"
                loading={false}
                buttonValue=""
                buttonClick={() => {}}
              />
            ) : (
              allInvoices?.map((inv: any, idx: number) => (
                <BillingCard
                  mode={mode}
                  data={inv}
                  isLast={idx === allPlans?.data?.length - 1}
                  key={inv.id}
                />
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BillingInvoices;
