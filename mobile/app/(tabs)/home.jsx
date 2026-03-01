import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, ScrollView, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "../../src/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Header from "../../src/components/Header";
import { router } from "expo-router";
import { Dimensions } from "react-native";
import { useEffect, useRef } from "react";
import { useAuthStore } from "../../src/store/auth.store";


const { width, height } = Dimensions.get("window");

export default function Home() {

  const fadeAnim = useRef(new Animated.Value(0)).current
  const translateY = useRef(new Animated.Value(30)).current
  const scrollY = useRef(new Animated.Value(0)).current

  // Creer interpolation
  const headerOpacity = scrollY.interpolate({
  inputRange: [0, 80],
  outputRange: [1, 0.7],
  extrapolate: "clamp",
});

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
      })
    ]).start()
  }, [])

  const doctors = [
    {id: 1, name: "Dr John", image: require("../../assets/images/doc.jpg"), spec: "Ophtalmologue"},
    {id: 2, name: "Dr Sarah", image: require("../../assets/images/doc1.jpg"), spec: "Cardiologue"},
    {id: 3, name: "Dr Mike", image: require("../../assets/images/doc2.jpg"), spec: "Gynecologue"},
    {id: 4, name: "Dr Saliou", image: require("../../assets/images/doc3.jpg"), spec: "Gynecologue"},
    {id: 5, name: "Dr Sokhna Maram", image: require("../../assets/images/doc4.jpg"), spec: "Gynecologue"},
    {id: 6, name: "Dr Khadija", image: require("../../assets/images/doc5.jpg"), spec: "Gynecologue"},
  ]

  return (
    <>
      <Animated.View style={{ opacity: headerOpacity }}>
        <Header />
      </Animated.View>

      <Animated.ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingBottom: height * 0.05 }} style={{opacity: fadeAnim, transform: [{translateY}]}} onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}],{useNativeDriver: true})} scrollEventThrottle={16}>
          <View style={styles.indicContainer}>
              <TouchableOpacity style={styles.indic} onPress={() => router.push("/doctor")}>
                  <FontAwesome name="stethoscope" size={width * 0.06} color={COLORS.primary} style={styles.imgINdic} />
                  <Text>Doctor</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.indic} onPress={() => router.push("/appointment")}>
                  <Ionicons name="calendar-outline" size={width * 0.06} color={COLORS.primary} style={styles.imgINdic}  />
                  <Text>Rendez-Vous</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.indic} onPress={() => router.push("/Hospital")}>
                  <FontAwesome name="hospital-o" size={width * 0.06} color={COLORS.primary} style={styles.imgINdic}  />
                  <Text>Hospital</Text>
              </TouchableOpacity>
          </View>


      <View style={styles.about}>
        <View style={styles.pro}>
          <Text style={styles.proTxt}>Ending soon</Text>
        </View>
        <Text style={styles.title}>Trusted care for you & your loved ones</Text>
        <TouchableOpacity style={styles.btn} onPress={() => router.push("/appointment")}>
            <Text style={styles.txt}>Get Care Now</Text>
            <Ionicons name="chevron-forward" size={width * 0.05} color="white" />
        </TouchableOpacity>
      </View>

      <View>
          <View style={{marginVertical: height * 0.04, marginHorizontal: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
              <Text style={{fontFamily: FONTS.lufga, letterSpacing: 1.4, fontSize: 18}}>Top Doctors</Text>
              <TouchableOpacity style={{backgroundColor: "#b1c6f1e8", paddingVertical: 3, paddingHorizontal: 8, borderRadius: 8}} onPress={() => router.push("/doctor")}>
                  <Text>See All</Text>
              </TouchableOpacity>
          </View>
          <View>
             <FlatList data={doctors} horizontal showsHorizontalScrollIndicator={false} key={item => item.id.toString()} snapToAlignment="start" snapToInterval={width * 0.45} decelerationRate="fast" renderItem={({item}) => (
              <View  style={{
                  width: width * 0.5,
                  height: height * 0.3,
                  marginLeft: 20,
                  backgroundColor: "#fff",
                  borderRadius: 16,
                  padding: 10,
                  elevation: 3,
                }}>
                <Image source={item.image} style={{
                  width: "100%",
                  height: height * 0.2,
                  borderRadius: 12,
                }}/>
               <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center",marginTop: height * 0.02,}}>
                   <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                   <Text style={{justifyContent: "space-between", alignItems: "center"}}>
                      <AntDesign name="star" size={16} color="orange" />
                     <Text>4.2</Text>
                   </Text>
                </View>
                <Text style={{fontFamily: FONTS.poppins, fontWeight: "100"}}>{item.spec}</Text>
              </View>
             )}/>
          </View>
      </View>

      </Animated.ScrollView>
    </>
  );
}


const styles = StyleSheet.create({
  indicContainer: {
      flexDirection: "row",
      // paddingHorizontal: width * 0.05,
      marginTop: height * 0.02
  },

  indic: {
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
      width: width * 0.34
  },

  imgINdic: {
    backgroundColor: "#d3cbcb07",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 15,
    width: "50%",
    textAlign: "center"
  },

  about: {
    marginTop: height * 0.02,
    backgroundColor : "#b2c8f7ad",
    marginHorizontal: width * 0.05,
    padding:  width * 0.05,
    minHeight: 150,
    borderRadius: 10
  },

  pro: {
    marginVertical: 5,
    backgroundColor: "white",
    width:  width * 0.25,
    borderRadius: 10,
    paddingVertical: 4
  },

  proTxt: {
    textAlign: "center",
    color: COLORS.primary
  },

  title:{
    fontFamily: FONTS.lufga,
    fontSize:  width * 0.055,
    marginVertical: height * 0.015
  },

  btn: {
    backgroundColor: COLORS.primary,
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: height * 0.015,
    paddingHorizontal: 10,
    borderRadius: 10
  },

  txt: {
    color: "white",
    fontFamily: FONTS.lufga
  },

  txt1: {
    marginVertical: 40,
    marginHorizontal: 25,
    fontSize: 18,
    fontFamily: FONTS.lufga
  },

  img: {
    height: 50,
    width: 50,
  }
})