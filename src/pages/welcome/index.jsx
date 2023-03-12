import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";

import { useNavigation } from "@react-navigation/native";
import ButtonSwitch from "../../components/button/buttonSwitch";

export default function Welcome() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.containerLogo}>
                <Animatable.Image
                    animation={"flipInY"}
                    source={require("./logo.png")}
                    style={{ width: "100%" }}
                    resizeMode="contain"
                />
                <Text style={styles.titleWelcome}> Bem Vindo! </Text>
            </View>

            <Animatable.View
                delay={600}
                animation={"fadeInUp"}
                style={styles.containerForm}
            >
                <Text style={styles.titleAcessLogin}> Acessar como: </Text>

                <ButtonSwitch
                    title="Professional"
                    onPress={() =>
                        navigation.navigate("pageProfessional", {
                            userType: "professional",
                        })
                    }
                ></ButtonSwitch>

                <ButtonSwitch
                    title="Client"
                    onPress={() =>
                        navigation.navigate("pageClient", {
                            userType: "client",
                        })
                    }
                ></ButtonSwitch>

                <TouchableOpacity
                    onPress={() => navigation.navigate("SiginIn")}
                    style={styles.button}
                ></TouchableOpacity>
            </Animatable.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "blue",
    },
    containerLogo: {
        flex: 2,
        backgroundColor: "blue",
        justifyContent: "center",
        alignItems: "center",
    },
    containerForm: {
        flex: 2.5,
        backgroundColor: "#f7f7f7",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: "5%",
        paddingEnd: "5%",
    },
    titleAcessLogin: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 18,
    },
    titleWelcome: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 18,
        color: "#fff",
    },
});
