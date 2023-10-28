import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
  Platform
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../common/Loader';
import {translation} from '../../utils';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { baseUrl } from '../../const';
import { Picker } from '@react-native-picker/picker';
import Header from '../common/Header';


const UserLogin = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLang, setSelectedLang] = useState(0);
  useEffect(() => {
    getLang();
    getData()
  }, []);
  const [userData,setData]=useState([])
  
  const getData=async ()=>{
    console.log("here")
    const response = await axios.get(`${baseUrl}/ocupation`);
console.log(response.data)
    if(response?.data?.events){
       setData(response?.data?.events)

    }
    else{
      setData("Buy Membership")
    }
}
  const [formData, setFormData] = useState({
    rc: '',
    firstname: '',
    middlename: '',
    lastname: '',
    fathersfirstname: '',
    fathersmiddlename: '',
    fatherslastname: '',
    mothersfirstname: '',
    mothersmiddlename: '',
    motherslastname: '',
    marital: '',
    anniversary: '',
    spousefirstname: '',
    spousemiddlename: '',
    spouselastname: '',
    dob: new Date().toISOString().split('T')[0],
    gender: '',
    village: '',
    patti: '',
    po: '',
    block: '',
    tehsil: '',
    district: '',
    pincode: '',
    state: '',
    country: '',
    occupation: '',
    experience: '',
    work: '',
    qualification: '',
    mobile: '',
    whatsapp: '',
    telegram: '',
    email: '',
    accname: '',
    bankname: '',
    accno: '',
    ifsc: '',
    facebook: '',
    instagram: '',
    twitter: '',
    linkden: '',
    pan: '',
    adhaar: '',
  });
  const isFormValid = () => {
    // Define an array of required field names
    const requiredFields = [
    
      "firstname",
      
      "lastname",
      "fathersfirstname",
     
      "fatherslastname",
      "mothersfirstname",
     
      "motherslastname",
      "marital",
      "anniversary",
      "spousefirstname",
      "spouselastname",
      "dob",
      "gender",
      "village",
      "patti",
      "po",
      "block",
      "tehsil",
      "district",
      "pincode",
      "state",
      "country",
      "occupation",
      "experience",
      "work",
      "qualification",
      "mobile",
      "whatsapp",
      "telegram",
      "email",
      "accname",
      "bankname",
      "accno",
      "ifsc",
      "facebook",
      "instagram",
      "twitter",
      "linkden",
      "pan",
      "adhaar",
      // Add other required fields here
    ];
  
    // Check if all required fields are filled
    return requiredFields.every(fieldName => !!formData[fieldName]);
  };
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDateField, setSelectedDateField] = useState('');

  const showDatePicker = (fieldName) => {
    setSelectedDateField(fieldName);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateChange = (event, date) => {
    if (date !== undefined) {
      hideDatePicker();
      setFormData({ ...formData, [selectedDateField]: date.toISOString() });
    } else {
      hideDatePicker();
    }
  };
  const handleInputChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSwitchChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };
  const getLang = async () => {
    console.log(await AsyncStorage.getItem('LANG'));
    setSelectedLang(parseInt(await AsyncStorage.getItem('LANG')));
  };
  const adminLogin = async () => {
   try{
    const headers = {
      "Content-Type": "application/json",
    };
      console.log(formData,`${baseUrl}/members`)
      const response = await axios.post(`${baseUrl}/members`, {
        ...formData
      },{ headers });
      console.log(response.data)
      navigation.navigate('Home',{ data: 3 });
    }
    catch(err){
      console.log(err)
    }
  };

  const goToNextScreen = async (userId, mobile, name) => {
    await AsyncStorage.setItem('EMAIL', email);
    await AsyncStorage.setItem('USERID', userId);
    await AsyncStorage.setItem('MOBILE', mobile);
    await AsyncStorage.setItem('NAME', name);
    navigation.navigate('Home');
  };
  return (
   
  //   <View style={styles.container}>
  //     <Text style={styles.title}>
  //       {selectedLang == 0
  //         ? translation[1].English
  //         : selectedLang == 1
  //         ? translation[1].Tamil
  //         : selectedLang == 2
  //         ? translation[1].Hindi
  //         : selectedLang == 3
  //         ? translation[1].Punjabi
  //         : selectedLang == 4
  //         ? translation[1].Urdu
  //         : null}
  //     </Text>
  //     <TextInput
  //       style={styles.inputStyle}
  //       placeholder={'Enter Email Id'}
  //       value={email}
  //       onChangeText={txt => setEmail(txt)}
  //     />
  //     <View style={{display:'flex',flexDirection:"row",alignSelf:'center',width:'90%',justifyContent:'space-between'}}>
  //     <TextInput
  //       style={[styles.inputStyle,{width:'40%'}]}
  //       placeholder={'First Name'}
  //       value={email}
  //       onChangeText={txt => setEmail(txt)}
  //     />
  //     <TextInput
  //       style={[styles.inputStyle,{width:'40%'}]}
  //       placeholder={'First Name'}
  //       value={email}
  //       onChangeText={txt => setEmail(txt)}
  //     />
  //     </View>
  //     <TextInput
  //       style={styles.inputStyle}
  //       placeholder={'Enter Password '}
  //       value={password}
  //       onChangeText={txt => setPassword(txt)}
  //     />
  //     <TouchableOpacity
  //       style={styles.loginBtn}
  //       onPress={() => {
  //         if (email !== '' && password !== '') {
  //           adminLogin();
  //         } else {
  //           alert('Please Enter Data');
  //         }
  //       }}>
  //       <Text style={styles.btnText}>Login</Text>
  //     </TouchableOpacity>
  //     <Text
  //       style={styles.createNewAccount}
  //       onPress={() => {
  //         navigation.navigate('UserSignup');
  //       }}>
  //       Create New Account
  //     </Text>
  //     <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
  //   </View>
  <View style={{height:'100%', backgroundColor: '#fff'}}>
    <Header
        title={'Registration Page'}
        // icon={require('../../../images/profile.png')}
        // count={0}
        onClickIcon={() => {
          navigation.navigate('Cart');
        }}
      />
  <ScrollView  style={styles.main}>
      <View style={styles.section}>
        <Text style={styles.label}>Personal Information</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#000"
          placeholder="Referral Code"
          value={formData.rc}
          onChangeText={text => handleInputChange('rc', text)}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#000"
          placeholder="First Name"
          value={formData.firstname}
          onChangeText={text => handleInputChange('firstname', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Middle Name"
          placeholderTextColor="#000"
          value={formData.middlename}
          onChangeText={text => handleInputChange('middlename', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="#000"
          value={formData.lastname}
          onChangeText={text => handleInputChange('lastname', text)}
        />
        {/* Add more input fields for personal information */}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Parents Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Father's First Name"
          placeholderTextColor="#000"
          value={formData.fathersfirstname}
          onChangeText={text => handleInputChange('fathersfirstname', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Father's Middle Name"
          placeholderTextColor="#000"
          value={formData.fathersmiddlename}
          onChangeText={text => handleInputChange('fathersmiddlename', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Father's Last Name"
          placeholderTextColor="#000"
          value={formData.fatherslastname}
          onChangeText={text => handleInputChange('fatherslastname', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Mother's First Name"
          placeholderTextColor="#000"
          value={formData.mothersfirstname}
          onChangeText={text => handleInputChange('mothersfirstname', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Mother's Middle Name"
          placeholderTextColor="#000"
          value={formData.mothersmiddlename}
          onChangeText={text => handleInputChange('mothersmiddlename', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Mother's Last Name"
          placeholderTextColor="#000"
          value={formData.motherslastname}
          onChangeText={text => handleInputChange('motherslastname', text)}
        />
        {/* Add more input fields for parent's information */}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Marital Status</Text>
        {/* <TextInput
          style={styles.input}
          placeholder="Marital Status"
          value={formData.marital}
          onChangeText={text => handleInputChange('marital', text)}
        /> */}
         <Picker
         style={{borderColor:'red'}}
            selectedValue={formData.marital}
            onValueChange={(itemValue) => handleInputChange('marital', itemValue)}>
            <Picker.Item label="Married" value="Married" />
            <Picker.Item label="Single" value="Single" />
          </Picker>
        <Text style={styles.label}>Anniversary</Text>
        <TextInput
          style={styles.input}
          placeholder="Anniversary"
          placeholderTextColor="#000"
          value={formData.anniversary}
          onChangeText={text => handleInputChange('anniversary', text)}
        />
        {/* Add more input fields for marital status */}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Spouse Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Spouse's First Name"
          placeholderTextColor="#000"
          value={formData.spousefirstname}
          onChangeText={text => handleInputChange('spousefirstname', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Spouse's Middle Name"
          placeholderTextColor="#000"
          value={formData.spousemiddlename}
          onChangeText={text => handleInputChange('spousemiddlename', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Spouse's Last Name"
          placeholderTextColor="#000"
          value={formData.spouselastname}
          onChangeText={text => handleInputChange('spouselastname', text)}
        />
        {/* Add more input fields for spouse information */}
      </View>

      <View style={styles.section}>
      
      <Text style={styles.label}>Date of Birth</Text>
      <TextInput
          style={styles.input}
          placeholder="Anniversary"
          placeholderTextColor="#000"
          value={formData.anniversary}
          onChangeText={text => handleInputChange('anniversary', text)}
        />
  
        <Text style={styles.label}>Gender</Text>
        <Picker
         style={{borderColor:'red'}}
            selectedValue={formData.gender}
            onValueChange={(itemValue) => handleInputChange('marital', itemValue)}>
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
        {/* Add more input fields for date of birth and gender */}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Village"
          placeholderTextColor="#000"
          value={formData.village}
          onChangeText={text => handleInputChange('village', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Patti"
          placeholderTextColor="#000"
          value={formData.patti}
          onChangeText={text => handleInputChange('patti', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="PO"
          placeholderTextColor="#000"
          value={formData.po}
          onChangeText={text => handleInputChange('po', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Block"
          placeholderTextColor="#000"
          value={formData.block}
          onChangeText={text => handleInputChange('block', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Tehsil"
          placeholderTextColor="#000"
          value={formData.tehsil}
          onChangeText={text => handleInputChange('tehsil', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="District"
          placeholderTextColor="#000"
          value={formData.district}
          onChangeText={text => handleInputChange('district', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Pincode"
          placeholderTextColor="#000"
          value={formData.pincode}
          onChangeText={text => handleInputChange('pincode', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="State"
          placeholderTextColor="#000"
          value={formData.state}
          onChangeText={text => handleInputChange('state', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Country"
          placeholderTextColor="#000"
          value={formData.country}
          onChangeText={text => handleInputChange('country', text)}
        />
        {/* Add more input fields for address */}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Employment Information</Text>
        <Picker
         style={{borderColor:'red'}}
            selectedValue={formData.occupation}
            onValueChange={(itemValue) => handleInputChange('marital', itemValue)}>
             {userData.map((item)=>(
            <Picker.Item label={item.name} value={item.name} />

             ))}
           
          </Picker>
       
        <TextInput
          style={styles.input}
          placeholder="Experience (years)"
          placeholderTextColor="#000"
          value={formData.experience}
          onChangeText={text => handleInputChange('experience', text)}
        />
         <View style={{display:'flex',flexDirection:'row',width:'90%',justifyContent:'space-between'}}>
        <Text style={styles.label}>Working with us:</Text>
        
        <Switch
          value={formData.work}
          onValueChange={value => handleSwitchChange('work', value)}
        /></View>
        <TextInput
          style={styles.input}
          placeholder="Qualification"
          placeholderTextColor="#000"
          value={formData.qualification}
          onChangeText={text => handleInputChange('qualification', text)}
        />
        {/* Add more input fields for employment information */}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Contact Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Mobile"
          placeholderTextColor="#000"
          value={formData.mobile}
          onChangeText={text => handleInputChange('mobile', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="WhatsApp"
          placeholderTextColor="#000"
          value={formData.whatsapp}
          onChangeText={text => handleInputChange('whatsapp', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Telegram"
          placeholderTextColor="#000"
          value={formData.telegram}
          onChangeText={text => handleInputChange('telegram', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#000"
          value={formData.email}
          onChangeText={text => handleInputChange('email', text)}
        />
        {/* Add more input fields for contact information */}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Bank Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Account Name"
          placeholderTextColor="#000"
          value={formData.accname}
          onChangeText={text => handleInputChange('accname', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Bank Name"
          placeholderTextColor="#000"
          value={formData.bankname}
          onChangeText={text => handleInputChange('bankname', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Account Number"
          placeholderTextColor="#000"
          value={formData.accno}
          onChangeText={text => handleInputChange('accno', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="IFSC"
          placeholderTextColor="#000"
          value={formData.ifsc}
          onChangeText={text => handleInputChange('ifsc', text)}
        />
        {/* Add more input fields for bank information */}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Social Media</Text>
        <TextInput
          style={styles.input}
          placeholder="Facebook"
          placeholderTextColor="#000"
          value={formData.facebook}
          onChangeText={text => handleInputChange('facebook', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Instagram"
          placeholderTextColor="#000"
          value={formData.instagram}
          onChangeText={text => handleInputChange('instagram', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Twitter"
          placeholderTextColor="#000"
          value={formData.twitter}
          onChangeText={text => handleInputChange('twitter', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="LinkedIn"
          placeholderTextColor="#000"
          value={formData.linkden}
          onChangeText={text => handleInputChange('linkden', text)}
        />
        {/* Add more input fields for social media */}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Identification</Text>
        <TextInput
          style={styles.input}
          placeholder="PAN"
          placeholderTextColor="#000"
          value={formData.pan}
          onChangeText={text => handleInputChange('pan', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Aadhaar"
          placeholderTextColor="#000"
          value={formData.adhaar}
          onChangeText={text => handleInputChange('adhaar', text)}
        />
        {/* Add more input fields for identification */}
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          if (isFormValid()) {
            adminLogin();
          } else {
            alert('Please Enter Data');
          }
        }}>
        <Text style={{color: '#fff', fontWeight: '600'}}>Register</Text>
      </TouchableOpacity>
    </ScrollView>
    </View>
  );
};

export default UserLogin;
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
    color: '#182539',
  },
  input: {
    paddingLeft: 20,
    height: 50,
    alignSelf: 'center',
    marginTop: 13,
    borderWidth: 0.5,
    width: '100%',
    backgroundColor: '#eeeeee',
    borderWidth: 0,
    borderRadius: 20,
    color: '#000'
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
        color: '#fff'
      },
});
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: '800',
//     color: '#000',
//     marginTop: 100,
//     alignSelf: 'center',
//   },
//   inputStyle: {
//     paddingLeft: 20,
//     height: 50,
//     alignSelf: 'center',
//     marginTop: 30,
//     borderWidth: 0.5,
//     borderRadius: 10,
//     width: '90%',
//   },
//   loginBtn: {
//     backgroundColor: 'orange',
//     width: '90%',
//     height: 50,
//     alignSelf: 'center',
//     borderRadius: 10,
//     marginTop: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   btnText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#000',
//   },
//   createNewAccount: {
//     fontSize: 18,
//     fontWeight: '600',
//     textDecorationLine: 'underline',
//     marginTop: 50,
//     alignSelf: 'center',
//   },
// });
