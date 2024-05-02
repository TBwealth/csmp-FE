import { useEffect, useState } from "react";
import { TableAction } from "../tableComponents/models";
import { Dropdown } from "flowbite-react";
import "../multiSelect/multiselectcss.css";
import { Popover } from "react-tiny-popover";

type Props = {
  actions: TableAction[];
  showHorizontal: boolean;
  data: any;
  renderchildren?: any;
  disabled?: boolean;
  itemSelected: React.Dispatch<any>;
};

export const DropdownChildren = () => {
  return (
    <>
      <div className="flex justify-center">
        <div>
          <div className="dropdown relative">
            <span
              className="
            
              flex
         ++   items-center py-1 lg:px-3 px-1 space-x-3 text-sm
            transition
            duration-150
            ease-in-out
            flex
            items-center
            whitespace-nowrap
            cursor-pointer
          "
              aria-expanded="false"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary ml-5 font-extrabold action-btn"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>

              {/* {!showHorizontal && (
                 <svg width="4" height="18" viewBox="0 0 4 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <g clip-path="url(#clip0_13092_416)">
                 <circle cx="2" cy="2" r="2" fill="#CCCCCC"/>
                 <circle cx="2" cy="9" r="2" fill="#CCCCCC"/>
                 <circle cx="2" cy="16" r="2" fill="#CCCCCC"/>
                 </g>
                 <defs>
                 <clipPath id="clip0_13092_416">
                 <rect width="4" height="18" fill="white"/>
                 </clipPath>
                 </defs>
                 </svg>
        )} */}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export const DropdownComponent = ({
  actions,
  showHorizontal,
  data,
  renderchildren,
  disabled = false,
  itemSelected,
}: Props) => {
  const [isShowdataPanel, setIsShowdataPanel] = useState<boolean>(false);

  const getDropDownlabel = (action: TableAction) => {
    let dropdownLabel = "";
    const fieldVal = data[action!.fieldName!];
    const dedupch = action?.fieldOptions?.find((x) => x.key === fieldVal);
    if (dedupch) {
      dropdownLabel = dedupch.value;
    }
    return dropdownLabel;
  };

  function toggleDataPanel() {
    setIsShowdataPanel(!isShowdataPanel);
    console.log(isShowdataPanel);
  }

  return (
    <>
      <Popover
        onClickOutside={() => setIsShowdataPanel(false)}
        isOpen={isShowdataPanel}
        positions={["bottom", "left", "top", "right"]} // preferred positions by priority
        content={
          <div className="bg-gray-100 text-lightDark shadow-md  rounded-md">
            <div key={17} className="flex flex-col">
              <div
                key={20}
                id="dropdown"
                className="z-10 divide-y divide-gray-100 rounded-sm shadow px-2"
                style={{ minWidth: "11rem" }}
              >
                <ul
                  key={28}
                  className="py-2 text-sm space-y-2 "
                  aria-labelledby="dropdownDefaultButton"
                >
                  {actions.map((act: any) => (
                    <li>
                      {!act.isFieldDependant && (
                        <button
                          onClick={() => {
                            itemSelected(act);
                            toggleDataPanel();
                          }}
                        >
                          <div className="flex flex-row w-full">
                            {act.iconSrc && (
                              <div className="flex justify-end space-x-3 items-center cursor-pointer pl-1 pr-1">
                                <img src={act.iconSrc} alt="" />
                              </div>
                            )}

                            <div className="flex flex-auto pr-7">
                              {act.label}
                            </div>
                          </div>
                        </button>
                      )}
                      {act.isFieldDependant && getDropDownlabel(act) && (
                        <button
                          onClick={() => {
                            itemSelected(act);
                            toggleDataPanel();
                          }}
                        >
                          <div className="flex flex-row w-full">
                            {act.iconSrc && (
                              <div className="flex justify-end space-x-3 items-center cursor-pointer pl-1 pr-1">
                                <img src={act.iconSrc} alt="" />
                              </div>
                            )}

                            <div className="flex flex-auto pr-7">
                              {getDropDownlabel(act)}
                            </div>
                          </div>
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        }
      >
        <div onClick={() => setIsShowdataPanel(!isShowdataPanel)}>
          <DropdownChildren />
        </div>
      </Popover>
    </>
  );
};
