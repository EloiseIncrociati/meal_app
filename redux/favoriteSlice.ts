import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppDispatch, RootState } from "./store";

//type favoriteMeal
interface FavoriteMeal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

//state Redux
interface FavoritesState {
  favorites: FavoriteMeal[];
}

//initial state
const initialState: FavoritesState = {
  favorites: [],
};

//Slice Redux
const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    //fetch adding
    addFavorite: (state, action: PayloadAction<FavoriteMeal>) => {
      state.favorites.push(action.payload);
      saveFavoritesToStorage(state.favorites);
    },
    //fetch removing
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (meal) => meal.idMeal !== action.payload
      );
      saveFavoritesToStorage(state.favorites);
    },

    setFavorites: (state, action: PayloadAction<FavoriteMeal[]>) => {
      state.favorites = action.payload;
    },
  },
});

//export action
export const { addFavorite, removeFavorite, setFavorites } =
  favoriteSlice.actions;

//save favorite into AsyncStorage
const saveFavoritesToStorage = async (favorites: FavoriteMeal[]) => {
  try {
    await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
  } catch (error) {
    console.error("Erreur lors de la sauvegarde des favoris :", error);
  }
};

//load favorite at start
export const loadFavorites = () => async (dispatch: AppDispatch) => {
  try {
    const storedFavorites = await AsyncStorage.getItem("favorites");
    if (storedFavorites) {
      dispatch(setFavorites(JSON.parse(storedFavorites)));
    }
  } catch (error) {
    console.error("Erreur lors du chargement des favoris :", error);
  }
};

//select Favorites
export const selectFavorites = (state: RootState) => state.favorites.favorites;
export default favoriteSlice.reducer;
