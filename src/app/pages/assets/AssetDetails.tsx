import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import modeAtomsAtom from "../../atoms/modeAtoms.atom";
import { Modal } from "react-bootstrap";
import { FaTags, FaTimes } from "react-icons/fa";
import { dropDownSetting } from "../../components/tableComponents/models";
import { MultiSelectComponent } from "../../components/multiSelect/multiselect";
import axios from "axios";

const AssetDetails = ({
  data,
  handleHide,
  isOpen,
  panel,
  tagList,
  refetch,
}: any) => {
  const mode = useRecoilValue<any>(modeAtomsAtom);
  const [tabs, setTabs] = useState(panel);
  const [loading, setLoading] = useState(false);
  const [chosenTag, setChosenTags] = useState<any>([...data?.tags]);

  const dropdown: dropDownSetting = {
    selectAllText: "Select All",
    unSelectAllText: "UnSelect All",
    singleSelection: true,
    allowSearchFilter: true,
    itemsShowLimit: 3,
  };



  const handleUpdateTags = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const payload = chosenTag.map((chosen: any) => chosen.id)
    try {
      const resp = await axios.patch(
        `https://cspm-api.midrapps.com/system_settings/asset_managements/${data?.id}/`,
        {
          tag_ids: payload,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resp.status === 200) {
        refetch();
        handleHide();
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handleRemoveTag = (id: any) => {
    const filtered = chosenTag.filter((tag: any) => tag?.id !== id);
    setChosenTags(filtered);
  };

  const handleAddToChosen = (id: any) => {
    const filtered = tagList.filter((tag: any) => tag?.id === id);
    setChosenTags([...chosenTag, ...filtered]);
  };

  return (
    <Modal show={isOpen} onHide={handleHide} keyboard={false}>
      <Modal.Header
        closeButton
        className="border-0 pt-3 pr-3 pb-0"
      ></Modal.Header>
      <Modal.Body>
        <div className="w-full pb-3 flex items-center justify-center flex-col gap-2">
          <div className="bg-[#284CB31A] rounded-full w-12 h-12 flex items-center justify-center">
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
                d="M5.4375 9C5.4375 10.9675 7.03249 12.5625 9 12.5625C10.9675 12.5625 12.5625 10.9675 12.5625 9C12.5625 7.03249 10.9675 5.4375 9 5.4375C7.03249 5.4375 5.4375 7.03249 5.4375 9ZM9 11.4375C7.65381 11.4375 6.5625 10.3462 6.5625 9C6.5625 7.65381 7.65381 6.5625 9 6.5625C10.3462 6.5625 11.4375 7.65381 11.4375 9C11.4375 10.3462 10.3462 11.4375 9 11.4375Z"
                fill="#284CB3"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.49171 16.8687C9.18592 17.0386 8.81409 17.0386 8.50829 16.8687L2.20829 13.3687C1.88685 13.1901 1.6875 12.8513 1.6875 12.4836L1.68749 5.51316C1.68749 5.14545 1.88684 4.80665 2.20827 4.62807L8.50829 1.12807C8.81409 0.958187 9.18592 0.958185 9.49171 1.12807L15.7917 4.62807C16.1131 4.80665 16.3125 5.14545 16.3125 5.51315L16.3125 12.4836C16.3125 12.8513 16.1131 13.1901 15.7917 13.3687L9.49171 16.8687ZM9 15.8549L15.1875 12.4174L15.1875 5.57935L9 2.14185L2.81249 5.57935L2.8125 12.4174L9 15.8549Z"
                fill="#284CB3"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.8666 5.18396C15.7157 4.91239 15.3733 4.81455 15.1017 4.96542L11.4267 7.00709C11.1552 7.15796 11.0573 7.50041 11.2082 7.77198C11.3591 8.04355 11.7015 8.14139 11.9731 7.99052L15.6481 5.94885C15.9196 5.79798 16.0175 5.45552 15.8666 5.18396ZM2.15451 5.19581C2.00364 5.46737 2.10149 5.80983 2.37305 5.9607L6.02674 7.99052C6.29831 8.14139 6.64076 8.04354 6.79163 7.77198C6.9425 7.50041 6.84466 7.15796 6.57309 7.00709L2.9194 4.97727C2.64783 4.8264 2.30538 4.92424 2.15451 5.19581Z"
                fill="#284CB3"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 16.3125C8.68934 16.3125 8.4375 16.0607 8.4375 15.75V12C8.4375 11.6893 8.68934 11.4375 9 11.4375C9.31066 11.4375 9.5625 11.6893 9.5625 12V15.75C9.5625 16.0607 9.31066 16.3125 9 16.3125Z"
                fill="#284CB3"
              />
            </svg>
          </div>
          <h1 className="text-[18px] font-semibold">
            {data.services} Instance
          </h1>
          <p
            className={`text-[12px] font-medium ${
              mode === "dark" ? "text-[#FFFFFF]" : "text-[#6A6A6A]"
            }`}
          >
            {data?.id}
          </p>
        </div>
        <div className="">
          <div className="flex items-center gap-[16px] border-bottom">
            {["details", "tags", ""].map((d) => (
              <button
                key={d}
                className={`uppercase p-4 ${
                  d === tabs
                    ? "font-bold text-[12px] md:text-[14px] border-bottom-3 border-primary"
                    : `font-medium text-[10px] md:text-[14px] ${
                        mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
                      }`
                }`}
                onClick={() => setTabs(d)}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-[24px]">
          {tabs === "details" ? (
            <div className="w-full">
              <div className="grid grid-cols-2 py-[16px] px-[12px] bg-[#F7F7F8]">
                <p className="font-semibold text-[12px]">Instance name</p>
                <p className="font-medium text-[12px]">{data?.name}</p>
              </div>
              <div className="grid grid-cols-2 py-[16px] px-[12px]">
                <p className="font-semibold text-[12px]">Resource Type</p>
                <p className="font-medium text-[12px]">
                  {data?.resource_types}
                </p>
              </div>
              <div className="grid grid-cols-2 py-[16px] px-[12px] bg-[#F7F7F8]">
                <p className="font-semibold text-[12px]">Services</p>
                <p className="font-medium text-[12px]">{data?.services}</p>
              </div>
              <div className="grid grid-cols-2 py-[16px] px-[12px]">
                <p className="font-semibold text-[12px]">Cloud Identifier</p>
                <p className="font-medium text-[12px]">
                  {data?.cloud_identifier}
                </p>
              </div>
              <div className="grid grid-cols-2 py-[16px] px-[12px] bg-[#F7F7F8]">
                <p className="font-semibold text-[12px]">Cloud Provider</p>
                <p className="font-medium text-[12px]">
                  {data?.cloud_provider}
                </p>
              </div>
              <div className="grid grid-cols-2 py-[16px] px-[12px]">
                <p className="font-semibold text-[12px]">Region</p>
                <p className="font-medium text-[12px]">{data?.region}</p>
              </div>
            </div>
          ) : (
            <div className="w-full">
              <p className="font-semibold text-[12px] mb-[8px]">
                {chosenTag.length} Tags
              </p>
              <div className="flex items-center gap-[4px] py-[12px] flex-wrap">
                {chosenTag.map((tag: any) => (
                  <button
                    onClick={() => handleRemoveTag(tag?.id)}
                    className="bg-[#EFEFEF] rounded-full flex items-center gap-[12px] px-[10px] py-[2px] text-[#6A6A6A] font-semibold text-[8px] uppercase"
                  >
                    <p>{tag?.name}</p>
                    <FaTimes color="#284CB3" />
                  </button>
                ))}
              </div>
              <div className="mt-[24px] mb-[32px]">
                <label
                  htmlFor="new_tag"
                  className="font-medium flex mb-[8px] items-center gap-[8px]"
                >
                  <FaTags color={mode === "dark" ? "#EAEAEA" : "black"} />
                  <p>Add New tags</p>
                </label>
                <div className="flex-1">
                  <MultiSelectComponent
                    dropDownSettings={dropdown}
                    data={tagList}
                    enableAddNew={false}
                    value={""}
                    change={(e) => {}}
                    onAddNewClick={() => {}}
                    onItemSelect={() => {}}
                    onSelectAll={() => {}}
                    othersClick={(e) => console.log(e)}
                    placeholder="Select Option"
                    valueChange={(e) => {
                      const isPresent = chosenTag.find((tag: any) => tag.id === e)
                      if(!isPresent) {
                        handleAddToChosen(e);
                      }
                    }}
                    idField="id"
                    textField="name"
                  />
                </div>
              </div>
              <div className="flex items-end justify-end w-full">
                <button
                  disabled={chosenTag.length < 1}
                  onClick={handleUpdateTags}
                  className="bg-[#284CB3] w-fit font-medium rounded-full px-[24px] py-[12px] text-white text-center"
                >
                  {loading ? "processing" : "Save Tags"}
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AssetDetails;
