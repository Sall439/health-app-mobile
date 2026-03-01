import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderPages from '../../src/components/HeaderPages'
import AntDesign from '@expo/vector-icons/AntDesign'
import { FONTS,COLORS } from '../../src/constants/theme'


const {width, height} = Dimensions.get("window")

export default function doctor(){

  
  const doctors = [
    {id: 1, name: "Dr John", image: require("../../assets/images/doc.jpg"), spec: "Ophtalmologue"},
    {id: 2, name: "Dr Sarah", image: require("../../assets/images/doc1.jpg"), spec: "Cardiologue"},
    {id: 3, name: "Dr Mike", image: require("../../assets/images/doc2.jpg"), spec: "Gynecologue"},
    {id: 4, name: "Dr Saliou", image: require("../../assets/images/doc3.jpg"), spec: "Gynecologue"},
    {id: 5, name: "Dr Sokhna Maram", image: require("../../assets/images/doc4.jpg"), spec: "Gynecologue"},
    {id: 6, name: "Dr Khadija", image: require("../../assets/images/doc5.jpg"), spec: "Gynecologue"},
  ]

  return (
    <SafeAreaView style={{marginBottom: 120}}>
      <HeaderPages text={"Doctors"}/>

       <View>
             <FlatList data={doctors} key={item => item.id.toString()}  renderItem={({item}) => (
              <View  style={{
                  width: width * 0.9,
                  height: height * 0.55,
                  margin: 20,
                  backgroundColor: "#fff",
                  borderRadius: 16,
                  padding: 10,
                  elevation: 3,
                }}>
                <Image source={item.image} style={{
                  width: "100%",
                  height: height * 0.4,
                  borderRadius: 12,
                }}/>
               <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center",marginTop: height * 0.02,}}>
                   <Text style={{ fontWeight: "bold" , fontSize: 18, letterSpacing: 1.6}}>{item.name}</Text>
                   <Text style={{justifyContent: "space-between", alignItems: "center"}}>
                      <AntDesign name="star" size={16} color="orange" />
                     <Text>4.2</Text>
                   </Text>
                </View>
                <Text style={{fontFamily: FONTS.italic, fontWeight: "100", color: COLORS.primary, marginTop: 10}}>{item.spec}</Text>
              </View>
             )}/>
          </View>
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({})