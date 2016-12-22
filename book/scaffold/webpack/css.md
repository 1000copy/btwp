###加载css

既然使用webpack后js的模块变得和node一模一样的令人喜爱，那么自然的，可以这样弄css？答案是可以。从一个案例开始：

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
    }
我们只需要在js的入口文件内引用此css：

    require("./b.css")
并修改webpack的配置文件，以便通知css文件由css-loader加载，并由style-loader插入到html文件内：

    // webpack.config.js
    module.exports = {
      entry: './a.js',
      output: {
        filename: 'bundle.js'
      },
      module: {
        loaders:[
          { test: /\.css$/, loader: 'style-loader!css-loader' },
        ]
      }
    };
    
因为需要引入模块css-loader和style-loader，我们需要安装一下：
    npm i css-loader style-loader --save-dev
    
随后是熟悉的转译:

    webpack
    
现在工作全部做完，可以用浏览器打开文件c.html，发现html内的文字变红，说明css生效了。

