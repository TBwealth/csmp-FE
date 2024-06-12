import clsx from "clsx";
import { Link } from "react-router-dom";
import { KTIcon, toAbsoluteUrl } from "../../../helpers";
import { LayoutSetup, useLayout } from "../../core";
import { Header } from "./Header";
import { Navbar } from "./Navbar";
import { useRecoilValue, useSetRecoilState } from "recoil";
import modeAtomsAtom from "../../../../app/atoms/modeAtoms.atom";
import pageAtom from "../../../../app/atoms/pagAtom";

export function HeaderWrapper() {
  const { config, classes } = useLayout();
  const { mode } = useRecoilValue(modeAtomsAtom);
  const setPageTitle = useSetRecoilState(pageAtom);
  if (config.app?.header?.default?.container === "fluid") {
    LayoutSetup.classes.headerContainer.push("container-fluid");
  } else {
    LayoutSetup.classes.headerContainer.push("container-xxl");
  }
  if (!config.app?.header?.display) {
    return null;
  }

  return (
    <div id="kt_app_header" className="app-header">
      <div
        id="kt_app_header_container"
        className={clsx(
          "app-container",
          classes.headerContainer.join(" "),
          config.app?.header?.default?.containerClass,
          mode === "dark" ? "bg-[#0C0D11]" : "bg-[#FCFCFC]"
        )}
      >
        {config.app.sidebar?.display && (
          <>
            {config.layoutType !== "dark-header" &&
            config.layoutType !== "light-header" ? (
              <div
                className="d-flex align-items-center d-lg-none ms-n2 me-2"
                title="Show sidebar menu"
              >
                <div
                  className="btn btn-icon btn-active-color-primary w-35px h-35px"
                  id="kt_app_sidebar_mobile_toggle"
                >
                  <KTIcon iconName="abstract-14" className=" fs-1" />
                </div>
                <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
                  <Link to="/dashboard" className="d-lg-none">
                    {mode === "dark" ? (
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
                            <stop offset="0.198551" stopColor="white" />
                            <stop offset="0.683389" stopColor="#CBCBCB" />
                          </linearGradient>
                          <linearGradient
                            id="paint1_linear_98_13455"
                            x1="12.3522"
                            y1="12.2803"
                            x2="20.2808"
                            y2="15.8173"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="0.198551" stopColor="white" />
                            <stop offset="0.683389" stopColor="#CBCBCB" />
                          </linearGradient>
                          <linearGradient
                            id="paint2_linear_98_13455"
                            x1="0.5"
                            y1="0"
                            x2="36.1576"
                            y2="24.1838"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="0.198551" stopColor="white" />
                            <stop offset="0.683389" stopColor="#CBCBCB" />
                          </linearGradient>
                          <linearGradient
                            id="paint3_linear_98_13455"
                            x1="0.5"
                            y1="0"
                            x2="36.1576"
                            y2="24.1838"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="0.198551" stopColor="white" />
                            <stop offset="0.683389" stopColor="#CBCBCB" />
                          </linearGradient>
                        </defs>
                      </svg>
                    ) : (
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
                            <stop offset="0.198551" stopColor="#2E54C3" />
                            <stop offset="0.683389" stopColor="#1F3A89" />
                          </linearGradient>
                          <linearGradient
                            id="paint1_linear_98_13201"
                            x1="12.3523"
                            y1="12.2803"
                            x2="20.281"
                            y2="15.8173"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="0.198551" stopColor="#2E54C3" />
                            <stop offset="0.683389" stopColor="#1F3A89" />
                          </linearGradient>
                          <linearGradient
                            id="paint2_linear_98_13201"
                            x1="0.5"
                            y1="0"
                            x2="36.1576"
                            y2="24.1838"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="0.198551" stopColor="#2E54C3" />
                            <stop offset="0.683389" stopColor="#1F3A89" />
                          </linearGradient>
                          <linearGradient
                            id="paint3_linear_98_13201"
                            x1="0.5"
                            y1="0"
                            x2="36.1576"
                            y2="24.1838"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="0.198551" stopColor="#2E54C3" />
                            <stop offset="0.683389" stopColor="#1F3A89" />
                          </linearGradient>
                        </defs>
                      </svg>
                    )}
                    {/* <img
                        alt='Logo'
                        src={toAbsoluteUrl('media/logos/default-small.svg')}
                        className='h-30px'
                      /> */}
                  </Link>
                </div>
              </div>
            ) : null}
          </>
        )}

        {!(
          config.layoutType === "dark-sidebar" ||
          config.layoutType === "light-sidebar"
        ) && (
          <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0 me-lg-15">
            <Link to="/dashboard">
              {config.layoutType === "dark-header" ? (
                <img
                  alt="Logo"
                  src={toAbsoluteUrl("media/logos/default-dark.svg")}
                  className="h-20px h-lg-30px app-sidebar-logo-default"
                />
              ) : (
                <>
                  <img
                    alt="Logo"
                    src={toAbsoluteUrl("media/logos/default.svg")}
                    className="h-20px h-lg-30px app-sidebar-logo-default theme-light-show"
                  />
                  <img
                    alt="Logo"
                    src={toAbsoluteUrl("media/logos/default-dark.svg")}
                    className="h-20px h-lg-30px app-sidebar-logo-default theme-dark-show"
                  />
                </>
              )}
            </Link>
          </div>
        )}

        <div
          id="kt_app_header_wrapper"
          className="d-flex align-items-stretch justify-content-between flex-lg-grow-1 border-botto"
        >
          {config.app.header.default?.content === "menu" &&
            config.app.header.default.menu?.display && (
              <div
                className="app-header-menu app-header-mobile-drawer align-items-stretch"
                data-kt-drawer="true"
                data-kt-drawer-name="app-header-menu"
                data-kt-drawer-activate="{default: true, lg: false}"
                data-kt-drawer-overlay="true"
                data-kt-drawer-width="225px"
                data-kt-drawer-direction="end"
                data-kt-drawer-toggle="#kt_app_header_menu_toggle"
                data-kt-swapper="true"
                data-kt-swapper-mode="{default: 'append', lg: 'prepend'}"
                data-kt-swapper-parent="{default: '#kt_app_body', lg: '#kt_app_header_wrapper'}"
              >
                <Header />
              </div>
            )}
          <Navbar />
        </div>
      </div>
    </div>
  );
}
