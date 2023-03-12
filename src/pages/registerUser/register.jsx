import { View } from "react-native";
import RegisterUser from "../../components/registerUser";

export default function PageRegisterUser({ route }) {
    const { userType } = route.params;
    return (
        <View>
            <RegisterUser userType={userType} />
        </View>
    );
}
