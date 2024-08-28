import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { bookingSliceReducer } from "@/shared/redux/reducers/booking.reducer.ts";

export const createStore = () =>
    configureStore({
        reducer: rootReducer,
    });

const rootReducer = combineReducers({
    booking: bookingSliceReducer,
});

const store = createStore();

export const initStore = () => {
    return store;
};

export type RootReducer = ReturnType<typeof rootReducer>;
export type RootStore = ReturnType<typeof initStore>;
export type RootState = ReturnType<RootStore["getState"]>;
export type AppDispatch = RootStore["dispatch"];
export type AsyncThunkConfig = { state: RootState; dispatch: AppDispatch };
