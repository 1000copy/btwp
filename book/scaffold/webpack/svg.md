##加载svg

现在，我们已经可以引入js文件、css文件。现在我们引入下svg图片试试。从一个案例开始：

主要html文件（文件名main.html）

    <html>
      <body>
        <div>Hello svg</div>
        <script type="text/javascript" src="bundle.js"></script>
      </body>
    </html>
    

svg文件就是绘制了一个填充了黑色的圆（文件名为100.svg)：
    
    <svg xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="10" fill="#000"/></svg>
    
依然在js的入口文件内引用此svg：

    var img1 = document.createElement("img");
    img1.src = require("./100.svg")
    document.body.appendChild(img1);
    
并修改webpack的配置文件，加入一个新的svg-url-loader（文件名webpack.config.js)：
 
    module.exports = {
      entry: './main.js',
      output: {
        filename: 'bundle.js'
      },
      module: {
        loaders:[
          {test: /\.svg/, loader: 'svg-url-loader?limit=1'},
        ]
      }
    };

此svg-url-loader的参数limit指明再小也得使用外部引用文件形式。

因为需要引入模块svg-url-loader我们需要安装一下：

    npm i svg-url-loader --save-dev
    
随后是熟悉的转译:

    webpack
    
现在工作全部做完，可以用浏览器打开文件main.html，发现图片已经加入到页面内了。

