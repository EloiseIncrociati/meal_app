import { fetchAllMeals } from "@/redux/allMealsSlice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  //call redux to get datas Typescript
  const dispatch = useDispatch<AppDispatch>();
  //cf meal slice
  const { meals, loading, error } = useSelector(
    (state: RootState) => state.allMeals
  );
  //state for pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  //call fetch function in a useEffect (ue snippet)
  useEffect(() => {
    //get all result at the begining
    dispatch(fetchAllMeals());
  }, [dispatch]);

  //load more items
  const loadMoreMeals = () => {
    if (page * itemsPerPage < meals.length) {
      setPage(page + 1);
    }
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {loading && page === 1 && (
        <ActivityIndicator size="large" color="#a44cff" />
      )}
      {error && (
        <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
      )}
      <FlatList
        data={meals.slice(0, page * itemsPerPage)}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Text style={{ fontSize: 16, padding: 10 }}>{item.strMeal}</Text>
          </TouchableOpacity>
        )}
        onEndReached={loadMoreMeals}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading && page > 1 ? (
            <ActivityIndicator size="small" color="#a44cff" />
          ) : null
        }
      />
    </View>
  );
};

export default Home;
