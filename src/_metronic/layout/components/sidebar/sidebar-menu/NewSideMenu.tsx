import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import modeAtomsAtom from "../../../../../app/atoms/modeAtoms.atom";
import pageAtom from "../../../../../app/atoms/pagAtom";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../../../app/pages/auth";
import logoColored from "../../../../../../public/media/logos/Logo_color.svg";
import logoMono from "../../../../../../public/media/logos/Logo_dark.svg";

type Links = {
  title: string;
  href?: string;
  path: string;
  children?: any[];
  allowedRoles?: string[];
  groupTitle?: string;
  icon: any;
};

const NewSideMenu = () => {
  const { currentUser, logout } = useAuth();
  const { mode } = useRecoilValue(modeAtomsAtom);
  const setPageTitle = useSetRecoilState(pageAtom);
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const [children, setChildren] = useState<Links[]>([]);
  const [topTitle, setTopTitle] = useState("");
  const [popOpen, setPopOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const localChildren = sessionStorage.getItem("children");
    const localUser = localStorage.getItem("user");
    const localtitle = sessionStorage.getItem("top-title");
    if (localChildren) {
      const parsed = JSON.parse(localChildren);
      setIsOpen(true);
      setChildren(parsed);
      setTopTitle(localtitle!);
    }

    if (localUser) {
      const parsed = JSON.parse(localUser);
      setUser(parsed);
    }
  }, []);

  const links: Links[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      path: "/dashboard",
      allowedRoles: ["Admin", "Tenant"],
      icon: (
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color={
            pathname.includes("/dashboard")
              ? "#284CB3"
              : mode === "dark"
              ? "#EAEAEA"
              : "#000000"
          }
        >
          <path
            d="M10 18V15C10 13.8954 10.8954 13 12 13V13C13.1046 13 14 13.8954 14 15V18"
            stroke={
              pathname.includes("/dashboard")
                ? "#284CB3"
                : mode === "dark"
                ? "#EAEAEA"
                : "#000000"
            }
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M2 8L11.7317 3.13416C11.9006 3.04971 12.0994 3.0497 12.2683 3.13416L22 8"
            stroke={
              pathname.includes("/dashboard")
                ? "#284CB3"
                : mode === "dark"
                ? "#EAEAEA"
                : "#000000"
            }
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M20 11V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V11"
            stroke={
              pathname.includes("/dashboard")
                ? "#284CB3"
                : mode === "dark"
                ? "#EAEAEA"
                : "#000000"
            }
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      ),
      children: [
        {
          title: "Dashboard",
          href: "/dashboard",
        },
      ],
    },
    {
      title: "Cloud Management",
      href: "/cloud-provider/cloud/provider-resource",
      path: "/cloud-provider",
      allowedRoles: ["Admin", "Tenant"],
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.1875 13.5V9H4.3125V13.4859C4.31292 13.4896 4.3137 13.4958 4.3151 13.5042C4.31964 13.5315 4.3306 13.5816 4.35628 13.6477C4.40641 13.7766 4.51786 13.9798 4.77232 14.1979C5.28525 14.6376 6.44231 15.1875 9 15.1875C11.5577 15.1875 12.7147 14.6376 13.2277 14.1979C13.4821 13.9798 13.5936 13.7766 13.6437 13.6477C13.6694 13.5816 13.6804 13.5315 13.6849 13.5042C13.6863 13.4958 13.6871 13.4896 13.6875 13.4859V9H14.8125V13.5H14.25C14.8125 13.5 14.8125 13.5007 14.8125 13.5013L14.8125 13.5027L14.8125 13.5056L14.8124 13.512L14.8119 13.5276C14.8115 13.5391 14.8108 13.5529 14.8095 13.5689C14.807 13.6008 14.8026 13.6413 14.7946 13.6892C14.7786 13.7849 14.7486 13.9105 14.6922 14.0554C14.5783 14.3484 14.3616 14.7077 13.9598 15.0521C13.1603 15.7374 11.6923 16.3125 9 16.3125C6.30769 16.3125 4.83975 15.7374 4.04018 15.0521C3.63839 14.7077 3.42172 14.3484 3.30778 14.0554C3.25143 13.9105 3.22137 13.7849 3.20541 13.6892C3.19743 13.6413 3.19295 13.6008 3.19048 13.5689C3.18924 13.5529 3.18849 13.5391 3.18806 13.5276L3.18762 13.512L3.18753 13.5056L3.18751 13.5027L3.1875 13.5013C3.1875 13.5007 3.1875 13.5 3.75 13.5H3.1875Z"
            fill={
              pathname.includes("/cloud-provider")
                ? "#284CB3"
                : mode === "dark"
                ? "#EAEAEA"
                : "#000000"
            }
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.1875 9V4.5H4.3125V8.98586C4.31292 8.98964 4.3137 8.99582 4.3151 9.00421C4.31964 9.03147 4.3306 9.08165 4.35628 9.14769C4.40641 9.27657 4.51786 9.47981 4.77232 9.69792C5.28525 10.1376 6.44231 10.6875 9 10.6875C11.5577 10.6875 12.7147 10.1376 13.2277 9.69792C13.4821 9.47981 13.5936 9.27657 13.6437 9.14769C13.6694 9.08165 13.6804 9.03147 13.6849 9.00421C13.6863 8.99582 13.6871 8.98964 13.6875 8.98586V4.5H14.8125V9H14.25C14.8125 9 14.8125 9.00065 14.8125 9.00131L14.8125 9.00268L14.8125 9.00558L14.8124 9.01205L14.8119 9.02761C14.8115 9.03913 14.8108 9.05294 14.8095 9.06889C14.807 9.10076 14.8026 9.14127 14.7946 9.18915C14.7786 9.28493 14.7486 9.41054 14.6922 9.55544C14.5783 9.84843 14.3616 10.2077 13.9598 10.5521C13.1603 11.2374 11.6923 11.8125 9 11.8125C6.30769 11.8125 4.83975 11.2374 4.04018 10.5521C3.63839 10.2077 3.42172 9.84843 3.30778 9.55544C3.25143 9.41054 3.22137 9.28493 3.20541 9.18915C3.19743 9.14127 3.19295 9.10076 3.19048 9.06889C3.18924 9.05294 3.18849 9.03913 3.18806 9.02761L3.18762 9.01205L3.18753 9.00558L3.18751 9.00268L3.1875 9.00131C3.1875 9.00065 3.1875 9 3.75 9H3.1875Z"
            fill={
              pathname.includes("/cloud-provider")
                ? "#284CB3"
                : mode === "dark"
                ? "#EAEAEA"
                : "#000000"
            }
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.04018 2.94792C4.83975 2.26257 6.30769 1.6875 9 1.6875C11.6923 1.6875 13.1603 2.26257 13.9598 2.94792C14.3616 3.29231 14.5783 3.65157 14.6922 3.94456C14.7486 4.08946 14.7786 4.21507 14.7946 4.31085C14.8026 4.35873 14.807 4.39924 14.8095 4.43111C14.8108 4.44706 14.8115 4.46087 14.8119 4.47239L14.8124 4.48795L14.8125 4.49442L14.8125 4.49732L14.8125 4.49869C14.8125 4.49935 14.8125 4.5 14.25 4.5C14.8125 4.5 14.8125 4.50065 14.8125 4.50131L14.8125 4.50268L14.8125 4.50558L14.8124 4.51205L14.8119 4.52761C14.8115 4.53913 14.8108 4.55294 14.8095 4.56889C14.807 4.60076 14.8026 4.64127 14.7946 4.68915C14.7786 4.78493 14.7486 4.91054 14.6922 5.05544C14.5783 5.34843 14.3616 5.70769 13.9598 6.05208C13.1603 6.73743 11.6923 7.3125 9 7.3125C6.30769 7.3125 4.83975 6.73743 4.04018 6.05208C3.63839 5.70769 3.42172 5.34843 3.30778 5.05544C3.25143 4.91054 3.22137 4.78493 3.20541 4.68915C3.19743 4.64127 3.19295 4.60076 3.19047 4.56889C3.18923 4.55294 3.18849 4.53913 3.18806 4.52761L3.18761 4.51205L3.18752 4.50558L3.1875 4.50268L3.1875 4.50131C3.1875 4.50065 3.1875 4.5 3.75 4.5C3.1875 4.5 3.1875 4.49935 3.1875 4.49869L3.1875 4.49732L3.18752 4.49442L3.18761 4.48795L3.18806 4.47239C3.18849 4.46087 3.18923 4.44706 3.19047 4.43111C3.19295 4.39924 3.19743 4.35873 3.20541 4.31085C3.22137 4.21507 3.25143 4.08946 3.30778 3.94456C3.42172 3.65157 3.63839 3.29231 4.04018 2.94792ZM4.31442 4.5C4.31463 4.50133 4.31485 4.50274 4.3151 4.50421C4.31964 4.53147 4.3306 4.58165 4.35628 4.64769C4.4064 4.77657 4.51785 4.97981 4.77232 5.19792C5.28525 5.63757 6.4423 6.1875 9 6.1875C11.5577 6.1875 12.7147 5.63757 13.2277 5.19792C13.4821 4.97981 13.5936 4.77657 13.6437 4.64769C13.6694 4.58165 13.6804 4.53147 13.6849 4.50421C13.6851 4.50274 13.6854 4.50133 13.6856 4.5C13.6854 4.49867 13.6851 4.49726 13.6849 4.49579C13.6804 4.46853 13.6694 4.41835 13.6437 4.35231C13.5936 4.22343 13.4821 4.02019 13.2277 3.80208C12.7147 3.36243 11.5577 2.8125 9 2.8125C6.4423 2.8125 5.28525 3.36243 4.77232 3.80208C4.51785 4.02019 4.4064 4.22343 4.35628 4.35231C4.3306 4.41835 4.31964 4.46853 4.3151 4.49579C4.31485 4.49726 4.31463 4.49867 4.31442 4.5Z"
            fill={
              pathname.includes("/cloud-provider")
                ? "#284CB3"
                : mode === "dark"
                ? "#EAEAEA"
                : "#000000"
            }
          />
        </svg>
      ),
      children: [
        {
          title: "Cloud Providers",
          href: "/cloud-provider/cloud/provider-resource",
        },
        {
          title: "Cloud Region",
          href: "/cloud-provider/cloud/region",
        },
        {
          title: "Resource Inventory",
          href: "/assets/assets-list",
        },
        {
          title: "Suppression Setup",
          href: "/cloud-provider/cloud/suppression-setup",
        },
        {
          title: "Suppression Logs",
          href: "/cloud-provider/cloud/suppression-logs",
        },
      ],
    },
    {
      title: "Security Monitoring",
      href: "/monitoring/resource-scanning",
      path: "/monitoring",
      allowedRoles: ["Admin", "Tenant"],
      icon: (
        <svg
          width="24px"
          height="24px"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color={
            pathname.includes("/monitoring")
              ? "#284CB3"
              : mode === "dark"
              ? "#EAEAEA"
              : "#000000"
          }
        >
          <path
            d="M7 22L17 22"
            stroke={
              pathname.includes("/monitoring")
                ? "#284CB3"
                : mode === "dark"
                ? "#EAEAEA"
                : "#000000"
            }
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M2 17V4C2 2.89543 2.89543 2 4 2H20C21.1046 2 22 2.89543 22 4V17C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17Z"
            stroke={
              pathname.includes("/monitoring")
                ? "#284CB3"
                : mode === "dark"
                ? "#EAEAEA"
                : "#000000"
            }
            strokeWidth="1.5"
          ></path>
          <path
            d="M9 10.5L11 12.5L15 8.5"
            stroke={
              pathname.includes("/monitoring")
                ? "#284CB3"
                : mode === "dark"
                ? "#EAEAEA"
                : "#000000"
            }
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      ),
      children: [
        {
          title: "Resource Scanning",
          href: "/monitoring/resource-scanning",
        },
        {
          title: "Scan Report",
          href: "/monitoring/scan-history",
        },
        {
          title: "CloudTrails",
          href: "/monitoring/cloudtrail-setup",
        },
      ],
    },
    {
      title: "Repository MANAGEMENT",
      href: "/repository/list",
      path: "/repository",
      allowedRoles: ["Admin", "Tenant"],
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_947_1672)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.8838 13.0819C5.11471 13.2897 5.13343 13.6454 4.92561 13.8763L4.91811 13.8846C4.71029 14.1155 4.35462 14.1343 4.12371 13.9264C3.8928 13.7186 3.87408 13.363 4.0819 13.132L4.0894 13.1237C4.29722 12.8928 4.65289 12.8741 4.8838 13.0819Z"
              fill={
                pathname.includes("/repository")
                  ? "#284CB3"
                  : mode === "dark"
                  ? "#EAEAEA"
                  : "#000000"
              }
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.8838 4.0819C5.11471 4.28972 5.13343 4.64539 4.92561 4.8763L4.91811 4.88463C4.71029 5.11554 4.35462 5.13426 4.12371 4.92644C3.8928 4.71862 3.87408 4.36296 4.0819 4.13205L4.0894 4.12371C4.29722 3.8928 4.65289 3.87408 4.8838 4.0819Z"
              fill={
                pathname.includes("/repository")
                  ? "#284CB3"
                  : mode === "dark"
                  ? "#EAEAEA"
                  : "#000000"
              }
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.0625 2.0625V6.9375H15.9375V2.0625H2.0625ZM0.9375 1.95C0.9375 1.39081 1.39081 0.9375 1.95 0.9375H16.05C16.6092 0.9375 17.0625 1.39081 17.0625 1.95V7.05C17.0625 7.60919 16.6092 8.0625 16.05 8.0625H1.95C1.39081 8.0625 0.9375 7.60919 0.9375 7.05V1.95Z"
              fill={
                pathname.includes("/repository")
                  ? "#284CB3"
                  : mode === "dark"
                  ? "#EAEAEA"
                  : "#000000"
              }
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.0625 11.0625V15.9375H15.9375V11.0625H2.0625ZM0.9375 10.95C0.9375 10.3908 1.39081 9.9375 1.95 9.9375H16.05C16.6092 9.9375 17.0625 10.3908 17.0625 10.95V16.05C17.0625 16.6092 16.6092 17.0625 16.05 17.0625H1.95C1.39081 17.0625 0.9375 16.6092 0.9375 16.05V10.95Z"
              fill={
                pathname.includes("/repository")
                  ? "#284CB3"
                  : mode === "dark"
                  ? "#EAEAEA"
                  : "#000000"
              }
            />
          </g>
          <defs>
            <clipPath id="clip0_947_1672">
              <rect width="18" height="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
      children: [
        {
          title: "Repository",
          href: "/repository/list",
        },
        {
          title: "Repository Scan",
          href: "/repository/scan",
        },
        {
          title: "Scan history",
          href: "/repository/scan-history",
        },
      ],
    },
    {
      title: "Compliance Management",
      href: "/policy/policies",
      path: "/policy",
      allowedRoles: ["Admin", "Tenant"],
      icon: (
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color={
            pathname.includes("/policy")
              ? "#284CB3"
              : mode === "dark"
              ? "#EAEAEA"
              : "#000000"
          }
        >
          <path
            d="M20 12V5.74853C20 5.5894 19.9368 5.43679 19.8243 5.32426L16.6757 2.17574C16.5632 2.06321 16.4106 2 16.2515 2H4.6C4.26863 2 4 2.26863 4 2.6V21.4C4 21.7314 4.26863 22 4.6 22H13"
            stroke={
              pathname.includes("/policy")
                ? "#284CB3"
                : mode === "dark"
                ? "#EAEAEA"
                : "#000000"
            }
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M8 10H16M8 6H12M8 14H11"
            stroke={
              pathname.includes("/policy")
                ? "#284CB3"
                : mode === "dark"
                ? "#EAEAEA"
                : "#000000"
            }
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M16 2V5.4C16 5.73137 16.2686 6 16.6 6H20"
            stroke={
              pathname.includes("/policy")
                ? "#284CB3"
                : mode === "dark"
                ? "#EAEAEA"
                : "#000000"
            }
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M19.9923 15.125L22.5477 15.774C22.8137 15.8416 23.0013 16.0833 22.9931 16.3576C22.8214 22.1159 19.5 23 19.5 23C19.5 23 16.1786 22.1159 16.0069 16.3576C15.9987 16.0833 16.1863 15.8416 16.4523 15.774L19.0077 15.125C19.3308 15.043 19.6692 15.043 19.9923 15.125Z"
            stroke={
              pathname.includes("/policy")
                ? "#284CB3"
                : mode === "dark"
                ? "#EAEAEA"
                : "#000000"
            }
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      ),
      children: [
        {
          title: "Regulatory Compliance",
          href: "",
        },
        {
          title: "Policy Enforcement",
          href: "/policy/policies",
        },
        {
          title: "Rules and Benchmarks",
          href: "/policy/rule-list",
        },
        {
          title: "Audit Logs",
          href: "",
        },
      ],
    },
    {
      title: "User Management",
      href: "/account-manager/users/all-users",
      path: "/account-manager",
      allowedRoles: ["Admin"],
      icon: (
        <svg
          width="24px"
          height="24px"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color={
            pathname.includes("/account-manager")
              ? "#284CB3"
              : mode === "dark"
              ? "#EAEAEA"
              : "#000000"
          }
        >
          <path
            d="M2.5 9.5L12 4L21.5 9.5"
            stroke={
              pathname.includes("/account-manager")
                ? "#284CB3"
                : mode === "dark"
                ? "#EAEAEA"
                : "#000000"
            }
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M7 21V20C7 17.2386 9.23858 15 12 15V15C14.7614 15 17 17.2386 17 20V21"
            stroke={
              pathname.includes("/account-manager")
                ? "#284CB3"
                : mode === "dark"
                ? "#EAEAEA"
                : "#000000"
            }
            strokeWidth="1.5"
          ></path>
          <path
            d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
            stroke={
              pathname.includes("/account-manager")
                ? "#284CB3"
                : mode === "dark"
                ? "#EAEAEA"
                : "#000000"
            }
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      ),
      children: [
        {
          title: "All Users",
          href: "/account-manager/users/all-users",
        },
        {
          title: "Tenants",
          href: "/account-manager/account/tenants",
        },
        {
          title: "User Logs",
          href: "/account-manager/users/user-logs",
        },
        {
          title: "Roles and Permission",
          href: "/account-manager/account/roles",
        },
      ],
    },
    {
      title: "Reports",
      href: "/reports/template",
      path: "/template",
      allowedRoles: ["Admin", "Tenant"],
      icon: (
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color={
            pathname.includes("/reports")
              ? "#284CB3"
              : mode === "dark"
              ? "#EAEAEA"
              : "#000000"
          }
        >
          <path
            d="M20 12V5.74853C20 5.5894 19.9368 5.43679 19.8243 5.32426L16.6757 2.17574C16.5632 2.06321 16.4106 2 16.2515 2H4.6C4.26863 2 4 2.26863 4 2.6V21.4C4 21.7314 4.26863 22 4.6 22H13"
            stroke={
              pathname.includes("/reports")
                ? "#284CB3"
                : mode === "dark"
                ? "#EAEAEA"
                : "#000000"
            }
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M8 10H16M8 6H12M8 14H11"
            stroke={
              pathname.includes("/reports")
                ? "#284CB3"
                : mode === "dark"
                ? "#EAEAEA"
                : "#000000"
            }
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M16 2V5.4C16 5.73137 16.2686 6 16.6 6H20"
            stroke={
              pathname.includes("/reports")
                ? "#284CB3"
                : mode === "dark"
                ? "#EAEAEA"
                : "#000000"
            }
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M19.9923 15.125L22.5477 15.774C22.8137 15.8416 23.0013 16.0833 22.9931 16.3576C22.8214 22.1159 19.5 23 19.5 23C19.5 23 16.1786 22.1159 16.0069 16.3576C15.9987 16.0833 16.1863 15.8416 16.4523 15.774L19.0077 15.125C19.3308 15.043 19.6692 15.043 19.9923 15.125Z"
            stroke={
              pathname.includes("/reports")
                ? "#284CB3"
                : mode === "dark"
                ? "#EAEAEA"
                : "#000000"
            }
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      ),
      children: [
        {
          title: "Report Templates",
          href: "/reports/template",
        },
        {
          title: "Report History",
          href: "/reports/history",
        },
      ],
    },
    {
      title: "Integration",
      href: "tickets/ticket-types",
      path: "tickets",
      allowedRoles: ["Admin", "Tenant"],
      icon: (
        <svg
          width="24px"
          height="24px"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color={
            pathname.includes("tickets/")
              ? "#284CB3"
              : mode === "dark"
              ? "#EAEAEA"
              : "#000000"
          }
        >
          <path
            d="M3 19H12M21 19H12M12 19V13M12 13H18V5H6V13H12Z"
            stroke={
              pathname.includes("tickets/")
                ? "#284CB3"
                : mode === "dark"
                ? "#EAEAEA"
                : "#000000"
            }
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M9 9.01L9.01 8.99889"
            stroke={
              pathname.includes("tickets/")
                ? "#284CB3"
                : mode === "dark"
                ? "#EAEAEA"
                : "#000000"
            }
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M12 9.01L12.01 8.99889"
            stroke={
              pathname.includes("tickets/")
                ? "#284CB3"
                : mode === "dark"
                ? "#EAEAEA"
                : "#000000"
            }
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      ),
      children: [
        {
          title: "Setup Task Types",
          href: "tickets/ticket-types",
        },
        {
          title: "Tasks list",
          href: "/tickets/tickets-list",
        },
        {
          title: "Notifications",
          href: "",
        },
        {
          title: "Payment Gateways",
          href: "",
        },
      ],
    },
    {
      title: "Settings",
      href: "/settings",
      path: "/settings",
      allowedRoles: ["Admin", "Tenant"],
      icon: (
        <svg
          width="24px"
          height="24px"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color={
            pathname.includes("/settings")
              ? "#284CB3"
              : mode === "dark"
              ? "#EAEAEA"
              : "#000000"
          }
        >
          <path
            d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
            stroke={
              pathname.includes("/settings")
                ? "#284CB3"
                : mode === "dark"
                ? "#EAEAEA"
                : "#000000"
            }
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M19.6224 10.3954L18.5247 7.7448L20 6L18 4L16.2647 5.48295L13.5578 4.36974L12.9353 2H10.981L10.3491 4.40113L7.70441 5.51596L6 4L4 6L5.45337 7.78885L4.3725 10.4463L2 11V13L4.40111 13.6555L5.51575 16.2997L4 18L6 20L7.79116 18.5403L10.397 19.6123L11 22H13L13.6045 19.6132L16.2551 18.5155C16.6969 18.8313 18 20 18 20L20 18L18.5159 16.2494L19.6139 13.598L21.9999 12.9772L22 11L19.6224 10.3954Z"
            stroke={
              pathname.includes("/settings")
                ? "#284CB3"
                : mode === "dark"
                ? "#EAEAEA"
                : "#000000"
            }
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      ),
      children: [
        {
          title: "Account Settings",
          // href: "/settings/account-settings",
          href: "",
        },
        {
          title: "Notification Preferences",
          // href: "/settings/notification-preferences",
          href: "",
        },
        {
          title: "Billing & Subscriptions",
          href: "",
          // href: "/settings/billing",
        },
      ],
    },
  ];

  const routes = links.filter((link) =>
    link.allowedRoles?.includes(user?.role.name)
  );

  return (
    <div className="flex items-start md:h-screen max-w-[400px]">
      <div className="border-end pt-8 w-fit h-full">
        <div className="w-[62px] h-[66px] flex items-center justify-center">
          <Link
            to={"/dashboard"}
            onClick={() => {
              setPageTitle("Dashboar");
              setTopTitle("Dashboar");
              setChildren(links[0].children!);
            }}
          >
            {mode === "dark" ? (
              <img src={logoMono} alt="cloud logo" />
            ) : (
              <img src={logoColored} alt="cloud logo" />
            )}
          </Link>
        </div>
        <div className="md:overflow-auto h-[90vh] relative">
          <div className="pr-2 pr-md-0">
            {routes.map((link) => (
              <div
                role="button"
                key={link.title}
                className="flex items-center gap-2 w-[62px] h-[66px]"
                onClick={() => {
                  setPageTitle(link.children![0].title);
                  sessionStorage.setItem("top-title", link.title);
                  if (link.children) {
                    sessionStorage.setItem(
                      "children",
                      JSON.stringify(link.children)
                    );
                  }
                }}
              >
                {pathname.includes(link.path) ? (
                  <svg
                    width="6"
                    height="50"
                    viewBox="0 0 6 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 0C3.31371 0 6 2.68629 6 6V44C6 47.3137 3.31371 50 0 50V0Z"
                      fill="#284CB3"
                    />
                  </svg>
                ) : (
                  <svg
                    width="6"
                    height="50"
                    viewBox="0 0 6 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 0C3.31371 0 6 2.68629 6 6V44C6 47.3137 3.31371 50 0 50V0Z"
                      fill={mode === "dark" ? "#101222" : "#FFFFFF"}
                    />
                  </svg>
                )}
                <Link
                  to={link.href!}
                  key={link.title}
                  className="md:pl-2"
                  onClick={() => {
                    setPageTitle(link.children![0].title);
                    sessionStorage.setItem("top-title", link.title);
                    if (link.children) {
                      setTopTitle(link.title);
                      setChildren(link.children!);
                      setIsOpen(true);
                    } else {
                      setIsOpen(false);
                    }
                  }}
                >
                  {link.icon}
                </Link>
              </div>
            ))}
          </div>
          <div className="absolute bottom-12 left-5">
            <button
              onClick={() => {
                setPopOpen(!popOpen);
              }}
              className="rounded-full p-2 bg-primary flex items-center justify-center"
            >
              <svg
                width="18px"
                height="18px"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="#FFFFFF"
              >
                <path
                  d="M5 20V19C5 15.134 8.13401 12 12 12V12C15.866 12 19 15.134 19 19V20"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {popOpen && (
        <div
          className={`${
            mode === "dark" ? "bg-lightDark" : "bg-white"
          } absolute bottom-6 left-12 rounded-md shadow-md w-fit`}
        >
          <div className="menu-item px-5 my-1">
            <Link
              to="/crafted/account/settings"
              className="menu-link font-medium"
              onClick={() => setPopOpen(false)}
            >
              Account Settings
            </Link>
          </div>
          <div className="menu-item px-5 ">
            <Link
              to="/change-password"
              className="menu-link font-medium"
              onClick={() => {
                setPopOpen(false);
                setPageTitle("Change Password");
                sessionStorage.setItem("top-title", "Change Password");
              }}
            >
              Change Password
            </Link>
          </div>
          <div className="menu-item px-5 ">
            <a
              onClick={() => {
                logout();
                setPopOpen(false);
              }}
              className="menu-link font-medium"
            >
              Sign Out
            </a>
          </div>
        </div>
      )}
      {isOpen && children.length && (
        <div className="pt-6 w-full md:max-w-[300px] h-full">
          <div className="menu-item w-full mb-[16px]">
            <div className="menu-content pt-8 pb-2 flex items-center justify-between">
              <span
                className={`${
                  mode === "dark" ? "text-[#909BBC]" : "text-[#6A6A6A]"
                } menu-section text-[12px] font-medium text-muted text-uppercase fs-8 ls-1`}
              >
                {topTitle}
              </span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.6875 14.25C1.6875 15.3891 2.61091 16.3125 3.75 16.3125H14.25C15.3891 16.3125 16.3125 15.3891 16.3125 14.25V3.75C16.3125 2.61091 15.3891 1.6875 14.25 1.6875L3.75 1.6875C2.61091 1.6875 1.6875 2.61091 1.6875 3.75L1.6875 14.25ZM3.75 15.1875C3.23223 15.1875 2.8125 14.7678 2.8125 14.25L2.8125 3.75C2.8125 3.23223 3.23223 2.8125 3.75 2.8125L14.25 2.8125C14.7678 2.8125 15.1875 3.23223 15.1875 3.75L15.1875 14.25C15.1875 14.7678 14.7678 15.1875 14.25 15.1875L3.75 15.1875Z"
                  fill={mode === "dark" ? "#EAEAEA" : "#6A6A6A"}
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.125 16.3125C7.43566 16.3125 7.6875 16.0607 7.6875 15.75V2.25C7.6875 1.93934 7.43566 1.6875 7.125 1.6875C6.81434 1.6875 6.5625 1.93934 6.5625 2.25V15.75C6.5625 16.0607 6.81434 16.3125 7.125 16.3125Z"
                  fill={mode === "dark" ? "#EAEAEA" : "#6A6A6A"}
                />
              </svg>
            </div>
          </div>
          <div className="w-full flex items-start flex-col gap-[16px] px-5">
            {children.map((child) => (
              <Link
                key={child?.href!}
                to={child.href!}
                className={`menu-link without-sub w-full ${
                  pathname === child.href!
                    ? "text-primary bg-[#284CB31A] font-semibold text-[14px] px-[12px] py-[10px] rounded-xl w-full"
                    : "py-[10px] w-full font-semibold hover:text-primary hover:bg-[#284CB31A] hover:px-2 hover:rounded-xl hover:font-medium"
                }`}
                onClick={() => setPageTitle(child.title)}
              >
                {child.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewSideMenu;
