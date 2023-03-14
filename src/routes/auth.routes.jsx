import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeClient from "../pages/views/pagesClient/HomeClient";

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="homeClient"
                component={HomeClient}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
