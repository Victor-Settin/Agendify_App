import { View, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import Signin from "../../components/signin";

const PageProfessional = () => {
    const route = useRoute();

    // Recupera o userType da rota atual
    const userType = route.params.userType;

    return (
        <View style={styles.container}>
            <Signin userType={userType} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default PageProfessional;
