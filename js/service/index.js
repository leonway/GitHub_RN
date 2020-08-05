import { fetchData } from '../utils/request'

const getLanguageListUrl = (data) => `https://api.github.com/search/repositories?q=${data}`
//获取最热列表接口
export const getLanguageList = (data)=>{
  return fetchData(getLanguageListUrl(data))
}
