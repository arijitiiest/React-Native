import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView
} from "react-native";

import Colors from "../constants/colors";
import Card from "../components/Card";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import MainButton from "../components/MainButton";

const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 4);
    }

    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  }, []);

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summeryContainer}>
        <Text>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={props.onStartGame.bind(this, selectedNumber)}>
          START GAME
        </MainButton>
      </Card>
    );
  }

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid number", "Number has to be between 1 and 99", [
        { text: "Okey", style: "destructive", onPress: resetInputHandler }
      ]);
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue("");
    Keyboard.dismiss();
  };

  return (
    <ScrollView>
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.screen}>
          <Text style={styles.title}>Start a New Game!</Text>
          <Card style={styles.inputContainer}>
            <Text>Select a Number</Text>
            <Input
              style={styles.input}
              blurOnSubmit
              autoCapitalize="none"
              autoCurrect={false}
              keyboardType="number-pad"
              maxLength={2}
              onChangeText={numberInputHandler}
              value={enteredValue}
            />
            <View style={styles.buttonContainer}>
              <View style={{width: buttonWidth}}>
                <Button
                  title="Reset"
                  onPress={resetInputHandler}
                  color={Colors.accent}
                />
              </View>
              <View style={{width: buttonWidth}}>
                <Button
                  title="Confirm"
                  onPress={confirmInputHandler}
                  color={Colors.primary}
                />
              </View>
            </View>
          </Card>
          {confirmedOutput}
        </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "open-sans-bold"
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 10
  },
  button: {
    width: Dimensions.get("window").width / 3.5
  },
  input: {
    width: 50,
    textAlign: "center"
  },
  summeryContainer: {
    marginTop: 20,
    alignItems: "center"
  }
});

export default StartGameScreen;
