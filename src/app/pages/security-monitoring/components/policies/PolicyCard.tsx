import React from "react";
import { useNavigate } from "react-router-dom";

type Props = { data: any; mode: string };

const PolicyCard = ({ data, mode }: Props) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate(`/monitoring/policies-and-ruleset/${data?.id}`);
        //   sessionStorage.setItem("cur_policy_page", "compliance");
      }}
      className={`${
        mode === "dark" ? "bg-lightDark" : "bg-white"
      } relative border rounded-[12px] w-full`}
    >
      <div className="p-[24px] border-bottom flex items-end justify-end">
        <svg
          width="18"
          height="19"
          viewBox="0 0 18 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.5 9.875C13.7071 9.875 13.875 9.70711 13.875 9.5C13.875 9.29289 13.7071 9.125 13.5 9.125C13.2929 9.125 13.125 9.29289 13.125 9.5C13.125 9.70711 13.2929 9.875 13.5 9.875Z"
            fill={mode === "dark" ? "#EAEAEA" : "#373737"}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.5 9.6875C13.6036 9.6875 13.6875 9.60355 13.6875 9.5C13.6875 9.39645 13.6036 9.3125 13.5 9.3125C13.3964 9.3125 13.3125 9.39645 13.3125 9.5C13.3125 9.60355 13.3964 9.6875 13.5 9.6875ZM12.5625 9.5C12.5625 8.98223 12.9822 8.5625 13.5 8.5625C14.0178 8.5625 14.4375 8.98223 14.4375 9.5C14.4375 10.0178 14.0178 10.4375 13.5 10.4375C12.9822 10.4375 12.5625 10.0178 12.5625 9.5Z"
            fill={mode === "dark" ? "#EAEAEA" : "#373737"}
          />
          <path
            d="M9 9.875C9.20711 9.875 9.375 9.70711 9.375 9.5C9.375 9.29289 9.20711 9.125 9 9.125C8.79289 9.125 8.625 9.29289 8.625 9.5C8.625 9.70711 8.79289 9.875 9 9.875Z"
            fill={mode === "dark" ? "#EAEAEA" : "#373737"}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9 9.6875C9.10355 9.6875 9.1875 9.60355 9.1875 9.5C9.1875 9.39645 9.10355 9.3125 9 9.3125C8.89645 9.3125 8.8125 9.39645 8.8125 9.5C8.8125 9.60355 8.89645 9.6875 9 9.6875ZM8.0625 9.5C8.0625 8.98223 8.48223 8.5625 9 8.5625C9.51777 8.5625 9.9375 8.98223 9.9375 9.5C9.9375 10.0178 9.51777 10.4375 9 10.4375C8.48223 10.4375 8.0625 10.0178 8.0625 9.5Z"
            fill={mode === "dark" ? "#EAEAEA" : "#373737"}
          />
          <path
            d="M4.5 9.875C4.70711 9.875 4.875 9.70711 4.875 9.5C4.875 9.29289 4.70711 9.125 4.5 9.125C4.29289 9.125 4.125 9.29289 4.125 9.5C4.125 9.70711 4.29289 9.875 4.5 9.875Z"
            fill={mode === "dark" ? "#EAEAEA" : "#373737"}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.5 9.6875C4.60355 9.6875 4.6875 9.60355 4.6875 9.5C4.6875 9.39645 4.60355 9.3125 4.5 9.3125C4.39645 9.3125 4.3125 9.39645 4.3125 9.5C4.3125 9.60355 4.39645 9.6875 4.5 9.6875ZM3.5625 9.5C3.5625 8.98223 3.98223 8.5625 4.5 8.5625C5.01777 8.5625 5.4375 8.98223 5.4375 9.5C5.4375 10.0178 5.01777 10.4375 4.5 10.4375C3.98223 10.4375 3.5625 10.0178 3.5625 9.5Z"
            fill={mode === "dark" ? "#EAEAEA" : "#373737"}
          />
        </svg>
      </div>
      <div
        className={`rounded-full ${
          data?.logo
            ? "bg-white"
            : "bg-[#284CB31A] p-[16px] flex items-center justify-center"
        } absolute left-8 top-12 flex items-center justify-center"`}
      >
        {data?.logo ? (
          <img src={data?.logo} alt="logo" className="max-w-sm" />
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 18L11 21L16 16"
              stroke="#284CB3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 17.6073C21.4937 17.0221 23 15.6889 23 13C23 9 19.6667 8 18 8C18 6 18 2 12 2C6 2 6 6 6 8C4.33333 8 1 9 1 13C1 15.6889 2.50628 17.0221 4 17.6073"
              stroke="#284CB3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <div className="w-full p-[24px] mt-[16px]">
        <div className="mb-[16px]">
          <h1 className="font-semibold text-[14px] text-start mb-[8px]">
            {data?.title}
          </h1>
          <p
            className={`${
              mode === "dark"
                ? "text-[#EAEAEA] text-start"
                : "text-[#6A6A6A] text-start font-medium"
            } text-[12px]`}
          >
            {data?.desc}
          </p>
        </div>
        <div className="flex items-center gap-[8px]">
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
              d="M0.727252 8.97725C0.946922 8.75758 1.30308 8.75758 1.52275 8.97725L4.5 11.9545L6.35225 10.1023C6.57192 9.88258 6.92808 9.88258 7.14775 10.1023C7.36742 10.3219 7.36742 10.6781 7.14775 10.8977L5.21595 12.8295C4.82054 13.225 4.17946 13.225 3.78405 12.8296L0.727252 9.77275C0.507583 9.55308 0.507583 9.19692 0.727252 8.97725Z"
              fill="#284CB3"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.3977 4.85225C12.6174 5.07192 12.6174 5.42808 12.3977 5.64775L9.39775 8.64775C9.17808 8.86742 8.82192 8.86742 8.60225 8.64775C8.38258 8.42808 8.38258 8.07192 8.60225 7.85225L11.6023 4.85225C11.8219 4.63258 12.1781 4.63258 12.3977 4.85225Z"
              fill="#284CB3"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.8977 4.85225C17.1174 5.07192 17.1174 5.42808 16.8977 5.64775L9.71595 12.8295C9.32054 13.225 8.67946 13.225 8.28405 12.8295L4.85225 9.39775C4.63258 9.17808 4.63258 8.82192 4.85225 8.60225C5.07192 8.38258 5.42808 8.38258 5.64775 8.60225L9 11.9545L16.1023 4.85225C16.3219 4.63258 16.6781 4.63258 16.8977 4.85225Z"
              fill="#284CB3"
            />
          </svg>
          <p className="font-medium text-[12px] text-start">
            {data?.count ?? 0} rules and benchmark
          </p>
        </div>
      </div>
    </button>
  );
};

export default PolicyCard;
