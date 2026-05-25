import React, { useState, useReducer, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type State = {
  favorites: Product[];
};

type Action =
  | {
      type: "add-favorite";
      product: Product;
    }
  | {
      type: "remove-favorite";
      id: number;
    };

const products: Product[] = [
  {
    id: 1,
    name: "Notebook Gamer",
    price: 4500,
    image: "https://picsum.photos/200?random=1",
  },
  {
    id: 2,
    name: "Mouse RGB",
    price: 150,
    image: "https://picsum.photos/200?random=2",
  },
  {
    id: 3,
    name: "Teclado Mecânico",
    price: 300,
    image: "https://picsum.photos/200?random=3",
  },
  {
    id: 4,
    name: "Monitor UltraWide",
    price: 1200,
    image: "https://picsum.photos/200?random=4",
  },
];

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "add-favorite":
      const alreadyExists = state.favorites.find(
        (item) => item.id === action.product.id,
      );

      if (alreadyExists) return state;

      return {
        favorites: [...state.favorites, action.product],
      };

    case "remove-favorite":
      return {
        favorites: state.favorites.filter((item) => item.id !== action.id),
      };

    default:
      return state;
  }
};

export default function App2() {
  const [filter, setFilter] = useState<string>("");

  const [state, dispatch] = useReducer(reducer, {
    favorites: [],
  });

  useEffect(() => {
    console.log("Filtro alterado:", filter);
  }, [filter]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(filter.toLowerCase()),
  );

  const isFavorite = (id: number) => {
    return state.favorites.some((item) => item.id === id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catálogo de Produtos</Text>

      <Text style={styles.subtitle}>Favoritos: {state.favorites.length}</Text>

      <TextInput
        style={styles.input}
        placeholder="Buscar produto..."
        placeholderTextColor="#ccc"
        value={filter}
        onChangeText={(text) => setFilter(text)}
      />

      <ScrollView contentContainerStyle={styles.productsContainer}>
        {filteredProducts.map((product) => (
          <View key={product.id} style={styles.card}>
            <Image source={{ uri: product.image }} style={styles.image} />

            <Text style={styles.productName}>{product.name}</Text>

            <Text style={styles.price}>R$ {product.price}</Text>

            <TouchableOpacity
              style={[
                styles.favoriteButton,
                {
                  backgroundColor: isFavorite(product.id)
                    ? "#E53935"
                    : "#5450D6",
                },
              ]}
              onPress={() => {
                if (isFavorite(product.id)) {
                  dispatch({
                    type: "remove-favorite",
                    id: product.id,
                  });
                } else {
                  dispatch({
                    type: "add-favorite",
                    product,
                  });
                }
              }}
            >
              <Text style={styles.favoriteText}>
                {isFavorite(product.id) ? "Remover" : "Favoritar"}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <View style={styles.favoritesBox}>
        <Text style={styles.favoritesTitle}>⭐ Favoritos</Text>

        {state.favorites.map((item) => (
          <Text key={item.id} style={styles.favoriteItem}>
            • {item.name}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4939BA",
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    color: "white",
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
  },

  input: {
    backgroundColor: "#5450D6",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    padding: 12,
    color: "white",
    marginBottom: 20,
  },

  productsContainer: {
    paddingBottom: 20,
  },

  card: {
    backgroundColor: "#5F52CC",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    alignItems: "center",
  },

  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },

  productName: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },

  price: {
    color: "#B8FFB0",
    fontSize: 18,
    marginBottom: 15,
  },

  favoriteButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  favoriteText: {
    color: "white",
    fontWeight: "bold",
  },

  favoritesBox: {
    backgroundColor: "#5F52CC",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },

  favoritesTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  favoriteItem: {
    color: "white",
    marginBottom: 5,
  },
});
