import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { router } from 'expo-router'
import { COLORS } from '../src/constants/theme'

const splash = () => {
    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace("/get-started")
        }, 5000)

        return () => clearTimeout(timer)
    }, [])
  return (
    <View style={styles.container}>
        <Text style={styles.logo}>CareFlow</Text>
        <Text style={styles.subtitle}>Healthcare Simplified</Text>
    </View>
  )
}

export default splash

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1976D2",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: 52,
    fontWeight: "bold",
    color: COLORS.white,
  },
  subtitle: {
    color: "white",
    marginTop: 10,
    fontSize: 20
  },
});