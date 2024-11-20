import { useQuery, useMutation, useQueryClient } from "react-query";
import { AxiosInstance } from "axios";
import { AxiosContext } from "../context/axiosContext";
import { useContext } from "react";

const base_url = "/billing/api/v1/";

/**
 * 
 query methods
 -getbillingplans 
 - getbilling invoices
 - getcurrent subscription
 -save payment method
 - creat subscription
 */

const getBillingPlans = async (axios: AxiosInstance, params: any) =>
  axios
    .get(`${base_url}plans/`, { params })
    .then(({ data }) => Promise.resolve(data))
    .catch(({ response: { data: response } }) => Promise.reject(response));

// method to get invoices
const getBillingInvoices = async (axios: AxiosInstance, params: any) =>
  axios
    .get(`${base_url}invoices/`, { params })
    .then(({ data }) => Promise.resolve(data))
    .catch(({ response: { data: response } }) => Promise.reject(response));

const getPaymentMethods = async (axios: AxiosInstance, params: any) =>
  axios
    .get(`${base_url}payment-methods/`, { params })
    .then(({ data }) => Promise.resolve(data))
    .catch(({ response: { data: response } }) => Promise.reject(response));

const getCurrentSub = async (axios: AxiosInstance) =>
  axios
    .get(`${base_url}subscription/`)
    .then(({ data }) => Promise.resolve(data))
    .catch((response) => Promise.reject(response));

const setupIntent = async (axios: AxiosInstance, data: any) =>
  axios
    .post(`${base_url}setup-intent/`, data)
    .then(({ data }) => Promise.resolve(data))
    .catch(({ response: { data: response } }) => Promise.reject(response));

type Data = {
  payment_method_id: string | any;
};
const savePaymentMethod = async (axios: AxiosInstance, data: Data) =>
  axios
    .post(`${base_url}payment-methods/`, data)
    .then(({ data }) => Promise.resolve(data))
    .catch(({ response: { data: response } }) => Promise.reject(response));

const updatePaymentMethod = async (axios: AxiosInstance, data: any) =>
  axios
    .patch(`${base_url}payment-method/${data?.id}/set-default/`, {})
    .then(({ data }) => Promise.resolve(data))
    .catch(({ response: { data: response } }) => Promise.reject(response));

const createSubscription = async (axios: AxiosInstance, data: any) =>
  axios
    .post(`${base_url}subscriptions/create/`, data)
    .then(({ data }) => Promise.resolve(data))
    .catch(({ response: { data: response } }) => Promise.reject(response));

const cancelSubscriptions = async (axios: AxiosInstance, data: any) =>
  axios
    .patch(`${base_url}subscription/cancel/`, data)
    .then(({ data }) => Promise.resolve(data))
    .catch(({ response: { data: response } }) => Promise.reject(response));

/**
 * 
  BILLING PLANS
 READ
 */
export default function useGetBillingPlans(params: any) {
  const axios = useContext<AxiosInstance | null>(AxiosContext);
  return useQuery(
    ["billing-plans"],
    () => getBillingPlans(axios as AxiosInstance, params),
    {
      retry: true,
    }
  );
}

/**
 * 
  INVOICES
 READ
 */
export function useGetBillingInvoices(params: any) {
  const axios = useContext<AxiosInstance | null>(AxiosContext);
  return useQuery(
    ["billing-invoices"],
    () => getBillingInvoices(axios as AxiosInstance, params),
    {
      retry: true,
    }
  );
}

/**
PAYMENT METHODS
CREATE, UPDATE, READ
 * 
 */

export const useSavePaymentMethod = () => {
  const axios = useContext<AxiosInstance | null>(AxiosContext);
  return useMutation((data: Data) =>
    savePaymentMethod(axios as AxiosInstance, data)
  );
};

export const useUpdatePaymentMethod = () => {
  const axios = useContext<AxiosInstance | null>(AxiosContext);
  const queryClient = useQueryClient();
  return useMutation(
    (data: any) => updatePaymentMethod(axios as AxiosInstance, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("payment_methods");
      },
    }
  );
};

export const useGetPaymentMethods = (params: any) => {
  const axios = useContext<AxiosInstance | null>(AxiosContext);
  return useQuery(
    ["payment_methods"],
    () => getPaymentMethods(axios as AxiosInstance, params),
    { retry: false }
  );
};

/**
 * 
 INTENT
 CREATE
 */

export const useSetupIntent = () => {
  const axios = useContext<AxiosInstance | null>(AxiosContext);
  return useMutation((data: any) => setupIntent(axios as AxiosInstance, data));
};

/**
 * 
 SUBSCRIPTION
 GET, CREATE AND CANCEL
 */

export const useGetSubscriptions = () => {
  const axios = useContext<AxiosInstance | null>(AxiosContext);
  return useQuery(
    ["subscriptions"],
    () => getCurrentSub(axios as AxiosInstance),
    { retry: false }
  );
};

export const useCreateSubscription = () => {
  const axios = useContext<AxiosInstance | null>(AxiosContext);
  const queryClient = useQueryClient();
  return useMutation(
    (data: any) => createSubscription(axios as AxiosInstance, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("subscriptions");
      },
    }
  );
};

export const useCancelSubscription = () => {
  const axios = useContext<AxiosInstance | null>(AxiosContext);
  const queryClient = useQueryClient();
  return useMutation(
    (data: any) => cancelSubscriptions(axios as AxiosInstance, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("subscriptions");
      },
    }
  );
};
