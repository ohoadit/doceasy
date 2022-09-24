import { useState } from "react";
import { Keyboard, KeyboardAvoidingView, ScrollView, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Input } from "../components/Input";

const initialValues = {
    email: '',
    password: '',
}

const Login = () => {

    const [creds, setCreds] = useState({ ...initialValues });

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

    const handleAuth = () => {

    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}
            behavior={'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView keyboardShouldPersistTaps="handled">
                    <View style={{ flex: 1, alignItems: 'center'}}>
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
                        <View style={{ paddingVertical: 30, width: 100 }}>
                            <Button
                                mode="contained"
                                onPress={() => console.log('Pressed')}>
                                LOG IN
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export { Login };
