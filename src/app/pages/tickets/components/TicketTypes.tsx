import { useEffect, useRef, useState } from "react";
import { useGetTicketsTypes } from "../../../api/api-services/ticketQuery";
import useAlert from "../../components/useAlert";
import { TicketsTicketTypesList200Response } from "../../../api/axios-client";
import { ModalTicketTypes } from "./modals/ModalTicketTypes";
import {
  ACTIONS,
  ColumnTypes,
  TableAction,
  TableActionEvent,
  TableColumn,
} from "../../../components/models";
import { MainTableComponent } from "../../../components/tableComponents/maincomponent/maintable";
import DefaultContent from "../../../components/defaultContent/defaultContent";
import { ComponentsheaderComponent } from "../../../components/componentsheader/componentsheader.component";
import {
  IStatus,
  MyColor,
} from "../../../components/tableComponents/status/status";
import axios from "axios";

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
    if (this.status) return new MyColor(0, 175, 175);
    if (!this.status) return new MyColor(242, 153, 74);
    return new MyColor(242, 0, 74);
  }
}

const TicketTypes = () => {
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
  const [showEmpty, setshowEmpty] = useState<boolean>(false);
  const currentPage = 0;
  const [totalItems, settotalItems] = useState<number>(0);
  const filter = useRef<any>({
    page: 1,
    pageSize: 10,
    status: undefined,
    name: undefined,
  });
  const filterFields: TableColumn[] = [
    { name: "name", title: "Name", type: ColumnTypes.Text },
    // { name: "code", title: "Code", type: ColumnTypes.Text },
    {
      name: "status",
      title: "Status",
      type: ColumnTypes.List,
      listValue: [
        {
          id: false,
          name: "Inactive",
        },
        {
          id: true,
          name: "Active",
        },
      ],
      listIdField: "id",
      listTextField: "name",
    },
  ];
  const tableActions: TableAction[] = [{ name: ACTIONS.EDIT, label: "Edit" }];
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
  // const { data, isLoading, error, refetch } = useGetTicketsTypes({
  //   ...filter.current,
  // });
  // console.log(data);

  const handleFetchAllTicketTypes = async () => {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    try {
      const resp = await axios.get(
        `https://cspm-api.midrapps.com/tickets/api/v1/ticket_types/?name=${
          filter.current.name ? filter.current.name : ""
        }&status=${
          filter.current.status !== undefined ? filter.current.status : ""
        }&page=${filter.current.page}&page_size=${filter.current.pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resp.status === 200) {
        setItems(
          resp?.data?.data?.results.map((x: any) => new TicketWithStatus(x))
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

  // const datastsr: TicketsTicketTypesList200Response | any = data;

  useEffect(() => {
    handleFetchAllTicketTypes();
  }, []);

  const filteredItems = items?.filter((item) =>
    item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const topActionButtons = [
    {
      name: "add_new_user",
      label: "Add Ticket Type",
      icon: "plus",
      outline: false,
    },
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
      status: undefined,
      name: undefined,
    };
    handleFetchAllTicketTypes();
  }
  function filterUpdated(data: any) {
    console.log(data);
    filter.current = {
      page: data?.page ?? 1,
      pageSize: data?.pageSize ?? 10,
      name: data?.name,
      status: data?.status,
    };

    handleFetchAllTicketTypes();
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
    <div className="mt-[32px]">
      <ComponentsheaderComponent
        backbuttonClick={() => {}}
        pageName="Tickets Types"
        requiredButton={topActionButtons}
        buttonClick={(e) => {
          modal(e);
        }}
      />
      {(showEmpty || isLoading) ? (
        <DefaultContent
          pageHeader="All Tickets Types"
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
          InputFileName="All Tickets Types"
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
          InputFileName="All Tickets Types"
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
      )} */}

      {showModal && (
        <ModalTicketTypes
          editItem={editItems}
          isOpen={showModal}
          handleRefetch={handleFetchAllTicketTypes}
          handleHide={() => {
            setShowModal(false);
            setEditItems(false);
          }}
          onClearEdit={() => {
            setEditItems(null);
          }}
        />
      )}
    </div>
  );
};
export default TicketTypes;
