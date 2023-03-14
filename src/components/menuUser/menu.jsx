import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function MenuUser({ infoUserAll, closeDrawer }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={closeDrawer}>
                <Icon name="close-outline" size={30} color="#000" />
            </TouchableOpacity>
            <Text style={styles.username}>{infoUserAll.username}</Text>
            <Text style={styles.userType}>{infoUserAll.userType}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: "#fff",
        height: "100%",
    },
    username: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: "bold",
    },
    userType: {
        marginLeft: 10,
        fontSize: 14,
        color: "#999",
    },
});
