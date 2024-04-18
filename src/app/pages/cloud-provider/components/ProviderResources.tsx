import { useEffect, useState } from "react";
import { Content } from "../../../../_metronic/layout/components/content";
import { useGetCloudProviderResourceTypes } from "../../../api/api-services/cloudProviderQuery";
import { KTCardBody, KTIcon } from "../../../../_metronic/helpers";
import { UsersListLoading } from "../../../modules/apps/user-management/users-list/components/loading/UsersListLoading";
import useAlert from "../../components/useAlert";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { CloudProviderProviderResourceTypesList200Response } from "../../../api/axios-client";
import { ModalProviderResources } from "./modal/ModalProviderResources";
import TableComponent from "../../../components/TableComponent";
import { ColumnTypes, TableColumn } from "../../../components/models";


const ProviderResources = () => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<any[]>([]);
  const [editItems, setEditItems] = useState<any | undefined>();
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMess, setErrorMess] = useState("");
  const { showAlert, hideAlert } = useAlert();

  const { data, isLoading, error } = useGetCloudProviderResourceTypes(page);
    console.log('saaaaa', data)
  const datastsr: CloudProviderProviderResourceTypesList200Response | any =
    data;

  useEffect(() => {
    setItems(datastsr?.data?.data?.results);
    setTotalPages(Math.ceil(datastsr?.data?.data?.count / 30));
    console.log(items);
    hideAlert();
    if (error) {
      if (error instanceof Error) {
        setErrorMess(error?.message);
        showAlert(error?.message || "An unknown error occurred", "danger");
      }
    }
  }, [data, error]);

  const filteredItems = items?.filter((item) =>
    item?.cloud_provider?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const actions = ["Edit"];
  const tableHeaders: TableColumn[] = [
    {
      name: "id",
      title: "Id"
    },
    {
      name: "cloud_provider",
      title: "Name",
      type: ColumnTypes.Object,
    },
    {
      name: "cloud_provider",
      title: "Code",
      type: ColumnTypes.Object,
    },
    {
      name: "status",
      title: "Status",
      type: ColumnTypes.Bool
    },
  ];

  return (
    <div>
      {isLoading ? (
        <UsersListLoading />
      ) : (
        <TableComponent
          placeholder="Search Resource"
          actions={actions}
          totalPages={totalPages}
          errorMessage={errorMess ?? ""}
          handleDelete={() => {}}
          handleSearch={(e) => handleSearchChange(e)}
          tableHeaders={tableHeaders}
          modal={
            <ModalProviderResources
              editItem={editItems}
              onClearEdit={() => setEditItems(null)}
            />
          }
          filteredItems={filteredItems}
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
                placeholder="Search Resource"
                onChange={handleSearchChange}
              />
            </div>
            <div className="mt-2">
            <ModalProviderResources
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
                    <th>Id</th>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody className="text-gray-600 fw-bold">
                  {filteredItems && filteredItems.length > 0 ? (
                    filteredItems?.map((row, i) => {
                      return (
                        <tr key={row?.id}>
                          <td>{row?.id}</td>
                          <td>{row?.cloud_provider?.name}</td>
                          <td>{row?.cloud_provider?.code}</td>
                          <td>
                            {row?.cloud_provider?.status ? "True" : "False"}
                          </td>
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
export default ProviderResources;
