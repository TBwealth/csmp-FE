
import { AccountsApi, CloudProviderApi, TicketsApi, PolicyApi } from "../axios-client";


export const accountApi = new AccountsApi();
export const cloudApi = new CloudProviderApi();
export const ticketApi = new TicketsApi();
export const policyApi = new PolicyApi();