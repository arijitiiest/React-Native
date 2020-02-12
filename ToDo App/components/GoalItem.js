import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const GoalItem = props => {
    return (
        <TouchableOpacity onPress={props.onDelete.bind(this, props.item.id)} >
            <View style={styles.viewItem}>
                <Text>{props.item.value}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    viewItem: {
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 30,
        backgroundColor: "#ccc",
        borderColor: "black",
        borderWidth: 1
    }
});

export default GoalItem;