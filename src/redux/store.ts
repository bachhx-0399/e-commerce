import { configureStore } from "@reduxjs/toolkit";

import middleware from "@/redux/middleware";
import cardsSlice from "@/redux/slices/cards-slice";
import filterParamsSlice from "@/redux/slices/filter-params-slice";

export const store = configureStore({
  reducer: {
    filterParams: filterParamsSlice,
    cards: cardsSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(...middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
