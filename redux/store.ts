import { configureStore } from "@reduxjs/toolkit";
import allMealsReducer from "./allMealsSlice";
import categoryMealsReducer from "./categoryMealsSlice";
import categoryReducer from "./categorySlice";
import detailMealSlice from "./detailMealSlice";

export const store = configureStore({
  reducer: {
    allMeals: allMealsReducer,
    categoryMeals: categoryMealsReducer,
    category: categoryReducer,
    mealDetail: detailMealSlice,
  },
});

//typescript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
