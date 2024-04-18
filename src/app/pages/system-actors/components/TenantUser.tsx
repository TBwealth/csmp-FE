import { useEffect, useState } from "react";
import { UsersListLoading } from "../../../modules/apps/user-management/users-list/components/loading/UsersListLoading";
import TableComponent from "../../../components/TableComponent";
import { ColumnTypes, TableColumn } from "../../../components/models";
import useAlert from "../../components/useAlert";
import ModalTenant from "./modals/ModalTenant";


const TenantUser = () => {
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState<any[]>([
        {
            first_name: "John",
            last_name: " Doe",
            email: "johndoe@email.com",
            createdAt: new Date().toDateString(),
        },
        {
            first_name: "Ana",
            last_name: " Doe",
            email: "anadoe@email.com",
            createdAt: new Date().toDateString(),
        },
        {
            first_name: "Orion",
            last_name: " Corona",
            email: "orioncor@email.com",
            createdAt: new Date().toDateString(),
        },
        {
            first_name: "Fiona",
            last_name: "Owen",
            email: "fionaowen@email.com",
            createdAt: new Date().toDateString(),
        },
        {
            first_name: "August",
            last_name: "Ponce",
            email: "augustpounce@email.com",
            createdAt: new Date().toDateString(),
        },
    ]);
    const [editItems, setEditItems] = useState<any | undefined>();
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [errorMess, setErrorMess] = useState("");
    const { showAlert, hideAlert} = useAlert();

    const filteredItems = items?.filter((item) =>
        item?.first_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const handleSearchChange = (event: any) => {
        setSearchTerm(event.target.value);
      };

      const actions = ["Edit"];
  const tableHeaders: TableColumn[] = [
    {
      name: "first_name",
      title: "First Name",
    },
    {
      name: "last_name",
      title: "Last Name"
    },
    {
      name: "email",
      title: "Email",
    },
    {
      name: "createdAt",
      title: "Date Joined"
    },
  ];
  return (
    <div>
      {
        isLoading ? (
          <UsersListLoading />
        ) : (
          <TableComponent
            placeholder="Search tenant users"
            actions={actions}
            title="All Tenants User"
            totalPages={totalPages}
            errorMessage={errorMess ?? ""}
            tableHeaders={tableHeaders}
            handleDelete={() => {}}
            handleSearch={(e) => handleSearchChange(e)}
            modal= {
              <ModalTenant
                editItem={editItems}
                onClearEdit={() => setEditItems(null)}
              />
            }
            filteredItems={filteredItems}
            createBtn={true}
            showActionBtn={false}
            setEditItems={setEditItems}
            />
        )}
    </div>
  )
}

export default TenantUser