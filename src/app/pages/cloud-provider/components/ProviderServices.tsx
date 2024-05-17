import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetCloudProviderServicesList,
  useAddResourceToProvider,
  useGetCloudProviderResourceList,
} from "../../../api/api-services/cloudProviderQuery";
import useAlert from "../../components/useAlert";
import { CloudProviderCloudProviderList200Response } from "../../../api/axios-client";
import { ModalProviderServices } from "./modal/ModalProviderServices";
import {
  ACTIONS,
  ColumnTypes,
  TableAction,
  TableActionEvent,
  TableColumn,
} from "../../../components/models";
import { ComponentsheaderComponent } from "../../../components/componentsheader/componentsheader.component";
import DefaultContent from "../../../components/defaultContent/defaultContent";
import { MainTableComponent } from "../../../components/tableComponents/maincomponent/maintable";
import {
  IStatus,
  MyColor,
} from "../../../components/tableComponents/status/status";

export class ResourceWithStatus implements IStatus {
  id: string = "";
  name: string = "";
  code: string = "";
  status: string = "";
  isDefault: string = "";

  constructor(tenant: any) {
    this.id = tenant.id;
    this.name = tenant.name;
    this.code = tenant.code;
    this.status = tenant.status;
    this.isDefault = tenant.isDefault;
  }

  getStatusLabel() {
    if (this.isDefault) return "Active";
    if (!this.isDefault) return "InActive";
    return "";
  }
  getStatusColor() {
    if (this.isDefault) return new MyColor(0, 175, 175);
    if (!this.isDefault) return new MyColor(242, 153, 74);
    return new MyColor(242, 0, 74);
  }
}
const ProviderServices = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [items, setItems] = useState<any[]>([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [editItems, setEditItems] = useState<any | undefined>();
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMess, setErrorMess] = useState("");
  const { showAlert, hideAlert } = useAlert();
  const [showEmpty, setshowEmpty] = useState<boolean>(false);
  const currentPage = 0;
  const [showModal, setShowModal] = useState(false);
  const filterFields: TableColumn[] = [
    { name: "keyword", title: "Keyword", type: ColumnTypes.Text },
  ];
  const tableActions: TableAction[] = [
    { name: ACTIONS.EDIT, label: "Edit" },
    {
      name: ACTIONS.DEACTIVATE,
      label: "Deactivate",
      isFieldDependant: true,
      fieldName: "isDefault",
      fieldOptions: [
        { key: true, value: "Deactivate" },
        { key: false, value: "Activate" },
      ],
    },
  ];
  const tableColumns: TableColumn[] = [
    {
      name: "id",
      title: "ID",
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
  const { data, isLoading, error } = useGetCloudProviderServicesList({page, pageSize});
  const { data: provResource } = useGetCloudProviderResourceList(+id!);

  const datastsr: CloudProviderCloudProviderList200Response | any = data;
  const provresource: CloudProviderCloudProviderList200Response | any =
    provResource;

  const { mutate } = useAddResourceToProvider();

  const handleAddResourceToProvider = (resource_id: any) => {
    mutate(
      {
        data: {
          cloud_provider_id: +id!,
          resource_types__id: resource_id,
        },
      },
      {
        onSuccess: (res) => {
          refreshrecord();
          // console.log(res);
          // navigate(-1);
        },
      }
    );
  };

  useEffect(() => {
    if (datastsr) {
      setshowEmpty(
        datastsr?.data?.data?.results
          ? datastsr?.data?.data?.results?.length === 0
          : true
      );
      setTotalPages(Math.ceil(datastsr?.data?.data?.count / 30));
    }
    hideAlert();
    if (error) {
      if (error instanceof Error) {
        setErrorMess(error?.message);
        showAlert(error?.message || "An unknown error occurred", "danger");
      }
    }

    if (provResource && datastsr) {
      const mapped = provresource?.data?.data?.resource_type.map(
        (res: any) => res?.name
      );
      const trans = datastsr?.data?.data?.results.map((res: any) => {
        if (mapped.includes(res?.name)) {
          return {
            ...res,
            isDefault: true,
          };
        }
        return {
          ...res,
          isDefault: false,
        };
      });
      setItems(() => trans.map((x: any) => new ResourceWithStatus(x)));
    }
  }, [data, error, provResource]);

  const topActionButtons = [
    {
      name: "add_new_user",
      label: "Add Resource",
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
    useGetCloudProviderServicesList({page, pageSize});
  }
  function filterUpdated(filter: any) {
    filter.current = { ...filter.current, ...filter };
    let nfilter = filter.current;
    nfilter.pageIndex = filter.page;
    filter.current = nfilter;
    // useGetTicketsTypes(1);
  }
  function tableActionClicked(event: TableActionEvent) {
    if (event.name === "1") {
      setEditItems(event.data);
      setShowModal(true);
    }
    if (event.name === "6") {
      if(!event.data?.isDefault) {
        const allIds = items.filter((item) => item?.isDefault).map((it) => it.id);
        handleAddResourceToProvider([...allIds, event?.data?.id]);
      } else {
        const allIds = provresource?.data?.data.resource_type.filter((item: any) => item?.id !== event?.data?.id).map((it: any) => it.id);
        handleAddResourceToProvider(allIds);
      }
      
    }
  }

  return (
    <div>
      <ComponentsheaderComponent
        backbuttonClick={() => navigate(-1)}
        showbackbutton={true}
        pageName="Resource Types"
        requiredButton={topActionButtons}
        buttonClick={(e) => {
          modal(e);
        }}
      />
      <div className="mt-20">
        {showEmpty ? (
          <DefaultContent
            pageHeader="All Tenants Tickets"
            pageDescription="No record found"
            loading={isLoading}
            buttonValue="Refresh"
            buttonClick={() => refreshrecord()}
          />
        ) : (
          <MainTableComponent
            filterChange={(e: any) => filterUpdated(e)}
            showActions={true}
            showFilter={true}
            actionClick={(e: any) => tableActionClicked(e)}
            actions={tableActions}
            userData={items}
            tableColum={tableColumns}
            totalItems={totalPages}
            currentTablePage={currentPage}
            loading={isLoading}
            InputFileName="All Resource Types"
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
      </div>

      {showModal && (
        <ModalProviderServices
          editItem={editItems}
          isOpen={showModal}
          handleHide={() => {
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};
export default ProviderServices;
