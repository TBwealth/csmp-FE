import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetTickets,
  useGetTicketsTypes,
} from "../../../api/api-services/ticketQuery";
import { useGetAssets } from "../../../api/api-services/systemQuery";
import { UsersListLoading } from "../../../modules/apps/user-management/users-list/components/loading/UsersListLoading";
import useAlert from "../../components/useAlert";
// import { Dropdown, DropdownButton } from "react-bootstrap";
import {
  AccountsApiTenantsList200Response,
  SystemSettingsAssetManagementsList200Response,
  TicketsTicketTypesList200Response,
} from "../../../api/axios-client";
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
import { useGetAccountTenant } from "../../../api/api-services/accountQuery";
import axios from "axios";

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
  status: string = "";

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
    this.asset_name = ticket.asset_name;
    this.asset_description = ticket.asset_description;
    this.createdBy = ticket.createdBy;
    this.tenant = ticket.tenant;
    this.assigned_to_id = ticket.assigned_to_id;
    this.assigned_to_first_name = ticket.assigned_to_first_name;
    this.assigned_to_last_name = ticket.assigned_to_last_name;
    this.assigned_to_email = ticket.assigned_to_email;
  }

  getStatusLabel() {
    if (this.status === "CLOSED") return "Closed";
    if (this.status === "OPEN") return "Open";
    return "Pending";
  }
  getStatusColor() {
    if (this.status === "OPEN") return new MyColor(0, 175, 175);
    if (this.status === "CLOSED") return new MyColor(242, 0, 74);
    return new MyColor(242, 153, 74);
  }
}
const TicketsTickets = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editItems, setEditItems] = useState<any | undefined>();
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const { showAlert, hideAlert } = useAlert();
  const [errorMess, setErrorMess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEmpty, setshowEmpty] = useState<boolean>(true);
  const currentPage = 0;
  const [totalItems, settotalItems] = useState<number>(0);
  const navigate = useNavigate();
  const filter = useRef<any>({
    asset: undefined,
    assignedTo: undefined,
    ticketType: undefined,
    page: 1,
    pageSize: 10,
  });

  const [filterFields, setFilterFields] = useState<TableColumn[]>([
    {
      name: "asset",
      title: "Asset",
      type: ColumnTypes.Text,
      // listValue: [],
      // listIdField: "id",
      // listTextField: "name",
    },
    {
      name: "assignedTo",
      title: "Assigned To",
      type: ColumnTypes.Text,
      // listValue: [],
      // listIdField: "id",
      // listTextField: "name",
    },
    {
      name: "ticketType",
      title: "Ticket Type",
      type: ColumnTypes.List,
      listValue: [],
      listIdField: "id",
      listTextField: "name",
    },
  ]);
  const tableActions: TableAction[] = [
    { name: ACTIONS.EDIT, label: "Edit" },
    { name: ACTIONS.VIEW, label: "View Activities" },
    // { name: ACTIONS.DELETE, label: "Delete" },
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
        { key: "OPEN", value: "Open" },
        { key: "CLOSE", value: "Close" },
        { key: "PENDING", value: "Pending" },
      ],
    },
  ];

  // const { data: tenantData } = useGetAccountTenant({ page: 1, pageSize: 100 });
  // const tenantstsr: AccountsApiTenantsList200Response | any = tenantData;
  const handleFetchAssets = async () => {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    try {
      const resp = await axios.get(
        `https://cspm-api.midrapps.com/tickets/api/v1/tickets/?page=${
          filter.current.page
        }&page_size=${filter.current.pageSize}&asset=${
          filter.current.asset ? filter.current.asset : ""
        }&assigned_to=${
          filter.current.assignedTo ? filter.current.assignedTo : ""
        }&ticket_type=${
          filter.current.ticketType ? filter.current.ticketType : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resp.status === 200) {
        const mapped = resp?.data?.data?.results.map((res: any) => {
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
        if (mapped) {
          setItems(mapped.map((x: any) => new TicketWithStatus(x)));
        }
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

  const { data: ticketTypes } = useGetTicketsTypes({ page: 1, pageSize: 100 });
  const ticketstsr: TicketsTicketTypesList200Response | any = ticketTypes;
  // const { data, isLoading, error, refetch } = useGetTickets({
  //   ...filter.current,
  // });
  // const datastsr: TicketsTicketTypesList200Response | any = data;
  // const { data: assets } = useGetAssets({ page: 1, pageSize: 1000 });
  // const assetstsr: SystemSettingsAssetManagementsList200Response | any = assets;

  useEffect(() => {
    handleFetchAssets();
  }, []);
  useEffect(() => {
    // if (assetstsr?.data?.data?.results) {
    //   const trans: TableColumn[] = filterFields.map((res: any) => {
    //     if (res.name === "asset") {
    //       return {
    //         ...res,
    //         listValue: assetstsr.data?.data?.results.map((res: any) => {
    //           return {
    //             id: res?.id,
    //             name: res?.name
    //           }
    //         }),
    //       };
    //     } else return res;
    //   });
    //   setFilterFields([...trans]);
    // }
    // if (tenantstsr?.data?.data?.results) {
    //   const trans: TableColumn[] = filterFields.map((res: any) => {
    //     if (res.name === "assignedTo") {
    //       return {
    //         ...res,
    //         listValue: tenantstsr.data?.data?.results.map((res: any) => {
    //           return { id: res?.id, name: res?.name };
    //         }),
    //       };
    //     } else return res;
    //   });
    //   setFilterFields([...filterFields, ...trans]);
    // }
    if (ticketstsr?.data?.data?.results) {
      setFilterFields(
        filterFields.map((res: any) => {
          if (res.name === "ticketType") {
            return {
              ...res,
              listValue: ticketstsr.data?.data?.results,
            };
          } else return res;
        })
      );
    }
  }, [ticketstsr]);

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
    filter.current = {
      page: 1,
      pageSize: 10,
      asset: undefined,
      assignedTo: undefined,
      ticketType: undefined,
    };
    handleFetchAssets();
  }
  function filterUpdated(data: any) {
    filter.current = {
      page: data?.page ?? 1,
      pageSize: data?.pageSize ?? 10,
      asset: data?.asset,
      assignedTo: data?.assignedTo,
      ticketType: data?.ticketType,
    };
    handleFetchAssets();
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

  return (
    <div className="mt-[32px]">
      <ComponentsheaderComponent
        backbuttonClick={() => {}}
        pageName="Tasks"
        requiredButton={topActionButtons}
        buttonClick={(e) => {
          modal(e);
        }}
      />
      {(showEmpty || isLoading) ? (
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
          handleRefetch={handleFetchAssets}
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
