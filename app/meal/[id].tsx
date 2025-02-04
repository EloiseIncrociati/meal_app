import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMealDetail, resetMeal } from "@/redux/detailMealSlice";
import { RootState, AppDispatch } from "@/redux/store";
import React from "react";
import {
  addFavorite,
  loadFavorites,
  removeFavorite,
} from "@/redux/favoriteSlice";
import { FontAwesome } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const MealDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  //get meal detail
  const { meal, loading, error } = useSelector(
    (state: RootState) => state.mealDetail
  );

  //get favorites
  const favorites = useSelector(
    (state: RootState) => state.favorites?.favorites || []
  );

  //heart animation
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  //upload favorites
  useEffect(() => {
    dispatch(loadFavorites());
  }, [dispatch]);

  //is favorite ?
  const isFavorite =
    typeof id === "string" &&
    favorites.some((fav: { idMeal: string }) => fav.idMeal === id);

  //add or delete fav
  const toggleFavorite = () => {
    if (meal && meal.idMeal) {
      if (isFavorite) {
        dispatch(removeFavorite(meal.idMeal));
      } else {
        //animation beating heart
        scale.value = withSpring(1.5, { damping: 2 }, () => {
          scale.value = withSpring(1);
        });

        dispatch(addFavorite(meal));
      }
    }
  };

  //mount/dismount
  useEffect(() => {
    if (typeof id === "string") {
      dispatch(fetchMealDetail(id));
    }

    return () => {
      dispatch(resetMeal());
    };
  }, [id, dispatch]);

  //loading
  if (loading) {
    return (
      <ActivityIndicator size="large" color="#a44cff" style={styles.loader} />
    );
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      style={styles.background}
      resizeMode="cover">
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 80 }}>
        {meal && (
          <>
            <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
            {/*Fav button*/}
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={toggleFavorite}>
              <Animated.View style={[animatedStyle]}>
                <FontAwesome
                  name="heart"
                  size={28}
                  color={isFavorite ? "red" : "gray"}
                />
              </Animated.View>
            </TouchableOpacity>
            {/*Data API*/}
            <Text style={styles.title}>{meal.strMeal}</Text>
            <Text style={styles.category}>Category: {meal.strCategory}</Text>
            <Text style={styles.area}>Origin: {meal.strArea}</Text>
            <Text style={styles.instructions}>{meal.strInstructions}</Text>
          </>
        )}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "transparent",
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
    color: "#f9f9f9",
    marginVertical: 10,
  },
  category: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f0d30",
    textAlign: "center",
  },
  area: {
    fontSize: 16,
    fontWeight: "600",
    color: "#bdbbbb",
    textAlign: "center",
    marginBottom: 10,
  },
  instructions: {
    fontSize: 14,
    textAlign: "justify",
    marginVertical: 10,
    lineHeight: 20,
    color: "#f9f9f9",
  },
  favoriteButton: {
    position: "absolute",
    top: 15,
    right: 20,
    padding: 8,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 20,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MealDetailScreen;
