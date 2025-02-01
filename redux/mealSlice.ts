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
export const fetchMealsByCategory = createAsyncThunk<
  Meal[],
  string | undefined
>("meals/fetchMealsByCategory", async (category, { rejectWithValue }) => {
  try {
    const url = category
      ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      : "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    const response = await axios.get(url);
    return response.data.meals;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Erreur inconnue");
  }
});

//slice Redux
const mealsSlice = createSlice({
  name: "meals",
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
      .addCase(
        fetchMealsByCategory.fulfilled,
        (state, action: PayloadAction<Meal[]>) => {
          state.loading = false;
          state.meals = action.payload;
        }
      )
      //fetch failed
      .addCase(fetchMealsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Une erreur s'est produite";
      });
  },
});

export default mealsSlice.reducer;
