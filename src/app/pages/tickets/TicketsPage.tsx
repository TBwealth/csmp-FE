import React from "react";
import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import TicketsHeader from "./TicketsHeader";
import TicketsTickets from "./components/TicketsTickets";
import TicketsActivities from "./components/TicketActivities";
import TicketTypes from "./components/TicketTypes";
import TenantTickets from "./components/TenantTickets";

const ticketsBreadCrumbs: Array<PageLink> = [
  {
    title: "Tickets",
    path: "/tickets",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "",
    path: "",
    isSeparator: true,
    isActive: false,
  },
];

const TicketsPage: React.FC = () => {
  return (
    <Routes>
      <Route
        element={
          <>
            {/* <TicketsHeader /> */}
            <Outlet />
          </>
        }
      >
        <Route
          path="tickets-list"
          element={
            <>
              <PageTitle breadcrumbs={ticketsBreadCrumbs}>
                Ticket List
              </PageTitle>
              <TicketsTickets/>
            </>
          }
        />
        <Route
          // path="ticket-activities/:id"
          path="ticket-activities"
          element={
            <>
              <PageTitle breadcrumbs={ticketsBreadCrumbs}>
               Ticket Activities
              </PageTitle>
              <TicketsActivities/>
            </>
          }
        />
        <Route
          path="ticket-types"
          element={
            <>
              <PageTitle breadcrumbs={ticketsBreadCrumbs}>
                Ticket Types
              </PageTitle>
              <TicketTypes/>
            </>
          }
        />

        <Route
          path="tenant-tickets"
          element={
            <>
              <PageTitle breadcrumbs={ticketsBreadCrumbs}>
                Tenant Tickets
              </PageTitle>
              <TenantTickets/>
            </>
          }
        />
        

    <Route index element={<Navigate to="/tickets" />} />

      </Route>
    </Routes>
  );
};

export default TicketsPage;
