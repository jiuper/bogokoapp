import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { GetMasterFullInfoDto } from "@/entities/masters/types.ts";

export type BookingData = {
    masterInfo?: GetMasterFullInfoDto;
    workData?: {
        date: string;
        time: string;
    };
};
export interface BookingState {
    bookingMasters: BookingData[];
}

const initialState: BookingState = {
    bookingMasters: [],
};

const bookingSlice = createSlice({
    name: "BOOKING",
    initialState,
    reducers: {
        setBookingMasters(state, action: PayloadAction<BookingData>) {
            if (state.bookingMasters.length) {
                state.bookingMasters = state.bookingMasters.map((el) =>
                    el.masterInfo?.id === action.payload.masterInfo?.id ? action.payload : el,
                );
            } else {
                state.bookingMasters = [...state.bookingMasters, action.payload];
            }
        },
        setEditBookingMasters(state, action: PayloadAction<string>) {
            state.bookingMasters = state.bookingMasters.filter((el) => el.masterInfo?.id !== action.payload);
        },
        setRemoveServiceBookingMasters(state, action: PayloadAction<{ id: string; serviceId: string }>) {
            state.bookingMasters = state.bookingMasters.map((el) => {
                if (el.masterInfo?.id === action.payload.id) {
                    el.masterInfo.services = el.masterInfo.services?.filter(
                        (elem) => elem.id !== action.payload.serviceId,
                    );
                }

                return el;
            });
        },
    },
});

export const bookingSliceReducer = bookingSlice.reducer;
export const bookingSliceActions = bookingSlice.actions;
