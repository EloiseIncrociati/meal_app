import React, { useState } from "react";
import LottieView from "lottie-react-native";
import { useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  Modal,
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
  const trashAnimationRef = useRef<LottieView>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showTrashAnimation, setShowTrashAnimation] = useState(false);
  const handleRemoveFavorite = (idMeal: string) => {
    setIsModalVisible(true);
    setShowTrashAnimation(true);
    trashAnimationRef.current?.play();
    setTimeout(() => {
      dispatch(removeFavorite(idMeal));
      setShowTrashAnimation(false);
      setIsModalVisible(false);
    }, 3000);
  };

  return (
    <ImageBackground
      source={require("../assets/images/background.png")}
      style={styles.background}
      resizeMode="cover">
      <View style={styles.container}>
        <View style={styles.animationContainer}>
          <LottieView
            source={require("../assets/animation/love.json")}
            autoPlay
            loop
            style={styles.animation}
          />
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              {showTrashAnimation && (
                <LottieView
                  ref={trashAnimationRef}
                  source={require("../assets/animation/trash.json")}
                  autoPlay={true}
                  loop={false}
                  style={{
                    width: 150,
                    height: 150,
                  }}
                />
              )}
            </View>
          </View>
        </Modal>
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
                <Image
                  source={{ uri: item.strMealThumb }}
                  style={styles.image}
                />
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#f9f9f9",
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
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Effet sombre sur l'image
    justifyContent: "center",
    alignItems: "center",
  },
  animationContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  animation: {
    width: 150,
    height: 150,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 200,
    height: 200,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

export default FavoritesScreen;
