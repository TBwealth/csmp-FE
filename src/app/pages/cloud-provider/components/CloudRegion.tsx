import { useState, useEffect } from "react";
import { MainTableComponent } from "../../../components/tableComponents/maincomponent/maintable";
import {
 useGetRegions,
 useCreateRegion
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

const CloudRegion = () => {
    const [items, setItems] = useState<any[]>([]);
  const { showAlert, hideAlert } = useAlert();
  const [showModal, setShowModal] = useState(false);
  const [showEmpty, setshowEmpty] = useState(false);
  const currentPage = 0;
  const [totalItems, settotalItems] = useState<number>(0);
  const [editItems, setEditItems] = useState<any | undefined>();
  const filterFields: TableColumn[] = [
    { name: "keyword", title: "Keyword", type: ColumnTypes.Text },
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
      name: "longitude",
      title: "Longitude",
      type: ColumnTypes.Text,
    },
    {
      name: "latitude",
      title: "Latitude",
      type: ColumnTypes.Text,
    },
  ];
  const { data, isLoading, error } = useGetRegions(1);
  const datastsr: SystemSettingsRegionsList200Response | any = data;
  useEffect(() => {
    setItems(datastsr?.data?.data?.results);
    setshowEmpty(
      datastsr?.data?.data?.results
        ? datastsr?.data?.data?.results?.length === 0
        : true
    );
    settotalItems(Math.ceil(datastsr?.data?.data?.count));
    hideAlert();
    if (error) {
      if (error instanceof Error) {
        showAlert(error?.message || "An unknown error occurred", "danger");
        // setErrorMess(error?.message);
      }
    }
  }, [data, error]);
  
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
    useGetRegions(1);
  }
  function filterUpdated(filter: any) {
    filter.current = { ...filter.current, ...filter };
    let nfilter = filter.current;
    nfilter.pageIndex = filter.page;
    filter.current = nfilter;
    useGetRegions(1);
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
    <div>
        <ComponentsheaderComponent
        backbuttonClick={() => {}}
        pageName="Regions"
        requiredButton={topActionButtons}
        buttonClick={(e) => {
          modal(e);
        }}
      />
      
      {showEmpty ? (
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
          currentTablePage={currentPage}
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
          editItem={editItems}
          handleHide={() => setShowModal(false)}
        />
      )}
    </div>
  )
}

export default CloudRegion