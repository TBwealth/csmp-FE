import { Dispatch, useEffect, useState } from "react";
import { Content } from "../../_metronic/layout/components/content";
import { KTCardBody, KTIcon } from "../../_metronic/helpers";
import useAlert from "../pages/components/useAlert";
import { Dropdown, DropdownButton, Modal } from "react-bootstrap";
import { ColumnTypes, TableColumn } from "./models";

type Props = {
  placeholder: string;
  title: string;
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
  title,
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
          {createBtn && (
            <div className="mt-2 w-full flex items-end justify-end mb-8">
              {modal}
            </div>
          )}
          <div className="bg-[#2A2C38] p-5 rounded-md">
            <div
              className="d-flex justify-content-between items-center align-self-center flex-wrap mb-6"
              data-kt-user-table-toolbar="base"
            >
              <p className="text-xl ">{title}</p>
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
                  <button
                    className="btn btn-sm btn-primary col mr-2"
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
            </div>
            <div className="table-responsive">
              <table
                id="kt_table_users"
                className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer"
              >
                <thead className="border-b-2 border-b-[#3B4852]">
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
                                <td
                                  key={header.name}
                                >
                                  {row[header.name] ? (
                                    <p className="btn btn-success border-b-2 border-b-[#3B4852] pb-2">Active</p>
                                  ) : (
                                    <p className=" btn btn-danger border-b-2 border-b-[#3B4852] pb-2">Inactive</p>
                                  )}
                                </td>
                              );
                            }
                            if (header.type === ColumnTypes.Object) {
                              return (
                                <td
                                  key={header.name}
                                  className="border-b-2 border-b-[#3B4852]"
                                >
                                    <p className="border-b-2 border-b-[#3B4852] pb-2">
                                  {typeof row[header.name!][header?.objKey!] ===
                                  "boolean"
                                    ? row[header.name][header.objKey!] === true
                                      ? "True"
                                      : "False"
                                    : row[header.name][header.objKey!]}
                                        
                                    </p>
                                </td>
                              );
                            }
                            return (
                              <td
                                key={header.name}
                                className="border-b-2 border-b-[#3B4852]"
                              >
                                <p className="border-b-2 border-b-[#3B4852] pb-2">
                                {row[header.name] ? row[header.name] : "N/A"}
                                </p>
                              </td>
                            );
                          })}
                          {tableHeaders.length == 2 && (
                            <>
                              <td><p className="border-b-2 border-b-[#3B4852]"></p></td>
                              <td><p className="border-b-2 border-b-[#3B4852]"></p></td>
                              <td><p className="border-b-2 border-b-[#3B4852]"></p></td>
                            </>
                          )}
                          {tableHeaders.length == 3 && (
                            <>
                              <td className="border-b-2 border-b-[#3B4852]"></td>
                              <td className="border-b-2 border-b-[#3B4852]"></td>
                            </>
                          )}
                          {showActionBtn && (
                            <td className="border-b-2 border-b-[#3B4852]">
                              {actions.length > 1 ? (
                                <DropdownButton
                                  id="dropdown-button-dark-example1"
                                  variant="secondary"
                                  title={
                                    <i className="bi bi-three-dots fs-2x"></i>
                                  }
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
                              ) : (
                                <button
                                  className="btn-light-success"
                                  onClick={() => setEditItems(row)}
                                >
                                  {actions[0]}
                                  <i className="ml-2 bi bi-chevron-double-right"></i>
                                </button>
                              )}
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
                    className={`page-item ${
                      page === index + 1 ? "active" : ""
                    }`}
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
                  className={`page-item ${
                    page === totalPages ? "disabled" : ""
                  }`}
                >
                  <button className="page-link" onClick={goToNextPage}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
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
          <div className="d-flex flex-col gap-10">
            <div
              onClick={() => console.log("pdf format")}
              className="text-base flex items-center hover:cursor-pointer"
            >
              <i className="bi bi-file-pdf-fill fs-3x mr-2"></i>PDF
            </div>
            <div className="text-base flex items-center hover:cursor-pointer">
              <i className="bi bi-filetype-csv fs-3x mr-2"></i>
              CSV
            </div>
          </div>
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
