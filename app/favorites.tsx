import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { removeFavorite } from "@/redux/favoriteSlice";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

const FavoritesScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  //get favorites
  const favorites = useSelector(
    (state: RootState) => state.favorites?.favorites || []
  );

  //delete favorites
  const handleRemoveFavorite = (idMeal: string) => {
    dispatch(removeFavorite(idMeal));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Favorite Meals</Text>

      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorites added yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push(`/meal/${item.idMeal}`)}>
              <Image source={{ uri: item.strMealThumb }} style={styles.image} />
              <View style={styles.infoContainer}>
                <Text style={styles.mealName}>{item.strMeal}</Text>
                <TouchableOpacity
                  onPress={() => handleRemoveFavorite(item.idMeal)}>
                  <FontAwesome name="trash" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#a44cff",
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mealName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FavoritesScreen;
