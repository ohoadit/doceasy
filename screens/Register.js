import { useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, ScrollView, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Button, Switch, Text, TextInput } from "react-native-paper";
import { Input } from "../components/Input";
import api from "../utils/api";

const initialValues = {
    email: '',
    password: '',
    confirmPass: '',
    isDoctor: false,
    latitude: undefined,
    longitude: undefined,
    speciality: '',
}

const languageList = [
    {
        label: 'English',
        value: 'english',
    },
    {
        label: 'Spanish',
        value: 'spanish',
    },
]

const Register = ({ navigation }) => {

    const [details, setDetails] = useState({ ...initialValues });

    const [errors, setErrors] = useState({ ...initialValues })
    const [loader, setLoader] = useState(false);
    const [open, setOpen] = useState(false);

    const handleFieldChange = (key, value) => {
        if (errors[key]) {
            errors[key] = '';
        }
        // console.log({ key })
        // console.log({ value })
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
            </>
        )
    }

    const registerUser = async () => {
        try {
            Keyboard.dismiss();
            const errorKeys = {};
            // Object.keys(details).forEach((field) => {
            //     const val = details[`${field}`];
            //     // console.log(val);
            //     if (!val) {
            //       errorKeys[`${field}`] = 'This field is required';
            //     }
            //     if (field === 'password' && val.length < 8) {
            //       errorKeys[`${field}`] = 'Minimum 8 characters are required';
            //     }
            //     if (field === 'confirmPass') {
            //         if (val !== details['password']) {
            //             errorKeys[`${field}`] = 'Passwords should match';
            //         }
            //     }
            // });
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
            const url = details.isDoctor ? '/doctorapi/docterSignUp' : '/userapi/userSignUp'
            console.log({ url });
            const res = await api.post(url, details, config);
            if (res.data === 'success') {
                setLoader(false);
                Alert.alert("Success", "User registered successfully")
            }
        } catch (err) {
            console.log(err)
            Alert.alert('Error', err.response.data.msg);
            setLoader(false);
        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}
            behavior={'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView keyboardShouldPersistTaps="handled">
                    {/* <View style={{ flex: 1, alignItems: 'center' }}> */}
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
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20, paddingHorizontal: 10 }}>
                        <Text variant="labelLarge">
                            Are you a Doctor?
                        </Text>
                        <Switch onValueChange={toggleSwitchChange} value={details.isDoctor} />
                    </View>
                    {
                        details.isDoctor ? renderDoctorDetails() : null
                    }
                    <DropDownPicker
                        open={open}
                        value={details.preferredLanguage}
                        items={languageList}
                        setOpen={setOpen}
                        placeholder="Preferred Language"
                        onChangeValue={(value) => {
                            handleFieldChange('preferredLanguage', value)
                        }}
                        />
                    <Button
                        style={{ marginTop: 20 }}
                        mode="contained-tonal"
                        onPress={registerUser}
                        disabled={loader}
                        loading={loader}
                    >
                        SIGN UP
                    </Button>
                    <View style={{ paddingVertical: 30 }}>
                        <Text style={{ textAlign: 'center', marginBottom: 10 }}>Existing User?</Text>
                        <Button
                            mode="contained-tonal"
                            disabled={loader}
                            onPress={() => navigation.navigate('Login')}>
                            SIGN IN
                        </Button>
                    </View>
                    {/* </View> */}
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export { Register };
