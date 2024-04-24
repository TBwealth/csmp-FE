import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Content } from "../../../../_metronic/layout/components/content";
import { useGetCloudProviderResourceTypes } from "../../../api/api-services/cloudProviderQuery";
import { KTCardBody, KTIcon } from "../../../../_metronic/helpers";
import { UsersListLoading } from "../../../modules/apps/user-management/users-list/components/loading/UsersListLoading";
import useAlert from "../../components/useAlert";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { CloudProviderCloudProviderResourceTypesList200Response } from "../../../api/axios-client";
import { ModalProviderResources } from "./modal/ModalProviderResources";
import { ACTIONS, ColumnTypes, TableAction, TableActionEvent, TableColumn } from "../../../components/models";
import { IStatus, MyColor } from "../../../components/tableComponents/status/status";
import { MainTableComponent } from "../../../components/tableComponents/maincomponent/maintable";
import DefaultContent from "../../../components/defaultContent/defaultContent";
import { ComponentsheaderComponent } from "../../../components/componentsheader/componentsheader.component";
import RunPolicyModal from "../../policy/modals/RunPolicyModal";
import AssetsModal from "./modal/AssetsModal";
export class ProviderWithStatus implements IStatus {
  id: string = "";
  name: string = "";
  code: string = "";
  status: boolean = false;

  constructor(provider: any) {
    this.id = provider.id;
    this.name = provider.name;
    this.code = provider.code;
    this.status = provider.status;
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

const ProviderResources = () => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<any[]>([]);
  const [editItems, setEditItems] = useState<any | undefined>();
  const [showPolModal, setShowPolModal] = useState(false);
  const [showAsset, setShowPolModalAsset] = useState(false);
  const [errorMess, setErrorMess] = useState("");
  const { showAlert, hideAlert } = useAlert();
  const [showModal, setShowModal] = useState(false);
  const [showEmpty, setshowEmpty] = useState<boolean>(false);
  const navigate = useNavigate();
  const currentPage = 0;
  const [totalItems, settotalItems] = useState<number>(0);
  const filterFields: TableColumn[] = [
    { name: "keyword", title: "Keyword", type: ColumnTypes.Text },
  ];
  const tableActions: TableAction[] = [
    { name: ACTIONS.EDIT, label: "Edit" },
    { name: ACTIONS.VIEW, label: "Add Resource" },
    { name: ACTIONS.DELETE, label: "Run Policy" },
  ];
  const { data, isLoading, error } = useGetCloudProviderResourceTypes(page);
  const datastsr: CloudProviderCloudProviderResourceTypesList200Response | any =
    data;

  useEffect(() => {
    setItems(datastsr?.data?.data?.results.map((x: any) => new ProviderWithStatus(x)));
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

  const topActionButtons = [
    { name: "add_new_user", label: "Add Provider", icon: "plus", outline: false },
  ];
  function modal(buttion: any) {
    if (buttion === "add_new_user") {
      setShowModal(true);
      setEditItems(null);
    }
  }
  function refreshrecord() {
    useGetCloudProviderResourceTypes(1);
  }

  function filterUpdated(filter: any) {
    filter.current = { ...filter.current, ...filter };
    let nfilter = filter.current;
    nfilter.pageIndex = filter.page;
    filter.current = nfilter;
    useGetCloudProviderResourceTypes(1);
  }
  function tableActionClicked(event: TableActionEvent) {
    if (event.name === "1") {
      setShowModal(true);
      setEditItems(event.data);
      // handleViewPolicyRules(event.data.id);
    }
    if (event.name === "2") {
      setShowPolModal(true);
    }
    if (event.name === "3") {
      navigate(`/cloud-provider/cloud/resource/${event?.data?.id}`);
      // setShowPolModalAsset(true);
    }
  }

  return (
    <div>
       <ComponentsheaderComponent
        backbuttonClick={() => {}}
        pageName="Providers"
        requiredButton={topActionButtons}
        buttonClick={(e) => {
          modal(e);
        }}
      />

      {showEmpty ? (
        <DefaultContent
          pageHeader="All Providers"
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
          InputFileName="All Providers"
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
        <ModalProviderResources
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
      {showPolModal && (
        <RunPolicyModal
          isOpen={showPolModal}
          state="cloud"
          handleHide={() => {
            setShowPolModal(false);
          }}
        />
      )}
      {showAsset && (
        <AssetsModal
          isOpen={showAsset}
          handleHide={() => {
            setShowPolModalAsset(false);
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
