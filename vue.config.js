module.exports = {
  configureWebpack:{
    //resolve解决路径相关问题
    resolve:{
      alias:{
        'assets': '@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'view':'@/view',
      }
    }
  }
}