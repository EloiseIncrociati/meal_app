import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
//type Meal
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

//initial state type
const initialState: MealsState = {
  meals: [],
  loading: false,
  error: null,
};

// Async thunk fetch datas by categories
export const fetchMealsByCategory = createAsyncThunk<Meal[], string>(
  "meals/fetchMealsByCategory",
  async (category, { rejectWithValue }) => {
    try {
      //get method + response
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      return response.data.meals || [];
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Erreur inconnue");
    }
  }
);

//slice Redux
const categoryMealsSlice = createSlice({
  name: "categoryMeals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetch pending
      .addCase(fetchMealsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      //fetch succeed
      .addCase(fetchMealsByCategory.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          meals: action.payload || [],
        };
      })
      //fetch failed
      .addCase(fetchMealsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Une erreur s'est produite";
      });
  },
});

export default categoryMealsSlice.reducer;
