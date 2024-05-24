import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import modeAtomsAtom from "../../../atoms/modeAtoms.atom";
import SetupModal from "./modal/SetupModal";
import {
  useGetSuppressionSetups,
  useGetRegions,
} from "../../../api/api-services/systemQuery";
import FilterModal from "../../../components/FilterModal";
import { useGetAccountTenant } from "../../../api/api-services/accountQuery";
import { AccountsApiTenantsList200Response, SystemSettingsRuleSuppressionSetupList200Response } from "../../../api/axios-client";
import DefaultContent from "../../../components/defaultContent/defaultContent";
import { TableColumn } from "../../../components/tableComponents/models";
import { ColumnTypes } from "../../../components/models";

const SetupCard = ({
  provider,
  tenant_id,
  type,
  resource_id,
  rule_id,
  region,
  exp_date,
  status,
  comment,
  mode,
  setData,
}: any) => {
  return (
    <div
      className={`grid grid-cols-10 p-4 rounded-md mb-3 shadow-sm w-[280vw] md:w-full ${
        mode === "dark" ? "bg-lightDark" : "bg-white"
      }`}
    >
      <div className="flex items-center gap-1">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.7812 0H4.21875C1.8888 0 0 1.8888 0 4.21875V13.7812C0 16.1112 1.8888 18 4.21875 18H13.7812C16.1112 18 18 16.1112 18 13.7812V4.21875C18 1.8888 16.1112 0 13.7812 0Z"
            fill="#EAEAEA"
          />
          <path
            d="M5.95874 7.87226C5.95874 8.0434 5.97723 8.18212 6.00958 8.28394C6.0507 8.39844 6.10019 8.50977 6.15766 8.61701C6.18079 8.65399 6.19 8.69098 6.19 8.72339C6.19 8.76966 6.16223 8.81592 6.10211 8.86212L5.81066 9.05646C5.76904 9.08416 5.72741 9.09809 5.69043 9.09809C5.64416 9.09809 5.5979 9.07495 5.55163 9.03333C5.48932 8.96634 5.43357 8.89354 5.38513 8.81592C5.33344 8.72703 5.28558 8.63596 5.24169 8.54297C4.88092 8.96857 4.42755 9.18133 3.88171 9.18133C3.49316 9.18133 3.18323 9.07031 2.95654 8.84827C2.72992 8.62622 2.61426 8.3302 2.61426 7.96015C2.61426 7.56689 2.75305 7.24774 3.03522 7.0072C3.31738 6.76666 3.69208 6.64636 4.16852 6.64636C4.3258 6.64636 4.48773 6.66028 4.65888 6.68341C4.83002 6.70655 5.0058 6.74353 5.19086 6.78516V6.44745C5.19086 6.09588 5.11682 5.8507 4.97345 5.70734C4.82538 5.5639 4.57562 5.49457 4.21942 5.49457C4.05749 5.49457 3.89099 5.51306 3.71985 5.55469C3.54864 5.59631 3.38214 5.64722 3.22021 5.71198C3.16762 5.73551 3.11355 5.75559 3.05835 5.77209C3.02601 5.78138 3.0028 5.78602 2.98431 5.78602C2.91963 5.78602 2.88714 5.73975 2.88714 5.64258V5.41589C2.88714 5.34192 2.89642 5.28637 2.91955 5.25403C2.94269 5.22169 2.98431 5.18927 3.04907 5.15686C3.211 5.07361 3.40527 5.00428 3.63196 4.94873C3.85858 4.88855 4.09912 4.86084 4.35358 4.86084C4.90405 4.86084 5.30645 4.98572 5.56555 5.23547C5.81995 5.48529 5.94946 5.86462 5.94946 6.37348V7.87226H5.95874ZM4.0807 8.57538C4.23327 8.57538 4.39056 8.54761 4.55713 8.49206C4.72363 8.43659 4.87164 8.33477 4.99659 8.19605C5.07055 8.10816 5.1261 8.01098 5.1538 7.89996C5.18158 7.78894 5.20007 7.65478 5.20007 7.49756V7.30322C5.0598 7.2691 4.91774 7.24285 4.77454 7.22461C4.6303 7.2063 4.48505 7.19702 4.33966 7.19684C4.02972 7.19684 3.8031 7.25702 3.65045 7.3819C3.4978 7.50677 3.42377 7.68255 3.42377 7.91388C3.42377 8.13129 3.47931 8.29315 3.59491 8.40417C3.706 8.51984 3.86793 8.57538 4.0807 8.57538ZM7.79509 9.07495C7.71184 9.07495 7.6563 9.06103 7.61931 9.02869C7.58233 9.00091 7.54991 8.93616 7.52221 8.84827L6.43518 5.27252C6.40734 5.17999 6.39348 5.11988 6.39348 5.08746C6.39348 5.01349 6.43047 4.9718 6.50451 4.9718H6.95781C7.0457 4.9718 7.10589 4.98572 7.13823 5.01806C7.17522 5.04584 7.20299 5.11059 7.23077 5.19848L8.00786 8.2608L8.72955 5.19848C8.75268 5.10595 8.78038 5.04591 8.81744 5.01806C8.85442 4.99036 8.91918 4.97187 9.00243 4.97187H9.37248C9.46038 4.97187 9.52056 4.98572 9.55755 5.01806C9.59453 5.04584 9.62695 5.11059 9.64544 5.19848L10.3763 8.29779L11.1766 5.19848C11.2043 5.10595 11.2368 5.04591 11.2691 5.01806C11.3061 4.99036 11.3663 4.97187 11.4495 4.97187H11.8797C11.9537 4.97187 11.9954 5.00885 11.9954 5.08746C11.9954 5.11066 11.9907 5.13373 11.9861 5.1615C11.9815 5.18927 11.9722 5.22619 11.9537 5.27716L10.8389 8.85291C10.8111 8.94544 10.7787 9.00555 10.7418 9.03333C10.7048 9.06103 10.6446 9.07959 10.566 9.07959H10.1681C10.0802 9.07959 10.0201 9.06567 9.98315 9.03333C9.94609 9.00091 9.91375 8.9408 9.89526 8.84827L9.17821 5.86462L8.46588 8.84362C8.44274 8.93616 8.41497 8.99627 8.37798 9.02869C8.34093 9.06103 8.27617 9.07495 8.19292 9.07495H7.79509ZM13.7393 9.19983C13.4988 9.19983 13.2582 9.17205 13.0269 9.11658C12.7956 9.06103 12.6152 9.00091 12.4949 8.93152C12.421 8.88989 12.37 8.84362 12.3516 8.802C12.3335 8.76118 12.3241 8.7171 12.3238 8.67248V8.43659C12.3238 8.33941 12.3608 8.29315 12.4302 8.29315C12.4579 8.29315 12.4857 8.29779 12.5134 8.30707C12.5412 8.31628 12.5828 8.33477 12.6291 8.35334C12.7925 8.42517 12.9631 8.47943 13.1379 8.5152C13.3191 8.55201 13.5035 8.57061 13.6884 8.57074C13.9799 8.57074 14.2065 8.51984 14.3638 8.41809C14.521 8.31628 14.6043 8.16827 14.6043 7.97864C14.6043 7.84912 14.5627 7.74267 14.4794 7.65478C14.3962 7.56689 14.2389 7.48828 14.0122 7.41424L13.3415 7.20612C13.0038 7.09973 12.754 6.94245 12.6013 6.73432C12.4487 6.53077 12.37 6.30401 12.37 6.06354C12.37 5.86927 12.4117 5.69812 12.4949 5.55005C12.5782 5.40204 12.6892 5.27252 12.828 5.17078C12.9668 5.06433 13.1241 4.98572 13.3091 4.93017C13.4941 4.87462 13.6884 4.85156 13.892 4.85156C13.9937 4.85156 14.1001 4.8562 14.2019 4.87005C14.3083 4.88391 14.4054 4.9024 14.5026 4.92096C14.5951 4.94409 14.683 4.96723 14.7662 4.995C14.8495 5.0227 14.9142 5.05048 14.9605 5.07825C15.0253 5.11523 15.0715 5.15222 15.0993 5.19384C15.127 5.2309 15.1409 5.28173 15.1409 5.34656V5.56397C15.1409 5.66107 15.1039 5.71198 15.0345 5.71198C14.9975 5.71198 14.9374 5.69348 14.8588 5.65643C14.5951 5.5362 14.299 5.47608 13.9706 5.47608C13.7069 5.47608 13.4988 5.5177 13.3553 5.60559C13.212 5.69348 13.1379 5.82764 13.1379 6.01727C13.1379 6.14679 13.1842 6.25781 13.2767 6.3457C13.3692 6.43359 13.5404 6.52148 13.7856 6.60009L14.4424 6.80822C14.7754 6.91467 15.016 7.06268 15.1594 7.25238C15.3028 7.44202 15.3722 7.65942 15.3722 7.89996C15.3722 8.09887 15.3306 8.2793 15.2519 8.43659C15.1687 8.59387 15.0577 8.7326 14.9142 8.84362C14.7709 8.95929 14.5997 9.04254 14.4008 9.10273C14.1926 9.16748 13.9752 9.19983 13.7393 9.19983Z"
            fill="#252F3E"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.6136 11.4485C13.0917 12.5726 10.8805 13.1693 8.97929 13.1693C6.31487 13.1693 3.91398 12.1839 2.10069 10.5464C1.95725 10.4169 2.08684 10.2411 2.25798 10.3429C4.21935 11.4808 6.63866 12.1701 9.14122 12.1701C10.8296 12.1701 12.6846 11.8185 14.3915 11.0969C14.6459 10.9812 14.8633 11.2634 14.6136 11.4485Z"
            fill="#FF9900"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.2473 10.7287C15.053 10.4789 13.9613 10.6084 13.4663 10.6685C13.3183 10.6871 13.2952 10.5575 13.4293 10.4604C14.299 9.84977 15.7283 10.0256 15.8949 10.229C16.0614 10.4372 15.8486 11.8666 15.0345 12.5512C14.9096 12.6576 14.7893 12.6021 14.8448 12.4634C15.0299 12.0054 15.4415 10.9738 15.2473 10.7287Z"
            fill="#FF9900"
          />
        </svg>
        <p className="font-semibold text-[12px]">AWS</p>
      </div>
      <p className="font-semibold text-[12px] text-center">{tenant_id}</p>
      <p className="font-semibold text-[12px] text-center">{type}</p>
      <p className="font-semibold text-[12px]">{resource_id}</p>
      <p className="font-semibold text-[12px]">{rule_id}</p>
      <p className="font-semibold text-[12px] text-center">{region}</p>
      <p className="font-semibold text-[12px]">{exp_date}</p>
      <p
        className={`font-bold text-[10px] text-center rounded-full w-14 mx-auto px-2 py-1 ${
          status
            ? "bg-[#284CB31A] text-primary"
            : "bg-[#FF7D301A] text-[#FF7D30]"
        }`}
      >
        {status.toString()}
      </p>
      <div className="col-span-2 flex items-center justify-between w-full">
        <p className="font-normal text-[10px] w-72">
          {comment.slice(0, 15)}...
        </p>
        <button onClick={setData}>
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.5 6.5C7.67157 6.5 7 7.17157 7 8C7 8.82843 7.67157 9.5 8.5 9.5C9.32843 9.5 10 8.82843 10 8C10 7.17157 9.32843 6.5 8.5 6.5ZM6 8C6 6.61929 7.11929 5.5 8.5 5.5C9.88071 5.5 11 6.61929 11 8C11 9.38071 9.88071 10.5 8.5 10.5C7.11929 10.5 6 9.38071 6 8Z"
              fill="black"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.33679 1.20478C7.3946 0.985126 7.59319 0.832031 7.82033 0.832031H9.12323C9.35045 0.832031 9.5491 0.985243 9.60683 1.20501L9.95855 2.5441L11.2503 3.07534L12.1748 2.28526C12.3732 2.1157 12.6687 2.12727 12.8532 2.31181L14.1866 3.64515C14.3704 3.82897 14.3827 4.12301 14.2148 4.32153L13.428 5.25208L13.9473 6.50614L15.2896 6.84745C15.5112 6.90381 15.6664 7.10337 15.6663 7.33206L15.6663 8.65019C15.6662 8.87782 15.5125 9.07672 15.2922 9.13404L13.9423 9.48527L13.4223 10.741L14.2144 11.6754C14.3827 11.8739 14.3706 12.1682 14.1866 12.3523L12.8532 13.6856C12.6654 13.8734 12.3636 13.8816 12.1658 13.7043L12.1288 13.6712C12.1048 13.6497 12.0701 13.6188 12.0275 13.581C11.9423 13.5054 11.8257 13.4025 11.7002 13.2933C11.5455 13.1586 11.3868 13.0227 11.2576 12.9162L9.99245 13.4401L9.65104 14.7881C9.59485 15.01 9.3952 15.1654 9.16634 15.1654H7.83301C7.60402 15.1654 7.4043 15.0098 7.34823 14.7878L7.0079 13.4402L5.77887 12.9346L4.81554 13.7196C4.6167 13.8817 4.3275 13.867 4.14612 13.6856L2.81279 12.3523C2.62539 12.1649 2.61676 11.8638 2.79312 11.666L3.59339 10.7683L3.06747 9.52068L1.70132 9.14771C1.48386 9.08834 1.33301 8.89079 1.33301 8.66536V7.33203C1.33301 7.09966 1.49309 6.89792 1.71938 6.84511L3.04902 6.53481L3.56063 5.27693L2.77828 4.31398C2.61671 4.11513 2.63161 3.82632 2.81279 3.64514L4.14612 2.31181C4.33336 2.12457 4.63411 2.11578 4.83197 2.29176L5.73248 3.09271L6.97814 2.56761L7.33679 1.20478ZM8.20577 1.83203L7.8826 3.06003C7.84312 3.21006 7.73623 3.33326 7.59328 3.39352L5.83017 4.13674C5.65254 4.21162 5.44769 4.17772 5.30365 4.04961L4.51976 3.35239L3.83875 4.03339L4.52332 4.87598C4.63837 5.01759 4.66715 5.21063 4.59841 5.37964L3.87783 7.15129C3.81668 7.30164 3.68636 7.41295 3.52831 7.44983L2.33301 7.72878V8.28357L3.56543 8.62003C3.71354 8.66046 3.83485 8.76669 3.89449 8.90816L4.63758 10.671C4.71254 10.8488 4.67848 11.0539 4.55006 11.1979L3.85374 11.979L4.53389 12.6591L5.37792 11.9713C5.52012 11.8554 5.71436 11.8267 5.88401 11.8965L7.62125 12.6112C7.76774 12.6714 7.87701 12.7976 7.9158 12.9512L8.22243 14.1654H8.77719L9.08466 12.9514C9.12342 12.7984 9.23219 12.6726 9.37805 12.6122L11.1451 11.8804C11.3046 11.8144 11.4868 11.8353 11.6272 11.9356C11.7981 12.0578 12.1086 12.323 12.3568 12.539C12.3987 12.5756 12.4397 12.6114 12.4789 12.6457L13.1538 11.9708L12.4622 11.155C12.3411 11.0121 12.31 10.8134 12.3817 10.6403L13.1136 8.87275C13.1736 8.72794 13.298 8.61963 13.4497 8.58016L14.6663 8.2636L14.6663 7.72079L13.458 7.41354C13.3052 7.37467 13.1796 7.26597 13.1193 7.12026L12.3875 5.3532C12.3159 5.18032 12.3469 4.98194 12.4677 4.83906L13.1543 4.02705L12.473 3.34584L11.6676 4.03411C11.525 4.156 11.3262 4.18778 11.1526 4.11643L9.34802 3.37428C9.20304 3.31466 9.09441 3.1905 9.05459 3.03888L8.7376 1.83203H8.20577Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
const SuppressionSetup = () => {
  const { mode } = useRecoilValue(modeAtomsAtom);
  const [listTenants, setListTenants] = useState<any[]>([]);
  const [showEmpty, setshowEmpty] = useState<boolean>(false);
  const [allSetups, setAllsetups] = useState<any[]>([]);
  const [showPopOver, setShowPopOver] = useState(false);
  const [editItem, setEditItems] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const filter = useRef<any>({
    page: 1,
    pageSize: 10,
    status: undefined,
    cloudProvider: undefined,
    region: undefined,
  });

  const [filterFields, setFilterFields] = useState<TableColumn[]>([
    {
      name: "cloudProvider",
      title: "Provider",
      type: ColumnTypes.List,
      listValue: [
        { id: "AWS", name: "aws" },
        { id: "AZURE", name: "Azure" },
        { id: "GC[", name: "gcp" },
      ],
      listIdField: "id",
      listTextField: "name",
    },
    {
      name: "region",
      title: "Region",
      type: ColumnTypes.List,
      listValue: [],
      listIdField: "id",
      listTextField: "name",
    },
    {
      name: "status",
      title: "Status",
      type: ColumnTypes.List,
      listValue: [
        {
          id: false,
          name: "Inactive",
        },
        {
          id: true,
          name: "Active",
        },
      ],
      listIdField: "name",
      listTextField: "name",
    },
  ]);
  // const [pageSize, setPageSize] = useState(100);
  // const [page, setPage] = useState(1);

  const { data, isLoading, refetch } = useGetSuppressionSetups({
    ...filter.current,
  });
  const datastsr: SystemSettingsRuleSuppressionSetupList200Response | any = data;
  const { data: tenantData } = useGetAccountTenant({ page: 1, pageSize: 100 });
  const tenantstsr: AccountsApiTenantsList200Response | any = tenantData;
  const { data: region } = useGetRegions({ page: 1, pageSize: 1000 });
  const regionstsr: AccountsApiTenantsList200Response | any = region;

  useEffect(() => {
    setListTenants(tenantstsr?.data?.data?.results);
    setAllsetups(datastsr?.data?.data?.results ?? []);
    setshowEmpty(
      datastsr?.data?.data?.results
        ? datastsr?.data?.data?.results.length === 0
        : true
    );

    if (regionstsr?.data?.data?.results) {
      setFilterFields(() =>
        filterFields.map((fi: TableColumn) => {
          if (fi.name === "region") {
            return {
              ...fi,
              listValue: regionstsr?.data?.data?.results.map((reg: any) => {
                return {
                  name: reg?.region_name,
                };
              }),
            };
          } else {
            return fi;
          }
        })
      );
    }
  }, [tenantstsr, datastsr, regionstsr]);

  function filterUpdated(data: any) {
    filter.current = {
      page: data?.page ?? 1,
      pageSize: data?.pageSize ?? 10,
      status: data?.status,
      cloudProvider: data?.cloudProvider,
      region: data?.region,
    };
    refetch();
  }

  function refreshrecord() {
    filter.current = {
      page: 1,
      pageSize: 10,
      status: undefined,
      cloudProvider: undefined,
      region: undefined,
    };
    refetch();
  }

  // console.log(allSetups);
  return (
    <>
      <div className="w-[90%] mx-auto pt-12">
        <div className="flex items-center flex-col gap-4 md:flex-row justify-between w-full">
          <div
            className={`rounded-xl p-4 border shadow-md flex items-center justify-between gap-3 w-full md:w-fit ${
              mode === "dark" ? "bg-lightDark" : "bg-white"
            }`}
          >
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
            <div className="flex items-center gap-3">
              <h1 className="text-[18px] font-bold">{allSetups.length}</h1>
              <p
                className={`text-[14px] font-medium ${
                  mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
                }`}
              >
                Suppression setup
              </p>
            </div>
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
                d="M0.9375 9C0.9375 4.5472 4.5472 0.9375 9 0.9375C13.4528 0.9375 17.0625 4.5472 17.0625 9C17.0625 13.4528 13.4528 17.0625 9 17.0625C4.5472 17.0625 0.9375 13.4528 0.9375 9ZM9 8.0625C9.31066 8.0625 9.5625 8.31434 9.5625 8.625V12.375C9.5625 12.6857 9.31066 12.9375 9 12.9375C8.68934 12.9375 8.4375 12.6857 8.4375 12.375V8.625C8.4375 8.31434 8.68934 8.0625 9 8.0625ZM9.42561 6.00057C9.63343 5.76965 9.61471 5.41399 9.3838 5.20617C9.15289 4.99835 8.79722 5.01707 8.5894 5.24798L8.5819 5.25631C8.37408 5.48722 8.3928 5.84289 8.62371 6.05071C8.85462 6.25853 9.21029 6.23981 9.41811 6.0089L9.42561 6.00057Z"
                fill="#6A6A6A"
              />
            </svg>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="rounded-full text-[14px] py-3 px-4 bg-primary text-white flex items-center justify-center gap-2"
          >
            <span>New Suppression</span>
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
                d="M8 3.5C8.27614 3.5 8.5 3.72386 8.5 4V7.5H12C12.2761 7.5 12.5 7.72386 12.5 8C12.5 8.27614 12.2761 8.5 12 8.5H8.5V12C8.5 12.2761 8.27614 12.5 8 12.5C7.72386 12.5 7.5 12.2761 7.5 12V8.5H4C3.72386 8.5 3.5 8.27614 3.5 8C3.5 7.72386 3.72386 7.5 4 7.5H7.5V4C7.5 3.72386 7.72386 3.5 8 3.5Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
        <div className="my-10 pb-4 border-bottom flex items-center justify-between w-full">
          <p className="text-[14px] font-semibold">Suppressions</p>
          <button
            onClick={() => setShowPopOver(!showPopOver)}
            className="text-[14px] pl-3 border-start flex items-center justify-center gap-3"
          >
            <span className="underline">Filter</span>
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
                stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.25 13.5L9.75 13.5"
                stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="w-full overflow-auto p-2">
          {showEmpty ? (
            <DefaultContent
              pageHeader="All Suppression setups"
              pageDescription="No record found"
              loading={isLoading}
              buttonValue="Refresh"
              buttonClick={() => refreshrecord()}
            />
          ) : (
            <>
              <div
                className={`grid grid-cols-10 p-4 rounded-md mb-3 shadow-sm border w-[280vw] md:w-full ${
                  mode === "dark" ? "bg-lightDark" : "bg-white"
                }`}
              >
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
                  <span>Tenant ID</span>{" "}
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
                  <span>Type</span>{" "}
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
                <p className="font-semibold text-[12px]">Resource ID</p>
                <p className="font-semibold text-[12px]">Rule ID</p>
                <button className="flex text-[12px] items-center justify-center gap-2 font-semibold">
                  <span>Region</span>{" "}
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
                <p className="font-semibold text-[12px]">Exp Date</p>
                <button className="flex text-[12px] items-center justify-center gap-2 font-semibold">
                  <span>Status</span>{" "}
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
                <p className="font-semibold text-[12px] col-span-2">Comment</p>
              </div>
              {allSetups.map((setup, idx) => (
                <SetupCard
                  key={setup.provider + idx}
                  provider={setup?.provider ?? ""}
                  comment={setup?.comments}
                  resource_id={setup?.resource_type?.id}
                  rule_id={setup?.rule?.id}
                  type={setup?.resource.id}
                  exp_date={setup?.expiration}
                  status={setup?.status}
                  tenant_id={setup?.tenant}
                  mode={mode}
                  region={setup?.region}
                  setData={() => {
                    setEditItems(setup);
                    setShowModal(true);
                  }}
                />
              ))}
            </>
          )}
        </div>
      </div>
      {showModal && (
        <SetupModal
          isOpen={showModal}
          editItem={editItem}
          regions={regionstsr?.data?.data?.results}
          mode={mode}
          handleHide={() => {
            setEditItems(null);
            setShowModal(false);
          }}
        />
      )}

      <FilterModal
        filterDataChange={(e) => filterUpdated(e)}
        headfilterFields={filterFields}
        setshowFilter={(e) => setShowPopOver(e)}
        showFilter={showPopOver}
      />
    </>
  );
};

export default SuppressionSetup;
