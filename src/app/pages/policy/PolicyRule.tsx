import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAlert from "../components/useAlert";
import { ComponentsheaderComponent } from "../../components/componentsheader/componentsheader.component";
import {
  useGetRulesList,
  useAddPolicyRule,
} from "../../api/api-services/policyQuery";
import DefaultContent from "../../components/defaultContent/defaultContent";
import { PolicyApiPolicyRulesListRequest } from "../../api/axios-client";
import { MainTableComponent } from "../../components/tableComponents/maincomponent/maintable";
import {
  ACTIONS,
  ColumnTypes,
  TableActionEvent,
  TableColumn,
} from "../../components/models";
import { TableAction } from "../../components/tableComponents/models";
import {
  IStatus,
  MyColor,
} from "../../components/tableComponents/status/status";

export class RulesWithStatus implements IStatus {
  id: string = "";
  name: string = "";
  code: string = "";
  status: string = "";
  isDefault: string = "";

  constructor(tenant: any) {
    this.id = tenant.id;
    this.name = tenant.name;
    this.code = tenant.code;
    this.status = tenant.status;
    this.isDefault = tenant.isDefault;
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

const PolicyRule = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const { showAlert, hideAlert } = useAlert();
  const [editItems, setEditItems] = useState<any | undefined>();
  const [showModal, setShowModal] = useState(false);
  const [showEmpty, setshowEmpty] = useState<boolean>(false);
  const currentPage = 0;
  const filterFields: TableColumn[] = [
    { name: "keyword", title: "Keyword", type: ColumnTypes.Text },
  ];
  const tableActions: TableAction[] = [
    {
      name: ACTIONS.DEACTIVATE,
      label: "Deactivate",
      isFieldDependant: true,
      fieldName: "isDefault",
      fieldOptions: [
        { key: true, value: "Deactivate" },
        { key: false, value: "Activate" },
      ],
    },
  ];
  const { data, isLoading, error } = useGetRulesList(1);
  const datastsr: PolicyApiPolicyRulesListRequest | any = data;

  const { mutate } = useAddPolicyRule();

  const handleAddRuleToPolicy = (rule_id: number) => {
    mutate(
      {
        data: {
          policy_id: +id!,
          rule__id: [rule_id],
        },
      },
      {
        onSuccess: (res) => {
          console.log(res);
          navigate(-1);
        },
      }
    );
  };

  useEffect(() => {
    if (datastsr) {
      const mapped = datastsr?.data?.data?.results
        .map((res: any) => {
          return {
            ...res,
            isDefault: false,
          };
        })
        .map((x: any) => new RulesWithStatus(x));
      setItems(mapped);
      setTotalPages(Math.ceil(datastsr?.data?.data?.count / 30));
    }
    hideAlert();
    if (error) {
      if (error instanceof Error) {
        showAlert(error?.message || "An unknown error occurred", "danger");
      }
    }
  }, [datastsr, error]);
  console.log(data);
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
    { name: "add_new_user", label: "Add Rule", icon: "plus", outline: false },
  ];
  function modal(buttion: any) {
    if (buttion === "add_new_user") {
      setShowModal(true);
      setEditItems(null);
    }
  }
  function refreshrecord() {
    useGetRulesList(1);
  }

  function filterUpdated(filter: any) {
    filter.current = { ...filter.current, ...filter };
    let nfilter = filter.current;
    nfilter.pageIndex = filter.page;
    filter.current = nfilter;
    useGetRulesList(1);
  }
  function tableActionClicked(event: TableActionEvent) {
    if (event.name === "3") {
      // handleViewPolicyRules(event.data.id);
    }
    if (event.name === "6") {
      handleAddRuleToPolicy(event.data?.id);
    }
  }

  
  return (
    <div className="">
      <ComponentsheaderComponent
        backbuttonClick={() => navigate(-1)}
        showbackbutton={true}
        pageName="Rules"
        requiredButton={topActionButtons}
        buttonClick={(e) => {
          //   modal(e);
        }}
      />

      {isLoading ? (
        <DefaultContent
          pageHeader="Rule"
          pageDescription="No record found"
          loading={isLoading}
          buttonValue="Refresh"
          buttonClick={() => refreshrecord()}
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
          totalItems={totalPages}
          currentTablePage={currentPage}
          loading={isLoading}
          InputFileName="All Rules"
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
    </div>
  );
};

export default PolicyRule;
