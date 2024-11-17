import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { I18nProvider } from "../_metronic/i18n/i18nProvider";
import { LayoutProvider, LayoutSplashScreen } from "../_metronic/layout/core";
import { MasterInit } from "../_metronic/layout/MasterInit";
import { AuthInit } from "./pages/auth";
import { ThemeModeProvider } from "../_metronic/partials";
import { RecoilRoot } from "recoil";
import AxiosContextProvider from "./api/context/axiosContext";

const App = () => {
  
  return (
    <RecoilRoot>
      <Suspense fallback={<LayoutSplashScreen />}>
        <I18nProvider>
          <LayoutProvider>
            <ThemeModeProvider>
              <AxiosContextProvider>
                <AuthInit>
                  <Outlet />
                  <MasterInit />
                </AuthInit>
              </AxiosContextProvider>
            </ThemeModeProvider>
          </LayoutProvider>
        </I18nProvider>
      </Suspense>
    </RecoilRoot>
  );
};

export { App };
