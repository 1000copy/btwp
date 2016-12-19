插件可以让开发者提供的扩展看起来像是vue自己就有的。因为插件的功能会使用Vue全局对象或者实例来调用，或者被修改从而在Vue的钩子函数内起作用。比如用于http调用的插件vue-resource被插入到vue后，可以使用:

   Vue.http.get(url)

的方式使用此插件提供的服务。本文构建一个可以执行的demo，验证插件对Vue的修改，代码如下：


    var get = function(a){console.log('Hello  ' +a)}
    var plugin = {}
    plugin.install = function(Vue) {
        if (plugin.installed) {
            return;
        }
        Vue.who = get;
        Object.defineProperties(Vue.prototype, {
            $who: {
                get() {
                    return {get:get}
                }
            }
        });
        Vue.mixin({
            created: function () {
              console.log('Plugin activiated')
            }        
        })    
    }
    if (typeof window !== 'undefined' && window.Vue) {
        window.Vue.use(plugin);
    }
    
此插件以get函数形式提供服务，可以打印一个字符串。它必须公开一个对象，此对象有一个install的方法，此方法的参数为Vue，可以在此方法内通过赋值创建全局方法，像这样：

        Vue.who = get;
或者针对vue的prototype，通过defineProperties创建实例方法：

     Object.defineProperties(Vue.prototype, {
                $who: {
                    get() {
                        return {get:get}
                    }
                }
            });
混入能力可以把钩子函数混入到Vue实例内：

        Vue.mixin({
            created: function () {
              console.log('Plugin activiated')
            }        
        })
此时可以使用一个文件对它测试：
    
    <html>
      <body>
        <script type="text/javascript" src="https://vuejs.org/js/vue.js"></script>
        <script type="text/javascript" src="p1.js"></script>
        <script type="text/javascript">
        	var vue = new Vue()
        	vue.$who.get('Vue Instance')
        	Vue.who('Global Vue')
        </script>
      </body>
    </html>
    
打开控制台，可以看到如下消息：

    Plugin activiated
    Hello  Vue Instance
    Hello  Global Vue
    
