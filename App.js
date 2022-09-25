import { useState, useEffect } from 'react';
import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './screens/Login';
import { Register } from './screens/Register';
import { PatientDash } from './screens/PatientDash';
import { Loading } from './screens/Loading';
import { DoctorDash } from './screens/DoctorDash';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator();

const { Navigator, Screen } = Stack;

const initialValue = {
  auth: null,
  changeAuthState: () => { },
};

export const AuthContext = React.createContext(initialValue);

function App() {

  const [auth, setAuth] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const credentials = await AsyncStorage.getItem('authToken');
        const isDoctor = await AsyncStorage.getItem('isDoctor');
        if (credentials) {
          setAuth({ token: credentials, isDoctor });
        }
      } catch (err) {
        console.log('Error: ' + err)
      }
      setLoader(false);
    })();
  }, []);

  const setScreens = () => {
    if (loader) {
      return (
        <Screen
          name="loading"
          component={Loading}
          options={{ title: 'EasyDoc' }}
        />
      );
    } else if (auth) {
      return (
        <>
          {/* <Screen name="Login" component={Login} options={{ title: 'EasyDoc' }} /> */}
          {/* <Screen name="Register" component={Register} /> */}
          <Screen name="Patient" component={PatientDash} />
          <Screen name="Doctor" component={DoctorDash} />
          </>
      )
    } else {
      return (
        <>
          {/* <Screen name="Login" component={Login} options={{ title: 'EasyDoc' }} /> */}
          {/* <Screen name="Register" component={Register} /> */}
          <Screen name="Doctor" component={DoctorDash} />
          <Screen name="Patient" component={PatientDash} />
        </>
      );
    }
  };

  const changeAuthState = (authState) => {
    setAuth(authState);
  };


  return (
    <NavigationContainer fallback={<Loading />}>
      <AuthContext.Provider
        value={{ auth: auth, changeAuthState: changeAuthState }}>
        <Navigator initialRouteName='Patient'>
          {/* <Screen name="Doctor" component={DoctorDash} /> */}
          {setScreens()}
        </Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}

export default App;