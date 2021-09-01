import axios from "axios";

export function request(config){
  const instance = axios.create({
    baseURL:''
  })
  instance.interceptors.request.use(res=>{
    return res
  },error => {
    return error
  })
  instance.interceptors.response.use(response=>{
    return response.data
  },error => {
    return error
  })
  return instance(config)
}
