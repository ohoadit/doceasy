import { useState } from "react";
import { Keyboard, KeyboardAvoidingView, ScrollView, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import DatePicker from "react-native-date-picker";
import { Button, Switch, Text, TextInput } from "react-native-paper";
import { Input } from "../components/Input";

const initialValues = {
    email: '',
    password: '',
    confirmPass: '',
    isDoctor: false,
}

const Register = () => {

    const [details, setDetails] = useState({ ...initialValues });

    const [errors, setErrors] = useState({ ...initialValues })

    const handleFieldChange = (key, value) => {
        if (errors[key]) {
            errors[key] = '';
        }
        setDetails({
            ...details,
            [key]: value,
        });
    }

    const toggleSwitchChange = (value) => {
        setDetails({ ...details, isDoctor: value });
    }

    const renderDoctorDetails = () => {
        return (
            <>
                <Input
                    label="Speciality"
                    name="speciality"
                    onFieldChange={handleFieldChange}
                    value={details.speciality}
                    error={errors.speciality}
                />
                
            </>
        )
    }

    const renderPatientDetails = () => {

    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}
            behavior={'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView keyboardShouldPersistTaps="handled">
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Input
                            name="email"
                            value={details.username}
                            onFieldChange={handleFieldChange}
                            label="Email"
                            error={errors.email}
                        />

                        <Input
                            name="password"
                            value={details.password}
                            password
                            onFieldChange={handleFieldChange}
                            label="Password"
                            error={errors.password}
                        />

                        <Input
                            name="confirmPassword"
                            value={details.confirmPass}
                            password
                            onFieldChange={handleFieldChange}
                            label="Retype password"
                            error={errors.confirmPass}
                        />
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20 }}>
                            <Text variant="labelLarge">
                                Are you a Doctor?
                            </Text>
                            <Switch onValueChange={toggleSwitchChange} value={details.isDoctor} />
                        </View>
                        {
                            details.isDoctor ? renderDoctorDetails() : renderPatientDetails()
                        }
                        <Input
                            keyboardType="numeric"
                            label="Latitude"
                            name="latitude"
                            onFieldChange={handleFieldChange}
                            value={details.latitude}
                            error={errors.latitude}
                        />
                        <Input
                            keyboardType="numeric"
                            label="Longitude"
                            name="longitude"
                            onFieldChange={handleFieldChange}
                            value={details.longitude}
                            error={errors.longitude}
                        />
                        <Button
                            style={{ marginTop: 20 }}
                            mode="contained"
                            onPress={() => console.log('Pressed')}
                        >
                            SIGN UP
                        </Button>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export { Register };
