import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TrendingPage from '../page/TrendingPage'
import PopularPage from '../page/PopularPage'
import MyPage from '../page/MyPage'
import FavoritePage from '../page/FavoritePage'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'

const Tab = createBottomTabNavigator()

export default (props)=>{
  // console.log(props);
  
  return (
    <Tab.Navigator 
        initialRouteName="popular"
        tabBarOptions={{
          // inactiveTintColor:'orange',
          // activeTintColor:'red'
        }}
      >
        <Tab.Screen 
          name="popular" 
          component={PopularPage} 
          options={{  
            tabBarLabel:"最热",
            tabBarIcon:({color,focused,size})=>(
              <MaterialIcons
                name="whatshot"
                size={size}
                style={{color:color}}
              />
            )
          }}
        />
        <Tab.Screen 
          name="trending" 
          component={TrendingPage} 
          options={{  
            tabBarLabel:"趋势",
            tabBarIcon:({color,focused,size})=>(
              <MaterialIcons
                name="trending-up"
                size={size}
                style={{color:color}}
              />
            )
          }}
        />
        <Tab.Screen 
          name="favorite" 
          component={FavoritePage} 
          options={{  
            tabBarLabel:"收藏",
            tabBarIcon:({color,focused,size})=>(
              <MaterialIcons
                name="favorite"
                size={size}
                style={{color:color}}
              />
            )
          }}
        />
        <Tab.Screen 
          name="my" 
          component={MyPage} 
          options={{  
            tabBarLabel:"我的",
            tabBarIcon:({color,focused,size})=>(
              <Entypo
                name="user"
                size={size}
                style={{color:color}}
              />
            )
          }}
        />
      </Tab.Navigator>
)
}
