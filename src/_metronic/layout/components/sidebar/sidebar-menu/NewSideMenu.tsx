import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import modeAtomsAtom from "../../../../../app/atoms/modeAtoms.atom";
import pageAtom from "../../../../../app/atoms/pagAtom";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../../../app/pages/auth";

type Links = {
  title: string;
  href?: string;
  path: string;
  children?: any[];
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

  useEffect(() => {
    const localChildren = sessionStorage.getItem("children");
    const localtitle = sessionStorage.getItem("top-title");
    if (localChildren) {
      const parsed = JSON.parse(localChildren);
      setIsOpen(true);
      setChildren(parsed);
      setTopTitle(localtitle!);
    }
  }, []);

  const links: Links[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      path: "/dashboard",
      icon: (
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          stroke-width="1.5"
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
      icon: (
        <svg
          width="24px"
          height="24px"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color={
            pathname.includes("/cloud-provider")
              ? "#284CB3"
              : mode === "dark"
              ? "#EAEAEA"
              : "#000000"
          }
        >
          <path
            d="M8 9C8 9 9 8 12 8C15 8 16 9 16 9"
            stroke={
              pathname.includes("/cloud-provider")
                ? "#284CB3"
                : mode === "dark"
                ? "#EAEAEA"
                : "#000000"
            }
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M12 14C12.5523 14 13 13.5523 13 13C13 12.4477 12.5523 12 12 12C11.4477 12 11 12.4477 11 13C11 13.5523 11.4477 14 12 14Z"
            fill={
              pathname.includes("/cloud-provider")
                ? "#284CB3"
                : mode === "dark"
                ? "#EAEAEA"
                : "#000000"
            }
            stroke={
              pathname.includes("/cloud-provider")
                ? "#284CB3"
                : mode === "dark"
                ? "#EAEAEA"
                : "#000000"
            }
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M5 18L3.13036 4.91253C3.05646 4.39524 3.39389 3.91247 3.90398 3.79912L11.5661 2.09641C11.8519 2.03291 12.1481 2.03291 12.4339 2.09641L20.096 3.79912C20.6061 3.91247 20.9435 4.39524 20.8696 4.91252L19 18C18.9293 18.495 18.5 21.5 12 21.5C5.5 21.5 5.07071 18.495 5 18Z"
            stroke={
              pathname.includes("/cloud-provider")
                ? "#284CB3"
                : mode === "dark"
                ? "#EAEAEA"
                : "#000000"
            }
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
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
      ],
    },
    {
      title: "Security Monitoring",
      href: "/monitoring/resource-scanning",
      path: "/monitoring",
      icon: (
        <svg
          width="24px"
          height="24px"
          stroke-width="1.5"
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
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
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
            stroke-width="1.5"
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
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
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
          title: "Network Log",
          href: "",
        },
      ],
    },
    {
      title: "Compliance Management",
      href: "/policy/policies",
      path: "/policy",
      icon: (
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          stroke-width="1.5"
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
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
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
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
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
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
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
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      ),
      children: [
        {
          title: "Policy Enforcement",
          href: "/policy/policies",
        },
        {
          title: "Regulatory Compliance",
          href: "",
        },
      ],
    },
    {
      title: "User Management",
      href: "/account-manager/users/all-users",
      path: "/account-manager",
      icon: (
        <svg
          width="24px"
          height="24px"
          stroke-width="1.5"
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
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
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
            stroke-width="1.5"
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
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
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
      title: "Integration",
      href: "tickets/ticket-types",
      path: "tickets",
      icon: (
        <svg
          width="24px"
          height="24px"
          stroke-width="1.5"
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
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
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
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
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
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
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
      icon: (
        <svg
          width="24px"
          height="24px"
          stroke-width="1.5"
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
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
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
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
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
    // {
    //   title: "Support",
    //   href: "/",
    //   icon: (
    //     <svg
    //       width="24px"
    //       height="24px"
    //       viewBox="0 0 24 24"
    //       stroke-width="1.5"
    //       fill="none"
    //       xmlns="http://www.w3.org/2000/svg"
    //       color={
    //         pathname === "/support"
    //           ? "#284CB3"
    //           : mode === "dark"
    //           ? "#EAEAEA"
    //           : "#000000"
    //       }
    //     >
    //       <path
    //         d="M4 11.4998L3.51493 11.6211C2.62459 11.8437 2 12.6436 2 13.5614V15.4382C2 16.356 2.62459 17.1559 3.51493 17.3785L5.25448 17.8134C5.63317 17.9081 6 17.6217 6 17.2313V11.7683C6 11.3779 5.63317 11.0915 5.25448 11.1862L4 11.4998ZM4 11.4998V11C4 6.58172 7.58172 3 12 3C16.4183 3 20 6.58172 20 11V11.4998M20 11.4998L20.4851 11.6211C21.3754 11.8437 22 12.6436 22 13.5614V15.4382C22 16.356 21.3754 17.1559 20.4851 17.3785L20 17.4998M20 11.4998L18.7455 11.1862C18.3668 11.0915 18 11.3779 18 11.7683V17.2313C18 17.6217 18.3668 17.9081 18.7455 17.8134L20 17.4998M15 20.5H18C19.1046 20.5 20 19.6046 20 18.5V18V17.4998M15 20.5C15 19.6716 14.3284 19 13.5 19H10.5C9.67157 19 9 19.6716 9 20.5C9 21.3284 9.67157 22 10.5 22H13.5C14.3284 22 15 21.3284 15 20.5Z"
    //         stroke={
    //           pathname === "/support"
    //             ? "#284CB3"
    //             : mode === "dark"
    //             ? "#EAEAEA"
    //             : "#000000"
    //         }
    //         stroke-width="1.5"
    //       ></path>
    //     </svg>
    //   ),
    // },
  ];

  console.log(popOpen);

  return (
    <div className="flex items-start">
      <div className="border-end pr-2 pt-8 w-fit md:h-screen">
        <div className="p-3">
          {mode === "dark" ? (
            <Link
              to={"/dashboard"}
              onClick={() => {
                setPageTitle("Dashboar");
                setTopTitle("Dashboar");
                setChildren(links[0].children!);
              }}
            >
              <svg
                width="30"
                height="34"
                viewBox="0 0 30 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.5885 12.8143C14.6545 12.3515 15.3147 12.3515 15.3808 12.8143L16.5851 21.2567C16.6199 21.5009 16.4327 21.7196 16.1889 21.7196H13.7803C13.5365 21.7196 13.3493 21.5009 13.3841 21.2567L14.5885 12.8143Z"
                  fill="url(#paint0_linear_98_13455)"
                />
                <path
                  d="M12.3522 14.9594C12.3522 13.4798 13.5376 12.2803 15 12.2803C16.4624 12.2803 17.6478 13.4798 17.6478 14.9594C17.6478 16.4391 16.4624 17.6385 15 17.6385C13.5376 17.6385 12.3522 16.4391 12.3522 14.9594Z"
                  fill="url(#paint1_linear_98_13455)"
                />
                <path
                  d="M5.54348 11.5643C5.54348 11.491 5.58193 11.4233 5.64434 11.3866L14.8991 5.95127C14.9615 5.91461 15.0385 5.91461 15.1009 5.95127L22.8916 10.5268C22.954 10.5634 23.0309 10.5634 23.0933 10.5268L27.7331 7.80182C27.8676 7.72283 27.8676 7.52539 27.7331 7.4464L15.1009 0.0274951C15.0385 -0.00916492 14.9615 -0.00916507 14.8991 0.0274949L0.600864 8.42489C0.538449 8.46154 0.5 8.52929 0.5 8.60259V23.4404C0.5 23.5984 0.668121 23.6971 0.802614 23.6181L5.44261 20.893C5.50503 20.8564 5.54348 20.7886 5.54348 20.7153V11.5643Z"
                  fill="url(#paint2_linear_98_13455)"
                />
                <path
                  d="M7.20561 23.5303C7.14319 23.4937 7.06628 23.4937 7.00386 23.5303L2.3641 26.2553C2.22962 26.3342 2.22962 26.5317 2.3641 26.6107L14.8991 33.9725C14.9615 34.0092 15.0385 34.0092 15.1009 33.9725L29.3991 25.5751C29.4616 25.5385 29.5 25.4707 29.5 25.3974V10.6737C29.5 10.5158 29.3319 10.417 29.1974 10.496L24.5574 13.2211C24.495 13.2578 24.4565 13.3255 24.4565 13.3988V22.4357C24.4565 22.509 24.4181 22.5767 24.3557 22.6134L15.1009 28.0487C15.0385 28.0854 14.9615 28.0854 14.8991 28.0487L7.20561 23.5303Z"
                  fill="url(#paint3_linear_98_13455)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_98_13455"
                    x1="12.3522"
                    y1="12.2803"
                    x2="20.2808"
                    y2="15.8173"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.198551" stop-color="white" />
                    <stop offset="0.683389" stop-color="#CBCBCB" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_98_13455"
                    x1="12.3522"
                    y1="12.2803"
                    x2="20.2808"
                    y2="15.8173"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.198551" stop-color="white" />
                    <stop offset="0.683389" stop-color="#CBCBCB" />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_98_13455"
                    x1="0.5"
                    y1="0"
                    x2="36.1576"
                    y2="24.1838"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.198551" stop-color="white" />
                    <stop offset="0.683389" stop-color="#CBCBCB" />
                  </linearGradient>
                  <linearGradient
                    id="paint3_linear_98_13455"
                    x1="0.5"
                    y1="0"
                    x2="36.1576"
                    y2="24.1838"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.198551" stop-color="white" />
                    <stop offset="0.683389" stop-color="#CBCBCB" />
                  </linearGradient>
                </defs>
              </svg>
            </Link>
          ) : (
            <Link
              to={"/dashboard"}
              onClick={() => {
                setTopTitle("Dashboar");
                setChildren(links[0].children!);
              }}
            >
              <svg
                width="30"
                height="34"
                viewBox="0 0 30 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.5886 12.8143C14.6546 12.3515 15.3148 12.3515 15.3809 12.8143L16.5852 21.2567C16.62 21.5009 16.4328 21.7196 16.189 21.7196H13.7804C13.5366 21.7196 13.3494 21.5009 13.3843 21.2567L14.5886 12.8143Z"
                  fill="url(#paint0_linear_98_13201)"
                />
                <path
                  d="M12.3523 14.9594C12.3523 13.4798 13.5378 12.2803 15.0001 12.2803C16.4625 12.2803 17.6479 13.4798 17.6479 14.9594C17.6479 16.4391 16.4625 17.6385 15.0001 17.6385C13.5378 17.6385 12.3523 16.4391 12.3523 14.9594Z"
                  fill="url(#paint1_linear_98_13201)"
                />
                <path
                  d="M5.54348 11.5643C5.54348 11.491 5.58193 11.4233 5.64434 11.3866L14.8991 5.95127C14.9615 5.91461 15.0385 5.91461 15.1009 5.95127L22.8916 10.5268C22.954 10.5634 23.0309 10.5634 23.0933 10.5268L27.7331 7.80182C27.8676 7.72283 27.8676 7.52539 27.7331 7.4464L15.1009 0.0274951C15.0385 -0.00916492 14.9615 -0.00916507 14.8991 0.0274949L0.600864 8.42489C0.538449 8.46154 0.5 8.52929 0.5 8.60259V23.4404C0.5 23.5984 0.668121 23.6971 0.802614 23.6181L5.44261 20.893C5.50503 20.8564 5.54348 20.7886 5.54348 20.7153V11.5643Z"
                  fill="url(#paint2_linear_98_13201)"
                />
                <path
                  d="M7.20561 23.5303C7.14319 23.4937 7.06628 23.4937 7.00386 23.5303L2.3641 26.2553C2.22962 26.3342 2.22962 26.5317 2.3641 26.6107L14.8991 33.9725C14.9615 34.0092 15.0385 34.0092 15.1009 33.9725L29.3991 25.5751C29.4616 25.5385 29.5 25.4707 29.5 25.3974V10.6737C29.5 10.5158 29.3319 10.417 29.1974 10.496L24.5574 13.2211C24.495 13.2578 24.4565 13.3255 24.4565 13.3988V22.4357C24.4565 22.509 24.4181 22.5767 24.3557 22.6134L15.1009 28.0487C15.0385 28.0854 14.9615 28.0854 14.8991 28.0487L7.20561 23.5303Z"
                  fill="url(#paint3_linear_98_13201)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_98_13201"
                    x1="12.3523"
                    y1="12.2803"
                    x2="20.281"
                    y2="15.8173"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.198551" stop-color="#2E54C3" />
                    <stop offset="0.683389" stop-color="#1F3A89" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_98_13201"
                    x1="12.3523"
                    y1="12.2803"
                    x2="20.281"
                    y2="15.8173"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.198551" stop-color="#2E54C3" />
                    <stop offset="0.683389" stop-color="#1F3A89" />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_98_13201"
                    x1="0.5"
                    y1="0"
                    x2="36.1576"
                    y2="24.1838"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.198551" stop-color="#2E54C3" />
                    <stop offset="0.683389" stop-color="#1F3A89" />
                  </linearGradient>
                  <linearGradient
                    id="paint3_linear_98_13201"
                    x1="0.5"
                    y1="0"
                    x2="36.1576"
                    y2="24.1838"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.198551" stop-color="#2E54C3" />
                    <stop offset="0.683389" stop-color="#1F3A89" />
                  </linearGradient>
                </defs>
              </svg>
            </Link>
          )}
        </div>
        <div className="mt-12">
          {links.map((link) => (
            <div
              className="flex items-center gap-2 mb-6"
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
        <div className="mt-20 pl-3">
        <button
          onClick={() => {
            setPopOpen(!popOpen);
          }}
          className="rounded-full p-2 bg-primary flex items-center justify-center"
        >
          <svg
            width="18px"
            height="18px"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="#FFFFFF"
          >
            <path
              d="M5 20V19C5 15.134 8.13401 12 12 12V12C15.866 12 19 15.134 19 19V20"
              stroke="#FFFFFF"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
              stroke="#FFFFFF"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </button>
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
              className="menu-link"
              onClick={() => setPopOpen(false)}
            >
              Account Settings
            </Link>
          </div>
          <div className="menu-item px-5">
            <a
              onClick={() => {
                logout();
                setPopOpen(false);
              }}
              className="menu-link"
            >
              Sign Out
            </a>
          </div>
        </div>
      )}
      {isOpen && children.length && (
        <div className="pt-6">
          <div className="menu-item">
            <div className="menu-content pt-8 pb-2">
              <span className="menu-section text-muted text-uppercase fs-8 ls-1">
                {topTitle}
              </span>
            </div>
          </div>
          <div className="w-full flex items-start flex-col gap-6">
            {children.map((child) => (
              <Link
                to={child.href!}
                className={`menu-link without-sub ${
                  pathname === child.href!
                    ? "bg-primary text-white p-3 rounded-r-md w-full"
                    : "p-3 w-full"
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