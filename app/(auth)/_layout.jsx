import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './sign-in';
import SignUp from './sign-up';

const Stack = createNativeStackNavigator();

const AuthLayout = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
    );
};

export default AuthLayout;
