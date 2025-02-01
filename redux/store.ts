import { configureStore } from "@reduxjs/toolkit";
import allMealsReducer from "./allMealsSlice";
import categoryMealsReducer from "./categoryMealsSlice";
import categoryReducer from "./categorySlice";

export const store = configureStore({
  reducer: {
    allMeals: allMealsReducer,
    categoryMeals: categoryMealsReducer,
    category: categoryReducer,
  },
});

//typescript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
