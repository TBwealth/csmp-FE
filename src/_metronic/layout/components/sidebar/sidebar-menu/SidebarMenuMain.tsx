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
      ></SidebarMenuItem>

      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            Cloud Management
          </span>
        </div>
      </div>

      <SidebarMenuItem
        to="/cloud-provider/cloud/provider-resource"
        title="Cloud Providers"
      ></SidebarMenuItem>
      <SidebarMenuItem
        to="/cloud-provider/cloud/region"
        title="Cloud Region"
      ></SidebarMenuItem>
      <SidebarMenuItem
        to="/assets/assets-list"
        title="Resource Inventory"
      ></SidebarMenuItem>
      <SidebarMenuItem to="/policy" title="Policy"></SidebarMenuItem>
      {/* <SidebarMenuItem
        to=""
        title="Configuration Management"
        
      ></SidebarMenuItem>     */}

      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            Security Monitoring
          </span>
        </div>
      </div>
      <SidebarMenuItem to="" title="Resource Scanning"></SidebarMenuItem>
      <SidebarMenuItem to="" title="Vulnerability Report"></SidebarMenuItem>
      <SidebarMenuItem to="" title="Threat Report"></SidebarMenuItem>

      <SidebarMenuItem to="" title="Incident Report"></SidebarMenuItem>

      <SidebarMenuItem to="" title="Network Logs"></SidebarMenuItem>

      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            Compliance Management
          </span>
        </div>
      </div>
      <SidebarMenuItem to="" title="Regulatory Compliance"></SidebarMenuItem>
      <SidebarMenuItem
        to="/policy"
        title="Policy Enforcement"
      ></SidebarMenuItem>
      <SidebarMenuItem to="" title="Audit Logs"></SidebarMenuItem>
      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            User Management
          </span>
        </div>
      </div>
      <SidebarMenuItemWithSub to="/account-manager/users" title="User Accounts">
        <SidebarMenuItem
          to="/account-manager/users/all-users"
          title="All Users"
        ></SidebarMenuItem>

        <SidebarMenuItem
          to="/account-manager/account/tenants"
          title="Tenants"
        ></SidebarMenuItem>
        <SidebarMenuItem
          to="/account-manager/users/user-logs"
          title="User Logs"
        ></SidebarMenuItem>
      </SidebarMenuItemWithSub>
      <SidebarMenuItem
        to="/account-manager/account/roles"
        title="Roles and Permission"
      ></SidebarMenuItem>

      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            Integration
          </span>
        </div>
      </div>

      <SidebarMenuItemWithSub to="tickets/ticket-types" title="Task Systems">
        <SidebarMenuItem
          to="tickets/ticket-types"
          title="Setup Task Types"
        ></SidebarMenuItem>
        <SidebarMenuItem
          to="/tickets/tickets-list"
          title="Tasks list"
        ></SidebarMenuItem>
      </SidebarMenuItemWithSub>
      <SidebarMenuItem to="" title="Notifications"></SidebarMenuItem>
      <SidebarMenuItem to="" title="Payment Gateways"></SidebarMenuItem>

      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            Settings
          </span>
        </div>
      </div>
      <SidebarMenuItem to="" title="Account Settings" />

      <SidebarMenuItem to="" title="Notification Preferences"></SidebarMenuItem>
      <SidebarMenuItem to="" title="Billing & Subscriptions"></SidebarMenuItem>

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
          
        >
          <SidebarMenuItem
            to="/crafted/pages/profile/overview"
            title="Overview"
            
          />
          <SidebarMenuItem
            to="/crafted/pages/profile/projects"
            title="Projects"
            
          />
          <SidebarMenuItem
            to="/crafted/pages/profile/campaigns"
            title="Campaigns"
            
          />
          <SidebarMenuItem
            to="/crafted/pages/profile/documents"
            title="Documents"
            
          />
          <SidebarMenuItem
            to="/crafted/pages/profile/connections"
            title="Connections"
            
          />
        </SidebarMenuItemWithSub>

        <SidebarMenuItemWithSub
          to="/crafted/pages/wizards"
          title="Wizards"
          
        >
          <SidebarMenuItem
            to="/crafted/pages/wizards/horizontal"
            title="Horizontal"
            
          />
          <SidebarMenuItem
            to="/crafted/pages/wizards/vertical"
            title="Vertical"
            
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
          
        />
        <SidebarMenuItem
          to="/crafted/account/settings"
          title="Settings"
          
        />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to="/error"
        title="Errors"
        fontIcon="bi-sticky"
        icon="cross-circle"
      >
        <SidebarMenuItem to="/error/404" title="Error 404"  />
        <SidebarMenuItem to="/error/500" title="Error 500"  />
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
          
        />
        <SidebarMenuItem
          to="/crafted/widgets/statistics"
          title="Statistics"
          
        />
        <SidebarMenuItem
          to="/crafted/widgets/charts"
          title="Charts"
          
        />
        <SidebarMenuItem
          to="/crafted/widgets/mixed"
          title="Mixed"
          
        />
        <SidebarMenuItem
          to="/crafted/widgets/tables"
          title="Tables"
          
        />
        <SidebarMenuItem
          to="/crafted/widgets/feeds"
          title="Feeds"
          
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
          
        />
        <SidebarMenuItem
          to="/apps/chat/group-chat"
          title="Group Chart"
          
        />
        <SidebarMenuItem
          to="/apps/chat/drawer-chat"
          title="Drawer Chart"
          
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
