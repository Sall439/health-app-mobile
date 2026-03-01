import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Alert, Modal, Animated, TextInput, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Entypo from '@expo/vector-icons/Entypo';
import Header from '../../src/components/Header'
import { COLORS, FONTS } from '../../src/constants/theme';
import { router } from 'expo-router';
import HeaderPages from '../../src/components/HeaderPages';
import { BlurView } from 'expo-blur';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardAppointment from '../../src/components/CardAppointment';

const {height, width} = Dimensions.get("window")



const appointments = () => {

  const [modal, setModal] = useState(false)
  const [appointmentList, setAppointmentList] = useState([])
  const [successModal, setSuccessModal] = useState(false)
  const [formData, setFormData] = useState({
    doctorId: "",
    hospitalId: "",
    specialityId: "",
    motif: "",
    date: "",
    heure: ""
  })
  
   const loadAppointments = async () => {
    try {
      const data = await getAppointments();
      setAppointmentList(data);
    } catch (error) {
      Alert.alert("Erreur", "Impossible de charger les rendez-vous");
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

// Sauvegarder les rendez-vous à chaque ajout
  const handleAddAppointment = async () => {
    const { doctorId, hospitalId, specialtyId, motif, date, heure } = formData;
    if (!doctorId || !hospitalId || !specialtyId || !motif || !date || !heure) {
      return Alert.alert("Veuillez remplir tous les champs");
    }

    try {
      const res = await createAppointment(formData);
      console.log("Appointment created:", res);
      // Mettre à jour la liste localement
      setAppointmentList(prev => [...prev, res.newAppointment]);
      setModal(false);
      setSuccessModal(true);
      setFormData({ doctorId: "", hospitalId: "", specialtyId: "", motif: "", date: "", heure: "" });
      setTimeout(() => setSuccessModal(false), 2000);
    } catch (error) {
      Alert.alert("Erreur", error.message || "Impossible d'ajouter le rendez-vous");
    }
  };

  return (
   <SafeAreaView style={{flex: 1, paddingBottom: 80}}>
        <HeaderPages text={"Appointment"}/>
        <View style={{marginHorizontal: 10, marginVertical: 15}}>
        <TouchableOpacity style={styles.btn} onPress={() => setModal(true)}>
                    <Text style={styles.txt}>Prendre Rendez-Vous</Text>
        </TouchableOpacity>

          <FlatList
          data={appointmentList}
          keyExtractor={(item) => item.id} // ou item.date + item.heure si pas d'id
          contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 15 }}
          renderItem={({ item , index}) => (
            <CardAppointment index={index} item={item}/>
          )}
        />
            </View>

                {/* MOdal principale */}
              <Modal visible={modal} animationType="fade" transparent>
                <View style={{ flex: 1 }}>

                  {/* Blur full screen */}
                  <BlurView
                    intensity={90}
                    tint="dark"
                    style={StyleSheet.absoluteFillObject}
                  />

                  {/* Overlay centré */}
                  <View style={styles.overlay}>
                    <View style={styles.modalContainer}>
                      <Text style={styles.title}>Nouveau Rendez-Vous</Text>

                      <TextInput
                        placeholder="Nom du Docteur"
                        placeholderTextColor="#ccc"
                        style={styles.input}
                        value={formData.doctor}
                        onChangeText={(text) =>
                          setFormData({ ...formData, doctor: text })
                        }
                      />

                      <TextInput
                        placeholder="Nom de l'hopital"
                        placeholderTextColor="#ccc"
                        style={styles.input}
                        value={formData.hospital}
                        onChangeText={(text) =>
                          setFormData({ ...formData, hospital: text })
                        }
                      />

                      <TextInput
                        placeholder="Specialite"
                        placeholderTextColor="#ccc"
                        style={styles.input}
                        value={formData.specialite}
                        onChangeText={(text) =>
                          setFormData({ ...formData, specialite: text })
                        }
                      />

                      <TextInput
                        placeholder="Motif"
                        placeholderTextColor="#ccc"
                        style={styles.input}
                        value={formData.motif}
                        onChangeText={(text) =>
                          setFormData({ ...formData, motif: text })
                        }
                      />

                      <TextInput
                        placeholder="Date de rendez-vous"
                        placeholderTextColor="#ccc"
                        style={styles.input}
                        value={formData.date}
                        onChangeText={(text) =>
                          setFormData({ ...formData, date: text })
                        }
                      />

                      <TextInput
                        placeholder="Heure de rendez-vous"
                        placeholderTextColor="#ccc"
                        style={styles.input}
                        value={formData.heure}
                        onChangeText={(text) =>
                          setFormData({ ...formData, heure: text })
                        }
                      />


                      <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 10,
                        gap: 10
                      }}>
                        <TouchableOpacity
                          style={styles.addBtn}
                          onPress={handleAddAppointment}
                        >
                          <Text style={{ color: "white", fontFamily: FONTS.lufga }}>
                            Ajouter
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => setModal(false)}
                          style={styles.cancelBtn}
                        >
                          <Text style={{ color: COLORS.primary, fontFamily: FONTS.lufga }}>
                            Annuler
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                </View>
              </Modal>

                {/* MOdal de confirmation d'ajout */}

                <Modal transparent={true} animationType='fade' visible={successModal}>
                      <BlurView
                        intensity={90}
                        tint="dark"
                        style={StyleSheet.absoluteFillObject}
                      />
                      <View style={styles.overlay}>
                            <View style={styles.successContainer}>
                                <Ionicons name='checkmark-circle' size={80} color={"#ffffff"}/>
                                <Text style={styles.successText}>Rendez-vous pris en compte</Text>
                            </View>
                      </View>
                </Modal>

   </SafeAreaView>
  )
}

export default appointments

const styles = StyleSheet.create({
  btn: {
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal:15,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  
  txt: {
    color: "white",
    fontSize: 18,
    fontFamily: FONTS.lufga
  },

  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    width: width * 0.9,
    maxHeight: height * 0.75,
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    padding: width * 0.05,
    elevation: 10
  },

  title: {
    textAlign: "center",
    marginBottom: 10,
    color: "white",
    fontFamily: FONTS.lufga,
    fontSize: 18
  },

  input: {
    borderColor: "white",
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 8,
    color: "white",
    fontWeight: "bold",
    fontFamily: FONTS.lufga
  },

  addBtn: {
      borderColor: "white",
      borderWidth: 1,
      paddingVertical: 10,
      paddingHorizontal: 15,
      width: "50%",
      borderRadius: 15,
      justifyContent: "center",
      alignItems: "center"
  },

   cancelBtn: {
      backgroundColor: "white",
      paddingVertical: 10,
      paddingHorizontal: 15,
      width: "50%",
      borderRadius: 15,
      justifyContent: "center",
      alignItems: "center"
  },

  successContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 20,
    gap: 20
  },

  successText: {
    color: "white",
    fontFamily: FONTS.lufga,
    fontSize: 20
  },
})