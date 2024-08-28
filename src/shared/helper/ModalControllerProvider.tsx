import type { ReactElement } from "react";
import { createContext, useContext, useMemo } from "react";

import { useBooleanState } from "@/shared/hooks";

type IModalContextValue = {
    loginModalIsOpen: boolean;
    registerModalIsOpen: boolean;
    registerSuccessModalIsOpen: boolean;
    forgotModalIsOpen: boolean;
    forgotSuccessModalIsOpen: boolean;
    isOpenCreateLead: boolean;
    isOpenAddRealty: boolean;
};
type IModalContextMutate = {
    openLoginModal: () => void;
    closeLoginModal: () => void;
    openRegisterModal: () => void;
    closeRegisterModal: () => void;
    openRegisterSuccessModal: () => void;
    closeRegisterSuccessModal: () => void;
    openForgotModal: () => void;
    closeForgotModal: () => void;
    openForgotSuccessModal: () => void;
    closeForgotSuccessModal: () => void;
    onOpenCreateLead: () => void;
    onCloseCreateLead: () => void;
    onOpenAddRealty: () => void;
    onCloseAddRealty: () => void;
};
const ModalContextValue = createContext<IModalContextValue | null>(null);
const ModalContextMutate = createContext<IModalContextMutate | null>(null);
export const useModalContextValue = () => {
    const context = useContext(ModalContextValue);

    if (!context) {
        throw new Error("useModalContext must be used within the context");
    }

    return context;
};
export const useModalContextMutate = () => {
    const context = useContext(ModalContextMutate);

    if (!context) {
        throw new Error("useModalContextMutate must be used within the context");
    }

    return context;
};
export const ModalControllerProvider = ({ children }: { children: ReactElement }) => {
    const [loginModalIsOpen, openLoginModal, closeLoginModal] = useBooleanState(false);
    const [registerModalIsOpen, openRegisterModal, closeRegisterModal] = useBooleanState(false);
    const [registerSuccessModalIsOpen, openRegisterSuccessModal, closeRegisterSuccessModal] = useBooleanState(false);
    const [forgotModalIsOpen, openForgotModal, closeForgotModal] = useBooleanState(false);
    const [forgotSuccessModalIsOpen, openForgotSuccessModal, closeForgotSuccessModal] = useBooleanState(false);
    const [isOpenCreateLead, onOpenCreateLead, onCloseCreateLead] = useBooleanState(false);
    const [isOpenAddRealty, onOpenAddRealty, onCloseAddRealty] = useBooleanState(false);

    const modalContextValue: IModalContextValue = useMemo(() => {
        return {
            loginModalIsOpen,
            registerModalIsOpen,
            registerSuccessModalIsOpen,
            forgotModalIsOpen,
            forgotSuccessModalIsOpen,
            isOpenCreateLead,
            isOpenAddRealty,
        };
    }, [
        forgotModalIsOpen,
        forgotSuccessModalIsOpen,
        isOpenAddRealty,
        isOpenCreateLead,
        loginModalIsOpen,
        registerModalIsOpen,
        registerSuccessModalIsOpen,
    ]);
    const modalContextMutate: IModalContextMutate = useMemo(() => {
        return {
            closeForgotModal,
            closeForgotSuccessModal,
            closeLoginModal,
            closeRegisterModal,
            closeRegisterSuccessModal,
            openForgotModal,
            openForgotSuccessModal,
            openLoginModal,
            openRegisterModal,
            openRegisterSuccessModal,
            onOpenCreateLead,
            onCloseCreateLead,
            onOpenAddRealty,
            onCloseAddRealty,
        };
    }, [
        closeForgotModal,
        closeForgotSuccessModal,
        closeLoginModal,
        closeRegisterModal,
        closeRegisterSuccessModal,
        onCloseAddRealty,
        onCloseCreateLead,
        onOpenAddRealty,
        onOpenCreateLead,
        openForgotModal,
        openForgotSuccessModal,
        openLoginModal,
        openRegisterModal,
        openRegisterSuccessModal,
    ]);

    return (
        <ModalContextValue.Provider value={modalContextValue}>
            <ModalContextMutate.Provider value={modalContextMutate}>{children}</ModalContextMutate.Provider>
        </ModalContextValue.Provider>
    );
};
