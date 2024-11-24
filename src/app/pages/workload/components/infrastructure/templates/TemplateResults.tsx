import React, { useEffect, useState } from "react";
import docker from "../../../../../../../public/media/logos/docker.svg";
import github from "../../../../../../../public/media/logos/github.svg";
import gitlabImg from "../../../../../../../public/media/logos/gitlab.svg";
import DefaultContent from "../../../../../components/defaultContent/defaultContent";
import database from "../../../../../../../public/media/logos/database.svg";
import { Popover } from "react-tiny-popover";

type Props = {
  mode: string;
  handleShowModal: any;
};

const EmptyTemplates = ({ showModal }: any) => {
  return (
    <div className="w-full flex items-center justify-center flex-col gap-[24px] h-screen md:h-[40rem]">
      <img
        src={database}
        alt="database of repository"
        className="maxW-md h-72"
      />
      <h1 className="font-semibold text-[24px] mb-8">
        No Repository added or saved{" "}
      </h1>

      <button
        onClick={showModal}
        className="rounded-full text-white px-[24px] py-[8px] flex font-medium items-center justify-center gap-2 bg-[#284CB3] text-White"
      >
        <p>Add new Template</p>
        <svg
          width="10"
          height="9"
          viewBox="0 0 10 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5 0C5.27614 0 5.5 0.223858 5.5 0.5V4H9C9.27614 4 9.5 4.22386 9.5 4.5C9.5 4.77614 9.27614 5 9 5H5.5V8.5C5.5 8.77614 5.27614 9 5 9C4.72386 9 4.5 8.77614 4.5 8.5V5H1C0.723858 5 0.5 4.77614 0.5 4.5C0.5 4.22386 0.723858 4 1 4H4.5V0.5C4.5 0.223858 4.72386 0 5 0Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
};

const IACard = ({ data, mode }: any) => {
  return (
    <div
      className={`${
        mode === "dark" ? "bg-lightDark" : "bg-white"
      } rounded-[12px] p-[24px] border flex items-center justify-between`}
    >
      <div className="flex items-center gap-[16px]">
        <img
          src={
            data?.logo === "docker"
              ? docker
              : data?.logo === "git"
              ? github
              : gitlabImg
          }
          alt=""
          className="w-8 h-8"
        />
        <h3 className="font-medium text-[18px] text-start">{data?.name}</h3>
      </div>
      <button>
        <svg
          width="18"
          height="19"
          viewBox="0 0 18 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9 7.8125C8.06802 7.8125 7.3125 8.56802 7.3125 9.5C7.3125 10.432 8.06802 11.1875 9 11.1875C9.93198 11.1875 10.6875 10.432 10.6875 9.5C10.6875 8.56802 9.93198 7.8125 9 7.8125ZM6.1875 9.5C6.1875 7.9467 7.4467 6.6875 9 6.6875C10.5533 6.6875 11.8125 7.9467 11.8125 9.5C11.8125 11.0533 10.5533 12.3125 9 12.3125C7.4467 12.3125 6.1875 11.0533 6.1875 9.5Z"
            fill="black"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.69176 1.85684C7.75679 1.60973 7.98021 1.4375 8.23573 1.4375H9.7015C9.95712 1.4375 10.1806 1.60986 10.2455 1.8571L10.6412 3.36358L12.0945 3.96122L13.1346 3.07238C13.3578 2.88163 13.6901 2.89464 13.8977 3.10225L15.3977 4.60225C15.6046 4.80906 15.6184 5.13985 15.4295 5.36319L14.5444 6.41005L15.1286 7.82087L16.6386 8.20485C16.888 8.26825 17.0625 8.49275 17.0625 8.75004L17.0624 10.2329C17.0624 10.489 16.8894 10.7128 16.6416 10.7773L15.123 11.1724L14.538 12.5851L15.4291 13.6363C15.6184 13.8596 15.6048 14.1907 15.3977 14.3977L13.8977 15.8977C13.6865 16.109 13.3469 16.1183 13.1244 15.9188L13.0828 15.8815C13.0558 15.8574 13.0168 15.8226 12.9688 15.7801C12.8729 15.695 12.7418 15.5793 12.6006 15.4564C12.4265 15.3049 12.248 15.1521 12.1027 15.0322L10.6794 15.6216L10.2953 17.1381C10.2321 17.3877 10.0075 17.5625 9.75 17.5625H8.25C7.99239 17.5625 7.7677 17.3875 7.70462 17.1377L7.32175 15.6217L5.9391 15.0528L4.85535 15.936C4.63166 16.1183 4.3063 16.1018 4.10225 15.8977L2.60225 14.3977C2.39143 14.1869 2.38172 13.8482 2.58012 13.6257L3.48043 12.6158L2.88877 11.2122L1.35186 10.7926C1.1072 10.7259 0.9375 10.5036 0.9375 10.25V8.75C0.9375 8.48859 1.11759 8.26163 1.37216 8.20222L2.86802 7.85313L3.44358 6.43801L2.56343 5.3547C2.38167 5.13098 2.39843 4.80607 2.60225 4.60225L4.10225 3.10225C4.3129 2.89161 4.65124 2.88172 4.87383 3.0797L5.88691 3.98076L7.28827 3.39003L7.69176 1.85684ZM8.66936 2.5625L8.30579 3.944C8.26137 4.11278 8.14113 4.25138 7.98031 4.31917L5.99681 5.1553C5.79697 5.23954 5.56651 5.2014 5.40447 5.05728L4.52259 4.2729L3.75646 5.03903L4.5266 5.98694C4.65603 6.14625 4.68841 6.36342 4.61108 6.55356L3.80043 8.54667C3.73164 8.71581 3.58503 8.84103 3.40721 8.88253L2.0625 9.19634V9.82048L3.44898 10.199C3.61559 10.2445 3.75208 10.364 3.81917 10.5231L4.65514 12.5063C4.73947 12.7064 4.70115 12.9371 4.55669 13.0991L3.77333 13.9778L4.53849 14.743L5.48802 13.9692C5.648 13.8388 5.86652 13.8065 6.05738 13.885L8.01177 14.689C8.17657 14.7568 8.2995 14.8987 8.34314 15.0715L8.68811 16.4375H9.31221L9.65811 15.0718C9.70172 14.8996 9.82408 14.7581 9.98818 14.6902L11.9761 13.867C12.1555 13.7927 12.3605 13.8161 12.5184 13.929C12.7107 14.0665 13.0601 14.3649 13.3392 14.6079C13.3865 14.649 13.4325 14.6893 13.4766 14.7279L14.2359 13.9686L13.4579 13.0508C13.3216 12.89 13.2866 12.6666 13.3672 12.4719L14.1907 10.4833C14.2582 10.3204 14.3981 10.1985 14.5688 10.1541L15.9374 9.79801L15.9375 9.18736L14.5781 8.8417C14.4062 8.79797 14.2649 8.67568 14.1971 8.51176L13.3738 6.52381C13.2933 6.32933 13.3281 6.10615 13.464 5.94541L14.2364 5.0319L13.47 4.26553L12.564 5.03984C12.4035 5.17696 12.1798 5.21272 11.9846 5.13244L9.95438 4.29753C9.79128 4.23046 9.66908 4.09077 9.62428 3.9202L9.26767 2.5625H8.66936Z"
            fill="black"
          />
        </svg>
      </button>
    </div>
  );
};

const TempCard = ({ data, mode }: any) => {
  const [popUp, showPopUP] = useState(false);
  return (
    <div
      className={`grid grid-cols-8 p-[12px] h-[45px] place-content-center border-bottom mb-[8px] w-full ${
        mode === "dark" ? "bg-lightDark" : "bg-white"
      }`}
    >
      <p
        className={`font-medium col-span-2 flex text-[12px] items-center ${
          mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
        }`}
      >
        {data?.template}
      </p>
      <p
        className={`font-medium col-span-2 flex text-[12px] items-center ${
          mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
        }`}
      >
        {data?.repo}
      </p>
      <p
        className={`font-medium flex text-[12px] items-center justify-start ${
          mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
        }`}
      >
        {data?.resource}
      </p>
      <p
        className={`font-medium flex text-[12px] items-center justify-start ${
          mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
        }`}
      >
        {data?.last_scanned}
      </p>
      <div className="flex items-center justify-between col-span-2">
        <p className="font-medium flex text-[12px] items-center text-[#FF161A]">
          {data?.cve}
        </p>
        <Popover
          onClickOutside={() => showPopUP(false)}
          isOpen={popUp}
          positions={["top", "right"]} // preferred positions by priority
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
                  <li className="border-start-0 w-full">
                    <button
                      onClick={() => {
                        // showDetails();
                        // navigate(`repository/list/${data?.id}`);
                        showPopUP(false);
                      }}
                      className="flex w-full items-center p-4 gap-4 border-bottom  font-medium"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_3155_8307)">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.00012 2.0625C5.40312 2.0625 2.44491 4.80043 2.0969 8.30558C2.06621 8.61472 1.79072 8.84044 1.48158 8.80975C1.17244 8.77906 0.94671 8.50357 0.977403 8.19443C1.38198 4.11958 4.81909 0.9375 9.00012 0.9375C12.3071 0.9375 15.1479 2.92845 16.3915 5.77479C16.5159 6.05947 16.3859 6.39107 16.1013 6.51545C15.8166 6.63983 15.485 6.50988 15.3606 6.22521C14.2896 3.77384 11.8441 2.0625 9.00012 2.0625Z"
                            fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M16.5 1.6875C16.8107 1.6875 17.0625 1.93934 17.0625 2.25V5.55C17.0625 6.10919 16.6092 6.5625 16.05 6.5625H12.75C12.4393 6.5625 12.1875 6.31066 12.1875 6C12.1875 5.68934 12.4393 5.4375 12.75 5.4375H15.9375V2.25C15.9375 1.93934 16.1893 1.6875 16.5 1.6875Z"
                            fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.03699 15.9375C12.634 15.9375 15.5922 13.1996 15.9402 9.69442C15.9709 9.38528 16.2464 9.15956 16.5555 9.19025C16.8647 9.22094 17.0904 9.49643 17.0597 9.80557C16.6551 13.8804 13.218 17.0625 9.03699 17.0625C5.72998 17.0625 2.88923 15.0716 1.64561 12.2252C1.52123 11.9405 1.65117 11.6089 1.93585 11.4846C2.22052 11.3602 2.55212 11.4901 2.6765 11.7748C3.74755 14.2262 6.19305 15.9375 9.03699 15.9375Z"
                            fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.53711 16.3125C1.22645 16.3125 0.974609 16.0607 0.974609 15.75V12.45C0.974609 11.8908 1.42792 11.4375 1.98711 11.4375H5.28711C5.59777 11.4375 5.84961 11.6893 5.84961 12C5.84961 12.3107 5.59777 12.5625 5.28711 12.5625H2.09961V15.75C2.09961 16.0607 1.84777 16.3125 1.53711 16.3125Z"
                            fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_3155_8307">
                            <rect width="18" height="18" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className="text-[12px] font-medium">Resync</p>
                    </button>
                  </li>
                  <li className="border-start-0">
                    <button
                      onClick={() => {
                        // setDelete();
                        showPopUP(false);
                      }}
                      className="flex items-center gap-4 p-4 border-bottom justify-between font-medium"
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
                          d="M14.9773 14.9773C15.1969 14.7576 15.5531 14.7576 15.7727 14.9773L16.8977 16.1023C17.1174 16.3219 17.1174 16.6781 16.8977 16.8977C16.6781 17.1174 16.3219 17.1174 16.1023 16.8977L14.9773 15.7727C14.7576 15.5531 14.7576 15.1969 14.9773 14.9773Z"
                          fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13.875 12.5625C13.1501 12.5625 12.5625 13.1501 12.5625 13.875C12.5625 14.5999 13.1501 15.1875 13.875 15.1875C14.2382 15.1875 14.5661 15.0407 14.8043 14.8018C15.0417 14.5638 15.1875 14.237 15.1875 13.875C15.1875 13.1501 14.5999 12.5625 13.875 12.5625ZM11.4375 13.875C11.4375 12.5288 12.5288 11.4375 13.875 11.4375C15.2212 11.4375 16.3125 12.5288 16.3125 13.875C16.3125 14.5468 16.04 15.156 15.6009 15.5963C15.1602 16.0381 14.5491 16.3125 13.875 16.3125C12.5288 16.3125 11.4375 15.2212 11.4375 13.875Z"
                          fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3 3.9375C3.31066 3.9375 3.5625 4.18934 3.5625 4.5V8.98586C3.56292 8.98964 3.5637 8.99582 3.5651 9.00421C3.56964 9.03147 3.5806 9.08165 3.60628 9.14769C3.65641 9.27657 3.76786 9.47981 4.02232 9.69792C4.53525 10.1376 5.69231 10.6875 8.25 10.6875C10.8077 10.6875 11.9647 10.1376 12.4777 9.69792C12.7321 9.47981 12.8436 9.27657 12.8937 9.14769C12.9194 9.08165 12.9304 9.03147 12.9349 9.00421C12.9363 8.99582 12.9371 8.98964 12.9375 8.98586V4.5C12.9375 4.18934 13.1893 3.9375 13.5 3.9375C13.8107 3.9375 14.0625 4.18934 14.0625 4.5V9H13.5C14.0625 9 14.0625 9.00065 14.0625 9.00131L14.0625 9.00268L14.0625 9.00558L14.0624 9.01205L14.0619 9.02761C14.0615 9.03913 14.0608 9.05294 14.0595 9.06889C14.057 9.10076 14.0526 9.14127 14.0446 9.18915C14.0286 9.28493 13.9986 9.41054 13.9422 9.55544C13.8283 9.84843 13.6116 10.2077 13.2098 10.5521C12.4103 11.2374 10.9423 11.8125 8.25 11.8125C5.55769 11.8125 4.08975 11.2374 3.29018 10.5521C2.88839 10.2077 2.67172 9.84843 2.55778 9.55544C2.50143 9.41054 2.47137 9.28493 2.45541 9.18915C2.44743 9.14127 2.44295 9.10076 2.44048 9.06889C2.43924 9.05294 2.43849 9.03913 2.43806 9.02761L2.43762 9.01205L2.43753 9.00558L2.43751 9.00268L2.4375 9.00131C2.4375 9.00065 2.4375 9 3 9H2.4375V4.5C2.4375 4.18934 2.68934 3.9375 3 3.9375Z"
                          fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3.29018 2.94792C4.08975 2.26257 5.55769 1.6875 8.25 1.6875C10.9423 1.6875 12.4103 2.26257 13.2098 2.94792C13.6116 3.29231 13.8283 3.65157 13.9422 3.94456C13.9986 4.08946 14.0286 4.21507 14.0446 4.31085C14.0526 4.35873 14.057 4.39924 14.0595 4.43111C14.0608 4.44706 14.0615 4.46087 14.0619 4.47239L14.0624 4.48795L14.0625 4.49442L14.0625 4.49732L14.0625 4.49869C14.0625 4.49935 14.0625 4.5 13.5 4.5C14.0625 4.5 14.0625 4.50065 14.0625 4.50131L14.0625 4.50268L14.0625 4.50558L14.0624 4.51205L14.0619 4.52761C14.0615 4.53913 14.0608 4.55294 14.0595 4.56889C14.057 4.60076 14.0526 4.64127 14.0446 4.68915C14.0286 4.78493 13.9986 4.91054 13.9422 5.05544C13.8283 5.34843 13.6116 5.70769 13.2098 6.05208C12.4103 6.73743 10.9423 7.3125 8.25 7.3125C5.55769 7.3125 4.08975 6.73743 3.29018 6.05208C2.88839 5.70769 2.67172 5.34843 2.55778 5.05544C2.50143 4.91054 2.47137 4.78493 2.45541 4.68915C2.44743 4.64127 2.44295 4.60076 2.44047 4.56889C2.43923 4.55294 2.43849 4.53913 2.43806 4.52761L2.43761 4.51205L2.43752 4.50558L2.4375 4.50268L2.4375 4.50131C2.4375 4.50065 2.4375 4.5 3 4.5C2.4375 4.5 2.4375 4.49935 2.4375 4.49869L2.4375 4.49732L2.43752 4.49442L2.43761 4.48795L2.43806 4.47239C2.43849 4.46087 2.43923 4.44706 2.44047 4.43111C2.44295 4.39924 2.44743 4.35873 2.45541 4.31085C2.47137 4.21507 2.50143 4.08946 2.55778 3.94456C2.67172 3.65157 2.88839 3.29231 3.29018 2.94792ZM3.56442 4.5C3.56463 4.50133 3.56485 4.50274 3.5651 4.50421C3.56964 4.53147 3.5806 4.58165 3.60628 4.64769C3.6564 4.77657 3.76785 4.97981 4.02232 5.19792C4.53525 5.63757 5.6923 6.1875 8.25 6.1875C10.8077 6.1875 11.9647 5.63757 12.4777 5.19792C12.7321 4.97981 12.8436 4.77657 12.8937 4.64769C12.9194 4.58165 12.9304 4.53147 12.9349 4.50421C12.9351 4.50274 12.9354 4.50133 12.9356 4.5C12.9354 4.49867 12.9351 4.49726 12.9349 4.49579C12.9304 4.46853 12.9194 4.41835 12.8937 4.35231C12.8436 4.22343 12.7321 4.02019 12.4777 3.80208C11.9647 3.36243 10.8077 2.8125 8.25 2.8125C5.6923 2.8125 4.53525 3.36243 4.02232 3.80208C3.76785 4.02019 3.6564 4.22343 3.60628 4.35231C3.5806 4.41835 3.56964 4.46853 3.5651 4.49579C3.56485 4.49726 3.56463 4.49867 3.56442 4.5Z"
                          fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3 8.4375C3.31066 8.4375 3.5625 8.68934 3.5625 9V13.4859C3.56292 13.4896 3.5637 13.4958 3.5651 13.5042C3.56964 13.5315 3.5806 13.5816 3.60628 13.6477C3.65641 13.7766 3.76786 13.9798 4.02232 14.1979C4.53525 14.6376 5.69231 15.1875 8.25 15.1875C8.56066 15.1875 8.8125 15.4393 8.8125 15.75C8.8125 16.0607 8.56066 16.3125 8.25 16.3125C5.55769 16.3125 4.08975 15.7374 3.29018 15.0521C2.88839 14.7077 2.67172 14.3484 2.55778 14.0554C2.50143 13.9105 2.47137 13.7849 2.45541 13.6892C2.44743 13.6413 2.44295 13.6008 2.44048 13.5689C2.43924 13.5529 2.43849 13.5391 2.43806 13.5276L2.43762 13.512L2.43753 13.5056L2.43751 13.5027L2.4375 13.5013C2.4375 13.5007 2.4375 13.5 3 13.5H2.4375V9C2.4375 8.68934 2.68934 8.4375 3 8.4375Z"
                          fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                        />
                      </svg>

                      <p className="text-[12px] font-medium">
                        Scan Entire Registry
                      </p>
                    </button>
                  </li>
                  <li className="border-start-0">
                    <button
                      onClick={() => {
                        // showDetails();
                        // navigate(`repository/list/${data?.id}`);
                        showPopUP(false);
                      }}
                      className="flex items-center p-4 gap-4 justify-between font-medium"
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
                          d="M3.9375 6.75C3.9375 6.43934 4.18934 6.1875 4.5 6.1875H7.5C7.81066 6.1875 8.0625 6.43934 8.0625 6.75C8.0625 7.06066 7.81066 7.3125 7.5 7.3125H4.5C4.18934 7.3125 3.9375 7.06066 3.9375 6.75Z"
                          fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.625 5.0625C12.3499 5.0625 12.9375 5.65013 12.9375 6.375C12.9375 7.09987 12.3499 7.6875 11.625 7.6875C10.9001 7.6875 10.3125 7.09987 10.3125 6.375C10.3125 5.65013 10.9001 5.0625 11.625 5.0625ZM14.0625 6.375C14.0625 5.02881 12.9712 3.9375 11.625 3.9375C10.2788 3.9375 9.1875 5.02881 9.1875 6.375C9.1875 7.72119 10.2788 8.8125 11.625 8.8125C12.9712 8.8125 14.0625 7.72119 14.0625 6.375Z"
                          fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.3125 4.5C7.3125 4.81066 7.06066 5.0625 6.75 5.0625H4.5C4.18934 5.0625 3.9375 4.81066 3.9375 4.5C3.9375 4.18934 4.18934 3.9375 4.5 3.9375L6.75 3.9375C7.06066 3.9375 7.3125 4.18934 7.3125 4.5Z"
                          fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13.968 13.812C13.7956 14.0705 13.4464 14.1404 13.1879 13.9681L10.1552 11.9462L8.60133 13.1893C8.3959 13.3536 8.10398 13.3536 7.89855 13.1893L4.14855 10.1893C3.90596 9.99519 3.86663 9.64122 4.0607 9.39863C4.25477 9.15605 4.60875 9.11671 4.85133 9.31078L8.24994 12.0297L9.77355 10.8108C9.96483 10.6578 10.2331 10.6461 10.437 10.782L13.812 13.032C14.0704 13.2043 14.1403 13.5536 13.968 13.812Z"
                          fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2.8125 2.8125V15.1875H15.1875V2.8125H2.8125ZM1.6875 2.7C1.6875 2.14081 2.14081 1.6875 2.7 1.6875H15.3C15.8592 1.6875 16.3125 2.14081 16.3125 2.7V15.3C16.3125 15.8592 15.8592 16.3125 15.3 16.3125H2.7C2.14081 16.3125 1.6875 15.8592 1.6875 15.3V2.7Z"
                          fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                        />
                      </svg>
                      <p className="text-[12px] font-medium">
                        Vulnerability reports
                      </p>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          }
        >
          <button
            onClick={() => showPopUP(true)}
            className="bg-transparent flex items-center justify-center"
          >
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
          </button>
        </Popover>
      </div>
    </div>
  );
};

const TemplateResults = ({ mode, handleShowModal }: Props) => {
  const [isLoading, setLoading] = useState(false);
  const [tab, setTab] = useState("IAC REPO");
  const [allResult, setAllResult] = useState<any[]>([]);
  const [showPopOver, setShowPopOver] = useState(false);
  const templateData = [
    {
      template: "main.tf",
      repo: "scrapenext.git",
      resource: "AWS ECR",
      last_scanned: "2/4/2012 10:45 AM",
      cve: "5 (high)",
      id: 0,
    },
    {
      template: "vpc.yaml",
      repo: "Reponame.tf",
      resource: "AWS VPC",
      last_scanned: "2/4/2012 10:45 AM",
      cve: "2",
      id: 1,
    },
    {
      template: "infra.json",
      repo: "scrapenext.git",
      resource: "Azure Resource",
      last_scanned: "2/4/2012 10:45 AM",
      cve: "2",
      id: 2,
    },
  ];

  const iacData = [
    {
      name: "Docker files.prod",
      logo: "docker",
      id: 0,
    },
    {
      name: "Scrapenext.git",
      logo: "git",
      id: 1,
    },
    {
      name: "Scrapenext.git",
      logo: "git",
      id: 2,
    },
    {
      name: "Terraform Package.jp",
      logo: "terraform",
      id: 3,
    },
  ];

  const handleSearch = (val: string) => {
    const keys = ["name", "description", "severity"];
    if (val) {
      const filterd = allResult.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(val.toLowerCase()))
      );

      setAllResult(filterd);
    } else {
      setAllResult(allResult);
    }
  };

  useEffect(() => {
    if (tab === "IAC REPO") {
      setAllResult(iacData);
      //   handleFetchRules("Cloud", undefined, undefined);
    } else {
      setAllResult(templateData);
      //   handleFetchRules("Repository", undefined, undefined);
    }
  }, [tab]);

  return (
    <div>
      <div className="mb-[24px] flex flex-col md:flex-row items-center w-full justify-between border-bottom">
        <div className="flex items-center gap-[16px]">
          {["IAC REPO", "Templates"].map((d) => (
            <button
              key={d}
              className={`uppercase p-4 ${
                d === tab
                  ? "font-bold text-[10px] md:text-[14px] border-bottom-3 border-primary"
                  : `font-medium text-[8px] md:text-[14px] ${
                      mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
                    }`
              }`}
              onClick={() => {
                setTab(d);
                // setCanNext(false);
                // setCanPrev(false);
                // setPage(1);
                // if (d === "Cloud bEnchmarks") {
                //   handleFetchRules("Cloud", undefined, undefined);
                // } else {
                //   handleFetchRules("Repository", undefined, undefined);
                // }
              }}
            >
              {d}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-[16px] -order-1 md:order-1">
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
            className="flex text-[10px] md:text-[12px] border-start pl-[16px] font-medium items-center gap-3"
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
      <div className="w-full">
        {allResult?.length < 1 ? (
          <>
            {isLoading ? (
              <DefaultContent
                pageHeader="All IAC templates"
                pageDescription="No record found"
                loading={isLoading}
                buttonValue=""
                buttonClick={() => {}}
              />
            ) : (
              <EmptyTemplates showModal={handleShowModal} />
            )}
          </>
        ) : tab === "IAC REPO" ? (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[24px]">
            {allResult.map((res) => (
              <IACard data={res} key={res?.id} mode={mode} />
            ))}
          </div>
        ) : (
          <>
            <div
              className={`grid grid-cols-8 p-[12px] h-[45px] rounded-t-[16px] mb-[8px] border-bottom  ${
                mode === "dark" ? "bg-lightDark" : "bg-white"
              }`}
            >
              <p className="text-start col-span-2 font-semibold text-[12px]">
                Template
              </p>
              <p className="font-semibold col-span-2 text-[12px] text-start">
                Repo
              </p>
              <p className="font-semibold text-[12px] text-start">Resource</p>
              <p className="font-semibold text-[12px] text-start">
                Last scanned
              </p>
              <div className="flex items-start justify-between col-span-2">
                <p className="font-semibold text-[12px]">CVEs</p>
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
            </div>
            {allResult.map((res) => (
              <TempCard data={res} key={res?.id} mode={mode} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default TemplateResults;
