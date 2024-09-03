import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { ResponseAuthDto } from "@/entities/user/types.ts";
import { signInAction } from "@/shared/redux/actions/signInAction";
import { FetchStatus } from "@/shared/types/service";

export interface AccountState {
    loginStatus: FetchStatus;
    loginError: string | null;
    registerStatus: FetchStatus;
    registerError: string | null;
    forgotPasswordStatus: FetchStatus;
    forgotPasswordError: string | null;

    userData: ResponseAuthDto | null;
    refreshToken: string | null;
    accessToken: string | null;

    isFirstLogin: boolean;
}

const initialState: AccountState = {
    loginStatus: FetchStatus.IDLE,
    loginError: null,
    registerStatus: FetchStatus.IDLE,
    registerError: null,
    forgotPasswordStatus: FetchStatus.IDLE,
    forgotPasswordError: null,

    userData: null,
    refreshToken: null,
    accessToken: null,

    isFirstLogin: false,
};

const accountSlice = createSlice({
    name: "ACCOUNT",
    initialState,
    reducers: {
        setFirstLogin: (state, action: PayloadAction<boolean>) => {
            state.isFirstLogin = action.payload;
        },
        resetAccountStores: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(signInAction.pending, (state) => {
            state.loginStatus = FetchStatus.PENDING;
            state.loginError = null;
            state.refreshToken = null;
            state.accessToken = null;
            state.userData = null;
        });
        builder.addCase(signInAction.fulfilled, (state, action) => {
            state.loginStatus = FetchStatus.FULFILLED;
            state.loginError = null;
            state.userData = action.payload;
        });
        builder.addCase(signInAction.rejected, (state, action) => {
            state.loginStatus = FetchStatus.REJECTED;
            state.loginError = action.error.message || "";
            state.refreshToken = null;
            state.accessToken = null;
            state.userData = null;
        });
    },
});

export const accountSliceReducer = accountSlice.reducer;
export const accountSliceActions = accountSlice.actions;
