import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUrl } from '../const';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      checkLogin();
    }, 3000);
  }, []);
  const checkLogin = async () => {

    const email = await AsyncStorage.getItem('token');
    console.log(email);
    if (email !== null) {
      const response = await axios.get(`${baseUrl}/members/bytoken`,{
        headers: {
          'Authorization': `Bearer ${ await AsyncStorage.getItem('token')}`
        }});
        const id = await AsyncStorage.setItem('id',response.data._id);
        console.log(id,"cnkjsc")
      navigation.navigate('Home');
      
    } else {
      navigation.navigate('Home');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>DEMO</Text>
    </View>
  );
};

export default Splash;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 30,
    fontWeight: '800',
    color: 'red',
  },
});
