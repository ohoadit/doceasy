import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../utils/api';
import {ActivityIndicator, Card, Button } from 'react-native-paper';

const DoctorDash = ({ navigation, route }) => {
  const [data, setData] = useState([
    {
      _id: 'asdasd',
      patientName: 'Patient 1',
    }
  ]);
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);


  const acceptMeeting = (meetingId) => async () => {
    Alert.alert("Success", "Meeting approved");
    return;
    const config = {
      headers: {
        accept: 'application/json',
          'Content-Type': 'application/json',
        'easydoc-session-config': await AsyncStorage.getItem('authToken'),
      },
      };
      try {
        const res = await api.post('/meetingapi/meeting', details, config);
        // if (res.data === 'success') {
            Alert.alert("Success", "Meeting accepted, please check your email for video link...")
        // }
      } catch (err) {
        console.log(err)
        Alert.alert('Error', err.response.data.msg);
        setLoader(false);
      }
  }
  

  const fetchAppointments = (state = false) => async () => {
    if (state) {
      setRefresh(true);
    } else {
      setLoader(true);
    }
    const authToken = await AsyncStorage.getItem('authToken');
    const config = {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'easydoc-session-config': authToken,
      },
    };
    try {
      const res = await api.get('/meetingapi/meetings/docter', config);
      setData(res.data);
    } catch (err) {
      Alert.alert('Error', err.message);
    }
    if (state) {
      setRefresh(false);
    } else {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchAppointments(false)();
  }, []);

  return (
    <View style={styles.screen}>
    
          <Card styling={styles.card} >
        <Card.Content style={styles.cardData}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            Patient 1
          </Text>
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <Button onPress={acceptMeeting(1)} textColor="green">
            Approve
            </Button>
          <Button onPress={() => console.log('Reject')} textColor="red">
            Reject
            </Button>
        </Card.Actions>
            </Card>
            <Card styling={styles.card} >
        <View style={styles.cardData}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            Patient 2
          </Text>
        </View>
        <View style={styles.cardActions}>
          <Button onPress={acceptMeeting(2)} textColor="green">
            Approve
            </Button>
          <Button onPress={() => console.log('Reject')} textColor="red">
            Reject
            </Button>
        </View>
            </Card>
            <Card styling={styles.card} >
        <View style={styles.cardData}>
          <Text style={styles.cardTitle} numberOfLines={1}>
          Patient 3
          </Text>
        </View>
        <View style={styles.cardActions}>
          <Button onPress={acceptMeeting(3)} textColor="green">
            Approve
            </Button>
          <Button onPress={() => console.log('Reject')} textColor="red">
            Reject
            </Button>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    display: 'flex',
    width: '100%',
    height: '100%',
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  listContainer: {
    display: 'flex',
    width: '100%',
    paddingHorizontal: 20,
  },
  card: {
    paddingHorizontal: 15,
    marginVertical: 25,
    flexDirection: 'row',
    backgroundColor: '#f5f6f7',
    justifyContent: 'space-between',
    elevation: 5,
  },
  cardData: {
    // width: '70%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  cardActions: {
    // width: '30%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  timestamp: {
    marginTop: 10,
    fontSize: 12,
  },
  cardTitle: {
    fontSize: 16,
    color: '#404b69'
  },
});

export { DoctorDash };