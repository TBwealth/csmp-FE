import { Dispatch, useState } from "react";
import { Popover } from "react-tiny-popover";


const Inventory = ({ data, mode, showDetails, addTag }: any) => {
  const [popUp, showPopUP] = useState(false);
  return (
    <div
      className={`grid grid-cols-10 gap-[8px] p-4  mb-3 place-content-center border-bottom h-[52px] w-[280vw] md:w-[180vw] lg:w-full ${
        mode === "dark" ? "bg-lightDark" : "bg-white"
      }`}
    >
      <p className="font-medium text-start col-span-2">{data?.name.length < 30 ? data?.name : `${data?.name.slice(0, 30)}...`}</p>
      <p className="font-medium text-start">{data?.resource_types.slice(0, 10)}...</p>
      <p className="font-medium text-start">{data?.services}</p>
      <p className="font-medium text-start col-span-2">{data?.cloud_identifier.slice(0, 15)}...</p>
      <p className="font-medium text-start">{data?.cloud_provider}</p>
      <p className="font-medium text-start">{data?.region}</p>
      <div className="col-span-2 flex items-center justify-between pr-[12px] gap-[6px]">
        <div className="flex items-center w-[80%] flex-wrap gap-[2px]">
          {data?.tags.length > 0 ? data?.tags.slice(0, 2).map((tag: any) => (
            <p className="bg-lightDark font-medium text-white rounded-full px-2 py-1 text-center text-[8px]">
              {tag?.name}
            </p>
          )) : <p className="font-medium">N/A</p>}
          {
            data?.tags.length > 2 && <p className="font-medium text-[12px] pl-1">{`+${data?.tags.length - 2}`}</p>
          }
        </div>
        <Popover
          onClickOutside={() => showPopUP(false)}
          isOpen={popUp}
          positions={["bottom", "right"]} // preferred positions by priority
          content={
            <div>
              <div
                key={20}
                id="dropdown"
                className={`z-10 ${
                  mode === "dark" ? "bg-lightDark" : "bg-white"
                } divide-y divide-gray-100 rounded-md shadow-sm px-2`}
                style={{ minWidth: "11rem" }}
              >
                <ul
                  key={28}
                  className="py-2 text-[10px] font-medium"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li className="border-start-0">
                    <button
                      onClick={() => {
                        showDetails();
                        // navigate(`repository/list/${data?.id}`);
                        showPopUP(false);
                      }}
                      className="flex items-center p-4 gap-4 border-bottom justify-between font-medium"
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
                          d="M15.2372 9.98083C12.7362 4.42306 5.26409 4.42306 2.76309 9.98083C2.63561 10.2641 2.30261 10.3904 2.01931 10.263C1.73601 10.1355 1.6097 9.80247 1.73718 9.51917C4.63619 3.07694 13.3641 3.07694 16.2631 9.51917C16.3906 9.80247 16.2643 10.1355 15.981 10.263C15.6977 10.3904 15.3647 10.2641 15.2372 9.98083Z"
                          fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9 8.8125C9.93198 8.8125 10.6875 9.56802 10.6875 10.5C10.6875 11.432 9.93198 12.1875 9 12.1875C8.06802 12.1875 7.3125 11.432 7.3125 10.5C7.3125 9.56802 8.06802 8.8125 9 8.8125ZM11.8125 10.5C11.8125 8.9467 10.5533 7.6875 9 7.6875C7.4467 7.6875 6.1875 8.9467 6.1875 10.5C6.1875 12.0533 7.4467 13.3125 9 13.3125C10.5533 13.3125 11.8125 12.0533 11.8125 10.5Z"
                          fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                        />
                      </svg>
                      <p className="text-[12px] font-medium">View Details</p>
                    </button>
                  </li>
                  <li className="border-start-0">
                    <button
                      onClick={() => {
                        addTag();
                        showPopUP(false);
                      }}
                      className="flex items-center gap-4 p-4 justify-between font-medium"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_1849_5056)">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.6219 1.70102C7.31864 1.63362 7.01817 1.82483 6.95077 2.1281L3.95077 15.6281C3.88338 15.9314 4.07459 16.2318 4.37786 16.2992C4.68112 16.3666 4.98159 16.1754 5.04898 15.8721L8.04898 2.37214C8.11638 2.06888 7.92517 1.76841 7.6219 1.70102Z"
                            fill={mode === "dark" ? "#EAEAEA" : "black"}
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M18.25 12C18.25 11.6893 17.9142 11.4375 17.5 11.4375H-0.5C-0.914213 11.4375 -1.25 11.6893 -1.25 12C-1.25 12.3107 -0.914213 12.5625 -0.5 12.5625H17.5C17.9142 12.5625 18.25 12.3107 18.25 12Z"
                            fill={mode === "dark" ? "#EAEAEA" : "black"}
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M19.75 5.25C19.75 4.93934 19.4142 4.6875 19 4.6875H1C0.585787 4.6875 0.25 4.93934 0.25 5.25C0.25 5.56066 0.585787 5.8125 1 5.8125H19C19.4142 5.8125 19.75 5.56066 19.75 5.25Z"
                            fill={mode === "dark" ? "#EAEAEA" : "black"}
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M13.6219 1.70102C13.3186 1.63362 13.0182 1.82483 12.9508 2.1281L9.95077 15.6281C9.88338 15.9314 10.0746 16.2318 10.3779 16.2992C10.6811 16.3666 10.9816 16.1754 11.049 15.8721L14.049 2.37214C14.1164 2.06888 13.9252 1.76841 13.6219 1.70102Z"
                            fill={mode === "dark" ? "#EAEAEA" : "black"}
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1849_5056">
                            <rect width="18" height="18" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>

                      <p className="text-[12px] font-medium">Add tags</p>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          }
        >
          <button onClick={() => showPopUP(true)} className="bg-transparent">
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
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.5 9.6875C13.6036 9.6875 13.6875 9.60355 13.6875 9.5C13.6875 9.39645 13.6036 9.3125 13.5 9.3125C13.3964 9.3125 13.3125 9.39645 13.3125 9.5C13.3125 9.60355 13.3964 9.6875 13.5 9.6875ZM12.5625 9.5C12.5625 8.98223 12.9822 8.5625 13.5 8.5625C14.0178 8.5625 14.4375 8.98223 14.4375 9.5C14.4375 10.0178 14.0178 10.4375 13.5 10.4375C12.9822 10.4375 12.5625 10.0178 12.5625 9.5Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
              <path
                d="M9 9.875C9.20711 9.875 9.375 9.70711 9.375 9.5C9.375 9.29289 9.20711 9.125 9 9.125C8.79289 9.125 8.625 9.29289 8.625 9.5C8.625 9.70711 8.79289 9.875 9 9.875Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9 9.6875C9.10355 9.6875 9.1875 9.60355 9.1875 9.5C9.1875 9.39645 9.10355 9.3125 9 9.3125C8.89645 9.3125 8.8125 9.39645 8.8125 9.5C8.8125 9.60355 8.89645 9.6875 9 9.6875ZM8.0625 9.5C8.0625 8.98223 8.48223 8.5625 9 8.5625C9.51777 8.5625 9.9375 8.98223 9.9375 9.5C9.9375 10.0178 9.51777 10.4375 9 10.4375C8.48223 10.4375 8.0625 10.0178 8.0625 9.5Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
              <path
                d="M4.5 9.875C4.70711 9.875 4.875 9.70711 4.875 9.5C4.875 9.29289 4.70711 9.125 4.5 9.125C4.29289 9.125 4.125 9.29289 4.125 9.5C4.125 9.70711 4.29289 9.875 4.5 9.875Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.5 9.6875C4.60355 9.6875 4.6875 9.60355 4.6875 9.5C4.6875 9.39645 4.60355 9.3125 4.5 9.3125C4.39645 9.3125 4.3125 9.39645 4.3125 9.5C4.3125 9.60355 4.39645 9.6875 4.5 9.6875ZM3.5625 9.5C3.5625 8.98223 3.98223 8.5625 4.5 8.5625C5.01777 8.5625 5.4375 8.98223 5.4375 9.5C5.4375 10.0178 5.01777 10.4375 4.5 10.4375C3.98223 10.4375 3.5625 10.0178 3.5625 9.5Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
            </svg>
          </button>
        </Popover>
      </div>
    </div>
  );
};

export default Inventory;
