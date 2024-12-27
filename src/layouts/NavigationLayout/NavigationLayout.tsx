import { memo, Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import cnBind from "classnames/bind";
import { motion } from "framer-motion";

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

const generateComponentKey = (
    initialComponent: string,
    params: { [key: string]: string | undefined },
): string => {
    const filteredParams = Object.entries(params)
        .filter(([_, value]) => value !== undefined)
        .map(([_, value]) => `/${value}`);

    return initialComponent + filteredParams.join("");
};

const NavigationLayoutComponent = ({
    componentMap,
    componentProps,
    initialComponent,
}: NavigationLayoutProps) => {
    const params = useParams<{ [key: string]: string | undefined }>();

    const [currentComponent, setCurrentComponent] = useState<string>(
        generateComponentKey(initialComponent, params),
    );

    useEffect(() => {
        setCurrentComponent(generateComponentKey(initialComponent, params));
    }, [params, initialComponent]);

    const uniquePath = Array.from(new Set(currentComponent.split("/"))).join("/");

    const possibleKeys = [
        currentComponent,
        uniquePath,
        `${initialComponent}/:id`,
        `${initialComponent}/:url`,
        `${initialComponent}/:url/:id`,
    ];
    const componentKey = possibleKeys.find((key) => componentMap[key]);

    if (componentKey) {
        const Component = componentMap[componentKey];
        const props = componentProps[componentKey] || {};

        return (
            <div className={cx("control-panel")}>
                <div className={cx("wrapper")}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className={cx("tab-content")}
                        >
                            <Component {...props} />
                        </motion.div>
                    </Suspense>
                </div>
            </div>
        );
    }

    return <div>Component not found: {currentComponent}</div>;
};

export const NavigationLayout = memo(NavigationLayoutComponent);
