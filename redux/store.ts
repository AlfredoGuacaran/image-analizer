import { configureStore } from '@reduxjs/toolkit';
import annotationReducer from './features/annotationSlice';

export const store = configureStore({
  reducer: {
    annotation: annotationReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
