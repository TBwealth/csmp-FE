import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import github from "../../../../../public/media/logos/hub_git.svg";
import gitlab from "../../../../../public/media/logos/gitlab.svg";
import kubernetes from "../../../../../public/media/logos/kuber.svg";
import registry from "../../../../../public/media/logos/registry.svg";
import hub_docker from "../../../../../public/media/logos/docker.svg";
import inspector from "../../../../../public/media/logos/inspector.svg";
import guard_duty from "../../../../../public/media/logos/guard_duty.svg";
import modeAtomsAtom from "../../../atoms/modeAtoms.atom";
import NewIntegrationModal from "./modals/NewIntegrationModal";

const NewIntegration = () => {
  const { mode } = useRecoilValue(modeAtomsAtom);
  const [showModal, setShowModal] = useState(false);
  const [currentHub, setCurHub] = useState<any>(null)
  const hubs = [
    {
      name: "Github",
      id: "01",
      logo: github,
      desc: "At vero eos et accusamus et iusto odio dignissimos ducimus",
    },
    {
      name: "Git Lab",
      id: "02",
      logo: gitlab,
      desc: "At vero eos et accusamus et iusto odio dignissimos ducimus",
    },
    {
      name: "Kubernetes",
      id: "03",
      logo: kubernetes,
      desc: "At vero eos et accusamus et iusto odio dignissimos ducimus",
    },
    {
      name: "Alibaba Registry",
      id: "04",
      logo: registry,
      desc: "At vero eos et accusamus et iusto odio dignissimos ducimus",
    },
    {
      name: "Docker Hub",
      id: "05",
      logo: hub_docker,
      desc: "At vero eos et accusamus et iusto odio dignissimos ducimus",
    },
    {
      name: "Amazon Inspector",
      id: "06",
      logo: inspector,
      desc: "At vero eos et accusamus et iusto odio dignissimos ducimus",
    },
    {
      name: "Amazon GaurdDuty",
      id: "07",
      logo: guard_duty,
      desc: "At vero eos et accusamus et iusto odio dignissimos ducimus",
    },
  ];

  return (
    <div className="px-8 mt-[32px] w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-col md:flex-row gap-[16px]">
          <h1 className="font-semibold text-[14px] md:text-[18px]">
            Integration Hub
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
      <div className="mt-[45px] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-[32px]">
        {hubs.map((hub) => (
          <div
            className={`shadow-md border rounded-[12px] p-[32px] flex flex-col items-center justify-center gap-[16px] ${
              mode === "dark" ? "bg-lightDark" : "bg-white"
            }`}
            key={hub.id}
            // style={boxStyle}
          >
            <img src={hub.logo} alt={hub.name + "logo"} className="w-14 h-14" />
            <h1 className="text-center font-semibold text-[18px]">{hub.name}</h1>
            <p
              className={`font-medium text-center text-[12px] ${
                mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
              }`}
            >
              {hub.desc}
            </p>
            <button
              onClick={() => {
                setCurHub(hub)
                setShowModal(!showModal)}}
              className="font-medium text-primary bg-none underline text-[14px]"
            >
              Connect
            </button>
          </div>
        ))}
      </div>
      <NewIntegrationModal data={currentHub} onClose={() => {setShowModal(!showModal)}} isOpen={showModal} mode={mode}/>
    </div>
  );
};

// const boxStyle = {
//     boxShadow: "0px 4px 30px 0px rgba(0, 0, 0, 0.05)"
// }

export default NewIntegration;
