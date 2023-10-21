import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Swiper from 'react-native-swiper';
import {Dimensions} from 'react-native';
import Header from '../../common/Header';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { baseUrl } from '../../../const';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageSlider } from '@pembajak/react-native-image-slider-banner';
const Wishlist = ({setSelectedTab}) => {
  const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const [userData,setData]=useState(null)
const [ismember,setisMemeber]=useState(false)
const [banners,setBanners]=useState([])
const [offers,setOffers]=useState([])
  
  useEffect(()=>{
    getBanners()
    getOffers()
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

    if(response?.data?.membership){
        console.log(response.data)
        setData(response.data)
        setisMemeber(true)
    }
   
}
}
const getBanners=async ()=>{
  console.log("here",`${baseUrl}/banners`)
  const response = await axios.get(`${baseUrl}/banners`);

  if(response?.data){
      console.log(response.data)
      setBanners(response.data.events)
  }
}
const getOffers=async ()=>{
  console.log("here",`${baseUrl}/offers`)
  const response = await axios.get(`${baseUrl}/offers`);

  if(response?.data){
      console.log(response.data)
      setOffers(response.data.events)
  }
}
const onClickIcon=async ()=>{
  const email = await AsyncStorage.getItem('token');
    if(email!==null){
      if(ismember){
       setSelectedTab(0)
      }
      else{
setSelectedTab(3)
      }
    }
    else{
navigation.navigate('UserLogin')
    }

}
  // Define your banners and offers data here
  // const banners = [
  //   { id: 1, imageUrl: 'https://img.freepik.com/premium-vector/special-offer-tag-collection-set-banner-elements-website-advertising_91128-790.jpg' },
  //   { id: 2, imageUrl: 'https://img.freepik.com/premium-vector/special-offer-tag-collection-set-banner-elements-website-advertising_91128-790.jpg' },
  //   // Add more banner objects as needed
  // ];
  const navigation=useNavigation()

  // const offers = [
  //   { id: 1, title: 'Offer 1', description: 'Description 1', imageUrl: 'https://img.freepik.com/premium-vector/special-offer-tag-collection-set-banner-elements-website-advertising_91128-790.jpg' },
  //   { id: 2, title: 'Offer 2', description: 'Description 2', imageUrl: 'https://img.freepik.com/premium-vector/special-offer-tag-collection-set-banner-elements-website-advertising_91128-790.jpg' },
  //   { id: 1, title: 'Offer 1', description: 'Description 1', imageUrl: 'https://img.freepik.com/premium-vector/special-offer-tag-collection-set-banner-elements-website-advertising_91128-790.jpg' },
  //   { id: 1, title: 'Offer 1', description: 'Description 1', imageUrl: 'https://img.freepik.com/premium-vector/special-offer-tag-collection-set-banner-elements-website-advertising_91128-790.jpg' },

  //   { id: 1, title: 'Offer 1', description: 'Description 1', imageUrl: 'https://img.freepik.com/premium-vector/special-offer-tag-collection-set-banner-elements-website-advertising_91128-790.jpg' },
  //   { id: 1, title: 'Offer 1', description: 'Description 1', imageUrl: 'https://img.freepik.com/premium-vector/special-offer-tag-collection-set-banner-elements-website-advertising_91128-790.jpg' },

  //   // Add more offer objects as needed
  // ];

  return (
    <View style={{height:'92%'}}>
      <Header
        title={'Demo'}
        // icon={require('../../../images/profile.png')}
        // count={0}
        onClickIcon={() => {
          navigation.navigate('Cart');
        }}
      />
    <View style={styles.container}>
      {/* Banners */}

      <ImageSlider 
      caroselImageContainerStyle={{height:200}}
    data={banners}
    autoPlay={false}
    showIndicator={false}
    onItemChanged={(item) => console.log("item", item)}
    closeIconColor="#fff"
/>
   
      {/* Offers */}
      <Text style={{textAlign:'center',verticalAlign:'top',marginVertical:20,fontSize:24,fontWeight:'bold'}}>Offers</Text>
   {  offers.length>0? <ScrollView style={styles.offerContainer}>
        {offers.map((offer) => (
          <TouchableOpacity
            key={offer.id}
            style={styles.offerItem}
            onPress={() => {
              // Navigate to offer details or purchase screen
              navigation.navigate('OfferDetails', { offer });
            }}
          >
            <Image source={{ uri: offer.img }} style={styles.offerImage} />
            <View>
              <Text style={styles.offerTitle}>{offer.name}</Text>
              <Text style={styles.offerDescription}>{offer.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>:<Text style={{textAlign:'center',verticalAlign:'top'}}></Text>
}
      {/* Floating Membership Purchase Button */}
      </View>
    
    <TouchableOpacity
        style={styles.floatingButton}
        onPress={onClickIcon}
      >
        <Text style={styles.buttonText}>{ismember?'View Membership': 'Purchase Membership'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    // backgroundColor:'red',
    height:200
   
  },
  bannerContainer: {
    height: 150,
    // backgroundColor:'red'
    // marginBottom: 16,
  },
  bannerImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginRight: 16,
  },
  offerContainer: {
    // marginTop:0,
    marginBottom: 16,
    flex:1
  },
  offerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
 },
  offerImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  offerDescription: {
    fontSize: 14,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    // right: 16,
    alignSelf:'center',
    backgroundColor: 'blue',
    padding: 16,
    borderRadius: 50,

  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  wrapper: {
    height:200,
    backgroundColor:'red',
    width:'100%' // Set the desired height of your banner
  },
  slideImage: {
    flex: 1,
    resizeMode: 'cover',
    height:200,
   
  },
});

export default Wishlist;
