import { useState } from "react";
import { useRecoilValue } from "recoil";
import modeAtomsAtom from "../../atoms/modeAtoms.atom";
import { Link } from "react-router-dom";
import authBg from "../../../../public/media/logos/authbg.svg";
import bill from "../../../../public/media/logos/bill_1.svg";
// import "./style.css"

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
          name={data.id}
          id={data.id}
          className="w-5 h-5 rounded-full mr-2"
        />
        <img src={bill} alt="invoice icon" />
        <h1 className="font-semibold text-[10px] md:text-[12px]">{data.id}</h1>
      </div>
      <p
        className={`${
          mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
        } font-medium text-[12px] text-center`}
      >
        {data.amount}
      </p>
      <p
        className={`${
          mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
        } font-medium text-[12px] text-center`}
      >
        {data.plan}
      </p>
      <p
        className={`${
          mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
        } font-medium text-[12px] text-center`}
      >
        {data.date}
      </p>
      <div className="flex items-center justify-center gap-[32px] w-full ">
        <button className="bg-none flex items-center justify-center">
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

const BillingPage = () => {
  const { mode } = useRecoilValue(modeAtomsAtom);
  const [showPopOver, setShowPopOver] = useState(false);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [billingHistory, setBillingHistory] = useState<any[]>([
    {
      id: "Invoice #89646271-Dec 2022",
      amount: "$20",
      plan: "Standard Plan",
      date: "Dec 1, 2024",
    },
    {
      id: "Invoice #89646272-Dec 2022",
      amount: "$20",
      plan: "Standard Plan",
      date: "Dec 1, 2024",
    },
    {
      id: "Invoice #89646273-Dec 2022",
      amount: "$20",
      plan: "Standard Plan",
      date: "Dec 1, 2024",
    },
  ]);

  const [billingCopy, setBillingCopy] = useState<any>([
    {
      id: "Invoice #89646271-Dec 2022",
      amount: "$20",
      plan: "Standard Plan",
      date: "Dec 1, 2024",
    },
    {
      id: "Invoice #89646272-Dec 2022",
      amount: "$20",
      plan: "Standard Plan",
      date: "Dec 1, 2024",
    },
    {
      id: "Invoice #89646273-Dec 2022",
      amount: "$20",
      plan: "Standard Plan",
      date: "Dec 1, 2024",
    },
  ]);

  const handleSearch = (val: string) => {
    const keys = ["date", "plan", "id"];
    if (val) {
      const filterd = billingHistory.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(val.toLowerCase()))
      );

      setBillingHistory(filterd);
    } else {
      setBillingHistory(billingCopy);
    }
  };

  return (
    <div className="px-8 mt-[32px] w-full">
      <div className="flex items-center flex-col md:flex-row gap-[16px]">
        <h1 className="font-semibold text-[14px] md:text-[18px]">
          Account Subscription
        </h1>
        <p
          className={`${
            mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
          } border-start border-end pt-[2px] px-[16px] font-medium text-[10px] md:text-[12px]`}
        >
          Manage your plans and billing details
        </p>
      </div>
      <div className="w-full overflow-x-scroll mt-[36.5px] pt-[10px]">
        <div className="grid grid-cols-1 md:grid-cols-3 md:w-[180vw] lg:w-[102vw] gap-[32px]">
          <div
            className={`${
              mode === "dark" ? "bg-lightDark" : "bg-[#FFFFFF"
            } flex-1 relative border-2 rounded-[8px] border-primary`}
          >
            <div className="w-full mb-[32px]">
              <div
                className={`rounded-full p-0 absolute ${
                  mode === "dark" ? "bg-lightDark" : "bg-white"
                } -top-3 -right-3 z-[100px]`}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM7.53044 11.9697C7.23755 11.6768 6.76268 11.6768 6.46978 11.9697C6.17689 12.2626 6.17689 12.7374 6.46978 13.0303L9.46978 16.0303C9.76268 16.3232 10.2376 16.3232 10.5304 16.0303L17.5304 9.03033C17.8233 8.73744 17.8233 8.26256 17.5304 7.96967C17.2375 7.67678 16.7627 7.67678 16.4698 7.96967L10.0001 14.4393L7.53044 11.9697Z"
                    fill="#284CB3"
                  />
                </svg>
              </div>
              <div className="flex items-center justify-between flex-col md:flex-row p-[24px]">
                <div className="">
                  <div className="flex items-center gap-[12px] mb-[12px]">
                    <svg
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.4 13.25L15.75 5.75L11.025 8L9 5.75L6.975 8L2.25 5.75L3.6 13.25H14.4Z"
                        stroke="url(#paint0_linear_2392_20635)"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_2392_20635"
                          x1="2.25"
                          y1="5.75"
                          x2="7.22649"
                          y2="17.0153"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0.198551" stop-color="#2E54C3" />
                          <stop offset="0.683389" stop-color="#1F3A89" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <h1 className="font-semibold text-[14px]">Standard</h1>
                    {isActive && (
                      <span className="bg-[#284CB31A] font-medium rounded-full text-primary px-[10px] py-[2px] text-[8px]">
                        Active
                      </span>
                    )}
                  </div>
                  <p
                    className={`${
                      mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
                    } font-medium text-[12px]`}
                  >
                    Our most popular plans for small teams
                  </p>
                </div>
                <div className="flex items-center gap-[8px]">
                  <h1 className="font-bold text-[24px]">$20</h1>
                  <p
                    className={`${
                      mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
                    } font-medium text-[12px]`}
                  >
                    per month
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row items-center justify-between p-[24px]">
              <Link
                to="#"
                className={`${
                  mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
                } underline font-medium text-[12px] hover:underline`}
              >
                Cancel Subscription
              </Link>
              <h2
                className={`${
                  mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
                } font-medium text-[12px]`}
              >
                Next billing date is{" "}
                <span
                  className={`${
                    mode === "dark" ? "text-[#EAEAEA]" : "text-[#373737]"
                  } font-bold`}
                >
                  13 OCT 2024
                </span>
              </h2>
            </div>
          </div>
          <div
            className={`${
              mode === "dark"
                ? "bg-lightDark"
                : "bg-gradient-to-r from-[#F7F7F8] to-[#FFFFFF]"
            } flex-1 relative border-2 rounded-[8px] shadow-md`}
          >
            <div className="w-full mb-[32px]">
              {/* <div
              className={`rounded-full p-0 absolute ${
                mode === "dark" ? "bg-lightDark" : "bg-white"
              } -top-3 -right-3 z-[100px]`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM7.53044 11.9697C7.23755 11.6768 6.76268 11.6768 6.46978 11.9697C6.17689 12.2626 6.17689 12.7374 6.46978 13.0303L9.46978 16.0303C9.76268 16.3232 10.2376 16.3232 10.5304 16.0303L17.5304 9.03033C17.8233 8.73744 17.8233 8.26256 17.5304 7.96967C17.2375 7.67678 16.7627 7.67678 16.4698 7.96967L10.0001 14.4393L7.53044 11.9697Z"
                  fill="#284CB3"
                />
              </svg>
            </div> */}
              <div className="flex items-center justify-center md:justify-between flex-col md:flex-row p-[24px]">
                <div className="">
                  <div className="flex items-center gap-[12px] mb-[12px]">
                    <svg
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.4 13.25L15.75 5.75L11.025 8L9 5.75L6.975 8L2.25 5.75L3.6 13.25H14.4Z"
                        stroke="url(#paint0_linear_2392_20635)"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_2392_20635"
                          x1="2.25"
                          y1="5.75"
                          x2="7.22649"
                          y2="17.0153"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0.198551" stop-color="#2E54C3" />
                          <stop offset="0.683389" stop-color="#1F3A89" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <h1 className="font-semibold text-[14px]">Professional</h1>
                  </div>
                  <p
                    className={`${
                      mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
                    } font-medium text-[12px]`}
                  >
                    Our most popular plans for small teams
                  </p>
                </div>
                <div className="flex items-center gap-[8px]">
                  <h1 className="font-bold text-[24px]">$33</h1>
                  <p
                    className={`${
                      mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
                    } font-medium text-[12px]`}
                  >
                    per month
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row items-center justify-between p-[24px]">
              <Link
                to="#"
                className="border-2 gap-[10px] border-primary rounded-full px-[24px] py-[8px] flex items-center font-medium text-primary"
              >
                <p>Upgrade Plan</p>
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.84667 4.5C3.84667 4.22386 4.07052 4 4.34667 4H12.6667C12.9428 4 13.1667 4.22386 13.1667 4.5V12.82C13.1667 13.0961 12.9428 13.32 12.6667 13.32C12.3905 13.32 12.1667 13.0961 12.1667 12.82V5.70711L4.35355 13.5202C4.15829 13.7155 3.84171 13.7155 3.64645 13.5202C3.45118 13.325 3.45118 13.0084 3.64645 12.8131L11.4596 5H4.34667C4.07052 5 3.84667 4.77614 3.84667 4.5Z"
                    fill="#284CB3"
                  />
                </svg>
              </Link>
              <Link
                to="#"
                className={`${
                  mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
                } underline font-medium text-[12px] hover:underline`}
              >
                Learn more about this plan
              </Link>
            </div>
          </div>
          <div className="bg-gradient-to-r from-[#2E54C3] to-[#1F3A89] relative rounded-[8px]">
            <img
              src={authBg}
              alt="decorative pattern"
              className="absolute top-10 left-0"
            />
            <div className="w-full mb-[32px]">
              <div className="flex items-center justify-between flex-col md:flex-row p-[24px]">
                <div className="">
                  <div className="flex items-center gap-[12px] mb-[12px]">
                    <svg
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 5.75H3.5C2.39543 5.75 1.5 6.64543 1.5 7.75V14.25C1.5 15.3546 2.39543 16.25 3.5 16.25H14.5C15.6046 16.25 16.5 15.3546 16.5 14.25V7.75C16.5 6.64543 15.6046 5.75 14.5 5.75H12M6 5.75V3.35C6 3.01863 6.26863 2.75 6.6 2.75H11.4C11.7314 2.75 12 3.01863 12 3.35V5.75M6 5.75H12"
                        stroke="url(#paint0_linear_2392_20656)"
                        stroke-width="1.5"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_2392_20656"
                          x1="1.5"
                          y1="2.75"
                          x2="16.6227"
                          y2="16.1111"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0.21" stop-color="white" />
                          <stop offset="0.61" stop-color="#F7F7F8" />
                        </linearGradient>
                      </defs>
                    </svg>

                    <h1 className="font-semibold text-[14px] text-white">
                      Enterprise Solution
                    </h1>
                  </div>
                  <p className="font-medium text-[12px] text-[#EAEAEA]">
                    Our most popular plans for small teams
                  </p>
                </div>
              </div>
            </div>
            <div className="relative w-full flex flex-col md:flex-row items-center justify-between p-[24px] z-10">
              <Link
                to="/billing"
                className="border-2 gap-[10px] border-white rounded-full px-[24px] py-[8px] flex items-center font-medium text-white"
              >
                <p>Upgrade Plan</p>
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.84667 4.5C3.84667 4.22386 4.07052 4 4.34667 4H12.6667C12.9428 4 13.1667 4.22386 13.1667 4.5V12.82C13.1667 13.0961 12.9428 13.32 12.6667 13.32C12.3905 13.32 12.1667 13.0961 12.1667 12.82V5.70711L4.35355 13.5202C4.15829 13.7155 3.84171 13.7155 3.64645 13.5202C3.45118 13.325 3.45118 13.0084 3.64645 12.8131L11.4596 5H4.34667C4.07052 5 3.84667 4.77614 3.84667 4.5Z"
                    fill="#FFFFFF"
                  />
                </svg>
              </Link>
              <Link
                to="/billing"
                className="underline text-[#EAEAEA] font-medium text-[12px] hover:underline"
              >
                Learn more about this plan
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="my-[32px] flex items-center flex-col md:flex-row justify-between gap-[24px] p-[24px] bg-gradient-to-r from-[#F7F7F8] to-[#FFFFFF] md:w-[70vw] lg:w-[50vw] border shadow-md rounded-[8px]">
        <div className="">
          <h1 className="font-semibold text-[12px] md:text-[14px]">
            Payment Method
          </h1>
          <p
            className={`${
              mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
            } font-medium text-[10px] md:text-[12px] my-[12px]`}
          >
            Manage how you pay for your plans
          </p>
          <Link
            to="/"
            className={`${
              mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
            } underline font-medium text-[12px] hover:underline`}
          >
            Change{" "}
          </Link>
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
            <h1 className="font-semibold text-[14px]">* * * * * * * * 3448</h1>
            <p
              className={`${
                mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
              } font-medium text-[12px]`}
            >
              Expiry 06/28
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
          {billingHistory.map((billing, idx) => (
            <BillingCard
              mode={mode}
              data={billing}
              isLast={idx === billingHistory.length - 1}
              key={billing.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
