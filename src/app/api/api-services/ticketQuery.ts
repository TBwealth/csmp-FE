import { ticketApi } from "./index";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  TicketsApiTicketsTicketsCreateRequest,
  TicketsApiTicketsTicketsUpdateRequest,
  TicketActvity,
  TicketType,
  Ticket,
  TicketsApiTicketsTicketTypesCreateRequest,
  TicketsApiTicketsTicketTypesUpdateRequest,
  TicketsApiTicketsTicketActivitiesCreateRequest,
  TicketsApiTicketsTicketActivitiesUpdateRequest,
} from "../axios-client";

//TICKETS
export const useGetTickets = (data: any) => {
  const query = useQuery(["tickets"], () =>
    ticketApi.ticketsTicketsList({ ...data })
  );
  return query;
};
export const useGetTenantTickets = (page: number) => {
  const query = useQuery(["tenant_tickets"], () =>
    ticketApi.ticketsTicketsList({ page })
  );
  return query;
};

export const useCreateTickets = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data: Ticket) => ticketApi.ticketsTicketsCreate({ data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("tickets");
      },
    }
  );
  return mutation;
};

export const useUpdateTickets = (id: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ id, data }: TicketsApiTicketsTicketsUpdateRequest) =>
      ticketApi.ticketsTicketsUpdate({ id, data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["tickets"]);
      },
    }
  );

  return mutation;
};

//TICKET TYPES
export const useGetTicketsTypes = (data: any) => {
  const query = useQuery(
    ["tickets_types"],
    () => ticketApi.ticketsTicketTypesList({ ...data }),
    {
      retry: 2,
    }
  );
  return query;
};

export const useCreateTicketTypes = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data: TicketType) => ticketApi.ticketsTicketTypesCreate({ data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["tickets_types"]);
      },
    }
  );
  return mutation;
};

export const useUpdateTicketTypes = (id: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ id, data }: TicketsApiTicketsTicketTypesUpdateRequest) =>
      ticketApi.ticketsTicketTypesUpdate({ id, data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["tickets_types"]);
      },
    }
  );

  return mutation;
};

//TICKET ACTIVITIES
export const useGetTicketsActivities = (data: any) => {
  const query = useQuery(["tickets_activities"], () =>
    ticketApi.ticketsTicketActivitiesList({ ...data })
  );
  return query;
};

export const useCreateTicketActivities = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data: TicketActvity) => ticketApi.ticketsTicketActivitiesCreate({ data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["tickets_activities"]);
      },
    }
  );
  return mutation;
};

export const useUpdateTicketActivities = (id: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ id, data }: TicketsApiTicketsTicketActivitiesUpdateRequest) =>
      ticketApi.ticketsTicketActivitiesUpdate({ id, data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["tickets_activities"]);
      },
    }
  );

  return mutation;
};

export const useGetSingleTicketActivity = (id: number) => {
  const query = useQuery(["activity-id"], () =>
    ticketApi.ticketsTicketActivitiesRead({ id })
  );
  return query;
};
