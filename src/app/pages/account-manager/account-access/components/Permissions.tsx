import { useEffect, useState } from "react";
// import { Content } from "../../../../../_metronic/layout/components/content";
import { useGetAccountPermssion } from "../../../../api/api-services/accountQuery";
// import { KTCardBody, KTIcon } from "../../../../../_metronic/helpers";
import { AddPermissionModal } from "./modals/ModalPermissions";
import { UsersListLoading } from "../../../../modules/apps/user-management/users-list/components/loading/UsersListLoading";
import useAlert from "../../../components/useAlert";
// import { Dropdown, DropdownButton } from "react-bootstrap";
import { AccountsApiPermissionsList200Response } from "../../../../api/axios-client";
import TableComponent from "../../../../components/TableComponent";
import { TableColumn } from "../../../../components/models";

const Permissions = () => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<any[]>([]);
  const [editItems, setEditItems] = useState<any | undefined>();
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMess, setErrorMess] = useState("");
  const { showAlert, hideAlert, Alert } = useAlert();
  // const [currentPage, setcurrentPage] = useState<number>(0);

  const { data, isLoading, error } = useGetAccountPermssion(page);
  console.log("permiiiit", data);

  const datastsr: AccountsApiPermissionsList200Response | any = data;
  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    setItems(datastsr?.data?.data?.results);
    setTotalPages(Math.ceil(datastsr?.data?.data?.count / 30));
    console.log(items);
    hideAlert();
    if (error) {
      if (error instanceof Error) {
        showAlert(error?.message || "An unknown error occurred", "danger");
        setErrorMess(error?.message);
      }
    }
  }, [data, error]);

  //new table props
  const actions = ["Edit"];
  const tableHeaders: TableColumn[] = [
    {
      name: "id",
      title: "Id"
    },
    {
      name: "name",
      title: "Name"
    },
  ];
  return (
    <div>
      {
        isLoading ? (
          <UsersListLoading />
        ) : (
          <TableComponent
            placeholder="Search Permission"
            actions={actions}
            totalPages={totalPages}
            errorMessage={errorMess ?? ""}
            tableHeaders={tableHeaders}
            handleDelete={() => {}}
            handleSearch={(e) => handleSearchChange(e)}
            modal= {
              <AddPermissionModal
                editItem={editItems}
                onClearEdit={() => setEditItems(null)}
              />
            }
            filteredItems={items}
            createBtn={true}
            showActionBtn={true}
            setEditItems={setEditItems}
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
              <AddPermissionModal
                editItem={editItems}
                onClearEdit={() => setEditItems(null)}
              />
            </div>
          </div>
          <div className="table-responsive">
            {isLoading ? (
              <UsersListLoading />
            ) : (
              <table
                id="kt_table_users"
                className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer"
              >
                <thead>
                  <tr className="text-start text-bold fw-bolder fs-7 text-uppercase gs-0 text-nowrap">
                    <th>Id</th>
                    <th>Name</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody className="text-gray-600 fw-bold">
                  {filteredItems && filteredItems.length > 0 ? (
                    filteredItems?.map((row, i) => {
                      return (
                        <tr key={row.id}>
                          <td>{row.id}</td>
                          <td>{row.name}</td>
                          <td></td>
                          <td></td>
                          <td></td>
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
              // <TableComponent
              //   filterChange={(e: any) => filterUpdated(e)}
              //   showActions={true}
              //   toggleEditModal={(e) => console.log(e)}
              //   showFilter={true}
              //   actionClick={(e: any) => tableActionClicked(e)}
              //   actions={tableActions}
              //   userData={items}
              //   tableColum={tableColumns}
              //   totalItems={totalPages}
              //   currentTablePage={currentPage}
              //   loading={isLoading}
              //   InputFileName="Leave History List"
              //   filterFields={filterFields}
              //   showCheckBox={true}
              //   bulkactionClicked={(e: any) => handleBulkAction(e)}
              //   Bulkactions={Bulkactions}
              //   showBulkAction={true}
              //   actionChecked={() => {}}
              //   actionBulkChecked={() => {}}
              //   pageChange={() => {}}
              //   dateRangeChanged={() => {}}
              //   toggleColumnsEvent={() => {}}
              //   toggleCustomFilter={() => {}}
              //   sortOptionSelected={() => {}}
              // />
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

export default Permissions;
