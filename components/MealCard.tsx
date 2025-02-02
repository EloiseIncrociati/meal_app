import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

interface MealCardProps {
  meal: {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
  };
}

const MealCard = ({ meal }: MealCardProps) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/meal/${meal.idMeal}`); // ✅ Format correct
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
      <Text style={styles.title}>{meal.strMeal}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 150,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
});

export default MealCard;
