import React, { useEffect, useState } from 'react';
import useAlert from '../components/useAlert';
import {
 useGetPolicies 
} from "../../api/api-services/policyQuery";
import {
    PolicyPoliciesList200Response
} from "../../api/axios-client";
import { useNavigate } from 'react-router-dom';
import { ToolbarWrapper } from '../../../_metronic/layout/components/toolbar'
import { ColumnTypes, TableColumn } from '../../components/models';
import { UsersListLoading } from '../../modules/apps/user-management/users-list/components/loading/UsersListLoading';
import TableComponent from '../../components/TableComponent';
import  ModalPolicyList  from './modals/ModalPolicyList';

const PolicyWrapper = () => {
    const [page, setPage] = useState(1);
    const [items, setItems] = useState<any[]>([]);
    const [editItems, setEditItems] = useState<any | undefined>();
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const { showAlert, hideAlert } = useAlert();
    const  navigate = useNavigate();
    // const [isLoading, setIsLoading] = useState(false);
    const [errorMess, setErrorMess] = useState("");

    const { data, isLoading, error } = useGetPolicies(page);
    console.log(data);

    const datastsr: PolicyPoliciesList200Response | any = data;

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
        item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const handleSearchChange = (event: any) => {
        setSearchTerm(event.target.value);
      };

      const handleViewPolicyRules = (id:any) => {
            navigate(`/policy-rules/${id}`)
      }
    
      const actions = ["Edit", "View Rules"];
      const tableHeaders: TableColumn[] = [
        {
          name: "id",
          title: "Id",
        },
        {
          name: "name",
          title: "Name",
        },
        {
          name: "code",
          title: "Code",
        },
        {
          name: "status",
          title: "Status",
          type: ColumnTypes.Bool,
        },
      ];
  return (
    <>
     <ToolbarWrapper />
     {
        isLoading ? (
          <UsersListLoading />
        ) : (
          <TableComponent
            placeholder="Search Policies"
            actions={actions}
            totalPages={totalPages}
            errorMessage={errorMess ?? ""}
            tableHeaders={tableHeaders}
            handleDelete={handleViewPolicyRules}
            handleSearch={(e) => handleSearchChange(e)}
            modal= {
              <ModalPolicyList
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
    </>
  )
}

export default PolicyWrapper