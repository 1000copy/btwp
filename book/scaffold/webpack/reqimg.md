##加载图片

加载图片也可以使用模块方案，也就是require函数方式。假设我们有一个图片:

![](scaffold/webpack/100.png)

现在会以一个案例来说明如何使用require函数把此图片打包。


代码(文件名为main.js）：

    var img1 = document.createElement("img");
    img1.src = require("./small.png");
    document.body.appendChild(img1);

主要的HTML文件（文件名为index.html）：

    <html>
    <body>
      <script type="text/javascript" src="bundle.js"></script>
    </body>
    </html>

webpack配置文件（文件名为webpack.config.js）：

    module.exports = {
      entry: './main.js',
      output: {
        filename: 'bundle.js'
      },
      module: {
        loaders:[
          { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
        ]
      }
    };

要想打包这个图片，webpack需要一个loader来转换png文件。承担此责任的就是url-loader。它的参数limit=8192指明如果图片大小小于8192的话，就直接使用Data URL，否则就是正常的URL。Data URL无需引入外部文件，而是把内容直接编码在src属性内，编码格式为base64。

必须按照loader：

    npm i url-loader --save-dev

现在，开始打包：

    webpack

随后打开文件index.html 。你可以看到浏览器内已经显示了此图片。说明打包成功。

对于Data URL有些好奇的人，可以看看生成的bundle.js文件的最后几行，你可以了解到最后赋值给img.src属性的，是类似这样的数据：

    "data:image/png;base64,iVBORw0....."

