import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthApi, RequestAuthDto } from "@/entities/user/getAuth";

export const signInAction = createAsyncThunk(
    "ACCOUNT/SIGN_IN",
    async (params : RequestAuthDto) => {
        try {
              await getAuthApi(params)
        } catch (e) {
            throw new Error("Unauthorized");
        }
    },
);
