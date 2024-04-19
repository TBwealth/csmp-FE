import { useEffect, useState } from "react";
import { ACTIONS, ColumnTypes, TableAction, TableActionEvent, TableColumn } from "../../../components/models";
import { MainTableComponent } from "../../../components/tableComponents/maincomponent/maintable";
import DefaultContent from "../../../components/defaultContent/defaultContent";
import { ComponentsheaderComponent } from "../../../components/componentsheader/componentsheader.component";
import { IStatus, MyColor } from "../../../components/tableComponents/status/status";
import useAlert from "../../components/useAlert";

export class TicketWithStatus implements IStatus {
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

const TenantTickets = () => {
    const [page, setPage] = useState(1);
  const [items, setItems] = useState<any[]>([]);
  const [editItems, setEditItems] = useState<any | undefined>();
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const { showAlert, hideAlert } = useAlert();
  const [errorMess, setErrorMess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEmpty, setshowEmpty] = useState<boolean>(false);
  const currentPage = 0;
  const [totalItems, settotalItems] = useState<number>(0);
  const filterFields: TableColumn[] = [
    { name: "keyword", title: "Keyword", type: ColumnTypes.Text },
  ];
  const tableActions: TableAction[] = [
    { name: ACTIONS.EDIT, label: "Edit" },
    { name: ACTIONS.DELETE, label: "Delete" },
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
      name: "status",
      title: "Status",
      type: ColumnTypes.Status,
      statusEnum: [
        { key: true, value: "Active" },
        { key: false, value: "InActive" },
      ],
    },
  ];

  useEffect(() => {
    setItems([].map((x: any) => new TicketWithStatus(x)));
    setshowEmpty(true);
    settotalItems(Math.ceil(items.length));
    // hideAlert();
    // if (error) {
    //   if (error instanceof Error) {
    //     setErrorMess(error?.message);
    //     showAlert(error?.message || "An unknown error occurred", "danger");
    //   }
    // }
  }, []);

  const topActionButtons = [
    { name: "add_new_user", label: "Add Tenant Ticket", icon: "plus", outline: false },
  ];
  function modal(buttion: any) {
    if (buttion === "add_new_user") {
      setShowModal(true);
      setEditItems(null);
    }
  }
  function refreshrecord() {
    // useGetTicketsTypes(1);
  }
  function filterUpdated(filter: any) {
    filter.current = { ...filter.current, ...filter };
    let nfilter = filter.current;
    nfilter.pageIndex = filter.page;
    filter.current = nfilter;
    // useGetTicketsTypes(1);
  }
  function tableActionClicked(event: TableActionEvent) {
    if (event.name === "1") {
      setEditItems(event.data);
      setShowModal(true);
    }
    if (event.name === "2") {
      // handleDelete(event.data.id);
    }
  }

  return (
    <div>
        <ComponentsheaderComponent
        backbuttonClick={() => {}}
        pageName="Tenant Tickets"
        requiredButton={topActionButtons}
        buttonClick={(e) => {
          modal(e);
        }}
      />
      {showEmpty ? (
        <DefaultContent
          pageHeader="All Tenants Tickets"
          pageDescription="No record found"
          loading={false}
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
          loading={false}
          InputFileName="All Tenant Tickets"
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

      {/* {showModal && (
        <ModalTicketTypes
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
      )} */}
    </div>
  )
}

export default TenantTickets