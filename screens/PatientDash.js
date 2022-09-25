import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, ScrollView, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import DatePicker from "react-native-date-picker";
import { Button, Switch, Text, TextInput } from "react-native-paper";
import { Input } from "../components/Input";
import api from "../utils/api";

// const symptomList = [
//     {
//         label: "Headache",
//         value: "headache",
//     },
//     {
//         label: "Fever",
//         value: "fever",
//     },
//     {
//         label: "Cough",
//         value: "cough",
//     },
//     {
//         label: "Cold",
//         value: "cold",
//     },
//     {
//         label: "Diarrhea",
//         value: "diarrhea",
//     },
//     {
//         label: "Vomiting",
//         value: "vomiting",
//     }
// ];



const PatientDash = ({ navigation, route}) => {

    const [details, setDetails] = useState({});

    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    const handleFieldChange = (key, value) => {
        setDetails({
            ...details,
            [key]: value,
        });
    }

    const requestMeeting = async () => {
        const config = {
            headers: {
              accept: 'application/json',
                'Content-Type': 'application/json',
              'easydoc-session-config': await AsyncStorage.getItem('authToken'),
            },
          };
          try {
            // const res = await api.post('/meetingapi/requestMeeting', details, config);
            // if (res.data === 'success') {
              Alert.alert("Success", "Doctors requested");
              navigation.navigate('Doctor')
            // }
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
                    <Input
                        name="patientName"
                        value={details.patientName}
                        onFieldChange={handleFieldChange}
                        label="Patient Name"
                    />
                    {/* <Input
                        name="phone"
                        value={details.phone}
                        onFieldChange={handleFieldChange}
                        label="Phone"
                        keyboardType={"numeric"}
                        maxLength={10}
                    /> */}
                    
                    <Input
                        name="symptoms"
                        value={details.symptoms}
                        onFieldChange={handleFieldChange}
                        label="Symptoms"
                    />
                    <Input
                        multiline
                        numberOfLines={4}
                        label={"Detailed description"}
                        value={details.description}
                        name="description"
                        onFieldChange={handleFieldChange}
                    />
                     <Input
                        keyboardType="numeric"
                        label="Latitude"
                        name="latitude"
                        onFieldChange={handleFieldChange}
                        value={details.latitude}
                    />
                    <Input
                        keyboardType="numeric"
                        label="Longitude"
                        name="longitude"
                        onFieldChange={handleFieldChange}
                        value={details.longitude}
                    />
                    {!details.startTime ? <Button onPress={() => setOpen('startTime')} >
                        Select appointment start time
                    </Button> : <Text>{`Appointment start time: ${new Date(details.startTime).getHours()}: ${new Date(details.startTime).getMinutes()}`}</Text>}
                    {!details.endTime ? <Button onPress={() => setOpen('endTime')} >
                        Select appointment end time
                    </Button> : <Text>{`Appointment end time: ${new Date(details.endTime).getHours()}: ${new Date(details.endTime).getMinutes()}`}</Text>}
                    <DatePicker
                        modal
                        mode="time"
                        open={open}
                        date={date}
                        minimumDate={details.startTime}
                        onConfirm={(date) => {
                            setOpen(false)
                            setDate(date)
                            handleFieldChange(open, date)
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />
                    <Button
                        style={{ marginTop: 20 }}
                        mode="contained-tonal"
                        onPress={requestMeeting}
                    >
                        Find
                    </Button>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

export { PatientDash }