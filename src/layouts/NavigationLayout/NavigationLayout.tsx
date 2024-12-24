import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import cnBind from "classnames/bind";

import styles from "./NavigationLayout.module.scss";

const cx = cnBind.bind(styles);

type ComponentProps = Record<string, any>;

interface ComponentMap {
    [key: string]: (props: any) => JSX.Element;
}

interface NavigationLayoutProps {
    componentMap: ComponentMap;
    componentProps: { [key: string]: ComponentProps };
    initialComponent: string;
}

export const NavigationLayout = ({
    componentMap,
    componentProps,
    initialComponent,
}: NavigationLayoutProps) => {
    const { url } = useParams<{ url: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const urlInit =
        initialComponent === "/"
            ? initialComponent
            : location.pathname.split("/").slice(1).join("/");
    const [currentComponent, setCurrentComponent] = useState<string>(url || initialComponent);
    useEffect(() => {
        if (initialComponent === urlInit) {
            navigate(`${initialComponent}`, { replace: true });
            setCurrentComponent(initialComponent);
        } else {
            setCurrentComponent(url || "");
        }
    }, [url, initialComponent, navigate, urlInit]);

    const Component = componentMap[currentComponent as keyof typeof componentMap];

    if (!Component) {
        return <div>Component not found</div>;
    }

    const props = componentProps[currentComponent as keyof typeof componentProps] || {};

    return (
        <div className={cx("control-panel")}>
            <div className={cx("wrapper")}>
                <div className={cx("tab-content")}>
                    <Component {...props} />
                </div>
            </div>
        </div>
    );
};
