import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import authBg from "../../../../public/media/logos/authbg.svg";
import useGetBillingPlans, {
  useCancelSubscription,
} from "../../api/api-services/billing";
import DefaultContent from "../../components/defaultContent/defaultContent";
import { format } from "date-fns";

type Props = {
  mode: string;
  curPlan: string;
  setShowPopup: any;
  getSecret: any;
  loading: boolean;
  endPeriod: string;
};

const BillingPlans = ({
  mode,
  curPlan,
  setShowPopup,
  getSecret,
  endPeriod,
  loading,
}: Props) => {
  const filter = useRef<any>({
    page: 1,
    page_size: 10,
  });
  const { data: allPlans, isLoading } = useGetBillingPlans(filter.current);
  const [current, setCurrent] = useState("");
  const { mutate, isLoading: isCancelling } = useCancelSubscription();

  const handleCancelSubscription = () => {
    mutate(
      {},
      {
        onSuccess: (res) => {
          console.log(res);
        },
      }
    );
  };
  return (
    <div className="w-full overflow-x-scroll mt-[36.5px] pt-[10px]">
      {isLoading ? (
        <DefaultContent
          pageHeader="Fetching plans"
          pageDescription=""
          loading={isLoading}
          buttonValue=""
          buttonClick={() => {}}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 md:w-[180vw] lg:w-[102vw] gap-[32px]">
          {allPlans?.data?.results?.length > 0 &&
            allPlans?.data?.results?.map((plan: any) => {
              if (plan?.name === "standard") {
                return (
                  <div
                    className={`${
                      mode === "dark" ? "bg-lightDark" : "bg-[#FFFFFF"
                    } flex-1 relative ${
                      curPlan === "standard"
                        ? "border-primary"
                        : "border-[#EAEAEA] shadow-md"
                    } border-2 rounded-[8px] `}
                  >
                    <div className="w-full mb-[32px]">
                      {curPlan === "standard" && (
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
                      )}

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
                                  <stop
                                    offset="0.198551"
                                    stop-color="#2E54C3"
                                  />
                                  <stop
                                    offset="0.683389"
                                    stop-color="#1F3A89"
                                  />
                                </linearGradient>
                              </defs>
                            </svg>
                            <h1 className="font-semibold text-[14px]">
                              {plan?.name}
                            </h1>
                            {curPlan === "standard" && (
                              <span className="bg-[#284CB31A] font-medium rounded-full text-primary px-[10px] py-[2px] text-[8px]">
                                Active
                              </span>
                            )}
                          </div>
                          <p
                            className={`${
                              mode === "dark"
                                ? "text-[#EAEAEA]"
                                : "text-[#6A6A6A]"
                            } font-medium text-[12px]`}
                          >
                            {plan?.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-[8px]">
                          <h1 className="font-bold text-[24px]">
                            ${plan?.price}
                          </h1>
                          <p
                            className={`${
                              mode === "dark"
                                ? "text-[#EAEAEA]"
                                : "text-[#6A6A6A]"
                            } font-medium text-[12px]`}
                          >
                            per month
                          </p>
                        </div>
                      </div>
                    </div>
                    {curPlan === "standard" ? (
                      <div className="w-full flex flex-col md:flex-row items-center justify-between p-[24px]">
                        <button
                          onClick={handleCancelSubscription}
                          className={`${
                            mode === "dark"
                              ? "text-[#EAEAEA]"
                              : "text-[#6A6A6A]"
                          } underline font-medium text-[12px] hover:underline`}
                        >
                          {isCancelling ? (
                            <span
                              className="indicator-progress"
                              style={{ display: "block" }}
                            >
                              Please wait...{" "}
                              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                            </span>
                          ) : (
                            "Cancel Subscription"
                          )}
                        </button>
                        <h2
                          className={`${
                            mode === "dark"
                              ? "text-[#EAEAEA]"
                              : "text-[#6A6A6A]"
                          } font-medium text-[12px]`}
                        >
                          Next billing date is{" "}
                          <span
                            className={`${
                              mode === "dark"
                                ? "text-[#EAEAEA]"
                                : "text-[#373737]"
                            } font-bold`}
                          >
                            {format(
                              new Date(endPeriod.split("T")[0]),
                              "dd/MM/yyyy"
                            )}
                          </span>
                        </h2>
                      </div>
                    ) : (
                      <div className="w-full flex flex-col md:flex-row items-center justify-between p-[24px]">
                        <button
                          onClick={() => {
                            setShowPopup();
                            sessionStorage.setItem("planId", plan?.id);
                            getSecret();
                            setCurrent("standard");
                          }}
                          className="border-2 gap-[10px] border-primary rounded-full px-[24px] py-[8px] flex items-center font-medium text-primary"
                        >
                          {loading && current === "standard" ? (
                            <span
                              className="indicator-progress"
                              style={{ display: "block" }}
                            >
                              Please wait...{" "}
                              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                            </span>
                          ) : (
                            <>
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
                            </>
                          )}
                        </button>
                        <Link
                          to="#"
                          className={`${
                            mode === "dark"
                              ? "text-[#EAEAEA]"
                              : "text-[#6A6A6A]"
                          } underline font-medium text-[12px] hover:underline`}
                        >
                          Learn more about this plan
                        </Link>
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <div
                  className={`${
                    mode === "dark"
                      ? "bg-lightDark"
                      : "bg-gradient-to-r from-[#F7F7F8] to-[#FFFFFF]"
                  } flex-1 relative ${
                    curPlan === "professional"
                      ? "border-primary"
                      : "border-[#EAEAEA] shadow-md"
                  } border-2 rounded-[8px]`}
                >
                  <div className="w-full mb-[32px]">
                    {curPlan === "professional" && (
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
                    )}
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
                          <h1 className="font-semibold text-[14px]">
                            {plan?.name}
                          </h1>
                          {curPlan === "professional" && (
                            <span className="bg-[#284CB31A] font-medium rounded-full text-primary px-[10px] py-[2px] text-[8px]">
                              Active
                            </span>
                          )}
                        </div>
                        <p
                          className={`${
                            mode === "dark"
                              ? "text-[#EAEAEA]"
                              : "text-[#6A6A6A]"
                          } font-medium text-[12px]`}
                        >
                          {plan?.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-[8px]">
                        <h1 className="font-bold text-[24px]">
                          ${plan?.price}
                        </h1>
                        <p
                          className={`${
                            mode === "dark"
                              ? "text-[#EAEAEA]"
                              : "text-[#6A6A6A]"
                          } font-medium text-[12px]`}
                        >
                          per month
                        </p>
                      </div>
                    </div>
                  </div>
                  {curPlan === "professional" ? (
                    <div className="w-full flex flex-col md:flex-row items-center justify-between p-[24px]">
                      <button
                        onClick={handleCancelSubscription}
                        className={`${
                          mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
                        } underline font-medium text-[12px] hover:underline`}
                      >
                        {isCancelling ? (
                          <span
                            className="indicator-progress"
                            style={{ display: "block" }}
                          >
                            Please wait...{" "}
                            <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                          </span>
                        ) : (
                          "Cancel Subscription"
                        )}
                      </button>
                      <h2
                        className={`${
                          mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
                        } font-medium text-[12px]`}
                      >
                        Next billing date is{" "}
                        <span
                          className={`${
                            mode === "dark"
                              ? "text-[#EAEAEA]"
                              : "text-[#373737]"
                          } font-bold`}
                        >
                          {format(
                            new Date(endPeriod.split("T")[0]),
                            "dd/MM/yyyy"
                          )}
                        </span>
                      </h2>
                    </div>
                  ) : (
                    <div className="w-full flex flex-col md:flex-row items-center justify-between p-[24px]">
                      <button
                        onClick={() => {
                          setShowPopup();
                          getSecret();
                          sessionStorage.setItem("planId", plan?.id);
                          setCurrent("professional");
                        }}
                        className="border-2 gap-[10px] border-primary rounded-full px-[24px] py-[8px] flex items-center font-medium text-primary"
                      >
                        {loading && current === "professional" ? (
                          <span
                            className="indicator-progress"
                            style={{ display: "block" }}
                          >
                            Please wait...{" "}
                            <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                          </span>
                        ) : (
                          <>
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
                          </>
                        )}
                      </button>
                      <Link
                        to="#"
                        className={`${
                          mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
                        } underline font-medium text-[12px] hover:underline`}
                      >
                        Learn more about this plan
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}

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
      )}
    </div>
  );
};

export default BillingPlans;
