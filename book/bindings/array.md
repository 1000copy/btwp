
##数组的响应化

在第一个v-for的案例中，我们对一个数组（items）进行迭代，创建了元素绑定。现在或许有人会怀疑:如果我修改了数组，是否也可以因此影响到DOM呢。比如我增加一个数组元素，DOM会响应式的跟随变化吗。答案是可能。我写了一个案例，其中添加了一个定时器，每秒钟调用一个函数，函数内有不同的数组方法：

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app"><ul>
      <li v-for="item in items">{{ item }}</li>
      </ul></div>
    <script>
      var a= new Vue({
        el: '#app',
        mounted(){
          this.funcs[0] = this.b
          this.funcs[1] = this.c
          this.funcs[2] = this.d
          this.funcs[3] = this.e
          this.funcs[4] = this.f
          this.funcs[5] = this.g
          this.funcs[6] = this.h
          this.funcs[7] = this.i
          this.funcs[8] = this.j
          setTimeout(this.a,1000)
        },
        data(){return {
          items :[1,2,3],
          funcs:[],
          funcIndex : 0 
        }}, 
        methods:{
          a(){ 
            this.funcs[this.funcIndex]()
            this.funcIndex++
            if (this.funcIndex < this.funcs.length)
              setTimeout(this.a,1000) 
          },
          b(){
            this.items.push(4)
          },
          c(){
            this.items.pop() 
          },
          d(){
            this.items.shift() 
          },
          e(){
            this.items.unshift(1) 
          },
          f(){
            this.items.splice(1,1)  
          },
          g(){
            this.items.reverse()  
          },
          h(){
            this.items.sort()  
          },
          i(){
            // this.items[0] = 111  
            Vue.set(this.items,0,111)
          },
          j(){
            // this.items.length = 1
            this.items.splice(1,1)  
          }
        }
      })
    </script> 

测试表明，对以下方法的调用，Vue确实会做响应的修改：

    push()
    pop()
    shift()
    unshift()
    splice()
    sort()
    reverse()

但是需要留意最后两个函数，i(),j(),其中的i()函数内如果使用：

    this.items[0] = 111 

并不会引发响应变化。这是vue的一个限制，如果需要这样做，必须改代码为：

    Vue.set(this.items,0,111)

另外一个是数组的length属性，修改它DOM并不会跟随变化，如果你想要的是删除一个元素，可以用：

    this.items.splice(1,1)  

来做替代。


