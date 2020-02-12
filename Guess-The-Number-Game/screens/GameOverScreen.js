import React from "react";
import { StyleSheet, View, Text, Button, Image } from "react-native";

import MainButton from "../components/MainButton";

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>The Game is Over</Text>
      <View style={styles.imageContainer}>
        <Image
          // source={require('../assets/success.png')}
          source={{
            uri:
              "https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg"
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <Text>Number of Rounds: {props.roundsNumber}</Text>
      <Text>Number was: {props.userNumber}</Text>
      <MainButton onPress={props.onRestart}>
        NEW GAME
      </MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  imageContainer: {
    height: 300,
    width: 300,
    borderRadius: 150,
    borderWidth: 3,
    overflow: "hidden",
    marginVertical: 30
  },
  image: {
    width: "100%",
    height: "100%"
  }
});

export default GameOverScreen;
