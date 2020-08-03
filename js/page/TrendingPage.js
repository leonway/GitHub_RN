import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function TrendingPage() {
  return (
    <View style={s.container}>
      <Text style={s.welcome}> TrendingPage </Text>
    </View>
  )
}

const s = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  welcome:{
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
})
