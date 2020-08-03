import * as React from 'react';
import { NavigationContainer,DefaultTheme  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Init from '../page/WelcomePage'
import Main from '../page/HomePage'
import DetailPage from '../page/DetailPage'

const Root = createStackNavigator()
// console.log(DefaultTheme);

export default ()=>{
  return (
    <NavigationContainer
      onStateChange={(...data)=>{
        console.log(data);
      }}
      theme={{
        ...DefaultTheme,
        colors:{
          ...DefaultTheme.colors,
          // primary:'red',
          // background:'orange'
        }
      }}
    >
      <Root.Navigator 
        initialRouteName="init"
        screenOptions={{
          headerShown:false
        }}
      >
        <Root.Screen 
          name="init" 
          component={Init} 
        />
        <Root.Screen 
          name="main" 
          component={Main} 
        />
        <Root.Screen 
          name="detailPage" 
          component={DetailPage} 
          options={{
            headerShown:true
          }}
        />
      </Root.Navigator>
    </NavigationContainer>
)
}
