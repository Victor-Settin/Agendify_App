import React, { useState } from "react";
import SuccessPopup from "../../components/popup/successPopup";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { View, TextInput, Button, Text, StyleSheet } from "react-native";
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

export default function RegisterUser({ userType }) {
    const [isRegistered, setIsRegistered] = useState(false);
    const navigation = useNavigation();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleRegister = async (data) => {
        console.log("teste");
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
            console.log(userData);
            const response = await axios.post(
                `http://192.168.1.13:3001/${endpoint}`,
                userData
            );

            setIsRegistered(true);
        } catch (err) {
            if (err.response.status === 400) {
                console.log("Email already exists.");
            } else {
                console.log(err);
            }
        }
    };

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
                                    style={styles.inputForm}
                                    placeholder="nome do estabelecimento"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                />
                            )}
                        />
                        {errors.nameestablishment && (
                            <Text style={styles.labelError}>
                                {errors.nameestablishment?.message}
                            </Text>
                        )}
                    </>
                )}
                <Text style={styles.titleInputForm}>Seu nome</Text>
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
                {errors.email && (
                    <Text style={styles.labelError}>
                        {errors.email?.message}
                    </Text>
                )}
                <Text style={styles.titleInputForm}>Crie uma senha</Text>
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
                        />
                    )}
                />
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
        marginBottom: 8,
        fontSize: 16,
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
});