##加载图片

vue的脚手架代码生成后，引入图片分为两种情况：

第一种情况是在html内引入。图片默认放置到assets内。脚手架代码内的app.vue引入的template内：

    <img src="./assets/logo.png">

就是此情况。

第二种情况，就是我这里主要展示的——使用代码引入。也就是require函数方式。此处会需要webpack打包。具体使用方法可以这样如下。

首先创建环境，使用

    vue init webpack testbed
    cd testbed
    npm install

在src/components/hello.vue内贴入脚本代码：

  export default {
    name: 'hello',
    mounted(){
      var img = document.createElement('img');
      img.src = require('../assets/logo.png');
      document.getElementById("did").appendChild(img)
    },
    data () {
      return {
        msg: ''
      }
    }
  }

然后验证：

  npm run dev

此时你可以浏览器内看到vue的图标被显示了两次。

此处文档比较缺乏，所以是vue-cli用户常常容易误解或者难以适应的地方。