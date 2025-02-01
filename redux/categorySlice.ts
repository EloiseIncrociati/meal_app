import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
//type category
interface Category {
  idCategory: string;
  strCategory: string;
}
//type state
interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}
//initial state type
const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

//Fetch all categories
export const fetchCategories = createAsyncThunk<Category[]>(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      return response.data.categories;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Erreur inconnue");
    }
  }
);

//slice
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetch pending
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      //fetch succeed
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.loading = false;
          state.categories = action.payload;
        }
      )
      //fetch failed
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Une erreur s'est produite";
      });
  },
});

export default categorySlice.reducer;
