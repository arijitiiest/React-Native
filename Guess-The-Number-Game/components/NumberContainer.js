import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Colors from '../constants/colors';

const NumberContainer = props => (
    <View style={styles.container}>
        <Text style={styles.number}>{props.children}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: Colors.accent,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center' 
    },
    number: {
        color: Colors.accent,
        fontSize: 22
    }
});

export default NumberContainer;