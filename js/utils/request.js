/*
 * @Author: reamey
 * @Description: 系统缓存请求 与 非缓存请求
 * @Position: 
 * @Date: 2020-08-03 18:09:07
 * @LastEditors: xxx
 */
import  AsyncStorage from '@react-native-community/async-storage'


/**
 * @description: 将请求数据与url绑定并存储在本地
 * @param {type} 
 * @return {type} 
 */
const saveData=(url,data,cb)=>{
  if(!data||!url)return 
  AsyncStorage.setItem(url,JSON.stringify(dataWrapper(data)),cb)
}


/**
 * @description: 包裹存储在本地的数据 加上时间戳
 * @param {type} 
 * @return {type} 
 */
const dataWrapper=(data)=>{
  return {data,timestamp:new Date().getTime()}
}

/**
 * @description:获取本地数据 
 * @param {type} 
 * @return {type} 
 */
const fetchLocalData = async (url)=>{
  // try{
  //   const result = await AsyncStorage.getItem(url)
  //   return res(JSON.parse(result))
  // }catch(e){
  //   Promise.reject(e)
  //   console.error(e);
  // }
  return new Promise((res,rej)=>{
    AsyncStorage.getItem(url,(error, result)=>{
      if(!error){
        try{
          res(JSON.parse(result))
        }catch(e){
          rej(e)
          console.error(e);
        }
      }else{
        rej(error)
        console.error(e);
      }
    })
  })
}

/**
 * @description: 获取网络数据
 * @param {type} url
 * @return {type} {Promise}
 */
const fetchNetData = async (url)=>{
 return new Promise((res,rej)=>{
   fetch(url)
    .then((response)=>{
      console.log(response);
      if(response.ok){
        return response.json()
      }
      throw new Error('Network response was not ok.')
    })
    .then((responseData)=>{
      saveData(url,responseData)
      res(responseData)
    })
    .catch((error)=>{
      rej(error)
    })
 })
}

/**
 * @description: 获取数据 优先获取本地数据，如果无本地数据或本地数据过期则获取网络数据
 * @param {type} url
 * @return {type} {Promise}
 */
const fetchData=(url)=>{
  console.log(url);
  return new Promise((res,rej)=>{
    fetchLocalData(url).then((wrapData)=>{
      if(wrapData&&checkTimestampValid(wrapData.timestamp)){
        res(wrapData)
      }else{
        fetchNetData(url).then((data)=>{
          res(dataWrapper(data))
        }).catch((error)=>{
          rej(error)
        })
      }
    }).catch((error)=>{
      fetchNetData(url).then((data)=>{
        res(dataWrapper(data))
      }).catch((error)=>{
        rej(error)
      })
    })
  })
}
/**
 * @description: 检测timestamp 是否在有效期内
 * @param {type} timestamp 项目更新时间
 * @return {type} {boolean} true 不需要更新，false需要更新
 */
const checkTimestampValid = (timestamp)=>{
  return false
  const cur = new Date();
  const target = new Date();
  target.setTime(timestamp);
  if(cur.getMonth()!==target.getMonth()){
    return false
  }
  if(cur.getDate()!==target.getDate()){
    return false
  }
  if(cur.getHours()-target.getHours()>4){
    return false
  }
  // if(cur.getMinutes()-target.getMinutes()>1){
  //   return false
  // }
  return true
}

export {
  checkTimestampValid,
  fetchData,
  fetchNetData,
  fetchLocalData,
  dataWrapper,
  saveData
}
