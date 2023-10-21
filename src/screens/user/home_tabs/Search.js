import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../../common/Header';
import axios from 'axios';
import { baseUrl } from '../../../const';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Search() {
  const [rewardPoints, setRewardPoints] = useState(0);
  const [referralHistory, setReferralHistory] = useState([]);
  const [account,setAccount]=useState(0);
  const[salarydata,setSalary]=useState([]);

  // Example userreferedby data
  const userreferedby = {
    firstname: 'John',
    lastname: 'Doe',
    id: 123,
  };

  useEffect(() => {
    // Calculate the total reward points (you can fetch this from an API or database)
    // For this example, we'll set it to a fixed value.
    const totalPoints = 100;
    setRewardPoints(totalPoints);

    // Create an array of referral objects
    const referralObject = {
      purpose: `Referral to ${userreferedby.firstname} ${userreferedby.lastname}`,
      createdAt: new Date().toISOString(),
      amount: 10,
      userid: userreferedby.id,
      status: 'pending',
    };
   

    // Add the referral object to the history
    setReferralHistory([referralObject,referralObject,referralObject,referralObject,referralObject,referralObject]);
  }, []);
  const getData=async ()=>{
    const email = await AsyncStorage.getItem('token');
    if(email!==null){
    console.log("here",`${baseUrl}/salaryaccount/findAllforuser?userid=${await AsyncStorage.getItem('id')}`)
    const response = await axios.get(`${baseUrl}/salaryaccount/findAllforuser?userid=${await AsyncStorage.getItem('id')}`,{
        headers: {
          'Authorization': `Bearer ${ await AsyncStorage.getItem('token')}`
        }});

    if(response?.data){
        console.log(response.data)
        setSalary(response.data)
    }
}else{
navigation.navigation('SelectLogin')
}
}
const getWithdrawalData=async ()=>{
  const email = await AsyncStorage.getItem('token');
  if(email!==null){
  console.log("here")
  const response = await axios.get(`${baseUrl}/withdrawalaccount/findAllforuser?userid=${await AsyncStorage.getItem('id')}`,{
      headers: {
        'Authorization': `Bearer ${ await AsyncStorage.getItem('token')}`
      }});

  if(response?.data){
      console.log(response.data)
      setSalary(response.data)
  }
}else{
navigation.navigation('SelectLogin')
}
}

const Transactions=async ()=>{
  const email = await AsyncStorage.getItem('token');
  if(email!==null){
  console.log("here")
  const response = await axios.get(`${baseUrl}/transaction/findAllforuser?userid=${await AsyncStorage.getItem('id')}`,{
      headers: {
        'Authorization': `Bearer ${ await AsyncStorage.getItem('token')}`
      }});

  if(response?.data){
      console.log(response.data)
      setSalary(response.data)
  }
}else{
navigation.navigation('SelectLogin')
}
}
  return (
    <View style={styles.container}>
      <Header
        title={account==0?'Select Account':account==1?'Salary Account':'Withdrawal Account'}
        // icon={require('../../../images/profile.png')}
        // count={0}
        onClickIcon={() => {
          navigation.navigate('Cart');
        }}
      />
      {  <View> 
          <TouchableOpacity style={{borderColor:'black',borderWidth:1,alignItems:'center',justifyContent:'center',marginVertical:10,width:'80%',alignSelf:'center',borderRadius:10,backgroundColor:'blue'}} onPress={()=>{setAccount(1);getData()}}> 
          <Text style={styles.totalPoints}>{`Salary Account`}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderColor:'black',borderWidth:1,alignItems:'center',justifyContent:'center',marginVertical:10,width:'80%',alignSelf:'center',borderRadius:10,backgroundColor:'blue'}} onPress={()=>{setAccount(2);getWithdrawalData()}}> 
          <Text style={styles.totalPoints}>{`Withdrawal Account`}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderColor:'black',borderWidth:1,alignItems:'center',justifyContent:'center',marginVertical:10,width:'80%',alignSelf:'center',borderRadius:10,backgroundColor:'blue'}} onPress={()=>{setAccount(3);Transactions()}}> 
          <Text style={styles.totalPoints}>{`Transactions`}</Text>
          </TouchableOpacity>
        </View>}

        {account==1&& (salarydata.length>0?<FlatList
        data={salarydata}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.referralItem}>
            <Text>{item.purpose}</Text>
            <Text>Created At: {item.createdAt}</Text>
            <Text>Amount: {item.amount}</Text>
            {/* <rText>User ID: {item.userid}</Text> */}
            <Text>Status: {item.status}</Text>
          </View>
        )}
      />:<Text style={{textAlign:'center'}}>NO TRANSACTION FOUND</Text>)}
         {account==2&& (salarydata.length>0?<FlatList
        data={salarydata}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.referralItem}>
            <Text>{item.purpose}</Text>
            <Text>Created At: {item.createdAt}</Text>
            <Text>Amount: {item.amount}</Text>
            {/* <rText>User ID: {item.userid}</Text> */}
            <Text>Status: {item.status}</Text>
          </View>
        )}
      />:<Text style={{textAlign:'center'}}>NO TRANSACTION FOUND</Text>)}
       {account==3&& (salarydata.length>0?<FlatList
        data={salarydata}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.referralItem}>
            <Text>{item.purpose}</Text>
            <Text>Created At: {item.createdAt}</Text>
            <Text>Amount: {item.amount}</Text>
            {/* <rText>User ID: {item.userid}</Text> */}
            <Text>Status: {item.status}</Text>
          </View>
        )}
      />:<Text style={{textAlign:'center'}}>NO TRANSACTION FOUND</Text>)}
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height:'70%'
    // padding: 16,
  },
  totalPoints: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color:'white'
  },
  referralItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 8,
  },
});

export default Search;
