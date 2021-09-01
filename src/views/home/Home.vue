<template>
<div id="home">
  <!--  顶部导航-->
  <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
  <tab-control v-bind:titles="['流行','新款','精选']"
               class="tab-control"
               @tabClick="tabClick"
               ref="tabControl1"
               v-show="isFixed"></tab-control>
<!--                                                             监听自定义事件-->
  <scroll class="content"
          ref="scrollcomp"
          v-bind:probe-type="3"
          v-bind:pull-up-load="true"
          @scroll="contentScroll"
          @pullingUp="loadMore">
    <!--  轮播图-->
    <home-swiper v-bind:banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
    <home-recommend-view v-bind:recommends="recommends"></home-recommend-view>
    <home-feature></home-feature>
<!--    这里不能给tab-control动态绑定class来实现吸顶效果-->
    <tab-control v-bind:titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl"
                 v-bind:class="{fixed:isFixed}"></tab-control>
    <!--                             可以设置计算属性-->
    <good-list v-bind:goods="goods[currentType].list"></good-list>
  </scroll>
  <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
</div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodList from "@/components/content/goods/GoodList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop";

import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import HomeRecommendView from "@/views/home/childComps/HomeRecommendView";
import HomeFeature from "@/views/home/childComps/HomeFeature";
import {getHomeMultidata,getHomeGoods} from "@/network/home"

import {debounce} from '@/common/utils'



export default {
  name: "Home",
  components:{
    NavBar,
    TabControl,
    Scroll,
    BackTop,
    GoodList,
    HomeSwiper,
    HomeRecommendView,
    HomeFeature
  },
  data(){
    return {
      result:null,
      banners:[],
      recommends:[],
      goods:{
        //流行
        'pop':{page:0, list:[]},
        //新款
        'new':{page:0, list:[]},
        //精选
        'sell':{page:0, list:[]}
      },
      currentType:'pop',
      isShowBackTop:false,
      offsetTop:0,
      isFixed:false,
      saveY:0
    }
  },
  destroyed(){
    console.log('home destroyed');
  },
  activated() {
    console.log('进来');
    console.log(this.saveY);
    this.$refs.scrollcomp.scrollTo(0,this.saveY,0)
    //刷新避免问题
    this.$refs.scrollcomp.refresh()
  },
  deactivated() {
    console.log('离开');
    // this.saveY = this.$refs.scrollcomp.scroll.y
    this.saveY = this.$refs.scrollcomp.getScrollY()
  },
  created() {
    //created中的this指的是组件对象
    //组件创建完请求数据
    getHomeMultidata().then(res=>{
      console.log(res);
    //  函数调用结束，变量会被释放，所以要保存数据，请求完数据要将数据保存到result
    //  箭头函数中的this会一层一层往外找
    //  res指向一个对象，res是变量名，函数调用结束后，res这个变量会被回收，此时没有
    //  变量名指向这个对象，对象会被回收。令this.result=res，当res被回收后，还有一个
    //  result变量指向这个对象，所以对象不会被回收
      this.result = res //result中保存了大量数据，可以分开保存
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    }),
      //请求商品数据
      this.getHomeGoods('pop'),
      this.getHomeGoods('new'),
      this.getHomeGoods('sell')
  },
  mounted() {
    //1、图片加载完成的事件监听
    // const refresh = this.debounce(this.$refs.scrollcomp.refresh,200)
    const refresh = debounce(this.$refs.scrollcomp.refresh,200)
    this.$bus.$on('itemImageLoad',()=>{
      // console.log('----');
      // this.$refs.scrollcomp.scroll.refresh()
      //一开始的处理
      // this.$refs.scrollcomp.refresh()
    //  加入防抖动
      refresh()
    })
    //  2、获取tabControl的offsetTop
    //  所有的组件都有一个属性$el，用于获取组件中的元素
    // console.log(this.$refs.tabControl.$el.offsetTop);
  },
  methods:{
    // //防抖动函数
    // debounce(func,delay){
    //   let timer = null
    //   return function (...args){
    //     if (timer) clearTimeout(timer)
    //     timer = setTimeout(()=>{
    //       func.apply(this,args)
    //     },delay)
    //   }
    // },
    //事件监听相关方法
    tabClick(index){
    //  index用来表示点击的是流行、新款还是精选
    //   方式1
    //   const types = ['pop','new','sell']
    //   this.currentType = types[index]
    //  方式2
      switch (index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl.currentIndex = index
      this.$refs.tabControl1.currentIndex = index
    },
    backClick(){
      // this.$refs.scrollcomp.scroll.scrollTo(0,0)
      this.$refs.scrollcomp.scrollTo(0,0)
      console.log(this.$refs.scrollcomp.message)
    },
    contentScroll(position){
      // console.log(position);
      //1、判断BackTop是否显示
      this.isShowBackTop = (-position.y)>10
    //  2、判断tabControl是否吸顶 position:fixed
      this.isFixed = -(position.y)>this.offsetTop
    },
    loadMore(){
      console.log('上拉');
      this.getHomeGoods(this.currentType)
      //如果已经解决滚动bug,就不需要加下面这条语句
      // this.$refs.scrollcomp.scroll.refresh()
    },
    swiperImageLoad(){
      //  2、获取tabControl的offsetTop
      //  所有的组件都有一个属性$el，用于获取组件中的元素
      console.log(this.$refs.tabControl.$el.offsetTop);
      this.offsetTop = this.$refs.tabControl.$el.offsetTop
    },
    //网络请求相关方法
    getHomeGoods(type){
      //可以把created中的代码抽离到methods中
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res=>{
        console.log(res);
        //...语法：对res.data.list数组中元素进行解析，将元素一个个塞到goods[type].list
        this.goods[type].list.push(...res.data.list)
        //将页码+1
        this.goods[type].page += 1
      //  必须调用finishPullUp才能进行下一次上拉加载更多
        this.$refs.scrollcomp.finishUpLoad()
      })
    }
  }
}
</script>

<style scoped>
#home{
  padding-top: 44px;
  position: relative;
  /*height: 100vh;*/
}
.home-nav{
  background-color: var(--color-tint);
  color: #ffffff;
  height: 44px;
  /*以下设置，是在使用浏览器原生滚动时，为了让顶部导航不跟随页面一起滚动*/
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;
}
.tab-control{
  position: relative;
  /*top: 44px;*/
  z-index: 9;
  /*color: #ffffff;*/
}
.content{
  /*height: 300px;*/
  /*overflow: hidden;*/
  /*height: calc(100% - 93px);*/
  /*padding-top: 44px;*/
  position: absolute;
  top:44px;
  bottom:49px;
  left: 0;
  right: 0;
}
/*.fixed{*/
/*  position: fixed;*/
/*  top: 44px;*/
/*  bottom: 0;*/
/*  left: 0;*/
/*  right: 0;*/
/*}*/
</style>
