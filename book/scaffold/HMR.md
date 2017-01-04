##热加载

使用webpack的模块热加载可以加快开发的速度。它无需刷新，只要修改了文件，客户端就立刻立刻做热加载。如何做到？当然理解它的最好的做法就是我们自己做一遍。

本文关心的是：

1. dev-middleware的利用方法
2. HMR(webpack-hot-middleware）的利用方法

这次提供热加载的代码共两个文件（放置于src内），a依赖于b，并调用b的引出函数：

    // a.js 
    var b = require("./b.js")
    b.b()
    
    // b.js 
    exports.b = function b(){
        console.log("h")
    }

首先我需要使用dev-middleware让使用require函数成为可能，其次我希望使用HMR，当b文件内修改时，可以自动热加载，而不是必须完整reload才可以。

现在开始。首先，按照webpack的管理，我们需要一个入口index.html，放置于output内:

    <html>
      <body>
        <script type="text/javascript" src="bundle.js"></script>
      </body>
    </html>

希望热加载的代码就是这样了。目录结构如下：
    
    ├── output
    │   └── index.html
    ├── server.js
    └── src
        ├── a.js
        └── b.js
        
其中的server.js在随后创建。现在我们创建环境，让它可以热加载：
创建目录环境的命令为：

    mkdir src
    touch src/a.js
    touch src/b.js
    mkdir output
    touch output/index.html
    touch server.js

####创建环境

    npm init -y
    npm install express --save
    npm install webpack webpack-dev-middleware webpack-hot-middleware --save-dev
    
#### 创建服务器文件

此服务器文件使用express创建服务器监听，使用dev中间件，HMR中间件：

    var express = require('express')
    var webpack = require('webpack')
    var path = require('path')
    var app = express()
    var webpackMiddleware = require("webpack-dev-middleware");
    var compiler = webpack({
        entry: 
        ["./src/a.js",
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        ],
        output: {
            path: path.resolve(__dirname, './output/'),
            filename:'bundle.js',
        },
        plugins: [
    	    new webpack.optimize.OccurenceOrderPlugin(),
    	    new webpack.HotModuleReplacementPlugin(),
    	    new webpack.NoErrorsPlugin()
    	]
    })
    var options ={
        publicPath: "/",
    }
    app.use(webpackMiddleware(compiler, options));
    app.use(require("webpack-hot-middleware")(compiler));
    app.use(express.static('output'))
    app.listen(8080, function () {
      console.log('Example app listening on!')
    })

其中dev中间件中涉及到的入口文件的做法和一般的webpack做法一样，但是多出一个webpack-hot-middleware/client文件，此文件用来传递到客户端，并和服务器的HMR插件联络，联络的URL为`path=/__webpack_hmr&timeout=20000`,其中path有HMR服务监听，timeout则可以望文生义，知道失联的话，达到20000毫秒就算超时，不必再做尝试。

为了让HMR知道a、b文件是可以热加载的，必须在入口文件内（也就是a.js)内的尾部加入代码：

    if (module.hot) {
      module.hot.accept();
    }  
也就是说a.js得修改为：

    // a.js 
    var b = require("./b.js")
    b.b()
    
    if (module.hot) {
      module.hot.accept();
    }

现在执行服务：
    node server.js 
    
打开浏览器，访问localhost:8080 ,并打开Chrome devtools,看到
    
    bundle.js:1916 h
    bundle.js:1626 [HMR] connected
现在修改b.js内的字符串为hello HMR，看到Console输出：
    
    Hello HMR
    bundle.js:1847 [HMR] Updated modules:
    bundle.js:1849 [HMR]  - ./src/b.js
    bundle.js:1849 [HMR]  - ./src/a.js
    bundle.js:1854 [HMR] App is up to date.

就是说HMR已经激活。

ref : https://github.com/ahfarmer/webpack-hmr-starter-middleware
