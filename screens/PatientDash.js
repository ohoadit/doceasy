import { useState } from "react";
import { Keyboard, KeyboardAvoidingView, ScrollView, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import DatePicker from "react-native-date-picker";
import { Button, Switch, Text, TextInput } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { Input } from "../components/Input";

const symptomList = [
    {
        label: "Headache",
        value: "headache",
        custom: null,
    },
    {
        label: "Fever",
        value: "fever",
        custom: null,
    },
    {
        label: "Cough",
        value: "cough",
        custom: null,
    },
    {
        label: "Cold",
        value: "cold",
        custom: null,
    },
    {
        label: "Diarrhea",
        value: "diarrhea",
        custom: null,
    },
    {
        label: "Vomiting",
        value: "vomiting",
        custom: null,
    }
];

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

const PatientDash = () => {

    const [details, setDetails] = useState({});

    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);
    const [showSelectDropDown, setShowSelectDropDown] = useState(false);

    const handleFieldChange = (key, value) => {
        if (key === 'phone') {
            value = value.replace(/[^0-9]/g, '');
        }
        setDetails({
            ...details,
            [key]: value,
        });
    }

    const handleDropDownChange = (values) => {
        console.log({ values });
        setDetails({
            ...details,
            symptoms: values,
        });
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
                    <Input
                        name="phone"
                        value={details.phone}
                        onFieldChange={handleFieldChange}
                        label="Phone"
                        keyboardType={"numeric"}
                        maxLength={10}
                    />
                    <DropDown
                        dropDownStyle={{ paddingTop: 20 }}
                        label={"Preferred language"}
                        mode={"flat"}
                        visible={showSelectDropDown}
                        value={details.preferredLanguage}
                        list={languageList}
                        setValue={(value) => handleFieldChange('preferredLanguage', value)}
                        showDropDown={() => setShowSelectDropDown(true)}
                        onDismiss={() => setShowSelectDropDown(false)}
                    />
                    <DropDown
                        label={"Symptoms"}
                        mode={"flat"}
                        dropDownStyle={{ marginVertical: 20 }}
                        visible={showMultiSelectDropDown}
                        showDropDown={() => setShowMultiSelectDropDown(true)}
                        onDismiss={() => setShowMultiSelectDropDown(false)}
                        value={details.symptoms || []}
                        setValue={handleDropDownChange}
                        list={symptomList}
                        multiSelect
                    />
                    <Input
                        multiline
                        numberOfLines={4}
                        label={"Detailed description"}
                        value={details.detailedDescription}
                        onFieldChange={handleFieldChange}
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
                        mode="contained"
                        onPress={() => console.log('Pressed')}
                    >
                        Find
                    </Button>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

export { PatientDash }