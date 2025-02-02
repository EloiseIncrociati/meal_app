import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Modal,
  StyleSheet,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMeals } from "@/redux/allMealsSlice";
import { fetchMealsByCategory } from "@/redux/categoryMealsSlice";
import { fetchCategories } from "@/redux/categorySlice";
import { AppDispatch, RootState } from "@/redux/store";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();

  //fetch meals
  const allMeals = useSelector((state: RootState) => state.allMeals.meals);
  const categoryMeals = useSelector(
    (state: RootState) => state.categoryMeals.meals
  );
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const loading = useSelector((state: RootState) => state.allMeals.loading);
  const categoriesLoading = useSelector(
    (state: RootState) => state.category.loading
  );
  const error = useSelector((state: RootState) => state.allMeals.error);

  //category filter
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);

  //meals and categories fetching
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchAllMeals());
  }, [dispatch]);

  //useMemo to avoid recalculation
  const displayMeals = useMemo(() => {
    return selectedCategory ? categoryMeals : allMeals;
  }, [selectedCategory, categoryMeals, allMeals]);

  //useCall back to avoid multiple creation function
  const handleCategorySelect = useCallback(
    (category: string) => {
      setSelectedCategory(category);
      setModalVisible(false);
      if (category) {
        dispatch(fetchMealsByCategory(category));
      } else {
        dispatch(fetchAllMeals());
      }
    },
    [dispatch]
  );

  return (
    <View style={styles.container}>
      {/* button filter category */}
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.dropdownButtonText}>
          {selectedCategory ? selectedCategory : "All Categories"}
        </Text>
      </TouchableOpacity>

      {/* modal filter category */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {categoriesLoading ? (
              <ActivityIndicator size="large" color="#a44cff" />
            ) : (
              <FlatList
                data={[
                  { idCategory: "0", strCategory: "All Categories" },
                  ...categories,
                ]}
                keyExtractor={(item) => item.idCategory}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.categoryItem,
                      item.strCategory === "All Categories" &&
                        styles.allCategoriesItem,
                    ]}
                    onPress={() =>
                      handleCategorySelect(
                        item.strCategory === "All Categories"
                          ? ""
                          : item.strCategory
                      )
                    }>
                    <Text style={styles.categoryText}>{item.strCategory}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Fermer</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* meals */}
      {loading && <ActivityIndicator size="large" color="#a44cff" />}
      {error && <Text style={styles.error}>{error}</Text>}

      <FlatList
        key={displayMeals.length} // update meals if change
        data={displayMeals}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.mealCard}>
            <Text style={styles.mealText}>{item.strMeal}</Text>
          </TouchableOpacity>
        )}
        initialNumToRender={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  dropdownButton: {
    padding: 15,
    backgroundColor: "#a44cff",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  dropdownButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  categoryItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
    alignItems: "center",
  },
  allCategoriesItem: {
    backgroundColor: "#f8d7ff",
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#a44cff",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  mealCard: {
    padding: 15,
    backgroundColor: "#f3f3f3",
    marginVertical: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  mealText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Home;
