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
) => {
    let path = initialComponent;
    for (const key in params) {
        if (params[key]) {
            path += `/${params[key]}`;
        }
    }

    return path;
};

const getMatchingComponent = (currentComponent: string, componentMap: ComponentMap) => {
    return Object.keys(componentMap).find((key) => {
        const regex = new RegExp(`^${key.replace(/:\w+/g, "\\w+")}$`);

        return regex.test(currentComponent);
    });
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

    const matchingComponentKey = getMatchingComponent(currentComponent, componentMap);

    if (!matchingComponentKey) {
        return <div>Component not found: {currentComponent}</div>;
    }
    const Component = componentMap[matchingComponentKey];
    const props = { ...componentProps[matchingComponentKey], ...params };

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
};

export const NavigationLayout = memo(NavigationLayoutComponent);
