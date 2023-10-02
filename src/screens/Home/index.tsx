import React, { useState, useEffect } from "react";
import { api } from "../../services/api";
import { MagnifyingGlass } from "phosphor-react-native";
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,

  Dimensions,
  Alert,
} from "react-native";
import { styles } from "./styles";
import CardMovies from "../../components/CardMovies";
import { useNavigation } from "@react-navigation/native";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

function Home(props) {
  const larguraDoItem = 120;
  let largura = Dimensions.get("window").width;
  let numColumns = Math.floor(largura / larguraDoItem);
  const [discoveryMovies, setDiscoveryMovies] = useState<Movie[]>([]);
  const [searchResultMovies, setSearchResultMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadMoreData();
  }, []);

  const loadMoreData = async () => {
    setLoading(true);
    const response = await api.get("/movie/popular", {
      params: {
        page,
      },
    });
    setDiscoveryMovies([...discoveryMovies, ...response.data.results]);
    setPage(page + 1);
    setLoading(false);
  };

  const searchMovies = async (query: string) => {
    setLoading(true);
    const response = await api.get("/search/movie", {
      params: {
        query,
      },
    });

    if (response.data.results.length === 0) {
      setNoResult(true);
      setSearchResultMovies([]);
    } else {
      setNoResult(false);
      setSearchResultMovies(response.data.results);
    }
    setLoading(false);
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text.length > 2) {
      searchMovies(text);
    } else {
      setSearchResultMovies([]);
    }
  };

  const movieData = search.length > 2 ? searchResultMovies : discoveryMovies;

  const navigation = useNavigation();

  const renderMovieItem = ({ item }: { item: Movie }) => (
    <CardMovies
      data={item}
      onPress={() => navigation.navigate("Details", { movieId: item.id })}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>O que você quer assistir hoje?</Text>
        <View style={styles.containerInput}>
          <TextInput
            style={styles.input}
            onChangeText={handleSearch}
            value={search}
            placeholderTextColor={"#FFF"}
            placeholder="Buscar..."
          />
          <MagnifyingGlass color="#FFf" size={25} weight="light" />
        </View>
        {noResult && (
          <>
            <Text style={styles.noResult}>
              Nenhum filme chamado "{search}" foi encontrado.
            </Text>
          </>
        )}
      </View>
      <View style={styles.flatlist}>
        <FlatList
          data={movieData}
          numColumns={numColumns}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{
            padding: 35,
            paddingBottom: 100,
            justifyContent: "center",
          }}
          onEndReached={() => loadMoreData()}
          onEndReachedThreshold={0.25}
        />
        {loading && <ActivityIndicator size={50} color="#8296e5" />}
      </View>
    </View>
  );

}

export default Home;
