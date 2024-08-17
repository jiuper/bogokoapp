import React, { memo, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import cnBind from "classnames/bind";
import type { AvatarProps } from "primereact/avatar";
import { Avatar } from "primereact/avatar";
import { Skeleton } from "primereact/skeleton";

import { createAxiosApi } from "@/shared/axios/axios";
import { useBooleanState } from "@/shared/hooks";

import styles from "./Avatar.module.scss";

export interface UIAvatarProps extends AvatarProps {
    isProtected?: boolean;
    rootClassName?: string;
    src: string | undefined;
    diameter?: number;
    isOnline?: boolean;
}

const cx = cnBind.bind(styles);

export const IUAvatar = memo(
    ({ className, rootClassName, diameter = 64, isProtected, src, isOnline, ...props }: UIAvatarProps) => {
        const ref = useRef<Avatar>(null);
        const [isLoading1, loading, loaded] = useBooleanState(true);

        const isBlob = !(typeof src === "string" && !src.startsWith("blob:"));

        const { data, isFetching, isError, status, isFetched } = useQuery({
            queryKey: ["avatar", src],
            retry: 0,
            queryFn: () =>
                isProtected
                    ? createAxiosApi(undefined)<Iterable<number>>({
                          type: "get",
                          url: src as string,
                          config: { responseType: "arraybuffer" },
                      }).then((res) => {
                          const data = new Uint8Array(res.data);
                          const blob = new Blob([data], { type: "image/jpeg" });
                          const file = new File([blob], "test.jpeg", { type: "image/jpeg" });

                          return URL.createObjectURL(file);
                      })
                    : Promise.resolve(undefined),
            enabled: isProtected && typeof src === "string" && !src.startsWith("blob:"),
        });

        useEffect(() => {
            loading();
        }, [loading, src]);

        useEffect(() => {
            if (isError) {
                loaded();
            }
        }, [isError, loaded]);

        const isLoading = isFetching && status === "pending";

        useEffect(() => {
            if (props.label) {
                const elem = ref.current?.getElement()?.querySelector<HTMLDivElement>("[data-pc-section='label']");

                if (elem) {
                    elem.style.fontSize = `${diameter / 3}px`;
                }
            } else {
                const elem = ref.current?.getElement()?.querySelector<HTMLDivElement>("[data-pc-section='icon']");

                if (elem) {
                    elem.style.fontSize = `${diameter / 3}px`;
                }
            }
        }, [diameter, props.label]);

        return (
            <div
                className={cx("ui-image", rootClassName)}
                style={{ width: diameter, height: diameter, minWidth: diameter }}
            >
                <div className={cx("ui-image-inner")} style={{ width: diameter, height: diameter, minWidth: diameter }}>
                    {(isLoading || isFetching) && !isBlob && (
                        <Skeleton className={cx("skeleton")} style={{ width: diameter, height: diameter }} />
                    )}
                    <Avatar
                        icon="pi pi-user"
                        className={cx("image", className)}
                        image={isProtected && !isBlob ? data : src}
                        onLoad={loaded}
                        onError={loaded}
                        ref={ref}
                        {...props}
                    />
                </div>

                {isOnline && (
                    <div className={cx("indicator")}>
                        <div className={cx("ball")} />
                    </div>
                )}
            </div>
        );
    },
);
