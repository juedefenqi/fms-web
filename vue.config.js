const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  devServer: {
    publicPath: "/",
    disableHostCheck: true,
    proxy: {
      "/xboot": {
       //target: "http://10.1.13.5:8888", // 请求本地 需要xboot后台项目
         // target: "http://10.2.36.194:8888",
      target: "http://10.1.13.28:8888", // 请求本地 需要xboot后台项目
     ///target: "http://47.92.27.141:8888",

        ws: true
      }
    }
  },
  // 打包时不生成.map文件 避免看到源码
  productionSourceMap: false,
  css: {
    loaderOptions: {
      // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true
      }
    }
  },
  // 部署优化
  configureWebpack: {
    // 使用CDN
    externals: {
      vue: "Vue",
      "vue-i18n": "VueI18n",
      axios: "axios",
      "vue-router": "VueRouter",
      vuex: "Vuex",
      "view-design": "iview",
      echarts: "echarts",
      apexcharts: "ApexCharts",
      "vue-apexcharts": "VueApexCharts",
      "print-js": "printJS",
      "vue-lazyload": "VueLazyload",
      "js-cookie": "Cookies"
    },
    // GZIP压缩
    plugins: [
      new CompressionPlugin({
        test: /\.js$|\.html$|\.css/, // 匹配文件
        threshold: 10240 // 对超过10k文件压缩
      })
    ]
  }
};
