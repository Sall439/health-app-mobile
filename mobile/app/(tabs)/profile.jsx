import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderPages from '../../src/components/HeaderPages'

const profile = () => {
  return (
    <SafeAreaView>
      <HeaderPages text={"Profile"}/>
    </SafeAreaView>
  )
}

export default profile