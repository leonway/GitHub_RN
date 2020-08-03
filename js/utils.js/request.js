/*
 * @Author: reamey
 * @Description: 系统缓存请求 与 非缓存请求
 * @Position: 
 * @Date: 2020-08-03 18:09:07
 * @LastEditors: xxx
 */
import  { AsyncStorage } from 'react-native'


/**
 * @description: 将请求数据与url绑定并存储在本地
 * @param {type} 
 * @return {type} 
 */
const saveData=(url,data,cb)=>{
  if(!data||!url)return 
  AsyncStorage.setItem(url,JSON.stringify(wrapData(data)),cb)
}


/**
 * @description: 包裹存储在本地的数据 加上时间戳
 * @param {type} 
 * @return {type} 
 */
const wrapData=(data)=>{
  return {data,timestamp:new Date().getTime()}
}

/**
 * @description:获取本地数据 
 * @param {type} 
 * @return {type} 
 */
const fetchLocalData = async (url)=>{
  try{
    const result = await AsyncStorage.getItem(url)
    return res(JSON.parse(result))
  }catch(e){
    Promise.reject(e)
    console.error(e);
  }
  // return new Promise((res,rej)=>{
  //   AsyncStorage.getItem(url,(error, result)=>{
  //     if(!error){
  //       try{
  //         res(JSON.parse(result))
  //       }catch(e){
  //         rej(e)
  //         console.error(e);
  //       }
  //     }else{
  //       rej(error)
  //       console.error(e);
  //     }
  //   })
  // })
}

/**
 * @description: 获取网络数据
 * @param {type} url
 * @return {type} {Promise}
 */
const fetchNetData = ()=>{
  
}
