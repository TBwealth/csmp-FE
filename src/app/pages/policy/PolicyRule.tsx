import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAlert from "../components/useAlert";
import { ComponentsheaderComponent } from "../../components/componentsheader/componentsheader.component";
import {
  useGetRulesList,
  useAddPolicyRule,
  useGetSinglePolicyRules,
} from "../../api/api-services/policyQuery";
import DefaultContent from "../../components/defaultContent/defaultContent";
import { PolicyRulesList200Response } from "../../api/axios-client";
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
import RuleModal from "./modals/RuleModal";

export class RulesWithStatus implements IStatus {
  id: string = "";
  name: string = "";
  code: string = "";
  service: string = "";
  description: string = "";
  severity: string = "";
  cloud_provider: string = "";
  rule_type: string = "";
  isDefault: string = "";

  constructor(tenant: any) {
    this.id = tenant.id;
    this.name = tenant.name;
    this.code = tenant.code;
    this.severity = tenant.severity;
    this.rule_type = tenant.rule_type;
    this.cloud_provider = tenant.cloud_provider;
    this.service = tenant.service;
    this.description = tenant.description;
    this.isDefault = tenant.isDefault;
  }

  getStatusLabel() {
    if (this.isDefault) return "Active";
    if (!this.isDefault) return "InActive";
    return "";
  }
  getStatusColor() {
    if (this.isDefault) return new MyColor(0, 175, 175);
    if (!this.isDefault) return new MyColor(242, 153, 74);
    return new MyColor(242, 0, 74);
  }
}

const PolicyRule = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const [page, setPage] = useState(1);
  const { showAlert, hideAlert } = useAlert();
  const [editItems, setEditItems] = useState<any | undefined>();
  const [showModal, setShowModal] = useState(false);
  const [showEmpty, setshowEmpty] = useState<boolean>(true);
  const currentPage = 0;
  const filter = useRef<any>({
    page: 1,
    pageSize: 10,
    name: undefined,
    severity: undefined,
    ruleType: undefined,
    code: undefined,
  });
  const filterFields: TableColumn[] = [
    { name: "name", title: "Name", type: ColumnTypes.Text },
    { name: "code", title: "Code", type: ColumnTypes.Text },
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
    { name: "rule_type", title: "Type", type: ColumnTypes.Text },
    // { name: "cloud_provider", title: "Cloud Provider", type: ColumnTypes.Text },
  ];
  const tableActions: TableAction[] = [
    {
      name: ACTIONS.EDIT,
      label: "Edit",
    },
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
  const { data, isLoading, error, refetch } = useGetRulesList({
    ...filter.current,
  });
  const { data: policyRule } = useGetSinglePolicyRules(+id!);
  const datastsr: any = data;
  const policyrule: PolicyRulesList200Response | any = policyRule;

  const { mutate } = useAddPolicyRule();

  const handleAddRuleToPolicy = (rule_ids: any) => {
    mutate(
      {
        data: {
          policy_id: +id!,
          rule__id: rule_ids,
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
      setshowEmpty(
        datastsr?.data?.data?.results
          ? datastsr?.data?.data?.results.length === 0
          : true
      );
      setTotalPages(Math.ceil(datastsr?.data?.data?.count));
    }
    hideAlert();
    if (error) {
      if (error instanceof Error) {
        showAlert(error?.message || "An unknown error occurred", "danger");
      }
    }
    if (policyrule && datastsr) {
      const mapped = policyrule?.data?.data.rules.map(
        (rule: any) => rule?.name
      );
      const trans = datastsr?.data?.data?.results.map((tran: any) => {
        if (mapped.includes(tran?.name)) {
          return {
            ...tran,
            isDefault: true,
          };
        }

        return {
          ...tran,
          isDefault: false,
        };
      });
      setItems(() => trans.map((x: any) => new RulesWithStatus(x)));
      // setItems(trans);
    }
  }, [data, error, policyrule]);
  const tableColumns: TableColumn[] = [
    {
      name: "name",
      title: "Name",
      type: ColumnTypes.Text,
    },
    {
      name: "rule_type",
      title: "Rule Type",
      type: ColumnTypes.Text,
    },
    {
      name: "code",
      title: "Code",
      type: ColumnTypes.Text,
    },
    {
      name: "severity",
      title: "Severity",
      type: ColumnTypes.Text,
    },
    {
      name: "cloud_provider",
      title: "Cloud Provider",
      type: ColumnTypes.Text,
    },
    {
      name: "status",
      title: "Statuss",
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
    filter.current = {
      page: 1,
      pageSize: 10,
      name: undefined,
      severity: undefined,
      ruleType: undefined,
      code: undefined,
    };

    refetch();
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

    refetch();
  }

  function tableActionClicked(event: TableActionEvent) {
    if (event.name === "1") {
      setEditItems(event.data);
      setShowModal(true);
    }
    if (event.name === "6") {
      if (!event.data?.isDefault) {
        const allIds = items
          .filter((item) => item?.isDefault)
          .map((it) => it.id);
        handleAddRuleToPolicy([...allIds, event?.data?.id]);
      } else {
        const allIds = policyrule?.data?.data.rules
          .filter((item: any) => item?.id !== event?.data?.id)
          .map((it: any) => it.id);
        handleAddRuleToPolicy(allIds);
      }
    }
  }

  return (
    <div className="mt-[32px]">
      <ComponentsheaderComponent
        backbuttonClick={() => navigate(-1)}
        showbackbutton={true}
        pageName="Rules"
        requiredButton={topActionButtons}
        buttonClick={(e) => {
          modal(e);
        }}
      />

      <div className="mt-20">
        {showEmpty ? (
          <DefaultContent
            pageHeader="Rules"
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
            currentTablePage={filter.current.page}
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

      {showModal && (
        <RuleModal
          editItem={editItems}
          isOpen={showModal}
          handleHide={() => {
            setShowModal(false);
            setEditItems(null);
          }}
        />
      )}
    </div>
  );
};

export default PolicyRule;
