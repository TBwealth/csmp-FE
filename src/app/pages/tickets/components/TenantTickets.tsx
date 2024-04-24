import { useEffect, useState } from "react";
import { ACTIONS, ColumnTypes, TableAction, TableActionEvent, TableColumn } from "../../../components/models";
import { MainTableComponent } from "../../../components/tableComponents/maincomponent/maintable";
import DefaultContent from "../../../components/defaultContent/defaultContent";
import { ComponentsheaderComponent } from "../../../components/componentsheader/componentsheader.component";
import { IStatus, MyColor } from "../../../components/tableComponents/status/status";
import useAlert from "../../components/useAlert";
import { useGetTenantTickets} from "../../../api/api-services/ticketQuery";
import { TicketsTicketsList200Response } from "../../../api/axios-client";
export class TicketWithStatus implements IStatus {
    id: string = "";
  ticket_type_id: string = "";
  ticket_type_name: string = "";
  ticket_type_code: string = "";
  ticket_type_status: string = "";
  description: string = "";
  code: string = "";
  subject: string = "";
  asset_code: string = "";
  asset_name: string = "";
  asset_description: string = "";
  createdBy: string = "";
  tenant: string = "";
  assigned_to_id: string = "";
  assigned_to_first_name: string = "";
  assigned_to_last_name: string = "";
  assigned_to_email: string = "";
  status: boolean = false;
  
    constructor(ticket: any) {
        this.id = ticket.id;
        this.ticket_type_id = ticket.ticket_type_id;
        this.ticket_type_name = ticket.ticket_type_name;
        this.ticket_type_code = ticket.ticket_type_code;
        this.ticket_type_status = ticket.ticket_type_status;
        this.code = ticket.code;
        this.description = ticket.description;
        this.subject = ticket.subject;
        this.status = ticket.status;
        this.asset_code = ticket.asset_code;
        this.asset_name = ticket.asset_code;
        this.asset_description = ticket.asset_description;
        this.createdBy = ticket.createdBy;
        this.tenant = ticket.tenant;
        this.assigned_to_id = ticket.assigned_to_id;
        this.assigned_to_first_name = ticket.assigned_to_first_name;
        this.assigned_to_last_name = ticket.assigned_to_last_name;
        this.assigned_to_email = ticket.assigned_to_email;
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
      name: "asset_name",
      title: "Asset",
      type: ColumnTypes.Text,
    },
    {
      name: "ticket_type_name",
      title: "Ticket Name",
      type: ColumnTypes.Text,
    },
    {
      name: "code",
      title: "Code",
      type: ColumnTypes.Text,
    },
    {
      name: "createdBy",
      title: "Created By",
      type: ColumnTypes.Text,
    },
    {
      name: "subject",
      title: "Subject",
      type: ColumnTypes.Text,
    },
    {
      name: "tenant",
      title: "Tenant",
      type: ColumnTypes.Text,
    },
    {
      name: "assigned_to_first_name",
      title: "Assigned To",
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

  const { data, isLoading, error } = useGetTenantTickets(page);
  console.log(data)

  const datastsr: TicketsTicketsList200Response | any = data;
  useEffect(() => {
    const mapped = datastsr?.data?.data?.results.map((res: any) => {
        return {
          id: res?.id,
          ticket_type_id: res?.ticket_type?.id,
          ticket_type_name: res?.ticket_type?.name,
          ticket_type_code: res?.ticket_type?.code,
          ticket_type_status: res?.ticket_type?.status,
          subject: res?.subject,
          description: res?.description,
          code: res?.code,
          asset_id: res?.asset?.id,
          asset_code: res?.asset?.code,
          asset_name: res?.asset?.name,
          asset_description: res?.asset?.description,
          status: res?.status,
          createdBy: res?.createdBy,
          tenant: res?.tenant,
          assigned_to_id: res?.assigned_to?.id,
          assigned_to_first_name: res?.assigned_to?.first_name,
          assigned_to_last_name: res?.assigned_to?.last_name,
          assigned_to_email: res?.assigned_to?.email,
        };
      });
      if(mapped) {
        setItems(mapped.map((x: any) => new TicketWithStatus(x)));
      }
    setshowEmpty(datastsr?.data?.data?.results ? datastsr?.data?.data?.results?.length === 0 : true);
    settotalItems(Math.ceil(datastsr?.data?.data?.count));
    hideAlert();
    if (error) {
      if (error instanceof Error) {
        setErrorMess(error?.message);
        showAlert(error?.message || "An unknown error occurred", "danger");
      }
    }
  }, [data, error]);

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