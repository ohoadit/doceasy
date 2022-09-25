import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, ScrollView, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { AuthContext } from "../App";
import { Input } from "../components/Input";
import api from "../utils/api";

const initialValues = {
    email: '',
    password: '',
}

const Login = ({ navigation }) => {

    const [creds, setCreds] = useState({ ...initialValues });
    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState({ ...initialValues })

    const handleCredsChange = (key, value) => {
        if (errors[key]) {
            errors[key] = '';
        }
        setCreds({
            ...creds,
            [key]: value,
        });
    }

    
    const handleAuth = async (changeAuthState) => {
          Keyboard.dismiss();
          const errorKeys = {};
          Object.keys(creds).forEach((field) => {
            const val = creds[`${field}`];
            // console.log(val);
            if (!val) {
              return (errorKeys[`${field}`] = 'This field is required');
            }
            if (field === 'password' && val.length < 8) {
              errorKeys[`${field}`] = 'Minimum 8 characters are required';
            }
          });
    
          if (Object.keys(errorKeys).length !== 0) {
            setErrors(errorKeys);
            return;
          }
          setLoader(true);
          setErrors(errorKeys);
          const config = {
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
            },
          };
          try {
            const res = await api.post('/authapi/login', creds, config);
            // if (res.data === 'success') {
            const authConfig = res.headers['easydoc-session-config'];
            const isDoctor = res.headers['easydoc-doctor-config'];
            console.log(res.headers)
            await AsyncStorage.setItem('authToken', authConfig);
            await AsyncStorage.setItem('isDoctor', isDoctor);
              setLoader(false);
              changeAuthState(authConfig);
              navigation.navigate(authConfig.isDocter ? 'Doctor' : 'Patient');
            // }
          } catch (err) {
            console.log(err)
            Alert.alert('Error', err.response.data.msg);
            setLoader(false);
          }
    }

  return (
    <AuthContext.Consumer>
      {({ changeAuthState }) => (
        <KeyboardAvoidingView
          style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}
          behavior={'height'}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView keyboardShouldPersistTaps="handled">
              {/* <View style={{ flex: 1, alignItems: 'center' }}> */}
              <Input
                name="email"
                value={creds.username}
                onFieldChange={handleCredsChange}
                label="Email"
                error={errors.email}
              />

              <Input
                name="password"
                value={creds.password}
                password
                onFieldChange={handleCredsChange}
                label="Password"
                error={errors.password}
              />
              <View style={{ paddingVertical: 30 }}>
                <Button
                  mode="contained-tonal"
                  onPress={() => handleAuth(changeAuthState)}
                  loading={loader}
                  disabled={loader}
                >
                  LOG IN
                </Button>
              </View>

              <View style={{ paddingVertical: 30 }}>
                <Text style={{ textAlign: 'center', marginBottom: 10 }}>New User?</Text>
                <Button
                  mode="contained-tonal"
                  disabled={loader}
                  onPress={() => navigation.navigate('Register')}>
                  SIGN UP
                </Button>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
      </AuthContext.Consumer>
    );
};

export { Login };
