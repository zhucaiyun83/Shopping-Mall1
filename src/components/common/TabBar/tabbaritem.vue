<template>
  <div class="tab-bar-item" @click="itemClick">
<!--    插槽的某些属性会被替换掉，外面包一个div-->
    <div v-if="!isActive">
      <slot name="tab-bar-icon"></slot>
    </div>
    <div v-else>
      <slot name="tab-bar-icon-active"></slot>
    </div>
    <div v-bind:class="{active:isActive}">
      <slot name="tab-bar-text"></slot>
    </div>
<!--    <div v-bind:style="{activeStyle}">-->
<!--      <slot name="tab-bar-text"></slot>-->
<!--    </div>-->
  </div>
</template>

<script>
export default {
  name: "tabbaritem",
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'red'//活跃字体颜色由用户传入的决定，没有传入用默认
    }
  },
  // data(){
  //   return{
  //     isActive:false
  //   }
  // },
  methods:{
    itemClick(){
      //这里跳转的路径不是写死的，如点击首页，需要知道点击的是首页，并跳转到首页 props
      this.$router.push(this.path)
    }
  },
  //点击哪个图片图片变红
  computed:{
    isActive(){
      return this.$route.path.indexOf((this.path)) !== -1
    },
    // activeStyle(){
    //   //判断是否处于活跃，是给定一个颜色
    //   return this.isActive? {color:this.activeColor} : {}
    // }

  }
}
</script>

<style scoped>
.tab-bar-item{
  margin-top: 2px;
  /*display: flex;*/
  /*flex-direction: column;*/
  /*align-items: center;*/
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
  /*line-height: 49px;*/
}
.tab-bar-item img{
  width: 24px;
  height: 24px;
  vertical-align: middle;
}
.active{
  color:red
}
</style>
