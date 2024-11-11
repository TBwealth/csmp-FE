import React from "react";
import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import NewIntegration from "./components/NewIntegration";
import ConfiguredIntegration from "./components/ConfiguredIntegration";
import Plugins from "./components/Plugins";
import TicketsTickets from "./components/TicketsTickets";
import TicketsActivities from "./components/TicketActivities";
import TicketTypes from "./components/TicketTypes";

const ticketsBreadCrumbs: Array<PageLink> = [
  {
    // title: "Tickets",
    // path: "/tickets",
    title: "Integration",
    path: "/integration",
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
            <Outlet />
          </>
        }
      >
        <Route
          // path="tickets-list"
          path="new-integration"
          element={
            <>
              {/* <PageTitle breadcrumbs={ticketsBreadCrumbs}>
                Ticket List
              </PageTitle>
              <TicketsTickets/> */}
              <PageTitle breadcrumbs={ticketsBreadCrumbs}>
              New Integration
              </PageTitle>
              <NewIntegration/>
            </>
          }
        />
        <Route
          path="configured-integration"
          // path="ticket-activities"
          element={
            <>
              <PageTitle breadcrumbs={ticketsBreadCrumbs}>
               Configured Integration
              </PageTitle>
              <ConfiguredIntegration/>
            </>
          }
        />
        <Route
          path="plugins"
          element={
            <>
              <PageTitle breadcrumbs={ticketsBreadCrumbs}>
                Plugins
              </PageTitle>
              <Plugins/>
            </>
          }
        />

    <Route index element={<Navigate to="/integration/new-integration" />} />

      </Route>
    </Routes>
  );
};

export default TicketsPage;
