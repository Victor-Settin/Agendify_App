import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function MenuUser({ infoUserAll, closeDrawer }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{infoUserAll.username}</Text>
                <TouchableOpacity onPress={closeDrawer}>
                    <Icon name="close-outline" size={30} color="#000" />
                </TouchableOpacity>
            </View>
            <Text style={styles.userType}>Cliente</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 15,
        justifyContent: "space-between",
    },
    headerTitle: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: "bold",
    },
    userType: {
        marginVertical: 20,
        marginHorizontal: 20,
        fontSize: 14,
        color: "#999",
    },
});
