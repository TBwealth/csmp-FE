
import { AccountsApi, CloudProviderApi, TicketsApi, PolicyApi, SystemSettingsApi } from "../axios-client";


export const accountApi = new AccountsApi();
export const cloudApi = new CloudProviderApi();
export const ticketApi = new TicketsApi();
export const policyApi = new PolicyApi();
export const systemApi = new SystemSettingsApi();