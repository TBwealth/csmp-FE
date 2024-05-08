import { useEffect, useRef, useState } from "react";
import {
  ColumnTypes,
  TableAction,
  TableActionEvent,
  TableColumn,
} from "../models";
import { TableheaderComponent } from "../tableheader/tableheader";
import { NamedStatusComponent, TableStatus } from "../status/status";
import errorAvatar from "../../../../_metronic/assets/icons/defaultUserAVatar.svg";
import { Tooltip } from "flowbite-react";
import moment from "moment";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { Modal } from "flowbite-react";
import { DropdownComponent } from "../../dropdownComponent/dropdownComponent";
import logo from "../../../../_metronic/assets/icons/defaultUserAVatar.svg";
import { useRecoilValue } from "recoil";
import modeAtomsAtom from "../../../atoms/modeAtoms.atom";
import { Checkbox } from "rsuite";
import "./maintable.css";

export interface FilterField extends TableColumn {}
const NUMBER_OF_ITEMS_PER_PAGE = 10;

export enum ActionsType {
  multipleIconActionType = 2,
  buttonActionType = 1,
  none = 3,
}

export const formatNumber = (num: any) => {
  if (num !== undefined) {
    return parseFloat(Number(num).toFixed(2))
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  return 0;
};

export function numberWithCommas(x: any) {
  return x ? x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") : "";
}

export const DropdownChild = () => {
  return (
    <>
      <div className="flex justify-center">
        <div>
          <div className="dropdown relative">
            <span
              className="
            dropdown-toggle
             bg-white flex
            items-center py-1 lg:px-3 px-1 space-x-3 text-sm
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

export enum ACTIONS {
  EDIT = "1",
  DELETE = "2",
}

export type SortDirection = "asc" | "desc" | "";
const rotate: { [key: string]: SortDirection } = {
  asc: "desc",
  desc: "",
  "": "asc",
};

const compare = (v1: string | number, v2: string | number) =>
  v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: any;
  direction: SortDirection;
}

export const toExportFileName = (excelFileName: string) => {
  return `${excelFileName}_export_${new Date().getTime()}.xlsx`;
};

export const exportAsExcelFile = (excelArray: any[], InputFileName: string) => {
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelArray);
  const workbook: XLSX.WorkBook = {
    Sheets: { data: worksheet },
    SheetNames: ["data"],
  };
  XLSX.writeFile(workbook, toExportFileName(InputFileName));
};

export const downloadAsPDF = (theader: any, tbody: any, fileNane: any) => {
  const doc = new jsPDF({ orientation: "portrait" });
  const dateStamp = moment(new Date()).format("MMM dd, yyyy h:mm a");
  doc.text(dateStamp, 145, 7);
  //doc.addImage(logo, "PNG", 140, 12, 40, 10);
  const finalY = 15;
  doc.text(fileNane, 14, finalY + 15);
  autoTable(doc, {
    startY: finalY + 20,
    tableWidth: "auto",
    theme: "striped",
    headStyles: { fillColor: "#0F1014", textColor: "#D1D4E5" },
    head: [theader[0]],
    body: tbody,
  });
  doc.save(fileNane + ".pdf");
};

export const printAsPDF = (theader: any, tbody: any, fileNane: any) => {
  const doc = new jsPDF({ orientation: "portrait" });
  const dateStamp = moment(new Date()).format("MMM dd, yyyy h:mm a");
  doc.text(dateStamp, 145, 7);
  //  doc.addImage(logo, "PNG", 140, 12, 40, 10);
  const finalY = 15;
  doc.text(fileNane, 14, finalY + 15);
  autoTable(doc, {
    startY: finalY + 20,
    tableWidth: "auto",
    theme: "striped",
    headStyles: { fillColor: "#0F1014", textColor: "#D1D4E5" },
    head: [theader[0]],
    body: tbody,
  });

  doc.autoPrint();
  // const blob = doc.output("bloburl");
  // window.open(blob.toString(),'self');

  const hiddFrame = document.createElement("iframe");
  hiddFrame.style.position = "fixed";
  // "visibility: hidden" would trigger safety rules in some browsers like safari，
  // in which the iframe display in a pretty small size instead of hidden.
  // here is some little hack ~
  hiddFrame.style.width = "1px";
  hiddFrame.style.height = "1px";
  hiddFrame.style.opacity = "0.01";
  const isSafari = /^((?!chrome|android).)*safari/i.test(
    window.navigator.userAgent
  );
  if (isSafari) {
    // fallback in safari
    hiddFrame.onload = () => {
      try {
        hiddFrame.contentWindow?.document.execCommand("print", false, "");
      } catch (e) {
        hiddFrame.contentWindow?.print();
      }
    };
  }
  hiddFrame.src = doc.output("bloburl").toString();
  document.body.appendChild(hiddFrame);
};

type Props = {
  //input
  filterFields?: FilterField[];
  InputFileName?: string;
  showTableFilter?: boolean;
  loading?: boolean;
  tableColum?: TableColumn[];
  searchabletableColum?: TableColumn[];
  userData: any[];
  showSerialNumb?: boolean;
  showfilterButton?: boolean;
  showCheckBox?: boolean;
  showActions?: boolean;
  actions?: TableAction[];
  Bulkactions?: TableAction[];
  table2?: boolean;
  showFilter?: boolean;
  showOtherFilter?: boolean;
  showCustomSortBtn?: boolean;
  showSortBtn?: boolean;
  showBulkAction?: boolean;
  customFilter?: boolean;
  totalItems?: number;
  showPagination?: boolean;
  showDateRange?: boolean;
  showBlueHeader?: boolean;
  customSortOptions?: string[];
  bulkDeactivate?: boolean;
  bulkDuplicate?: boolean;
  currentTablePage: number;

  //Output
  actionClick: React.Dispatch<TableActionEvent>;
  actionChecked: React.Dispatch<TableActionEvent>;
  actionBulkChecked: React.Dispatch<TableActionEvent>;
  bulkactionClicked: React.Dispatch<any>;
  pageChange: React.Dispatch<number>;
  filterChange: React.Dispatch<object>;
  dateRangeChanged: React.Dispatch<any>;
  toggleColumnsEvent: React.Dispatch<void>;
  toggleCustomFilter: React.Dispatch<void>;
  sortOptionSelected: React.Dispatch<string>;
};

export const MainTableComponent = ({
  filterFields = [],
  InputFileName = "CSPM",
  showTableFilter = false,
  loading = false,
  tableColum = [],
  searchabletableColum = [],
  userData,
  showSerialNumb = false,
  showfilterButton = true,
  showCheckBox = false,
  showActions = true,
  actions = [],
  Bulkactions = [],
  table2 = false,
  showFilter = false,
  showOtherFilter = false,
  showCustomSortBtn = false,
  showSortBtn = true,
  showBulkAction = false,
  customFilter = false,
  totalItems = 10,
  showPagination = true,
  showDateRange = false,
  showBlueHeader = false,
  customSortOptions = [],
  bulkDeactivate = false,
  bulkDuplicate = false,
  currentTablePage,

  //Output
  actionClick,
  actionChecked,
  actionBulkChecked,
  bulkactionClicked,
  pageChange,
  filterChange,
  dateRangeChanged,
  toggleColumnsEvent,
  toggleCustomFilter,
  sortOptionSelected,
}: Props) => {
  const [usersTableData, setusersTableData] = useState<any[]>([]);
  const [tableData, settableData] = useState<any[]>();
  const [_currentPage, set_currentPage] = useState<number>();
  const [currentPage, setcurrentPage] = useState<number>();
  const [pageData, setpageData] = useState<any[]>([]);
  const [pageSize, setpageSize] = useState<number>(10);
  const [newPageSize, setnewPageSize] = useState<number>(10);
  const [totalNoOfPages, settotalNoOfPages] = useState<number>();
  const COLUMN_TYPES = ColumnTypes;
  const bulkAction_isChecked = useRef<boolean>(false);
  const mode = useRecoilValue<any>(modeAtomsAtom);
  const [actiondropdownPopoverShow, setactiondropdownPopoverShow] =
    useState<boolean>(false);
  const [selectedexport, setselectedexport] = useState<string>("");
  const [showExportModal, setshowExportModal] = useState<boolean>(false);
  const [selectedRecord, setselectedRecord] = useState<number>(0);
  const [filter, setfilter] = useState<any>({});
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  useEffect(() => {
    settotalNoOfPages(Math.ceil(totalItems / pageSize));
  }, [totalNoOfPages, totalItems, pageSize]);
  useEffect(() => {
    set_currentPage(currentTablePage);
    setcurrentPage(currentTablePage);
  }, [currentTablePage]);
  useEffect(() => {
    setusersTableData(userData);
    settableData(userData);
  }, [userData]);
  function getCleanText(rawText: any) {
    let html = rawText;
    let div = document.createElement("div");
    div.innerHTML = html;
    const text = div.innerText;
    return text;
  }
  function getTableValue(action: TableColumn, data: any) {
    let dropdownLabel = "";
    const fieldVal = data[action.dependentFieldName!];
    const dedupch = action.fieldOptions?.find((x) => x.key === fieldVal);
    if (dedupch) {
      dropdownLabel = dedupch.value;
    }
    return dropdownLabel;
  }
  function getDate(dateObj: any): Date {
    return new Date(dateObj);
  }
  function customActionClicked(col: any, data: any) {
    actionClick({
      name: col.name,
      data,
    });
  }
  function getselectedRecord() {
    var selectedval = 0;
    var filterSelected = usersTableData?.filter((x) => x.is_selected === true);
    selectedval = filterSelected?.length!;
    setselectedRecord(selectedval);
  }
  function handleBulkChecked() {
    bulkAction_isChecked.current = !bulkAction_isChecked.current;
    if (bulkAction_isChecked.current) {
      let innUdata = [...usersTableData!];
      innUdata = innUdata?.map((d) => {
        d.is_selected = true;
        return d;
      });
      setusersTableData(innUdata);
    } else {
      let innUdata = [...usersTableData!];
      innUdata = innUdata?.map((d) => {
        d.is_selected = false;
        return d;
      });
      setusersTableData(innUdata);
    }
    bulkAction_isChecked.current =
      bulkAction_isChecked.current !== true ? false : true;

    const data = bulkAction_isChecked.current;
    getselectedRecord();
    actionBulkChecked({
      name: "bulkChecked",
      data,
    });
  }
  function customActionChecked(colIndex: any, data: any) {
    let innUdata = [...usersTableData!];
    innUdata[colIndex]["is_selected"] = !innUdata[colIndex]["is_selected"];
    setusersTableData(innUdata);
    const serchPos = innUdata?.findIndex((u) => u.is_selected === true);
    bulkAction_isChecked.current = serchPos === -1 ? false : true;
    let neSelectedRecord = innUdata.filter((u) => u.is_selected === true);
    setselectedRecord(neSelectedRecord.length);
    actionChecked({
      name: colIndex,
      data,
    });
  }
  function onSort({ column, direction }: SortEvent) {
    // sorting
    if (direction === "" || column === "") {
      settableData(usersTableData);
    } else {
      settableData(
        [...usersTableData!].sort((a: any, b: any) => {
          const res = compare(a[column], b[column]);
          return direction === "asc" ? res : -res;
        })
      );
    }
  }

  function bulkSelectedItems(items: TableAction) {
    const data = {
      checkedItems: selectedRecord,
      items: items,
    };
    bulkactionClicked(data);
  }

  function pageSizeChange() {
    if (
      newPageSize === 0 ||
      newPageSize === null ||
      newPageSize === undefined
    ) {
    } else {
      if (newPageSize > totalItems) setnewPageSize(totalItems);
      setcurrentPage(0);
      pageChange(currentPage! + 1);
      setfilter({
        ...filter,
        ...{ pageNumber: currentPage! + 1, pageSize: newPageSize },
      });
      filterChange(filter);
      setpageSize(newPageSize);
    }
  }
  function reducePagesize() {
    setcurrentPage(currentPage! - 1);
    pageChange(currentPage! + 1);
    setfilter({
      ...filter,
      ...{ pageNumber: currentPage! + 1, pageSize: newPageSize },
    });
    filterChange(filter);
  }
  function pageClicked() {
    setcurrentPage(currentPage! + 1);
    pageChange(currentPage! + 1);
    setfilter({
      ...filter,
      ...{ pageNumber: currentPage! + 1, pageSize: newPageSize },
    });
    filterChange(filter);
  }
  function handleSortChange(event: any) {
    let innUserData = [...usersTableData!];
    innUserData = innUserData?.sort((a: any, b: any) => {
      const res = compare(a[event.data.name], b[event.data.name]);
      return event.direction === "Asc" ? res : -res;
    });
    console.log(innUserData);
    setusersTableData(innUserData);
  }
  function handleSearch(event: any) {
    if (event && (event !== "" || event === null)) {
      setusersTableData(tableData!);
      let truchk = false;
      setusersTableData(
        usersTableData?.filter((uf) => {
          tableColum.some((sval) => {
            if (uf[sval.name]) {
              if (
                uf[sval.name]
                  .toString()
                  .toLowerCase()
                  .indexOf(event.toString().toLowerCase()) > -1
              ) {
                truchk = true;
                return true;
              } else {
                truchk = false;
              }
            }
            return false;
          });
          return truchk;
        })
      );
    } else {
      setusersTableData(tableData!);
    }
  }
  function handleExportAs(event: any) {
    var tData = [];
    if (selectedRecord! > 0) {
      tData = usersTableData?.filter((x) => x.is_selected === true)!;
    } else {
      tData = usersTableData!;
    }
    if (event === "Excel" || event === "Csv") {
      var excelArray: any[] = [];
      tData.forEach((dval) => {
        var tempnewObj: any = {};
        tableColum.forEach((hval) => {
          var title = hval.title.toUpperCase();
          var val = dval[hval.name];
          if (hval.type === ColumnTypes.Date) {
            val = moment(val).format("MMM dd, yyyy h:mm a");
          }
          if (hval.type === ColumnTypes.oDate) {
            val = moment(val).format();
          }
          if (hval.type === ColumnTypes.Time) {
            val = moment(val).format("h:mm a");
          }
          if (hval.type === ColumnTypes.Text && (val !== null || val !== "")) {
            val = getCleanText(val);
          }
          if (
            (hval.type === ColumnTypes.Status ||
              hval.type === ColumnTypes.CustomStatus) &&
            hval.statusEnum &&
            hval.statusEnum.length > 0
          ) {
            const dedupChk = hval.statusEnum.find((x) => x.key === val);
            if (dedupChk) {
              val = dedupChk.value;
            }
          }
          tempnewObj[title] = val;
        });
        excelArray.push(tempnewObj);
      });
      exportAsExcelFile(excelArray, InputFileName);
    }
    if (event === "pdf" || event === "Print") {
      var theader: any[] = [];
      var tbody: any[] = [];

      tData.forEach((dval, dindex) => {
        var hobj: any[] = [];
        var tobj: any[] = [];
        tableColum.forEach((hval) => {
          hobj.push(hval.title.toUpperCase());
          if (hval.type === ColumnTypes.Date) {
            dval[hval.name] = moment(dval[hval.name]).format(
              "MMM dd, yyyy h:mm a"
            );
          }
          if (hval.type === ColumnTypes.oDate) {
            dval[hval.name] = moment(dval[hval.name]).format();
          }
          if (hval.type === ColumnTypes.Time) {
            dval[hval.name] = moment(dval[hval.name]).format("h:mm a");
          }
          if (hval.type === ColumnTypes.Text && dval[hval.name]) {
            dval[hval.name] = getCleanText(dval[hval.name]);
          }
          if (
            (hval.type === ColumnTypes.Status ||
              hval.type === ColumnTypes.CustomStatus) &&
            hval.statusEnum &&
            hval.statusEnum.length > 0
          ) {
            const dedupChk = hval.statusEnum.find(
              (x) => x.key === dval[hval.name]
            );
            if (dedupChk) {
              dval[hval.name] = dedupChk.value;
            }
          }
          tobj.push(dval[hval.name]);
        });
        theader.push(hobj);
        tbody.push(tobj);
      });
      if (event === "pdf") downloadAsPDF(theader, tbody, InputFileName);
      if (event === "Print") printAsPDF(theader, tbody, InputFileName);
    }
  }
  const filterUpdated = (filter: any) => {
    setcurrentPage(0);
    setfilter({ ...filter, ...{ page: currentPage! + 1 } });
    filterChange(filter);
  };

  const onFilterByDate = (event: any) => {
    const startDate = event.startDate;
    const endDate = event.endDate;
    setfilter({ startDate: startDate, endDate: endDate });
    dateRangeChanged(filter);
  };

  const toggleColumns = () => {
    toggleColumnsEvent();
  };

  const triggerCustomToggle = () => {
    toggleCustomFilter();
  };

  const onSortOptionClick = (sortOption: string) => {
    sortOptionSelected(sortOption);
  };
  return (
    <>
      <div className={`space-y-3 m-8 p-5 shadow-md rounded-md border ${mode?.mode! === "dark" ? "bg-lightDark" : ""}`}>
        {showFilter && selectedRecord! <= 0 && (
          <TableheaderComponent
            filterFields={filterFields}
            filterDataChange={(e) => filterUpdated(e)}
            downloadasChange={(e) => handleExportAs(e)}
            searchChange={(e) => handleSearch(e)}
            showDateRange={showDateRange}
            showfilterButton={showfilterButton}
            showTableFilter={showTableFilter}
            customFilter={customFilter}
            tableHeader={tableColum}
            showOtherFilter={showOtherFilter}
            showSortBtn={showSortBtn}
            tableTitle={InputFileName}
            showCustomSortBtn={showCustomSortBtn}
            customSortOptions={customSortOptions}
            sortOptionSelected={(e: any) => onSortOptionClick(e)}
            bulkDeactivate={bulkDeactivate}
            bulkDuplicate={bulkDuplicate}
            sortChange={(e) => handleSortChange(e)}
            dateRangeChanged={(e) => onFilterByDate(e)}
            toggleColumnsEvent={() => toggleColumns()}
            toggleCustomFilter={() => triggerCustomToggle()}
            tableColumn={tableColum}
          />
        )}
        {selectedRecord! > 0 && showBulkAction && (
          <div className="pt-5">
            <div className="flex flex-row space-x-5 items-center">
              {Bulkactions.map((mtext) => (
                <div onClick={() => bulkSelectedItems(mtext)}>
                  <div className="border-[0.5px] border-[#CED4DA] text-sm  py-2.5 px-3 rounded-md place-self-center flex cursor-pointer flex-row items-center">
                    {mtext.icon && (
                      <i className="fa fa-{{ mtext.icon }} ml-2 text-primary"></i>
                    )}

                    <span className="ml-2">{mtext.label}</span>
                  </div>
                </div>
              ))}

              <div>
                <button
                  onClick={() => setshowExportModal(!showExportModal)}
                  className="flex space-x-1 border-[0.5px] border-[#CED4DA] text-sm py-2.5 px-3 rounded-md place-self-center mr-2"
                  data-modal-id="modal1"
                >
                  <p className="text-sm hover:cursor-pointer">Export as</p>
                </button>
              </div>
              <div className="flex space-x-3 items-center">
                <span
                  onClick={() => handleExportAs("Print")}
                  className="flex space-x-1 place-self-center cursor-pointer"
                >
                  <i className="fa fa-print text-primary"></i>
                  <p className="text-sm">Print</p>
                </span>
              </div>
              <div></div>
            </div>
          </div>
        )}
        <div className="relative overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b boder-gray-300 text-[#7E8299] font-bold">
                {showCheckBox && (
                  <th className="py-3 px-3">
                    <div className="items-center flex ">
                      {bulkAction_isChecked.current &&
                        selectedRecord === usersTableData!.length && (
                          <input
                            onChange={() => handleBulkChecked()}
                            checked={bulkAction_isChecked.current}
                            type="checkbox"
                            className="items-center border border-gray-500 w-3 h-3 p-2 rounded-sm checked:bg-primary appearance-none text-primary focus:bg-primary active:bg-primary"
                          />
                        )}
                      {!bulkAction_isChecked.current && (
                        <input
                          onChange={() => handleBulkChecked()}
                          checked={bulkAction_isChecked.current}
                          type="checkbox"
                          className="items-center border border-gray-500 w-3 h-3 p-2 rounded-sm checked:bg-primary
                         appearance-none text-primary focus:bg-primary active:bg-primary"
                        />
                      )}
                      {bulkAction_isChecked.current &&
                        selectedRecord !== usersTableData!.length &&
                        selectedRecord! > 0 && (
                          <i
                            className="fa fa-minus-square text-lg text-primary"
                            onClick={() => handleBulkChecked()}
                          ></i>
                        )}
                    </div>
                  </th>
                )}
                {showSerialNumb && (
                  <th
                    className="p-2 text-sm font-medium uppercase text-left"
                    scope="col"
                  >
                    S/N
                  </th>
                )}
                {tableColum.map((col) => (
                  <th
                    className="p-2 text-sm font-medium uppercase text-left"
                    scope="col"
                  >
                    {col.title}
                  </th>
                ))}
                {showActions && (
                  <th className="pt-2 pb-2 pl-2 pr-2 text-sm font-medium uppercase text-center">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            {!loading && (
              <tbody className="divide-y divide-gray-200 font-normal">
                {usersTableData?.map((data: any, i) => (
                  <tr className={`${mode.mode === "dark" ? "text-[#7E8299]" : "text-[#181C32]"} font-bold`}>
                    {showCheckBox && (
                      <td className="py-3 px-3">
                        <div className="items-center flex">
                          <Checkbox
                            onChange={() => customActionChecked(i, data)}
                            checked={data["is_selected"]}
                          />
                        </div>
                      </td>
                    )}
                    {showSerialNumb && (
                      <td className="py-3 px-3 text-sm text-left">{i + 1}</td>
                    )}
                    {tableColum.map((col) => (
                      <td className="py-3 px-3 text-sm text-left">
                        <div className="items-center flex">
                          {col.type === COLUMN_TYPES.UserAvatar && (
                            <span>
                              <div className="h-10 w-8 overflow-hidden">
                                <img
                                  src={data[col.name] || errorAvatar}
                                  className="w-full"
                                  alt={col.name}
                                />
                              </div>
                            </span>
                          )}
                          {(col.type === COLUMN_TYPES.Text ||
                            col.type === undefined) &&
                            data[col.name]?.toString().length > 25 && (
                              <Tooltip
                                className="shadow-md"
                                content={getCleanText(data[col.name])}
                              >
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: data[col.name]?.toString(),
                                  }}
                                  className="textoverflowwrapper"
                                />
                              </Tooltip>
                            )}
                          {(col.type === COLUMN_TYPES.Text ||
                            col.type === undefined) &&
                            data[col.name]?.toString().length <= 25 && (
                              <div className="textoverflowwrapper">
                                {data[col.name]?.toString()}
                              </div>
                            )}
                          {col.type === COLUMN_TYPES.Number && (
                            <span className="flex w-full justify-start">
                              {data[col.name]}
                            </span>
                          )}
                          {col.type === COLUMN_TYPES.digit && (
                            <span style={{ textAlign: "left" }}>
                              {data[col.name]}
                            </span>
                          )}
                          {col.type === COLUMN_TYPES.Status && (
                            <TableStatus data={data} />
                          )}
                          {col.type === COLUMN_TYPES.CustomStatus && (
                            <NamedStatusComponent data={data} name={col.name} />
                          )}
                          {col.type === COLUMN_TYPES.oDate && (
                            <span>
                              {" "}
                              {moment(data[col.name]).format(
                                "MMM ddd, yyyy"
                              )}{" "}
                            </span>
                          )}
                          {col.type === COLUMN_TYPES.Date && (
                            <span>
                              {" "}
                              {moment(data[col.name]).format(
                                "MMM ddd, yyyy h:mm a"
                              )}{" "}
                            </span>
                          )}
                          {col.type === COLUMN_TYPES.Time && (
                            <span>
                              {" "}
                              {moment(data[col.name]).format("h:mm a")}{" "}
                            </span>
                          )}
                          {col.type === COLUMN_TYPES.Bool && (
                            <span> {data[col.name] ? "True" : "False"} </span>
                          )}
                          {col.type === COLUMN_TYPES.Link && (
                            <span>
                              <button
                                onClick={() => customActionClicked(col, data)}
                                className="text-primary text-[12px] flex items-center justify-center underline"
                              >
                                {!col.isValueDependent && (
                                  <span>{col.link_name}</span>
                                )}
                                {col.isValueDependent && (
                                  <span>{getTableValue(col, data)}</span>
                                )}
                              </button>
                            </span>
                          )}
                        </div>
                      </td>
                    ))}

                    {showActions && (
                      <td className="py-3 px-3">
                        <div className="items-center flex justify-center ">
                          <DropdownComponent
                            showHorizontal={false}
                            actions={actions}
                            data={data}
                            itemSelected={(e) => customActionClicked(e, data)}
                          />
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {loading && (
            <div className="w-full flex items-center justify-center">
              <div className="w-full flex items-center justify-center">
                <span className="flex flex-row ">
                  <svg
                    className="animate-spin w-5 text-primary "
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  &nbsp;Loading...
                </span>
              </div>
            </div>
          )}
        </div>
        {!table2 && showPagination && (
          <div className="pagination flex justify-between">
            <div>
              <div className="flex flex-row space-x-2">
                <span className="flex items-center">
                  <span>Rows per page</span>
                </span>
                <input
                  value={newPageSize}
                  onKeyUp={(e: any) => setnewPageSize(e.target.value)}
                  onChange={() => pageSizeChange()}
                  type="number"
                  min={1}
                  max={totalItems}
                  className="form-control rounded"
                  name="newPageSize"
                />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                style={{
                  paddingRight: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {currentPage! * pageSize + 1} -
                {pageSize * (currentPage! + 1) < totalItems
                  ? pageSize * (currentPage! + 1)
                  : totalItems}{" "}
                of
                {totalItems}
              </div>
              <div
                style={{
                  paddingRight: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
                className="page_btn"
              >
                <button
                  disabled={currentPage! < 1}
                  onClick={() => reducePagesize()}
                  style={{
                    background: "none !important",
                    border: "none !important",
                  }}
                >
                  <i className="fa fa-angle-left fa-2x"></i>
                </button>
              </div>
              <div
                style={{
                  paddingRight: "5px",
                  display: "flex",
                  alignItems: "center",
                }}
                className="page_btn"
              >
                <button
                  disabled={currentPage! + 1 >= totalNoOfPages!}
                  onClick={() => pageClicked()}
                  style={{
                    background: "none !important",
                    border: "none !important",
                  }}
                >
                  <i className="fa fa-angle-right fa-2x"></i>
                </button>
              </div>
            </div>
          </div>
        )}
        <Modal show={showExportModal} position="center">
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
                      onChange={(e: any) => setselectedRecord(e.target.value)}
                      className="items-center w-3 h-3 p-2 rounded-full checked:bg-primary appearance-none text-primary focus:bg-primary active:bg-primary"
                    />
                    <div className="flex items-center space-x-2 ">
                      <img src="../../assets/images/admin/pdf.svg" alt="pdf" />
                      <p
                        className="font-semibold
                                     text-sm"
                      >
                        PDF
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <input
                      type="radio"
                      name="flexRadioDefault"
                      value="Excel"
                      onChange={(e: any) => setselectedRecord(e.target.value)}
                      className="items-center w-3 h-3 p-2 rounded-full checked:bg-primary appearance-none  active:bg-primary "
                    />
                    <div className="flex items-center space-x-2 ">
                      <img
                        src="../../assets/images/admin/Excel.svg"
                        alt="excel"
                      />
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
                      onChange={(e: any) => setselectedRecord(e.target.value)}
                      className="items-center w-3 h-3 p-2 rounded-full checked:bg-primary appearance-none text-primary focus:bg-primary active:bg-primary"
                    />
                    <div className="flex items-center space-x-2 ">
                      <img src="../../assets/images/admin/CSV.svg" alt="csv" />
                      <p
                        className="font-semibold
                                     text-sm"
                      >
                        CSV
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <span
                    onClick={() => handleExportAs(selectedexport)}
                    className="border border-solid flex-1 hover:border-dotted bg-primary text-white border-purple-900 rounded flex items-center justify-center px-2 w-3/5 py-2 cursor-pointer"
                  >
                    Export
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
