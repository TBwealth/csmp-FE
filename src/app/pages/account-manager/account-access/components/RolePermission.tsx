import { useEffect, useState } from "react";
// import { Content } from "../../../../../_metronic/layout/components/content";
import {
  useGetAccountRolesPermission,
  useGetAccountPermssion,
} from "../../../../api/api-services/accountQuery";
// import { KTCardBody, KTIcon } from "../../../../../_metronic/helpers";
import { AddRolePermissionModal } from "./modals/ModalRolePermission";
import { UsersListLoading } from "../../../../modules/apps/user-management/users-list/components/loading/UsersListLoading";
import useAlert from "../../../components/useAlert";
// import { Dropdown, DropdownButton } from "react-bootstrap";
import { AccountsApiRolePermissionsList200Response } from "../../../../api/axios-client";
// import { useQuery } from "react-query";
import {
  ACTIONS,
  ColumnTypes,
  TableAction,
  TableActionEvent,
  TableColumn,
} from "../../../../components/models";
import TableComponent from "../../../../components/TableComponent";
import { ComponentsheaderComponent } from "../../../../components/componentsheader/componentsheader.component";
import DefaultContent from "../../../../components/defaultContent/defaultContent";
import { MainTableComponent } from "../../../../components/tableComponents/maincomponent/maintable";

const RolePermission = () => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<any[]>([]);
  const [perms, setPerms] = useState<any[]>([]);
  const [editItems, setEditItems] = useState<any | undefined>();
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMess, setErrorMess] = useState("");
  const { showAlert, hideAlert } = useAlert();
  const [showModal, setShowModal] = useState(false);
  const [showEmpty, setshowEmpty] = useState<boolean>(false);
  const currentPage = 0;
  const [totalItems, settotalItems] = useState<number>(0);
  const { data, isLoading, error } = useGetAccountRolesPermission(page);
  const { data:permissions,  } = useGetAccountPermssion(page);
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
      name: "permission",
      title: "Permission",
      type: ColumnTypes.Text,
    },
    {
      name: "permission_id",
      title: "Permission Id",
      type: ColumnTypes.Text,
    },
    {
      name: "role",
      title: "Role",
      type: ColumnTypes.Text,
    },
    {
      name: "role_id",
      title: "Role Id",
      type: ColumnTypes.Text,
    },
  ];

  const datastsr: AccountsApiRolePermissionsList200Response | any = data;

  useEffect(() => {
    setItems(datastsr?.data?.data?.results);
    setshowEmpty(datastsr?.data?.data?.results ? datastsr?.data?.data?.results?.length === 0: true);
    settotalItems(Math.ceil(datastsr?.data?.data?.count));
    hideAlert();
    if (error) {
      if (error instanceof Error) {
        setErrorMess(error?.message);
        showAlert(error?.message || "An unknown error occurred", "danger");
      }
    }
  }, [data, error]);

  // const handleDelete = (id: any) => {
  //   hideAlert();
  //   console.log(id);
  //   const isConfirmed = window.confirm("Are you sure you want to delete?");
  //   if (isConfirmed) {
  //     mutate(id, {
  //       onError: (err) => {
  //         if (err instanceof Error) {
  //           showAlert("Error, Unable to Delete", "danger");
  //         }
  //       },
  //     });
  //   } else {
  //     console.log("failed");
  //     console.log(id);
  //   }
  // };

  const topActionButtons = [
    {
      name: "add_new_user",
      label: "Add Role Premission",
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
    useGetAccountRolesPermission(1);
  }
  function filterUpdated(filter: any) {
    filter.current = { ...filter.current, ...filter };
    let nfilter = filter.current;
    nfilter.pageIndex = filter.page;
    filter.current = nfilter;
    useGetAccountRolesPermission(1);
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
        pageName="Role Permission"
        requiredButton={topActionButtons}
        buttonClick={(e) => {
          modal(e);
        }}
      />

      {showEmpty ? (
        <DefaultContent
          pageHeader="All Role Permission"
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
        InputFileName="All Role Permission"
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
        <AddRolePermissionModal
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
                placeholder="Search Permission"
                onChange={handleSearchChange}
              />
            </div>
            <div className="mt-2">
              <AddRolePermissionModal
                editItem={editItems}
                onClearEdit={() => setEditItems(null)}
              />
            </div>
          </div>
          <Alert />
          <div className="table-responsive">
            {isLoading || deleteLoading ? (
              <UsersListLoading />
            ) : (
              <table
                id="kt_table_users"
                className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer"
              >
                <thead>
                  <tr className="text-start text-bold fw-bolder fs-7 text-uppercase gs-0 text-nowrap">
                    <th>Id</th>
                    <th>Permission</th>
                    <th>Permission Id</th>
                    <th>Role</th>
                    <th>Role Id</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody className="text-gray-600 fw-bold">
                  {filteredItems && filteredItems.length > 0 ? (
                    filteredItems?.map((row, i) => {
                      return (
                        <tr key={row.id}>
                          <td>{row.id}</td>
                          <td>{row.permission}</td>
                          <td>{row.permission_id}</td>
                          <td>{row.role}</td>
                          <td>{row.role_id}</td>
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
                                <Dropdown.Item
                                  onClick={() => handleDelete(row?.id)}
                                >
                                  Delete
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

export default RolePermission;
