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

import { routes } from "@/navigation/routes.tsx";
import { ROUTES } from "@/shared/const/Routes.ts";
import { signInAction } from "@/shared/redux/actions/signInAction.ts";
import { useAppDispatch } from "@/shared/redux/configStore.ts";

export const App: FC = () => {
    const lp = useLaunchParams();
    const dispatch = useAppDispatch();
    const miniApp = useMiniApp();
    const themeParams = useThemeParams();
    const viewport = useViewport();
    const [settingsButton] = initSettingsButton();
    const [backButton] = initBackButton();
    const navigator = useMemo(() => initNavigator("app-navigation-state"), []);
    const [location, reactNavigator] = useIntegration(navigator);
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

        if (ROUTES.MAIN === location.pathname || ROUTES.SETTING === location.pathname)
            backButton.hide();
        else {
            backButton.show();
        }

        // if (!ROUTES.MAIN || !ROUTES.BONUS) backButton.show();
    }, [settingsButton, backButton, location]);

    settingsButton.on("click", () => reactNavigator.push(ROUTES.SETTING));

    // Create a new application navigator and attach it to the browser history, so it could modify
    // it and listen to its changes.

    // Don't forget to attach the navigator to allow it to control the BackButton state as well
    // as browser history.
    useEffect(() => {
        navigator.attach();

        return () => navigator.detach();
    }, [navigator]);

    // @ts-ignore
    // @ts-ignore
    useEffect(() => {
        void dispatch(
            signInAction({
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
                initDataRaw: miniApp.state.state.initDataRaw,
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
                user: miniApp.state.state.initData.user,
            }),
        );
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    }, [dispatch, miniApp.state.state.initData.user, miniApp.state.state.initDataRaw]);

    return (
        <AppRoot
            appearance={miniApp.isDark ? "dark" : "light"}
            platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
            style={{ height: "100%" }}
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
