import React, { useEffect, useCallback,useMemo } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Button, FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import PopularItem from '../../../components/PopularItem'

const createPopularList = (language) =>{
  const PoplarList = ({navigation,lists,onSearch,loading})=>{
    useEffect(()=>{
      onSearch&&onSearch(language)
    },[])
  //   const [loading,setLoading] = useState(false)
  // const [endLoading,setEndLoading] = useState(false)
  // const [data,setData] = useState(list)
  const renderItem = ({item,index})=>{
    return <PopularItem item={item} onSelect={()=>{
      console.log('PopularItem');
    }}/>
  }

      // const getIndicator = ()=>(
      //   endLoading
      //   ?(<View style={s.indicatorContainer}>
      //     <ActivityIndicator
      //       style={s.indicator}
      //       color="#0000ff"
      //       size="large"
      //       animating={true}
      //     />
      //     <Text>
      //       正在加载更多
      //     </Text>
      //   </View>)
      //   :null
      // )
    // console.log(lists);
    return (
      <View style={s.container}>
        {/* <Text style={s.welcome}>
          popular language{language}
        </Text> */}
        <FlatList
          data={lists&&lists[language]||[]}
          renderItem={renderItem}
          keyExtractor={item=>String(item.id)}
          // refreshing={loading}
          // onRefresh={()=>{
          //   onSearch&&onSearch(language)
          // }}
          refreshControl={
            <RefreshControl 
              enabled={true}
              title="loading"
              colors={['red']}
              tintColor="orange"
              refreshing={loading}
              onRefresh={()=>{
                onSearch&&onSearch(language)
              }}
            />
          }
          
        />
        {/* <View style={s.button}>
          <Button title="go to detailPage" onPress={()=>navigation&&navigation.navigate('detailPage')} />
        </View>
        <View style={s.button}>
          <Button title="go to asyncStoragePage" onPress={()=>navigation&&navigation.navigate('asyncStoragePage')} />
        </View> */}
      </View>
    )
  }
  const mapStateToProps = state => {
      const { popular, global, loading } = state;
      // console.log(state);
      console.log(loading);
      return {
          ...popular,
          loading: loading.models.popular,
        };
  };
  const actionCreators = {
    onSearch: (language)=>({type:"popular/searchList",payload:language})
  };

  return connect(mapStateToProps,actionCreators)(PoplarList)
}

const s = StyleSheet.create({
  container:{
    flex: 1,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  item:{
    height: 50,
    backgroundColor: 'red',
    marginBottom: 10,
  },
  name:{

  },
  description:{

  }
})


export default createPopularList
