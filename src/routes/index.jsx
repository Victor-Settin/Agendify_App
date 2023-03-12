import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from "../pages/welcome";
import Signin from "../pages/signin";
import PageProfessional from "../pages/acessProfessional";
import PageClient from "../pages/acessClient";
import PageRegisterUser from "../pages/registerUser/register";

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
                options={{ headerShown: false }}
            />
            {/* Page login Client */}
            <Stack.Screen
                name="pageClient"
                component={PageClient}
                options={{ headerShown: false }}
            />

            {/* Page login Professional */}
            <Stack.Screen
                name="pageProfessional"
                component={PageProfessional}
                options={{ headerShown: true }}
            />
            {/* Page RegisterUser */}
            <Stack.Screen
                name="PageRegisterUser"
                component={PageRegisterUser}
                options={{ headerShown: true }}
            />
        </Stack.Navigator>
    );
}
