import { useIntl } from "react-intl";
import { KTIcon } from "../../../../helpers";
import { SidebarMenuItemWithSub } from "./SidebarMenuItemWithSub";
import { SidebarMenuItem } from "./SidebarMenuItem";

const SidebarMenuMain = () => {
  const intl = useIntl();

  return (
    <>
      <SidebarMenuItem
        to="/dashboard"
        icon="element-11"
        title={intl.formatMessage({ id: "MENU.DASHBOARD" })}
        fontIcon="bi-app-indicator"
      />
      <SidebarMenuItem
        to="/policy"
        icon="element-11"
        title="Policy"
        fontIcon="bi-app-indicator"
      />
      {/* <SidebarMenuItem
        to="/builder"
        icon="switch"
        title="Layout Builder"
        fontIcon="bi-layers"
      /> */}
      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            Account Manager
          </span>
        </div>
      </div>
      <SidebarMenuItemWithSub
        to="/account-manager/account"
        title="Account Access"
        fontIcon="bi-archive"
        icon="element-plus"
      >
        <SidebarMenuItem
          to="/account-manager/account/permissions"
          title="Permissions"
          hasBullet={true}
        ></SidebarMenuItem>
        <SidebarMenuItem
          to="/account-manager/account/roles"
          title="Roles"
          hasBullet={true}
        ></SidebarMenuItem>
        <SidebarMenuItem
          to="/account-manager/account/role-permissions"
          title="Role Permissions"
          hasBullet={true}
        ></SidebarMenuItem>
        <SidebarMenuItem
          to="/account-manager/account/tenants"
          title="Tenant"
          hasBullet={true}
        ></SidebarMenuItem>
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to="/account-manager/users"
        title="Users"
        icon="profile-circle"
        fontIcon="bi-person"
      >
        <SidebarMenuItem
          to="/account-manager/users/all-users"
          title="All Users"
          hasBullet={true}
        ></SidebarMenuItem>
        <SidebarMenuItem
          to="/account-manager/users/user-logs"
          title="User Logs"
          hasBullet={true}
        ></SidebarMenuItem>
      </SidebarMenuItemWithSub>
      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            Cloud Provider
          </span>
        </div>
      </div>
      <SidebarMenuItemWithSub
        to="/cloud-provider/cloud"
        title="Cloud Provider"
        icon="cloud"
        fontIcon="bi-person"
      >
        <SidebarMenuItem
          to="/cloud-provider/cloud/provider-resource"
          title="Provider Resource"
          hasBullet={true}
        ></SidebarMenuItem>
        <SidebarMenuItem
          to="/cloud-provider/cloud/provider-service"
          title="Provider Service"
          hasBullet={true}
        ></SidebarMenuItem>
      </SidebarMenuItemWithSub>
      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            Tickets
          </span>
        </div>
      </div>
      <SidebarMenuItemWithSub
        to="/tickets/tickets"
        title="Tickets"
        icon="cheque"
        fontIcon="bi-person"
      >
        <SidebarMenuItem
          to="/tickets/tickets-list"
          title="Tickets List"
          hasBullet={true}
        ></SidebarMenuItem>
        <SidebarMenuItem
          to="/tickets/ticket-activities"
          title="Ticket Activities"
          hasBullet={true}
        ></SidebarMenuItem>
        <SidebarMenuItem
          to="tickets/ticket-types"
          title="Ticket Types"
          hasBullet={true}
        ></SidebarMenuItem>
      </SidebarMenuItemWithSub>
      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            System Actors
          </span>
        </div>
      </div>
      <SidebarMenuItemWithSub
        to="/actors"
        title="System Actors"
        icon="cheque"
        fontIcon="bi-person"
      >
        <SidebarMenuItem
          to="/actors/admin-users"
          title="Admin User"
          hasBullet={true}
        ></SidebarMenuItem>
        <SidebarMenuItem
          to="/actors/tenant-users"
          title="Tenant Users"
          hasBullet={true}
        ></SidebarMenuItem>
        <SidebarMenuItem
          to="/actors/tenant-employees"
          title="Tenant Employees"
          hasBullet={true}
        ></SidebarMenuItem>
      </SidebarMenuItemWithSub>

      {/* COMMENT OUT EVERYTHING BELOW WHEN YOU FINISH USING IT */}

      {/* <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            Crafted
          </span>
        </div>
      </div>
      <SidebarMenuItemWithSub
        to="/crafted/pages"
        title="Pages"
        fontIcon="bi-archive"
        icon="element-plus"
      >
        <SidebarMenuItemWithSub
          to="/crafted/pages/profile"
          title="Profile"
          hasBullet={true}
        >
          <SidebarMenuItem
            to="/crafted/pages/profile/overview"
            title="Overview"
            hasBullet={true}
          />
          <SidebarMenuItem
            to="/crafted/pages/profile/projects"
            title="Projects"
            hasBullet={true}
          />
          <SidebarMenuItem
            to="/crafted/pages/profile/campaigns"
            title="Campaigns"
            hasBullet={true}
          />
          <SidebarMenuItem
            to="/crafted/pages/profile/documents"
            title="Documents"
            hasBullet={true}
          />
          <SidebarMenuItem
            to="/crafted/pages/profile/connections"
            title="Connections"
            hasBullet={true}
          />
        </SidebarMenuItemWithSub>

        <SidebarMenuItemWithSub
          to="/crafted/pages/wizards"
          title="Wizards"
          hasBullet={true}
        >
          <SidebarMenuItem
            to="/crafted/pages/wizards/horizontal"
            title="Horizontal"
            hasBullet={true}
          />
          <SidebarMenuItem
            to="/crafted/pages/wizards/vertical"
            title="Vertical"
            hasBullet={true}
          />
        </SidebarMenuItemWithSub>
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to="/crafted/accounts"
        title="Accounts"
        icon="profile-circle"
        fontIcon="bi-person"
      >
        <SidebarMenuItem
          to="/crafted/account/overview"
          title="Overview"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/crafted/account/settings"
          title="Settings"
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to="/error"
        title="Errors"
        fontIcon="bi-sticky"
        icon="cross-circle"
      >
        <SidebarMenuItem to="/error/404" title="Error 404" hasBullet={true} />
        <SidebarMenuItem to="/error/500" title="Error 500" hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to="/crafted/widgets"
        title="Widgets"
        icon="element-7"
        fontIcon="bi-layers"
      >
        <SidebarMenuItem
          to="/crafted/widgets/lists"
          title="Lists"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/crafted/widgets/statistics"
          title="Statistics"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/crafted/widgets/charts"
          title="Charts"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/crafted/widgets/mixed"
          title="Mixed"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/crafted/widgets/tables"
          title="Tables"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/crafted/widgets/feeds"
          title="Feeds"
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>
      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            Apps
          </span>
        </div>
      </div>
      <SidebarMenuItemWithSub
        to="/apps/chat"
        title="Chat"
        fontIcon="bi-chat-left"
        icon="message-text-2"
      >
        <SidebarMenuItem
          to="/apps/chat/private-chat"
          title="Private Chat"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/apps/chat/group-chat"
          title="Group Chart"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/apps/chat/drawer-chat"
          title="Drawer Chart"
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>
      <SidebarMenuItem
        to="/apps/user-management/users"
        icon="abstract-28"
        title="User management"
        fontIcon="bi-layers"
      />
      <div className="menu-item">
        <a
          target="_blank"
          className="menu-link"
          href={import.meta.env.VITE_APP_PREVIEW_DOCS_URL + "/changelog"}
        >
          <span className="menu-icon">
            <KTIcon iconName="code" className="fs-2" />
          </span>
          <span className="menu-title">
            Changelog {import.meta.env.VITE_APP_VERSION}
          </span>
        </a>
      </div> */}
    </>
  );
};

export { SidebarMenuMain };
