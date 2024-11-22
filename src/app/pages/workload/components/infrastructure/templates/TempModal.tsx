import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import githubImg from "../../../../../../../public/media/logos/github.svg";
import gitlabImg from "../../../../../../../public/media/logos/gitlab.svg";
import bitImg from "../../../../../../../public/media/logos/bitbucket.svg";
import dockerImg from "../../../../../../../public/media/logos/docker.svg";
import { FaCheckSquare } from "react-icons/fa";

type Props = {
  isOpen: boolean;
  handleHide: any;
  mode: string;
};

const TempModal = ({ isOpen, handleHide, mode }: Props) => {
  const repos = ["Github", "Git Lab", "Bit Bucket", "Docker Hub"];
  const [selectedProvider, setSelectedProvider] = useState("");
  const [repoError, setRepoError] = useState("");
  const [createLoading, setcreateLoading] = useState(false);
  return (
    <Modal
      show={isOpen}
      onHide={() => {
        handleHide();
      }}
      keyboard={false}
    >
      <Modal.Header closeButton className="border-bottom-0  items-start">
        <Modal.Title>
          <div className="flex items-center gap-3">
            <div className="bg-[#284CB30D] w-12 h-12 rounded-full flex items-center justify-center p-2">
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
                  d="M3.1875 13.5V9H4.3125V13.4859C4.31292 13.4896 4.3137 13.4958 4.3151 13.5042C4.31964 13.5315 4.3306 13.5816 4.35628 13.6477C4.40641 13.7766 4.51786 13.9798 4.77232 14.1979C5.28525 14.6376 6.44231 15.1875 9 15.1875C11.5577 15.1875 12.7147 14.6376 13.2277 14.1979C13.4821 13.9798 13.5936 13.7766 13.6437 13.6477C13.6694 13.5816 13.6804 13.5315 13.6849 13.5042C13.6863 13.4958 13.6871 13.4896 13.6875 13.4859V9H14.8125V13.5H14.25C14.8125 13.5 14.8125 13.5007 14.8125 13.5013L14.8125 13.5027L14.8125 13.5056L14.8124 13.512L14.8119 13.5276C14.8115 13.5391 14.8108 13.5529 14.8095 13.5689C14.807 13.6008 14.8026 13.6413 14.7946 13.6892C14.7786 13.7849 14.7486 13.9105 14.6922 14.0554C14.5783 14.3484 14.3616 14.7077 13.9598 15.0521C13.1603 15.7374 11.6923 16.3125 9 16.3125C6.30769 16.3125 4.83975 15.7374 4.04018 15.0521C3.63839 14.7077 3.42172 14.3484 3.30778 14.0554C3.25143 13.9105 3.22137 13.7849 3.20541 13.6892C3.19743 13.6413 3.19295 13.6008 3.19048 13.5689C3.18924 13.5529 3.18849 13.5391 3.18806 13.5276L3.18762 13.512L3.18753 13.5056L3.18751 13.5027L3.1875 13.5013C3.1875 13.5007 3.1875 13.5 3.75 13.5H3.1875Z"
                  fill="#284CB3"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.1875 9V4.5H4.3125V8.98586C4.31292 8.98964 4.3137 8.99582 4.3151 9.00421C4.31964 9.03147 4.3306 9.08165 4.35628 9.14769C4.40641 9.27657 4.51786 9.47981 4.77232 9.69792C5.28525 10.1376 6.44231 10.6875 9 10.6875C11.5577 10.6875 12.7147 10.1376 13.2277 9.69792C13.4821 9.47981 13.5936 9.27657 13.6437 9.14769C13.6694 9.08165 13.6804 9.03147 13.6849 9.00421C13.6863 8.99582 13.6871 8.98964 13.6875 8.98586V4.5H14.8125V9H14.25C14.8125 9 14.8125 9.00065 14.8125 9.00131L14.8125 9.00268L14.8125 9.00558L14.8124 9.01205L14.8119 9.02761C14.8115 9.03913 14.8108 9.05294 14.8095 9.06889C14.807 9.10076 14.8026 9.14127 14.7946 9.18915C14.7786 9.28493 14.7486 9.41054 14.6922 9.55544C14.5783 9.84843 14.3616 10.2077 13.9598 10.5521C13.1603 11.2374 11.6923 11.8125 9 11.8125C6.30769 11.8125 4.83975 11.2374 4.04018 10.5521C3.63839 10.2077 3.42172 9.84843 3.30778 9.55544C3.25143 9.41054 3.22137 9.28493 3.20541 9.18915C3.19743 9.14127 3.19295 9.10076 3.19048 9.06889C3.18924 9.05294 3.18849 9.03913 3.18806 9.02761L3.18762 9.01205L3.18753 9.00558L3.18751 9.00268L3.1875 9.00131C3.1875 9.00065 3.1875 9 3.75 9H3.1875Z"
                  fill="#284CB3"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.04018 2.94792C4.83975 2.26257 6.30769 1.6875 9 1.6875C11.6923 1.6875 13.1603 2.26257 13.9598 2.94792C14.3616 3.29231 14.5783 3.65157 14.6922 3.94456C14.7486 4.08946 14.7786 4.21507 14.7946 4.31085C14.8026 4.35873 14.807 4.39924 14.8095 4.43111C14.8108 4.44706 14.8115 4.46087 14.8119 4.47239L14.8124 4.48795L14.8125 4.49442L14.8125 4.49732L14.8125 4.49869C14.8125 4.49935 14.8125 4.5 14.25 4.5C14.8125 4.5 14.8125 4.50065 14.8125 4.50131L14.8125 4.50268L14.8125 4.50558L14.8124 4.51205L14.8119 4.52761C14.8115 4.53913 14.8108 4.55294 14.8095 4.56889C14.807 4.60076 14.8026 4.64127 14.7946 4.68915C14.7786 4.78493 14.7486 4.91054 14.6922 5.05544C14.5783 5.34843 14.3616 5.70769 13.9598 6.05208C13.1603 6.73743 11.6923 7.3125 9 7.3125C6.30769 7.3125 4.83975 6.73743 4.04018 6.05208C3.63839 5.70769 3.42172 5.34843 3.30778 5.05544C3.25143 4.91054 3.22137 4.78493 3.20541 4.68915C3.19743 4.64127 3.19295 4.60076 3.19047 4.56889C3.18923 4.55294 3.18849 4.53913 3.18806 4.52761L3.18761 4.51205L3.18752 4.50558L3.1875 4.50268L3.1875 4.50131C3.1875 4.50065 3.1875 4.5 3.75 4.5C3.1875 4.5 3.1875 4.49935 3.1875 4.49869L3.1875 4.49732L3.18752 4.49442L3.18761 4.48795L3.18806 4.47239C3.18849 4.46087 3.18923 4.44706 3.19047 4.43111C3.19295 4.39924 3.19743 4.35873 3.20541 4.31085C3.22137 4.21507 3.25143 4.08946 3.30778 3.94456C3.42172 3.65157 3.63839 3.29231 4.04018 2.94792ZM4.31442 4.5C4.31463 4.50133 4.31485 4.50274 4.3151 4.50421C4.31964 4.53147 4.3306 4.58165 4.35628 4.64769C4.4064 4.77657 4.51785 4.97981 4.77232 5.19792C5.28525 5.63757 6.4423 6.1875 9 6.1875C11.5577 6.1875 12.7147 5.63757 13.2277 5.19792C13.4821 4.97981 13.5936 4.77657 13.6437 4.64769C13.6694 4.58165 13.6804 4.53147 13.6849 4.50421C13.6851 4.50274 13.6854 4.50133 13.6856 4.5C13.6854 4.49867 13.6851 4.49726 13.6849 4.49579C13.6804 4.46853 13.6694 4.41835 13.6437 4.35231C13.5936 4.22343 13.4821 4.02019 13.2277 3.80208C12.7147 3.36243 11.5577 2.8125 9 2.8125C6.4423 2.8125 5.28525 3.36243 4.77232 3.80208C4.51785 4.02019 4.4064 4.22343 4.35628 4.35231C4.3306 4.41835 4.31964 4.46853 4.3151 4.49579C4.31485 4.49726 4.31463 4.49867 4.31442 4.5Z"
                  fill="#284CB3"
                />
              </svg>
            </div>
            <p className="font-semibold text-[18px]">Add New Repo</p>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <div className="grid grid-cols-2 p-[24px] gap-[16px] w-[88%] mx-auto">
          {repos.map((repo) => (
            <label
              htmlFor={repo}
              className="hover:cursor-pointer relative"
              key={repo}
            >
              <div
                className={`${
                  selectedProvider === repo ? "bg-white" : "bg-[#EAEAEA]/20"
                }  rounded-[12px] border-1 shadow-md flex items-center flex-col p-[32px] gap-[16px] w-full`}
              >
                <img
                  src={
                    repo === "Github"
                      ? githubImg
                      : repo === "Git Lab"
                      ? gitlabImg
                      : repo === "Bit Bucket"
                      ? bitImg
                      : dockerImg
                  }
                  className="w-20 h-20"
                  alt={`${repo} logo`}
                />
                <p
                  className={`text-[16px] mt-6 font-semibold ${
                    mode === "dark" ? "text-[#EAEAEA]" : "text-[#373737]"
                  }`}
                >
                  {repo}
                </p>
              </div>
              {selectedProvider === repo && (
                <FaCheckSquare
                  color="#284CB3"
                  size={14}
                  className="absolute top-2 right-3"
                />
              )}
              <input
                type="radio"
                name="provider"
                id={repo}
                value={repo}
                onChange={(e) => {
                  setSelectedProvider(e.target.value);
                  setRepoError("");
                }}
                className="opacity-0"
              />
            </label>
          ))}
        </div>
        {repoError && (
          <p className="font-medium text-[14px] text-red-500 italic">
            {repoError}
          </p>
        )}
      </Modal.Body>
      <Modal.Footer className="border-top-0 pt-0">
        <div className="flex w-full items-end justify-end gap-[12px]">
          <button
            onClick={() => {
              if (!selectedProvider) {
                setRepoError("Please select a repo");
              } else {
                setRepoError("");
              }
            }}
            className="rounded-full w-48 font-medium bg-primary px-[24px] py-[12px] text-white"
          >
            {createLoading ? "Connecting..." : "Connect Repo"}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default TempModal;
