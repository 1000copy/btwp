###加载svg

现在，我们已经可以引入js文件、css文件。如果是图片呢？答案是可以。本文以svg图片为例，在css内引用它。从一个案例开始：

    //c.html
    <html>
      <body>
        <div>Hello css</div>
        <script type="text/javascript" src="bundle.js"></script>
      </body>
    </html>
    
我们希望通过css来让div变成红色的字体，文件为：

    //b.css
    div{
    	color:red;
    	background: url(./success.svg);
    	display: inline-block;
    }
    
依然在js的入口文件内引用此css：

    require("./b.css")
    
并修改webpack的配置文件，除了使用css-loader、style-loader加载css外，还需要加入一个新的loader：

    // webpack.config.js
    module.exports = {
      entry: './a.js',
      output: {
        filename: 'bundle.js'
      },
      module: {
        loaders:[
          { test: /\.css$/, loader: 'style-loader!css-loader' },
           {test: /\.svg/, loader: 'svg-url-loader'}
        ]
      },
      url: {
            dataUrlLimit: 1024
      }
    };
代码dataUrlLimit: 1024是为了告诉svg-url-loader，如果装载的svg大小低于1024字节，那么直接采用base64把内容编码到url内，否则就采用文件引用的形式。

因为需要引入模块svg-url-loader我们需要安装一下：

    npm i svg-url-loader --save-dev
    
随后是熟悉的转译:

    webpack
    
现在工作全部做完，可以用浏览器打开文件c.html，发现html内的文字有了一个图片背景。说明引入svg已经生效了。

