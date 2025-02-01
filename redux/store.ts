import { configureStore } from "@reduxjs/toolkit";
import mealsReducer from "./mealSlice";

export const store = configureStore({
  reducer: {
    meals: mealsReducer,
  },
});

//typescript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
