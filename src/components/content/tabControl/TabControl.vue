<template>
<div class="tab-control">
<!--  只有文字不同时不要用slot-->
  <div v-for="(item,index) in titles"
       class="tab-control-item"
       v-bind:class="{active:currentIndex === index}"
       @click="itemClick(index)">
       <span>{{item}}</span>
  </div>
</div>
</template>

<script>
export default {
  name: "TabControl",
  data(){
    return {
      currentIndex:0
    }
  },
  methods:{
    itemClick(index) {
      this.currentIndex = index;
      //子组件发出自定义事件，父组件home.vue监听
      this.$emit('tabClick',index)
    }
  },
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.tab-control{
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  background-color: #ffffff;
}
.tab-control-item{
  flex: 1;
}
.active{
  color: var(--color-high-text);
}
.active span{
  border-bottom: 3px solid var(--color-tint);
  padding: 2px;
}
</style>
