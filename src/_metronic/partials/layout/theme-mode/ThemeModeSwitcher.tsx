import clsx from "clsx";
import { KTIcon } from "../../../helpers";
import { ThemeModeComponent } from "../../../assets/ts/layout";
import { ThemeModeType, useThemeMode } from "./ThemeModeProvider";
import { useRecoilState } from "recoil";
import modeAtom from "../../../../app/atoms/modeAtoms.atom";

type Props = {
  toggleBtnClass?: string;
  toggleBtnIconClass?: string;
  menuPlacement?: string;
  menuTrigger?: string;
};

const systemMode = ThemeModeComponent.getSystemMode() as "dark";

const ThemeModeSwitcher = ({
  toggleBtnClass = "",
  toggleBtnIconClass = "fs-1",
  menuPlacement = "bottom-end",
  menuTrigger = "{default: 'click', lg: 'hover'}",
}: Props) => {
  const { mode, menuMode, updateMode, updateMenuMode } = useThemeMode();
  const calculatedMode = mode === "dark" ? systemMode : mode;
  const switchMode = (_mode: ThemeModeType) => {
    updateMenuMode(_mode);
    updateMode(_mode);
  };
  const [modeatom, setModeState] = useRecoilState(modeAtom);

  // console.log(modeatom);

  return (
    <>
      {/* begin::Menu toggle */}
      <a
        href="#"
        className={clsx("btn btn-icon ", toggleBtnClass)}
        data-kt-menu-trigger={menuTrigger}
        data-kt-menu-attach="parent"
        data-kt-menu-placement={menuPlacement}
      >
        {/* {calculatedMode === "dark" && (
          <KTIcon
            iconName="moon"
            className={clsx("theme-dark-hide", toggleBtnIconClass)}
          />
        )}

        {calculatedMode === "light" && (
          <KTIcon
            iconName="night-day"
            className={clsx("theme-dark-hide", toggleBtnIconClass)}
          />
        )} */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.25 7.62995C1.25 11.5622 4.43776 14.75 8.37005 14.75C11.1656 14.75 13.5849 13.1388 14.75 10.7944C8.37005 10.7944 5.20559 7.62995 5.20559 1.25C2.86116 2.41508 1.25 4.83436 1.25 7.62995Z"
            stroke={modeatom?.mode === "dark" ? "#EAEAEA" : "#373737"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
      {/* begin::Menu toggle */}

      {/* begin::Menu */}
      <div
        className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-muted menu-active-bg menu-state-primary fw-semibold py-4 fs-base w-175px"
        data-kt-menu="true"
      >
        {/* begin::Menu item */}
        <div className="menu-item px-3 my-0">
          <a
            href="#"
            className={clsx("menu-link px-3 py-2", {
              active: menuMode === "dark",
            })}
            onClick={() => {
              localStorage.setItem("mode", JSON.stringify("dark"));
              setModeState({ mode: "dark" });
              document.documentElement.setAttribute("data-bs-theme", "dark");
              // localStorage.setItem("kt_theme_mode_value", "dark");
              // location.reload();
            }}
          >
            <span className="menu-icon" data-kt-element="icon">
              <KTIcon iconName="night-day" className="fs-1" />
            </span>
            <span className="menu-title">dark</span>
          </a>
        </div>
        {/* end::Menu item */}

        {/* begin::Menu item */}
        <div className="menu-item px-3 my-0">
          <a
            href="#"
            className={clsx("menu-link px-3 py-2", {
              active: menuMode === "dark",
            })}
            onClick={() => {
              localStorage.setItem("mode", JSON.stringify("light"));
              setModeState({ mode: "light" });
              document.documentElement.setAttribute("data-bs-theme", "light");
              // localStorage.setItem("kt_theme_mode_value", "light");
              // location.reload();
              // updateMode("light");
              // updateMenuMode("light");
            }}
          >
            <span className="menu-icon" data-kt-element="icon">
              <KTIcon iconName="moon" className="fs-1" />
            </span>
            <span className="menu-title">light</span>
          </a>
        </div>
        {/* end::Menu item */}

        {/* begin::Menu item */}
        {/* <div className="menu-item px-3 my-0">
          <a
            href="#"
            className={clsx("menu-link px-3 py-2", {
              active: menuMode,
            })}
            onClick={() => switchMode("dark")}
          >
            <span className="menu-icon" data-kt-element="icon">
              <KTIcon iconName="screen" className="fs-1" />
            </span>
            <span className="menu-title">System</span>
          </a>
        </div> */}
        {/* end::Menu item */}
      </div>
      {/* end::Menu */}
    </>
  );
};

export { ThemeModeSwitcher };
