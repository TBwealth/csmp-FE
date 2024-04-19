import React, { useEffect, useState } from "react";
import useAlert from "../components/useAlert";
import { useGetPolicies } from "../../api/api-services/policyQuery";
import { PolicyPoliciesList200Response } from "../../api/axios-client";
import { useNavigate } from "react-router-dom";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import {
  ACTIONS,
  ColumnTypes,
  TableAction,
  TableActionEvent,
  TableColumn,
} from "../../components/models";
import { UsersListLoading } from "../../modules/apps/user-management/users-list/components/loading/UsersListLoading";
import TableComponent from "../../components/TableComponent";
import ModalPolicyList from "./modals/ModalPolicyList";
import {
  IStatus,
  MyColor,
} from "../../components/tableComponents/status/status";
import { ComponentsheaderComponent } from "../../components/componentsheader/componentsheader.component";
import DefaultContent from "../../components/defaultContent/defaultContent";
import { MainTableComponent } from "../../components/tableComponents/maincomponent/maintable";

export class PolicyWithStatus implements IStatus {
  id: string = "";
  name: string = "";
  code: string = "";
  status: string = "";

  constructor(tenant: any) {
    this.id = tenant.id;
    this.name = tenant.name;
    this.code = tenant.code;
    this.status = tenant.status;
  }

  getStatusLabel() {
    if (this.status) return "Active";
    if (!this.status) return "InActive";
    return "";
  }
  getStatusColor() {
    if (this.status) return new MyColor(33, 150, 83);
    if (!this.status) return new MyColor(242, 153, 74);
    return new MyColor(242, 0, 74);
  }
}
const PolicyWrapper = () => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<any[]>([]);
  const [editItems, setEditItems] = useState<any | undefined>();
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const { showAlert, hideAlert } = useAlert();
  const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(false);
  const [errorMess, setErrorMess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEmpty, setshowEmpty] = useState<boolean>(false);
  const currentPage = 0;
  const [totalItems, settotalItems] = useState<number>(0);
  const filterFields: TableColumn[] = [
    { name: "keyword", title: "Keyword", type: ColumnTypes.Text },
  ];
  const tableActions: TableAction[] = [
    { name: ACTIONS.VIEW, label: "View" },
    { name: ACTIONS.DELETE, label: "Delete" },
  ];
  const { data, isLoading, error } = useGetPolicies(page);
  console.log(data);

  const datastsr: PolicyPoliciesList200Response | any = data;

  useEffect(() => {
    setItems(datastsr?.data?.data?.results.map((x: any) => new PolicyWithStatus(x)));
    setshowEmpty(datastsr?.data?.data?.results ? datastsr?.data?.data?.results?.length === 0: true);
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
      setShowModal(true);
      setEditItems(null);
    }
  }
  function refreshrecord() {
    useGetPolicies(1);
  }

  const handleViewPolicyRules = (id: any) => {
    navigate(`/policy-rules/${id}`);
  };

  function filterUpdated(filter: any) {
    filter.current = { ...filter.current, ...filter };
    let nfilter = filter.current;
    nfilter.pageIndex = filter.page;
    filter.current = nfilter;
    useGetPolicies(1);
  }
  function tableActionClicked(event: TableActionEvent) {
    if (event.name === "3") {
      handleViewPolicyRules(event.data.id);
    }
    if (event.name === "2") {
    }
  }

  

  return (
    <>
       <ComponentsheaderComponent
        backbuttonClick={() => {}}
        pageName="Policy"
        requiredButton={topActionButtons}
        buttonClick={(e) => {
          modal(e);
        }}
      />

      {showEmpty ? (
        <DefaultContent
          pageHeader="All Policies"
          pageDescription="No record found"
          loading={isLoading}
          buttonValue="Refresh"
          buttonClick={() => refreshrecord()}
        />
      ): (
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
      {/* {!showEmpty && (
      )} */}
      {showModal && (
        <ModalPolicyList
          editItem={editItems}
          isOpen={showModal}
          handleHide={() => {
            setShowModal(false);
            setEditItems(false);
          }}
          onClearEdit={() => {
            setEditItems(null);
          }}
        />
      )}
    </>
  );
};

export default PolicyWrapper;
