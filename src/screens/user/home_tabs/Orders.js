import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import Picker from the new package
import RazorpayCheckout from 'react-native-razorpay';
import Header from '../../common/Header';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import { baseUrl } from '../../../const';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MembershipScreen({setSelectedTab}) {
  const [membershipType, setMembershipType] = useState('Temporary');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [familyMembers, setFamilyMembers] = useState([]);
  const [familyMembershipType, setFamilyMembershipType] = useState('Temporary');

  const addFamilyMember = () => {
    setFamilyMembers([
      ...familyMembers,
      { name: '', relation: '', registrationFee: 1000, amount: 0 },
    ]);
  };

  const calculateTotal = () => {
    if(membershipType=='Family'){
    
      let totalAmount = 0;
      let monthly=100
      totalAmount=familyMembershipType === 'Temporary'?1100:25000
      for (const member of familyMembers) {
        totalAmount +=
          member.registrationFee +
          (familyMembershipType === 'Temporary'
            ? 100
            : 24000);
            monthly+=100;
      }
      const gst = (totalAmount * 0.18).toFixed(2); // 18% GST
      const totalPayable = (totalAmount + parseFloat(gst)).toFixed(2);
     monthly= familyMembershipType=='Lifetime'?0:monthly
      return { totalAmount, gst, totalPayable,monthly };
    }
    else if(membershipType=='Temporary'){
      let totalAmount = 1000+100;
      let monthly=100;
      const gst = (totalAmount * 0.18).toFixed(2); // 18% GST
      const totalPayable = (totalAmount + parseFloat(gst)).toFixed(2);
      return { totalAmount, gst, totalPayable,monthly };}
      else if(membershipType=='Lifetime'){
        let totalAmount = 1000+24000 ;
        let monthly=0
        
        const gst = (totalAmount * 0.18).toFixed(2); // 18% GST
        const totalPayable = (totalAmount + parseFloat(gst)).toFixed(2);
        return { totalAmount, gst, totalPayable, monthly};}
  };
  



  const pay = () => {
   
      console.log("cndjcknl")
      const email = "kushgra@gmail.com";
      const name = "kushagra";
      const mobile = "9871234444";
      var options = {
        description: 'Credits towards consultation',
        image: require('../../../images/logo.png'),
        currency: 'INR',
        key: 'rzp_test_2VYHup8J177yIx',
        amount:  calculateTotal().totalPayable,
        name: 'Food App',
        order_id: 'cjhhj', //Replace this with an order_id created using Orders API.
        prefill: {
          email: "kushagra.devgon@gmail.com",
          contact: 9811674773,
          name: "kushagra",
        },
        theme: {color: '#EC9912'},
      };
      RazorpayCheckout.open(options)
        .then(async data => {
          // handle success
          const date= new Date();
         console.log(data)
         try{
          const headers = {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${ await AsyncStorage.getItem('token')}`
          };
          const resp = await axios.post(`${baseUrl}/transaction}`, {
            "purpose":'Membership buy',
            "amount":calculateTotal().totalAmount,
            "userid":await AsyncStorage.getItem('id'),
            "status":'success',
            "paymentdate":date.toISOString()

            
          },{ headers });
            // console.log(formData,`${baseUrl}/members`)
            const response = await axios.patch(`${baseUrl}/members/${await AsyncStorage.getItem('id')}`, {
              "membership":membershipType,
              "amount":calculateTotal().totalAmount,
              "gst":calculateTotal().gst,
              "payment":calculateTotal().totalPayable,
              "familumembership":familyMembershipType,
              "members":familyMembers,
              "monthly":calculateTotal().monthly,
              "payment":"success",
              "membershipdate": date.toISOString(),
              "paymentdate":date.toISOString()

              
            },{ headers });
            console.log(response.data, {
              "membership":membershipType,
              "amount":calculateTotal().totalAmount,
              "gst":calculateTotal().gst,
              "payment":calculateTotal().totalPayable,
              "familumembership":familyMembershipType,
              "members":familyMembers,
              "monthly":calculateTotal().monthly,
              "payment":"success",
              "membershipdate": date.toISOString(),
              "paymentdate":date.toISOString()

              
            })
            setSelectedTab(0)
          }
          catch(err){
            console.log(err)
          }
          // navigation.navigate('OrderStatus', {
          //   status: 'success',
          //   paymentId: data.razorpay_payment_id,
          //   cartList: cartList,
          //   total: getTotal(),
          //   address: selectedAddress,
          //   userId: userId,
          //   userName: name,
          //   userEmail: email,
          //   userMobile: mobile,
          // });
        })
        .catch(async error => {
          // handle failure
          const date= new Date();
         console.log(error)
         try{
          const headers = {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${ await AsyncStorage.getItem('token')}`
          };
          const resp = await axios.post(`${baseUrl}/transaction}`, {
            "purpose":'Membership buy',
            "amount":calculateTotal().totalAmount,
            "userid":await AsyncStorage.getItem('id'),
            "status":'failure',
            "paymentdate":date.toISOString()

            
          },{ headers });
            // console.log(formData,`${baseUrl}/members`)
            const response = await axios.patch(`${baseUrl}/members/${await AsyncStorage.getItem('id')}`, {
              "membership":membershipType,
              "amount":calculateTotal().totalAmount,
              "gst":calculateTotal().gst,
              "payment":calculateTotal().totalPayable,
              "familumembership":familyMembershipType,
              "members":familyMembers,
              "monthly":calculateTotal().monthly,
              "payment":"failed",
              "membershipdate": date.toISOString(),
              "paymentdate":date.toISOString()
              
            },{ headers });
            console.log(response.data)
            setSelectedTab(0)
          }
          catch(err){
            console.log(err)
          }
          // navigation.navigate('OrderStatus', {
          //   status: 'failed',
          // });
        });
    
    // Logic to initiate payment through Razorpay
    // You can use a library or API for payment integration
    // Example: RazorpayPayment.pay({ amount: totalPayable });
  };

  return (
    <View>
      <Header
        title={'Membership Purchase'}
        // icon={require('../../../images/profile.png')}
        // count={0}
        onClickIcon={() => {
          navigation.navigate('Cart');
        }}
      />
      <ScrollView style={{width:'90%',alignSelf:'center',height:'80%',marginVertical:10}}>
      <Text style={{fontSize:20,color:'black',fontWeight:'bold',margin:10}}>Select Membership Type:</Text>
      <Picker
      style={{borderColor:"black",borderWidth:20,fontSize:20,fontWeight:'bold'}}
        selectedValue={membershipType}
        onValueChange={(itemValue) => setMembershipType(itemValue)}>
        <Picker.Item label="Temporary Membership" value="Temporary" />
        <Picker.Item label="Lifetime Membership" value="Lifetime" />
        <Picker.Item label="Family Membership" value="Family" />
      </Picker>

      

{membershipType === 'Family' && (
        <View>
          <Text style={{fontSize:20,color:'black',fontWeight:'bold',margin:10}}>Marital Status:</Text>
          <Picker
            selectedValue={maritalStatus}
            onValueChange={(itemValue) => setMaritalStatus(itemValue)}>
            <Picker.Item label="Married" value="Married" />
            <Picker.Item label="Single" value="Single" />
          </Picker>
          <Text style={{fontSize:20,color:'black',fontWeight:'bold',margin:10}}>Select Family Membership Type:</Text>
          <Picker
            selectedValue={familyMembershipType}
            onValueChange={(itemValue) => setFamilyMembershipType(itemValue)}>
            <Picker.Item label="Temporary Membership" value="Temporary" />
            <Picker.Item label="Lifetime Membership" value="Lifetime" />
          </Picker>

          <Text style={{fontSize:20,color:'black',fontWeight:'bold',margin:10}}>Family Members:</Text>
          {familyMembers.map((member, index) => (
            <View key={index}>
              <TextInput
              style={{margin:10, borderWidth: 1, // Add a border with a width of 1
              borderColor: 'gray', // Set the border color to gray
              padding: 5}}
                value={member.name}
                onChangeText={(text) => {
                  const updatedMembers = [...familyMembers];
                  updatedMembers[index].name = text;
                  setFamilyMembers(updatedMembers);
                }}
                placeholder={`Full Name of Member ${index + 1}`}
              />
              <Picker
                selectedValue={member.relation}
                onValueChange={(itemValue) => {
                  const updatedMembers = [...familyMembers];
                  updatedMembers[index].relation = itemValue;
                  setFamilyMembers(updatedMembers);
                }}>
                <Picker.Item label="Brother" value="Brother" />
                <Picker.Item label="Sister" value="Sister" />
                {/* Add other relation options */}
              </Picker>
            </View>
          ))}
         <TouchableOpacity
        style={{
          backgroundColor: 'orange',
          width: '90%',
          height: 40,
          alignSelf: 'center',
          borderRadius: 10,
          margin: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={addFamilyMember}>
        
        <Text style={{fontSize:15,fontWeight:'bold',color:'black'}}>Add Family Member</Text></TouchableOpacity>
          </View>
        
      )}

<TouchableOpacity
        style={{
          backgroundColor: 'orange',
          width: '90%',
          height: 40,
          alignSelf: 'center',
          borderRadius: 10,
          margin: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={calculateTotal}>
        
        <Text style={{fontSize:15,fontWeight:'bold',color:'black'}}>Calculate Total</Text></TouchableOpacity>
        <View style={{
          // backgroundColor: 'orange',
          width: '90%',
          height: 40,
          alignSelf: 'center',
          borderRadius: 10,
          margin: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
      <Text style={{fontSize:20,fontWeight:'bold',color:'black'}}>Total Amount: {calculateTotal().totalAmount}</Text>
      <Text style={{fontSize:20,fontWeight:'bold',color:'black'}}>GST: {calculateTotal().gst}</Text>
      <Text style={{fontSize:20,fontWeight:'bold',color:'black'}}>Total Payable: {calculateTotal().totalPayable}</Text>
      <Text style={{fontSize:20,fontWeight:'bold',color:'black'}}>Monthly: {calculateTotal().monthly}</Text>

      </View>
      <TouchableOpacity
        style={{
          backgroundColor: 'orange',
          width: '90%',
          height: 40,
          alignSelf: 'center',
          borderRadius: 10,
          margin: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={pay}>
        <Text style={{fontSize:15,fontWeight:'bold',color:'black'}}>Pay</Text></TouchableOpacity>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  main:{
    margin: 20,
  },
  section: {
    margin: 10,
    width:'90%',
    alignSelf:'center',
   
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
  },
  input: {
    paddingLeft: 20,
        height: 50,
        alignSelf: 'center',
        marginTop: 10,
        borderWidth: 0.5,
        borderRadius: 10,
        width: '90%',
  },
  loginBtn: {
        backgroundColor: 'orange',
        width: '90%',
        height: 50,
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
      },
});