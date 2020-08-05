import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default function PopularItem({item,onSelect}) {
  if(!item||!item.owner){
    return null
  }
  let favoriteButton = <TouchableOpacity
    underlayColor={'transparent'}
    style={s.favoriteButton}
    onPress={()=>{}}
  >
    <FontAwesome 
      name={"star-o"}
      size={26}
      style={{color:'red'}}
    />
  </TouchableOpacity>
  return (
    <TouchableOpacity
      onPress={onSelect}
    >
      <View style={s.cellContainer}>
        <Text style={s.title}>
          {item.full_name}
        </Text>
        <Text style={s.description}>
          {item.description}
        </Text>
        <View style={s.row}>
          <View style={s.row}>
            <Text>
              Author:
            </Text>
            <Image style={s.img} source={{uri:item.owner.avatar_url}} />
          </View>
          <View  style={s.row}>
            <Text>
              Star:
            </Text>
            <Text>
              {item.stargazers_count}
            </Text>
          </View>
          {favoriteButton}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const s = StyleSheet.create({
  second:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  img:{
    width: 22,
    height: 22,
  },
  row:{
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cellContainer:{
    backgroundColor: '#fff',
    padding: 10,
    marginHorizontal:5,
    marginVertical:3,
    borderColor: '#ddd',
    borderWidth: .5,
    borderRadius: 2,
    shadowColor:'gray',
    shadowOffset:{ width: .5,height: .5, },
    shadowOpacity:.4,
    shadowRadius:1,
    elevation:2
  },
  title:{
    fontSize: 16,
    marginBottom: 2,
    color: '#212121',
  },
  description:{
    fontSize: 14,
    marginBottom: 2,
    color: '#757575',
  },
  favoriteButton:{
    padding:6
  }
})
