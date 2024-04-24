import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetTickets } from "../../../api/api-services/ticketQuery";
import { UsersListLoading } from "../../../modules/apps/user-management/users-list/components/loading/UsersListLoading";
import useAlert from "../../components/useAlert";
// import { Dropdown, DropdownButton } from "react-bootstrap";
import { TicketsTicketTypesList200Response } from "../../../api/axios-client";
import { ModalTicketsList } from "./modals/ModalTicketsList";
import {
  ACTIONS,
  ColumnTypes,
  TableAction,
  TableActionEvent,
  TableColumn,
} from "../../../components/models";
import { ComponentsheaderComponent } from "../../../components/componentsheader/componentsheader.component";
import { MainTableComponent } from "../../../components/tableComponents/maincomponent/maintable";
import DefaultContent from "../../../components/defaultContent/defaultContent";
import {
  IStatus,
  MyColor,
} from "../../../components/tableComponents/status/status";

export class TicketWithStatus implements IStatus {
  id: string = "";
  ticket_type_id: string = "";
  ticket_type_name: string = "";
  ticket_type_code: string = "";
  ticket_type_status: string = "";
  description: string = "";
  code: string = "";
  subject: string = "";
  asset_id: string = "";
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
    this.asset_id = ticket.asset_id;
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
const TicketsTickets = () => {
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
  const navigate = useNavigate();

  const filterFields: TableColumn[] = [
    { name: "keyword", title: "Keyword", type: ColumnTypes.Text },
  ];
  const tableActions: TableAction[] = [
    { name: ACTIONS.EDIT, label: "Edit" },
    { name: ACTIONS.VIEW, label: "View Activities" },
    // { name: ACTIONS.DELETE, label: "Delete" },
  ];
  const tableColumns: TableColumn[] = [
    {
      name: "asset_id",
      title: "Asset ID",
      type: ColumnTypes.Text,
    },
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

  const { data, isLoading, error } = useGetTickets(page);
  console.log(data);

  const datastsr: TicketsTicketTypesList200Response | any = data;

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
    setshowEmpty(
      datastsr?.data?.data?.results
        ? datastsr?.data?.data?.results.length === 0
        : true
    );
    settotalItems(Math.ceil(datastsr?.data?.data?.count));
    console.log(items);
    hideAlert();
    if (error) {
      if (error instanceof Error) {
        setErrorMess(error?.message);
        showAlert(error?.message || "An unknown error occurred", "danger");
      }
    }
  }, [data, error]);

  const topActionButtons = [
    { name: "add_new_user", label: "Add Ticket", icon: "plus", outline: false },
  ];
  function modal(buttion: any) {
    if (buttion === "add_new_user") {
      setShowModal(true);
      setEditItems(null);
    }
  }
  function refreshrecord() {
    useGetTickets(1);
  }
  function filterUpdated(filter: any) {
    filter.current = { ...filter.current, ...filter };
    let nfilter = filter.current;
    nfilter.pageIndex = filter.page;
    filter.current = nfilter;
    useGetTickets(1);
  }
  function tableActionClicked(event: TableActionEvent) {
    if (event.name === "1") {
      setEditItems(event.data);
      setShowModal(true);
    }
    if (event.name === "3") {
      navigate(`/tickets/ticket-activities/${event.data.id}`);
      // handleDelete(event.data.id);
    }
  }

  console.log(items);
  return (
    <div>
      <ComponentsheaderComponent
        backbuttonClick={() => {}}
        pageName="Tasks"
        requiredButton={topActionButtons}
        buttonClick={(e) => {
          modal(e);
        }}
      />
      {showEmpty ? (
        <DefaultContent
          pageHeader="All Tasks"
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
          InputFileName="All "
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
        <ModalTicketsList
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
      {/* <Content>
        <KTCardBody className="py-4">
          <div
            className="d-flex justify-content-between align-self-center flex-wrap"
            data-kt-user-table-toolbar="base"
          >
            <div className="d-flex align-items-center position-relative my-1 mb-3 ">
              <KTIcon
                iconName="magnifier"
                className="fs-1 position-absolute ms-6"
              />
              <input
                type="text"
                className="form-control form-control-solid w-250px ps-14"
                placeholder="Search Tickets"
                onChange={handleSearchChange}
              />
            </div>
            <div className="mt-2">
              <ModalTicketsList
                  editItem={editItems}
                  onClearEdit={() => setEditItems(null)}
                />
            </div>
          </div>
          <div className="table-responsive">
            {isLoading ? (
              <UsersListLoading />
            ) : (
              <table className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer">
                <thead>
                  <tr className="text-start text-bold fw-bolder fs-7 text-uppercase gs-0 text-nowrap">
                    <th>Asset</th>
                    <th>Name</th>
                    <th>Assigned to</th>
                    <th>Code</th>
                    <th>Created By</th>
                    <th>Status</th>
                    <th>Description</th>
                    <th>Tenant</th>
                    <th>Subject</th>
                    <th>Ticket Type</th>
                  </tr>
                </thead>

                <tbody className="text-gray-600 fw-bold">
                  {filteredItems && filteredItems.length > 0 ? (
                    filteredItems?.map((row, i) => {
                      return (
                        <tr key={row?.id}>
                          <td>{row?.asset?.name}</td>
                          <td>{row?.asset}</td>
                          <td>{row?.assigned_to?.first_name}</td>
                          <td>{row?.code}</td>
                          <td>{row?.created_by}</td>
                          <td>{row?.description}</td>
                          <td>
                            {row?.status ? "True" : "False"}
                          </td>
                          <td>{row?.subject}</td>
                          <td>{row?.tenant}</td>
                          <td>{row?.ticket_type?.name}</td>
                          <td> 
                            <div>
                              <DropdownButton
                                id="dropdown-button-dark-example1"
                                variant="secondary"
                                title="Actions"
                                size="sm"
                              >
                                <Dropdown.Item
                                  onClick={() => setEditItems(row)}
                                >
                                  Edit
                                </Dropdown.Item>
                              </DropdownButton>
                            </div>
                          </td> 
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={7}>
                        <Alert />
                        <div className="d-flex text-center w-100 align-content-center justify-content-center">
                          No matching records found
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
          <nav aria-label="Page navigation">
            <ul className="pagination mt-5">
              <span className="page-link"></span>
              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={goToPreviousPage}>
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index}
                  className={`page-item ${page === index + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => goToPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${page === totalPages ? "disabled" : ""}`}
              >
                <button className="page-link" onClick={goToNextPage}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </KTCardBody>
      </Content> */}
    </div>
  );
};
export default TicketsTickets;
