import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from "../pages/welcome";
import PageRegisterUser from "../pages/registerUser/register";
import PageClient from "../pages/signinClient";
import PageProfessional from "../pages/signinProfessional";
import HomeClient from "../pages/views/pagesClient/HomeClient";
import Signin from "../components/signin";

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator>
            {/* Page main welcome */}
            <Stack.Screen
                name="welcome"
                component={Welcome}
                options={{ headerShown: false }}
            />
            {/* Page SiginIn */}
            <Stack.Screen
                name="SiginIn"
                component={Signin}
                options={{ headerShown: true, title: "voltar" }}
            />
            {/* Page login Client */}
            <Stack.Screen
                name="pageClient"
                component={PageClient}
                options={{ headerShown: true, title: "Login Cliente" }}
            />
            {/* Page login Professional */}
            <Stack.Screen
                name="pageProfessional"
                component={PageProfessional}
                options={{ headerShown: true, title: "Login Profissional" }}
            />
            {/* Page RegisterUser */}
            <Stack.Screen
                name="PageRegisterUser"
                component={PageRegisterUser}
                options={{ headerShown: true }}
            />
            {/* Page homeClient */}
            <Stack.Screen
                name="homeClient"
                component={HomeClient}
                options={{ headerShown: true, title: "voltar" }}
            />
        </Stack.Navigator>
    );
}
