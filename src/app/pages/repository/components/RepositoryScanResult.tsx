import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import modeAtomsAtom from "../../../atoms/modeAtoms.atom";
import {
  useGetAllScanResults,
  useScanPolicy,
  useRunRepoScan,
} from "../../../api/api-services/policyQuery";
import domtoimage from "dom-to-image";
import { jsPDF, jsPDFOptions } from "jspdf";
import { FaChevronLeft, FaGlobe } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { ColumnTypes } from "../../../components/models";
import FilterModal from "../../../components/FilterModal";
import { PolicyPolicyListCreateList200Response } from "../../../api/axios-client";
import DefaultContent from "../../../components/defaultContent/defaultContent";
import ScanAccordion from "../../security-monitoring/components/modals/ScanAccordion";
import ScanPolicyModal from "../../security-monitoring/components/modals/ScanModal";
import ResultCard from "./ResultCard";

const RepositoryScanResult = () => {
  const { mode } = useRecoilValue(modeAtomsAtom);
  const [showPopOver, setShowPopOver] = useState(false);
  const [activeBtn, setActiveBtn] = useState("Daily");
  const printableArea = useRef<HTMLDivElement>(null);
  const [showScan, setShowScan] = useState(false);
  const [errorMess, setErrorMess] = useState<any>(null);
  const [errType, setErrType] = useState<any>(null);
  const [scanresult, setScanResult] = useState<any>(null);
  const [checks, setAllChecks] = useState<any[]>([]);
  const [time, setTime] = useState("");
  const [width, setWidth] = useState(0);
  const [pageCount, setPageCount] = useState(5);
  const [offset, setOffset] = useState(0);
  const [tab, setTab] = useState("View by Resource");
  const { id } = useParams();
  const navigate = useNavigate();
  const filter = useRef<any>({
    page: 1,
    pageSize: 10,
    severity: undefined,
    policyRunId: id!,
  });

  const filterFields = [
    {
      name: "severity",
      title: "Severity",
      type: ColumnTypes.List,
      listValue: [
        { id: "High", name: "High" },
        { id: "Medium", name: "Medium" },
        { id: "Low", name: "Low" },
      ],
      listIdField: "id",
      listTextField: "name",
    },
  ];

  const {
    data: scanResult,
    isLoading,
    refetch,
  } = useGetAllScanResults({ ...filter.current });
  const { mutate, isLoading: scanLoading } = useRunRepoScan();

  const scanstsr: PolicyPolicyListCreateList200Response | any = scanResult;
  useEffect(() => {
    setScanResult(scanstsr?.data?.data?.results[0]);
    if (scanstsr?.data?.data?.results[0]) {
      setAllChecks(scanstsr?.data?.data?.results[0]?.result_json?.checks ?? []);
      setWidth(() =>
        Math.floor(
          scanstsr?.data?.data?.results[0]?.result_json?.Compliance ?? 0
        )
      );
      const sliptedTime = scanstsr?.data?.data?.results[0].stop_time
        .split("T")[1]
        .slice(0, 5);
      setTime(sliptedTime);
      // const
    }
  }, [scanResult]);

  const downloadform = () => {
    const width = printableArea.current?.clientWidth!;
    const height = printableArea.current?.clientHeight! + 40;
    let orientation: any = "";
    let imageUnit: any = "pt";
    if (width > height) {
      orientation = "l";
    } else {
      orientation = "p";
    }
    domtoimage
      .toPng(printableArea.current!, {
        width: width,
        height: height,
      })
      .then((result) => {
        let jsPdfOptions: jsPDFOptions = {
          orientation: orientation,
          unit: imageUnit,
          format: [width + 50, height + 220],
        };
        const pdf = new jsPDF(jsPdfOptions);
        pdf.setFontSize(12);
        // pdf.text(moment(new Date()).format('MMMM dddd, yyyy h:mm a'),1100, 20);
        //  pdf.addImage(user?.company?.companyProfileImageUrl, 'PNG', 45, 30, 100, 30);
        pdf.addImage(result, "PNG", 0, 80, width, height);
        pdf.save(`scan result`);
      })
      .catch((error) => {});
  };

  function refreshrecord() {
    filter.current = {
      page: 1,
      pageSize: 10,
      severity: undefined,
      policyRunId: id!,
    };
    refetch();
  }

  function filterUpdated(data: any) {
    filter.current = {
      page: data?.page ?? 1,
      pageSize: data?.pageSize ?? 10,
      severity: data?.severity,
      policyRunId: id!,
    };
    refetch();
  }

  return (
    <div className="">
      {isLoading ? (
        <DefaultContent
          pageHeader="Scan Result"
          pageDescription="No record found"
          loading={isLoading || scanLoading}
          buttonValue="Refresh"
          buttonClick={() => refreshrecord()}
        />
      ) : (
        <div className="mt-10 md:w-[95%] mx-auto p-4">
          <div className="w-full" ref={printableArea}>
            <div className="flex items-center justify-between flex-cols md:flex-row gap-10">
              <div className="flex justify-between items-center w-full md:w-[60%] gap-2">
                <button onClick={() => navigate(-1)}>
                  <FaChevronLeft
                    className="hover:cursor-pointer"
                    color={mode === "dark" ? "#EAEAEA" : "#000000"}
                    size={14}
                  />
                </button>
                <p className="font-semibold text-[14px]">
                  <span className="pr-2">ISO EAC 27001</span> system check
                </p>
                <p
                  className={`text-[12px] font-medium ${
                    mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
                  }`}
                >
                  {scanresult && `${scanresult.stop_time.split("T")[0]}`}
                </p>
                <button className="flex font-medium items-center gap-3 hover:cursor-pointer">
                  <p className="underline text-[12px]">JSON</p>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.9375 15C3.9375 14.6893 4.18934 14.4375 4.5 14.4375L13.5 14.4375C13.8107 14.4375 14.0625 14.6893 14.0625 15C14.0625 15.3107 13.8107 15.5625 13.5 15.5625L4.5 15.5625C4.18934 15.5625 3.9375 15.3107 3.9375 15Z"
                      fill={mode === "dark" ? "#EAEAEA" : "#000000"}
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8.60225 12.3977C8.82192 12.6174 9.17808 12.6174 9.39775 12.3977L12.0227 9.77275C12.2424 9.55308 12.2424 9.19692 12.0227 8.97725C11.8031 8.75758 11.4469 8.75758 11.2273 8.97725L9.5625 10.642V3C9.5625 2.68934 9.31066 2.4375 9 2.4375C8.68934 2.4375 8.4375 2.68934 8.4375 3V10.642L6.77275 8.97725C6.55308 8.75758 6.19692 8.75758 5.97725 8.97725C5.75758 9.19692 5.75758 9.55308 5.97725 9.77275L8.60225 12.3977Z"
                      fill={mode === "dark" ? "#EAEAEA" : "#000000"}
                    />
                  </svg>
                </button>
              </div>

              <button
                disabled={!scanresult?.policy_run?.policy?.id}
                onClick={() => {
                  mutate(
                    {
                      data: {
                        policy_id: scanresult?.policy_run?.policy?.id,
                        repo_id: scanresult?.repo?.id,
                      },
                    },
                    {
                      onError: (err: any) => {
                        setShowScan(true);
                        setErrorMess(err);
                        setErrType("danger");
                      },
                      onSuccess: (res: any) => {
                        setShowScan(true);
                        setErrorMess(res);
                        setErrType("success");
                        refetch();
                      },
                    }
                  );
                }}
                className="w-32 bg-[#284CB3] py-2 px-3 rounded-full flex items-center gap-2 justify-center"
              >
                <span className="text-white font-medium">Rescan</span>
                <svg
                  width="20px"
                  height="20px"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  color="#FFFFFF"
                >
                  <path
                    d="M13.5 13L15 14.5"
                    stroke="#FFFFFF"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M9 11C9 12.3807 10.1193 13.5 11.5 13.5C12.1916 13.5 12.8175 13.2192 13.2701 12.7654C13.7211 12.3132 14 11.6892 14 11C14 9.61929 12.8807 8.5 11.5 8.5C10.1193 8.5 9 9.61929 9 11Z"
                    stroke="#FFFFFF"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M5 18L3.13036 4.91253C3.05646 4.39524 3.39389 3.91247 3.90398 3.79912L11.5661 2.09641C11.8519 2.03291 12.1481 2.03291 12.4339 2.09641L20.096 3.79912C20.6061 3.91247 20.9435 4.39524 20.8696 4.91252L19 18C18.9293 18.495 18.5 21.5 12 21.5C5.5 21.5 5.07071 18.495 5 18Z"
                    stroke="#FFFFFF"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </button>
            </div>
            <h3 className="font-semibold text-[18px] my-8 pl-3 text-left">
              Gilotec cloudname
            </h3>
            <div className="mt-16 grid md:grid-cols-4 gap-6 mb-8">
              <div className="flex items-center flex-col justify-center gap-2 border-end">
                <h3 className="font-semibold text-[24px] md:text-[32px] mt-12">
                  {Math.floor(scanresult?.result_json?.Compliance ?? 0)}%
                </h3>
                <p className="font-medium text-[12px] md:text-[14px]">
                  Compliant
                </p>
                <div
                  className={`rounded-full h-[16px] w-[200px] bg-gradient-to-r from-[#00B712] ${
                    width > 0 ? `from-[${width}%]` : "from-[0%]"
                  } to-[#DADADA] via-[#DADADA] via-[10%] t0-[20%]`}
                ></div>
              </div>
              <div className="border-end pt-10 pr-4">
                <h3 className="font-medium text-[14px] mb-3 text-left">
                  <span className="font-bold text-[18px] pr-2">
                    {scanresult?.result_json?.Total_checks ?? 0}
                  </span>
                  checks performed
                </h3>
                <div className="flex items-center mt-12 justify-between md:w-[80%]">
                  <div className="">
                    <h3 className="font-medium text-[12px] mb-3 text-left">
                      Failed checks
                    </h3>
                    <h3 className="font-extrabold text-[14px] text-[#FF161A]">
                      {scanresult?.result_json?.Failed ?? 0}
                    </h3>
                  </div>
                  <div className="">
                    <h3 className="font-medium text-[12px] mb-3 text-left">
                      Successful
                    </h3>
                    <h3 className="font-extrabold text-[14px] text-[#00B712]">
                      {scanresult?.result_json?.Passed ?? 0}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-16 flex items-center justify-between gap-10 border-bottom pb-8">
              <div className="">
                {["Group by Rule", "View by Resource"].map((d) => (
                  <button
                    key={d}
                    className={`uppercase p-4 ${
                      d === tab
                        ? "font-bold text-[14px] border-bottom-3 border-primary"
                        : `font-medium text-[14px] ${
                            mode === "dark"
                              ? "text-[#909BBC]"
                              : "text-[#6A6A6A]"
                          }`
                    }`}
                    onClick={() => setTab(d)}
                  >
                    {d}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowPopOver(!showPopOver)}
                  className="flex items-center gap-3 font-medium"
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
                <button
                  onClick={downloadform}
                  className="flex items-center gap-3"
                >
                  <p className="underline font-medium">Export PDF</p>
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
                      d="M3.5625 2.5625V16.4375H10.5C10.8107 16.4375 11.0625 16.6893 11.0625 17C11.0625 17.3107 10.8107 17.5625 10.5 17.5625H3.45C2.89081 17.5625 2.4375 17.1092 2.4375 16.55V2.45C2.4375 1.89081 2.89081 1.4375 3.45 1.4375H12.1886C12.4571 1.4375 12.7147 1.54417 12.9045 1.73405L15.2659 4.09545C15.4558 4.28533 15.5625 4.54286 15.5625 4.8114V10.25C15.5625 10.5607 15.3107 10.8125 15 10.8125C14.6893 10.8125 14.4375 10.5607 14.4375 10.25V4.858L12.142 2.5625H3.5625Z"
                      fill={mode === "dark" ? "#EAEAEA" : "black"}
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 1.4375C12.3107 1.4375 12.5625 1.68934 12.5625 2V4.4375H15C15.3107 4.4375 15.5625 4.68934 15.5625 5C15.5625 5.31066 15.3107 5.5625 15 5.5625H12.45C11.8908 5.5625 11.4375 5.10919 11.4375 4.55V2C11.4375 1.68934 11.6893 1.4375 12 1.4375Z"
                      fill={mode === "dark" ? "#EAEAEA" : "black"}
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.8523 17.3977C14.0719 17.6174 14.4281 17.6174 14.6477 17.3977L16.8977 15.1477C17.1174 14.9281 17.1174 14.5719 16.8977 14.3523L14.6477 12.1023C14.4281 11.8826 14.0719 11.8826 13.8523 12.1023C13.6326 12.3219 13.6326 12.6781 13.8523 12.8977L15.142 14.1875H12C11.6893 14.1875 11.4375 14.4393 11.4375 14.75C11.4375 15.0607 11.6893 15.3125 12 15.3125H15.142L13.8523 16.6023C13.6326 16.8219 13.6326 17.1781 13.8523 17.3977Z"
                      fill={mode === "dark" ? "#EAEAEA" : "black"}
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`grid font-medium grid-cols-5 p-4 rounded-md mb-3 shadow-sm w-full ${
                mode === "dark" ? "bg-lightDark" : "bg-white"
              }`}
            >
              <div className="flex items-center col-span-2 gap-6">
                <svg
                  width="18px"
                  height="18px"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  color={mode === "dark" ? "#EAEAEA" : "#000000"}
                >
                  <path
                    d="M8 9C8 9 9 8 12 8C15 8 16 9 16 9"
                    stroke={mode === "dark" ? "#EAEAEA" : "#000000"}
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M12 14C12.5523 14 13 13.5523 13 13C13 12.4477 12.5523 12 12 12C11.4477 12 11 12.4477 11 13C11 13.5523 11.4477 14 12 14Z"
                    fill={mode === "dark" ? "#EAEAEA" : "#000000"}
                    stroke={mode === "dark" ? "#EAEAEA" : "#000000"}
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M5 18L3.13036 4.91253C3.05646 4.39524 3.39389 3.91247 3.90398 3.79912L11.5661 2.09641C11.8519 2.03291 12.1481 2.03291 12.4339 2.09641L20.096 3.79912C20.6061 3.91247 20.9435 4.39524 20.8696 4.91252L19 18C18.9293 18.495 18.5 21.5 12 21.5C5.5 21.5 5.07071 18.495 5 18Z"
                    stroke={mode === "dark" ? "#EAEAEA" : "#000000"}
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
                <button className="flex items-center justify-center gap-2 font-semibold">
                  <span>Resource</span>{" "}
                  <svg
                    width="10"
                    height="5"
                    viewBox="0 0 10 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.5 0.75L5 4.25L8.5 0.75"
                      stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <p className="font-semibold text-[14px] col-span-2">
                Compliant Rule
              </p>
              <p className="font-semibold">Status</p>
              <p className=""></p>
            </div>
            {checks.length < 1 ? (
              <DefaultContent
                pageHeader="All Checks"
                pageDescription="No record found"
                loading={isLoading}
                buttonValue=""
                buttonClick={() => {}}
              />
            ) : (
              <>
                <div className="w-[200%] md:w-full overflow-x-auto">
                  {checks
                    .slice(offset, offset + pageCount)
                    .map((d: any, idx: number) => (
                      <ResultCard data={d} key={d?.id} />
                    ))}
                </div>
                <div className="mt-10 flex items-center justify-between">
                  <div className="flex items-center gap-3 font-medium">
                    <p>Num on row:</p>
                    <select
                      name=""
                      id=""
                      className="p-2"
                      value={pageCount}
                      onChange={(e) => setPageCount(+e.target.value)}
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      disabled={offset === 0}
                      onClick={() => {
                        if (offset <= 0) {
                          setOffset(0);
                        } else {
                          setOffset((offset) => offset - pageCount);
                        }
                      }}
                      className="bg-primary font-medium w-24 rounded-md p-2 text-white"
                    >
                      previous
                    </button>
                    <button
                      disabled={pageCount >= checks.length}
                      onClick={() => setOffset((offset) => offset + pageCount)}
                      className="bg-primary font-medium w-24 rounded-md p-2 text-white"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {showScan && (
        <ScanPolicyModal
          isOpen={showScan}
          err={errorMess}
          errType={errType}
          handleHide={() => {
            setShowScan(false);
          }}
        />
      )}

      <FilterModal
        filterDataChange={(e) => filterUpdated(e)}
        headfilterFields={filterFields}
        setshowFilter={(e) => setShowPopOver(e)}
        showFilter={showPopOver}
      />
    </div>
  );
};

export default RepositoryScanResult;
