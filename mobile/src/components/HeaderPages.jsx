import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo'
import { COLORS, FONTS } from '../constants/theme'
import { router } from 'expo-router'

const HeaderPages = ({text}) => {
  return (
   <View style={styles.headerPages}>
        <TouchableOpacity style={styles.btnReturn} onPress={() => router.push("/home")}>
          <Entypo name="chevron-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>{text}</Text>
    </View>
  )
}

export default HeaderPages


const styles = StyleSheet.create({
    headerPages : {
      flexDirection: "row",
      paddingVertical: 15,
      paddingHorizontal: 15,
      alignItems: "center"
    },

    btnReturn: {
      backgroundColor: COLORS.primary,
      paddingVertical: 8,
      paddingHorizontal: 10,
      borderRadius: 10
    },

    headerTxt: {
      fontFamily: FONTS.lufga,
      fontSize: 18,
      width: "80%",
      textAlign: "center"
    }
})