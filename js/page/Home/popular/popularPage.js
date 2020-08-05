import React, { useEffect,useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, Text, View, Button } from 'react-native'
import createPopularList from './popularList'

function PopularPage(props) {
  // console.log(props);
  const { tabs=[], global, onClick, navigation } = props
  const Tab = createMaterialTopTabNavigator()

  return (
    <Tab.Navigator 
      initialRouteName={tabs[0]}
      lazy={true}
      // lazyPreloadDistance={1}
      // backBehavior="initialRoute"
      upperCaseLabel={false}
      tabBarOptions={{
          // tabStyle: s.tabStyle,
          // upperCaseLabel: false,//5x 暂不支持标签大写控制
          scrollEnabled: true,//是否支持 选项卡滚动，默认false
          activeTintColor: 'white',
          style: {
              backgroundColor: global&&global.theme.themeColor||'#a67',//theme.themeColor,//TabBar 的背景颜色
              // 移除以适配react-navigation4x
              // height: 30//fix 开启scrollEnabled后r再Android上初次加载时闪烁问题
          },
          indicatorStyle: s.indicatorStyle,//标签指示器的样式
          labelStyle: s.labelStyle,//文字的样式
        }}
    >
    
    {tabs.map((tab,index)=>(
      <Tab.Screen 
        key={tab+index}
        name={tab}  
        component={useCallback(createPopularList(tab),[tab])}
        // component={createPopularList(tab)}
        options={{  
          tabBarLabel:({focused,...style})=>(<Text style={style}>
            {tab}
          </Text>),
          // tabBarIcon:({color,focused,size})=>(
          //   <Ionicons
          //     name="ios-home"
          //     size={size}
          //     style={{color:color}}
          //   />
          // )
        }}
      />
        
     
    ))}
  </Tab.Navigator>
  )
}

const mapStateToProps = state => {
  const { popular, global, loading } = state;
  // console.log(state);
  return {
    ...popular,
    loading: loading.models.popular,
  };
};
const actionCreators = {
  // onSearch: (language)=>({type:"popular/searchList",payload:language})
};

export default connect(mapStateToProps,actionCreators)(PopularPage)

const s = StyleSheet.create({
  container:{
    flex: 1,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  welcome:{
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  tabStyle:{
    padding:0
  },
  indicatorStyle:{
    height: 2,
    backgroundColor: '#fff',
    // color:'white'
  },
  labelStyle:{
    fontSize: 13,
    margin: 0,
    // marginTop: 6,
    // marginBottom: 6,
    // color:'white',
    // minWidth: 50,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  button:{
    marginBottom: 10,
  }
})
