import { View, Text, Button, Image, StyleSheet, TextInput, TouchableOpacity, Alert, Modal } from "react-native";
import { useAuthStore } from "../../src/store/auth.store";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS, FONTS } from "../../src/constants/theme";
import { Link, router } from "expo-router";
import { useState } from "react";
import axios from "axios"
import * as SecureStore from "expo-secure-store";
import { loginUser } from "../../src/services/auth.service";


export default function Login() {
  const setUser = useAuthStore((state) => state.setUser);
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
    const [modalVisible, setModalVisible] = useState(false);

  const handleLogin = async () => {
    if(!email || !password){
        Alert.alert("Veuillez remplir tous ses champs")
        return
    }

    let data

    try {
        setLoading(true)
        setError(null)

        data = await loginUser(email, password)
        await SecureStore.setItemAsync("token", data.token)

        setUser({
            id: data.user.id,
            name: data.user.name,
            role: data.user.role.toUpperCase() == "PATIENT" ? "PATIENT": "DOCTOR",
            specialty: data.user.specialty || undefined
        })

        console.log("USER AFTER SET:", data.user)
        setModalVisible(true)

        setTimeout(() => {
            setModalVisible(false)
            router.replace("../home")
        }, 1500)

    } catch (error) {
        setError(error.message)
    } finally{
        setLoading(false)
        console.log("LOGIN RESPONSE:", data);
    }

  }

  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.top}>
             <Image source={require("../../assets/images/logo.png")} style={styles.logo}/>
             <Text style={styles.title}>Log in to your account</Text>
             <Text style={styles.txt}>Your journey to better health starts here</Text>
       </View>

       <View style={styles.inputContainer}>
         <View style={styles.input}>
            <Ionicons name="mail-outline" size={24} color="gray" />
            <TextInput placeholder="Enter your email" value={email} onChangeText={setEmail}/>
         </View>

        <View style={styles.input}>
            <Ionicons name="lock-closed-outline" size={24} color="gray" />
            <TextInput placeholder="Enter your password" secureTextEntry={true} value={password} onChangeText={setPassword}/>
        </View>
            <Text style={styles.forgot}>Forgot Password?</Text>
       </View>

       <TouchableOpacity style={styles.submit} onPress={handleLogin}>
            <Text style={styles.txtInput}>{loading ? "Chargement...." : "Log In"}</Text>
            {!loading && (
                 <Ionicons name="chevron-forward" size={24} color="white" />
            )}
       </TouchableOpacity>

       <Text style={styles.linkText}>Don't have an account? <Link href={"/register"} style={styles.link}>Sign Up</Link></Text>
       <View style={styles.line}></View>

       <View style={styles.social}>
            <TouchableOpacity style={styles.socialBtn}>
                <Image source={require("../../assets/images/Google.png")}/>
                <Text>Continue with Google</Text>
            </TouchableOpacity>

              <TouchableOpacity style={styles.socialBtn}>
                <Image source={require("../../assets/images/Apple.png")}/>
                <Text>Continue with Apple</Text>
            </TouchableOpacity>
       </View>

       <Modal visible={modalVisible} transparent animationType="fade">
        <View style={{ flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"rgba(0,0,0,0.4)" }}>
          <View style={{ backgroundColor:"white", padding:30, borderRadius:15, alignItems:"center" }}>
            <Text style={{ fontSize:18, fontWeight:"bold", marginBottom:10 }}>Connexion réussie !</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    top: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15
    },

    title: {
        fontSize: 24,
        fontFamily: FONTS.lufga
    },

    txt: {
        fontFamily: FONTS.poppins,
        fontSize: 14
    },
    logo: {
        width: 180,
        height: 180
    },
    input: {
        borderWidth: 1,
        borderColor: "lightgray",
        margin: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: "#fff",
        alignSelf: "stretch"
    },

    inputContainer: {alignSelf: "stretch"},


    forgot: {
        textAlign: "right",
        marginRight: 10,
        fontFamily: FONTS.italic,
        color: COLORS.primary
    },

    submit: {
        borderColor: COLORS.primary,
        borderWidth: 1,
        borderRadius: 15,
        // alignSelf: "stretch",
        width: 400,
        marginTop: 15,
        backgroundColor: COLORS.primary,
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 12,
        justifyContent: "center",
        alignItems: "center"
    },
    
    txtInput: {
        color: COLORS.white,
        fontSize: 16,
        fontFamily: FONTS.lufga
    },

    linkText: {
        marginTop: 20,
        fontFamily: FONTS.poppins,
        fontSize: 13
    },

    link : {
        color: COLORS.primary,
        fontSize: 15,
        textDecorationLine: "underline"
    },

    line: {
        backgroundColor: COLORS.input,
        height: 2,
        width: "50%",
        marginTop: 50
    },

    social: {
        marginTop: 30,
        gap: 10,
        alignSelf: "stretch",
        paddingHorizontal: 20
    },
    socialBtn : {
        borderWidth: 1,
        borderColor : COLORS.input,
       width: "100%",
       backgroundColor: COLORS.input,
       flexDirection: "row",
       paddingVertical: 15,
       paddingHorizontal: 15,
       justifyContent: "center",
       alignItems: "center",
       gap: 10,
        borderRadius: 10
    }
})