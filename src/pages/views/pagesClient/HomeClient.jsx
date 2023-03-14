import React, { useState, useRef } from "react";
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    DrawerLayoutAndroid,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MenuUser from "../../../components/menuUser/menu";

export default function HomeClient({ route }) {
    const { infoUserAll } = route.params;
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const drawerRef = useRef(null);

    const toggleDrawer = () => {
        if (isDrawerOpen) {
            drawerRef.current.closeDrawer();
            console.log("Menu fechado pelo botão X");
        } else {
            drawerRef.current.openDrawer();
        }
        setIsDrawerOpen(!isDrawerOpen);
    };

    const closeDrawer = () => {
        drawerRef.current.closeDrawer();
        setIsDrawerOpen(false);
    };

    const onDrawerClose = () => {
        setIsDrawerOpen(false);
    };

    return (
        <DrawerLayoutAndroid
            ref={drawerRef}
            drawerWidth={200}
            drawerPosition="left"
            renderNavigationView={() => (
                <MenuUser
                    infoUserAll={infoUserAll}
                    toggleDrawer={toggleDrawer}
                    closeDrawer={closeDrawer}
                />
            )}
            onDrawerClose={onDrawerClose}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={toggleDrawer}>
                        <Icon name="menu-outline" size={30} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.pageTitle}>Página Inicial</Text>
                </View>
            </View>
        </DrawerLayoutAndroid>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "blue",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        marginVertical: 10,
    },
    pageTitle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 10,
    },
    header: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 20,
        paddingHorizontal: 10,
        width: "100%",
    },
});
