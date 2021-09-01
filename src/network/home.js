//管理首页发送的网络请求
import {request} from "@/network/request";
//获取轮播图、推荐部分数据
export function getHomeMultidata(){
  return request({
    url:'/home/multidata'
  })
}
//获取流行、新款、精选模块数据
export function getHomeGoods(type,page){
  return request({
    url:'/home/data',
    params:{
      type,//请求的是流行、新款还是精选
      page//请求第几页数据
    }
  })

}
