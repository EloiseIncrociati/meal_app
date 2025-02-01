import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

//type meal
interface Meal {
  idMeal: string;
  strMeal: string;
}

//type state Redux
interface MealsState {
  meals: Meal[];
  loading: boolean;
  error: string | null;
}

//type initial state
const initialState: MealsState = {
  meals: [],
  loading: false,
  error: null,
};

//fetch all meal via categories
export const fetchAllMeals = createAsyncThunk<Meal[]>(
  "allMeals/fetchAllMeals",
  async (_, { rejectWithValue }) => {
    try {
      const categoriesRes = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );

      const categories = categoriesRes.data.categories.map(
        (cat: { strCategory: string }) => cat.strCategory
      );

      let allMeals: Meal[] = [];

      for (const category of categories) {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );
        allMeals = [...allMeals, ...response.data.meals];
      }

      return allMeals;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Erreur inconnue");
    }
  }
);

//slice
const allMealsSlice = createSlice({
  name: "allMeals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetch pending
      .addCase(fetchAllMeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      //fetch succeed
      .addCase(
        fetchAllMeals.fulfilled,
        (state, action: PayloadAction<Meal[]>) => {
          state.loading = false;
          state.meals = action.payload;
        }
      )
      //fetch failed
      .addCase(fetchAllMeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Une erreur s'est produite";
      });
  },
});

export default allMealsSlice.reducer;
