import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MainTableComponent } from "../../components/tableComponents/maincomponent/maintable";
import { useGetAssets } from "../../api/api-services/systemQuery";
import {
  ACTIONS,
  ColumnTypes,
  TableAction,
  TableActionEvent,
  TableColumn,
} from "../../components/models";
import DefaultContent from "../../components/defaultContent/defaultContent";
import { SystemSettingsAssetManagementsList200Response } from "../../api/axios-client";
import useAlert from "../components/useAlert";
import AssetModal from "./modals/AssetModal";
import { ComponentsheaderComponent } from "../../components/componentsheader/componentsheader.component";
import axios from "axios";

const Assets = () => {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { showAlert, hideAlert } = useAlert();
  const [showModal, setShowModal] = useState(false);
  const [showEmpty, setshowEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [action, setAction] = useState("");
  const currentPage = 0;
  const [totalItems, settotalItems] = useState<number>(0);
  const navigate = useNavigate();
  const [editItems, setEditItems] = useState<any | undefined>();
  const filter = useRef<any>({
    page: 1,
    pageSize: 10,
    services: undefined,
    ruleCode: undefined,
  });
  const filterFields: TableColumn[] = [
    { name: "services", title: "Service", type: ColumnTypes.Text },
    { name: "ruleCode", title: "Rule Code", type: ColumnTypes.Text },
  ];
  const tableActions: TableAction[] = [
    { name: ACTIONS.EDIT, label: "Edit" },
    { name: ACTIONS.VIEW, label: "View" },
  ];

  const tableColumns: TableColumn[] = [
    {
      name: "id",
      title: "Id",
      type: ColumnTypes.Text,
    },
    {
      name: "resource_types",
      title: "Resource Type",
      type: ColumnTypes.Text,
    },
    {
      name: "rule_code",
      title: "Rule Code",
      type: ColumnTypes.Text,
    },

    {
      name: "services",
      title: "Services",
      type: ColumnTypes.Text,
    },
    {
      name: "cloud_identifier",
      title: "Cloud Identifier",
      type: ColumnTypes.Text,
    },
    {
      name: "cloud_provider",
      title: "Cloud Provider",
      type: ColumnTypes.Text,
    },
    {
      name: "region",
      title: "Region",
      type: ColumnTypes.Text,
    },
  ];

  const handleGetAllAssets = async () => {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    try {
      const resp = await axios.get(
        `https://cspm-api.midrapps.com/system_settings/asset_managements/?page=${
          filter.current.page
        }&page_size=${filter.current.pageSize}&services=${
          filter.current.services ? filter.current.services : ""
        }&rule_code=${filter.current.ruleCode ? filter.current.ruleCode : ""}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resp.status === 200) {
        setItems(resp?.data?.data?.results);
        setshowEmpty(
          resp?.data?.data?.results
            ? resp?.data?.data?.results?.length === 0
            : true
        );
        settotalItems(Math.ceil(resp?.data?.data?.count));
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  // const { data, isLoading, error, refetch } = useGetAssets({ ...filterFields });
  // const datastsr: SystemSettingsAssetManagementsList200Response | any = data;
  useEffect(() => {
    handleGetAllAssets();
  }, []);

  const topActionButtons = [
    { name: "add_new_user", label: "Add Asset", icon: "plus", outline: false },
  ];
  function modal(buttion: any) {
    if (buttion === "add_new_user") {
      setShowModal(true);
      setAction("create");
      setEditItems(null);
    }
  }
  function refreshrecord() {
    filter.current = {
      page: 1,
      pageSize: 10,
      services: undefined,
      ruleCode: undefined,
    };
    handleGetAllAssets();
  }
  function filterUpdated(data: any) {
    filter.current = {
      page: data?.page ?? 1,
      pageSize: data?.pageSize ?? 10,
      services: data?.services,
      ruleCode: data?.ruleCode,
    };
    handleGetAllAssets();
  }
  function tableActionClicked(event: TableActionEvent) {
    if (event.name === "1") {
      setEditItems(event.data);
      setAction("edit");
      setShowModal(true);
    }
    if (event.name === "3") {
      navigate(`/assets/assets-list/${event.data.id}`);
      // handleDelete(event.data.id);
    }
  }

  return (
    <div className="mt-[32px]">
      <ComponentsheaderComponent
        backbuttonClick={() => {}}
        pageName="Assets"
        requiredButton={topActionButtons}
        buttonClick={(e) => {
          modal(e);
        }}
      />

      {showEmpty ? (
        <DefaultContent
          pageHeader="All Assets"
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
          totalItems={totalItems}
          currentTablePage={currentPage}
          loading={isLoading}
          InputFileName="All Assets"
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

      {showModal && (
        <AssetModal
          isOpen={showModal}
          editItem={editItems}
          handleHide={() => setShowModal(false)}
          action={action}
        />
      )}
    </div>
  );
};

export default Assets;
