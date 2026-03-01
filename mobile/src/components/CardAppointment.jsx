import { View, Text, StyleSheet, Animated } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS, FONTS } from '../constants/theme'

const CardAppointment = ({item, index}) => {

  return (
    <View key={index} style={styles.cardAppointment}>
        <Text style={{fontWeight:"bold", fontSize:18, marginBottom: 10, fontFamily: FONTS.lufga, color: COLORS.primary}}>🏥 {item.hospital}</Text>
        <Text style={{fontSize: 16, color: "gray", fontFamily: FONTS.italic}}>👨‍⚕️ Dr. {item.doctor}</Text>
        <Text style={{fontSize: 16, color: "gray", fontFamily: FONTS.italic}}>🩺 {item.specialite}</Text>
        <Text style={{fontSize: 16, color: "gray", fontFamily: FONTS.italic}}>📝 {item.motif}</Text>
        <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:8}}>
        <Text style={{fontSize: 16, color: "gray", fontFamily: FONTS.italic}}>📅 {item.date}</Text>
        <Text style={{fontSize: 16, color: "gray", fontFamily: FONTS.italic}}>⏰ {item.heure}</Text>
        </View>
    </View>
  )
}

export default CardAppointment

const styles = StyleSheet.create({
     cardAppointment: {
      marginVertical: 15,
      paddingVertical: 20,
      paddingHorizontal: 15,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#a8a8a873",
      backgroundColor: "white",
      elevation: 5,
      gap: 5
    }
})