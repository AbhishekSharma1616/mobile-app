import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; // You can choose another icon library if you prefer
import Header from '../../common/Header';
import axios from 'axios';
import { baseUrl } from '../../../const';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Main = ({ navigation,setSelectedTab }) => {

  const [userData,setData]=useState(null)
  const [alldata,setAllData]=useState(null)
  const [paymentdate,setpaymentdate]=useState(null)
  useEffect(()=>{
    getData()
  },[])
  const getData=async ()=>{
    console.log("here")
    const response = await axios.get(`${baseUrl}/members/bytoken`,{
        headers: {
          'Authorization': `Bearer ${ await AsyncStorage.getItem('token')}`
        }});
console.log(response.data)
    if(response?.data?.membership){
       setData(response?.data?.membership)
       setAllData(response?.data)
       setpaymentdate(response?.data?.paymentdate)

    }
    else{
      setSelectedTab(3)
    }
}
  // Define colors based on membership type
  let circleColor = 'green'; // Default color
  let checkmarkColor = 'white'; // Default color

  

  return (
    <View style={styles.container}>
       <Header
        title={'Membership Status'}
        icon={require('../../../images/profile.png')}
        // count={0}
        onClickIcon={() => {
          setSelectedTab(4)
        }}
      />
      {userData==null?(
    <View style={{width:'100%',height:'100%'}}>
      <Image
        source={
         
             require('../../../images/failed.gif') 
           
        }
        style={{width:'100%',height:'50%'}}
      />
    <TouchableOpacity onPress={()=>setSelectedTab(3)}>
      <Text style={styles.label}>{'Buy Membership'}</Text></TouchableOpacity>
      </View>):(
    <View style={{width:'100%',height:'100%'}}>
      <Image
        source={
         
             require('../../../images/success.gif') 
           
        }
        style={{width:'100%',height:'50%'}}
      />
    
      <Text style={styles.label}>{userData}</Text>
      {alldata&&(userData!='Lifetime'&&alldata?.familumembership!='Lifetime')?<DateOneMonthAfter Data={alldata} isoDateString={paymentdate+""} amount={alldata?.monthly}/>:<></>}
      </View>)}
    </View>
  );
};

function DateOneMonthAfter({ Data,isoDateString,amount }) {
  console.log(isoDateString,"djbkjk")
  const [originalDate, setOriginalDate] = useState(new Date((isoDateString+"")));
  const [oneMonthLater, setOneMonthLater] = useState(null);
console.log(originalDate)
  useEffect(() => {
    const newDate = new Date(originalDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setOneMonthLater(newDate);
  }, []);

  return (
    <View style={{alignItems:'center',marginTop:20}}>
      <Text style={{fontSize:16,fontWeight:'bold'}}>Last Paid Date: {originalDate.toDateString()}</Text>
      {oneMonthLater && (<>
        <Text style={{fontSize:16,fontWeight:'bold'}}>Next Payable Date: {oneMonthLater.toDateString()}</Text>
        <Text style={{fontSize:16,fontWeight:'bold'}}>Amount: {amount}</Text>
        </>
      )}
    </View>
  );
}

// export default DateOneMonthAfter;
// In this functional component, we use the useState and useEffect hooks to manage the state of the original date and the date one month later. When the isoDateString prop changes, the useEffect updates the oneMonthLater state by adding one month to the originalDate. Finally, we display both the original date and the date one month later in the component's output.







const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor:'white'
  
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginTop: 20,
    fontSize: 30,
    alignSelf:'center',
    color:'black',
    fontWeight:'bold'
  },
});

export default Main;
