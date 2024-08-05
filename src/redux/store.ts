import { configureStore } from '@reduxjs/toolkit';
import middleware from '@/redux/middleware';

export const store = configureStore({
  reducer: {},
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(...middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
