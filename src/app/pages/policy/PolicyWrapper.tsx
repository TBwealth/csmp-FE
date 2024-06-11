import React, { useEffect, useRef, useState } from "react";
import useAlert from "../components/useAlert";
import {
  useGetPolicies,
  useScanPolicy,
} from "../../api/api-services/policyQuery";
import { PolicyPolicyListCreateList200Response } from "../../api/axios-client";
import { useNavigate } from "react-router-dom";
import {
  ACTIONS,
  ColumnTypes,
  TableAction,
  TableActionEvent,
  TableColumn,
} from "../../components/models";
import RunPolicyModal from "./modals/RunPolicyModal";
import {
  IStatus,
  MyColor,
} from "../../components/tableComponents/status/status";
import { ComponentsheaderComponent } from "../../components/componentsheader/componentsheader.component";
import DefaultContent from "../../components/defaultContent/defaultContent";
import { MainTableComponent } from "../../components/tableComponents/maincomponent/maintable";
import ScanPolicyModal from "../security-monitoring/components/modals/ScanModal";

export class PolicyWithStatus implements IStatus {
  id: string = "";
  name: string = "";
  code: string = "";
  status: string = "";
  policy_type: string = "";

  constructor(tenant: any) {
    this.id = tenant.id;
    this.name = tenant.name;
    this.code = tenant.code;
    this.status = tenant.status;
    this.policy_type = tenant.policy_type;
  }

  getStatusLabel() {
    if (this.status) return "Active";
    if (!this.status) return "InActive";
    return "";
  }
  getStatusColor() {
    if (this.status) return new MyColor(0, 175, 175);
    if (!this.status) return new MyColor(242, 153, 74);
    return new MyColor(242, 0, 74);
  }
}
const PolicyWrapper = () => {
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<any[]>([]);
  const [editItems, setEditItems] = useState<any>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const { showAlert, hideAlert } = useAlert();
  const navigate = useNavigate();
  const [showPolicy, setShowPolicy] = useState(false);
  const [showScan, setShowScan] = useState(false);
  const [errorMess, setErrorMess] = useState<any>(null);
  const [showEmpty, setshowEmpty] = useState<boolean>(false);
  const currentPage = 0;
  const [totalItems, settotalItems] = useState<number>(0);
  const filter = useRef<any>({
    page: 1, 
    pageSize: 10,
    name: undefined,
    code: undefined,
    policyType: undefined,
    status: undefined
  })
  const filterFields: TableColumn[] = [
    { name: "name", title: "Name", type: ColumnTypes.Text },
    { name: "code", title: "Code", type: ColumnTypes.Text },
    { name: "policyType", 
    title: "Type", 
    type: ColumnTypes.List,
    listValue: [{
      name: "Repository"
    },
    {
      name: "Cloud"
    },
  ],
    listIdField: "name",
    listTextField: "name",
   },
    { 
      name: "status", 
      title: "Status", 
      type: ColumnTypes.List,
      listValue: [{
        id:false,
        name: "Inactive"
      },
      {
        id:true,
        name: "Active"
      },
    ],
      listIdField: "id",
      listTextField: "name",
     },
  ];
  const tableActions: TableAction[] = [
    { name: ACTIONS.EDIT, label: "Edit" },
    { name: ACTIONS.VIEW, label: "View Rules" },
  ];
  const { data, isLoading, error, refetch } = useGetPolicies({...filter.current});
  // console.log(data);

  const { mutate, isLoading: scanLoading } = useScanPolicy();

  const datastsr: PolicyPolicyListCreateList200Response | any = data;

  useEffect(() => {
    setItems(
      datastsr?.data?.data?.results.map((x: any) => new PolicyWithStatus(x))
    );
    setshowEmpty(
      datastsr?.data?.data?.results
        ? datastsr?.data?.data?.results?.length === 0
        : true
    );
    settotalItems(Math.ceil(datastsr?.data?.data?.count));
    hideAlert();
    if (error) {
      if (error instanceof Error) {
        setErrorMess(error?.message);
        showAlert(error?.message || "An unknown error occurred", "danger");
      }
    }
  }, [data, error]);

  const tableColumns: TableColumn[] = [
    {
      name: "id",
      title: "Id",
      type: ColumnTypes.Text,
    },
    {
      name: "name",
      title: "Name",
      type: ColumnTypes.Text,
    },
    {
      name: "code",
      title: "Code",
      type: ColumnTypes.Text,
    },
    {
      name: "policy_type",
      title: "Policy Type",
      type: ColumnTypes.Text,
    },
    {
      name: "status",
      title: "Status",
      type: ColumnTypes.Status,
      statusEnum: [
        { key: true, value: "Active" },
        { key: false, value: "InActive" },
      ],
    },
  ];

  const topActionButtons = [
    { name: "add_new_user", label: "Add Policy", icon: "plus", outline: false },
  ];
  function modal(buttion: any) {
    if (buttion === "add_new_user") {
      setShowPolicy(true);
      setEditItems(null);
    }
  }
  function refreshrecord() {
    filter.current= {
      page: 1,
      pageSize: 10,
      status: undefined,
      name: undefined,
      policyType: undefined,
      code: undefined
    }
    refetch()
  }

  const handleViewPolicyRules = (id: any) => {
    navigate(`/policy-rules/${id}`);
  };

  function filterUpdated(data: any) {
    filter.current = { 
      page: data?.page ?? 1,
      pageSize: data?.pageSize ?? 10,
      status: data?.status,
      name: data?.name,
      code: data?.code,
      policyType: data?.policyType,

     };

     refetch();
  }
  function handleScanPolicy(id: number, frequency: string) {
    mutate(
      {
        data: {
          policy_id: id,
          scan_frequency: frequency,
          cloud_provider_account_id: 0
        },
      },
      {
        onSuccess: (res) => {
          navigate("/policy-scan-result");
        },
        onError: (err: any) => {
          setShowScan(true);
          setErrorMess(err.response.data);
        },
      }
    );
  }
  function tableActionClicked(event: TableActionEvent) {
    if (event.name === "1") {
      setEditItems(event.data);
      setShowPolicy(true);
    }
    if (event.name === "3") {
      handleViewPolicyRules(event.data.id);
    }
    if (event.name === "2") {
      setShowPolicy(true);
    }
    if (event.name === "7") {
      handleScanPolicy(event.data.id, event.data.scan_frequency);
    }
  }

  return (
    <div className="mt-[32px]">
      <ComponentsheaderComponent
        backbuttonClick={() => {}}
        pageName="Policy"
        requiredButton={topActionButtons}
        buttonClick={(e) => {
          modal(e);
        }}
      />

      {(showEmpty || scanLoading) ? (
        <DefaultContent
          pageHeader={scanLoading ? "Running Scan" : "All Policies"}
          pageDescription={scanLoading ? "" : "No record found"}
          loading={isLoading || scanLoading}
          buttonValue={scanLoading ? "" : "Refresh"}
          buttonClick={scanLoading ? () => {} : () => refreshrecord()}
        />
      ) : (
        <MainTableComponent
          filterChange={(e: any) => filterUpdated(e)}
          showActions={true}
          showFilter={true}
          actionClick={(e: any) => tableActionClicked(e)}
          actions={tableActions}
          userData={items}
          tableColum={tableColumns}
          totalItems={totalItems}
          currentTablePage={currentPage}
          loading={isLoading}
          InputFileName="All Policies"
          filterFields={filterFields}
          showCheckBox={true}
          bulkactionClicked={(e: any) => {}}
          Bulkactions={[]}
          showBulkAction={true}
          actionChecked={() => {}}
          actionBulkChecked={() => {}}
          pageChange={() => {}}
          dateRangeChanged={() => {}}
          toggleColumnsEvent={() => {}}
          toggleCustomFilter={() => {}}
          sortOptionSelected={() => {}}
        />
      )}
      {/* {showScan && (
        <ScanPolicyModal
        isOpen={showScan}
        err={errorMess}
        handleHide={() => {
          setShowScan(false);
        }}
      />
      )} */}
      {showPolicy && (
        <RunPolicyModal
          isOpen={showPolicy}
          editItem={editItems}
          handleHide={() => {
            setShowPolicy(false);
          }}
        />
      )}
    </div>
  );
};

export default PolicyWrapper;
