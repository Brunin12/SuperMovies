import React from "react";
import { Pressable, View, Text, Image } from "react-native";
import { styles } from './styles'

interface Movie {
  id: number;
  poster_path: string;
}

interface Props {
  data: Movie;
  onPress?: () => void;
}

function CardMovies({data, ...rest}: Props) {
  return (
    <Pressable {...rest} style={styles.cardMovies}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        }}
        style={styles.cardImage}
      />

    </Pressable>
  );
}

export default CardMovies;
