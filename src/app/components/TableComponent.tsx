import { Dispatch, useEffect, useState } from "react";
import { Content } from "../../_metronic/layout/components/content";
import { KTCardBody, KTIcon } from "../../_metronic/helpers";
import useAlert from "../pages/components/useAlert";
import { Dropdown, DropdownButton, Modal } from "react-bootstrap";
import { ColumnTypes, TableColumn } from "./models";

type Props = {
  placeholder: string;
  createBtn: boolean;
  showActionBtn: boolean;
  actions: string[];
  errorMessage: string;
  tableHeaders: TableColumn[];
  totalPages: number;
  modal: React.ReactNode;
  editItems?: any;
  setEditItems: Dispatch<any>;
  handleDelete: Dispatch<any>;
  handleSearch: Dispatch<any>;
  filteredItems: any[];
};

const TableComponent = ({
  placeholder,
  createBtn = true,
  showActionBtn = true,
  actions,
  tableHeaders,
  modal,
  totalPages,
  setEditItems,
  handleDelete,
  handleSearch,
  filteredItems,
  errorMessage = "",
}: Props) => {
  const [page, setPage] = useState(1);
  const { showAlert, Alert } = useAlert();
  const [currentPage, setcurrentPage] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const goToNextPage = () => {
    setPage((currentPage) => Math.min(currentPage + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  const goToPage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    if (!filteredItems) {
      showAlert(errorMessage || "An unknown error occurred", "danger");
    }
  }, [filteredItems]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Content>
        <KTCardBody className="py-4">
          <div
            className="d-flex justify-content-between align-self-center flex-wrap mb-6"
            data-kt-user-table-toolbar="base"
          >
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center position-relative my-1 mb-3 ">
                <KTIcon
                  iconName="magnifier"
                  className="fs-1 position-absolute ms-6"
                />
                <input
                  type="text"
                  className="form-control form-control-solid w-250px ps-14"
                  placeholder={placeholder}
                  onChange={handleSearch}
                />
              </div>
              <div className="ml-2 -mt-2">
                <button className="btn btn-sm btn-primary col mr-2"
                onClick={() => alert("Print Table")}
                >
                  <i className="bi bi-printer"></i>Print
                </button>
                <button
                  className="btn btn-sm btn-light col"
                  onClick={() => setIsOpen(true)}
                >
                  <i className="bi bi-chevron-double-down"></i>ExportAs
                </button>
              </div>
            </div>
            {createBtn && <div className="mt-2">{modal}</div>}
          </div>
          <div className="table-responsive">
            <table
              id="kt_table_users"
              className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer"
            >
              <thead>
                <tr className="text-start text-bold fw-bolder fs-7 text-uppercase gs-0 text-nowrap">
                  {tableHeaders.map((col) => (
                    <th>{col.title}</th>
                  ))}
                  {tableHeaders.length == 2 && (
                    <>
                      <th></th>
                      <th></th>
                      <th></th>
                    </>
                  )}
                  {tableHeaders.length == 3 && (
                    <>
                      <th></th>
                      <th></th>
                    </>
                  )}
                  {showActionBtn && <th>Action</th>}
                </tr>
              </thead>
              <tbody className="text-gray-600 fw-bold">
                {filteredItems && filteredItems.length > 0 ? (
                  filteredItems?.map((row, i) => {
                    return (
                      <tr key={row.id}>
                        {tableHeaders.map((header) => {
                          if (header.type === ColumnTypes.Bool) {
                            return (
                              <td key={header.name}>
                                {row[header.name] ? "True" : "False"}
                              </td>
                            );
                          }
                          if (header.type === ColumnTypes.Object) {
                            console.log(header);
                            return (
                              <td key={header.name}>
                                {typeof row[header.name!][header?.objKey!] ===
                                "boolean"
                                  ? row[header.name][header.objKey!] === true
                                    ? "True"
                                    : "False"
                                  : row[header.name][header.objKey!]}
                              </td>
                            );
                          }
                          return (
                            <td key={header.name}>
                              {row[header.name] ? row[header.name] : "N/A"}
                            </td>
                          );
                        })}
                        {tableHeaders.length == 2 && (
                          <>
                            <td></td>
                            <td></td>
                            <td></td>
                          </>
                        )}
                        {tableHeaders.length == 3 && (
                          <>
                            <th></th>
                            <th></th>
                          </>
                        )}
                        {showActionBtn && (
                          <td>
                            <DropdownButton
                              id="dropdown-button-dark-example1"
                              variant="secondary"
                              title="Actions"
                              size="sm"
                            >
                              {actions.map((action) => (
                                <Dropdown.Item
                                  key="action"
                                  onClick={
                                    action === "Edit"
                                      ? () => setEditItems(row)
                                      : () => handleDelete(row.id)
                                  }
                                >
                                  {action}
                                </Dropdown.Item>
                              ))}
                            </DropdownButton>
                          </td>
                        )}
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
      </Content>
      <Modal
        show={isOpen}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Format Option</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>PDF</div>
          <div>CSV</div>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-light" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TableComponent;
