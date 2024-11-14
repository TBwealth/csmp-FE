import { useEffect, useState } from "react";
import axios from "axios";
// import { Content } from "../../../../../_metronic/layout/components/content";
import {
  useGetAccountPermssion,
  useGetAccountRoles,
  useUpdateRolePermission,
} from "../../../../api/api-services/accountQuery";
// import { KTCardBody, KTIcon } from "../../../../../_metronic/helpers";
import { AddRoleModal } from "./modals/ModalRole";
// import { UsersListLoading } from "../../../../modules/apps/user-management/users-list/components/loading/UsersListLoading";
import useAlert from "../../../components/useAlert";
// import { Dropdown, DropdownButton, FormCheck } from "react-bootstrap";
import {
  AccountsApiRolesList200Response,
  AccountsApiPermissionsList200Response,
} from "../../../../api/axios-client";
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
  const [errorMess, setErrorMess] = useState("");
  const { showAlert, hideAlert } = useAlert();
  const [showModal, setShowModal] = useState(false);
  const [showPermModal, setShowPermModal] = useState(false);
  const [showEmpty, setshowEmpty] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>(null);
  const [token, setToken] = useState("");

  const { data, isLoading, error } = useGetAccountRoles(page);
  const { data: permissions } = useGetAccountPermssion(page);

  const datastsr: AccountsApiRolesList200Response | any = data;
  const permstsr: AccountsApiPermissionsList200Response | any = permissions;

  useEffect(() => {
    const localToken = localStorage.getItem("token") ?? "";
    setToken(localToken);
  }, []);

  const handleFetchRolePerm = async (id: number) => {
    try {
      const resp = await axios.get(
        `https://cspm-api.midrapps.com/accounts/api/v1/role_permission/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resp.status === 200) {
        const mapped = resp?.data?.data.permissions.map(
          (perm: any) => perm.id
        );
        console.log(mapped);
        const updatPerm = perms?.map((perm: any) => {
          if (mapped.includes(perm?.id)) {
            return {
              ...perm,
              isPerm: true,
            };
          }
          return {
            ...perm,
            isPerm: false,
          };
        });
        setPerms(updatPerm);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const { mutate } = useUpdateRolePermission();

  // useEffect(() => {
  //   if (selected?.id) {
  //     handleFetchRolePerm(selected?.id);
  //   }
  // }, [selected]);

  useEffect(() => {
    setItems(datastsr?.data?.data?.results);
    const mapped = permstsr?.data?.data?.results.map((res: any) => {
      return {
        id: res?.id,
        name: res?.name,
        isPerm: false,
      };
    });
    setPerms(mapped);
    // setRolePerms(rolepermstsr?.data?.data?.results);
    setshowEmpty(
      datastsr?.data?.data?.results
        ? datastsr?.data?.data?.results?.length === 0
        : true
    );
    setSelected(datastsr?.data?.data?.results[0]);
    // settotalItems(Math.ceil(datastsr?.data?.data?.count));
    hideAlert();
    if (error) {
      if (error instanceof Error) {
        showAlert(error?.message || "An unknown error occurred", "danger");
        setErrorMess(error?.message);
      }
    }
  }, [data, error, permstsr]);

  function modal(buttion: any) {
    if (buttion === "add_new_user") {
      setShowModal(true);
      setEditItems(null);
    }
  }
  function refreshrecord() {
    useGetAccountRoles(1);
  }

  const handlePermissionSearch = (e: any) => {
    if (e.target.value) {
      const res = perms.filter((perm) =>
        perm?.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setPerms(res);
    } else {
      setPerms(permstsr?.data?.data?.results);
    }
  };

  const handleRoleSearch = (e: any) => {
    if (e.target.value) {
      const res = items.filter((perm) =>
        perm?.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setItems(res);
    } else {
      setItems(datastsr?.data?.data?.results);
    }
  };

  const handleUpdateRolePermissions = (val: any) => {
    const ids = val.filter((perm: any) => perm?.isPerm).map((p: any) => p?.id);
    mutate(
      {
        data: {
          role_id: selected?.id,
          permission__id: ids,
        },
      },
      {
        onSuccess: () => {
          handleFetchRolePerm(selected?.id);
        },
      }
    );
  };

  return (
    <div className="mt-[32px]">
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
                className="form-control border border-primary text-[14px] font-medium"
                onChange={(e) => handleRoleSearch(e)}
              />
            </div>
            <div className="bg-[#ECECFC] p-5">
              {items?.map((item) => (
                <div
                  key={item.name}
                  className={
                    item.id === selected.id
                      ? "bg-primary rounded p-2 mb-2 font-semibold text-white text-[14px] w-full cursor-pointer"
                      : " p-2 mb-2 text-[14px] font-medium w-full cursor-pointer"
                  }
                  onClick={() => {
                    setSelected(item);
                    handleFetchRolePerm(item?.id);
                  }}
                >
                  {item.name}
                </div>
              ))}
            </div>

            <button
              className="w-full text-primary text-center font-medium underline rounded-md p-3 mt-4 text-lg"
              onClick={() => setShowModal(true)}
            >
              <i className="bi bi-plus text-[18px] font-semibold fs-2 text-primary"></i>
              &nbsp;Add Role
            </button>
          </div>
          <div className="md:col-span-3 relative ">
            <div className="w-full flex items-end justify-end gap-4">
              <button
                className="w-fit text-primary text-center font-medium underline rounded-md p-3 text-lg"
                onClick={() => setShowPermModal(true)}
              >
                <i className="bi bi-plus fs-2 text-primary"></i>&nbsp; Add
                Permissions
              </button>
              <div className="md:w-[30%]">
                <input
                  placeholder="Search Permissions"
                  type="text"
                  name="search"
                  autoComplete="off"
                  className="form-control shadow-md  border border-primary"
                  onChange={(e) => handlePermissionSearch(e)}
                />
              </div>
            </div>
            <div className="font-bold mb-2">
              What&nbsp;{selected?.name}&nbsp;role have access to
            </div>
            <div className="flex flex-col">
              {perms?.length > 0 ? (
                perms?.map((perm) => (
                  <div
                    key={perm.id}
                    className="flex justify-between border-l-4 border-l-primary mb-4 p-2"
                  >
                    <div className="text-[12px] font-semibold">{perm.name}</div>
                    <div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={perm.isPerm}
                          onChange={(e) => {
                            const trans = perms.map((per) => {
                              if (per.id === perm?.id) {
                                return {
                                  ...per,
                                  isPerm: e.target.checked,
                                };
                              }
                              return per;
                            });
                            setPerms(trans);
                            handleUpdateRolePermissions(trans);
                          }}
                          className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                ))
              ) : (
                <span>No Permissions Found</span>
              )}
            </div>
          </div>
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
