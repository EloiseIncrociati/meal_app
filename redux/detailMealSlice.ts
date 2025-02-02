import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Type Meal
interface MealDetail {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strCategory: string;
  strArea: string;
  strYoutube: string | null;
}

// Type Redux State
interface MealState {
  meal: MealDetail | null;
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: MealState = {
  meal: null,
  loading: false,
  error: null,
};

//Fetch meal details via API
export const fetchMealDetail = createAsyncThunk<MealDetail, string>(
  "meal/fetchMealDetail",
  async (mealId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );
      return response.data.meals[0]; //first result
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Une erreur est survenue");
    }
  }
);

//Slice Redux
const detailMealSlice = createSlice({
  name: "mealDetail",
  initialState,
  reducers: {
    resetMeal: (state) => {
      state.meal = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMealDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMealDetail.fulfilled,
        (state, action: PayloadAction<MealDetail>) => {
          state.loading = false;
          state.meal = action.payload;
        }
      )
      .addCase(fetchMealDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Erreur inconnue";
      });
  },
});

export const { resetMeal } = detailMealSlice.actions;
export default detailMealSlice.reducer;
