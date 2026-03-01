import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import HeaderPages from '../../src/components/HeaderPages'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapView , {Marker} from "react-native-maps"
import { COLORS, FONTS } from '../../src/constants/theme'


export default function Hospital(){
   const hospitalsData = [
  {
    id: "1",
    name: "Hôpital Principal de Dakar",
    address: "Avenue Nelson Mandela, Dakar",
    latitude: 14.66145,
    longitude: -17.43478,
  },
  {
    id: "2",
    name: "Centre Hospitalier National Universitaire de Fann",
    address: "Fann Résidence, Dakar",
    latitude: 14.68810,
    longitude: -17.46620,
  },
  {
    id: "3",
    name: "Hôpital Aristide Le Dantec",
    address: "Avenue Pasteur, Dakar",
    latitude: 14.65725,
    longitude: -17.43666,
  },
  {
    id: "4",
    name: "Hôpital Abass Ndao",
    address: " Guele Tapée, près de l’École supérieure polytechnique de Dakar et du stade Iba-Mar-Diop.",
    latitude: 14.68462,
    longitude: -17.45389,
  },
  {
    id: "5",
    name: "Clinique de la Madeleine",
    adress: " Avenue des Diambars, Dakar",
    latitude: 14.66000, // approx
    longitude: -17.43000, // approx
  },

];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.address}>📍 {item.address}</Text>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: item.latitude,
          longitude: item.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        scrollEnabled={true}
        zoomEnabled={true}
      >
        <Marker coordinate={{
          latitude: item.latitude,
          longitude: item.longitude
        }} />
      </MapView>
    </View>
  )

  return (
    <SafeAreaView>
      <HeaderPages text={"Hospitals"}/>

      <FlatList
        data={hospitalsData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 15 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
    elevation: 6, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  name: {
    fontSize: 18,
    fontFamily: FONTS.lufga,
    color: COLORS.primary,
    marginBottom: 6,
    textAlign: "center"
  },
  address: {
    color: "#555",
    marginBottom: 12,
    fontSize: 14,
    textAlign: "center"
  },
  map: {
    height: 160,
    borderRadius: 15
  }
})