<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "Scroll",
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default: false
    }
  },
  data(){
    return{
      scroll:null,
      message:'hahaha'
    }
  },
  mounted() {
    //创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true, //监听div的点击需要加该属性
      //通过传入的probe type的值决定要不要监测位置，如果不分情况的都监听会影响性能
      probeType:this.probeType,
      ///通过传入的pullUpload的值决定要不要监听上拉事件，如果不分情况的都监听会影响性能
      pullUpLoad: this.pullUpLoad
    })
  //  监听滚动位置
   if (this.probeType===2 || this.probeType===3){
     this.scroll.on('scroll',position=>{
       // console.log(position);
       this.$emit('scroll',position)
     })
   }
  //  上拉加载更多
    if (this.pullUpLoad){
      this.scroll.on('pullingUp',()=>{
        // console.log('上拉');
        this.$emit('pullingUp')
      })
    }
  },
  methods:{
    //time默认值为300
    scrollTo(x,y,time=300){
      console.log("傻朱彩云")
      this.scroll&&this.scroll.scrollTo(x,y,time)
    },
    finishUpLoad(){
      this.scroll.finishPullUp()
    },
    refresh(){
      this.scroll&&this.scroll.refresh()
      console.log('---');
    },
    getScrollY(){
      return this.scroll? this.scroll.y:0
    }
  }
}
</script>

<style scoped>

</style>
