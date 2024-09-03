import { type FC, useEffect, useMemo } from "react";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import { useIntegration } from "@telegram-apps/react-router-integration";
import {
    bindMiniAppCSSVars,
    bindThemeParamsCSSVars,
    bindViewportCSSVars,
    initBackButton,
    initNavigator,
    initSettingsButton,
    useLaunchParams,
    useMiniApp,
    useThemeParams,
    useViewport,
} from "@telegram-apps/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";

import { getAuthApi } from "@/entities/user/getAuth";
import { routes } from "@/navigation/routes.tsx";
import { ROUTES } from "@/shared/const/Routes.ts";

export const App: FC = () => {
    const lp = useLaunchParams();
    const miniApp = useMiniApp();
    const themeParams = useThemeParams();
    const viewport = useViewport();
    const [settingsButton] = initSettingsButton();
    const [backButton] = initBackButton();
    useEffect(() => {
        return bindMiniAppCSSVars(miniApp, themeParams);
    }, [miniApp, themeParams]);
    useEffect(() => {
        return bindThemeParamsCSSVars(themeParams);
    }, [themeParams]);

    useEffect(() => {
        return viewport && bindViewportCSSVars(viewport);
    }, [viewport]);

    useEffect(() => {
        settingsButton.show();

        if (!ROUTES.MAIN) backButton.show();
    }, [settingsButton, backButton]);

    // Create a new application navigator and attach it to the browser history, so it could modify
    // it and listen to its changes.
    const navigator = useMemo(() => initNavigator("app-navigation-state"), []);
    const [location, reactNavigator] = useIntegration(navigator);

    // Don't forget to attach the navigator to allow it to control the BackButton state as well
    // as browser history.
    useEffect(() => {
        navigator.attach();

        return () => navigator.detach();
    }, [navigator]);

    useEffect(() => {
        void getAuthApi({
            initDataRaw: `${miniApp.state.state.initDataRaw}`,
            user: miniApp.state.state.initData.user,
        }).then((data) => localStorage.setItem("token", data.token));
    }, []);

    return (
        <AppRoot
            appearance={miniApp.isDark ? "dark" : "light"}
            platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
        >
            <Router location={location} navigator={reactNavigator}>
                <Routes>
                    {routes.map((route) => (
                        <Route key={route.path} {...route} />
                    ))}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </AppRoot>
    );
};
