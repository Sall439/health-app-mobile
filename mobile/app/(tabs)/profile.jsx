import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderPages from '../../src/components/HeaderPages'
import Fontisto from '@expo/vector-icons/Fontisto';
import { COLORS, FONTS } from '../../src/constants/theme';
import { useAuthStore } from '../../src/store/auth.store';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { router } from 'expo-router';

const profile = () => {
  const user = useAuthStore((state) => state.user)
   console.log("USER IN HEADER:", user);
  return (
    <SafeAreaView style={{flex: 1}}>
      <HeaderPages text={"Profile"}/>
      <View style={{
        flex: 1,
        marginVertical: 15,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        gap: 20
      }}>
          <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10}}>
            <Fontisto name="persons" size={20} color="gray" />
            <Text style={{fontFamily: FONTS.lufga, fontSize: 20}}>Nom & Prenom :</Text>
            <Text style={{fontFamily: FONTS.italic, fontSize: 16, color: COLORS.primary}}>{user?.name}</Text>
          </View>

          <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10}}>
            <Fontisto name="email" size={20} color="gray" />
            <Text style={{fontFamily: FONTS.lufga, fontSize: 20}}>Email :</Text>
            <Text style={{fontFamily: FONTS.italic, fontSize: 16, color: COLORS.primary}}>{user?.email}</Text>
          </View>

          <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10}}>
           <SimpleLineIcons name="call-end" size={20} color="gray" />
            <Text style={{fontFamily: FONTS.lufga, fontSize: 20}}>telephone: </Text>
            <Text style={{fontFamily: FONTS.italic, fontSize: 16, color: COLORS.primary}}>{user?.tel}</Text>
          </View>

          <TouchableOpacity style={{backgroundColor: COLORS.primary, paddingVertical: 10, paddingHorizontal: 15, width: 300, justifyContent: "center", alignItems: "center", borderRadius: 15}} onPress={() => router.push("../login")}>
              <Text style={{color: COLORS.white, fontFamily: FONTS.lufga, fontSize: 18}}>Se deconnecter</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default profile