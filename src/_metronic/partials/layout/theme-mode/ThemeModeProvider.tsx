/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { ThemeModeComponent } from "../../../assets/ts/layout";
import { toAbsoluteUrl } from "../../../helpers";

export type ThemeModeType = "dark" | "light";
export const themeModelSKey = "kt_theme_mode_value";
export const themeMenuModeLSKey = "kt_theme_mode_menu";

const darkMode = "dark"; // Simplifying as we're only using dark mode

type ThemeModeContextType = {
  mode: ThemeModeType;
  menuMode: ThemeModeType;
  updateMode: (_mode: ThemeModeType) => void;
  updateMenuMode: (_mode: ThemeModeType) => void;
};

const themeModeSwitchHelper = () => {
  // No need to check for mode as we're only using dark mode
  const imageUrl = "media/patterns/header-bg.jpg"; // Directly using dark mode image
  document.body.style.backgroundImage = `url("${toAbsoluteUrl(imageUrl)}")`;
};

const getThemeModeFromLocalStorage = (): ThemeModeType => {
  return darkMode; // Always return dark mode
};

const defaultThemeMode: ThemeModeContextType = {
  mode: darkMode,
  menuMode: darkMode,
  updateMode: (_mode: ThemeModeType) => {},
  updateMenuMode: (_menuMode: ThemeModeType) => {},
};

const ThemeModeContext = createContext<ThemeModeContextType>({
  mode: darkMode,
  menuMode: darkMode,
  updateMode: (_mode: ThemeModeType) => {},
  updateMenuMode: (_menuMode: ThemeModeType) => {},
});

const useThemeMode = () => useContext(ThemeModeContext);

const ThemeModeProvider = ({ children }: { children: React.ReactNode }) => {
  // Initializing state directly with darkMode, as there's no other option
  const [mode] = useState<ThemeModeType>(darkMode);
  const [menuMode] = useState<ThemeModeType>(darkMode);

  // Simplified update functions as mode can only be dark
  const updateMode = () => {
    themeModeSwitchHelper();
    ThemeModeComponent.init();
  };

  const updateMenuMode = () => {
    // Since mode is fixed, we don't need to actually change anything here
  };

  useEffect(() => {
    updateMode();
    updateMenuMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeModeContext.Provider
      value={{ mode, menuMode, updateMode, updateMenuMode }}
    >
      {children}
    </ThemeModeContext.Provider>
  );
};

export { ThemeModeProvider, useThemeMode };
