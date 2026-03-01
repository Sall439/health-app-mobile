import { View, Text, StyleSheet, TextInput, Image } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'
import Ionicons from '@expo/vector-icons/Ionicons'
import { COLORS, FONTS } from '../constants/theme'
import { useAuthStore } from '../store/auth.store'

export default function Header(){
    const user = useAuthStore((state) => state.user)
  return (
    <View style={styles.top}>
           <View style={styles.headerTop}>
                <View style={styles.profile}>
                   <Image source={require("../../assets/images/370+ avatars and users library ÔÇô Untitled UI/JPEG/Alec Whitten.jpg")} style={styles.img}/>
                    <View>
                        <Text style={styles.txt}>Hello, Welcome!</Text>
                        <Text style={styles.title}>{user?.name}</Text>
                    </View>
                  </View>
    
                  <View style={styles.search}>
                    <AntDesign name="bell" size={30} color={COLORS.white}/>
                  </View>
           </View>
    
           <View style={styles.input}>
              <TextInput placeholder="Search Doctors" />
              <Ionicons name="search-outline" size={24} color={COLORS.primary}/>
           </View>
        </View>
  )
}





const styles = StyleSheet.create({
  profile: {
      flexDirection: "row",
      paddingVertical: 10,
      gap: 10,
      alignItems: "center"
  },

  top:{
    paddingVertical: 40,
    paddingHorizontal: 15,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
  },

  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
     width: "100%"
  },

    img: {
      height: 50,
      width: 50,
      borderRadius: 30
    },

    txt:{
        color: "#fff",
        fontFamily: FONTS.poppins
    },
    title: {
      fontFamily: FONTS.lufga,
      fontSize: 20,
      color: "#fff",
      letterSpacing: 1.8
    },

    search: {
      backgroundColor: "#b6b3b380",
      paddingVertical: 3,
      paddingHorizontal: 6,
      borderRadius: 10
    },

    input: {
      backgroundColor: COLORS.white,
      width: "100%",
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 5,
      marginTop: 10
    }
})