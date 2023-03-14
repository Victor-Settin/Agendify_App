import React, { useState } from "react";
import SuccessPopup from "../../components/popup/successPopup";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Icon from "react-native-vector-icons/FontAwesome";
import * as yup from "yup";
import { useRoute } from "@react-navigation/native";

import {
    View,
    TextInput,
    Button,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import axios from "axios";

const schema = yup
    .object({
        username: yup.string().required("informe seu usuario"),
        email: yup
            .string()
            .email("email invalido")
            .required("informe seu email"),
        password: yup
            .string()
            .min(6, "a senha deve ter no minimo 6 digitos")
            .required("informe sua senha"),
        nameestablishment: yup.lazy((value) => {
            if (value !== undefined && value !== null && value !== "") {
                return yup
                    .string()
                    .required("Informe o nome do seu estabelecimento");
            }
            return yup.string();
        }),
    })
    .required();

let typeInput = "";
let resError = "";

export default function RegisterUser() {
    const route = useRoute();

    // Recupera o userType da rota atual
    const userType = route.params.userType;

    const [isRegistered, setIsRegistered] = useState(false);
    const [establishmentError, setEstablishmentError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigation = useNavigation();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleRegister = async (data) => {
        if (!data.nameestablishment) {
            setEstablishmentError("Informe o nome do seu estabelecimento");
        } else {
            setEstablishmentError(null);
        }

        const userData = {
            email: data.email,
            username: data.username,
            password: data.password,
        };

        if (userType !== "client") {
            userData.nameestablishment = data.nameestablishment;
        }

        try {
            const endpoint =
                userType === "client" ? "clientes" : "profissionais";
            const response = await axios.post(
                `http://192.168.1.13:3001/${endpoint}`,
                userData
            );
            typeInput = "";
            resError = "";
            setIsRegistered(true);
        } catch (err) {
            typeInput = err.response.data.typeInput;
            resError = err.response.data.errorMessage;

            if (typeInput === "email") {
                setErrorMessage(resError);
            } else if (typeInput === "username") {
                setErrorMessage(resError);
            } else {
                setErrorMessage("Error creating user.");
            }
        }
    };
    console.log(typeInput, "e", resError);

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                {userType === "professional" && (
                    <>
                        <Text style={styles.titleInputForm}>
                            Nome do estabelecimento
                        </Text>
                        <Controller
                            name="nameestablishment"
                            control={control}
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <TextInput
                                    style={[
                                        styles.inputForm,
                                        establishmentError &&
                                            styles.inputFormError,
                                    ]}
                                    placeholder="nome do estabelecimento"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={(e) => {
                                        onBlur(e);
                                        if (!value) {
                                            setEstablishmentError(
                                                "Informe o nome do seu estabelecimento"
                                            );
                                        } else {
                                            setEstablishmentError(null);
                                        }
                                    }}
                                />
                            )}
                        />
                        {establishmentError && (
                            <Text style={styles.labelError}>
                                {establishmentError}
                            </Text>
                        )}
                    </>
                )}
                <Text style={styles.titleInputForm}>Seu nome {typeInput}</Text>
                <Controller
                    name="username"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.inputForm}
                            placeholder="nome"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                        />
                    )}
                />
                {errorMessage && typeInput === "username" && (
                    <Text style={styles.labelError}>{errorMessage}</Text>
                )}

                {errors.username && (
                    <Text style={styles.labelError}>
                        {errors.username?.message}
                    </Text>
                )}
                <Text style={styles.titleInputForm}>Seu e-mail</Text>
                <Controller
                    name="email"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.inputForm}
                            placeholder="para recuperar senha"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                        />
                    )}
                />
                {errorMessage && typeInput === "email" && (
                    <Text style={styles.labelError}>{errorMessage}</Text>
                )}
                {errors.email && (
                    <Text style={styles.labelError}>
                        {errors.email?.message}
                    </Text>
                )}
                <Text style={styles.titleInputForm}>Crie uma senha</Text>
                <View style={styles.passwordInput}>
                    <Controller
                        name="password"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.inputForm}
                                placeholder="senha"
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

                {isRegistered && (
                    <SuccessPopup
                        onClose={(data) => {
                            setIsRegistered(false);
                            navigation.goBack({
                                infoClientRegistred: {
                                    data,
                                },
                            });
                        }}
                        message="Registration successful!"
                    />
                )}
                <Button
                    title="Register"
                    onPress={handleSubmit(handleRegister)}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        borderRadius: 8,
        marginTop: 10,
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
    titleInputForm: {
        fontSize: 20,
        fontWeight: "bold",
    },
    errorMessage: {
        color: "red",
        marginBottom: 16,
        textAlign: "center",
    },
    successMessage: {
        color: "green",
        marginBottom: 16,
        textAlign: "center",
    },
    createdSucess: {
        color: "green",
    },
    requirementText: {
        marginLeft: 8,
        fontSize: 14,
        color: "#888",
    },
    requirementIcon: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "#DDD",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
    },
    requirementIconActive: {
        backgroundColor: "#47BFBF",
    },
    registerButton: {
        backgroundColor: "#47BFBF",
        borderRadius: 8,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    registerButtonText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 16,
    },
    labelError: {
        alignSelf: "flex-start",
        color: "#ff375b",
        marginBottom: 4,
    },
    inputFormError: {
        borderBottomColor: "red",
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
});
