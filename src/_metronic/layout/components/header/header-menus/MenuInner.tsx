import { useIntl } from "react-intl";
import { MenuItem } from "./MenuItem";
import { MenuInnerWithSub } from "./MenuInnerWithSub";
import { MegaMenu } from "./MegaMenu";
import pagAtom from "../../../../../app/atoms/pagAtom";
import { useRecoilValue } from "recoil";

export function MenuInner() {
  const intl = useIntl();
  const pageTitle = useRecoilValue(pagAtom);
  return (
    <>
    <p className="mt-8 text-[18px] font-semibold">{pageTitle}</p>
      {/* <MenuItem
        title={intl.formatMessage({ id: "MENU.DASHBOARD" })}
        to="/dashboard"
      /> */}
      {/* <MenuItem
        title="Policy"
        to="/policy"
      /> */}
      {/* <MenuItem title="Layout Builder" to="/builder" /> */}

      {/* <MenuInnerWithSub
        title="Account Manager"
        to="/account-manager"
        menuPlacement="bottom-start"
        menuTrigger="click"
      >
        <MenuInnerWithSub
          title="Account Access"
          to="/account-manager/account"
          icon="element-plus"
          hasArrow={true}
          menuPlacement="right-start"
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem
            to="/account-manager/account/permissions"
            title="Permissions"
            hasBullet={true}
          ></MenuItem>
          <MenuItem
            to="/account-manager/account/roles"
            title="Roles"
            hasBullet={true}
          ></MenuItem>
          <MenuItem
            to="/account-manager/account/role-permissions"
            title="Role Permissions"
            hasBullet={true}
          ></MenuItem>
          <MenuItem
            to="/account-manager/account/tenants"
            title="Tenants"
            hasBullet={true}
          ></MenuItem>
        </MenuInnerWithSub>

        <MenuInnerWithSub
          title="User"
          to="/account-manager/user"
          fontIcon="bi-person"
          hasArrow={true}
          menuPlacement="right-start"
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem
            to="/account-manager/users/all-users"
            title="All Users"
            hasBullet={true}
          ></MenuItem>
          <MenuItem
            to="/account-manager/users/user-logs"
            title="User Logs"
            hasBullet={true}
          ></MenuItem>
        </MenuInnerWithSub>
      </MenuInnerWithSub> */}
      {/* <MenuInnerWithSub
        title="Cloud Provider"
        to="/cloud-provider"
        menuPlacement="right-start"
        menuTrigger={`{default:'click', lg: 'hover'}`}
      >
        <MenuInnerWithSub to="/cloud-provider/cloud" title="Cloud Provider">
        <MenuItem
          to="/cloud-provider/cloud/resources"
          title="Resource"
          hasBullet={true}
        ></MenuItem>
        <MenuItem
          to="/cloud-provider/cloud/provider-resource"
          title="Provider Resource"
          hasBullet={true}
        ></MenuItem>
        <MenuItem
          to="/cloud-provider/cloud/provider-service"
          title="Provider Service"
          hasBullet={true}
        ></MenuItem>
        </MenuInnerWithSub>
      </MenuInnerWithSub> */}

      {/* MENU ITEM FOR TICKETS       */}
      {/* <MenuInnerWithSub
        to="/tickets/tickets"
        title="Tickets"
        menuPlacement="right-start"
        menuTrigger={`{default:'click', lg: 'hover'}`}
      >
        <MenuItem
          to="/tickets/tickets/tickets"
          title="Tickets List"
          hasBullet={true}
        ></MenuItem>
        <MenuItem
          to="/tickets/tickets/activities"
          title="Ticket Activities"
          hasBullet={true}
        ></MenuItem>
        <MenuItem
          to="/tickets/tickets/types"
          title="Ticket Types"
          hasBullet={true}
        ></MenuItem>
      </MenuInnerWithSub> */}
      {/* REMOVE ALL OF THEM */}

      {/* <MenuInnerWithSub
        title="Crafted"
        to="/crafted"
        menuPlacement="bottom-start"
        menuTrigger="click"
      >
        <MenuInnerWithSub
          title="Pages"
          to="/crafted/pages"
          fontIcon="bi-archive"
          hasArrow={true}
          menuPlacement="right-start"
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuInnerWithSub
            title="Profile"
            to="/crafted/pages/profile"
            hasArrow={true}
            hasBullet={true}
            menuPlacement="right-start"
            menuTrigger={`{default:'click', lg: 'hover'}`}
          >
            <MenuItem
              to="/crafted/pages/profile/overview"
              title="Overview"
              hasBullet={true}
            />
            <MenuItem
              to="/crafted/pages/profile/projects"
              title="Projects"
              hasBullet={true}
            />
            <MenuItem
              to="/crafted/pages/profile/campaigns"
              title="Campaigns"
              hasBullet={true}
            />
            <MenuItem
              to="/crafted/pages/profile/documents"
              title="Documents"
              hasBullet={true}
            />
            <MenuItem
              to="/crafted/pages/profile/connections"
              title="Connections"
              hasBullet={true}
            />
          </MenuInnerWithSub>
          <MenuInnerWithSub
            title="Wizards"
            to="/crafted/pages/wizards"
            hasArrow={true}
            hasBullet={true}
            menuPlacement="right-start"
            menuTrigger={`{default:'click', lg: 'hover'}`}
          >
            <MenuItem
              to="/crafted/pages/wizards/horizontal"
              title="Horizontal"
              hasBullet={true}
            />
            <MenuItem
              to="/crafted/pages/wizards/vertical"
              title="Vertical"
              hasBullet={true}
            />
          </MenuInnerWithSub>
        </MenuInnerWithSub>

        <MenuInnerWithSub
          title="Accounts"
          to="/crafted/accounts"
          fontIcon="bi-person"
          hasArrow={true}
          menuPlacement="right-start"
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem
            to="/crafted/account/overview"
            title="Overview"
            hasBullet={true}
          />
          <MenuItem
            to="/crafted/account/settings"
            title="Settings"
            hasBullet={true}
          />
        </MenuInnerWithSub>

        <MenuInnerWithSub
          title="Errors"
          to="/error"
          fontIcon="bi-sticky"
          hasArrow={true}
          menuPlacement="right-start"
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem to="/error/404" title="Error 404" hasBullet={true} />
          <MenuItem to="/error/500" title="Error 500" hasBullet={true} />
        </MenuInnerWithSub>

        <MenuInnerWithSub
          title="Widgets"
          to="/crafted/widgets"
          fontIcon="bi-layers"
          hasArrow={true}
          menuPlacement="right-start"
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem
            to="/crafted/widgets/lists"
            title="Lists"
            hasBullet={true}
          />
          <MenuItem
            to="/crafted/widgets/statistics"
            title="Statistics"
            hasBullet={true}
          />
          <MenuItem
            to="/crafted/widgets/charts"
            title="Charts"
            hasBullet={true}
          />
          <MenuItem
            to="/crafted/widgets/mixed"
            title="Mixed"
            hasBullet={true}
          />
          <MenuItem
            to="/crafted/widgets/tables"
            title="Tables"
            hasBullet={true}
          />
          <MenuItem
            to="/crafted/widgets/feeds"
            title="Feeds"
            hasBullet={true}
          />
        </MenuInnerWithSub>
      </MenuInnerWithSub>

      <MenuInnerWithSub
        title="Apps"
        to="/apps"
        menuPlacement="bottom-start"
        menuTrigger="click"
      >
        <MenuInnerWithSub
          title="Chat"
          to="/apps/chat"
          icon="message-text-2"
          hasArrow={true}
          menuPlacement="right-start"
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem
            to="/apps/chat/private-chat"
            title="Private Chat"
            hasBullet={true}
          />
          <MenuItem
            to="/apps/chat/group-chat"
            title="Group Chart"
            hasBullet={true}
          />
          <MenuItem
            to="/apps/chat/drawer-chat"
            title="Drawer Chart"
            hasBullet={true}
          />
        </MenuInnerWithSub>
        <MenuItem
          icon="abstract-28"
          to="/apps/user-management/users"
          title="User management"
        />
      </MenuInnerWithSub>

      <MenuInnerWithSub
        isMega={true}
        title="Layouts"
        to="/mega-menu"
        menuPlacement="bottom-start"
        menuTrigger="click"
      >
        <MegaMenu />
      </MenuInnerWithSub> */}
    </>
  );
}
