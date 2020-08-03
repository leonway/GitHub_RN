import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function WelcomePage({navigation}) {
  useEffect(()=>{
    setTimeout(() => {
      navigation.navigate('main')
    }, 1000);
  })
  return (
    <View>
      <Text>
        WelcomePage
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({})
