import React, { useState, useEffect } from "react";

import {
    View,
    TextInput,
    Button,
    TouchableOpacity,
    Text,
    StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";

const schema = yup
    .object({
        usernameOrEmail: yup.lazy((value) => {
            if (value === undefined && value !== null && value !== "") {
                return yup.string().required("Informe seu nome de usuário");
            }
            return yup.string();
        }),
        email: yup.lazy((value) => {
            if (value !== undefined && value !== null && value !== "") {
                return yup
                    .string()
                    .email("E-mail inválido")
                    .required("Informe seu e-mail");
            }
            return yup.string();
        }),

        password: yup
            .string()
            .min(6, "a senha deve ter no minimo 6 digitos")
            .required("informe sua senha"),
    })
    .required();

export default function Signin({ userType }) {
    const [usernameOrEmailError, setUsernameOrEmailError] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const navigation = useNavigation(); // get the navigation object

    useEffect(() => {
        if (errors.usernameOrEmail) {
            setUsernameOrEmailError(true);
        } else {
            setUsernameOrEmailError(false);
        }
    }, [errors.usernameOrEmail]);

    const handleSignIn = async (data) => {
        if (!data.usernameOrEmail) {
            setUsernameOrEmailError(true);
            return;
        }
        // Adicione o userType ao objeto data
        data.userType = userType;

        try {
            const response = await axios.post(
                "http://192.168.1.13:3001/loginAcess",
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response.data);
        } catch (error) {
            console.log("erro");
            console.error(error);
        }
    };

    function handleRegisterClick() {
        console.log(userType);
        navigation.navigate("PageRegisterUser", { userType: userType });
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.titleInputForm}>
                    Nome do usuario ou e-mail
                </Text>
                <Controller
                    name="usernameOrEmail"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View>
                            <TextInput
                                style={[
                                    styles.inputForm,
                                    (usernameOrEmailError ||
                                        errors.usernameOrEmail) &&
                                        styles.inputFormError,
                                ]}
                                placeholder="Nome do usuario ou e-mail"
                                value={value}
                                onChangeText={onChange}
                                onBlur={() => {
                                    onBlur();
                                    if (!value) {
                                        setUsernameOrEmailError(true);
                                    } else {
                                        setUsernameOrEmailError(false);
                                    }
                                }}
                            />
                            {(usernameOrEmailError ||
                                errors.usernameOrEmail) && (
                                <Text style={styles.labelError}>
                                    {errors.usernameOrEmail
                                        ? errors.usernameOrEmail?.message
                                        : "Nome ou e-mail é obrigatório"}
                                </Text>
                            )}
                        </View>
                    )}
                />

                <Text style={styles.titleInputForm}>Senha</Text>

                <Controller
                    name="password"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.inputForm}
                            placeholder="insira sua senha"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            secureTextEntry
                        />
                    )}
                />
                {errors.password && (
                    <Text style={styles.labelError}>
                        {errors.password?.message}
                    </Text>
                )}

                <Button title="Login" onPress={handleSubmit(handleSignIn)} />

                <View style={styles.registerTextContainer}>
                    <Text style={styles.registerText}>Não tem conta? </Text>
                    <TouchableOpacity onPress={handleRegisterClick}>
                        <Text style={styles.registerLink}>Clique Aqui</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => {}}>
                    <Text
                        style={{
                            fontSize: 13,
                            color: "blue",
                            marginTop: 16,
                            textAlign: "right",
                        }}
                    ></Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        borderRadius: 8,
    },
    form: {
        width: "100%",
        padding: 16,
        borderRadius: 8,
    },
    inputForm: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 8,
        fontSize: 16,
    },
    titleInputForm: {
        fontSize: 20,
        fontWeight: "bold",
    },
    labelError: {
        alignSelf: "flex-start",
        color: "#ff375b",
        marginBottom: 4,
    },
    registerTextContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        marginTop: 16,
        width: "100%",
    },
    registerText: {
        fontSize: 12,
    },
    registerLink: {
        fontSize: 12.5,
        color: "blue",
    },
    inputFormError: {
        borderBottomColor: "#ff375b",
        borderBottomWidth: 1,
    },
});
