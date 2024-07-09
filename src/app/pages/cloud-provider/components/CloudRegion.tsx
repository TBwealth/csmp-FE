import { useState, useEffect, useRef } from "react";
import { MainTableComponent } from "../../../components/tableComponents/maincomponent/maintable";
import {
  useGetRegions,
  useCreateRegion,
} from "../../../api/api-services/systemQuery";
import {
  ACTIONS,
  ColumnTypes,
  TableAction,
  TableActionEvent,
  TableColumn,
} from "../../../components/models";
import useAlert from "../../components/useAlert";
import RegionModal from "./modal/RegionModal";
import DefaultContent from "../../../components/defaultContent/defaultContent";
import { ComponentsheaderComponent } from "../../../components/componentsheader/componentsheader.component";
import { SystemSettingsRegionsList200Response } from "../../../api/axios-client";
import {
  IStatus,
  MyColor,
} from "../../../components/tableComponents/status/status";
import axios from "axios";

export class RegionWithStatus implements IStatus {
  id: string = "";
  cloud_provider: string = "";
  region_name: string = "";
  status: string = "";

  constructor(tenant: any) {
    this.id = tenant.id;
    this.cloud_provider = tenant.cloud_provider;
    this.region_name = tenant.region_name;
    this.status = tenant.status;
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

const CloudRegion = () => {
  const [items, setItems] = useState<any[]>([]);
  const { showAlert, hideAlert } = useAlert();
  const [showModal, setShowModal] = useState(false);
  const [showEmpty, setshowEmpty] = useState(false);
  // const [currentPage, setcurrentPage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [totalItems, settotalItems] = useState<number>(0);
  const [editItems, setEditItems] = useState<any | undefined>();
  const filter = useRef<any>({
    page: 1,
    pageSize: 10,
    code: undefined,
    RegionName: undefined,
  });
  const filterFields: TableColumn[] = [
    { name: "name", title: "Name", type: ColumnTypes.Text },
  ];
  const tableActions: TableAction[] = [
    { name: ACTIONS.EDIT, label: "Edit" },
    // { name: ACTIONS.VIEW, label: "View" },
  ];
  const tableColumns: TableColumn[] = [
    {
      name: "id",
      title: "Id",
      type: ColumnTypes.Text,
    },
    {
      name: "cloud_provider",
      title: "Cloud Provider",
      type: ColumnTypes.Text,
    },
    {
      name: "region_name",
      title: "Name",
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
  // const { data, isLoading, error, refetch } = useGetRegions({...filter.current});
  const handleFetchRegions = async () => {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    try {
      const resp = await axios.get(
        `https://cspm-api.midrapps.com/system_settings/regions/?region_name=${filter.current.regionName ? filter.current.regionName : ""}&page=${filter.current.page}&page_size=${filter.current.pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resp.status === 200) {
        setItems(
          resp?.data?.data?.results.map((x: any) => new RegionWithStatus(x))
        );
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

  useEffect(() => {
    handleFetchRegions();
  }, []);

  const topActionButtons = [
    { name: "add_new_user", label: "Add Region", icon: "plus", outline: false },
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
      code: undefined,
      name: undefined,
    };
    handleFetchRegions();
  }
  function filterUpdated(data: any) {
    console.log(data);
    filter.current = {
      page: data?.page ?? 1,
      pageSize: data?.pageSize ?? 10,
      regionName: data?.name,
    };
    handleFetchRegions();
  }
  function tableActionClicked(event: TableActionEvent) {
    if (event.name === "1") {
      setEditItems(event.data);
      setShowModal(true);
    }
    if (event.name === "3") {
      //   navigate(`/assets/assets-list/${event.data.id}`);
      // handleDelete(event.data.id);
    }
  }

  return (
    <div className="mt-[32px]">
      <ComponentsheaderComponent
        backbuttonClick={() => {}}
        pageName="Regions"
        requiredButton={topActionButtons}
        buttonClick={(e) => {
          modal(e);
        }}
      />

      {showEmpty || isLoading ? (
        <DefaultContent
          pageHeader="All Regions"
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
          currentTablePage={filter.current.page}
          loading={isLoading}
          InputFileName="All Region"
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
        <RegionModal
          isOpen={showModal}
          handleRefetch={handleFetchRegions}
          editItem={editItems}
          handleHide={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default CloudRegion;
