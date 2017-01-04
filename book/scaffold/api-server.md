
## 创建api-server

使用vue提供的vue-cli工具建立脚手架后，我可以编写单页面组件等代码，可以利用热加载等帮助开发的特性，却不必需要了解webpack等运行于后端的技术。

然而，当我需要创建后端的api，此问题终于浮出水面。我的服务端api代码应该放置于何处才可以：

1. 在开发阶段，继续利用webpack的热加载
2. 在发布阶段，可以不必改变任何api代码就可以继续使用
3. 这些代码不应该在dev-server.js内修改或者添加，而最好独立于dev-server.js存在

答案是使用脚手架代码中的config/index.js内的proxyTable属性的配置，把到达dev-server.js的api访问转发给我的api server。

我们从一个案例出来。一个hello组件，从服务器的api/who提取消息，并绑定到客户端组件内。使用的技术如下：

1. vue-cli
2. express
3. vue-resource

首先，我们创建脚手架代码：

    vue init webpack helloapi
    cd helloapi
    npm i
    npm run dev

此时可以看到浏览器打开，显示我特别熟悉的vue默认的html页面:

    Welcome to Your Vue.js App

我们现在提供一个api实现（api server），为默认的vue的欢迎页面消息做一个修改，服务器端来提供它：

    
    var express = require('express');
    var app = express();
    app.get('/api', function (req, res) {
      var j = {msg:'Hello From Server'}
      res.end(JSON.stringify(j));
    })
    var server = app.listen(8181, function () {
      var host = server.address().address
      var port = server.address().port
      console.log("listening at http://%s:%s", host, port)
    })
        
客户端需要安装vue-resource

      npm i vue-resource --save

并在把src/components/Hello.vue替换为如下代码，以便实际发起GET请求：

    <template>
      <div class="hello">
        <h1>{{ msg }}</h1>
      </div>
    </template>
    
    <script>
    export default {
      name: 'hello',
      data () {
        return {
          msg: 'Welcome'
        }
      },
      mounted(){
          this.$http.get('/api').then((response) => {
            var j = JSON.parse(response.body)
            this.msg = j.msg
          }, (response) => {
            console.log('error',response)
          });
      }
    }
    </script>

在src/main.js内插入如下代码，以便引入vue-resource：

    import r from 'Vue-Resource'
    Vue.use(r)

特别重要的点来了，已经要在config/index.js内添加代理转发，把本来发给dev-server.js的api rul转发给我们的api server。
 
    module.exports = {
      ..
      dev: {
        ...
        proxyTable: {       
            '/api': 'http://localhost:8181',
        },
      }
    }
    
启动api server：

    node server.js

现在启动dev-server.js:

    npm run dev

客户端看到：

    Hello From Server

这样，开发阶段我们已经做到了apiserver和dev-server.js的代码分离，并且继续利用本有的热加载能力。bingo!现在，我需要验证的是，如果我发布了此代码，是否可以api server代码中和api有关的代码无丝毫修改就可以继续复用。

现在开始。首先，发布当前代码：

    npm run build
    
命令会创建一个dist目录，内有编译打包好的全部js代码和资源代码。尽管其中有index.html，但是直接用浏览器打开是无效的。比如首先启动一个服务器，所有的资源文件必须通过浏览器发起，有服务器服务才可以正常运行。我们可以稍稍修改api server，引入插件，让此服务器除了提供api服务外，也可以对整个dist目录提供服务。只要添加代码：

    var path = require('path')
    var dist = path.join(__dirname, 'dist')
    app.use('/',express.static(dist))

然后启动服务：

    node server.js 

打开浏览器，访问http://localhost:8181,可以看到和dev-server.js下一样的结果。

这说明，api server可以在发布后不做修改（修改时为了提供服务静态内容的能力，对于api提供者的代码是不做修改的）继续使用。
