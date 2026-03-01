import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Dimensions } from 'react-native'
import React, { useState } from 'react'
import HeaderPages from '../../src/components/HeaderPages'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapView, { Marker } from "react-native-maps"
import { COLORS, FONTS } from '../../src/constants/theme'

const { width, height } = Dimensions.get("window")

export default function Hospital() {
  const [selectedHospital, setSelectedHospital] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

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
      address: "Guele Tapée, près de l’École supérieure polytechnique de Dakar et du stade Iba-Mar-Diop.",
      latitude: 14.68462,
      longitude: -17.45389,
    },
    {
      id: "5",
      name: "Clinique de la Madeleine",
      address: "Avenue des Diambars, Dakar",
      latitude: 14.66000,
      longitude: -17.43000,
    },
  ]

  const openMap = (hospital) => {
    setSelectedHospital(hospital)
    setModalVisible(true)
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.address}>📍 {item.address}</Text>

      <TouchableOpacity
        style={styles.mapBtn}
        onPress={() => openMap(item)}
      >
        <Text style={styles.mapBtnText}>Voir sur la carte</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderPages text={"Hospitals"} />

      <FlatList
        data={hospitalsData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 15 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Modal Map */}
      {selectedHospital && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={false}
        >
          <View style={{ flex: 1 }}>
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: selectedHospital.latitude,
                longitude: selectedHospital.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={{
                  latitude: selectedHospital.latitude,
                  longitude: selectedHospital.longitude
                }}
                title={selectedHospital.name}
                description={selectedHospital.address}
              />
            </MapView>

            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
    elevation: 6,
    shadowColor: "#000",
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
  mapBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center"
  },
  mapBtnText: {
    color: "white",
    fontFamily: FONTS.lufga,
    fontSize: 16
  },
  closeBtn: {
    position: "absolute",
    bottom: 20,
    left: width * 0.25,
    width: width * 0.5,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center"
  },
  closeText: {
    color: "white",
    fontFamily: FONTS.lufga,
    fontSize: 16
  }
})