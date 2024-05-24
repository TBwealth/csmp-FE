import { useEffect, useRef, useState } from "react";
import { Content } from "../../../../../_metronic/layout/components/content";
import {
  useGetAccountUsers,
} from "../../../../api/api-services/accountQuery";
import { KTCardBody, KTIcon } from "../../../../../_metronic/helpers";
import { UsersListLoading } from "../../../../modules/apps/user-management/users-list/components/loading/UsersListLoading";
import useAlert from "../../../components/useAlert";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { AccountsApiUsersList200Response } from "../../../../api/axios-client";
import { ModalAllUser } from "./modals/ModalAllUser";
import {
  ACTIONS,
  ColumnTypes,
  TableAction,
  TableActionEvent,
  TableColumn,
} from "../../../../components/models";
import { useNavigate } from "react-router-dom";
import { ComponentsheaderComponent } from "../../../../components/componentsheader/componentsheader.component";
import { MainTableComponent } from "../../../../components/tableComponents/maincomponent/maintable";
import DefaultContent from "../../../../components/defaultContent/defaultContent";

const AllUsers = () => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<any[]>([]);
  const [editItems, setEditItems] = useState<any | undefined>();
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMess, setErrorMess] = useState("");
  const { showAlert, hideAlert } = useAlert();
  const [showModal, setShowModal] = useState(false);
  const [showEmpty, setshowEmpty] = useState<boolean>(false);
  const currentPage = 0;
  const [totalItems, settotalItems] = useState<number>(0);
  const filter = useRef<any>({
    page: 1,
    pageSize: 10,
    firstName: undefined,
    lastName: undefined,
    email: undefined
  })
  const navigate = useNavigate()

  const filterFields: TableColumn[] = [
    { name: "first_name", title: "First Name", type: ColumnTypes.Text },
    { name: "last_name", title: "Last Name", type: ColumnTypes.Text },
    { name: "email", title: "Email", type: ColumnTypes.Text },
  ];
  const tableActions: TableAction[] = [
    { name: ACTIONS.EDIT, label: "Edit" },
    { name: ACTIONS.VIEW, label: "View Profile" },
  ];
  const tableColumns: TableColumn[] = [
    {
      name: "id",
      title: "Id",
      type: ColumnTypes.Text,
    },
    {
      name: "first_name",
      title: "First Name",
      type: ColumnTypes.Text,
    },
    {
      name: "last_name",
      title: "Last Name",
      type: ColumnTypes.Text,
    },
    {
      name: "email",
      title: "Email",
      type: ColumnTypes.Text,
    },
  ];

  const { data, isLoading, error, refetch } = useGetAccountUsers({...filter.current});



  const datastsr: AccountsApiUsersList200Response | any = data;

  useEffect(() => {
    setItems(datastsr?.data?.data?.results.map((res: any) => {
      return {
        id: res?.id,
        first_name: res?.first_name,
        last_name: res?.last_name,
        email: res?.email,
        role: res?.role?.name.toLowerCase(),
        role_id: res?.role?.id,
        tenant: res?.tenant?.full_name,
        tenant_id: res?.tenant?.id,
      }
    }));
    setshowEmpty(datastsr?.data?.data?.results ? datastsr?.data?.data?.results?.length === 0: true);
    settotalItems(Math.ceil(datastsr?.data?.data?.count));
    hideAlert();
    if (error) {
      if (error instanceof Error) {
        showAlert(error?.message || "An unknown error occurred", "danger");
        setErrorMess(error?.message);
      }
    }
  }, [data, error]);

  const topActionButtons = [
    { name: "add_new_user", label: "Add User", icon: "plus", outline: false },
  ];
  function modal(buttion: any) {
    if (buttion === "add_new_user") {
      setShowModal(true);
      setEditItems(null);
    }
  }
  function refreshrecord() {
    filter.current = {
      page:1, 
      pageSize: 10,
      firstName: undefined,
      lastName: undefined,
      email: undefined
    }
    refetch();
  }
  function filterUpdated(data: any) {
    filter.current = {
      page: data?.page ?? 1,
      pageSize: data?.pageSize ?? 10,
      firstName: data?.first_name,
      lastName: data?.last_name,
      email: data?.email
    };
    refetch()
  }
  function tableActionClicked(event: TableActionEvent) {
    if (event.name === "1") {
      setEditItems(event.data);
      setShowModal(true);
    }
    if (event.name === "3") {
      navigate(`/account-manager/users/all-users/${event.data.id}`);
      // handleDelete(event.data.id);
    }
  }

  return (
    <div>
      <ComponentsheaderComponent
        backbuttonClick={() => {}}
        pageName="Users"
        requiredButton={topActionButtons}
        buttonClick={(e) => {
          modal(e);
        }}
      />

      {showEmpty ? (
        <DefaultContent
          pageHeader="All Users"
          pageDescription="No record found"
          loading={isLoading}
          buttonValue="Refresh"
          buttonClick={() => refreshrecord()}
        />
      ): (
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
          InputFileName="All Users"
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
      )} */}

      {showModal && (
        <ModalAllUser
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
      {/* 
      {isLoading || deleteLoading ? (
        <UsersListLoading />
      ) : (
        <TableComponent
          placeholder="Search Users"
          actions={actions}
          title="All Users"
          totalPages={totalPages}
          errorMessage={errorMess ?? ""}
          handleDelete={handleDelete}
          handleSearch={(e) => handleSearchChange(e)}
          tableHeaders={tableHeaders}
          modal={<></> }
          filteredItems={filteredItems}
          createBtn={false}
          showActionBtn={false}
          setEditItems={setEditItems}
        />
      )} */}
      {/* <Content>
        <KTCardBody className="py-4">
          <ModalAllUser
            editItem={editItems}
            onClearEdit={() => setEditItems(null)}
          />
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
                placeholder="Search Permission"
                onChange={handleSearchChange}
              />
            </div>
            <div className="mt-2"></div>
          </div>
          <div className="table-responsive">
            {isLoading || deleteLoading ? (
              <UsersListLoading />
            ) : (
              <table className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer">
                <thead>
                  <tr className="text-start text-bold fw-bolder fs-7 text-uppercase gs-0 text-nowrap">
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Tenant</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody className="text-gray-600 fw-bold">
                  {filteredItems && filteredItems.length > 0 ? (
                    filteredItems?.map((row, i) => {
                      return (
                        <tr key={row.id}>
                          <td>{row.id}</td>
                          <td>{row.first_name}</td>
                          <td>{row.last_name}</td>
                          <td>{row.email}</td>
                          <td>{row.role?.name}</td>
                          <td>{row.tenant}</td>
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

export default AllUsers;
