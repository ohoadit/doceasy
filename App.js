import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Login } from './screens/Login';
import { Register } from './screens/Register';


const Stack = createNativeStackNavigator();

const { Navigator, Screen } = Stack;

function App() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="Register" component={Register} />
        <Screen name="Login" component={Login} />
      </Navigator>
    </NavigationContainer>
  );
}

export default App;