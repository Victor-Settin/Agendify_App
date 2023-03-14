import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function ButtonTypeUser({ title, onPress }) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "blue",
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
