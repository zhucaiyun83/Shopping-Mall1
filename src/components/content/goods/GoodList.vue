<template>
<div class="goods">
  <goods-list-item v-for="item in goods" v-bind:goodsItem="item"></goods-list-item>
<!--  {{goods}}-->
</div>
</template>

<script>
import GoodsListItem from "@/components/content/goods/GoodsListItem";
export default {
  name: "GoodList",
  components:{
    GoodsListItem
  },
  props:{
    goods:{
      type:Array,
      default (){
        return []
      }
    }
  }
}
</script>

<style scoped>
.goods{
  display: flex;
  /*换行*/
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 3px;
}
</style>
