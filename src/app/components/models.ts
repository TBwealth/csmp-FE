export interface TableData {
    page: number;
    data: object[];
}

export enum ColumnTypes {
    Text, Status,oDate, Date, Link, Object, Number, Mark, CustomStatus,Time,List,Bool,UserAvatar,
    linkType,
  downloadAble,
  slider,
    digit
}

export interface TableColumn {
  name: string;
  sliderEndName?: string;
  sliderStartName?: string;
  sliderStartInitials?: number;
  sliderEndInitial?: number;
  objKey?:string;
    title: string;
    type?: ColumnTypes;
    template?: any;
    colors?: {};
    link_name?: string;
    listValue?: any[];
    listIdField?: string;
    listTextField?: string ;
  dropDownSettings?: dropDownSetting;
  statusEnum?: any[];
  sliderMin?: number;
  sliderMax?: number,
  isValueDependent?: boolean;
  dependentFieldName?: string;
  fieldOptions?: any[];

}
export interface dropDownSetting{
    singleSelection?: boolean,
    selectAllText?: string,
    unSelectAllText?: string,
    itemsShowLimit?: number,
    allowSearchFilter?: boolean,
  }
export interface TableAction {
  label: string;
  name: string;
  iconSrc?: string;
  icon?: string;
  isFieldDependant?: boolean;
  isDisplay?: string;
  fieldName?: string;
  fieldOptions?: any[];
}


export interface TableActionEvent<T= any> {
    name: string;
    data: T;
}

export enum EnrolleeStatus { ACTIVE = 1, INACTIVE = 0}




export enum ACTIONS {
  EDIT = '1', 
  DELETE = '2', 
  VIEW = '3', 
  CHANGE_PLAN = '4', 
  RENEW_SUBSCRIPTION = '5', 
  DEACTIVATE = '6', 
  ACTIVATE = '7',
  REACTIVATE = "8",
  ASSIGN = "9", 
  APPROVE = '10', 
  REJECT='11', 
  DOWNLOAD='12',
  REQUEST_PA_CODE = '13', 
  REQUEST_REFERRAL = '14',
  CONFIRM = '15',
  EXTEND = '16',
  PAUSE_SURVEY = '17',
  SEND_REMINDER='18',
  RELAUNCH = '19',
  DUPLICATE = '20',
  ADD_KRA = '21',
  VIEW_KRA = '22',
  VIEW_KPI = '23',
  SET_KPI = '24',
  REVIEW = '25',
  EMAIL = '26',
  NUDGE = '27',
}
