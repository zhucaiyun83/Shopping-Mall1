<template>
<!--  <div>{{this.$route.query.iid}}</div>-->
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
<!--    {{iid}}-->
<!--    <scroll class="content">-->
      <detail-swiper v-bind:top-images="topImages"></detail-swiper>
      <detail-base-info v-bind:goods="goods"></detail-base-info>
      <detail-shop-info v-bind:shop="shop"></detail-shop-info>
<!--    </scroll>-->
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import Scroll from "@/components/common/scroll/Scroll";
import {getDetail,Goods,Shop} from "@/network/detail";

export default {
  name: "Detail",
  data(){
    return{
      iid:"",
      topImages:[],
      goods: {},
      shop:{}
    }
  },
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll
  },
  created() {
    //1、保存传入的iid
    console.log(this.$route.query.iid);
    this.iid=this.$route.query.iid
    //2、根据iid请求详情数据
    getDetail(this.iid).then(res=>{
      //2.1、获取顶部轮播图信息
      console.log(res);
      const data = res.result
      this.topImages = res.result.itemInfo.topImages
      console.log(this.topImages);
    //  2.2、获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
    //  2.3、获取店铺相关信息
      this.shop = new Shop(data.shopInfo)
    })
  },
}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #ffffff;
  /*height: 100vh;*/
}
.detail-nav{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
  background-color: #ffffff;
}
/*.content{*/
/*  position: absolute;*/
/*  top: 44px;*/
/*  left: 0;*/
/*  right: 0;*/
/*  bottom: 0;*/
/*}*/
</style>
