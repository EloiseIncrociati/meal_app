import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMealDetail, resetMeal } from "@/redux/detailMealSlice";
import { RootState, AppDispatch } from "@/redux/store";
import React from "react";

const MealDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  const { meal, loading, error } = useSelector(
    (state: RootState) => state.mealDetail
  );

  useEffect(() => {
    if (typeof id === "string") {
      dispatch(fetchMealDetail(id));
    }

    return () => {
      dispatch(resetMeal());
    };
  }, [id, dispatch]);

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#a44cff" style={styles.loader} />
    );
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 80 }}>
      {meal && (
        <>
          <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
          <Text style={styles.title}>{meal.strMeal}</Text>
          <Text style={styles.category}>Category: {meal.strCategory}</Text>
          <Text style={styles.area}>Origin: {meal.strArea}</Text>
          <Text style={styles.instructions}>{meal.strInstructions}</Text>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  category: {
    fontSize: 16,
    fontWeight: "600",
    color: "#a44cff",
    textAlign: "center",
  },
  area: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    textAlign: "center",
    marginBottom: 10,
  },
  instructions: {
    fontSize: 14,
    textAlign: "justify",
    marginVertical: 10,
    lineHeight: 20, // Amélioration de la lisibilité
  },
});

export default MealDetailScreen;
