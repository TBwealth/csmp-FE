import { useRef, useState, useEffect } from "react";
import axios from "axios";
import regulatory from "../../../../public/media/logos/regulatory.svg";
import aws from "../../../../public/media/logos/aws-logo.svg";
import { useRecoilValue } from "recoil";
import modeAtomsAtom from "../../atoms/modeAtoms.atom";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import DefaultContent from "../../components/defaultContent/defaultContent";
import FilterModal from "../../components/FilterModal";
import useAlert from "../components/useAlert";
import {
  ColumnTypes,
  TableColumn,
} from "../../components/tableComponents/models";
import {
  FaCheckDouble,
  FaCheckSquare,
  FaCloud,
  FaComment,
} from "react-icons/fa";
import {
  useRuleCreate,
  useGetScanStat,
} from "../../api/api-services/policyQuery";
import { IoIosWarning } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { PolicyPolicyRunScanStatsList200Response } from "../../api/axios-client";

const CloudCard = ({ data, mode }: any) => {
  return (
    <div
      className={`grid grid-cols-8 gap-[8px] place-content-center p-4 mb-3 border-bottom h-[52px] w-[280vw] md:w-[180vw] lg:w-full ${
        mode === "dark" ? "bg-lightDark" : "bg-white"
      }`}
    >
      <p className="flex items-center  font-semibold text-[12px] col-span-2">
        {`${data?.name.slice(0, 80)}`}
      </p>
      <div className="flex text-[12px] items-center justify-center gap-2 font-semibold">
        <img src={aws} alt="amazon web service logo" className="max-w-sm h-8" />
        <span>{data?.cloud_provider}</span>
      </div>
      <p className="flex items-center justify-center text-[12px] font-semibold">
        {data?.severity}
      </p>
      <p className="flex items-center justify-center text-[12px] font-semibold">
        {data?.service}
      </p>
      <p className="flex items-center justify-center text-[12px] font-semibold">
        {data?.rule_type}
      </p>
      <div className="font-semibold flex items-center justify-between text-[12px] col-span-2">
        <p>{`${data?.description.slice(0, 80)}`}</p>
        <button>
          <svg
            width="45"
            height="52"
            viewBox="0 0 45 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.3333 20.668C20.3333 20.3918 20.1095 20.168 19.8333 20.168H17.1667C16.8905 20.168 16.6667 20.3918 16.6667 20.668V23.3346C16.6667 23.6108 16.8905 23.8346 17.1667 23.8346C17.4428 23.8346 17.6667 23.6108 17.6667 23.3346V21.8751L20.1464 24.3549C20.3417 24.5501 20.6583 24.5501 20.8536 24.3549C21.0488 24.1596 21.0488 23.843 20.8536 23.6477L18.3738 21.168H19.8333C20.1095 21.168 20.3333 20.9441 20.3333 20.668Z"
              fill={mode === "dark" ? "#EAEAEA" : "#373737"}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24.6667 20.668C24.6667 20.3918 24.8905 20.168 25.1667 20.168H27.8333C28.1095 20.168 28.3333 20.3918 28.3333 20.668V23.3346C28.3333 23.6108 28.1095 23.8346 27.8333 23.8346C27.5572 23.8346 27.3333 23.6108 27.3333 23.3346V21.8751L24.8536 24.3549C24.6583 24.5501 24.3417 24.5501 24.1464 24.3549C23.9512 24.1596 23.9512 23.843 24.1464 23.6477L26.6262 21.168H25.1667C24.8905 21.168 24.6667 20.9441 24.6667 20.668Z"
              fill={mode === "dark" ? "#EAEAEA" : "#373737"}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.3333 31.332C20.3333 31.6082 20.1095 31.832 19.8333 31.832H17.1667C16.8905 31.832 16.6667 31.6082 16.6667 31.332V28.6654C16.6667 28.3892 16.8905 28.1654 17.1667 28.1654C17.4428 28.1654 17.6667 28.3892 17.6667 28.6654V30.1249L20.1464 27.6451C20.3417 27.4499 20.6583 27.4499 20.8536 27.6451C21.0488 27.8404 21.0488 28.157 20.8536 28.3523L18.3738 30.832H19.8333C20.1095 30.832 20.3333 31.0559 20.3333 31.332Z"
              fill={mode === "dark" ? "#EAEAEA" : "#373737"}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24.6667 31.332C24.6667 31.6082 24.8905 31.832 25.1667 31.832H27.8333C28.1095 31.832 28.3333 31.6082 28.3333 31.332V28.6654C28.3333 28.3892 28.1095 28.1654 27.8333 28.1654C27.5572 28.1654 27.3333 28.3892 27.3333 28.6654V30.1249L24.8536 27.6451C24.6583 27.4499 24.3417 27.4499 24.1464 27.6451C23.9512 27.8404 23.9512 28.157 24.1464 28.3523L26.6262 30.832H25.1667C24.8905 30.832 24.6667 31.0559 24.6667 31.332Z"
              fill={mode === "dark" ? "#EAEAEA" : "#373737"}
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const RepoCard = ({ data, mode }: any) => {
  return (
    <div
      className={`grid grid-cols-6 gap-[8px] p-4 mb-3 place-content-center border-bottom h-[52px] w-[280vw] md:w-[180vw] lg:w-full ${
        mode === "dark" ? "bg-lightDark" : "bg-white"
      }`}
    >
      <p className="flex items-center  font-semibold text-[12px] col-span-2">
        {`${data?.name.slice(0, 80)}`}
      </p>
      {/* <div className="flex text-[12px] items-center justify-center gap-2 font-semibold">
        <img src={aws} alt="amazon web service logo" />
        <span>{data?.cloud_provider}</span>
      </div> */}
      <p className="flex text-[12px] items-center justify-center font-semibold">
        {data?.severity}
      </p>
      {/* <p className="flex text-[12px] items-center justify-center gap-2 font-semibold">
        {data?.service}
      </p> */}
      <p className="flex text-[12px] items-center justify-center  font-semibold">
        {data?.rule_type}
      </p>
      <div className="font-semibold flex items-center justify-between text-[12px] col-span-2">
        <p>{`${data?.description.slice(0, 80)}`}</p>
        <button>
          <svg
            width="45"
            height="52"
            viewBox="0 0 45 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.3333 20.668C20.3333 20.3918 20.1095 20.168 19.8333 20.168H17.1667C16.8905 20.168 16.6667 20.3918 16.6667 20.668V23.3346C16.6667 23.6108 16.8905 23.8346 17.1667 23.8346C17.4428 23.8346 17.6667 23.6108 17.6667 23.3346V21.8751L20.1464 24.3549C20.3417 24.5501 20.6583 24.5501 20.8536 24.3549C21.0488 24.1596 21.0488 23.843 20.8536 23.6477L18.3738 21.168H19.8333C20.1095 21.168 20.3333 20.9441 20.3333 20.668Z"
              fill={mode === "dark" ? "#EAEAEA" : "#373737"}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24.6667 20.668C24.6667 20.3918 24.8905 20.168 25.1667 20.168H27.8333C28.1095 20.168 28.3333 20.3918 28.3333 20.668V23.3346C28.3333 23.6108 28.1095 23.8346 27.8333 23.8346C27.5572 23.8346 27.3333 23.6108 27.3333 23.3346V21.8751L24.8536 24.3549C24.6583 24.5501 24.3417 24.5501 24.1464 24.3549C23.9512 24.1596 23.9512 23.843 24.1464 23.6477L26.6262 21.168H25.1667C24.8905 21.168 24.6667 20.9441 24.6667 20.668Z"
              fill={mode === "dark" ? "#EAEAEA" : "#373737"}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.3333 31.332C20.3333 31.6082 20.1095 31.832 19.8333 31.832H17.1667C16.8905 31.832 16.6667 31.6082 16.6667 31.332V28.6654C16.6667 28.3892 16.8905 28.1654 17.1667 28.1654C17.4428 28.1654 17.6667 28.3892 17.6667 28.6654V30.1249L20.1464 27.6451C20.3417 27.4499 20.6583 27.4499 20.8536 27.6451C21.0488 27.8404 21.0488 28.157 20.8536 28.3523L18.3738 30.832H19.8333C20.1095 30.832 20.3333 31.0559 20.3333 31.332Z"
              fill={mode === "dark" ? "#EAEAEA" : "#373737"}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24.6667 31.332C24.6667 31.6082 24.8905 31.832 25.1667 31.832H27.8333C28.1095 31.832 28.3333 31.6082 28.3333 31.332V28.6654C28.3333 28.3892 28.1095 28.1654 27.8333 28.1654C27.5572 28.1654 27.3333 28.3892 27.3333 28.6654V30.1249L24.8536 27.6451C24.6583 27.4499 24.3417 27.4499 24.1464 27.6451C23.9512 27.8404 23.9512 28.157 24.1464 28.3523L26.6262 30.832H25.1667C24.8905 30.832 24.6667 31.0559 24.6667 31.332Z"
              fill={mode === "dark" ? "#EAEAEA" : "#373737"}
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const RuleAndBenchmarks = () => {
  const filter = useRef<any>({
    page: 1,
    pageSize: 10,
    name: undefined,
    severity: undefined,
    ruleType: undefined,
    code: undefined,
  });
  const { mode } = useRecoilValue(modeAtomsAtom);
  const [tab, setTab] = useState("Cloud bEnchmarks");
  const [showModal, setShowModal] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [canNext, setCanNext] = useState(false);
  const [canPrev, setCanPrev] = useState(false);
  const [page, setPage] = useState(1);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showEmpty, setshowEmpty] = useState<boolean>(true);
  const [showPopOver, setShowPopOver] = useState(false);
  const [allRules, setAllRules] = useState<any[]>([]);
  const [allRulesOther, setAllRulesOther] = useState<any[]>([]);
  const [allservice, setAllService] = useState<any[]>([]);
  const [showResModal, setShowResModal] = useState(false);
  const [resMessage, setResMessage] = useState("");
  const [errorRule, setErrorRule] = useState("");
  const [rulePayload, setRulePayload] = useState<any>({
    cloud_provider: "",
    description: "",
    name: "",
    rule_type: "",
    service: "",
    severity: "",
  });

  const [stats, setStats] = useState<any>(null);
  const { showAlert, Alert } = useAlert();
  const handleFetchRules = async (
    type: string,
    page: number | undefined,
    page_size: number | undefined
  ) => {
    setIsLoading(true);
    setshowEmpty(true);
    try {
      const url = `https://cspm-api.midrapps.com/policy/api/v1/rules/?rule_type=${type}&page=${
        page ? page : 1
      }&page_size=${page_size ? page_size : 10}`;
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res?.status === 200) {
        setIsLoading(false);
        setshowEmpty(
          res?.data?.data?.results
            ? res?.data?.data?.results.length === 0
            : true
        );
        setCanNext(res?.data?.data?.next ? true : false);
        setCanPrev(res?.data?.data?.previous ? true : false);
        setTotalCount(res?.data?.data?.count);
        setAllRules(res?.data?.data?.results);
        setAllRulesOther(res?.data?.data?.results);
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  //   const { data, isLoading, error, refetch } = useGetRulesList({
  //     ...filter.current,
  //   });
  //   const datastsr: PolicyRulesList200Response | any = data;

  const { data: stat } = useGetScanStat();
  const statstr: PolicyPolicyRunScanStatsList200Response | any = stat;

  const { mutate, isLoading: mutateLoading } = useRuleCreate();

  const filterFields: TableColumn[] = [
    { name: "name", title: "Name", type: ColumnTypes.Text },
    // { name: "service", title: "Service", type: ColumnTypes.Text },
    {
      name: "severity",
      title: "Severity",
      type: ColumnTypes.List,
      listValue: [
        { name: "Critical" },
        { name: "Low" },
        { name: "Medium" },
        { name: "High" },
      ],
      listIdField: "name",
      listTextField: "name",
    },
  ];
  function refreshrecord() {
    filter.current = {
      page: 1,
      pageSize: 10,
      name: undefined,
      severity: undefined,
      ruleType: undefined,
      code: undefined,
    };

    handleFetchRules(
      tab === "Cloud bEnchmarks" ? "Cloud" : "Repository",
      undefined,
      undefined
    );
  }

  function filterUpdated(data: any) {
    filter.current = {
      page: data?.page ?? 1,
      pageSize: data?.pageSize ?? 10,
      name: data?.name,
      severity: data?.severity,
      ruleType: data?.ruleType,
      code: data?.code,
    };

    handleFetchRules(
      tab === "Cloud bEnchmarks" ? "Cloud" : "Repository",
      undefined,
      undefined
    );
  }

  const handleSearch = (val: string) => {
    const keys = ["name", "description", "severity"];
    if (val) {
      const filterd = allRules.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(val.toLowerCase()))
      );

      setAllRules(filterd);
    } else {
      setAllRules(allRulesOther);
    }
  };

  async function getServices(service: string) {
    try {
      const res = await axios.get(
        `https://cspm-api.midrapps.com/cloud_provider/api/v1/resource_types/?cloud_provider=${service}&page=1&page_size=1000`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status === 200) {
        setAllService(res?.data?.data?.results);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = () => {
    mutate(
      {
        name: rulePayload.name,
        description: rulePayload.description,
        service: rulePayload.service,
        rule_type: rulePayload.rule_type,
        cloud_provider: rulePayload.cloud_provider,
        severity: rulePayload.severity,
      },
      {
        onError: (err) => {
          setShowResModal(true);
          if (err instanceof Error) {
            setResMessage(err?.message || "An unknown error occurred");
          }
        },
        onSuccess(res: any) {
          console.log(res);
          setShowResModal(true);
          setResMessage(res?.data?.message || "Benchmark created successfully");
          setRulePayload({
            cloud_provider: "",
            description: "",
            name: "",
            rule_type: "",
            service: "",
            severity: "",
          });
          if (tab === "Cloud bEnchmarks") {
            handleFetchRules("Cloud", undefined, undefined);
          } else {
            handleFetchRules("Repository", undefined, undefined);
          }
        },
      }
    );
  };

  useEffect(() => {
    if (tab === "Cloud bEnchmarks") {
      handleFetchRules("Cloud", undefined, undefined);
    } else {
      handleFetchRules("Repository", undefined, undefined);
    }
  }, []);

  useEffect(() => {
    setStats(statstr?.data?.data.rule);
  }, [statstr]);

  return (
    <div className="mt-[32px] px-8">
      <div
        className={`mb-[32px] w-full p-[16px] gap-[10px] relative flex items-start justify-between md:flex-row flex-col rounded-[12px] border ${
          mode === "dark" ? "bg-lightDark" : "bg-white"
        }`}
      >
        <img src={regulatory} alt="custom regulatory badge" />
        <div className="flex-1">
          <h2 className="font-semibold text-[14px] mb-[8px]">
            Benchmark and rules
          </h2>
          <p className="text-[12px] font-medium">
            Benchmark rules are used by the CSPM and KSPM integrations to
            identify configuration risks in your cloud infrastructure. To learn
            more about this,{" "}
            <Link to="/" className="text-primary">
              click here
            </Link>
          </p>
        </div>
        <button className="absolute top-4 right-6 md:relative">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.15138 4.15135C4.34664 3.95609 4.66323 3.95609 4.85849 4.15135L8.00003 7.29289L11.1416 4.15135C11.3368 3.95609 11.6534 3.95609 11.8487 4.15135C12.0439 4.34661 12.0439 4.6632 11.8487 4.85846L8.70714 8L11.8487 11.1415C12.0439 11.3368 12.0439 11.6534 11.8487 11.8486C11.6534 12.0439 11.3368 12.0439 11.1416 11.8486L8.00003 8.70711L4.85849 11.8486C4.66323 12.0439 4.34664 12.0439 4.15138 11.8486C3.95612 11.6534 3.95612 11.3368 4.15138 11.1415L7.29292 8L4.15138 4.85846C3.95612 4.6632 3.95612 4.34662 4.15138 4.15135Z"
              fill={mode === "dark" ? "#EAEAEA" : "#373737"}
            />
          </svg>
        </button>
      </div>
      <div
        className={`mb-[63px] w-full p-[16px] md:w-[80%] lg:w-[55%] flex gap-[12px] lg:gap-0 md:items-center md:flex-row flex-col rounded-[12px] border ${
          mode === "dark" ? "bg-lightDark" : "bg-white"
        }`}
      >
        <div className="flex items-start md:items-center gap-[12px] border-end md:pr-[10px] lg:pr-[24px]">
          <div className="h-[42px] w-[42px] p-[12px] rounded-full bg-[#284CB31A] flex items-center justify-center">
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
                d="M5.60185 13.1023C5.82152 12.8826 6.17767 12.8826 6.39734 13.1023L8.2496 14.9545L11.6018 11.6023C11.8215 11.3826 12.1777 11.3826 12.3973 11.6023C12.617 11.8219 12.617 12.1781 12.3973 12.3977L8.64734 16.1477C8.42767 16.3674 8.07152 16.3674 7.85185 16.1477L5.60185 13.8977C5.38218 13.6781 5.38218 13.3219 5.60185 13.1023Z"
                fill="#284CB3"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.54484 3.4769C5.07414 4.2614 5.0625 5.22927 5.0625 6C5.0625 6.31066 4.81066 6.5625 4.5 6.5625C3.96501 6.5625 3.15001 6.72762 2.48492 7.20649C1.84851 7.6647 1.3125 8.43333 1.3125 9.75C1.3125 10.6466 1.56117 11.2788 1.90304 11.7295C2.24942 12.1861 2.71814 12.4909 3.20516 12.6817C3.49442 12.795 3.63706 13.1213 3.52375 13.4106C3.41044 13.6999 3.0841 13.8425 2.79484 13.7292C2.16157 13.4811 1.50529 13.0666 1.00674 12.4094C0.503685 11.7462 0.1875 10.8701 0.1875 9.75C0.1875 8.06667 0.901487 6.9603 1.82758 6.29351C2.51299 5.80002 3.29324 5.56101 3.9422 5.47562C3.96186 4.74186 4.06295 3.76011 4.58016 2.8981C5.27204 1.74497 6.61302 0.9375 9 0.9375C11.387 0.9375 12.728 1.74497 13.4198 2.8981C13.937 3.76011 14.0381 4.74186 14.0578 5.47563C14.7068 5.56101 15.487 5.80002 16.1724 6.29351C17.0985 6.9603 17.8125 8.06667 17.8125 9.75C17.8125 10.8701 17.4963 11.7462 16.9933 12.4094C16.4947 13.0666 15.8384 13.4811 15.2052 13.7292C14.9159 13.8425 14.5896 13.6999 14.4762 13.4106C14.3629 13.1213 14.5056 12.795 14.7948 12.6817C15.2819 12.4909 15.7506 12.1861 16.097 11.7295C16.4388 11.2788 16.6875 10.6466 16.6875 9.75C16.6875 8.43333 16.1515 7.6647 15.5151 7.20649C14.85 6.72762 14.035 6.5625 13.5 6.5625C13.1893 6.5625 12.9375 6.31066 12.9375 6C12.9375 5.22927 12.9259 4.2614 12.4552 3.4769C12.022 2.75503 11.113 2.0625 9 2.0625C6.88698 2.0625 5.97796 2.75503 5.54484 3.4769Z"
                fill="#284CB3"
              />
            </svg>
          </div>
          <div className="flex items-start md:items-center gap-[8px]">
            <h1 className="font-semibold text-[18px]">
              {stats?.cloud_rule_count || 0}
            </h1>
            <span
              className={`font-medium ${
                mode === "dark" ? "text-[#7E8299]" : "text-[#6A6A6A]"
              }`}
            >
              Cloud benchmarks
            </span>
          </div>
        </div>
        <div className="flex items-start md:items-center  md:justify-center gap-[12px] md:px-[10px] lg:px-[24px]">
          <div className="h-[42px] w-[42px] p-[12px] rounded-full bg-[#284CB31A] flex items-center justify-center">
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
                d="M4.5 3.5625C3.98223 3.5625 3.5625 3.98223 3.5625 4.5V15C3.5625 15.5178 3.98223 15.9375 4.5 15.9375H9C9.31066 15.9375 9.5625 16.1893 9.5625 16.5C9.5625 16.8107 9.31066 17.0625 9 17.0625H4.5C3.36091 17.0625 2.4375 16.1391 2.4375 15V4.5C2.4375 3.36091 3.36091 2.4375 4.5 2.4375H6.375C6.68566 2.4375 6.9375 2.68934 6.9375 3C6.9375 3.31066 6.68566 3.5625 6.375 3.5625H4.5Z"
                fill="#284CB3"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.0625 3C11.0625 2.68934 11.3143 2.4375 11.625 2.4375H13.5C14.6391 2.4375 15.5625 3.36091 15.5625 4.5V11.25C15.5625 11.5607 15.3107 11.8125 15 11.8125C14.6893 11.8125 14.4375 11.5607 14.4375 11.25V4.5C14.4375 3.98223 14.0178 3.5625 13.5 3.5625H11.625C11.3143 3.5625 11.0625 3.31066 11.0625 3Z"
                fill="#284CB3"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.739 1.81302C7.49971 2.0953 7.38985 2.45386 7.34283 2.72433C7.2777 3.09893 6.98655 3.46054 6.5625 3.54436V4.6875H11.4375V3.54436C11.0135 3.46054 10.7223 3.09893 10.6572 2.72433C10.6102 2.45386 10.5003 2.0953 10.261 1.81302C10.041 1.55351 9.6748 1.3125 9 1.3125C8.3252 1.3125 7.95899 1.55351 7.739 1.81302ZM6.88085 1.08556C7.32138 0.56588 8.00529 0.1875 9 0.1875C9.99471 0.1875 10.6786 0.56588 11.1192 1.08556C11.509 1.5454 11.676 2.07677 11.7495 2.4457C12.2084 2.50659 12.5625 2.89945 12.5625 3.375V4.8C12.5625 5.35919 12.1092 5.8125 11.55 5.8125H6.45C5.89081 5.8125 5.4375 5.35919 5.4375 4.8V3.375C5.4375 2.89945 5.79158 2.50659 6.25049 2.4457C6.32404 2.07677 6.49104 1.5454 6.88085 1.08556Z"
                fill="#284CB3"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.2268 14.9773C11.4465 14.7576 11.8027 14.7576 12.0223 14.9773L13.1246 16.0795L16.4768 12.7273C16.6965 12.5076 17.0527 12.5076 17.2723 12.7273C17.492 12.9469 17.492 13.3031 17.2723 13.5227L13.5223 17.2727C13.3027 17.4924 12.9465 17.4924 12.7268 17.2727L11.2268 15.7727C11.0072 15.5531 11.0072 15.1969 11.2268 14.9773Z"
                fill="#284CB3"
              />
            </svg>
          </div>
          <div className="flex items-center  gap-[8px]">
            <h1 className="font-semibold text-[18px]">
              {stats?.repo_rule_count || 0}
            </h1>
            <span
              className={`font-medium ${
                mode === "dark" ? "text-[#7E8299]" : "text-[#6A6A6A]"
              }`}
            >
              Repo benchmarks
            </span>
          </div>
        </div>
      </div>
      <div className="mb-[24px] flex flex-col md:flex-row items-center w-full justify-between border-bottom">
        <div className="flex items-center gap-[16px]">
          {["Cloud bEnchmarks", "Repo bEnchmarks"].map((d) => (
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
                setCanNext(false);
                setCanPrev(false);
                setPage(1);
                if (d === "Cloud bEnchmarks") {
                  handleFetchRules("Cloud", undefined, undefined);
                } else {
                  handleFetchRules("Repository", undefined, undefined);
                }
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
            onClick={() => setShowModal(true)}
            className="font-medium flex items-center border-start border-end py-2 md:justify-center px-[16px] gap-[8px]"
          >
            <p className="text-[14px]">Create new</p>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.5 7H7M10.5 7H7M7 7V3.5M7 7V10.5"
                stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={() => setShowPopOver(!showPopOver)}
            className="flex text-[10px] md:text-[12px] font-medium items-center gap-3"
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
      <div className="w-full overflow-auto p-2">
        <div className="w-full">
          {tab === "Cloud bEnchmarks" ? (
            <div
              className={`grid grid-cols-8 p-4 gap-[8px] rounded-t-[1.5rem] mb-3 border-bottom h-[52px] w-[280vw] md:w-[180vw] lg:w-full ${
                mode === "dark" ? "bg-lightDark" : "bg-white"
              }`}
            >
              <p className="font-semibold text-[12px] col-span-2">Rule Name</p>
              <button className="flex text-[12px] items-center justify-center gap-2 font-semibold">
                <span>Cloud Provider</span>{" "}
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
              <button className="flex text-[12px] items-center justify-center gap-2 font-semibold">
                <span>Severity</span>{" "}
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
              <button className="flex text-[12px] items-center justify-center gap-2 font-semibold">
                <span>Services</span>{" "}
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
              <button className="flex text-[12px] items-center justify-center gap-2 font-semibold">
                <span>Rule type</span>{" "}
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
              <p className="font-semibold text-[12px] col-span-2">
                Description
              </p>
            </div>
          ) : (
            <div
              className={`grid grid-cols-6 gap-[8px] p-4 rounded-t-[1.5rem] mb-3 border-bottom h-[52px] w-[280vw] md:w-[180vw] lg:w-full ${
                mode === "dark" ? "bg-lightDark" : "bg-white"
              }`}
            >
              <p className="font-semibold text-[12px] col-span-2">Rule Name</p>
              {/* <button className="flex text-[12px] items-center justify-center gap-2 font-semibold">
              <span>Repo Provider</span>{" "}
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
            </button> */}
              <button className="flex text-[12px] items-center justify-center gap-2 font-semibold">
                <span>Severity</span>{" "}
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
              <button className="flex text-[12px] items-center justify-center gap-2 font-semibold">
                <span>Rule type</span>{" "}
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
              <p className="font-semibold text-[12px] col-span-2">
                Description
              </p>
            </div>
          )}
        </div>
        {(showEmpty && isLoading || allRules.length < 1) ? (
          <DefaultContent
            pageHeader="Rules"
            pageDescription="No record found"
            loading={isLoading}
            buttonValue="Refresh"
            buttonClick={() => refreshrecord()}
          />
        ) : tab === "Cloud bEnchmarks" ? (
          allRules.map((rules) => <CloudCard data={rules} mode={mode} />)
        ) : (
          allRules.map((rules) => <RepoCard data={rules} mode={mode} />)
        )}
      </div>
      <div className="w-full mt-10">
        {allRules.length > 0 && totalCount > 10 && (
          <div className="flex items-center font-medium justify-between w-full">
            <div className="flex items-center gap-2">
              <p>page size:</p>
              <select
                value={String(pageSize)}
                onChange={(e) => {
                  setPageSize(+e.target.value);
                  handleFetchRules("Cloud", undefined, +e.target.value);
                }}
                className="w-24 border-2 rounded-md p-2 bg-none"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <div className="flex font-medium items-center gap-3">
              <button
                disabled={!canPrev}
                onClick={() => {
                  if (page <= 1) {
                    setPage(1);
                    handleFetchRules("Cloud", undefined, undefined);
                  } else {
                    handleFetchRules("Cloud", page - 1, undefined);
                    setPage((page) => page - 1);
                  }
                }}
                className="p-2 rounded-md font-medium w-24 bg-primary text-white hover:bg-transparent hover:text-primary hover:border-primary"
              >
                Previous
              </button>
              <button
                disabled={!canNext}
                onClick={() => {
                  handleFetchRules("Cloud", page + 1, undefined);
                  setPage((page) => page + 1);
                }}
                className="p-2 bg-primary font-medium text-white rounded-md w-24 hover:bg-transparent hover:text-primary hover:border-primary"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(!showModal);
          setShowResModal(false);
          setResMessage("");
          setRulePayload({
            cloud_provider: "",
            description: "",
            name: "",
            rule_type: "",
            service: "",
            severity: "",
          });
          setErrorRule("");
          setStep(1);
        }}
        keyboard={false}
      >
        <Modal.Header closeButton className="border-bottom-0  items-start">
          <Modal.Title className="w-full">
            <div
              className={`flex items-center gap-3 ${
                step === 1 ? "mb-[24px]" : ""
              }`}
            >
              {step === 1 ? (
                <>
                  <div className="bg-[#284CB30D] w-12 h-12 rounded-full flex items-center justify-center p-2">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_1173_6408)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9 5.4375C9.31066 5.4375 9.5625 5.68934 9.5625 6V8.4375H12C12.3107 8.4375 12.5625 8.68934 12.5625 9C12.5625 9.31066 12.3107 9.5625 12 9.5625H9.5625V12C9.5625 12.3107 9.31066 12.5625 9 12.5625C8.68934 12.5625 8.4375 12.3107 8.4375 12V9.5625H6C5.68934 9.5625 5.4375 9.31066 5.4375 9C5.4375 8.68934 5.68934 8.4375 6 8.4375H8.4375V6C8.4375 5.68934 8.68934 5.4375 9 5.4375Z"
                          fill="#284CB3"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9 2.0625C5.16852 2.0625 2.0625 5.16852 2.0625 9C2.0625 12.8315 5.16852 15.9375 9 15.9375C12.8315 15.9375 15.9375 12.8315 15.9375 9C15.9375 5.16852 12.8315 2.0625 9 2.0625ZM0.9375 9C0.9375 4.5472 4.5472 0.9375 9 0.9375C13.4528 0.9375 17.0625 4.5472 17.0625 9C17.0625 13.4528 13.4528 17.0625 9 17.0625C4.5472 17.0625 0.9375 13.4528 0.9375 9Z"
                          fill="#284CB3"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1173_6408">
                          <rect width="18" height="18" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="ml-[16px]">
                    <h2 className="font-semibold text-[18px] mb-[4px]">
                      Create new benchmark
                    </h2>
                    <p className="font-medium text-[12px]">
                      Select benchmark or rules you want to create
                    </p>
                  </div>
                </>
              ) : showResModal ? (
                <div className="flex-1 flex items-center justify-center">
                  <svg
                    width="42"
                    height="42"
                    viewBox="0 0 42 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="42"
                      height="42"
                      rx="21"
                      fill="#284CB3"
                      fillOpacity="0.05"
                    />
                    <g clipPath="url(#clip0_1149_5645)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M21 12.9375C16.5472 12.9375 12.9375 16.5472 12.9375 21C12.9375 25.4528 16.5472 29.0625 21 29.0625C25.4528 29.0625 29.0625 25.4528 29.0625 21C29.0625 16.5472 25.4528 12.9375 21 12.9375ZM17.6478 20.9773C17.4282 20.7576 17.072 20.7576 16.8523 20.9773C16.6327 21.1969 16.6327 21.5531 16.8523 21.7727L19.1023 24.0227C19.322 24.2424 19.6782 24.2424 19.8978 24.0227L25.1478 18.7727C25.3675 18.5531 25.3675 18.1969 25.1478 17.9773C24.9282 17.7576 24.572 17.7576 24.3523 17.9773L19.5001 22.8295L17.6478 20.9773Z"
                        fill="#284CB3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1149_5645">
                        <rect
                          width="18"
                          height="18"
                          fill="white"
                          transform="translate(12 12)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              ) : (
                <>
                  <button onClick={() => setStep(() => step - 1)}>
                    <svg
                      width="15"
                      height="14"
                      viewBox="0 0 15 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.53033 0.46967C7.82322 0.762563 7.82322 1.23744 7.53033 1.53033L2.81066 6.25H13.5C13.9142 6.25 14.25 6.58579 14.25 7C14.25 7.41421 13.9142 7.75 13.5 7.75H2.81066L7.53033 12.4697C7.82322 12.7626 7.82322 13.2374 7.53033 13.5303C7.23744 13.8232 6.76256 13.8232 6.46967 13.5303L0.46967 7.53033C0.176777 7.23744 0.176777 6.76256 0.46967 6.46967L6.46967 0.46967C6.76256 0.176777 7.23744 0.176777 7.53033 0.46967Z"
                        fill={mode === "dark" ? "#EAEAEA" : "#373737"}
                      />
                    </svg>
                  </button>
                  <p className="font-semibold text-[18px]">
                    {rulePayload.rule_type === "Cloud"
                      ? "New Cloud benchmark"
                      : "New Repo benchmark"}
                    <Link
                      to=""
                      className="pl-[16px] font-medium ml-[16px] border-start text-[12px] underline text-[#6A6A6A]"
                    >
                      Learn more
                    </Link>
                  </p>
                </>
              )}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-[25px]">
          {step === 1 ? (
            <>
              <div className="flex items-center flex-col justify-center gap-[24px]">
                <button
                  onClick={() => {
                    setRulePayload({
                      ...rulePayload,
                      rule_type: "Cloud",
                      cloud_provider: "",
                    });
                    setErrorRule("");
                  }}
                  className="relative w-full flex items-center border gap-[12px] rounded-[12px] px-[24px] py-[16px]"
                >
                  {rulePayload.rule_type === "Cloud" && (
                    <FaCheckSquare
                      color="#284CB3"
                      size={14}
                      className="absolute top-2 right-3"
                    />
                  )}
                  <div className="flex items-center">
                    <div className="h-[42px] w-[42px] p-[12px] rounded-full bg-[#284CB31A] flex items-center justify-center">
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
                          d="M5.60185 13.1023C5.82152 12.8826 6.17767 12.8826 6.39734 13.1023L8.2496 14.9545L11.6018 11.6023C11.8215 11.3826 12.1777 11.3826 12.3973 11.6023C12.617 11.8219 12.617 12.1781 12.3973 12.3977L8.64734 16.1477C8.42767 16.3674 8.07152 16.3674 7.85185 16.1477L5.60185 13.8977C5.38218 13.6781 5.38218 13.3219 5.60185 13.1023Z"
                          fill="#284CB3"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.54484 3.4769C5.07414 4.2614 5.0625 5.22927 5.0625 6C5.0625 6.31066 4.81066 6.5625 4.5 6.5625C3.96501 6.5625 3.15001 6.72762 2.48492 7.20649C1.84851 7.6647 1.3125 8.43333 1.3125 9.75C1.3125 10.6466 1.56117 11.2788 1.90304 11.7295C2.24942 12.1861 2.71814 12.4909 3.20516 12.6817C3.49442 12.795 3.63706 13.1213 3.52375 13.4106C3.41044 13.6999 3.0841 13.8425 2.79484 13.7292C2.16157 13.4811 1.50529 13.0666 1.00674 12.4094C0.503685 11.7462 0.1875 10.8701 0.1875 9.75C0.1875 8.06667 0.901487 6.9603 1.82758 6.29351C2.51299 5.80002 3.29324 5.56101 3.9422 5.47562C3.96186 4.74186 4.06295 3.76011 4.58016 2.8981C5.27204 1.74497 6.61302 0.9375 9 0.9375C11.387 0.9375 12.728 1.74497 13.4198 2.8981C13.937 3.76011 14.0381 4.74186 14.0578 5.47563C14.7068 5.56101 15.487 5.80002 16.1724 6.29351C17.0985 6.9603 17.8125 8.06667 17.8125 9.75C17.8125 10.8701 17.4963 11.7462 16.9933 12.4094C16.4947 13.0666 15.8384 13.4811 15.2052 13.7292C14.9159 13.8425 14.5896 13.6999 14.4762 13.4106C14.3629 13.1213 14.5056 12.795 14.7948 12.6817C15.2819 12.4909 15.7506 12.1861 16.097 11.7295C16.4388 11.2788 16.6875 10.6466 16.6875 9.75C16.6875 8.43333 16.1515 7.6647 15.5151 7.20649C14.85 6.72762 14.035 6.5625 13.5 6.5625C13.1893 6.5625 12.9375 6.31066 12.9375 6C12.9375 5.22927 12.9259 4.2614 12.4552 3.4769C12.022 2.75503 11.113 2.0625 9 2.0625C6.88698 2.0625 5.97796 2.75503 5.54484 3.4769Z"
                          fill="#284CB3"
                        />
                      </svg>
                    </div>
                  </div>
                  <h1 className="text-[18px] font-semibold">
                    New Cloud benchmarks
                  </h1>
                </button>
                <button
                  onClick={() => {
                    setRulePayload({
                      ...rulePayload,
                      rule_type: "Repository",
                      cloud_provider: "Repository",
                    });
                    getServices("Repository");
                    setErrorRule("");
                  }}
                  className=" relative w-full flex items-center border gap-[12px] rounded-[12px] px-[24px] py-[16px]"
                >
                  {rulePayload.rule_type === "Repository" && (
                    <FaCheckSquare
                      color="#284CB3"
                      size={14}
                      className="absolute top-2 right-3"
                    />
                  )}
                  <div className="h-[42px] w-[42px] p-[12px] rounded-full bg-[#284CB31A] flex items-center justify-center">
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
                        d="M4.5 3.5625C3.98223 3.5625 3.5625 3.98223 3.5625 4.5V15C3.5625 15.5178 3.98223 15.9375 4.5 15.9375H9C9.31066 15.9375 9.5625 16.1893 9.5625 16.5C9.5625 16.8107 9.31066 17.0625 9 17.0625H4.5C3.36091 17.0625 2.4375 16.1391 2.4375 15V4.5C2.4375 3.36091 3.36091 2.4375 4.5 2.4375H6.375C6.68566 2.4375 6.9375 2.68934 6.9375 3C6.9375 3.31066 6.68566 3.5625 6.375 3.5625H4.5Z"
                        fill="#284CB3"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.0625 3C11.0625 2.68934 11.3143 2.4375 11.625 2.4375H13.5C14.6391 2.4375 15.5625 3.36091 15.5625 4.5V11.25C15.5625 11.5607 15.3107 11.8125 15 11.8125C14.6893 11.8125 14.4375 11.5607 14.4375 11.25V4.5C14.4375 3.98223 14.0178 3.5625 13.5 3.5625H11.625C11.3143 3.5625 11.0625 3.31066 11.0625 3Z"
                        fill="#284CB3"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.739 1.81302C7.49971 2.0953 7.38985 2.45386 7.34283 2.72433C7.2777 3.09893 6.98655 3.46054 6.5625 3.54436V4.6875H11.4375V3.54436C11.0135 3.46054 10.7223 3.09893 10.6572 2.72433C10.6102 2.45386 10.5003 2.0953 10.261 1.81302C10.041 1.55351 9.6748 1.3125 9 1.3125C8.3252 1.3125 7.95899 1.55351 7.739 1.81302ZM6.88085 1.08556C7.32138 0.56588 8.00529 0.1875 9 0.1875C9.99471 0.1875 10.6786 0.56588 11.1192 1.08556C11.509 1.5454 11.676 2.07677 11.7495 2.4457C12.2084 2.50659 12.5625 2.89945 12.5625 3.375V4.8C12.5625 5.35919 12.1092 5.8125 11.55 5.8125H6.45C5.89081 5.8125 5.4375 5.35919 5.4375 4.8V3.375C5.4375 2.89945 5.79158 2.50659 6.25049 2.4457C6.32404 2.07677 6.49104 1.5454 6.88085 1.08556Z"
                        fill="#284CB3"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.2268 14.9773C11.4465 14.7576 11.8027 14.7576 12.0223 14.9773L13.1246 16.0795L16.4768 12.7273C16.6965 12.5076 17.0527 12.5076 17.2723 12.7273C17.492 12.9469 17.492 13.3031 17.2723 13.5227L13.5223 17.2727C13.3027 17.4924 12.9465 17.4924 12.7268 17.2727L11.2268 15.7727C11.0072 15.5531 11.0072 15.1969 11.2268 14.9773Z"
                        fill="#284CB3"
                      />
                    </svg>
                  </div>
                  <h1 className="text-[18px] font-semibold">
                    New Repo benchmarks
                  </h1>
                </button>
              </div>
              {errorRule && (
                <p className="text-red-500 italic mt-4 font-medium text-sm">
                  {errorRule}
                </p>
              )}
            </>
          ) : showResModal ? (
            <h1 className="font-semibold text-[18px] text-center">
              {resMessage}
            </h1>
          ) : (
            <div className="grid  gap-[32px]">
              <div className="">
                <label className="form-label flex items-center gap-[8px] mb-[8px]">
                  <FaCheckDouble />
                  <p className="font-medium">
                    Rule Name <span className="text-red-500">*</span>
                  </p>
                </label>
                <input
                  placeholder="Enter Name"
                  type="text"
                  name="text"
                  autoComplete="off"
                  className="form-control bg-transparent"
                  value={rulePayload?.name}
                  onChange={(e) =>
                    setRulePayload({ ...rulePayload, name: e.target.value })
                  }
                />
              </div>
              <div className="">
                <label className="form-label flex items-center gap-[8px] mb-[8px]">
                  <IoIosWarning />
                  <p className="font-medium">
                    Severity <span className="text-red-500">*</span>
                  </p>
                </label>
                <select
                  className="form-control bg-transparent"
                  value={rulePayload.severity}
                  onChange={(e) =>
                    setRulePayload({ ...rulePayload, severity: e.target.value })
                  }
                  name="severity"
                  id="severity"
                >
                  <option value="" className="font-medium">
                    select severity
                  </option>
                  <option value="Critical" className="font-medium">
                    Critical
                  </option>
                  <option value="High" className="font-medium">
                    High
                  </option>
                  <option value="Low" className="font-medium">
                    Low
                  </option>
                  <option value="Medium" className="font-medium">
                    Medium
                  </option>
                </select>
              </div>
              {rulePayload.rule_type === "Cloud" && (
                <>
                  <div className="">
                    <label className="form-label flex items-center gap-[8px] mb-[8px]">
                      <FaCloud />
                      <p className="font-medium">
                        Cloud Provider <span className="text-red-500">*</span>
                      </p>
                    </label>
                    <select
                      className="form-control bg-transparent"
                      value={rulePayload?.cloud_provider}
                      onChange={(e) => {
                        getServices(e.target.value);
                        setRulePayload({
                          ...rulePayload,
                          cloud_provider: e.target.value,
                        });
                      }}
                      name="cloud_provider"
                      id="cloud_provider"
                    >
                      <option value="" className="font-medium">
                        select provider
                      </option>
                      <option value="AWS" className="font-medium">
                        AWS
                      </option>
                      <option value="AZURE" className="font-medium">
                        AZURE
                      </option>
                      <option value="GCP" className="font-medium">
                        GCP
                      </option>
                      <option value="Re[ository" className="font-medium">
                        Repository
                      </option>
                    </select>
                  </div>
                </>
              )}
              <div className="">
                <label className="form-label flex items-center gap-[8px] mb-[8px]">
                  <GiHamburgerMenu />
                  <p className="font-medium">
                    Services <span className="text-red-500">*</span>
                  </p>
                </label>
                <select
                  className="form-control bg-transparent"
                  value={rulePayload?.service}
                  onChange={(e) => {
                    setRulePayload({
                      ...rulePayload,
                      service: e.target.value,
                    });
                  }}
                  name="service"
                  id="service"
                >
                  <option value="" className="font-medium">
                    select services
                  </option>
                  {allservice.map((services) => (
                    <option
                      className="font-medium"
                      value={services?.resource_type}
                      key={services?.id}
                    >
                      {services?.resource_type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="">
                <label className="form-label flex items-center gap-[8px] mb-[8px]">
                  <GiHamburgerMenu />
                  <p className="font-medium">
                    Rule Type <span className="text-red-500">*</span>
                  </p>
                </label>
                <select
                  disabled
                  className="form-control bg-transparent"
                  value={rulePayload?.rule_type}
                  onChange={(e) => {
                    setRulePayload({
                      ...rulePayload,
                      rule_type: e.target.value,
                    });
                  }}
                  name="rule_type"
                  id="rule_type"
                >
                  <option value="" className="font-medium">
                    select rule type
                  </option>
                  <option value="Cloud" className="font-medium">
                    Cloud
                  </option>
                  <option value="Repository" className="font-medium">
                    Repository
                  </option>
                </select>
              </div>
              <div className="">
                <label className="form-label flex items-center gap-[8px] mb-[8px]">
                  <FaComment />
                  <p className="font-medium">
                    Description <span className="text-red-500">*</span>
                  </p>
                </label>
                <textarea
                  name="description"
                  id=""
                  rows={3}
                  cols={30}
                  value={rulePayload.description}
                  className="form-control bg-transparent"
                  onChange={(e) =>
                    setRulePayload({
                      ...rulePayload,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              </div>
            </div>
          )}
        </Modal.Body>
        <Alert />
        <Modal.Footer className="border-0">
          {step === 1 && (
            <button
              onClick={() => {
                if (step === 1) {
                  if (!rulePayload.rule_type) {
                    setErrorRule("Please select a rule type");
                  } else {
                    setStep((step) => step + 1);
                  }
                } else {
                  handleSubmit();
                }
              }}
              // disabled={!rulePayload.rule_type}
              className="bg-primary font-medium w-52 rounded-full text-white px-[24px] py-[12px]"
            >
              Create New Rule
            </button>
          )}
          {/* button displayed when rule type is cloud */}
          {rulePayload.rule_type === "Cloud" && step !== 1 && (
            <button
              onClick={handleSubmit}
              disabled={
                !rulePayload.severity ||
                !rulePayload.description ||
                !rulePayload.name ||
                !rulePayload.service ||
                !rulePayload.cloud_provider
              }
              className="bg-primary font-medium w-52 rounded-full text-white px-[24px] py-[12px]"
            >
              {mutateLoading ? "Processing..." : "Create New Rule"}
            </button>
          )}
          {/* button displayed when rule type is repository */}
          {rulePayload.rule_type === "Repository" && step !== 1 && (
            <button
              onClick={handleSubmit}
              disabled={
                !rulePayload.severity ||
                !rulePayload.description ||
                !rulePayload.name ||
                !rulePayload.service
              }
              className="bg-primary font-medium w-52 rounded-full text-white px-[24px] py-[12px]"
            >
              {mutateLoading ? "Processing..." : "Create Repo Rule"}
            </button>
          )}
          {/* button displayed when response from backend */}
          {showResModal && (
            <button
              onClick={() => {
                setStep(1);
                setShowModal(!showModal);
                setShowResModal(false);
                setResMessage("");
                setRulePayload({
                  cloud_provider: "",
                  description: "",
                  name: "",
                  rule_type: "",
                  service: "",
                  severity: "",
                });
              }}
              className="bg-primary font-medium w-36 rounded-full text-white px-[24px] py-[12px]"
            >
              Done
            </button>
          )}
        </Modal.Footer>
      </Modal>
      <FilterModal
        filterDataChange={(e) => filterUpdated(e)}
        headfilterFields={filterFields}
        setshowFilter={(e) => setShowPopOver(e)}
        showFilter={showPopOver}
      />
    </div>
  );
};

export default RuleAndBenchmarks;
