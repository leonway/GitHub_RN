import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Button } from 'react-native'

function DetailPage({content,dataLoading,onClick}) {
  useEffect(()=>{
    onClick&&onClick()
  },[])
  return (
    <View style={s.container}>
      <Text style={s.welcome}> DetailPage </Text>
      <Button title={dataLoading?"loading。。。":"刷新数据"} disabled={dataLoading} onPress={()=>onClick&&onClick()}/>
      <Text style={s.content}>
        {JSON.stringify(content)}
      </Text>
    </View>
  )
}
const mapStateToProps = state => {
  const { popular, loading } = state;
  return {
    ...popular,
    dataLoading: loading.effects['popular/zhihu'],
  };
};
const actionCreators = {
  onClick: ()=>({type:"popular/zhihu"})
};

export default connect(mapStateToProps,actionCreators)(DetailPage)
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
  }
})
