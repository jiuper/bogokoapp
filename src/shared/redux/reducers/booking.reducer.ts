import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { RequestMasterServicesDateTimesDto } from "@/entities/order/types.ts";

export interface BookingState {
    bookingMasters: RequestMasterServicesDateTimesDto[];
}

const initialState: BookingState = {
    bookingMasters: [],
};

const bookingSlice = createSlice({
    name: "BOOKING",
    initialState,
    reducers: {
        setBookingMasters(state, action: PayloadAction<RequestMasterServicesDateTimesDto[]>) {
            state.bookingMasters = action.payload;
        },
    },
});

export const bookingSliceReducer = bookingSlice.reducer;
export const bookingSliceActions = bookingSlice.actions;
