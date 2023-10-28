import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUrl } from '../const';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const adminLogin = async () => {
    try{
      const headers = {
        "Content-Type": "application/json",
      };
        // console.log(formData,`${baseUrl}/members`)
        const response = await axios.post(`${baseUrl}/members/login`, {
          email,
          password
        },{ headers });
        console.log(response.data)
        if(response.data.token){
          await AsyncStorage.setItem('token', response.data.token);
        navigation.navigate('Home');
        }
        else{
          alert('Invalid Credentials');
        }
      }
      catch(err){
        console.log(err)
      }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View>
        <Text style={styles.label}>Enrolment No.</Text>
      <TextInput
        style={[styles.inputStyle, {backgroundColor: '#eeeeee'}]}
        placeholder={'Enter your Enrolment No.'}
        placeholderTextColor="#000"
        value={email}
        onChangeText={txt => setEmail(txt)}
      />
      </View>
      <View>
        <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.inputStyle}
        placeholder={'Enter Password'}
        placeholderTextColor="#000"
        value={password}
        onChangeText={txt => setPassword(txt)}
      />
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          if (email !== '' && password !== '') {
            adminLogin();
          } else {
            alert('Please Enter Data');
          }
        }}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
       style={{marginTop:30}}
        onPress={() => {
          navigation.navigate('UserLogin');
        }}>
        <Text style={[styles.btnText,{color:'#0c9ee6',textAlign:'center'}]}>Register?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000',
    marginTop: 100,
    alignSelf: 'center',
  },
  inputStyle: {
    paddingLeft: 20,
    height: 50,
    alignSelf: 'center',
    marginTop: 13,
    borderWidth: 0.5,
    width: '90%',
    backgroundColor: '#eeeeee',
    borderWidth: 0,
    borderRadius: 20
  },
  label: {
    fontSize: 15,
    paddingLeft: 30,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#182539'
  },
  loginBtn: {
    backgroundColor: '#0c9ee6',
    width: '90%',
    height: 50,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  
});
