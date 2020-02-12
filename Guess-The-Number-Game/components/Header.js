import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Colors from '../constants/colors';

const Header = props => (
    <View style={styles.header}>
        <Text style={styles.headerText}>{ props.title }</Text>
    </View>
)

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        color: 'black',
        fontSize: 22,
        fontFamily: 'open-sans-bold'
    }
})

export default Header;