import { useEffect, useState, useReducer, useRef } from "react";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import "./multiselectcss.css";

export interface dropDownSetting {
  singleSelection?: boolean;
  selectAllText?: string;
  unSelectAllText?: string;
  itemsShowLimit?: number;
  allowSearchFilter?: boolean;
}
type PropTypes = {
  uniqueId?: any;
  idField: string;
  textField: string;
  dropDownSettings: dropDownSetting;
  isCountryList?: boolean;
  placeholder?: string;
  itemColor?: string;
  itemBackgroundColor?: string;
  disabled?: boolean;
  enableOthers?: boolean;
  enableAddNew?: boolean;
  data: any[];
  value: any;
  valueChange: React.Dispatch<any>;
  change: React.Dispatch<any>;
  othersClick: React.Dispatch<any>;
  onItemSelect: React.Dispatch<any>;
  onSelectAll: React.Dispatch<any>;
  onAddNewClick: React.Dispatch<any>;
};

export const MultiSelectComponent = ({
  uniqueId = "",
  idField = "id",
  textField = "name",
  dropDownSettings = {
    allowSearchFilter: true,
    itemsShowLimit: 3,
    unSelectAllText: "Unselect All",
    selectAllText: "Select All",
    singleSelection: false,
  },
  isCountryList = false,
  placeholder = "select option",
  itemColor = "#4847E0",
  itemBackgroundColor = "rgba(72, 71, 224, 0.08)",
  disabled = false,
  enableOthers = false,
  enableAddNew = false,
  data,
  value,
  valueChange,
  change,
  othersClick,
  onItemSelect,
  onSelectAll,
  onAddNewClick,
}: PropTypes) => {
  const oPanelData = useRef<any[]>([]);
  const [panelData, setPanelData] = useState<any[]>([]);
  const [isSearching, setisSearching] = useState<boolean>(false);
  const userValue = useRef<any>("");
  const selectedOptions = useRef<any[]>([]);
  const [isShowdataPanel, setIsShowdataPanel] = useState<boolean>(false);
  const [bulkAction_isChecked, setbulkAction_isChecked] =
    useState<boolean>(false);
  const [empty, setempty] = useState<boolean>(false);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const onPopState = (event: any) => {
      const el: HTMLElement = event.target as HTMLElement;

      if (
        !document.getElementById("mainHost" + uniqueId)?.contains(event.target)
      ) {
        setIsShowdataPanel(false);
      }
    };
    window.addEventListener("click", onPopState);
    return () => {
      window.removeEventListener("click", onPopState);
    };
  }, []);
  useEffect(() => {
    if (value) {
      userValue.current = value;
      if (userValue.current) {
        setValues(userValue.current);
      }
    }
  }, [value]);
  useEffect(() => {
    if (data) {
      if (data.length > 0) {
        setPanelData(
          data.map((x) => {
            x.isSelected = false;
            return x;
          })
        );
        if (!isSearching) {
          oPanelData.current = data.map((x) => {
            x.isSelected = false;
            return x;
          });
        }
        setTimeout(() => {
          if (userValue.current) {
            setValues(userValue.current);
          }
          setempty(oPanelData.current.length === 0);
        }, 50);
      }
    }
  }, [data]);

  const setValues = (data: any) => {
    if (panelData.length > 0) {
      selectedOptions.current = [];
      if (dropDownSettings.singleSelection) {
        if (idField) {
          let findIdex = panelData.find((x) => x[idField] === data);

          if (findIdex) {
            let newSelectedObj = {
              idField: findIdex[idField],
              textField: findIdex[textField],
            };
            selectedOptions.current.push(newSelectedObj);
          }
        }
      } else {
        let arr = [];
        if (data && data.length > 0) {
          arr = data.split(",");
          arr.forEach((val: any) => {
            if (idField) {
              let findIdex = panelData.find((x) => x[idField] === val);
              if (findIdex) {
                let newSelectedObj = {
                  idField: findIdex[idField],
                  textField: findIdex[textField],
                };
                selectedOptions.current.push(newSelectedObj);
              }
            }
          });
        }
      }
    }
    forceUpdate();
  };
  const checkedAcction = () => {
    setbulkAction_isChecked(!bulkAction_isChecked);
    if (dropDownSettings.singleSelection) {
      if (bulkAction_isChecked) {
        selectedOptions.current = [];
        panelData.map((d) => {
          d.isSelected = true;
          let newSelectedObj = {
            idField: d[idField],
            textField: d[textField],
          };
          selectedOptions.current.push(newSelectedObj);
          return d;
        });
      } else {
        panelData.map((d) => {
          d.isSelected = false;
          return d;
        });
        selectedOptions.current = [];
      }
      changes(selectedOptions.current);
    }
  };
  const changes = (selectedOptions: any[]) => {
    if (selectedOptions.length > 0) {
      if (!dropDownSettings.singleSelection) {
        var selVal = selectedOptions.map((x) => x.idField);
        change("");
        valueChange(selVal.join(","));
      } else {
        let fieldId = selectedOptions[0].idField;
        change(fieldId);
        valueChange(fieldId);
      }
    } else {
      change("");
      valueChange("");
    }
  };
  const selectOption = (colIndex: any, data: any, event: any) => {
    if (!dropDownSettings.singleSelection) {
      let vPanelData = panelData;
      vPanelData[colIndex].isSelected = event ? false : true;
      setPanelData(vPanelData);
      if (!event) {
        let newSelectedObj = {
          idField: data[idField],
          textField: data[textField],
        };
        selectedOptions.current.push(newSelectedObj);
      } else {
        var dIndex = selectedOptions.current.findIndex(
          (x) => x.idField === data[idField]
        );
        selectedOptions.current.splice(dIndex, 1);
      }
      // emit changes
      changes(selectedOptions.current);
    } else {
      let vPanelData = panelData;
      vPanelData[colIndex].isSelected = !vPanelData[colIndex].isSelected;
      setPanelData(vPanelData);
      let newSelectedObj = [
        {
          idField: data[idField],
          textField: data[textField],
        },
      ];
      selectedOptions.current = newSelectedObj;
      //emit changes
      changes(selectedOptions.current);
      toggleDataPanel();
    }
  };
  const handleSearch = async (event: any) => {
    setisSearching(true);
    if (event && (event !== "" || event === null)) {
      setPanelData(oPanelData.current);
      var truchk = false;
      setPanelData(
        await panelData.filter((uf) => {
          if (
            uf[textField]
              ?.toString()
              ?.toLowerCase()
              .indexOf(event?.toString()?.toLowerCase()) > -1
          ) {
            truchk = true;
            return true;
          } else {
            truchk = false;
          }

          return truchk;
        })
      );
      setisSearching(false);
    } else {
      setisSearching(false);
      setPanelData(oPanelData.current);
    }
  };
  const removefromselected = (sel: any, i: number) => {
    var findIdex = panelData.findIndex((x) => x[textField] === sel);
    panelData[findIdex].isSelected = false;
    setPanelData(panelData);
    selectedOptions.current.splice(i, 1);
    //emit changes
    changes(selectedOptions.current);
  };

  const toggleDataPanel = () => {
    setIsShowdataPanel(!isShowdataPanel);
  };
  const clearSelected = () => {
    selectedOptions.current = [];
  };
  const closeDropdown = () => {
    if (isShowdataPanel) {
      setIsShowdataPanel(false);
    }
  };

  return (
    <>
      <div
        id={"mainHost" + uniqueId}
        key={1}
        className={`${disabled ? "divDisable" : ""}`}
        style={{
          position: "relative",
          width: "100%",
          fontSize: "inherit",
          fontFamily: "inherit",
        }}
      >
        <div
          key={2}
          onClick={() => {
            toggleDataPanel();
          }}
          className="border font-medium border-[#C4CDD5] focus:ring-1 focus:ring-primary p-2 rounded"
          style={{
            display: "inline-block",
            width: "100%",
            marginBottom: 0,
            fontWeight: 400,
            lineHeight: 1.52857143,
            textAlign: "left",
            verticalAlign: "middle",
            cursor: "pointer",
            backgroundImage: "none",
          }}
        >
          <div
            key={3}
            style={{
              display: "flex",
              flexDirection: "row",
              boxSizing: "border-box",
            }}
          >
            <div
              key={4}
              style={{
                flex: "auto",
                display: "flex",
                flexDirection: "row",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {selectedOptions.current.length > 0 && (
                <div key={5} className="w-[7rem]">
                  {selectedOptions.current.map((sel: any, i: number) => (
                    <div key={i + 1} className="w-full">
                      {dropDownSettings.itemsShowLimit! > i && (
                        <div key={i + 2} className="w-full">
                          <div
                            key={i + 3}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              fontWeight: 500,
                              padding: "2px 4px",
                              minWidth: "33px",
                              fontSize: "1rem",
                              borderRadius: "4px",
                              marginRight: "5px",
                              color: itemColor,
                              background: itemBackgroundColor,
                            }}
                          >
                            <div
                              key={i + 4}
                              title={sel.textField}
                              className="text-sm"
                              style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                flex: 1,
                              }}
                            >
                              {isCountryList && (
                                <span className="flex no-wrap truncate">
                                  <span
                                    className={`mr-1 fi fi-${sel?.idField?.toLowerCase()} fis`}
                                  ></span>
                                  <span className="no-wrap truncate w-[45px]">
                                    {sel.textField}
                                  </span>
                                </span>
                              )}
                              {!isCountryList && <span>{sel.textField}</span>}
                            </div>
                            {!isCountryList && (
                              <span
                                key={i + 5}
                                onClick={() => {
                                  removefromselected(sel.textField, i);
                                }}
                                className="font-medium text-xs text-red-500"
                                style={{ cursor: "pointer" }}
                              >
                                x
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {selectedOptions.current.length < 1 && (
                <div key={6} className="w-[101px]">
                  <span
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      flex: 1,
                      color: "#95A8B8",
                      fontSize: "14px",
                      fontWeight:"500"
                    }}
                  >
                    {placeholder}
                  </span>
                </div>
              )}
            </div>
            <div key={7} className="flex flex-row cursor-pointer">
              <div key={8} className="p-[3px]">
                {selectedOptions.current.length >
                  dropDownSettings.itemsShowLimit! && (
                  <span>
                    +
                    {selectedOptions.current.length -
                      dropDownSettings.itemsShowLimit!}
                  </span>
                )}
              </div>
              <div id="toggleButton" key={9} style={{ padding: "0 3px" }}>
                <span key={10}>
                  {!isShowdataPanel && (
                    <svg
                      id="caret"
                      key={11}
                      width="20"
                      height="20"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        key={12}
                        d="M4 6L8 10L12 6"
                        stroke="#95A8B8"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {isShowdataPanel && (
                    <svg
                      id="caret"
                      key={13}
                      width="20"
                      height="20"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        key={14}
                        d="M12 10.0005L8 6.00049L4 10.0005"
                        stroke="#95A8B8"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* <!---data list panel--> */}
        <div key={15} id="menu">
          {isShowdataPanel && (
            <div
              key={16}
              className="border border-[#C4CDD5] rounded  w-full shadow"
              style={{
                position: "absolute",
                paddingTop: "6px",
                paddingBottom: "10px",
                zIndex: 9999,
                background: "#fff",
                marginTop: "1px",
              }}
            >
              <div key={17} className="flex flex-col">
                {empty && (
                  <div
                    key={18}
                    className="flex justify-center items-center p-[20px]"
                  >
                    <span key={19} className="font-medium text-xs text-[#343A40]">
                      Nothing to see here
                    </span>
                  </div>
                )}
                {!empty && (
                  <div key={20} className="flex flex-col">
                    <div
                      key={22}
                      className="flex flex-col space-y-2 px-2.5 py-1"
                    >
                      {!dropDownSettings.singleSelection && (
                        <div key={23} className="flex flex-row">
                          <input
                            key="selectbox"
                            onClick={() => {
                              checkedAcction();
                            }}
                            checked={bulkAction_isChecked}
                            name="chk"
                            type="checkbox"
                            className="font-medium"
                          />
                          <div key={25} className="pl-[5px] flex items-center">
                            {!bulkAction_isChecked && (
                              <span key={26} className="font-medium text-xs">
                                Select All
                              </span>
                            )}
                            {bulkAction_isChecked && (
                              <span key={27} className="font-medium text-xs">
                                UnSelect All
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      {dropDownSettings.allowSearchFilter && (
                        <div>
                          <input
                            key="filterInput"
                            onKeyUp={(e: any) => {
                              handleSearch(e.target.value);
                            }}
                            id="filterInput"
                            className="w-full font-medium p-2 border border-[#C4CDD5] rounded-md focus:ring-1 focus:ring-primary sm:text-xs"
                            type="text"
                            placeholder="Search"
                          />
                        </div>
                      )}
                    </div>
                    <div
                      key={28}
                      className="mCt px-2.5 py-1 max-h-[190px] font-medium overflow-scroll"
                    >
                      {panelData.map((data: any, i: number) => (
                        <div key={i}>
                          {!dropDownSettings.singleSelection && (
                            <div
                              key={30}
                              className="flex flex-row cursor-pointer"
                              onClick={() => {
                                selectOption(i, data, data["isSelected"]);
                                othersClick(false);
                                placeholder = "select option";
                              }}
                            >
                              <div key={31}>
                                <div key={32} className="form-check pl-[.2rem]">
                                  <input
                                    key="seltChk"
                                    name=""
                                    type="checkbox"
                                    checked={data["isSelected"]}
                                  />
                                </div>
                              </div>
                              {!isCountryList && (
                                <div
                                  key={33}
                                  className="text-sm flex flex-1 items-center pl-[5px]"
                                >
                                  {data[textField]}
                                </div>
                              )}
                            </div>
                          )}
                          {dropDownSettings.singleSelection && (
                            <div
                              key={34}
                              className="flex flex-row cursor-pointer"
                              onClick={() => {
                                selectOption(i, data, "");
                                othersClick(false);
                                placeholder = "select option";
                              }}
                            >
                              {!isCountryList && (
                                <div
                                  key={35}
                                  className="text-sm flex flex-1 items-center pl-[5px]"
                                >
                                  {data[textField]}
                                </div>
                              )}
                              {isCountryList && (
                                <div
                                  key={35}
                                  className="text-sm flex flex-1 items-center pl-[5px]"
                                >
                                  <span className="inline-block no-wrap truncate ">
                                    <span
                                      className={`mr-1 fi fi-${data[
                                        idField
                                      ]?.toLowerCase()}`}
                                    ></span>
                                    <span>{data[textField]}</span>
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {enableOthers && (
                  <div
                    key={36}
                    onClick={() => {
                      othersClick(true);
                      clearSelected();
                      placeholder = "Others";
                    }}
                    className="px-5 pt-2 border-t border-t-gray-300 cursor-pointer"
                  >
                    <span key={37} className="font-medium text-sm text-primary">
                      Others
                    </span>
                  </div>
                )}
                {enableAddNew && (
                  <span
                    onClick={() => {
                      onAddNewClick(true);
                      toggleDataPanel();
                    }}
                    className="pl-4 pt-2 text-primary text-sm font-medium cursor-pointer"
                  >
                    Add new
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
