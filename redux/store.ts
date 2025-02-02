import { configureStore, UnknownAction } from "@reduxjs/toolkit";
import allMealsReducer from "./allMealsSlice";
import categoryMealsReducer from "./categoryMealsSlice";
import categoryReducer from "./categorySlice";
import detailMealSlice from "./detailMealSlice";
import favoriteReducer from "./favoriteSlice";

export const store = configureStore({
  reducer: {
    allMeals: allMealsReducer,
    categoryMeals: categoryMealsReducer,
    category: categoryReducer,
    mealDetail: detailMealSlice,
    favorites: favoriteReducer,
  },
});

//typescript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
