import {request} from "@/network/request";
export function getDetail(iid){
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}

export class Goods{
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}
// const p = new Goods()
//通过Goods类创建的对象包含了title等信息，把多个信息保存到一个对象

export class Shop{
  constructor(shopInfo) {
    this.name = shopInfo.name
    this.logo = shopInfo.shopLogo
    this.fans = shopInfo.cFans
    this.goodsCount = shopInfo.cGoods
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
  }
}
