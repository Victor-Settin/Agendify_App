import React from "react";
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
    })
    .required();

export default function Signin({ userType }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const navigation = useNavigation(); // get the navigation object

    const handleSignIn = () => {
        // Authentication logic here
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
                    name="username"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.inputForm}
                            placeholder="Nome do usuario ou e-mail"
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

                <Button title="Register" onPress={handleSubmit(handleSignIn)} />

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
        fontSize: 12,
        fontWeight: "bold",
        color: "blue",
    },
});
