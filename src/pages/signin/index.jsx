import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

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
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState(null);
    const [loginSuccess, setLoginSuccess] = useState(null);

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
                "https://server-agendify-appv2.onrender.com//loginAcess",
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response.data);
            setLoginError(false);
            setLoginSuccess(response.data.message);

            const infoUser = response.data.user;

            if (userType === "client") {
                navigation.replace("homeClient", {
                    infoUserAll: infoUser,
                });
            }
        } catch (error) {
            error.response.status !== 200;
            setLoginSuccess(false);
            setLoginError(error.response.data.message);
            return; // Para a execução da função
        }
    };
    function handleRegisterClick() {
        console.log(userType);
        navigation.navigate("PageRegisterUser", { userType: userType });
    }

    return (
        <View style={styles.container}>
            {loginError && (
                <View style={styles.alertContainer}>
                    <Text style={styles.alertText}>{loginError}</Text>
                </View>
            )}
            {loginSuccess && (
                <View style={styles.alertContainerSucess}>
                    <Text style={styles.alertText}>{loginSuccess}</Text>
                </View>
            )}
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

                <View style={styles.passwordInput}>
                    <Controller
                        name="password"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.inputForm}
                                placeholder="Insira sua senha"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                secureTextEntry={!showPassword}
                            />
                        )}
                    />
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.showPasswordButton}
                    >
                        <Icon
                            name={showPassword ? "eye-slash" : "eye"}
                            size={20}
                            color="#A9A9A9"
                        />
                    </TouchableOpacity>
                </View>

                {errors.password && (
                    <Text style={styles.labelError}>
                        {errors.password?.message}
                    </Text>
                )}

                <Button
                    title="Login"
                    onPress={handleSubmit(handleSignIn)}
                    style={styles.loginButton}
                />

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
        width: "93%",
        marginBottom: 8,
        borderColor: "#cfcfcf",
    },
    inputFormError: {
        borderColor: "red",
    },
    titleInputForm: {
        fontSize: 16,
        marginBottom: 4,
        color: "#333333",
    },
    passwordInput: {
        height: 40,
        borderColor: "#cfcfcf",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    showPasswordButton: {
        width: 30,
        height: 40,
        paddingRight: 0,
        justifyContent: "center",
    },
    labelError: {
        color: "red",
        fontSize: 12,
        marginTop: 4,
    },
    registerTextContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 16,
    },
    registerText: {
        fontSize: 14,
        color: "#777",
    },
    registerLink: {
        fontSize: 14,
        color: "#3498db",
    },
    loginButton: {
        backgroundColor: "red",
        color: "white",
        marginTop: 16,
    },
    alertContainer: {
        backgroundColor: "#f44336",
        padding: 8,
        borderRadius: 8,
        marginBottom: 16,
    },
    alertText: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
    },
    alertContainerSucess: {
        backgroundColor: "blue",
        padding: 8,
        borderRadius: 8,
        marginBottom: 16,
    },
    loginSucess: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
    },
});
