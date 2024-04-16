import {useEffect, useState} from 'react'
import { TableColumn, ColumnTypes } from "./models";


const SORT_KEY = "sort";
export interface FilterField extends TableColumn {}

type Props = {
    filterDataChange: React.Dispatch<object>;
    downloadasChange: React.Dispatch<string>;
    searchChange: React.Dispatch<string>;
    sortChange: React.Dispatch<any>;
    dateRangeChanged: React.Dispatch<any>;
    sortOptionSelected: React.Dispatch<any>;
    toggleColumnsEvent: React.Dispatch<any>;
    toggleCustomFilter: React.Dispatch<any>;
  
    showTableFilter: boolean;
    filterFields: FilterField[];
    tableHeader: TableColumn[];
    customFilter: boolean;
    showDateRange: boolean;
    showfilterButton: boolean;
    showOtherFilter: boolean;
    showSortBtn: boolean;
    showCustomSortBtn: boolean;
    customSortOptions: string[];
    bulkDeactivate: boolean;
    bulkDuplicate: boolean;
    tableColumn: any[];
    isAllExport?: boolean;
    showSearch?: boolean;
}

export const RenderSortIconButton = () => {
    return (
      <>
        <div>
          <div className="dropdown relative">
            <span
              className="dropdown-toggle border-[0.5px] border-[#CED4DA] bg-white rounded-md flex items-center py-2.5 lg:px-3 px-1 space-x-3 text-sm transition duration-150 ease-in-out whitespace-nowrap cursor-pointer show_filter"
              aria-expanded="false"
            >
              Sort By
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="caret-down"
                className="w-2 ml-2"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                ></path>
              </svg>
            </span>
          </div>
        </div>
      </>
    );
  };

const TableHeader = ({
    filterDataChange,
    downloadasChange,
    searchChange,
    sortChange,
    dateRangeChanged,
    sortOptionSelected,
    toggleColumnsEvent,
    toggleCustomFilter,
    showTableFilter,
    filterFields,
    tableHeader,
    customFilter,
    showDateRange,
    showfilterButton,
    showOtherFilter,
    showSortBtn,
    showCustomSortBtn,
    customSortOptions,
    bulkDeactivate,
    bulkDuplicate,
    isAllExport = true,
    showSearch = true,
  }: Props) => {
    const [filterData, setfilterData] = useState<any>({});
  const [showFilter, setshowFilter] = useState<boolean>(false);
  const [sort, setsort] = useState<any>("");
  const [isToggleColumns, setisToggleColumns] = useState<boolean>(false);
  const COLUMN_TYPES = ColumnTypes;
  const [showFilterModal, setshowFilterModal] = useState<boolean>(false);
  const [showExportModal, setshowExportModal] = useState<boolean>(false);
  const [sortbydropdownPopoverShow, setsortbydropdownPopoverShow] =
    useState<boolean>(false);
  const [myDateInit, setmyDateInit] = useState<boolean>(false);
  const [selectedexport, setselectedexport] = useState<string>("pdf");
  const todaysDate = new Date().toISOString();
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [nstartDate, nendDate] = dateRange;
  const [selectedRecord, setselectedRecord] = useState<number>();
  const [headfilterFields, setheadfilterFields] = useState<FilterField[]>([]);
  const [isShowdataPanel, setIsShowdataPanel] = useState<boolean>(false);

  function onsortChange(ev: TableColumn, direction: any) {
    let newSortObj = {
      data: ev,
      direction: direction,
    };
    setIsShowdataPanel(!isShowdataPanel);
    sortChange(newSortObj);
  }

  function sortRecentAndOldest(dir: string) {
    if (dir === "Asc") {
      let newFil = filterData;
      newFil.sortBy = 1;
      setfilterData(newFil);
    }
    if (dir === "Desc") {
      let newFil = filterData;
      newFil.sortBy = 2;
      setfilterData(newFil);
    }
    setsortbydropdownPopoverShow(!sortbydropdownPopoverShow);
    submitFilter();
  }
  function setListVal() {
    if (filterFields.length > 0) {
      let innfilterViel = [...filterFields];
      innfilterViel.forEach((val) => {
        if (!val.listValue) {
          val.listValue = [];
        }
      });
      setheadfilterFields(innfilterViel);
    }
  }
  useEffect(() => {
    setListVal();
    let innfilterViel = [...filterFields];
    innfilterViel.forEach((val) => {
      if (val.type === COLUMN_TYPES.slider) {
        filterData[val!.sliderStartName!] = 0;
        filterData[val!.sliderEndName!] = 0;
      }
    });
    setheadfilterFields(innfilterViel);
  }, [filterFields]);

  function handleSearch(value: any) {
    searchChange(value);
  }
  function downloadas(downloadtype: any) {
    downloadasChange(downloadtype);
  }

  function changeFilter() {
    if (!customFilter) {
      setshowFilter(!showFilter);
    }
  }

  function fieldValueChanged(ev: any, fieldName: any) {
    let innFDate = { ...filterData };
    innFDate[fieldName] = ev.target ? ev.target.value : ev;
    setfilterData(innFDate);
  }
  function clearFilter() {
    filterFields.forEach((val, index) => {
      let innFDate = filterData;
      innFDate[val.name] = undefined;
      setfilterData(innFDate);
    });
    filterDataChange(filterData);
  }

  function sortChanged() {
    let innFDate = filterData;
    innFDate[SORT_KEY] = sort;
    setfilterData(innFDate);
    submitFilter();
  }

  function submitFilter() {
    filterDataChange(filterData);
    setshowFilter(false);
  }

  function dateChanged(event: any[]) {
    dateRangeChanged({ startDate: event[0], endDate: event[1] });
  }

  function toggleColumns() {
    toggleColumnsEvent("");
    setisToggleColumns(!isToggleColumns);
  }

  function changeButtonText(): string {
    return isToggleColumns ? "Hide" : "Full Table";
  }

  function triggerCustomToggle() {
    toggleCustomFilter("");
  }

  function onSortOptionClick(sortOption: string) {
    sortOptionSelected(sortOption);
  }

  return (
    <>
      <div className="flex flex-wrap justify-between items-center pt-5 text-sm text-[#4A4A4A]">
        <div className="flex flex-wrap-reverse justify-between lg:space-x-2 space-x-1 items-center">
          {showSearch && (
            <div className="bg-[#F3F3F4] text-sm border-0 rounded-md focus:ring-1 focus:ring-primary flex flex-direction:row">
              <div className="px-2 py-2.5">
              <i className="far fa-search fs-3x"></i>
                {/* <img src={searchIcon} alt="search" className="icon" /> */}
              </div>
              <input
                onKeyUp={(e: any) => {
                  handleSearch(e.target.value);
                }}
                type="text"
                name=""
                placeholder="Search"
                className="!block bg-inherit focus:ring-0 py-2 px-2 text-sm border-0"
              />
            </div>
          )}
          {/* {showDateRange && (
            <div className="border-[0.5px] border-[#CED4DA] bg-white rounded-md flex items-center pl-2 space-x-1 text-sm cursor-pointer">
              <i className="fa fa-calendar"></i>
              <DatePicker
                isClearable={true}
                selectsRange={true}
                startDate={nstartDate}
                maxDate={new Date()}
                endDate={nendDate}
                onChange={(date) => {
                  setDateRange(date);
                  dateChanged(date);
                }}
                placeholderText="Select date range"
                dateFormat="MMM dd, yyyy"
              />
            </div>
          )} */}
          {showfilterButton && !customFilter && (
            <button
              onClick={() => changeFilter()}
              className="border-[0.5px] border-[#CED4DA] bg-white rounded-md flex items-center py-2.5 px-3 text-sm"
            >
              <span className="md:mr-3 show_filter"> Filter </span>
              <i className="far fa-search fs-3x"></i>
              {/* <img src={filterIcon} alt="filter" className="icon" /> */}
            </button>
          )}
          {showfilterButton && customFilter && (
            <button
              onClick={() => triggerCustomToggle()}
              className="border-[0.5px] border-[#CED4DA] bg-white rounded-md flex items-center py-2.5 px-3 text-sm"
            >
              <span className="md:mr-3 show_filter"> Filter </span>
              <i className="far fa-search fs-3x"></i>
              {/* <img src={filterIcon} alt="filter" className="icon" /> */}
            </button>
          )}

          {/* {showSortBtn && (
            <Popover
              onClickOutside={() => setIsShowdataPanel(false)}
              isOpen={isShowdataPanel}
              positions={["bottom", "left", "top", "right"]} // preferred positions by priority
              content={
                <div>
                  <div
                    key={20}
                    id="dropdown"
                    className="z-10 bg-white divide-y divide-gray-100 rounded-sm shadow px-2"
                    style={{ minWidth: "11rem" }}
                  >
                    <ul
                      key={28}
                      className="py-2 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownDefaultButton"
                    >
                      {showOtherFilter && (
                        <li onClick={() => sortRecentAndOldest("Desc")}>
                          <span className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100">
                            Most Recent
                          </span>
                        </li>
                      )}
                      {showOtherFilter && (
                        <li onClick={() => sortRecentAndOldest("Asc")}>
                          <span className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100">
                            Oldest
                          </span>
                        </li>
                      )}
                      {tableHeader.map((sortList) => (
                        <li>
                          {sortList.title && (
                            <span className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100">
                              <div className="flex flex-row w-full">
                                <div className="flex flex-auto pr-7">
                                  {sortList.title}
                                </div>

                                <div
                                  className="flex justify-end space-x-3 items-center cursor-pointer"
                                  style={{ height: "100%" }}
                                >
                                  <i
                                    onClick={() =>
                                      onsortChange(sortList, "Asc")
                                    }
                                    className="fa fa-angle-down"
                                  ></i>
                                  <i
                                    onClick={() =>
                                      onsortChange(sortList, "Desc")
                                    }
                                    className="fa fa-angle-up"
                                  ></i>
                                </div>
                              </div>
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              }
            >
              <div onClick={() => setIsShowdataPanel(!isShowdataPanel)}>
                <RenderSortIconButton />
              </div>
            </Popover>
          )} */}
          {/* {showCustomSortBtn && (
            <div className="flex justify-center">
              <Dropdown label renderTrigger={RenderSortIconButton}>
                {customSortOptions.map((sortList) => (
                  <Dropdown.Item>
                    {sortList && (
                      <span
                        onClick={() => onSortOptionClick(sortList)}
                        className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                      >
                        <div className="flex flex-row w-full">
                          <div className="flex flex-auto pr-7">{sortList}</div>
                        </div>
                      </span>
                    )}
                  </Dropdown.Item>
                ))}
              </Dropdown>
            </div>
          )} */}
          <button
            onClick={() => setshowExportModal(!showExportModal)}
            className="flex space-x-1 border-[0.5px] border-[#CED4DA] py-2.5 px-3 rounded-md place-self-center mr-3 export_btn"
            data-modal-id="modal1"
          >
            <p className="text-base text-gray-700 font-normal hover:cursor-pointer">
              Export as
            </p>
          </button>
          <div className="flex space-x-3 items-center print">
            <span
              onClick={() => downloadas("Print")}
              className="flex space-x-1 place-self-center cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20.766"
                height="20.766"
                viewBox="0 0 20.766 20.766"
              >
                <g
                  id="Icon_feather-printer"
                  data-name="Icon feather-printer"
                  transform="translate(-2.25 -2.25)"
                >
                  <path
                    id="Path_11726"
                    data-name="Path 11726"
                    d="M9,9.743V3H20.56V9.743"
                    transform="translate(-2.147)"
                    fill="none"
                    stroke="#4847e0"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                  <path
                    id="Path_11727"
                    data-name="Path 11727"
                    d="M6.853,22.17H4.927A1.927,1.927,0,0,1,3,20.243V15.427A1.927,1.927,0,0,1,4.927,13.5H20.34a1.927,1.927,0,0,1,1.927,1.927v4.817A1.927,1.927,0,0,1,20.34,22.17H18.413"
                    transform="translate(0 -3.757)"
                    fill="none"
                    stroke="#4847e0"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                  <path
                    id="Path_11728"
                    data-name="Path 11728"
                    d="M9,21H20.56v7.707H9Z"
                    transform="translate(-2.147 -6.44)"
                    fill="none"
                    stroke="#4847e0"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </g>
              </svg>
              <p className="text-sm">Print</p>
            </span>
          </div>

          {bulkDeactivate && (
            <button
              className="flex space-x-1 border-[0.5px] border-[#CED4DA] py-2.5 px-3 rounded-md place-self-center mr-3 export_btn"
              data-modal-id="modal1"
            >
              <p className="text-base text-[#1C1919] font-normal hover:cursor-pointer">
                Deactivate
              </p>
            </button>
          )}
          {bulkDuplicate && (
            <button
              className="flex space-x-1 border-[0.5px] border-[#CED4DA] py-2.5 px-3 rounded-md place-self-center mr-3 export_btn"
              data-modal-id="modal1"
            >
              <p className="text-base text-[#1C1919] font-normal hover:cursor-pointer">
                Duplicate
              </p>
            </button>
          )}
        </div>
        {/* <Modal show={showExportModal} position="center">
          <div>
            <div className="bg-white px-5 pt-6 pb-8">
              <div className="text-left md:p-8 p-4">
                <div className="mb-10">
                  <h2 className="text-xl font-bold mb-4">Export As</h2>
                  <p>Select the format you will like to export as</p>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex space-x-4">
                    <input
                      type="radio"
                      name="flexRadioDefault"
                      value="pdf"
                      onChange={(e: any) => {
                        setselectedexport(e.target.value);
                      }}
                      className="items-center w-3 h-3 p-2 rounded-full checked:bg-primary appearance-none text-primary focus:bg-primary active:bg-primary"
                    />
                    <div className="flex items-center space-x-2 ">
                      <img src={pdficon} alt="pdf" />
                      <p
                        className="font-semibold
                                     text-sm"
                      >
                        PDF
                      </p>
                    </div>
                  </div>
                  {isAllExport && (
                    <>
                      <div className="flex space-x-4">
                        <input
                          type="radio"
                          name="flexRadioDefault"
                          value="Excel"
                          onChange={(e: any) =>
                            setselectedexport(e.target.value)
                          }
                          className="items-center w-3 h-3 p-2 rounded-full checked:bg-primary appearance-none  active:bg-primary "
                        />
                        <div className="flex items-center space-x-2 ">
                          <img src={excelicon} alt="excel" />
                          <p
                            className="font-semibold
                                        text-sm"
                          >
                            Excel
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-4">
                        <input
                          type="radio"
                          name="flexRadioDefault"
                          value="Csv"
                          onChange={(e: any) =>
                            setselectedexport(e.target.value)
                          }
                          className="items-center w-3 h-3 p-2 rounded-full checked:bg-primary appearance-none text-primary focus:bg-primary active:bg-primary"
                        />
                        <div className="flex items-center space-x-2 ">
                          <img src={csvicon} alt="csv" />
                          <p
                            className="font-semibold
                                        text-sm"
                          >
                            CSV
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex justify-center">
                  <span
                    onClick={() => {
                      downloadas(selectedexport);
                      setshowExportModal(!showExportModal);
                    }}
                    className="border border-solid flex-1 hover:border-dotted bg-primary text-white border-purple-900 rounded flex items-center justify-center px-2 w-3/5 py-2 cursor-pointer"
                  >
                    Export
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <Modal show={showFilter} position="center">
          <div>
            <div className="bg-white px-10 space-y-12 pt-10 pb-16">
              <div className="flex justify-between">
                <h2 className="font-bold text-xl">Filter By</h2>
              </div>
              {headfilterFields.length > 0 && (
                <form className="lg:self-start w-full grid md:grid-cols-2 gap-x-6 gap-y-10">
                  {headfilterFields.map((field, i) => (
                    <div className="w-full">
                      {(field.type === COLUMN_TYPES.Text ||
                        field.type === undefined) &&
                        field.listValue!?.length < 1 && (
                          <div>
                            <label className="block mb-1 text-sm">
                              {field.title}
                            </label>
                            <input
                              type="text"
                              name=""
                              placeholder={field.title}
                              onChange={(e) => fieldValueChanged(e, field.name)}
                              className="text-sm w-full border border-[#C4CDD5] rounded-md focus:ring-1 focus:ring-primary"
                            />
                          </div>
                        )}

                      {field.type === COLUMN_TYPES.List &&
                        field.listValue!?.length > 0 && (
                          <div>
                            <label className="block mb-1 text-sm">
                              {field.title}
                            </label>
                            <select
                              name=""
                              id=""
                              onChange={(e) => fieldValueChanged(e, field.name)}
                              className="bg-[#F2F5F9] w-full text-sm border-0 rounded-md focus:ring-1 focus:ring-primary"
                            >
                              <option value="">--Select {field.title}--</option>
                              {field.listValue?.map((listv) => (
                                <option value={listv[field.listIdField!]}>
                                  {listv[field.listTextField!]}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}

                      {field.type === COLUMN_TYPES.slider &&
                        field.listValue!.length < 1 &&
                        showFilter && (
                          <div>
                            <label className="block mb-1 text-sm justify-between">
                              <span>{field.title}</span>
                            </label>
                            <div className="w-full custom-slider">
                              <RangeSlider
                                max={50}
                                defaultValue={[
                                  filterData[field!.sliderStartName!],
                                  filterData[field!.sliderEndName!],
                                ]}
                                constraint={([start, end]) =>
                                  start <= field?.sliderMin! &&
                                  end >= field?.sliderMax!
                                }
                              />
                            </div>
                          </div>
                        )}
                      {field.type === COLUMN_TYPES.Date && (
                        <div>
                          <label className="block mb-1 text-sm">
                            {field.title}
                          </label>
                          <div className="w-full border border-[#C4CDD5] rounded-md focus:ring-1 focus:ring-primary flex justify-between">
                            <DatePicker
                              onChange={(date) =>
                                fieldValueChanged(date, field.name)
                              }
                              placeholderText="Select Date"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </form>
              )}

              <div className="lg:self-start w-full grid md:grid-cols-2 gap-x-6 gap-y-10">
                {headfilterFields.length > 0 && (
                  <button
                    type="button"
                    onClick={() => submitFilter()}
                    className="border border-solid hover:border-dotted bg-primary hover:bg-white border-purple-900 hover:text-primary text-white font-bold rounded flex items-center justify-center px-2 w-64 py-2"
                  >
                    Apply
                  </button>
                )}
              </div>
            </div>
          </div>
        </Modal> */}
      </div>
    </>
  )
}

export default TableHeader