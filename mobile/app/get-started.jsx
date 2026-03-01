import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react'
import { router } from 'expo-router'
import {useFonts} from "expo-font"
import { COLORS, FONTS } from '../src/constants/theme'


const getStarted = () => {

     const [fontsLoaded] = useFonts({
    "Poppins": require("../assets/fonts/Poppins-Regular.ttf"),
    "LufgaBold": require("../assets/fonts/lufga/LufgaBold.ttf"),
    "LufgaBoldItalic": require("../assets/fonts/lufga/LufgaBoldItalic.ttf"),
  });

  if (!fontsLoaded) {
        return null; // ou <AppLoading />
    }
  return (
   <View style={styles.container}>
      <Image source={require("../assets/images/logo.png")} style={styles.logo}/>
      <Text style={styles.title}>Let's get started!</Text>
      <Text style={styles.txt}>Sign in to manage appointments & </Text>
      <Text style={styles.txt}>consult doctors anytime</Text>

      <TouchableOpacity
        onPress={() => router.push("/login")}
        style={styles.btn1}
      >
        <Text style={styles.txt1}>Log In</Text>
        <Ionicons name="chevron-forward" size={24} color="white" />
      </TouchableOpacity>

       <TouchableOpacity
        onPress={() => router.push("/register")}
        style={styles.btn2}
      >
        <Text style={styles.txt2}>Sign Up</Text>
        <Ionicons name="chevron-forward" size={24} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  )
}

export default getStarted

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 27,
    marginBottom: 10,
    fontFamily: FONTS.italic
  },

  txt: {
    color: "#777777",
    fontWeight: "semibold",
    fontFamily: FONTS.lufga,
    fontSize: 14
  },

  logo: {
    width: 250,
    height: 250
  },

  btn1 : {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: 150,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

   btn2 : {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: 150,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  txt1 : {
    // textAlign: "center",
    color: COLORS.white,
    fontWeight: "bold",
    fontFamily: FONTS.italic,
    fontSize: 15
  },

  txt2 : {
    // textAlign: "center",
    color: COLORS.primary,
    fontWeight: "bold",
    fontFamily: FONTS.italic,
    fontSize: 15
  }
});