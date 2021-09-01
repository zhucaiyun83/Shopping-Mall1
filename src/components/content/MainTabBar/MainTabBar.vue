<template>
  <TabBar>
    <TabBarItem path="/home" activeColor="blue">
      <img slot="tab-bar-icon" src="~assets/img/tabbar/home.svg" alt="">
      <img slot="tab-bar-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
      <div slot="tab-bar-text">首页</div>
    </TabBarItem>
    <TabBarItem path="/category" activeColor="blue">
      <img slot="tab-bar-icon" src="~assets/img/tabbar/category.svg" alt="">
      <img slot="tab-bar-icon-active" src="~assets/img/tabbar/category_active.svg" alt="">
      <div slot="tab-bar-text">分类</div>
    </TabBarItem>
    <TabBarItem path="/shopcart" activeColor="blue">
      <img slot="tab-bar-icon" src="~assets/img/tabbar/shopcart.svg" alt="">
      <img slot="tab-bar-icon-active" src="~assets/img/tabbar/shopcart_active.svg" alt="">
      <div slot="tab-bar-text">购物车</div>
    </TabBarItem>
    <TabBarItem path="/profile" activeColor="blue">
      <img slot="tab-bar-icon" src="~assets/img/tabbar/profile.svg" alt="">
      <img slot="tab-bar-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="">
      <div slot="tab-bar-text">我的</div>
    </TabBarItem>
  </TabBar>
</template>

<script>
import TabBar from "components/common/TabBar/tabbar";
import TabBarItem from "components/common/TabBar/tabbaritem";
export default {
  name: "MainTabBar",
  components:{
    TabBarItem,
    TabBar
  }
}
</script>

<style scoped>

</style>
