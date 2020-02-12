import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList
} from "react-native";

import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';

export default function App() {
  const [allGoals, setAllGoals] = useState([]);
  const [isAddMode, setisAddMode] = useState(false);

  const addGoalHandler = enteredGoal => {
    if (enteredGoal.length === 0) {
      return ;
    }
    setAllGoals(currentGoals => [
        { id: Math.random().toString(), value: enteredGoal },
        ...currentGoals
    ]);
    setisAddMode(false);
  };

  const cancelHandler = () => {
    setisAddMode(false);
  }

  const onDeleteHandler = id => {
    setAllGoals(currentGoals => {
      return currentGoals.filter(item => item.id != id)
    })
  };

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setisAddMode(true)} />
      <GoalInput visible={isAddMode} toAddGoal={addGoalHandler} onCancel={cancelHandler} />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={allGoals}
        renderItem={itemData => (
          <GoalItem onDelete={onDeleteHandler} item={itemData.item} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 50,
    paddingBottom: 80
  }
});
