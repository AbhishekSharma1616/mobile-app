import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { baseUrl } from '../../../const';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../common/Header';
import { useNavigation } from '@react-navigation/native';


const Profile = ({ route }) => {
  const [userData,setData]=useState(null)
  const navigation=useNavigation()
  useEffect(()=>{
    getData()
  },[])
  const getData=async ()=>{
    const email = await AsyncStorage.getItem('token');
    if(email!==null){
    console.log("here")
    const response = await axios.get(`${baseUrl}/members/bytoken`,{
        headers: {
          'Authorization': `Bearer ${ await AsyncStorage.getItem('token')}`
        }});

    if(response?.data){
        console.log(response.data)
        setData(response.data)
    }
}else{
navigation.navigation('SelectLogin')
}
}
console.log(userData)
  // Extract the user data from the route params
  // const userData = route.params.userData;

  return (
    <View style={{height:'100%'}}>
      <Header
        title={'Profile'}
        // icon={require('../../../images/profile.png')}
        // count={0}
        onClickIcon={() => {
          navigation.navigate('Cart');
        }}
      />
      
    {userData?<>
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>RC:</Text>
        <Text style={styles.value}>{userData.rc}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Full Name:</Text>
        <Text style={styles.value}>
          {`${userData.firstname} ${userData.middlename} ${userData.lastname}`}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Father's Name:</Text>
        <Text style={styles.value}>
          {`${userData.fathersfirstname} ${userData.fathersmiddlename} ${userData.fatherslastname}`}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Mother's Name:</Text>
        <Text style={styles.value}>
          {`${userData.mothersfirstname} ${userData.mothersmiddlename} ${userData.motherslastname}`}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Marital Status:</Text>
        <Text style={styles.value}>{userData.marital}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Anniversary:</Text>
        <Text style={styles.value}>{userData.anniversary}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Spouse's Name:</Text>
        <Text style={styles.value}>
          {`${userData.spousefirstname} ${userData.spousemiddlename} ${userData.spouselastname}`}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Date of Birth:</Text>
        <Text style={styles.value}>{userData.dob}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Gender:</Text>
        <Text style={styles.value}>{userData.gender}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Village:</Text>
        <Text style={styles.value}>{userData.village}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Patti:</Text>
        <Text style={styles.value}>{userData.patti}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>PO:</Text>
        <Text style={styles.value}>{userData.po}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Block:</Text>
        <Text style={styles.value}>{userData.block}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Tehsil:</Text>
        <Text style={styles.value}>{userData.tehsil}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>District:</Text>
        <Text style={styles.value}>{userData.district}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Pincode:</Text>
        <Text style={styles.value}>{userData.pincode}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>State:</Text>
        <Text style={styles.value}>{userData.state}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Country:</Text>
        <Text style={styles.value}>{userData.country}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Occupation:</Text>
        <Text style={styles.value}>{userData.occupation}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Experience (years):</Text>
        <Text style={styles.value}>{userData.experience}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Currently Working:</Text>
        <Text style={styles.value}>{userData.work ? 'Yes' : 'No'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Qualification:</Text>
        <Text style={styles.value}>{userData.qualification}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Mobile:</Text>
        <Text style={styles.value}>{userData.mobile}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>WhatsApp:</Text>
        <Text style={styles.value}>{userData.whatsapp}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Telegram:</Text>
        <Text style={styles.value}>{userData.telegram}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{userData.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Account Name:</Text>
        <Text style={styles.value}>{userData.accname}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Bank Name:</Text>
        <Text style={styles.value}>{userData.bankname}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Account Number:</Text>
        <Text style={styles.value}>{userData.accno}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>IFSC:</Text>
        <Text style={styles.value}>{userData.ifsc}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Facebook:</Text>
        <Text style={styles.value}>{userData.facebook}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Instagram:</Text>
        <Text style={styles.value}>{userData.instagram}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Twitter:</Text>
        <Text style={styles.value}>{userData.twitter}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>LinkedIn:</Text>
        <Text style={styles.value}>{userData.linkden}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>PAN:</Text>
        <Text style={styles.value}>{userData.pan}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Aadhaar:</Text>
        <Text style={styles.value}>{userData.adhaar}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Membership:</Text>
        <Text style={styles.value}>{userData.membership}</Text>
      </View>
    </ScrollView></>:<Text style={[styles.label,{alignSelf:'center'}]}>Loading...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fafafa',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  value: {
    fontSize: 16,
  },
});

export default Profile;
