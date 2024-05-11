import clsx from "clsx";
import { KTIcon, toAbsoluteUrl } from "../../../helpers";
import {
  HeaderNotificationsMenu,
  HeaderUserMenu,
  Search,
  ThemeModeSwitcher,
} from "../../../partials";
import { useLayout } from "../../core";
import modeAtomsAtom from "../../../../app/atoms/modeAtoms.atom";
import { useRecoilValue } from "recoil";
import pagAtom from "../../../../app/atoms/pagAtom";
const itemClass = "ms-1 ms-md-4";
const btnClass =
  "btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px";
const userAvatarClass = "symbol-35px";
const btnIconClass = "fs-2";

const Navbar = () => {
  const { config } = useLayout();
  const { mode } = useRecoilValue(modeAtomsAtom);
  const pageTitle = useRecoilValue(pagAtom);
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  return (
    <div className="app-navbar flex-shrink-0">
      
      {/* <div className={clsx('app-navbar-item align-items-stretch', itemClass)}>
        <Search />
      </div> */}

      {/* <div className={clsx('app-navbar-item', itemClass)}>
        <div id='kt_activities_toggle' className={btnClass}>
          <KTIcon iconName='chart-simple' className={btnIconClass} />
        </div>
      </div>

      <div className={clsx('app-navbar-item', itemClass)}>
        <div
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          className={btnClass}
        >
          <KTIcon iconName='element-plus' className={btnIconClass} />
        </div>
        <HeaderNotificationsMenu />
      </div> */}

      {/* <div className={clsx('app-navbar-item', itemClass)}>
        <div className={clsx('position-relative', btnClass)} id='kt_drawer_chat_toggle'>
          <KTIcon iconName='message-text-2' className={btnIconClass} />
          <span className='bullet bullet-dot bg-success h-6px w-6px position-absolute translate-middle top-0 start-50 animation-blink' />
        </div>
      </div> */}

      <div className="flex items-center gap-6">
        <button>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.75 12.75L15.75 15.75"
              stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2.25 8.25C2.25 11.5637 4.93629 14.25 8.25 14.25C9.90972 14.25 11.4121 13.5761 12.4983 12.487C13.5808 11.4017 14.25 9.90398 14.25 8.25C14.25 4.93629 11.5637 2.25 8.25 2.25C4.93629 2.25 2.25 4.93629 2.25 8.25Z"
              stroke={mode === "dark" ? "#EAEAEA" : "#373737"}
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <div className={clsx("app-navbar-item", itemClass)}>
          <ThemeModeSwitcher
            toggleBtnClass={clsx("btn-active-light-primary btn-custom")}
          />
        </div>
        <button>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14.25 2.0625C13.318 2.0625 12.5625 2.81802 12.5625 3.75C12.5625 4.68198 13.318 5.4375 14.25 5.4375C15.182 5.4375 15.9375 4.68198 15.9375 3.75C15.9375 2.81802 15.182 2.0625 14.25 2.0625ZM11.4375 3.75C11.4375 2.1967 12.6967 0.9375 14.25 0.9375C15.8033 0.9375 17.0625 2.1967 17.0625 3.75C17.0625 5.3033 15.8033 6.5625 14.25 6.5625C12.6967 6.5625 11.4375 5.3033 11.4375 3.75Z"
              fill={mode === "dark" ? "#EAEAEA" : "#373737"}
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.42024 15.2635C7.68896 15.1076 8.03317 15.1991 8.18905 15.4678C8.27146 15.6099 8.38975 15.7278 8.53207 15.8098C8.67439 15.8918 8.83574 15.9349 8.99998 15.9349C9.16423 15.9349 9.32558 15.8918 9.4679 15.8098C9.61022 15.7278 9.72851 15.6099 9.81092 15.4678C9.9668 15.1991 10.311 15.1076 10.5797 15.2635C10.8485 15.4194 10.9399 15.7636 10.784 16.0323C10.6027 16.3449 10.3425 16.6043 10.0294 16.7847C9.7163 16.965 9.36131 17.0599 8.99998 17.0599C8.63866 17.0599 8.28367 16.965 7.97056 16.7847C7.65746 16.6043 7.39723 16.3449 7.21592 16.0323C7.06004 15.7636 7.15152 15.4194 7.42024 15.2635Z"
              fill={mode === "dark" ? "#EAEAEA" : "#373737"}
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.40769 2.52117C6.35388 1.51191 7.64524 0.9375 9.00004 0.9375C9.28676 0.9375 9.57096 0.963257 9.84985 1.01354C10.1556 1.06866 10.3587 1.36119 10.3036 1.66692C10.2485 1.97265 9.95596 2.17581 9.65023 2.12069C9.43671 2.08219 9.21931 2.0625 9.00004 2.0625C7.96789 2.0625 6.97007 2.49952 6.22842 3.2906C5.48563 4.08292 5.06254 5.16485 5.06254 6.3C5.06254 9.17709 4.48402 11.0668 3.87586 12.2561C3.74257 12.5168 3.60831 12.7428 3.47919 12.9375H9.00004C9.3107 12.9375 9.56254 13.1893 9.56254 13.5C9.56254 13.8107 9.3107 14.0625 9.00004 14.0625H2.25004C2.0053 14.0625 1.78864 13.9042 1.71419 13.6711C1.64038 13.4399 1.72316 13.1878 1.91897 13.0452L1.92551 13.0402C1.93402 13.0334 1.95021 13.0202 1.97301 12.9999C2.01861 12.9594 2.09077 12.8906 2.18103 12.789C2.36126 12.586 2.61525 12.2503 2.87422 11.7439C3.39106 10.7332 3.93754 9.02291 3.93754 6.3C3.93754 4.88907 4.46266 3.52921 5.40769 2.52117Z"
              fill={mode === "dark" ? "#EAEAEA" : "#373737"}
            />
            <path
              d="M14.1244 12.2553C14.2577 12.516 14.3919 12.7421 14.5211 12.9367H9.0002C8.68954 12.9367 8.4377 13.1886 8.4377 13.4992C8.4377 13.8099 8.68954 14.0617 9.0002 14.0617H15.7502C15.9949 14.0617 16.2116 13.9035 16.2861 13.6703C16.3599 13.4392 16.2771 13.187 16.0813 13.0445L16.0747 13.0394C16.0662 13.0326 16.05 13.0194 16.0272 12.9991C15.9816 12.9586 15.9095 12.8898 15.8192 12.7882C15.639 12.5853 15.385 12.2496 15.126 11.7431C14.7372 10.9827 14.3316 9.82639 14.1545 8.14074C14.0871 7.49922 12.9602 7.53614 13.0347 8.24925C13.2244 10.0645 13.666 11.3589 14.1244 12.2553Z"
              fill={mode === "dark" ? "#EAEAEA" : "#373737"}
            />
          </svg>
        </button>
      </div>

      {/* <div className={clsx("app-navbar-item mx-5", itemClass)}>
        <div className="badge badge-light-primary fw-bolder fs-6 px-2 py-1 ms-2">
          {user?.tenant}
        </div>
      </div> */}

      {/* <div className={clsx("app-navbar-item", itemClass)}>
        <div
          className={clsx("cursor-pointer symbol", userAvatarClass)}
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach="parent"
          data-kt-menu-placement="bottom-end"
        >
          <img src={toAbsoluteUrl("media/avatars/300-3.jpg")} alt="" />
        </div>
        <HeaderUserMenu />
      </div> */}

      {config.app?.header?.default?.menu?.display && (
        <div
          className="app-navbar-item d-lg-none ms-2 me-n3"
          title="Show header menu"
        >
          <div
            className="btn btn-icon btn-active-color-primary w-35px h-35px"
            id="kt_app_header_menu_toggle"
          >
            <KTIcon iconName="text-align-left" className={btnIconClass} />
          </div>
        </div>
      )}
    </div>
  );
};

export { Navbar };
