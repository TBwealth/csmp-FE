import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import modeAtomsAtom from "../../../atoms/modeAtoms.atom";
import github from "../../../../../public/media/logos/hub_git.svg";
import gitlab from "../../../../../public/media/logos/gitlab.svg";
import kubernetes from "../../../../../public/media/logos/kuber.svg";
import registry from "../../../../../public/media/logos/registry.svg";
import hub_docker from "../../../../../public/media/logos/docker.svg";
import inspector from "../../../../../public/media/logos/inspector.svg";
import guard_duty from "../../../../../public/media/logos/guard_duty.svg";
import cloud from "../../../../../public/media/logos/cloud_1.svg";

const IntCard = ({ data, mode }: any) => {
  return (
    <div
      className={`${
        mode === "dark" ? "bg-lightDark" : "bg-white"
      } p-[24px] w-full grid grid-cols-6 place-content-center rounded-[12px] border`}
    >
      <div className="col-span-4 flex items-center gap-[16px]">
        <img
          src={
            data?.logo === "github"
              ? github
              : data?.logo === "terra"
              ? gitlab
              : data?.logo === "docker"
              ? hub_docker
              : data?.logo === "watch"
              ? registry
              : kubernetes
          }
          alt={`${data?.name} logo`}
          className="w-8 h-8"
        />
        <p className="text-[18px] font-medium">{data?.name}</p>
      </div>
      <div className="col-span-2 flex items-center justify-between">
        <p
          className={`font-medium text-[12px] ${
            mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
          }`}
        >
          {data?.type}
        </p>
        <p
          className={`border-start border-end text-center font-medium px-[12px] text-[12px] ${
            mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
          }`}
        >
          {data?.date}
        </p>
        <div className="flex px-[24px] items-center justify-between gap-[6px]">
          {data?.logo === "github" && (
            <button className="flex items-center justify-center">
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
                  fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.69176 1.85684C7.75679 1.60973 7.98021 1.4375 8.23573 1.4375H9.7015C9.95712 1.4375 10.1806 1.60986 10.2455 1.8571L10.6412 3.36358L12.0945 3.96122L13.1346 3.07238C13.3578 2.88163 13.6901 2.89464 13.8977 3.10225L15.3977 4.60225C15.6046 4.80906 15.6184 5.13985 15.4295 5.36319L14.5444 6.41005L15.1286 7.82087L16.6386 8.20485C16.888 8.26825 17.0625 8.49275 17.0625 8.75004L17.0624 10.2329C17.0624 10.489 16.8894 10.7128 16.6416 10.7773L15.123 11.1724L14.538 12.5851L15.4291 13.6363C15.6184 13.8596 15.6048 14.1907 15.3977 14.3977L13.8977 15.8977C13.6865 16.109 13.3469 16.1183 13.1244 15.9188L13.0828 15.8815C13.0558 15.8574 13.0168 15.8226 12.9688 15.7801C12.8729 15.695 12.7418 15.5793 12.6006 15.4564C12.4265 15.3049 12.248 15.1521 12.1027 15.0322L10.6794 15.6216L10.2953 17.1381C10.2321 17.3877 10.0075 17.5625 9.75 17.5625H8.25C7.99239 17.5625 7.7677 17.3875 7.70462 17.1377L7.32175 15.6217L5.9391 15.0528L4.85535 15.936C4.63166 16.1183 4.3063 16.1018 4.10225 15.8977L2.60225 14.3977C2.39143 14.1869 2.38172 13.8482 2.58012 13.6257L3.48043 12.6158L2.88877 11.2122L1.35186 10.7926C1.1072 10.7259 0.9375 10.5036 0.9375 10.25V8.75C0.9375 8.48859 1.11759 8.26163 1.37216 8.20222L2.86802 7.85313L3.44358 6.43801L2.56343 5.3547C2.38167 5.13098 2.39843 4.80607 2.60225 4.60225L4.10225 3.10225C4.3129 2.89161 4.65124 2.88172 4.87383 3.0797L5.88691 3.98076L7.28827 3.39003L7.69176 1.85684ZM8.66936 2.5625L8.30579 3.944C8.26137 4.11278 8.14113 4.25138 7.98031 4.31917L5.99681 5.1553C5.79697 5.23954 5.56651 5.2014 5.40447 5.05728L4.52259 4.2729L3.75646 5.03903L4.5266 5.98694C4.65603 6.14625 4.68841 6.36342 4.61108 6.55356L3.80043 8.54667C3.73164 8.71581 3.58503 8.84103 3.40721 8.88253L2.0625 9.19634V9.82048L3.44898 10.199C3.61559 10.2445 3.75208 10.364 3.81917 10.5231L4.65514 12.5063C4.73947 12.7064 4.70115 12.9371 4.55669 13.0991L3.77333 13.9778L4.53849 14.743L5.48802 13.9692C5.648 13.8388 5.86652 13.8065 6.05738 13.885L8.01177 14.689C8.17657 14.7568 8.2995 14.8987 8.34314 15.0715L8.68811 16.4375H9.31221L9.65811 15.0718C9.70172 14.8996 9.82408 14.7581 9.98818 14.6902L11.9761 13.867C12.1555 13.7927 12.3605 13.8161 12.5184 13.929C12.7107 14.0665 13.0601 14.3649 13.3392 14.6079C13.3865 14.649 13.4325 14.6893 13.4766 14.7279L14.2359 13.9686L13.4579 13.0508C13.3216 12.89 13.2866 12.6666 13.3672 12.4719L14.1907 10.4833C14.2582 10.3204 14.3981 10.1985 14.5688 10.1541L15.9374 9.79801L15.9375 9.18736L14.5781 8.8417C14.4062 8.79797 14.2649 8.67568 14.1971 8.51176L13.3738 6.52381C13.2933 6.32933 13.3281 6.10615 13.464 5.94541L14.2364 5.0319L13.47 4.26553L12.564 5.03984C12.4035 5.17696 12.1798 5.21272 11.9846 5.13244L9.95438 4.29753C9.79128 4.23046 9.66908 4.09077 9.62428 3.9202L9.26767 2.5625H8.66936Z"
                  fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                />
              </svg>
            </button>
          )}
          <button className="flex items-center justify-center">
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
                d="M15.0975 6.69609C15.4035 6.74989 15.6079 7.04154 15.5541 7.3475L14.0578 15.8572C14.0578 15.8572 14.0578 15.8572 14.0578 15.8572C13.8845 16.8434 13.0278 17.5626 12.0266 17.5626H5.97365C4.97234 17.5626 4.1157 16.8434 3.94231 15.8572L2.44609 7.3475C2.3923 7.04153 2.59672 6.74989 2.90269 6.69609C3.20865 6.6423 3.5003 6.84672 3.5541 7.15269L5.05032 15.6624C5.12913 16.1107 5.51853 16.4376 5.97365 16.4376H12.0266C12.4816 16.4376 12.871 16.1107 12.9498 15.6624L12.9498 15.6624L14.4461 7.15268C14.4999 6.84672 14.7915 6.64229 15.0975 6.69609Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.96875 2.5625C7.45098 2.5625 7.03125 2.98223 7.03125 3.5V4.4375H10.9688V3.5C10.9688 2.98223 10.549 2.5625 10.0312 2.5625H7.96875ZM5.90625 4.4375V3.5C5.90625 2.36091 6.82966 1.4375 7.96875 1.4375H10.0312C11.1704 1.4375 12.0938 2.36092 12.0938 3.5V4.4375H15.75C16.0607 4.4375 16.3125 4.68934 16.3125 5C16.3125 5.31066 16.0607 5.5625 15.75 5.5625H2.25C1.93934 5.5625 1.6875 5.31066 1.6875 5C1.6875 4.68934 1.93934 4.4375 2.25 4.4375H5.90625Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
            </svg>
          </button>
          <button className="flex items-center justify-center">
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
                d="M9.00012 2.5625C5.40312 2.5625 2.44491 5.30043 2.0969 8.80558C2.06621 9.11472 1.79072 9.34044 1.48158 9.30975C1.17244 9.27906 0.94671 9.00357 0.977403 8.69443C1.38198 4.61958 4.81909 1.4375 9.00012 1.4375C12.3071 1.4375 15.1479 3.42845 16.3915 6.27479C16.5159 6.55947 16.3859 6.89107 16.1013 7.01545C15.8166 7.13983 15.485 7.00988 15.3606 6.72521C14.2896 4.27384 11.8441 2.5625 9.00012 2.5625Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.5 2.1875C16.8107 2.1875 17.0625 2.43934 17.0625 2.75V6.05C17.0625 6.60919 16.6092 7.0625 16.05 7.0625H12.75C12.4393 7.0625 12.1875 6.81066 12.1875 6.5C12.1875 6.18934 12.4393 5.9375 12.75 5.9375H15.9375V2.75C15.9375 2.43934 16.1893 2.1875 16.5 2.1875Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.03699 16.4375C12.634 16.4375 15.5922 13.6996 15.9402 10.1944C15.9709 9.88528 16.2464 9.65956 16.5555 9.69025C16.8647 9.72094 17.0904 9.99643 17.0597 10.3056C16.6551 14.3804 13.218 17.5625 9.03699 17.5625C5.72998 17.5625 2.88923 15.5716 1.64561 12.7252C1.52123 12.4405 1.65117 12.1089 1.93585 11.9846C2.22052 11.8602 2.55212 11.9901 2.6765 12.2748C3.74755 14.7262 6.19305 16.4375 9.03699 16.4375Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.53711 16.8125C1.22645 16.8125 0.974609 16.5607 0.974609 16.25V12.95C0.974609 12.3908 1.42792 11.9375 1.98711 11.9375H5.28711C5.59777 11.9375 5.84961 12.1893 5.84961 12.5C5.84961 12.8107 5.59777 13.0625 5.28711 13.0625H2.09961V16.25C2.09961 16.5607 1.84777 16.8125 1.53711 16.8125Z"
                fill={mode === "dark" ? "#EAEAEA" : "#373737"}
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// const EmptyIntegrations = ({ showModal }: any) => {
const EmptyIntegrations = () => {
  return (
    <div className="w-full flex items-center justify-center flex-col gap-[24px] h-screen md:h-[40rem]">
      <img src={cloud} alt="database of repository" className="maxW-md h-72" />
      <h1 className="font-semibold text-[24px] mb-8">
        No Repository integration added{" "}
      </h1>
      <button
        onClick={() => console.log("Hurray")}
        className="rounded-full text-white px-[24px] py-[8px] flex font-medium textWhite items-center justify-center gap-2 bg-[#284CB3] text-White"
      >
        <p>New Integration</p>
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

const dummyData = [
  {
    name: "Scrapenext.git",
    logo: "github",
    type: "IAC",
    date: "Added: 23/032024",
  },
  {
    name: "Terraform Package.jp",
    logo: "terra",
    type: "Registry",
    date: "Added: 23/032024",
  },
  {
    name: "Docker files.prod",
    logo: "docker",
    type: "Registry",
    date: "Added: 23/032024",
  },
  {
    name: "AWS Gilotech cloudwatch",
    logo: "watch",
    type: "Cloud-Watch",
    date: "Added: 23/032024",
  },
  {
    name: "Kuber-prod-gilotech",
    logo: "kuber",
    type: "Registry",
    date: "Added: 23/032024",
  },
];
const ConfiguredIntegration = () => {
  const tabs = ["All", "Registry", "Repoistory", "Cloud-watch", "Clusters"];
  const { mode } = useRecoilValue(modeAtomsAtom);
  const [curTab, setTab] = useState("All");
  const [allIntegration, setAllIntegrations] = useState<any[]>(dummyData);

  const filterIntegrations = (val: string) => {
    if (val === "All") {
        setAllIntegrations(dummyData)
    }else {
        const filtered = dummyData.filter((dummy) => dummy.type === val);
        setAllIntegrations(filtered);
    }
  };

  return (
    <div className="px-8 mt-[32px] w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-col md:flex-row gap-[16px]">
          <h1 className="font-semibold text-[14px] md:text-[18px]">
            Integration ({dummyData.length})
          </h1>
          <Link
            to="/"
            className={`${
              mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
            } border-start border-end pt-[2px] px-[16px] font-medium text-[10px] md:text-[12px]`}
          >
            Learn more
          </Link>
        </div>
        <div className="relative">
          <input
            type="text"
            //   onChange={(e) => handleSearch(e.target.value)}
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
      </div>
      <div className="my-[24px] grid grid-cols-3 md:grid-cols-5 md:w-[55%] gap-[16px]">
        {tabs.map((tab, idx) => {
          if (tab === curTab) {
            return (
              <button
                onClick={() => {
                  setTab(tab);
                  filterIntegrations(tab);
                }}
                className={`text-center px-[16px] border-start py-[4px] font-medium text-primary underline text-[14px]`}
              >
                {tab}
              </button>
            );
          }
          return (
            <button
              onClick={() => {
                setTab(tab);
                filterIntegrations(tab);
              }}
              className={`text-center pl-[16px] ${
                idx === tab.length - 1 || idx === 0 ? "" : "border-start"
              } py-[4px] font-medium text-[14px]`}
            >
              {tab}
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-[16px] flex-col">
        {allIntegration.length > 0 ? allIntegration.map((integration) => (
          <IntCard data={integration} mode={mode} key={integration.logo} />
        )): <EmptyIntegrations />}
      </div>
    </div>
  );
};

export default ConfiguredIntegration;
