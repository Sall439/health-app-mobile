import { View, Text, Button, Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useAuthStore } from "../../src/store/auth.store";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS, FONTS } from "../../src/constants/theme";
import { Link, router } from "expo-router";
import { useState } from "react";

export default function register() {
  const setUser = useAuthStore((state) => state.setUser);
   const [email, setEmail] = useState('')
   const [name, setName] = useState("")
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [role, setRole] = useState<"PATIENT" | "DOCTOR">("PATIENT")
  const [specialty, setSpecialty] = useState("")

  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.top}>
             <Image source={require("../../assets/images/logo.png")} style={styles.logo}/>
             <Text style={styles.title}>Create your Account</Text>
             <Text style={styles.txt}>Create an account to get started</Text>
       </View>

       <View style={styles.inputContainer}>
        <View style={styles.input}>
            <Ionicons name="person-outline" size={24} color="gray" />
            <TextInput placeholder="Enter your name" value={name} onChangeText={setName}/>
         </View>

         <View style={styles.input}>
            <Ionicons name="mail-outline" size={24} color="gray" />
            <TextInput placeholder="Enter your email" value={email} onChangeText={setEmail}/>
         </View>

        <View style={styles.input}>
            <Ionicons name="lock-closed-outline" size={24} color="gray" />
            <TextInput placeholder="Enter your password" secureTextEntry={true} value={password} onChangeText={setPassword}/>
        </View>

        <View style={styles.input}>
            <Ionicons name="lock-closed-outline" size={24} color="gray" />
            <TextInput placeholder="Enter your role" value={role} onChangeText={setRole}/>
        </View>

         {role === "DOCTOR" && (
            <View style={styles.input}>
                <Ionicons name="lock-closed-outline" size={24} color="gray" />
                <TextInput placeholder="Enter your password" secureTextEntry={true} value={specialty} onChangeText={setSpecialty}/>
            </View>        
         )}
            <Text style={styles.forgot}>Forgot Password?</Text>
       </View>

       <TouchableOpacity style={styles.submit} onPress={() => router.push("../home")}>
            <Text style={styles.txtInput}>Sign In </Text>
             <Ionicons name="chevron-forward" size={24} color="white" />
       </TouchableOpacity>

       <Text style={styles.linkText}>Already have an account? <Link href={"/login"} style={styles.link}>Log In</Link></Text>
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
        backgroundColor: COLORS.input,
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