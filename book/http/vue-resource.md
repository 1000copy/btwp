vue.js本身没有提供网络访问能力，但是可以通过插件完成。vue-resource就是这样一个不错的插件。它封装了XMLHttpRequest和JSONP，实现异步加载服务端数据。

我们现在搭建一个测试环境，由服务器提供json数据，启动后等待客户端的请求。数据为user信息，内容为：

    var users = [
       {"name" : "1"},
       {"name" : "2"},
       {"name" : "3"},
    ]

## 从GET方法开始

我们首先从最简单的GET方法入手，场景如下：

1. 客户端使用HTTP GET方法来访问/users
2. 服务端返回整个json格式的user
3. 客户端检查返回的结果，和期望做验证

我使用了如下库：express.js做HTTP Server，且它本身就已经提供了GET方法监听的内置支持。


首先初始化项目，并安装依赖：

  npm init
  npm i express --save

然后创建index.js文件，内容为：


    var express = require('express');
    var app = express();
    var path = require('path')
    var public = path.join(__dirname, 'public')
    app.use('/',express.static(public))
    var users = [
       {"name" : "1"},
       {"name" : "2"},
       {"name" : "3"},
    ]
    app.get('/users', function (req, res) {
      res.end( JSON.stringify(users));
    })
    var server = app.listen(8080, function () {
      var host = server.address().address
      var port = server.address().port
      console.log("listening at http://%s:%s", host, port)
    })


代码行：

    var public = path.join(__dirname, 'public')
    app.use('/',express.static(public))

则是指明运行后，客户端url的根目录指向的是服务器的public目录内。此目录用来放置静态文件，html+js+css等。代码行：

    app.get('/users', function (req, res) {
      res.end( JSON.stringify(users));
    })

会监听对/users的GET请求，如果发现请求到来，就会调用回调函数，并在在req、res内传递Request对象和Response对象。我们在res对象内把users对象做一个字符串化，然后由res对象传递给客户端。


客户端访问代码：

    <script src="https://unpkg.com/vue@2.0.6/dist/vue.js"></script>
    <script src="https://cdn.jsdelivr.net/vue.resource/1.0.3/vue-resource.min.js"></script>

    <div id="app">
      {{msg}}
    </div>
    <script>
      var app = new Vue(
      {
          el:'#app',
          data:{
            msg:'hello'
          },
          mounted(){
            this.$http.get('/users').then((response) => {
              var j = JSON.parse(response.body)
              console.log(j.length == 3,j[0].name == '1',j[1].name == '2',j[2].name == '3')
            }, (response) => {
              console.log('error',response)
            });
           
        }
      })
    </script>

现在启动服务器：
  
    node index.js
访问 

    localhost:8080

在控制台内发现：
    
    true true true true

打印出来的结果全部为true，就表明我们已经完整的取得了users对象，因为我们的代码和期望是一致的。

## 完整的URL访问

对于GET类的HTTP请求方法，这样做就OK了。另外几种请求方法，监听的做法是类似的。不同的地方，主要是客户端可能会传递json过来到服务器，比如POST方法，可以用来添加一个user，此时就需要客户端传递一个JSON对象过来，服务器则需要解析JSON对象。此时有一个库可以帮我们做这件事，它就是body-parser库。代码：

    var bodyParser = require('body-parser')
    app.use(bodyParser.json())

把body-parser库的.json()作为插件，插入到express内，这样我们就可以使用：

   response.body 

取得客户端发来的json对象了。


完整代码如下(index.js)：

    var express = require('express');
    var app = express();
    var path = require('path')
    var bodyParser = require('body-parser')
    app.use(bodyParser.json())
    var public = path.join(__dirname, 'public')
    app.use('/',express.static(public))
    var users = []
    function rs(){
      users = [
             {"name" : "1"},
             {"name" : "2"},
             {"name" : "3"},
          ]
    }
    rs()
    app.put('/user/:id', function (req, res) {
      var userkey = parseInt(req.params.id) 
      users[userkey] = req.body
      res.end( JSON.stringify(users));
      rs()
    })
    app.delete('/user/:id', function (req, res) {
      var userkey = parseInt(req.params.id) 
      users.splice(userkey,1)
      res.end( JSON.stringify(users));
      rs()
    })
    app.get('/user/:id', function (req, res) {
      var userkey = parseInt(req.params.id) 
      res.end( JSON.stringify(users[userkey]));
    })
    app.get('/users', function (req, res) {
      res.end( JSON.stringify(users));
    })
    app.post('/user', function (req, res) {
      users.push(req.body)
      res.end(JSON.stringify(users))
      rs()
    })
    var server = app.listen(8080, function () {
      var host = server.address().address
      var port = server.address().port
      console.log("listening at http://%s:%s", host, port)
    })

这段服务器的代码，提供了对5个url的监听，其中两个是GET方法，一个POST，一个PUT，一个DELETE。其中的rs()函数有些特别，目的是为了测试方便。它让每个会修改数据对象的方法执行后都可以恢复原状，以便供其他客户端访问前都和初始值是一样的。

    node index.js 

此时服务器已经就绪，等待客户端的连接。然后是客户端文件index.html。此时vue-resource派上用场。使用vue-resource首先需要加载vue.js，然后加载自己。我们偷个懒，就不下载这些代码到本地，而好似直接使用网络上现成的代码：

    <script src="https://unpkg.com/vue@2.0.6/dist/vue.js"></script>
    <script src="https://cdn.jsdelivr.net/vue.resource/1.0.3/vue-resource.min.js"></script>
        
完整代码如下：
    
   <script src="https://unpkg.com/vue@2.0.6/dist/vue.js"></script>
    <script src="https://cdn.jsdelivr.net/vue.resource/1.0.3/vue-resource.min.js"></script>
    
    <div id="app">
      {{msg}}
    </div>
    <script>
      var app = new Vue(
      {
        el:'#app',
        data:{
          msg:'hello'
        },
        mounted(){
           this.a()
           this.b()
           this.c()
           this.d()
           this.e()
        },
        methods:{
          a(){
            this.$http.get('/users').then((response) => {
              var j = JSON.parse(response.body)
              console.log('getall',j.length == 3,j[0].name == '1',j[1].name == '2',j[2].name == '3')
            }, (response) => {
              console.log('error',response)
            });
          },
          b(){
            this.$http.get('/user/0').then((response) => {
              var j = JSON.parse(response.body)
              console.log('getone',j.name == '1')
            }, (response) => {
              console.log('error',response)
            });
          },
          c(){
            this.$http.put('/user/0',{name:'1111'}).then((response) => {
              var j = JSON.parse(response.body)
              console.log('put',j.length == 3,j[0].name == '1111')
            }, (response) => {
              console.log('error',response)
            });
          },
          d(){
              this.$http.post('/user',{name:'4'}).then((response) => {
              var j = JSON.parse(response.body)
              // console.log(j)
              console.log('post',j.length == 4,j[3].name == '4')
            }, (response) => {
              console.log('error',response)
            });
          },
          e(){
            this.$http.delete('/user/2').then((response) => {
              var j = JSON.parse(response.body)
              // console.log(j)
              console.log('delete',j.length == 2)
            }, (response) => {
              console.log('error',response)
            });
          }
        }
      })
    </script>



最后，打印出来的结果全部为true，就表明我们的代码和期望是一致的。


