import React from "react";
import { useEffect, useState } from "react";
// import { Content } from "../../../../../_metronic/layout/components/content";
import {
  useGetAccountPermssion,
  useGetAccountRoles,
  useGetAccountRolesPermission,
} from "../../../../api/api-services/accountQuery";
// import { KTCardBody, KTIcon } from "../../../../../_metronic/helpers";
import { AddRoleModal } from "./modals/ModalRole";
// import { UsersListLoading } from "../../../../modules/apps/user-management/users-list/components/loading/UsersListLoading";
import useAlert from "../../../components/useAlert";
// import { Dropdown, DropdownButton, FormCheck } from "react-bootstrap";
import {
  AccountsApiRolesList200Response,
  AccountsApiPermissionsList200Response,
  AccountsApiRolePermissionsList200Response,
} from "../../../../api/axios-client";
import {
  ACTIONS,
  ColumnTypes,
  TableAction,
  TableActionEvent,
  TableColumn,
} from "../../../../components/models";
import { AddRolePermissionModal } from "./modals/ModalRolePermission";
import { ComponentsheaderComponent } from "../../../../components/componentsheader/componentsheader.component";
import DefaultContent from "../../../../components/defaultContent/defaultContent";
// import { MainTableComponent } from "../../../../components/tableComponents/maincomponent/maintable";

const Roles = () => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<any[]>([]);
  const [perms, setPerms] = useState<any[]>([]);
  const [roleperms, setRolePerms] = useState<any[]>([]);
  const [editItems, setEditItems] = useState<any | undefined>();
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMess, setErrorMess] = useState("");
  const { showAlert, hideAlert } = useAlert();
  const [showModal, setShowModal] = useState(false);
  const [showPermModal, setShowPermModal] = useState(false);
  const [showEmpty, setshowEmpty] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>(null);
  const currentPage = 0;
  const [totalItems, settotalItems] = useState<number>(0);

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
      name: "name",
      title: "Name",
      type: ColumnTypes.Text,
    },
  ];

  const { data, isLoading, error } = useGetAccountRoles(page);
  const { data: permissions } = useGetAccountPermssion(page);
  const { data: rolePerms } = useGetAccountRolesPermission(page);

  const datastsr: AccountsApiRolesList200Response | any = data;
  const permstsr: AccountsApiPermissionsList200Response | any = permissions;
  const rolepermstsr: AccountsApiRolePermissionsList200Response | any =
    rolePerms;

  useEffect(() => {
    setItems(datastsr?.data?.data?.results);
    const mapped = permstsr?.data?.data?.results.map((res: any) => {
      return {
        id: res?.id,
        name: res?.name,
        isPerm:false,
      }
    })
    setPerms(mapped);
    setRolePerms(rolepermstsr?.data?.data?.results);
    setshowEmpty(
      datastsr?.data?.data?.results
        ? datastsr?.data?.data?.results?.length === 0
        : true
    );
    setSelected(datastsr?.data?.data?.results[0]);
    settotalItems(Math.ceil(datastsr?.data?.data?.count));
    hideAlert();
    if (error) {
      if (error instanceof Error) {
        showAlert(error?.message || "An unknown error occurred", "danger");
        setErrorMess(error?.message);
      }
    }
  }, [data, error, permstsr, rolepermstsr]);

  const topActionButtons = [
    { name: "add_new_user", label: "Add Role", icon: "plus", outline: false },
  ];
  function modal(buttion: any) {
    if (buttion === "add_new_user") {
      setShowModal(true);
      setEditItems(null);
    }
  }
  function refreshrecord() {
    useGetAccountRoles(1);
  }
  function filterUpdated(filter: any) {
    filter.current = { ...filter.current, ...filter };
    let nfilter = filter.current;
    nfilter.pageIndex = filter.page;
    filter.current = nfilter;
    useGetAccountRoles(1);
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

  const handlePermissionSearch = (e: any) => {
    if(e.target.value) {
      const res = perms.filter((perm) => perm?.name.toLowerCase().includes(e.target.value.toLowerCase()));
      setPerms(res);
    } else {
      setPerms(permstsr?.data?.data?.results);
    }
  }
  
  const handleRoleSearch = (e: any) => {
    if(e.target.value) {
      const res = items.filter((perm) => perm?.name.toLowerCase().includes(e.target.value.toLowerCase()));
      setItems(res);
    } else {
      setItems(datastsr?.data?.data?.results);
    }
  }
  return (
    <div>
      <ComponentsheaderComponent
        backbuttonClick={() => {}}
        pageName="Roles And Permission"
        requiredButton={[]}
        buttonClick={(e) => {
          modal(e);
        }}
      />
      {showEmpty ? (
        <DefaultContent
          pageHeader="All Roles and Permission"
          pageDescription="No record found"
          loading={isLoading}
          buttonValue="Refresh"
          buttonClick={() => refreshrecord()}
        />
      ) : (
        <div className="mt-10 w-[95%] mx-auto grid md:grid-cols-4 gap-16">
          <div className="md:col-span-1">
            <div className="w-full mb-3">
              <input
                placeholder="Search Roles"
                type="text"
                name="search"
                autoComplete="off"
                className="form-control bg-lightDark"
                onChange={(e) => handleRoleSearch(e)}
              />
            </div>
            {items?.map((item) => (
              <button
                key={item.name}
                className={
                  item.id === selected.id
                    ? "bg-primary uppercase rounded-md p-2 mb-3 text-lg w-full"
                    : "bg-lightDark uppercase p-2 mb-3 text-lg w-full rounded-md"
                }
                onClick={() => {
                  setSelected(item);
                  const filtered = roleperms?.filter((role) => role.role.toLowerCase() === item.name.toLowerCase()).map((res:any) => res?.permission);
                  if(filtered) {
                    setPerms(perms?.map((perm: any) => {
                      if(filtered.includes(perm?.name)) {
                        return {
                          ...perm,
                          isPerm: true,
                        };
                      }
                      return {...perm, isPerm:false};
                      }))
                  }
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className="md:col-span-3 relative ">
            <div className="w-full flex items-end justify-end gap-4">
              <button
                className="w-fit bg-primary rounded-md p-3"
                onClick={() => setShowPermModal(true)}
              >
                Add Permissions
              </button>
              <div className="md:w-[30%]">
                <input
                  placeholder="Search Permissions"
                  type="text"
                  name="search"
                  autoComplete="off"
                  className="form-control bg-lightDark"
                  onChange={(e) => handlePermissionSearch(e)}
                />
              </div>
            </div>
            <table className="w-full mt-3">
              <thead className="bg-primary">
                <th className="p-2 text-start">Actions</th>
                <th className="p-2 text-start">Permissions</th>
              </thead>
              <tbody>
                {perms?.length > 0 ? (
                  perms?.map((perm) => (
                    <tr key={perm.id}>
                      <td className="p-4 text-start border">{perm.name}</td>
                      <td className="p-4 text-start border">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            disabled
                            checked={perm.isPerm}
                            value={perm.isPerm}
                            className="sr-only peer"
                          />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>No Permissions Found</tr>
                )}
              </tbody>
            </table>
          </div>
          <button
            className="w-24 bg-primary rounded-md p-3"
            onClick={() => setShowModal(true)}
          >
            Add Role
          </button>
        </div>
      )}
      {/* {!showEmpty && (
      )} */}

      {showModal && (
        <AddRoleModal
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
      {showPermModal && (
        <AddRolePermissionModal
          editItem={editItems}
          isOpen={showPermModal}
          handleHide={() => {
            setShowPermModal(false);
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

export default Roles;
