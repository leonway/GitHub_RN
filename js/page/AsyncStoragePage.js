import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import { fetchData } from '../utils/request'

function AsyncStoragePage() {
  const [value,setValue] = useState()
  const [content,setContent] = useState()
  const [loading,setLoading] = useState(false)
  // useEffect(()=>{
  //   onClick&&onClick()
  // },[])
  const onSearch =()=>{
    let url = `https://api.github.com/search/repositories?q=${value}`
    setLoading(true)
    fetchData(url)
    .then(data=>{
      setLoading(false)
        let showData = `初次数据加载时间：${new Date(data.timestamp)}\n${JSON.stringify(data.data)}`
        setContent(showData)
    }).catch(e=>{
      setLoading(false)
      e&&console.log(e.toString());
    })
  }

  return (
    <View style={s.container}>
      <Text style={s.welcome}> AsyncStoragePage </Text>
      <Button title={loading?"loading。。。":"刷新数据"} disabled={loading} onPress={onSearch}/>
      <TextInput 
        style={s.input} 
        value={value}
        onChangeText={text=>{
          setValue(text)
        }}
      />
      <Text style={s.content}>
        {content}
      </Text>
    </View>
  )
}

export default AsyncStoragePage
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
  },
  content:{
    height: 200,
  },
  input:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 200,
    height: 50,
    borderColor:"black",
    borderWidth: 1,
  }
})
