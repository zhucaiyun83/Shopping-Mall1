import axios from 'axios'

export function request(config){
//  创建axios实例
  const instance = axios.create({
    baseURL:'http://152.136.185.210:7878/api/m5',
    timeout:5000
  })
  //配置请求和响应拦截
  instance.interceptors.request.use(config=>{
    //必须要return
    return config
  },error=>{
    return error
  })

  instance.interceptors.response.use(response=>{
    return response.data
  },error => {
    return error
  })
  //发送真正的网络请求 return一个promise
  return instance(config)
}
